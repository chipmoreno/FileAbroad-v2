import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogIndexLayout from '@/components/blog/BlogIndexLayout';
import { getAllPosts } from '@/lib/blog';

const PAGE_SIZE = 9;

export function generateStaticParams() {
  const totalPages = Math.ceil(getAllPosts().length / PAGE_SIZE);
  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, index) => ({
    page: String(index + 2),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }): Promise<Metadata> {
  const { page } = await params;
  return {
    title: `Expat Tax Articles – Page ${page}`,
    description: `Browse page ${page} of FileAbroad's educational U.S. tax articles for Americans living abroad.`,
    alternates: { canonical: `https://fileabroad.com/blog/page/${page}` },
  };
}

export default async function PaginatedBlogPage({ params }: { params: Promise<{ page: string }> }) {
  const { page: pageParam } = await params;
  const page = Number(pageParam);
  const totalPages = Math.ceil(getAllPosts().length / PAGE_SIZE);
  if (!Number.isInteger(page) || page < 2 || page > totalPages) notFound();

  return <BlogIndexLayout initialPage={page} />;
}
