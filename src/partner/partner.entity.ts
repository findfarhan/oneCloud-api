import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity('partner')
  export class Partner {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
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

    @CreateDateColumn({ type: 'timestamp' })
    activationDate: Date;
  }
  