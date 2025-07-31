import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './ExpenseItem.styles';

type ExpenseItemProps = {
  title: string;
  amount: number;
  date: string;
};
const ExpenseItem = ({ title, amount, date }: ExpenseItemProps) => {
  return (
    <View style={styles.itemcontainer}>
      <View>
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.about}>
        <Text style={styles.amt}>₹{amount}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    </View>
  );
};

export default ExpenseItem;
