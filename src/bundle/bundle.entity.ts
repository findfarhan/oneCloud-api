import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity('bundle')
  export class Bundle {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
  
    @Column()
    Description: string;

    @CreateDateColumn({ type: 'timestamp' })
    activationDate: Date;
  }
  