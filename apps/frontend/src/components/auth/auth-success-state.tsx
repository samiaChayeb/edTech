'use client';
import { ReactNode } from 'react';
import { CheckCircle2, Mail } from 'lucide-react';

interface AuthSuccessStateProps {
  title: string;
  message: string;
  email?: string;
  infoTitle?: string;
  infoMessage?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  icon?: ReactNode;
}

export function AuthSuccessState({
  title,
  message,
  email,
  infoTitle,
  infoMessage,
  action,
  icon,
}: AuthSuccessStateProps) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col items-center space-y-6">
        {/* Success icon */}
        <div className="w-20 h-20 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/40 dark:to-emerald-950/40 rounded-full flex items-center justify-center border-2 border-green-200 dark:border-green-800 shadow-sm">
          {icon || (
            <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400 animate-bounce" style={{ animationDelay: '0s', animationDuration: '2s' }} />
          )}
        </div>

        {/* Content */}
        <div className="text-center space-y-3">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">{title}</h2>
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            {message}
            {email && (
              <>
                <br />
                <span className="font-semibold text-slate-900 dark:text-slate-100 break-all">{email}</span>
              </>
            )}
          </p>
        </div>

        {/* Info box */}
        {infoTitle && infoMessage && (
          <div className="w-full bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50 rounded-xl p-5 space-y-3">
            <div className="flex gap-3">
              <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="space-y-2 text-sm">
                <p className="font-semibold text-blue-900 dark:text-blue-100">{infoTitle}</p>
                <p className="text-blue-800 dark:text-blue-200 leading-relaxed">{infoMessage}</p>
              </div>
            </div>
          </div>
        )}

        {/* Action button */}
        {action && (
          <button
            onClick={action.onClick}
            className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors duration-200 mt-4"
          >
            {action.label}
          </button>
        )}
      </div>
    </div>
  );
}
