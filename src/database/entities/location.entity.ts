import {
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Tree,
  TreeParent,
  TreeChildren,
  Entity,
} from "typeorm";
import type { Relation } from "typeorm";
import { Company } from "./company.entity";

@Entity("locations")
@Tree("closure-table")
export class Location extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column()
  company_id: number;

  @ManyToOne(() => Company, (company) => company.locations)
  @JoinColumn({ name: "company_id" })
  company: Relation<Company>;

  @TreeParent()
  parent?: Relation<Location | null>;

  @TreeChildren()
  children: Relation<Location[]>;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
