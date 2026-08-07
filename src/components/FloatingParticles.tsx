import React from 'react';

export const FloatingParticles: React.FC<{ theme: 'dark' | 'light' }> = ({ theme }) => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Top Left Glowing Orb */}
      <div
        className={`absolute -top-32 -left-32 w-96 h-96 rounded-full blur-[120px] transition-opacity duration-1000 animate-purple-glow ${
          theme === 'dark'
            ? 'bg-purple-900/40'
            : 'bg-purple-300/30'
        }`}
      />

      {/* Center Right Glowing Orb */}
      <div
        className={`absolute top-1/3 -right-20 w-[30rem] h-[30rem] rounded-full blur-[140px] transition-opacity duration-1000 animate-purple-glow ${
          theme === 'dark'
            ? 'bg-purple-800/25'
            : 'bg-purple-200/40'
        }`}
        style={{ animationDelay: '2s' }}
      />

      {/* Bottom Left Glowing Orb */}
      <div
        className={`absolute -bottom-20 left-1/4 w-80 h-80 rounded-full blur-[100px] transition-opacity duration-1000 animate-purple-glow ${
          theme === 'dark'
            ? 'bg-violet-950/40'
            : 'bg-purple-100/50'
        }`}
        style={{ animationDelay: '4s' }}
      />

      {/* Subtle Floating Dust Particles */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full animate-float ${
              theme === 'dark' ? 'bg-purple-300' : 'bg-purple-600'
            }`}
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};
