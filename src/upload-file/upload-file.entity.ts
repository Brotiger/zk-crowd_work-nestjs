import { ApiProperty } from '@nestjs/swagger'
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany } from 'typeorm'
import { Issue } from '../issue/issue.entity'
import { User } from '../user/user.entity'

@Entity()
export class UploadFile {
  @ApiProperty({ example: '1', description: 'Unique identificator' })
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({ example: 'asd3fs4324fsdfsf3.jpg', description: 'File name' })
  @Column()
  name: string

  @ManyToMany(() => Issue, issue => issue.id)
  issue: Issue[]

  @ApiProperty({ example: '78e731027d8fd50ed642340b7c9a63b3', description: 'Md5 hash' })
  @Column({ unique: true })
  hash: string
}