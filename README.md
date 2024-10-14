# Didomi Backend Code Challenge

## Requirements


The API you are building supports CRUD operations on user and event entities with the following rules:

A user can have multiple events that, when applied in the order of their creation, will generate the current user consent status.
A user accepts only one required field (email) that must be a valid email address and unique. If any of the requirements are not satisfied, the API must return a 422 response.
Consent IDs can be one of the following: email_notifications or sms_notifications.
Consent change events can only be read and created, not update or deleted.
A consent change event belongs to a single user.
To keep the challenge as short as possible the mandatory routes and methods are the following:

/users [GET, POST, DELETE]

/events [POST]

## Configure

On workspaces copy .env.local.example to .env.local

## How to run?

`$ sudo docker-compose up -d --build`


## Commands

`$ yarn install`

`$ yarn test`

`$ yarn migration:run`

`$ yarn dev`

## Services

http://localhost:3000/docs#/ -> CRUD API

http://localhost:3001/docs#/ -> EVENTS API