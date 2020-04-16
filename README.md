# languages-vocab-app

An app to help you learn any language through the use of flash cards.

# TODO

- Migrate UI to Material-UI
- Add 'test' page
  - separate /test page
  - navigating to it starts a test of the saved words
  - refreshing the page should keep progress of test
  - navigating away from /test page will lose progress
  - should be a progress bar showing how far through the test user is (like in duo lingo) (optional as it might need api work)
  - after completing test, user should have the option to do the test again
- Add 'test' entity to back-end
  - test entity should exist in API
  - should be a many-to-many relationship between tests and words
  - fields should include id, date completed, words, correct words, incorrect words
