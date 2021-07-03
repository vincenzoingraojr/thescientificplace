import argon2 from "argon2";
import { User } from "../entity/User";
import { Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { createAccessToken, createRefreshToken } from "../auth";
import { MyContext } from "../types";
import { sendRefreshToken } from "../sendRefreshToken";
import { verify } from "jsonwebtoken";

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => String, { nullable: true })
  accessToken?: string;
}

@Resolver(User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  me(@Ctx() context: MyContext) {
    const authorization = context.req.headers["authorization"];

    if (!authorization) {
      return null;
    }

    try {
      const token = authorization.split(" ")[1];
      const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
      return User.findOne({ where: { username: payload.username } });
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("username") username: string,
    @Arg("password") password: string,
    @Ctx() { res }: MyContext
  ): Promise<UserResponse> {
    if (username.includes("@")) {
      return {
        errors: [
          {
            field: "username",
            message: "The field \"username\" cannot contain \"@\""
          }
        ]
      };
    }
    if (username.length <= 2) {
      return {
        errors: [
          {
            field: "username",
            message: "Username lenght must be greater than 2"
          }
        ]
      };
    }
    if (password.length <= 2) {
      return {
        errors: [
          {
            field: "password",
            message: "Password lenght must be greater than 2"
          }
        ]
      };
    }
    
    const user = await User.findOne({ where: { username }});

    if (!user) {
      return {
        errors: [
          {
            field: "username",
            message: "That username doesn't exist"
          }
        ]
      };
    }

    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "Incorrect password"
          }
        ]
      };
    }

    sendRefreshToken(res, createRefreshToken(user));

    return {
      accessToken: createAccessToken(user),
      user
    };
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("email") email: string,
    @Arg("username") username: string,
    @Arg("firstName") firstName: string,
    @Arg("lastName") lastName: string,
    @Arg("password") password: string,
    @Arg("title") title: string,
    @Arg("gender") gender: string,
    @Arg("birthDay") birthDay: string,
    @Arg("birthMonth") birthMonth: string,
    @Arg("birthYear") birthYear: string,
    @Ctx() { res }: MyContext
  ): Promise<UserResponse> {
    if (!email.includes("@")) {
      return {
        errors: [
          {
            field: "email",
            message: "Invalid email"
          }
        ]
      };
    }
    if (username.includes("@")) {
      return {
        errors: [
          {
            field: "username",
            message: "The field \"username\" cannot contain \"@\""
          }
        ]
      };
    }
    if (username.length <= 2) {
      return {
        errors: [
          {
            field: "username",
            message: "Username lenght must be greater than 2"
          }
        ]
      };
    }
    if (password.length <= 2) {
      return {
        errors: [
          {
            field: "password",
            message: "Password lenght must be greater than 2"
          }
        ]
      };
    }
    if (firstName == "" || firstName == null) {
      return {
        errors: [
          {
            field: "firstName",
            message: "The \"first name\" field cannot be empty"
          }
        ]
      };
    }
    if (lastName == "" || lastName == null) {
      return {
        errors: [
          {
            field: "lastName",
            message: "The \"last name\" field cannot be empty"
          }
        ]
      };
    }
    if (title == "Title") {
      return {
        errors: [
          {
            field: "title",
            message: "The \"title\" field cannot take this value"
          }
        ]
      };
    }
    if (gender == "Gender") {
      return {
        errors: [
          {
            field: "gender",
            message: "The \"gender\" field cannot take this value"
          }
        ]
      };
    }
    if (birthDay == "Day") {
      return {
        errors: [
          {
            field: "gender",
            message: "The \"day\" field cannot take this value"
          }
        ]
      };
    }
    if (birthMonth == "Month") {
      return {
        errors: [
          {
            field: "gender",
            message: "The \"month\" field cannot take this value"
          }
        ]
      };
    }
    if (birthYear == "Year") {
      return {
        errors: [
          {
            field: "gender",
            message: "The \"year\" field cannot take this value"
          }
        ]
      };
    }

    const hashedPassword = await argon2.hash(password);

    let user;
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          username: username,
          email: email,
          password: hashedPassword,
          firstName: firstName,
          lastName: lastName,
          title: title,
          gender: gender,
          birthDate: birthMonth + " " + birthDay + ", " + birthYear,
        })
        .returning("*")
        .execute();
      user = result.raw[0];
    } catch (error) {
      console.error(error);
      if (error.detail.includes("username")) {
        return {
          errors: [
            {
              field: "username",
              message: "Username already taken"
            }
          ]
        };
      }
      if (error.detail.includes("email")) {
        return {
          errors: [
            {
              field: "email",
              message: "A user using this email already exists"
            }
          ]
        };
      }
    }
    
    sendRefreshToken(res, createRefreshToken(user));

    return {
      accessToken: createAccessToken(user),
      user
    };
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: MyContext) {
    sendRefreshToken(res, "");
    
    return true;
  }

  @Mutation(() => Boolean)
  async revokeRefreshTokensForUser(@Arg("username", () => String) username: string) {
    await getConnection()
      .getRepository(User)
      .increment({ username: username }, "tokenVersion", 1);

    return true;
  }
}