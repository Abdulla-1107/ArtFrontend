import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface OfertaDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OfertaDialog = ({ isOpen, onClose }: OfertaDialogProps) => {
  const { t } = useTranslation();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] p-0 bg-background border-2 border-primary/20">
        <DialogHeader className="p-6 pb-4 bg-gradient-to-br from-primary/5 to-accent/5">
          <DialogTitle className="text-2xl font-heading">
            {t('oferta.title')}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[500px] px-6 pb-6">
          <div className="space-y-6 text-sm leading-relaxed">
            <section>
              <h3 className="text-lg font-semibold mb-3 text-primary">
                {t('oferta.section1.title')}
              </h3>
              <p className="text-muted-foreground">
                {t('oferta.section1.content')}
              </p>
            </section>

            <Separator />

            <section>
              <h3 className="text-lg font-semibold mb-3 text-primary">
                {t('oferta.section2.title')}
              </h3>
              <p className="text-muted-foreground mb-2">
                {t('oferta.section2.content')}
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
                <li>{t('oferta.section2.item1')}</li>
                <li>{t('oferta.section2.item2')}</li>
                <li>{t('oferta.section2.item3')}</li>
                <li>{t('oferta.section2.item4')}</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h3 className="text-lg font-semibold mb-3 text-primary">
                {t('oferta.section3.title')}
              </h3>
              <p className="text-muted-foreground">
                {t('oferta.section3.content')}
              </p>
            </section>

            <Separator />

            <section>
              <h3 className="text-lg font-semibold mb-3 text-primary">
                {t('oferta.section4.title')}
              </h3>
              <p className="text-muted-foreground">
                {t('oferta.section4.content')}
              </p>
            </section>

            <Separator />

            <section>
              <h3 className="text-lg font-semibold mb-3 text-primary">
                {t('oferta.section5.title')}
              </h3>
              <p className="text-muted-foreground">
                {t('oferta.section5.content')}
              </p>
            </section>

            <Separator />

            <section>
              <h3 className="text-lg font-semibold mb-3 text-primary">
                {t('oferta.section6.title')}
              </h3>
              <p className="text-muted-foreground">
                {t('oferta.section6.content')}
              </p>
            </section>

            <div className="pt-4 text-center text-xs text-muted-foreground">
              {t('oferta.lastUpdated')}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
