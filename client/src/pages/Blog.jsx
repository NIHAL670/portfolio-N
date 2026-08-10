import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageWrapper } from '../components/layout/PageWrapper';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Badge } from '../components/ui/Badge';
import { Spinner } from '../components/ui/Spinner';
import { GetQuoteCTA } from '../components/home/GetQuoteCTA';
import { getBlogPosts } from '../services/api';
import { formatDate, getApiImageUrl, truncate } from '../utils/helpers';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await getBlogPosts();
        setPosts(data);
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <PageWrapper title="Blog" description="Read insights, tips, and strategies to grow your business online.">
      <section className="py-16 md:py-24 bg-brand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Blog" subtitle="Insights, tips, and strategies to grow your business online." />

          {loading ? (
            <Spinner size="lg" className="py-20" />
          ) : posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link
                  key={post._id}
                  to={`/blog/${post.slug}`}
                  className="group rounded-2xl overflow-hidden bg-surface border border-white/5 hover:border-accent/30 transition-all duration-300"
                >
                  {post.coverImage && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={getApiImageUrl(post.coverImage)}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-muted text-xs">{formatDate(post.createdAt)}</span>
                      {post.industry && <Badge>{post.industry}</Badge>}
                    </div>
                    <h3 className="text-white font-heading font-semibold mb-2 group-hover:text-accent transition-colors">{post.title}</h3>
                    <p className="text-muted text-sm mb-3">{truncate(post.excerpt)}</p>
                    <span className="text-accent text-sm font-medium">Read More →</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted py-20">No blog posts yet. Check back soon!</p>
          )}
        </div>
      </section>

      <GetQuoteCTA />
    </PageWrapper>
  );
}
