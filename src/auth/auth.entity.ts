import { Table, Column, Model, DataType, PrimaryKey, Default, AllowNull, CreatedAt } from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class User extends Model<User> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  id: string;

  @AllowNull(false)
  @Column({ type: DataType.STRING })
  name: string;

  @AllowNull(false)
  @Column({ type: DataType.STRING })
  email: string;

  @AllowNull(false)
  @Column({ type: DataType.STRING })
  password: string;

  @AllowNull(false)
  @Column({ type: DataType.STRING })
  role: string;

  @Column({ type: DataType.STRING })
  partner: string;

  @CreatedAt
  @Column({ type: DataType.DATE })
  createdAt: Date;
}
