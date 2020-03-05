import { GraphQLServer } from "graphql-yoga";
import gql from "graphql-tag";

import db from "./db";

const typeDefs = gql`
  type Query {
    users: [User!]!
    posts: [Post!]!
  }

  type User {
    name: String!
    email: String!
    age: Int
    id: ID!
    posts:[Post!]!
  }   


  type Post {
    title: String!
    body: String!
    id: ID!
    published: Boolean!
    author: User!
  }
`;

const resolvers = {
  Query: {
    users() {
      return db.users;
    },

    posts() {
      return db.posts;
    }
  },

  Post: {
    author(post) {
      return db.users.find(user => user.id === post.author);
    }
  },
  User: {
    posts(user) {
      return db.posts.filter(post => post.author === user.id);
    }
  }

};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => {
  console.log("The server is up!");
});
