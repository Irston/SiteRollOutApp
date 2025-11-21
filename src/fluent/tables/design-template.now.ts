import '@servicenow/sdk/global'
import { Table, StringColumn, VersionColumn } from '@servicenow/sdk/core'

// Creates the Design Template table for managing rollout templates
export const x_1873093_site_rol_design_template = Table({
    name: 'x_1873093_site_rol_design_template',
    label: 'Design Template',
    schema: {
        template_name: StringColumn({ 
            label: 'Template Name', 
            maxLength: 100,
            mandatory: true 
        }),
        template_code: StringColumn({ 
            label: 'Template Code', 
            maxLength: 30,
            mandatory: true 
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
                manufacturing: { label: 'Manufacturing', sequence: 5 },
                universal: { label: 'Universal', sequence: 6 }
            },
            dropdown: 'dropdown_with_none'
        }),
        description: StringColumn({ 
            label: 'Description', 
            maxLength: 1000 
        }),
        version: VersionColumn({
            label: 'Version',
            default: '1.0'
        })
    },
    display: 'template_name',
    extensible: true,
    allow_web_service_access: true,
    actions: ['create', 'read', 'update', 'delete'],
    accessible_from: 'package_private'
})