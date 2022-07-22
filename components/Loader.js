import React from 'react';
import LottieLoader from 'react-native-lottie-loader';
import GlobalStyles from './GlobalStyles';
import { View} from 'react-native';
export default class Loader extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
        <View style={{heigt:'100%',width:"100%"}}>
            <LottieLoader source={require('../assets/heartbeatAnim.json')}visible={true}  animationStyle = {GlobalStyles.animationStyle} />
        </View>
        
    )
    
  }
}