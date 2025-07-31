import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDFD',
    paddingHorizontal: 20,
    justifyContent: 'center',
    paddingTop: 15,
  },
  heading: {
    fontSize: 45,
    fontWeight: '600',
    marginBottom: 20,
    fontFamily: Platform.OS === 'android' ? 'sans-serif-medium' : 'System',
    color: '#0A0A0A',
  },
  dateBox: {},
  dateFilter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
    padding: 15,
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius: 9,
  },
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
  categoryItem:{
    justifyContent:'center',
    alignItems:'center',
    width:80,
    height:45,
    backgroundColor:"#d3d3d3",
    borderWidth:0.5,
    borderRadius:9,
    marginHorizontal:10,
    padding:9,
  },
  selectedCategory:{
    backgroundColor:'#1F314B',
    borderWidth:2
  },
  category:{
    color:"white"
  }
});
