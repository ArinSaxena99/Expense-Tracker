import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import FormInput from '../../components/FormInput/FormInput';
import { useMutation } from '@apollo/client';
import { DELETE_EXPENSE, UPDATE_EXPENSE } from '../../graphql/mutation';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { GET_EXPENSES } from '../../graphql/query';
import { RootStackParamList } from '../../navigation/types';
type EditExpenseParams = {
  title: string;
  amount: string;
  date: string;
  category: string;
  id: string;
};

// 👇 Step 2: Type use karo yaha
type Props = {
  route: {
    params: EditExpenseParams;
  };
};
type EditExpenseTouteProp = RouteProp<RootStackParamList, 'EditExpense'>;

const EditExpense = () => {
  const route = useRoute<EditExpenseTouteProp>();

  const { title, amount, date, id, category, onRefetch } = route.params;
  const [addExpense, setAddExpense] = useState({
    title: title || '',
    amount: amount || '',
    category: category || '',
    date: date || '',
    id: '',
  });
  const [showPicker, setShowPicker] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());
  const navigation = useNavigation();

  const [editExpenseMutation, { loading }] = useMutation(UPDATE_EXPENSE, {
    onCompleted: () => {
      Alert.alert('Success', 'Expense updated successfully!');
    },
    onError: error => {
      Alert.alert('Error', error.message);
    },
  });

  const [deleteExpenseMutation, { loading: deleteExpenseLoading }] =
    useMutation(DELETE_EXPENSE, {
      onCompleted: async () => {
        Alert.alert('Deleted!', 'Expense deleted successfully!');
        if (onRefetch) {
          await onRefetch();
        }
        navigation.goBack(); // ✅ optional
      },
      onError: error => {
        Alert.alert('Error', error.message);
      },
    });
  const handleDelete = () => {
    deleteExpenseMutation({
      variables: { id },
    });
  };

  // Yeh kaam karega initial values set karne ka
  useEffect(() => {
    setAddExpense({ title, amount, date, category, id });
    setTempDate(new Date(date));
  }, []);

  const handleInput = (field: string, value: string) => {
    setAddExpense(prev => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      handleInput('date', formattedDate);
      setTempDate(selectedDate);
    }
  };

  const handleUpdate = () => {
    const { title, category, amount, date } = addExpense;
    editExpenseMutation({
      variables: {
        id,
        title,
        category,
        amount: parseFloat(amount),
        date,
      },
    });
  };
  return (
    <FormInput
      initialData={{ title, amount, date, category, id }}
      addExpense={addExpense}
      handleInput={handleInput}
      setShowPicker={setShowPicker}
      showPicker={showPicker}
      tempDate={tempDate}
      handleDateChange={handleDateChange}
      handleAdd={handleUpdate}
      handleDelete={handleDelete}
    />
  );
};

export default EditExpense;
