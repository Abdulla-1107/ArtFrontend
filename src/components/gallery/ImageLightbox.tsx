import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  image: string;
  title: string;
}

export const ImageLightbox = ({ isOpen, onClose, image, title }: ImageLightboxProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl w-full p-0 bg-black/95 border-none">
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-50 text-white hover:bg-white/20"
        >
          <X className="h-6 w-6" />
        </Button>
        <div className="relative w-full h-[90vh] flex items-center justify-center p-4">
          <img
            src={image}
            alt={title}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
