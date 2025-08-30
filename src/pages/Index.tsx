import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [daysDifference, setDaysDifference] = useState<number | null>(null);

  const calculateDaysDifference = () => {
    if (!startDate || !endDate) {
      setDaysDifference(null);
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      setDaysDifference(null);
      return;
    }

    const timeDifference = Math.abs(end.getTime() - start.getTime());
    const daysDiff = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    setDaysDifference(daysDiff);
  };

  useEffect(() => {
    calculateDaysDifference();
  }, [startDate, endDate]);

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Калькулятор дат
          </h1>
          <p className="text-gray-600">
            Рассчитайте количество дней между датами
          </p>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="flex items-center justify-center gap-2 text-xl">
              <Icon name="Calendar" size={24} className="text-primary" />
              Расчёт дней
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="start-date" className="text-sm font-medium text-gray-700">
                Начальная дата
              </Label>
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="h-12 text-base rounded-xl border-gray-200 focus:border-primary focus:ring-primary/20"
              />
              {startDate && (
                <p className="text-xs text-gray-500 mt-1">
                  {formatDate(startDate)}
                </p>
              )}
            </div>

            <div className="flex justify-center">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="ArrowDown" size={16} className="text-primary" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="end-date" className="text-sm font-medium text-gray-700">
                Конечная дата
              </Label>
              <Input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="h-12 text-base rounded-xl border-gray-200 focus:border-primary focus:ring-primary/20"
              />
              {endDate && (
                <p className="text-xs text-gray-500 mt-1">
                  {formatDate(endDate)}
                </p>
              )}
            </div>

            {daysDifference !== null && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 text-center animate-in fade-in duration-300">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {daysDifference.toLocaleString('ru-RU')}
                </div>
                <div className="text-sm text-gray-600">
                  {daysDifference === 1 ? 'день' : 
                   daysDifference < 5 ? 'дня' : 'дней'}
                </div>
                <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-500">
                  <Icon name="Clock" size={14} />
                  между выбранными датами
                </div>
              </div>
            )}

            <Button 
              onClick={calculateDaysDifference}
              disabled={!startDate || !endDate}
              className="w-full h-12 text-base font-medium rounded-xl bg-primary hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              <Icon name="Calculator" size={18} className="mr-2" />
              Рассчитать
            </Button>
          </CardContent>
        </Card>

        <div className="text-center mt-6 text-xs text-gray-400">
          Простой и быстрый расчёт количества дней
        </div>
      </div>
    </div>
  );
}