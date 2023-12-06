
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity('NAS')
  export class NAS {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
  
    @Column()
    ipNas: string;

    @Column()
    node : string



    @CreateDateColumn({ type: 'timestamp' })
    activationDate: Date;



  }
  