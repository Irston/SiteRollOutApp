import React from 'react';

export default function RolloutProgress({ sites, tasks, components }) {
  // Calculate overall progress metrics
  const getProgressMetrics = () => {
    const totalSites = sites.length;
    const completedSites = sites.filter(site => {
      const status = typeof site.rollout_status === 'object' ? site.rollout_status.value : site.rollout_status;
      return status === 'completed';
    }).length;

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => {
      const status = typeof task.status === 'object' ? task.status.value : task.status;
      return status === 'completed';
    }).length;

    const totalComponents = components.length;
    const operationalComponents = components.filter(comp => {
      const status = typeof comp.status === 'object' ? comp.status.value : comp.status;
      return status === 'operational';
    }).length;

    const overdueTasks = tasks.filter(task => {
      const dueDate = typeof task.due_date === 'object' ? task.due_date.display_value : task.due_date;
      const status = typeof task.status === 'object' ? task.status.value : task.status;
      return dueDate && new Date(dueDate) < new Date() && status !== 'completed';
    }).length;

    return {
      siteCompletion: totalSites > 0 ? Math.round((completedSites / totalSites) * 100) : 0,
      taskCompletion: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
      componentDeployment: totalComponents > 0 ? Math.round((operationalComponents / totalComponents) * 100) : 0,
      overdueTasks,
      totalSites,
      totalTasks,
      totalComponents
    };
  };

  const metrics = getProgressMetrics();

  const ProgressBar = ({ percentage, color = '#2c5aa0' }) => (
    <div className="progress-bar">
      <div 
        className="progress-fill" 
        style={{ width: `${percentage}%`, backgroundColor: color }}
      />
      <span className="progress-text">{percentage}%</span>
    </div>
  );

  return (
    <div className="rollout-progress">
      <h2>Overall Rollout Progress</h2>
      
      <div className="progress-grid">
        <div className="progress-card">
          <h3>Site Completion</h3>
          <ProgressBar percentage={metrics.siteCompletion} />
          <p className="progress-detail">
            {sites.filter(s => {
              const status = typeof s.rollout_status === 'object' ? s.rollout_status.value : s.rollout_status;
              return status === 'completed';
            }).length} of {metrics.totalSites} sites completed
          </p>
        </div>

        <div className="progress-card">
          <h3>Task Completion</h3>
          <ProgressBar percentage={metrics.taskCompletion} color="#28a745" />
          <p className="progress-detail">
            {tasks.filter(t => {
              const status = typeof t.status === 'object' ? t.status.value : t.status;
              return status === 'completed';
            }).length} of {metrics.totalTasks} tasks completed
          </p>
        </div>

        <div className="progress-card">
          <h3>Component Deployment</h3>
          <ProgressBar percentage={metrics.componentDeployment} color="#17a2b8" />
          <p className="progress-detail">
            {components.filter(c => {
              const status = typeof c.status === 'object' ? c.status.value : c.status;
              return status === 'operational';
            }).length} of {metrics.totalComponents} components operational
          </p>
        </div>

        <div className="progress-card alert-card">
          <h3>Overdue Tasks</h3>
          <div className="alert-number">{metrics.overdueTasks}</div>
          <p className="progress-detail">
            Tasks requiring immediate attention
          </p>
        </div>
      </div>

      <div className="recent-activities">
        <h3>Recent Activities</h3>
        <div className="activity-list">
          {tasks
            .filter(task => {
              const status = typeof task.status === 'object' ? task.status.value : task.status;
              return status === 'completed';
            })
            .slice(0, 5)
            .map(task => (
              <div key={typeof task.sys_id === 'object' ? task.sys_id.value : task.sys_id} 
                   className="activity-item">
                <div className="activity-icon completed">✓</div>
                <div className="activity-details">
                  <span className="activity-task">
                    {typeof task.task_name === 'object' ? task.task_name.display_value : task.task_name}
                  </span>
                  <span className="activity-site">
                    at {typeof task.site === 'object' ? task.site.display_value : task.site}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>

      <style jsx>{`
        .rollout-progress h2 {
          margin-bottom: 25px;
        }

        .progress-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .progress-card {
          background-color: #f8f9fa;
          border: 1px solid #dee2e6;
          border-radius: 8px;
          padding: 20px;
        }

        .progress-card h3 {
          margin: 0 0 15px 0;
          font-size: 16px;
          font-weight: 600;
        }

        .progress-bar {
          position: relative;
          height: 20px;
          background-color: #e9ecef;
          border-radius: 10px;
          overflow: hidden;
          margin-bottom: 10px;
        }

        .progress-fill {
          height: 100%;
          transition: width 0.3s ease;
        }

        .progress-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 12px;
          font-weight: 600;
          color: white;
          text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
        }

        .progress-detail {
          margin: 0;
          font-size: 12px;
          color: #666;
        }

        .alert-card {
          background-color: #fff3cd;
          border-color: #ffeaa7;
        }

        .alert-number {
          font-size: 36px;
          font-weight: bold;
          color: #856404;
          text-align: center;
          margin: 10px 0;
        }

        .recent-activities h3 {
          margin-bottom: 15px;
        }

        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .activity-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background-color: #f8f9fa;
          border-radius: 6px;
        }

        .activity-icon {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: bold;
          color: white;
        }

        .activity-icon.completed {
          background-color: #28a745;
        }

        .activity-details {
          flex: 1;
        }

        .activity-task {
          display: block;
          font-weight: 500;
          font-size: 14px;
        }

        .activity-site {
          display: block;
          font-size: 12px;
          color: #666;
          margin-top: 2px;
        }

        @media (max-width: 768px) {
          .progress-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}