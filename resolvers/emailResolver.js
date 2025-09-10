const { SentEmail, ReceivedEmail } = require("../models/Email.js");
const EmailType = require("../schema/email.js");
const UserType = require("../schema/user.js");
const UserResolver = require("./userResolver.js");

const {
  GraphQLList,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
} = require("graphql");

const getAllEmails = {
  type: {
    inbox: new GraphQLList(EmailType),
    outbox: new GraphQLList(EmailType),
  },
  async resolve(parent, args, context) {
    if (!context.user) throw new Error("Not authenticated");
    const user = await UserResolver.getUserDetails(context.user.id);
    if (!user) throw new Error("User not found");
    const inbox = await ReceivedEmail.find({ recipient: context.user.id });
    const outbox = await SentEmail.find({ sender: context.user.id });
    return { inbox: inbox, outbox: outbox };
  },
};

const createEmail = {
  type: EmailType,
  args: {
    recipient: { type: GraphQLString },
    title: { type: GraphQLString },
    subject: { type: GraphQLString },
    desc: { type: GraphQLString },
  },
  async resolve(parent, args, context) {
    if (!context.user) throw new Error("Not authenticated");
    const user = await UserResolver.getUserDetails(context.user.id);
    if (!user) throw new Error("User not found");
    const sender = user;
    const recipient = await UserResolver.findUserByEmail(args.recipient);
    if (!recipient) throw new Error("Recipient email not found");
    const sendEmail = new SentEmail({
      sender: sender._id,
      recipient: recipient._id,
      title: args.title,
      subject: args.subject,
      desc: args.desc,
    });

    const receiveEmail = new ReceivedEmail({
      sender: sender._id,
      recipient: recipient._id,
      title: args.title,
      subject: args.subject,
      desc: args.desc,
    });

    await sendEmail.save();
    await receiveEmail.save();
    return receiveEmail;
  },
};

const markEmailAsRead = {
  type: EmailType,
  args: { id: { type: GraphQLID } },
  async resolve(parent, args, context) {
    if (!context.user) throw new Error("Not authenticated");
    const user = await UserResolver.getUserDetails(context.user.id);
    if (!user) throw new Error("User not found");
    const foundEmail = await ReceivedEmail.findById(args.id).populate(
      "recipient"
    );
    if (!foundEmail.recipient.id.equals(user._id))
      throw new Error("Unable to delete email due to incorrect User");
    const updatedEmail = await ReceivedEmail.findByIdAndUpdate(
      args.id,
      { read: true },
      { new: true }
    );

    return updatedEmail;
  },
};

const deleteReceivedEmail = {
  type: GraphQLBoolean,
  args: { id: { type: GraphQLID } },
  async resolve(parent, args, context) {
    if (!context.user) throw new Error("Not authenticated");
    const user = await UserResolver.getUserDetails(context.user.id);
    if (!user) throw new Error("User not found");
    const foundEmail = await ReceivedEmail.findById(args.id).populate(
      "recipient"
    );
    if (!foundEmail.recipient.id.equals(user._id))
      throw new Error("Unable to delete email due to incorrect User");
    await foundEmail.deleteOne();
    return true;
  },
};

const deleteSentEmail = {
  type: GraphQLBoolean,
  args: { id: { type: GraphQLID } },
  async resolve(parent, args, context) {
    if (!context.user) throw new Error("Not authenticated");
    const user = await UserResolver.getUserDetails(context.user.id);
    if (!user) throw new Error("User not found");
    const foundEmail = await SentEmail.findById(args.id).populate("sender");
    if (!foundEmail) throw new Error("Email not found");
    if (!foundEmail.sender.equals(user._id))
      throw new Error("Unable to delete email due to incorrect User");
    await foundEmail.deleteOne();
    return true;
  },
};

module.exports = {
  getAllEmails,
  createEmail,
  markEmailAsRead,
  deleteReceivedEmail,
  deleteSentEmail,
};
