import { ApiProperty } from '@nestjs/swagger'
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, ManyToMany, JoinTable } from 'typeorm'
import { IssueStatus } from '../issue-status/issue-status.entity'
import { UploadFileDto } from '../upload-file/dto/upload-file.dto'
import { UploadFile } from '../upload-file/upload-file.entity'
import { User } from '../user/user.entity'

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

  @ManyToOne(() => User, { nullable: false })
  user: User

  @ApiProperty({ example: [{ 'hash': '78e731027d8fd50ed642340b7c9a63b3' }], description: 'Files names' })
  @ManyToMany(() => UploadFile, files => files.id)
  @JoinTable()
  files: UploadFile[]

  @ManyToOne(() => IssueStatus, status => status.id, { nullable: false })
  status: IssueStatus
}