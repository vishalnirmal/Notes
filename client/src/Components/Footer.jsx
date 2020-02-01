import React from 'react';

export default function Footer(){
    const year = (new Date()).getFullYear();
    return (
        <div className="fixed-bottom footer">
            <p className="m-0 p-0">&copy; Copyright {year} Vishal Nirmal</p>
        </div>
    );
}