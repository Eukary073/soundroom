import React, { useState } from 'react';
import { View, TextInput, Switch } from 'react-native';
import styled from 'styled-components/native';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import Button from '../../components/Button';
import Upload from '../../components/Upload';

const Container = styled.View`flex: 1; padding: 20px; background-color: black;`;

export default function CreatePost() {
  const [text, setText] = useState('');
  const [mediaUri, setMediaUri] = useState('');
  const [subscriberOnly, setSubscriberOnly] = useState(true);
  const [scheduleDate, setScheduleDate] = useState(null); // Use DatePicker for UI

  const handleCreate = async () => {
    const postData = {
      artistId: auth.currentUser.uid,
      text,
      media: mediaUri, // Upload to storage first if needed
      subscriberOnly,
      createdAt: Timestamp.now(),
      scheduledAt: scheduleDate ? Timestamp.fromDate(new Date(scheduleDate)) : null,
      views: 0,
    };
    await addDoc(collection(db, 'posts'), postData);
    // Clear form or navigate back
  };

  return (
    <Container>
      <TextInput placeholder="Post text" value={text} onChangeText={setText} style={{ color: 'white' }} multiline />
      <Upload onUpload={setMediaUri} />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Switch value={subscriberOnly} onValueChange={setSubscriberOnly} />
        <Text style={{ color: 'white', marginLeft: 10 }}>Subscriber-only</Text>
      </View>
      {/* Add DatePicker for scheduleDate (use react-native-datepicker or similar) */}
      <Button title="Post" onPress={handleCreate} />
    </Container>
  );
}