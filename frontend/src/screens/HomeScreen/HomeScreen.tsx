import { useQuery } from '@apollo/client';
import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ExpenseBarChart from '../../components/BarChart/ExpenseBarChart';
import ExpenseCategory from '../../components/ExpenseCategory/ExpenseCategory';
import ExpenseDonutChart from '../../components/ExpenseDonutChart/ExpenseDonutChart';
import FloatingAddButton from '../../components/FloatingAddButton/FloatingAddButton';
import { GET_STATS } from '../../graphql/query';
import { styles } from './HomeScreenStyles';

const HomeScreen = () => {
  const { data, loading, error } = useQuery(
    GET_STATS,
    //  { pollInterval: 10000 }
  );
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  if (error) return <Text>Error: {error.message}</Text>;

  console.log(data);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
      style={styles.homeContainer}
    >
      <Text style={styles.heading}>Home</Text>
      <FloatingAddButton />

      <View>
        <Text style={styles.totalExpenseTxt}>Total Expenses</Text>

        <View style={styles.totalAmtContainer}>
          <Text style={styles.totalAmt}>₹{data.getTotalStats.totalAmount}</Text>
          <Text style={styles.totalItems}>
            {data.getTotalStats.totalItems} Items
          </Text>
        </View>
        <View style={styles.barChart}>
          <ExpenseBarChart />
        </View>
      </View>

      <View style={styles.categoryExpense}>
        <Text style={styles.expensesCategory}>Expenses By Category</Text>

        <View>
          <ExpenseCategory />
        </View>
      </View>
      <View style={styles.donutChart}>
        <ExpenseDonutChart total={data.getTotalStats.totalAmount} />
        <View style={styles.legendContainer}>
          {Object.entries({
            Food: '#FF5733',
            Transport: '#33B5E5',
            Shopping: '#FFC107',
            Bills: '#8BC34A',
            Entertainment: '#9C27B0',
            Other: '#607D8B',
            Health: '#a397f3ff',
          }).map(([category, color]) => (
            <View key={category} style={styles.legendItem}>
              <View style={[styles.colorBox, { backgroundColor: color }]} />
              <Text style={styles.legendText}>{category}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
