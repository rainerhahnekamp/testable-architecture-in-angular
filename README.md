# Testable Architecture in Angular

This is the example application for the talk "Testable Architecture in Angular"
at the Reliable Web Summit.

We have an existing holidays page where users can request more informations.
There are four different user stories we want to test:

- The user is logged and we want to show just a confirmation message.
- The user is not logged, we want to redirect to sign-in
- The user is logged in but we don't have the address. Need to ask to fill-in
  the data in the profile page.
- There is some kind of error, and we like to ask the user to send an email
