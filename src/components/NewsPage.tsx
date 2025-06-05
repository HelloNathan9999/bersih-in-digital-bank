
import React from 'react';

interface NewsPageProps {
  isDarkMode?: boolean;
}

const NewsPage: React.FC<NewsPageProps> = ({ isDarkMode = false }) => {
  return (
    <div className={`min-h-screen p-6 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <h1 className="text-2xl font-bold mb-6">Berita & Edukasi</h1>
      <div className="space-y-4">
        <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
          <h2 className="font-semibold mb-2">5 Cara Mudah Mengurangi Sampah Plastik di Rumah</h2>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Tips praktis untuk mengurangi sampah plastik dalam kehidupan sehari-hari...</p>
        </div>
        
        <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
          <h2 className="font-semibold mb-2">Komunitas BERSIH.IN Berhasil Kumpulkan 10 Ton Sampah</h2>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Event komunitas yang sukses mengumpulkan sampah dari berbagai wilayah...</p>
        </div>
        
        <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
          <h2 className="font-semibold mb-2">Video: Proses Daur Ulang Botol Plastik Menjadi Pakaian</h2>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Lihat bagaimana botol plastik dapat diubah menjadi pakaian berkualitas...</p>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
