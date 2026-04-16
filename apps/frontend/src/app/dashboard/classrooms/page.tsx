'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { classroomsApi } from '@/lib/api';
import { ThemeProvider, useTheme } from '@/lib/theme-provider';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { io, Socket } from 'socket.io-client';
import {
  GraduationCap, Users, LayoutDashboard, LogOut, Send,
  Sun, Moon, Hash, MessageCircle,
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

function ClassroomsContent() {
  const { user, token, logout, loading: authLoading } = useAuth();
  const router = useRouter();
  const [rooms, setRooms] = useState<any[]>([]);
  const [activeRoom, setActiveRoom] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMsg, setNewMsg] = useState('');
  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!authLoading && !user) router.push('/auth/login');
  }, [authLoading, user, router]);

  useEffect(() => {
    if (token) classroomsApi.list(token).then(setRooms).catch(() => {});
  }, [token]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const joinRoom = async (room: any) => {
    if (!token || !user) return;
    setActiveRoom(room);
    await classroomsApi.join(room.id, token);
    const msgs = await classroomsApi.messages(room.id, token);
    setMessages(msgs.reverse());

    if (socketRef.current) socketRef.current.disconnect();
    const socket = io('http://localhost:4000/chat');
    socketRef.current = socket;
    socket.emit('joinRoom', { classroomId: room.id });
    socket.on('newMessage', (msg: any) => setMessages((prev) => [...prev, msg]));
  };

  const sendMessage = () => {
    if (!newMsg.trim() || !activeRoom || !user) return;
    socketRef.current?.emit('sendMessage', {
      classroomId: activeRoom.id,
      userId: user.id,
      content: newMsg,
    });
    setNewMsg('');
  };

  if (authLoading || !user) return null;

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
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
            <LayoutDashboard className="w-4 h-4" /> Cours
          </Link>
          <Link href="/dashboard/classrooms" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium bg-primary/10 text-primary transition-colors">
            <Users className="w-4 h-4" /> Classes
          </Link>
        </nav>

        <div className="border-t border-border pt-4 space-y-3">
          <div className="flex items-center gap-3 px-3">
            <Avatar fallback={user.firstName[0] + user.lastName[0]} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{user.firstName}</p>
              <p className="text-xs text-muted-foreground">{user.role === 'STUDENT' ? 'Étudiant' : 'Professeur'}</p>
            </div>
          </div>
          <button onClick={logout} className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors w-full">
            <LogOut className="w-4 h-4" /> Déconnexion
          </button>
        </div>
      </aside>

      {/* Room list */}
      <div className="w-72 border-r border-border bg-card/50 flex flex-col">
        <div className="p-4 border-b border-border">
          <h2 className="font-bold text-sm flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-primary" />
            Classes virtuelles
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {rooms.map((r) => (
            <button key={r.id} onClick={() => joinRoom(r)}
              className={`w-full text-left p-3 rounded-xl transition-all text-sm ${
                activeRoom?.id === r.id
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              }`}>
              <div className="flex items-center gap-2.5">
                <Hash className="w-4 h-4 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">{r.name}</p>
                  <p className="text-xs opacity-60">{r._count?.participants || 0} participants</p>
                </div>
              </div>
            </button>
          ))}
          {rooms.length === 0 && (
            <div className="text-center py-8">
              <Users className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">Aucune classe</p>
            </div>
          )}
        </div>
      </div>

      {/* Chat */}
      <div className="flex-1 flex flex-col">
        {activeRoom ? (
          <>
            <header className="h-14 px-6 border-b border-border bg-card/80 backdrop-blur flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Hash className="w-4 h-4 text-muted-foreground" />
                <span className="font-bold text-sm">{activeRoom.name}</span>
                <Badge variant="secondary" className="text-[10px]">
                  {activeRoom._count?.participants || 0} en ligne
                </Badge>
              </div>
              <ThemeToggle />
            </header>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((m) => {
                const isMe = m.userId === user.id;
                return (
                  <div key={m.id} className={`flex gap-3 ${isMe ? 'flex-row-reverse' : ''}`}>
                    <Avatar
                      fallback={m.user?.firstName?.[0] || '?'}
                      size="sm"
                      className={isMe ? 'ring-primary' : ''}
                    />
                    <div className={`max-w-md ${isMe ? 'text-right' : ''}`}>
                      <p className="text-xs font-medium text-muted-foreground mb-1">
                        {m.user?.firstName || 'Utilisateur'}
                      </p>
                      <div className={`inline-block px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        isMe
                          ? 'bg-primary text-primary-foreground rounded-tr-md'
                          : 'bg-muted rounded-tl-md'
                      }`}>
                        {m.content}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-border bg-card">
              <div className="flex gap-3 items-center">
                <input
                  value={newMsg}
                  onChange={(e) => setNewMsg(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Écrire un message..."
                  className="flex-1 h-11 px-4 rounded-xl border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <Button onClick={sendMessage} size="icon" className="h-11 w-11 rounded-xl">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
              <MessageCircle className="w-8 h-8 text-muted-foreground/40" />
            </div>
            <p className="font-medium">Sélectionnez une classe</p>
            <p className="text-sm mt-1 opacity-60">pour rejoindre la conversation</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ClassroomsPage() {
  return (
    <ThemeProvider>
      <ClassroomsContent />
    </ThemeProvider>
  );
}
