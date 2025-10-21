import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Check,
  ArrowLeft,
  Heart,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ImageLightbox } from "@/components/gallery/ImageLightbox";
import { PurchaseDialog } from "@/components/purchase/PurchaseDialog";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API } from "@/hooks/getEnv";

const ArtworkDetail = () => {
  const { id } = useParams();

  const { t, i18n } = useTranslation();

  const { addToCart, isInCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isPurchaseDialogOpen, setIsPurchaseDialogOpen] = useState(false);

  const {
    data: artwork,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["artworks"],
    queryFn: async () => {
      const res = await axios.get(`${API}/artwork/${id}`);

      return res.data.data;
    },
  });
  console.log(artwork, "art");

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">{t("artwork.loading")}</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-heading font-bold mb-4">
            {t("artwork.artworkNotFound")}
          </h1>
          <Link to="/gallery">
            <Button variant="outline">{t("artwork.backToGallery")}</Button>
          </Link>
        </div>
      </div>
    );
  }

  const inCart = isInCart(artwork.id);
  const isFav = isFavorite(artwork.id);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <Link to="/gallery">
          <Button variant="ghost" className="mb-8 gap-2">
            <ArrowLeft className="h-4 w-4" />
            {t("artwork.backToGallery")}
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card
              className="overflow-hidden card-elegant relative group cursor-pointer"
              onClick={() => setLightboxOpen(true)}
            >
              <img

                src={artwork.imageUrl || "/placeholder.jpg"}
                alt={artwork.title}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-lg font-medium">
                  {t("artwork.clickToViewFull")}
                </span>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            {artwork.category && (
              <Badge className="w-fit mb-4 bg-secondary text-secondary-foreground">
                {artwork.category}
              </Badge>
            )}

            <div className="flex items-start justify-between mb-4">
              <h1 className="text-4xl md:text-5xl font-heading font-bold">
                {artwork.title}
              </h1>
              <Button
                variant="outline"
                size="icon"
                onClick={() => toggleFavorite(artwork.id, artwork.title)}
                className={cn(isFav && "text-red-500")}
              >
                <Heart className={cn("h-5 w-5", isFav && "fill-current")} />
              </Button>
            </div>

            {/* 🔸 Description (3 tilda) */}
            <p className="text-lg text-muted-foreground mb-6">
              {artwork[`description_${i18n.language}`] ||
                artwork.description_uz ||
                ""}
            </p>

            <Card className="mb-6 bg-muted/50 border-none">
              <CardContent className="p-6 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">
                    {t("artwork.price")}
                  </span>
                  
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">
                    {t("artwork.dimensions")}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">
                    {t("artwork.category")}
                  </span>
                  <span className="font-medium">
                    {t(`gallery.filter.${artwork.category}`)}
                    {artwork.price
                      ? `${artwork.price.toLocaleString()} so'm`
                      : t("artwork.free")}
                  </span>
                </div>
                {artwork.category && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">
                      {t("artwork.category")}
                    </span>
                    <span className="font-medium">{artwork.category}</span>
                  </div>
                )}
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
                    {t("artwork.inCart")}
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5" />
                    {t("artwork.addToCart")}
                  </>
                )}
              </Button>

              <Button
                onClick={() => setIsPurchaseDialogOpen(true)}
                size="lg"
                className="flex-1 gap-2 text-lg py-6 shadow-elegant"
              >
                <CreditCard className="h-5 w-5" />
                {t("artwork.buyNow")}
              </Button>
            </div>
          </motion.div>
        </div>

        <ImageLightbox
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          image={artwork.imageUrl}

          title={artwork.title}
        />

        <PurchaseDialog
          isOpen={isPurchaseDialogOpen}
          onClose={() => setIsPurchaseDialogOpen(false)}
          artworkTitle={artwork.title}
          artworkPrice={artwork.price}
          onConfirm={() => {
            toast({
              title: t("purchase.success.title"),
              description: t("purchase.success.message"),
              duration: 5000,
            });
          }}
        />
      </div>
    </div>
  );
};

export default ArtworkDetail;
