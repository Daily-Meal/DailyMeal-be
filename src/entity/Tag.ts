import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
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
  board: Board;
}
