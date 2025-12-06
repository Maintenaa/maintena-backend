import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import type { Relation } from "typeorm";
import { WorkOrder } from "./work_order.entity";
import { Part } from "./part.entity";

@Entity({ name: "work_order_used_parts" })
export class WorkOrderUsedPart extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  work_order_id: number;

  @Column()
  part_id: number;

  @Column({ type: "int", default: 0 })
  quantity: number;

  @Column({ type: "int", default: 0 })
  subtotal: number;

  @ManyToOne(() => WorkOrder)
  @JoinColumn({ name: "work_order_id" })
  workOrder: Relation<WorkOrder>;

  @ManyToOne(() => Part)
  @JoinColumn({ name: "part_id" })
  part: Relation<Part>;
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
