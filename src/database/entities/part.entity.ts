import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Company } from "./company.entity";
import { Location } from "./location.entity";

@Entity({ name: "parts" })
export class Part extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  company_id: number;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "int", default: 0 })
  quantity: number;

  @Column({ type: "float", default: 0 })
  price: number;

  @Column()
  location_id: number;

  @ManyToOne(() => Company, (company) => company.parts)
  @JoinColumn({ name: "company_id" })
  company: Company;

  @ManyToOne(() => Location)
  @JoinColumn({ name: "location_id" })
  location: Location;
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
