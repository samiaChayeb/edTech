'use client';
import { Mail, AlertCircle, CheckCircle2 } from 'lucide-react';

interface AuthAlertProps {
  type: 'success' | 'error' | 'info';
  title?: string;
  message: string;
  details?: string;
}

export function AuthAlert({ type, title, message, details }: AuthAlertProps) {
  const styles = {
    success: {
      container: 'bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800/50',
      icon: 'text-green-600 dark:text-green-400',
      title: 'text-green-900 dark:text-green-100',
      text: 'text-green-800 dark:text-green-200',
      Icon: CheckCircle2,
    },
    error: {
      container: 'bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50',
      icon: 'text-red-600 dark:text-red-400',
      title: 'text-red-900 dark:text-red-100',
      text: 'text-red-800 dark:text-red-200',
      Icon: AlertCircle,
    },
    info: {
      container: 'bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50',
      icon: 'text-blue-600 dark:text-blue-400',
      title: 'text-blue-900 dark:text-blue-100',
      text: 'text-blue-800 dark:text-blue-200',
      Icon: Mail,
    },
  };

  const style = styles[type];
  const Icon = style.Icon;

  return (
    <div className={`flex gap-3 ${style.container} rounded-lg p-4 animate-in fade-in slide-in-from-top-2 duration-300`}>
      <Icon className={`w-5 h-5 ${style.icon} flex-shrink-0 mt-0.5`} />
      <div className="space-y-1 flex-1">
        {title && <p className={`text-sm font-semibold ${style.title}`}>{title}</p>}
        <p className={`text-sm ${style.text}`}>{message}</p>
        {details && <p className={`text-xs ${style.text} mt-2`}>{details}</p>}
      </div>
    </div>
  );
}
