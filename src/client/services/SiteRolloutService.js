// Service for managing Site Rollout data via ServiceNow Table API
export class SiteRolloutService {
  constructor() {
    this.scopeName = 'x_1873093_site_rol';
  }

  // Generic method to handle API calls with proper error handling
  async apiCall(endpoint, options = {}) {
    try {
      const response = await fetch(endpoint, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-UserToken': window.g_ck,
          ...options.headers
        },
        ...options
      });

      if (!response.ok) {
        // ServiceNow returns error details in JSON even for error responses
        try {
          const errorData = await response.json();
          throw new Error(errorData.error?.message || `HTTP ${response.status}: ${response.statusText}`);
        } catch {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
      }

      return await response.json();
    } catch (error) {
      console.error('API call failed:', error);
      throw error;
    }
  }

  // Get sites with optional filters
  async getSites(filters = {}) {
    const searchParams = new URLSearchParams(filters);
    searchParams.set('sysparm_display_value', 'all');
    searchParams.set('sysparm_fields', 'sys_id,site_name,site_code,site_type,rollout_status,planned_start_date,planned_go_live_date,assigned_manager,design_template');
    
    const { result } = await this.apiCall(`/api/now/table/${this.scopeName}_site?${searchParams.toString()}`);
    return result || [];
  }

  // Get site components for a specific site
  async getSiteComponents(siteId = null, filters = {}) {
    const searchParams = new URLSearchParams(filters);
    if (siteId) {
      searchParams.set('site', siteId);
    }
    searchParams.set('sysparm_display_value', 'all');
    
    const { result } = await this.apiCall(`/api/now/table/${this.scopeName}_site_component?${searchParams.toString()}`);
    return result || [];
  }

  // Get rollout tasks with optional filters
  async getRolloutTasks(filters = {}) {
    const searchParams = new URLSearchParams(filters);
    searchParams.set('sysparm_display_value', 'all');
    searchParams.set('sysparm_fields', 'sys_id,task_name,task_type,assigned_vendor,assigned_field_tech,due_date,status,site');
    
    const { result } = await this.apiCall(`/api/now/table/${this.scopeName}_rollout_task?${searchParams.toString()}`);
    return result || [];
  }

  // Get tasks assigned to current user
  async getMyTasks() {
    return this.getRolloutTasks({
      assigned_field_tech: window.g_user.userID
    });
  }

  // Update a rollout task
  async updateTask(taskId, data) {
    const { result } = await this.apiCall(`/api/now/table/${this.scopeName}_rollout_task/${taskId}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    });
    return result;
  }

  // Get vendors
  async getVendors() {
    const { result } = await this.apiCall(`/api/now/table/${this.scopeName}_vendor?sysparm_display_value=all`);
    return result || [];
  }

  // Get dashboard metrics
  async getDashboardMetrics() {
    // Get all sites and components for calculations
    const [sites, components, tasks] = await Promise.all([
      this.getSites(),
      this.getSiteComponents(),
      this.getRolloutTasks()
    ]);

    // Calculate site completion percentage
    const completedSites = sites.filter(site => {
      const status = typeof site.rollout_status === 'object' ? site.rollout_status.value : site.rollout_status;
      return status === 'completed';
    }).length;
    const siteCompletionPercentage = sites.length > 0 ? Math.round((completedSites / sites.length) * 100) : 0;

    // Calculate component compliance percentage
    const operationalComponents = components.filter(component => {
      const status = typeof component.status === 'object' ? component.status.value : component.status;
      return status === 'operational';
    }).length;
    const componentCompliancePercentage = components.length > 0 ? Math.round((operationalComponents / components.length) * 100) : 0;

    // Calculate overdue tasks
    const now = new Date();
    const overdueTasks = tasks.filter(task => {
      const dueDate = typeof task.due_date === 'object' ? task.due_date.display_value : task.due_date;
      const status = typeof task.status === 'object' ? task.status.value : task.status;
      return dueDate && new Date(dueDate) < now && status !== 'completed' && status !== 'cancelled';
    }).length;

    return {
      siteCompletionPercentage,
      componentCompliancePercentage,
      overdueTasks,
      totalSites: sites.length,
      totalComponents: components.length,
      totalTasks: tasks.length
    };
  }
}