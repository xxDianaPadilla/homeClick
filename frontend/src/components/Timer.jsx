import React from 'react';
import { Clock, AlertTriangle } from 'lucide-react';

const Timer = ({ timeLeft, isExpired = false, className = "" }) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusColor = () => {
    if (isExpired) return 'expired';
    if (timeLeft <= 300) return 'warning'; // 5 minutos
    return 'normal';
  };

  return (
    <div className={`timer-container ${getStatusColor()} ${className}`}>
      <div className="timer-content">
        {isExpired ? (
          <AlertTriangle className="timer-icon" size={20} />
        ) : (
          <Clock className="timer-icon" size={20} />
        )}
        
        <div className="timer-text">
          {isExpired ? (
            <span className="timer-expired">El código ha expirado</span>
          ) : (
            <>
              <span className="timer-label">Tiempo restante:</span>
              <span className="timer-value">{formatTime(timeLeft)}</span>
            </>
          )}
        </div>
      </div>
      
      {!isExpired && (
        <div className="timer-progress">
          <div 
            className="timer-progress-bar"
            style={{ 
              width: `${(timeLeft / 1200) * 100}%`,
              backgroundColor: timeLeft <= 300 ? '#ef4444' : '#10b981'
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Timer;