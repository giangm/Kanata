package main

import (
	"fmt"
	"math/rand"
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	ID       int64  `gorm:"primaryKey;autoIncrement;not null"`
	Username string `gorm:"uniqueIndex"`
	Password string
	Email    string
}

type SystemInfo struct {
	IP            string
	Hostname      string
	OS            string
	Processor     string
	Memory        string
	DiskSpace     string
	LastBootTime  time.Time
	LoggedInUsers int
}

func setup() {
	db.AutoMigrate(&User{}, &SystemInfo{})

	db.Exec("DELETE FROM users WHERE 1=1")
	db.Exec("DELETE FROM system_infos WHERE 1=1")

	users := []User{
		{Username: "test1", Password: "634b027b1b69e1242d40d53e312b3b4ac7710f55be81f289b549446ef6778bee"},
		{Username: "test2", Password: "7d6fd7774f0d87624da6dcf16d0d3d104c3191e771fbe2f39c86aed4b2bf1a0f"},
	}
	for _, u := range users {
		db.Create(&u)
	}

	systeminfos := []SystemInfo{
		{
			IP:            "127.0.0.1",
			Hostname:      "abc",
			OS:            "Windows 98",
			Processor:     "AMD i90",
			Memory:        "2GB",
			DiskSpace:     "500GB",
			LastBootTime:  time.Now(),
			LoggedInUsers: rand.Intn(7),
		},
		{
			IP:            "127.0.0.2",
			Hostname:      "ghi",
			OS:            "MacOS",
			Processor:     "Apple Proprietary",
			Memory:        "16GB",
			DiskSpace:     "500GB",
			LastBootTime:  time.Now(),
			LoggedInUsers: rand.Intn(7),
		},
		{
			IP:            "127.0.0.3",
			Hostname:      "xyz",
			OS:            "Linux",
			Processor:     "Intel i7",
			Memory:        "4GB",
			DiskSpace:     "250GB",
			LastBootTime:  time.Now(),
			LoggedInUsers: rand.Intn(7),
		},
	}
	for _, i := range systeminfos {
		db.Create(&i)
	}
}

func createUser(username, password string) error {
	user := User{
		Username: username,
		Password: password,
	}

	result := db.Create(&user)

	return result.Error
}

func userExists(username, password string) (bool, error) {
	var user User
	result := db.First(&user, "username = ?", username)

	if result.Error != nil {
		return false, result.Error
	}

	if user.Password == hash(password) {
		return true, nil
	}

	return false, nil
}

func updateUsername(u string, newUsername string) error {
	var user User
	db.First(&user, "username = ?", u)

	user.Username = newUsername
	result := db.Save(&user)

	return result.Error
}

func updateUserPassword(u string, newPassword string) error {
	var user User
	db.First(&user, "username = ?", u)

	user.Password = newPassword
	result := db.Save(&user)

	return result.Error
}

func deleteUser(u string) error {
	var user User
	db.First(&user, "username = ?", u)

	result := db.Delete(&user)

	return result.Error
}

func getAllUsers() {
	var users []User
	db.Find(&users)

	for _, user := range users {
		fmt.Println(user.Username)
	}
}

func getSystemInfoByID(id uint) (SystemInfo, error) {
	var systemInfo SystemInfo
	result := db.First(&systemInfo, id)
	if result.Error != nil {
		return systemInfo, result.Error
	}
	return systemInfo, nil
}

func updateSystemInfo(systemInfo SystemInfo) error {
	result := db.Save(&systemInfo)
	return result.Error
}

func deleteSystemInfoByID(id uint) error {
	result := db.Delete(&SystemInfo{}, id)
	return result.Error
}

func getIP() (string, error) {
	var systemInfo SystemInfo
	result := db.First(&systemInfo)
	if result.Error != nil {
		return "", result.Error
	}
	return systemInfo.IP, nil
}
