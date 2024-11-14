package main

import (
	"fmt"
	"html/template"
	"net/http"
)

func main() {
	http.Handle("/styles.css", http.FileServer(http.Dir(".")))
	http.Handle("/script.js", http.FileServer(http.Dir(".")))
	http.HandleFunc("/", homeHandler)

	fmt.Println("Server running on http://localhost:8081")
	http.ListenAndServe(":8081", nil)
}

func homeHandler(w http.ResponseWriter, r *http.Request) {
	tmpl, err := template.ParseFiles("index.html")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	tmpl.Execute(w, nil)
}
