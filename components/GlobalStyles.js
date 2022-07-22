import { StyleSheet} from 'react-native';
import { Dimensions } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const GlobalStyles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#18C3F7",
        alignItems:'center',
    },
    bottomNavBar: {
        backgroundColor: "#1C8299",
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height*0.1,
        position:"absolute",
        bottom:0
    },
    navContent: {
        flexDirection:'row',
        flex:3
    },
    navView: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    smallIcon: {
        width: '40%',
        height: undefined,
        aspectRatio: 1,
        overflow: 'visible'
    },
    largeIcon:{
        width: '60%',
        height: undefined,
        aspectRatio: 1,
        overflow: 'visible',
        bottom:'20%'
    },
    content: {
        height:Dimensions.get('window').height*0.9,
        width:Dimensions.get('window').width,
        paddingHorizontal:'10%',
        paddingTop:'5%'
    },
    qrContent: {
        flex:1,
        justifyContent: 'center',
        alignItems:'center',
        overflow: 'hidden',
    },
    qrText: {
        color:"#FFFFFF",
        fontFamily:"Baloo2-ExtraBold",
        fontSize:hp('3.5%'),
    },
    prContent:{
        height:Dimensions.get('window').height*0.9,
        width:Dimensions.get('window').width,
        paddingHorizontal:'10%',
        paddingTop:'5%',
    },
    prTxt: {
        color:"#FFFFFF",
        fontFamily:"Baloo2-ExtraBold",
        fontSize:hp('2.5%'),
    },
    prLabelTxt: {
        fontFamily:'Amiko-Regular',
        fontWeight:'400',
        fontSize:hp('2%'),
        color:'white'
    },
    prRecordTxt: {
        fontFamily:'Amiko-Bold',
        fontSize:hp('2%'),
        color:'white',
        paddingLeft:'5%'
    },
    line: {
        height:Dimensions.get('window').height*0.001,
        width:'100%',
        backgroundColor:'white',
        marginTop:'2.5%'
    },
    visitsCard: {
        width:'100%',
        borderWidth:3,
        borderColor:'white',
        marginTop:'5%',
        borderRadius:5,
        justifyContent: 'center',
        padding:'3%'
    },
    addVisitBtn: {
        height:Dimensions.get('window').height*0.04,
        width:Dimensions.get('window').width*0.35,
        backgroundColor:'white',
        marginTop:'5%',
        alignSelf:'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:13,
        marginBottom:'15%'
    },
    numberBtn: {
        height:Dimensions.get('window').height*0.04,
        width:Dimensions.get('window').width*0.08,
        backgroundColor:'white',
        alignSelf:'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:20, 
        marginRight:'3%'
    },
    numberBtnTxt: {
        color:"#1C8299",
        fontFamily:"Baloo2-ExtraBold",
        fontSize:hp('2%'),
        paddingHorizontal:'3%',
    },
    addVisitTxt: {
        color:"#1C8299",
        fontFamily:"Baloo2-ExtraBold",
        fontSize:hp('2%'),
        paddingHorizontal:'3%',
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: {width: -5, height: 5},
        textShadowRadius: 10
    },
    textInputShort: {
        backgroundColor:'white',
        width:Dimensions.get('window').width*0.5,
        height:Dimensions.get('window').height*0.05,
        color:'black',
        fontFamily:'Amiko-Regular',
        fontWeight:'400',
        fontSize:hp('1.75%'),
        marginTop:'2.5%',
        borderRadius:4,
        paddingTop: 0,
        paddingBottom: 0
    },
    textInputLong: {
        backgroundColor:'white',
        width:'100%',
        height:Dimensions.get('window').height*0.1,
        marginTop:'2.5%',
        justifyContent: 'flex-start',
        borderRadius:4,
    },
    textInputAge: {
        backgroundColor:'white',
        width:Dimensions.get('window').width*0.1,
        height:Dimensions.get('window').height*0.05,
        borderRadius:4,
        marginLeft:'5%',
        justifyContent: 'center',
        alignItems:'center',
    },
    textInputShortTelNo: {
        backgroundColor:'white',
        width:Dimensions.get('window').width*0.5,
        height:Dimensions.get('window').height*0.05,
        color:'black',
        fontFamily:'Amiko-Regular',
        fontWeight:'400',
        fontSize:hp('1.75%'),
        borderRadius:4,
        marginLeft:'5%',
        paddingTop: 0,
        paddingBottom: 0,
    },
    textInputLongDiagnosis: {
        backgroundColor:'white',
        width:'100%',
        height:Dimensions.get('window').height*0.15,
        marginTop:'2.5%',
        justifyContent: 'flex-start',
        borderRadius:4,
    },
    textInputShortClinic: {
        backgroundColor:'white',
        width:Dimensions.get('window').width*0.3,
        height:Dimensions.get('window').height*0.05,
        borderRadius:4,
        marginLeft:'5%',
        justifyContent: 'center',

    },
    textInputShortConsultant: {
        backgroundColor:'white',
        width:'100%',
        height:Dimensions.get('window').height*0.05,
        color:'black',
        fontFamily:'Amiko-Regular',
        fontWeight:'400',
        fontSize:hp('1.75%'),
        marginTop:'2.5%',
        borderRadius:4,
        paddingTop: 0,
        paddingBottom: 0,
    },
    qrInstructionView: {
        width:'100%',
        height:Dimensions.get('window').height*0.03,
        backgroundColor:'#f6ac59',
        position: "absolute",
        bottom:0,
        marginBottom:'40%',
        justifyContent: 'center',
        alignItems:'center',
        zIndex:1
    },
    qrInstructionsTxt: {
        color:"#FFFFFF",
        fontStyle:'italic',
        fontSize:hp('2%')
    },
    selectDateBtn: {
        height:Dimensions.get('window').height*0.04,
        width:Dimensions.get('window').width*0.35,
        backgroundColor:'white',
        alignSelf:'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:13,
    },
    selectDateTxt: {
        color:"#1C8299",
        fontFamily:"Baloo2-ExtraBold",
        fontSize:hp('2%'),
        paddingHorizontal:'3%',
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: {width: -5, height: 5},
        textShadowRadius: 10
    },
    historyCard: {
        width:'100%',
        backgroundColor:'white',
        borderRadius:6,
        padding:'5%', 
        marginTop:Dimensions.get('window').height*0.03,
        alignItems:'center',
        justifyContent: 'center',
    },
    historySmallTextBold: {
        color:'#18C3F7',
        fontFamily:'Amiko-SemiBold',
        fontWeight:'400',
        fontSize:hp('1.75%'),
    },
    historySmallText: {
        color:'#18C3F7',
        fontFamily:'Amiko-Regular',
        fontWeight:'400',
        fontSize:hp('1.75%'),
    },
    historyLargeText: {
        color:'black',
        fontFamily:'Amiko-SemiBold',
        fontWeight:'400',
        fontSize:hp('2.25%'),
    },
    addImageIcon: {
        width: '20%',
        height: undefined,
        aspectRatio: 1,
        overflow: 'visible'
    },
    displayImgIcon: {
        width: '15%',
        height: undefined,
        aspectRatio: 1,
        overflow: 'visible',
        justifyContent: 'center',
        alignItems:'center',
        marginLeft:'3%',
        
    },
