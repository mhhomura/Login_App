package api

import (
	"fmt"
	"log"
	"net/http"

	"github.com/mhomura/Login_Project/Login_backend/api/models"
	"github.com/mhomura/Login_Project/Login_backend/api/routes"
)

func Run() {
	db := models.Connect()
	if !db.HasTable(&models.User{}) {
		db.Debug().CreateTable(&models.User{})
	}
	db.Close()
	listen(3008)
}

func listen(p int) {
	port := fmt.Sprintf(":%d", p)
	fmt.Printf("Ouvindo Porta %s...\n", port)
	r := routes.NewRouter()
	log.Fatal(http.ListenAndServe(port, routes.LoadCors(r)))
}
