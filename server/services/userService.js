const User = require("../models/userModel");
const bcryptUtil = require('../utils/bcryptUtil');
const jwtUtil = require("../utils/jwtUtil");
const userUtil = require("../utils/userUtil");

exports.registerNewUser = async (password, email) => {

    const emailExists = await userUtil.isEmailExists(email);

    if (emailExists) throw Error("Email already exists!");

    const hashedPass = await bcryptUtil.createHash(password);

    const returnedUser = await userUtil.saveUser(email, hashedPass);

    return returnedUser;
}

exports.loginUser = async (password, email) => {
    const user = await userUtil.getUserByEmailWithPassword(email);
    if (!user) throw Error("Email or password do not match!");
    const isPasswordsValid = await bcryptUtil.compareHashString(password, user.password);
    if (!isPasswordsValid) throw Error("Email or password do not match!");
    const token = jwtUtil.createToken({
        id: user.id,
        email: user.email,
        rule: user.rule
    });
    return token;
}

exports.getUserFromToken = async (email) => {
    const user = await userUtil.getUserByEmail(email);
    if (!user) throw Error("User not found!");
    return user;
}

exports.playerWonTicTacToe = async (playerId) => {
    await userUtil.raiseWonTicTacToe(playerId);
}

exports.playerLostTicTacToe = async (playerId) => {
    await userUtil.raiseLostTicTacToe(playerId);
}