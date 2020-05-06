# languages-vocab-app

An app to help you learn any language through the use of flash cards. Written in TypeScript.

Stack:
Frontend: React, Material-UI, GraphQL
Backend: Express, TypeORM, MySQL

# TODO

- ADD 'TEST' PAGE

  - separate /test page
  - navigating to it starts a test of the saved words
  - refreshing the page should keep progress of test
  - navigating away from /test page will lose progress
  - should be a progress bar showing how far through the test user is (like in duo lingo) (optional as it might need api work)
  - after completing test, user should have the option to do the test again
  - should show score at the end of the test

- ADD UNIT/INTEGRATION TESTS FOR UI

  - probably just use jest and react-testing-library

- ADD 'TEST' ENTITY TO BACKEND

  - test entity should exist in API
  - should be a many-to-many relationship between tests and words
  - fields should include id, date completed, words, correct words, incorrect words

- GET APOLLO CLIENT TO AUTOGENERATE INTERFACES
  - means that we can have types for the data and inputs of GraphQL queries/mutations
