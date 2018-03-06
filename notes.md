Theory for relational databases

Database

    - Tables: (Collection) data goes here
        - Row: (Document)a record in the table
            - Column: (Field) a property of each record

Application -> objects
Database    -> relations
Connect one table to another - references in Mongo
References -> Foreign Keys

Connect from Node.
- raw driver (connector). SQL Injection
- query builder - what we will be using KNEX.js - sits on top of raw driver but uses API that is uniform and does not change from server to server
- ORM = Object Relational Mapper. 
    Should research this. 
        - Bookshelf.JS sits on top of KNEX.js -Sequelize *research if you want to do relational research
        - Objection.js

Establish knex file and then connect knex file to a database with db.js

knex init
knex migrate: make <name>
knex migrate: latest
knex seed:make
knex seed:run

[Database Server] < --- > [API Server] < --- > [Web Server (React App)] < --- > [Client(Browser)]

MySQL || MongoDB     Node API       create-react-app dev server

Linux
Apache
MySQL
PHP

Workflow:
> Create Database
> Create Tables
    > Indexes, Rows, Columns, Relationships
> Configure Schemas for all of the tables
    > Problem Domain : i.e. Accounting, Facebook, everything has a different context.
> Alter Data Model

Express.js Node Review

> Middleware 
> Routing (sub application needs to belong to main app - still can use middleware and routing)

Python has become number 1 language and require how to build back end with Python and Javascript - another framework known as Django & SQL introduced there

Single Responsibility Principle

Folder structure
by type (controllers, routers, models)
by feature (zoos, bears, users, database, products)

