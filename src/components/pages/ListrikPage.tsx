
import React, { useState } from 'react';
import { ArrowLeft, Zap, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ListrikPageProps {
  onBack: () => void;
}

const ListrikPage: React.FC<ListrikPageProps> = ({ onBack }) => {
  const [meterNumber, setMeterNumber] = useState('');
  const [selectedAmount, setSelectedAmount] = useState('');

  const amounts = [
    { value: '20000', label: 'Rp 20.000' },
    { value: '50000', label: 'Rp 50.000' },
    { value: '100000', label: 'Rp 100.000' },
    { value: '200000', label: 'Rp 200.000' },
    { value: '500000', label: 'Rp 500.000' },
    { value: 'custom', label: 'Nominal Lain' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-yellow-500 text-white p-4">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold ml-2">Token Listrik PLN</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Info Card */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center">
              <Zap className="w-8 h-8 text-yellow-500 mr-3" />
              <div>
                <h3 className="font-semibold">Token PLN Prabayar</h3>
                <p className="text-sm text-gray-600">Beli token listrik dengan mudah dan cepat</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Meter Number Input */}
        <div className="space-y-2">
          <Label htmlFor="meter">Nomor Meter/ID Pelanggan</Label>
          <Input
            id="meter"
            placeholder="Masukkan nomor meter"
            value={meterNumber}
            onChange={(e) => setMeterNumber(e.target.value)}
          />
        </div>

        {/* Amount Selection */}
        <div className="space-y-2">
          <Label>Pilih Nominal</Label>
          <div className="grid grid-cols-2 gap-2">
            {amounts.map((amount) => (
              <Button
                key={amount.value}
                variant={selectedAmount === amount.value ? "default" : "outline"}
                onClick={() => setSelectedAmount(amount.value)}
                className="h-12"
              >
                {amount.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Custom Amount */}
        {selectedAmount === 'custom' && (
          <div className="space-y-2">
            <Label htmlFor="custom-amount">Nominal Custom</Label>
            <Input
              id="custom-amount"
              placeholder="Masukkan nominal"
              type="number"
            />
          </div>
        )}

        {/* Buy Button */}
        <Button 
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
          disabled={!meterNumber || !selectedAmount}
        >
          <CreditCard className="w-4 h-4 mr-2" />
          Beli Token Sekarang
        </Button>

        {/* Recent Transactions */}
        <div className="space-y-2">
          <h3 className="font-semibold">Transaksi Terakhir</h3>
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Token PLN Rp 100.000</p>
                  <p className="text-sm text-gray-600">Meter: ****5678</p>
                  <p className="text-xs text-gray-500">2025-06-03 14:30</p>
                </div>
                <span className="text-green-600 font-semibold">Berhasil</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ListrikPage;
