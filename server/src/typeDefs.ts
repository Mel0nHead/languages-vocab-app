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
    testToWords: [TestToWord]!
  }

  type TestToWord {
    wordId: Int!
    testId: Int!
    isWordCorrect: Boolean!
    word: Word!
    test: Test!
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

  type Test {
    id: Int!
    dateStarted: Date!
    dateCompleted: Date
    testToWords: [TestToWord]!
  }

  type Query {
    getAllWords(
      first: Int
      last: Int
      after: String
      before: String
    ): WordConnection!
    getWordsToReview(boxes: [Int!]!): [Word]
    getAllTests: [Test]!
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
    createTest: Test!
    updateTest(testId: Int!, wordId: Int!, isWordCorrect: Boolean!): Test!
  }
`;
