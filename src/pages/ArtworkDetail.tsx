import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ShoppingCart, Check, ArrowLeft, Heart, Share2, Facebook, Twitter, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { artworks } from '@/data/artworks';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { ImageLightbox } from '@/components/gallery/ImageLightbox';
import { PurchaseDialog } from '@/components/purchase/PurchaseDialog';

const ArtworkDetail = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const { addToCart, isInCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isPurchaseDialogOpen, setIsPurchaseDialogOpen] = useState(false);

  const artwork = artworks.find((a) => a.id === id);

  if (!artwork) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-heading font-bold mb-4">Artwork not found</h1>
          <Link to="/gallery">
            <Button variant="outline">Back to Gallery</Button>
          </Link>
        </div>
      </div>
    );
  }

  const getTitle = () => {
    switch (i18n.language) {
      case 'ru':
        return artwork.titleRu;
      case 'uz':
        return artwork.titleUz;
      default:
        return artwork.title;
    }
  };

  const getDescription = () => {
    switch (i18n.language) {
      case 'ru':
        return artwork.descriptionRu;
      case 'uz':
        return artwork.descriptionUz;
      default:
        return artwork.description;
    }
  };

  const inCart = isInCart(artwork.id);
  const isFav = isFavorite(artwork.id);

  const handleShare = (platform: 'facebook' | 'twitter' | 'copy') => {
    const url = window.location.href;
    const text = `Check out "${getTitle()}" by Bibisora`;
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        toast({
          title: "Link copied!",
          description: "The artwork link has been copied to clipboard",
        });
        break;
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <Link to="/gallery">
          <Button variant="ghost" className="mb-8 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Gallery
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="overflow-hidden card-elegant relative group cursor-pointer" onClick={() => setLightboxOpen(true)}>
              <img
                src={artwork.image}
                alt={getTitle()}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-lg font-medium">
                  Click to view full size
                </span>
              </div>
            </Card>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <Badge className="w-fit mb-4 bg-secondary text-secondary-foreground">
              {t(`gallery.filter.${artwork.category}`)}
            </Badge>

            <div className="flex items-start justify-between mb-4">
              <h1 className="text-4xl md:text-5xl font-heading font-bold">
                {getTitle()}
              </h1>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => toggleFavorite(artwork.id, getTitle())}
                  className={cn(isFav && "text-red-500")}
                >
                  <Heart className={cn("h-5 w-5", isFav && "fill-current")} />
                </Button>
              </div>
            </div>

            <p className="text-lg text-muted-foreground mb-6">{getDescription()}</p>

            {/* Social Share */}
            <div className="flex gap-2 mb-6">
              <Button variant="outline" size="sm" onClick={() => handleShare('facebook')} className="gap-2">
                <Facebook className="h-4 w-4" />
                Share
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleShare('twitter')} className="gap-2">
                <Twitter className="h-4 w-4" />
                Tweet
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleShare('copy')} className="gap-2">
                <Share2 className="h-4 w-4" />
                Copy Link
              </Button>
            </div>

            <Card className="mb-6 bg-muted/50 border-none">
              <CardContent className="p-6 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">{t('artwork.price')}</span>
                  <span className="text-3xl font-bold text-primary">${artwork.price}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">{t('artwork.dimensions')}</span>
                  <span className="font-medium">{artwork.dimensions}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">{t('artwork.category')}</span>
                  <span className="font-medium">{t(`gallery.filter.${artwork.category}`)}</span>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button
                onClick={() => addToCart(artwork)}
                disabled={inCart}
                size="lg"
                className="flex-1 gap-2 text-lg py-6 shadow-elegant"
                variant={inCart ? "secondary" : "outline"}
              >
                {inCart ? (
                  <>
                    <Check className="h-5 w-5" />
                    {t('artwork.inCart')}
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5" />
                    {t('artwork.addToCart')}
                  </>
                )}
              </Button>

              <Button
                onClick={() => setIsPurchaseDialogOpen(true)}
                size="lg"
                className="flex-1 gap-2 text-lg py-6 shadow-elegant"
              >
                <CreditCard className="h-5 w-5" />
                {t('artwork.buyNow')}
              </Button>
            </div>
          </motion.div>
        </div>

        <ImageLightbox
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          image={artwork.image}
          title={getTitle()}
        />

        <PurchaseDialog
          isOpen={isPurchaseDialogOpen}
          onClose={() => setIsPurchaseDialogOpen(false)}
          artworkTitle={getTitle()}
          artworkPrice={artwork.price}
          onConfirm={() => {
            toast({
              title: t('purchase.success.title'),
              description: t('purchase.success.message'),
              duration: 5000,
            });
          }}
        />
      </div>
    </div>
  );
};

export default ArtworkDetail;
