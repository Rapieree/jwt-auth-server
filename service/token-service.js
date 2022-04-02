const jwt = require("jsonwebtoken");
const {JWT_ACCESS_KEY, JWT_REFRESH_KEY} = require("../config");
const tokenModel = require("../models/token-model");

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, JWT_ACCESS_KEY, {expiresIn: `30m`});
    const refreshToken = jwt.sign(payload, JWT_REFRESH_KEY, {expiresIn: `30d`});

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await tokenModel.findOne({user: userId}).exec();

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }

    const token = await tokenModel.create({user: userId, refreshToken});

    return token;
  }
}

module.exports = new TokenService();
