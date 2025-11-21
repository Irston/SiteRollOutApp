import '@servicenow/sdk/global'
import { Record } from '@servicenow/sdk/core'

// Sample Design Templates (12 records)
export const sampleDesignTemplates = [
  Record({
    $id: Now.ID['template_001'],
    table: 'x_1873093_site_rol_design_template',
    data: {
      template_name: 'Standard Retail Store Template',
      template_code: 'RETAIL-STD-001',
      site_type: 'retail',
      description: 'Standard template for retail store deployments including POS systems, network infrastructure, and security cameras',
      version: '2.1'
    }
  }),
  Record({
    $id: Now.ID['template_002'],
    table: 'x_1873093_site_rol_design_template',
    data: {
      template_name: 'Large Warehouse Template',
      template_code: 'WAREHOUSE-LG-001',
      site_type: 'warehouse',
      description: 'Template for large warehouse facilities with extensive inventory management systems and automated equipment',
      version: '1.8'
    }
  }),
  Record({
    $id: Now.ID['template_003'],
    table: 'x_1873093_site_rol_design_template',
    data: {
      template_name: 'Corporate Office Template',
      template_code: 'OFFICE-CORP-001',
      site_type: 'office',
      description: 'Template for corporate office spaces with meeting rooms, collaboration tools, and high-speed connectivity',
      version: '3.0'
    }
  }),
  Record({
    $id: Now.ID['template_004'],
    table: 'x_1873093_site_rol_design_template',
    data: {
      template_name: 'Distribution Center Template',
      template_code: 'DISTRIB-001',
      site_type: 'distribution_center',
      description: 'Comprehensive template for distribution centers with sorting systems, tracking, and logistics coordination',
      version: '2.5'
    }
  }),
  Record({
    $id: Now.ID['template_005'],
    table: 'x_1873093_site_rol_design_template',
    data: {
      template_name: 'Executive Headquarters Template',
      template_code: 'HQ-EXEC-001',
      site_type: 'headquarters',
      description: 'Premium template for executive headquarters with advanced security, conference facilities, and redundant systems',
      version: '1.9'
    }
  }),
  Record({
    $id: Now.ID['template_006'],
    table: 'x_1873093_site_rol_design_template',
    data: {
      template_name: 'Manufacturing Plant Template',
      template_code: 'MFG-PLANT-001',
      site_type: 'manufacturing',
      description: 'Industrial template for manufacturing facilities with process monitoring, safety systems, and quality control',
      version: '2.3'
    }
  }),
  Record({
    $id: Now.ID['template_007'],
    table: 'x_1873093_site_rol_design_template',
    data: {
      template_name: 'Small Retail Store Template',
      template_code: 'RETAIL-SM-001',
      site_type: 'retail',
      description: 'Compact template for small retail locations with essential POS and basic security systems',
      version: '1.6'
    }
  }),
  Record({
    $id: Now.ID['template_008'],
    table: 'x_1873093_site_rol_design_template',
    data: {
      template_name: 'Compact Warehouse Template',
      template_code: 'WAREHOUSE-SM-001',
      site_type: 'warehouse',
      description: 'Template for smaller warehouse operations with basic inventory tracking and security',
      version: '1.4'
    }
  }),
  Record({
    $id: Now.ID['template_009'],
    table: 'x_1873093_site_rol_design_template',
    data: {
      template_name: 'Branch Office Template',
      template_code: 'OFFICE-BR-001',
      site_type: 'office',
      description: 'Template for branch offices with essential collaboration tools and connectivity to headquarters',
      version: '2.2'
    }
  }),
  Record({
    $id: Now.ID['template_010'],
    table: 'x_1873093_site_rol_design_template',
    data: {
      template_name: 'Universal Basic Template',
      template_code: 'UNIVERSAL-001',
      site_type: 'universal',
      description: 'Basic template suitable for any site type with core networking and security components',
      version: '1.0'
    }
  }),
  Record({
    $id: Now.ID['template_011'],
    table: 'x_1873093_site_rol_design_template',
    data: {
      template_name: 'High-Security Office Template',
      template_code: 'OFFICE-SEC-001',
      site_type: 'office',
      description: 'Enhanced security template for sensitive office locations with biometric access and advanced monitoring',
      version: '1.5'
    }
  }),
  Record({
    $id: Now.ID['template_012'],
    table: 'x_1873093_site_rol_design_template',
    data: {
      template_name: 'Regional Distribution Hub',
      template_code: 'DISTRIB-REG-001',
      site_type: 'distribution_center',
      description: 'Large-scale template for regional distribution hubs with automated sorting and cross-docking capabilities',
      version: '3.1'
    }
  })
]