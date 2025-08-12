import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDFD',
    paddingHorizontal: 20,
    justifyContent: 'center',
    paddingTop:15
  },
  heading: {
    fontSize: 45,
    fontWeight: '600',
    marginBottom: 80,
    fontFamily: Platform.OS === 'android' ? 'sans-serif-medium' : 'System',
    color: '#0A0A0A',
  },
  form: {
    gap: 20,
  },
  label: {
    fontSize: 20,
    fontWeight: '500',
    color: '#333',
  },
  input: {
    height: 53,
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    color: '#000',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 20,
    overflow: 'hidden',
  },

  picker: {
    height:53,
    width: '100%',
    color:'black',
    // backgroundColor:'pink'
  },
  btnStyle: {
    marginTop: 40,
    backgroundColor: '#0E2C47',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 5,
  },
  btntext: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  dltBtnStyle:{
     marginTop: 40,
    backgroundColor: 'red',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 5,
  }
});
