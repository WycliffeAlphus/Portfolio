package main

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestHomeHandler(t *testing.T) {
	req, err := http.NewRequest("GET", "/", nil)
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(homeHandler)

	handler.ServeHTTP(rr, req)

	// Check the status code
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	// Check if the response body contains expected content
	expected := "Your expected content here" // Update this with actual content from your template
	if rr.Body.String() != expected {
		t.Errorf("handler returned unexpected body: got %v want %v",
			rr.Body.String(), expected)
	}
}

func TestStaticFileServer(t *testing.T) {
	req, err := http.NewRequest("GET", "/static/example.txt", nil) // Replace with an actual file in your static directory
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	fs := http.FileServer(http.Dir("static"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))
	handler := http.Handler(fs)

	handler.ServeHTTP(rr, req)

	// Check for 200 OK status
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	// Optionally check the response body if you know what it should be
}
