import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Badge } from '../components/ui/Badge';
import { Spinner } from '../components/ui/Spinner';
import { GetQuoteCTA } from '../components/home/GetQuoteCTA';
import { getBlogPostBySlug } from '../services/api';
import { formatDate, getApiImageUrl } from '../utils/helpers';
import { FiArrowLeft } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await getBlogPostBySlug(slug);
        setPost(data);
      } catch {
        setPost(null);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (loading) return <PageWrapper title="Loading..."><Spinner size="lg" className="py-40" /></PageWrapper>;
  if (!post) return <PageWrapper title="Not Found"><p className="text-center text-muted py-40">Blog post not found.</p></PageWrapper>;

  return (
    <PageWrapper
      title={post.metaTitle || post.title}
      description={post.metaDescription || post.excerpt}
    >
      {post.coverImage && (
        <div className="w-full max-h-[500px] overflow-hidden">
          <img src={getApiImageUrl(post.coverImage)} alt={post.title} className="w-full h-full object-cover" />
        </div>
      )}

      <article className="py-16 bg-brand">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/blog" className="inline-flex items-center gap-2 text-accent text-sm mb-8 hover:underline">
            <FiArrowLeft /> Back to Blog
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-muted text-sm">{formatDate(post.createdAt)}</span>
            {post.industry && <Badge>{post.industry}</Badge>}
          </div>

          <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-8">{post.title}</h1>

          <div className="prose prose-invert prose-lg max-w-none">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </div>
      </article>

      <GetQuoteCTA />
    </PageWrapper>
  );
}
