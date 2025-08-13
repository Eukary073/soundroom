import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ExpoRoot } from 'expo-router';
import { ThemeProvider } from 'styled-components/native';
import theme from './theme'; // We'll add this file next

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <View style={styles.container}>
        <ExpoRoot />
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000' }, // Dark mode default
});