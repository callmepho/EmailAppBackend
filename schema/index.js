const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const UserType = require("./user");
const User = require("../models/User");
const {
  createEmail,
  markEmailAsRead,
  deleteReceivedEmail,
  deleteSentEmail,
  getAllEmails,
} = require("../resolvers/emailResolver");
const {
  createUser,
  deleteUser,
  loginUser,
} = require("../resolvers/userResolver");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    currentUser: {
      type: UserType,
      resolve: async (_, args, context) => {
        if (!context.user) throw new Error("Not authenticated");
        const user = await User.findById(context.user.id);
        if (!user) throw new Error("User not found");
        return user;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createEmail,
    markEmailAsRead,
    deleteReceivedEmail,
    deleteSentEmail,
    createUser,
    deleteUser,
    loginUser,
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
