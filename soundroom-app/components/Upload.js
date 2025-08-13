import React from 'react';
import * as ImagePicker from 'expo-image-picker';
import Button from './Button';

export default function Upload({ onUpload }) {
  const pickMedia = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All, // Audio/video/image
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      onUpload(result.assets[0].uri);
    }
  };

  return <Button title="Upload Media" onPress={pickMedia} />;
}