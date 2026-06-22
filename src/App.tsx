import { Outlet } from 'react-router'

/**
 * Root layout rendered by the router. Child routes (Game, Stats, Achievements)
 * render through the <Outlet />.
 */
export default function App() {
  return (
    <div className="min-h-screen bg-nexus-bg text-white">
      <Outlet />
    </div>
  )
}
