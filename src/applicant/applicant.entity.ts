import { ApiProperty } from '@nestjs/swagger'
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { ApplicantType } from './types/applicant-type'


@Entity()
export class Applicant {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({ example: 'Leonardo', description: 'Имя' })
  @Column({ nullable: true })
  firstName: string

  @ApiProperty({ example: 'Dicaprio', description: 'Фамилия' })
  @Column({ nullable: true })
  lastName: string

  @ApiProperty({ example: '88888888888', description: 'Номер телефона' })
  @Column({ unique: true })
  phone: string

  @ApiProperty({ example: 'example@example.ru', description: 'Email' })
  @Column({ nullable: true, unique: true })
  email: string

  @ApiProperty({ example: 'humman/company', description: 'Кем является заявитель (ЮР/ФИЗ. лицом)' })
  @Column({ default: ApplicantType['humman'] })
  type: ApplicantType
}
