# languages-vocab-app

An app to help you learn any language through the use of flash cards. Written in TypeScript.

Stack:
Frontend: React, Material-UI, GraphQL
Backend: Express, TypeORM, MySQL

# TODO

- GET APOLLO CLIENT TO AUTOGENERATE INTERFACES

  - means that we can have types for the data and inputs of GraphQL queries/mutations

- ADD USERS AND THE ABILITY TO LOGIN

  - should be able to create a user
  - user should have username and password to log in

- ADD 'TEST' ENTITY TO BACKEND

  - test entity should exist in API
  - should be a many-to-many relationship between tests and words (with custom properties)

- ADD TESTS FOR API

  - need to research this as I have no idea how to do it

- REFACTOR UI

  - look for all the TODOs
  - create custom useFetch hook (with tests)
