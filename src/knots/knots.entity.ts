import { NAS } from 'src/nas/nas.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity('knots')
  export class Knots {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
  
    @Column()
    firstName: string;

    @Column()
    address : string;

    @CreateDateColumn({ type: 'timestamp' })
    activationDate: Date;

    @ManyToOne(() => NAS, nas => nas.knots)
    nas: NAS;
    
  }
  