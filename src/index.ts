import "reflect-metadata";
import { createConnection } from "typeorm";
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';


//!In order to connect to DB - had to:
//* Execute the following query in MYSQL Workbench
//* ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'
//* Where root as your user localhost as your URL and password as your password
//* Then run this query to refresh privileges:
//* flush privileges;
//* Try connecting using node after you do so.
//* If that doesn't work, try it without @'localhost' part. 

const main = async () => {
  //* Sets up the ApolloServer which you use GraphQL with in order to view your queries and mutations easier
  const server = new ApolloServer({ typeDefs, resolvers });

  //* creates a constant called app which is really just an express server
  const app = express();

  //* calls the createConnection which connects to the database that you set up in the ormconfig.env file
  await createConnection().then(() => {
    console.log("Database Connected!");
  }).catch(error => console.log(error));

  //* takes the const server that is really just the instance of ApolloServer and applies a middleware of the app server
  //* this allows the ApolloServer to react with the express server which is connected to the db, allowing the ApolloServer to connect to the db
  server.applyMiddleware({ app });

  //* express server is listening and working off of the port 4000 in this case
  //* the server.graphqlPath is the extension you would enter if you want to access the graphQL playground to work with queries and mutations
  app.listen(4000, () => {
    console.log(`Server is located at https://localhost:4000${server.graphqlPath}`);
  });
}

//* calls the functions main which runs this entire process. 
main();



