import { ObjectType, Field, Int } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BaseEntity } from "typeorm";

@ObjectType()
@Entity("users")
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  firstName!: string;

  @Field()
  @Column()
  lastName!: string;

  @Field()
  @Column({ unique: true })
  username!: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  gender!: string;

  @Field(() => String)
  @CreateDateColumn()
  birthDate!: Date;

  @Column("int", { default: 0 })
  tokenVersion: number;
}
