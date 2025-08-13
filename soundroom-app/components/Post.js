import React from 'react';
import { View, Text, Image, Video } from 'react-native'; // Use expo-av for audio/video
import { Audio, Video as ExpoVideo } from 'expo-av';
import styled from 'styled-components/native';

const PostContainer = styled.View`margin: 10px; padding: 10px; background-color: #1a1a1a; border-radius: 10px;`;

export default function Post({ post }) {
  return (
    <PostContainer>
      <Text style={{ color: 'white' }}>{post.text}</Text>
      {post.image && <Image source={{ uri: post.image }} style={{ width: 200, height: 200 }} />}
      {post.video && <ExpoVideo source={{ uri: post.video }} style={{ width: 200, height: 200 }} useNativeControls />}
      {post.audio && <Audio.Player source={{ uri: post.audio }} />} // Basic playback
      {/* Add like/comment: Use Firestore subcollections */}
    </PostContainer>
  );
}