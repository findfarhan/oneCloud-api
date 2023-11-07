import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('home')
export class Home {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  service: string;

  @Column()
  customer: string;

  @Column()
  address: string;

  @Column()
  billing: string;

  @Column()
  issue: string;

  @CreateDateColumn({ type: 'timestamp' })
  activationDate: Date;
}
