import { AuthenticationError } from "apollo-server-express";
import Expense from "../../models/expenseModel";

const expenseResolvers = {
  Query: {
    async getExpenses(_: any, args: any, context: any) {
      if (!context.user) {
        throw new AuthenticationError("You must be logged in");
      }

      const { category, startDate, endDate, date } = args;
      const query: any = { userId: context.user.id };
      if (category) {
        query.category = category;
      }
      if (date) {
        const targetDate = new Date(date);
        const nextDate = new Date(targetDate);
        nextDate.setDate(targetDate.getDate() + 1);
        query.date = {
          $gte: targetDate,
          $lt: nextDate,
        };
      } else if (startDate || endDate) {
        query.date = {};
        if (startDate) query.date.$gte = new Date(startDate);
        if (endDate) query.date.$lte = new Date(endDate);
      }

      return await Expense.find(query).sort({date: -1});
    },


    async getExpenseById(_: any, { id }: { id: String }, context: any) {
      if (!context.user) {
        throw new AuthenticationError("You must be logged in");
      }
      const expense = await Expense.findOne({
        _id: id,
        userId: context.user.id,
      });
      return expense;
    },
  },

  Mutation: {
    async addExpense(
      _: any,
      { title, amount, category, date }: any,
      context: any
    ) {
      if (!context.user) {
        throw new AuthenticationError("You must be logged in");
      }

      const newExpense = new Expense({
        title,
        amount,
        category,
        date,
        userId: context.user.id,
      });
      return await newExpense.save();
    },

    async deleteExpense(_: any, { id }: any, context: any) {
      if (!context.user) {
        throw new AuthenticationError("You must be logged in");
      }
      const result = await Expense.deleteOne({
        _id: id,
        userId: context.user,
        id,
      });
      return result.deletedCount === 1;
    },
    async updateExpense(
      _: any,
      { id, title, amount, category, date }: any,
      context: any
    ) {
      if (!context.user) {
        throw new AuthenticationError("You must be logged in");
      }

      const updated = await Expense.findOneAndUpdate(
        { _id: id, userId: context.user.id },
        { $set: { title, amount, category, date } },
        { new: true }
      );
      return updated;
    },
  },
};

export default expenseResolvers;
