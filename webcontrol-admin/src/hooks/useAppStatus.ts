import { useSupabaseClient } from '@supabase/ssr'

type UseAppStatusReturn = {
  enabled: boolean | null
  loading: boolean
  error: Error | null
}

export const useAppStatus = (slug: string): UseAppStatusReturn => {
  const supabase = useSupabaseClient()
  const [enabled, setEnabled] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const { data, error: supaError } = await supabase
          .from('applications')
          .select('enabled')
          .eq('slug', slug)
          .single()

        if (supaError) {
          setError(supaError)
          setEnabled(null)
          setLoading(false)
          // Fail-closed: if we can't query, show maintenance
          return
        }

        setEnabled(data?.enabled ?? null)
      } catch (err: any) {
        console.error('Error fetching app status:', err)
        setError(err)
        setEnabled(null)
      } finally {
        setLoading(false)
      }
    }

    fetchStatus()
  }, [supabase, slug])

  return { enabled, loading, error }
}