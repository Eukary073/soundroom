import React, { useState, useEffect } from 'react';
import { View, Button as RNButton } from 'react-native';
import { RTCPeerConnection, RTCView, mediaDevices } from 'react-native-webrtc';

const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] }; // Free STUN for P2P

export default function Stream({ isArtist }) {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const pc = new RTCPeerConnection(configuration);

  useEffect(() => {
    mediaDevices.getUserMedia({ audio: true, video: true }).then(stream => {
      setLocalStream(stream);
      stream.getTracks().forEach(track => pc.addTrack(track, stream));
    });

    pc.ontrack = (event) => setRemoteStream(event.streams[0]);

    return () => pc.close();
  }, []);

  const startStream = async () => {
    if (isArtist) {
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      // Send offer via Firestore signaling (add collection for signals)
    } else {
      // Join: Get offer, create answer
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {localStream && <RTCView streamURL={localStream.toURL()} style={{ flex: 0.5 }} />}
      {remoteStream && <RTCView streamURL={remoteStream.toURL()} style={{ flex: 0.5 }} />}
      <RNButton title={isArtist ? 'Start Live' : 'Join Live'} onPress={startStream} />
    </View>
  );
}

// For full P2P: Implement signaling with Firebase Cloud Functions (free tier)