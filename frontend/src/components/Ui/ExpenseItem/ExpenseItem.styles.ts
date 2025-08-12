import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  itemcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: 'black',
  },
  title: {
    fontSize: 22,
    fontWeight: '500',
    color: '#333',
  },
  about: {
    alignItems: 'flex-end',
  },
  amt: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e90ff',
  },
  date: {
    fontSize: 16,
    color: '#888',
    marginTop: 4,
  },
  isSelectedStyle: {
    backgroundColor: '#cceeff', 
    borderWidth: 1,
    borderColor: '#007bff',
  },
});
