import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Appbar, Button, Divider, FAB, IconButton, List, Menu, PaperProvider, Searchbar } from 'react-native-paper'
import Dashboard from './Dashboard';


const Visits = ({ navigation }: { navigation: any }) => {

    const [searchQuery, setSearchQuery] = React.useState('');
    const [state, setState] = React.useState({ open: false });
    const [visible, setVisible] = React.useState(false);
    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);
    const onChangeSearch = (query: React.SetStateAction<string>) => setSearchQuery(query);
    return (

        <PaperProvider>

            <Appbar.Header style={{ backgroundColor: '#0d8679' }}>
                <Menu
                    anchorPosition='bottom'
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={<Appbar.Action icon="menu-open" mode="contained" onPress={openMenu} />}>
                    <Menu.Item onPress={() => { }} title="Menu" />
                    <Menu.Item onPress={() => navigation.navigate("Dashboard")} titleStyle={{ fontStyle: 'italic' }}
                        title="Dashboard" leadingIcon="view-dashboard" />
                    <Divider />
                    <Menu.Item onPress={() => navigation.navigate("Visits")} disabled
                        title="Visits" titleStyle={{ fontStyle: 'italic' }} leadingIcon="account-group" />
                    <Divider />
                    <Menu.Item onPress={() => { }} titleStyle={{ fontStyle: 'italic' }} title="Check-in" leadingIcon="map-marker-account" />
                    <Divider />
                    <Menu.Item onPress={() => { }} titleStyle={{ fontStyle: 'italic' }} title="Requests" leadingIcon="frequently-asked-questions" />
                    <Divider />
                    <Menu.Item onPress={() => { }} titleStyle={{ fontStyle: 'italic' }} title="Expense" leadingIcon="cash-register" />
                    <Divider />
                    <Menu.Item onPress={() => { }} titleStyle={{ fontStyle: 'italic' }} title="Prospects" leadingIcon="account-details" />
                    <Divider />
                    <Menu.Item onPress={() => { }} titleStyle={{ fontStyle: 'italic' }} title="Reports" leadingIcon="badge-account" />
                    <Divider />

                </Menu>
                <Appbar.Content title="Visit Customers" titleStyle={{ textAlign: 'center', color: '#ffff', fontWeight: 'bold' }} />
                <Appbar.Action icon="sync" mode="contained" />
            </Appbar.Header>


            <View style={styles.container}>
                <View style={styles.row}>
                    <FAB
                        icon="timetable"

                        onPress={() => { }}
                    />
                    <Searchbar
                        placeholder="Search"
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                        style={{ width: 200, maxWidth: 'auto' }}

                    />
                    <FAB
                        icon="filter"
                        onPress={() => { }}
                    />

                </View>
                <View style={styles.row}>
                    <IconButton
                        icon="map-marker-radius"
                        size={30}
                        onPress={() => console.log('Pressed')}
                    />
                    <Button icon="account-convert" mode="contained" style={styles.button}>
                        Fetch
                    </Button>

                </View>
                <Text style={styles.text}>
                    Customers
                </Text>
                <List.Item
                    title="Customaer name"
                    description="Visit Status"
                    right={props => <List.Icon {...props} icon="logout-variant" color='#ffff' />}
                    onPress={() => navigation.navigate("VisitDetails")}
                    style={{ backgroundColor: '#0d8679', borderRadius: 20, margin: 5 }}
                    titleStyle={{ color: '#ffff', fontWeight: 'bold' }}
                    descriptionStyle={{ color: '#ffff' }}
                />
                <List.Item
                    title="Customaer name"
                    description="Visit Status"
                    right={props => <List.Icon {...props} icon="logout-variant" color='#ffff' />}
                    onPress={() => navigation.navigate("VisitDetails")}
                    style={{ backgroundColor: '#0d8679', borderRadius: 20, margin: 5 }}
                    titleStyle={{ color: '#ffff', fontWeight: 'bold' }}
                    descriptionStyle={{ color: '#ffff' }}
                />
            </View>
        </PaperProvider>
    )
}

export default Visits

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 10,
        justifyContent: 'flex-start',
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginBottom: 40,
    },
    button: {
        backgroundColor: '#dd6e1f',
        flex: 1,
        maxWidth: '40%',
        marginHorizontal: 8,
        marginTop: 10
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20

    }
})