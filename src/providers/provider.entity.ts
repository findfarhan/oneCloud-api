import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity('provider')
  export class Provider {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    supplierType : string;
  
    @Column()
    businessName: string;
  
    @Column()
    vatNumber: string;
  
    @Column()
    attorney: string;

    @Column()
    representativeTaxCode: string;

    @Column()
    taxIdCode: string;

    @Column()
    identityDocument: string;

    @Column()
    number: number;

    @Column()
    email: string;

    @Column()
    pec: string;

    @Column()
    mobilePhone: number;

    @Column()
    landlinePhone: number;

    @Column()
    emailNOC: string;

    @Column()
    enableTicketSending: boolean;

    @Column()
    street: string;

    @Column()
    civic: string;

    @Column()
    common: string;

    @Column()
    province: string;

    @Column()
    postalCode: string;

    @Column()
    payment: string;

    @Column()
    iBAN: string;

    @CreateDateColumn({ type: 'timestamp' })
    activationDate: Date;
  }
  