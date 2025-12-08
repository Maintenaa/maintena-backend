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
  OneToOne,
} from "typeorm";
import { User } from "./user.entity";
import { Company } from "./company.entity";

export const employeeRoles = [
  "admin",
  "leader",
  "manager",
  "supervisor",
  "member",
  "worker",
];

export enum EmployeeRole {
  OWNER = "owner",
  ADMIN = "admin",
  LEADER = "leader",
  MANAGER = "manager",
  SUPERVISOR = "supervisor",
  MEMBER = "member",
  WORKER = "worker",
}

@Entity({ name: "employees" })
export class Employee extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "enum", enum: EmployeeRole, default: EmployeeRole.MEMBER })
  role: string;

  @Column({ type: "boolean", nullable: false, default: false })
  is_owner: boolean;

  @Column({ type: "boolean", nullable: true, default: true })
  is_active?: boolean;

  @OneToOne(() => User, (e) => e.employee)
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
