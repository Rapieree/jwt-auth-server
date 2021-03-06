const bcrypt = require("bcrypt");
const uuid = require("uuid");
const {mailService} = require("./mail-service");
const {UserModel} = require("../models/user-model");
const {tokenService} = require("./token-service");
const {API_URL} = require("../config");

class UserService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({email});

    if (candidate) {
      throw new Error(`Пользователь с почтовым адресом ${email} уже существует`);
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();

    const user = await UserModel.create({email, password: hashPassword, activationLink});
    await mailService.sendActivationMail(email, `${API_URL}/api/activate/${activationLink}`);

    const userData = {
      id: user._id,
      email: user.email,
      isActivated: user.isActivated,
    };
    const tokens = tokenService.generateTokens(userData);
    await tokenService.saveToken(userData.id, tokens.refreshToken);

    return {...tokens, user: userData};
  }

  async activate(activationLink) {
    const user = await UserModel.findOne({activationLink}).exec();

    if (!user) {
      throw new Error(`Некорректная ссылка для активации`);
    }

    user.isActivated = true;
    await user.save();
  }
}

module.exports = {
  userService: new UserService(),
};
