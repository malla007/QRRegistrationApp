'use strict';
import React, { Component } from 'react';
import { View, Text} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { Dimensions } from 'react-native';
import GlobalStyles from '../components/GlobalStyles';

class QRCodeScannerClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
      }

  render() {
    return (
    <View style = {{height:'100%',width:'100%', backgroundColor:'black'}}>
    <View style = {GlobalStyles.qrInstructionView}>
        <Text style = {GlobalStyles.qrInstructionsTxt}>Point camera at a QR Code</Text>
    </View>
    <QRCodeScanner
        onRead={this.props.onQRScanned}
        reactivate={true}
        cameraStyle={{height:Dimensions.get('window').height*0.9,width:'100%'}}
      />
    </View>

    );
  }
}


export default QRCodeScannerClass;