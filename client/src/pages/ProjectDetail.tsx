import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Edit, Trash2, Loader2, Calendar, Image as ImageIcon, X } from 'lucide-react';
import type { Project } from '@/types';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [deletingImageId, setDeletingImageId] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`/projects/${id}`);
        setProject(response.data.project);
      } catch (error: any) {
        toast.error('Erreur lors du chargement du projet');
        navigate('/dashboard');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [id, navigate]);

  const handleDelete = async () => {
    try {
      await api.delete(`/projects/${id}`);
      toast.success('Projet supprimé avec succès !');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erreur lors de la suppression');
    }
  };

  const handleDeleteImage = async (imageId: string) => {
    try {
      setDeletingImageId(imageId);
      await api.delete(`/projects/image/${imageId}`);
      toast.success('Image supprimée avec succès !');
      // Mettre à jour le state local
      if (project) {
        setProject({
          ...project,
          images: project.images.filter(img => img.id !== imageId)
        });
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erreur lors de la suppression de l\'image');
    } finally {
      setDeletingImageId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!project) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Header avec actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate(`/dashboard`)}>
              <Edit className="h-4 w-4 mr-2" />
              Modifier
            </Button>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(true)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Supprimer
            </Button>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-6">
            {/* Titre et description */}
            <Card>
              <CardContent className="pt-6">
                <h1 className="text-3xl font-bold mb-4">{project.name}</h1>
                <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
                  {project.description}
                </p>
              </CardContent>
            </Card>

            {/* Galerie d'images */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <ImageIcon className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">
                    Captures d'écran ({project.images.length})
                  </h2>
                </div>

                {project.images.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    Aucune image disponible
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.images.map((image) => (
                      <div
                        key={image.id}
                        className="relative group overflow-hidden rounded-lg border"
                      >
                        <img
                          src={image.url}
                          alt={project.name}
                          className="w-full h-64 object-cover cursor-pointer transition-transform group-hover:scale-105"
                          onClick={() => setSelectedImage(image.url)}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                        
                        {/* Bouton de suppression */}
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteImage(image.id);
                          }}
                          disabled={deletingImageId === image.id}
                        >
                          {deletingImageId === image.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <X className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Technologies */}
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-lg font-semibold mb-4">Technologies</h2>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech.id} variant="secondary" className="px-3 py-1">
                      {tech.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Informations */}
            <Card>
              <CardContent className="pt-6 space-y-4">
                <h2 className="text-lg font-semibold mb-4">Informations</h2>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-muted-foreground">Créé le</p>
                      <p className="font-medium">
                        {format(new Date(project.createdAt), 'dd MMMM yyyy', {
                          locale: fr,
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-muted-foreground">Modifié le</p>
                      <p className="font-medium">
                        {format(new Date(project.updatedAt), 'dd MMMM yyyy', {
                          locale: fr,
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <ImageIcon className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-muted-foreground">Images</p>
                      <p className="font-medium">{project.images.length}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Dialog Image plein écran */}
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-6xl p-0">
            {selectedImage && (
              <img
                src={selectedImage}
                alt={project.name}
                className="w-full h-auto max-h-[90vh] object-contain"
              />
            )}
          </DialogContent>
        </Dialog>

        {/* Dialog de confirmation de suppression */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
              <AlertDialogDescription>
                Cette action est irréversible. Le projet et toutes ses images seront
                définitivement supprimés.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Supprimer
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
    </div>
  );
};