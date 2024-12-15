import React, { useState } from 'react';
import { Group, Schedule, ShiftStats } from '../types';
import { Play } from 'lucide-react';

interface ScheduleGeneratorProps {
  groups: Group[];
}

export default function ScheduleGenerator({ groups }: ScheduleGeneratorProps) {
  const [progress, setProgress] = useState(0);
  const [schedule, setSchedule] = useState<Schedule[]>([]);
  const [stats, setStats] = useState<ShiftStats[]>([]);

  const generateSchedule = () => {
    // Implementation of scheduling algorithm will go here
    setProgress(0);
    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow mt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Schedule Generator</h2>
        <button
          onClick={generateSchedule}
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center hover:bg-blue-600"
          disabled={groups.length === 0}
        >
          <Play className="w-4 h-4 mr-2" /> Generate Schedule
        </button>
      </div>
      
      {progress > 0 && (
        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-center mt-2 text-sm text-gray-600">
            Generating schedule... {progress}%
          </p>
        </div>
      )}

      {schedule.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Generated Schedule</h3>
          {/* Schedule table will be implemented in the next iteration */}
        </div>
      )}

      {stats.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Statistics</h3>
          {/* Statistics visualization will be implemented in the next iteration */}
        </div>
      )}
    </div>
  );
}