import '@servicenow/sdk/global'
import { UiPage } from '@servicenow/sdk/core'
import spatialManagerWorkspace from '../../client/spatial-manager-workspace.html'

export const spatialManagerWorkspacePage = UiPage({
  $id: Now.ID['spatial_manager_workspace'],
  endpoint: 'x_1873093_site_rol_spatial_manager_workspace.do',
  description: 'Comprehensive workspace for Spatial Managers to view site pipeline, compliance status, vendor tasks, and rollout progress',
  category: 'general',
  html: spatialManagerWorkspace,
  direct: true
})