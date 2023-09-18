import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatList, ActivityIndicator } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';

const SyncData = () => {

    const [data, setData] = useState()
    const handleFetchData = () => {
        fetch('https://api.apithreesixty.com/api/General/SyncDownload', {
            method: 'GET',

        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((responseData) => {
                setData(responseData);
            })
            .catch((error) => {
                console.error(error);
            });
    }
    useEffect(() => {
        handleFetchData();
    }, [])




    return (
        <ScrollView>
            <View>

                <Text>{JSON.stringify(data, null, 2)}</Text>
            </View>
        </ScrollView>
    )
}

export default SyncData

const styles = StyleSheet.create({})