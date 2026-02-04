
import React from 'react';
import { DuckInfo } from '../types';

interface DuckProps {
  duck: DuckInfo;
  onClick: (duck: DuckInfo) => void;
  disabled?: boolean;
  isWinning?: boolean;
}

const Duck: React.FC<DuckProps> = ({ duck, onClick, disabled, isWinning }) => {
  return (
    <button
      onClick={() => onClick(duck)}
      disabled={disabled}
      className={`
        relative group transition-transform duration-300 transform 
        ${disabled ? 'cursor-default' : 'hover:scale-110 active:scale-95'}
        ${isWinning ? 'animate-bounce' : ''}
      `}
    >
      <svg
        width="140"
        height="140"
        viewBox="0 0 100 100"
        className="drop-shadow-xl"
      >
        {/* Body */}
        <path
          d="M20 60 Q20 30 50 30 Q80 30 80 60 Q80 85 50 85 Q20 85 20 60"
          fill={duck.hex}
          stroke="#000"
          strokeWidth="1.5"
        />
        {/* Head */}
        <circle cx="70" cy="35" r="18" fill={duck.hex} stroke="#000" strokeWidth="1.5" />
        {/* Beak */}
        <path
          d="M85 35 Q95 35 95 40 Q85 45 80 40"
          fill="#F59E0B"
          stroke="#000"
          strokeWidth="1.5"
        />
        {/* Eye */}
        <circle cx="78" cy="30" r="2.5" fill="#000" />
        {/* Wing */}
        <path
          d="M35 60 Q30 50 50 50 Q60 50 55 60"
          fill="none"
          stroke="#000"
          strokeWidth="1"
          opacity="0.3"
        />
      </svg>
      {isWinning && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-4xl animate-pulse">
          ✨
        </div>
      )}
    </button>
  );
};

export default React.memo(Duck);
