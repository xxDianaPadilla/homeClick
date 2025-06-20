import React from 'react';
import { Clock, AlertTriangle } from 'lucide-react';

const Timer = ({ timeLeft, isExpired = false, className = "" }) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusClass = () => {
    if (isExpired) return 'expired';
    if (timeLeft <= 300) return 'warning'; // 5 minutos
    return 'normal';
  };

  return (
    <div className={`timer-container ${getStatusClass()} ${className}`} style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      padding: '0.75rem 1rem',
      backgroundColor: isExpired ? 'rgba(239, 68, 68, 0.1)' : timeLeft <= 300 ? 'rgba(255, 193, 7, 0.1)' : 'rgba(34, 197, 94, 0.1)',
      border: `1px solid ${isExpired ? 'rgba(239, 68, 68, 0.3)' : timeLeft <= 300 ? 'rgba(255, 193, 7, 0.4)' : 'rgba(34, 197, 94, 0.3)'}`,
      borderRadius: '8px',
      backdropFilter: 'blur(10px)',
      marginBottom: '1rem'
    }}>
      {isExpired ? (
        <AlertTriangle size={20} style={{ color: '#ef4444' }} />
      ) : (
        <Clock size={20} style={{ color: timeLeft <= 300 ? '#fbbf24' : '#10b981' }} />
      )}
      
      <div style={{ 
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: '0.875rem',
        fontFamily: 'Raleway, sans-serif',
        fontStyle: 'italic'
      }}>
        {isExpired ? (
          <span style={{ color: '#fca5a5' }}>El código ha expirado</span>
        ) : (
          <>
            <span>Tiempo restante: </span>
            <span style={{ 
              fontWeight: 'bold', 
              color: timeLeft <= 300 ? '#fbbf24' : '#60d394',
              fontFamily: 'Courier New, monospace'
            }}>
              {formatTime(timeLeft)}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default Timer;