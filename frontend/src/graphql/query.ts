import { gql } from '@apollo/client';

export const GET_EXPENSES = gql`
  query GetExpenses($category: [String], $startDate: String, $endDate: String) {
    getExpenses(category: $category, startDate: $startDate, endDate: $endDate) {
      id:_id
      title
      amount
      date
      category
    }
  }
`;

export const GET_STATS = gql`
  query GetStats {
    getTotalStats {
      totalAmount
      totalItems
    }
  }
`;
export const GET_EXPENSES_BY_CATEGORY = gql`
  query getExpensesGroupedByCategory {
    getExpensesGroupedByCategory {
      category
      totalAmount
      totalItems
      expenses {
        _id
        title
        amount
        date
        category
      }
    }
  }
`;

export const GET_EXPENSE_BY_DATE = gql`
  query getExpensesGroupedByDate {
    getExpensesGroupedByDate {
      date
      total
      expenses {
        _id
        title
        amount
        category
        date
      }
    }
  }
`;

export const GET_USER_INFO = gql`
query getUserInfo {
getUserInfo{
id:_id
name
email
}}`
