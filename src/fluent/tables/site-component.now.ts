import '@servicenow/sdk/global'
import { Table, StringColumn, ReferenceColumn } from '@servicenow/sdk/core'

// Creates the Site Component table for tracking actual components deployed at each site
export const x_1873093_site_rol_site_component = Table({
    name: 'x_1873093_site_rol_site_component',
    label: 'Site Component',
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
        status: StringColumn({
            label: 'Status',
            maxLength: 50,
            choices: {
                planned: { label: 'Planned', sequence: 0 },
                ordered: { label: 'Ordered', sequence: 1 },
                shipped: { label: 'Shipped', sequence: 2 },
                delivered: { label: 'Delivered', sequence: 3 },
                installed: { label: 'Installed', sequence: 4 },
                configured: { label: 'Configured', sequence: 5 },
                tested: { label: 'Tested', sequence: 6 },
                operational: { label: 'Operational', sequence: 7 },
                missing: { label: 'Missing', sequence: 8 },
                failed: { label: 'Failed', sequence: 9 },
                replaced: { label: 'Replaced', sequence: 10 },
                decommissioned: { label: 'Decommissioned', sequence: 11 }
            },
            dropdown: 'dropdown_with_none',
            default: 'planned'
        }),
        assigned_vendor: ReferenceColumn({
            label: 'Assigned Vendor',
            referenceTable: 'x_1873093_site_rol_vendor'
        }),
        notes: StringColumn({ 
            label: 'Notes', 
            maxLength: 1000 
        }),
        site: ReferenceColumn({
            label: 'Site',
            referenceTable: 'x_1873093_site_rol_site',
            mandatory: true
        })
    },
    display: 'component_name',
    extensible: true,
    allow_web_service_access: true,
    actions: ['create', 'read', 'update', 'delete'],
    accessible_from: 'package_private'
})