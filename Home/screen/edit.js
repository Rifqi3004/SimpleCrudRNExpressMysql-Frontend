import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Image, Alert} from 'react-native';
import {
 Container, Header, Content, List, ListItem, Input, Fab, Button, Icon, Body, Item, Right, Left, Card
 ,ActionSheet, Picker, Footer
} from 'native-base'
import axios from 'axios'

var BUTTONS = [
    { text: "Option 0", icon: "american-football", iconColor: "#2c8ef4" },
    { text: "Option 1", icon: "analytics", iconColor: "#f42ced" },
    { text: "Option 2", icon: "aperture", iconColor: "#ea943b" },
    { text: "Delete", icon: "trash", iconColor: "#fa213b" },
    { text: "Cancel", icon: "close", iconColor: "#25de5b" }
  ];
  var DESTRUCTIVE_INDEX = 3;
  var CANCEL_INDEX = 4;

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
        id : this.props.navigation.state.params.data.id ,
        name : this.props.navigation.state.params.data.name,
        ponsel : this.props.navigation.state.params.data.ponsel,
        company : this.props.navigation.state.params.data.company,
        email : this.props.navigation.state.params.data.email,
        edit : false,
        data : [],
        selected : undefined
    };
  }

  getData = () =>{
    const self = this
    axios.get('http://192.168.0.62:5000/getdata?id='+this.state.id)
    .then(function(response){
        const data = response.data
        self.setState({
            name : data.name,
            ponsel : data.ponsel,
            company : data.company,
            email : data.email
        })
    })
 }
 
  componentDidUpdate(){
    //   this.getData()
  }

 cancelEdit(){
    this.setState({
        edit : !this.state.edit,
        name : this.props.navigation.state.params.data.name,
        ponsel : this.props.navigation.state.params.data.ponsel,
        company : this.props.navigation.state.params.data.company,
        email : this.props.navigation.state.params.data.email,
    })
 }

  save = ()=>{ 
      let data = {
          name : this.state.name,
          ponsel : this.state.ponsel,
          company : this.state.company,
          email : this.state.email
      }
      const self =this
      if(this.state.name==""){
        alert("nama tidak boleh kosong")
      }else if(this.state.company==""){
        alert("company tidak boleh kosong")
      }else if(this.state.ponsel==""){
        alert("nomor ponsel tidak boleh kosong")
      }else if(this.state.email==""){
        alert("email tidak boleh kosong")
      }else{
        axios.put('http://192.168.0.62:5000/updatedata?id='+this.state.id, data)
        .then(function(response){
            (response.data == 'sukses')?
             alert('sukses') :
            console.log(response)
            self.setState({
                edit : false
            })
        }).catch(function(err){
            alert('error')
            console.log(err)
        })
      }
  }
  
  delete(){
    const self = this
    Alert.alert(
        'Yakin mau hapus Kontak Ini ?',
        null,
        [         
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'OK', onPress: () => 
            axios.delete('http://192.168.0.62:5000/deldata?id='+this.state.id)
            .then(function(response){
                alert(response.data +' data berhasil di hapus')
                self.props.navigation.navigate('HomeScreen',{cari : false})
            }).catch(function(err){
                alert('error')
                console.log(err)
            })
          },
        ],
        { cancelable: false }
      )
  }

  render() {
    return (
      <Container style={{ backgroundColor : '#f0f0f0' }}>
          <Content>
              <View style={{ flexDirection : 'column' , backgroundColor : '#ffffff'}}>
                  <View style={{ flexDirection : 'row' }}>
                        <View style={{ flex : 1, paddingLeft : 15 , }}>
                            {
                                (this.state.edit == false)?
                                    <TouchableOpacity
                                    onPress={
                                        () => this.props.navigation.pop()
                                    }
                                    >
                                        <Icon name='ios-arrow-back' style={{ fontSize : 30 }} />
                                    </TouchableOpacity>
                                :
                                <TouchableOpacity
                                onPress={
                                    () => this.cancelEdit()
                                }
                                >
                                    <Icon name='close' style={{ fontSize : 30 }} />
                                </TouchableOpacity>
                                
                            }
                        </View>
                        <View style={{ flex : 5, justifyContent : 'center', alignItems : 'center' }}>
                            <Text style={{ color : '#0d98e8', fontSize : 20 }}>
                                {(this.state.edit == true)?'edit kontak': this.state.name}
                            </Text>
                        </View>
                        <View style={{ flex : 1, paddingRight : 5 }}>
                            {
                                (this.state.edit == true)?
                                    <TouchableOpacity
                                    onPress = {
                                        () => this.save()
                                    }
                                    >
                                        <Icon name="checkmark" style={{ fontSize : 30 }} />
                                    </TouchableOpacity>
                                 :
                                 <TouchableOpacity
                                  onPress={
                                      ()=> this.setState({
                                          edit : true
                                      })
                                  }
                                 >
                                  <Icon name='ios-create-outline' style={{ fontSize : 30 }} />
                                 </TouchableOpacity>
                            }
                        </View>
                    </View>
                    <View style={{ flex:1, height : 200 , alignItems : 'center', justifyContent : 'center'}}>
                        <Image style={{ height : 70, width : 70 }}
                        source={{ uri : 'http://www.stickpng.com/assets/images/585e4bf3cb11b227491c339a.png' }} />
                    </View>
                    <View style={{ flex:1 }}>
                        <Item style={{ padding : 5 }}>
                            <Input placeholder="nama" placeholderTextColor="#cecaca" 
                             editable={
                                 (this.state.edit == true)?true:false
                             }
                             value={this.state.name}
                             onChangeText = {
                                 (text) => this.setState({name : text})
                             }
                            />
                        </Item>
                        <Item style={{ padding : 5 }}>
                            <Input placeholder="nama perusahaan" placeholderTextColor="#cecaca" 
                            editable={
                                (this.state.edit == true)?true:false
                            }
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
                    editable={
                        (this.state.edit == true)?true:false
                    }
                    value={this.state.ponsel}
                    onChangeText = {
                        (text) => this.setState({ponsel : text})
                    }
                    />
                </Item>
                <Item>
                    <Input placeholder="Email" placeholderTextColor="#cecaca"
                    editable={
                        (this.state.edit == true)?true:false
                    }
                    value={this.state.email}
                    onChangeText = {
                        (text) => this.setState({email : text})
                    }
                    />
                </Item>
              </View>
          </Content>
          {(this.state.edit== true)?
            <Footer style={{ alignItems: 'center', justifyContent :'center', backgroundColor : '#fff' }}>
                <TouchableOpacity
                 onPress={
                     () => this.delete()
                 }
                >
                    <Icon name='trash' style={{ color : 'red', fontSize : 35 }}></Icon>
                </TouchableOpacity>
            </Footer>
            :
            undefined
          }
      </Container>
    );
  }
}
