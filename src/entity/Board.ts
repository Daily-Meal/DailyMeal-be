import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Like } from "./Like";
import { Meal } from "./Meal";
import { Tag } from "./Tag";

@Entity("boards")
export class Board {
  @PrimaryGeneratedColumn({ type: "bigint" })
  board_id: number;

  @Column({ type: "varchar", length: 255, nullable: true })
  image: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  modified_at: Date;

  @Column({ type: "bigint" })
  user_id: number;

  @Column({ type: "varchar", length: 100 })
  category: string;

  @Column({ type: "varchar", length: 100 })
  meal_type: string;

  @ManyToOne(() => User, user => user.boards)
  user: User;

  @OneToMany(() => Like, like => like.board)
  likes: Like[];

  @OneToMany(() => Meal, meal => meal.board)
  meals: Meal[];

  @OneToMany(() => Tag, tag => tag.board)
  tags: Tag[];
}
