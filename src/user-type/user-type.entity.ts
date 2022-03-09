import { ApiProperty } from '@nestjs/swagger'
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class UserType {
  @ApiProperty({ example: '1', description: 'Unique identificator' })
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({ example: 'company', description: 'User name' })
  @Column()
  name: string
}
