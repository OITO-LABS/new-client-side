import {
    PATH_PREFIX, LANDING, DASHBOARD, APP_INFO, UPPER_BAR, EMPLOYEE_REG, EMPLOYEE_UPDATE, EMPLOYEE_LISTING, EMPLOYEE_DETAILS, ASSET_LISTING, ASSET_DETAILS, ADD_ASSETS, ASSIGN_ASSETS,
    REIMBURSEMENT_LISTING, REIMBURSEMENT_EMPLOYEE_LISTING, REIMBURSEMENT_BILL_LISTING,APPLY_REIMBURSEMENT} from 'utils/constants';
const routes = [
    {
        name: LANDING,
        path: PATH_PREFIX,
        samplePath: PATH_PREFIX,
        componentId: 'pages/home',
        title: 'Home',
        className: 'home-page',
        exact: true,
        nowrap: false
    },
    {
        name: DASHBOARD,
        path: PATH_PREFIX + DASHBOARD,
        samplePath: PATH_PREFIX + DASHBOARD,
        componentId: 'pages/dashboard',
        title: 'Dashboard',
        className: 'dashboard-page',
        exact: true,
        nowrap: false
    },

    {
        name: APP_INFO,
        path: PATH_PREFIX + APP_INFO,
        samplePath: PATH_PREFIX + APP_INFO,
        componentId: 'pages/appinfo',
        title: 'App Info',
        className: 'app-info-page',
        exact: true,
        nowrap: false
    },
    {
        name: EMPLOYEE_REG,
        path: PATH_PREFIX + ':empId/' + EMPLOYEE_REG,
        samplePath: PATH_PREFIX + '123/' + EMPLOYEE_REG,
        componentId: 'pages/registerEmployee',
        title: 'register employee',
        className: 'register-employee-page',
        exact: true,
        nowrap: false
    },
    // {
    //     name:EMPLOYEE_UPDATE,
    //     path:PATH_PREFIX+EMPLOYEE_UPDATE,
    //     samplePath:PATH_PREFIX+EMPLOYEE_UPDATE,
    //     componentId:'pages/updateEmployee',
    //     title:'update employee',
    //     className:'update-employee-page',
    //     exact:true,
    //     nowrap:false
    // },
    {
        name: UPPER_BAR,
        path: PATH_PREFIX + UPPER_BAR,
        samplePath: PATH_PREFIX + UPPER_BAR,
        componentId: 'pages/upperbar',
        title: 'upper bar',
        className: 'upper-bar-page',
        exact: true,
        nowrap: false
    },
    {
        name: EMPLOYEE_LISTING,
        path: PATH_PREFIX + EMPLOYEE_LISTING,
        samplePath: PATH_PREFIX + EMPLOYEE_LISTING,
        componentId: 'pages/employeeListing',
        title: 'Employee Listing',
        className: 'employee-listing-page',
        exact: true,
        nowrap: false
        // params:'',
    },
    {
        name: EMPLOYEE_DETAILS,
        path: PATH_PREFIX + ':empId/' + EMPLOYEE_DETAILS,
        samplePath: PATH_PREFIX + EMPLOYEE_DETAILS,
        componentId: 'pages/employeeDetails',
        title: 'employee details',
        className: 'employee-details-page',
        exact: true,
        nowrap: false
    },
    {
        name: ASSET_DETAILS,
        path: PATH_PREFIX + ':assetId/' + ASSET_DETAILS,
        samplePath: PATH_PREFIX + ASSET_DETAILS,
        componentId: 'pages/assetDetails',
        title: 'asset details',
        className: 'asset-details-page',
        exact: true,
        nowrap: false
    },
    {
        name: ASSET_LISTING,
        path: PATH_PREFIX + ASSET_LISTING,
        samplePath: PATH_PREFIX + ASSET_LISTING,
        componentId: 'pages/assetListing',
        title: 'asset listing',
        className: 'asset-listing-page',
        exact: true,
        nowrap: false
    },
    {
        name: ADD_ASSETS,
        path: PATH_PREFIX + ':assetId/' + ADD_ASSETS,
        samplePath: PATH_PREFIX + ADD_ASSETS,
        componentId: 'pages/assetRegistration',
        title: 'asset registration',
        className: 'asset-registration-page',
        exact: true,
        nowrap: false
    },
    {
        name: ASSIGN_ASSETS,
        path: PATH_PREFIX + ':assetId/' + ASSIGN_ASSETS,
        samplePath: PATH_PREFIX + ASSIGN_ASSETS,
        componentId: 'pages/assetAssignment',
        title: 'asset assignment',
        className: 'asset-assign-page',
        exact: true,
        nowrap: false
    },
    {
        name: REIMBURSEMENT_LISTING,
        path: PATH_PREFIX + REIMBURSEMENT_LISTING,
        samplePath: PATH_PREFIX + REIMBURSEMENT_LISTING,
        componentId: 'pages/reimbursementListing',
        title: 'reimbursement listing',
        className: 'reimbursement-listing-page',
        exact: true,
        nowrap: false
    },
    {
        name: REIMBURSEMENT_EMPLOYEE_LISTING,
        path: PATH_PREFIX +':empNo/'+ REIMBURSEMENT_EMPLOYEE_LISTING,
        samplePath: PATH_PREFIX + REIMBURSEMENT_EMPLOYEE_LISTING,
        componentId: 'pages/reimbursementEmployeeListing',
        title: 'reimbursement employee listing',
        className: 'reimbursement-employee-listing-page',
        exact: true,
        nowrap: false
    },
    {
        name: REIMBURSEMENT_BILL_LISTING,
        path: PATH_PREFIX + REIMBURSEMENT_BILL_LISTING,
        samplePath: PATH_PREFIX + REIMBURSEMENT_BILL_LISTING,
        componentId: 'pages/reimbursementBillListing',
        title: 'reimbursement bill listing',
        className: 'reimbursement-bill-listing-page',
        exact: true,
        nowrap: false
    },
    {
        name: APPLY_REIMBURSEMENT,
        path: PATH_PREFIX + APPLY_REIMBURSEMENT,
        samplePath: PATH_PREFIX + APPLY_REIMBURSEMENT,
        componentId: 'pages/reimbursementApply',
        title: 'apply reimbursement',
        className: 'apply-reimbursement-page',
        exact: true,
        nowrap: false
    },
];

export default routes;

