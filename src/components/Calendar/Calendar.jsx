import React from 'react';

const Calendar = ({ mode = 'new', selectedDate = '08.09.2023' }) => {
  const days = [
    { day: 28, type: '_other-month' }, { day: 29, type: '_other-month' }, { day: 30, type: '_other-month' },
    { day: 31, type: '_cell-day' }, { day: 1, type: '_cell-day' }, { day: 2, type: '_cell-day _weekend' }, { day: 3, type: '_cell-day _weekend' },
    { day: 4, type: '_cell-day' }, { day: 5, type: '_cell-day' }, { day: 6, type: '_cell-day' }, { day: 7, type: '_cell-day' },
    { day: 8, type: '_cell-day _current' }, { day: 9, type: '_cell-day _weekend' + (mode === 'browse' ? ' _active-day' : '') },
    { day: 10, type: '_cell-day _weekend' }, { day: 11, type: '_cell-day' }, { day: 12, type: '_cell-day' }, { day: 13, type: '_cell-day' },
    { day: 14, type: '_cell-day' }, { day: 15, type: '_cell-day' }, { day: 16, type: '_cell-day _weekend' }, { day: 17, type: '_cell-day _weekend' },
    { day: 18, type: '_cell-day' }, { day: 19, type: '_cell-day' }, { day: 20, type: '_cell-day' }, { day: 21, type: '_cell-day' },
    { day: 22, type: '_cell-day' }, { day: 23, type: '_cell-day _weekend' }, { day: 24, type: '_cell-day _weekend' }, { day: 25, type: '_cell-day' },
    { day: 26, type: '_cell-day' }, { day: 27, type: '_cell-day' }, { day: 28, type: '_cell-day' }, { day: 29, type: '_cell-day' },
    { day: 30, type: '_cell-day _weekend' }, { day: 1, type: '_other-month _weekend' }
  ];

  const dayNames = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

  return (
    <div className="pop-new-card__calendar calendar">
      <p className="calendar__ttl subttl">Даты</p>
      <div className="calendar__block">
        <div className="calendar__nav">
          <div className="calendar__month">Сентябрь 2023</div>
          <div className="nav__actions">
            <div className="nav__action" data-action="prev">
              <svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11">
                <path d="M5.72945 1.95273C6.09018 1.62041 6.09018 1.0833 5.72945 0.750969C5.36622 0.416344 4.7754 0.416344 4.41218 0.750969L0.528487 4.32883C-0.176162 4.97799 -0.176162 6.02201 0.528487 6.67117L4.41217 10.249C4.7754 10.5837 5.36622 10.5837 5.72945 10.249C6.09018 9.9167 6.09018 9.37959 5.72945 9.04727L1.87897 5.5L5.72945 1.95273Z" />
              </svg>
            </div>
            <div className="nav__action" data-action="next">
              <svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11">
                <path d="M0.27055 9.04727C-0.0901833 9.37959 -0.0901832 9.9167 0.27055 10.249C0.633779 10.5837 1.2246 10.5837 1.58783 10.249L5.47151 6.67117C6.17616 6.02201 6.17616 4.97799 5.47151 4.32883L1.58782 0.75097C1.2246 0.416344 0.633778 0.416344 0.270549 0.75097C-0.0901831 1.0833 -0.090184 1.62041 0.270549 1.95273L4.12103 5.5L0.27055 9.04727Z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="calendar__content">
          <div className="calendar__days-names">
            {dayNames.map((dayName, index) => (
              <div key={index} className={`calendar__day-name ${index >= 5 ? '-weekend-' : ''}`}>
                {dayName}
              </div>
            ))}
          </div>
          <div className="calendar__cells">
            {days.map((day, index) => (
              <div key={index} className={`calendar__cell ${day.type}`}>
                {day.day}
              </div>
            ))}
          </div>
        </div>
        <input type="hidden" id="datepick_value" value={selectedDate} />
        <div className="calendar__period">
          {mode === 'new' ? (
            <p className="calendar__p date-end">Выберите срок исполнения <span className="date-control"></span>.</p>
          ) : (
            <p className="calendar__p date-end">Срок исполнения: <span className="date-control">09.09.23</span></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendar;