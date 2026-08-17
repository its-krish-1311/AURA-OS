"use client";

import React, { useRef, useEffect } from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Copy, Check, ThumbsUp, ThumbsDown, Share2, MoreHorizontal, Bot, User } from "lucide-react";
import ArtifactViewer from "./ArtifactViewer";

const TypewriterMarkdown = ({ content, isTyping }: { content: string, isTyping: boolean }) => {
  const [displayedContent, setDisplayedContent] = React.useState(isTyping ? "" : content);

  useEffect(() => {
    // Smooth reveal logic for streaming text
    if (content.length > displayedContent.length) {
      const timeoutId = setTimeout(() => {
        // Advance by small chunks for smoothness while maintaining speed
        const chunk = content.substring(0, displayedContent.length + 4); 
        setDisplayedContent(chunk);
      }, 10);
      return () => clearTimeout(timeoutId);
    } else if (content.length < displayedContent.length) {
      // In case of resets
      setDisplayedContent(content);
    }
  }, [content, displayedContent]);

  const renderContent = displayedContent;
  const showCursor = displayedContent.length < content.length || isTyping;

  return (
    <div className="prose prose-invert max-w-none text-gray-200">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            const codeContent = String(children).replace(/\n$/, '');
            return !inline && match ? (
              <div className="relative group my-4 rounded-xl overflow-hidden border border-borderSubtle bg-base">
                <div className="flex items-center justify-between px-4 py-2 bg-surface border-b border-borderSubtle">
                  <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">{match[1]}</span>
                </div>
                <SyntaxHighlighter style={vscDarkPlus as any} language={match[1]} PreTag="div" customStyle={{ margin: 0, padding: '1rem', background: 'transparent' }} codeTagProps={{ className: 'text-sm font-mono leading-relaxed' }} {...props}>
                  {codeContent}
                </SyntaxHighlighter>
              </div>
            ) : (
              <code className="bg-elevated px-1.5 py-0.5 rounded text-accentPrimary text-sm font-mono border border-borderSubtle" {...props}>{children}</code>
            );
          },
          p({ children }) { return <p className="text-[15px] leading-relaxed mb-4 last:mb-0 text-gray-300">{children}</p>; },
          a({ href, children }) { return <a href={href} target="_blank" rel="noopener noreferrer" className="text-accentPrimary hover:text-accentSecondary underline decoration-accentPrimary/30 underline-offset-4 transition-colors">{children}</a>; },
          ul({ children }) { return <ul className="list-disc list-outside ml-5 mb-4 space-y-2 text-gray-300">{children}</ul>; },
          ol({ children }) { return <ol className="list-decimal list-outside ml-5 mb-4 space-y-2 text-gray-300">{children}</ol>; },
          li({ children }) { return <li className="text-[15px] leading-relaxed pl-2">{children}</li>; },
          h1({ children }) { return <h1 className="text-2xl font-bold mb-4 mt-6 text-white">{children}</h1>; },
          h2({ children }) { return <h2 className="text-xl font-bold mb-4 mt-6 text-white">{children}</h2>; },
          h3({ children }) { return <h3 className="text-lg font-bold mb-3 mt-5 text-white">{children}</h3>; },
        }}
      >
        {renderContent + (showCursor ? " ▍" : "")}
      </ReactMarkdown>
    </div>
  );
};

interface Message {
  id: string;
  role: "user" | "assistant" | "system" | "data";
  content: string;
}

interface PremiumMessageAreaProps {
  messages: Message[];
  currentModel: string;
  onModelChange: (model: string) => void;
  isTyping: boolean;
}

