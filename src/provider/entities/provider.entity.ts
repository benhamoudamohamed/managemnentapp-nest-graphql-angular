import { Company } from "src/company/entities/company.entity";
import { User } from "src/user/entities/user.entity";
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";

@Entity()
export class Provider extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  address: string;

  @Column("integer")
  mobile: number;

  @Column("integer")
  fax: number;

  @Column()
  email: string;

  @Column()
  providerCompany: string;

  @Column()
  matriculeFiscal: string;

  @CreateDateColumn()
  created: Date;

  @ManyToOne(type => User, user => user.customers, {eager: false})
  user: User;

  @ManyToOne(type => Company, company => company.providers, {eager: false})
  company: Company;
}