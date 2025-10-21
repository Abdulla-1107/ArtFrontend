import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

const FAQ = () => {
  const { t } = useTranslation();

  const faqs = [
    { id: 'faq1', question: t('faq.q1'), answer: t('faq.a1') },
    { id: 'faq2', question: t('faq.q2'), answer: t('faq.a2') },
    { id: 'faq3', question: t('faq.q3'), answer: t('faq.a3') },
    { id: 'faq4', question: t('faq.q4'), answer: t('faq.a4') },
    { id: 'faq5', question: t('faq.q5'), answer: t('faq.a5') },
    { id: 'faq6', question: t('faq.q6'), answer: t('faq.a6') },
    { id: 'faq7', question: t('faq.q7'), answer: t('faq.a7') },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <HelpCircle className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-gradient mb-4">
            {t('faq.title')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('faq.subtitle')}
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <AccordionItem
                  value={faq.id}
                  className="bg-card border border-border rounded-lg px-6 shadow-sm hover:shadow-md transition-all"
                >
                  <AccordionTrigger className="text-left font-semibold hover:no-underline py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground">
            {t('faq.stillHaveQuestions')}{' '}
            <a href="/contact" className="text-primary font-semibold hover:underline">
              {t('faq.contactUs')}
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;
