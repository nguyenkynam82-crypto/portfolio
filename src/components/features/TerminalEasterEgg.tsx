import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export function TerminalEasterEgg() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const bootBanner = language === 'vi' ? 'Gõ "help" để xem danh sách lệnh.' : 'Type "help" to see the list of commands.';
  const [history, setHistory] = useState<string[]>(['DonQuaan OS v1.0.0', bootBanner]);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Keep the boot banner in sync with the active language (only while untouched).
  // State is adjusted during render (per React docs) instead of in an effect.
  const [prevLanguage, setPrevLanguage] = useState(language);
  if (prevLanguage !== language) {
    setPrevLanguage(language);
    if (history.length === 2 && history[0] === 'DonQuaan OS v1.0.0') {
      setHistory(['DonQuaan OS v1.0.0', bootBanner]);
    }
  }
  
  // Secret sequence listener
  useEffect(() => {
    let sequence = '';
    const secret = 'hello';
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen) return;
      if (e.key === '`' || e.key === '~') {
        setIsOpen(true);
        return;
      }
      
      sequence += e.key.toLowerCase();
      if (sequence.length > secret.length) {
        sequence = sequence.slice(-secret.length);
      }
      if (sequence === secret) {
        setIsOpen(true);
        sequence = '';
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Scroll to bottom when history changes
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, isOpen]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const newHistory = [...history, `> ${cmd}`];
    
    switch (trimmedCmd) {
      case 'help':
        newHistory.push(language === 'vi' ? 'Các lệnh có sẵn: help, whoami, contact, clear, exit, sudo' : 'Available commands: help, whoami, contact, clear, exit, sudo');
        break;
      case 'whoami':
        newHistory.push(language === 'vi' ? 'Nguyễn Vũ Đông Quân' : 'Nguyen Vu Dong Quan');
        newHistory.push('Gemini Certified Faculty | Google AI Specialist');
        newHistory.push('Senior Chief Executive Officer | Systems Tester & Developer');
        break;
      case 'contact':
        newHistory.push('Email 1: donquaan.x@gmail.com');
        newHistory.push('Email 2: contact.donquaan@gmail.com');
        newHistory.push('LinkedIn: www.linkedin.com/in/donquaan');
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'exit':
        setIsOpen(false);
        break;
      case 'sudo':
        newHistory.push(language === 'vi' ? 'Yêu cầu bị từ chối. Báo cáo bảo mật đã được ghi nhận.' : 'Permission denied. This incident has been reported.');
        break;
      case '':
        break;
      default:
        newHistory.push(language === 'vi' ? `Không tìm thấy lệnh: ${trimmedCmd}` : `Command not found: ${trimmedCmd}`);
    }
    
    setHistory(newHistory);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-10 font-mono"
        >
          <div role="dialog" aria-modal="true" aria-label={language === 'vi' ? 'Terminal bí mật' : 'Secret terminal'} className="w-full max-w-3xl h-[80vh] bg-black border border-white/20 rounded-lg shadow-2xl flex flex-col overflow-hidden relative">
            {/* Header */}
            <div className="h-8 bg-white/10 flex items-center px-4 justify-between border-b border-white/20">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="text-white/50 text-xs tracking-wider">root@donquaan:~</div>
              <button onClick={() => setIsOpen(false)} aria-label={language === 'vi' ? 'Đóng terminal' : 'Close terminal'} className="text-white/50 hover:text-white transition-colors">
                <X size={14} />
              </button>
            </div>
            
            {/* Body */}
            <div className="flex-1 overflow-y-auto p-4 text-[#0f0] text-sm sm:text-base leading-relaxed">
              {history.map((line, i) => (
                <div key={i} className="mb-1 whitespace-pre-wrap">{line}</div>
              ))}
              <div className="flex items-center mt-2">
                <span className="mr-2 text-white/70">&gt;</span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleCommand(input);
                      setInput('');
                    } else if (e.key === 'Escape') {
                      setIsOpen(false);
                    }
                  }}
                  className="flex-1 bg-transparent border-none outline-none text-[#0f0] font-mono caret-white"
                  autoFocus
                  autoComplete="off"
                  spellCheck="false"
                />
              </div>
              <div ref={bottomRef} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
