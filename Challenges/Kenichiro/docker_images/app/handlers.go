package main

import (
	"fmt"
	"net/http"
	"os"
	"runtime"

	"github.com/labstack/echo/v4"
)

type AdminData struct {
	Path     string      `json:"path"`
	Runtime  string      `json:"runtime"`
	Hostname string      `json:"hostname"`
	GoPath   string      `json:"gopath"`
	Home     string      `json:"home"`
	Header   http.Header `json:"headers"`
}

func index(c echo.Context) error {
	return c.String(http.StatusOK, "Hello, World!!!!")
}

func fetch(c echo.Context) error {
	resp, err := fetchURL(c.FormValue("url"))
	if err != nil {
		fmt.Println(err)
	}
	return c.String(http.StatusOK, resp)
}

func admin(c echo.Context) error {
	if checkRequest(c.RealIP()) {
		path := os.Getenv("PATH")
		runtime := runtime.Version()
		hostname := os.Getenv("HOSTNAME")
		gopath := os.Getenv("GOPATH")
		home := os.Getenv("HOME")
		header := c.Request().Header

		adminData := AdminData{
			Path:     path,
			Runtime:  runtime,
			Hostname: hostname,
			GoPath:   gopath,
			Home:     home,
			Header:   header,
		}
		return c.JSON(http.StatusOK, adminData)
	}
	return c.JSON(http.StatusForbidden, "Access denined, this is an internal resource!")
}
