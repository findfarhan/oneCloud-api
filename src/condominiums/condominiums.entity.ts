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
    firstName: string;
  
    @Column()
    address: string;
  
    @Column()
    referent: string;

    @Column()
    ap: string;

    @Column()
    node: string;

    @Column()
    client:string


    @CreateDateColumn({ type: 'timestamp' })
    activationDate: Date;
  }
  