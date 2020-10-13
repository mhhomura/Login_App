package models

func AutoMigrations() {
	db := Connect()
	defer db.Close()
	db.Debug().DropTableIfExists(&User{})
	db.Debug().AutoMigrate(&User{})

}
