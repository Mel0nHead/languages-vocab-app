# languages-vocab-app

An app to help you learn any language through the use of flash cards. Written in TypeScript.

Stack:
Frontend: React, Material-UI, GraphQL
Backend: Express, TypeORM, MySQL

# TODO

- ADD UNIT/INTEGRATION TESTS FOR UI

  - probably just use jest and react-testing-library

- ADD 'TEST' ENTITY TO BACKEND

  - test entity should exist in API
  - should be a many-to-many relationship between tests and words
  - fields should include id, date completed, words, correct words, incorrect words

- GET APOLLO CLIENT TO AUTOGENERATE INTERFACES

  - means that we can have types for the data and inputs of GraphQL queries/mutations

- ADD TESTS FOR API
