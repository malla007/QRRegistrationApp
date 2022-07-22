import React, { Component } from 'react';
import { View, Text,Image,TouchableOpacity} from 'react-native';
import QRCodeScannerClass from '../components/QRCodeScanner';
import NewPatientRecord from '../components/NewPatientRecord';
import GlobalStyles from '../components/GlobalStyles';
import PatientRecord from '../components/PatientRecord';
import HistoryClass from '../components/History'
import Loader from '../components/Loader';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';
import Registry from '../components/Registry';

class LoggedInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        currentScreen: "qrCodeScanner",
        isLoading:false,
        user:"",
        patientID:'',
        patientDetails:{},
    };
  }

  onHistoryPatientSelect = (patientID) => {
    this.setState({isLoading: true})
    const patientRef = firestore().collection("patients").doc(patientID);
    patientRef.get().then((doc) => {
        if (doc.exists) {
            this.setState({isLoading: false,patientID:patientID,currentScreen: "patientRecord",patientDetails:doc.data()})
        }
    }).catch((error) => {
      this.setState({isLoading: false})
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
    });
  }

  onQRScanned = (e) => {
        this.setState({isLoading: true})
        var qrID = e.data.substring(0, 5);
        if(qrID == "THPOT"){
            var patientID=e.data.slice(5);
            const patientRef = firestore().collection("patients").doc(patientID);
            patientRef.get().then((doc) => {
                if (doc.exists) {
                    this.setState({isLoading: false,patientID:patientID,currentScreen: "patientRecord",patientDetails:doc.data()})
                } else {
                    this.setState({isLoading: false,currentScreen: "registerPatient",patientID:patientID})
                }
            }).catch((error) => {
              this.setState({isLoading: false})
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
            });
        }else{
            this.setState({isLoading: false})
        } 
      
   
  }

  onRegistryButtonClicked = () => {
    this.setState({currentScreen: "registry"})
  }  

  onPlusButtonPressed = () => {
    this.setState({currentScreen: "qrCodeScanner"})
  }

  onCalendarButtonPressed = () => {
    this.setState({currentScreen: "history"})
  }

  setIsLoadingTrue = () => {
    this.setState({isLoading: true})
  }

  setIsLoadingFalse = () => {
    this.setState({isLoading: false})
  }

  onNewPatient = (patientID) =>{
    const patientRef = firestore().collection("patients").doc(patientID);
    patientRef.get().then((doc) => {
        if (doc.exists) {
            this.setState({isLoading: false,patientID:patientID,currentScreen: "patientRecord",patientDetails:doc.data()})
        } 
    }).catch((error) => {
      this.setState({isLoading: false})
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
    });
  }

  componentDidMount = () =>{
    this.setState({isLoading: true})
    const userRef = firestore().collection("users").doc(this.props.user);
    userRef.get().then((doc) => {
        if (doc.exists) {
            var user = doc.data();
            Toast.show({
                type: 'success',
                position: 'top',
                text1: "Welcome "+user.name+"!",
                visibilityTime: 500,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
                onShow: () => {},
                onHide: () => {},
                onPress: () => {}
              });
            this.setState({isLoading: false, user:user})
        } else {
            
        }
    }).catch((error) => {
    });
    
  }

  render() {
      if(this.state.isLoading){
          return(
            <View style = {GlobalStyles.container}>
            <Loader/>
        <View style = {GlobalStyles.bottomNavBar}>
            <View style = {GlobalStyles.navContent}>
                <View style = {GlobalStyles.navView}>
                <TouchableOpacity activeOpacity = {1} onPress = {() => this.onRegistryButtonClicked()}>
                    <Image
                    style={GlobalStyles.smallIcon}
                    resizeMode = 'cover'
                    source={require('../assets/icon_folder.png')}
                    />
                </TouchableOpacity>
                </View>
                <View style = {GlobalStyles.navView}>
                <TouchableOpacity activeOpacity = {1} onPress = {() => this.onPlusButtonPressed()}>
                    <Image
                    style={GlobalStyles.smallIcon}
                    resizeMode = 'cover'
                    source={require('../assets/icon_plus.png')}
                    />
                </TouchableOpacity>
                </View>
                <View style = {GlobalStyles.navView}>
                <TouchableOpacity activeOpacity = {1} onPress = {() => this.onCalendarButtonPressed()}>
                    <Image
                style={GlobalStyles.smallIcon}
                resizeMode = 'cover'
                source={require('../assets/icon_calendar.png')}
                />
                </TouchableOpacity>
                </View>
            </View>
        </View>
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </View>
          )
      }
      if(this.state.currentScreen == "qrCodeScanner"){
        return (
            <View style = {GlobalStyles.container}>
              <View style = {GlobalStyles.content}>
              <View style = {{flexDirection:'row', justifyContent:'space-between',alignItems:'center'}}>
                <Text style = {GlobalStyles.qrText}>QR Scanner</Text>
                <TouchableOpacity style = {{alignItems:'flex-end'}} onPress = {() => {this.props.logout()}}>
                <Image
                style={{
                  width: '40%',
                  height: undefined,
                  aspectRatio: 1,
                }}
                resizeMode = 'cover'
                source={require('../assets/logout.png')}
                />
                </TouchableOpacity>
            </View>
                  <View style = {GlobalStyles.qrContent}>
                      <QRCodeScannerClass onQRScanned = {this.onQRScanned}/>
                  </View>
              </View>
              <View style = {GlobalStyles.bottomNavBar}>
                  <View style = {GlobalStyles.navContent}>
                      <View style = {GlobalStyles.navView}>
                      <TouchableOpacity activeOpacity = {1} onPress = {() => this.onRegistryButtonClicked()}>
                          <Image
                          style={GlobalStyles.smallIcon}
                          resizeMode = 'cover'
                          source={require('../assets/icon_folder.png')}
                          />
                        </TouchableOpacity>
                      </View>
                      <View style = {GlobalStyles.navView}>
                          <Image
                      style={GlobalStyles.largeIcon}
                      resizeMode = 'cover'
                      source={require('../assets/icon_plus.png')}
                      />
                      </View>
                      <View style = {GlobalStyles.navView}>
                      <TouchableOpacity activeOpacity = {1} onPress = {() => this.onCalendarButtonPressed()}>
                            <Image
                        style={GlobalStyles.smallIcon}
                        resizeMode = 'cover'
                        source={require('../assets/icon_calendar.png')}
                        />
                    </TouchableOpacity>
                      </View>
                  </View>
              </View>
              <Toast ref={(ref) => Toast.setRef(ref)} />
            </View>
          );
      }else if(this.state.currentScreen == "patientRecord"){
          return(
            <View style = {GlobalStyles.container}>
                <PatientRecord patientID = {this.state.patientID} patientDetails = {this.state.patientDetails}  setIsLoadingFalse = {this.setIsLoadingFalse} setIsLoadingTrue = {this.setIsLoadingTrue}/>
            <View style = {GlobalStyles.bottomNavBar}>
                <View style = {GlobalStyles.navContent}>
                    <View style = {GlobalStyles.navView}>
                    <TouchableOpacity activeOpacity = {1} onPress = {() => this.onRegistryButtonClicked()}>
                        <Image
                        style={GlobalStyles.smallIcon}
                        resizeMode = 'cover'
                        source={require('../assets/icon_folder.png')}
                        />
                        </TouchableOpacity>
                    </View>
                    <View style = {GlobalStyles.navView}>
                    <TouchableOpacity activeOpacity = {1} onPress = {() => this.onPlusButtonPressed()}>
                        <Image
                        style={GlobalStyles.smallIcon}
                        resizeMode = 'cover'
                        source={require('../assets/icon_plus.png')}
                        />
                    </TouchableOpacity>
                    </View>
                    <View style = {GlobalStyles.navView}>
                    <TouchableOpacity activeOpacity = {1} onPress = {() => this.onCalendarButtonPressed()}>
                        <Image
                    style={GlobalStyles.smallIcon}
                    resizeMode = 'cover'
                    source={require('../assets/icon_calendar.png')}
                    />
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
            <Toast ref={(ref) => Toast.setRef(ref)} />
          </View>
          )
      }else if(this.state.currentScreen == "registerPatient"){
        return (
            <View style = {GlobalStyles.container}>
                <NewPatientRecord onNewPatient = {this.onNewPatient} patientID = {this.state.patientID} user = {this.state.user} setIsLoadingFalse = {this.setIsLoadingFalse} setIsLoadingTrue = {this.setIsLoadingTrue}/>
              <View style = {GlobalStyles.bottomNavBar}>
                  <View style = {GlobalStyles.navContent}>
                      <View style = {GlobalStyles.navView}>
                      <TouchableOpacity activeOpacity = {1} onPress = {() => this.onRegistryButtonClicked()}>
                          <Image
                          style={GlobalStyles.smallIcon}
                          resizeMode = 'cover'
                          source={require('../assets/icon_folder.png')}
                          />
                          </TouchableOpacity>
                      </View>
                      <View style = {GlobalStyles.navView}>
                      <TouchableOpacity activeOpacity = {1} onPress = {() => this.onPlusButtonPressed()}>
                        <Image
                      style={GlobalStyles.smallIcon}
                      resizeMode = 'cover'
                      source={require('../assets/icon_plus.png')}
                      />
                      </TouchableOpacity>
                      </View>
                      <View style = {GlobalStyles.navView}>
                      <TouchableOpacity activeOpacity = {1} onPress = {() => this.onCalendarButtonPressed()}>
                            <Image
                        style={GlobalStyles.smallIcon}
                        resizeMode = 'cover'
                        source={require('../assets/icon_calendar.png')}
                        />
                    </TouchableOpacity>
                      </View>
                  </View>
              </View>
              <Toast ref={(ref) => Toast.setRef(ref)} />
            </View>
          );
      }else if(this.state.currentScreen == "history"){
        return (
            <View style = {GlobalStyles.container}>
                <HistoryClass user = {this.state.user} onHistoryPatientSelect = {this.onHistoryPatientSelect} setIsLoadingFalse = {this.setIsLoadingFalse} setIsLoadingTrue = {this.setIsLoadingTrue} patientID = {this.state.patientID} patientDetails = {this.state.patientDetails}/>
              <View style = {GlobalStyles.bottomNavBar}>
                  <View style = {GlobalStyles.navContent}>
                      <View style = {GlobalStyles.navView}>
                      <TouchableOpacity activeOpacity = {1} onPress = {() => this.onRegistryButtonClicked()}>
                          <Image
                          style={GlobalStyles.smallIcon}
                          resizeMode = 'cover'
                          source={require('../assets/icon_folder.png')}
                          />
                        </TouchableOpacity>
                      </View>
                      <View style = {GlobalStyles.navView}>
                      <TouchableOpacity activeOpacity = {1} onPress = {() => this.onPlusButtonPressed()}>
                          <Image
                      style={GlobalStyles.smallIcon}
                      resizeMode = 'cover'
                      source={require('../assets/icon_plus.png')}
                      />
                      </TouchableOpacity>
                      </View>
                      <View style = {GlobalStyles.navView}>
                      <TouchableOpacity activeOpacity = {1} onPress = {() => this.onCalendarButtonPressed()}>
                          <Image
                      style={GlobalStyles.largeIcon}
                      resizeMode = 'cover'
                      source={require('../assets/icon_calendar.png')}
                      />
                      </TouchableOpacity>
                      </View>
                  </View>
              </View>
              <Toast ref={(ref) => Toast.setRef(ref)} />
            </View>
          );
      }else if(this.state.currentScreen == "registry"){
        return (
            <View style = {GlobalStyles.container}>
                <Registry user = {this.state.user} onHistoryPatientSelect = {this.onHistoryPatientSelect} setIsLoadingFalse = {this.setIsLoadingFalse} setIsLoadingTrue = {this.setIsLoadingTrue} patientID = {this.state.patientID} patientDetails = {this.state.patientDetails}/>
              <View style = {GlobalStyles.bottomNavBar}>
                  <View style = {GlobalStyles.navContent}>
                      <View style = {GlobalStyles.navView}>
                        <Image
                          style={GlobalStyles.largeIcon}
                          resizeMode = 'cover'
                          source={require('../assets/icon_folder.png')}
                          />
                      </View>
                      <View style = {GlobalStyles.navView}>
                      <TouchableOpacity activeOpacity = {1} onPress = {() => this.onPlusButtonPressed()}>
                    <Image
                      style={GlobalStyles.smallIcon}
                      resizeMode = 'cover'
                      source={require('../assets/icon_plus.png')}
                      />
                      </TouchableOpacity>
                      </View>
                      <View style = {GlobalStyles.navView}>
                      <TouchableOpacity activeOpacity = {1} onPress = {() => this.onCalendarButtonPressed()}>
                    <Image
                      style={GlobalStyles.smallIcon}
                      resizeMode = 'cover'
                      source={require('../assets/icon_calendar.png')}
                      />
                      </TouchableOpacity>
                      </View>
                  </View>
              </View>
              <Toast ref={(ref) => Toast.setRef(ref)} />
            </View>
          );
      }

  }
}


export default LoggedInScreen;
