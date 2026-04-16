'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { coursesApi } from '@/lib/api';
import { ThemeProvider, useTheme } from '@/lib/theme-provider';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { CourseCardSkeleton } from '@/components/ui/skeleton';
import {
  GraduationCap, BookOpen, Users, LayoutDashboard, LogOut,
  Plus, Sun, Moon, Search, Bell, ChevronRight, Play,
} from 'lucide-react';

function ThemeToggle() {
  const { resolved, setTheme } = useTheme();
  return (
    <button
      onClick={() => setTheme(resolved === 'dark' ? 'light' : 'dark')}
      className="h-9 w-9 rounded-lg border border-border bg-card flex items-center justify-center hover:bg-accent transition-colors"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </button>
  );
}

const navItems = [
  { icon: LayoutDashboard, label: 'Cours', href: '/dashboard' },
  { icon: Users, label: 'Classes', href: '/dashboard/classrooms' },
];

function DashboardContent() {
  const { user, token, logout, loading: authLoading } = useAuth();
  const router = useRouter();
  const [courses, setCourses] = useState<any[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!authLoading && !user) router.push('/auth/login');
  }, [authLoading, user, router]);

  useEffect(() => {
    if (token) {
      coursesApi.list(token)
        .then(setCourses)
        .catch(() => {})
        .finally(() => setLoadingCourses(false));
    }
  }, [token]);

  if (authLoading || !user) return null;

  const filtered = courses.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r border-border bg-card p-4">
        <Link href="/dashboard" className="flex items-center gap-2.5 px-3 mb-8">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-extrabold text-gradient">EdTech</span>
        </Link>

        <nav className="space-y-1 flex-1">
          {navItems.map(({ icon: Icon, label, href }) => {
            const active = href === '/dashboard';
            return (
              <Link key={href} href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  active ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                }`}>
                <Icon className="w-4.5 h-4.5" />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border pt-4 space-y-3">
          <div className="flex items-center gap-3 px-3">
            <Avatar fallback={user.firstName[0] + user.lastName[0]} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{user.firstName} {user.lastName}</p>
              <p className="text-xs text-muted-foreground">{user.role === 'STUDENT' ? 'Étudiant' : user.role === 'PROFESSOR' ? 'Professeur' : 'Admin'}</p>
            </div>
          </div>
          <button onClick={logout} className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors w-full">
            <LogOut className="w-4 h-4" /> Déconnexion
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="h-16 border-b border-border bg-card/80 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            {/* Mobile logo */}
            <Link href="/dashboard" className="md:hidden flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-white" />
              </div>
            </Link>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher un cours..."
                className="pl-9 pr-4 h-9 w-72 rounded-xl border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative h-9 w-9 rounded-lg border border-border bg-card flex items-center justify-center hover:bg-accent transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive text-[10px] text-white flex items-center justify-center font-bold">3</span>
            </button>
            <ThemeToggle />
            {/* Mobile nav */}
            <div className="md:hidden flex items-center gap-2">
              {navItems.map(({ icon: Icon, href }) => (
                <Link key={href} href={href} className="h-9 w-9 rounded-lg border border-border flex items-center justify-center hover:bg-accent transition-colors">
                  <Icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
          {/* Welcome */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-extrabold">Bonjour, {user.firstName} 👋</h1>
              <p className="text-muted-foreground mt-1">Voici vos cours disponibles.</p>
            </div>
            {(user.role === 'PROFESSOR' || user.role === 'ADMIN') && (
              <Link href="/dashboard/courses/new">
                <Button className="shine">
                  <Plus className="w-4 h-4" /> Nouveau cours
                </Button>
              </Link>
            )}
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Cours', value: courses.length, icon: BookOpen, color: 'text-blue-500 bg-blue-50 dark:bg-blue-500/10' },
              { label: 'En cours', value: courses.filter(c => c.status === 'PUBLISHED').length, icon: Play, color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10' },
              { label: 'Leçons', value: courses.reduce((acc, c) => acc + (c._count?.lessons || 0), 0), icon: GraduationCap, color: 'text-violet-500 bg-violet-50 dark:bg-violet-500/10' },
              { label: 'Étudiants', value: '—', icon: Users, color: 'text-amber-500 bg-amber-50 dark:bg-amber-500/10' },
            ].map(({ label, value, icon: Icon, color }) => (
              <Card key={label} className="p-4 flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-extrabold">{value}</p>
                  <p className="text-xs text-muted-foreground">{label}</p>
                </div>
              </Card>
            ))}
          </div>

          {/* Courses grid */}
          {loadingCourses ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[...Array(6)].map((_, i) => <CourseCardSkeleton key={i} />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((course) => (
                <Link key={course.id} href={`/dashboard/courses/${course.id}`}>
                  <Card hover className="overflow-hidden group">
                    {/* Thumbnail */}
                    <div className="h-40 bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-500/20 dark:to-accent-500/20 relative">
                      {course.thumbnail && (
                        <img src={course.thumbnail} alt="" className="w-full h-full object-cover" loading="lazy" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <Badge variant="secondary" className="absolute top-3 left-3 text-[10px]">
                        {course.status === 'PUBLISHED' ? '🟢 Publié' : '📝 Brouillon'}
                      </Badge>
                    </div>
                    <div className="p-5 space-y-3">
                      <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-1">{course.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
                      <div className="flex items-center justify-between pt-2 border-t border-border">
                        <span className="text-primary font-bold">{course.price}€</span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <BookOpen className="w-3 h-3" /> {course._count?.lessons || 0} leçons
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
              {filtered.length === 0 && (
                <div className="col-span-full text-center py-16">
                  <BookOpen className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-muted-foreground">Aucun cours trouvé.</p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ThemeProvider>
      <DashboardContent />
    </ThemeProvider>
  );
}
