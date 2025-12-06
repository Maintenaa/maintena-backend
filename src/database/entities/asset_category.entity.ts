import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import type { Relation } from "typeorm";
import { Asset } from "./asset.entity";

@Entity({ name: "asset_categories" })
export class AssetCategory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "timestamp", nullable: true })
  purchase_at: Date;

  @Column({ type: "boolean", default: true })
  is_active: boolean;

  @OneToMany(() => Asset, (asset) => asset.category)
  assets: Relation<Asset[]>;
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
