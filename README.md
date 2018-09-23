# MyReads: A Book Lending App

> Venghatesh Srinivasan

## About


Application functionality
1. Searching the books using Book API and add it to the book shelf. To go to the Search page , the main page has got a + Button displayed on the right hand side bottom of the page. In the search page , user can choose to move between the three shelves (Currently Reading, Want to Read, Read). In the search page,  if a book is already in a shelf , then the book will be displayed with tick mark on the shelf. User can move between the shelves by choosing the relevant shelf. If the shelf is choose to none, then the book is removed from the shelf.
2. There are three book shelves. The first shelf is the
  a) Currently Reading
  b) Want to Read
  c) Read
  We can move the books between these shelves. This is done by using setState API which would trigger state change . If the user wants to remove the book from all the shelves, then he/she could choose the option none. This state change could be captured and based on that , the books could be moved to the relevant shelves. 

## Getting Started

1. run `git clone https://github.com/venghatesh/MyReads-Udacity.git` to clone this repository
2. `cd MyReads` then run `npm install`
3. `npm start` to start the app then navigate to http://localhost:3000/ on your local machine
