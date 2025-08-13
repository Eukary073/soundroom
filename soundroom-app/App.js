import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ExpoRoot } from 'expo-router';
import { ThemeProvider } from 'styled-components/native';
import theme from './theme';
import * as Font from 'expo-font';

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  React.useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Montserrat': require('./assets/fonts/Montserrat-Regular.ttf'), // Download fonts from Google Fonts and place in assets/fonts
        'Inter': require('./assets/fonts/Inter-Regular.ttf'),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <Text>Loading fonts...</Text>; // Splash screen
  }

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