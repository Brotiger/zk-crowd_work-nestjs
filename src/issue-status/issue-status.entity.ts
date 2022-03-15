import { ApiProperty } from '@nestjs/swagger'
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm'
import { Issue } from '../issue/issue.entity'

@Entity()
export class IssueStatus {
  @ApiProperty({ example: '1', description: 'Unique identificator' })
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({ example: 'New', description: 'Issue status name' })
  @Column()
  name: string

  @OneToMany(() => Issue, issue => issue.id)
  @JoinColumn()
  issue: Issue
}