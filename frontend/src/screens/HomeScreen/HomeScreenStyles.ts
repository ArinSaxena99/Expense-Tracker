import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 170,
  },
  homeContainer: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 20,
    paddingTop:20,
    paddingBottom: 60,
  },
  heading: {
    fontSize: 45,
    fontWeight: '600',
    marginBottom: 20,
    fontFamily: Platform.OS === 'android' ? 'sans-serif-medium' : 'System',
    color: '#0A0A0A',
  },
  totalExpenseTxt: {
    fontSize: 25,
  },
  totalAmtContainer: {
    height: '29%',
    borderColor: 'grey',
    paddingVertical: 12,
    gap: 10,
    paddingLeft: 30,
    marginTop: 15,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    elevation: 3,
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  totalAmt: {
    fontSize: 50,
    color: '#1c1c1e',
  },
  totalItems: {
    fontSize: 20,
    color: '#8e8e93',
  },
  barChart: {
    flex:1,
    height:40,
    width: '100%',
    marginLeft: 9,
    justifyContent: 'center',
  },
  categoryExpense: {},
  expensesCategory: {
    fontSize: 26,
    marginBottom:15
  },
  donutChart: {
    flex: 1,
    marginTop: 30,
    paddingBottom:100,
    alignItems: 'center',
  },
  loaderContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  legendContainer: {
  marginTop: 16,
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
},
legendItem: {
  flexDirection: 'row',
  alignItems: 'center',
  marginHorizontal: 8,
  marginVertical: 4,
},
colorBox: {
  width: 16,
  height: 16,
  borderRadius: 4,
  marginRight: 6,
},
legendText: {
  fontSize: 14,
},

});
