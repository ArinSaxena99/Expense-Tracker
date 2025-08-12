import DateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { styles } from './Filter.styles';
const Filter = ({
  setSelectedCategory,
  setShowFromPicker,
  startDate,
  setShowToPicker,
  endDate,
  showToPicker,
  showFromPicker,
  handleFromDateChange,
  handleToDateChange,
  categories,
  renderCategory,
}: any) => {
  return (
    <View>
      <View style={styles.dateFilter}>
        <TouchableOpacity
          onPress={() => setShowFromPicker(true)}
          style={styles.dateBox}
        >
          <Text style={styles.Dates}>
            {startDate ? startDate.toISOString().split('T')[0] : 'From'}
          </Text>
        </TouchableOpacity>
        <View style={styles.vertical}></View>
        <TouchableOpacity
          onPress={() => setShowToPicker(true)}
          style={styles.dateBox}
        >
          <View>
            <Text style={styles.Dates}>
              {endDate ? endDate.toISOString().split('T')[0] : 'To'}
            </Text>
          </View>
        </TouchableOpacity>
        {showFromPicker && (
          <DateTimePicker
            value={startDate ?? new Date()}
            mode="date"
            display="default"
            onChange={handleFromDateChange}
          />
        )}

        {showToPicker && (
          <DateTimePicker
            value={endDate ?? new Date()}
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
    </View>
  );
};

export default Filter;

