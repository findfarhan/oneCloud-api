import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('client')
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  customerType: string;

  @Column()
  billingGroup: string;

  @Column()
  surname: string;

  @Column()
  firstName: string;

  @Column()
  taxIDcode: string;

  @Column()
  identityDocument: string;

  @Column()
  technicalDepartmentEmail: string;

  @Column()
  number: number;

  @Column()
  email: string;

  @Column()
  pec: string;

  @Column()
  sDICode: number;

  @Column()
  mobilePhone: number;

  @Column()
  landlinePhone: number;

  @Column()
  invoiceViaEmail: boolean;

  @Column()
  paperInvoice: boolean;

  @Column()
  note: string;

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
  nation: string;

  @Column()
  payment: string;

  @Column()
  differentBillingAddress:boolean

  @Column()
  iBAN: string;

  @Column()
  bICCode: string;

  @Column()
  disableUnpaidInvoiceChecking: boolean;

  @Column()
  status: string;

  @CreateDateColumn({ type: 'timestamp' })
  activationDate: Date;
}
