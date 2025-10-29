import React from 'react';
import Column from '../Column/Column';

const Main = () => {

    const columns = [
        { title: 'Без статуса', tasks: 5 },
        { title: 'Нужно сделать', tasks: 1 },
        { title: 'В работе', tasks: 3 },
        { title: 'Тестирование', tasks: 1 },
        { title: 'Готово', tasks: 1 }
    ];

    return (       
	    <main className="main">
            <div className="container">
                <div className="main__block">
                <div className="main__content">
                    {columns.map((column, index) => (
                    <Column 
                        key={index}
                        title={column.title}
                        taskCount={column.tasks}
                    />
                    ))}
                </div>
                </div>
            </div>
        </main>
    );
};

export default Main;