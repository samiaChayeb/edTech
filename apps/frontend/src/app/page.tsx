'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ThemeProvider, useTheme } from '@/lib/theme-provider';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  BookOpen, GraduationCap, Users, Play, MessageCircle, BarChart3,
  FileText, Mic, ChevronDown, ChevronRight, Star, Check, ArrowRight,
  Sun, Moon, Zap, Globe, Shield, Clock, Menu, X, Sparkles,
} from 'lucide-react';

/* ═══════════ DATA ═══════════ */
const stats = [
  { icon: Users, value: '50k+', label: 'Étudiants actifs', color: 'text-blue-400' },
  { icon: GraduationCap, value: '500+', label: 'Professeurs', color: 'text-violet-400' },
  { icon: Play, value: '10k+', label: 'Vidéos & cours', color: 'text-emerald-400' },
  { icon: Clock, value: '24/7', label: 'Accès illimité', color: 'text-amber-400' },
];

const features = [
  { icon: Play, title: 'Cours vidéo HD', desc: 'Contenus filmés par les meilleurs professeurs, accessibles à votre rythme.', gradient: 'from-blue-500 to-cyan-500' },
  { icon: FileText, title: 'Exercices corrigés', desc: 'Des milliers d\'exercices avec corrections détaillées étape par étape.', gradient: 'from-violet-500 to-purple-500' },
  { icon: BookOpen, title: 'Fiches de révision', desc: 'Synthèses claires et complètes par chapitre, prêtes à imprimer.', gradient: 'from-emerald-500 to-teal-500' },
  { icon: Mic, title: 'Classes en direct', desc: 'Sessions live interactives avec chat et questions en temps réel.', gradient: 'from-orange-500 to-red-500' },
  { icon: MessageCircle, title: 'Chat & Forum', desc: 'Échangez avec la communauté et obtenez de l\'aide rapidement.', gradient: 'from-pink-500 to-rose-500' },
  { icon: BarChart3, title: 'Suivi de progression', desc: 'Tableaux de bord pour mesurer vos progrès et rester motivé.', gradient: 'from-cyan-500 to-blue-500' },
];

const audiences = [
  { icon: GraduationCap, title: 'Étudiants', desc: 'Accédez au meilleur contenu éducatif et progressez à votre rythme.', cta: 'Espace étudiant', gradient: 'from-blue-500 to-blue-600' },
  { icon: BookOpen, title: 'Professeurs', desc: 'Créez vos cours, gérez vos classes et accompagnez vos étudiants.', cta: 'Espace professeur', gradient: 'from-violet-500 to-violet-600' },
  { icon: Globe, title: 'Établissements', desc: 'Offrez un accès premium à tous vos membres avec un dashboard dédié.', cta: 'Espace entreprise', gradient: 'from-emerald-500 to-emerald-600' },
];

const plans = [
  { name: 'Gratuit', price: '0€', period: '/mois', desc: 'Idéal pour découvrir', features: ['10 cours gratuits', 'Chat communautaire', '1 classe/mois'], popular: false },
  { name: 'Premium', price: '29€', period: '/mois', desc: 'Pour les motivés', features: ['Cours illimités', 'Classes virtuelles', 'Exercices corrigés', 'Support prioritaire', 'Certificats'], popular: true },
  { name: 'Établissement', price: 'Sur devis', period: '', desc: 'Pour les organisations', features: ['Tout Premium inclus', 'Dashboard admin', 'Multi-utilisateurs', 'API & intégrations', 'Support dédié'], popular: false },
];

const testimonials = [
  { name: 'Sophie Martin', role: 'Étudiante en informatique', text: 'Les cours sont excellents et les professeurs très pédagogues. Ma moyenne a augmenté de 4 points !', avatar: 'SM' },
  { name: 'Thomas Durand', role: 'Étudiant en mathématiques', text: 'Les classes virtuelles sont incroyables. On peut poser des questions en direct, c\'est comme un vrai cours.', avatar: 'TD' },
  { name: 'Marie Leclerc', role: 'Parent d\'élève', text: 'Mon fils a beaucoup progressé. Le suivi est excellent et les contenus de grande qualité.', avatar: 'ML' },
  { name: 'Ahmed Benali', role: 'Professeur de physique', text: 'La plateforme me permet de toucher des milliers d\'étudiants. Les outils sont bien pensés et intuitifs.', avatar: 'AB' },
];

