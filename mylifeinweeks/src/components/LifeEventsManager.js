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
      <div>
        <input
          type="text"
          placeholder="Event Name"
          value={newEventName}
          onChange={(e) => setNewEventName(e.target.value)}
        />
        <input
          type="date"
          value={newEventStart}
          onChange={(e) => setNewEventStart(e.target.value)}
        />
        <input
          type="date"
          value={newEventEnd}
          onChange={(e) => setNewEventEnd(e.target.value)}
        />
        <input
          type="color"
          value={newEventColor}
          onChange={(e) => setNewEventColor(e.target.value)}
        />
        <button onClick={handleAddEvent}>Add Event</button>
      </div>
      <ul>
        {lifeEvents.map((event, index) => (
          <li key={index}>
            <span>{event.name}</span>
            <span>{format(event.start, 'yyyy-MM-dd')}</span>
            <span>{format(event.end, 'yyyy-MM-dd')}</span>
            <span style={{ backgroundColor: event.color }}>&#9632;</span>
            <button onClick={() => handleRemoveEvent(index)}>Remove</button>
          </li>
        ))}
      </ul>
      <div>
        <label>Birth Date:</label>
        <input
          type="date"
          value={birthDate ? format(birthDate, 'yyyy-MM-dd') : ''}
          onChange={handleBirthDateChange}
        />
      </div>
    </div>
  );
};

export default LifeEventsManager;