import { useMutation } from '@apollo/client';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Alert } from 'react-native';
import { ADD_EXPENSE } from '../../../graphql/mutation';
import { RootStackParamList } from '../../../navigation/types';

type NavigationProps = BottomTabNavigationProp<RootStackParamList, 'MainApp'>;

export const useAddExpense = () => {
  const [addExpense, setAddExpense] = useState({
    title: '',
    amount: '',
    category: '',
    date: '',
  });
  const [showPicker, setShowPicker] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());
  const navigation = useNavigation<NavigationProps>();


  const [addExpenseMutation, { loading }] = useMutation(ADD_EXPENSE, {
    onCompleted: () => {
      Alert.alert('Success', 'Expense added successfully!');
      setAddExpense({
        title: '',
        amount: '',
        category: '',
        date: '',
      });
          navigation.navigate('MainApp', {screen: 'AllExpenses'});

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

    if (!title || !amount || !category || !date) {
      Alert.alert(
        'Empty field',
        'Please fill all the fields before submitting',
      );
      return;
    }

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
