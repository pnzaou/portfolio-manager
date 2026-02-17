import { useState } from 'react';
import { X, Upload, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface ImageUploadProps {
  images: File[];
  onImagesChange: (images: File[]) => void;
  existingImages?: { id: string; url: string }[];
  onDeleteExisting?: (imageId: string) => void;
}

export const ImageUpload = ({
  images,
  onImagesChange,
  existingImages = [],
  onDeleteExisting,
}: ImageUploadProps) => {
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages = [...images, ...files];
    onImagesChange(newImages);

    // Créer les previews
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    onImagesChange(newImages);
    setPreviews(newPreviews);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="images" className="text-base">
          Images du projet
        </Label>
        <p className="text-sm text-muted-foreground mt-1">
          Ajoutez jusqu'à 10 captures d'écran de votre projet
        </p>
      </div>

      {/* Images existantes */}
      {existingImages.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {existingImages.map((image) => (
            <div key={image.id} className="relative group">
              <img
                src={image.url}
                alt="Project"
                className="w-full h-32 object-cover rounded-lg border"
              />
              {onDeleteExisting && (
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => onDeleteExisting(image.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Nouvelles images */}
      {previews.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {previews.map((preview, index) => (
            <div key={index} className="relative group">
              <img
                src={preview}
                alt={`Preview ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg border"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeImage(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Zone d'upload */}
      <div className="border-2 border-dashed rounded-lg p-8 hover:border-primary transition-colors">
        <input
          id="images"
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <label
          htmlFor="images"
          className="flex flex-col items-center justify-center cursor-pointer"
        >
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <ImageIcon className="h-6 w-6 text-primary" />
          </div>
          <p className="text-sm font-medium mb-1">
            Cliquez pour ajouter des images
          </p>
          <p className="text-xs text-muted-foreground">
            PNG, JPG, WEBP jusqu'à 5MB
          </p>
        </label>
      </div>
    </div>
  );
};