import React, { useState, useEffect, useMemo } from 'react';
import { SiteRolloutService } from '../services/SiteRolloutService.js';

export default function DashboardApp() {
  const svc = useMemo(() => new SiteRolloutService(), []);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDashboardData();
  }, [svc]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const dashboardMetrics = await svc.getDashboardMetrics();
      setMetrics(dashboardMetrics);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="error">Error loading dashboard: {error}</div>;
  }

  return (
    <div className="dashboard-app">
      <header className="dashboard-header">
        <h1>Site Rollout Dashboard</h1>
        <p>Real-time metrics and performance indicators</p>
      </header>

      <main className="dashboard-content">
        <div className="metrics-row">
          <div className="metric-card">
            <h2>{metrics.siteCompletionPercentage}%</h2>
            <p>Site Completion</p>
            <span className="metric-detail">{metrics.totalSites} total sites</span>
          </div>

          <div className="metric-card">
            <h2>{metrics.componentCompliancePercentage}%</h2>
            <p>Component Compliance</p>
            <span className="metric-detail">{metrics.totalComponents} total components</span>
          </div>

          <div className="metric-card">
            <h2>{metrics.totalTasks - metrics.overdueTasks}</h2>
            <p>Active Tasks</p>
            <span className="metric-detail">{metrics.totalTasks} total tasks</span>
          </div>

          <div className="metric-card alert-card">
            <h2>{metrics.overdueTasks}</h2>
            <p>Overdue Tasks</p>
            <span className="metric-detail">Require immediate attention</span>
          </div>
        </div>

        <div className="info-section">
          <h3>Performance Summary</h3>
          <p>Monitor key performance indicators across all rollout sites.</p>
          <ul>
            <li>Site completion tracking: {metrics.siteCompletionPercentage}% complete</li>
            <li>Component deployment: {metrics.componentCompliancePercentage}% operational</li>
            <li>Task management: {metrics.overdueTasks} tasks overdue</li>
          </ul>
        </div>
      </main>
    </div>
  );
}