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
  AppStateIOS
} from 'react-native';
var moment = require('moment');

function calculateWeekNumber() {
  weeknumber = moment().isoWeek();
  return weeknumber;
}

function calculateDayNumber() {
  daynumber =  moment().isoWeekday();
  return daynumber;
}

function recyclingornot(weeknumber, weekday) {
  gardening = 0;

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

  _handleAppStateChange(currentAppState) {
    if (currentAppState == 'background') {
      return;
    }
     weeknumber = calculateWeekNumber();
     weekday = calculateDayNumber();
     garden = recyclingornot(weeknumber,weekday);
     result = finalVerdict(garden);

     this.state = {
      weeknumber: weeknumber,
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
          {this.state.recyclingorgarden}
        </Text>        
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
});

AppRegistry.registerComponent('rubbishfinal', () => rubbishfinal);
