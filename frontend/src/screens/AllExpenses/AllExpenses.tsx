import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import FloatingAddButton from '../../components/FloatingAddButton/FloatingAddButton';
import ExpenseItem from '../../components/Ui/ExpenseItem/ExpenseItem';
import { GET_EXPENSES } from '../../graphql/query';
import { styles } from './AllExpenses.styles';
import Filter from './components/Filter/Filter';

const AllExpenses = ({ navigation }: any) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);

  const categories = [
    'All',
    'Food',
    'Transport',
    'Shopping',
    'Bills',
    'Health',
    'Ebtertainment',
    'Other',
  ];

  const { loading, error, data, refetch } = useQuery(GET_EXPENSES, {
    variables: {
      category: selectedCategory.length > 0 ? selectedCategory : undefined,
      startDate: startDate ? startDate.toISOString().split('T')[0] : undefined,
      endDate: endDate ? endDate.toISOString().split('T')[0] : undefined,
    },
  });

  useEffect(() => {
    refetch({
      category: selectedCategory.length > 0 ? selectedCategory : undefined,
      startDate: startDate ? startDate.toISOString().split('T')[0] : undefined,
      endDate: endDate ? endDate.toISOString().split('T')[0] : undefined,
    });
  }, [startDate, endDate, selectedCategory]);
  if (error) return <Text>Error loading data...</Text>;

  const handleFromDateChange = (event: any, selectedDate?: Date) => {
    const date = new Date(event.nativeEvent.timestamp);
    console.log(date);
    console.log(selectedDate);
    setShowFromPicker(false);
    if (date) setStartDate(date);
  };

  const handleToDateChange = (event: any, selectedDate?: Date) => {
    const date = new Date(event.nativeEvent.timestamp);
    console.log(date);
    console.log(selectedDate);
    setShowToPicker(false);
    if (date) setEndDate(date);
  };

  const renderItem = ({ item }: any) => {
    const isoDate = new Date(item.date).toISOString().split('T')[0];
    return (
      <ExpenseItem
        date={isoDate}
        title={item.title}
        amount={item.amount}
        category={item.category}
        id={item.id}
        onRefetch={refetch}
      />
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
      <FloatingAddButton />

      <View>
        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => {
            setStartDate(null);
            setEndDate(null);
            setSelectedCategory([]);
          }}
        >
          <Text style={styles.clearText}>Clear Filters</Text>
        </TouchableOpacity>
      </View>
      <Filter
        categories={categories}
        showFromPicker={showFromPicker}
        setShowFromPicker={setShowFromPicker}
        showToPicker={showToPicker}
        setShowToPicker={setShowToPicker}
        startDate={startDate}
        endDate={endDate}
        handleFromDateChange={handleFromDateChange}
        handleToDateChange={handleToDateChange}
        setSelectedCategory={setSelectedCategory}
        renderCategory={renderCategory}
      />


      <View style={{ flex: 1 }}>
        <FlatList
          data={data?.getExpenses || []}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
        {loading && (
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(255,255,255,0.7)',
            }}
          >
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
      </View>
    </View>
  );
};

export default AllExpenses;
