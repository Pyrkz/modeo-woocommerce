import { Metadata } from 'next';
import { BlogPostPageOptimized } from '@/features/blog-post';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  // This would ideally fetch the post data for SEO
  // For now, we'll use a basic metadata structure
  return {
    title: `Artykuł | Modeo Blog`,
    description: 'Przeczytaj najnowszy artykuł na blogu Modeo o znakowaniu odzieży, trendach i poradach.',
    openGraph: {
      title: `Artykuł | Modeo Blog`,
      description: 'Przeczytaj najnowszy artykuł na blogu Modeo o znakowaniu odzieży, trendach i poradach.',
      type: 'article',
      url: `https://modeo.pl/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  return <BlogPostPageOptimized slug={slug} />;
}