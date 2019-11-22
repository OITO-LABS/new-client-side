export const METHOD_GET = 'GET';
export const METHOD_POST = 'POST';
export const METHOD_PUT = 'PUT';
export const METHOD_DELETE = 'DELETE';

export const ALERT_TYPE = {SUCCESS : 'success', DANGER : 'danger', WARNING : 'warning', INFO : 'info',ALERT:'alert',CONFIRM:'confirm'}
export const ADD = 'add';
export const CACHE = 'addToCache';
export const EDIT = 'edit';
export const DELETE = "delete";
export const DELETE_ALL = "deleteall";
export const ACTIONS = {ADD,EDIT,DELETE,DELETE_ALL};
export const HOME_TITLE = 'Home';
export const LANG = 'lang';
export const PARAMS = 'params';
export const READY = "ready";
export const PROCESSING = "processing";
export const WAIT = "wait";
export const SUCCESS = "SUCCESS";
export const GOTO_URL = 'url:switch';
export const FAILURE = "FAILURE";
export const STATUS = {READY,WAIT,PROCESSING,SUCCESS,FAILURE};
export const AUTH_KEY = 'Authorization';
export const COOKIE_ID = 'userCId';
export const USER_TKEY = 'batfu';

//events

export const WIN_CLICK = 'click';
export const WIN_RESIZE = 'resize';
export const WIN_SCROLL = 'scroll';
export const SCROLL_TO_TOP = 'scroll:top';
export const SHOW_ALERT = 'alert:show';
export const SHOW_ALERT_MSG = 'alert:showmsg';
export const CLOSE_ALERT = 'alert:close';
export const SUCCESS_DIALOG = 'successdialog:show';
export const AFTER_LOAD = 'load:done';
export const FLIP_LOADER = 'load:flip';
export const PATH_CHANGED = 'path:changed';

//routes
export const LANDING = 'landing';
export const APP_INFO = 'app-info';
// *********DASHBOARD*********
export const DASHBOARD = 'dashboard';
// *********EMPLOYEE_REG*********
export const EMPLOYEE_REG = 'employee-reg'
// *********ADD_ASSETS*********
export const ADD_ASSETS = 'add-assets'
// ASSIGN_ASSETS
export const ASSIGN_ASSETS = 'assign-assets'

export const EMPLOYEE_DETAILS ="employee-details";
export const EMPLOYEE_LISTING = "employee-listing";
export const ASSET_DETAILS ="asset-details";
export const ASSET_LISTING = "asset-listing";

export const REIMBURSEMENT_LISTING ="reimbursement-listing";
export const REIMBURSEMENT_EMPLOYEE_LISTING = "reimbursement-employee-listing";
export const REIMBURSEMENT_BILL_LISTING = "reimbursement-bill-listing";
export const APPLY_REIMBURSEMENT = 'reimbursement-apply';

export const PATH_PREFIX = pageConfig['PATH_PREFIX'];
export const PUBLIC_PATH = pageConfig['PUBLIC_PATH'];

export const BEARER_KEY = 'Bearer ';
export const ENTER_KEY = 13;
export const PASSWORD_POLICY = {requiredNumbers:1,requiredAlphabets:1,requiredCapitalLetters:0,requiredSmallLetters:0,requiredSepcialCharacters:0,minCharacters:8};
export const SESSION_EXPIRED = "sessionExpired";
