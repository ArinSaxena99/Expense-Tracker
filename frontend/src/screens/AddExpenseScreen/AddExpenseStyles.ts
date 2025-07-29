import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingVertical: 50,
  },
  heading: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 30,
  },

  form: {
    marginBottom: 30,
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#31435D',
    fontSize: 16,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 30,
    padding: 10,
    color:'white'
  },
  btncontainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnStyle: {
    backgroundColor: '#385a89ff',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  btntext: {
    fontSize: 16,
    color: 'white',
  },
});
