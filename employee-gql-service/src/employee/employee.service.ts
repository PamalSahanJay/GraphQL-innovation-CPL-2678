/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/project/entities/project.entity';
import { ProjectService } from 'src/project/project.service';
import { Repository } from 'typeorm';
import { CreateEmployeeDTO } from './dto/create-employee.input';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeeService {
    constructor(@InjectRepository(Employee) private employeeRepo: Repository<Employee>, private projService: ProjectService) {

    }

    async findAll(): Promise<Employee[]> {
        return this.employeeRepo.find();
    }

    async create(employee: CreateEmployeeDTO): Promise<Employee> {
        // eslint-disable-next-line prefer-const
        let emp = this.employeeRepo.create(employee);
        return this.employeeRepo.save(emp);
    }

    async getProject(id: string): Promise<Project> {
        return this.projService.findOne(id);
    }

    async findById(id: string): Promise<Employee> {
        return this.employeeRepo.findOne({ where: { id: id } })
    }

}
