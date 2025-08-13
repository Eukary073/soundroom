import React, { useState } from 'react';
import { View, TextInput, Text } from 'react-native';
import styled from 'styled-components/native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import Button from '../../components/Button';

const Container = styled.View`background-color: ${(props) => props.theme.colors.background}; flex: 1; padding: 20px;`;

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('fan'); // Dropdown for artist/fan
  const [error, setError] = useState('');

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: name });
      await setDoc(doc(db, 'users', user.uid), { role, name, email });
      // Redirect via router
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container>
      <TextInput placeholder="Name" value={name} onChangeText={setName} style={{ color: 'white' }} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={{ color: 'white' }} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={{ color: 'white' }} />
      <Text>Role: {role} (Add picker for artist/fan)</Text>
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
      <Button title="Signup" onPress={handleSignup} />
    </Container>
  );
}