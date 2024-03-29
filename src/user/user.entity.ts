import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Issue } from '../issue/issue.entity';
import { UserType } from '../user-type/user-type.entity';
import * as dotenv from 'dotenv';

dotenv.config({ path: `./env/${process.env.NODE_ENV}.env` });
const mobilePrefixRegex = /^\+/;

@Entity()
export class User {
  @ApiProperty({ example: '1', description: 'Unique identificator' })
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({ example: 'Leonardo', description: 'First name' })
  @Column({ nullable: true })
  firstName: string

  @ApiProperty({ example: 'Dicaprio', description: 'Last name' })
  @Column({ nullable: true })
  lastName: string

  @ApiProperty({ example: process.env.PHONE_EXAMPLE, description: 'Phone number' })
  @Column({ unique: true })
  phone: string

  @ApiProperty({ example: 'example@example.ru', description: 'Email' })
  @Column({ nullable: true, unique: true })
  email: string

  @ApiProperty({ description: 'Who is user? (humman or company)' })
  @ManyToOne(() => UserType)
  type: UserType

  @OneToMany(() => Issue, issue => issue.id)
  issues: Issue[]
}
