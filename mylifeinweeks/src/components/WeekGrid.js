import React from 'react';

const WeekGrid = ({ lifeEvents, birthDate }) => {
  console.log('WeekGrid rendering');
  const totalYears = 90;
  const weeksPerYear = 52;

  // Calculate the number of weeks lived based on birthDate
  const calculateWeeksLived = (birthDate) => {
    if (!birthDate) return 0;

    const currentDate = new Date();
    const diffTime = Math.abs(currentDate - birthDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const weeksLived = Math.floor(diffDays / 7);

    return weeksLived;
  };

  // Calculate the current week number based on birthDate
  const calculateCurrentWeek = (birthDate) => {
    if (!birthDate) return 0;

    const currentDate = new Date();
    const diffTime = Math.abs(currentDate - birthDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const currentWeek = Math.floor(diffDays / 7);

    return currentWeek;
  };

  // Log the birthDate and calculations for debugging
  console.log('WeekGrid component: birthDate is', birthDate);
  console.log('Weeks lived:', calculateWeeksLived(birthDate));
  console.log('Current week:', calculateCurrentWeek(birthDate));

  // Render week boxes based on the number of weeks lived and the current week
  const renderWeekBoxes = () => {
    const weekBoxes = [];
    let weeksCounter = 0;

    for (let year = 0; year < totalYears; year++) {
      const yearWeeks = [];

      for (let week = 0; week < weeksPerYear; week++) {
        const isLived = weeksCounter < calculateWeeksLived(birthDate);
        const isCurrentWeek = weeksCounter === calculateCurrentWeek(birthDate);

        const weekBoxClass = `week-box ${isLived ? 'lived' : 'unlived'} ${isCurrentWeek ? 'current-week' : ''}`;
        console.log(`Week ${weeksCounter}: Class - ${weekBoxClass}`); // Logging each week box's class for debugging

        const weekBox = (
          <div
            key={`${year}-${week}`}
            className={weekBoxClass}
          ></div>
        );

        yearWeeks.push(weekBox);
        weeksCounter++;
      }

      const yearContainer = (
        <div key={year} className="year-container">
          {yearWeeks}
        </div>
      );

      weekBoxes.push(yearContainer);
    }

    return weekBoxes;
  };

  return <div className="week-grid">{renderWeekBoxes()}</div>;
};

export default WeekGrid;
