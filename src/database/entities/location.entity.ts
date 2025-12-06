import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Company } from "./company.entity";

@Entity({ name: "locations" })
export class Location extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column()
  company_id: number;

  @Column({ nullable: true })
  parent_id: number;

  @ManyToOne(() => Company, (company) => company.locations)
  @JoinColumn({ name: "company_id" })
  company: Company;

  @ManyToOne(() => Location, (location) => location.children, { nullable: true })
  @JoinColumn({ name: "parent_id" })
  parent: Location;

  @OneToMany(() => Location, (location) => location.parent)
  children: Location[];
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
