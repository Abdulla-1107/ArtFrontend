import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Heart, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Artwork } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useState } from "react";
import { ImageLightbox } from "./ImageLightbox";
import { cn } from "@/lib/utils";

interface ArtworkCardProps {
  artwork: Artwork;
  index?: number;
}

export const ArtworkCard = ({ artwork, index = 0 }: ArtworkCardProps) => {
  const { t, i18n } = useTranslation();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const getTitle = () => {
    switch (i18n.language) {
      case "ru":
        return artwork.title_ru;
      case "uz":
        return artwork.title_uz;
      default:
        return artwork.title_en;
    }
  };

  const isFav = isFavorite(artwork.id);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
      >
        <Card className="group overflow-hidden hover-lift card-elegant border-0 shadow-soft">
          <div className="relative">
            <div
              className="relative aspect-[3/4] overflow-hidden bg-muted/30 cursor-pointer"
              onClick={() => setLightboxOpen(true)}
            >
              <img
                src={artwork.imageUrl}
                alt={getTitle()}
                loading="lazy"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.preventDefault();
                toggleFavorite(artwork.id, getTitle());
              }}
              className={cn(
                "absolute top-4 right-4 z-10 bg-card/90 backdrop-blur-md hover:bg-card rounded-full shadow-md transition-all duration-300",
                isFav && "text-red-500"
              )}
            >
              <Heart className={cn("h-5 w-5", isFav && "fill-current")} />
            </Button>
          </div>

          <CardContent className="p-6">
            <Link to={`/artwork/${artwork.id}`}>
              <h3 className="font-heading text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                {getTitle()}
              </h3>
            </Link>

            <div className="flex items-center justify-between gap-3">
              <span className="text-2xl font-bold text-primary">
                ${artwork.price}
              </span>
              <Link to={`/artwork/${artwork.id}`}>
                <Button
                  size="sm"
                  className="gap-2 rounded-full transition-all duration-300"
                >
                  <Eye className="h-4 w-4" />
                  {t("artwork.viewDetails")}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        image={artwork.imageUrl}
        title={getTitle()}
      />
    </>
  );
};
