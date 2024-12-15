import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Member } from '../types';

interface MemberSettingsProps {
  member: Member;
  onUpdate: (updatedMember: Member) => void;
  onClose: () => void;
}

export default function MemberSettings({ member, onUpdate, onClose }: MemberSettingsProps) {
  const [settings, setSettings] = useState(member);
  const [workingDay, setWorkingDay] = useState<Date | null>(null);
  const [nonWorkingDay, setNonWorkingDay] = useState<Date | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(settings);
    onClose();
  };

  const addWorkingDay = () => {
    if (workingDay) {
      const dateStr = workingDay.toISOString().split('T')[0];
      if (!settings.workingDays.includes(dateStr)) {
        setSettings({
          ...settings,
          workingDays: [...settings.workingDays, dateStr].sort()
        });
      }
      setWorkingDay(null);
    }
  };

  const addNonWorkingDay = () => {
    if (nonWorkingDay) {
      const dateStr = nonWorkingDay.toISOString().split('T')[0];
      if (!settings.nonWorkingDays.includes(dateStr)) {
        setSettings({
          ...settings,
          nonWorkingDays: [...settings.nonWorkingDays, dateStr].sort()
        });
      }
      setNonWorkingDay(null);
    }
  };

  const removeWorkingDay = (date: string) => {
    setSettings({
      ...settings,
      workingDays: settings.workingDays.filter(d => d !== date)
    });
  };

  const removeNonWorkingDay = (date: string) => {
    setSettings({
      ...settings,
      nonWorkingDays: settings.nonWorkingDays.filter(d => d !== date)
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">Member Settings</h3>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Maximum Shifts
              </label>
              <input
                type="number"
                value={settings.maxShifts}
                onChange={(e) => setSettings({ ...settings, maxShifts: parseInt(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Minimum Shifts
              </label>
              <input
                type="number"
                value={settings.minShifts}
                onChange={(e) => setSettings({ ...settings, minShifts: parseInt(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Holiday Shifts
              </label>
              <input
                type="number"
                value={settings.holidayShifts}
                onChange={(e) => setSettings({ ...settings, holidayShifts: parseInt(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Working Days
              </label>
              <div className="flex space-x-2 mb-2">
                <DatePicker
                  selected={workingDay}
                  onChange={(date) => setWorkingDay(date)}
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholderText="Select working day"
                  dateFormat="yyyy-MM-dd"
                />
                <button
                  type="button"
                  onClick={addWorkingDay}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {settings.workingDays.map(date => (
                  <span
                    key={date}
                    className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-green-100 text-green-800"
                  >
                    {date}
                    <button
                      type="button"
                      onClick={() => removeWorkingDay(date)}
                      className="ml-1 text-green-600 hover:text-green-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Non-Working Days
              </label>
              <div className="flex space-x-2 mb-2">
                <DatePicker
                  selected={nonWorkingDay}
                  onChange={(date) => setNonWorkingDay(date)}
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholderText="Select non-working day"
                  dateFormat="yyyy-MM-dd"
                />
                <button
                  type="button"
                  onClick={addNonWorkingDay}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {settings.nonWorkingDays.map(date => (
                  <span
                    key={date}
                    className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-red-100 text-red-800"
                  >
                    {date}
                    <button
                      type="button"
                      onClick={() => removeNonWorkingDay(date)}
                      className="ml-1 text-red-600 hover:text-red-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}