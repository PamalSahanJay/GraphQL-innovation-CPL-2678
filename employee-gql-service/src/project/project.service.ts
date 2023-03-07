/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { resolve } from 'path';
import { Repository } from 'typeorm';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectService {

  constructor(@InjectRepository(Project) private projectRepo: Repository<Project>) {

  }

  create(createProjectInput: CreateProjectInput): Promise<Project> {
    // eslint-disable-next-line prefer-const
    let project = this.projectRepo.create(createProjectInput);
    return this.projectRepo.save(project);
  }

  async findAll(): Promise<Project[]> {
    return this.projectRepo.find({
      relations: ['employees']
    });
  }

  async findOne(id: string): Promise<Project> {
    return this.projectRepo.findOne({ 
      where: { 
        id: id 
      },
      relations: ['employees']
    });
  }

  update(id: string, updateProjectInput: UpdateProjectInput): Promise<Project> {
    // eslint-disable-next-line prefer-const
    let project:Project = this.projectRepo.create(updateProjectInput);
    project.id= id;
    return this.projectRepo.save(project);
  }

   async remove(id: string) {
    // eslint-disable-next-line prefer-const
    let project:Project =await this.projectRepo.findOne({where:{id:id}});
    if(project){
      return this.projectRepo.delete(id);
    }
    else{
      throw new NotFoundException("Record can't find ${id}")
    }
    
  }
}
