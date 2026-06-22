import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import App from '../App';

const Game = lazy(() => import('../pages/Game'));
const Stats = lazy(() => import('../pages/Stats'));
const Achievements = lazy(() => import('../pages/Achievements'));

function PageFallback() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="h-10 w-10 rounded-full border-4 border-nexus-primary/30 border-t-nexus-primary animate-spin" />
    </div>
  );
}

function lazyRoute(Component: React.ComponentType) {
  return (
    <Suspense fallback={<PageFallback />}>
      <Component />
    </Suspense>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: lazyRoute(Game) },
      { path: 'stats', element: lazyRoute(Stats) },
      { path: 'achievements', element: lazyRoute(Achievements) },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
