'use client';

import { memo } from 'react';
import { BlogPostContentProps } from '../../types';
import { cn } from '@/lib/utils';

export const BlogPostContent = memo<BlogPostContentProps>(({
  post,
  className
}) => {
  return (
    <div className={cn('blog-content text-lg leading-relaxed text-gray-700', className)}>
      <style jsx global>{`
        /* Main headings with clear hierarchy */
        .blog-content h1 {
          font-size: 2.5rem;
          line-height: 1.2;
          font-weight: 800;
          margin-top: 3.5rem;
          margin-bottom: 1.5rem;
          color: rgb(17, 24, 39);
          position: relative;
          padding-bottom: 0.75rem;
          border-bottom: 4px solid;
          border-image: linear-gradient(90deg, rgb(239, 68, 68), rgb(236, 72, 153)) 1;
        }
        
        .blog-content h1:first-child {
          margin-top: 0;
        }
        
        .blog-content h2 {
          font-size: 2rem;
          line-height: 1.3;
          font-weight: 700;
          margin-top: 3rem;
          margin-bottom: 1.25rem;
          color: rgb(17, 24, 39);
          position: relative;
          padding-left: 1rem;
          border-left: 4px solid rgb(239, 68, 68);
        }
        
        .blog-content h2:first-child {
          margin-top: 0;
        }
        
        .blog-content h3 {
          font-size: 1.5rem;
          line-height: 1.4;
          font-weight: 600;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          color: rgb(31, 41, 55);
          position: relative;
        }
        
        .blog-content h3:first-child {
          margin-top: 0;
        }
        
        .blog-content h3::before {
          content: '▶';
          color: rgb(239, 68, 68);
          margin-right: 0.5rem;
          font-size: 0.75em;
        }
        
        .blog-content h4 {
          font-size: 1.25rem;
          line-height: 1.5;
          font-weight: 600;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          color: rgb(55, 65, 81);
        }
        
        .blog-content h5 {
          font-size: 1rem;
          line-height: 1.5;
          font-weight: 600;
          margin-top: 1.75rem;
          margin-bottom: 0.5rem;
          color: rgb(55, 65, 81);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .blog-content h6 {
          font-size: 0.875rem;
          line-height: 1.5;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
          color: rgb(75, 85, 99);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        
        /* Enhanced paragraph spacing */
        .blog-content p {
          margin-top: 1.75rem;
          margin-bottom: 1.75rem;
          line-height: 1.8;
          color: rgb(55, 65, 81);
        }
        
        .blog-content p:first-child {
          margin-top: 0;
        }
        
        .blog-content p:last-child {
          margin-bottom: 0;
        }
        
        /* Enhanced links */
        .blog-content a {
          color: rgb(220, 38, 38);
          text-decoration: none;
          font-weight: 500;
          border-bottom: 2px solid transparent;
          transition: all 0.2s ease;
          padding: 2px 4px;
          margin: 0 -2px;
          border-radius: 3px;
        }
        
        .blog-content a:hover {
          color: rgb(185, 28, 28);
          border-bottom-color: rgb(252, 165, 165);
          background-color: rgb(254, 242, 242);
        }
        
        /* Enhanced images */
        .blog-content img {
          border-radius: 1rem;
          margin: 2.5rem auto;
          max-width: 100%;
          height: auto;
          width: auto;
          display: block;
          object-fit: contain;
          transition: transform 0.3s ease;
        }
        
        .blog-content img:hover {
          transform: translateY(-2px) scale(1.01);
        }
        
        /* Ensure images in figures also maintain aspect ratio */
        .blog-content figure {
          margin: 2.5rem 0;
          text-align: center;
        }
        
        .blog-content figure img {
          margin: 0 auto;
        }
        
        .blog-content figcaption {
          margin-top: 1rem;
          font-size: 0.875rem;
          color: rgb(107, 114, 128);
          font-style: italic;
          text-align: center;
        }
        
        /* Enhanced blockquotes */
        .blog-content blockquote {
          border-left: 4px solid rgb(239, 68, 68);
          background: linear-gradient(90deg, rgb(254, 242, 242), rgb(253, 242, 248));
          border-radius: 0 1rem 1rem 0;
          padding: 1.5rem 2rem;
          margin: 2.5rem 0;
          position: relative;
          font-style: italic;
          font-size: 1.125rem;
        }
        
        .blog-content blockquote::before {
          content: '"';
          font-size: 4rem;
          color: rgb(252, 165, 165);
          position: absolute;
          top: -0.5rem;
          left: 1rem;
          line-height: 1;
          font-family: Georgia, serif;
        }
        
        .blog-content blockquote p {
          margin: 0;
          padding-left: 2rem;
          position: relative;
          z-index: 1;
        }
        
        /* Enhanced code */
        .blog-content code {
          background: rgb(243, 244, 246);
          color: rgb(185, 28, 28);
          padding: 0.25rem 0.5rem;
          border-radius: 0.375rem;
          font-size: 0.875em;
          font-weight: 600;
          border: 1px solid rgb(229, 231, 235);
        }
        
        .blog-content pre {
          background: rgb(17, 24, 39);
          border-radius: 1rem;
          padding: 2rem;
          overflow-x: auto;
          margin: 2.5rem 0;
          border: 1px solid rgb(75, 85, 99);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        
        .blog-content pre code {
          background: none;
          color: rgb(229, 231, 235);
          padding: 0;
          border: none;
          font-weight: normal;
          font-size: 0.875rem;
        }
        
        /* Enhanced lists */
        .blog-content ul,
        .blog-content ol {
          margin: 2rem 0;
          padding-left: 0;
        }
        
        .blog-content li {
          margin: 0.75rem 0;
          padding-left: 2rem;
          position: relative;
        }
        
        .blog-content ul li::before {
          content: '';
          position: absolute;
          left: 0.5rem;
          top: 0.75rem;
          width: 6px;
          height: 6px;
          background: rgb(239, 68, 68);
          border-radius: 50%;
        }
        
        .blog-content ol {
          counter-reset: list-counter;
        }
        
        .blog-content ol li {
          counter-increment: list-counter;
        }
        
        .blog-content ol li::before {
          content: counter(list-counter);
          position: absolute;
          left: 0;
          top: 0;
          color: rgb(220, 38, 38);
          font-weight: 600;
          font-size: 0.875rem;
          width: 1.5rem;
          text-align: center;
        }
        
        /* Enhanced horizontal rules */
        .blog-content hr {
          border: none;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgb(209, 213, 219), transparent);
          margin: 3rem 0;
        }
        
        /* Enhanced tables */
        .blog-content table {
          margin: 2.5rem 0;
          border-collapse: collapse;
          border-radius: 0.75rem;
          overflow: hidden;
          width: 100%;
        }
        
        .blog-content th {
          background: rgb(249, 250, 251);
          font-weight: 600;
          padding: 1rem;
          text-align: left;
        }
        
        .blog-content td {
          padding: 1rem;
          border-top: 1px solid rgb(229, 231, 235);
        }
        
        .blog-content tbody tr:hover {
          background: rgb(249, 250, 251);
        }
      `}</style>
      
      <div 
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
    </div>
  );
});

BlogPostContent.displayName = 'BlogPostContent';