# languages-vocab-app

An app to help you learn any language through the use of flash cards. Written in TypeScript.

Stack:
Frontend: React, Material-UI, GraphQL
Backend: Express, TypeORM, MySQL

# TODO

- Feature: ADD 'TEST RESULT' ENTITY TO BACKEND

  - test entity should exist in API
  - should be a many-to-many relationship between tests and words
  - fields should include id (should this be completely unique or just unique amongst other tests?),date started, date completed (could be null), correct words, incorrect words, isFinished
  - mutations: createTestResult (when test is first started?), updateTestResult (when you answer a question), finishTestResult (once the test is completed)
  - queries: getAllTestResults (sorted by most recent date completed)

- GET APOLLO CLIENT TO AUTOGENERATE INTERFACES

  - means that we can have types for the data and inputs of GraphQL queries/mutations

- ADD TESTS FOR API

  - need to research this as I have no idea how to do it

- REFACTOR UI

  - look for all the TODOs
  - create custom useFetch hook (with tests)

- ADD AUTHENTICATION
