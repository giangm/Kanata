package main

import (
	"net/http"
	"strconv"
	"time"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
)

func login(c *gin.Context) {
	session := sessions.Default(c)

	var username, password string
	if c.Request.Method == http.MethodPost {
		username = c.PostForm("username")
		password = c.PostForm("password")
	} else if c.Request.Method == http.MethodGet {
		username = c.Query("username")
		password = c.Query("password")
	}

	for _, user := range users {
		if user.Username == username && user.Password == password {
			session.Set("user", user.Username)
			if err := session.Save(); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save session"})
				return
			}

			c.JSON(http.StatusOK, gin.H{"message": "Login successful"})
			return
		}
	}

	c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
}

func logout(c *gin.Context) {
	session := sessions.Default(c)
	user := session.Get("user")
	if user == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid session token"})
		return
	}

	session.Clear()
	if err := session.Save(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save session"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Successfully logged out"})
}

func index(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Hello, world!"})
}

func account(c *gin.Context) {
	session := sessions.Default(c)
	user := session.Get("user")
	balance := getBalance(user.(string))
	c.JSON(http.StatusOK, gin.H{"message": balance})
}

func deposit(c *gin.Context) {
	session := sessions.Default(c)
	user := session.Get("user")

	var amt float64
	var err error
	if c.Request.Method == http.MethodPost {
		amt, err = strconv.ParseFloat(c.PostForm("amount"), 64)
	} else if c.Request.Method == http.MethodGet {
		amt, err = strconv.ParseFloat(c.Query("amount"), 64)
	}

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid amount"})
		return
	}

	for i := range users {
		if users[i].Username == user {
			users[i].Balance += amt
			c.JSON(http.StatusOK, gin.H{"message": "Successfully deposited money"})
			return
		}
	}
}

func withdraw(c *gin.Context) {
	session := sessions.Default(c)
	inUser := session.Get("user")

	var amt float64
	var err error
	if c.Request.Method == http.MethodPost {
		amt, err = strconv.ParseFloat(c.PostForm("amount"), 64)
	} else if c.Request.Method == http.MethodGet {
		amt, err = strconv.ParseFloat(c.Query("amount"), 64)
	}
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid amount"})
		return
	}

	currentBalance := getBalance(inUser.(string))

	isValid := checkIfValidOperation(amt, currentBalance)
	time.Sleep(3 * time.Second)
	if isValid {
		go func() {
			for i := range users {
				if users[i].Username == inUser {
					users[i].Balance -= amt
					c.JSON(http.StatusOK, gin.H{"message": "Successfully withdrew money"})
					return
				}
			}
		}()
	}
}

func getBalance(username string) float64 {
	for i := range users {
		if users[i].Username == username {
			return users[i].Balance
		}
	}
	return 0
}

func checkIfValidOperation(withdrawal, currentBalance float64) bool {
	return currentBalance >= withdrawal
}
