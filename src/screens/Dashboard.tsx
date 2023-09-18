import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Button, Appbar, Drawer, Menu, Divider } from 'react-native-paper';
import { IconButton, Provider as PaperProvider } from 'react-native-paper';

const Dashboard = ({ navigation }: { navigation: any }) => {
  
  const [state, setState] = React.useState({ open: false });
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);



  const onStateChange = ({ open }: { open: any }) => setState({ open });
  const { open } = state;
  return (

    <PaperProvider>

      <Appbar.Header style={{ backgroundColor: '#0d8679' }}>

        {/* Menu bar for navigation in app */}
        <Menu
          visible={visible}
          anchorPosition='bottom'
          onDismiss={closeMenu}
          anchor={<Appbar.Action icon="menu-open" mode="contained" onPress={openMenu} />}>
          <Menu.Item onPress={() => { }} title="Menu" />
          <Menu.Item onPress={() => { }} titleStyle={{ fontStyle: 'italic' }} disabled
           title="Dashboard" leadingIcon="view-dashboard" />
          <Divider />
          <Menu.Item onPress={() => navigation.navigate("Visits")} title="Visits" titleStyle={{ fontStyle: 'italic' }} leadingIcon="account-group" />
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

        </Menu>
        {/* End of menu bar*/}
        {/* Title and back button */}
        <Appbar.Content title="360 SalesApp" titleStyle={{ textAlign: 'center', color: '#ffff',fontWeight:'bold' }} />
        <Appbar.Action icon="sync" mode="contained" onPress={() => navigation.navigate("SyncData")} />
      </Appbar.Header>
      {/* Navigation btns */}
      <View style={styles.container}>
        <Button icon="map-marker-account" mode="contained" style={styles.buttonCh}>
          Check-In for the wick jhon
        </Button>
        <View style={styles.row}>
          <Button icon="account-group" mode="contained" style={styles.button}
            onPress={() => navigation.navigate("Visits")}
          >
            Visits
          </Button>
          <Button icon="frequently-asked-questions" mode="contained" style={styles.button}>
            Requests
          </Button>
        </View>

        <View style={styles.row}>
          <Button icon="cash-register" mode="contained" style={styles.button}>
            Expense
          </Button>
          <Button icon="account-details" mode="contained" style={styles.button}>
            Prospects
          </Button>

        </View>
        <View style={styles.row}>
          <Button icon="badge-account" mode="contained" style={styles.button}>
            Reports
          </Button>
        </View>
      </View>

      
      
    </PaperProvider>
  );


}

export default Dashboard

const styles = StyleSheet.create({



  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#0d8679',
    flex: 1,
    maxWidth: '40%',
    marginHorizontal: 8,
    marginTop: 20
  },
  buttonCh: {
    backgroundColor: '#e77320',
    marginBottom: 20,
  },


})