'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GraduationCap, Mail, Lock, User, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '', firstName: '', lastName: '', role: 'STUDENT' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (key: string) => (e: any) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(form);
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
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-violet-600 via-primary-700 to-primary-600 items-center justify-center p-12">
        <div className="absolute inset-0 dot-pattern opacity-[0.05]" />
        <div className="absolute top-20 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="relative text-white max-w-md space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center">
              <GraduationCap className="w-7 h-7" />
            </div>
            <span className="text-2xl font-extrabold">EdTech</span>
          </div>
          <h2 className="text-4xl font-extrabold leading-tight">
            Rejoignez la<br />communauté EdTech !
          </h2>
          <p className="text-blue-100/70 text-lg leading-relaxed">
            Créez votre compte et accédez à des milliers de cours, classes virtuelles et ressources éducatives.
          </p>
          <div className="space-y-3 pt-4">
            {['Accès gratuit à 10 cours', 'Classes virtuelles interactives', 'Communauté d\'entraide'].map((item) => (
              <div key={item} className="flex items-center gap-3 text-blue-100/80">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right — Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <div className="w-full max-w-md space-y-8">
          <div className="lg:hidden flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-extrabold text-gradient">EdTech</span>
          </div>

          <div>
            <h1 className="text-2xl font-extrabold">Créer un compte</h1>
            <p className="text-muted-foreground mt-1">Inscrivez-vous gratuitement en quelques secondes.</p>
          </div>

          {error && (
            <div className="px-4 py-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                id="firstName"
                label="Prénom"
                placeholder="Jean"
                value={form.firstName}
                onChange={set('firstName')}
                icon={<User className="w-4 h-4" />}
                required
              />
              <Input
                id="lastName"
                label="Nom"
                placeholder="Dupont"
                value={form.lastName}
                onChange={set('lastName')}
                required
              />
            </div>
            <Input
              id="email"
              type="email"
              label="Email"
              placeholder="vous@exemple.com"
              value={form.email}
              onChange={set('email')}
              icon={<Mail className="w-4 h-4" />}
              required
            />
            <Input
              id="password"
              type="password"
              label="Mot de passe"
              placeholder="Minimum 8 caractères"
              value={form.password}
              onChange={set('password')}
              icon={<Lock className="w-4 h-4" />}
              required
            />

            <div className="space-y-1.5">
              <label className="text-sm font-medium">Vous êtes</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'STUDENT', label: 'Étudiant', icon: '🎓' },
                  { value: 'PROFESSOR', label: 'Professeur', icon: '👨‍🏫' },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setForm(f => ({ ...f, role: opt.value }))}
                    className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-sm font-medium ${
                      form.role === opt.value
                        ? 'border-primary bg-primary/5 text-foreground'
                        : 'border-border hover:border-primary/30 text-muted-foreground'
                    }`}
                  >
                    <span className="text-lg">{opt.icon}</span>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <Button type="submit" loading={loading} className="w-full shine" size="lg">
              S&apos;inscrire <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Déjà inscrit ?{' '}
            <Link href="/auth/login" className="text-primary-600 dark:text-primary-400 hover:underline font-semibold">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
