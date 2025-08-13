import React, { useState } from 'react';
import { View, TextInput, FlatList, Text } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const q = query(collection(db, 'users'), where('role', '==', 'artist'), where('name', '>=', searchTerm), where('name', '<=', searchTerm + '\uf8ff')); // Basic name search
    // Add genre/tags: Use array-contains
    const snapshot = await getDocs(q);
    setResults(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: 'black' }}>
      <TextInput placeholder="Search artists" value={searchTerm} onChangeText={setSearchTerm} onSubmitEditing={handleSearch} style={{ color: 'white' }} />
      <FlatList data={results} renderItem={({ item }) => <Text style={{ color: 'white' }}>{item.name}</Text>} keyExtractor={item => item.id} />
      {/* Trending: Query by subscriber count */}
      {/* Suggested: Based on history */}
    </View>
  );
}