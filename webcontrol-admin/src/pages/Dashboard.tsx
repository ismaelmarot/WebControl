import { useEffect, useState } from 'react'
import { useSupabaseClient } from '@supabase/ssr'
import { ApplicationCard } from '@/components/ApplicationCard'

export const Dashboard = () => {
  const [apps, setApps] = useState<ApplicationCardProps[]>([])
  const [loaded, setLoaded] = useState(false)
  const supabase = useSupabaseClient()

  useEffect(() => {
    supabase.from('applications').select('*').then(({ data, error }) => {
      if (error) {
        console.error('Error fetching apps:', error)
      } else {
        setApps(data as ApplicationCardProps[])
      }
      setLoaded(true)
    })
  }, [supabase])

  if (!loaded) {
    return <div>Cargando aplicaciones...</div>
  }

  if (apps.length === 0) {
    return (
      <div className="text-center py-8">
        <p>No hay aplicaciones registradas</p>
        <button
          onClick={() =>
            window.location.href = '/admin/apps/new'
          }
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Agregar aplicación
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {apps.map((app) => (
          <ApplicationCard key={app.id} app={app} />
        ))}
      </div>
    </div>
  )
}