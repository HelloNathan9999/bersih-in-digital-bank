
import React from 'react';
import { Newspaper, Globe, Users, TrendingUp, Heart, MessageCircle, Share2, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface NewsPageProps {
  isDarkMode?: boolean;
}

const NewsPage: React.FC<NewsPageProps> = ({ isDarkMode = false }) => {
  const newsItems = [
    {
      id: 1,
      title: "Gubernur Kang Dedi Mulyadi Launching Program Bank Sampah Digital",
      content: "Gubernur Jawa Barat H. Dedi Mulyadi resmi meluncurkan program bank sampah digital BERSIH.IN untuk mendukung kebersihan lingkungan di seluruh Jawa Barat.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=200&fit=crop",
      author: "Admin BERSIH.IN",
      date: "2 jam lalu",
      likes: 245,
      comments: 18,
      shares: 12,
      views: 1200
    },
    {
      id: 2,
      title: "Walikota Sukabumi H. Ayep Zaki Dukung Penuh Program Kebersihan Digital",
      content: "Walikota Sukabumi H. Ayep Zaki bersama Wakil Walikota Bobby Maulana memberikan dukungan penuh untuk implementasi bank sampah digital di Kota Sukabumi.",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=200&fit=crop",
      author: "Humas Kota Sukabumi",
      date: "5 jam lalu",
      likes: 189,
      comments: 24,
      shares: 8,
      views: 890
    },
    {
      id: 3,
      title: "Tips Mengelola Sampah Rumah Tangga dengan Efektif",
      content: "Panduan lengkap cara memilah dan mengelola sampah rumah tangga agar lebih ramah lingkungan dan bernilai ekonomis.",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=200&fit=crop",
      author: "Tim Edukasi",
      date: "1 hari lalu",
      likes: 156,
      comments: 31,
      shares: 15,
      views: 750
    }
  ];

  return (
    <div className={`min-h-screen pt-20 pb-24 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`fixed top-0 left-0 right-0 z-10 pt-12 pb-4 backdrop-blur-lg ${
        isDarkMode ? 'bg-gray-900/80' : 'bg-white/80'
      }`}>
        <div className="px-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className={`p-2 rounded-xl ${isDarkMode ? 'bg-emerald-500/20' : 'bg-blue-500/20'}`}>
              <Newspaper className={`w-6 h-6 ${isDarkMode ? 'text-emerald-400' : 'text-blue-600'}`} />
            </div>
            <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Berita & Informasi
            </h1>
          </div>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Update terbaru seputar kebersihan dan lingkungan
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 space-y-4">
        {/* Featured News */}
        <div className="space-y-4">
          {newsItems.map((news) => (
            <Card key={news.id} className={`overflow-hidden shadow-lg ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
            }`}>
              <div className="relative">
                <img 
                  src={news.image} 
                  alt={news.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 right-3">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    isDarkMode ? 'bg-gray-900/80 text-white' : 'bg-white/90 text-gray-800'
                  }`}>
                    <Eye className="w-3 h-3 inline mr-1" />
                    {news.views}
                  </div>
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Globe className={`w-4 h-4 ${isDarkMode ? 'text-emerald-400' : 'text-blue-500'}`} />
                  <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {news.author} • {news.date}
                  </span>
                </div>
                
                <h3 className={`font-bold text-lg mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {news.title}
                </h3>
                
                <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {news.content}
                </p>
                
                {/* Interaction buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-1 text-red-500 hover:text-red-600">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">{news.likes}</span>
                    </button>
                    <button className={`flex items-center space-x-1 hover:opacity-75 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm">{news.comments}</span>
                    </button>
                    <button className={`flex items-center space-x-1 hover:opacity-75 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      <Share2 className="w-4 h-4" />
                      <span className="text-sm">{news.shares}</span>
                    </button>
                  </div>
                  
                  <Button variant="outline" size="sm" className={`${
                    isDarkMode ? 'border-gray-600 hover:bg-gray-700' : ''
                  }`}>
                    Baca Selengkapnya
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Official Announcements */}
        <Card className={`border-2 ${
          isDarkMode 
            ? 'bg-emerald-900/20 border-emerald-500/30' 
            : 'bg-blue-50 border-blue-200'
        }`}>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Users className={`w-6 h-6 ${isDarkMode ? 'text-emerald-400' : 'text-blue-600'}`} />
              <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Pengumuman Resmi
              </h3>
            </div>
            <div className="space-y-3">
              <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h4 className={`font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Dukungan Pemerintah Daerah
                </h4>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Program BERSIH.IN mendapat dukungan penuh dari Gubernur Jawa Barat H. Dedi Mulyadi 
                  serta Walikota dan Wakil Walikota Sukabumi H. Ayep Zaki & Bobby Maulana.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NewsPage;
