import React from 'react';
import './SitePipeline.css';

export default function SitePipeline({ sites }) {
  // Group sites by rollout status
  const groupedSites = sites.reduce((acc, site) => {
    const status = typeof site.rollout_status === 'object' 
      ? site.rollout_status.value 
      : site.rollout_status || 'planning';
    
    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status].push(site);
    return acc;
  }, {});

  const statusOrder = ['planning', 'approved', 'in_progress', 'testing', 'completed', 'on_hold', 'cancelled'];

  const getStatusLabel = (status) => {
    return {
      planning: 'Planning',
      approved: 'Approved',
      in_progress: 'In Progress',
      testing: 'Testing',
      completed: 'Completed',
      on_hold: 'On Hold',
      cancelled: 'Cancelled'
    }[status] || status;
  };

  return (
    <div className="site-pipeline">
      <h2>Site Rollout Pipeline</h2>
      <div className="pipeline-container">
        {statusOrder.map(status => (
          <div key={status} className="pipeline-column">
            <div className="column-header">
              <h3>{getStatusLabel(status)}</h3>
              <span className="count-badge">
                {groupedSites[status]?.length || 0}
              </span>
            </div>
            <div className="site-cards">
              {groupedSites[status]?.map(site => (
                <div key={typeof site.sys_id === 'object' ? site.sys_id.value : site.sys_id} 
                     className="site-card">
                  <h4>{typeof site.site_name === 'object' ? site.site_name.display_value : site.site_name}</h4>
                  <p className="site-code">
                    Code: {typeof site.site_code === 'object' ? site.site_code.display_value : site.site_code}
                  </p>
                  <p className="site-type">
                    Type: {typeof site.site_type === 'object' ? site.site_type.display_value : site.site_type}
                  </p>
                  {site.assigned_manager && (
                    <p className="manager">
                      Manager: {typeof site.assigned_manager === 'object' 
                        ? site.assigned_manager.display_value 
                        : site.assigned_manager}
                    </p>
                  )}
                  {site.planned_go_live_date && (
                    <p className="go-live-date">
                      Go-Live: {typeof site.planned_go_live_date === 'object' 
                        ? site.planned_go_live_date.display_value 
                        : site.planned_go_live_date}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}