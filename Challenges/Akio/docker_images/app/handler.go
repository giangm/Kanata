package main

import (
	"fmt"
	"net/http"
	"os/exec"
	"strings"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
)

func index(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Hello, world!"})
}

func login(c *gin.Context) {
	session := sessions.Default(c)
	user := c.PostForm("username")
	pass := c.PostForm("password")

	if strings.Trim(user, " ") == "" || strings.Trim(pass, " ") == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Username/Password can't be empty"})
		return
	}

	if !checkUser(user, pass) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Authentication failed"})
		return
	}

	if user == "admin" {
		session.Set("admin", user)
	} else {
		session.Set("user", user)
	}

	if err := session.Save(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save session"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Successfully authenticated user"})
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

func register(c *gin.Context) {
	user := c.PostForm("username")
	pass := c.PostForm("password")
	confirm := c.PostForm("confirm")

	if strings.Trim(user, " ") == "" || strings.Trim(pass, " ") == "" || strings.Trim(confirm, " ") == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Parameters can't be empty"})
		return
	}

	if pass != confirm {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Password and Confirm must match"})
		return
	}

	if userExists(user) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Username already taken"})
		return
	}

	if createUser(user, pass) != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Something went wrong"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Successfully registered user"})
}

func changePassword(c *gin.Context) {
	password := c.PostForm("password")
	confirm := c.PostForm("confirm")

	if strings.Trim(password, " ") == "" || strings.Trim(confirm, " ") == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Parameters can't be empty"})
		return
	}

	if password != confirm {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Password and Confirm must match"})
		return
	}

	id := c.Param("id")

	if updatePassword(id, password) != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to update password"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Password updated succesfully"})
}

func ping(c *gin.Context) {
	ip := c.PostForm("ip")
	command := fmt.Sprintf("ping -c 1 %s", ip)
	cmd := exec.Command("bash", "-c", command)
	out, err := cmd.CombinedOutput()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": string(out)})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": string(out)})
}

func adminDashboard(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Welcome to the admin dashboard"})
}
