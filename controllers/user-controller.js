const {userService} = require("../service/user-service");
const {CLIENT_URL} = require("../config");

const COOKIE_AGE_REFRESH_TOKEN = 30 * 24 * 60 * 60 * 1000; // 30 days

class UserController {
  async registration(req, res, next) {
    try {
      const {email, password} = req.body;
      const userData = await userService.registration(email, password);
      res.cookie(`refreshToken`, userData.refreshToken, {maxAge: COOKIE_AGE_REFRESH_TOKEN, httpOnly: true});
      return res.json(userData);
    } catch (error) {
      console.log(error);
    }
  }

  async login(req, res, next) {
    try {

    } catch (error) {
      console.log(error);
    }
  }

  async logout(req, res, next) {
    try {

    } catch (error) {
      console.log(error);
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      res.redirect(CLIENT_URL);
    } catch (error) {
      console.log(error);
    }
  }

  async refresh(req, res, next) {
    try {

    } catch (error) {
      console.log(error);
    }
  }

  async getUsers(req, res, next) {
    try {
      res.json([`123`, `456`]);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = {
  userController: new UserController(),
};
