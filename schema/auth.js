const { GraphQLObjectType, GraphQLID, GraphQLString } = require("graphql");

const AuthType = new GraphQLObjectType({
  name: "UserToken",
  fields: () => ({
    id: { type: GraphQLID },
    token: { type: GraphQLString },
  }),
});

module.exports = AuthType;
