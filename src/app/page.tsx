import { Suspense } from 'react';
import HomePageClient from './_components/HomePageClient';
import NewsSkeleton from './_components/NewsSkeleton';

function HomeFallback() {
  return (
    <main className="min-h-screen bg-page-gradient pb-16">
      <div className="container pt-8 md:pt-12">
        {Array.from({ length: 5 }, (_, index) => (
          <NewsSkeleton key={`initial-skeleton-${index + 1}`} />
        ))}
      </div>
    </main>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<HomeFallback />}>
      <HomePageClient />
    </Suspense>
  );
}
