package main

import (
	"fmt"
	"log"
	"os/exec"
	"regexp"
	"strings"
)

func hash(password string) string {
	c := fmt.Sprintf("echo '%s' | sha256sum | cut -d' ' -f1", password)
	cmd := exec.Command("bash", "-c", c)
	output, err := cmd.Output()
	if err != nil {
		log.Fatal(err)
	}
	return strings.TrimRight(string(output), "\n")
}

func checkPass(password string) bool {
	regex := regexp.MustCompile("^[a-zA-Z0-9]+$")
	return regex.MatchString(password)
}
