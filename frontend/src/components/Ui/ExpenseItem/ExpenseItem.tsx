import React, { useState } from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './ExpenseItem.styles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ApolloQueryResult, OperationVariables } from '@apollo/client';
type NavigationProp = NativeStackNavigationProp<any, 'EditExpense'>;

type RefetchType = (variables?: Partial<OperationVariables>) => Promise<ApolloQueryResult<any>>;

type ExpenseItemProps = {
  title: string;
  amount: number;
  date: string;
  category: string;
  id: string;
  onRefetch:RefetchType
};
type EditExpenseParams = {
  title: string;
  amount: string;
  date: string;
  category: string;
  id: string;
  onRefetch:RefetchType
};
const ExpenseItem = ({
  title,
  amount,
  date,
  category,
  id,
  onRefetch,
}: ExpenseItemProps) => {
  // console.log(id)
  const [isSelected, setIsSelected] = useState(false);
  const [isSelectedId, setIsSelectedId] = useState([]);

  const navigation = useNavigation<NavigationProp>();

  const handleClick = () => {
    const data: EditExpenseParams = {
      id: id.toString(),
      title: title,
      amount: amount.toString(),
      date: date,
      category: category,
      onRefetch,
    };
    navigation.navigate('EditExpense', data);
  };
  return (
    <>
      <TouchableOpacity onPress={handleClick}>
        <View
          style={[styles.itemcontainer, isSelected && styles.isSelectedStyle]}
        >
          <View>
            <Text style={styles.title}>{title}</Text>
          </View>

          <View style={styles.about}>
            <Text style={styles.amt}>₹{amount}</Text>
            <Text style={styles.date}>{date}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default ExpenseItem;
