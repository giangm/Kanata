package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"sync"
	"time"

	_ "github.com/mattn/go-sqlite3"
)

var mutex sync.Mutex
var db *sql.DB

func main() {
	var err error
	db, err = sql.Open("sqlite3", "./requests.db")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	// Create the requests table if it doesn't exist
	_, err = db.Exec("CREATE TABLE IF NOT EXISTS requests (ip TEXT PRIMARY KEY, count INTEGER, unbantime INTEGER)")
	if err != nil {
		log.Fatal(err)
	}

	_, err = db.Exec("CREATE TABLE IF NOT EXISTS USERS (username TEXT PRIMARY KEY, password INTEGER)")
	if err != nil {
		log.Fatal(err)
	}

	fs := http.FileServer(http.Dir("static"))
	http.Handle("/", fs)

	http.HandleFunc("/login", handleLogin)
	http.ListenAndServe(":5000", nil)
}

func handleLogin(w http.ResponseWriter, r *http.Request) {
	ipAddress := r.Header.Get("X-Forwarded-For")
	var requestCount = getRequestCount(ipAddress)
	username := r.FormValue("username")
	password := r.FormValue("password")
	if (username == "" || password == ""){
		fmt.Fprintf(w, "Please enter your username and password!")
		return
	}

	if (requestCount > 5) && ((checkTime(username, ipAddress))) {
		fmt.Fprintf(w, "You have made too many incorrect login attempts.")
		return
	}

	if validateLogin(username, password) {
		fmt.Fprintf(w, "Login successful!")
	} else {
		incrementRequestCount(ipAddress)
		fmt.Fprintf(w, "WRONG LOGIN, THIS HAS BEEN LOGGGGGED!")
	}
}

func checkTime(username, ipAddress string) bool{
	
	stmtUnban, err := db.Prepare("SELECT unbantime from requests where ip = ?")
	if err != nil {
		log.Println(err)
		return false
	}
	currentTime := time.Now().Unix()
	var unbanTime int64
	err = stmtUnban.QueryRow(ipAddress).Scan(&unbanTime)
	fmt.Println(unbanTime)
	fmt.Println(currentTime)
	if unbanTime < currentTime{
		fmt.Println("Updating back to 0!!!")
		stmtUpdate, err := db.Prepare("UPDATE requests SET count = 0 WHERE ip = ?")
		if err != nil {
			log.Println(err)
			return false
		}
		defer stmtUpdate.Close()
	
		_, err = stmtUpdate.Exec(ipAddress)
		return true
	}
	return true
}

func validateLogin(username,password string) bool {
	stmtSelect, err := db.Prepare("SELECT password from users where username = ?")
	if err != nil {
		log.Println(err)
		return false
	}
	var dbPassword string
	err = stmtSelect.QueryRow(username).Scan(&dbPassword)

	if dbPassword == password{
		return true
	}
	return false

}

func getRequestCount( ipAddress string) int {
	stmtSelect, err := db.Prepare("SELECT count FROM requests WHERE ip = ?")
	if err != nil {
		log.Println(err)
		return 0
	}
	var requestCount int
	err = stmtSelect.QueryRow(ipAddress).Scan(&requestCount)
	fmt.Println(requestCount)
	if err != nil {
		log.Println(err)
	}
	return requestCount
}

func incrementRequestCount(ipAddress string) int {
	mutex.Lock()
	defer mutex.Unlock()

	// Check if the IP address exists in the database
	stmtSelect, err := db.Prepare("SELECT count FROM requests WHERE ip = ?")
	if err != nil {
		log.Println(err)
		return 0
	}
	defer stmtSelect.Close()

	var count int
	err = stmtSelect.QueryRow(ipAddress).Scan(&count)
	if err != nil {
		if err == sql.ErrNoRows {
			// IP address not found, insert a new row
			stmtInsert, err := db.Prepare("INSERT INTO requests (ip, count, unbantime) VALUES (?, 1, 0)")
			if err != nil {
				log.Println(err)
				return 0
			}
			defer stmtInsert.Close()

			_, err = stmtInsert.Exec(ipAddress)
			if err != nil {
				log.Println(err)
			}
		} else {
			log.Println(err)
		}
		return 0
	} else {
		// IP address found, update the count
		stmtUpdate, err := db.Prepare("UPDATE requests SET count = count + 1 WHERE ip = ?")
		if err != nil {
			log.Println(err)
			return 0
		}
		defer stmtUpdate.Close()

		_, err = stmtUpdate.Exec(ipAddress)

		var requestCount = getRequestCount(ipAddress)
		fmt.Println(requestCount)

		if requestCount > 5{
			currentTime := time.Now().Unix() + 120
			fmt.Println("current time in the long function is below this line")
			fmt.Println(currentTime)
			stmtUpdate, err := db.Prepare("UPDATE requests SET unbantime = ? WHERE ip = ?")
			if err != nil {
				log.Println(err)
				return 0
			}
			defer stmtUpdate.Close()
	
			_, err = stmtUpdate.Exec(currentTime, ipAddress)
		}
		return requestCount
	}
}
