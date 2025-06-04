
import React, { useState } from 'react';
import { ArrowLeft, Calendar, Award, Gift, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

interface CheckinPageProps {
  onBack: () => void;
}

const CheckinPage: React.FC<CheckinPageProps> = ({ onBack }) => {
  const [checkedIn, setCheckedIn] = useState(false);
  const [streak, setStreak] = useState(7);

  const handleCheckin = () => {
    setCheckedIn(true);
    setStreak(streak + 1);
    toast({
      title: "Check-in Berhasil!",
      description: "Anda mendapat 10 poin dan melanjutkan streak!",
    });
  };

  const weekDays = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
  const checkinHistory = [true, true, true, true, true, true, true]; // Last 7 days

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-purple-500 text-white p-4">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold ml-2">Check-in Harian</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Streak Card */}
        <Card className="bg-gradient-to-r from-orange-400 to-red-500 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">{streak} Hari</h2>
                <p className="text-orange-100">Streak Berturut-turut</p>
              </div>
              <Flame className="w-12 h-12 text-orange-200" />
            </div>
          </CardContent>
        </Card>

        {/* Check-in Button */}
        <Card>
          <CardContent className="p-6 text-center">
            <Calendar className="w-16 h-16 mx-auto mb-4 text-purple-500" />
            <h3 className="text-xl font-semibold mb-2">Check-in Hari Ini</h3>
            <p className="text-gray-600 mb-4">
              {checkedIn ? "Anda sudah check-in hari ini!" : "Dapatkan poin dengan check-in harian"}
            </p>
            <Button
              onClick={handleCheckin}
              disabled={checkedIn}
              className="bg-purple-500 hover:bg-purple-600"
              size="lg"
            >
              {checkedIn ? "Sudah Check-in" : "Check-in Sekarang"}
            </Button>
          </CardContent>
        </Card>

        {/* Weekly Progress */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4">Progress Minggu Ini</h3>
            <div className="grid grid-cols-7 gap-2">
              {weekDays.map((day, index) => (
                <div key={day} className="text-center">
                  <div className="text-xs text-gray-600 mb-1">{day}</div>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                      checkinHistory[index]
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Rewards */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4">Reward Streak</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <Award className="w-6 h-6 text-green-500 mr-3" />
                  <div>
                    <p className="font-medium">7 Hari Berturut-turut</p>
                    <p className="text-sm text-gray-600">Bonus 50 poin</p>
                  </div>
                </div>
                <span className="text-green-600 font-semibold">✓ Tercapai</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Gift className="w-6 h-6 text-blue-500 mr-3" />
                  <div>
                    <p className="font-medium">30 Hari Berturut-turut</p>
                    <p className="text-sm text-gray-600">Voucher belanja Rp 25.000</p>
                  </div>
                </div>
                <span className="text-gray-500">{30 - streak} hari lagi</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Today's Challenge */}
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Tantangan Hari Ini</h3>
            <p className="text-sm text-gray-700 mb-3">
              Setor minimal 0.5kg sampah plastik untuk mendapat bonus 20 poin
            </p>
            <Button variant="outline" size="sm" className="border-blue-300">
              Lihat Detail
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CheckinPage;
