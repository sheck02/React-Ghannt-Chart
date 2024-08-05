import React, { useState, useEffect } from 'react';
import GanttChart from './Ghannt';
import AddTaskForm from './AddTask';
import TeamMembers from './TeamMembers';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [members, setMembers] = useState(() => {
    const savedMembers = localStorage.getItem('members');
    return savedMembers ? JSON.parse(savedMembers) : ['John Doe', 'Jane Smith'];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('members', JSON.stringify(members));
  }, [members]);

  const handleAddTask = (task) => {
    setTasks([...tasks, task]);
  };

  const handleTaskChange = (updatedTask) => {
    setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
  };

  const handleAddMember = (member) => {
    setMembers([...members, member]);
  };

  const handleRemoveMember = (member) => {
    setMembers(members.filter(m => m !== member));
    setTasks(tasks.map(task => task.assignee === member ? { ...task, assignee: '' } : task));
  };

  const handleChangeTaskStatus = (taskId, newStatus) => {
    setTasks(tasks.map(task => (task.id === taskId ? { ...task, status: newStatus } : task)));
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <h2>Team Members</h2>
        <TeamMembers members={members} onAddMember={handleAddMember} onRemoveMember={handleRemoveMember} />
      </div>
      <div className="main-content">
        <h1 className="heading">Project Management Gantt Chart</h1>
        <AddTaskForm onAddTask={handleAddTask} members={members} />
        <GanttChart tasks={tasks} onTaskChange={handleTaskChange} />
        <div className="task-management">
          <h3>Manage Tasks</h3>
          <ul>
            {tasks.map(task => (
              <li key={task.id}>
                {task.text} - {task.status}
                {task.status === 'still to do' && (
                  <button onClick={() => handleChangeTaskStatus(task.id, 'in progress')}>Mark as In Progress</button>
                )}
                {task.status === 'in progress' && (
                  <button onClick={() => handleChangeTaskStatus(task.id, 'done')}>Mark as Done</button>
                )}
                {task.status === 'done' && (
                  <span>Done</span>
                )}
                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
