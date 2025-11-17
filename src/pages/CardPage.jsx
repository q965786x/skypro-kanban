import React, { useEffect }  from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from '../components/Header/Header';
import Main from '../components/Main/Main';
import PopBrowse from '../components/PopBrowse/PopBrowse';

const CardPage = ({ onLogout, cards }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const card = cards.find(card => card.id === parseInt(id));
  
  const handleClose = () => {
    navigate('/'); // Возврат на главную
  };

  // Добавляем обработчик клавиши Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <div className="wrapper">
      {/* Показываем основной интерфейс */}
      <Header onLogout={onLogout} />
      <Main cards={cards} />
      
      {/* Поверх всего показываем модальное окно просмотра карточки */}
      {card && (
        <PopBrowse 
          card={card}
          onClose={handleClose}
        />
      )}
    </div>
  );  
};

export default CardPage;
