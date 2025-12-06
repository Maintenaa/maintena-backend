import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Employee } from "./employee.entity";
import { Location } from "./location.entity";
import { Asset } from "./asset.entity";
import { Part } from "./part.entity";
import { WorkOrder } from "./work_order.entity";
import { PreventiveMaintenance } from "./preventive_maintenance.entity";

@Entity({ name: "companies" })
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "int", default: 0 })
  employees_count: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Employee, (employee) => employee.company)
  employees: Employee[];

  @OneToMany(() => Location, (location) => location.company)
  locations: Location[];

  @OneToMany(() => Asset, (asset) => asset.company)
  assets: Asset[];

  @OneToMany(() => Part, (part) => part.company)
  parts: Part[];

  @OneToMany(() => WorkOrder, (workOrder) => workOrder.company)
  workOrders: WorkOrder[];

  @OneToMany(() => PreventiveMaintenance, (pm) => pm.company)
  preventiveMaintenances: PreventiveMaintenance[];
}
