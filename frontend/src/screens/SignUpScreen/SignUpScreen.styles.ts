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
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  input: {
   backgroundColor: '#31435D',
    padding: 16,
    borderRadius: 10,
    color: 'white',
    fontSize: 16,
    marginBottom: 30,
  },
  label: {
    color: 'white',
    marginBottom:8,
    fontSize: 16,
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
    fontSize: 18,
    fontWeight: 'bold',
  },
  link:{
    flexDirection:'row',
    justifyContent:'center',
    marginTop: 10,  
  },
  switchText: {
    color: 'white',
    fontSize: 14,
  },
  
  signupText: {
    fontSize:14,
    fontWeight: 'bold',
    color: '#ffffff',
  }
  
});
