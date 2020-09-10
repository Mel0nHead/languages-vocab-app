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
    testResults: [TestResult]!
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

  type TestResult {
    id: Int!
    dateStarted: Date!
    dateCompleted: Date
    words: [Word]!
  }

  type Query {
    getAllWords(
      first: Int
      last: Int
      after: String
      before: String
    ): WordConnection!
    getWordsToReview(boxes: [Int!]!): [Word]
    getAllTestResults: [TestResult]!
  }

  type Mutation {
    # For words
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
    # For test results
    createTestResult: TestResult!
    updateTestResult(testResultId: Int!, wordId: Int!): TestResult!
    finishTestResult(testResultId: Int!): TestResult!
  }
`;
