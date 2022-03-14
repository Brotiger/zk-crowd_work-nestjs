import { ApiProperty } from '@nestjs/swagger'
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm'
import { User } from '../user/user.entity'

@Entity()
export class UserType {
  @ApiProperty({ example: '1', description: 'Unique identificator' })
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({ example: 'company', description: 'User name' })
  @Column({ unique: true })
  name: string

  @OneToMany(() => User, user => user.id)
  @JoinColumn()
  user: User[]
}
