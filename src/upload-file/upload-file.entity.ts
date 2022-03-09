import { ApiProperty } from '@nestjs/swagger'
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Applicant } from '../applicant/applicant.entity'

@Entity()
export class UploadFile {
  @ApiProperty({ example: '1', description: 'Unique identificator' })
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({ example: 'asd3fs4324fsdfsf3.jpg', description: 'File name' })
  @Column()
  name: string

  @ManyToOne(() => Applicant)
  applicant: Applicant
}