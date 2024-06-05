import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, useAnimatedGestureHandler } from 'react-native-reanimated';

interface SwipeDrawerProps {
  onLogout: () => void;
}

const SwipeDrawer: React.FC<SwipeDrawerProps> = ({ onLogout }) => {
  const translateX = useSharedValue(-250); // Hidden off-screen to the left

  const gestureHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      translateX.value = event.translationX - 250;
    },
    onEnd: () => {
      if (translateX.value > -125) {
        translateX.value = withSpring(0);
      } else {
        translateX.value = withSpring(-250);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value > 0 ? 0 : translateX.value }],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.drawer, animatedStyle]}>
        <Pressable onPress={onLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  drawer: {
    position: 'absolute',
    left: 0,
    width: 250,
    height: '100%',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 1000,
  },
  logoutButton: {
    marginTop: 50,
    padding: 20,
    backgroundColor: '#f44336',
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SwipeDrawer;
