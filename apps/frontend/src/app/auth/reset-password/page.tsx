'use client';
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Lock, ArrowLeft, CheckCircle2, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { authApi } from '@/lib/api';

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const passwordStrength = () => {
    if (password.length === 0) return 0;
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[!@#$%^&*]/.test(password)) strength++;
    return strength;
  };

  const strength = passwordStrength();
  const strengthColor = strength <= 1 ? 'red' : strength === 2 ? 'yellow' : strength === 3 ? 'blue' : 'green';

  useEffect(() => {
    if (!token) {
      setError('Token invalide ou manquant');
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères');
      return;
    }

    setLoading(true);
    try {
      if (!token) throw new Error('Token invalide');
      await authApi.resetPassword(token, password);
      setSuccess(true);
      setTimeout(() => router.push('/auth/login'), 3000);
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la réinitialisation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        {/* Header */}
        <div className="space-y-6">
          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/30"></div>
            <span>Étape 2 sur 2</span>
            <div className="h-1.5 w-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400"></div>
          </div>

          {/* Logo & Title */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition"></div>
              <div className="relative w-14 h-14 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Lock className="w-7 h-7 text-white" />
              </div>
            </div>

            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Créer un nouveau mot de passe
              </h1>
              <p className="text-sm text-muted-foreground max-w-sm">
                Choisissez un mot de passe fort et unique pour sécuriser votre compte.
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mt-10 space-y-7">
          {success ? (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col items-center space-y-5">
                <div className="relative w-20 h-20">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full blur-xl opacity-40"></div>
                  <div className="relative w-full h-full bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-full flex items-center justify-center border-2 border-green-200 dark:border-green-800">
                    <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
                  </div>
                </div>

                <div className="text-center space-y-3">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                    Mot de passe réinitialisé !
                  </h2>
                  <p className="text-base text-slate-600 dark:text-slate-400">
                    Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <>
              {error && (
                <div className="flex gap-3 bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/40 dark:to-rose-950/40 border border-red-200 dark:border-red-800/50 rounded-xl p-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-red-900 dark:text-red-100">
                      Erreur
                    </p>
                    <p className="text-sm text-red-800 dark:text-red-200">
                      {error}
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-7">
                {/* Password input */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-slate-900 dark:text-slate-100 block">
                    Nouveau mot de passe
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500 pointer-events-none transition-colors group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full pl-12 pr-12 py-3.5 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-indigo-600 dark:focus:border-indigo-500 focus:ring-0 transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-900 dark:text-slate-100"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-400 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  {/* Password strength indicator */}
                  {password && (
                    <div className="space-y-2 pt-1">
                      <div className="flex gap-1.5">
                        {[0, 1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                              i < strength
                                ? strengthColor === 'red'
                                  ? 'bg-red-500 dark:bg-red-400'
                                  : strengthColor === 'yellow'
                                    ? 'bg-yellow-500 dark:bg-yellow-400'
                                    : strengthColor === 'blue'
                                      ? 'bg-blue-500 dark:bg-blue-400'
                                      : 'bg-green-500 dark:bg-green-400'
                                : 'bg-slate-200 dark:bg-slate-700'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                        Force: <span className={strengthColor === 'red' ? 'text-red-600 dark:text-red-400' : strengthColor === 'yellow' ? 'text-yellow-600 dark:text-yellow-400' : strengthColor === 'blue' ? 'text-blue-600 dark:text-blue-400' : 'text-green-600 dark:text-green-400'}>
                          {strength === 0 ? 'Faible' : strength === 1 ? 'Faible' : strength === 2 ? 'Moyen' : strength === 3 ? 'Bon' : 'Très bon'}
                        </span>
                      </p>
                    </div>
                  )}
                </div>

                {/* Confirm password input */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-slate-900 dark:text-slate-100 block">
                    Confirmer le mot de passe
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500 pointer-events-none transition-colors group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="w-full pl-12 pr-12 py-3.5 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-indigo-600 dark:focus:border-indigo-500 focus:ring-0 transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-900 dark:text-slate-100"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-400 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  {/* Match indicator */}
                  {confirmPassword && password && (
                    <p className={`text-xs font-semibold mt-2 flex items-center gap-1.5 ${password === confirmPassword ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${password === confirmPassword ? 'bg-green-600 dark:bg-green-400' : 'bg-red-600 dark:bg-red-400'}`}></div>
                      {password === confirmPassword ? '✓ Les mots de passe correspondent' : '✕ Les mots de passe ne correspondent pas'}
                    </p>
                  )}
                </div>

                {/* Submit button */}
                <Button
                  type="submit"
                  disabled={loading || !token || password !== confirmPassword || password.length < 8}
                  className="w-full h-12 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 dark:from-indigo-600 dark:to-indigo-700 dark:hover:from-indigo-700 dark:hover:to-indigo-800 text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      <span>Réinitialisation...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Réinitialiser le mot de passe</span>
                    </>
                  )}
                </Button>
              </form>

              {/* Password requirements */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-800/30 rounded-xl p-5 space-y-3">
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                  📋 Critères de mot de passe
                </p>
                <ul className="space-y-2.5 text-sm">
                  <li className={`flex items-center gap-3 transition-colors ${password.length >= 8 ? 'text-green-600 dark:text-green-400 font-medium' : 'text-slate-600 dark:text-slate-400'}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${password.length >= 8 ? 'bg-green-600 dark:bg-green-400' : 'bg-slate-300 dark:bg-slate-600'}`}></div>
                    Au moins 8 caractères
                  </li>
                  <li className={`flex items-center gap-3 transition-colors ${/[a-z]/.test(password) && /[A-Z]/.test(password) ? 'text-green-600 dark:text-green-400 font-medium' : 'text-slate-600 dark:text-slate-400'}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${/[a-z]/.test(password) && /[A-Z]/.test(password) ? 'bg-green-600 dark:bg-green-400' : 'bg-slate-300 dark:bg-slate-600'}`}></div>
                    Mélanger majuscules et minuscules
                  </li>
                  <li className={`flex items-center gap-3 transition-colors ${/[0-9]/.test(password) ? 'text-green-600 dark:text-green-400 font-medium' : 'text-slate-600 dark:text-slate-400'}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${/[0-9]/.test(password) ? 'bg-green-600 dark:bg-green-400' : 'bg-slate-300 dark:bg-slate-600'}`}></div>
                    Inclure des chiffres
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {!success && (
          <div className="mt-8 pt-6 border-t border-border/50 flex items-center justify-center">
            <Link
              href="/auth/login"
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour à la connexion
            </Link>
          </div>
        )}
      </Card>
    </div>
  );
}
