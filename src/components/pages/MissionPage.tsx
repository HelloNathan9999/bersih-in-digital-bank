
import React from 'react';
import { ArrowLeft, Target, Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface MissionPageProps {
  onBack: () => void;
  isDarkMode?: boolean;
}

const MissionPage: React.FC<MissionPageProps> = ({ onBack, isDarkMode = false }) => {
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`${isDarkMode ? 'bg-gradient-to-r from-green-600 to-emerald-700' : 'bg-gradient-to-r from-green-500 to-emerald-600'} text-white p-4 rounded-b-3xl backdrop-blur-lg bg-opacity-90 shadow-xl`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white">
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-xl font-bold ml-2">Misi Komunitas</h1>
          </div>
        </div>
      </div>

      <div className="p-6">
        <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
          <CardContent className="p-6 text-center">
            <Target className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Misi Komunitas
            </h2>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Bergabunglah dalam misi komunitas untuk menjaga kebersihan lingkungan bersama-sama.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MissionPage;
