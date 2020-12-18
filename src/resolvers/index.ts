import { User } from "../entity/user";

// Provide resolver functions for your schema fields
export const resolvers = {
  //* this is the Query typeDef that you see in the typedefs/index and it has a method called getUser like you see in typeDefs/index
  Query: {
    //* getUser is an async becuase you only want to run it when it is called 
    //* the method getUser has 4 types of methods in GraphQL (parent, args, context, and info)
    getUser: async (_: any, args: any) => {
      //* the args can be destructured - in this case the only args there are in the getUser method is id
      const { id } = args;

      //* you can now callt the User typdef and findOne (being a BaseEntity method) and pass in arguments
      //* the argument in this case is { where: { id: id }}
      //* this means itll find a User where the id field is equal to the id you have used in the param when you called the method getUser
      return await User.findOne({ where: { id: id } });
    }
  },
  //*this is the Mutation typeDef you see in the rypeDef/index at is has a method called addUser like you see int eh typeDef/index
  Mutation: {
    //* addUsrer is asyncronous because you only want it run when you call it
    //* any method has those 4 arg tpyes still (parent, args, context, info)
    addUser: async (_: any, args: any) => {
      //* destructed firstName, lasName, and age from args
      const { firstName, lastName, age } = args;
      //* try catch block to catch erros (bascially a debugger) for the user and developer in one
      try {
        //* creates a const and calls the method create on the model User that passes in the args firstName, lastName, age
        const user = User.create({
          firstName,
          lastName,
          age
        });

        //* calls that const user and saves it to the db by calling the save() method found in the BaseEntity class
        await user.save();

        //* if you look in the typedefs/index then you will see there is a return type of boolean and this is where we see the return type!
        //* you could change the return type to the typedef you are calling (User) so you can see what was entered into the db.
        return true;

        //* if there is an error the try catch bloxk will return false!
      } catch (error) {
        return false;
      }
    }
  }
};