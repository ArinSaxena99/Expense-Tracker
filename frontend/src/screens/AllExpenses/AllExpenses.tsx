import { useQuery } from '@apollo/client';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import ExpenseItem from '../../components/Ui/ExpenseItem/ExpenseItem';
import { GET_EXPENSES } from '../../graphql/query';
import { styles } from './AllExpenses.styles';

const AllExpenses = () => {
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);

  const categories = ['All', 'Food', 'Travel', 'Shopping', 'Bills', 'Other'];

  const { loading, error, data } = useQuery(GET_EXPENSES);
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading data...</Text>;

  const handleFromDateChange = (event: any, selectedDate?: Date) => {
    setShowFromPicker(false);
    if (selectedDate) setFromDate(selectedDate);
  };

  const handleToDateChange = (event: any, selectedDate?: Date) => {
    setShowToPicker(false);
    if (selectedDate) setToDate(selectedDate);
  };

  const renderItem = ({ item }: any) => {
    const isoDate = new Date(item.date).toISOString().split('T')[0];
    return (
      <ExpenseItem date={isoDate} title={item.title} amount={item.amount} />
    );
  };

  const toggleCategory = (item: string) => {
    setSelectedCategory(prev =>
      prev.includes(item) ? prev.filter(c => c !== item) : [...prev, item],
    );
  };
  const renderCategory = ({ item }: any) => {
    return (
      <TouchableOpacity
        style={[
          styles.categoryItem,
          selectedCategory.includes(item) && styles.selectedCategory,
        ]}
        onPress={() => toggleCategory(item)}
      >
        <Text style={styles.category}>{item}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>All Expenses</Text>
      <View style={styles.dateFilter}>
        <TouchableOpacity
          onPress={() => setShowFromPicker(true)}
          style={styles.dateBox}
        >
          <Text style={styles.Dates}>
            {fromDate.toISOString().split('T')[0]}
          </Text>
        </TouchableOpacity>
        <View style={styles.vertical}></View>
        <TouchableOpacity
          onPress={() => setShowToPicker(true)}
          style={styles.dateBox}
        >
          <Text style={styles.Dates}>{toDate.toISOString().split('T')[0]}</Text>
        </TouchableOpacity>
        {showFromPicker && (
          <DateTimePicker
            value={fromDate}
            mode="date"
            display="default"
            onChange={handleFromDateChange}
          />
        )}

        {showToPicker && (
          <DateTimePicker
            value={toDate}
            mode="date"
            display="default"
            onChange={handleToDateChange}
          />
        )}
      </View>
      <View style={styles.categoryFilter}>
        <FlatList
          horizontal
          data={categories}
          showsHorizontalScrollIndicator={false}
          renderItem={renderCategory}
          keyExtractor={item => item}
        />
      </View>

      <FlatList data={data?.getExpenses || []} renderItem={renderItem} />
    </View>
  );
};

export default AllExpenses;
