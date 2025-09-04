const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
} = require("graphql");

const UserType = require("./user");

const EmailType = new GraphQLObjectType({
  name: "Email",
  fields: () => ({
    id: { type: GraphQLID },
    sender: { type: UserType },
    recipient: { type: UserType },
    title: { type: GraphQLString },
    subject: { type: GraphQLString },
    desc: { type: GraphQLString },
    createdAt: { type: GraphQLString },
  }),
});

module.exports = EmailType;
