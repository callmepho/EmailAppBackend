const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const {
  getAllEmails,
  createEmail,
  markEmailAsRead,
  deleteReceivedEmail,
  deleteSentEmail,
} = require("../resolvers/emailResolver");
const {
  getAllUsers,
  createUser,
  deleteUser,
} = require("../resolvers/userResolver");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    users: getAllUsers,
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
