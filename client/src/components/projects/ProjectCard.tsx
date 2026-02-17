import type { Project } from '@/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components//ui/card';
import { Button } from '@/components//ui/button';
import { Badge } from '@/components//ui/badge';
import { Edit, Trash2, ExternalLink } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  onView: (project: Project) => void;
}

export const ProjectCard = ({ project, onEdit, onDelete, onView }: ProjectCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
      {/* Image de couverture */}
      <div className="relative h-48 bg-muted overflow-hidden">
        {project.images[0] ? (
          <img
            src={project.images[0].url}
            alt={project.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ExternalLink className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
        
        {/* Badge nombre d'images */}
        {project.images.length > 1 && (
          <Badge
            variant="secondary"
            className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm"
          >
            {project.images.length} images
          </Badge>
        )}
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-lg leading-tight mb-1">
              {project.name}
            </h3>
            <p className="text-xs text-muted-foreground">
              Créé{' '}
              {formatDistanceToNow(new Date(project.createdAt), {
                addSuffix: true,
                locale: fr,
              })}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <Badge key={tech.id} variant="outline" className="text-xs">
              {tech.name}
            </Badge>
          ))}
          {project.technologies.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{project.technologies.length - 4}
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-0 gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => onView(project)}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Voir
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(project)}
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDelete(project.id)}
          className="text-destructive hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};