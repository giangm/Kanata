package main

// https://github.com/Depado/gin-auth-example/blob/master/main.go

import (
	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
)

func engine() *gin.Engine {
	r := gin.New()

	r.Use(sessions.Sessions("session", cookie.NewStore([]byte("secret"))))

	r.GET("/", index)
	r.POST("/login", login)
	r.GET("/logout", logout)
	r.POST("/register", register)

	private := r.Group("/profile/:id")
	private.Use(loginRequired)
	{
		private.POST("/changePassword", changePassword)
	}

	admin := r.Group("/admin")
	admin.Use(adminRequired)
	{
		admin.GET("/dashboard", adminDashboard)
		admin.POST("/ping", ping)
	}
	return r
}

func adminRequired(c *gin.Context) {
	session := sessions.Default(c)
	admin := session.Get("admin")
	if admin == nil {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized, please login as admin"})
		return
	}

	c.Next()
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
