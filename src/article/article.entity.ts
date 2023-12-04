import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity('article')
  export class Article {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
  
    @Column()
    Description: string;

    @Column()
    Price : number;

    @CreateDateColumn({ type: 'timestamp' })
    activationDate: Date;
  }
  