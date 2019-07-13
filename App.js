import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions, Alert } from 'react-native';
import { createAppContainer, createStackNavigator} from 'react-navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    flexDirection: 'column',
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  container1: {
    flex: 1, 
    flexDirection: 'column',
    backgroundColor: '#444',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  container2: {
    flex: 1, 
    flexDirection: 'column',
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  containerMode: {
    paddingTop:50,
    flex: 1, 
    flexDirection: 'column',
    backgroundColor: '#ccc',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    
  },
  mode: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#ccc',
    padding: 15,
    height: Dimensions.get('window').height*0.1,
    width: Dimensions.get('window').width,
    borderRadius: 0,
    borderWidth: 1,
    borderColor: '#d6d7da',
    marginTop: -5,
    
  },
  modeHeader: {
    fontSize:20,
    color: '#fff',

  },
  modeText: {
    fontSize:12,
    color: '#fff',
  },
  button1: {
    alignItems: 'center',
    backgroundColor: '#ccc',
    padding: 10,
    height: Dimensions.get('window').height*0.50,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    transform: [{
      rotate: '-180deg'
    }],
    marginBottom: 10,
  },
  button2: {
    alignItems: 'center',
    backgroundColor: '#444',
    padding: 10,
    height: Dimensions.get('window').height*0.50,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    marginTop: 10,
    },
  countText: {
    fontSize:100,
    color: '#fff',
  },
  header: {
    fontSize:50,
    color: '#fff',
    marginBottom:20,
    marginLeft: 15,
    fontFamily: 'Roboto',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5
  },
  pauseButton: {
    
    alignItems: 'center',
    backgroundColor: '#444',
    height: 'auto',
    width: 'auto',
    justifyContent: 'center',
    
    transform: [{
      rotate: '-90deg'
    }],
  },
  pauseText: {
    fontSize:30,
    color: '#fff',

  }

});

class ClockScreen extends React.Component {
  static navigationOptions = { header: null } //Hides header
  
  constructor(props) {
    super(props)
    const { navigation } = this.props;
    this.state = {hour1: navigation.getParam('hour1', 0), 
                  hour2: navigation.getParam('hour2', 0),
                  min1: navigation.getParam('min1', 0),
                  min2: navigation.getParam('min2', 0),
                  sec1: navigation.getParam('sec1', 0),
                  sec2: navigation.getParam('sec2', 0),
                  active1: navigation.getParam('active1', 0),
                  active2: navigation.getParam('active2', 0),
                  inc: navigation.getParam('inc', 0),
                  pause: false,
                  }
  }
  
  componentDidMount() {
    this.clockCall = setInterval(() => {
      this.decrementClock();
    }, 1000);
   }
   componentWillUnmount() {
    clearInterval(this.clockCall);
   }
   
   decrementClock = () => {
    if (!this.state.pause){
      if (this.state.active1){
        if(this.state.sec1==0){
          if(this.state.min1==0){
            if(this.state.hour1==0){
              this.setState({
                active1: false,
                active2: false
              })
            }
            this.setState((prevstate) => ({ hour1: prevstate.hour1-1,  min1: 60}));
          }
          this.setState((prevstate) => ({ min1: prevstate.min1-1,  sec1: 60}));
        }
        this.setState((prevstate) => ({ sec1: prevstate.sec1-1 }));      
      }
      if (this.state.active2){
        if(this.state.sec2==0){
          if(this.state.min2==0){
            if(this.state.hour2==0){
              this.setState({
                active1: false,
                active2: false
              })
            }
            this.setState((prevstate) => ({ hour2: prevstate.hour2-1,  min2: 60}));
          }
          this.setState((prevstate) => ({ min2: prevstate.min2-1,  sec2: 60}));
        }      
        this.setState((prevstate) => ({ sec2: prevstate.sec2-1 }));
      }  
    }
    
   };

  pad = (d) => {
    return (d < 10) ? '0' + d.toString() : d.toString();
}
onLongPress = (d) => {
  this.setState({
    pause: !this.state.pause
  })
}

