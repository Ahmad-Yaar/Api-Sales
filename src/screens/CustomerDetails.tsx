import React, { PureComponent } from 'react';
import {View,FlatList} from 'react-native';
import {  Appbar, List, PaperProvider } from 'react-native-paper';

class CustomerDetails extends PureComponent {


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
                <List.Item
                    title={item.customerName}
                    description="Visit Status"
                    right={props => <List.Icon {...props} icon="logout-variant" color='#ffff' />}
                    style={{ backgroundColor: '#0d8679', borderRadius: 20, margin: 5 }}
                    titleStyle={{ color: '#ffff', fontWeight: 'bold' }}
                    descriptionStyle={{ color: '#ffff' }}
                />
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

export default CustomerDetails;