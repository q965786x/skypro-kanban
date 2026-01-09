import { useRef, useState, useCallback } from "react";

export const useMobileDragDrop = (onDrop, columnStatus) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [draggedCard, setDraggedCard] = useState(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleTouchStart = useCallback((e, card) => {
    e.preventDefault();
    if (!card || !card.id) return;

    const touch = e.touches[0];
    const cardElement = e.currentTarget;
    const rect = cardElement.getBoundingClientRect();

    // Сохраняем смещение касания относительно карточки
    dragOffset.current = {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    };

    setDraggedCard(card);
    setIsDragging(true);

    // Позиционируем карточку
    setDragPosition({
      x: touch.clientX - dragOffset.current.x,
      y: touch.clientY - dragOffset.current.y,
    });

    // Добавляем стили для перетаскивания
    cardElement.style.position = "fixed";
    cardElement.style.zIndex = "9999";
    cardElement.style.pointerEvents = "none";
    cardElement.style.transform = `translate(${
      touch.clientX - dragOffset.current.x
    }px, ${touch.clientY - dragOffset.current.y}px) scale(1.05)`;
    cardElement.style.boxShadow = "0 10px 30px rgba(0,0,0,0.3)";
    cardElement.style.opacity = "0.9";

    // Скрываем оригинальную карточку
    const originalCard = cardElement.cloneNode(true);
    originalCard.style.opacity = "0.3";
    originalCard.style.pointerEvents = "none";
    cardElement.parentNode.insertBefore(originalCard, cardElement);
    cardRef.current = { originalCard, draggedElement: cardElement };
  }, []);

  const handleTouchMove = useCallback(
    (e) => {
      if (!isDragging) return;
      e.preventDefault();

      const touch = e.touches[0];
      const newX = touch.clientX - dragOffset.current.x;
      const newY = touch.clientY - dragOffset.current.y;

      setDragPosition({ x: newX, y: newY });

      if (cardRef.current?.draggedElement) {
        cardRef.current.draggedElement.style.transform = `translate(${newX}px, ${newY}px) scale(1.05)`;
      }

      // Находим колонку под пальцем
      const elementsAtPoint = document.elementsFromPoint(
        touch.clientX,
        touch.clientY
      );
      const columnElement = elementsAtPoint.find(
        (el) =>
          el.classList.contains("main-column") || el.closest(".main-column")
      );

      // Подсвечиваем колонку
      document.querySelectorAll(".main-column").forEach((col) => {
        col.style.backgroundColor = "";
        col.style.border = "";
      });

      if (columnElement) {
        const column = columnElement.classList.contains("main-column")
          ? columnElement
          : columnElement.closest(".main-column");
        column.style.backgroundColor = "rgba(86, 94, 239, 0.05)";
        column.style.border = "2px dashed #565eef";
      }
    },
    [isDragging]
  );

  const handleTouchEnd = useCallback(
    async (e) => {
      if (!isDragging || !draggedCard) return;

      setIsDragging(false);

      // Находим колонку, на которую была брошена карточка
      const touch = e.changedTouches[0];
      const elementsAtPoint = document.elementsFromPoint(
        touch.clientX,
        touch.clientY
      );
      const columnElement = elementsAtPoint.find(
        (el) =>
          el.classList.contains("main-column") || el.closest(".main-column")
      );

      // Убираем подсветку со всех колонок
      document.querySelectorAll(".main-column").forEach((col) => {
        col.style.backgroundColor = "";
        col.style.border = "";
      });

      // Восстанавливаем оригинальную карточку
      if (cardRef.current) {
        const { originalCard, draggedElement } = cardRef.current;

        if (draggedElement && draggedElement.parentNode) {
          draggedElement.style.position = "";
          draggedElement.style.zIndex = "";
          draggedElement.style.transform = "";
          draggedElement.style.boxShadow = "";
          draggedElement.style.opacity = "";
          draggedElement.style.pointerEvents = "";
        }

        if (originalCard && originalCard.parentNode) {
          originalCard.parentNode.removeChild(originalCard);
        }
      }

      // Если карточка была брошена на другую колонку
      if (columnElement && onDrop) {
        const column = columnElement.classList.contains("main-column")
          ? columnElement
          : columnElement.closest(".main-column");

        const newStatus = column
          .querySelector(".column-title")
          ?.textContent?.split(" (")[0];

        if (newStatus && newStatus !== draggedCard.status) {
          try {
            await onDrop(draggedCard.id, newStatus);
          } catch (error) {
            console.error("Ошибка при перемещении карточки:", error);
          }
        }
      }

      setDraggedCard(null);
      cardRef.current = null;
    },
    [isDragging, draggedCard, onDrop]
  );

  return {
    isDragging,
    dragPosition,
    draggedCard,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
};
