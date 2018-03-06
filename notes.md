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