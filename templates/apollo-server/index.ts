import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    hello: String!
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello Typescript!",
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function main() {
  const { port } = await server.listen();
  console.log(`Server running on http://localhost:${port}/`);
}

main();
