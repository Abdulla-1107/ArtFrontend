import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { PurchaseDialog } from '@/components/purchase/PurchaseDialog';
import { toast } from '@/hooks/use-toast';

const Cart = () => {
  const { t, i18n } = useTranslation();
  const { cart, removeFromCart, getCartTotal, clearCart } = useCart();
  const [isPurchaseDialogOpen, setIsPurchaseDialogOpen] = useState(false);

  const getTitle = (item: any) => {
    switch (i18n.language) {
      case 'ru':
        return item.titleRu;
      case 'uz':
        return item.titleUz;
      default:
        return item.title;
    }
  };

  const handlePurchaseConfirm = () => {
    clearCart();
    toast({
      title: t('cart.purchaseSuccess'),
      description: t('cart.purchaseSuccessMessage'),
      duration: 5000,
    });
  };

  const getPurchaseTitle = () => {
    return `${t('cart.title')} (${cart.length} ${cart.length === 1 ? t('cart.item') : t('cart.items')})`;
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md mx-auto"
          >
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-heading font-bold mb-4">{t('cart.empty')}</h2>
            <p className="text-muted-foreground mb-8">
              {t('cart.browseGallery')}
            </p>
            <Link to="/gallery">
              <Button size="lg">{t('cart.continueShopping')}</Button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-8">{t('cart.title')}</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden card-elegant border-border/50">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <Link to={`/artwork/${item.id}`} className="flex-shrink-0">
                          <img
                            src={item.image}
                            alt={getTitle(item)}
                            className="w-24 h-24 object-cover rounded-md"
                          />
                        </Link>

                        <div className="flex-1 min-w-0">
                          <Link to={`/artwork/${item.id}`}>
                            <h3 className="font-heading font-semibold text-lg mb-1 hover:text-primary transition-colors">
                              {getTitle(item)}
                            </h3>
                          </Link>
                          <p className="text-sm text-muted-foreground mb-2">{item.dimensions}</p>
                          <p className="text-xl font-bold text-primary">${item.price}</p>
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.id)}
                          className="flex-shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="sticky top-24 card-elegant border-border/50">
                <CardContent className="p-6">
                  <h2 className="text-xl font-heading font-bold mb-6">{t('cart.orderSummary')}</h2>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">{t('cart.itemsCount')} ({cart.length})</span>
                      <span className="font-semibold">${getCartTotal()}</span>
                    </div>

                    <Separator />

                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>{t('cart.subtotal')}</span>
                      <span className="text-primary">${getCartTotal()}</span>
                    </div>

                    <Button 
                      size="lg" 
                      className="w-full shadow-elegant"
                      onClick={() => setIsPurchaseDialogOpen(true)}
                    >
                      {t('cart.checkout')}
                    </Button>

                    <Link to="/gallery">
                      <Button variant="outline" size="lg" className="w-full">
                        {t('cart.continueShopping')}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <PurchaseDialog
        isOpen={isPurchaseDialogOpen}
        onClose={() => setIsPurchaseDialogOpen(false)}
        artworkTitle={getPurchaseTitle()}
        artworkPrice={getCartTotal()}
        onConfirm={handlePurchaseConfirm}
      />
    </div>
  );
};

export default Cart;
