import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import React from 'react';
import {
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from './AddExpenseStyles';
import { useAddExpense } from './hooks/useAddExpense';

const AddExpense = () => {
  const {
    addExpense,
    handleInput,
    handleDateChange,
    handleAdd,
    setAddExpense,
    setShowPicker,
    showPicker,
    tempDate,
  } = useAddExpense();

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
          keyboardType='numeric'
        />
        <Text style={styles.label}>Category</Text>
        <TouchableOpacity style={styles.pickerWrapper}>
          <Picker
            selectedValue={addExpense.category}
            onValueChange={value => handleInput('category', value)}
            style={styles.picker}
          >
            <Picker.Item label="Food" value="Food" />
            <Picker.Item label="Transport" value="Transport" />
            <Picker.Item label="Shopping" value="Shopping" />
            <Picker.Item label="Bills" value="Bills" />
            <Picker.Item label="Health" value="Health" />
            <Picker.Item label="Entertainment" value="Entertainment" />
          </Picker>
        </TouchableOpacity>

        <Text style={styles.label}>Date</Text>
        <Pressable onPress={() => setShowPicker(true)}>
          <View pointerEvents="none">
            <TextInput
              style={styles.input}
              placeholder="Select date"
              onChangeText={value => handleInput('date', value)}
              value={addExpense.date}
            />
          </View>
        </Pressable>
        {showPicker && (
          <DateTimePicker
            value={tempDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
      </View>
      <TouchableOpacity style={styles.btnStyle} onPress={handleAdd}>
        <Text style={styles.btntext}>Add Expense</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddExpense;
