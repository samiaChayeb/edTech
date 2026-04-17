'use client';
import { useState, useCallback } from 'react';
import { Mail, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AuthCard, AuthAlert, AuthSuccessState } from '@/components/auth';
import { authApi } from '@/lib/api';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError('');
      setLoading(true);

      try {
        await authApi.forgotPassword(email);
        setSubmitted(true);
      } catch (err: any) {
        setError(err.message || 'Erreur lors de l\'envoi de l\'email');
      } finally {
        setLoading(false);
      }
    },
    [email]
  );

  const handleReset = useCallback(() => {
    setSubmitted(false);
    setEmail('');
    setError('');
  }, []);

  return (
    <AuthCard
      title="Réinitialiser mot de passe"
      description="Entrez votre email pour recevoir un lien de réinitialisation"
      icon={<Mail className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />}
      step={1}
      backLink="/auth/login"
    >
      {submitted ? (
        <AuthSuccessState
          title="Email envoyé !"
          message="Consultez votre inbox pour trouver le lien"
          email={email}
          infoTitle="Lien valide 60 minutes"
          infoMessage="Vérifiez vos spams si vous ne recevez rien"
          action={{
            label: 'Utiliser un autre email',
            onClick: handleReset,
          }}
        />
      ) : (
        <>
          {error && (
            <AuthAlert
              type="error"
              title="Erreur"
              message={error}
            />
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="email"
              label="Adresse email"
              placeholder="vous@exemple.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail className="w-5 h-5" />}
              required
              autoComplete="email"
              autoFocus
            />

            <Button
              type="submit"
              disabled={loading || !email.trim()}
              className="w-full h-12 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 dark:from-indigo-600 dark:to-indigo-700 dark:hover:from-indigo-700 dark:hover:to-indigo-800 text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  <span>Envoi en cours...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Envoyer le lien</span>
                </>
              )}
            </Button>
          </form>
        </>
      )}
    </AuthCard>
  );
}
