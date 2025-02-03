import { View, Dimensions, StyleSheet } from 'react-native';
import React from 'react';
import * as Progress from 'react-native-progress';

const { width, height } = Dimensions.get('window');

const Loading = () => {
  return (
    <View style={[styles.container, { height, width }]} collapsable={false}>
      <Progress.CircleSnail thickness={12} size={160} color="#2ecc71" /> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loading;
