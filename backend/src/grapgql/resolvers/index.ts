import authResolvers from "./auth";
import expenseResolvers from "./expense";

export default {
  Query: {
    ...authResolvers.Query,
    ...expenseResolvers.Query,
  },
  Mutation: {
    ...authResolvers.Mutation,
    ...expenseResolvers.Mutation,
  },
};
