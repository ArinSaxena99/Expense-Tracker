import { StyleSheet, Text, View } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import React from 'react';
import { GET_EXPENSES_BY_CATEGORY } from '../../graphql/query';
import { useQuery } from '@apollo/client';

type donutChartProp = {
  total: number;
};
type Expense = {
  totalAmount: number;
  date: string;
  category: string;
  expenses: [];
};
const ExpenseDonutChart: React.FC<donutChartProp> = ({ total }) => {
  const { data, loading, error } = useQuery(GET_EXPENSES_BY_CATEGORY);
      console.log(data)


  const CATEGORY_COLORS: Record<string, string> = {
    Food: '#FF5733',
    Transport: '#33B5E5',
    Shopping: '#FFC107',
    Bills: '#8BC34A',
    Entertainment: '#9C27B0',
    Other: '#607D8B',
    Health: '#a397f3ff',
  };
  const categories = data?.getExpensesGroupedByCategory || [];

  const chartData = categories.map((item: Expense, index: number) => ({
    value: (item.totalAmount / total) * 100,
    // color: colors[index % colors.length],
    color: CATEGORY_COLORS[item.category] || '#ccc',
    text: `${Math.round((item.totalAmount / total) * 100)}%`,
  }));


  return (
    <PieChart
      data={chartData}
      donut
      radius={110}
      showText
      textColor="black"
      textSize={15}
      focusOnPress
    />
  );
};

export default ExpenseDonutChart;

const styles = StyleSheet.create({});
