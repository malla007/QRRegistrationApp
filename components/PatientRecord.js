import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { View, Text, Image, ScrollView,TextInput, TouchableWithoutFeedback, TouchableOpacity, Alert,ActivityIndicator} from 'react-native';
import GlobalStyles from '../components/GlobalStyles';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage, { FirebaseStorageTypes } from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import ProgressImage from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';
import NetInfo from '@react-native-community/netinfo'
import Toast from 'react-native-toast-message';

class PatientRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
        visitArray:[],
        isAddVisit:false,
        visitCmnt:'',
        imageURLList: [],
        isDialogVisibleDelete:false,
        addImageHeight:undefined,
        addImageWidth:'20%',
        liveViewImage:'',
        patientDetails:this.props.patientDetails,
        addVisitTimeStamp:"",
        addVisitDate:"",
        addVisitTime:"",
        isSliderDialog:false,
        sliderDialogURLList:[],
        liveSliderImage:"",
      };
  }
  

  componentWillUnmount() {
    this.setState = (state,callback)=>{
        return;
    };
}

  getDate = (dateObj) => {
    var date = new Date(dateObj)
    function pad(n) {return n < 10 ? "0"+n : n;}
    var nowDate = pad(date.getDate())+"."+pad(date.getMonth()+1)+"."+date.getFullYear();
    return nowDate
  }

  openAddVisit = () => {
    var date = new Date();
    function pad(n) {return n < 10 ? "0"+n : n;}
    var nowDate = pad(date.getDate())+"."+pad(date.getMonth()+1)+"."+date.getFullYear();
    var nowTime = date.toLocaleTimeString("en-GB")
    this.setState({ addVisitTimeStamp: Date(), isAddVisit:true, addVisitDate:nowDate, addVisitTime:nowTime})
  }

  handleVisitCmnt = (text) => {
    this.setState({ visitCmnt: text })
 }

 openImage = (index)=> {
   var url = this.state.imageURLList[index]
  this.setState(
    {liveViewImage:url,
    isDialogVisibleDelete:true, 
    dialogHeight:Dimensions.get('window').height,
    dialogWidth:Dimensions.get('window').width,
  })
}
openPressNewSliderImage = (url) => {
  this.setState({liveSliderImage:url})
}

