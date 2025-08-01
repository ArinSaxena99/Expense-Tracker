import { gql } from '@apollo/client';

export const GET_EXPENSES = gql`
query GetExpenses($category:[String], $startDate:String, $endDate:String){
getExpenses(category:$category, startDate:$startDate, endDate:$endDate){
title
amount
date
category
}
}
`;







