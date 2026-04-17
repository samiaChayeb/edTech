'use client';
import { ReactNode } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

interface AuthCardProps {
  children: ReactNode;
  title: string;
  description?: string;
  icon?: ReactNode;
  step?: number;
  totalSteps?: number;
  backLink?: string;
}

export function AuthCard({
  children,
  title,
  description,
  icon,
  step = 1,
  totalSteps = 2,
  backLink = '/auth/login',
}: AuthCardProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center p-4 will-change-transform">
      <Card className="w-full max-w-md shadow-2xl border-0 overflow-hidden">
        {/* Accent bar */}
        <div className="h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600" />

        <div className="p-8 space-y-8">
          {/* Step indicator */}
          {totalSteps > 1 && (
            <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
              <div
                className="flex-1 h-1 bg-indigo-600 rounded-full"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
              <span className="px-3 py-1 font-medium">
                Étape {step}/{totalSteps}
              </span>
              <div className="flex-1 h-1 bg-muted-foreground/20 rounded-full" />
            </div>
          )}

          {/* Header */}
          <div className="flex flex-col items-center space-y-4">
            {icon && (
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-950/50 dark:to-purple-950/50 rounded-2xl flex items-center justify-center shadow-sm">
                {icon}
              </div>
            )}

            <div className="text-center space-y-3">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
                {title}
              </h1>
              {description && (
                <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                  {description}
                </p>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">{children}</div>

          {/* Footer */}
          {backLink && (
            <div className="pt-6 border-t border-border/50">
              <Link
                href={backLink}
                className="flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
                Retour
              </Link>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
