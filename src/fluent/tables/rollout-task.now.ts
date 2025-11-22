import '@servicenow/sdk/global'
import { Table, StringColumn, ReferenceColumn, DateColumn } from '@servicenow/sdk/core'

// Creates the Rollout Task table for managing tasks within site rollouts
export const x_1873093_site_rol_rollout_task = Table({
    name: 'x_1873093_site_rol_rollout_task',
    label: 'Rollout Task',
    //test
    schema: {
        task_name: StringColumn({ 
            label: 'Task Name', 
            maxLength: 100,
            mandatory: true 
        }),
        task_type: StringColumn({
            label: 'Task Type',
            maxLength: 50,
            choices: {
                planning: { label: 'Planning', sequence: 0 },
                site_survey: { label: 'Site Survey', sequence: 1 },
                equipment_delivery: { label: 'Equipment Delivery', sequence: 2 },
                installation: { label: 'Installation', sequence: 3 },
                configuration: { label: 'Configuration', sequence: 4 },
                testing: { label: 'Testing', sequence: 5 },
                training: { label: 'Training', sequence: 6 },
                documentation: { label: 'Documentation', sequence: 7 },
                go_live: { label: 'Go Live', sequence: 8 },
                post_deployment: { label: 'Post Deployment', sequence: 9 },
                maintenance: { label: 'Maintenance', sequence: 10 }
            },
            dropdown: 'dropdown_with_none'
        }),
        assigned_vendor: ReferenceColumn({
            label: 'Assigned Vendor',
            referenceTable: 'x_1873093_site_rol_vendor'
        }),
        assigned_field_tech: ReferenceColumn({
            label: 'Assigned Field Tech',
            referenceTable: 'sys_user'
        }),
        due_date: DateColumn({ 
            label: 'Due Date'
        }),
        status: StringColumn({
            label: 'Status',
            maxLength: 50,
            choices: {
                not_started: { label: 'Not Started', sequence: 0 },
                in_progress: { label: 'In Progress', sequence: 1 },
                on_hold: { label: 'On Hold', sequence: 2 },
                waiting_approval: { label: 'Waiting Approval', sequence: 3 },
                waiting_vendor: { label: 'Waiting Vendor', sequence: 4 },
                completed: { label: 'Completed', sequence: 5 },
                cancelled: { label: 'Cancelled', sequence: 6 },
                failed: { label: 'Failed', sequence: 7 }
            },
            dropdown: 'dropdown_with_none',
            default: 'not_started'
        }),
        site: ReferenceColumn({
            label: 'Site',
            referenceTable: 'x_1873093_site_rol_site',
            mandatory: true
        })
    },
    display: 'task_name',
    extensible: true,
    allow_web_service_access: true,
    actions: ['create', 'read', 'update', 'delete'],
    accessible_from: 'package_private'
})