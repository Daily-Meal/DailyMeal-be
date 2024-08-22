import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Board } from "./Board";

@Entity("meals")
export class Meal {
  @PrimaryGeneratedColumn({ type: "bigint" })
  meal_id: number;

  @Column({ type: "varchar", length: 100 })
  name: string;

  @Column({ type: "bigint" })
  board_id: number;

  @ManyToOne(() => Board, board => board.meals)
  @JoinColumn({ name: "board_id" })
  board: Board;
}
