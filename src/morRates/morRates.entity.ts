import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity('morRates')
  export class MorRates {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    BackendDescription: string;

    @Column()
    Descriptioninvoice : string;

    @Column()
    MORID : string;

    @Column()
    Service : string;

    @Column()
    CommunicationCode : string;

    @Column()
    Isnap : string;

    @Column()
    ITfixed : string;

     @Column()
     ITfurniture : string;

    @Column()
    FixedEU : string;

    @Column()
    EUfurniture : string;

    @Column()
    FixedWorld : string;

     @Column()
     WorldFurniture : String;

     @Column()
    active : boolean;

    @CreateDateColumn({ type: 'timestamp' })
    activationDate: Date;
  }
  