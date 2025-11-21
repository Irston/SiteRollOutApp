import React, { useState, useEffect, useMemo } from 'react';
import { SiteRolloutService } from '../services/SiteRolloutService.js';
import SitePipeline from './SitePipeline.jsx';
import ComplianceStatus from './ComplianceStatus.jsx';
import VendorTasks from './VendorTasks.jsx';
import RolloutProgress from './RolloutProgress.jsx';
import './SpatialManagerApp.css';

export default function SpatialManagerApp() {
  const svc = useMemo(() => new SiteRolloutService(), []);
  const [sites, setSites] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('pipeline');

  useEffect(() => {
    loadData();
  }, [svc]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [sitesData, tasksData, componentsData] = await Promise.all([
        svc.getSites(),
        svc.getRolloutTasks(),
        svc.getSiteComponents()
      ]);
      setSites(sitesData);
      setTasks(tasksData);
      setComponents(componentsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading spatial manager workspace...</div>;
  }

  if (error) {
    return <div className="error">Error loading data: {error}</div>;
  }

  return (
    <div className="spatial-manager-app">
      <header className="app-header">
        <h1>Spatial Manager Workspace</h1>
        <p>Comprehensive view of site rollouts, compliance, and vendor performance</p>
      </header>

      <nav className="tab-navigation">
        <button 
          className={`tab-button ${activeTab === 'pipeline' ? 'active' : ''}`}
          onClick={() => setActiveTab('pipeline')}
        >
          Site Pipeline
        </button>
        <button 
          className={`tab-button ${activeTab === 'compliance' ? 'active' : ''}`}
          onClick={() => setActiveTab('compliance')}
        >
          Compliance Status
        </button>
        <button 
          className={`tab-button ${activeTab === 'vendors' ? 'active' : ''}`}
          onClick={() => setActiveTab('vendors')}
        >
          Vendor Tasks
        </button>
        <button 
          className={`tab-button ${activeTab === 'progress' ? 'active' : ''}`}
          onClick={() => setActiveTab('progress')}
        >
          Rollout Progress
        </button>
      </nav>

      <main className="tab-content">
        {activeTab === 'pipeline' && <SitePipeline sites={sites} />}
        {activeTab === 'compliance' && <ComplianceStatus sites={sites} components={components} />}
        {activeTab === 'vendors' && <VendorTasks tasks={tasks} onRefresh={loadData} />}
        {activeTab === 'progress' && <RolloutProgress sites={sites} tasks={tasks} components={components} />}
      </main>
    </div>
  );
}