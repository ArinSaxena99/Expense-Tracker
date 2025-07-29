import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { styles } from './AddExpenseStyles';
import { ADD_EXPENSE } from '../../graphql/mutation';
import { useMutation } from '@apollo/client';

const AddExpense = () => {
  const [addExpense, setAddExpense] = useState({
    title: '',
    amount: '',
    category: '',
    date: '',
  });


  const [addExpenseMutation, { loading }] = useMutation(ADD_EXPENSE, {
    onCompleted: () => {
      Alert.alert('Success', 'Expense added successfully!');
     
    },
    onError: (error) => {
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


  }
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Expense</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter the title"
          value={addExpense.title}
          onChangeText={value => handleInput('title', value)}
        />
        <Text style={styles.label}>Amount</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter the amount"
          value={addExpense.amount}
          onChangeText={value => handleInput('amount', value)}
        />
        <Text style={styles.label}>Category</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter the category"
          onChangeText={value => handleInput('category', value)}
          value={addExpense.category}
        />
        <Text style={styles.label}>Date</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter the date"
          onChangeText={value => handleInput('date', value)}
          value={addExpense.date}
        />
      </View>
      <TouchableOpacity style={styles.btnStyle}  onPress={handleAdd}>
        <Text style={styles.btntext} >Add Expense</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddExpense;
