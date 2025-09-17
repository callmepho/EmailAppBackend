const { GraphQLObjectType, GraphQLSchema } = require("graphql");
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
  currentUser,
} = require("../resolvers/userResolver");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    currentUser,
    loginUser,
    getAllEmails,
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
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
