import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

export default function Dashboard() {
  const [stats, setStats] = useState({ views: 0, revenue: 0, topFans: [] });

  useEffect(() => {
    const fetchStats = async () => {
      // Example: Query posts for views
      const postsQuery = query(collection(db, 'posts'), where('artistId', '==', auth.currentUser.uid));
      const posts = await getDocs(postsQuery);
      const totalViews = posts.docs.reduce((acc, doc) => acc + (doc.data().views || 0), 0);

      // Revenue from subscriptions: Query payments collection (add later with Stripe webhooks)
      // Top fans: Query likes/comments

      setStats({ views: totalViews, revenue: 0 /* Placeholder */, topFans: [] });
    };
    fetchStats();
  }, []);

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: 'black' }}>
      <Text style={{ color: 'white' }}>Views: {stats.views}</Text>
      <Text style={{ color: 'white' }}>Revenue: ${stats.revenue}</Text>
      {/* List top fans */}
    </View>
  );
}