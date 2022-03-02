const {makeExecutableSchema} = require("graphql-tools");
const {typeDefs, resolvers} = require("./personFetcher");

module.exports = makeExecutableSchema({typeDefs, resolvers});
