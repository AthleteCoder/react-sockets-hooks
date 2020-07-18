const User = require("../models/userModel");


exports.saveUser = async (email, password) => {
    try {
        let user = new User({
            email: email,
            password: password
        });
        return await user.save();
    } catch (err) {
        throw Error('There was a problem saving User');
    }
}

exports.isEmailExists = async (email) => {
    return await User.findOne({
        email: email
    }, (err, doc) => {
        if (err) throw Error("Database Error");
        return doc ? true : false;
    })
}

exports.getUserByEmailWithPassword = async (email) => {
    try {
        const user = await User.findOne({
            email: email
        }).select('+password');
        return user;
    } catch (err) {
        throw Error("Database error");
    }
}

exports.getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({
            email: email
        });
        return user;
    } catch (err) {
        throw Error("Database error");
    }
}