displayImgIconAddVisit: {
    width: '15%',
    height: undefined,
    aspectRatio: 1,
    overflow: 'visible',
    justifyContent: 'center',
    alignItems:'center',
    marginRight:'3%',
    
},
    modalStyle: {
        height:Dimensions.get('window').height*0.7,
        width:Dimensions.get('window').width*0.8,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignSelf:'center',
    },
    deleteBtn: {
        height:Dimensions.get('window').height*0.04,
        width:Dimensions.get('window').width*0.35,
        backgroundColor:'white',
        marginTop:'5%',
        alignSelf:'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:13,
    },
    displayImg: {
        width: '250%',
        height: undefined,
        aspectRatio: 1.8,
        
    },
    customSlide: {
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
    },
    deleteBtnTxt: {
        color:"#AF0543",
        fontFamily:"Baloo2-ExtraBold",
        fontSize:hp('2%'),
        paddingHorizontal:'3%',
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: {width: -5, height: 5},
        textShadowRadius: 10
    },
    imageBackground: {
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        padding:'5%',
        width: Dimensions.get('window').width*0.9,
        height: Dimensions.get('window').height*0.7,
        justifyContent: 'center',
        alignItems:'center',
    },
    closeButtonView: {
        position: "absolute",
        right:0,
        zIndex:2,
        alignItems:'flex-end',
        top:0
    },
    visitFormStyle: {
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        width: Dimensions.get('window').width*0.9,
        padding:'5%',
        borderRadius:26,
    },
    addVisitBtnPr: {
        height:Dimensions.get('window').height*0.04,
        width:Dimensions.get('window').width*0.35,
        backgroundColor:'white',
        alignSelf:'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:13,
        marginBottom:'5%',
        marginTop:'5%'
    },
    animationStyle: {
        width: '75%',
        height: undefined,
        aspectRatio: 1,
    },
    textInputSearchBar: {
        backgroundColor:'white',
        width:Dimensions.get('window').width*0.7,
        height:Dimensions.get('window').height*0.05,
        color:'black',
        fontFamily:'Amiko-Regular',
        fontWeight:'400',
        fontSize:hp('1.5%'),
        borderRadius:16,
        paddingTop: 0,
        paddingBottom: 0,
        paddingHorizontal:'5%'
    },
    registryCard:{
        width:'100%',
        backgroundColor:'white',
        borderRadius:24,
        padding:'5%', 
        marginTop:Dimensions.get('window').height*0.03,
        flexDirection:'row',
        alignItems:'center',
        marginBottom:Dimensions.get('window').height*0.1
    },



})

export default GlobalStyles;