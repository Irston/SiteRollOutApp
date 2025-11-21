import '@servicenow/sdk/global'
import { BusinessRule } from '@servicenow/sdk/core'
import { createTaskForMissingComponent } from '../../server/missing-component-automation.js'

// Business rule to automatically create rollout tasks when components are marked as missing
export const missingComponentAutomation = BusinessRule({
    $id: Now.ID['br_missing_component_automation'],
    name: 'Create Task for Missing Component',
    table: 'x_1873093_site_rol_site_component',
    when: 'after',
    action: ['update'],
    script: createTaskForMissingComponent,
    order: 100,
    active: true,
    condition: "current.status == 'missing' && current.status.changes()",
    description: 'Automatically creates a rollout task when a site component is marked as missing'
})