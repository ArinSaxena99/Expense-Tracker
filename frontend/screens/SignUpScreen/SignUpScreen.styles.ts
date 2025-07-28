import { StyleSheet } from "react-native"


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#1F314B',
  },
  formContainer: {
    gap: 16,
  },
  title: {
    color: 'white',
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  input: {
    backgroundColor: '#31435D',
    padding: 13,
    borderRadius: 10,
    color: 'white',
    fontSize: 16,
    marginBottom: 12,
  },
  label: {
    color: 'white',
    // marginBottom: 6,
    fontSize: 14,
    fontWeight: '500',
  },
  btnStyle: {
    backgroundColor: '#385a89ff',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  switchText: {
    marginTop: 10,
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
  },
  signupText: {
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
