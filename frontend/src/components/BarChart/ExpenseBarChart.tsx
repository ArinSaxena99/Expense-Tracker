import { useQuery } from '@apollo/client';
import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import { GET_EXPENSE_BY_DATE } from '../../graphql/query';
import { styles } from './ExpenseBarChart.styles';

const datA = [
  { day: 'M', amount: 300 },
  { day: 'T', amount: 500 },
  { day: 'W', amount: 800 },
  { day: 'T', amount: 400 },
  { day: 'F', amount: 1000 },
  { day: 'S', amount: 700 },
  { day: 'S', amount: 600 },
];

const ExpenseBarChart = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { data, loading, error } = useQuery(GET_EXPENSE_BY_DATE, {
    // pollInterval: 10000,
  });
  // Transform API data → [{ day: 'M', amount: number }]
  const chartData = useMemo(() => {
    if (!data?.getExpensesGroupedByDate) return [];

    return [...data.getExpensesGroupedByDate]
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) // chronological order
      .slice(-7) // last 7 days
      .map(item => ({
        day: new Date(item.date)
          .toLocaleDateString('en-US', { weekday: 'short' })
          .charAt(0), // 'M', 'T', etc.
        amount: item.total,
      }));
  }, [data]);
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#8884d8" />
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={{ color: 'red' }}>Error: {error.message}</Text>
      </View>
    );
  }
  // const maxAmount = Math.max(...datA.map(item => item.amount));
  const maxAmount = Math.max(...chartData.map(item => item.amount), 1); // avoid divide by zero

  return (
    
    <View style={styles.container}>
      {chartData.map((item, index) => {
        const height = (item.amount / maxAmount) * 150; // scale to 150px max height

        return (
          <View key={index} style={styles.barItem}>
            {activeIndex === index && (
              <Text style={styles.amount}>₹{item.amount}</Text>
            )}
            <Pressable
              onLongPress={() => setActiveIndex(index)}
              onPressOut={() => setActiveIndex(null)}
              style={[styles.bar, { height }]}
            />
            <Text style={styles.day}>{item.day}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default ExpenseBarChart;
