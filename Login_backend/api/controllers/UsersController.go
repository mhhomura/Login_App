package controllers

import (
	"encoding/json"
	"net/http"

	"github.com/mhomura/Login_Project/Login_backend/api/models"
	"github.com/mhomura/Login_Project/Login_backend/api/utils"
)

func PostUser(w http.ResponseWriter, r *http.Request) {
	body := utils.BodyParser(r)
	var user models.User
	err := json.Unmarshal(body, &user)
	if err != nil {
		utils.ToJson(w, err.Error(), http.StatusUnprocessableEntity)
		return
	}
	rs, err := models.CreateUser(user)
	if err != nil {
		utils.ToJson(w, err.Error(), http.StatusUnprocessableEntity)
		return
	}
	utils.ToJson(w, rs, http.StatusCreated)
}

func GetUsers(w http.ResponseWriter, r *http.Request) {
	users := models.GetUsers()
	utils.ToJson(w, users, http.StatusCreated)
}
