import '@servicenow/sdk/global'
import { UiPage } from '@servicenow/sdk/core'
import dashboard from '../../client/dashboard.html'

export const dashboardPage = UiPage({
  $id: Now.ID['rollout_dashboard'],
  endpoint: 'x_1873093_site_rol_dashboard.do',
  description: 'Comprehensive dashboard showing site completion, component compliance, vendor performance, and overdue tasks',
  category: 'general',
  html: dashboard,
  direct: true
})