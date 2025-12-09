import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
} from "typeorm";
import type { Relation } from "typeorm";
import { Company } from "./company.entity";
import { Asset } from "./asset.entity";

export enum PreventiveMaintenanceFrequency {
  DAILY = "daily",
  WEEKLY = "weekly",
  MONTHLY = "monthly",
  YEARLY = "yearly",
}

@Entity({ name: "preventive_maintenances" })
export class PreventiveMaintenance extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", unique: true })
  @Generated("uuid")
  code: string;

  @Column()
  company_id: number;

  @Column({ type: "enum", enum: PreventiveMaintenanceFrequency })
  frequency: PreventiveMaintenanceFrequency;

  @Column()
  asset_id: string;

  @Column({ type: "timestamp", nullable: true })
  last_service_at: Date;

  @Column({ type: "timestamp", nullable: true })
  next_service_at: Date;

  @Column({ type: "text" })
  description: string;

  @ManyToOne(() => Company, (company) => company.preventiveMaintenances)
  @JoinColumn({ name: "company_id" })
  company: Relation<Company>;

  @ManyToOne(() => Asset)
  asset: Relation<Asset>;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
