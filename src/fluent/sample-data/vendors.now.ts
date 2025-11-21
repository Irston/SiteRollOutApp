import '@servicenow/sdk/global'
import { Record } from '@servicenow/sdk/core'

// Sample Vendors (12 records)
export const sampleVendors = [
  Record({
    $id: Now.ID['vendor_001'],
    table: 'x_1873093_site_rol_vendor',
    data: {
      vendor_name: 'TechFlow Solutions',
      contact_person: 'Sarah Chen',
      email: 'sarah.chen@techflow.com',
      phone: '+1-555-0101',
      category: 'hardware_supplier',
      rating: 5
    }
  }),
  Record({
    $id: Now.ID['vendor_002'],
    table: 'x_1873093_site_rol_vendor',
    data: {
      vendor_name: 'NetCore Industries',
      contact_person: 'Michael Rodriguez',
      email: 'm.rodriguez@netcore.com',
      phone: '+1-555-0102',
      category: 'network_provider',
      rating: 4
    }
  }),
  Record({
    $id: Now.ID['vendor_003'],
    table: 'x_1873093_site_rol_vendor',
    data: {
      vendor_name: 'SecureInstall Corp',
      contact_person: 'Jennifer Kim',
      email: 'j.kim@secureinstall.com',
      phone: '+1-555-0103',
      category: 'installation_contractor',
      rating: 5
    }
  }),
  Record({
    $id: Now.ID['vendor_004'],
    table: 'x_1873093_site_rol_vendor',
    data: {
      vendor_name: 'CloudSoft Systems',
      contact_person: 'David Thompson',
      email: 'david@cloudsoft.com',
      phone: '+1-555-0104',
      category: 'software_vendor',
      rating: 4
    }
  }),
  Record({
    $id: Now.ID['vendor_005'],
    table: 'x_1873093_site_rol_vendor',
    data: {
      vendor_name: 'RapidFix Maintenance',
      contact_person: 'Lisa Parker',
      email: 'lisa.parker@rapidfix.com',
      phone: '+1-555-0105',
      category: 'maintenance_provider',
      rating: 3
    }
  }),
  Record({
    $id: Now.ID['vendor_006'],
    table: 'x_1873093_site_rol_vendor',
    data: {
      vendor_name: 'GlobalLogistics Pro',
      contact_person: 'Robert Wilson',
      email: 'r.wilson@globallogistics.com',
      phone: '+1-555-0106',
      category: 'logistics_provider',
      rating: 4
    }
  }),
  Record({
    $id: Now.ID['vendor_007'],
    table: 'x_1873093_site_rol_vendor',
    data: {
      vendor_name: 'Guardian Security Services',
      contact_person: 'Amanda Foster',
      email: 'amanda@guardian-sec.com',
      phone: '+1-555-0107',
      category: 'security_services',
      rating: 5
    }
  }),
  Record({
    $id: Now.ID['vendor_008'],
    table: 'x_1873093_site_rol_vendor',
    data: {
      vendor_name: 'ConsultTech Advisors',
      contact_person: 'James Mitchell',
      email: 'james.mitchell@consulttech.com',
      phone: '+1-555-0108',
      category: 'consulting_services',
      rating: 4
    }
  }),
  Record({
    $id: Now.ID['vendor_009'],
    table: 'x_1873093_site_rol_vendor',
    data: {
      vendor_name: 'PowerGrid Solutions',
      contact_person: 'Emily Davis',
      email: 'emily.davis@powergrid.com',
      phone: '+1-555-0109',
      category: 'hardware_supplier',
      rating: 3
    }
  }),
  Record({
    $id: Now.ID['vendor_010'],
    table: 'x_1873093_site_rol_vendor',
    data: {
      vendor_name: 'SmartConnect Networks',
      contact_person: 'Chris Johnson',
      email: 'chris.johnson@smartconnect.com',
      phone: '+1-555-0110',
      category: 'network_provider',
      rating: 4
    }
  }),
  Record({
    $id: Now.ID['vendor_011'],
    table: 'x_1873093_site_rol_vendor',
    data: {
      vendor_name: 'UltraFast Deployment',
      contact_person: 'Nicole Brown',
      email: 'nicole.brown@ultrafast.com',
      phone: '+1-555-0111',
      category: 'installation_contractor',
      rating: 5
    }
  }),
  Record({
    $id: Now.ID['vendor_012'],
    table: 'x_1873093_site_rol_vendor',
    data: {
      vendor_name: 'InnovateSoft Plus',
      contact_person: 'Mark Taylor',
      email: 'mark.taylor@innovatesoft.com',
      phone: '+1-555-0112',
      category: 'software_vendor',
      rating: 4
    }
  })
]