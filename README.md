# languages-vocab-app

An app to help you learn any language through the use of flash cards. Written in TypeScript.

Stack:
Frontend: React, Material-UI, GraphQL
Backend: Express, TypeORM, MySQL, Type-GraphQL

# TODO

- ALLOW FOR BATCH OPERATIONS IN API

  - maybe use some sort of data loader (look at Ben Awad's YT for inspiration)

- ENCRYPT USER PASSWORDS

  - currently stored as plain text
  - currently sent from client to api in plaintext

- ADD FOREIGN KEYS TO WORD AND TEST ENTITIES

  - e.g. add 'userId' field to Word, so that you can query all words for a particular user without having to fetch the User first

- ADD INTEGRATION TESTS FOR API
  - currently have no test coverage
