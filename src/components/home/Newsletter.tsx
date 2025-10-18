import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Mail } from 'lucide-react';

export const Newsletter = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      toast({
        title: t('newsletter.successTitle'),
        description: t('newsletter.successMessage'),
      });
      setEmail('');
      setLoading(false);
    }, 1000);
  };

  return (
    <section className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4 text-foreground">
              {t('newsletter.title')}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {t('newsletter.description')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder={t('newsletter.placeholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-full py-6 border-2"
              required
            />
            <Button
              type="submit"
              disabled={loading}
              className="rounded-full px-8 py-6 shadow-elegant"
            >
              {loading ? t('newsletter.sending') : t('newsletter.subscribe')}
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};