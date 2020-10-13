package models

import (
	"time"

	"github.com/mhomura/Login_Project/Login_backend/api/security"
)

type User struct {
	IdUser    uint32    `gorm:"primary_key;auto_increment" json:"id_user"`
	Usuario   string    `gorm:"type:varchar(60);not null;unique_index" json:"usuario"`
	Email     string    `gorm:"type:varchar(60);not null;unique_index" json:"email"`
	Password  string    `gorm:"type:varchar(60);not null" json:"password"`
	CreatedAt time.Time `gorm:"default:current_timestamp()" json:"created_at"`
	UpdatedAt time.Time `gorm:"default:current_timestamp()" json:"updated_at"`
}

func CreateUser(user User) (interface{}, error) {
	db := Connect()
	defer db.Close()
	hashedPassword, err := security.Hash(user.Password)
	if err != nil {
		return nil, err
	}
	user.Password = string(hashedPassword)
	rs := db.Create(&user)
	return rs.Value, rs.Error
}

func GetUsers() []User {
	db := Connect()
	defer db.Close()
	var users []User
	db.Order("id asc").Find(&users)
	return users
}

func GetUserByEmail(email string) User {
	db := Connect()
	defer db.Close()
	var user User
	db.Where("email = ?", email).Find(&user)
	return user
}

func UpdateUser(user User) (int64, error) {
	db := Connect()
	defer db.Close()
	rs := db.Model(&user).Where("id = ?", user.IdUser).UpdateColumns(
		map[string]interface{}{
			"usuario": user.Usuario,
			"email":   user.Email,
		},
	)
	return rs.RowsAffected, rs.Error
}
