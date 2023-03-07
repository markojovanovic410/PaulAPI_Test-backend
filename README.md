# Block Trades Data Store

In this project, CME Group's block trade data is collected and stored in a SQL database. Daily updated data can be stored in a SQL database by visiting the URL every day.
## Preliminaries

### Backend
- In the .env.sample file, you need to change the database hostname, port, username, password and database name.
Here you can also change the host sever's port.
    ~~~
    DATABASE_HOST = localhost
    DATABASE_PORT = 3306
    DATABASE_USER = root
    DATABASE_PASSWORD = 
    DATABASE_NAME = cme_blocks
    ~~~
- After set the environment variables, then rename .env.sample file as .env .
- Install node modules

    Run this command in the project folder.
    ```
    npm install
    ```
- Install knex globally.

    knex is the node module that connects and operates mysql.

    ```
    npm i -g knex
    ```

- Create 'cme_blocks' table in the database.

    You can easily create a table with this command.

    ```
    npm run db:migrate
    ```

    
    In some case, an error like 'knex.ps1 cannot be loaded because runnig script is disabled on this system' will be occured.
    Then you can fix this error, running this command.

    ```
    Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
    ```
#### Frontend

- Install Node module.

    ```
    cd frontend 
    npm install
    ```
## Execute

- Start Backend and Frontend in the sequel.

    - Start Backend
        ```
        npm start
        ```
        Then you can see this text in the command prompt 

        'Server is running on port 5000'

    - Start Frontend
        ```
        cd frontend 
        npm start
        ```
    

- In the Web Brower,  go to this url.
http://localhost:3000/

    Click 'Collect Data' Button. 
    

    
    Here, the trade data for the current date is inserted into the SQL database.

## More

If you want to drop table, then you need to drop knex_migrations and knex_migrations_lock tables also.
These two tables are created automatically, when you run  the command.

```
npm run db:migrate
```

After drop all these tables, then you can create new table again with command above.