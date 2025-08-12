import { ApolloQueryResult, OperationVariables } from '@apollo/client';

export type RootStackParamList = {
  Auth: undefined;
  MainApp: { screen?: keyof TabParamList } | undefined;
  AddExpense: undefined;
  EditExpense: {
    id: string;
    title: string;
    amount: string;
    date: string;
    category: string;
    onRefetch: () => void | Promise<ApolloQueryResult<any>>;
  };
};

export type TabParamList = {
  Home: undefined;
  AllExpenses: undefined;
  Chatbot: undefined;
  Settings: undefined;
};
