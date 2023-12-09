/* eslint-disable prettier/prettier */
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity('partner')
  export class Partner {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    businessName: string;
  
    @Column()
    contactSurname: string;
  
    @Column()
    contactName: string;
  
    @Column()
    landlineTel: number;
  
    @Column()
    telMobile: number;

    @Column()
    code:string

    @Column()
    active:boolean

    @CreateDateColumn({ type: 'timestamp' })
    activationDate: Date;
  }
  