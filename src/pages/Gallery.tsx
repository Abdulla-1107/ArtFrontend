import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import { ArtworkCard } from "@/components/gallery/ArtworkCard";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { API } from "@/hooks/getEnv";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useDebounce } from "use-debounce";

type SortOption = "newest" | "price-low" | "price-high" | "name";

const Gallery = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [priceRange, setPriceRange] = useState<string>("all");

  // 🔹 Debounce (500ms)
  const [debouncedSearch] = useDebounce(searchQuery, 500);

  // 🔹 Backenddan ma’lumot olish
  const { data, isLoading } = useQuery({
    queryKey: ["gallery", debouncedSearch, sortBy, priceRange],
    queryFn: async () => {
      const res = await axios.get(`${API}/artwork`, {
        params: {
          search: debouncedSearch || undefined,
          sort: sortBy !== "newest" ? sortBy : undefined,
          priceRange: priceRange !== "all" ? priceRange : undefined,
        },
      });
      return res.data;
    },
  });

  return (
    <div className="min-h-screen py-16 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-4">
        {/* --- TITLE --- */}
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

        {/* --- SEARCH & FILTERS --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="max-w-5xl mx-auto mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 🔍 SEARCH */}
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

            {/* 🔽 FILTERS */}
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

        {/* --- CONTENT --- */}
        {isLoading ? (
          // 🌀 Loading skeleton
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="bg-muted/30 rounded-2xl h-[350px] animate-pulse"
              />
            ))}
          </motion.div>
        ) : (
          <>
            {/* 🖼️ Artwork list */}
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10"
            >
              {data?.data?.map((artwork: any, index: number) => (
                <ArtworkCard key={artwork.id} artwork={artwork} index={index} />
              ))}
            </motion.div>

            {/* ⚠️ No artworks found */}
            {data?.data?.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-24"
              >
                <p className="text-muted-foreground text-xl font-heading">
                  {t("gallery.noArtworks")}
                </p>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Gallery;
