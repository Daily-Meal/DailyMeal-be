import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Board } from "./Board";

@Entity("tags")
export class Tag {
  @PrimaryGeneratedColumn({ type: "bigint" })
  tag_id: number;

  @Column({ type: "varchar", length: 100 })
  name: string;

  @Column({ type: "bigint" })
  board_id: number;

  @ManyToOne(() => Board, board => board.tags)
  @JoinColumn({ name: "board_id" })
  board: Board;
}
