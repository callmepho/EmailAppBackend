const User = require("../models/User");
const UserType = require("../schema/user");
const AuthType = require("../schema/auth");
const bcrypt = require("bcrypt");
const { GraphQLList, GraphQLID, GraphQLString } = require("graphql");
const jwt = require("jsonwebtoken");

// const getAllUsers = {
//   type: new GraphQLList(UserType),
//   resolve() {
//     return User.find();
//   },
// };

const createUser = {
  type: UserType,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent, args) {
    const salt = await bcrypt.genSalt(+process.env.SALT_ROUNDS);
    const encryptedPassword = await bcrypt.hash(args.password, salt);
    const user = new User({
      email: args.email,
      password: encryptedPassword,
    });
    return user.save();
  },
};

const loginUser = {
  type: AuthType,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent, args) {
    const foundUser = await findUserByEmail(args.email);
    if (!foundUser) throw new Error("Login with email not found");
    if (!(await bcrypt.compare(args.password, foundUser.password)))
      throw new Error("Invalid password");
    return {
      id: foundUser.id,
      token: jwt.sign(
        { id: foundUser.id, email: foundUser.email },
        process.env.JWT_SECRET,
        { expiresIn: 60 * 60 }
      ),
    };
  },
};

const getUserDetails = async (id) => {
  try {
    let foundUser = await User.findById(id);
    if (!foundUser) throw new Error("User id not found");
    return foundUser;
  } catch (err) {
    throw new Error("Error while retrieving User from id");
  }
};

const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const deleteUser = {
  type: UserType,
  args: { id: { type: GraphQLID } },
  resolve(parent, args) {
    return User.findByIdAndDelete(args.id);
  },
};

module.exports = {
  createUser,
  findUserByEmail,
  deleteUser,
  loginUser,
  getUserDetails,
};
