import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity('passiveInvoice')
  export class PassiveInvoice {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    supplierCompanyName : string;
  
    @Column()
    crediteNote: boolean;
  
    @Column()
    number: number;
  
    @Column()
    issueDate: string;

    @Column()
    expireDate: string;

    @Column()
    totalExcluding: number;

    @Column()
    totalNotSubject: number;

    @Column()
    totalNonTaxable: number;

    @Column()
    totalExempt: number;

    @Column()
    totalNotShown: number;

    @Column()
    totalReverseCharge: number;

    @Column()
    totalEUCountry: number;

    @Column()
    totalTaxableAmount: number;

    @Column()
    totalVAT: number;

    @Column()
    totalDocument: number;

    @Column()
    payment: string;

    @Column()
    note: string;

    @CreateDateColumn({ type: 'timestamp' })
    activationDate: Date;
  }
  