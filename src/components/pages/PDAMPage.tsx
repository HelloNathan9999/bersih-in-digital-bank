
import React, { useState } from 'react';
import { ArrowLeft, Droplets, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PDAMPageProps {
  onBack: () => void;
}

const PDAMPage: React.FC<PDAMPageProps> = ({ onBack }) => {
  const [customerId, setCustomerId] = useState('');
  const [billInfo, setBillInfo] = useState<any>(null);

  const checkBill = () => {
    // Simulate bill check
    setBillInfo({
      name: "John Doe",
      period: "Mei 2025",
      usage: "15 m³",
      amount: 145000,
      dueDate: "2025-06-15"
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-500 text-white p-4">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold ml-2">Bayar PDAM</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Info Card */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center">
              <Droplets className="w-8 h-8 text-blue-500 mr-3" />
              <div>
                <h3 className="font-semibold">Pembayaran Air PDAM</h3>
                <p className="text-sm text-gray-600">Bayar tagihan air bulanan dengan mudah</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer ID Input */}
        <div className="space-y-2">
          <Label htmlFor="customer-id">ID Pelanggan PDAM</Label>
          <div className="flex space-x-2">
            <Input
              id="customer-id"
              placeholder="Masukkan ID pelanggan"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              className="flex-1"
            />
            <Button onClick={checkBill} disabled={!customerId}>
              Cek Tagihan
            </Button>
          </div>
        </div>

        {/* Bill Information */}
        {billInfo && (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">Informasi Tagihan</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Nama Pelanggan:</span>
                  <span className="font-medium">{billInfo.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Periode:</span>
                  <span className="font-medium">{billInfo.period}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pemakaian:</span>
                  <span className="font-medium">{billInfo.usage}</span>
                </div>
                <div className="flex justify-between">
                  <span>Jatuh Tempo:</span>
                  <span className="font-medium">{billInfo.dueDate}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total Tagihan:</span>
                    <span className="font-bold text-lg text-blue-600">
                      Rp {billInfo.amount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Payment Button */}
        {billInfo && (
          <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
            <CreditCard className="w-4 h-4 mr-2" />
            Bayar Sekarang
          </Button>
        )}

        {/* Recent Payments */}
        <div className="space-y-2">
          <h3 className="font-semibold">Pembayaran Terakhir</h3>
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">PDAM April 2025</p>
                  <p className="text-sm text-gray-600">ID: ****1234</p>
                  <p className="text-xs text-gray-500">2025-05-15 09:30</p>
                </div>
                <div className="text-right">
                  <span className="text-green-600 font-semibold">Berhasil</span>
                  <p className="text-sm">Rp 135.000</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PDAMPage;
