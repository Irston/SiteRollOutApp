import React, { useState } from 'react';

export default function VendorTasks({ tasks, onRefresh }) {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterVendor, setFilterVendor] = useState('all');

  // Group tasks by vendor
  const tasksByVendor = tasks.reduce((acc, task) => {
    const vendorName = typeof task.assigned_vendor === 'object' 
      ? task.assigned_vendor.display_value || 'Unassigned'
      : task.assigned_vendor || 'Unassigned';
    
    if (!acc[vendorName]) {
      acc[vendorName] = [];
    }
    acc[vendorName].push(task);
    return acc;
  }, {});

  // Get unique vendors for filter
  const vendors = ['all', ...Object.keys(tasksByVendor)];

  // Filter tasks based on selected filters
  const getFilteredTasks = () => {
    let filteredTasks = tasks;

    if (filterVendor !== 'all') {
      filteredTasks = filteredTasks.filter(task => {
        const vendorName = typeof task.assigned_vendor === 'object' 
          ? task.assigned_vendor.display_value 
          : task.assigned_vendor;
        return vendorName === filterVendor;
      });
    }

    if (filterStatus !== 'all') {
      filteredTasks = filteredTasks.filter(task => {
        const status = typeof task.status === 'object' ? task.status.value : task.status;
        return status === filterStatus;
      });
    }

    return filteredTasks;
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    const due = typeof dueDate === 'object' ? dueDate.display_value : dueDate;
    return new Date(due) < new Date();
  };

  const getTaskPriority = (task) => {
    const status = typeof task.status === 'object' ? task.status.value : task.status;
    const dueDate = typeof task.due_date === 'object' ? task.due_date.display_value : task.due_date;
    
    if (status === 'waiting_vendor') return 'high';
    if (isOverdue(dueDate) && status !== 'completed') return 'high';
    if (status === 'in_progress') return 'medium';
    return 'low';
  };

  const filteredTasks = getFilteredTasks();

  return (
    <div className="vendor-tasks">
      <div className="tasks-header">
        <h2>Vendor Task Management</h2>
        <div className="task-filters">
          <select 
            value={filterVendor} 
            onChange={(e) => setFilterVendor(e.target.value)}
            className="filter-select"
          >
            {vendors.map(vendor => (
              <option key={vendor} value={vendor}>
                {vendor === 'all' ? 'All Vendors' : vendor}
              </option>
            ))}
          </select>
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="not_started">Not Started</option>
            <option value="in_progress">In Progress</option>
            <option value="waiting_vendor">Waiting Vendor</option>
            <option value="completed">Completed</option>
            <option value="on_hold">On Hold</option>
          </select>
        </div>
      </div>

      <div className="tasks-summary">
        <div className="summary-card">
          <span className="summary-number">{filteredTasks.length}</span>
          <span className="summary-label">Total Tasks</span>
        </div>
        <div className="summary-card">
          <span className="summary-number">
            {filteredTasks.filter(t => {
              const status = typeof t.status === 'object' ? t.status.value : t.status;
              return status === 'waiting_vendor';
            }).length}
          </span>
          <span className="summary-label">Waiting Vendor</span>
        </div>
        <div className="summary-card">
          <span className="summary-number">
            {filteredTasks.filter(t => isOverdue(t.due_date)).length}
          </span>
          <span className="summary-label">Overdue</span>
        </div>
      </div>

      <div className="tasks-list">
        {filteredTasks.map(task => {
          const taskName = typeof task.task_name === 'object' ? task.task_name.display_value : task.task_name;
          const taskType = typeof task.task_type === 'object' ? task.task_type.display_value : task.task_type;
          const status = typeof task.status === 'object' ? task.status.value : task.status;
          const vendor = typeof task.assigned_vendor === 'object' ? task.assigned_vendor.display_value : task.assigned_vendor;
          const dueDate = typeof task.due_date === 'object' ? task.due_date.display_value : task.due_date;
          const siteName = typeof task.site === 'object' ? task.site.display_value : task.site;
          const priority = getTaskPriority(task);

          return (
            <div key={typeof task.sys_id === 'object' ? task.sys_id.value : task.sys_id} 
                 className={`task-card priority-${priority}`}>
              <div className="task-header">
                <h4>{taskName}</h4>
                <div className="task-badges">
                  <span className={`status-badge status-${status}`}>
                    {status?.replace('_', ' ')}
                  </span>
                  <span className={`priority-badge priority-${priority}`}>
                    {priority} priority
                  </span>
                </div>
              </div>

              <div className="task-details">
                <div className="detail-row">
                  <span>Type:</span>
                  <span>{taskType?.replace('_', ' ')}</span>
                </div>
                <div className="detail-row">
                  <span>Site:</span>
                  <span>{siteName}</span>
                </div>
                <div className="detail-row">
                  <span>Vendor:</span>
                  <span>{vendor || 'Unassigned'}</span>
                </div>
                {dueDate && (
                  <div className={`detail-row ${isOverdue(dueDate) ? 'overdue' : ''}`}>
                    <span>Due Date:</span>
                    <span>{dueDate}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredTasks.length === 0 && (
        <div className="no-tasks">
          <p>No tasks found matching the current filters.</p>
        </div>
      )}

      <style jsx>{`
        .vendor-tasks {
          height: 100%;
        }

        .tasks-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .task-filters {
          display: flex;
          gap: 10px;
        }

        .filter-select {
          padding: 8px 12px;
          border: 1px solid #ced4da;
          border-radius: 4px;
          font-size: 14px;
        }

        .tasks-summary {
          display: flex;
          gap: 15px;
          margin-bottom: 25px;
        }

        .summary-card {
          background-color: #f8f9fa;
          border: 1px solid #dee2e6;
          border-radius: 6px;
          padding: 15px;
          text-align: center;
          flex: 1;
        }

        .summary-number {
          display: block;
          font-size: 24px;
          font-weight: bold;
          color: #2c5aa0;
        }

        .summary-label {
          display: block;
          font-size: 12px;
          color: #666;
          margin-top: 4px;
        }

        .tasks-list {
          display: grid;
          gap: 15px;
        }

        .task-card {
          background-color: white;
          border: 1px solid #dee2e6;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .task-card.priority-high {
          border-left: 4px solid #dc3545;
        }

        .task-card.priority-medium {
          border-left: 4px solid #ffc107;
        }

        .task-card.priority-low {
          border-left: 4px solid #28a745;
        }

        .task-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .task-header h4 {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
        }

        .task-badges {
          display: flex;
          gap: 8px;
        }

        .priority-badge {
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 500;
          text-transform: uppercase;
        }

        .priority-high {
          background-color: #f8d7da;
          color: #721c24;
        }

        .priority-medium {
          background-color: #fff3cd;
          color: #856404;
        }

        .priority-low {
          background-color: #d4edda;
          color: #155724;
        }

        .task-details {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
        }

        .detail-row.overdue {
          color: #dc3545;
          font-weight: 500;
        }

        .no-tasks {
          text-align: center;
          padding: 50px;
          color: #666;
        }

        @media (max-width: 768px) {
          .tasks-header {
            flex-direction: column;
            gap: 15px;
          }
          
          .task-filters {
            width: 100%;
            justify-content: center;
          }
          
          .tasks-summary {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}