const User = require("../models/User");
const UserType = require("../schema/user");
const { GraphQLList, GraphQLID, GraphQLString } = require("graphql");

const getAllUsers = {
  type: new GraphQLList(UserType),
  resolve(parent, args) {
    return User.find();
  },
};

const createUser = {
  type: UserType,
  args: {
    email: { type: GraphQLString },
  },
  resolve(parent, args) {
    const user = new User({
      email: args.email,
    });
    return user.save();
  },
};

async function findUserByEmail(email) {
  return await User.findOne({ email });
}

const deleteUser = {
  type: UserType,
  args: { id: { type: GraphQLID } },
  resolve(parent, args) {
    return User.findByIdAndDelete(args.id);
  },
};

module.exports = { getAllUsers, createUser, findUserByEmail, deleteUser };
