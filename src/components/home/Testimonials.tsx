import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API } from "@/hooks/getEnv";

export const Testimonials = () => {
  const { t, i18n } = useTranslation();
  const { data: commentlist } = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const res = await axios.get(`${API}/comment`);
      console.log(res, "cpm");

      return res;
    },
  });

  const getName = (testimonial: (typeof commentlist.data)[0]) => {
    switch (i18n.language) {
      case "ru":
        return testimonial.nameRu;
      case "uz":
        return testimonial.nameUz;
      default:
        return testimonial.name;
    }
  };

  const getLocation = (testimonial: (typeof commentlist.data)[0]) => {
    switch (i18n.language) {
      case "ru":
        return testimonial.locationRu;
      case "uz":
        return testimonial.locationUz;
      default:
        return testimonial.location;
    }
  };

  const getText = (testimonial: (typeof commentlist.data)[0]) => {
    switch (i18n.language) {
      case "ru":
        return testimonial.textRu;
      case "uz":
        return testimonial.textUz;
      default:
        return testimonial.text;
    }
  };

  return (
    <section className="py-24 bg-secondary/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-foreground">
            {t("testimonials.title")}
          </h2>
          <div className="section-divider" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {commentlist?.data?.map((testimonial: any, index: any) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="card-elegant h-full">
                <CardContent className="p-8">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-accent text-accent"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic leading-relaxed">
                    "{getText(testimonial)}"
                  </p>
                  <div>
                    <p className="font-semibold text-foreground">
                      {getName(testimonial)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {getLocation(testimonial)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
