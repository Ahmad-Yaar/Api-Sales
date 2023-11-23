import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { Button } from 'react-native-paper';
import axios from 'axios';

interface MyData {
  visitsToday: number;
  image: string;
  name: string | null;
  status: string;
}

interface MyScreenProps {
  salesManId: string; // Assuming salesManId is a string, adjust as needed
}

const ExpenseDetail: React.FC<MyScreenProps> = ({ salesManId }) => {
  const [data, setData] = useState<MyData>({
    visitsToday: 0,
    image: '',
    name: null,
    status: '',
  });

  useEffect(() => {
    // Fetch data from the API on component mount
    fetchData();
  }, [salesManId]);

  const fetchData = async () => {
    try {
      // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint
      const response = await axios.get(`https://api.apithreesixty.com/api/Home/GetHome?salesManId=1`, {
        params: {
          salesManId: salesManId,
        },
      });

      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {data.image ? (
        <Image source={{ uri: data.image }} style={{ width: 100, height: 100, borderRadius: 50 }} />
      ) : (
        <Text>No Image</Text>
      )}
      <Text>Name: {data.name || 'N/A'}</Text>
      <Text>Visits Today: {data.visitsToday}</Text>
      <Text>Status: {data.status}</Text>

      <Button mode="contained" onPress={fetchData} style={{ marginTop: 20 }}>
        Refresh Data
      </Button>
    </View>
  );
};

export default ExpenseDetail;