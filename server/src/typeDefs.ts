import { gql } from "apollo-server-express";

export const typeDefs = gql`
  scalar Date

  type PageInfo {
    hasPreviousPage: Boolean!
    hasNextPage: Boolean!
  }

  type Word {
    id: Int!
    language: String!
    originalWord: String!
    translatedWord: String!
    dateLastSeen: Date!
    dateAdded: Date!
    box: Int!
  }

  type WordEdge {
    node: Word!
    cursor: String!
  }

  type WordConnection {
    totalCount: Int!
    edges: [WordEdge]!
    pageInfo: PageInfo!
  }

  type Query {
    getAllWords(
      first: Int
      last: Int
      after: String
      before: String
    ): WordConnection!
    getWordsToReview(boxes: [Int!]!): [Word]
  }

  type Mutation {
    addWord(
      language: String!
      originalWord: String!
      translatedWord: String!
      dateAdded: Date!
      dateLastSeen: Date!
      box: Int!
    ): Boolean!
    deleteWord(id: Int!): Boolean!
    updateWord(id: Int!, dateLastSeen: Date!, box: Int!): Boolean!
  }
`;
