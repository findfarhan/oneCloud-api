import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity('paymentMethod')
  export class PaymentMethod {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    CommunicationCode: string;

    @Column()
    Description : string;

    @Column()
    InvoiceCodeEl : string;

    @Column()
    BillingNotes : string;

    @Column()
    Unpaidtext : string;

    @CreateDateColumn({ type: 'timestamp' })
    activationDate: Date;
  }
  