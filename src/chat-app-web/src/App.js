import React, { useState } from 'react';
import './App.css';

// GitHub color palette
const githubColors = {
  light: {
    background: '#f6f8fa',
    text: '#24292f',
    inputBg: '#ffffff',
    inputBorder: '#d0d7de',
    buttonBg: '#2da44e',
    buttonText: '#ffffff',
    toggleBg: '#eaeef2',
    toggleText: '#57606a',
    messageBg: '#ffffff',
    messageBorder: '#d0d7de'
  },
  dark: {
    background: '#0d1117',
    text: '#c9d1d9',
    inputBg: '#161b22',
    inputBorder: '#30363d',
    buttonBg: '#238636',
    buttonText: '#ffffff',
    toggleBg: '#21262d',
    toggleText: '#8b949e',
    messageBg: '#161b22',
    messageBorder: '#30363d'
  }
};

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const colors = darkMode ? githubColors.dark : githubColors.light;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', text: input }]);
    setInput('');
    // Simulate API call
    setMessages(msgs => [
      ...msgs,
      { role: 'assistant', text: 'Thinking...' }
    ]);
    // Replace this with your actual API call
    setTimeout(() => {
      setMessages(msgs => [
        ...msgs.slice(0, -1),
        { role: 'assistant', text: `Echo: ${input}` }
      ]);
    }, 1000);
  };

  return (
    <div
      className="App"
      style={{
        background: colors.background,
        color: colors.text,
        minHeight: '100vh',
        minWidth: '100vw',
        width: '100vw',
        height: '100vh',
        fontFamily: 'Segoe UI, Arial, sans-serif',
        transition: 'background 0.2s, color 0.2s',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        maxWidth: '100vw',
        height: '100vh',
        padding: '2rem 1rem',
        boxSizing: 'border-box'
      }}>
        <header style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '90vw', marginBottom: 24 }}>
          {/* Removed the h1 header */}
          <button
            onClick={() => setDarkMode(dm => !dm)}
            style={{
              background: colors.toggleBg,
              color: colors.toggleText,
              border: 'none',
              borderRadius: 6,
              padding: '6px 16px',
              cursor: 'pointer',
              fontWeight: 500
            }}
            aria-label="Toggle dark mode"
          >
            {darkMode ? '🌙 Dark' : '☀️ Light'}
          </button>
        </header>
        <div
          style={{
            background: colors.messageBg,
            border: `1px solid ${colors.messageBorder}`,
            borderRadius: 8,
            padding: 16,
            minHeight: 200,
            marginBottom: 24,
            overflowY: 'auto',
            boxShadow: darkMode ? '0 1px 4px #010409' : '0 1px 4px #d0d7de',
            width: '90vw',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end'
          }}
        >
          {messages.length === 0 && (
            <div style={{ color: colors.toggleText, fontStyle: 'italic' }}>
              Start a conversation with Copilot!
            </div>
          )}
          {messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                marginBottom: 12,
                textAlign: msg.role === 'user' ? 'right' : 'left'
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  background: msg.role === 'user' ? colors.buttonBg : colors.inputBg,
                  color: msg.role === 'user' ? colors.buttonText : colors.text,
                  padding: '8px 14px',
                  borderRadius: 16,
                  maxWidth: '80%',
                  wordBreak: 'break-word',
                  border: msg.role === 'assistant' ? `1px solid ${colors.inputBorder}` : 'none',
                  fontSize: 16
                }}
              >
                {msg.text}
              </span>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '90vw' }}>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            rows={3}
            placeholder="Ask Copilot anything..."
            style={{
              resize: 'none',
              background: colors.inputBg,
              color: colors.text,
              border: `1px solid ${colors.inputBorder}`,
              borderRadius: 6,
              padding: 12,
              fontSize: 16,
              outline: 'none',
              fontFamily: 'inherit',
              width: '90%'
            }}
            required
          />
          <button
            type="submit"
            style={{
              background: colors.buttonBg,
              color: colors.buttonText,
              border: 'none',
              borderRadius: 6,
              padding: '10px 0',
              fontWeight: 600,
              fontSize: 16,
              cursor: 'pointer',
              boxShadow: darkMode ? '0 1px 2px #010409' : '0 1px 2px #d0d7de',
              width: '90%'
            }}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
