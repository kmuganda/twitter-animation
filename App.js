import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Animated } from 'react-native';

HEADER_MAX_HEIGHT = 120
HEADER_MIN_HEIGHT = 70
PROFILE_IMAGE_MAX_HEIGHT = 80
PROFILE_IMAGE_MIN_HEIGHT = 40

export default class App extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      scrollY: new Animated.Value(0)
    }
  }

  render() {

    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp'
    })

    const profileImageHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [PROFILE_IMAGE_MAX_HEIGHT, PROFILE_IMAGE_MIN_HEIGHT],
      extrapolate: 'clamp'
    })

    const profileImageMarginTop = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [HEADER_MAX_HEIGHT - (PROFILE_IMAGE_MAX_HEIGHT / 2),
      HEADER_MAX_HEIGHT + 5],
      extrapolate: 'clamp'
    })

    const headerZindex = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    })

    const headerTitleBottom = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT,
      HEADER_MAX_HEIGHT-HEADER_MIN_HEIGHT+5+PROFILE_IMAGE_MIN_HEIGHT,
      HEADER_MAX_HEIGHT-HEADER_MIN_HEIGHT+5+PROFILE_IMAGE_MIN_HEIGHT
      + 26
      ],
      outputRange: [-20, -20, -20, 0],
      extrapolate: 'clamp'
    })

    return (
      <View style={{flex: 1}}>
        <Animated.View style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: 'lightskyblue',
          height: headerHeight,
          zIndex: headerZindex,
          alignItems: 'center'

        }}>
          <Animated.View style={{position: 'absolute', bottom:
          headerTitleBottom }}>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold'}}>Kaneja</Text>
          </Animated.View>
        </Animated.View>

        <ScrollView style={{flex: 1}}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{nativeEvent:{contentOffset: {y: this.state.scrollY}}}]
          )}
        >
          <Animated.View style={{
            height: profileImageHeight,
            width: profileImageHeight,
            borderRadius: PROFILE_IMAGE_MAX_HEIGHT / 2,
            borderColor: 'white',
            borderWidth: 3,
            overflow: 'hidden',
            marginTop: profileImageMarginTop,
            marginLeft: 10
          }}>
            <Image source={require('./assets/me.jpg')}
              style={{flex: 1, width: null, height: null}}
            >
            </Image>
          </Animated.View>
          <View>
            <Text style={{fontWeight: 'bold', fontSize: 26, paddingLeft: 10}}>
            Kaneja</Text>
          </View>
          <View style={{height: 1000}}></View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
