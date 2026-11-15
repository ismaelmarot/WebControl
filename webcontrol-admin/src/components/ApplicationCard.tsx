import { useState } from 'react'
import { createClient } from '@/lib/supabase'

type ApplicationCardProps = {
  id: string
  name: string
  slug: string
  enabled: boolean
  updated_at: string
}

export const ApplicationCard = ({ id, name, slug, enabled, updated_at }: ApplicationCardProps) => {
  const [isToggling, setIsToggling] = useState(false)
  const supabase = createClient()

  const toggleEnabled = async () => {
    setIsToggling(true)
    try {
      const { error } = await supabase
        .from('applications')
        .update({ enabled: !enabled, updated_at: new Date().toISOString() })
        .eq('id', id)

      if (error) throw error
    } catch (err) {
      console.error('Error toggling app:', err)
    } finally {
      setIsToggling(false)
    }
  }

  const statusColor = enabled ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-600'
  const statusText = enabled ? 'Activa' : 'Mantenimiento'

  return (
    <div className={`p-4 rounded-lg border transition-shadow hover:shadow-md ${enabled ? 'bg-white' : 'bg-gray-50'}`}>
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded bg-{enabled ? 'green-100' : 'gray-200'} flex items-center justify-center flex-shrink-0">
          {enabled ? '✓' : '⊘'}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium truncate">{name}</h3>
          <p className="text-sm text-gray-500 truncate">{slug}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 text-xs rounded ${statusColor}`}>
            {statusText}
          </span>
          <button
            onClick={toggleEnabled}
            disabled={isToggling}
            className="px-2 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50">
            {isToggling ? 'Cambiando...' : enabled ? 'Desactivar' : 'Activar'}
          </button>
        </div>
      </div>
      <p className="text-caption text-xs text-gray-400 mt-1">
        {updated_at}
      </p>
    </div>
  )
}