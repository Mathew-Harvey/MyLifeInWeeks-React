import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { firestore } from '../services/firebase';
import WeekGrid from '../components/WeekGrid';
import LifeEventsManager from '../components/LifeEventsManager';

const HomePage = () => {
  const { currentUser } = useContext(AuthContext);
  const [lifeEvents, setLifeEvents] = useState([]);
  const [birthDate, setBirthDate] = useState(new Date()); // Default to current date for now

  useEffect(() => {
    console.log('HomePage mounted'); // This should log when HomePage mounts
    const fetchData = async () => {
      if (currentUser) {
        try {
          const userDoc = await firestore.collection('users').doc(currentUser.uid).get();
          if (userDoc.exists) {
            const userData = userDoc.data();
            setLifeEvents(userData.lifeEvents || []);
            setBirthDate(userData.birthDate ? new Date(userData.birthDate) : new Date()); // Default to current date if none is provided
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchData();
  }, [currentUser]);

  const handleLifeEventsChange = (updatedLifeEvents) => {
    setLifeEvents(updatedLifeEvents);
    // Update Firestore with the new life events and birthDate
  };

  const handleBirthDateChange = (newBirthDate) => {
    setBirthDate(newBirthDate);
    // Update Firestore with the new birthDate
  };

  return (
    <div id="main-content">
      {/* Other content */}
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
