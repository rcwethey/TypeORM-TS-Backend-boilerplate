import { gql } from 'apollo-server-express'

export const typeDefs = gql`

  //* type Query has "methods"
  //* this one for example has "getUser" with a param id of an Int and it will return the User model by the id you searched
  type Query{
    getUser(id: Int): User
  }

  //* type Mutation has "methods"
  //* this one for example has "addUser" with params of firstname, lastName, and age with tpyes of string, string, and int respectfully
  //* this method has a return type of Boolean, and if all the params and types meet the 
  //* the '!' means that the type and param is required
  type Mutation{
    addUser(firstName: string!, lastName: string!, age: Int!): Boolean!
  }

  //* this is the type of User
  //* this type has fields id, firstName, lastName, and age
  //* these fields have types like int, string, etc.
  //* the '!' at the end means it is required and need to be entered in order to be added correctly in a mutation
  //* a '?' would be optional
  type User{
    id: Int!
    firstName: string!
    lastName: string!
    age: Int!
  }
`;