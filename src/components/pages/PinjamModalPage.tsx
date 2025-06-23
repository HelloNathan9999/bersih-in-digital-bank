
import React, { useState } from 'react';
import { 
  ArrowLeft, 
  CheckCircle, 
  AlertCircle, 
  Upload, 
  Camera, 
  User, 
  Phone, 
  MapPin, 
  CreditCard,
  Calendar,
  FileText,
  DollarSign,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

interface PinjamModalPageProps {
  onBack: () => void;
  isDarkMode?: boolean;
}

const PinjamModalPage: React.FC<PinjamModalPageProps> = ({ onBack, isDarkMode = false }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Data Pribadi
    fullName: '',
    nik: '',
    address: '',
    phone: '',
    
    // Data Pinjaman
    loanAmount: '',
    loanPurpose: '',
    loanTenor: '',
    paymentMethod: '',
    
    // Data Tambahan
    monthlyIncome: '',
    emergencyContact: '',
    emergencyPhone: '',
    businessDescription: '',
    
    // Upload Files
    ktpFront: null as File | null,
    ktpBack: null as File | null,
    selfieWithKtp: null as File | null,
    businessPhoto: null as File | null
  });

  const syaratUmum = [
    { icon: CheckCircle, text: "Akun BERSIH.IN terverifikasi (KTP + nomor HP aktif)", status: "completed" },
    { icon: CheckCircle, text: "Minimal sudah 100x setor sampah dalam 3 bulan terakhir", status: "completed" },
    { icon: AlertCircle, text: "Saldo penukaran sampah minimum Rp25.000", status: "warning" },
    { icon: CheckCircle, text: "Tidak sedang menunggak pinjaman sebelumnya", status: "completed" },
    { icon: CheckCircle, text: "Memiliki tujuan pinjaman yang jelas", status: "completed" }
  ];

  const syaratKhusus = [
    "Sudah mengisi profil lengkap",
    "Mengunggah dokumen pendukung (foto KTP, selfie, usaha)",
    "Bersedia dipotong otomatis dari saldo jika jatuh tempo",
    "Setuju dengan Syarat & Ketentuan (Terms & Agreement)"
  ];

  const loanPurposes = [
    { value: "usaha", label: "Modal Usaha" },
    { value: "pendidikan", label: "Pendidikan" },
    { value: "kesehatan", label: "Kesehatan" },
    { value: "darurat", label: "Kebutuhan Darurat" },
    { value: "renovasi", label: "Renovasi Rumah" },
    { value: "lainnya", label: "Lainnya" }
  ];

  const loanTenors = [
    { value: "15", label: "15 Hari" },
    { value: "30", label: "30 Hari" },
    { value: "60", label: "60 Hari" }
  ];

  const paymentMethods = [
    { value: "setor_sampah", label: "Via Setor Sampah" },
    { value: "saldo", label: "Potong Saldo Otomatis" },
    { value: "transfer", label: "Transfer Manual" }
  ];

  const handleFileUpload = (field: string, file: File | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: file
    }));
    
    if (file) {
      toast({
        title: "File Berhasil Diunggah",
        description: `${file.name} telah diunggah`,
      });
    }
  };

  const handleSubmit = () => {
    // Validasi form
    if (!formData.fullName || !formData.nik || !formData.loanAmount) {
      toast({
        title: "Data Tidak Lengkap",
        description: "Mohon lengkapi semua data yang diperlukan",
        variant: "destructive"
      });
      return;
    }

    if (!formData.ktpFront || !formData.ktpBack || !formData.selfieWithKtp) {
      toast({
        title: "Dokumen Belum Lengkap",
        description: "Mohon unggah semua dokumen yang diperlukan",
        variant: "destructive"
      });
      return;
    }

    // Simulasi pengajuan berhasil
    toast({
      title: "Pengajuan Berhasil Dikirim",
      description: "Pengajuan pinjaman Anda sedang ditinjau oleh tim kami. Anda akan mendapat notifikasi dalam 1x24 jam.",
    });

    // Kembali ke halaman sebelumnya setelah berhasil
    setTimeout(() => {
      onBack();
    }, 2000);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <Info className="w-5 h-5 text-blue-500 mr-2" />
            <h3 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Syarat Umum
            </h3>
          </div>
          <div className="space-y-3">
            {syaratUmum.map((syarat, index) => {
              const IconComponent = syarat.icon;
              return (
                <div key={index} className="flex items-center space-x-3">
                  <IconComponent className={`w-5 h-5 ${
                    syarat.status === 'completed' ? 'text-green-500' : 'text-yellow-500'
                  }`} />
                  <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {syarat.text}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
        <CardContent className="p-6">
          <h3 className={`font-bold text-lg mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Syarat Khusus
          </h3>
          <div className="space-y-2">
            {syaratKhusus.map((syarat, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {syarat}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className={`${isDarkMode ? 'bg-gradient-to-r from-emerald-600 to-teal-600' : 'bg-gradient-to-r from-emerald-500 to-green-500'} text-white`}>
        <CardContent className="p-6">
          <h3 className="font-bold text-lg mb-4">Informasi Pinjaman</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm opacity-90">Minimal Pinjaman</p>
              <p className="text-xl font-bold">Rp 200.000</p>
            </div>
            <div>
              <p className="text-sm opacity-90">Maksimal Pinjaman</p>
              <p className="text-xl font-bold">Rp 500.000</p>
            </div>
            <div>
              <p className="text-sm opacity-90">Bunga</p>
              <p className="text-xl font-bold">0-2%</p>
            </div>
            <div>
              <p className="text-sm opacity-90">Tenor</p>
              <p className="text-xl font-bold">15-60 Hari</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button 
        onClick={() => setCurrentStep(2)}
        className="w-full bg-emerald-600 hover:bg-emerald-700 py-3 text-lg"
      >
        Lanjutkan Pengajuan
      </Button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      {/* Data Pribadi */}
      <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <User className="w-5 h-5 text-blue-500 mr-2" />
            <h3 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Data Pribadi
            </h3>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="fullName">Nama Lengkap</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => setFormData(prev => ({...prev, fullName: e.target.value}))}
                placeholder="Masukkan nama lengkap"
                className={isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''}
              />
            </div>
            <div>
              <Label htmlFor="nik">NIK (Nomor KTP)</Label>
              <Input
                id="nik"
                value={formData.nik}
                onChange={(e) => setFormData(prev => ({...prev, nik: e.target.value}))}
                placeholder="Masukkan NIK 16 digit"
                maxLength={16}
                className={isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''}
              />
            </div>
            <div>
              <Label htmlFor="address">Alamat Lengkap</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => setFormData(prev => ({...prev, address: e.target.value}))}
                placeholder="Masukkan alamat lengkap"
                className={isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''}
              />
            </div>
            <div>
              <Label htmlFor="phone">Nomor HP (WhatsApp)</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({...prev, phone: e.target.value}))}
                placeholder="Masukkan nomor HP aktif"
                className={isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Pinjaman */}
      <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <DollarSign className="w-5 h-5 text-green-500 mr-2" />
            <h3 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Data Pinjaman
            </h3>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="loanAmount">Jumlah Pinjaman</Label>
              <Input
                id="loanAmount"
                type="number"
                value={formData.loanAmount}
                onChange={(e) => setFormData(prev => ({...prev, loanAmount: e.target.value}))}
                placeholder="Minimal Rp 200.000"
                min="200000"
                max="500000"
                className={isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''}
              />
            </div>
            <div>
              <Label htmlFor="loanPurpose">Tujuan Pinjaman</Label>
              <Select value={formData.loanPurpose} onValueChange={(value) => setFormData(prev => ({...prev, loanPurpose: value}))}>
                <SelectTrigger className={isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''}>
                  <SelectValue placeholder="Pilih tujuan pinjaman" />
                </SelectTrigger>
                <SelectContent>
                  {loanPurposes.map((purpose) => (
                    <SelectItem key={purpose.value} value={purpose.value}>
                      {purpose.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="loanTenor">Tenor Pinjaman</Label>
              <Select value={formData.loanTenor} onValueChange={(value) => setFormData(prev => ({...prev, loanTenor: value}))}>
                <SelectTrigger className={isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''}>
                  <SelectValue placeholder="Pilih tenor pinjaman" />
                </SelectTrigger>
                <SelectContent>
                  {loanTenors.map((tenor) => (
                    <SelectItem key={tenor.value} value={tenor.value}>
                      {tenor.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="paymentMethod">Metode Pembayaran</Label>
              <Select value={formData.paymentMethod} onValueChange={(value) => setFormData(prev => ({...prev, paymentMethod: value}))}>
                <SelectTrigger className={isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''}>
                  <SelectValue placeholder="Pilih metode pembayaran" />
                </SelectTrigger>
                <SelectContent>
                  {paymentMethods.map((method) => (
                    <SelectItem key={method.value} value={method.value}>
                      {method.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex space-x-3">
        <Button 
          variant="outline"
          onClick={() => setCurrentStep(1)}
          className="flex-1"
        >
          Kembali
        </Button>
        <Button 
          onClick={() => setCurrentStep(3)}
          className="flex-1 bg-emerald-600 hover:bg-emerald-700"
        >
          Lanjutkan
        </Button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      {/* Data Tambahan */}
      <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
        <CardContent className="p-6">
          <h3 className={`font-bold text-lg mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Data Tambahan (Opsional)
          </h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="monthlyIncome">Penghasilan Bulanan</Label>
              <Input
                id="monthlyIncome"
                type="number"
                value={formData.monthlyIncome}
                onChange={(e) => setFormData(prev => ({...prev, monthlyIncome: e.target.value}))}
                placeholder="Contoh: 2000000"
                className={isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''}
              />
            </div>
            <div>
              <Label htmlFor="emergencyContact">Kontak Darurat (Nama)</Label>
              <Input
                id="emergencyContact"
                value={formData.emergencyContact}
                onChange={(e) => setFormData(prev => ({...prev, emergencyContact: e.target.value}))}
                placeholder="Nama kontak darurat"
                className={isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''}
              />
            </div>
            <div>
              <Label htmlFor="emergencyPhone">Nomor HP Kontak Darurat</Label>
              <Input
                id="emergencyPhone"
                value={formData.emergencyPhone}
                onChange={(e) => setFormData(prev => ({...prev, emergencyPhone: e.target.value}))}
                placeholder="Nomor HP kontak darurat"
                className={isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''}
              />
            </div>
            <div>
              <Label htmlFor="businessDescription">Deskripsi Usaha/Tujuan Pinjaman</Label>
              <Textarea
                id="businessDescription"
                value={formData.businessDescription}
                onChange={(e) => setFormData(prev => ({...prev, businessDescription: e.target.value}))}
                placeholder="Jelaskan usaha atau tujuan penggunaan pinjaman"
                className={isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex space-x-3">
        <Button 
          variant="outline"
          onClick={() => setCurrentStep(2)}
          className="flex-1"
        >
          Kembali
        </Button>
        <Button 
          onClick={() => setCurrentStep(4)}
          className="flex-1 bg-emerald-600 hover:bg-emerald-700"
        >
          Lanjutkan
        </Button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      {/* Upload Dokumen */}
      <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <Upload className="w-5 h-5 text-purple-500 mr-2" />
            <h3 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Upload Dokumen
            </h3>
          </div>
          <div className="space-y-6">
            {/* KTP Depan */}
            <div>
              <Label>Foto KTP Depan *</Label>
              <div className={`border-2 border-dashed rounded-lg p-6 text-center ${
                formData.ktpFront 
                  ? 'border-green-500 bg-green-50' 
                  : isDarkMode 
                    ? 'border-gray-600 bg-gray-700' 
                    : 'border-gray-300 bg-gray-50'
              }`}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload('ktpFront', e.target.files?.[0] || null)}
                  className="hidden"
                  id="ktpFront"
                />
                <label htmlFor="ktpFront" className="cursor-pointer">
                  <Camera className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {formData.ktpFront ? formData.ktpFront.name : 'Tap untuk mengambil foto KTP depan'}
                  </p>
                </label>
              </div>
            </div>

            {/* KTP Belakang */}
            <div>
              <Label>Foto KTP Belakang *</Label>
              <div className={`border-2 border-dashed rounded-lg p-6 text-center ${
                formData.ktpBack 
                  ? 'border-green-500 bg-green-50' 
                  : isDarkMode 
                    ? 'border-gray-600 bg-gray-700' 
                    : 'border-gray-300 bg-gray-50'
              }`}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload('ktpBack', e.target.files?.[0] || null)}
                  className="hidden"
                  id="ktpBack"
                />
                <label htmlFor="ktpBack" className="cursor-pointer">
                  <Camera className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {formData.ktpBack ? formData.ktpBack.name : 'Tap untuk mengambil foto KTP belakang'}
                  </p>
                </label>
              </div>
            </div>

            {/* Selfie dengan KTP */}
            <div>
              <Label>Selfie sambil memegang KTP *</Label>
              <div className={`border-2 border-dashed rounded-lg p-6 text-center ${
                formData.selfieWithKtp 
                  ? 'border-green-500 bg-green-50' 
                  : isDarkMode 
                    ? 'border-gray-600 bg-gray-700' 
                    : 'border-gray-300 bg-gray-50'
              }`}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload('selfieWithKtp', e.target.files?.[0] || null)}
                  className="hidden"
                  id="selfieWithKtp"
                />
                <label htmlFor="selfieWithKtp" className="cursor-pointer">
                  <Camera className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {formData.selfieWithKtp ? formData.selfieWithKtp.name : 'Tap untuk selfie sambil memegang KTP'}
                  </p>
                </label>
              </div>
            </div>

            {/* Foto Usaha */}
            <div>
              <Label>Foto Usaha/Barang Dagangan (Opsional)</Label>
              <div className={`border-2 border-dashed rounded-lg p-6 text-center ${
                formData.businessPhoto 
                  ? 'border-green-500 bg-green-50' 
                  : isDarkMode 
                    ? 'border-gray-600 bg-gray-700' 
                    : 'border-gray-300 bg-gray-50'
              }`}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload('businessPhoto', e.target.files?.[0] || null)}
                  className="hidden"
                  id="businessPhoto"
                />
                <label htmlFor="businessPhoto" className="cursor-pointer">
                  <Camera className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {formData.businessPhoto ? formData.businessPhoto.name : 'Tap untuk mengambil foto usaha'}
                  </p>
                </label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex space-x-3">
        <Button 
          variant="outline"
          onClick={() => setCurrentStep(3)}
          className="flex-1"
        >
          Kembali
        </Button>
        <Button 
          onClick={handleSubmit}
          className="flex-1 bg-emerald-600 hover:bg-emerald-700"
        >
          Kirim Pengajuan
        </Button>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`${isDarkMode ? 'bg-gradient-to-r from-emerald-600 to-teal-700' : 'bg-gradient-to-r from-emerald-500 to-green-600'} text-white p-4`}>
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold ml-2">Pinjam Modal</h1>
        </div>
        
        {/* Progress Steps */}
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                currentStep >= step ? 'bg-white text-emerald-600' : 'bg-emerald-400 text-white'
              }`}>
                {step}
              </div>
              {step < 4 && (
                <div className={`h-1 w-8 ml-2 ${
                  currentStep > step ? 'bg-white' : 'bg-emerald-400'
                }`} />
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-2">
          <p className="text-sm opacity-90">
            {currentStep === 1 && "Syarat & Ketentuan"}
            {currentStep === 2 && "Data Pribadi & Pinjaman"}
            {currentStep === 3 && "Data Tambahan"}
            {currentStep === 4 && "Upload Dokumen"}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}
      </div>
    </div>
  );
};

export default PinjamModalPage;
