import React, { useState } from 'react';
import { Member } from '../../types';
import { Trash2, Settings } from 'lucide-react';
import { MemberSettings } from './MemberSettings';
import { DraggableWrapper } from '../dnd/DraggableWrapper';
import { formatDateList } from '../../utils/dateUtils';

interface MemberCardProps {
  member: Member;
  index: number;
  onDelete: () => void;
  onUpdate: (updatedMember: Member) => void;
}

export const MemberCard: React.FC<MemberCardProps> = ({ 
  member, 
  index, 
  onDelete, 
  onUpdate 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(member.name);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleNameSubmit = () => {
    onUpdate({ ...member, name });
    setIsEditing(false);
  };

  return (
    <DraggableWrapper draggableId={member.id} index={index}>
      {() => (
        <>
          <div className="flex justify-between items-center mb-2">
            <div className="flex-1">
              {isEditing ? (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={handleNameSubmit}
                  onKeyPress={(e) => e.key === 'Enter' && handleNameSubmit()}
                  className="border rounded px-2 py-1"
                  autoFocus
                />
              ) : (
                <div>
                  <span
                    className="font-medium cursor-pointer"
                    onClick={() => setIsEditing(true)}
                  >
                    {member.name}
                  </span>
                  <div className="text-sm">
                    {member.workingDays.length > 0 && (
                      <div className="text-green-600">
                        Working: {formatDateList(member.workingDays)}
                      </div>
                    )}
                    {member.nonWorkingDays.length > 0 && (
                      <div className="text-red-600">
                        Non-working: {formatDateList(member.nonWorkingDays)}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="text-gray-500 hover:text-gray-700"
              >
                <Settings className="w-4 h-4" />
              </button>
              <button
                onClick={onDelete}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {isSettingsOpen && (
            <MemberSettings
              member={member}
              onUpdate={onUpdate}
              onClose={() => setIsSettingsOpen(false)}
            />
          )}
        </>
      )}
    </DraggableWrapper>
  );
};