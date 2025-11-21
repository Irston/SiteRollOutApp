import '@servicenow/sdk/global'
import { UiPage } from '@servicenow/sdk/core'
import fieldTechWorkspace from '../../client/field-tech-workspace.html'

export const fieldTechWorkspacePage = UiPage({
  $id: Now.ID['field_tech_workspace'],
  endpoint: 'x_1873093_site_rol_field_tech_workspace.do',
  description: 'Field Technician workspace for managing assigned rollout tasks with photo upload and progress tracking',
  category: 'general',
  html: fieldTechWorkspace,
  direct: true
})