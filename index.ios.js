/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AppStateIOS,
  AsyncStorage
} from 'react-native';

import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
var moment = require('moment');
var flipState = 0;

function calculateWeekNumber() {
  var weeknumber = moment().isoWeek();
  return weeknumber;
}

function calculateDayNumber() {
  var daynumber =  moment().isoWeekday();
  return daynumber;
}

function recyclingornot(weeknumber, weekday) {
  var gardening = 0;

  if ((weeknumber + 1)%2 == 0)  {
    if (weekday > 1) {
      gardening = 1;
    }
  }

  else {
    if (weekday == 1) {
      gardening = 1;  
    }
  }

  
  return gardening;
}

function finalVerdict(gardening) {
  if (gardening == 0) {
     return "RECYCLING";
  }

  return "GARDENING";
}

function getBackgroundColor(gardening) {
  if (gardening == 0) {
    return "#000080";
  }

  else {
    return "purple";
  }
}


class rubbishfinal extends Component {
  constructor(props) {
     super(props);
     this._handleAppStateChange(null);
     
  }

  componentDidMount() {
      AppStateIOS.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
      AppStateIOS.removeEventListener('change', this._handleAppStateChange);
  }

  flip() {
    AsyncStorage.getItem("rubbishfinal_flip").then((obj) => {
      var newflipstate;
      if (flipState == 0) {
        newflipstate = 1
      }
      else  {
        flipState = 0;
      }
      if (obj == undefined) {
        AsyncStorage.setItem("rubbishfinal_flip", {flip:flipState});
      }

      else {
        if (obj.flip  == 0) {
          newflipstate = 1;
        }
        else {
          newflipstate = 0;
        }
        AsyncStorage.setItem("rubbishfinal_flip", {flip:flipState});
      }

    }).done();
  }

  _handleAppStateChange(currentAppState) {
    if (currentAppState == 'background') {
      return;
    }
     var weeknumber = calculateWeekNumber();
     var weekday = calculateDayNumber();
     var garden = recyclingornot(weeknumber,weekday);
     var result = finalVerdict(garden);

     //console.log("weeknumber:"+ weeknumber);
     //console.log("weekday:"+ weekday);
     //console.log("garden:"+ garden);  
     //console.log("result:" + result)

     this.state = {
      weeknumber: weeknumber,
      day: weekday,
      garden: garden,
      recyclingorgarden: result,
      backgroundcolor: getBackgroundColor(garden)
      };    
  }

  render() {
    
    return (
      <View style={[styles.container, {backgroundColor: this.state.backgroundcolor}]}>
        <Text style={styles.welcome}>
          Week {this.state.weeknumber}
        </Text>
        <Text style={styles.welcome}>
          Day {this.state.day}
        </Text>
        <Text style={styles.welcome}>
          {this.state.recyclingorgarden}
        </Text>      
        <ActionButton buttonColor="rgba(231,766,60,1)">
          <ActionButton.Item buttonColor='#9b59b6' title="Flip" onPress={() => {this.flip();}}>
            <Icon name="android-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>  
      </View>
    );
  }


}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color:'white',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  actionButtonIcon: {
    fontSize:20,
    height:22,
    color:'white',
  }
});

AppRegistry.registerComponent('rubbishfinal', () => rubbishfinal);
