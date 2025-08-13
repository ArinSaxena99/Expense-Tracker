import { Dimensions, StyleSheet } from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 45,
    marginBottom: 30,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    fontSize: 22,
  },
  itemTextLogout: {
    fontSize: 22,
    color: 'red',
  },

  leftContainer: {
    gap: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },

  bottomSheet: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.1,
    height: SCREEN_HEIGHT * 0.9,
    width: '100%',
    backgroundColor: '#efefef',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },

  dragIndicator: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 2.5,
    alignSelf: 'center',
    marginBottom: 10,
  },

  sheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },

  profileItem: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },

  profileLabel: {
    fontWeight: 'bold',
    marginRight: 5,
    fontSize: 16,
    color: '#555',
  },

  profileValue: {
    fontSize: 16,
    color: '#000',
  },
});
