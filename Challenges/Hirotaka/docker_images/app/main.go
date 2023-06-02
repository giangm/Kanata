package main

import (
	"github.com/labstack/echo/v4"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db, err = gorm.Open(sqlite.Open("database.db"), &gorm.Config{})

func main() {
	e := echo.New()
	if err != nil {
		panic("failed to connect database")
	}

	setup()

	e.GET("/", index)
	e.POST("/query", query)
	e.POST("/login", login)
	e.POST("/register", register)

	e.Logger.Fatal(e.Start(":8080"))
}
