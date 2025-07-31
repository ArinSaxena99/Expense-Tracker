import { useQuery } from "@apollo/client";
import { GET_EXPENSES } from "../../../graphql/query";
import { Text } from "react-native";

const allExpense =() => {
    const { loading, error, data } = useQuery(GET_EXPENSES);
      if (loading) return <Text>Loading...</Text>;
      if (error) return <Text>Error loading data...</Text>;
      
}