import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Database, Cloud, Users, Shield, Globe } from 'lucide-react';

interface SupabaseInfoProps {
  onConnectSupabase: () => void;
}

export function SupabaseInfo({ onConnectSupabase }: SupabaseInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="w-5 h-5 text-green-600" />
          Интеграция с Supabase
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 bg-green-50 rounded-lg">
          <h4 className="font-medium mb-2 text-green-800">
            Преимущества подключения Supabase
          </h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-green-700">
            <div className="flex items-start gap-2">
              <Cloud className="w-4 h-4 mt-1 flex-shrink-0" />
              <div>
                <div className="font-medium">Облачное хранение</div>
                <div>Данные синхронизируются между устройствами</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Users className="w-4 h-4 mt-1 flex-shrink-0" />
              <div>
                <div className="font-medium">Безопасная аутентификация</div>
                <div>Надежная система входа для админов</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Shield className="w-4 h-4 mt-1 flex-shrink-0" />
              <div>
                <div className="font-medium">Резервное копирование</div>
                <div>Автоматические бэкапы данных</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Globe className="w-4 h-4 mt-1 flex-shrink-0" />
              <div>
                <div className="font-medium">API endpoints</div>
                <div>Возможность создания мобильных приложений</div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium mb-2 text-blue-800">
            Возможности для портфолио
          </h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Управление изображениями через Supabase Storage</li>
            <li>• Система комментариев и обратной связи</li>
            <li>• Аналитика посещений и взаимодействий</li>
            <li>• Форма контактов с сохранением в базу данных</li>
            <li>• Многопользовательский доступ для команды</li>
            <li>• REST API для интеграции с другими сервисами</li>
          </ul>
        </div>

        <div className="p-4 bg-orange-50 rounded-lg">
          <h4 className="font-medium mb-2 text-orange-800">
            Важная информация о безопасности
          </h4>
          <p className="text-sm text-orange-700">
            Figma Make не предназначен для сбора персональных данных или обеспечения 
            безопасности конфиденциальной информации. При работе с чувствительными 
            данными обязательно настройте соответствующие политики безопасности в Supabase.
          </p>
        </div>

        <div className="flex justify-center">
          <Button onClick={onConnectSupabase} className="bg-green-600 hover:bg-green-700">
            <Database className="w-4 h-4 mr-2" />
            Подключить Supabase
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}