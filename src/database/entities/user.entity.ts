import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToOne,
  type Relation,
} from "typeorm";
import bcrypt from "bcrypt";
import { authSalt } from "../../modules/auth/auth.constant";
import { Employee } from "./employee.entity";

@Entity({ name: "users" })
export class User extends BaseEntity {
  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, authSalt);
    }
  }

  @BeforeUpdate()
  async hashPasswordUpdate() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, authSalt);
    }
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "varchar", length: 255, unique: true })
  email: string;

  @Column({ type: "varchar", length: 255, select: false, nullable: true })
  password?: string;

  @Column({ type: "boolean", default: false })
  is_superadmin: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => Employee, (e) => e.user)
  employee?: Relation<Employee>;
}
