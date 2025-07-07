
import React from 'react';

interface InfoBoxProps {
    children: React.ReactNode;
    type?: 'info' | 'warning' | 'success';
}

const InfoBox: React.FC<InfoBoxProps> = ({ children, type = 'info' }) => {
    const baseClasses = "p-4 rounded-lg my-4 text-sm";
    const typeClasses = {
        info: "bg-blue-100 border border-blue-300 text-blue-800",
        warning: "bg-yellow-100 border border-yellow-300 text-yellow-800",
        success: "bg-green-100 border border-green-300 text-green-800",
    };

    return (
        <div className={`${baseClasses} ${typeClasses[type]}`} role="alert">
            {children}
        </div>
    );
};

export default InfoBox;
