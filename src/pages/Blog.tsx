import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const blogPosts = [
  {
    id: 1,
    title: 'The Art of Oil Painting',
    titleRu: 'Искусство масляной живописи',
    titleUz: 'Moyli rasm sanati',
    excerpt: 'Discover the techniques and emotions behind creating oil paintings...',
    excerptRu: 'Откройте для себя техники и эмоции, стоящие за созданием масляных картин...',
    excerptUz: 'Moyli rasmlar yaratish ortidagi texnika va hissiyotlarni kashf eting...',
    date: '2024-03-15',
    author: 'Bibisora',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80',
  },
  {
    id: 2,
    title: 'Inspiration from Uzbekistan',
    titleRu: 'Вдохновение из Узбекистана',
    titleUz: "O'zbekistondan ilhom",
    excerpt: 'How the rich culture of Uzbekistan influences my artistic journey...',
    excerptRu: 'Как богатая культура Узбекистана влияет на мой творческий путь...',
    excerptUz: "O'zbekistonning boy madaniyati mening san'at yo'limga qanday ta'sir qiladi...",
    date: '2024-03-10',
    author: 'Bibisora',
    image: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&q=80',
  },
  {
    id: 3,
    title: 'Digital Art in Modern Times',
    titleRu: 'Цифровое искусство в современности',
    titleUz: 'Zamonaviy davrdagi raqamli sanʼat',
    excerpt: 'Exploring the intersection of traditional art and digital media...',
    excerptRu: 'Исследование пересечения традиционного искусства и цифровых медиа...',
    excerptUz: "An'anaviy san'at va raqamli media kesishmasini o'rganish...",
    date: '2024-03-05',
    author: 'Bibisora',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=80',
  },
];

const Blog = () => {
  const { t, i18n } = useTranslation();

  const getTitle = (post: typeof blogPosts[0]) => {
    switch (i18n.language) {
      case 'ru':
        return post.titleRu;
      case 'uz':
        return post.titleUz;
      default:
        return post.title;
    }
  };

  const getExcerpt = (post: typeof blogPosts[0]) => {
    switch (i18n.language) {
      case 'ru':
        return post.excerptRu;
      case 'uz':
        return post.excerptUz;
      default:
        return post.excerpt;
    }
  };

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
            {t('blog.title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            {t('blog.subtitle')}
          </p>
          <div className="section-divider" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link to={`/blog/${post.id}`}>
                <Card className="overflow-hidden hover-lift card-elegant border-0 h-full">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={post.image}
                      alt={getTitle(post)}
                      loading="lazy"
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                    </div>
                    <h3 className="font-heading text-2xl font-semibold mb-3 text-foreground">
                      {getTitle(post)}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {getExcerpt(post)}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;