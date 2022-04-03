const bcrypt = require("bcrypt");
const uuid = require("uuid");
const {mailService} = require("./mail-service");
const {UserModel} = require("../models/user-model");
const {tokenService} = require("./token-service");

class UserService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({email});

    if (candidate) {
      throw new Error(`Пользователь с почтовым адресом ${email} уже существует`);
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();

    const user = await UserModel.create({email, hashPassword, activationLink});
    await mailService.sendActivationMail(email, activationLink);

    const userData = {
      id: user._id,
      email: user.email,
      isActivated: user.isActivated,
    };
    const tokens = tokenService.generateTokens(userData);
    await tokenService.saveToken(userData.id, tokens.refreshToken);

    return {...tokens, user: userData};
  }
}

module.exports = {
  userService: new UserService(),
};
