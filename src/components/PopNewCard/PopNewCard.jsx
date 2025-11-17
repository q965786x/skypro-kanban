import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from '../Calendar/Calendar'
import { 
  SPopNewCard, 
  SPopNewCardContainer, 
  SPopNewCardBlock, 
  SPopNewCardContent,
  SPopNewCardTtl,
  SPopNewCardClose,
  SPopNewCardWrap,
  SFormNew,
  SFormNewBlock,
  SFormNewInput,
  SFormNewArea,
  SFormNewCreate,
  SCategories,
  SCategoriesP,
  SCategoriesThemes,
  SCategoriesTheme
} from './PopNewCard.styled';

const PopNewCard = ({ isOpen, onClose, onCreateCard }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('Web Design');
  const [selectedDate, setSelectedDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      const today = new Date();
      const formattedDate = `${today.getDate().toString().padStart(2, '0')}.${(today.getMonth() + 1).toString().padStart(2, '0')}.${today.getFullYear()}`;
      setSelectedDate(formattedDate);
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('Пожалуйста, введите название задачи');
      return;
    }

    const newCard = {
      title: title.trim(),
      description: description.trim(),
      topic: selectedTopic,
      date: selectedDate
    };

    onCreateCard(newCard);
    navigate('/'); // Возвращаемся на главную после создания
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      navigate('/'); // Возвращаемся на главную при клике на фон
    }
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  if (!isOpen) return null;


  return (
    <SPopNewCard style={{ display: 'block' }}>
      <SPopNewCardContainer>
        <SPopNewCardBlock>
          <SPopNewCardContent>
            <SPopNewCardTtl>Создание задачи</SPopNewCardTtl>
            <SPopNewCardClose onClick={onClose}>&#10006;</SPopNewCardClose>
            
            <SPopNewCardWrap>
              <SFormNew onSubmit={handleSubmit}>
                <SFormNewBlock>
                  <label htmlFor="formTitle" className="subttl">Название задачи</label>
                  <SFormNewInput 
                    type="text" 
                    name="name" 
                    id="formTitle" 
                    placeholder="Введите название задачи..." 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    autoFocus 
                    required
                  />
                </SFormNewBlock>
                
                <SFormNewBlock>
                  <label htmlFor="textArea" className="subttl">Описание задачи</label>
                  <SFormNewArea 
                    name="text" 
                    id="textArea" 
                    placeholder="Введите описание задачи..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="4"
                  ></SFormNewArea>
                </SFormNewBlock>
              </SFormNew>
              
              <Calendar 
                mode="new" 
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
              />
            </SPopNewCardWrap>
            
            <SCategories>
              <SCategoriesP className="subttl">Категория</SCategoriesP>
              <SCategoriesThemes>
                <SCategoriesTheme 
                  className={`_orange ${selectedTopic === 'Web Design' ? '_active-category' : ''}`}
                  onClick={() => setSelectedTopic('Web Design')}
                >
                  <p className="_orange">Web Design</p>
                </SCategoriesTheme>
                <SCategoriesTheme 
                  className={`_green ${selectedTopic === 'Research' ? '_active-category' : ''}`}
                  onClick={() => setSelectedTopic('Research')}
                >
                  <p className="_green">Research</p>
                </SCategoriesTheme>
                <SCategoriesTheme 
                  className={`_purple ${selectedTopic === 'Copywriting' ? '_active-category' : ''}`}
                  onClick={() => setSelectedTopic('Copywriting')}
                >
                  <p className="_purple">Copywriting</p>
                </SCategoriesTheme>
              </SCategoriesThemes>
            </SCategories>
            
            <SFormNewCreate 
              className="_hover01" 
              id="btnCreate"
              onClick={handleSubmit}
            >
              Создать задачу
            </SFormNewCreate>
          </SPopNewCardContent>
        </SPopNewCardBlock>
      </SPopNewCardContainer>
    </SPopNewCard>
  );
};

export default PopNewCard;