export default function PremiumMessageArea({ messages, currentModel, onModelChange, isTyping }: PremiumMessageAreaProps) {
  const [copiedText, setCopiedText] = React.useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isTyping]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const parseContent = (content: string) => {
    const artifactRegex = /\[ARTIFACT:(.*?)\]\s*([\s\S]*?)\[\/ARTIFACT\]/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = artifactRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push({ type: 'text', content: content.substring(lastIndex, match.index) });
      }
      parts.push({ type: 'artifact', title: match[1], content: match[2] });
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < content.length) {
      parts.push({ type: 'text', content: content.substring(lastIndex) });
    }

    return parts.length > 0 ? parts : [{ type: 'text', content }];
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 custom-scrollbar pb-32" ref={scrollRef}>
      <div className="max-w-4xl mx-auto space-y-10">
        
        {messages.map((message) => {
          if (message.role === "system" || message.role === "data") return null;
          
          const isUser = message.role === "user";
          const parsedParts = parseContent(message.content);

          return (
            <div key={message.id} className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
              {isUser ? (
                /* Premium User Bubble */
                <div className="max-w-[85%] rounded-[32px] px-8 py-4 shadow-[0_8px_30px_rgba(168,85,247,0.2)] border border-purple-500/30 bg-gradient-to-br from-purple-900 to-black backdrop-blur-md">
                  <p className="text-white text-[15px] leading-relaxed whitespace-pre-wrap font-medium relative z-10">
                    {message.content}
                  </p>
                </div>
              ) : (
                /* Premium AI Response */
                <div className="w-full flex gap-5 group/message">
                  {/* AI Avatar */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-accentSecondary to-accentPrimary shadow-[0_0_20px_var(--accent-glow)] flex items-center justify-center shrink-0 mt-1 border border-white/40 relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/message:opacity-100 transition-opacity"></div>
                    <Bot className="w-5 h-5 text-white" />
                  </div>

                  <div className="flex-1 space-y-4 pt-1 max-w-[calc(100%-3.5rem)]">
                    
                    {parsedParts.map((part, index) => {
                      if (part.type === 'artifact') {
                        return <ArtifactViewer key={index} title={part.title!} code={part.content!} isOpen={true} onClose={() => {}} />;
                      }

                      return (
                        <TypewriterMarkdown 
                          key={index}
                          content={part.content!} 
                          isTyping={isTyping && message.id === messages[messages.length - 1].id} 
                        />
                      );
                    })}

                    {/* Bottom Action Bar */}
                    <div className="flex items-center gap-3 pt-2 mt-2">
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleCopy(message.content)} className="p-2 rounded hover:bg-elevated text-gray-500 hover:text-gray-300 transition-colors tooltip" title="Copy response">
                          {copiedText === message.content ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                        </button>
                        <button onClick={async () => {
                          try {
                            await fetch('/api/messages/feedback', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ messageId: message.id, isPositive: true })
                            });
                            import('react-hot-toast').then(({ toast }) => toast.success("Thanks for the positive feedback!"));
                          } catch(e) {}
                        }} className="p-2 rounded hover:bg-elevated text-gray-500 hover:text-gray-300 transition-colors tooltip" title="Good response"><ThumbsUp className="w-4 h-4" /></button>
                        <button onClick={async () => {
                          try {
                            await fetch('/api/messages/feedback', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ messageId: message.id, isPositive: false })
                            });
                            import('react-hot-toast').then(({ toast }) => toast.success("Feedback recorded. We'll improve!"));
                          } catch(e) {}
                        }} className="p-2 rounded hover:bg-elevated text-gray-500 hover:text-gray-300 transition-colors tooltip" title="Bad response"><ThumbsDown className="w-4 h-4" /></button>
                        <button onClick={() => { 
                          if (navigator.share) {
                            navigator.share({ title: 'Siya AI Response', text: message.content }).catch(() => {});
                          } else {
                            navigator.clipboard.writeText(message.content);
                            import('react-hot-toast').then(({ toast }) => toast.success("Copied to clipboard for sharing!"));
                          }
                        }} className="p-2 rounded hover:bg-elevated text-gray-500 hover:text-gray-300 transition-colors tooltip" title="Share"><Share2 className="w-4 h-4" /></button>
                        <button onClick={() => { import('react-hot-toast').then(({ toast }) => toast('More options coming soon!', { icon: '⚙️' })); }} className="p-2 rounded hover:bg-elevated text-gray-500 hover:text-gray-300 transition-colors"><MoreHorizontal className="w-4 h-4" /></button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}


      </div>
    </div>
  );
}
