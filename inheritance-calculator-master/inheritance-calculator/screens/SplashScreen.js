import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Image } from 'react-native';

const SplashScreen = ({ navigation }) => {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        navigation.replace('Home');
      }, 3000);
    });
  }, [fadeAnim, navigation]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ ...styles.logoContainer, opacity: fadeAnim }}>
        <Image
          source={require('../assets/logo.png')} 
          style={styles.logo}
        />
        
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6200EE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  logoText: {
    fontSize: 15,
    color: '#FFFFFF',
    marginTop: 20,
  },
});

export default SplashScreen;
