import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

@Entity("tokens")
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "bigint" })
  user_id: number;

  @Column({ type: "varchar", length: 2048 })
  access_token: string;

  @Column({ type: "varchar", length: 2048 })
  refresh_token: string;

  @Column({ type: "timestamp" })
  expires_at: Date;

  @ManyToOne(() => User, user => user.tokens)
  @JoinColumn({ name: "user_id" })
  user: User;
}
