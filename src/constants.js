const CONSTANTS = {};
CONSTANTS.ENDPOINT = {};
CONSTANTS.API = {};
CONSTANTS.SYSTEM = {};

CONSTANTS.ERROR_MESSAGE = {};

CONSTANTS.ERROR_MESSAGE.GRID_GET = "Request to get grid text failed:";
CONSTANTS.ERROR_MESSAGE.LIST_DELETE = "Request to delete list item failed:";
CONSTANTS.ERROR_MESSAGE.LIST_ADD = "Request to add list item failed:";
CONSTANTS.ERROR_MESSAGE.LIST_GET = "Request to get list items failed:";
CONSTANTS.ERROR_MESSAGE.LIST_EMPTY_MESSAGE = "Please enter a valid message";
CONSTANTS.ERROR_MESSAGE.MASTERDETAIL_GET = "Request to get master detail text failed:";
CONSTANTS.ERROR_MESSAGE.LOGIN_GET = "Request to Login text failed";

// Live production URL
CONSTANTS.ENDPOINT.URL = "http://54.251.165.232:80";

CONSTANTS.ENDPOINT.GRID = "/api/Homepage";
CONSTANTS.ENDPOINT.LIST = "/api/list";
CONSTANTS.ENDPOINT.MASTERDETAIL = "/api/masterdetail";
CONSTANTS.API.LOGIN = "/api/login";
CONSTANTS.API.USER_LIST = "/api/userlist";
CONSTANTS.API.CONTACT_US = "/api/contact_us";
CONSTANTS.SYSTEM.CALL = "/api/ams_system";

export default CONSTANTS;
