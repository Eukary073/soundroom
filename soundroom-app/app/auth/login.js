import React, { useState } from 'react';
import { View, TextInput, Text } from 'react-native';
import styled from 'styled-components/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import Button from '../../components/Button';

const Container = styled.View`background-color: ${(props) => props.theme.colors.background}; flex: 1; padding: 20px;`;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Router will handle redirect
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={{ color: 'white', borderBottomWidth: 1 }} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={{ color: 'white', borderBottomWidth: 1 }} />
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
      <Button title="Login" onPress={handleLogin} />
      {/* Add Google Sign-In: Use expo-google-app-auth */}
    </Container>
  );
}