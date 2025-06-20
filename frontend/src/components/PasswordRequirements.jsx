import React from 'react';
import { Check, X } from 'lucide-react';

const PasswordRequirements = ({ password = '', className = "" }) => {
  const requirements = [
    {
      label: "Al menos 8 caracteres",
      test: password.length >= 8
    },
    {
      label: "Una letra mayúscula",
      test: /[A-Z]/.test(password)
    },
    {
      label: "Una letra minúscula", 
      test: /[a-z]/.test(password)
    },
    {
      label: "Un número",
      test: /\d/.test(password)
    },
    {
      label: "Un carácter especial",
      test: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    }
  ];

  const validCount = requirements.filter(req => req.test).length;
  const isValid = validCount >= 1; // Al menos el requisito de longitud

  return (
    <div className={`password-requirements ${className}`}>
      <div className="requirements-header">
        <span className="requirements-title">Requisitos de contraseña:</span>
        <span className={`requirements-progress ${isValid ? 'valid' : 'invalid'}`}>
          {validCount}/{requirements.length}
        </span>
      </div>
      
      <div className="requirements-list">
        {requirements.map((requirement, index) => (
          <div
            key={index}
            className={`requirement-item ${requirement.test ? 'valid' : 'invalid'}`}
          >
            <div className="requirement-icon">
              {requirement.test ? (
                <Check size={12} />
              ) : (
                <X size={12} />
              )}
            </div>
            <span className="requirement-text">{requirement.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasswordRequirements;