import React, { useState } from 'react';

const TeamMembers = ({ members, onAddMember, onRemoveMember }) => {
  const [newMember, setNewMember] = useState('');

  const handleAddMember = (e) => {
    e.preventDefault();
    if (newMember.trim()) {
      onAddMember(newMember);
      setNewMember('');
    }
  };

  return (
    <div>
      <form onSubmit={handleAddMember}>
        <input
          type="text"
          value={newMember}
          onChange={(e) => setNewMember(e.target.value)}
          placeholder="Add team member"
          required
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {members.map((member, index) => (
          <li key={index}>
            {member}
            <button onClick={() => onRemoveMember(member)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamMembers;
