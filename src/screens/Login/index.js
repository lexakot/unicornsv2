import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStackNavigator } from 'react-navigation';

import {
  StyleSheet,
  TextInput,
  Button,
  View,
} from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
    backgroundColor: '#FFA07A',
  },
  isValidated: {
    backgroundColor: '#98FB98',
  },
});


class Login extends Component {
  static navigationOptions = {
    title: 'Login',
    headerStyle: {
      backgroundColor: 'red',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  state = {
    name: '',
  };

  onLoginPress = () => {
    this.props.navigation.navigate('Main', {
      name: this.state.name
    })
  };

  onInputChange = (name) => {
    this.setState({ name });
  }

  validate = (name) => {
    if (name.length < 6) {
      return false;
    } else if (name.search(/^([^0-9]*)$/) === -1) {
      return false;
    }
    return true;
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput style={[styles.input, this.validate(this.state.name) && styles.isValidated]} onChangeText={name => this.onInputChange(name)} />
        <Button disabled={!this.validate(this.state.name)} onPress={this.onLoginPress} title="Press" />
      </View>
    );
  }
}

export default Login;
