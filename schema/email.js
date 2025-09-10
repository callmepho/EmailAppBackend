const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
} = require("graphql");

const SentEmailType = new GraphQLObjectType({
  name: "SentEmail",
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

const ReceivedEmailType = new GraphQLObjectType({
  name: "ReceivedEmailEmail",
  fields: () => ({
    id: { type: GraphQLID },
    sender: { type: GraphQLID },
    recipient: { type: GraphQLID },
    title: { type: GraphQLString },
    subject: { type: GraphQLString },
    desc: { type: GraphQLString },
    read: { type: GraphQLBoolean },
    createdAt: { type: GraphQLString },
  }),
});

const EmailCollectionType = new GraphQLObjectType({
  name: "EmailCollection",
  fields: {
    inbox: { type: new GraphQLList(ReceivedEmailType) },
    outbox: { type: new GraphQLList(SentEmailType) },
  },
});

module.exports = { SentEmailType, ReceivedEmailType, EmailCollectionType };
