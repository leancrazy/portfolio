import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { useContent, type PortfolioItem, type SkillCategory, type ExperienceItem } from '../ContentContext';
import { useAdminAuth } from './AdminAuth';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Plus, Edit, Trash2, LogOut, RefreshCw, Database, Check } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { SupabaseInfo } from './SupabaseInfo';

interface PortfolioFormData {
  title: { en: string; de: string };
  description: { en: string; de: string };
  image: string;
  link: string;
  videoUrl: string;
}

export function AdminDashboard() {
  const { t } = useLanguage();
  const { logout } = useAdminAuth();
  const { 
    portfolioItems, 
    skillCategories, 
    experienceItems,
    addPortfolioItem, 
    updatePortfolioItem, 
    deletePortfolioItem,
    updateSkillCategories,
    updateExperienceItems,
    resetToDefault
  } = useContent();
  
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [formData, setFormData] = useState<PortfolioFormData>({
    title: { en: '', de: '' },
    description: { en: '', de: '' },
    image: '',
    link: '',
    videoUrl: ''
  });
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const resetForm = () => {
    setFormData({
      title: { en: '', de: '' },
      description: { en: '', de: '' },
      image: '',
      link: '',
      videoUrl: ''
    });
    setEditingItem(null);
  };

  const handleEdit = (item: PortfolioItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      image: item.image,
      link: item.link || '',
      videoUrl: item.videoUrl || ''
    });
    setIsEditDialogOpen(true);
  };

  const handleAdd = () => {
    resetForm();
    setIsEditDialogOpen(true);
  };

  const handleSave = () => {
    if (editingItem) {
      updatePortfolioItem(editingItem.id, {
        title: formData.title,
        description: formData.description,
        image: formData.image,
        link: formData.link || undefined,
        videoUrl: formData.videoUrl || undefined
      });
    } else {
      addPortfolioItem({
        title: formData.title,
        description: formData.description,
        image: formData.image,
        link: formData.link || undefined,
        videoUrl: formData.videoUrl || undefined
      });
    }
    setIsEditDialogOpen(false);
    resetForm();
    toast.success(editingItem ? 'Проект обновлен' : 'Новый проект добавлен');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deletePortfolioItem(id);
      toast.success('Проект удален');
    }
  };

  const handleResetData = () => {
    resetToDefault();
    setShowResetConfirm(false);
    toast.success('Данные сброшены к исходному состоянию');
  };

  const handleConnectSupabase = () => {
    toast.info('Функция подключения к Supabase будет добавлена в следующем обновлении');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl">{t('admin.title')}</h1>
            <p className="text-gray-600 mt-2 flex items-center">
              <Database className="w-4 h-4 mr-2" />
              Данные сохраняются в localStorage браузера
            </p>
          </div>
          <div className="flex gap-3">
            <Button 
              onClick={() => setShowResetConfirm(true)} 
              variant="outline"
              className="text-red-600 hover:text-red-700"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Сбросить данные
            </Button>
            <Button onClick={logout} variant="outline">
              <LogOut className="w-4 h-4 mr-2" />
              {t('admin.logout')}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="portfolio" className="space-y-6">
          <TabsList>
            <TabsTrigger value="portfolio">{t('admin.portfolio')}</TabsTrigger>
            <TabsTrigger value="content">{t('admin.content')}</TabsTrigger>
            <TabsTrigger value="data">Управление данными</TabsTrigger>
            <TabsTrigger value="supabase">Supabase</TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle>{t('admin.portfolio')}</CardTitle>
                <Button onClick={handleAdd}>
                  <Plus className="w-4 h-4 mr-2" />
                  {t('admin.add')}
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title (EN)</TableHead>
                      <TableHead>Title (DE)</TableHead>
                      <TableHead>Image</TableHead>
                      <TableHead>Video</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {portfolioItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.title.en}</TableCell>
                        <TableCell>{item.title.de}</TableCell>
                        <TableCell>
                          <img 
                            src={item.image} 
                            alt={item.title.en} 
                            className="w-16 h-12 object-cover rounded"
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleEdit(item)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleDelete(item.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content">
            <Card>
              <CardHeader>
                <CardTitle>{t('admin.content')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-4">Skills Categories ({skillCategories.length})</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {skillCategories.map((category) => (
                        <Card key={category.id}>
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-2xl">{category.icon}</span>
                              <div>
                                <p className="font-medium">{category.title.en}</p>
                                <p className="text-sm text-gray-600">{category.title.de}</p>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {category.skills.map((skill, index) => (
                                <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-4">Experience Items ({experienceItems.length})</h3>
                    <div className="space-y-2">
                      {experienceItems.map((item) => (
                        <Card key={item.id}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium">{item.title.en}</p>
                                <p className="text-sm text-gray-600">{item.title.de}</p>
                              </div>
                              <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                                {item.period}
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data">
            <Card>
              <CardHeader>
                <CardTitle>Управление данными</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium mb-2">Локальное хранение</h4>
                  <p className="text-sm text-gray-700 mb-4">
                    В настоящий момент все данные сохраняются в localStorage вашего браузера. 
                    Данные останутся доступными между сессиями, но будут привязаны к этому браузеру.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-green-700">
                    <Check className="w-4 h-4" />
                    <span>Данные автоматически сохраняются при каждом изменении</span>
                  </div>
                </div>
                
                <div className="p-4 bg-orange-50 rounded-lg">
                  <h4 className="font-medium mb-2 text-orange-800">Сброс данных</h4>
                  <p className="text-sm text-gray-700 mb-4">
                    Осторожно! Это действие удалит все ваши изменения и восстановит стандартные данные портфолио.
                  </p>
                  <Button 
                    onClick={() => setShowResetConfirm(true)} 
                    variant="destructive"
                    size="sm"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Сбросить к исходным данным
                  </Button>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium mb-2 text-green-800">Статистика данных</h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-mono text-lg">{portfolioItems.length}</div>
                      <div className="text-gray-600">Проектов</div>
                    </div>
                    <div className="text-center">
                      <div className="font-mono text-lg">{skillCategories.length}</div>
                      <div className="text-gray-600">Категорий навыков</div>
                    </div>
                    <div className="text-center">
                      <div className="font-mono text-lg">{experienceItems.length}</div>
                      <div className="text-gray-600">Позиций опыта</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="supabase">
            <SupabaseInfo onConnectSupabase={handleConnectSupabase} />
          </TabsContent>
        </Tabs>

        {/* Portfolio Item Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? t('admin.edit') : t('admin.add')} Portfolio Item
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm">Title (EN)</label>
                  <Input
                    value={formData.title.en}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      title: { ...prev.title, en: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <label className="text-sm">Title (DE)</label>
                  <Input
                    value={formData.title.de}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      title: { ...prev.title, de: e.target.value }
                    }))}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm">Description (EN)</label>
                  <Textarea
                    value={formData.description.en}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      description: { ...prev.description, en: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <label className="text-sm">Description (DE)</label>
                  <Textarea
                    value={formData.description.de}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      description: { ...prev.description, de: e.target.value }
                    }))}
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm">Image URL</label>
                <Input
                  value={formData.image}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    image: e.target.value
                  }))}
                />
              </div>
              
              <div>
                <label className="text-sm">Link (optional)</label>
                <Input
                  value={formData.link}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    link: e.target.value
                  }))}
                />
              </div>
              
              <div>
                <label className="text-sm">Video URL (optional)</label>
                <Input
                  value={formData.videoUrl}
                  placeholder="https://example.com/video.mp4"
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    videoUrl: e.target.value
                  }))}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Если указано видео, при клике на проект откроется видеоплеер вместо внешней ссылки
                </p>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  {t('admin.cancel')}
                </Button>
                <Button onClick={handleSave}>
                  {t('admin.save')}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Reset Confirmation Dialog */}
        <Dialog open={showResetConfirm} onOpenChange={setShowResetConfirm}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Подтверждение сброса данных</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-gray-700">
                Вы уверены, что хотите сбросить все данные к исходному состоянию? 
                Все ваши изменения будут безвозвратно удалены.
              </p>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowResetConfirm(false)}>
                  Отмена
                </Button>
                <Button variant="destructive" onClick={handleResetData}>
                  Да, сбросить данные
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}