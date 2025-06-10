
import React, { useState } from 'react';
import ChatSidebar from './ChatSidebar';
import ChatArea from './ChatArea';
import PasswordChangeModal from './PasswordChangeModal';

interface ChatInterfaceProps {
  onLogout: () => void;
}

const ChatInterface = ({ onLogout }: ChatInterfaceProps) => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background">
      <ChatSidebar
        selectedChatId={selectedChatId}
        onSelectChat={setSelectedChatId}
        onLogout={onLogout}
        onLogoClick={() => setIsPasswordModalOpen(true)}
      />
      <ChatArea chatId={selectedChatId} />
      <PasswordChangeModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </div>
  );
};

export default ChatInterface;
