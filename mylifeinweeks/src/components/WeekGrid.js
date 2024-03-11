import React, { useEffect, useRef } from 'react';

const WeekGrid = ({ lifeEvents, birthDate }) => {
  const gridRef = useRef(null);

  useEffect(() => {
    if (gridRef.current) {
      const canvas = gridRef.current;
      const ctx = canvas.getContext('2d');

      const gridWidth = canvas.width;
      const gridHeight = canvas.height;
      const boxSize = 20;
      const padding = 10;

      // Clear the canvas
      ctx.clearRect(0, 0, gridWidth, gridHeight);

      // Draw life events
      lifeEvents.forEach((event) => {
        const startWeek = Math.floor((event.start - birthDate) / (7 * 24 * 60 * 60 * 1000));
        const endWeek = Math.floor((event.end - birthDate) / (7 * 24 * 60 * 60 * 1000));

        ctx.fillStyle = event.color;
        for (let week = startWeek; week < endWeek; week++) {
          const x = (week % 52) * (boxSize + padding) + padding;
          const y = Math.floor(week / 52) * (boxSize + padding) + padding;
          ctx.fillRect(x, y, boxSize, boxSize);
        }
      });

      // Draw grid lines
      ctx.strokeStyle = '#ccc';
      for (let x = padding; x < gridWidth; x += boxSize + padding) {
        ctx.beginPath();
        ctx.moveTo(x, padding);
        ctx.lineTo(x, gridHeight - padding);
        ctx.stroke();
      }

      for (let y = padding; y < gridHeight; y += boxSize + padding) {
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(gridWidth - padding, y);
        ctx.stroke();
      }

      // Draw labels
      ctx.font = '12px Arial';
      ctx.fillStyle = '#333';
      for (let week = 0; week < 52; week++) {
        const x = (week * (boxSize + padding) + padding + boxSize / 2) | 0;
        const y = (padding / 2) | 0;
        ctx.fillText(week % 4 === 0 ? week + 1 : '', x, y);
      }

      for (let year = 0; year < 90; year++) {
        const x = (padding / 2) | 0;
        const y = ((year * 52 + 26) * (boxSize + padding) + padding + boxSize / 2) | 0;
        ctx.fillText(year, x, y);
      }
    }
  }, [lifeEvents, birthDate]);

  return <canvas ref={gridRef} width={800} height={600} />;
};

export default WeekGrid;