import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { Board } from "./Board";

@Entity("likes")
export class Like {
  @PrimaryGeneratedColumn({ type: "bigint" })
  like_id: number;

  @Column({ type: "bigint" })
  board_id: number;

  @Column({ type: "bigint" })
  user_id: number;

  @ManyToOne(() => Board, board => board.likes)
  board: Board;

  @ManyToOne(() => User, user => user.likes)
  user: User;
}
