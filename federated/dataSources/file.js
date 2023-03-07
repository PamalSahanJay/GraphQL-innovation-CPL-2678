const employeeList = require("../data/employees.json")
const {DataSource}  = require('apollo-datasource');
const _ = require('lodash');

class EmployeeService extends DataSource{
    constructor() {
        super()
    }

    getEmployees(args){
        return _.filter(employeeList,args)
    }

    getEmployeeByID(id){
        return employeeList.filter(x=>{
           return x.id==id;
        })
    }
}

module.exports=EmployeeService;