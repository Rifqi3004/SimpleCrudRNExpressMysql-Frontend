import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {
 Container, Header, Content, List, ListItem, Input, Fab, Button, Icon, Body, Item, Right, Left, Card
} from 'native-base'
import axios from 'axios'

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name : '',
        ponsel : '',
        company : '',
        email : '',
    };
  }

  save = ()=>{ 
      let data = {
          name : this.state.name,
          ponsel : this.state.ponsel,
          company : this.state.company,
          email : this.state.email
      }
      const self =this
      axios.post('http://192.168.0.62:5000/postdata', data)
      .then(function(response){
          (response.data == 'sukses')?
           alert('sukses') :
          console.log(response)
          self.props.navigation.pop()
      }).catch(function(err){
          alert('error')
          console.log(err)
      })
  }

  render() {
    return (
      <Container style={{ backgroundColor : '#f0f0f0' }}>
          <Content>
              <View style={{ flexDirection : 'column' , backgroundColor : '#ffffff'}}>
                  <View style={{ flexDirection : 'row' }}>
                        <View style={{ flex : 1, paddingLeft : 15 , }}>
                            <TouchableOpacity
                            onPress={
                                () => this.props.navigation.pop()
                            }
                            >
                                <Icon name="close" style={{ fontSize : 30 }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex : 5, justifyContent : 'center', alignItems : 'center' }}>
                            <Text style={{ color : '#0d98e8', fontSize : 20 }}>
                                add Kontak
                            </Text>
                        </View>
                        <View style={{ flex : 1, paddingRight : 5 }}>
                            <TouchableOpacity
                            onPress = {
                                () => this.save()
                            }
                            >
                                <Icon name="checkmark" style={{ fontSize : 30 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flex:1, height : 200 , alignItems : 'center', justifyContent : 'center'}}>
                        <Image style={{ height : 70, width : 70 }}
                        source={{ uri : 'http://www.stickpng.com/assets/images/585e4bf3cb11b227491c339a.png' }} />
                    </View>
                    <View style={{ flex:1 }}>
                        <Item style={{ padding : 5 }}>
                            <Input placeholder="nama" placeholderTextColor="#cecaca" 
                             value={this.state.name}
                             onChangeText = {
                                 (text) => this.setState({name : text})
                             }
                            />
                        </Item>
                        <Item style={{ padding : 5 }}>
                            <Input placeholder="nama perusahaan" placeholderTextColor="#cecaca" 
                            value={this.state.company}
                            onChangeText = {
                                (text) => this.setState({company : text})
                            }
                            />
                        </Item>
                    </View>
              </View>
              
              <View style={{ backgroundColor : '#ffffff', marginTop : 20 }}>
                <Item>
                    <Input placeholder="Telepon" placeholderTextColor="#cecaca"
                    value={this.state.ponsel}
                    onChangeText = {
                        (text) => this.setState({ponsel : text})
                    }
                    />
                </Item>
                <Item>
                    <Input placeholder="Email" placeholderTextColor="#cecaca"
                    value={this.state.email}
                    onChangeText = {
                        (text) => this.setState({email : text})
                    }
                    />
                </Item>
              </View>
          </Content>
      </Container>
    );
  }
}
