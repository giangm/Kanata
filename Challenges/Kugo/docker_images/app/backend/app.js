require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 3000;

const url = process.env.DB_URL || 'mongodb://localhost:27017';
const dbName = 'nosql_challenge';

let db;

const connectToDbAndInsertUser = async () => {
  try {
    const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    db = client.db(dbName);
    console.log("Connected successfully to db");

    await insertUser();
    console.log("User inserted.")
  } catch (err) {
    console.log("Error connecting to db. Retrying...");
    setTimeout(connectToDbAndInsertUser, 5000);
  }
};

connectToDbAndInsertUser();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')));
app.use(session({
  secret: process.env.envs,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/index.html'));
});

app.post('/login', async (req, res) => {
  let { username, password } = req.body;

  const client = db;
  const collection = client.collection('users');

  try {
    const user = await collection.findOne({ username: username, password: password });

    if (user) {
      req.session.loggedin = true;
      return res.redirect('/account');
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    console.error('Error during user login:', error);
    res.sendStatus(500);
  }
});

app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if(err) {
      return res.sendStatus(500);
    }
    res.redirect('/');
  });
});

app.get('/account', (req, res) => {
  if (req.session.loggedin) {
    res.sendFile(path.join(__dirname, 'frontend/account.html'));
  } else {
    res.redirect('/');
  }
});

app.post('/generate-reset-token', async (req, res) => {
  const { username } = req.body;

  const client = db;
  const collection = client.collection('users');

  try {
    const user = await collection.findOne({ username: username });

    if (user) {
      const resetToken = require('crypto').randomBytes(32).toString('hex');
      await collection.updateOne({ username: username }, { $set: { resetToken: resetToken } });

      return res.json({ resetToken: resetToken });
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('Error during password reset token generation:', error);
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


const insertUser = async () => {
  const client = db;
  const collection = client.collection('users');

  const userExists = await collection.findOne({ username: process.env.envu });

  if (!userExists) {
    const user = {
      username: process.env.envu,
      password: process.env.envp,
    };

    await collection.insertOne(user);
  }
};