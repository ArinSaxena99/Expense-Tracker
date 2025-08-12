import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDFD',
    paddingHorizontal: 20,
    justifyContent: 'center',
    paddingTop: 20,
  },
  heading: {
    fontSize: 45,
    fontWeight: '600',
    marginBottom: 20,
    fontFamily: Platform.OS === 'android' ? 'sans-serif-medium' : 'System',
    color: '#0A0A0A',
  },

  //6.
  categoryItem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 45,
    backgroundColor: '#d3d3d3',
    borderWidth: 0.5,
    borderRadius: 9,
    marginHorizontal: 10,
    padding: 7,
  },

  //7.
  selectedCategory: {
    backgroundColor: '#1F314B',
    borderWidth: 2,
  },

  //8.
  category: {
    color: 'white',
  },
  clearButton: {
    height: 50,
    width: 100,
    backgroundColor: '#1F314B',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearText: {
    color: 'white',
  },
  loaderContainer: {
    color: 'black',
    height: 20,
    width: 20,
  },
  // LoadinContainer: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
});
