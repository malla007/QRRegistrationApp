import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity} from 'react-native';
import { Dimensions } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import LoggedInScreen from './screens/LoggedInScreen';
import Biometrics from 'react-native-biometric-identification';
import NetInfo from '@react-native-community/netinfo'
import Toast from 'react-native-toast-message';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        userName:'',
        password:'',
        isLoggedIn:false,
        user:''

    };
  }
  handleUsername = (text) => {
    this.setState({ userName: text })
 }
 handlePassword = (text) => {
    this.setState({ password: text })
 }

 logout = () => {
     this.setState({isLoggedIn:false,userName:'',password:''})
 }

 loginHandler = () => {
    NetInfo.fetch().then(state => {
        if(state.isConnected){
            if(this.state.userName == '' && this.state.password ==''){
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: "Please enter a username or password!",
                    visibilityTime: 500,
                    autoHide: true,
                    topOffset: 30,
                    bottomOffset: 40,
                    onShow: () => {},
                    onHide: () => {},
                    onPress: () => {}
                  });
             }else if(this.state.userName == 'ota' && this.state.password ==''){
                Biometrics.authenticate('')
                    .then(successOptions => {
                            this.setState({isLoggedIn:true, user:'ota'})
                    })
                    .catch(error => {
                        Toast.show({
                            type: 'error',
                            position: 'top',
                            text1: "Authentication Failed!",
                            visibilityTime: 500,
                            autoHide: true,
                            topOffset: 30,
                            bottomOffset: 40,
                            onShow: () => {},
                            onHide: () => {},
                            onPress: () => {}
                          });
                    });
             }else if(this.state.userName == 'otb' && this.state.password ==''){
                Biometrics.authenticate('')
                    .then(successOptions => {
                            this.setState({isLoggedIn:true, user:'otb'})
                    })
                    .catch(error => {
                        Toast.show({
                            type: 'error',
                            position: 'top',
                            text1: "Authentication Failed!",
                            visibilityTime: 500,
                            autoHide: true,
                            topOffset: 30,
                            bottomOffset: 40,
                            onShow: () => {},
                            onHide: () => {},
                            onPress: () => {}
                          });
                    });
             }else if(this.state.userName == 'otc' && this.state.password ==''){
                Biometrics.authenticate('')
                    .then(successOptions => {
                            this.setState({isLoggedIn:true, user:'otc'})
                    })
                    .catch(error => {
                        Toast.show({
                            type: 'error',
                            position: 'top',
                            text1: "Authentication Failed!",
                            visibilityTime: 500,
                            autoHide: true,
                            topOffset: 30,
                            bottomOffset: 40,
                            onShow: () => {},
                            onHide: () => {},
                            onPress: () => {}
                          });
                    });
             }else if(this.state.userName == 'otd' && this.state.password ==''){
                Biometrics.authenticate('')
                    .then(successOptions => {
                            this.setState({isLoggedIn:true, user:'otd'})
                    })
                    .catch(error => {
                        Toast.show({
                            type: 'error',
                            position: 'top',
                            text1: "Authentication Failed!",
                            visibilityTime: 500,
                            autoHide: true,
                            topOffset: 30,
                            bottomOffset: 40,
                            onShow: () => {},
                            onHide: () => {},
                            onPress: () => {}
                          });
                    });
             }else if(this.state.userName == 'ote' && this.state.password ==''){
                Biometrics.authenticate('')
                    .then(successOptions => {
                            this.setState({isLoggedIn:true, user:'ote'})
                    })
                    .catch(error => {
                        Toast.show({
                            type: 'error',
                            position: 'top',
                            text1: "Authentication Failed!",
                            visibilityTime: 500,
                            autoHide: true,
                            topOffset: 30,
                            bottomOffset: 40,
                            onShow: () => {},
                            onHide: () => {},
                            onPress: () => {}
                          });
                    });
             }else if(this.state.userName == 'otf' && this.state.password ==''){
                Biometrics.authenticate('')
                    .then(successOptions => {
                            this.setState({isLoggedIn:true, user:'otf'})
                    })
                    .catch(error => {
                        Toast.show({
                            type: 'error',
                            position: 'top',
                            text1: "Authentication Failed!",
                            visibilityTime: 500,
                            autoHide: true,
                            topOffset: 30,
                            bottomOffset: 40,
                            onShow: () => {},
                            onHide: () => {},
                            onPress: () => {}
                          });
                    });
             }else if(this.state.userName == 'otg' && this.state.password ==''){
                Biometrics.authenticate('')
                    .then(successOptions => {
                            this.setState({isLoggedIn:true, user:'otg'})
                    })
                    .catch(error => {
                        Toast.show({
                            type: 'error',
                            position: 'top',
                            text1: "Authentication Failed!",
                            visibilityTime: 500,
                            autoHide: true,
                            topOffset: 30,
                            bottomOffset: 40,
                            onShow: () => {},
                            onHide: () => {},
                            onPress: () => {}
                          });
                    });
             }else if(this.state.userName == 'oth' && this.state.password ==''){
                Biometrics.authenticate('')
                    .then(successOptions => {
                            this.setState({isLoggedIn:true, user:'oth'})
                    })
                    .catch(error => {
                        Toast.show({
                            type: 'error',
                            position: 'top',
                            text1: "Authentication Failed!",
                            visibilityTime: 500,
                            autoHide: true,
                            topOffset: 30,
                            bottomOffset: 40,
                            onShow: () => {},
                            onHide: () => {},
                            onPress: () => {}
                          });
                    });
             }else if(this.state.userName == 'oti' && this.state.password ==''){
                Biometrics.authenticate('')
                    .then(successOptions => {
                            this.setState({isLoggedIn:true, user:'oti'})
                    })
                    .catch(error => {
                        Toast.show({
                            type: 'error',
                            position: 'top',
                            text1: "Authentication Failed!",
                            visibilityTime: 500,
                            autoHide: true,
                            topOffset: 30,
                            bottomOffset: 40,
                            onShow: () => {},
                            onHide: () => {},
                            onPress: () => {}
                          });
                    });
             }else if(this.state.userName == 'otj' && this.state.password ==''){
                Biometrics.authenticate('')
                    .then(successOptions => {
                            this.setState({isLoggedIn:true, user:'otj'})
                    })
                    .catch(error => {
                        Toast.show({
                            type: 'error',
                            position: 'top',
                            text1: "Authentication Failed!",
                            visibilityTime: 500,
                            autoHide: true,
                            topOffset: 30,
                            bottomOffset: 40,
                            onShow: () => {},
                            onHide: () => {},
                            onPress: () => {}
                          });
                    });
             }else{
                if(this.state.userName == 'ota' && this.state.password =='101'){
        
                    this.setState({isLoggedIn:true, user:'ota'})
        
                }else if(this.state.userName == 'otb' && this.state.password =='102'){
        
                    this.setState({isLoggedIn:true, user:'otb'})
        
                }else if(this.state.userName == 'otc' && this.state.password =='103'){
        
                    this.setState({isLoggedIn:true, user:'otc'})
        
                }else if(this.state.userName == 'otd' && this.state.password =='104'){
        
                    this.setState({isLoggedIn:true, user:'otd'})
        
                }else if(this.state.userName == 'ote' && this.state.password =='105'){
        
                    this.setState({isLoggedIn:true, user:'ote'})
        
                }else if(this.state.userName == 'otf' && this.state.password =='106'){
        
                    this.setState({isLoggedIn:true, user:'otf'})
        
                }else if(this.state.userName == 'otg' && this.state.password =='107'){
        
                    this.setState({isLoggedIn:true, user:'otg'})
        
                }else if(this.state.userName == 'oth' && this.state.password =='108'){
        
                    this.setState({isLoggedIn:true, user:'oth'})
        
                }else if(this.state.userName == 'oti' && this.state.password =='109'){
        
                    this.setState({isLoggedIn:true, user:'oti'})
        
                }else if(this.state.userName == 'otj' && this.state.password =='110'){
        
                    this.setState({isLoggedIn:true, user:'otj'})
        
                }else{
                    Toast.show({
                        type: 'error',
                        position: 'top',
                        text1: "Wrong Username or Password!",
                        visibilityTime: 500,
                        autoHide: true,
                        topOffset: 30,
                        bottomOffset: 40,
                        onShow: () => {},
                        onHide: () => {},
                        onPress: () => {}
                      });
                }
             }
        }else{
            Toast.show({
                type: 'error',
                position: 'top',
                text1: "Network connection error!",
                visibilityTime: 500,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
                onShow: () => {},
                onHide: () => {},
                onPress: () => {}
              });
        }
      });
     
    
 }

  render() {
    if(this.state.isLoggedIn){
      return <LoggedInScreen user = {this.state.user} logout = {this.logout}/>
    }else{
      return (
        <View style = {styles.container}>
            <View style = {{position:'absolute',bottom:0, justifyContent:'flex-end',alignItems:'center'}}>
            <Text style = {styles.footerTxt}>{"Solution By : M&M Developers"}</Text>
            <Text style = {styles.footerTxt}>Contact : +94772146257</Text>
            </View>
            <View style = {styles.appTitlesView}>
              <Text style = {styles.h1}>
                  TEACHING HOSPITAL PERADENIYA
              </Text>
              <Text style = {styles.h2}>
                  OCCUPATIONAL THERAPY
              </Text>
              <Text style = {styles.h3}>
                  Patient Registration
              </Text>
            </View>
            <Image
              style={styles.manImage}
              resizeMode = 'cover'
              source={require('./assets/loginMan.png')}
              />
          <View style = {styles.formView}>
              <Text style = {styles.labelTxt}>
                  Username
              </Text>
              <TextInput
                  style={styles.textInput}
                  onChangeText={text => this.handleUsername(text)}
                  value={this.state.userName}
                  />
              <Text style = {styles.labelTxt}>
                  Password
              </Text>
              <TextInput
                  style={styles.textInput}
                  onChangeText={text => this.handlePassword(text)}
                  value={this.state.password}
                  secureTextEntry={true}
                  keyboardType = "number-pad"
                  />
              <TouchableOpacity style = {styles.loginBtn} onPress = {()=>{this.loginHandler()}}>
                  <Text style = {styles.loginTxt}>
                      LOGIN
                  </Text>
              </TouchableOpacity>
          </View>
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </View>
      );
    }
    
  }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#18C3F7",
        alignItems:'center',
    },
    appTitlesView:{
        justifyContent: 'center',
        alignItems: 'center',
        position:"absolute",
        top:Dimensions.get('window').width*0.119,
    },
    h1:{
        color:"#FFFFFF",
        fontFamily:"Baloo2-ExtraBold",
        fontSize:hp('2.75%')
    },
    h2: {
        color:'#000000',
        fontFamily:'Amiko-Regular',
        fontWeight:'700',
        fontSize:hp('2.45%')
    },
    h3: {
        color:'#FFFFFF',
        fontFamily:'Amiko-Regular',
        fontWeight:'700',
        fontSize:hp('2.5%'),
        marginTop:Dimensions.get('window').width*0.02,
    },
    manImage:{
        width:Dimensions.get('window').width*0.75,
        height:Dimensions.get('window').height*0.6,
        alignSelf:'flex-start',
        marginTop:Dimensions.get('window').height*0.3,
        overflow:'hidden'
    },
    formView: {
        position:"absolute",
        bottom:0,
        right:0,
        marginBottom:Dimensions.get('window').height*0.15,
        marginRight:Dimensions.get('window').width*0.03,
    },
    labelTxt: {
        color:'#FFFFFF',
        fontFamily:'Amiko-Regular',
        fontWeight:'400',
        fontSize:hp('2.25%'),
    },
    textInput: {
        backgroundColor:'white',
        width:Dimensions.get('window').width*0.5,
        height:Dimensions.get('window').height*0.05,
        color:'black',
        fontFamily:'Amiko-Regular',
        fontWeight:'400',
        fontSize:hp('1.75%'),
        borderRadius:16,
        justifyContent: 'center',
    },
    loginBtn: {
        alignSelf:'center',
        top:'10%',
        borderColor:'white',
        borderWidth:2,
        borderRadius:10
    },
     loginTxt: {
        color:"#FFFFFF",
        fontFamily:"Baloo2-ExtraBold",
        fontSize:hp('3%'),
        paddingHorizontal:'3%',
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: {width: -5, height: 5},
        textShadowRadius: 10
     },
     footerTxt: {
        fontFamily:'Amiko-Regular',
        fontWeight:'400',
        fontSize:hp('1.75%'),
        color:'white'
    },
})
export default App;
