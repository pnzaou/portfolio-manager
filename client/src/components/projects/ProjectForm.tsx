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
import { useState } from 'react';
import { X, Loader2, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Project } from '@/types';

interface ProjectFormProps {
  onSubmit: (data: FormData) => Promise<void>;
  initialData?: Project;
  isLoading: boolean;
}

export const ProjectForm = ({ onSubmit, initialData, isLoading }: ProjectFormProps) => {
  const [images, setImages] = useState<File[]>([]);
  const [technologies, setTechnologies] = useState<string[]>(
    initialData?.technologies.map((t) => t.name) || []
  );
  const [techInput, setTechInput] = useState('');

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

  const addTechnology = () => {
    if (techInput.trim() && !technologies.includes(techInput.trim())) {
      const newTechs = [...technologies, techInput.trim()];
      setTechnologies(newTechs);
      setValue('technologies', newTechs);
      setTechInput('');
    }
  };

  const removeTechnology = (tech: string) => {
    const newTechs = technologies.filter((t) => t !== tech);
    setTechnologies(newTechs);
    setValue('technologies', newTechs);
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

          {/* Technologies */}
          <div className="space-y-2">
            <Label htmlFor="technology">Technologies & Outils *</Label>
            <div className="flex gap-2">
              <Input
                id="technology"
                placeholder="Ex: React, TypeScript, Tailwind..."
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTechnology();
                  }
                }}
                disabled={isLoading}
              />
              <Button
                type="button"
                onClick={addTechnology}
                disabled={isLoading || !techInput.trim()}
                size="icon"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Liste des technologies */}
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
            existingImages={initialData?.images}
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