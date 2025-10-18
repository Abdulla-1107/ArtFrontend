import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              {t('about.title')}
            </h1>
            <p className="text-xl text-muted-foreground font-heading italic">
              {t('about.subtitle')}
            </p>
            <div className="w-24 h-1 bg-gradient-hero mx-auto rounded-full mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="overflow-hidden card-elegant">
                <img
                  src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80"
                  alt="Bibisora"
                  className="w-full h-auto object-cover"
                />
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              <p className="text-lg leading-relaxed text-foreground">
                {t('about.bio')}
              </p>

              <div className="grid grid-cols-2 gap-4">
                <Card className="p-6 bg-gradient-subtle border-none">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">50+</div>
                    <div className="text-sm text-muted-foreground">Artworks Created</div>
                  </div>
                </Card>
                <Card className="p-6 bg-gradient-subtle border-none">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">15+</div>
                    <div className="text-sm text-muted-foreground">Years Experience</div>
                  </div>
                </Card>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="prose prose-lg max-w-none"
          >
            <Card className="p-8 bg-muted/50 border-none">
              <h2 className="text-2xl font-heading font-bold mb-4">My Artistic Journey</h2>
              <p className="text-muted-foreground mb-4">
                My art is deeply rooted in the rich cultural tapestry of Uzbekistan. Growing up surrounded by
                the intricate patterns of traditional crafts, the vibrant colors of the markets, and the
                timeless beauty of ancient architecture, I found my calling in visual storytelling.
              </p>
              <p className="text-muted-foreground">
                Each piece I create is an exploration of identity, heritage, and the universal human
                experience. Through various mediums—from traditional oil and watercolor to contemporary
                digital art—I seek to bridge the past and present, creating works that resonate with both
                local and global audiences.
              </p>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
