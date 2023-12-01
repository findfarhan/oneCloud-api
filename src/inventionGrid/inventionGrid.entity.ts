import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity('inventionGrid')
  export class InventionGrid {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
  
    @Column()
    Supervisor: string;

    @Column()
    Technician : string;

    @Column()
    AppointmentDate : string;

    @Column()
    AppointmentDuration : string;

    @Column()
    Customer : string;

    @Column()
    Service : string;

    @Column()
    Priority : string;

    @Column()
    Reminder : string;

    @Column()
    Contacts : string;

    @Column()
    Address : string;

    @Column()
    EstimatedPrice : string;

    @Column()
    NotifyCustomer : boolean;

   
    @CreateDateColumn({ type: 'timestamp' })
    activationDate: Date;
  }
  