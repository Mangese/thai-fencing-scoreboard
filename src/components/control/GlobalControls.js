import React, { useState } from 'react';
import { SCREEN_TYPES } from '../../utils/constants.js';
import Modal from './modal.js'; // Adjust path if needed

const GlobalControls = ({
                            shouldShowExtension, // Prop passed from parent
                            handleResetTimer,
                            handleExtendTimer,
                            setCurrentScreen,
                            resetGame
                        }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Style for the main "More Options" button
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0.5rem 0',
    };

    const moreOptionsButtonStyle = {
        padding: '1rem 2rem',
        border: 'none',
        borderRadius: '0.5rem',
        fontSize: '1.1rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        backgroundColor: '#6c757d',
        color: 'white',
        width: '100%',
        maxWidth: '400px',
    };

    // Styles for the grid of buttons inside the modal
    const modalButtonContainerStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '1rem',
    };

    // Base style for each button in the modal
    const modalButtonStyle = {
        padding: '0', border: 'none', borderRadius: '0.5rem', fontSize: '1.1rem',
        fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s ease',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', gap: '0.25rem', minHeight: '4.3rem'
    };

    // Specific colors for modal buttons
    const resetButtonStyle = { ...modalButtonStyle, backgroundColor: '#6c757d', color: 'white' };
    const navigationButtonStyle = { ...modalButtonStyle, backgroundColor: '#17a2b8', color: 'white' };
    const dangerButtonStyle = { ...modalButtonStyle, backgroundColor: '#dc3545', color: 'white' };
    const extendButtonStyle = { ...modalButtonStyle, backgroundColor: '#007bff', color: 'white', gridColumn: 'span 2' };

    const iconStyle = { fontSize: '1.5rem' };
    const labelStyle = { fontSize: '0.9rem' };

    return (
        <>
            <div style={containerStyle}>
                <button
                    style={moreOptionsButtonStyle}
                    onClick={() => setIsModalOpen(true)}
                >
                    <span style={iconStyle}>⚙️</span>
                    <span>More Options</span>
                </button>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Match Controls">
                <div style={modalButtonContainerStyle}>
                    <button style={resetButtonStyle} onClick={handleResetTimer}>
                        <div style={iconStyle}>🔄</div><div style={labelStyle}>RESET TIME</div>
                    </button>
                    <button style={navigationButtonStyle} onClick={() => setCurrentScreen(SCREEN_TYPES.LOGS)}>
                        <div style={iconStyle}>📋</div><div style={labelStyle}>LOGS</div>
                    </button>
                    <button style={navigationButtonStyle} onClick={() => setCurrentScreen(SCREEN_TYPES.SUMMARY)}>
                        <div style={iconStyle}>📊</div><div style={labelStyle}>SUMMARY</div>
                    </button>
                    <button style={navigationButtonStyle} onClick={() => setCurrentScreen(SCREEN_TYPES.SETUP)}>
                        <div style={iconStyle}>⚙️</div><div style={labelStyle}>SETUP</div>
                    </button>
                    <button
                        style={dangerButtonStyle}
                        onClick={() => {
                            if (window.confirm('Start new match? This will reset all scores and timer.')) {
                                resetGame();
                                setIsModalOpen(false); // Close modal after action
                            }
                        }}
                    >
                        <div style={iconStyle}>🆕</div><div style={labelStyle}>NEW MATCH</div>
                    </button>
                    {shouldShowExtension && (
                        <button style={extendButtonStyle} onClick={handleExtendTimer}>
                            <div style={iconStyle}>⏰</div><div style={labelStyle}>EXTEND +1:00</div>
                        </button>
                    )}
                </div>
            </Modal>
        </>
    );
};

export default GlobalControls;
