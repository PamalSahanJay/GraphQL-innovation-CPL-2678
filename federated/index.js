const { ApolloServer, gql } = require('apollo-server');
const employeeList = require('./data/employees.json')

const typeDefs = gql`
    type Query {
        employees: [Employee]
    }

    type Employee {
        id:ID!,
        firstName:String,
        lastName:String,
        designation:String,
        department:String,
        nearestCity:String
    }
`

const dataSources = ()=>{
    employeeService : new EmployeeService();
}

const resolvers = {
    Query: {
        employees: () => {
            return employeeList
        }
    }
}
const gqlServer = new ApolloServer({ typeDefs ,resolvers});
gqlServer.listen({ port: process.env.port || 4000 })
    .then(console.log('server is  started ${url} '));