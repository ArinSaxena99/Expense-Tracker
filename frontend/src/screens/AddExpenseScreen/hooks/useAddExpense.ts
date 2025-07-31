import { useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useMutation } from '@apollo/client';
import { ADD_EXPENSE } from '../../../graphql/mutation';
import { Alert } from 'react-native';

export const useAddExpense = () => {
  const [addExpense, setAddExpense] = useState({
    title: '',
    amount: '',
    category: '',
    date: '',
  });
  const [showPicker, setShowPicker] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());

  const [addExpenseMutation, { loading }] = useMutation(ADD_EXPENSE, {
    onCompleted: () => {
      Alert.alert('Success', 'Expense added successfully!');
      setAddExpense({
        title: '',
        amount: '',
        category: '',
        date: '',
      });
    },
    onError: error => {
      Alert.alert('Error', error.message);
    },
  });

  const handleInput = (key: string, value: string) => {
    setAddExpense(prev => ({ ...prev, [key]: value }));
  };

  
  const handleAdd = () => {
    const { title, category, amount, date } = addExpense;

    // Convert amount to number if needed
    addExpenseMutation({
      variables: {
        title,
        category,
        amount: parseFloat(amount),
        date,
      },
    });
  };
  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0]; // YYYY-MM-DD
      handleInput('date', formattedDate);
      setTempDate(selectedDate);
    }
  };
  return {
    addExpense,
    setAddExpense,
    handleDateChange,
    handleInput,
    handleAdd,
    setShowPicker,
    showPicker,
    tempDate,
  };
};
