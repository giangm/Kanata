package main

import (
    "fmt"
    "log"
    "net/http"
	"database/sql"
	"encoding/json"
	"github.com/gorilla/mux"
	"net/url"
	_ "github.com/mattn/go-sqlite3"
)
type Movie struct {
    Id int `json:"id"`
    Name string `json:"name"`
    Rating int `json:"rating"`
	Length string `json:"length"`
	Thumbnail string `json:"thumbnail"`
	Orientation string `json:"orientation"`
}

func homePage(w http.ResponseWriter, r *http.Request){
    fmt.Fprintf(w, "func handleRequests() {\nmyRouter := mux.NewRouter().StrictSlash(true)\nmyRouter.HandleFunc(\"/\", homePage)\nmyRouter.HandleFunc(\"/getMovie\", getAllMovies)\nmyRouter.HandleFunc(\"/getMovie/{name}\", getOneMovie)\nmyRouter.HandleFunc(\"/getMovie/orderBy/{order}\", getAllMoviesOrderBy)\nlog.Fatal(http.ListenAndServe(\":10000\", myRouter))\n}")
    fmt.Println("Endpoint Hit: homePage")
}

func handleRequests() {
	myRouter := mux.NewRouter().StrictSlash(true)
    myRouter.HandleFunc("/", homePage)
	myRouter.HandleFunc("/getMovie", getAllMovies)
	myRouter.HandleFunc("/getMovie/{name}", getOneMovie)
	myRouter.HandleFunc("/getMovie/orderBy/{order}", getAllMoviesOrderBy)
    log.Fatal(http.ListenAndServe(":5000", myRouter))
}

func sqlReturnMovies(rows *sql.Rows) []Movie{
	var movies []Movie
	for rows.Next() {

		var dbId int
		var dbName string
		var dbRating int
		var dbLength string
		var dbThumbnail string
		var dbOrientation string

		err := rows.Scan(&dbId, &dbName, &dbRating, &dbLength, &dbThumbnail, &dbOrientation)

		if err != nil {
			return movies
		}
		temp := Movie{Id: dbId, Name: dbName, Rating: dbRating, Length: dbLength, Thumbnail: dbThumbnail, Orientation: dbOrientation}
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
	const file string = "apidatabase.db"
	db, err := sql.Open("sqlite3", file)
	if err != nil {
		return
	}
	rows, err := db.Query("SELECT * FROM movies where name = ?", movieName)
	if err != nil {
		return
	}
	movies:= sqlReturnMovies(rows)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(movies)
	db.Close()
	
}

func getAllMoviesOrderBy(w http.ResponseWriter, r *http.Request){
	vars := mux.Vars(r)
	order := vars["order"]
	decodedOrder, err := url.QueryUnescape(order)
	if err != nil {
		return
	}
	fmt.Println(decodedOrder)
	const file string = "apidatabase.db"
	db, err := sql.Open("sqlite3", file)
	if err != nil {
		return
	}
	rows, err := db.Query(fmt.Sprintf("SELECT * FROM movies ORDER BY %s", decodedOrder))
	if err != nil {
		return
	}
	movies:= sqlReturnMovies(rows)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(movies)
	db.Close()
	
}

func main() {
    handleRequests()
}
