import React, { useState } from 'react';
import { format, isValid } from 'date-fns';

const LifeEventsManager = ({ lifeEvents, onLifeEventsChange, birthDate, onBirthDateChange }) => {
  const [newEventName, setNewEventName] = useState('');
  const [newEventStart, setNewEventStart] = useState('');
  const [newEventEnd, setNewEventEnd] = useState('');
  const [newEventColor, setNewEventColor] = useState('#000000');

  const handleAddEvent = () => {
    const start = new Date(newEventStart);
    const end = new Date(newEventEnd);

    if (isValid(start) && isValid(end) && end > start) {
      const newEvent = {
        name: newEventName,
        start,
        end,
        color: newEventColor,
      };
      onLifeEventsChange([...lifeEvents, newEvent]);
      setNewEventName('');
      setNewEventStart('');
      setNewEventEnd('');
      setNewEventColor('#000000');
    } else {
      alert('Please enter valid start and end dates.');
    }
  };

  const handleRemoveEvent = (index) => {
    const updatedLifeEvents = [...lifeEvents];
    updatedLifeEvents.splice(index, 1);
    onLifeEventsChange(updatedLifeEvents);
  };

  const handleBirthDateChange = (e) => {
    const newBirthDate = new Date(e.target.value);
    if (isValid(newBirthDate)) {
      onBirthDateChange(newBirthDate);
    } else {
      alert('Please enter a valid birth date.');
    }
  };

  return (
    <div>
      <h3>Life Events</h3>
      <div className="event-group">
        <div className="event-name-and-color">
          <input
            type="text"
            placeholder="Event Name"
            value={newEventName}
            onChange={(e) => setNewEventName(e.target.value)}
          />
          <input
            type="color"
            value={newEventColor}
            onChange={(e) => setNewEventColor(e.target.value)}
          />
        </div>
        <div className="date-picker-container">
          <input
            type="date"
            className="date-picker"
            value={newEventStart}
            onChange={(e) => setNewEventStart(e.target.value)}
          />
          <input
            type="date"
            className="date-picker"
            value={newEventEnd}
            onChange={(e) => setNewEventEnd(e.target.value)}
          />
        </div>
        <button className="submit-event" onClick={handleAddEvent}>
          Add Event
        </button>
      </div>
      <div className="event-list">
        {lifeEvents.map((event, index) => (
          <div key={index} className="event-group">
            <div className="event-name-and-color">
              <input type="text" value={event.name} readOnly />
              <input type="color" value={event.color} readOnly />
            </div>
            <div className="date-picker-container">
              <input
                type="date"
                className="date-picker"
                value={format(event.start, 'yyyy-MM-dd')}
                readOnly
              />
              <input
                type="date"
                className="date-picker"
                value={format(event.end, 'yyyy-MM-dd')}
                readOnly
              />
            </div>
            <button className="remove-event" onClick={() => handleRemoveEvent(index)}>
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="birthdate-section">
        <label htmlFor="birthdate">Birth Date:</label>
        <input
          id="birthdate"
          type="date"
          className="date-picker"
          value={birthDate ? format(birthDate, 'yyyy-MM-dd') : ''}
          onChange={handleBirthDateChange}
        />
      </div>
    </div>
  );
};

export default LifeEventsManager;