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
import { styles } from './FormInput.styles';
type Expense = {
  title: string;
  amount: string;
  date: string;
  category: string;
  id?: string;
};
type Props = {
  initialData?: Expense;
  handleAdd: (data: Expense) => void;
};

const FormInput = ({
  addExpense,
  handleInput,
  setShowPicker,
  showPicker,
  tempDate,
  handleDateChange,
  handleAdd,
  initialData,
  handleDelete,
}: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        {initialData ? 'Update Expense' : 'Add Expense'}
      </Text>
      <View style={styles.form}>
        <Text style={styles.label}>
          Title <Text style={{ color: 'red' }}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter the title"
          value={addExpense.title}
          onChangeText={value => handleInput('title', value)}
        />
        <Text style={styles.label}>
          Amount <Text style={{ color: 'red' }}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter the amount"
          value={addExpense.amount}
          onChangeText={value => handleInput('amount', value)}
          keyboardType="numeric"
        />
        <Text style={styles.label}>
          Category <Text style={{ color: 'red' }}>*</Text>
        </Text>
        <TouchableOpacity style={styles.pickerWrapper}>
          <Picker
            selectedValue={addExpense.category}
            onValueChange={value => handleInput('category', value)}
            style={styles.picker}
          >
            <Picker.Item label="Select your category" value="" color="#888" />

            <Picker.Item label="Food" value="Food" />
            <Picker.Item label="Transport" value="Transport" />
            <Picker.Item label="Shopping" value="Shopping" />
            <Picker.Item label="Bills" value="Bills" />
            <Picker.Item label="Health" value="Health" />
            <Picker.Item label="Entertainment" value="Entertainment" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
        </TouchableOpacity>

        <Text style={styles.label}>
          Date <Text style={{ color: 'red' }}>*</Text>
        </Text>
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
      <View>
        <TouchableOpacity style={styles.btnStyle} onPress={handleAdd}>
          <Text style={styles.btntext}>
            {initialData ? 'Update Expense' : ' Add Expense'}
          </Text>
        </TouchableOpacity>
        {initialData && (
          <TouchableOpacity style={styles.dltBtnStyle} onPress={handleDelete}>
            <Text style={styles.btntext}>Delete Expense</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormInput;
