const personQueries = require("../database/personQueries");

export const typeDefs = `
  type Person {
    personid: ID!
    first_name: String!
    last_name: String!
    address_street: String!
    address_city: String!
    address_state: String!
    address_zip: String!
  }
  
  type PageInfo {
    lastPersonId: String
    hasNextPage: Boolean
  }
  
  type Response {
    searchResults: [Person]
    pageInfo: PageInfo
  }

  type Query {
    searchPeople(query: String!, lastPersonId: String): Response!
  }
`;

export const resolvers = {
  Query: {
    searchPeople: (parent, args, context, info) => {
      let { query, lastPersonId } = JSON.parse(JSON.stringify(args))
      return personQueries.searchPeople(query, lastPersonId)
    }
  }
};
