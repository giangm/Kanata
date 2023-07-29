package main

import (
    "fmt"
    "log"
    "net/url"
    "net/http"
	"database/sql"
	"encoding/json"
	"github.com/gorilla/mux"
	_ "github.com/mattn/go-sqlite3"
)
type Movie struct {
    Name string `json:"name"`
}

func homePage(w http.ResponseWriter, r *http.Request){
    fmt.Fprintf(w, "func handleRequests() {\nmyRouter := mux.NewRouter().StrictSlash(true)\nmyRouter.HandleFunc(\"/\", homePage)\nmyRouter.HandleFunc(\"/getMovie\", getAllMovies)\nmyRouter.HandleFunc(\"/getMovie/{name}\", getOneMovie)\nmyRouter.HandleFunc(\"/getMovie/orderBy/{order}\", getAllMoviesOrderBy)\nlog.Fatal(http.ListenAndServe(\":5000\", myRouter))\n}")
    fmt.Println("Endpoint Hit: homePage")
}

func handleRequests() {
	myRouter := mux.NewRouter().StrictSlash(true)
    myRouter.HandleFunc("/", homePage)
	myRouter.HandleFunc("/getMovie", getAllMovies)
	myRouter.HandleFunc("/getMovie/{name}", getOneMovie)
	myRouter.HandleFunc("/insertMovie/{name}", insertNewMovie)
    log.Fatal(http.ListenAndServe(":5000", myRouter))
}

func sqlReturnMovies(rows *sql.Rows) []Movie{
	var movies []Movie
	for rows.Next() {
		var dbName string

		err := rows.Scan(&dbName)

		if err != nil {
			return movies
		}
		temp := Movie{Name: dbName}
		movies = append(movies,temp)
	}
	return movies
}

func getAllMovies(w http.ResponseWriter, r *http.Request){

	const file string = "apidatabase.db"
	db, err := sql.Open("sqlite3", file)
	if err != nil {
		return
	}
	rows, err := db.Query("SELECT * FROM movies")
	if err != nil {
		return
	}

	movies:= sqlReturnMovies(rows)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(movies)
	db.Close()	
}

func getOneMovie(w http.ResponseWriter, r *http.Request){
	vars := mux.Vars(r)
	movieName := vars["name"]
	movieName, err := url.QueryUnescape(movieName)
	fmt.Println(movieName)
	const file string = "apidatabase.db"
	db, err := sql.Open("sqlite3", file)
	if err != nil {
		return
	}
	stmt, err := db.Prepare("SELECT * FROM movies WHERE name = ?")
	if err != nil {
	    // Handle the error
	    log.Fatal(err)
	}
	defer stmt.Close()

	rows, err := stmt.Query(movieName)
	if err != nil {
	    // Handle the error
	    log.Fatal(err)
	}
	defer rows.Close()
	fmt.Println("hello")
	var movie string
	var movies []string
	for rows.Next() {
		err := rows.Scan(&movie)
		fmt.Println(movie)
		rows, err = db.Query(fmt.Sprintf("SELECT * FROM movies WHERE name = %s", movie))
		if err != nil {

	    fmt.Println("double bedge")
	    	log.Fatal(err)
		}
		for rows.Next() {
		    var x string
		    err := rows.Scan(&x)
		    if err != nil {
		        // Handle the error
		        log.Fatal(err)
		    }

		    // Collect the movie into the slice
		    movies = append(movies, x)
		}

	}
	fmt.Println("hey")
	fmt.Println(movies)

	if rows.Err() != nil {
	    // Handle the error
	    log.Fatal(rows.Err())
	}

	w.Header().Set("Content-Type", "application/json")
	if(len(movies)>0){
		json.NewEncoder(w).Encode(movies)
	}else{
		json.NewEncoder(w).Encode(movie)
	}
	db.Close()

}

func insertNewMovie(w http.ResponseWriter, r *http.Request){
	vars := mux.Vars(r)
	name := vars["name"]
	name, err := url.QueryUnescape(name)
	const file string = "apidatabase.db"

	db, err :=sql.Open("sqlite3", file)
	if err != nil {
		return
	}

	stmt, err := db.Prepare("INSERT INTO movies(name) VALUES(?)")
	if err != nil {
	    // Handle the error
	    log.Fatal(err)
	}
	defer stmt.Close()

	_, err = stmt.Exec(name)
	if err != nil {
	    // Handle the error
	    log.Fatal(err)
	}


}

func main() {
    handleRequests()
}
