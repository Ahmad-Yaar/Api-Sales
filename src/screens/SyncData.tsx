import React, { PureComponent } from 'react';
import {
    StatusBar,
    StyleSheet,
    SafeAreaView,
    Text,
    View,
    TouchableOpacity,
    FlatList
} from 'react-native';
import {  Appbar, List, PaperProvider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons'

class SyncData extends PureComponent  {


    constructor({ props }: { props: any } ) {
        super(props);

        this.state = {
            customers: []
        }
    }


    fetchItem() {
        requestAnimationFrame(() =>
            fetch(`https://api.apithreesixty.com/api/General/SyncDownload`, {
                method: 'GET',
            })
                .then(response => response.json())
                .then(responseJson => {
                    this.setState({ customers: responseJson.customers })
                })
                .catch(error => {
                    {
                        console.log(error)
                    }
                }),
        );
    }


    renderCustomers = ({ item }: { item: any }) => (
        <View style={{ marginTop: 0 }}>

            <List.Section>
                <List.Accordion
                    style={{ backgroundColor: '#0d8679' }}
                    titleStyle={{ color: '#FFFFFF' }}
                    title={item.customerName.toUpperCase()}
                    left={props => <List.Icon {...props} icon="account-cash" color='#FFFFFF' />}>
                    <List.Item title={"Customer ID: "+ item.customerID} />
                    <List.Item title={"Name: "+ item.customerName.toUpperCase()} />
                    <List.Item title={"Name in Urdu"+ item.customerNameUrdu} />
                    <List.Item title={"customer Code: "+ item.customerCode} />
                    <List.Item title={"Address: "+ item.address} />
                    <List.Item title={"City Name: "+ item.cityName} />
                    <List.Item title={"City Name In Urdu: "+ item.cityNameInUrdu} />
                    <List.Item title={"PH no.: "+ item.phone_Number} />
                    <List.Item title={"Mobile For SMS: "+ item.mobileForSMS} />
                    <List.Item title={"Latitude: "+ item.latitude} />
                    <List.Item title={"longitude: "+ item.longitude} />
                    <List.Item title={"Sales Man Name: "+ item.salesManName} />
                    <List.Item title={"Name Urdu: "+ item.salesManNameUrdu} />
                </List.Accordion>
            </List.Section>
        </View>
    );


    componentDidMount() {
        this.fetchItem()
    }

    render() {
        return (
            <PaperProvider>
                <Appbar.Header style={{ backgroundColor: '#0d8679' }}>
                    <Appbar.Content title="Cutomers List" titleStyle={{ textAlign: 'center', color: '#ffff',fontWeight:'bold' }} />
                </Appbar.Header>
                <FlatList
                    removeClippedSubviews={true}
                    data={this.state.customers}
                    renderItem={item => this.renderCustomers(item)}
                />
            </PaperProvider>
        )
    }
}

export default SyncData;