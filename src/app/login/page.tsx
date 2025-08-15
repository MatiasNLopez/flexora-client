'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import TextInput from '@/components/iu/inputs/TextInput';
import Checkbox from '@/components/iu/inputs/Checkbox';
import { IMAGES } from '@/lib/constants';

export default function LoginPage() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(credentials);
      router.push('/dashboard');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Error al iniciar sesión';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center">
          <div className="inline-flex items-center gap-2">
            <Image src={IMAGES.FLEXORA_LOGO} width={32} height={32} alt="Flexora" />
            <span className="text-2xl font-semibold text-gray-900">Flexora</span>
          </div>
          <h1 className="mt-6 text-xl font-medium text-gray-900">Accede a tu cuenta</h1>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <TextInput
            label="Email or username"
            id="username"
            name="username"
            type="text"
            required
            placeholder="Enter email or username"
            value={credentials.username}
            onChange={handleChange}
          />

          <TextInput
            label="Password"
            id="password"
            name="password"
            type="password"
            required
            placeholder="Enter your password"
            value={credentials.password}
            onChange={handleChange}
          />

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          <div className="flex items-center justify-between text-sm">
            <Checkbox
              label="Remember me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.currentTarget.checked)}
            />
            <Link href="#" className="text-indigo-600 hover:text-indigo-700">Forgot password?</Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-indigo-600 py-2.5 text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isLoading ? 'Iniciando sesión...' : 'Login'}
          </button>

          <p className="text-center text-sm text-gray-600">
            Don’t have an account?{' '}
            <Link href="#" className="text-indigo-600 hover:text-indigo-700">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
} 