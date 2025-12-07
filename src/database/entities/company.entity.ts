import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import type { Relation } from "typeorm";
import { Employee } from "./employee.entity";
import { Location } from "./location.entity";
import { Asset } from "./asset.entity";
import { Part } from "./part.entity";
import { WorkOrder } from "./work_order.entity";
import { PreventiveMaintenance } from "./preventive_maintenance.entity";
import { User } from "./user.entity";

@Entity({ name: "companies" })
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "json" })
  employees_count_range: number[];

  @Column({ type: "varchar", unique: true })
  email: string;

  @Column({ type: "varchar" })
  address: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  owner: Relation<User>;

  @OneToMany(() => Employee, (employee) => employee.company)
  employees: Relation<Employee[]>;

  @OneToMany(() => Location, (location) => location.company)
  locations: Relation<Location[]>;

  @OneToMany(() => Asset, (asset) => asset.company)
  assets: Relation<Asset[]>;

  @OneToMany(() => Part, (part) => part.company)
  parts: Relation<Part[]>;

  @OneToMany(() => WorkOrder, (workOrder) => workOrder.company)
  workOrders: Relation<WorkOrder[]>;

  @OneToMany(() => PreventiveMaintenance, (pm) => pm.company)
  preventiveMaintenances: Relation<PreventiveMaintenance[]>;
}
