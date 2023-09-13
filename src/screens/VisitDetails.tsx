import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RNCamera } from 'react-native-camera';

import { Appbar, Button, IconButton, Modal, PaperProvider, Portal, RadioButton, Surface, Text, TextInput } from 'react-native-paper'

const VisitDetails = ({ navigation }: { navigation: any }) => {
    const [selected, setSelected] = useState('option2');
    const [visible, setVisible] = React.useState(false);

    const [currentTime, setCurrentTime] = useState(new Date());
    const [isTimerRunning, setIsTimerRunning] = useState(true);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: 'white' };

    // for Modal


    useEffect(() => {
        let intervalId: string | number | NodeJS.Timeout | undefined;
        // timer
        if (isTimerRunning) {
            intervalId = setInterval(() => {
                setCurrentTime(new Date());
            }, 1000);
        } else {
            clearInterval(intervalId); // Stop the timer
        }

        return () => clearInterval(intervalId);
    }, [isTimerRunning]);

    const toggleTimer = () => {
        setIsTimerRunning(!isTimerRunning);
    };


    return (
        <PaperProvider>
            <Appbar.Header style={{ backgroundColor: '#0d8679' }}>
                <Appbar.Action icon="arrow-left" mode="contained" onPress={() => navigation.navigate("Visits")} />
                <Appbar.Content title="Visit Details" titleStyle={{ color: '#ffff' }} />
            </Appbar.Header>
            <View style={styles.container}>
                {/* Customer info */}
                <Text variant="headlineMedium">Customer name</Text>
                <View style={styles.row}>
                    <Text variant="labelMedium">Customer Address</Text>
                    <Text variant="labelMedium">Customer code</Text>
                </View>
                <View style={styles.row}>
                    <Text variant="titleMedium">Last Visit status</Text>
                    <IconButton
                        icon="file-eye"
                        size={20}
                    />
                </View>

                {/* //Last Visit Information */}
                <Surface style={styles.surface} elevation={1}>
                    <Text>Info to be rendered</Text>
                </Surface>

                {/* Buttons for Further */}
                <View style={styles.row}>
                    <Button icon="sync-circle" mode="contained" style={styles.button}
                        onPress={() => navigation.navigate("Recovery")}
                    >
                        Recovery
                    </Button>
                    <Button icon="file-document-edit" mode="contained" style={styles.button}>
                        Order
                    </Button>
                </View>
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                        <Appbar.Header style={{ backgroundColor: '#0d8679', borderStartEndRadius: 50 }}>
                            <Appbar.Content title={"Defer Reasons"} titleStyle={{ color: '#ffff', alignSelf: 'center' }} />
                        </Appbar.Header>
                        <View style={styles.row}>
                            <TextInput
                                mode="outlined"
                                style={styles.notes}
                                numberOfLines={4}
                                multiline={true}
                                label="Provide Reasons to Defer Visit"
                            />
                            <Button icon="file-document-edit" mode="contained" style={styles.button}>
                                Order
                            </Button>
                        </View>
                    </Modal>
                </Portal>
                <View style={styles.row}>
                    <Button icon="badge-account-alert" mode="contained" style={styles.button}>
                        Complaint
                    </Button>
                    <Button icon="timetable" mode="contained" style={styles.button} onPress={showModal} >
                        Defer Visit
                    </Button>
                </View>
                {/* Modal to provide reason for defer */}

                <View style={styles.row}>
                    <Button icon="message-reply-text" mode="contained" style={styles.button}>
                        Remarks
                    </Button>
                    <Button icon="timetable" mode="contained" style={styles.button}>
                        Re-Schedule
                    </Button>
                </View>

                {/* Radio buttons for recovery information */}

                <RadioButton.Group onValueChange={newValue => setSelected(newValue)} value={selected}>
                    <View style={styles.row}>
                        <RadioButton.Android value="option1" />
                        <Text>Recovery Obtained</Text>
                        <RadioButton.Android value="option2" />
                        <Text>Recovery Not Obtained</Text>
                    </View>
                </RadioButton.Group>

                {/* Visit Duration Calculater */}
                <View style={styles.row}>
                    <Text variant="titleLarge">Start Time:</Text>
                    <TextInput
                        mode="outlined"
                        value={currentTime.toLocaleTimeString()}
                        style={styles.time}
                        editable={false}
                    />
                </View>
                <View style={styles.row}>
                    <Text variant="titleLarge">End:</Text>
                    <TextInput
                        mode="outlined"
                        value={currentTime.toLocaleTimeString()}
                        style={styles.time}
                        editable={false}
                    />
                </View>
                <View style={styles.row}>
                    <Text variant="titleLarge">Spent Time:</Text>
                    <TextInput
                        mode="outlined"
                        label=""
                        style={styles.time}
                        editable={false}
                    />
                </View>

                {/* Button to end visit */}

                <Button icon="page-last" mode="contained" style={styles.buttonEnd}

                    onPress={toggleTimer}
                >
                    {isTimerRunning ? 'End Visit' : 'End Visit'}
                </Button>
            </View>


        </PaperProvider>
    )
}


export default VisitDetails

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
    },
    time: {
        marginBottom: 10,
        width: 200,
        height: 30
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'baseline',
    },
    surface: {
        padding: 8,
        height: 'auto',
        width: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#0d8679',
        flex: 1,
        maxWidth: '40%',
        marginHorizontal: 8,
        marginTop: 20
    },
    notes: {
        marginBottom: 20, width: '85%',
        alignSelf: 'center',
        marginHorizontal: 25
    },
    buttonEnd: {
        backgroundColor: '#e77320',
        maxWidth: '40%',
        marginHorizontal: 8,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 20
    },
})