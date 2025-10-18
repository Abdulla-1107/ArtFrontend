import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArtworkCard } from '@/components/gallery/ArtworkCard';
import { Testimonials } from '@/components/home/Testimonials';
import { artworks } from '@/data/artworks';
import { ArrowRight } from 'lucide-react';

const Home = () => {
  const { t } = useTranslation();
  const featuredArtworks = artworks.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1600&q=80')] bg-cover bg-center opacity-5 animate-parallax" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-6 text-foreground"
            >
              {t('hero.title')}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-xl md:text-3xl font-heading italic mb-6 text-muted-foreground"
            >
              {t('hero.subtitle')}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="section-divider"
            />
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-lg md:text-xl mb-10 text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              {t('hero.description')}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <Link to="/gallery">
                <Button size="lg" className="gap-2 text-lg px-10 py-7 shadow-elegant rounded-full hover:shadow-2xl transition-all duration-500">
                  {t('hero.cta')}
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Featured Artworks */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-foreground">
              {t('featured.title')}
            </h2>
            <div className="section-divider" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
            {featuredArtworks.map((artwork, index) => (
              <ArtworkCard key={artwork.id} artwork={artwork} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <Link to="/gallery">
              <Button variant="outline" size="lg" className="gap-2 rounded-full px-8 py-6 hover:shadow-elegant transition-all duration-500">
                {t('featured.viewAll')}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />
    </div>
  );
};

export default Home;
