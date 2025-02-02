import React, { useState } from 'react';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import ProfileSection from './ProfileSection';
import CreatePost from './CreatePost';
import PostList from './PostList';
import FeaturedArtists from './FeaturedArtists';
import { Post } from '../../types/feed';

// Mock initial posts
const initialPosts: Post[] = [
  {
    id: '1',
    userId: '1',
    userName: 'Sarah Chen',
    userRole: 'Musician/Band',
    content: 'Excited to announce my upcoming jazz performance! Stay tuned for more details.',
    mediaUrl: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80',
    mediaType: 'image',
    likes: 24,
    shares: 8,
    comments: 12,
    createdAt: new Date('2024-03-10').toISOString(),
  },
  {
    id: '2',
    userId: '2',
    userName: 'Marcus Rivera',
    userRole: 'Dancer',
    content: 'New choreography dropping soon! 🎵 #DanceLife',
    mediaUrl: 'https://images.unsplash.com/photo-1535525153412-5a092c564c20?auto=format&fit=crop&q=80',
    mediaType: 'image',
    likes: 45,
    shares: 15,
    comments: 18,
    createdAt: new Date('2024-03-09').toISOString(),
  },
];

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const handleNewPost = (post: Post) => {
    setPosts([post, ...posts]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-8">
            <ProfileSection />
            <CreatePost onPost={handleNewPost} />
            <div className="mt-8">
              <PostList posts={posts} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <FeaturedArtists />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}