package main

import (
	"log"
	"os"
	"database/sql"
	_ "github.com/mattn/go-sqlite3"
)

func main() {
	init, err := os.Create("apidatabase.db")
	if err != nil {
		log.Fatal(err)
	}
	init.Close()
    const file string = "apidatabase.db"
	db, err := sql.Open("sqlite3", file)
    if err != nil {
        log.Fatal(err)
    }
	movies_table:=`CREATE TABLE movies(
				"NAME" TEXT PRIMARY KEY NOT NULL)`
				query, err := db.Prepare(movies_table)
				if err!= nil{
					log.Fatal(err)
				}
				query.Exec()
	addMovie(db,"5 ELEMENT KUNG FU")
	addMovie(db,"5 FINGERS OF DEATH")
	addMovie(db,"THE INVINCIBLE BOXER")
	addMovie(db,"13 GHOSTS")
	addMovie(db,"30 milioni di km. DALLA TERRA")
	addMovie(db,"A NIGHTMARE ON ELM STREET PART")
	addMovie(db,"BEHEMOTH THE SEA MONSTER")
	addMovie(db,"BEYOND THE TIMER BARRIER")
	addMovie(db,"CAME FROM BENEATH THE SEA")
	addMovie(db,"KONGA")
	addMovie(db, "STAR WARS RETURN OF THE JEDI")
	addMovie(db, "STAR WARS")
	addMovie(db, "THE BEAST FROM 20000 FATHOMS")
	addMovie(db, "THE BRIDE OF FRANKENSTEIN")
	addMovie(db, "THE BRIDE OF FRANKENSTEIN V2")
	addMovie(db, "THE SHAPE OF THINGS TO COME")
	addMovie(db, "COLOR BY TECHNICOLOR")
	addMovie(db, "THE BLACK GOAT")
	addMovie(db, "STAR WARS A NEW HOPE")
	addMovie(db, "THE AWAKENING")
}

func addMovie(db *sql.DB, NAME string){
	inMovie := `insert into movies(NAME) VALUES (?)`
	query, err := db.Prepare(inMovie)
	if err!= nil{
		log.Fatal(err)
	}
	_, err = query.Exec(NAME)
	query.Exec()
}