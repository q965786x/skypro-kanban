import React, { useState, useEffect } from 'react';
import Column from '../Column/Column';
import { getCardsByStatus, statuses } from '../../../data';

const Main = () => {
    const [isLoading, setIsLoading] = useState(true);

    // Имитация загрузки данных
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);

        // Очистка таймера
        return () => clearTimeout(timer);
    }, []);

    // Если данные загружаются, показываем индикатор загрузки
    if (isLoading) {
        return (
            <main className="main">
                <div className="container">
                    <div className="main__block">
                        <div className="loading-container">
                            <div className='loading-text'>Данные загружаются...</div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    // После загрузки показываем карточки
    return (       
	    <main className="main">
            <div className="container">
                <div className="main__block">
                <div className="main__content">
                    {statuses.map((status) => (
                        <Column 
                            key={status}
                            title={status}
                            cards={getCardsByStatus(status)}
                        />                        
                    ))}
                </div>
                </div>
            </div>
        </main>
    );
};

export default Main;