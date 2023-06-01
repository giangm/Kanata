package main

import (
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"log"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	ID       int64  `gorm:"primaryKey;autoIncrement;not null"`
	Username string `gorm:"uniqueIndex"`
	Password string
}

var db, err = gorm.Open(sqlite.Open("./database.db"), &gorm.Config{})

func init() {
	if err != nil {
		log.Fatal(err)
	}

	err = db.AutoMigrate(&User{})
	if err != nil {
		log.Fatal(err)
	}

	users := []User{
		{Username: "admin", Password: "4cab97e818b20e04b3e8530034ab018229ef6e3c090aa11d38b752e1a7e69b7c"},
		{Username: "test1", Password: "1b4f0e9851971998e732078544c96b36c3d01cedf7caa332359d6f1d83567014"},
		{Username: "test2", Password: "60303ae22b998861bce3b28f33eec1be758a213c86c93c076dbe9f558c11c752"},
	}
	for _, u := range users {
		db.Create(&u)
	}

	fmt.Println("Successfully connected to the database!")
}

func createUser(username, password string) error {
	hash := sha256.New()
	hash.Write([]byte(password))
	user := User{
		Username: username,
		Password: hex.EncodeToString(hash.Sum(nil)),
	}

	result := db.Create(&user)

	return result.Error
}

func userExists(username string) bool {
	var user User
	var count int64
	db.Find(&user, "username = ?", username).Count(&count)

	return count != 0
}

func checkUser(username, password string) bool {
	var user User
	result := db.First(&user, "username = ?", username)

	if result.Error != nil {
		return false
	}

	hash := sha256.New()
	hash.Write([]byte(password))

	return user.Password == hex.EncodeToString(hash.Sum(nil))
}

func updatePassword(id, newPassword string) error {
	var user User
	result := db.First(&user, "id = ?", id)

	if result.Error != nil {
		return result.Error
	}

	hash := sha256.New()
	hash.Write([]byte(newPassword))
	user.Password = hex.EncodeToString(hash.Sum(nil))

	result = db.Save(&user)

	return result.Error
}
