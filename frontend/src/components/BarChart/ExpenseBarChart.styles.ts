import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent:'center',
    paddingRight:18,
    gap:11,
    alignItems: 'flex-end',
    height: 200,
    paddingBottom: 0,
  },
  barItem: {
    alignItems: 'center',
  },
  bar: {
    width: 45,
    backgroundColor: '#4CAF50',
    borderRadius: 6,
  },
  day: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: '600',
  },
  amount: {
    marginBottom: 5,
    fontSize: 13,
    fontWeight: 'bold',
    color: '#111',
  },
  loaderContainer:{
    color:'black',
    height:20,
    width:20

  }
});




