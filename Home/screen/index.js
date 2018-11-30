
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, ScrollView, RefreshControl} from 'react-native';
import {
 Container, Header, Content, List, ListItem, Input, Fab, Button, Icon, Body, Item, Right
} from 'native-base'
import axios from 'axios'

export default class App extends Component{
   
    constructor(){
        super()
        this.state = {
            data : [],
            cari : false,
            refreshing : false
        }
    }
 getData = () =>{
    const self = this
    axios.get('http://192.168.0.62:5000/getdatas')
    .then(function(response){
        self.setState({
            data : response.data
        })
    })
 }

 cariData = (key) => {
    const self = this
    axios.get('http://192.168.0.62:5000/search?name='+key)
    .then(function(response){
        self.setState({
            data : response.data,
            cari : true
        })
    }) 
 }
 componentDidMount(){
    this.getData()     
 }

componentDidUpdate(){ 
    (this.state.cari == false)?
    this.getData() : undefined
}


  render() {
    return (
      <Container>
          <Header style={{ backgroundColor : '#fffff' }}>
              <Body style={{ alignItems : 'center', justifyContent : 'center' }}>
                    <Text style={{ color : '#0d98e8', fontSize : 20 }}>
                        Kontak
                    </Text>
              </Body>
              <Right style={{ paddingRight : 15 }}>
                <TouchableOpacity
                 onPress={
                     () => this.props.navigation.navigate('CreateScreen')
                 }
                >
                    <Icon name="ios-add-circle-outline" style={{ color : '#0d98e8', fontSize : 30 }} />
                </TouchableOpacity>
              </Right>
          </Header>
          <Content>
                <View style={{ padding : 5 , paddingBottom : 10}}>
                    <Item style={{ backgroundColor : '#eaeaea', borderRadius : 10 , paddingLeft : 10}}>
                        <Icon name="search" style={{ color : '#b2b0b0' , fontSize : 23}} ></Icon>
                        <Input placeholder='cari kontak' placeholderTextColor="#b2b0b0"                        
                            onChangeText ={
                                (text) => this.cariData(text)
                            }
                        ></Input>
                    </Item>
                </View>
                <View style={{ backgroundColor : '#eaeaea' }}>
                    <List dataArray={this.state.data}
                        renderRow={(item) =>
                        <ListItem
                            onPress = {
                                () => this.props.navigation.navigate('EditScreen', {data : item})
                            }
                        >
                            <Text>{item.name}</Text>
                        </ListItem>
                        }>
                    </List> 
                </View>    
          </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
