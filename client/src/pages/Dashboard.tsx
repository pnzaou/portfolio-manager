import { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { ProjectList } from '@/components/projects/ProjectList';
import { ProjectForm } from '@/components/projects/ProjectForm';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Loader2 } from 'lucide-react';
import type { Project } from '@/types';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
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
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

export const Dashboard = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | undefined>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const navigate = useNavigate();

  // Charger les projets
  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/projects');
      setProjects(response.data.projects);
    } catch (error: any) {
      toast.error('Erreur lors du chargement des projets');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Créer un projet
  const handleCreateProject = async (formData: FormData) => {
    try {
      setIsSubmitting(true);
      await api.post('/projects', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Projet créé avec succès !');
      setIsDialogOpen(false);
      fetchProjects();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erreur lors de la création');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Modifier un projet
  const handleUpdateProject = async (formData: FormData) => {
    if (!selectedProject) return;

    try {
      setIsSubmitting(true);
      await api.put(`/projects/${selectedProject.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Projet mis à jour avec succès !');
      setIsDialogOpen(false);
      setSelectedProject(undefined);
      fetchProjects();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erreur lors de la mise à jour');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Supprimer un projet
  const handleDeleteProject = async () => {
    if (!projectToDelete) return;

    try {
      await api.delete(`/projects/${projectToDelete}`);
      toast.success('Projet supprimé avec succès !');
      setDeleteDialogOpen(false);
      setProjectToDelete(null);
      fetchProjects();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erreur lors de la suppression');
    }
  };

  // Ouvrir le dialog de modification
  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    setIsDialogOpen(true);
  };

  // Ouvrir le dialog de création
  const handleCreate = () => {
    setSelectedProject(undefined);
    setIsDialogOpen(true);
  };

  // Voir les détails d'un projet
  const handleView = (project: Project) => {
    navigate(`/projects/${project.id}`);
  };

  // Ouvrir le dialog de suppression
  const handleDeleteClick = (id: string) => {
    setProjectToDelete(id);
    setDeleteDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Mes Projets</h1>
            <p className="text-muted-foreground mt-1">
              Gérez votre portfolio de projets
            </p>
          </div>
          <Button onClick={handleCreate} size="lg">
            <Plus className="h-5 w-5 mr-2" />
            Nouveau projet
          </Button>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-card border rounded-lg p-6">
            <p className="text-sm text-muted-foreground mb-1">
              Total de projets
            </p>
            <p className="text-3xl font-bold">{projects.length}</p>
          </div>
          <div className="bg-card border rounded-lg p-6">
            <p className="text-sm text-muted-foreground mb-1">Dernier projet</p>
            <p className="text-lg font-medium">
              {projects.length > 0
                ? formatDistanceToNow(new Date(projects[0].createdAt), {
                    addSuffix: true,
                    locale: fr,
                  })
                : "Aucun projet"}
            </p>
          </div>
        </div>

        {/* Liste des projets */}
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : (
          <ProjectList
            projects={projects}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
            onView={handleView}
          />
        )}

        {/* Dialog Formulaire */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {selectedProject ? "Modifier le projet" : "Nouveau projet"}
              </DialogTitle>
            </DialogHeader>
            <ProjectForm
              onSubmit={
                selectedProject ? handleUpdateProject : handleCreateProject
              }
              initialData={selectedProject}
              isLoading={isSubmitting}
            />
          </DialogContent>
        </Dialog>

        {/* Dialog de confirmation de suppression */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
              <AlertDialogDescription>
                Cette action est irréversible. Le projet et toutes ses images
                seront définitivement supprimés.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteProject}
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