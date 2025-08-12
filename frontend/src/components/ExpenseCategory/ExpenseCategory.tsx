import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_EXPENSES_BY_CATEGORY } from '../../graphql/query';

type ExpenseGroup = {
  category: string;
  totalAmount: number;
  totalItems: number;
  expenses: any[];
};
const ExpenseCategory = () => {
  const { data, loading, error } = useQuery(GET_EXPENSES_BY_CATEGORY, {
    // pollInterval: 10000,
  });
  console.log('Query triggered  sdfgrtewsdfsd');
  console.log(data?.getExpensesGroupedByCategory);

  return (
    <View>
      {data?.getExpensesGroupedByCategory?.map(
        (item: ExpenseGroup, index: number) => (
          <View key={index} style={styles.categoryContainer}>
            <View style={styles.categoryName}>
              <Text style={styles.txt}>{item.category}</Text>
            </View>
            <View style={styles.categoryTotal}>
              <Text style={styles.txt}>₹{item.totalAmount}</Text>
              <Text style={styles.items}>{item.totalItems} Items</Text>
            </View>
          </View>
        ),
      )}
    </View>
  );
};

export default ExpenseCategory;

const styles = StyleSheet.create({
  categoryContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    marginVertical: 10,
    borderRadius: 5,
    elevation: 3,
    backgroundColor: '#ffffff',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  categoryName: {},
  categoryTotal: {},
  txt: {
    fontSize: 22,
  },
  items: {
    color: 'grey',
  },
});
