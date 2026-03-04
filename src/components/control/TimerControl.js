import React from 'react';
import { TIMER_STATES } from '../../utils/constants.js';
import Timer from "../common/Timer";

const TimerControls = ({
    handleSetTime,
    handleStartTimer,
    handlePauseTimer,
    timerState,
    timeLeft,
    isExtended,
    timerId,
    disabled,
    showPresetButtons = true,
    startLabel = 'START',
}) => {
    const isRunning = timerState === TIMER_STATES.RUNNING;
    // Allow setting time when paused or stopped
    const canSetTime = !disabled && (timerState === TIMER_STATES.PAUSED || timerState === TIMER_STATES.STOPPED);
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        alignItems: 'center',
    };

    const timeSetRowStyle = {
        display: 'flex',
        gap: '0.5rem',
    };

    const timeSetButtonStyle = {
        padding: '0.5rem',
        fontSize: '0.8rem',
        fontWeight: 'bold',
        border: '1px solid #ccc',
        borderRadius: '4px',
        cursor: 'pointer',
        backgroundColor: '#f0f0f0',
        minWidth: '45px',
    };

    const disabledTimeSetButtonStyle = {
        ...timeSetButtonStyle,
        cursor: 'not-allowed',
        opacity: 0.5,
    };

    const startStopButtonStyle = {
        padding: '0.5rem 1rem',
        fontSize: '1rem',
        fontWeight: 'bold',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        color: 'white',
        width: '100%',
        backgroundColor: isRunning ? '#dc3545' : '#28a745',
    };

    const disabledstartStopButtonStyle = {
        ...startStopButtonStyle,
        cursor: 'not-allowed',
        opacity: 0.5,
    };

    const buttonText = isRunning ? 'STOP' : startLabel;

    return (
        <div style={containerStyle}>
            {showPresetButtons && (
                <div style={timeSetRowStyle}>
                    <button
                        style={canSetTime ? timeSetButtonStyle : disabledTimeSetButtonStyle}
                        onClick={() => handleSetTime(60, timerId)}
                        disabled={!canSetTime}
                    >
                        1 MIN
                    </button>
                    {timerId === "main" && (
                        <button
                            style={canSetTime ? timeSetButtonStyle : disabledTimeSetButtonStyle}
                            onClick={() => handleSetTime(180, timerId)}
                            disabled={!canSetTime}
                        >
                            3 MIN
                        </button>
                    )}
                    {timerId === "sub" && (
                        <button
                            style={canSetTime ? timeSetButtonStyle : disabledTimeSetButtonStyle}
                            onClick={() => handleSetTime(300, timerId)}
                            disabled={!canSetTime}
                        >
                            5 MIN
                        </button>
                    )}
                </div>
            )}
            <button
                style={disabled ? disabledstartStopButtonStyle : startStopButtonStyle}
                onClick={isRunning ? () => handlePauseTimer(timerId) : () => handleStartTimer(timerId)}
                disabled={disabled}
            >
                {buttonText}
            </button>
            <div style={timeSetRowStyle}>
                <Timer
                    timeLeft={timeLeft}
                    timerState={timerState}
                    isExtended={isExtended}
                    fontSize="2.5rem"
                />
            </div>
        </div>
    );
};

export default TimerControls;
