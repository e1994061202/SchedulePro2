import React, { useState } from 'react';
import { Group, Member } from '../../types';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { MemberCard } from '../member/MemberCard';
import { DroppableWrapper } from '../dnd/DroppableWrapper';

interface GroupCardProps {
  group: Group;
  onAddMember: () => void;
  onUpdateGroup: (updatedGroup: Group) => void;
  onUpdateMember: (memberId: string, updatedMember: Member) => void;
  onDeleteMember: (memberId: string) => void;
  onDeleteGroup: () => void;
}

export const GroupCard: React.FC<GroupCardProps> = ({
  group,
  onAddMember,
  onUpdateGroup,
  onUpdateMember,
  onDeleteMember,
  onDeleteGroup,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(group.name);

  const handleNameSubmit = () => {
    onUpdateGroup({ ...group, name });
    setIsEditing(false);
  };

  return (
    <div className="border rounded-lg p-4 bg-white shadow">
      <div className="flex justify-between items-center mb-4">
        <div className="flex-1">
          {isEditing ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={handleNameSubmit}
              onKeyPress={(e) => e.key === 'Enter' && handleNameSubmit()}
              className="text-xl font-semibold border rounded px-2 py-1"
              autoFocus
            />
          ) : (
            <div className="flex items-center space-x-2">
              <h3 className="text-xl font-semibold">{group.name}</h3>
              <button
                onClick={() => setIsEditing(true)}
                className="text-gray-500 hover:text-gray-700"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={onAddMember}
            className="bg-green-500 text-white px-3 py-1 rounded flex items-center hover:bg-green-600"
          >
            <Plus className="w-4 h-4 mr-1" /> Add Member
          </button>
          <button
            onClick={onDeleteGroup}
            className="text-red-500 hover:text-red-700 p-1"
            title="Delete Group"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <DroppableWrapper droppableId={group.id}>
        {(provided) => (
          <>
            {group.members.map((member, index) => (
              <MemberCard
                key={member.id}
                member={member}
                index={index}
                onDelete={() => onDeleteMember(member.id)}
                onUpdate={(updatedMember) => onUpdateMember(member.id, updatedMember)}
              />
            ))}
          </>
        )}
      </DroppableWrapper>
    </div>
  );
};