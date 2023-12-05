
import 'react-native-gesture-handler';
import { ScrollView } from 'react-native';

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { PaperProvider, TextInput, Checkbox, Snackbar, ActivityIndicator, Portal, Modal, Appbar, Text } from 'react-native-paper';
import { Button } from 'react-native-paper';

const CheckIn = ({ navigation }: { navigation: any }) => {


    const [empId, setEmpId] = useState('');
    const [status, setStatus] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [geo_Location, setGeo_Location] = useState('');
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = React.useState(false);


    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const handleSubmit = () => {
        setLoading(true);
        fetch('https://api.apithreesixty.com/api/Attendence/SaveAttendence', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                empId: empId,
                status: status,
                latitude: latitude,
                longitude: longitude,
                geo_Location: geo_Location,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                setUserData(data);
                console.warn(data)
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };


    return (
        <PaperProvider>
            <Appbar.Header style={{ backgroundColor: '#0d8679' }}>
                <Appbar.Action icon="arrow-left" mode="contained" onPress={() => navigation.navigate("Dashboard")} />
                <Appbar.Content title="Check-In" titleStyle={{ color: '#ffff' }} />
            </Appbar.Header>
            <ScrollView style={styles.container}>
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal}>
                        <Appbar.Header style={{ backgroundColor: '#0d8679', borderStartEndRadius: 50 }}>
                            <Appbar.Content title={"Attendence"} titleStyle={{ color: '#ffff', alignSelf: 'center' }} />
                        </Appbar.Header>
                        <View style={{ backgroundColor: '#ffff', padding: 5 }}>
                            {/* input fields to enter credential details */}
                            <TextInput
                                mode="outlined"
                                label="Employ ID"
                                value={empId}
                                inputMode='numeric'
                                onChangeText={setEmpId}
                                style={styles.input}
                            />
                            <TextInput
                                mode="outlined"
                                value={status}
                                label="Status"
                                onChangeText={setStatus}
                                style={styles.input}
                            />
                            <TextInput
                                mode="outlined"
                                inputMode='decimal'
                                label="Latitude"
                                value={latitude}
                                onChangeText={setLatitude}
                                style={styles.input}
                            />
                            <TextInput
                                inputMode='decimal'
                                mode="outlined"
                                label="Longitude"
                                value={longitude}
                                onChangeText={setLongitude}
                                style={styles.input}
                            />
                            <TextInput
                                mode="outlined"
                                label="Geolocation"
                                value={geo_Location}
                                onChangeText={setGeo_Location}
                                style={styles.input}
                            />
                            <Button icon="content-save-check" onPress={handleSubmit} mode="outlined" style={styles.button} textColor='#e77320'
                            >
                                {loading ? (
                                    <ActivityIndicator animating={true} color="white" />
                                ) : (
                                    <Text>Save</Text>
                                )}
                            </Button>
                        </View >

                    </Modal>
                </Portal>
                {/* btn to save input data and generate a transation */}
                <Button icon="content-save-check" onPress={showModal} mode="contained" style={styles.buttonEnd}>
                    Attendence
                </Button>
            </ScrollView>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({

    container: {
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 10,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        margin: 30,
        textAlign: 'center',
        color: '#ef8130',
    },
    checkbox: {
        marginTop: 10,
        marginBottom: 20,
    },
    input: {
        marginBottom: 15,
    },
    loginButton: {
        marginTop: 10,
    },
    button: {
        width: 150,
        marginHorizontal: 8,
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: 20,
        borderColor: '#e77320',
        fontWeight: 'bold',

    },
    buttonEnd: {
        backgroundColor: '#e77320',
        maxWidth: '80%',
        justifyContent: 'center',
        alignSelf: 'center',
    },
});

export default CheckIn;
