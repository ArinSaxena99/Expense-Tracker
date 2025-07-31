import { gql } from '@apollo/client';

export const GET_EXPENSES = gql`
query{
getExpenses{
title
amount
date
}
}
`;

