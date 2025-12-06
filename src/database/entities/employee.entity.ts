import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  type Relation,
} from "typeorm";
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
  user: Relation<User>;

  @ManyToOne(() => Company)
  @JoinColumn({ name: "company_id" })
  company: Relation<Company>;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
