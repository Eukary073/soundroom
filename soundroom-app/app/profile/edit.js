import React, { useState, useEffect } from 'react';
import { View, TextInput, Image } from 'react-native';
import styled from 'styled-components/native';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../../firebase';
import Button from '../../components/Button';
import Upload from '../../components/Upload'; // For profile pic/cover

const Container = styled.View`flex: 1; padding: 20px; background-color: black;`;

export default function EditProfile() {
  const [bio, setBio] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [coverArt, setCoverArt] = useState('');
  const [subscriptionPrice, setSubscriptionPrice] = useState(0); // For artists

  useEffect(() => {
    const fetchProfile = async () => {
      const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setBio(data.bio || '');
        setProfilePic(data.profilePic || '');
        setCoverArt(data.coverArt || '');
        if (data.role === 'artist') setSubscriptionPrice(data.subscriptionPrice || 0);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    await updateDoc(doc(db, 'users', auth.currentUser.uid), { bio, profilePic, coverArt, subscriptionPrice });
  };

  const uploadImage = async (uri, type) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const storageRef = ref(storage, `profiles/${auth.currentUser.uid}/${type}`);
    await uploadBytes(storageRef, blob);
    const url = await getDownloadURL(storageRef);
    if (type === 'profile') setProfilePic(url);
    else setCoverArt(url);
  };

  return (
    <Container>
      <Image source={{ uri: profilePic }} style={{ width: 100, height: 100, borderRadius: 50 }} />
      <Upload onUpload={(uri) => uploadImage(uri, 'profile')} />
      <TextInput placeholder="Bio" value={bio} onChangeText={setBio} style={{ color: 'white' }} />
      {/* Similar for cover art */}
      {auth.currentUser.role === 'artist' && <TextInput placeholder="Subscription Price" value={subscriptionPrice} onChangeText={setSubscriptionPrice} keyboardType="numeric" style={{ color: 'white' }} />}
      <Button title="Save" onPress={handleSave} />
    </Container>
  );
}