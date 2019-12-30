import {
    PATH_PREFIX, LANDING, PROFILE, APP_INFO, EMPLOYEE_REG, EMPLOYEE_UPDATE, EMPLOYEE_LISTING, EMPLOYEE_DETAILS, ASSET_LISTING, ASSET_DETAILS, ADD_ASSETS, ASSIGN_ASSETS,
    REIMBURSEMENT_LISTING, REIMBURSEMENT_EMPLOYEE_LISTING, REIMBURSEMENT_BILL_LISTING,APPLY_REIMBURSEMENT,RESET_PASSWORD,FORGOT_PASSWORD,LOGIN,HOME,INACTIVE_ASSET_LISTING,ASSET_DELETION} from 'utils/constants';
const routes = [
    {
        name: LANDING,
        path: PATH_PREFIX,
        samplePath: PATH_PREFIX,
        componentId: 'pages/login',
        title: 'Home',
        className: 'login-page',
        exact: true,
        nowrap: true,
        skipLogin:true
    },
    {
        name: HOME,
        path: PATH_PREFIX + HOME,
        samplePath: PATH_PREFIX + HOME,
        componentId: 'pages/home',
        title: 'home',
        className: 'home-page',
        exact: true,
        nowrap: false,
    },
    {
        name: RESET_PASSWORD,
        path: PATH_PREFIX + RESET_PASSWORD,
        samplePath: PATH_PREFIX + RESET_PASSWORD,
        componentId: 'pages/resetPassword',
        title: 'reset password',
        className: 'reset-password-page',
        exact: true,
        nowrap: true,
        skipLogin:true
    },
    {
        name: LOGIN,
        path: PATH_PREFIX + LOGIN,
        samplePath: PATH_PREFIX + LOGIN,
        componentId: 'pages/login',
        title: 'login',
        className: 'login-page',
        exact: true,
        nowrap: true,
        skipLogin:true
    },
    {
        name: FORGOT_PASSWORD,
        path: PATH_PREFIX + FORGOT_PASSWORD,
        samplePath: PATH_PREFIX + FORGOT_PASSWORD,
        componentId: 'pages/forgotPassword',
        title: 'forgot password',
        className: 'forgot-password-page',
        exact: true,
        nowrap: true,
        skipLogin:true
    },
    {
        name: PROFILE,
        path: PATH_PREFIX + PROFILE,
        samplePath: PATH_PREFIX + PROFILE,
        componentId: 'pages/profile',
        title: 'PROFILE',
        className: 'profile-page',
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
    {
        name:INACTIVE_ASSET_LISTING,
        path:PATH_PREFIX+INACTIVE_ASSET_LISTING,
        samplePath:PATH_PREFIX+INACTIVE_ASSET_LISTING,
        componentId:'pages/inactiveAssetListing',
        title:'inactive asset listing',
        className:'inactive-asset-listing-page',
        exact:true,
        nowrap:false
    },
    
    {
        name: EMPLOYEE_LISTING,
        path: PATH_PREFIX + EMPLOYEE_LISTING,
        samplePath: PATH_PREFIX + EMPLOYEE_LISTING,
        componentId: 'pages/employeeListing',
        title: 'Employee Listing',
        className: 'employee-listing-page',
        exact: true,
        nowrap: false,
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
        path: PATH_PREFIX +':assetId/' + ':status/' + ASSIGN_ASSETS,
        samplePath: PATH_PREFIX + ASSIGN_ASSETS,
        componentId: 'pages/assetAssignment',
        title: 'asset assignment',
        className: 'asset-assign-page',
        exact: true,
        nowrap: false
    },
    {
        name: ASSET_DELETION,
        path: PATH_PREFIX +':assetId/' + ASSET_DELETION,
        samplePath: PATH_PREFIX + ASSET_DELETION,
        componentId: 'pages/assetDeletion',
        title: 'asset deletion',
        className: 'asset-deletion-page',
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
        path: PATH_PREFIX +':reimbursementId/' + REIMBURSEMENT_BILL_LISTING,
        samplePath: PATH_PREFIX + REIMBURSEMENT_BILL_LISTING,
        componentId: 'pages/reimbursementBillListing',
        title: 'reimbursement bill listing',
        className: 'reimbursement-bill-listing-page',
        exact: true,
        nowrap: false
    },
    {
        name: APPLY_REIMBURSEMENT,
        path: PATH_PREFIX + ':reimbursementId/' + APPLY_REIMBURSEMENT,
        samplePath: PATH_PREFIX + APPLY_REIMBURSEMENT,
        componentId: 'pages/reimbursementApply',
        title: 'apply reimbursement',
        className: 'apply-reimbursement-page',
        exact: true,
        nowrap: false
    },
];

export default routes;

