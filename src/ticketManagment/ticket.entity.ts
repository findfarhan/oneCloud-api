import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity('ticketManagment')
  export class Ticket {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    customer : string;
  
    @Column()
    service: string;
  
    @Column()
    ticketType: string;
  
    @Column()
    reasonForRequest: string;

    @Column()
    assignTo: string;

    @Column()
    priority: string;

    @Column()
    description: string;

    @Column()
    ticketVisibleByCustomer: boolean;

    @Column()
    addDescriptionForCustomer: boolean;

    @Column()
    descriptionForCustomer: string;

    @Column()
    closeTicketDueToInactivity : number;

    
    @CreateDateColumn({ type: 'timestamp' })
    activationDate: Date;
  }
  