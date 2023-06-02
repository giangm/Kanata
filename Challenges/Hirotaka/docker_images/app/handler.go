package main

import (
	"log"
	"net/http"
	"strings"

	"github.com/labstack/echo/v4"
)

func index(c echo.Context) error {
	return c.String(http.StatusOK, "Hello, World!!!!")
}

func login(c echo.Context) error {
	username := c.FormValue("username")
	password := c.FormValue("password")

	exists, err := userExists(username, password)

	if exists {
		return c.String(http.StatusOK, "Authenticated!\n")
	} else {
		if err != nil {
			log.Println(err)
		}
		return c.String(http.StatusOK, "Failed\n")
	}
}

func register(c echo.Context) error {
	username := c.FormValue("username")
	password := c.FormValue("password")
	if checkPass(password) {
		password = hash(password)
	} else {
		return c.String(http.StatusBadRequest, "Failed\n")
	}

	if createUser(username, password) != nil {
		return c.String(http.StatusBadRequest, "Create Failed\n")
	}

	return c.String(http.StatusOK, "Account registered!\n")
}

func query(c echo.Context) error {
	sql := c.FormValue("sql")

	if strings.Contains(strings.ToLower(sql), "users") {
		var users []User
		db.Raw(sql).Scan(&users)
		return c.JSON(http.StatusOK, users)
	} else if strings.Contains(strings.ToLower(sql), "system_infos") {
		var systeminfos []SystemInfo
		db.Raw(sql).Scan(&systeminfos)
		return c.JSON(http.StatusOK, systeminfos)
	}
	return c.String(http.StatusOK, "POST Request to Query")

}
