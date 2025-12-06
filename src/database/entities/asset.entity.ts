import { Entity, Column, BaseEntity, ManyToOne, JoinColumn, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Company } from "./company.entity";
import { AssetCategory } from "./asset_category.entity";
import { Location } from "./location.entity";

@Entity({ name: "assets" })
export class Asset extends BaseEntity {
  @PrimaryColumn({ type: "varchar", length: 255 })
  kode: string;

  @Column()
  company_id: number;

  @Column()
  category_id: number;

  @Column()
  location_id: number;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @ManyToOne(() => Company, (company) => company.assets)
  @JoinColumn({ name: "company_id" })
  company: Company;

  @ManyToOne(() => AssetCategory, (category) => category.assets)
  @JoinColumn({ name: "category_id" })
  category: AssetCategory;

  @ManyToOne(() => Location)
  @JoinColumn({ name: "location_id" })
  location: Location;
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
