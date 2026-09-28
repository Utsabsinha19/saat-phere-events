'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  MessageCircle,
  X,
  Send,
  Phone,
  CheckCircle2,
  Calendar,
  DollarSign,
  Crown,
  ShieldCheck,
  Bot,
  User,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
}

export const AiConciergeModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [callbackRequested, setCallbackRequested] = useState(false);
  const [userPhone, setUserPhone] = useState('');
  const [showPhoneInput, setShowPhoneInput] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: 'Namaste! Welcome to Saat Phere Events. I am your 24/7 Royal Wedding Concierge. How may I assist your palatial celebration today?',
      time: 'Just now',
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const QUICK_QUESTIONS = [
    'Estimate budget for 3-Day Udaipur wedding',
    'What is included in a Jagmandir buyout?',
    'Auspicious Vedic wedding dates 2026-2027',
    'Connect with Senior Director Vikramaditya',
  ];

  const generateAiReply = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes('budget') || q.includes('cost') || q.includes('price') || q.includes('estimate') || q.includes('udaipur')) {
      return 'For a 3-day signature palatial destination wedding in Udaipur (e.g. Jagmandir Island Palace or Oberoi Udaivilas) hosting 250 guests, our turnkey production investment typically benchmarks between ₹1.80 Crore and ₹2.80 Crore INR. This encompasses exclusive palace buyout logistics, lake boat flotillas, 3D cold-chain Dutch florals, Michelin-caliber royal catering, and concert-grade sound rigs under tri-party escrow protection.';
    }

    if (q.includes('jagmandir') || q.includes('buyout') || q.includes('palace') || q.includes('venue')) {
      return 'An exclusive buyout of Jagmandir Island Palace provides complete private sanctuary on Lake Pichola for your family. The package includes jetty transfers from City Palace, illuminated heritage stone courtyards, 3-tier security cordons, sheltered bad-weather fallback ballrooms, and 10:00 PM acoustic compliance zones with afterparty transition suites.';
    }

    if (q.includes('date') || q.includes('muhurat') || q.includes('vedic') || q.includes('auspicious')) {
      return 'For 2026–2027, the most auspicious royal wedding muhurats fall across November 18–26, December 10–22, January 15–28, and February 08–21. Winter in Rajasthan offers ideal 22°C daytime temperatures and cool starlit evenings for open-air courtyard pheras.';
    }

    if (q.includes('director') || q.includes('vikramaditya') || q.includes('contact') || q.includes('call')) {
      setShowPhoneInput(true);
      return 'Our Senior Managing Director, Vikramaditya Rathore, personally oversees high-profile palatial buyouts. Please share your direct WhatsApp phone number below, and our executive directorate will connect with you within 15 minutes.';
    }

    return 'Saat Phere Events produces bespoke royal celebrations across Jaipur, Udaipur, Delhi NCR, Mumbai, and Goa. Every wedding is backed by our verified vendor guild, 100% tax and GST compliance, and audited tri-party escrow milestones. Would you like a customized production proposal or a direct director callback?';
  };

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const replyText = generateAiReply(text);
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 800);
  };

  const handleCallbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userPhone) return;

    try {
      await fetch('/api/crm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipientName: 'High-Intent Concierge Client',
          phone: userPhone,
          sequenceType: 'Consultation Slot Confirmation',
          contentSnippet: `Concierge Callback Requested: Client inquiry on website requesting direct connect with Vikramaditya Rathore.`,
        }),
      });
    } catch (e) {
      console.error(e);
    }

    setCallbackRequested(true);
    setShowPhoneInput(false);
    setMessages((prev) => [
      ...prev,
      {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: `Thank you! Your callback request has been logged with Senior Director Vikramaditya Rathore. You will receive an immediate WhatsApp confirmation on ${userPhone}.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          backgroundColor: '#800020',
          color: '#FFFFFF',
          border: '2px solid var(--color-gold)',
          borderRadius: '50px',
          padding: '12px 20px',
          boxShadow: '0 10px 30px rgba(128, 0, 32, 0.4)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer',
          zIndex: 9990,
          transition: 'all 0.25s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-3px)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
      >
        <Sparkles size={18} color="var(--color-gold)" />
        <span style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.5px' }}>
          24/7 AI Concierge
        </span>
        <span
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: '#10B981',
            boxShadow: '0 0 6px #10B981',
          }}
        />
      </button>

      {/* Floating Chat Modal */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '84px',
            right: '24px',
            width: '380px',
            maxWidth: 'calc(100vw - 32px)',
            height: '540px',
            maxHeight: 'calc(100vh - 120px)',
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
            border: '1.5px solid var(--color-gold)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            zIndex: 9991,
          }}
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: 'var(--color-maroon)',
              color: '#FFFFFF',
              padding: '16px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid rgba(212, 175, 55, 0.3)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(212, 175, 55, 0.2)',
                  border: '1px solid var(--color-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Crown size={18} color="var(--color-gold)" />
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0, fontFamily: 'var(--font-serif)', color: '#FFFFFF' }}>
                  Saat Phere Royal Concierge
                </h4>
                <div style={{ fontSize: '0.7rem', color: 'var(--color-gold-light)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                  Live AI • 24/7 Palatial Planning
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', color: '#D1D5DB', cursor: 'pointer', fontSize: '1.1rem' }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Chat Messages Body */}
          <div
            style={{
              flex: 1,
              padding: '16px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              backgroundColor: '#FDFBF7',
            }}
          >
            {messages.map((m) => (
              <div
                key={m.id}
                style={{
                  display: 'flex',
                  justifyContent: m.sender === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  style={{
                    maxWidth: '82%',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    fontSize: '0.82rem',
                    lineHeight: 1.45,
                    backgroundColor: m.sender === 'user' ? 'var(--color-maroon)' : '#FFFFFF',
                    color: m.sender === 'user' ? '#FFFFFF' : '#1F2937',
                    border: m.sender === 'user' ? 'none' : '1px solid #E5E7EB',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                  }}
                >
                  {m.text}
                  <div
                    style={{
                      fontSize: '0.65rem',
                      color: m.sender === 'user' ? '#F9A8D4' : '#9CA3AF',
                      textAlign: 'right',
                      marginTop: '4px',
                    }}
                  >
                    {m.time}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#9CA3AF', padding: '6px 12px' }}>
                <Sparkles size={12} color="var(--color-gold)" />
                Royal Concierge is preparing bespoke details...
              </div>
            )}

            {/* Callback phone form if triggered */}
            {showPhoneInput && !callbackRequested && (
              <form
                onSubmit={handleCallbackSubmit}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1.5px solid var(--color-gold)',
                  borderRadius: '10px',
                  padding: '12px',
                }}
              >
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-maroon)', marginBottom: '6px' }}>
                  Request Priority Executive Callback:
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <input
                    type="text"
                    required
                    placeholder="+91 98200 XXXXX"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    style={{ flex: 1, padding: '7px 10px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.8rem' }}
                  />
                  <button
                    type="submit"
                    className="btn-gold"
                    style={{ padding: '7px 14px', fontSize: '0.75rem' }}
                  >
                    Call Me
                  </button>
                </div>
              </form>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div style={{ padding: '8px 12px', backgroundColor: '#FFFFFF', borderTop: '1px solid #F3F4F6', display: 'flex', gap: '6px', overflowX: 'auto', whiteSpace: 'nowrap' }}>
            {QUICK_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                style={{
                  fontSize: '0.7rem',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  backgroundColor: '#F9FAFB',
                  border: '1px solid #E5E7EB',
                  color: '#4B5563',
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div style={{ padding: '12px', backgroundColor: '#FFFFFF', borderTop: '1px solid #E5E7EB', display: 'flex', gap: '8px' }}>
            <input
              type="text"
              placeholder="Ask about venues, budgets, or dates..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
              style={{
                flex: 1,
                padding: '9px 12px',
                borderRadius: '8px',
                border: '1px solid #D1D5DB',
                fontSize: '0.85rem',
              }}
            />
            <button
              onClick={() => handleSend()}
              className="btn-gold"
              style={{ padding: '9px 14px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
