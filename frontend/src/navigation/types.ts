import { ApolloQueryResult, OperationVariables } from '@apollo/client';
import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
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

export type AuthStackParamList ={
  Login:undefined;
  Signup:undefined
} 
