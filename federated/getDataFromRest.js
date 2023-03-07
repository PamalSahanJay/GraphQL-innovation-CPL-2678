const { ApolloServer, gql } = require("apollo-server");
const ProjectService = require("./dataSources/project");
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
    projects: [Project]
    getProjectById: Project
  }

  type Employee {
    id: ID!
    firstName: String
    lastName: String
    designation: String
    department: String
    nearestCity: String
  }
  type Project {
    id: ID!
    projectName: String
    startDate: String
    client: String
    employees: [Int]
  }
`;

const dataSources = () => ({
  employeeService: new EmployeeService(),
  projectService: new ProjectService(),
});

const resolvers = {
  Query: {
    employees: (parent, args, { dataSources }, info) => {
      return dataSources.employeeService.getEmployees(args);
    },
    employeeByID: (parent, { id }, { dataSources }, info) => {
      return dataSources.employeeService.getEmployeeByID(id)[0];
    },
    projects: (parent, argsOne, { dataSources }, info) => {
      return dataSources.projectService.getProjects();
    },
    getProjectById: (parent, { id }, { dataSources }, info) => {
      return dataSources.projectService.getProjectById(id)[0];
    },
  },
};

const gqlServer = new ApolloServer({ typeDefs, resolvers, dataSources });
gqlServer
  .listen({ port: 4000 })
  .then(console.log("server is  started ${url} "));
