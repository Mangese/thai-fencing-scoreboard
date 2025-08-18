import React, { useRef, useState } from 'react';
import TeamLogo from '../common/TeamLogo.js';

const LogoUpload = ({
                      logoData,
                      onLogoChange,
                      playerName,
                      className = ''
                    }) => {
  const fileInputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFileSelect = (file) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      onLogoChange(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveLogo = () => {
    onLogoChange(null);
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
    border: dragOver ? '2px dashed #007bff' : '2px dashed #ddd',
    borderRadius: '10px',
    backgroundColor: dragOver ? '#f8f9ff' : '#fff',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    minHeight: '200px',
    justifyContent: 'center'
  };

  const buttonStyle = {
    padding: '0.5rem 1rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease'
  };

  const removeButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#dc3545',
    marginLeft: '0.5rem'
  };

  const instructionStyle = {
    textAlign: 'center',
    color: '#666',
    fontSize: '0.9rem',
    marginTop: '0.5rem'
  };

  const labelStyle = {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '0.5rem'
  };

  return (
    <div className={`logo-upload ${className}`}>
      <div style={labelStyle}>
        ตราสังกัด
      </div>

      <div
        style={containerStyle}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          style={{ display: 'none' }}
        />

        <TeamLogo logoData={logoData} size="120px" />

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button
            type="button"
            style={buttonStyle}
            onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
          >
            {logoData ? 'Change Logo' : 'Upload Logo'}
          </button>

          {logoData && (
            <button
              type="button"
              style={removeButtonStyle}
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveLogo();
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#c82333'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
            >
              Remove
            </button>
          )}
        </div>

        <div style={instructionStyle}>
          {logoData ? (
            'Click to change or drag new image here'
          ) : (
            'Click to upload or drag image here'
          )}
          <br />
          <small>Supported: JPG, PNG, GIF (Max 5MB)</small>
        </div>
      </div>
    </div>
  );
};

export default LogoUpload;
