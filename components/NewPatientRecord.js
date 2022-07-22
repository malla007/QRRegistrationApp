import React, { Component } from 'react';
import { Dimensions, TouchableWithoutFeedback } from 'react-native';
import { View, Text, ScrollView, TextInput,  TouchableOpacity, Image, Alert } from 'react-native';
import GlobalStyles from '../components/GlobalStyles';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import RadioForm from 'react-native-simple-radio-button';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage, { FirebaseStorageTypes } from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import NetInfo from '@react-native-community/netinfo'
import Toast from 'react-native-toast-message';

class NewPatientRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
        regNo:"",
        NIC:"",
        name:"",
        age:"",
        gender:"Male",
        diagnosis:"",
        telNo:"",
        bht:"",
        ward:"",
        consultant:"",
        poci:"",
        reasonForRef:"",
        treatment:"",
        visitCmnt:"",
        radio_props : [
            {label: 'Male', value: "Male" },
            {label: 'Female', value: "Female" }
          ],
        imageURLList: [],
        isDialogVisible:false,
        addImageHeight:undefined,
        addImageWidth:'20%',
        liveImageIndex:0,
        liveViewImage:'',
    };
    
  }

  componentWillUnmount() {
    this.setState = (state,callback)=>{
        return;
    };
}
  handleNIC = (text) => {
    this.setState({ NIC: text })
 }
 handleName = (text) => {
    this.setState({ name: text })
 }

 handleAge = (text) => {
    this.setState({ age: text })
 }

 handleDiagnosis = (text) => {
    this.setState({ diagnosis: text })
 }

 handleTelNo = (text) => {
    this.setState({ telNo: text })
 }

 handleBht = (text) => {
    this.setState({ bht: text })
 }

 handleWard = (text) => {
    this.setState({ ward: text })
 }

 handleConsultant = (text) => {
    this.setState({ consultant: text })
 }

 handleReasonForRef = (text) => {
    this.setState({ reasonForRef: text })
 }

 handlePoci = (text) => {
    this.setState({ poci: text })
 }

 handleTreatment = (text) => {
    this.setState({ treatment: text })
 }

 handleRegNo = (text) => {
  this.setState({ regNo: text })
}

 handleVisitCmnt = (text) => {
    this.setState({ visitCmnt: text })
 }
 imgResponse = (response) =>{
  var array = this.state.imageURLList;
  if(array.length == 4){
    this.setState({ addImageHeight: 0,addImageWidth: 0 })
  }
   if(!response.didCancel){
    array.push(response.uri)
    this.setState({imageURLList:array})
   }
 }
 openImage = (index)=> {
    this.setState(
      {liveViewImage:this.state.imageURLList[index],
      isDialogVisible:true, 
      dialogHeight:Dimensions.get('window').height,
      dialogWidth:Dimensions.get('window').width,
      liveImageIndex:index
    })
 }

 removeImage = () => {
  Alert.alert(
    "Do you want to remove this image?",
    '',
    [
      {
        text: "No",
        onPress: () => {},
        style: "cancel"
      },
      { text: "Yes", onPress: () => {
        var array = this.state.imageURLList;
        array.splice(this.state.liveImageIndex, 1);
        this.setState({isDialogVisible:false, 
          imageURLList:array,
          dialogHeight:0,
          dialogWidth:0,
        })
        this.setState({ addImageHeight:undefined, addImageWidth:'20%',})
      }}
    ],
    { cancelable: false }
  );
}

 closeImage = () => {
  this.setState({isDialogVisible:false})
 }

 saveRecord = () => {
  NetInfo.fetch().then(state => {
    if(state.isConnected){
      Alert.alert(
        "Do you want to save this record?",
        '',
        [
          {
            text: "No",
            onPress: () => {},
            style: "cancel"
          },
          { text: "Yes", onPress: async() => {
            var timeStamp = Date();
            this.props.setIsLoadingTrue()
            var data = {
              patientID:this.props.patientID,
              regNo:this.state.regNo,
              nic:this.state.NIC,
              name:this.state.name,
              age:this.state.age,
              gender:this.state.gender,
              telNo:this.state.telNo,
              diagnosis:this.state.diagnosis,
              bht:this.state.bht,
              ward:this.state.ward,
              consultant:this.state.consultant,
              reasonForRef:this.state.reasonForRef,
              poci:this.state.poci,
              treatment:this.state.treatment,
              referTo:this.props.user.name,
              dor:timeStamp,
              latestVisitTimeStamp:timeStamp,
              latestVisitCmnt:this.state.visitCmnt,
            }
            firestore().collection("patients").doc(this.props.patientID).set(data)
            .then(() => {
              var visitData = {
                timeStamp:timeStamp,
                visitCmnt:this.state.visitCmnt,
                imageURLList:[]
              }
              firestore().collection("patients").doc(this.props.patientID).collection("visits").add(visitData)
                .then(async(docRef) => {
                    var imgList = []
                    for(var i = 0; i<this.state.imageURLList.length; i++){

                      function generateUUID() {
                        var d = new Date().getTime();
                        var d2 = (performance && performance.now && (performance.now()*1000)) || 0;
                        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                            var r = Math.random() * 16;
                            if(d > 0){
                                r = (d + r)%16 | 0;
                                d = Math.floor(d/16);
                            } else {
                                r = (d2 + r)%16 | 0;
                                d2 = Math.floor(d2/16);
                            }
                            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
                        });
                    }
                      const reference = storage().ref(generateUUID()+ Math.random().toString(36).substr(2, 10));
                      const blob = await new Promise((resolve, reject) => {
                        const xhr = new XMLHttpRequest();
                        xhr.onload = () => {
                            resolve(xhr.response);
                        };
                        xhr.responseType = 'blob';
                        xhr.open('GET', this.state.imageURLList[i], true);
                        xhr.send(null);
                    });
                      await reference.put(blob);
                      let url = await reference.getDownloadURL();
                      imgList.push(url)
                      if(imgList.length == this.state.imageURLList.length){
                        firestore().collection("patients").doc(this.props.patientID).collection("visits").doc(docRef.id).update({
                          imageURLList: imgList
                        }).then(() => {
                          this.props.onNewPatient(this.props.patientID)
                        })
                        .catch((error) => {
                      });
                      }
                    }
                }).then(() => {
                  this.props.setIsLoadingFalse()
                  
                })
                .catch((error) => {
                });
            })
            .catch((error) => {
            });
          }}
        ],
        { cancelable: false }
      );
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
      const takenImages = this.state.imageURLList.map((data,i) => {
        return (
          <TouchableOpacity style = {GlobalStyles.displayImgIcon} key = {i} onPress = {() =>{this.openImage(i)}}>
                <Image
                style={{height:'100%',width:'100%',borderRadius:5}}
                resizeMode = 'cover'
                key = {i}
                source={{uri:data}}
                />
          </TouchableOpacity>

        )
      })


    if(this.state.isDialogVisible){
      return(
        <View style = {{height:Dimensions.get('window').height, width:Dimensions.get('window').width*0.9, alignItems: 'center',justifyContent:'center',marginHorizontal:'3%',overflow:'hidden'}}>
            <View borderRadius = {26} style = {GlobalStyles.imageBackground}>
              <TouchableOpacity style = {GlobalStyles.closeButtonView} onPress = {() =>{this.closeImage()}}>
              <Image
                style={{
                  width: '35%',
                  height: undefined,
                  aspectRatio: 1,
                }}
                resizeMode = 'cover'
                source={require('../assets/closeButton.png')}
              />
              </TouchableOpacity>
              <Image
              style={GlobalStyles.displayImg}
              resizeMode = 'contain'
              source={{uri:this.state.liveViewImage}}
              />
              <TouchableOpacity style = {GlobalStyles.deleteBtn} onPress = {() => {this.removeImage()}}>
                <Text style = {GlobalStyles.deleteBtnTxt}>DELETE</Text>
            </TouchableOpacity>
            </View>
        </View>
      )
    }else{
      return (
        <View style = {{height:Dimensions.get('window').height*0.9, width:Dimensions.get('window').width}}>
                        <View style = {{flex:1}}>
                      <ScrollView style = {GlobalStyles.prContent} contentContainerStyle={{ flexGrow: 1 }} >
                        <Text style = {GlobalStyles.prTxt}>Register Patient</Text>
                        <View style = {{height:Dimensions.get('window').height*0.03}}></View>
                        <Text style = {GlobalStyles.prLabelTxt}>Reg No</Text>
                        <TextInput
                          style={GlobalStyles.textInputShort}
                          onChangeText={text => this.handleRegNo(text)}
                          value={this.state.regNo}
                          textAlignVertical = {"center"}
                          />
                          <View style = {{height:Dimensions.get('window').height*0.02}}></View>
                        <Text style = {GlobalStyles.prLabelTxt}>NIC</Text>
                        <TextInput
                          maxLength = {10}
                          style={GlobalStyles.textInputShort}
                          onChangeText={text => this.handleNIC(text)}
                          value={this.state.NIC}
                          textAlignVertical = {"center"}
                          />
                          <View style = {{height:Dimensions.get('window').height*0.02}}></View>
                        <Text style = {GlobalStyles.prLabelTxt}>Name</Text>
                        <View style = {GlobalStyles.textInputLong}>
                        <TextInput
                          style = {{        
                          color:'black',
                          fontFamily:'Amiko-Regular',
                          fontWeight:'400',
                          width:'100%',
                          height:'100%',
                          textAlignVertical:'top',
                          justifyContent: 'center',
                          fontSize:hp('1.75%'),}}
                          onChangeText={text => this.handleName(text)}
                          value={this.state.name}
                          multiline = {true}
                          />
                        </View>
                        <View style = {{height:Dimensions.get('window').height*0.02}}></View>
                        <View style = {{flexDirection:'row',alignItems:'center'}}>
                        <Text style = {GlobalStyles.prLabelTxt}>Age</Text>
                        <View style = {GlobalStyles.textInputAge}>
                        <TextInput
                        style = {{
                            color:'black',
                            fontFamily:'Amiko-Regular',
                            fontWeight:'400',
                            fontSize:hp('1.75%'),
                            paddingTop: 0,
                            paddingBottom: 0,
                        }}
                          onChangeText={text => this.handleAge(text)}
                          value={this.state.age}
                          multiline = {true}
                          keyboardType = {"number-pad"}
                          maxLength = {3}
                          />
                        </View>
                        <View style = {{marginLeft:'10%'}}>
                        <RadioForm
                            radio_props={this.state.radio_props}
                            initial={0}
                            formHorizontal={true}
                            buttonColor={'#FFFFFF'}
                            labelColor = {'#FFFFFF'}
                            labelStyle = {{
                                color:'white',
                            marginRight:'5%',
                            fontFamily:'Amiko-Regular',
                            fontWeight:'400',
                            fontSize:hp('2%'),
                        }}
                            selectedButtonColor = {'#FFFFFF'}
                            onPress={(value) => {this.setState({gender:value})}}
                            />
                        </View>
                        </View>
                        <View style = {{height:Dimensions.get('window').height*0.02}}></View>
                        <View style = {{flexDirection:'row', alignItems:'center'}}>
                        <Text style = {GlobalStyles.prLabelTxt}>Tel No</Text>
                        <TextInput
                          style={GlobalStyles.textInputShortTelNo}
                          onChangeText={text => this.handleTelNo(text)}
                          value={this.state.telNo}
                          keyboardType = {"phone-pad"}
                          />
                        </View>
                        <View style = {{height:Dimensions.get('window').height*0.02}}></View>
                        <Text style = {GlobalStyles.prLabelTxt}>Diagnosis</Text>
                        <View style = {GlobalStyles.textInputLongDiagnosis}>
                        <TextInput
                          style = {{        
                          color:'black',
                          fontFamily:'Amiko-Regular',
                          fontWeight:'400',
                          width:'100%',
                          height:'100%',
                          textAlignVertical:'top',
                          fontSize:hp('1.75%'),}}
                          onChangeText={text => this.handleDiagnosis(text)}
                          value={this.state.diagnosis}
                          multiline = {true}
                          />
                          </View>
                          <View style = {{height:Dimensions.get('window').height*0.02}}></View>
                        <View style = {{flexDirection:'column'}}>
                        <View style = {{flexDirection:'row',alignItems:'center'}}>
                        <Text style = {GlobalStyles.prLabelTxt}>BHT/Clinic</Text>
                        <View style = {GlobalStyles.textInputShortClinic}>
                        <TextInput
                        style = {{
                            color:'black',
                            fontFamily:'Amiko-Regular',
                            fontWeight:'400',
                            fontSize:hp('1.75%'),
                            paddingTop: 0,
                            paddingBottom: 0,
                            textAlignVertical:'center'
                        }}
                          onChangeText={text => this.handleBht(text)}
                          value={this.state.bht}
                          />
                        </View>
                        </View>
                        <View style = {{height:Dimensions.get('window').height*0.02}}></View>

                        <View style = {{flexDirection:'row', alignItems:'center'}}>
                        <Text style = {GlobalStyles.prLabelTxt}>Ward/Clinic</Text>
                        <View style = {GlobalStyles.textInputShortClinic}>
                        <TextInput
                        style = {{
                            color:'black',
                            fontFamily:'Amiko-Regular',
                            fontWeight:'400',
                            fontSize:hp('1.75%'),
                            paddingTop: 0,
                            paddingBottom: 0,
                            textAlignVertical:'center'
                        }}
                          onChangeText={text => this.handleWard(text)}
                          value={this.state.ward}
                          />
                        </View>
                        </View>
                        </View>
                        <View style = {{height:Dimensions.get('window').height*0.02}}></View>
                        <Text style = {GlobalStyles.prLabelTxt}>Consultant</Text>
                        <TextInput
                          style={GlobalStyles.textInputShortConsultant}
                          onChangeText={text => this.handleConsultant(text)}
                          value={this.state.consultant}
                          textAlignVertical = {"center"}
                          />
                          <View style = {{height:Dimensions.get('window').height*0.02}}></View>
                        <Text style = {GlobalStyles.prLabelTxt}>Reason for Reference</Text>
                        <View style = {GlobalStyles.textInputLongDiagnosis}>
                        <TextInput
                          style = {{        
                          color:'black',
                          fontFamily:'Amiko-Regular',
                          fontWeight:'400',
                          width:'100%',
                          height:'100%',
                          textAlignVertical:'top',
                          fontSize:hp('1.75%'),}}
                          onChangeText={text => this.handleReasonForRef(text)}
                          value={this.state.reasonForRef}
                          multiline = {true}
                          />
                          </View>
                          <View style = {{height:Dimensions.get('window').height*0.02}}></View>
                        <Text style = {GlobalStyles.prLabelTxt}>Particulars of Complaint or Injury</Text>
                        <View style = {GlobalStyles.textInputLongDiagnosis}>
                        <TextInput
                          style = {{        
                          color:'black',
                          fontFamily:'Amiko-Regular',
                          fontWeight:'400',
                          width:'100%',
                          height:'100%',
                          textAlignVertical:'top',
                          fontSize:hp('1.75%'),}}
                          onChangeText={text => this.handlePoci(text)}
                          value={this.state.poci}
                          multiline = {true}
                          />
                          </View>
                          <View style = {{height:Dimensions.get('window').height*0.02}}></View>
                        <Text style = {GlobalStyles.prLabelTxt}>Treatment</Text>
                        <View style = {GlobalStyles.textInputLongDiagnosis}>
                        <TextInput
                          style = {{        
                          color:'black',
                          fontFamily:'Amiko-Regular',
                          fontWeight:'400',
                          width:'100%',
                          height:'100%',
                          textAlignVertical:'top',
                          fontSize:hp('1.75%'),}}
                          onChangeText={text => this.handleTreatment(text)}
                          value={this.state.treatment}
                          multiline = {true}
                          />
                          </View>
                          <View style = {{height:Dimensions.get('window').height*0.02}}></View>
                        <Text style = {GlobalStyles.prLabelTxt}>Visit Comment</Text>
                        <View style = {GlobalStyles.textInputLongDiagnosis}>
                        <TextInput
                          style = {{        
                          color:'black',
                          fontFamily:'Amiko-Regular',
                          fontWeight:'400',
                          width:'100%',
                          height:'100%',
                          textAlignVertical:'top',
                          fontSize:hp('1.75%'),}}
                          onChangeText={text => this.handleVisitCmnt(text)}
                          value={this.state.visitCmnt}
                          multiline = {true}
                          />
                          </View>
                          <View style = {{height:Dimensions.get('window').height*0.02}}></View>
                          <View style = {{height:Dimensions.get('window').height*0.02}}></View>
                          <View style = {{flexDirection:'row',alignItems: 'center'}}>
                          <TouchableWithoutFeedback onPress = {() =>{launchCamera({
                              mediaType: 'photo',
                              includeBase64: true,
                              quality:1,
                              maxHeight:1929,
                              maxWidth:1038
                              },
                              (response) => {
                                this.imgResponse(response)
                                },
                              )}}>
                          <Image
                                  style={{width: this.state.addImageWidth,
                                  height: this.state.addImageHeight,
                                  aspectRatio: 1,
                                  overflow: 'visible'}}
                                  resizeMode = 'cover'
                                  source={require('../assets/addImg.png')}
                                  />
                          </TouchableWithoutFeedback>
                          {takenImages}
                          </View>
                          <View style = {{height:Dimensions.get('window').height*0.02}}></View>
                          <TouchableOpacity style = {GlobalStyles.addVisitBtn} onPress = {() => {this.saveRecord()}}>
                            <Text style = {GlobalStyles.addVisitTxt}>SAVE</Text>
                        </TouchableOpacity>
                          <View style = {{height:Dimensions.get('window').height*0.02}}></View>
                        </ScrollView>
                        </View>
                        </View>
            );
    }
  }
}


export default NewPatientRecord;

