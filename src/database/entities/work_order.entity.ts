import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import type { Relation } from "typeorm";
import { Company } from "./company.entity";
import { Asset } from "./asset.entity";
import { User } from "./user.entity";

@Entity({ name: "work_orders" })
export class WorkOrder extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  company_id: number;

  @Column()
  asset_id: string;

  @Column({ type: "timestamp" })
  requested_at: Date;

  @Column({ type: "timestamp" })
  due_at: Date;

  @Column({ type: "enum", enum: ["preventive", "corrective"] })
  type: "preventive" | "corrective";

  @Column({ type: "enum", enum: ["low", "medium", "high"] })
  priority: "low" | "medium" | "high";

  @Column({
    type: "enum",
    enum: ["pending", "progress", "completed", "failed"],
  })
  status: "pending" | "progress" | "completed" | "failed";

  @Column()
  created_by: number;

  @Column()
  assigned_to: number;

  @Column({ type: "text" })
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ type: "timestamp", nullable: true })
  deleted_at: Date;

  @ManyToOne(() => Company, (company) => company.workOrders)
  @JoinColumn({ name: "company_id" })
  company: Relation<Company>;

  @ManyToOne(() => Asset)
  asset: Relation<Asset>;

  @ManyToOne(() => User)
  @JoinColumn({ name: "created_by" })
  creator: Relation<User>;

  @ManyToOne(() => User)
  @JoinColumn({ name: "assigned_to" })
  assignee: Relation<User>;
}
