import React from 'react';
import logoFromFile from '../../assets/logo.jpg';

const CompetitionLogo = ({
                             src = logoFromFile,
                             alt = 'Competition Logo',
                             maxWidth = '100%',
                             maxHeight = '100%', // Added this prop
                             className = ''
                         }) => {
    // The container div will fill the grid cell and apply the max-width/height
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        maxWidth,  // Apply size constraint from parent
        maxHeight, // Apply size constraint from parent
    };

    // The img tag will fill the container, but `objectFit` will prevent distortion
    const logoStyle = {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
    };

    return (
        <div className={`competition-logo-container ${className}`} style={containerStyle}>
            <img
                src={src}
                alt={alt}
                style={logoStyle}
                onError={(e) => {
                    // Hide image if it fails to load
                    e.target.style.display = 'none';
                }}
            />
        </div>
    );
};

export default CompetitionLogo;