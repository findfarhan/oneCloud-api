import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity('ipList')
  export class IpList {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    description : string;
  
    @Column()
    startIp: string;
  
    @Column()
    network: string;
  
    @Column()
    startIp1: string;

    @Column()
    reservedIps: string;

    @Column()
    active: boolean;


    @CreateDateColumn({ type: 'timestamp' })
    activationDate: Date;
  }
  