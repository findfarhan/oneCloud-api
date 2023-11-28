import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity('editorProfile')
  export class EditorProfile {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    BackendDescription: string;

    @Column()
    Descriptioninvoice : string;

    @Column()
    Service : string;

    @Column()
    Type : string;

    @Column()
    LineTechnicalProfile : string;

    @Column()
    BandPeakDown : string;

    @Column()
    BandaPiccoUP : string;

     @Column()
    PriceMonthly : string;

    @Column()
    RadiusServiceId : string;

    @Column()
    CommunicationCode : string;

    @Column()
    Partner : string;

     @Column()
    Business : boolean;

     @Column()
    active : boolean;


    @CreateDateColumn({ type: 'timestamp' })
    activationDate: Date;
  }
  