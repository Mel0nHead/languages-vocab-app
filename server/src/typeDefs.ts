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

  type WordConnection {
    edges: [Word]!
    pageInfo: PageInfo!
  }

  type Query {
    getAllWords: WordConnection!
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
