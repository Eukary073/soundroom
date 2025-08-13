import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import Post from '../../components/Post';

export default function Feed({ artistId }) { // Pass artistId for subscribed artists
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const q = query(collection(db, 'posts'), where('artistId', '==', artistId), where('subscriberOnly', '==', true)); // Privacy
      const snapshot = await getDocs(q);
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchPosts();
  }, [artistId]);

  return <FlatList data={posts} renderItem={({ item }) => <Post post={item} />} keyExtractor={item => item.id} />;
}