import { useQuery } from '@apollo/client';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Text, TouchableOpacity, View } from 'react-native';
import ExpenseItem from '../../components/Ui/ExpenseItem/ExpenseItem';
import { GET_EXPENSES } from '../../graphql/query';
import { styles } from './AllExpenses.styles';

const AllExpenses = ({ navigation }: any) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);

  const categories = ['All', 'Food', 'Travel', 'Shopping', 'Bills', 'Other'];

  const { loading, error, data, refetch } = useQuery(GET_EXPENSES, {
    variables: {
      category: selectedCategory.length > 0 ? selectedCategory : undefined,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
    },
  });
  // console.log(fromDate, toDate);

  useEffect(() => {
    refetch({
      category: selectedCategory.length > 0 ? selectedCategory : undefined,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
    });
  }, [startDate, endDate, selectedCategory]);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading data...</Text>;

  const handleFromDateChange = (event: any, selectedDate?: Date) => {
const date = new Date(event.nativeEvent.timestamp);
    console.log(date);
    // console.log('EVENT:', event);
    console.log(selectedDate);
    setShowFromPicker(false);
    if (date) setStartDate(date);
  };

  const handleToDateChange = (event: any, selectedDate?: Date) => {
    const date = new Date(event.nativeEvent.timestamp);
    console.log(date);
    console.log(selectedDate);
    setShowToPicker(false);
    // if (selectedDate) setToDate(selectedDate);
        if (date) setEndDate(date);

  };

  const renderItem = ({ item }: any) => {
    const isoDate = new Date(item.date).toISOString().split('T')[0];
    return (
      <ExpenseItem date={isoDate} title={item.title} amount={item.amount} />
    );
  };

  const toggleCategory = (item: string) => {
    setSelectedCategory(prev => {
      if (item === 'All') {
        return [];
      }
      let updatedCategories;
      if (prev.includes(item)) {
        updatedCategories = prev.filter(c => c !== item); //remove if already selected
      } else {
        if (prev.length >= 3) {
          Alert.alert(
            'Limit Reached',
            'You can select up to 3 categories only.',
          );
          return prev;
        }
        updatedCategories = [...prev, item]; // if under limit
      }
      if (updatedCategories.length === 0) {
        return []; // "All" is implied
      }

      return updatedCategories;
    });
  };
  const renderCategory = ({ item }: any) => {
    const isSelected =
      (item === 'All' && selectedCategory.length === 0) ||
      selectedCategory.includes(item);
    return (
      <TouchableOpacity
        style={[styles.categoryItem, isSelected && styles.selectedCategory]}
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
            {startDate.toISOString().split('T')[0]}
          </Text>
        </TouchableOpacity>
        <View style={styles.vertical}></View>
        <TouchableOpacity
          onPress={() => setShowToPicker(true)}
          style={styles.dateBox}
        >
          <Text style={styles.Dates}>{endDate.toISOString().split('T')[0]}</Text>
        </TouchableOpacity>
        {showFromPicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display="default"
            onChange={handleFromDateChange}
          />
        )}

        {showToPicker && (
          <DateTimePicker
            value={endDate}
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
