package routes

import (
	"github.com/gorilla/mux"
	"github.com/mhomura/Login_Project/Login_backend/api/controllers"
	"github.com/mhomura/Login_Project/Login_backend/api/middlewares"
)

func NewRouter() *mux.Router {
	r := mux.NewRouter().StrictSlash(true)

	r.HandleFunc("/", controllers.PublicRoute).Methods("GET")
	r.HandleFunc("/admin", middlewares.IsAuth(controllers.ProtectedRoute)).Methods("GET")
	r.HandleFunc("/users", controllers.GetUsers).Methods("GET")
	r.HandleFunc("/users", controllers.PostUser).Methods("POST")
	r.HandleFunc("/login", controllers.Login).Methods("POST")

	return r
}
