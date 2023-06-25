<!DOCTYPE html>
<html>
<head>
    <title>CMS Selection</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f7f7f7;
            padding: 20px;
        }
        
        h1 {
            text-align: center;
            color: #333;
        }

        form {
            max-width: 400px;
            margin: 30px auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        label {
            display: block;
            font-weight: bold;
            margin-bottom: 10px;
        }
        
        select {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 3px;
        }
        
        input[type="submit"] {
            width: 100%;
            padding: 10px;
            background-color: #4caf50;
            border: none;
            color: #fff;
            font-weight: bold;
            border-radius: 3px;
            cursor: pointer;
        }
        
        input[type="submit"]:hover {
            background-color: #45a049;
        }

        .error {
            text-align: center;
        }

        .error h3 {
            color: #f00;
        }

        .logout {
            text-align: right;
        }

        .logout a {
            text-decoration: none;
            color: #333;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="logout">
        <a href="logout.php">Logout</a>
    </div>
    <h1>Select a Content Management System (CMS)</h1>
    
    <form method="get" action="index.php">
        <label for="cms">Choose a CMS:</label>
        <select name="cms" id="cms">
            <option value="classic">Classic</option>
            <option value="modern">Modern</option>
            <option value="minimal">Minimal</option>
            <option value="bold">Bold</option>
        </select>
        <input type="submit" value="Submit">
    </form>

    <?php

    if (isset($_GET['cms'])) {
        if (preg_match('/^https?:\/\/[^\s\/$?#].[^\s]*$/', $_GET['cms'])) {
            if (substr($_GET['cms'], -4) === '.php') {
                include($_GET['cms']);
            } else {
                echo '<div class="error">
                    <h3>Invalid URL</h3>
                    <p>An error has occurred while processing your request.</p>
                    <p>Please try again later or contact the administrator.</p>
                </div>';
            }
        } else {
        if (file_exists('/var/www/html/views/' . $_GET['cms'] . '.php')) {
            require_once '/var/www/html/views/' . $_GET['cms'] . '.php';
        } else {
            echo '<div class="error">
                    <h3>CMS Template Does Not Exist</h3>
                    <p>An error has occurred while processing your request.</p>
                    <p>Please try again later or contact the administrator.</p>
                </div>';
        }
        }
    }
    ?>
</body>
</html>

