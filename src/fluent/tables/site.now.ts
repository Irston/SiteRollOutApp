import '@servicenow/sdk/global'
import { Table, StringColumn, DateColumn, ReferenceColumn } from '@servicenow/sdk/core'

// Creates the Site table for managing rollout sites
export const x_1873093_site_rol_site = Table({
    name: 'x_1873093_site_rol_site',
    label: 'Site',
    schema: {
        site_name: StringColumn({ 
            label: 'Site Name', 
            maxLength: 100,
            mandatory: true 
        }),
        site_code: StringColumn({ 
            label: 'Site Code', 
            maxLength: 20,
            mandatory: true 
        }),
        address: StringColumn({ 
            label: 'Address', 
            maxLength: 500 
        }),
        site_type: StringColumn({
            label: 'Site Type',
            maxLength: 50,
            choices: {
                retail: { label: 'Retail Store', sequence: 0 },
                warehouse: { label: 'Warehouse', sequence: 1 },
                office: { label: 'Office', sequence: 2 },
                distribution_center: { label: 'Distribution Center', sequence: 3 },
                headquarters: { label: 'Headquarters', sequence: 4 },
                manufacturing: { label: 'Manufacturing', sequence: 5 }
            },
            dropdown: 'dropdown_with_none'
        }),
        design_template: ReferenceColumn({
            label: 'Design Template',
            referenceTable: 'x_1873093_site_rol_design_template'
        }),
        rollout_status: StringColumn({
            label: 'Rollout Status',
            maxLength: 50,
            choices: {
                planning: { label: 'Planning', sequence: 0 },
                approved: { label: 'Approved', sequence: 1 },
                in_progress: { label: 'In Progress', sequence: 2 },
                testing: { label: 'Testing', sequence: 3 },
                completed: { label: 'Completed', sequence: 4 },
                on_hold: { label: 'On Hold', sequence: 5 },
                cancelled: { label: 'Cancelled', sequence: 6 }
            },
            dropdown: 'dropdown_with_none',
            default: 'planning'
        }),
        planned_start_date: DateColumn({ 
            label: 'Planned Start Date'
        }),
        planned_go_live_date: DateColumn({ 
            label: 'Planned Go-Live Date'
        }),
        assigned_manager: ReferenceColumn({
            label: 'Assigned Manager',
            referenceTable: 'sys_user'
        })
    },
    display: 'site_name',
    extensible: true,
    allow_web_service_access: true,
    actions: ['create', 'read', 'update', 'delete'],
    accessible_from: 'package_private'
})