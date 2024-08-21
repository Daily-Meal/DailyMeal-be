import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
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
  @JoinColumn({ name: "board_id" })
  board: Board;

  @ManyToOne(() => User, user => user.likes)
  @JoinColumn({ name: "user_id" })
  user: User;
}
