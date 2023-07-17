package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/lestrrat-go/libxml2"
)

func indexHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" {
		xmlData := r.FormValue("xml_data")
		if xmlData != "" {
			doc, err := libxml2.ParseString(xmlData)
			if err != nil {
				log.Println(err)
				fmt.Fprintln(w, "Invalid XML data!")
				return
			}
			defer doc.Free()

			fmt.Println(doc)
			if err != nil {
				log.Println(err)
				fmt.Fprintln(w, "Error occurred while parsing XML data!")
				return
			}
			return
		}
		fmt.Fprintln(w, "No XML data provided!")
		return
	}

	http.ServeFile(w, r, "templates/index.html")
}

func main() {
	http.HandleFunc("/", indexHandler)
	log.Fatal(http.ListenAndServe(":8080", nil))
}
