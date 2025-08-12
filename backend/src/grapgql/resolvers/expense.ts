import { AuthenticationError } from "apollo-server-express";
import Expense from "../../models/expenseModel";
import mongoose from "mongoose";

const expenseResolvers = {
  Query: {
    async getExpenses(_: any, args: any, context: any) {
      if (!context.user) {
        throw new AuthenticationError("You must be logged in");
      }

      const { category, startDate, endDate, date } = args;
      console.log(startDate, endDate, category);
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
      const expenses = await Expense.find(query).sort({ date: -1 });

      return expenses.map((expense) => {
        const obj = expense.toObject() as Record<string, any>;
        obj._id = obj._id.toString(); // ✅ Convert ObjectId to string
        obj.userId = obj.userId.toString(); // ✅ Same for userId
        return obj;
      });
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
    async getExpensesGroupedByDate(_: any, args: any, context: any) {
      // console.log("BY_DATE");
      // console.log("Hello");
      if (!context.user) {
        throw new AuthenticationError("You must be logged in");
      }
      const result = await Expense.aggregate([
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$date" },
            },
            expenses: { $push: "$$ROOT" },
            total: { $sum: "$amount" }, // ✅ Total amount for that day
          },
        },
        {
          $sort: { _id: -1 },
        },
      ]);

      return result.map((group) => ({
        date: group._id,
        expenses: group.expenses,
        total: group.total,
      }));
    },

    async getTotalStats(_: any, args: any, context: any) {
      if (!context.user) {
        throw new AuthenticationError("You must be logged in");
      }
      // console.log(context.user.id)
      // console.log("STATS");
      const result = await Expense.aggregate([
        {
          $match: { userId: new mongoose.Types.ObjectId(context.user.id) },
        },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: "$amount" },
            totalItems: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            totalAmount: 1,
            totalItems: 1,
          },
        },
      ]);

      if (!result || result.length === 0) {
        return {
          totalAmount: 0,
          totalItems: 0,
        };
      }

      return result[0];
    },
    async getExpensesGroupedByCategory(_: any, args: any, context: any) {
      if (!context.user) {
        throw new AuthenticationError("You must be logged in");
      }

      console.log(context.user.id);
      console.log("CATEGORY");

      const result = await Expense.aggregate([
        {
          $match: { userId: new mongoose.Types.ObjectId(context.user.id) },
        },
        {
          $group: {
            _id: "$category",
            totalAmount: { $sum: "$amount" },
            totalItems: { $sum: 1 },
            expenses: {
              $push: {
                _id: "$_id",
                title: "$title",
                amount: "$amount",
                date: "$date",
                category: "$category",
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            category: "$_id",
            totalAmount: 1,
            totalItems: 1,
            expenses: 1,
          },
        },
      ]);

      return result;
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

      console.log("Type of id:", typeof id);
      console.log("Value of id:", id);
      console.log("Is id an object?", typeof id === "object");
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid expense ID");
      }
      const result = await Expense.deleteOne({
        _id: id,
        userId: context.user.id,
      });
      return result.deletedCount === 1;
    },
    async updateExpense(
      _: any,
      { id, title, amount, category, date }: any,
      context: any
    ) {
      console.log("Incoming updateExpense variables:", {
        id,
        title,
        amount,
        category,
        date,
      });
      console.log("Current user:", context.user);
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
