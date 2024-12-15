import React, { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Plus, Save, Upload } from 'lucide-react';
import { Group, Member } from '../types';
import GroupCard from './GroupCard';

export default function GroupManagement() {
  const [groups, setGroups] = useState<Group[]>([]);

  const addGroup = () => {
    const newGroup: Group = {
      id: Date.now().toString(),
      name: `Group ${groups.length + 1}`,
      members: []
    };
    setGroups([...groups, newGroup]);
  };

  const deleteGroup = (groupId: string) => {
    setGroups(groups.filter(group => group.id !== groupId));
  };

  const addMember = (groupId: string) => {
    setGroups(groups.map(group => {
      if (group.id === groupId) {
        const newMember: Member = {
          id: Date.now().toString(),
          name: `Member ${group.members.length + 1}`,
          nonWorkingDays: [],
          workingDays: [],
          maxShifts: 8,
          minShifts: 6,
          holidayShifts: 0
        };
        return { ...group, members: [...group.members, newMember] };
      }
      return group;
    }));
  };

  const updateGroup = (updatedGroup: Group) => {
    setGroups(groups.map(group => 
      group.id === updatedGroup.id ? updatedGroup : group
    ));
  };

  const updateMember = (groupId: string, memberId: string, updatedMember: Member) => {
    setGroups(groups.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          members: group.members.map(member =>
            member.id === memberId ? updatedMember : member
          )
        };
      }
      return group;
    }));
  };

  const deleteMember = (groupId: string, memberId: string) => {
    setGroups(groups.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          members: group.members.filter(member => member.id !== memberId)
        };
      }
      return group;
    }));
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const sourceGroupId = result.source.droppableId;
    const destGroupId = result.destination.droppableId;
    const memberId = result.draggableId;

    if (sourceGroupId === destGroupId) {
      // Reorder within the same group
      const group = groups.find(g => g.id === sourceGroupId);
      if (!group) return;

      const newMembers = Array.from(group.members);
      const [removed] = newMembers.splice(result.source.index, 1);
      newMembers.splice(result.destination.index, 0, removed);

      setGroups(groups.map(g =>
        g.id === sourceGroupId ? { ...g, members: newMembers } : g
      ));
    } else {
      // Move between groups
      const sourceGroup = groups.find(g => g.id === sourceGroupId);
      const destGroup = groups.find(g => g.id === destGroupId);
      if (!sourceGroup || !destGroup) return;

      const member = sourceGroup.members.find(m => m.id === memberId);
      if (!member) return;

      setGroups(groups.map(group => {
        if (group.id === sourceGroupId) {
          return {
            ...group,
            members: group.members.filter(m => m.id !== memberId)
          };
        }
        if (group.id === destGroupId) {
          const newMembers = Array.from(group.members);
          newMembers.splice(result.destination.index, 0, member);
          return {
            ...group,
            members: newMembers
          };
        }
        return group;
      }));
    }
  };

  const saveGroups = () => {
    localStorage.setItem('scheduleGroups', JSON.stringify(groups));
    // Also offer download as file
    const blob = new Blob([JSON.stringify(groups, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'schedule-groups.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const loadGroups = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const loadedGroups = JSON.parse(content);
          setGroups(loadedGroups);
        } catch (error) {
          console.error('Error loading groups:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="p-6">
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-bold">Group Management</h2>
          <div className="space-x-2">
            <button
              onClick={addGroup}
              className="bg-blue-500 text-white px-4 py-2 rounded flex items-center hover:bg-blue-600"
            >
              <Plus className="w-4 h-4 mr-2" /> Add Group
            </button>
            <button
              onClick={saveGroups}
              className="bg-green-500 text-white px-4 py-2 rounded flex items-center hover:bg-green-600"
            >
              <Save className="w-4 h-4 mr-2" /> Save Groups
            </button>
            <label className="bg-purple-500 text-white px-4 py-2 rounded flex items-center cursor-pointer hover:bg-purple-600">
              <Upload className="w-4 h-4 mr-2" /> Load Groups
              <input
                type="file"
                onChange={loadGroups}
                className="hidden"
                accept=".json"
              />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {groups.map(group => (
            <GroupCard
              key={group.id}
              group={group}
              onAddMember={() => addMember(group.id)}
              onUpdateGroup={updateGroup}
              onUpdateMember={(memberId, updatedMember) => 
                updateMember(group.id, memberId, updatedMember)
              }
              onDeleteMember={(memberId) => deleteMember(group.id, memberId)}
              onDeleteGroup={() => deleteGroup(group.id)}
            />
          ))}
        </div>
      </div>
    </DragDropContext>
  );
}