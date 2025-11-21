import '@servicenow/sdk/global'
import { Table, StringColumn, BooleanColumn, ReferenceColumn, IntegerColumn } from '@servicenow/sdk/core'

// Creates the Rollout Task table for managing rollout checklist items
export const x_1873093_site_rol_rollout_checklist = Table({
    name: 'x_1873093_site_rol_rollout_checklist',
    label: 'Rollout Checklist',
    schema: {
        checklist_item: StringColumn({ 
            label: 'Checklist Item', 
            maxLength: 200,
            mandatory: true 
        }),
        category: StringColumn({
            label: 'Category',
            maxLength: 50,
            choices: {
                pre_deployment: { label: 'Pre-Deployment', sequence: 0 },
                site_preparation: { label: 'Site Preparation', sequence: 1 },
                equipment_setup: { label: 'Equipment Setup', sequence: 2 },
                configuration: { label: 'Configuration', sequence: 3 },
                testing: { label: 'Testing', sequence: 4 },
                go_live: { label: 'Go Live', sequence: 5 },
                post_deployment: { label: 'Post Deployment', sequence: 6 },
                documentation: { label: 'Documentation', sequence: 7 },
                training: { label: 'Training', sequence: 8 }
            },
            dropdown: 'dropdown_with_none'
        }),
        completed: BooleanColumn({
            label: 'Completed',
            default: false
        }),
        required: BooleanColumn({
            label: 'Required',
            default: true
        }),
        sequence_order: IntegerColumn({
            label: 'Sequence Order',
            default: '100'
        }),
        notes: StringColumn({ 
            label: 'Notes', 
            maxLength: 1000 
        }),
        site: ReferenceColumn({
            label: 'Site',
            referenceTable: 'x_1873093_site_rol_site',
            mandatory: true
        }),
        assigned_to: ReferenceColumn({
            label: 'Assigned To',
            referenceTable: 'sys_user'
        })
    },
    display: 'checklist_item',
    extensible: true,
    allow_web_service_access: true,
    actions: ['create', 'read', 'update', 'delete'],
    accessible_from: 'package_private'
})