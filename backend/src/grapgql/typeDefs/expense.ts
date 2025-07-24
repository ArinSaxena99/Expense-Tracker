import { gql } from "apollo-server-express";

const expenseTypesDefs = gql`
scalar Date

 type Expense{
 id:ID!
 title:String!
 amount:Float!
 category:String!
 date:Date!
 userId:ID!
 }

 type Query {
 getExpenses(category: String, startDate:String, endDate: String, date: String):[Expense!]
 getExpenseById(id: ID!): Expense
 }


 type Mutation {
 addExpense(title: String!, amount: Float!, category: String!, date: String!): Expense!
 deleteExpense(id: ID!): Boolean!
 updateExpense(id: ID!, title: String!, amount: Float, category: String!, date: String): Expense!
 }
 `;

export default expenseTypesDefs;


