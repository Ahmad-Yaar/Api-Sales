import { Share, ScrollView, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { Appbar, Button, IconButton, Modal, PaperProvider, Portal, RadioButton, Surface, Text, TextInput } from 'react-native-paper'
import moment from 'moment'
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';




const Recovery = ({ navigation }: { navigation: any }) => {
    const [radioValue, setRadioValue] = useState('Online');
    const [visible, setVisible] = React.useState(false);
    const [amount, setAmout] = useState('');
    const [bName, setbName] = useState('');
    const [chNum, setchNum] = useState('');
    //Show and hide fields on the basis of radio btn selection
    const [showInputFields, setShowInputFields] = useState(false);
    const ShowFields = () => {
        setShowInputFields(true);
    };

    const HideFields = () => {
        setShowInputFields(false);
    };

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);


    //filepicker to add an attachment
    const containerStyle = { backgroundColor: '#fffefe', padding: 2 };
    const shareData = async () => {
        try {
            await Share.share({
                message:
                    "Transaction Successfull",
            });
        } catch (err) {
            alert(err);
        }
    };

    const [selectedFile, setSelectedFile] = useState<DocumentPickerResponse | null>(null);

    const pickDocument = async () => {
        try {
            const result = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            setSelectedFile(result);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
            } else {
                throw err;
            }
        }
    };

    return (

        <PaperProvider>
            <Appbar.Header style={{ backgroundColor: '#0d8679' }}>
                <Appbar.Action icon="arrow-left" mode="contained" onPress={() => navigation.navigate("VisitDetails")} />
                <Appbar.Content title="Recovery" titleStyle={{ color: '#ffff' }} />
            </Appbar.Header>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.container}>

                    {/* Column 1  @keys */}
                    <View style={styles.column}>
                        <Text style={styles.items} variant="titleLarge">Date:</Text>
                        <Text style={styles.items} variant="titleLarge">C Code:</Text>
                        <Text style={styles.items} variant="titleLarge">Name:</Text>
                        <Text style={styles.items} variant="titleLarge">Address:</Text>
                        <Text style={styles.items} variant="titleLarge">Amount:</Text>

                    </View>

                    {/* Column 2    @Values*/}
                    <View style={styles.column}>
                        <Text style={styles.time} variant="titleMedium">{moment().format('D / M / YY')} </Text>
                        <Text style={styles.items} variant="titleLarge">124</Text>
                        <Text style={styles.items} variant="titleLarge">Ali</Text>
                        <Text style={styles.items} variant="titleMedium">Gujranwla</Text>
                        <TextInput
                            mode="outlined"
                            style={styles.amount}
                            textColor="#fe2828"
                            onChangeText={(amount) => setAmout(amount)}
                            activeOutlineColor='#fe2828'
                            keyboardType='numeric'
                        />
                    </View>
                </View>

                {/* radio bnts for transactions/payment method selection */}
                <View style={styles.radioContainer}>
                    <RadioButton.Group
                        onValueChange={(value) => setRadioValue(value)}
                        value={radioValue}


                    >
                        <View style={styles.row}>
                            <RadioButton.Android value="Online" color='#fe2828' onTouchEnd={HideFields} />
                            <Text variant="titleLarge">Online</Text>
                            <RadioButton.Android value="Cash" color='#fe2828' onTouchEnd={HideFields} />
                            <Text variant="titleLarge">Cash</Text>
                            <RadioButton.Android value="Cheque" color='#fe2828' onTouchEnd={ShowFields} />
                            <Text variant="titleLarge" >Cheque</Text>
                        </View>
                    </RadioButton.Group>
                </View>
                {/* Fields only shown in case of cheque payment method */}
                {showInputFields && (
                    <View style={styles.container}>

                        <View style={styles.column}>
                            <Text style={styles.items} variant="titleLarge">Bank Name:</Text>
                            <Text style={styles.items} variant="titleLarge">Cheque No.:</Text>
                            <Text style={styles.items} variant="titleLarge">Cheque Date:</Text>
                        </View>
                        <View style={styles.column}>
                            <TextInput
                                mode="outlined"
                                style={styles.amount}
                                onChangeText={(bName) => setbName(bName)}
                                textColor="#fe2828"
                                activeOutlineColor='#fe2828'
                            />
                            <TextInput
                                mode="outlined"
                                style={styles.amount}
                                onChangeText={(chNum) => setchNum(chNum)}
                                textColor="#fe2828"
                                activeOutlineColor='#fe2828'

                            />
                            <TextInput
                                mode="outlined"
                                style={styles.amount}
                                textColor="#fe2828"
                                activeOutlineColor='#fe2828'
                                value={moment().format('D / M / YY')}
                            />

                        </View>

                    </View>
                )}

                {/* Field to add any message with transaction reciept */}
                <TextInput
                    mode="outlined"
                    style={styles.notes}
                    numberOfLines={4}
                    multiline={true}
                    label="Notes"
                />
                <Button icon="file" onPress={pickDocument} mode="contained" style={styles.buttonEnd}
                >
                    Attachment
                </Button>
                {selectedFile && (
                    <Text>
                        Selected File: {selectedFile.name} ({selectedFile.type})
                    </Text>
                )}
                

                {/* Modal which generates a transactional reciept */}
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle} >
                        <Appbar.Header style={{ backgroundColor: '#0d8679', borderStartEndRadius: 50 }}>
                            <Appbar.Content title={radioValue + " Payment"} titleStyle={{ color: '#ffff', alignSelf: 'center' }} />
                        </Appbar.Header>
                        <View style={styles.row}>
                            <Text variant="headlineSmall" style={{ alignSelf: 'center' }}>
                                <IconButton
                                    icon="check-decagram"
                                    mode='contained'
                                    size={20}
                                    iconColor='#0aa06e'
                                />
                                Transaction Successful
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <Text variant="labelLarge">Voucher Id</Text>
                            <Text variant="labelLarge">123f</Text>
                        </View>
                        <Text variant="labelLarge" style={{ textAlign: 'center' }}>{moment().format('lll')}</Text>
                        <Text variant="headlineLarge" style={styles.tAmount}>Amount: {amount} </Text>



                        <View style={styles.row}>
                            <View style={styles.column}>
                                <Text style={styles.rItems} variant="titleLarge">Customer Code:</Text>
                                <Text style={styles.rItems} variant="titleLarge">Name:</Text>
                                <Text style={styles.rItems} variant="titleLarge">Address:</Text>
                                <Text style={styles.rItems} variant="titleLarge">Recieved By:</Text>
                                {showInputFields && (
                                    <><Text style={styles.rItems} variant="titleLarge">Bank Name:</Text><Text style={styles.rItems} variant="titleLarge">Cheque No.:</Text><Text style={styles.rItems} variant="titleLarge">Cheque Date:</Text></>
                                )}

                            </View>
                            <View style={styles.column}>
                                <Text style={styles.items} variant="titleLarge">2736:</Text>
                                <Text style={styles.items} variant="titleLarge">Ali</Text>
                                <Text style={styles.items} variant="titleLarge">pir:</Text>
                                <Text style={styles.items} variant="titleLarge">Rec name:</Text>
                                {showInputFields && (
                                    <><Text style={styles.items} variant="titleLarge">{bName}</Text><Text style={styles.items} variant="titleLarge">{chNum}</Text><Text style={styles.items} variant="titleLarge">{moment().format('ll')}</Text></>
                                )}
                            </View>
                        </View>

                        <Button icon="share-variant-outline" mode="outlined" style={styles.button} textColor='#e77320'
                            onPress={shareData}
                        >
                            Share
                        </Button>

                        <Text variant="labelLarge" style={{ textAlign: 'center', marginBottom: 5 }}>Securely sent via <Text variant='titleLarge' style={{ color: '#e77320' }} >360 SalesApp</Text> </Text>

                    </Modal>
                </Portal>
                {/* btn to save input data and generate a transation */}
                <Button icon="content-save-check" onPress={showModal} mode="contained" style={styles.buttonEnd}>
                    Save
                </Button>
            </ScrollView>
        </PaperProvider>


    )
}

export default Recovery

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    column: {
        flex: 1,
        alignItems: 'flex-start',
        marginLeft: 40,
    },

    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        alignItems: 'baseline',
    },


    time: {
        marginBottom: 10,
        width: '90%',
        height: 30,
        borderWidth: 1,
        borderRadius: 5,
        textAlign: 'center'
    },
    amount: {
        marginBottom: 5, width: '90%', height: 30, fontWeight: 'bold'
    },
    notes: {
        marginBottom: 10, width: '85%',
        alignSelf: 'center',
        marginStart: 15,


    },
    tAmount: {
        alignSelf: 'center', color: '#ff0c0c', fontWeight: 'bold',
        marginBottom: 15

    },
    items: {
        marginBottom: 8
    },
    rItems: {
        marginBottom: 8,
        fontWeight: 'bold'
    },
    radioContainer: {
        flex: 1, // Equal width for radio buttons
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start', // Align radio buttons to the left
    },
    buttonEnd: {
        backgroundColor: '#e77320',
        maxWidth: '40%',
        marginHorizontal: 8,
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: 20,
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





})

function alert(message: any) {
    throw new Error('Function not implemented.')
}
