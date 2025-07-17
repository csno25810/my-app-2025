// src/pages/Tasks.js
import React, { useState } from 'react';

function Tasks() {
  const [subject, setSubject] = useState('');
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);

  const handleAddTask = () => {
    if (subject && task) {
      const newTask = { subject, task };
      setTaskList([...taskList, newTask]);
      setSubject('');
      setTask('');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>課題管理</h1>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="科目名"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <input
          type="text"
          placeholder="課題内容"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <button onClick={handleAddTask}>登録</button>
      </div>

      <ul>
        {taskList.map((item, index) => (
          <li key={index}>
            <strong>{item.subject}</strong>: {item.task}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;
