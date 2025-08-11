'use client';

import React, { useEffect, useRef } from 'react';

const SalesChart = () => {
  const canvasRef = useRef(null);

  // Mock data for the past 7 days
  const salesData = {
    labels: [
      'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
    ],
    values: [1200, 1900, 1500, 2100, 1800, 2400, 2000]
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');
    const canvas = canvasRef.current;
    const dpr = window.devicePixelRatio || 1;
    
    // Set canvas dimensions accounting for device pixel ratio
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Chart dimensions
    const chartWidth = rect.width - 40;
    const chartHeight = rect.height - 60;
    const barWidth = chartWidth / salesData.labels.length / 2;
    const spacing = barWidth;
    
    // Find max value for scaling
    const maxValue = Math.max(...salesData.values);
    const scale = chartHeight / maxValue;

    // Draw axes
    ctx.beginPath();
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    ctx.moveTo(30, 20);
    ctx.lineTo(30, chartHeight + 30);
    ctx.lineTo(chartWidth + 30, chartHeight + 30);
    ctx.stroke();

    // Draw bars and labels
    salesData.values.forEach((value, index) => {
      const x = 30 + (spacing + barWidth) * index + spacing;
      const barHeight = value * scale;
      const y = chartHeight + 30 - barHeight;

      // Draw bar
      ctx.fillStyle = '#2f153c';
      ctx.fillRect(x, y, barWidth, barHeight);

      // Draw value above bar
      ctx.fillStyle = '#2f153c';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`$${value}`, x + barWidth / 2, y - 5);

      // Draw day label
      ctx.fillStyle = '#2f153c';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(salesData.labels[index].substring(0, 3), x + barWidth / 2, chartHeight + 45);
    });

  }, []);

  return (
    <div className="w-full h-64 relative">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
        aria-label="Sales chart for the past 7 days"
      />
    </div>
  );
};

export default SalesChart;