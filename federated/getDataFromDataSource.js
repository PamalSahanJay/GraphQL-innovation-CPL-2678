const { ApolloServer, gql } = require("apollo-server");
const EmployeeService = require("./dataSources/file");

const typeDefs = gql`
  type Query {
    employees(
      id: ID
      firstName: String
      lastName: String
      designation: String
      department: String
      nearestCity: String
    ): [Employee] 
    employeeByID(id: ID): Employee
  }

  type Employee {
    id: ID!
    firstName: String
    lastName: String
    designation: String
    department: String
    nearestCity: String
  }
`;

const dataSources = () => ({
  employeeService: new EmployeeService(),
});

const resolvers = {
  Query: {
    employees: (parent, args, { dataSources }, info) => {
      return dataSources.employeeService.getEmployees(args);
    },
    employeeByID: (parent, { id }, { dataSources }, info) => {
      return dataSources.employeeService.getEmployeeByID(id)[0];
    },
  },
};

const gqlServer = new ApolloServer({ typeDefs, resolvers, dataSources });
gqlServer
  .listen({ port: process.env.port || 4000 })
  .then(console.log("server is  started ${url} "));