  onPress = () => {
    if(this.state.pause){
      this.setState({
        pause: false
      })
    }

    if(this.state.active1 == false && this.state.active2 == false){
      this.setState({
        active1: true,
        active2: false
      })
    }
    else{
      this.setState({
        active1: !this.state.active1,
        active2: !this.state.active2
      })
      var num = Math.floor(this.state.inc / 60);

      if (this.state.active1){

        if (this.state.sec1+this.state.inc >= 60){
          if(this.state.sec1+this.state.inc-60*num >= 60){
            num+=1;
          }
          var nmin = 0;
          if(this.state.min1+num >= 60){
            this.setState((prevstate) => ({ hour1: prevstate.hour1+1}));
            var nmin= -60;
          }
          this.setState((prevstate) => ({ min1: prevstate.min1+num+nmin, sec1: this.state.sec1+this.state.inc-60*num }));
        }
        else {
          this.setState((prevstate) => ({ sec1: prevstate.sec1+this.state.inc }));
        }
      }
      else if (this.state.active2){       

        if (this.state.sec2+this.state.inc >= 60){
          if(this.state.sec2+this.state.inc-60*num >= 60){
            num+=1;
          }
          var nmin = 0;
          if(this.state.min2+num >= 60){
            this.setState((prevstate) => ({ hour2: prevstate.hour2+1}));
            var nmin= -60;
          }
          this.setState((prevstate) => ({ min2: prevstate.min2+num+nmin, sec2: this.state.sec2+this.state.inc-60*num }));
        }
        else {
          this.setState((prevstate) => ({ sec2: prevstate.sec2+this.state.inc }));
        }


      }

    }    
  }

  render() {
    
    
    return (
      <View style={styles.container}>        
        <View style={styles.container1}>        
        <TouchableOpacity activeOpacity={0.5}
         style={styles.button1}
         onPress={this.onPress}
         onLongPress={this.onLongPress}
        >
         <Text style={[styles.countText]}>
         { this.state.hour1 > 0 ? this.state.hour1+':'+this.pad(this.state.min1)+':': this.state.min1 > 0 ? this.state.min1+':': null}{this.pad(this.state.sec1)}
          </Text>
        </TouchableOpacity>
        </View>
          <View style={styles.container2}>
          <TouchableOpacity activeOpacity={0.5}
          style={styles.button2}
          onPress={this.onPress}
          onLongPress={this.onLongPress}
          >
          <Text style={[styles.countText]}>
          { this.state.hour2 > 0 ? this.state.hour2+':'+this.pad(this.state.min2)+':': this.state.min2 > 0 ? this.state.min2+':': null}{this.pad(this.state.sec2)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}


class ModeScreen extends React.Component {
  static navigationOptions = { header: null } //Hides header
  constructor(props) {
    super(props)
    this.state = { modalVisible: false}
    
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  
  render() {
    return (
      <View style={styles.containerMode}>
        <Text style={[styles.header]}>
          Chess Clock
        </Text>
        <TouchableOpacity activeOpacity={0.5}
         style={styles.mode}
         onPress={() => {
          this.props.navigation.navigate('Clock', {
            hour1: 1, hour2: 1, min1: 0, min2: 0, sec1: 0, sec2: 0, active1: false, active2: false, inc: 30});}}>
         <Text style={[styles.modeHeader]}>Chess</Text>
          <Text style={[styles.modeText]}>White: 1:00:00 vs Black: 1:00:00, Increment: 30 sec</Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.5}
         style={styles.mode}
         onPress={() => {
          this.props.navigation.navigate('Clock', {
            hour1: 0, hour2: 0, min1: 5, min2: 5, sec1: 0, sec2: 0, active1: false, active2: false, inc: 5});}}>
          <Text style={[styles.modeHeader]}>Blitz 5 + 5</Text>
          <Text style={[styles.modeText]}>White: 5:00 vs Black: 5:00, Increment: 5 sec</Text>
        </TouchableOpacity>
        
        <TouchableOpacity activeOpacity={0.5}
         style={styles.mode}
         onPress={() => {
          this.props.navigation.navigate('Clock', {
            hour1: 0, hour2: 0, min1: 15, min2: 15, sec1: 0, sec2: 0, active1: false, active2: false, inc: 30});}}>
          <Text style={[styles.modeHeader]}>Rapid Chess</Text>
          <Text style={[styles.modeText]}>White: 15:00 vs Black: 15:00</Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.5}
         style={styles.mode}
         onPress={() => {       
          this.props.navigation.navigate('Clock', {
            hour1: 0, hour2: 0, min1: 1, min2: 1, sec1: 0, sec2: 0, active1: false, active2: false, inc: 30    }); }}>
          <Text style={[styles.modeHeader]}>Bullet Chess</Text>
          <Text style={[styles.modeText]}>White: 1:00 vs Black: 1:00</Text>
        </TouchableOpacity>        
        
        <TouchableOpacity activeOpacity={0.5}
         style={styles.mode}
         onPress={() => {this.setState({ visible: true });}}>
         <Text style={[styles.modeHeader]}>Make own</Text>
        </TouchableOpacity>
        
        
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Clock: ClockScreen,
    Mode: ModeScreen,
  },
  {
    initialRouteName: 'Mode',
  },
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}


