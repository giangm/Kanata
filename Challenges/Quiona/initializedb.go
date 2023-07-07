
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
				ID INT PRIMARY KEY NOT NULL,
				"NAME" TEXT NOT NULL,
				RATING INT NOT NULL,
				"LENGTH" TEXT NOT NULL,
				"THUMBNAIL" TEXT NOT NULL,
				"ORIENTATION" TEXT NOT NULL)`
				query, err := db.Prepare(movies_table)
				if err!= nil{
					log.Fatal(err)
				}
				query.Exec()
	flag_table:=`CREATE TABLE flag(
				flaghere text primary key not null)`
				query, err=db.Prepare(flag_table)
				if err!= nil{
					log.Fatal(err)
				}
				query.Exec()
	addMovie(db, 0, "5 ELEMENT KUNG FU", 4, "90", "https://i.imgur.com/jtV3R8c.jpeg", "PORTRAIT")
	addMovie(db, 1, "5 FINGERS OF DEATH", 4, "98", "https://i.imgur.com/01sEExM.jpeg","PORTRAIT")
	addMovie(db, 2, "THE INVINCIBLE BOXER", 3, "82", "https://i.imgur.com/0PHD1qI.jpeg","PORTRAIT")
	addMovie(db, 3, "13 GHOSTS", 2, "120", "https://i.imgur.com/sAxKKP8.jpeg","PORTRAIT")
	addMovie(db, 4, "30 milioni di km. DALLA TERRA", 0, "180", "https://i.imgur.com/neKpTiA.jpeg","PORTRAIT")
	addMovie(db, 5, "A NIGHTMARE ON ELM STREET PART 2 FREDDYS REVENGE", 6, "1000", "https://i.imgur.com/L9OwRk9.jpeg","LANDSCAPE")
	addMovie(db, 6, "BEHEMOTH THE SEA MONSTER", 2, "110", "https://i.imgur.com/qap3Q19.jpeg","LANDSCAPE")
	addMovie(db, 7, "BEYOND THE TIMER BARRIER", 8, "72", "https://i.imgur.com/aluAPrL.jpeg","LANDSCAPE")
	addMovie(db, 8, "CAME FROM BENEATH THE SEA", 5, "1", "https://i.imgur.com/ujTfWpe.jpeg","LANDSCAPE")
	addMovie(db, 9, "KONGA", 1, "125", "https://i.imgur.com/Cj2vlqc.jpeg","LANDSCAPE")
	addMovie(db, 10, "STAR WARS RETURN OF THE JEDI", 10, "225", "https://i.imgur.com/I7dUp9C.jpeg","LANDSCAPE")
	addMovie(db, 11, "STAR WARS", 10, "325", "https://i.imgur.com/XiBqQW3.jpeg","LANDSCAPE")
	addMovie(db, 12, "THE BEAST FROM 20000 FATHOMS", 6, "123", "https://i.imgur.com/m8AHKqg.jpeg","LANDSCAPE")
	addMovie(db, 13, "THE BRIDE OF FRANKENSTEIN", 8, "789", "https://i.imgur.com/u33marj.jpeg","LANDSCAPE")
	addMovie(db, 14, "THE BRIDE OF FRANKENSTEIN V2", 1, "6543", "https://i.imgur.com/IMjSsNq.jpeg","LANDSCAPE")
	addMovie(db, 15, "THE SHAPE OF THINGS TO COME", 7, "456", "https://i.imgur.com/bFDF8Jh.jpeg","LANDSCAPE")
	addMovie(db, 16, "COLOR BY TECHNICOLOR", 7, "999", "https://i.imgur.com/GNzlfZ2.jpeg","LANDSCAPE")
	addMovie(db, 17, "THE BLACK GOAT", 2, "842", "https://i.imgur.com/Ihejasr.jpeg","PORTRAIT")
	addMovie(db, 18, "STAR WARS A NEW HOPE", 3, "0123", "https://i.imgur.com/blqgeD7.jpeg","PORTRAIT")
	addMovie(db, 19, "THE AWAKENING", 2, "655", "https://i.imgur.com/93VwE8H.jpeg","PORTRAIT")
}

func addMovie(db *sql.DB, ID int, NAME string, RATING int, LENGTH string, THUMBNAIL string, ORIENTATION string){
	inMovie := `insert into movies(ID, NAME, RATING, LENGTH, THUMBNAIL, ORIENTATION) VALUES (?, ?, ?, ?, ?, ?)`
	query, err := db.Prepare(inMovie)
	if err!= nil{
		log.Fatal(err)
	}
	_, err = query.Exec(ID, NAME, RATING, LENGTH, THUMBNAIL, ORIENTATION)
	query.Exec()
}