import { gs, GlideRecord } from '@servicenow/glide'

export function generateSiteComponentsFromTemplate(current, previous) {
    // Check if this is an insert or if design_template field has changed
    const isInsert = current.isNewRecord()
    const templateChanged = !isInsert && current.design_template.changes()
    
    if (!isInsert && !templateChanged) {
        return
    }
    
    // Check if design template is selected
    if (!current.design_template || current.design_template.nil()) {
        return
    }
    
    gs.info('Site Rollout Manager: Generating site components for site: ' + current.site_name + ' from template: ' + current.design_template.getDisplayValue())
    
    // If template changed (not insert), remove existing site components
    if (templateChanged) {
        const existingComponents = new GlideRecord('x_1873093_site_rol_site_component')
        existingComponents.addQuery('site', current.sys_id)
        existingComponents.query()
        
        while (existingComponents.next()) {
            existingComponents.deleteRecord()
        }
    }
    
    // Query template components for the selected design template
    const templateComponents = new GlideRecord('x_1873093_site_rol_template_component')
    templateComponents.addQuery('design_template', current.design_template.toString())
    templateComponents.query()
    
    let componentsCreated = 0
    
    while (templateComponents.next()) {
        // Create site components for each required quantity
        const quantity = parseInt(templateComponents.quantity) || 1
        
        for (let i = 0; i < quantity; i++) {
            const siteComponent = new GlideRecord('x_1873093_site_rol_site_component')
            siteComponent.initialize()
            
            // Copy component details from template
            siteComponent.setValue('component_name', templateComponents.component_name.toString())
            siteComponent.setValue('category', templateComponents.category.toString())
            siteComponent.setValue('site', current.sys_id.toString())
            siteComponent.setValue('status', 'planned')
            
            // Add quantity suffix if more than one
            if (quantity > 1) {
                siteComponent.setValue('component_name', templateComponents.component_name + ' #' + (i + 1))
            }
            
            // Add note indicating it was auto-generated
            siteComponent.setValue('notes', 'Auto-generated from template: ' + current.design_template.getDisplayValue())
            
            if (siteComponent.insert()) {
                componentsCreated++
            }
        }
    }
    
    if (componentsCreated > 0) {
        gs.addInfoMessage('Generated ' + componentsCreated + ' site components from template')
    }
}