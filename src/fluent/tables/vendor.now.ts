import '@servicenow/sdk/global'
import { Table, StringColumn, IntegerColumn } from '@servicenow/sdk/core'

// Creates the Vendor table for managing vendors and suppliers
export const x_1873093_site_rol_vendor = Table({
    name: 'x_1873093_site_rol_vendor',
    label: 'Vendor',
    schema: {
        vendor_name: StringColumn({ 
            label: 'Vendor Name', 
            maxLength: 100,
            mandatory: true 
        }),
        contact_person: StringColumn({ 
            label: 'Contact Person', 
            maxLength: 100 
        }),
        email: StringColumn({ 
            label: 'Email', 
            maxLength: 100 
        }),
        phone: StringColumn({ 
            label: 'Phone', 
            maxLength: 30 
        }),
        category: StringColumn({
            label: 'Category',
            maxLength: 50,
            choices: {
                hardware_supplier: { label: 'Hardware Supplier', sequence: 0 },
                software_vendor: { label: 'Software Vendor', sequence: 1 },
                network_provider: { label: 'Network Provider', sequence: 2 },
                installation_contractor: { label: 'Installation Contractor', sequence: 3 },
                maintenance_provider: { label: 'Maintenance Provider', sequence: 4 },
                consulting_services: { label: 'Consulting Services', sequence: 5 },
                logistics_provider: { label: 'Logistics Provider', sequence: 6 },
                security_services: { label: 'Security Services', sequence: 7 },
                other: { label: 'Other', sequence: 8 }
            },
            dropdown: 'dropdown_with_none'
        }),
        rating: IntegerColumn({
            label: 'Rating',
            min: 1,
            max: 5,
            default: '3'
        })
    },
    display: 'vendor_name',
    extensible: true,
    allow_web_service_access: true,
    actions: ['create', 'read', 'update', 'delete'],
    accessible_from: 'package_private'
})