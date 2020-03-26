import { gql } from "apollo-server-express";

export const typeDefs = gql`
    type Query {
        getAllWords(): [Word]
        getWordsToReview(boxes: [Int!]!): [Word]
    }

    type Mutation {
        addWord(language: String!, originalWord: String!, translatedWord: String!, dateAdded: String!, dateLastSeen: String!, box: Int!): Boolean!
        deleteWord(id: Int!): Boolean!
        updateWord(id: Int!, dateLastSeen: String!, box: Int!): Boolean!
    }

    type Word {
        
    }
`;
