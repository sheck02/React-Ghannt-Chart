import React, { useState } from 'react';

const AddTaskForm = ({ onAddTask, members }) => {
  const [task, setTask] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [assignee, setAssignee] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task && startDate && endDate && assignee) {
      const newTask = {
        id: Date.now().toString(),
        text: task,
        startDate: new Date(startDate).toISOString().split('T')[0],
        endDate: new Date(endDate).toISOString().split('T')[0],
        assignee,
        status: 'still to do'
      };
      onAddTask(newTask);
      setTask('');
      setStartDate('');
      setEndDate('');
      setAssignee('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        required
      />
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        required
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        required
      />
      <select value={assignee} onChange={(e) => setAssignee(e.target.value)} required>
        <option value="">Assign to</option>
        {members.map((member, index) => (
          <option key={index} value={member}>{member}</option>
        ))}
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTaskForm;
