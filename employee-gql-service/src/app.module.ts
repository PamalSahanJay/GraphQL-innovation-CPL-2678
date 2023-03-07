/* eslint-disable prettier/prettier */
import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { EmployeeModule } from './employee/employee.module';
import { Employee } from './employee/entities/employee.entity';
import { ProjectModule } from './project/project.module';
import { Project } from './project/entities/project.entity';

@Module({
  imports: [
    EmployeeModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    TypeOrmModule.forRoot({
      type:'postgres',
      host:'localhost',  
      port:5432,
      username:'postgres',
      password:'Ucsc@123',
      database:'GraphQLDB',
      entities:[
        //"dist/**/*.entity{.ts,.js}"
        Employee,
        Project
      ],
      synchronize:true
    }),
    ProjectModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
