import React from 'react';

// A reusable modal component
const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) {
        return null;
    }

    // Styles for the modal components
    const backdropStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    };

    const modalStyle = {
        backgroundColor: '#fff',
        padding: '1.5rem',
        borderRadius: '15px',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
        width: '90%',
        maxWidth: '500px',
        zIndex: 1001,
    };

    const headerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #eee',
        paddingBottom: '1rem',
        marginBottom: '1rem',
    };

    const titleStyle = {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        margin: 0,
    };

    const closeButtonStyle = {
        background: 'none',
        border: 'none',
        fontSize: '2rem',
        cursor: 'pointer',
        lineHeight: '1',
        padding: '0 0.5rem',
    };

    return (
        // The backdrop closes the modal when clicked
        <div style={backdropStyle} onClick={onClose}>
            {/* Clicks inside the modal won't bubble up and close it */}
            <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
                <div style={headerStyle}>
                    <h2 style={titleStyle}>{title}</h2>
                    <button style={closeButtonStyle} onClick={onClose}>&times;</button>
                </div>
                <div>{children}</div>
            </div>
        </div>
    );
};

export default Modal;
