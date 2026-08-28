import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import {
  CheckSquare,
  LayoutDashboard,
  ListTodo,
  Sun,
  Moon,
  LogOut,
  User as UserIcon,
  Menu,
  X,
} from 'lucide-react';

export const Navbar = ({ currentTab, setCurrentTab }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab) => {
    setCurrentTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'var(--bg-card)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-color)',
        transition: 'var(--transition)',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0.875rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Brand Logo */}
        <div
          onClick={() => handleNavClick('dashboard')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, #facc15, #eab308)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 16px rgba(250, 204, 21, 0.45)',
              color: '#000000',
            }}
          >
            <CheckSquare size={22} strokeWidth={2.6} />
          </div>
          <div>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.25rem',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                background: 'linear-gradient(135deg, #facc15, #fef08a)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              TaskPulse
            </span>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <nav
          style={{
            display: 'none',
            gap: '0.5rem',
            alignItems: 'center',
          }}
          className="desktop-nav"
        >
          <button
            onClick={() => handleNavClick('dashboard')}
            className={`btn ${currentTab === 'dashboard' ? 'btn-primary' : 'btn-ghost'}`}
            style={{ padding: '0.5rem 1rem' }}
          >
            <LayoutDashboard size={17} />
            <span>Dashboard & Insights</span>
          </button>
          <button
            onClick={() => handleNavClick('tasks')}
            className={`btn ${currentTab === 'tasks' ? 'btn-primary' : 'btn-ghost'}`}
            style={{ padding: '0.5rem 1rem' }}
          >
            <ListTodo size={17} />
            <span>Task Tracker</span>
          </button>
        </nav>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="btn btn-secondary btn-icon"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun size={18} color="#f59e0b" />
            ) : (
              <Moon size={18} color="#6366f1" />
            )}
          </button>

          {/* User Profile Pill */}
          {user && (
            <div
              style={{
                display: 'none',
                alignItems: 'center',
                gap: '0.625rem',
                padding: '0.35rem 0.85rem 0.35rem 0.5rem',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-full)',
              }}
              className="desktop-user"
            >
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: '#facc15',
                  color: '#000000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '0.8125rem',
                }}
              >
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <span
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  maxWidth: '120px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {user.name || user.email}
              </span>
            </div>
          )}

          {/* Logout Button */}
          <button
            onClick={logout}
            className="btn btn-secondary btn-sm desktop-logout"
            title="Sign out"
            style={{ display: 'none' }}
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn btn-secondary btn-icon mobile-menu-btn"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="animate-fade-in"
          style={{
            padding: '1rem 1.5rem 1.5rem',
            borderTop: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-secondary)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
          }}
        >
          {user && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                paddingBottom: '0.75rem',
                borderBottom: '1px solid var(--border-color)',
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: '#facc15',
                  color: '#000000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                }}
              >
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{user.name}</div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{user.email}</div>
              </div>
            </div>
          )}

          <button
            onClick={() => handleNavClick('dashboard')}
            className={`btn ${currentTab === 'dashboard' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ width: '100%', justifyContent: 'flex-start' }}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard & Insights</span>
          </button>

          <button
            onClick={() => handleNavClick('tasks')}
            className={`btn ${currentTab === 'tasks' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ width: '100%', justifyContent: 'flex-start' }}
          >
            <ListTodo size={18} />
            <span>Task Tracker</span>
          </button>

          <button
            onClick={logout}
            className="btn btn-danger"
            style={{ width: '100%', justifyContent: 'flex-start', marginTop: '0.5rem' }}
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .desktop-user { display: flex !important; }
          .desktop-logout { display: inline-flex !important; }
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </header>
  );
};
