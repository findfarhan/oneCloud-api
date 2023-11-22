import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity('accessPoint')
  export class AccessPoint {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    ipAccessPoint : string;
  
    @Column()
    firstName: string;
  
    @Column()
    nas: string;
  
    @Column()
    node: string;


    @CreateDateColumn({ type: 'timestamp' })
    activationDate: Date;
  }
  