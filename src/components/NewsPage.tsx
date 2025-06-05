import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Heart, 
  MessageCircle, 
  Share, 
  Bookmark,
  MoreHorizontal,
  Send,
  Camera,
  Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from '@/hooks/use-toast';

interface NewsPageProps {
  isDarkMode: boolean;
}

const NewsPage: React.FC<NewsPageProps> = ({ isDarkMode }) => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: {
        name: 'Bank Sampah Hijau',
        avatar: '🏪',
        verified: true
      },
      content: 'Mari bersama-sama menjaga lingkungan! Hari ini kami berhasil mengumpulkan 500kg sampah plastik dari warga sekitar. Terima kasih kepada semua yang telah berpartisipasi! 🌱♻️',
      image: '🌱',
      likes: 234,
      comments: 45,
      shares: 12,
      timestamp: '2 jam lalu',
      liked: false,
      bookmarked: false
    },
    {
      id: 2,
      user: {
        name: 'Eco Warrior Community',
        avatar: '🌍',
        verified: true
      },
      content: 'Tips hari ini: Cara mudah memilah sampah di rumah! Pisahkan organik dan anorganik untuk proses daur ulang yang lebih efektif. Setiap langkah kecil berkontribusi besar untuk bumi kita! 💚',
      image: '♻️',
      likes: 189,
      comments: 23,
      shares: 8,
      timestamp: '4 jam lalu',
      isVideo: true,
      liked: true,
      bookmarked: false
    },
    {
      id: 3,
      user: {
        name: 'BERSIH.IN Official',
        avatar: '🔵',
        verified: true
      },
      content: 'Update fitur terbaru! Sekarang kalian bisa tukar poin dengan berbagai reward menarik. Cek menu Voucher & Reward untuk melihat hadiah yang tersedia! 🎁',
      image: '🎁',
      likes: 456,
      comments: 67,
      shares: 34,
      timestamp: '6 jam lalu',
      liked: false,
      bookmarked: true
    }
  ]);

  const [showComments, setShowComments] = useState<number | null>(null);
  const [commentText, setCommentText] = useState('');

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            liked: !post.liked,
            likes: post.liked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
    
    const post = posts.find(p => p.id === postId);
    if (post) {
      toast({
        title: post.liked ? "Like dihapus" : "Post disukai!",
        description: post.liked ? "Like berhasil dihapus" : "Terima kasih atas dukungannya!",
      });
    }
  };

  const handleComment = (postId: number) => {
    setShowComments(showComments === postId ? null : postId);
  };

  const handleShare = (postId: number) => {
    const post = posts.find(p => p.id === postId);
    if (post) {
      setPosts(posts.map(p => 
        p.id === postId ? { ...p, shares: p.shares + 1 } : p
      ));
      
      toast({
        title: "Post dibagikan!",
        description: "Link berhasil disalin ke clipboard",
      });
    }
  };

  const handleBookmark = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, bookmarked: !post.bookmarked }
        : post
    ));
    
    const post = posts.find(p => p.id === postId);
    if (post) {
      toast({
        title: post.bookmarked ? "Bookmark dihapus" : "Post disimpan!",
        description: post.bookmarked ? "Post dihapus dari bookmark" : "Post berhasil disimpan",
      });
    }
  };

  const submitComment = (postId: number) => {
    if (commentText.trim()) {
      toast({
        title: "Komentar berhasil!",
        description: "Komentar Anda telah ditambahkan",
      });
      setCommentText('');
      setShowComments(null);
    }
  };

  return (
    <div className={`min-h-screen pt-16 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`fixed top-0 left-0 right-0 z-10 pt-12 pb-4 ${
        isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'
      } backdrop-blur-lg shadow-sm`}>
        <div className="px-6">
          <div className="flex items-center space-x-4">
            <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Berita & Update
            </h1>
          </div>
        </div>
      </div>

      {/* Feed Content */}
      <div className="px-0 py-6" style={{ marginTop: '120px' }}>
        <div className="space-y-0">
          {posts.map((post) => (
            <Card key={post.id} className={`rounded-none border-x-0 ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <CardContent className="p-0">
                {/* Post Header */}
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src="" />
                      <AvatarFallback className="text-lg">
                        {post.user.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-1">
                        <h3 className={`font-semibold text-sm ${
                          isDarkMode ? 'text-white' : 'text-gray-800'
                        }`}>
                          {post.user.name}
                        </h3>
                        {post.user.verified && (
                          <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </div>
                      <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {post.timestamp}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className={`w-5 h-5 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`} />
                  </Button>
                </div>

                {/* Post Content */}
                <div className="px-4 pb-3">
                  <p className={`text-sm leading-relaxed ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    {post.content}
                  </p>
                </div>

                {/* Post Image/Video */}
                <div className={`relative aspect-square ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                } flex items-center justify-center`}>
                  <div className="text-8xl">{post.image}</div>
                  {post.isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/50 rounded-full p-3">
                        <Play className="w-8 h-8 text-white fill-white" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Post Actions */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(post.id)}
                        className="p-0"
                      >
                        <Heart 
                          className={`w-6 h-6 ${
                            post.liked 
                              ? 'text-red-500 fill-red-500' 
                              : isDarkMode ? 'text-gray-400' : 'text-gray-700'
                          }`} 
                        />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleComment(post.id)}
                        className="p-0"
                      >
                        <MessageCircle className={`w-6 h-6 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-700'
                        }`} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleShare(post.id)}
                        className="p-0"
                      >
                        <Share className={`w-6 h-6 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-700'
                        }`} />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleBookmark(post.id)}
                      className="p-0"
                    >
                      <Bookmark 
                        className={`w-6 h-6 ${
                          post.bookmarked 
                            ? 'text-gray-800 fill-gray-800' 
                            : isDarkMode ? 'text-gray-400' : 'text-gray-700'
                        }`} 
                      />
                    </Button>
                  </div>

                  {/* Likes and Comments Count */}
                  <div className="space-y-1">
                    <p className={`font-semibold text-sm ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    }`}>
                      {post.likes.toLocaleString()} suka
                    </p>
                    {post.comments > 0 && (
                      <button
                        onClick={() => handleComment(post.id)}
                        className={`text-sm ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        } hover:underline`}
                      >
                        Lihat {post.comments} komentar
                      </button>
                    )}
                  </div>

                  {/* Comment Section */}
                  {showComments === post.id && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback>👤</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 flex items-center space-x-2">
                          <Input
                            placeholder="Tambahkan komentar..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            className={`border-0 bg-transparent ${
                              isDarkMode ? 'text-white' : 'text-gray-800'
                            } focus:ring-0`}
                          />
                          <Button
                            size="sm"
                            onClick={() => submitComment(post.id)}
                            disabled={!commentText.trim()}
                          >
                            <Send className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
