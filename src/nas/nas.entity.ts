
import { Knots } from 'src/knots/knots.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity('NAS')
  export class NAS {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
  
    @Column()
    ipNas: string;

    @Column()
    node : string


    @CreateDateColumn({ type: 'timestamp' })
    activationDate: Date;

    @OneToMany(() => Knots, knots => knots.nas)
knots: Knots[];

  }
  