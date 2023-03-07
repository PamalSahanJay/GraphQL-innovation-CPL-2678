/* eslint-disable prettier/prettier */
import { Resolver, Query, Mutation, Args, Parent, ResolveField } from '@nestjs/graphql';
import { Project } from 'src/project/entities/project.entity';
import { CreateEmployeeDTO } from './dto/create-employee.input';
import { EmployeeService } from './employee.service';
import { Employee } from './entities/employee.entity';

@Resolver(() => Employee)
export class EmployeeResolver {

  constructor(private empService:EmployeeService) {
  
  }

  @Query(() => [Employee], {name:'getAllEmployee'})
  findAll() {
    return this.empService.findAll();
  }

  @Query(()=>Employee, {name:'getEmployeeById'})
  findById(@Args('id') id:string ){
    return this.empService.findById(id);
  }

  @Mutation(()=>Employee,{name:'createEmployee'})
  create(@Args('employeeInput') employee:CreateEmployeeDTO){
    return this.empService.create(employee);
  } 

  // this method is to resolve the field. project nod the project id
  // so method name should be field name 
  // project is sub in emmployee. because employee use project id
  @ResolveField(()=>Project)
  project(@Parent()employee:Employee){
    return this.empService.getProject(employee.projectId)
  }
}
