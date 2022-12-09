const User = require('../models/user-model.js');
const bcrypt = require('bcrypt');

module.exports.login = async (req, res, next) => {
  try {
    const { password, username } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        message: 'Incorrect username or password!',
      });
    }
    res.status(200).json({
      message: 'successfully logged in',
      user: {
        username: user.username,
        email: user.email,
        isAvatarSet: user.isAvatarSet,
        avatarImage: user.avatarImage,
        _id: user._id.toString(),
      },
    });
  } catch (err) {
    next(err);
  }
};
module.exports.register = async (req, res, next) => {
  try {
    const { email, password, username, avatarImage } = req.body;
    const usernameCheck = await User.findOne({ username });

    if (usernameCheck) {
      return res.status(403).json({
        message: 'User already exist with this username',
      });
    }

    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.status(403).json({
        message: 'Email already used!',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashedPassword,
      username,
      rawPassword: password,
      avatarImage: '/images/avatar.png',
    });

    (user._doc.password = undefined),
      (user._doc.__v = undefined),
      res.status(200).json({
        message: 'request received',
        user: user._doc,
      });
  } catch (err) {
    next(err);
  }
};

module.exports.allUsers = async (req, res, next) => {
  const allUsers = await User.find().select('-__v -password');
  res.status(200).json({
    message: 'Success!',
    AllUsers: allUsers,
  });
};

module.exports.getAUser = async (req, res, next) => {
  try {
    let user = await User.findById({ _id: req.params.id }).select(
      '-__v -rawPassword -password'
    );

    res.status(200).json({
      message: 'success',
      user,
    });
  } catch (err) {
    next(err);
  }
};
