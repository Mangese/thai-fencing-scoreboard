import React from 'react';
import { WARNING_TYPES, WARNING_DISPLAY } from '../../utils/constants.js';

const WarningIcons = ({
                        warnings,
                        size = '5rem',
                        className = '',
                        showCount = true,
                        // Add color props for more control
                        activeColor = '#d9534f', // A nice red for active warnings
                        inactiveColor = 'transparent' // A light grey for inactive
                      }) => {
  const containerStyle = {
    display: 'flex',
    gap: '3rem',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap'
  };

  const warningStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    fontSize: size,
    color: inactiveColor // Use the inactive color
  };

  const activeWarningStyle = {
    ...warningStyle,
    color: activeColor, // Use the active color
    filter: 'drop-shadow(0 0 3px rgba(0,0,0,0.2))'
  };

  // ... (countStyle remains the same)
  const countStyle = {
    fontSize: '1rem',
    // fontWeight: 'bold',
    color: 'transparent',
    // ... rest of countStyle
  };

  return (
      <div className={`warning-icons ${className}`} style={containerStyle}>
        {Object.values(WARNING_TYPES).map((warningType) => {
          const warningCount = warnings[warningType] || 0;
          // Destructure the icon as a component
          const { icon: IconComponent, label } = WARNING_DISPLAY[warningType];
          const isActive = warningCount > 0;

          return (
              <div
                  key={warningType}
                  style={isActive ? activeWarningStyle : warningStyle}
                  title={`${label}: ${warningCount}`}
              >
                {/* Render the icon as a component */}
                <IconComponent />
              </div>
          );
        })}
      </div>
  );
};

export default WarningIcons;