package controllers

import (
	"encoding/json"
	"net/http"

	"github.com/mhomura/Login_Project/Login_backend/api/auth"
	"github.com/mhomura/Login_Project/Login_backend/api/models"
	"github.com/mhomura/Login_Project/Login_backend/api/utils"
)

func Login(w http.ResponseWriter, r *http.Request) {
	body := utils.BodyParser(r)
	var user models.User
	err := json.Unmarshal(body, &user)
	if err != nil {
		utils.ToJson(w, err.Error(), http.StatusUnauthorized)
		return
	}
	token, err := auth.SignIn(user.Email, user.Password)
	if err != nil {
		utils.ToJson(w, err.Error(), http.StatusUnauthorized)
		return
	}
	utils.ToJson(w, token, http.StatusOK)
}
