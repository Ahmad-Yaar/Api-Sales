import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native-reanimated/lib/typescript/Animated'

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
        <View>
            <Text> {JSON.stringify(data,null,2)} </Text>
        </View>
    )
}

export default SyncData

const styles = StyleSheet.create({})