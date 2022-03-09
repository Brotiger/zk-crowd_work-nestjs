import { ApiProperty } from '@nestjs/swagger'
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Issue } from '../issue/issue.entity'
import { UploadFile } from '../upload-file/upload-file.entity'
import { ApplicantType } from './types/applicant-type'

@Entity()
export class Applicant {
  @ApiProperty({ example: '1', description: 'Unique identificator' })
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({ example: 'Leonardo', description: 'First name' })
  @Column({ nullable: true })
  firstName: string

  @ApiProperty({ example: 'Dicaprio', description: 'Last name' })
  @Column({ nullable: true })
  lastName: string

  @ApiProperty({ example: '+78888888888', description: 'Phone number' })
  @Column({ unique: true })
  phone: string

  @ApiProperty({ example: 'example@example.ru', description: 'Email' })
  @Column({ nullable: true, unique: true })
  email: string

  @ApiProperty({ example: 'human', description: 'Who is applicant? (humman or company)' })
  @Column({ default: ApplicantType['humman'] })
  type: ApplicantType

  @OneToMany(() => Issue, issue => issue.id)
  issues: Issue[]

  @OneToMany(() => UploadFile, file => file.id)
  files: UploadFile[]
}
