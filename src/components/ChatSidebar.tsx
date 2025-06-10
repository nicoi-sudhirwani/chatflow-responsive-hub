
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { MessageSquare, Plus, Search, Edit2, Trash2, Share2, LogOut } from 'lucide-react';

interface ChatSidebarProps {
  selectedChatId: string | null;
  onSelectChat: (chatId: string) => void;
  onLogout: () => void;
  onLogoClick: () => void;
}

interface ChatHistory {
  id: string;
  title: string;
  date: string;
  timestamp: string;
}

const ChatSidebar = ({ selectedChatId, onSelectChat, onLogout, onLogoClick }: ChatSidebarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock chat history data grouped by date
  const chatHistory: Record<string, ChatHistory[]> = {
    'Today': [
      { id: '1', title: 'React Components Help', date: 'Today', timestamp: '10:30 AM' },
      { id: '2', title: 'CSS Grid Layout', date: 'Today', timestamp: '2:15 PM' },
    ],
    'Yesterday': [
      { id: '3', title: 'JavaScript Async/Await', date: 'Yesterday', timestamp: '9:45 AM' },
      { id: '4', title: 'API Integration', date: 'Yesterday', timestamp: '4:20 PM' },
    ],
    'Last Week': [
      { id: '5', title: 'Database Design', date: 'Dec 3', timestamp: '11:00 AM' },
      { id: '6', title: 'Authentication Setup', date: 'Dec 2', timestamp: '3:30 PM' },
    ],
  };

  const filteredHistory = Object.entries(chatHistory).reduce((acc, [date, chats]) => {
    const filtered = chats.filter(chat =>
      chat.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filtered.length > 0) {
      acc[date] = filtered;
    }
    return acc;
  }, {} as Record<string, ChatHistory[]>);

  const handleChatAction = (action: string, chatId: string) => {
    console.log(`${action} chat:`, chatId);
    // Implement actual functionality here
  };

  return (
    <div className="w-80 bg-card border-r border-border flex flex-col h-full">
      {/* Header with Logo */}
      <div className="p-4 border-b border-border">
        <Button
          variant="ghost"
          className="w-full justify-start p-2 hover:bg-accent"
          onClick={onLogoClick}
        >
          <MessageSquare className="h-6 w-6 mr-2 text-primary" />
          <span className="font-semibold text-lg">ChatBot</span>
        </Button>
      </div>

      {/* New Chat Button */}
      <div className="p-4">
        <Button className="w-full" onClick={() => onSelectChat('new')}>
          <Plus className="h-4 w-4 mr-2" />
          New Chat
        </Button>
      </div>

      {/* Search */}
      <div className="px-4 pb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto px-4">
        <Accordion type="multiple" defaultValue={Object.keys(filteredHistory)} className="w-full">
          {Object.entries(filteredHistory).map(([date, chats]) => (
            <AccordionItem key={date} value={date}>
              <AccordionTrigger className="text-sm font-medium">
                {date} ({chats.length})
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-1">
                  {chats.map((chat) => (
                    <div
                      key={chat.id}
                      className={`group flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-accent ${
                        selectedChatId === chat.id ? 'bg-accent' : ''
                      }`}
                      onClick={() => onSelectChat(chat.id)}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{chat.title}</div>
                        <div className="text-xs text-muted-foreground">{chat.timestamp}</div>
                      </div>
                      <div className="flex opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleChatAction('edit', chat.id);
                          }}
                        >
                          <Edit2 className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleChatAction('share', chat.id);
                          }}
                        >
                          <Share2 className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-destructive hover:text-destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleChatAction('delete', chat.id);
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t border-border">
        <Button variant="outline" className="w-full" onClick={onLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default ChatSidebar;
