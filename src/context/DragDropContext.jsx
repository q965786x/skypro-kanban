import React, { createContext, useState, useContext, useCallback } from "react";

const DragDropContext = createContext();

export const useDragDrop = () => {
  const context = useContext(DragDropContext);
  if (!context) {
    throw new Error("useDragDrop must be used within DragDropProvider");
  }
  return context;
};

export const DragDropProvider = ({ children }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dropTarget, setDropTarget] = useState(null);
  const [notification, setNotification] = useState("");

  const startDrag = useCallback((item) => {
    setIsDragging(true);
    setDraggedItem(item);
  }, []);

  const endDrag = useCallback(() => {
    setIsDragging(false);
    setDraggedItem(null);
    setDropTarget(null);
  }, []);

  const setTarget = useCallback((target) => {
    setDropTarget(target);
  }, []);

  const showNotification = useCallback((message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 3000);
  }, []);

  const value = {
    isDragging,
    draggedItem,
    dropTarget,
    notification,
    startDrag,
    endDrag,
    setTarget,
    showNotification,
  };

  return (
    <DragDropContext.Provider value={value}>
      {children}
    </DragDropContext.Provider>
  );
};