openSliderDialog = (data) =>{
  this.setState({ isSliderDialog: true, sliderDialogURLList: data.imageURLList,liveSliderImage:data.imageURLList[0]})
}


  componentDidMount = () =>{
    var visitArray = []
    const visitRef = firestore().collection("patients").doc(this.props.patientID).collection("visits").orderBy("timeStamp", "desc");
    visitRef.get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            visitArray.push(doc.data())
        });
        this.setState({visitArray:visitArray})
    })
    .catch((error) => {
    });
  }

  closeImage = () => {
  this.setState({isDialogVisibleDelete:false})
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

   saveVisit = () => {
    NetInfo.fetch().then(state => {
      if(state.isConnected){
        Alert.alert(
          "Do you want to save this visit?",
          '',
          [
            {
              text: "No",
              onPress: () => {},
              style: "cancel"
            },
            { text: "Yes", onPress: () => {
              this.props.setIsLoadingTrue()
              var visitData = {
                timeStamp:this.state.addVisitTimeStamp,
                visitCmnt:this.state.visitCmnt,
                imageURLList:[]
              }
              firestore().collection("patients").doc(this.props.patientID).collection("visits").add(visitData)
                .then(async(docRef) => {
                  firestore().collection("patients").doc(this.props.patientID).update({
                    latestVisitTimeStamp:this.state.addVisitTimeStamp,
                    latestVisitCmnt:this.state.visitCmnt,
                  })
                  .catch((error) => {
                });
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
                        }).then(()=>{
                          this.props.setIsLoadingFalse()
                          this.setState({isAddVisit:false})
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
          this.setState({isDialogVisibleDelete:false, 
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

  render() {

      

      const visitList = this.state.visitArray.map((data, i) => {
      var dateobj = new Date(data.timeStamp);
      function pad(n) {return n < 10 ? "0"+n : n;}
      var date = pad(dateobj.getDate())+"."+pad(dateobj.getMonth()+1)+"."+dateobj.getFullYear();

      if(!data.imageURLList.length == 0){
        var image = 
        <TouchableOpacity style = {{marginBottom:Dimensions.get('window').height*0.01}} onPress = {() => {this.openSliderDialog(data)}}>
        <Image
          style={{
            width: '35%',
            height: undefined,
            aspectRatio: 1,
            alignSelf:'flex-end',
            shadowColor:"rgba(0, 0, 0, 0.25)",
          }}
          resizeMode = 'cover'
          key = {i}
          source={require("../assets/gallery.png")}
          />
        </TouchableOpacity>
      }else{
        var image = 
        <View style = {{marginBottom:Dimensions.get('window').height*0.03}}>

        </View>
      }

        return (
            <View style = {GlobalStyles.visitsCard} key = {i}>
              <View style = {{flexDirection:'row',justifyContent:'space-between'}}>
                <Text style = {{fontFamily:'Amiko-Regular',fontSize:hp('1.75%'),color:'white',}}>{date} - {new Date(data.timeStamp).toLocaleTimeString("en-GB")}</Text>
                {image}
                </View>
                <Text style = {{fontFamily:'Amiko-Regular',fontSize:hp('1.5%'),color:'black',}}>{data.visitCmnt}</Text>
            </View>
        )
      })

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

      const viewImageNumbers = this.state.sliderDialogURLList.map((data,i) => {
        return (
          <TouchableOpacity style = {GlobalStyles.numberBtn} data = {data} key = {i} onPress = {() =>this.openPressNewSliderImage(data)}  >
            <Text style = {GlobalStyles.numberBtnTxt}>{i+1}</Text>
          </TouchableOpacity>
        )
      })


      if(this.state.isSliderDialog){
      
            return(
              <View style = {{height:Dimensions.get('window').height, width:Dimensions.get('window').width*0.9, alignItems: 'center',justifyContent:'center',marginHorizontal:'3%',overflow:'hidden'}}>
              <View borderRadius = {26} style = {GlobalStyles.imageBackground}>
                <TouchableOpacity style = {GlobalStyles.closeButtonView} onPress = {() =>this.setState({ isSliderDialog: false})}>
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
                <ProgressImage 
                  indicator={ProgressBar} 
                  style={GlobalStyles.displayImg}
                  resizeMode = 'contain'
                  source={{uri:this.state.liveSliderImage}}/>
                <View style = {{height:Dimensions.get('window').height*0.02}}></View>
                <View style = {{flexDirection:'row'}}>
                  {viewImageNumbers}
                </View>
    
              </View>
          </View>
            )
        
      }else if(this.state.isAddVisit){
        if(this.state.isDialogVisibleDelete){
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
          return(
            <View style = {{height:Dimensions.get('window').height*0.9, width:Dimensions.get('window').width, justifyContent: 'center', alignItems:'center'}}>
              <View style = {GlobalStyles.visitFormStyle}>
              <TouchableOpacity style = {GlobalStyles.closeButtonView} onPress = {() =>{this.setState({isAddVisit:false})}}>
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
                <Text style = {GlobalStyles.prTxt}>ADD VISIT</Text>
                <View style = {{height:Dimensions.get('window').height*0.03}}></View>
                <Text style = {GlobalStyles.prLabelTxt}>Date   :   {this.state.addVisitDate}</Text>
                <View style = {{height:Dimensions.get('window').height*0.02}}></View>
                <Text style = {GlobalStyles.prLabelTxt}>Time   :   {this.state.addVisitTime}</Text>
                <View style = {{height:Dimensions.get('window').height*0.03}}></View>
                <Text style = {GlobalStyles.prLabelTxt}>Comment</Text>
                <View style = {{height:Dimensions.get('window').height*0.01}}></View>
                <View style = {GlobalStyles.textInputLongDiagnosis}>
                          <TextInput
                            style = {{        
                            color:'black',
                            fontFamily:'Amiko-Regular',
                            fontWeight:'400',
                            fontSize:hp('1.75%'),
                            width:'100%',
                            height:'100%',
                            textAlignVertical:'top'
                            ,}}
                            onChangeText={text => this.handleVisitCmnt(text)}
                            value={this.state.visitCmnt}
                            multiline = {true}
                            />
                  </View>
                  <View style = {{height:Dimensions.get('window').height*0.02}}></View>
                  <Text style = {GlobalStyles.prLabelTxt}>Upload Images</Text>
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
                            <TouchableOpacity style = {GlobalStyles.addVisitBtnPr} onPress = {() => {this.saveVisit()}}>
                              <Text style = {GlobalStyles.addVisitTxt}>SAVE</Text>
                            </TouchableOpacity>
              </View>
            </View>
          )
        }
      }else{
        if(this.state.patientDetails.regNo == ""){
          var patientRecord = <Text style = {GlobalStyles.prTxt}>Patient Record</Text>
        }else{
          var patientRecord = <Text style = {GlobalStyles.prTxt}>Patient Record : {this.state.patientDetails.regNo}</Text>
        }
      return (
          <View style = {{height:Dimensions.get('window').height*0.9, width:Dimensions.get('window').width}}>
              <View style = {{flex:1}}>
              <ScrollView style = {GlobalStyles.prContent} contentContainerStyle={{ flexGrow: 1 }}>
              {patientRecord}

              <View style = {{flexDirection:'row', paddingTop:'5%', alignItems: 'center'}}>
              <Text style = {GlobalStyles.prLabelTxt}>NIC :</Text><Text style = {GlobalStyles.prRecordTxt}>{this.state.patientDetails.nic}</Text>
              </View>

              <View style = {{flexDirection:'row', paddingTop:'5%', alignItems: 'center'}}>
              <Text style = {GlobalStyles.prLabelTxt}>Name :</Text><Text style = {GlobalStyles.prRecordTxt}>{this.state.patientDetails.name}</Text>
              </View>

              <View style = {{flexDirection:'row', paddingTop:'5%', alignItems: 'center'}}>
              <Text style = {GlobalStyles.prLabelTxt}>AGE :</Text><Text style = {GlobalStyles.prRecordTxt}>{this.state.patientDetails.age}</Text><Text style = {{fontFamily:'Amiko-Regular',fontWeight:'400',fontSize:hp('2%'),color:'white',paddingLeft:'5%'}}>SEX :</Text><Text style = {GlobalStyles.prRecordTxt}>{this.state.patientDetails.gender}</Text>
              </View>

              <View style = {{flexDirection:'row', paddingTop:'5%', alignItems: 'center'}}>
              <Text style = {GlobalStyles.prLabelTxt}>TelNo :</Text><Text style = {GlobalStyles.prRecordTxt}>{this.state.patientDetails.telNo}</Text>
              </View>

              <View style = {{flexDirection:'row', paddingTop:'5%', alignItems: 'center'}}>
              <Text style = {GlobalStyles.prLabelTxt}>Consl :</Text><Text style = {GlobalStyles.prRecordTxt}>{this.state.patientDetails.consultant}</Text>
              </View>

              <View style ={{height:this.state.patientDetails.regNo != ''?0:undefined,width:this.state.patientDetails.regNo != ''?0:undefined}}>
                <View style = {{flexDirection:'row', paddingTop:'5%', alignItems: 'center'}}>
                  <Text style = {GlobalStyles.prLabelTxt}>BHT :</Text><Text style = {GlobalStyles.prRecordTxt}>{this.state.patientDetails.bht}</Text>
                </View>
                <View style = {{flexDirection:'row', paddingTop:'5%', alignItems: 'center'}}>
                  <Text style = {GlobalStyles.prLabelTxt}>Ward :</Text><Text style = {GlobalStyles.prRecordTxt}>{this.state.patientDetails.ward}</Text>
                </View>
              </View>

              <View style = {{flexDirection:'row', paddingTop:'5%', alignItems: 'center'}}>
              <Text style = {GlobalStyles.prLabelTxt}>DOR :</Text><Text style = {GlobalStyles.prRecordTxt}>{this.getDate(this.state.patientDetails.dor)}</Text>
              </View>
              
              <View style = {{flexDirection:'row', paddingTop:'5%', alignItems: 'center'}}>
              <Text style = {GlobalStyles.prLabelTxt}>Refer to :</Text><Text style = {GlobalStyles.prRecordTxt}>{this.state.patientDetails.referTo}</Text>
              </View>
              <View style = {GlobalStyles.line}></View>
              <Text style = {{fontFamily:'Amiko-SemiBold',fontSize:hp('2%'),color:'white',marginTop:'5%'}}>Diagnosis</Text>
              <Text style = {{fontFamily:'Amiko-Regular',fontSize:hp('2%'),color:'black',marginTop:'5%',marginLeft:'5%'}}>{this.state.patientDetails.diagnosis}</Text>
              <Text style = {{fontFamily:'Amiko-SemiBold',fontSize:hp('2%'),color:'white',marginTop:'5%'}}>Particulars of Complaint or Injury </Text>
              <Text style = {{fontFamily:'Amiko-Regular',fontSize:hp('2%'),color:'black',marginTop:'5%',marginLeft:'5%'}}>{this.state.patientDetails.poci}</Text>
              <Text style = {{fontFamily:'Amiko-SemiBold',fontSize:hp('2%'),color:'white',marginTop:'5%'}}>Reason for Reference</Text>
              <Text style = {{fontFamily:'Amiko-Regular',fontSize:hp('2%'),color:'black',marginTop:'5%',marginLeft:'5%'}}>{this.state.patientDetails.reasonForRef}</Text>
              <Text style = {{fontFamily:'Amiko-SemiBold',fontSize:hp('2%'),color:'white',marginTop:'5%'}}>Treatment</Text>
              <Text style = {{fontFamily:'Amiko-Regular',fontSize:hp('2%'),color:'black',marginTop:'5%',marginLeft:'5%'}}>{this.state.patientDetails.treatment}</Text>
              <View style = {GlobalStyles.line}></View>
              <View style = {{flexDirection:'row',width:'100%',alignContent:'center', justifyContent: 'space-between'}}>
              <Text style = {{fontFamily:'Amiko-SemiBold',fontSize:hp('2%'),color:'white',marginTop:'5%'}}>Visits :</Text>
              <TouchableOpacity style = {GlobalStyles.addVisitBtnPr} onPress = {() => {this.openAddVisit()}}>
                  <Text style = {GlobalStyles.addVisitTxt}>ADD VISIT</Text>
              </TouchableOpacity>
              </View>
              {visitList}
              <View style = {{height:Dimensions.get('window').height*0.1}}></View>
              </ScrollView>
              </View>
          </View>
    );
      }
  }
}

export default PatientRecord;
