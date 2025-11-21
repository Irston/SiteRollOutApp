import '@servicenow/sdk/global'
import { Record } from '@servicenow/sdk/core'

// Sample Sites (15 records)
export const sampleSites = [
  Record({
    $id: Now.ID['site_001'],
    table: 'x_1873093_site_rol_site',
    data: {
      site_name: 'Downtown Seattle Store',
      site_code: 'SEA-001',
      address: '1234 Pike Street, Seattle, WA 98101',
      site_type: 'retail',
      design_template: '', // Will be set after templates are created
      rollout_status: 'completed',
      planned_start_date: '2024-01-15',
      planned_go_live_date: '2024-02-15',
      assigned_manager: '' // Reference to sys_user
    }
  }),
  Record({
    $id: Now.ID['site_002'],
    table: 'x_1873093_site_rol_site',
    data: {
      site_name: 'Portland Distribution Center',
      site_code: 'PDX-001',
      address: '5678 Industrial Blvd, Portland, OR 97201',
      site_type: 'distribution_center',
      rollout_status: 'in_progress',
      planned_start_date: '2024-02-01',
      planned_go_live_date: '2024-03-15'
    }
  }),
  Record({
    $id: Now.ID['site_003'],
    table: 'x_1873093_site_rol_site',
    data: {
      site_name: 'San Francisco HQ',
      site_code: 'SFO-HQ',
      address: '100 Market Street, San Francisco, CA 94105',
      site_type: 'headquarters',
      rollout_status: 'testing',
      planned_start_date: '2024-01-01',
      planned_go_live_date: '2024-02-01'
    }
  }),
  Record({
    $id: Now.ID['site_004'],
    table: 'x_1873093_site_rol_site',
    data: {
      site_name: 'Denver Branch Office',
      site_code: 'DEN-001',
      address: '200 17th Street, Denver, CO 80202',
      site_type: 'office',
      rollout_status: 'approved',
      planned_start_date: '2024-03-01',
      planned_go_live_date: '2024-04-01'
    }
  }),
  Record({
    $id: Now.ID['site_005'],
    table: 'x_1873093_site_rol_site',
    data: {
      site_name: 'Phoenix Warehouse',
      site_code: 'PHX-WH1',
      address: '789 Desert Way, Phoenix, AZ 85001',
      site_type: 'warehouse',
      rollout_status: 'planning',
      planned_start_date: '2024-04-01',
      planned_go_live_date: '2024-05-15'
    }
  }),
  Record({
    $id: Now.ID['site_006'],
    table: 'x_1873093_site_rol_site',
    data: {
      site_name: 'Austin Manufacturing Plant',
      site_code: 'AUS-MFG1',
      address: '456 Tech Ridge Blvd, Austin, TX 78754',
      site_type: 'manufacturing',
      rollout_status: 'in_progress',
      planned_start_date: '2024-02-15',
      planned_go_live_date: '2024-04-15'
    }
  }),
  Record({
    $id: Now.ID['site_007'],
    table: 'x_1873093_site_rol_site',
    data: {
      site_name: 'Chicago Retail Store',
      site_code: 'CHI-001',
      address: '321 Michigan Ave, Chicago, IL 60601',
      site_type: 'retail',
      rollout_status: 'on_hold',
      planned_start_date: '2024-03-15',
      planned_go_live_date: '2024-04-30'
    }
  }),
  Record({
    $id: Now.ID['site_008'],
    table: 'x_1873093_site_rol_site',
    data: {
      site_name: 'Miami Distribution Hub',
      site_code: 'MIA-DH1',
      address: '999 Port Blvd, Miami, FL 33101',
      site_type: 'distribution_center',
      rollout_status: 'completed',
      planned_start_date: '2023-12-01',
      planned_go_live_date: '2024-01-15'
    }
  }),
  Record({
    $id: Now.ID['site_009'],
    table: 'x_1873093_site_rol_site',
    data: {
      site_name: 'Boston Office',
      site_code: 'BOS-001',
      address: '50 State Street, Boston, MA 02109',
      site_type: 'office',
      rollout_status: 'testing',
      planned_start_date: '2024-02-01',
      planned_go_live_date: '2024-03-01'
    }
  }),
  Record({
    $id: Now.ID['site_010'],
    table: 'x_1873093_site_rol_site',
    data: {
      site_name: 'Las Vegas Retail Store',
      site_code: 'LAS-001',
      address: '777 Casino Drive, Las Vegas, NV 89101',
      site_type: 'retail',
      rollout_status: 'approved',
      planned_start_date: '2024-04-15',
      planned_go_live_date: '2024-05-30'
    }
  }),
  Record({
    $id: Now.ID['site_011'],
    table: 'x_1873093_site_rol_site',
    data: {
      site_name: 'Atlanta Warehouse',
      site_code: 'ATL-WH1',
      address: '123 Logistics Lane, Atlanta, GA 30301',
      site_type: 'warehouse',
      rollout_status: 'in_progress',
      planned_start_date: '2024-03-01',
      planned_go_live_date: '2024-04-15'
    }
  }),
  Record({
    $id: Now.ID['site_012'],
    table: 'x_1873093_site_rol_site',
    data: {
      site_name: 'Detroit Manufacturing',
      site_code: 'DET-MFG1',
      address: '456 Motor City Blvd, Detroit, MI 48201',
      site_type: 'manufacturing',
      rollout_status: 'planning',
      planned_start_date: '2024-05-01',
      planned_go_live_date: '2024-07-01'
    }
  }),
  Record({
    $id: Now.ID['site_013'],
    table: 'x_1873093_site_rol_site',
    data: {
      site_name: 'New York Office Tower',
      site_code: 'NYC-001',
      address: '200 Broadway, New York, NY 10038',
      site_type: 'office',
      rollout_status: 'completed',
      planned_start_date: '2023-11-01',
      planned_go_live_date: '2023-12-15'
    }
  }),
  Record({
    $id: Now.ID['site_014'],
    table: 'x_1873093_site_rol_site',
    data: {
      site_name: 'Los Angeles Regional Hub',
      site_code: 'LAX-RH1',
      address: '789 Century Blvd, Los Angeles, CA 90045',
      site_type: 'distribution_center',
      rollout_status: 'testing',
      planned_start_date: '2024-02-15',
      planned_go_live_date: '2024-03-30'
    }
  }),
  Record({
    $id: Now.ID['site_015'],
    table: 'x_1873093_site_rol_site',
    data: {
      site_name: 'Nashville Branch',
      site_code: 'BNA-001',
      address: '300 Music Row, Nashville, TN 37203',
      site_type: 'office',
      rollout_status: 'approved',
      planned_start_date: '2024-05-15',
      planned_go_live_date: '2024-06-30'
    }
  })
]