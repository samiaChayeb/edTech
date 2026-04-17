'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { GraduationCap, Mail, Lock, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex">
      {/* Left — Branding panel */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-primary-600 via-primary-700 to-violet-700 items-center justify-center p-12">
        <div className="absolute inset-0 dot-pattern opacity-[0.05]" />
        <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-violet-400/10 rounded-full blur-3xl" />
        <div className="relative text-white max-w-md space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center">
              <GraduationCap className="w-7 h-7" />
            </div>
            <span className="text-2xl font-extrabold">EdTech</span>
          </div>
          <h2 className="text-4xl font-extrabold leading-tight">
            Bienvenue !<br />Heureux de vous revoir.
          </h2>
          <p className="text-blue-100/70 text-lg leading-relaxed">
            Accédez à vos cours, classes virtuelles et ressources en un clic.
          </p>
          <div className="flex gap-4 pt-4">
            {[
              { value: '50k+', label: 'Étudiants' },
              { value: '500+', label: 'Professeurs' },
              { value: '10k+', label: 'Cours' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-extrabold">{s.value}</div>
                <div className="text-xs text-blue-200/60">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right — Login form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-extrabold text-gradient">EdTech</span>
          </div>

          <div>
            <h1 className="text-2xl font-extrabold">Connexion</h1>
            <p className="text-muted-foreground mt-1">Entrez vos identifiants pour accéder à votre espace.</p>
          </div>

          {error && (
            <div className="px-4 py-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              id="email"
              type="email"
              label="Email"
              placeholder="vous@exemple.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail className="w-4 h-4" />}
              required
            />
            <Input
              id="password"
              type="password"
              label="Mot de passe"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock className="w-4 h-4" />}
              required
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-input" />
                <span className="text-muted-foreground">Se souvenir de moi</span>
              </label>
              <a href="/auth/forgot-password" className="text-primary-600 dark:text-primary-400 hover:underline font-medium">Mot de passe oublié ?</a>
            </div>

            <Button type="submit" loading={loading} className="w-full shine" size="lg">
              Se connecter <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Pas encore de compte ?{' '}
            <Link href="/auth/register" className="text-primary-600 dark:text-primary-400 hover:underline font-semibold">
              S&apos;inscrire
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
