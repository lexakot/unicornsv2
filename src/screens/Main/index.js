import React, { Component } from 'react';
import unicorn from '@images/unicorn.png';
import { createStackNavigator } from 'react-navigation';
import {
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  Alert,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
  Image,
} from 'react-native';

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  header: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
  },
  raceContainer: {
    flex: 5,
    justifyContent: 'space-around',
  },
  startButton: {
    width: height * 0.07,
    height: height * 0.07,
    backgroundColor: 'green',
  },
  pauseButton: {
    width: height * 0.07,
    height: height * 0.07,
    backgroundColor: 'orange',
  },
  stopButton: {
    width: height * 0.07,
    height: height * 0.07,
    backgroundColor: 'red',
  },
  logoutButton: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutText : {
    fontSize: 20,
    color: 'white',
  }
});

let a = '';
class Main extends Component {
  static navigationOptions = {
    title: 'Main',
    headerStyle: {
      backgroundColor: 'red',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  constructor() {
    super();
    this.animatedValue1 = new Animated.Value(0);
    this.animatedValue2 = new Animated.Value(0);
    this.animatedValue3 = new Animated.Value(0);
  }

  state = {
    paused: true,
    stoped: false,
  };

  onLogoutPress = () => {
    Keyboard.dismiss();
    this.props.navigator.resetTo({
      screen: 'Login',
      title: '',
    });
  };

  onPauseClick = () => {
    this.setState({ paused: true });
    Animated.timing(this.animatedValue1).stop();
    Animated.timing(this.animatedValue2).stop();
    Animated.timing(this.animatedValue3).stop();
    clearTimeout(a);
  }

  onStopClick = () => {
    clearTimeout(a);
    this.setState({ paused: true });
    this.animatedValue1.setValue(0);
    this.animatedValue2.setValue(0);
    this.animatedValue3.setValue(0);
    this.setState({ stoped: true }); 
  };

  animate() {
    const duration = [Math.random() * 1000 + 4000, Math.random() * 1000 + 4000, Math.random() * 1000 + 4000];
    this.setState({ paused: false });
    this.setState({ stoped: false });
    Animated.timing(
      this.animatedValue1,
      {
        toValue: 1,
        duration: duration[0],
      },
    ).start();
    Animated.timing(
      this.animatedValue2,
      {
        toValue: 1,
        duration: duration[1],
      },
    ).start();
    Animated.timing(
      this.animatedValue3,
      {
        toValue: 1,
        duration: duration[2],
      },
    ).start();
    const min = Math.min(...duration);
    const indexMin = duration.indexOf(min);
    a = setTimeout(() => {
      if (!this.state.paused) {
        Alert.alert('Winner', `Unicorn number ${indexMin + 1} won!`);
        this.setState({ paused: true });
      }
    }, min);
  }

  render() {
    const { name } = this.props.navigation.state.params;
    const marginLeft1 = this.animatedValue1.interpolate({
      inputRange: [0, 1],
      outputRange: [0, width - 70],
    });
    const marginLeft2 = this.animatedValue2.interpolate({
      inputRange: [0, 1],
      outputRange: [0, width - 70],
    });
    const marginLeft3 = this.animatedValue3.interpolate({
      inputRange: [0, 1],
      outputRange: [0, width - 70],
    });
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Hi, {name}</Text>
          <View style={styles.buttonContainer}>
            {this.state.paused ?
              <TouchableOpacity onPress={() => this.animate()} style={styles.startButton} /> :
              <TouchableOpacity onPress={() => this.onPauseClick()} style={styles.pauseButton} />}
            <TouchableOpacity disabled={this.state.stoped} onPress={() => this.onStopClick()} style={styles.stopButton} />
          </View>
        </View>
        <View style={styles.raceContainer}>
          <Animated.Image
            style={{
 width: 100, height: 100, top: 0, marginLeft: marginLeft1,
 }}
            source={unicorn}
          />
          <Animated.Image
            style={{
 width: 100, height: 100, top: 0, marginLeft: marginLeft2,
 }}
            source={unicorn}
          />
          <Animated.Image
            style={{
 width: 100, height: 100, top: 0, marginLeft: marginLeft3,
 }}
            source={unicorn}
          />
        </View>
        <TouchableOpacity onPress={this.onLogoutPress} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Main;
