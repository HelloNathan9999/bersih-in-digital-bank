
import React from 'react';
import { ArrowLeft, Users, Share, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ReferralPageProps {
  onBack: () => void;
  isDarkMode?: boolean;
}

const ReferralPage: React.FC<ReferralPageProps> = ({ onBack, isDarkMode = false }) => {
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`${isDarkMode ? 'bg-gradient-to-r from-indigo-600 to-purple-700' : 'bg-gradient-to-r from-indigo-500 to-purple-600'} text-white p-4 rounded-b-3xl backdrop-blur-lg bg-opacity-90 shadow-xl`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white">
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-xl font-bold ml-2">Sistem Referral</h1>
          </div>
        </div>
      </div>

      <div className="p-6">
        <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
          <CardContent className="p-6 text-center">
            <Share className="w-16 h-16 text-indigo-500 mx-auto mb-4" />
            <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Sistem Referral
            </h2>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Ajak teman bergabung dan dapatkan bonus poin untuk setiap referral yang berhasil.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReferralPage;
