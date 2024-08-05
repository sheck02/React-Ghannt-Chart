import React, { useEffect } from 'react';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import gantt from 'dhtmlx-gantt';

const GanttChart = ({ tasks, onTaskChange }) => {
  useEffect(() => {
    gantt.init("gantt_here");
    gantt.clearAll();

    gantt.attachEvent("onAfterTaskUpdate", (id, item) => {
      onTaskChange(item);
    });

    // Set the date range for the Gantt chart
    const startDate = tasks.length > 0 ? new Date(Math.min(...tasks.map(task => new Date(task.startDate)))) : new Date();
    const endDate = tasks.length > 0 ? new Date(Math.max(...tasks.map(task => new Date(task.endDate)))) : new Date();

    gantt.config.start_date = new Date(startDate.setDate(startDate.getDate() - 30)); 
    gantt.config.end_date = new Date(endDate.setDate(endDate.getDate() + 30));

    gantt.config.columns = [
      { name: "text", label: "Task name", width: "*", tree: true },
      { name: "start_date", label: "Start date", align: "center", width: 80 },
      { name: "end_date", label: "End date", align: "center", width: 80 },
      { name: "assignee", label: "Assigned to", align: "center", width: 100 },
      { name: "status", label: "Status", align: "center", width: 100 }
    ];

    gantt.templates.task_class = function (start, end, task) {
      if (task.status === "done") return "gantt_task_done";
      if (task.status === "in progress") return "gantt_task_in_progress";
      return "gantt_task_todo";
    };

    // Format tasks for Gantt chart
    const formattedTasks = tasks.map(task => ({
      ...task,
      start_date: gantt.date.date_to_str("%d-%m-%Y")(new Date(task.startDate)),
      end_date: gantt.date.date_to_str("%d-%m-%Y")(new Date(task.endDate)),
    }));

    gantt.parse({ data: formattedTasks });

    return () => {
      gantt.clearAll();
    };
  }, [tasks, onTaskChange]);

  return (
    <div id="gantt_here" style={{ width: '100%', height: '500px' }}></div>
  );
};

export default GanttChart;
