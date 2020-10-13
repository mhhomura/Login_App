package controllers

import (
	"net/http"

	"github.com/mhomura/Login_Project/Login_backend/api/models"
	"github.com/mhomura/Login_Project/Login_backend/api/utils"
)

func PublicRoute(w http.ResponseWriter, r *http.Request) {
	utils.ToJson(w, "Rota", http.StatusOK)
}

func ProtectedRoute(w http.ResponseWriter, r *http.Request) {
	jwtParams, err := utils.JwtExtract(r)
	if err != nil {
		utils.ToJson(w, err.Error(), http.StatusUnauthorized)
		return
	}
	email, ok := jwtParams["user_email"].(string)
	if !ok {
		utils.ToJson(w, "Inválido", http.StatusUnauthorized)
		return
	}
	user := models.GetUserByEmail(email)
	if user.IdUser == 0 {
		utils.ToJson(w, "Sem registro para esse usuário", http.StatusUnauthorized)
		return
	}
	utils.ToJson(w, user, http.StatusOK)
}
