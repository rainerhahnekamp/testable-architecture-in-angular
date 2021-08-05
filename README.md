# Testable Architecture in Angular

This is the example application for the talk "Testable Architecture in Angular"
at the Reliable Web Summit.

There is a holidays `localhost:4200`/holidays` page where users can enter their
address and a brochure (virtually) is sent to them. There are two main user
stories we want to test:

1. If we open the holidays page, the holidays are listed in the form of an
   material card layout.
2. If we enter a valid address, a snackBar shows a confirmation message.

These tests are done in different variations. They can be found
in `/apps/eternal/src/app/holidays/holidays/test`.
