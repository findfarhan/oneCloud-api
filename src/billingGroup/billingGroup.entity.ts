import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity('billingGroup')
  export class BillingGroup {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
  
    @Column()
    firstName: string;

    @Column()
    Monthinadvance : string;

    @Column()
    Daytoexpiry : string;

    @Column()
    TransmitterCode : string;

    @Column()
    Name : string;

    @Column()
    Address : string;

    @Column()
    PostalCode : string;

    @Column()
    Common : string;

    @Column()
    Province : string;

    @Column()
    Telephone : string;


    @Column()
    CrimeCode : string;

    @Column()
    Bank : string;

    @Column()
    IBAN : string;


    @Column()
    PostalAccount : string;


    @Column()
    Email : string;

    @Column()
    VATNumber : string;

    @Column()
    TaxIDCode : string;

    @Column()
    SepaCodeCUC : string;


    @Column()
    SepaCreditorCode : string;


    @Column()
    DD1stUnpaidNotice : string;


    @Column()
    DD2stUnpaidNotice : string;

    @Column()
    GGServicesBlock : string;


    @Column()
    Nation : string;


    @CreateDateColumn({ type: 'timestamp' })
    activationDate: Date;
  }
  