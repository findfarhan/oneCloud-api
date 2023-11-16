import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity('netMap')
  export class NetMap {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    svlanId : string;
  
    @Column()
    clli: string;
  
    @Column()
    svlanCode: string;
  
    @Column()
    service: string;

    @Column()
   startFrom:number

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
  }
  