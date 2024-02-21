import { v4 } from "uuid";

let users = [];

export const userMemStore = {
  async getAllUsers() {
    return users;
  },

  async addUser(user) {
    user._id = v4();
    users.push(user);
    return user;
  },

  async getUserById(id) {
    let user =  users.find((user) => user._id === id);
    if (user == undefined) {
      user = null;
    }
    return user;
  },

  async getUserByEmail(email) {
    let user = users.find((user) => user.email === email);
    if (user == undefined) {
      user = null;
    }
    return user;
  },

  async deleteUserById(id) {
    const index = users.findIndex((user) => user._id === id);
    if (index != -1) users.splice(index, 1);
  },

  async deleteAll() {
    users = [];
  },
};
