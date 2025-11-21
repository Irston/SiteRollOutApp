import React, { useState, useEffect, useMemo } from 'react';
import { SiteRolloutService } from '../services/SiteRolloutService.js';

export default function FieldTechApp() {
  const svc = useMemo(() => new SiteRolloutService(), []);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [updateNotes, setUpdateNotes] = useState('');
  const [updateStatus, setUpdateStatus] = useState('');

  useEffect(() => {
    loadMyTasks();
  }, [svc]);

  const loadMyTasks = async () => {
    try {
      setLoading(true);
      const myTasks = await svc.getMyTasks();
      setTasks(myTasks);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (taskId, updates) => {
    try {
      await svc.updateTask(taskId, updates);
      await loadMyTasks(); // Refresh tasks
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const handleStatusUpdate = async (task) => {
    const taskId = typeof task.sys_id === 'object' ? task.sys_id.value : task.sys_id;
    const updates = {};
    
    if (updateStatus) {
      updates.status = updateStatus;
    }
    
    if (updateNotes) {
      // Append to existing notes
      const existingNotes = typeof task.notes === 'object' ? task.notes.display_value || '' : task.notes || '';
      const timestamp = new Date().toLocaleString();
      updates.notes = existingNotes + (existingNotes ? '\n\n' : '') + `[${timestamp}] ${updateNotes}`;
    }

    const success = await updateTask(taskId, updates);
    if (success) {
      setSelectedTask(null);
      setUpdateNotes('');
      setUpdateStatus('');
    }
  };

  const getPriorityClass = (task) => {
    const status = typeof task.status === 'object' ? task.status.value : task.status;
    const dueDate = typeof task.due_date === 'object' ? task.due_date.display_value : task.due_date;
    
    if (status === 'waiting_vendor') return 'high';
    if (dueDate && new Date(dueDate) < new Date() && status !== 'completed') return 'high';
    if (status === 'in_progress') return 'medium';
    return 'low';
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    const due = typeof dueDate === 'object' ? dueDate.display_value : dueDate;
    return new Date(due) < new Date();
  };

  const getStatusOptions = (currentStatus) => {
    const statusFlow = {
      'not_started': ['in_progress', 'on_hold'],
      'in_progress': ['completed', 'on_hold', 'waiting_vendor'],
      'on_hold': ['in_progress', 'not_started'],
      'waiting_vendor': ['in_progress'],
      'waiting_approval': ['in_progress', 'completed'],
      'completed': [], // No transitions from completed
      'cancelled': [], // No transitions from cancelled
      'failed': ['not_started', 'in_progress']
    };

    return statusFlow[currentStatus] || ['in_progress', 'completed', 'on_hold'];
  };

  if (loading) {
    return <div className="loading">Loading your assigned tasks...</div>;
  }

  if (error) {
    return <div className="error">Error loading tasks: {error}</div>;
  }

  return (
    <div className="field-tech-app">
      <header className="app-header">
        <h1>Field Technician Tasks</h1>
        <p>Your assigned rollout tasks with photo upload and progress tracking</p>
        <div className="task-summary">
          <span className="summary-item">
            Total Tasks: <strong>{tasks.length}</strong>
          </span>
          <span className="summary-item">
            In Progress: <strong>
              {tasks.filter(t => {
                const status = typeof t.status === 'object' ? t.status.value : t.status;
                return status === 'in_progress';
              }).length}
            </strong>
          </span>
          <span className="summary-item">
            Overdue: <strong>
              {tasks.filter(t => isOverdue(t.due_date)).length}
            </strong>
          </span>
        </div>
      </header>

      <main className="tasks-container">
        {tasks.length === 0 ? (
          <div className="no-tasks">
            <h3>No Tasks Assigned</h3>
            <p>You currently have no rollout tasks assigned to you.</p>
          </div>
        ) : (
          <div className="tasks-grid">
            {tasks.map(task => {
              const taskName = typeof task.task_name === 'object' ? task.task_name.display_value : task.task_name;
              const taskType = typeof task.task_type === 'object' ? task.task_type.display_value : task.task_type;
              const status = typeof task.status === 'object' ? task.status.value : task.status;
              const dueDate = typeof task.due_date === 'object' ? task.due_date.display_value : task.due_date;
              const siteName = typeof task.site === 'object' ? task.site.display_value : task.site;
              const vendor = typeof task.assigned_vendor === 'object' ? task.assigned_vendor.display_value : task.assigned_vendor;
              const taskId = typeof task.sys_id === 'object' ? task.sys_id.value : task.sys_id;
              const priority = getPriorityClass(task);

              return (
                <div key={taskId} className={`task-card priority-${priority}`}>
                  <div className="task-header">
                    <h3>{taskName}</h3>
                    <span className={`status-badge status-${status}`}>
                      {status?.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="task-info">
                    <div className="info-row">
                      <span className="label">Type:</span>
                      <span>{taskType?.replace('_', ' ')}</span>
                    </div>
                    <div className="info-row">
                      <span className="label">Site:</span>
                      <span>{siteName}</span>
                    </div>
                    {vendor && (
                      <div className="info-row">
                        <span className="label">Vendor:</span>
                        <span>{vendor}</span>
                      </div>
                    )}
                    {dueDate && (
                      <div className={`info-row ${isOverdue(dueDate) ? 'overdue' : ''}`}>
                        <span className="label">Due:</span>
                        <span>{new Date(dueDate).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>

                  <div className="task-actions">
                    <button 
                      className="update-btn"
                      onClick={() => {
                        setSelectedTask(task);
                        setUpdateStatus(status);
                      }}
                    >
                      Update Task
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Task Update Modal */}
      {selectedTask && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Update Task</h3>
              <button 
                className="close-btn"
                onClick={() => {
                  setSelectedTask(null);
                  setUpdateNotes('');
                  setUpdateStatus('');
                }}
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              <h4>{typeof selectedTask.task_name === 'object' ? selectedTask.task_name.display_value : selectedTask.task_name}</h4>
              
              <div className="form-group">
                <label>Status:</label>
                <select 
                  value={updateStatus} 
                  onChange={(e) => setUpdateStatus(e.target.value)}
                  className="form-control"
                >
                  <option value={typeof selectedTask.status === 'object' ? selectedTask.status.value : selectedTask.status}>
                    {(typeof selectedTask.status === 'object' ? selectedTask.status.display_value : selectedTask.status)?.replace('_', ' ')} (Current)
                  </option>
                  {getStatusOptions(typeof selectedTask.status === 'object' ? selectedTask.status.value : selectedTask.status)
                    .map(status => (
                      <option key={status} value={status}>
                        {status.replace('_', ' ')}
                      </option>
                    ))}
                </select>
              </div>

              <div className="form-group">
                <label>Notes/Updates:</label>
                <textarea
                  value={updateNotes}
                  onChange={(e) => setUpdateNotes(e.target.value)}
                  className="form-control"
                  rows="4"
                  placeholder="Add progress notes, issues, or completion details..."
                />
              </div>

              <div className="form-group">
                <label>Upload Photos:</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  multiple 
                  className="form-control"
                  onChange={(e) => {
                    // In a real implementation, you would handle file upload here
                    // For this demo, we'll just show an alert
                    if (e.target.files.length > 0) {
                      alert(`Selected ${e.target.files.length} photo(s). In production, these would be uploaded to ServiceNow.`);
                    }
                  }}
                />
                <small className="help-text">
                  Upload photos of completed work, issues, or site conditions
                </small>
              </div>
            </div>

            <div className="modal-footer">
              <button 
                className="btn-secondary"
                onClick={() => {
                  setSelectedTask(null);
                  setUpdateNotes('');
                  setUpdateStatus('');
                }}
              >
                Cancel
              </button>
              <button 
                className="btn-primary"
                onClick={() => handleStatusUpdate(selectedTask)}
                disabled={!updateStatus && !updateNotes}
              >
                Update Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}