# What Should I Make?

An app that allows you to write some encouragement for others and in exchange you receive a note from others. 

## Motivation

I tend to just buy what is on sale from the supermarket, so sometime I ends up with ingredients I don't really know what to do with. Now I can find new recipes for myself and try them!

## Screenshots
Examples:

![Example](./ScreenshotHomepage.png)

![Example](./ScreenshotUserpage.png)

## Features

* Log and update what is in your fridge
* select combinaions of ingredients and perform recipes search
* filter result with different filters 

## Demo

- [Live Demo](https://what-should-i-make-client.vercel.app/)

# Express Server!

This is the server repo for the app

## Installing
Install the dependencies and devDependencies and start the server.

```
npm install
```
## API endpoint

- [Link](https://tranquil-citadel-21990.herokuapp.com)

## Schema

### User

```js
{"id":"2000effb-903f-4a57-9c02-b91ba825b509","username":"testa","email":"test1@test.com","serialid":1}
```

### Note

```js
{"id":3,"content":"you got this!","liked":2,"user_id":1}
```
## API Overview

```text
/
.
├── /users
│   └── GET
│   └── GET /:id
│   └── POST
│ 
├── /notes
│   └── GET
│   └── GET /:id    
│   └── Post
│   └── Patch /:id
│   └── Delete /:id
│    
```
### GET `/users/:id` or `/notes/:id`

```js
// req.params
{
  id: ID
}
```
### POST `/users`

```js
// req.body
{
  email: String,
  username: String
}

// res.body
{
  id: uuid,
  email: String,
  username: String,
  serialid: integer
}
```
### POST `/notes`

```js
// req.body
{
  content: String,
  user_id: Integer,
  Liked: Integer
}

// res.body
{
  id: uuid,
  content: String,
  user_id: Integer,
  Liked: Integer
}
```
## Built With

* HTML
* CSS
* Postgres
* Express
* React
* Node

## Author

* **Haoxian Zhang** 