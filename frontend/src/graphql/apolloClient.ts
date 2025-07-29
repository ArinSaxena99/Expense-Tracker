// import { ApolloClient, InMemoryCache,HttpLink } from "@apollo/client";

// const client = new ApolloClient({
//     link:new HttpLink({
//         uri:'http://192.168.1.68:8000/graphql',

//     }),
    
//     cache: new InMemoryCache(),
// })
// export default client;
import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, from } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setContext } from '@apollo/client/link/context';

const httpLink = new HttpLink({
  uri: 'http://192.168.1.68:8000/graphql',
});

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem('token');
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;

