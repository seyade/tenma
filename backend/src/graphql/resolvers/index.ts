import { mergeResolvers } from "@graphql-tools/merge";
import userResolver from "./user";

export default mergeResolvers({
  ...userResolver,
});
