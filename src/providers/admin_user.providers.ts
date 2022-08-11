import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { BasicEntity } from "@/providers/basic.providers";

@Entity({ database: "user", name: "admin_user" })
export class AdminUserEntity extends BasicEntity {
  @PrimaryGeneratedColumn("uuid", {
    comment: "唯一的UUID",
  })
  user_id: string | undefined;

  /** 用户名 **/
  @Column({
    length: 15,
    name: "username",
    type: "varchar",
    unique: true,
    nullable: false,
    comment: "登录用户名",
  })
  username: string | undefined;

  /** 密码 **/
  @Column({
    type: "varchar",
    length: 40,
    nullable: false,
    comment: "登录密码",
  })
  password: string | undefined;
}
