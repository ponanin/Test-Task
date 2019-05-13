# Test Task

# The task was completed with Angular 6
## Stack
- Typescript
- Scss
- IndexedDB

## Notes
- Since the task did not specify the preferred method of data storage, it was decided to use IndexedDB.
  Also, it is possible to write a simple rest crud server on node.js or php.
- IE/Edge not supported

### List of possible improves
- Universal error handling and output them via some notification service
- Work with IndexedDB using rxjs
- Modal/Dialog service

## Description

# Develop *Angular* app

## Event timeline

This is a list of events of different types, with the ability to sort by date and type of event.

Implement adding events to the list and displaying this list. For a financial transaction realize the ability to remove from the list, for the news the possibility to mark that we have read the news.

### Financial transaction:
- Sum
- Currency
- Source
- Description
- Income or expense
- Date
- Type

> The financial transaction in the list displays the income or expense (highlighted with a color and a + - sign), amount, currency, date, and source of the transaction.
  
> When clicking on an event, we open detailed information, either go to a separate route within your application, or open it nicely on the same page where there is a description and a “Delete” button.

### News:
- Title
- Content
- Date
- Type

> The news in the list displays only the title.

> When clicking on an event, open the detailed tab, where there is a description and the “Acquainted” button, after clicking “Acquainted”, highlight with color.

# Required:
- Do not use third-party technologies

### The project must be supported and extensible. For example, if you have to add another event so that you do not have to rewrite all the code to add a new event.
