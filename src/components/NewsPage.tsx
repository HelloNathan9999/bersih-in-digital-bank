
import React from 'react';
import { Newspaper, Globe, Users, TrendingUp, Heart, MessageCircle, Share2, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface NewsPageProps {
  isDarkMode?: boolean;
}

const NewsPage: React.FC<NewsPageProps> = ({ isDarkMode = false }) => {
<<<<<<< HEAD
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
=======
const newsItems = [
  {
    id: 1,
    title: "Gubernur Kang Dedi Mulyadi Launching Program Bank Sampah Digital",
    content: "Gubernur Jawa Barat H. Dedi Mulyadi resmi meluncurkan program bank sampah digital BERSIH.IN untuk mendukung kebersihan lingkungan di seluruh Jawa Barat.",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=200&fit=crop",
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
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=200&fit=crop",
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
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=200&fit=crop",
    author: "Tim Edukasi",
    date: "1 hari lalu",
    likes: 156,
    comments: 31,
    shares: 15,
    views: 750
  },
  {
    id: 4,
    title: "VIDEO: Aksi Komunitas Bersih-Bersih Sungai Citarum",
    content: "Simak aksi heroik komunitas relawan membersihkan Sungai Citarum yang viral di media sosial!",
    mediaType: "video",
    mediaUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    author: "BERSIH.IN TV",
    date: "3 jam lalu",
    likes: 312,
    comments: 42,
    shares: 20,
    views: 1500
  },
  {
    id: 5,
    title: "Sampah Plastik Jadi Furnitur: Inovasi Anak Muda Bandung",
    content: "Mahasiswa ITB ciptakan furnitur ramah lingkungan dari sampah plastik rumah tangga.",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1616627984983-84c8c4f6906f?w=400&h=200&fit=crop",
    author: "Green Innovation",
    date: "12 jam lalu",
    likes: 204,
    comments: 17,
    shares: 10,
    views: 980
  },
  {
    id: 6,
    title: "VIDEO: Tutorial Pemilahan Sampah Organik dan Anorganik",
    content: "Pelajari cara sederhana membedakan jenis sampah dengan cepat dan tepat untuk pemula.",
    mediaType: "video",
    mediaUrl: "https://www.w3schools.com/html/movie.mp4",
    author: "Eco Tips Channel",
    date: "2 hari lalu",
    likes: 143,
    comments: 25,
    shares: 7,
    views: 600
  },
  {
    id: 7,
    title: "Kisah Pak Dadang: Menabung Sampah Demi Masa Depan Anak",
    content: "Pak Dadang berhasil menyekolahkan anaknya dari hasil menabung sampah di BERSIH.IN.",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1533142266415-ac591a4c3d52?w=400&h=200&fit=crop",
    author: "Human Story",
    date: "3 hari lalu",
    likes: 421,
    comments: 39,
    shares: 22,
    views: 2100
  },
  {
    id: 8,
    title: "VIDEO: Behind The Scene – Teknologi di Balik BERSIH.IN",
    content: "Lihat bagaimana teknologi bekerja di balik aplikasi digital bank sampah terbesar di Indonesia.",
    mediaType: "video",
    mediaUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    author: "Tech Insider BERSIH.IN",
    date: "5 hari lalu",
    likes: 378,
    comments: 29,
    shares: 14,
    views: 1320
  },
  {
    id: 9,
    title: "Eco Fashion: Baju dari Sampah Plastik, Tren Baru Anak Muda",
    content: "Desainer muda Indonesia ciptakan tren busana dari limbah plastik yang modis dan ramah lingkungan.",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1599940824395-467c1c5f4f20?w=400&h=200&fit=crop",
    author: "Fashion Hijau",
    date: "1 jam lalu",
    likes: 190,
    comments: 12,
    shares: 6,
    views: 710
  },
  {
    id: 10,
    title: "VIDEO: Anak Sekolah Bikin Bank Sampah Mini di Kelas",
    content: "Kreativitas anak-anak SD dalam membentuk tim bank sampah sendiri menuai pujian netizen.",
    mediaType: "video",
    mediaUrl: "https://www.w3schools.com/html/movie.mp4",
    author: "Pendidikan Hijau",
    date: "6 jam lalu",
    likes: 270,
    comments: 30,
    shares: 14,
    views: 980
  },
  {
    id: 11,
    title: "Kegiatan Bersih Pantai di Pangandaran Pecahkan Rekor MURI",
    content: "Lebih dari 10.000 relawan turun ke pantai untuk membersihkan sampah plastik dan organik.",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1590490360183-694a3a2e1025?w=400&h=200&fit=crop",
    author: "Komunitas Laut",
    date: "8 jam lalu",
    likes: 390,
    comments: 44,
    shares: 25,
    views: 1400
  },
  {
    id: 12,
    title: "VIDEO: Tutorial Membuat Kompos di Rumah",
    content: "Yuk belajar bikin kompos dari sampah dapur, hemat dan suburkan tanaman!",
    mediaType: "video",
    mediaUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    author: "Green Home",
    date: "1 hari lalu",
    likes: 160,
    comments: 20,
    shares: 10,
    views: 630
  },
  {
    id: 13,
    title: "Startup Indonesia Rilis Mesin Penukar Sampah Otomatis",
    content: "Inovasi mesin pintar pertama di Asia Tenggara untuk tukar sampah dengan saldo e-wallet.",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?w=400&h=200&fit=crop",
    author: "Tech Times",
    date: "2 hari lalu",
    likes: 402,
    comments: 18,
    shares: 30,
    views: 1900
  },
  {
    id: 14,
    title: "VIDEO: Warga Bikin Festival Recycle di CFD",
    content: "Festival unik di Car Free Day Jakarta menarik perhatian ribuan warga.",
    mediaType: "video",
    mediaUrl: "https://www.w3schools.com/html/movie.mp4",
    author: "Jakarta EcoFest",
    date: "3 hari lalu",
    likes: 210,
    comments: 33,
    shares: 11,
    views: 1120
  },
  {
    id: 15,
    title: "Bali Larang Penggunaan Plastik Sekali Pakai Secara Total",
    content: "Peraturan baru di Bali mulai berlaku minggu depan, toko dilarang kasih kantong plastik.",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1549887534-4b38b3f1f7f8?w=400&h=200&fit=crop",
    author: "Bali News",
    date: "4 hari lalu",
    likes: 540,
    comments: 52,
    shares: 41,
    views: 2700
  },
  {
    id: 16,
    title: "VIDEO: Kreasi DIY Dari Botol Bekas",
    content: "Manfaatkan botol bekas jadi pot tanaman gantung yang estetik banget!",
    mediaType: "video",
    mediaUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    author: "DIY Channel",
    date: "4 hari lalu",
    likes: 199,
    comments: 16,
    shares: 9,
    views: 800
  },
  {
    id: 17,
    title: "Petani di Subang Gunakan Pupuk Kompos dari BERSIH.IN",
    content: "Kompos hasil program BERSIH.IN bantu petani tingkatkan hasil panen tanpa pupuk kimia.",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1574755392843-ea0b55e0d7f8?w=400&h=200&fit=crop",
    author: "Berita Tani",
    date: "5 hari lalu",
    likes: 303,
    comments: 21,
    shares: 17,
    views: 1340
  },
  {
    id: 18,
    title: "VIDEO: Warga Kampung Cerdas Olah Sampah Jadi Energi",
    content: "Energi dari sampah rumah tangga? Ternyata bisa, loh!",
    mediaType: "video",
    mediaUrl: "https://www.w3schools.com/html/movie.mp4",
    author: "Energi Alternatif",
    date: "6 hari lalu",
    likes: 265,
    comments: 22,
    shares: 14,
    views: 1010
  },
  {
    id: 19,
    title: "Desa Mandiri Sampah di Cianjur Raih Penghargaan Nasional",
    content: "Desa kecil di Cianjur berhasil mandiri dan nol sampah sejak 2022.",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1546074177-ffdda98d2140?w=400&h=200&fit=crop",
    author: "Award News",
    date: "1 minggu lalu",
    likes: 488,
    comments: 35,
    shares: 20,
    views: 2600
  },
  {
    id: 20,
    title: "VIDEO: Fakta Mengerikan Sampah di Laut Indonesia",
    content: "Penelitian mengungkap Indonesia penghasil sampah laut terbesar kedua di dunia.",
    mediaType: "video",
    mediaUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    author: "Ocean Watch",
    date: "1 minggu lalu",
    likes: 321,
    comments: 27,
    shares: 16,
    views: 2100
  },
  {
    id: 21,
    title: "Mahasiswa UI Buat Game Edukasi Tentang Sampah",
    content: "Game ini mengajarkan anak-anak pentingnya memilah sampah dengan cara yang seru.",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=200&fit=crop",
    author: "Edu Games",
    date: "8 hari lalu",
    likes: 180,
    comments: 10,
    shares: 7,
    views: 720
  },
  {
    id: 22,
    title: "VIDEO: Transformasi TPS Kumuh Jadi Taman Edukasi",
    content: "Dulu bau, sekarang jadi taman ramah anak. Keren banget!",
    mediaType: "video",
    mediaUrl: "https://www.w3schools.com/html/movie.mp4",
    author: "Transformasi Urban",
    date: "8 hari lalu",
    likes: 288,
    comments: 18,
    shares: 12,
    views: 880
  },
  {
    id: 23,
    title: "Festival Hijau Nusantara Akan Digelar Bulan Depan",
    content: "Event terbesar tentang lingkungan hidup bakal hadir di Jakarta Convention Center.",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1497493292307-31c376b6e479?w=400&h=200&fit=crop",
    author: "Event Organizer",
    date: "9 hari lalu",
    likes: 399,
    comments: 41,
    shares: 20,
    views: 1740
  },
  {
    id: 24,
    title: "VIDEO: Mesin Press Botol Otomatis Bantu Pengelolaan Sampah di Pasar",
    content: "Inovasi ini bikin pasar tradisional makin bersih dan modern.",
    mediaType: "video",
    mediaUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    author: "Pasar Cerdas",
    date: "10 hari lalu",
    likes: 231,
    comments: 19,
    shares: 8,
    views: 900
  },
  {
    id: 25,
    title: "Siswa SMA di Garut Buat Aplikasi Pemilah Sampah Otomatis",
    content: "Dengan AI, siswa ini bantu masyarakat lebih mudah mengelola sampah di rumah.",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1581090700227-1c2ca63c0ea0?w=400&h=200&fit=crop",
    author: "Inovasi Pelajar",
    date: "11 hari lalu",
    likes: 355,
    comments: 28,
    shares: 13,
    views: 1470
  },
  {
    id: 26,
    title: "VIDEO: Kampung Tematik BERSIH.IN Resmikan Zona Edukasi Anak",
    content: "Zona ini bantu anak-anak belajar sambil bermain soal pengelolaan sampah.",
    mediaType: "video",
    mediaUrl: "https://www.w3schools.com/html/movie.mp4",
    author: "Zona Anak",
    date: "12 hari lalu",
    likes: 195,
    comments: 14,
    shares: 10,
    views: 650
  },
  {
    id: 27,
    title: "Komunitas Ibu-Ibu di Bandung Kelola Sampah Dapur Jadi Produk UMKM",
    content: "Gerakan ibu-ibu menghasilkan sabun dan lilin dari limbah minyak jelantah.",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1567409378873-888d6fa7debc?w=400&h=200&fit=crop",
    author: "UMKM Lokal",
    date: "12 hari lalu",
    likes: 412,
    comments: 38,
    shares: 19,
    views: 1780
  },
  {
    id: 28,
    title: "VIDEO: Mahasiswa Rancang Drone Pengangkut Sampah Sungai",
    content: "Drone ini bisa mengambil sampah otomatis di aliran sungai.",
    mediaType: "video",
    mediaUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    author: "Drone Hijau",
    date: "13 hari lalu",
    likes: 277,
    comments: 22,
    shares: 14,
    views: 1200
  },
    {
    id: 29,
    title: "Startup Lokal Ciptakan Plastik Ramah Lingkungan dari Singkong",
    content: "Inovasi plastik biodegradable ini bisa terurai dalam 2 bulan saja.",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1508704019882-f9cf40e475b4?w=400&h=200&fit=crop",
    author: "EcoTech",
    date: "14 hari lalu",
    likes: 312,
    comments: 17,
    shares: 11,
    views: 1320
  },
  {
    id: 30,
    title: "VIDEO: Tutorial Buat Eco-Brick dari Sampah Plastik",
    content: "Langkah mudah bikin eco-brick dari rumah, cocok buat edukasi anak juga.",
    mediaType: "video",
    mediaUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    author: "Recycle DIY",
    date: "14 hari lalu",
    likes: 198,
    comments: 14,
    shares: 9,
    views: 840
  },
  {
    id: 31,
    title: "Kafe di Jogja Terapkan Sistem Bawa Wadah Sendiri",
    content: "Diskon 20% buat pengunjung yang bawa tempat makan sendiri.",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1576842634003-d4a8b1e8a2f2?w=400&h=200&fit=crop",
    author: "Jogja Today",
    date: "15 hari lalu",
    likes: 154,
    comments: 8,
    shares: 6,
    views: 650
  },
  {
    id: 32,
    title: "VIDEO: Sampah Jadi Mainan Anak-Anak, Kreatif Banget!",
    content: "Ibu rumah tangga ubah kardus bekas jadi mainan edukatif.",
    mediaType: "video",
    mediaUrl: "https://www.w3schools.com/html/movie.mp4",
    author: "Kreatif Rumah",
    date: "15 hari lalu",
    likes: 174,
    comments: 13,
    shares: 7,
    views: 720
  },
  {
    id: 33,
    title: "Sekolah Alam BERSIH.IN Kenalkan Edukasi Sampah Sejak Dini",
    content: "Anak-anak diajari memilah sampah dan menanam pohon sejak usia PAUD.",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1581093588401-6c0d41a4b8f4?w=400&h=200&fit=crop",
    author: "Sekolah Hijau",
    date: "16 hari lalu",
    likes: 330,
    comments: 19,
    shares: 10,
    views: 1100
  },
  {
    id: 34,
    title: "VIDEO: Tantangan Pilah Sampah #7HariBERSIH Viral di TikTok",
    content: "Challenge ini mengajak warga kota untuk memilah sampah di rumah.",
    mediaType: "video",
    mediaUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    author: "TikTokers Hijau",
    date: "16 hari lalu",
    likes: 421,
    comments: 44,
    shares: 27,
    views: 1900
  },
  {
    id: 35,
    title: "Mahasiswa KKN Bangun Tempat Kompos Kolektif di Desa",
    content: "Warga kini bisa buang sampah organik ke tempat yang langsung diolah jadi pupuk.",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1617191511006-b6b2b692c528?w=400&h=200&fit=crop",
    author: "Kampus Peduli",
    date: "17 hari lalu",
    likes: 260,
    comments: 18,
    shares: 10,
    views: 1000
  },
  {
    id: 36,
    title: "VIDEO: Gerakan Tanam 1000 Pohon dari Limbah Kompos",
    content: "Limbah jadi manfaat! Komunitas urban farming manfaatkan kompos hasil daur ulang.",
    mediaType: "video",
    mediaUrl: "https://www.w3schools.com/html/movie.mp4",
    author: "Green Farmer",
    date: "17 hari lalu",
    likes: 375,
    comments: 24,
    shares: 13,
    views: 1400
  },
  {
    id: 37,
    title: "Desainer Interior Gunakan Furniture dari Limbah Kayu",
    content: "Interior rumah kekinian tapi ramah lingkungan, yes please!",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=200&fit=crop",
    author: "Eco Living",
    date: "18 hari lalu",
    likes: 285,
    comments: 20,
    shares: 11,
    views: 1250
  },
  {
    id: 38,
    title: "VIDEO: Inovasi Keran Sensor di Tempat Sampah Umum",
    content: "Teknologi simpel tapi efektif buat jaga kebersihan.",
    mediaType: "video",
    mediaUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    author: "Smart City",
    date: "18 hari lalu",
    likes: 222,
    comments: 16,
    shares: 8,
    views: 920
  },
  {
    id: 39,
    title: "UMKM Olah Limbah Kain Jadi Tas dan Aksesori Unik",
    content: "Produk daur ulang yang estetik banget buat dijual online.",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1532634896-26909d0d0c94?w=400&h=200&fit=crop",
    author: "Wirausaha Hijau",
    date: "19 hari lalu",
    likes: 340,
    comments: 27,
    shares: 12,
    views: 1430
  },
  {
    id: 40,
    title: "VIDEO: Anak Muda Bikin Vlog Bahas Sampah Elektronik",
    content: "Bahaya e-waste dibahas dengan gaya vlog yang fun dan edukatif.",
    mediaType: "video",
    mediaUrl: "https://www.w3schools.com/html/movie.mp4",
    author: "Tech Vlogger",
    date: "19 hari lalu",
    likes: 289,
    comments: 19,
    shares: 9,
    views: 980
  },
  {
    id: 41,
    title: "Lomba Foto Daur Ulang Menarik Perhatian Nasional",
    content: "Foto-foto hasil kreasi dari barang bekas viral dan dipamerkan di galeri nasional.",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1520052205864-92d242b3a76e?w=400&h=200&fit=crop",
    author: "Foto Hijau",
    date: "20 hari lalu",
    likes: 391,
    comments: 30,
    shares: 21,
    views: 1770
  },
  {
    id: 42,
    title: "VIDEO: Workshop Kompos Gratis di Taman Kota",
    content: "Warga belajar bikin kompos sambil piknik, seru banget!",
    mediaType: "video",
    mediaUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    author: "Taman Edukasi",
    date: "20 hari lalu",
    likes: 178,
    comments: 11,
    shares: 6,
    views: 720
  },
  {
    id: 43,
    title: "Bank Sampah Mobile Pertama Resmi Meluncur",
    content: "Warga bisa setor sampah lewat aplikasi dan mobil keliling.",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1516298252535-cf2ac5147e41?w=400&h=200&fit=crop",
    author: "Inovasi Kota",
    date: "21 hari lalu",
    likes: 460,
    comments: 42,
    shares: 30,
    views: 2100
  },
  {
    id: 44,
    title: "VIDEO: Demo Alat Penyaring Mikroplastik di Sungai",
    content: "Teknologi baru ini bisa kurangi polusi mikroplastik sampai 70%.",
    mediaType: "video",
    mediaUrl: "https://www.w3schools.com/html/movie.mp4",
    author: "Clean River Team",
    date: "21 hari lalu",
    likes: 315,
    comments: 25,
    shares: 18,
    views: 1650
  },
  {
    id: 45,
    title: "Komunitas Pengrajin Gunakan Sampah Kaca Jadi Mozaik",
    content: "Hasil karyanya dijual hingga ke luar negeri!",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1585856870793-588f37a1e499?w=400&h=200&fit=crop",
    author: "Karya Lokal",
    date: "22 hari lalu",
    likes: 372,
    comments: 29,
    shares: 20,
    views: 1500
  },
  {
    id: 46,
    title: "VIDEO: Ibu-Ibu RW 08 Luncurkan Program Nol Sampah",
    content: "Ibu-ibu keren ini sukses bikin kampung bebas TPS liar.",
    mediaType: "video",
    mediaUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    author: "Warga Aktif",
    date: "22 hari lalu",
    likes: 301,
    comments: 18,
    shares: 15,
    views: 1380
  },
  {
    id: 47,
    title: "Siswa SD Juara Nasional Lomba Daur Ulang",
    content: "Kreasi robot dari kaleng bekas bikin juri kagum!",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1611604973462-0ba2f6a0113b?w=400&h=200&fit=crop",
    author: "Berita Sekolah",
    date: "23 hari lalu",
    likes: 260,
    comments: 14,
    shares: 10,
    views: 900
  },
  {
    id: 48,
    title: "VIDEO: Game Interaktif Ajak Anak Belajar Pilah Sampah",
    content: "Game berbasis Android ini bantu edukasi sejak dini.",
    mediaType: "video",
    mediaUrl: "https://www.w3schools.com/html/movie.mp4",
    author: "Edu Game",
    date: "23 hari lalu",
    likes: 240,
    comments: 20,
    shares: 11,
    views: 970
  },
  {
    id: 49,
    title: "Pameran Seni dari Limbah Plastik di Galeri Nasional",
    content: "Seniman menyoroti krisis sampah lewat instalasi kreatif.",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1554935153-a8b63c765b79?w=400&h=200&fit=crop",
    author: "Seni Hijau",
    date: "24 hari lalu",
    likes: 410,
    comments: 32,
    shares: 19,
    views: 1850
  },
  {
    id: 50,
    title: "VIDEO: Vlogger Jelajahi TPS Terbersih di Jakarta",
    content: "Siapa sangka TPS bisa bersih dan wangi?",
    mediaType: "video",
    mediaUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    author: "Urban Explorer",
    date: "24 hari lalu",
    likes: 290,
    comments: 21,
    shares: 13,
    views: 1400
  }

];

>>>>>>> 0fd5d8bc551d026d03784ba71de0bb995a11daa8

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
<<<<<<< HEAD
                <img 
                  src={news.image} 
                  alt={news.title}
                  className="w-full h-48 object-cover"
                />
=======
{news.mediaType === 'image' ? (
  <img 
    src={news.mediaUrl} 
    alt={news.title}
    className="w-full h-48 object-cover"
  />
) : (
  <video 
    controls 
    className="w-full h-48 object-cover"
  >
    <source src={news.mediaUrl} type="video/mp4" />
    Browser kamu tidak mendukung pemutaran video.
  </video>
)}

>>>>>>> 0fd5d8bc551d026d03784ba71de0bb995a11daa8
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
