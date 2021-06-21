import { Query, Resolver } from "type-graphql";

@Resolver()
export class UserResolver {
  @Query(() => String)
  user() {
    return "Vincenzo Ingrao Jr.";
  }
}