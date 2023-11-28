import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity('rate')
  export class Rate {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
  
    @Column()
    Rate: string;

    @Column()
    Description : string;

    @Column()
    Nature : string;

    @Column()
    Default : boolean;

    @CreateDateColumn({ type: 'timestamp' })
    activationDate: Date;
  }
  