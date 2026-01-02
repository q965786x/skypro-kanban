import React, { useState, useMemo } from "react";
import {
  SCalendar,
  SCalendarTitle,
  SCalendarBlock,
  SCalendarNav,
  SCalendarMonth,
  SNavActions,
  SNavAction,
  SCalendarContent,
  SCalendarDaysNames,
  SCalendarCells,
} from "./Calendar.styled";

const Calendar = ({ mode = "new", selectedDate = "", onDateSelect }) => {
  const [currentMonthDate, setCurrentMonthDate] = useState(new Date());

  // Определяем сегодняшнюю дату
  const today = useMemo(() => {
    const now = new Date();
    return {
      day: now.getDate(),
      month: now.getMonth(),
      year: now.getFullYear()
    };
  }, []);

  // Парсим выбранную дату, если она передана
  const parsedSelectedDate = useMemo(() => {
    if (!selectedDate) return null;

    // Пробуем разные форматы даты
    const formats = [
      /(\d{1,2})\.(\d{1,2})\.(\d{4})/, // DD.MM.YYYY
      /(\d{4})-(\d{1,2})-(\d{1,2})/,   // YYYY-MM-DD
    ];

    for (const format of formats) {
      const match = selectedDate.match(format);
      if (match) {
        const day = parseInt(match[3] || match[1], 10);
        const month = parseInt(match[2] || match[2], 10) - 1;
        const year = parseInt(match[1] || match[3], 10);
        
        return { day, month, year };
      }
    }
        
    return null;
  }, [selectedDate]);

  // Генерируем дни для текущего месяца
  const { days, monthName, year, month } = useMemo(() => {
    const year = currentMonthDate.getFullYear();
    const month = currentMonthDate.getMonth();
    

    // Название месяца на русском
    const monthNames = [
      "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
      "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
    ];
    const monthName = monthNames[month];

    // Первый день месяца
    const firstDay = new Date(year, month, 1);
    // Последний день месяца
    const lastDay = new Date(year, month + 1, 0);
    // День недели первого дня (0 - воскресенье, 1 - понедельник)
    const firstDayOfWeek = firstDay.getDay();
    const adjustedFirstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

    // Дни предыдущего месяца
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    const prevMonthDays = [];
    for (let i = adjustedFirstDayOfWeek - 1; i >= 0; i--) {
      const dayNum = prevMonthLastDay - i;
      const prevMonth = month === 0 ? 11 : month - 1;
      const prevYear = month === 0 ? year - 1 : year;
      
      prevMonthDays.push({
        day: dayNum,
        month: prevMonth,
        year: prevYear,
        type: "_other-month",
        isCurrentMonth: false
      });
    }

    // Дни текущего месяца
    const currentMonthDays = [];
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const isToday = (
        i === today.day &&
        month === today.month &&
        year === today.year
      );
      
      const date = new Date(year, month, i);
      const dayOfWeek = date.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      
      const isSelected = parsedSelectedDate && (
        i === parsedSelectedDate.day &&
        month === parsedSelectedDate.month &&
        year === parsedSelectedDate.year
      );
      
      currentMonthDays.push({
        day: i,
        month,
        year,
        type: `_cell-day ${isWeekend ? "_weekend" : ""} ${isToday ? "_current" : ""} ${isSelected ? "_active-day" : ""}`.trim(),
        isCurrentMonth: true,
        isToday,
        isSelected
      });
    }

    // Дни следующего месяца
    const totalCells = 42; // 6 недель по 7 дней
    const nextMonthDays = [];
    const remainingCells = totalCells - (prevMonthDays.length + currentMonthDays.length);
    
    for (let i = 1; i <= remainingCells; i++) {
      const nextMonth = month === 11 ? 0 : month + 1;
      const nextYear = month === 11 ? year + 1 : year;
      
      nextMonthDays.push({
        day: i,
        month: nextMonth,
        year: nextYear,
        type: "_other-month",
        isCurrentMonth: false
      });
    }

    return {
      days: [...prevMonthDays, ...currentMonthDays, ...nextMonthDays],
      monthName,
      year,
      month
    };
  }, [currentMonthDate, today, parsedSelectedDate]);

  const dayNames = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];

  const handleDayClick = (day) => {
    if (!day.isCurrentMonth || mode === "browse") return;
    
    // Форматируем дату в формат DD.MM.YYYY
    const formattedDate = `${day.day.toString().padStart(2, "0")}.${(day.month + 1).toString().padStart(2, "0")}.${day.year}`;
    
    if (onDateSelect) {
      onDateSelect(formattedDate);
    }
  };

  const handlePrevMonth = () => {
    setCurrentMonthDate(new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonthDate(new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() + 1, 1));
  };

  // Форматируем выбранную дату для отображения
  const displayDate = useMemo(() => {
    if (!selectedDate) return "не выбран";
    
    // Если дата в формате DD.MM.YYYY, оставляем как есть
    if (selectedDate.match(/\d{1,2}\.\d{1,2}\.\d{4}/)) {
      return selectedDate;
    }
    
    // Если дата в формате YYYY-MM-DD, конвертируем
    if (selectedDate.match(/\d{4}-\d{1,2}-\d{1,2}/)) {
      const [year, month, day] = selectedDate.split('-');
      return `${day.padStart(2, '0')}.${month.padStart(2, '0')}.${year}`;
    }
    
    return selectedDate;
  }, [selectedDate]);


  return (
    <SCalendar>
      <SCalendarTitle>Даты</SCalendarTitle>
      <SCalendarBlock>
        <SCalendarNav>
          <SCalendarMonth>
            {monthName} {year}
          </SCalendarMonth>
          <SNavActions>
            <SNavAction 
              data-action="prev"
              onClick={handlePrevMonth}
              style={{ cursor: 'pointer' }}
              >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="6"
                height="11"
                viewBox="0 0 6 11"
              >
                <path d="M5.72945 1.95273C6.09018 1.62041 6.09018 1.0833 5.72945 0.750969C5.36622 0.416344 4.7754 0.416344 4.41218 0.750969L0.528487 4.32883C-0.176162 4.97799 -0.176162 6.02201 0.528487 6.67117L4.41217 10.249C4.7754 10.5837 5.36622 10.5837 5.72945 10.249C6.09018 9.9167 6.09018 9.37959 5.72945 9.04727L1.87897 5.5L5.72945 1.95273Z" />
              </svg>
            </SNavAction>
            <SNavAction 
              data-action="next"
              onClick={handleNextMonth}
              style={{ cursor: 'pointer' }}
              >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="6"
                height="11"
                viewBox="0 0 6 11"
              >
                <path d="M0.27055 9.04727C-0.0901833 9.37959 -0.0901832 9.9167 0.27055 10.249C0.633779 10.5837 1.2246 10.5837 1.58783 10.249L5.47151 6.67117C6.17616 6.02201 6.17616 4.97799 5.47151 4.32883L1.58782 0.75097C1.2246 0.416344 0.633778 0.416344 0.270549 0.75097C-0.0901831 1.0833 -0.090184 1.62041 0.270549 1.95273L4.12103 5.5L0.27055 9.04727Z" />
              </svg>
            </SNavAction>
          </SNavActions>
        </SCalendarNav>
        <SCalendarContent>
          <SCalendarDaysNames>
            {dayNames.map((dayName, index) => (
              <div
                key={index}
                className={`calendar__day-name ${
                  index >= 5 ? "-weekend-" : ""
                }`}
              >
                {dayName}
              </div>
            ))}
          </SCalendarDaysNames>
          <SCalendarCells>
            {days.map((day, index) => (
              <div
                key={index}
                className={`calendar__cell ${day.type}`}
                onClick={() => handleDayClick(day)}
                style={{
                  cursor: day.isCurrentMonth && mode !== "browse" ? "pointer" : "default",
                  fontWeight: day.isToday ? "bold" : "normal",
                  backgroundColor: day.isSelected ? "#e6e6ff" : "transparent",
                  opacity: day.isCurrentMonth ? 1 : 0.4,
                }}
              >
                {day.day}
              </div>
            ))}
          </SCalendarCells>
        </SCalendarContent>
        <input 
          type="hidden" 
          id="datepick_value" 
          value={selectedDate} 
          />
        <div className="calendar__period">
          {mode === "new" || mode === "edit" ? (
            <p className="calendar__p date-end">
              Выберите срок исполнения{" "}
              <span 
                className="date-control"
                style={{ 
                  color: displayDate !== "не выбран" ? "#565eef" : "#94a6be",
                  fontWeight: displayDate !== "не выбран" ? "600" : "normal"
                }}
              >
                {displayDate}
              </span>
            </p>
          ) : (
            <p className="calendar__p date-end">
              Срок исполнения:{" "}
              <span className="date-control" style={{ color: "#565eef", fontWeight: "600" }}>
                {displayDate}
              </span>
            </p>
          )}
        </div>
      </SCalendarBlock>
    </SCalendar>
  );
};

export default Calendar;
