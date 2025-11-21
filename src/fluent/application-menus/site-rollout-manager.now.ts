import '@servicenow/sdk/global'
import { ApplicationMenu, Record } from '@servicenow/sdk/core'

// Create the main application menu for Site Rollout Manager
export const siteRolloutManagerMenu = ApplicationMenu({
    $id: Now.ID['app_menu_site_rollout'],
    title: 'Site Rollout Manager',
    description: 'Manage spatial technology rollouts across multiple sites',
    hint: 'Access site management, templates, checklists, tasks, and vendor coordination',
    active: true,
    order: 100
})

// Site Management Module
export const siteModule = Record({
    $id: Now.ID['module_sites'],
    table: 'sys_app_module',
    data: {
        title: 'Sites',
        application: siteRolloutManagerMenu.$id,
        link_type: 'LIST',
        name: 'x_1873093_site_rol_site',
        hint: 'Manage rollout sites',
        active: true,
        order: 100
    }
})

// Site Components Module  
export const siteComponentModule = Record({
    $id: Now.ID['module_site_components'],
    table: 'sys_app_module',
    data: {
        title: 'Site Components',
        application: siteRolloutManagerMenu.$id,
        link_type: 'LIST',
        name: 'x_1873093_site_rol_site_component',
        hint: 'Track components deployed at each site',
        active: true,
        order: 110
    }
})

// Template Management Separator
export const templateSeparator = Record({
    $id: Now.ID['module_template_separator'],
    table: 'sys_app_module',
    data: {
        title: 'Template Management',
        application: siteRolloutManagerMenu.$id,
        link_type: 'SEPARATOR',
        active: true,
        order: 200
    }
})

// Design Template Module
export const templateModule = Record({
    $id: Now.ID['module_templates'],
    table: 'sys_app_module',
    data: {
        title: 'Design Templates',
        application: siteRolloutManagerMenu.$id,
        link_type: 'LIST',
        name: 'x_1873093_site_rol_design_template',
        hint: 'Manage rollout design templates',
        active: true,
        order: 210
    }
})

// Template Component Module
export const templateComponentModule = Record({
    $id: Now.ID['module_template_components'],
    table: 'sys_app_module',
    data: {
        title: 'Template Components',
        application: siteRolloutManagerMenu.$id,
        link_type: 'LIST',
        name: 'x_1873093_site_rol_template_component',
        hint: 'Manage components within design templates',
        active: true,
        order: 220
    }
})

// Checklists & Tasks Separator
export const checklistSeparator = Record({
    $id: Now.ID['module_checklist_separator'],
    table: 'sys_app_module',
    data: {
        title: 'Checklists & Tasks',
        application: siteRolloutManagerMenu.$id,
        link_type: 'SEPARATOR',
        active: true,
        order: 300
    }
})

// Rollout Tasks Module
export const rolloutTaskModule = Record({
    $id: Now.ID['module_rollout_tasks'],
    table: 'sys_app_module',
    data: {
        title: 'Rollout Tasks',
        application: siteRolloutManagerMenu.$id,
        link_type: 'LIST',
        name: 'x_1873093_site_rol_rollout_task',
        hint: 'Manage tasks within site rollouts',
        active: true,
        order: 310
    }
})

// Checklist Module (now active)
export const checklistModule = Record({
    $id: Now.ID['module_checklists'],
    table: 'sys_app_module',
    data: {
        title: 'Rollout Checklists',
        application: siteRolloutManagerMenu.$id,
        link_type: 'LIST',
        name: 'x_1873093_site_rol_rollout_checklist',
        hint: 'Manage rollout checklists',
        active: true, // Now activated
        order: 320
    }
})

// Vendor Management Separator
export const vendorSeparator = Record({
    $id: Now.ID['module_vendor_separator'],
    table: 'sys_app_module',
    data: {
        title: 'Vendor Management',
        application: siteRolloutManagerMenu.$id,
        link_type: 'SEPARATOR',
        active: true,
        order: 400
    }
})

// Vendor Module
export const vendorModule = Record({
    $id: Now.ID['module_vendors'],
    table: 'sys_app_module',
    data: {
        title: 'Vendors',
        application: siteRolloutManagerMenu.$id,
        link_type: 'LIST',
        name: 'x_1873093_site_rol_vendor',
        hint: 'Manage vendors and suppliers',
        active: true,
        order: 410
    }
})

// Workspaces & Dashboards Separator
export const workspacesSeparator = Record({
    $id: Now.ID['module_workspaces_separator'],
    table: 'sys_app_module',
    data: {
        title: 'Workspaces & Dashboards',
        application: siteRolloutManagerMenu.$id,
        link_type: 'SEPARATOR',
        active: true,
        order: 500
    }
})

// Spatial Manager Workspace
export const spatialManagerWorkspaceModule = Record({
    $id: Now.ID['module_spatial_manager_workspace'],
    table: 'sys_app_module',
    data: {
        title: 'Spatial Manager Workspace',
        application: siteRolloutManagerMenu.$id,
        link_type: 'DIRECT',
        query: 'x_1873093_site_rol_spatial_manager_workspace.do',
        hint: 'Comprehensive workspace for spatial managers',
        active: true,
        order: 510
    }
})

// Field Technician Workspace
export const fieldTechWorkspaceModule = Record({
    $id: Now.ID['module_field_tech_workspace'],
    table: 'sys_app_module',
    data: {
        title: 'Field Technician Tasks',
        application: siteRolloutManagerMenu.$id,
        link_type: 'DIRECT',
        query: 'x_1873093_site_rol_field_tech_workspace.do',
        hint: 'Task management workspace for field technicians',
        active: true,
        order: 520
    }
})

// Site Rollout Dashboard (now active)
export const dashboardModule = Record({
    $id: Now.ID['module_dashboard'],
    table: 'sys_app_module',
    data: {
        title: 'Rollout Dashboard',
        application: siteRolloutManagerMenu.$id,
        link_type: 'DIRECT',
        query: 'x_1873093_site_rol_dashboard.do',
        hint: 'View rollout progress and analytics',
        active: true, // Now activated
        order: 530
    }
})