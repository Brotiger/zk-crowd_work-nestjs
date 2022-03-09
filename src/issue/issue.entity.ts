import { ApiProperty } from '@nestjs/swagger'
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm'
import { Applicant } from '../applicant/applicant.entity'
import { UploadFile } from '../upload-file/upload-file.entity'

@Entity()
export class Issue {
  @ApiProperty({ example: '1', description: 'Unique identificator' })
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({ example: 'No light', description: 'Short description' })
  @Column()
  subject: string

  @ApiProperty({ example: 'The light went out yesterday', description: 'Description' })
  @Column()
  description: string

  @ManyToOne(() => Applicant, { nullable: false })
  applicant: Applicant
}