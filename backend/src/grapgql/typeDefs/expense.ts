import { gql } from "apollo-server-express";

const expenseTypesDefs = gql`
  scalar Date

  type Expense {
    _id: ID!
    title: String!
    amount: Float!
    category: String!
    date: Date!
    userId: ID!
  }

  type DailyExpenseGroup {
    date: String
    expenses: [Expense!]!
    total: Float!
  }

  type CategoryExpenseGroup {
    category: String!
    totalAmount: Float!
    totalItems: Int!
    expenses: [Expense!]!
  }

  type TotalStats {
    totalAmount: Float!
    totalItems: Int!
  }

  type Query {
    getExpenses(
      category: [String]
      startDate: String
      endDate: String
      date: String
    ): [Expense!]

    getExpenseById(id: ID!): Expense

    getExpensesGroupedByDate: [DailyExpenseGroup!]

    getTotalStats: TotalStats!

    getExpensesGroupedByCategory: [CategoryExpenseGroup!]
  }

  type Mutation {
    addExpense(
      title: String!
      amount: Float!
      category: String!
      date: String!
    ): Expense!
    deleteExpense(id: ID!): Boolean!
    updateExpense(
      id: ID!
      title: String!
      amount: Float
      category: String!
      date: String
    ): Expense!
  }
`;

export default expenseTypesDefs;

// type DailyExpenseGroup{
//  date:String             // date. Expenses returned will be of this date/day
//  expenses: [Expense!]!   // All Expenses of that day
//  }
