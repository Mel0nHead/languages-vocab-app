# languages-vocab-app

(Work in progress)
An app to help you learn any language through the use of flash cards. Written in TypeScript.

Stack:
Frontend: React, Material-UI, GraphQL
Backend: Express, TypeORM, MySQL

# TODO

- ADD 'TEST' ENTITY TO BACKEND

  - test entity should exist in API
  - should be a many-to-many relationship between tests and words (with custom property)
  - fields should include id, date completed, words, correct words, incorrect words

- START USING TYPE GRAPHQL FOR BACKEND
- means that you don't have to manually update schema each time you add query/mutation/entity
- docs: https://typegraphql.com/docs/introduction.html

- GET SERVER TO AUTOMTICALLY UPDATE ON SAVE
- so that I don't have to keep restarting server every time i make a change

- GET APOLLO CLIENT TO AUTOGENERATE INTERFACES

  - means that we can have types for the data and inputs of GraphQL queries/mutations

- ADD TESTS FOR API

  - need to research this as I have no idea how to do it

- REFACTOR UI
  - look for all the TODOs
  - create custom useFetch hook (with tests)
