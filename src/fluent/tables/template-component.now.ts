import '@servicenow/sdk/global'
import { Table, StringColumn, BooleanColumn, IntegerColumn, ReferenceColumn } from '@servicenow/sdk/core'

// Creates the Template Component table for managing components within design templates
export const x_1873093_site_rol_template_component = Table({
    name: 'x_1873093_site_rol_template_component',
    label: 'Template Component',
    schema: {
        component_name: StringColumn({ 
            label: 'Component Name', 
            maxLength: 100,
            mandatory: true 
        }),
        category: StringColumn({
            label: 'Category',
            maxLength: 50,
            choices: {
                hardware: { label: 'Hardware', sequence: 0 },
                software: { label: 'Software', sequence: 1 },
                network_equipment: { label: 'Network Equipment', sequence: 2 },
                pos_system: { label: 'POS System', sequence: 3 },
                security_system: { label: 'Security System', sequence: 4 },
                display_equipment: { label: 'Display Equipment', sequence: 5 },
                infrastructure: { label: 'Infrastructure', sequence: 6 },
                accessories: { label: 'Accessories', sequence: 7 },
                services: { label: 'Services', sequence: 8 },
                other: { label: 'Other', sequence: 9 }
            },
            dropdown: 'dropdown_with_none'
        }),
        required: BooleanColumn({
            label: 'Required',
            default: true
        }),
        quantity: IntegerColumn({
            label: 'Quantity',
            default: '1',
            min: 0,
            mandatory: true
        }),
        design_template: ReferenceColumn({
            label: 'Design Template',
            referenceTable: 'x_1873093_site_rol_design_template',
            mandatory: true
        })
    },
    display: 'component_name',
    extensible: true,
    allow_web_service_access: true,
    actions: ['create', 'read', 'update', 'delete'],
    accessible_from: 'package_private'
})