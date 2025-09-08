const { SentEmail, ReceivedEmail } = require("../models/Email.js");
const EmailType = require("../schema/email.js");
const UserType = require("../schema/user.js");
const UserResolver = require("./userResolver.js");

const { GraphQLList, GraphQLID, GraphQLString } = require("graphql");

const getAllEmails = {
  type: new GraphQLList(EmailType),
  async resolve(parent, args, context) {
    if (!context.user) throw new Error("Not authenticated");
    const user = await UserResolver.getUserDetails(context.user.id);
    if (!user) throw new Error("User not found");
    return await ReceivedEmail.find({ recipient: context.user.id });
  },
};

const createEmail = {
  type: EmailType,
  args: {
    sender: { type: GraphQLString },
    recipient: { type: GraphQLString },
    title: { type: GraphQLString },
    subject: { type: GraphQLString },
    desc: { type: GraphQLString },
  },
  async resolve(parent, args) {
    const sender = await UserResolver.findUserByEmail(args.sender);
    const recipient = await UserResolver.findUserByEmail(args.recipient);

    if (!sender) throw new Error("Sender email not found");
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
    await receiveEmail.populate([
      { path: "sender", select: "id email" },
      { path: "recipient", select: "id email" },
    ]);

    return receiveEmail;
  },
};

const markEmailAsRead = {
  type: EmailType,
  args: { id: { type: GraphQLID } },
  resolve(parent, args) {
    return (
      ReceivedEmail.findByIdAndUpdate(args.id, { read: true }), { new: true }
    );
  },
};

const deleteReceivedEmail = {
  type: EmailType,
  args: { id: { type: GraphQLID } },
  resolve(parent, args) {
    return ReceivedEmail.findByIdAndDelete(args.id);
  },
};

const deleteSentEmail = {
  type: EmailType,
  args: { id: { type: GraphQLID } },
  resolve(parent, args) {
    return SentEmail.findByIdAndDelete(args.id);
  },
};

module.exports = {
  getAllEmails,
  createEmail,
  markEmailAsRead,
  deleteReceivedEmail,
  deleteSentEmail,
};
