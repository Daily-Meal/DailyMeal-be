import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Board } from "./Board";
import { Like } from "./Like";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn({ type: "bigint" })
  user_id: number;

  @Column({ type: "varchar", length: 100, unique: true })
  email: string;

  @Column({ type: "varchar", length: 100 })
  nickname: string;

  @Column({ type: "varchar", length: 100 })
  password: string;

  @OneToMany(() => Board, board => board.user)
  boards: Board[];

  @OneToMany(() => Like, like => like.user)
  likes: Like[];
}
