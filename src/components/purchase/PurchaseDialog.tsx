import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { OfertaDialog } from "./OfertaDialog";
import { toast } from "@/components/ui/use-toast";
import { useOrder } from "@/hooks/useOrder";
import { useParams } from "react-router-dom";

interface PurchaseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  artworkTitle: string;
  artworkPrice: number;
  onConfirm?: () => void;
}

export const PurchaseDialog = ({
  isOpen,
  onClose,
  artworkTitle,
  artworkPrice,
  onConfirm,
}: PurchaseDialogProps) => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { createOrder } = useOrder();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showOferta, setShowOferta] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = t("purchase.errors.nameRequired");
    }

    if (!phone.trim()) {
      newErrors.phone = t("purchase.errors.phoneRequired");
    } else if (phone.length < 10) {
      newErrors.phone = t("purchase.errors.phoneInvalid");
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = t("purchase.errors.emailInvalid");
    }

    if (!agreedToTerms) {
      newErrors.terms = t("purchase.errors.termsRequired");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(e);

    if (!validateForm()) {
      return;
    }

    const orderData = {
      fullName: name,
      phoneNumber: phone,
      address: "null", // bu joyni keyinchalik inputdan olish mumkin
      email: email || null,
      items: [
        {
          artworkId: id, // hozircha statik, lekin props orqali ham berish mumkin
          quantity: 1,
        },
      ],
    };

    console.log(orderData);

    try {
      // ✅ backendga yuborish
      await createOrder.mutateAsync(orderData);

      // Muvaffaqiyatli holatda animatsiya va toast
      setIsSubmitted(true);
      toast({
        title: t("purchase.success.title"),
        description: t("purchase.success.message"),
        duration: 5000,
      });

      if (onConfirm) onConfirm();

      setTimeout(() => handleClose(), 2000);
    } catch (error) {
      console.error("Order creation failed:", error);
      toast({
        title: t("purchase.error.title"),
        description: t("purchase.error.message"),
        variant: "destructive",
        duration: 4000,
      });
    }

    // Simulate purchase submission
    setIsSubmitted(true);

    setTimeout(() => {
      toast({
        title: t("purchase.success.title"),
        description: t("purchase.success.message"),
        duration: 5000,
      });

      if (onConfirm) {
        onConfirm();
      }

      setTimeout(() => {
        handleClose();
      }, 2000);
    }, 1500);
  };

  const handleClose = () => {
    setName("");
    setPhone("");
    setEmail("");
    setAgreedToTerms(false);
    setIsSubmitted(false);
    setErrors({});
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-background/95 backdrop-blur-xl border-2 border-primary/20 shadow-elegant">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <DialogHeader className="p-6 pb-4 bg-gradient-to-br from-primary/5 to-accent/5">
                  <DialogTitle className="text-2xl font-heading text-center">
                    {t("purchase.title")}
                  </DialogTitle>
                  <DialogDescription className="text-center text-base mt-2">
                    <span className="font-semibold text-foreground">
                      {artworkTitle}
                    </span>
                    <span className="block text-2xl font-bold text-primary mt-2">
                      ${artworkPrice}
                    </span>
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-base">
                      {t("purchase.form.name")}{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t("purchase.form.namePlaceholder")}
                      className="h-12 rounded-xl border-2 focus:border-primary transition-all"
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive">{errors.name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-base">
                      {t("purchase.form.phone")}{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+998 90 123 45 67"
                      className="h-12 rounded-xl border-2 focus:border-primary transition-all"
                    />
                    {errors.phone && (
                      <p className="text-sm text-destructive">{errors.phone}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-base">
                      {t("purchase.form.email")}{" "}
                      <span className="text-muted-foreground text-sm">
                        ({t("purchase.form.optional")})
                      </span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t("purchase.form.emailPlaceholder")}
                      className="h-12 rounded-xl border-2 focus:border-primary transition-all"
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="terms"
                        checked={agreedToTerms}
                        onCheckedChange={(checked) =>
                          setAgreedToTerms(checked as boolean)
                        }
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <Label
                          htmlFor="terms"
                          className="text-sm leading-relaxed cursor-pointer"
                        >
                          {t("purchase.form.agreeToTerms")}{" "}
                          <button
                            type="button"
                            onClick={() => setShowOferta(true)}
                            className="text-primary hover:text-primary/80 underline underline-offset-2 font-medium transition-colors"
                          >
                            {t("purchase.form.oferta")}
                          </button>
                        </Label>
                      </div>
                    </div>
                    {errors.terms && (
                      <p className="text-sm text-destructive">{errors.terms}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={!agreedToTerms}
                    className="w-full h-12 text-base rounded-xl font-semibold shadow-elegant hover:shadow-soft hover:scale-[1.02] transition-all duration-300"
                  >
                    {t("purchase.form.confirm")}
                  </Button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                className="p-12 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6"
                >
                  <Check className="w-10 h-10 text-primary" strokeWidth={3} />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3 className="text-2xl font-heading font-bold mb-3">
                    {t("purchase.success.title")}
                  </h3>
                  <p className="text-muted-foreground text-lg">
                    {t("purchase.success.message")}
                  </p>
                  <div className="flex items-center justify-center gap-2 mt-4 text-primary">
                    <Sparkles className="w-5 h-5 animate-pulse" />
                    <span className="text-sm font-medium">
                      {t("purchase.success.thankYou")}
                    </span>
                    <Sparkles className="w-5 h-5 animate-pulse" />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>

      <OfertaDialog isOpen={showOferta} onClose={() => setShowOferta(false)} />
    </>
  );
};
