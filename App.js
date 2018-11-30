import React from 'react'
import { createStackNavigator, createNavigationContainer } from 'react-navigation'
import Home from "./Home/screen/index"
import Create from "./Home/screen/create"
import Edit from "./Home/screen/edit"
const stack =  createStackNavigator(
  {
    HomeScreen : {
      screen : Home
    },
    CreateScreen : {
      screen : Create
    },
    EditScreen : {
      screen : Edit
    }
  },
  {
    headerMode : 'none',
      navigationOptions : {
          header : {
              visible : false
          }
      }
  }
)

export default createNavigationContainer(stack)