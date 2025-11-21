import React from 'react';

export default function ComplianceStatus({ sites, components }) {
  // Calculate compliance metrics
  const getComplianceData = () => {
    const siteCompliance = sites.map(site => {
      const siteId = typeof site.sys_id === 'object' ? site.sys_id.value : site.sys_id;
      const siteName = typeof site.site_name === 'object' ? site.site_name.display_value : site.site_name;
      const rolloutStatus = typeof site.rollout_status === 'object' ? site.rollout_status.value : site.rollout_status;
      
      const siteComponents = components.filter(comp => {
        const compSiteId = typeof comp.site === 'object' ? comp.site.value : comp.site;
        return compSiteId === siteId;
      });

      const operationalComponents = siteComponents.filter(comp => {
        const status = typeof comp.status === 'object' ? comp.status.value : comp.status;
        return status === 'operational';
      });

      const compliancePercentage = siteComponents.length > 0 
        ? Math.round((operationalComponents.length / siteComponents.length) * 100)
        : 0;

      return {
        siteId,
        siteName,
        rolloutStatus,
        totalComponents: siteComponents.length,
        operationalComponents: operationalComponents.length,
        compliancePercentage,
        missingComponents: siteComponents.filter(comp => {
          const status = typeof comp.status === 'object' ? comp.status.value : comp.status;
          return status === 'missing';
        }).length,
        failedComponents: siteComponents.filter(comp => {
          const status = typeof comp.status === 'object' ? comp.status.value : comp.status;
          return status === 'failed';
        }).length
      };
    });

    return siteCompliance.sort((a, b) => a.compliancePercentage - b.compliancePercentage);
  };

  const getComplianceColor = (percentage) => {
    if (percentage >= 90) return '#28a745';
    if (percentage >= 70) return '#ffc107';
    return '#dc3545';
  };

  const complianceData = getComplianceData();
  const overallCompliance = complianceData.length > 0 
    ? Math.round(complianceData.reduce((sum, site) => sum + site.compliancePercentage, 0) / complianceData.length)
    : 0;

  return (
    <div className="compliance-status">
      <div className="compliance-header">
        <h2>Component Compliance Status</h2>
        <div className="overall-metric">
          <span className="metric-label">Overall Compliance</span>
          <span className="metric-value" style={{ color: getComplianceColor(overallCompliance) }}>
            {overallCompliance}%
          </span>
        </div>
      </div>

      <div className="compliance-grid">
        {complianceData.map(site => (
          <div key={site.siteId} className="compliance-card">
            <div className="card-header">
              <h3>{site.siteName}</h3>
              <span className={`status-badge status-${site.rolloutStatus}`}>
                {site.rolloutStatus?.replace('_', ' ')}
              </span>
            </div>
            
            <div className="compliance-bar-container">
              <div className="compliance-bar">
                <div 
                  className="compliance-fill" 
                  style={{ 
                    width: `${site.compliancePercentage}%`,
                    backgroundColor: getComplianceColor(site.compliancePercentage)
                  }}
                />
              </div>
              <span className="compliance-percentage">
                {site.compliancePercentage}%
              </span>
            </div>

            <div className="compliance-details">
              <div className="detail-row">
                <span>Operational:</span>
                <span>{site.operationalComponents}/{site.totalComponents}</span>
              </div>
              {site.missingComponents > 0 && (
                <div className="detail-row missing">
                  <span>Missing:</span>
                  <span>{site.missingComponents}</span>
                </div>
              )}
              {site.failedComponents > 0 && (
                <div className="detail-row failed">
                  <span>Failed:</span>
                  <span>{site.failedComponents}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .compliance-status {
          height: 100%;
        }

        .compliance-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 1px solid #dee2e6;
        }

        .overall-metric {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .metric-label {
          font-size: 12px;
          color: #666;
          margin-bottom: 4px;
        }

        .metric-value {
          font-size: 24px;
          font-weight: bold;
        }

        .compliance-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }

        .compliance-card {
          background-color: #f8f9fa;
          border: 1px solid #dee2e6;
          border-radius: 8px;
          padding: 20px;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .card-header h3 {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
        }

        .compliance-bar-container {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 15px;
        }

        .compliance-bar {
          flex: 1;
          height: 8px;
          background-color: #e9ecef;
          border-radius: 4px;
          overflow: hidden;
        }

        .compliance-fill {
          height: 100%;
          transition: width 0.3s ease;
        }

        .compliance-percentage {
          font-weight: 600;
          min-width: 35px;
          text-align: right;
        }

        .compliance-details {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
        }

        .detail-row.missing {
          color: #ffc107;
        }

        .detail-row.failed {
          color: #dc3545;
        }

        @media (max-width: 768px) {
          .compliance-header {
            flex-direction: column;
            gap: 15px;
          }
          
          .compliance-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}