import { useEffect, useState } from 'react'
import { useSupabaseClient } from '@supabase/ssr'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
  const supabase = useSupabaseClient()
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const { data: { session} } = supabase.auth.getSession()

    if (session) {
      navigate('/')
    }
  }, [supabase, navigate])

  const login = async () => {
    setError(null)
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
    } else {
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Panel de Administración</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-800 rounded">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={e => { e.preventDefault(); login() }}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              id="email"
              email
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="tu@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              id="password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium"
          >
            Iniciar sesión
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-500 text-center">
          ¿No tienes cuenta? <a href="#" className="text-blue-600 hover underline">Regístrate</a>
        </p>
      </div>
    </div>
  )
}