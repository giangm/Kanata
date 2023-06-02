package main

import (
	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
)

type User struct {
	Username string
	Password string
	Balance  float64
}

var users = []User{
	{Username: "user1", Password: "password1", Balance: 1000},
	{Username: "user2", Password: "password2", Balance: 2000},
}

func engine() *gin.Engine {
	r := gin.New()

	r.Use(sessions.Sessions("session", cookie.NewStore([]byte("secret"))))

	r.GET("/", index)
	r.GET("/login", login)
	r.POST("/login", login)
	r.GET("/logout", logout)

	private := r.Group("/account")
	private.Use(loginRequired)
	{
		private.GET("/deposit", deposit)
		private.POST("/deposit", deposit)
		private.GET("/withdraw", withdraw)
		private.POST("/withdraw", withdraw)
		private.GET("", account)
	}

	return r
}

func loginRequired(c *gin.Context) {
	session := sessions.Default(c)
	user := session.Get("user")
	if user == nil {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized, please login"})
		return
	}

	c.Next()
}

func main() {
	r := engine()
	r.Run()
}
