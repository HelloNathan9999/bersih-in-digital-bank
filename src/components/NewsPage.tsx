
import React, { useState } from 'react';
import { Heart, Share2, MessageCircle, Play, Search, Filter, Send } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

interface NewsPageProps {
  isDarkMode?: boolean;
}

const NewsPage: React.FC<NewsPageProps> = ({ isDarkMode = false }) => {
  const [activeFilter, setActiveFilter] = useState('semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [showComments, setShowComments] = useState<number | null>(null);
  const [newComment, setNewComment] = useState('');

  const filters = [
    { id: 'semua', label: 'Semua' },
    { id: 'tips', label: 'Tips' },
    { id: 'event', label: 'Event' },
    { id: 'edukasi', label: 'Edukasi' },
    { id: 'video', label: 'Video' },
    { id: 'umkm', label: 'UMKM' }
  ];

  const [posts, setPosts] = useState([
    {
      id: 1,
      type: 'tips',
      author: 'BERSIH.IN Official',
      avatar: '🌱',
      time: '2 jam lalu',
      content: '5 Cara Mudah Mengurangi Sampah Plastik di Rumah\n\n1. Gunakan tas belanja yang bisa digunakan ulang\n2. Pilih botol minum stainless steel\n3. Hindari sedotan plastik\n4. Beli produk dengan kemasan minimal\n5. Daur ulang kemasan plastik yang sudah ada',
      image: '🏠',
      likes: 124,
      comments: [
        { id: 1, author: 'User123', content: 'Tips yang sangat bermanfaat!' },
        { id: 2, author: 'EcoLover', content: 'Sudah saya praktikkan, hasilnya bagus!' }
      ],
      shares: 8,
      isLiked: false
    },
    {
      id: 2,
      type: 'video',
      author: 'Eco Channel',
      avatar: '📹',
      time: '4 jam lalu',
      content: 'Video Tutorial: Cara Membuat Tas Belanja dari Botol Plastik Bekas\n\nDalam video ini, kalian akan belajar step-by-step mengubah botol plastik menjadi tas belanja yang cantik dan kuat!',
      image: '♻️',
      likes: 89,
      comments: [
        { id: 1, author: 'CraftLover', content: 'Kreatif banget!' }
      ],
      shares: 12,
      isVideo: true,
      isLiked: true
    },
    {
      id: 3,
      type: 'event',
      author: 'Komunitas Bersih Jakarta',
      avatar: '🏘️',
      time: '1 hari lalu',
      content: 'Event Bersih-Bersih Pantai Ancol\n\nJoin us this weekend untuk membersihkan pantai Ancol! Mari bersama-sama menjaga kebersihan lingkungan.\n\n📅 Sabtu, 8 Juni 2025\n⏰ 07:00 - 11:00 WIB\n📍 Pantai Ancol, Jakarta Utara',
      image: '🏖️',
      likes: 256,
      comments: [],
      shares: 32,
      isLiked: false
    }
  ]);

  const handleLike = (postId: number) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  const handleShare = (post: any) => {
    toast({
      title: "Postingan Dibagikan",
      description: "Postingan berhasil dibagikan!",
    });
  };

  const handleComment = (postId: number) => {
    if (newComment.trim()) {
      setPosts(prev => prev.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              comments: [...post.comments, { 
                id: Date.now(), 
                author: 'Anda', 
                content: newComment 
              }]
            }
          : post
      ));
      setNewComment('');
      toast({
        title: "Komentar Ditambahkan",
        description: "Komentar Anda berhasil ditambahkan!",
      });
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesFilter = activeFilter === 'semua' || post.type === activeFilter;
    const matchesSearch = post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className={`min-h-screen pt-16 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`fixed top-0 left-0 right-0 z-10 pt-12 pb-4 ${
        isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'
      } backdrop-blur-lg shadow-sm`}>
        <div className="px-6">
          <h1 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Berita & Edukasi
          </h1>
          
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-400'
            }`} />
            <Input
              type="text"
              placeholder="Cari berita, tips, atau event..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`pl-10 pr-12 ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white'
              }`}
            />
            <Button size="sm" variant="ghost" className="absolute right-1 top-1/2 transform -translate-y-1/2">
              <Filter className="w-4 h-4" />
            </Button>
          </div>

          {/* Filter Tabs */}
          <div className="flex space-x-2 overflow-x-auto">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeFilter === filter.id
                    ? 'bg-green-500 text-white'
                    : isDarkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-4" style={{ marginTop: '180px' }}>
        {filteredPosts.map((post) => (
          <Card key={post.id} className={`shadow-sm ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
          }`}>
            <CardContent className="p-4">
              {/* Post Header */}
              <div className="flex items-center space-x-3 mb-3">
                <div className="text-2xl">{post.avatar}</div>
                <div className="flex-1">
                  <div className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    {post.author}
                  </div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {post.time}
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    post.type === 'tips' ? 'bg-green-100 text-green-800' :
                    post.type === 'video' ? 'bg-red-100 text-red-800' :
                    post.type === 'event' ? 'bg-blue-100 text-blue-800' :
                    post.type === 'umkm' ? 'bg-purple-100 text-purple-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {post.type.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Post Content */}
              <div className="mb-4">
                <p className={`leading-relaxed whitespace-pre-line ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-800'
                }`}>
                  {post.content}
                </p>
                
                {/* Post Image/Media */}
                <div className="mt-3 relative">
                  <div className={`rounded-lg p-8 text-center ${
                    isDarkMode 
                      ? 'bg-gradient-to-br from-gray-700 to-gray-800' 
                      : 'bg-gradient-to-br from-gray-100 to-gray-200'
                  }`}>
                    <div className="text-6xl mb-2">{post.image}</div>
                    {post.isVideo && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black/70 rounded-full p-4">
                          <Play className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Post Actions */}
              <div className={`flex items-center justify-between pt-3 border-t ${
                isDarkMode ? 'border-gray-700' : 'border-gray-100'
              }`}>
                <div className="flex items-center space-x-6">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center space-x-2 transition-colors ${
                      post.isLiked 
                        ? 'text-red-500' 
                        : isDarkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-600 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                    <span className="text-sm font-medium">{post.likes}</span>
                  </button>
                  
                  <button 
                    onClick={() => setShowComments(showComments === post.id ? null : post.id)}
                    className={`flex items-center space-x-2 transition-colors ${
                      isDarkMode 
                        ? 'text-gray-400 hover:text-blue-400' 
                        : 'text-gray-600 hover:text-blue-500'
                    }`}
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">{post.comments.length}</span>
                  </button>
                  
                  <button 
                    onClick={() => handleShare(post)}
                    className={`flex items-center space-x-2 transition-colors ${
                      isDarkMode 
                        ? 'text-gray-400 hover:text-green-400' 
                        : 'text-gray-600 hover:text-green-500'
                    }`}
                  >
                    <Share2 className="w-5 h-5" />
                    <span className="text-sm font-medium">{post.shares}</span>
                  </button>
                </div>
              </div>

              {/* Comments Section */}
              {showComments === post.id && (
                <div className={`mt-4 pt-4 border-t space-y-3 ${
                  isDarkMode ? 'border-gray-700' : 'border-gray-100'
                }`}>
                  {post.comments.map((comment) => (
                    <div key={comment.id} className="flex space-x-3">
                      <div className="text-lg">👤</div>
                      <div className="flex-1">
                        <div className={`font-medium text-sm ${
                          isDarkMode ? 'text-white' : 'text-gray-800'
                        }`}>
                          {comment.author}
                        </div>
                        <div className={`text-sm ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          {comment.content}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Add Comment */}
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Tulis komentar..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className={`flex-1 ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-gray-50'
                      }`}
                      onKeyPress={(e) => e.key === 'Enter' && handleComment(post.id)}
                    />
                    <Button 
                      size="sm" 
                      onClick={() => handleComment(post.id)}
                      disabled={!newComment.trim()}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className={`text-lg font-semibold mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Tidak ada konten ditemukan
            </h3>
            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
              Coba ubah filter atau kata kunci pencarian
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsPage;
