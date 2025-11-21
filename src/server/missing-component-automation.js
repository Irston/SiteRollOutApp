import { gs, GlideRecord } from '@servicenow/glide'

export function createTaskForMissingComponent(current, previous) {
    // Check if status changed to "missing"
    if (current.status != 'missing' || !current.status.changes()) {
        return
    }
    
    // Check if vendor is assigned
    if (!current.assigned_vendor || current.assigned_vendor.nil()) {
        gs.addErrorMessage('Cannot create rollout task: No vendor assigned to this component')
        return
    }
    
    gs.info('Site Rollout Manager: Creating rollout task for missing component: ' + current.component_name)
    
    // Check if task already exists for this component
    const existingTask = new GlideRecord('x_1873093_site_rol_rollout_task')
    existingTask.addQuery('task_name', 'CONTAINS', current.component_name.toString())
    existingTask.addQuery('site', current.site.toString())
    existingTask.addQuery('task_type', 'equipment_delivery')
    existingTask.addQuery('status', '!=', 'completed')
    existingTask.addQuery('status', '!=', 'cancelled')
    existingTask.query()
    
    if (existingTask.hasNext()) {
        gs.addInfoMessage('Rollout task already exists for this missing component')
        return
    }
    
    // Create rollout task
    const rolloutTask = new GlideRecord('x_1873093_site_rol_rollout_task')
    rolloutTask.initialize()
    
    // Set task details
    rolloutTask.setValue('task_name', 'Replace Missing Component: ' + current.component_name)
    rolloutTask.setValue('task_type', 'equipment_delivery')
    rolloutTask.setValue('assigned_vendor', current.assigned_vendor.toString())
    rolloutTask.setValue('site', current.site.toString())
    rolloutTask.setValue('status', 'not_started')
    
    // Set due date to 7 days from now
    const dueDate = new gs.GlideDateTime()
    dueDate.addDaysUTC(7)
    rolloutTask.setValue('due_date', dueDate.getValue())
    
    if (rolloutTask.insert()) {
        gs.addInfoMessage('Created rollout task for missing component: ' + current.component_name)
        
        // Update component notes
        const componentRecord = new GlideRecord('x_1873093_site_rol_site_component')
        if (componentRecord.get(current.sys_id)) {
            const existingNotes = componentRecord.notes.toString() || ''
            const newNotes = existingNotes + (existingNotes ? '\n\n' : '') + 
                'Rollout task created automatically due to missing status on ' + 
                gs.nowDateTime()
            componentRecord.setValue('notes', newNotes)
            componentRecord.update()
        }
    } else {
        gs.addErrorMessage('Failed to create rollout task for missing component')
    }
}