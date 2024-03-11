import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { firestore } from '../services/firebase';
import WeekGrid from '../components/WeekGrid';
import LifeEventsManager from '../components/LifeEventsManager';

const HomePage = () => {
  const { currentUser } = useContext(AuthContext);
  const [lifeEvents, setLifeEvents] = useState([]);
  const [birthDate, setBirthDate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        const userDoc = await firestore.collection('users').doc(currentUser.uid).get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          setLifeEvents(userData.lifeEvents || []);
          setBirthDate(userData.birthDate ? new Date(userData.birthDate) : null);
        }
      }
    };

    fetchData();
  }, [currentUser]);

  const handleLifeEventsChange = (updatedLifeEvents) => {
    setLifeEvents(updatedLifeEvents);
    if (currentUser) {
      firestore.collection('users').doc(currentUser.uid).set({
        lifeEvents: updatedLifeEvents,
        birthDate,
      });
    }
  };

  const handleBirthDateChange = (newBirthDate) => {
    setBirthDate(newBirthDate);
    if (currentUser) {
      firestore.collection('users').doc(currentUser.uid).set({
        lifeEvents,
        birthDate: newBirthDate,
      });
    }
  };

  return (
    <div>
      <WeekGrid lifeEvents={lifeEvents} birthDate={birthDate} />
      <LifeEventsManager
        lifeEvents={lifeEvents}
        onLifeEventsChange={handleLifeEventsChange}
        birthDate={birthDate}
        onBirthDateChange={handleBirthDateChange}
      />
    </div>
  );
};

export default HomePage;