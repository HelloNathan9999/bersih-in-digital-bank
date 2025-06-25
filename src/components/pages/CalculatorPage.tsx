
import React from 'react';
import { ArrowLeft, Calculator, Leaf, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface CalculatorPageProps {
  onBack: () => void;
  isDarkMode?: boolean;
}

const CalculatorPage: React.FC<CalculatorPageProps> = ({ onBack, isDarkMode = false }) => {
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`${isDarkMode ? 'bg-gradient-to-r from-teal-600 to-cyan-700' : 'bg-gradient-to-r from-teal-500 to-cyan-600'} text-white p-4 rounded-b-3xl backdrop-blur-lg bg-opacity-90 shadow-xl`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white">
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-xl font-bold ml-2">Kalkulator Sampah</h1>
          </div>
        </div>
      </div>

      <div className="p-6">
        <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
          <CardContent className="p-6 text-center">
            <Calculator className="w-16 h-16 text-teal-500 mx-auto mb-4" />
            <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Kalkulator Sampah
            </h2>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Hitung nilai ekonomis sampah Anda dan estimasi poin yang bisa didapatkan.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CalculatorPage;
