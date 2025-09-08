const { GraphQLObjectType, GraphQLID, GraphQLString } = require("graphql");

const EmailType = new GraphQLObjectType({
  name: "Email",
  fields: () => ({
    id: { type: GraphQLID },
    sender: { type: GraphQLID },
    recipient: { type: GraphQLID },
    title: { type: GraphQLString },
    subject: { type: GraphQLString },
    desc: { type: GraphQLString },
    createdAt: { type: GraphQLString },
  }),
});

module.exports = EmailType;
