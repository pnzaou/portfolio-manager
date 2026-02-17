import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { projectSchema } from '@/schemas/project.schema';
import type { ProjectFormData } from '@/schemas/project.schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ImageUpload } from './ImageUpload';
import { useState, useEffect } from 'react';
import { X, Loader2, Plus, ChevronDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Project } from '@/types';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ProjectFormProps {
  onSubmit: (data: FormData) => Promise<void>;
  initialData?: Project;
  isLoading: boolean;
}

export const ProjectForm = ({ onSubmit, initialData, isLoading }: ProjectFormProps) => {
  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState(initialData?.images || []);
  const [technologies, setTechnologies] = useState<string[]>(
    initialData?.technologies.map((t) => t.name) || []
  );
  const [availableTechs, setAvailableTechs] = useState<string[]>([]);
  const [useCustomInput, setUseCustomInput] = useState(false);
  const [customTechInput, setCustomTechInput] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: initialData?.name || '',
      description: initialData?.description || '',
      technologies: initialData?.technologies.map((t) => t.name) || [],
    },
  });

  // Charger les technologies disponibles
  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        const response = await api.get('/projects/technologies');
        setAvailableTechs(response.data.technologies);
      } catch (error) {
        console.error('Erreur lors du chargement des technologies');
      }
    };
    fetchTechnologies();
  }, []);

  const addTechnologyFromSelect = (tech: string) => {
    if (tech && !technologies.includes(tech)) {
      const newTechs = [...technologies, tech];
      setTechnologies(newTechs);
      setValue('technologies', newTechs);
    }
  };

  const addCustomTechnology = () => {
    const tech = customTechInput.trim();
    if (tech && !technologies.includes(tech)) {
      const newTechs = [...technologies, tech];
      setTechnologies(newTechs);
      setValue('technologies', newTechs);
      setCustomTechInput('');
      setUseCustomInput(false);
    }
  };

  const removeTechnology = (tech: string) => {
    const newTechs = technologies.filter((t) => t !== tech);
    setTechnologies(newTechs);
    setValue('technologies', newTechs);
  };

  const handleDeleteExistingImage = async (imageId: string) => {
    try {
      await api.delete(`/projects/image/${imageId}`);
      toast.success('Image supprimée');
      setExistingImages(existingImages.filter(img => img.id !== imageId));
    } catch (error) {
      toast.error('Erreur lors de la suppression de l\'image');
      throw error;
    }
  };

  const handleFormSubmit = async (data: ProjectFormData) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    
    technologies.forEach((tech) => {
      formData.append('technologies', tech);
    });

    images.forEach((image) => {
      formData.append('images', image);
    });

    await onSubmit(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{initialData ? 'Modifier le projet' : 'Nouveau projet'}</CardTitle>
        <CardDescription>
          {initialData
            ? 'Mettez à jour les informations de votre projet'
            : 'Ajoutez un nouveau projet à votre portfolio'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Nom du projet */}
          <div className="space-y-2">
            <Label htmlFor="name">Nom du projet *</Label>
            <Input
              id="name"
              placeholder="Mon super projet"
              {...register('name')}
              disabled={isLoading}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Décrivez votre projet en détail..."
              rows={6}
              {...register('description')}
              disabled={isLoading}
              className="resize-none"
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description.message}</p>
            )}
          </div>

          {/* Technologies avec Select/Input intelligent */}
          <div className="space-y-2">
            <Label htmlFor="technology">Technologies & Outils *</Label>
            
            {availableTechs.length > 0 && !useCustomInput ? (
              // Mode Select : si des technologies existent
              <div className="flex gap-2">
                <Select onValueChange={addTechnologyFromSelect} disabled={isLoading}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Sélectionnez une technologie..." />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTechs
                      .filter(tech => !technologies.includes(tech))
                      .map((tech) => (
                        <SelectItem key={tech} value={tech}>
                          {tech}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setUseCustomInput(true)}
                  disabled={isLoading}
                >
                  Autre
                </Button>
              </div>
            ) : (
              // Mode Input : pour saisie personnalisée
              <div className="flex gap-2">
                <Input
                  placeholder="Tapez une nouvelle technologie..."
                  value={customTechInput}
                  onChange={(e) => setCustomTechInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addCustomTechnology();
                    }
                  }}
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  onClick={addCustomTechnology}
                  disabled={isLoading || !customTechInput.trim()}
                  size="icon"
                >
                  <Plus className="h-4 w-4" />
                </Button>
                {availableTechs.length > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setUseCustomInput(false);
                      setCustomTechInput('');
                    }}
                    disabled={isLoading}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                )}
              </div>
            )}

            <p className="text-xs text-muted-foreground">
              {availableTechs.length > 0 && !useCustomInput
                ? "Sélectionnez dans la liste ou cliquez sur 'Autre' pour saisir"
                : "Saisissez une nouvelle technologie"}
            </p>

            {/* Liste des technologies sélectionnées */}
            {technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="px-3 py-1">
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeTechnology(tech)}
                      className="ml-2 hover:text-destructive"
                      disabled={isLoading}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}

            {errors.technologies && (
              <p className="text-sm text-destructive">{errors.technologies.message}</p>
            )}
          </div>

          {/* Images */}
          <ImageUpload
            images={images}
            onImagesChange={setImages}
            existingImages={existingImages}
            onDeleteExisting={handleDeleteExistingImage}
          />

          {/* Boutons */}
          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {initialData ? 'Mise à jour...' : 'Création...'}
                </>
              ) : (
                <>{initialData ? 'Mettre à jour' : 'Créer le projet'}</>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};