import '@servicenow/sdk/global'
import { BusinessRule } from '@servicenow/sdk/core'
import { generateSiteComponentsFromTemplate } from '../../server/site-template-automation.js'

// Business rule to automatically generate site components from design template
export const siteTemplateAutomation = BusinessRule({
    $id: Now.ID['br_site_template_automation'],
    name: 'Generate Site Components from Template',
    table: 'x_1873093_site_rol_site',
    when: 'after',
    action: ['insert', 'update'],
    script: generateSiteComponentsFromTemplate,
    order: 100,
    active: true,
    description: 'Automatically generates site components when a site is created or when design template is changed'
})