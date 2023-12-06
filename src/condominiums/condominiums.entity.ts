import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity('condominiums')
  export class Condominiums {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    ipCpe : string;
  
    @Column()
    name: string;
  
    @Column()
    address: string;
  
    @Column()
    referent: string;

    @Column()
    accessPoint: string;


    @CreateDateColumn({ type: 'timestamp' })
    activationDate: Date;
  }
  