import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import * as bcrypt from "bcryptjs";
import { Board } from "./Board";
import { Like } from "./Like";
import { Token } from "./Token";

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

  @OneToMany(() => Token, token => token.user)
  tokens: Token[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
