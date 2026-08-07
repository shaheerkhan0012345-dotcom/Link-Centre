import React from 'react';
import * as Icons from 'lucide-react';

interface IconResolverProps {
  name: string;
  className?: string;
  size?: number;
}

export const IconResolver: React.FC<IconResolverProps> = ({ name, className = 'w-5 h-5', size = 20 }) => {
  // If it's an image URL
  if (name && (name.startsWith('http://') || name.startsWith('https://') || name.startsWith('data:'))) {
    return (
      <img
        src={name}
        alt="icon"
        className={`object-cover rounded-full ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }

  // Check if it's an emoji
  if (name && /\p{Extended_Pictographic}/u.test(name)) {
    return <span style={{ fontSize: `${size}px` }} className="select-none leading-none">{name}</span>;
  }

  // Fallback to Lucide icon map
  const IconComponent = (Icons as unknown as Record<string, React.ElementType>)[name] || Icons.Sparkles;

  return <IconComponent className={className} size={size} />;
};