const faqs = [
  { q: 'Qu\'est-ce que EdTech Platform ?', a: 'EdTech est une plateforme éducative proposant cours vidéo HD, classes virtuelles en direct, exercices corrigés et paiement intégré.' },
  { q: 'Comment m\'inscrire ?', a: 'Créez un compte gratuitement avec votre email. Choisissez votre profil (étudiant ou professeur) et commencez immédiatement.' },
  { q: 'Quels sont les tarifs ?', a: '3 formules : Gratuit (découverte), Premium (29€/mois, tout illimité) et Établissement (sur devis).' },
  { q: 'L\'accès est-il disponible sur mobile ?', a: 'Oui, la plateforme est entièrement responsive et optimisée pour tous les appareils.' },
  { q: 'Comment fonctionnent les classes virtuelles ?', a: 'Les professeurs créent des salles live. Les étudiants rejoignent, posent leurs questions via chat et interagissent en temps réel.' },
];

/* ═══════════ COMPONENTS ═══════════ */

function ThemeToggle() {
  const { resolved, setTheme } = useTheme();
  return (
    <button
      onClick={() => setTheme(resolved === 'dark' ? 'light' : 'dark')}
      className="relative h-9 w-9 rounded-lg border border-border bg-card flex items-center justify-center hover:bg-accent transition-colors"
      aria-label="Toggle theme"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </button>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 w-full z-50 glass">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-glow">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-extrabold text-gradient">EdTech</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {['La plateforme', 'Contenu', 'Espaces', 'Tarifs', 'Témoignages', 'FAQ'].map((item, i) => (
            <a key={item} href={`#${['about', 'content', 'audience', 'pricing', 'testimonials', 'faq'][i]}`}
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent transition-colors">
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/auth/login">
            <Button variant="ghost" size="sm">Connexion</Button>
          </Link>
          <Link href="/auth/register" className="hidden sm:block">
            <Button size="sm" className="shine">
              S&apos;inscrire <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
          <button className="lg:hidden ml-1 p-2" onClick={() => setOpen(!open)}>
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-border bg-card animate-slide-up">
          <div className="p-4 space-y-1">
            {['La plateforme', 'Contenu', 'Espaces', 'Tarifs', 'Témoignages', 'FAQ'].map((item, i) => (
              <a key={item} href={`#${['about', 'content', 'audience', 'pricing', 'testimonials', 'faq'][i]}`}
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent transition-colors">
                {item}
              </a>
            ))}
            <div className="pt-3 border-t border-border mt-3">
              <Link href="/auth/register" onClick={() => setOpen(false)}>
                <Button className="w-full">S&apos;inscrire gratuitement</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 mesh-gradient" />
      <div className="absolute inset-0 dot-pattern opacity-[0.03] dark:opacity-[0.05]" />

      {/* Decorative orbs */}
      <div className="absolute top-20 left-[10%] w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-[10%] w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-float-slow" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="animate-fade-up">
            <Badge className="px-4 py-1.5 text-sm gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              Plateforme N°1 en éducation en ligne
            </Badge>
          </div>

          {/* Title */}
          <h1 className="text-display-lg md:text-display-xl animate-fade-up delay-100">
            Apprenez <span className="text-gradient">autrement</span>,{' '}
            <br className="hidden sm:block" />
            progressez <span className="text-gradient-blue">vraiment</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-up delay-200">
            Cours vidéo HD, classes virtuelles en direct et accompagnement
            personnalisé — tout ce qu&apos;il faut pour réussir, accessible partout.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 animate-fade-up delay-300">
            <Link href="/auth/register">
              <Button size="lg" className="shine text-base px-8">
                Commencer gratuitement
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <a href="#content">
              <Button variant="outline" size="lg" className="text-base px-8">
                <Play className="w-4 h-4" /> Voir la démo
              </Button>
            </a>
          </div>

          {/* Social proof */}
          <div className="flex items-center justify-center gap-6 pt-4 animate-fade-up delay-500">
            <div className="flex -space-x-2">
              {['SM', 'TD', 'ML', 'AB'].map((initials, i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center text-white text-xs font-bold ring-2 ring-background">
                  {initials}
                </div>
              ))}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-xs text-muted-foreground">4.9/5 — Plus de 2 340 avis</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="relative -mt-1 bg-gradient-to-r from-primary-600 via-primary-700 to-violet-700 py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(({ icon: Icon, value, label, color }) => (
            <div key={label} className="text-center group">
              <Icon className={`w-7 h-7 mx-auto mb-2 ${color} group-hover:scale-110 transition-transform`} />
              <div className="text-3xl font-extrabold text-white">{value}</div>
              <div className="text-sm text-blue-100/70 mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-24">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700&h=500&fit=crop" alt="Étudiants collaborant" className="w-full h-[400px] object-cover" loading="lazy" />
          </div>
          <Card className="absolute -bottom-6 -right-6 p-5 flex items-center gap-4 shadow-card-hover">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-extrabold">98%</p>
              <p className="text-xs text-muted-foreground">Taux de satisfaction</p>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Badge variant="secondary">🔍 À propos de la plateforme</Badge>
          <h2 className="text-display">
            Qu&apos;est-ce que <span className="text-gradient">EdTech</span> ?
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            La plateforme éducative de référence, avec un contenu riche assuré par plus de <strong className="text-foreground">500 professeurs qualifiés</strong>.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Notre mission : offrir à chaque étudiant les outils pour apprendre efficacement — cours vidéo, classes en direct, exercices interactifs et suivi personnalisé.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-2">
            {[
              { icon: Zap, text: 'Apprentissage rapide' },
              { icon: Shield, text: 'Contenu vérifié' },
              { icon: Users, text: 'Communauté active' },
              { icon: Globe, text: 'Accès mondial' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-lg bg-primary-50 dark:bg-primary-500/10 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                </div>
                <span className="font-medium">{text}</span>
              </div>
            ))}
          </div>
          <Link href="/auth/register">
            <Button size="lg" className="mt-4 shine">
              Commencer maintenant <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="content" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">✨ Contenu éducatif</Badge>
          <h2 className="text-display">Un contenu <span className="text-gradient">riche et complet</span></h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-lg">Tout ce dont vous avez besoin, réuni en un seul endroit.</p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(({ icon: Icon, title, desc, gradient }, i) => (
            <Card key={title} hover className={`p-7 group ${i === 0 ? 'sm:col-span-2 lg:col-span-1' : ''}`}>
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="mt-5 font-bold text-lg">{title}</h3>
              <p className="mt-2 text-muted-foreground text-sm leading-relaxed">{desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Audiences() {
  return (
    <section id="audience" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">👥 Nos espaces</Badge>
          <h2 className="text-display">Qui peut bénéficier de <span className="text-gradient">EdTech</span> ?</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-lg">Chacun a son espace dédié.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {audiences.map(({ icon: Icon, title, desc, cta, gradient }) => (
            <Card key={title} hover className="p-8 group relative overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-[0.04] dark:group-hover:opacity-[0.08] transition-opacity`} />
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                <Icon className="w-8 h-8" />
              </div>
              <h3 className="mt-6 text-xl font-bold">{title}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{desc}</p>
              <Link href="/auth/register" className={`mt-6 inline-flex items-center gap-2 text-sm font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent group-hover:gap-3 transition-all`}>
                {cta} <ChevronRight className="w-4 h-4 text-current opacity-60" />
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">💎 Tarifs</Badge>
          <h2 className="text-display">Choisissez <span className="text-gradient">votre formule</span></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((p) => (
            <Card key={p.name} hover className={`p-8 relative ${p.popular ? 'border-primary shadow-glow ring-1 ring-primary/20' : ''}`}>
              {p.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-primary-500 to-violet-500 text-white border-0 shadow-lg">
                    <Star className="w-3 h-3 fill-current" /> Plus populaire
                  </Badge>
                </div>
              )}
              <h3 className="text-lg font-bold">{p.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{p.desc}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold">{p.price}</span>
                <span className="text-muted-foreground text-sm">{p.period}</span>
              </div>
              <ul className="mt-6 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm">
                    <div className="w-5 h-5 rounded-full bg-primary-50 dark:bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary-600 dark:text-primary-400" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/auth/register" className="block mt-8">
                <Button variant={p.popular ? 'primary' : 'outline'} className="w-full shine">
                  {p.popular ? 'Essai gratuit 7j' : p.name === 'Gratuit' ? 'Commencer' : 'Nous contacter'}
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section id="testimonials" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">💬 Témoignages</Badge>
          <h2 className="text-display">Ce que disent <span className="text-gradient">nos utilisateurs</span></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t) => (
            <Card key={t.name} hover className="p-6">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-xs font-bold">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-bold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Card className={`overflow-hidden transition-shadow ${open ? 'shadow-card-hover' : ''}`}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/50 transition-colors">
        <span className="font-semibold pr-4">{q}</span>
        <ChevronDown className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-60' : 'max-h-0'}`}>
        <p className="px-5 pb-5 text-muted-foreground leading-relaxed">{a}</p>
      </div>
    </Card>
  );
}

function FAQ() {
  return (
    <section id="faq" className="py-24 bg-muted/30">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">❓ FAQ</Badge>
          <h2 className="text-display">Questions <span className="text-gradient">fréquentes</span></h2>
        </div>
        <div className="space-y-3">
          {faqs.map((f) => <FAQItem key={f.q} q={f.q} a={f.a} />)}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-primary-700 to-violet-700" />
          <div className="absolute inset-0 dot-pattern opacity-[0.05]" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

          <div className="relative px-8 py-16 md:px-16 md:py-20 text-center">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
              Prêt à commencer votre<br />aventure éducative ?
            </h2>
            <p className="mt-5 text-blue-100/80 text-lg max-w-xl mx-auto">
              Rejoignez des milliers d&apos;étudiants et professeurs. Inscrivez-vous gratuitement.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth/register">
                <Button size="lg" className="bg-white text-primary-700 hover:bg-white/90 hover:shadow-2xl text-base px-8">
                  S&apos;inscrire gratuitement <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button variant="ghost" size="lg" className="text-white border-2 border-white/20 hover:bg-white/10 text-base px-8">
                  Se connecter
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-card border-t border-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-border">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-extrabold text-gradient">EdTech</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">La plateforme éducative de référence pour apprendre et enseigner.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Plateforme</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {['Espace étudiant', 'Espace professeur', 'Espace établissement'].map((l) => (
                <li key={l}><a href="#" className="hover:text-foreground transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Découvrir</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {['Nos offres', 'Nos professeurs', 'Blog', 'FAQ'].map((l) => (
                <li key={l}><a href="#" className="hover:text-foreground transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>📧 contact@edtech-platform.com</li>
              <li>📞 +33 1 23 45 67 89</li>
              <li>📍 Paris, France</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-sm text-muted-foreground">© 2026 EdTech Platform. Tous droits réservés.</p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-foreground transition-colors">Confidentialité</a>
            <a href="#" className="hover:text-foreground transition-colors">CGU</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════ PAGE ═══════════ */
export default function Home() {
  return (
    <ThemeProvider>
      <div className="min-h-screen overflow-x-hidden">
        <Navbar />
        <Hero />
        <Stats />
        <About />
        <Features />
        <Audiences />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CTA />
        <Footer />
      </div>
    </ThemeProvider>
  );
}
