import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity('userList')
  export class UserList {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    firstName : string;
  
    @Column()
    email: string;
  
    @Column()
    partner: string;
  
    @Column()
    password: string;

    @CreateDateColumn({ type: 'timestamp' })
    activationDate: Date;
  }
  