import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import { ArtworkCard } from "@/components/gallery/ArtworkCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { API } from "@/hooks/getEnv";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { log } from "console";

type Category = "all" | "oil" | "watercolor" | "digital" | "mixed";
type SortOption = "newest" | "price-low" | "price-high" | "name";

const Gallery = () => {
  const { t, i18n } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [priceRange, setPriceRange] = useState<string>("all");
  const [artworks, setArtworks] = useState<any[]>([]);

  const { data } = useQuery({
    queryKey: ["gallery"],
    queryFn: async () => {
      const res = await axios.get(`${API}/artwork`);
      return res.data;
    },
  });
  console.log(data, "data");

  const categories = Array.from(
    new Set(
      data?.data
        ?.map((artwork: any) => artwork.category)
        .filter((c: any) => Boolean(c))
    )
  );

  let filteredArtworks = artworks.filter((artwork) => {
    const categoryMatch =
      activeCategory === "all" || artwork.category === activeCategory;

    let priceMatch = true;
    if (priceRange === "under-300") priceMatch = artwork.price < 300;
    else if (priceRange === "300-400")
      priceMatch = artwork.price >= 300 && artwork.price < 400;
    else if (priceRange === "over-400") priceMatch = artwork.price >= 400;

    const query = searchQuery.toLowerCase();
    const title =
      i18n.language === "ru"
        ? artwork.titleRu
        : i18n.language === "uz"
        ? artwork.titleUz
        : artwork.title;
    const description =
      i18n.language === "ru"
        ? artwork.descriptionRu
        : i18n.language === "uz"
        ? artwork.descriptionUz
        : artwork.description;

    const searchMatch =
      !searchQuery ||
      title.toLowerCase().includes(query) ||
      description.toLowerCase().includes(query);

    return categoryMatch && priceMatch && searchMatch;
  });

  filteredArtworks = [...filteredArtworks].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name":
        const titleA =
          i18n.language === "ru"
            ? a.titleRu
            : i18n.language === "uz"
            ? a.titleUz
            : a.title;
        const titleB =
          i18n.language === "ru"
            ? b.titleRu
            : i18n.language === "uz"
            ? b.titleUz
            : b.title;
        return titleA.localeCompare(titleB);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen py-16 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 text-foreground">
            {t("gallery.title")}
          </h1>
          <div className="section-divider" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="max-w-5xl mx-auto mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t("gallery.search") || "Search artworks..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 rounded-full border-2 shadow-soft"
              />
            </div>
            <div className="flex gap-2">
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="rounded-full py-6 border-2">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  <SelectValue placeholder={t("gallery.priceRange")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("gallery.allPrices")}</SelectItem>
                  <SelectItem value="under-300">
                    {t("gallery.under300")}
                  </SelectItem>
                  <SelectItem value="300-400">
                    {t("gallery.300to400")}
                  </SelectItem>
                  <SelectItem value="over-400">
                    {t("gallery.over400")}
                  </SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={sortBy}
                onValueChange={(value) => setSortBy(value as SortOption)}
              >
                <SelectTrigger className="rounded-full py-6 border-2">
                  <SelectValue placeholder={t("gallery.sort")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">
                    {t("gallery.sortNewest")}
                  </SelectItem>
                  <SelectItem value="price-low">
                    {t("gallery.sortPriceLow")}
                  </SelectItem>
                  <SelectItem value="price-high">
                    {t("gallery.sortPriceHigh")}
                  </SelectItem>
                  <SelectItem value="name">{t("gallery.sortName")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categories.map((category: any) => (
            <Button
              key={category}
              onClick={() => setActiveCategory(category)}
              variant={activeCategory === category ? "default" : "outline"}
              className={cn(
                "transition-all duration-500 rounded-full px-6 py-5",
                activeCategory === category && "shadow-elegant scale-105"
              )}
            >
              {t(`gallery.filter.${category}`)}
            </Button>
          ))}
        </motion.div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10"
        >
          {data?.data?.map((artwork, index) => (
            <ArtworkCard key={artwork.id} artwork={artwork} index={index} />
          ))}
        </motion.div>

        {data?.data?.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <p className="text-muted-foreground text-xl font-heading">
              No artworks found in this category
            </p>
            <p className="text-muted-foreground text-xl font-heading">
              {t("gallery.noArtworks")}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
