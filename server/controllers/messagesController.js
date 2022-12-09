const messageModel = require('../models/messageModel');

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await messageModel.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (!data) {
      return res.status(500).json({
        message: 'Failed to save data to data base',
      });
    }
    return res.status(201).json({
      message: 'Message saved successfully to database',
    });
  } catch (err) {
    next(err);
  }
};
module.exports.getAllMessage = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await messageModel
      .find({
        users: {
          $all: [from, to],
        },
      })
      .sort({ updatedAt: 1 });

    const projectedMessages = messages.map((message) => {
      return {
        fromSelf: message.sender.toString() === from,
        message: message.message.text,
      };
    });

    res.status(200).json({
      allMessages: projectedMessages,
    });
  } catch (err) {
    next(err);
  }
};
