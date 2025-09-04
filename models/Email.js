const mongoose = require("mongoose");
const UserType = require("../schema/user.js");

const sentEmailSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: false,
    },
    desc: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const receivedEmailSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: false,
    },
    desc: {
      type: String,
      required: false,
    },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = {
  SentEmail: mongoose.model("SentEmail", sentEmailSchema),
  ReceivedEmail: mongoose.model("ReceivedEmail", receivedEmailSchema),
};
