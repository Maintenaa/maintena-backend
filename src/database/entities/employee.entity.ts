import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { Company } from "./company.entity";

@Entity({ name: "employees" })
export class Employee extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  company_id: number;

  @Column({ type: "enum", enum: ["admin", "supervisor", "technician", "user"] })
  role: "admin" | "supervisor" | "technician" | "user";

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Company, (company) => company.employees)
  @JoinColumn({ name: "company_id" })
  company: Company;
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
