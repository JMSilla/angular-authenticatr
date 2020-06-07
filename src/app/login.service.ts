import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';

const USER_PASSWORDS = {
  "user1": "B3DAA77B4C04A9551B8781D03191FE098F325E67",
  "user2": "A1881C06EEC96DB9901C7BBFE41C42A3F08E9CB4"
};

const USER_STORAGE_KEY: string = "LOGGED_USER";

class LoggedUsers {
  getLoggedUser(): string {
    return localStorage.getItem(USER_STORAGE_KEY);
  }

  isLoggedIn(): boolean {
    if (this.getLoggedUser())
      return true;

    return false;
  }

  addUser(username: string) {
    localStorage.setItem(USER_STORAGE_KEY, username);
  }

  removeLoggedUser() {
    localStorage.removeItem(USER_STORAGE_KEY);
  }
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loggedUsers = new LoggedUsers();

  login(username: string, password: string) {
    let userPasswordHash = USER_PASSWORDS[username];

    if (!userPasswordHash)
      return false;

    userPasswordHash = userPasswordHash.toUpperCase();
    let passwordHash = CryptoJS.SHA1(password).toString().toUpperCase();
    
    console.log(passwordHash);

    let passwordOk = passwordHash === userPasswordHash;

    if (passwordOk) {
      this.loggedUsers.removeLoggedUser();
      this.loggedUsers.addUser(username);
    }
    
    return passwordOk;
  }

  loggedUser() {
    return this.loggedUsers.getLoggedUser();
  }

  isLoggedIn() {
    return this.loggedUsers.isLoggedIn();
  }

  logout() {
    this.loggedUsers.removeLoggedUser();
  }
}
