import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Company } from "./company.entity";
import { Asset } from "./asset.entity";

@Entity({ name: "preventive_maintenances" })
export class PreventiveMaintenance extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  company_id: number;

  @Column({ type: "enum", enum: ["daily", "weekly", "monthly", "yearly"] })
  frequency: "daily" | "weekly" | "monthly" | "yearly";

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
  company: Company;

  @ManyToOne(() => Asset)
  @JoinColumn({ name: "asset_id", referencedColumnName: "kode" })
  asset: Asset;
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
