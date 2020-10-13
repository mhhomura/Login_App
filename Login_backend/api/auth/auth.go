package auth

import (
	"errors"

	"github.com/mhomura/Login_Project/Login_backend/api/models"
	"github.com/mhomura/Login_Project/Login_backend/api/security"
	"github.com/mhomura/Login_Project/Login_backend/api/utils"
)

var (
	ErrUserNotFound = errors.New("Sem registro desse usuário")
)

func SignIn(email, password string) (string, error) {
	user := models.GetUserByEmail(email)
	if user.IdUser == 0 {
		return "", ErrUserNotFound
	}
	err := security.VerifyPassword(user.Password, password)
	if err != nil {
		return "", err
	}
	token, err := utils.GenerateJWT(user)
	if err != nil {
		return "", err
	}
	return token, nil
}
