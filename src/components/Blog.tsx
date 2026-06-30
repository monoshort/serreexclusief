import { blogPosts, brand } from '../data'
import { useScrollReveal } from '../hooks/useScrollReveal'
import SectionHeading from './SectionHeading'

export default function Blog() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>()

  return (
    <section className="py-24 sm:py-28 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-80 h-80 bg-forest/5 rounded-full blur-3xl -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Blog"
          title="Tips & inspiratie"
          description="Alles over serre aanbouwen, veranda's en tuinkamers — van trends tot praktische tips."
          className="mb-14"
        />

        <div
          ref={ref}
          className={`grid md:grid-cols-3 gap-6 lg:gap-8 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {blogPosts.map((post) => (
            <a
              key={post.title}
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-cream rounded-3xl overflow-hidden border border-cream-dark/50 hover:border-gold/30 hover:shadow-xl hover:shadow-gold/5 transition-all duration-500 card-shine"
            >
              <div className="relative aspect-[16/10] overflow-hidden img-overlay">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl text-forest font-semibold mb-2 group-hover:text-forest-light transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-charcoal/60 leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-gold group-hover:gap-3 transition-all">
                  Lees verder
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H7" />
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href={`${brand.website}/blog`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-forest/70 hover:text-gold transition-colors text-sm font-medium"
          >
            Alle blogartikelen op serreexclusief.nl
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}