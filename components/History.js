import React, { Component } from 'react';
import { Dimensions,TouchableOpacity,FlatList, Image } from 'react-native';
import moment from 'moment';
import { View, Text,} from 'react-native';
import GlobalStyles from '../components/GlobalStyles';
import DateTimePicker from '@react-native-community/datetimepicker';
import firestore from '@react-native-firebase/firestore';
import Loader from './Loader';
import Toast from 'react-native-toast-message';

class HistoryClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
        date:new Date(),
        mode:'date',
        show:false,
        historyPatientsArray:[],
        isHistoryLoading:false
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

getTime = (dateObj) => {
  var time = dateObj.toLocaleTimeString("en-GB")
  return time
}
  componentDidMount = () =>{
    var now = new Date().getTime();
    var endOfDay = moment(now).endOf("day").toDate();
    var startOfDay = moment(now).startOf("day").toDate();
    var historyPatientsArray = []
    if(this.state.historyPatientsArray.length == 0){
      this.setState({isHistoryLoading:true})
      const visitRef = firestore().collection("patients").where('latestVisitTimeStamp', '<=', endOfDay.toString()).where('latestVisitTimeStamp', '>=', startOfDay.toString()).where('referTo', '==', this.props.user.name).orderBy("latestVisitTimeStamp", "desc");
      visitRef.get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              historyPatientsArray.push(doc.data())
          });
          this.setState({historyPatientsArray:historyPatientsArray,isHistoryLoading:false})
      })
      .catch((error) => {
          this.setState({isHistoryLoading:false})
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
  }


    onChange = (event, selectedDate) => {
      const currentDate = selectedDate || this.state.date;
      this.setState({show:Platform.OS === 'ios'})
    if(selectedDate != undefined){
      this.setState({date:currentDate})
      var endOfDay = moment(currentDate).endOf("day").toDate();
      var startOfDay = moment(currentDate).startOf("day").toDate();
      var historyPatientsArray = []
      this.setState({isHistoryLoading:true})
      const visitRef = firestore().collection("patients").where('latestVisitTimeStamp', '<=', endOfDay.toString()).where('latestVisitTimeStamp', '>=', startOfDay.toString()).where('referTo', '==', this.props.user.name).orderBy("latestVisitTimeStamp", "desc");
      visitRef.get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            historyPatientsArray.push(doc.data())
        });
        this.setState({historyPatientsArray:historyPatientsArray,isHistoryLoading:false})
    })
    .catch((error) => {
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
        this.setState({isHistoryLoading:false})
    });
    }
  };

   showMode = (currentMode) => {
    this.setState({show:true})
    this.setState({mode:currentMode})
  };

   showDatepicker = () => {
    this.setState({show:true})
    this.setState({mode:'date'})
  };

   showTimepicker = () => {
    this.setState({mode:'time'})
  };

  render() {
    if(this.state.isHistoryLoading){
      return<Loader/>
    }else{
    return (
        <View style = {GlobalStyles.content}>
            <View style = {{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style = {GlobalStyles.qrText}>History</Text>
                <TouchableOpacity style = {GlobalStyles.selectDateBtn} onPress = {() => {this.showDatepicker()}}>
                    <Text style = {GlobalStyles.selectDateTxt}>SELECT DATE</Text>
                </TouchableOpacity>
            </View>
            <View style = {{flex:1}}>
              <FlatList
                data={this.state.historyPatientsArray}
                style={{flex:1}}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={
                  ({item, index}) => (
                  <TouchableOpacity style = {{
                    width:'100%',
                    backgroundColor:'white',
                    borderRadius:6,
                    padding:'5%', 
                    marginTop:Dimensions.get('window').height*0.03,
                    alignItems:'center',
                    justifyContent: 'center',
                    marginBottom:index == (this.state.historyPatientsArray).length-1?Dimensions.get('window').height*0.1:0
                  }} onPress  = {()=>{this.props.onHistoryPatientSelect(item.patientID)}}>
                    <View style = {{alignItems:'center',flexDirection:'row', justifyContent:'center'}}> 
                    <Image
                      style={{
                        width: '25%',
                        height: undefined,
                        aspectRatio: 1
                      }}
                      resizeMode = 'contain'
                      source={item.gender == "Female"?require('../assets/female.png'):require('../assets/male.png')}
                    />
                  <View style = {{flexDirection:'column'}}>
                    <View style = {{width:Dimensions.get('window').width*0.5,alignItems:'center', marginBottom:Dimensions.get('window').height*0.005}}>
                      <Text numberOfLines ={1} style = {GlobalStyles.historyLargeText}>{item.name}</Text>
                    </View>
                    <View style = {{width:Dimensions.get('window').width*0.5,alignItems:'center', marginBottom:Dimensions.get('window').height*0.005}}>
                      <Text numberOfLines ={1} style = {GlobalStyles.historySmallText}>{item.regNo == ""?item.bht+"   "+item.ward:item.regNo}</Text>
                    </View>
                    <View style = {{width:Dimensions.get('window').width*0.5,alignItems:'center', marginBottom:Dimensions.get('window').height*0.005}}>
                      <Text numberOfLines ={1} style = {GlobalStyles.historySmallText}>{item.latestVisitCmnt}</Text>
                    </View>
                    <View style = {{width:Dimensions.get('window').width*0.5,alignItems:'center', marginBottom:Dimensions.get('window').height*0.005}}>
                      <Text numberOfLines ={1} style = {GlobalStyles.historySmallTextBold}>{this.getTime(new Date(item.latestVisitTimeStamp))+"   "+this.getDate(item.latestVisitTimeStamp)}</Text>
                    </View>
                  </View>

                    </View>
              </TouchableOpacity>
                )}
              />

            </View>
            {this.state.show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={this.state.date}
          mode={this.state.mode}
          is24Hour={true}
          display="default"
          onChange={this.onChange}
        />
      )}
      <Toast ref={(ref) => Toast.setRef(ref)} />
        </View>
    );
  } 
  }
}

export default HistoryClass;
