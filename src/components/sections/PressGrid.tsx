"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface DisplayArticle {
  slug: string;
  title: string;
  source: string;
  date: string;
  excerpt: string;
  image: string;
  externalUrl?: string;
}

interface PressGridProps {
  articles: DisplayArticle[];
  limit?: number;
}

function PressCardContent({ article }: { article: DisplayArticle }) {
  return (
    <>
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs font-semibold text-crimson bg-crimson/5 px-2.5 py-1 rounded-full">
            {article.source}
          </span>
          <span className="text-xs text-gray-400">
            {new Date(article.date).toLocaleDateString("es-CL", {
              year: "numeric",
              month: "long",
            })}
          </span>
        </div>
        <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-navy mb-2 line-clamp-2 group-hover:text-crimson transition-colors">
          {article.title}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed">
          {article.excerpt}
        </p>
        {article.externalUrl && (
          <span className="inline-flex items-center text-xs text-crimson font-medium mt-3">
            Leer articulo
            <svg className="ml-1 w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </span>
        )}
      </div>
    </>
  );
}

export default function PressGrid({ articles, limit }: PressGridProps) {
  const displayArticles = limit ? articles.slice(0, limit) : articles;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {displayArticles.map((article, index) => (
        <motion.article
          key={article.slug}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
        >
          {article.externalUrl ? (
            <a href={article.externalUrl} target="_blank" rel="noopener noreferrer" className="block">
              <PressCardContent article={article} />
            </a>
          ) : (
            <PressCardContent article={article} />
          )}
        </motion.article>
      ))}
    </div>
  );
}
