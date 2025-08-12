import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const styles = StyleSheet.create({
  dateFilter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
    padding: 15,
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius: 9,
  },
  dateBox: {},
  Dates: {
    fontSize: 18,
  },
  vertical: {
    width: 1,
    height: '100%',
    backgroundColor: 'black',
  },
  categoryFilter: {
    flexDirection: 'row',
    gap: 90,
  },
  categoryItem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 40,
    backgroundColor: '#d3d3d3',
    borderWidth: 0.5,
    borderRadius: 9,
    marginHorizontal: 10,
    padding: 7,
  },
  selectedCategory: {
    backgroundColor: '#1F314B',
    borderWidth: 2,
  },
  category: {
    color: 'white',
  },
});
