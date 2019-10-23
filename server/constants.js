﻿const CONSTANTS = {};
CONSTANTS.ENDPOINT = {};
CONSTANTS.API = {};
CONSTANTS.SYSTEM = {};


CONSTANTS.PORT = process.env.PORT || "3001";
CONSTANTS.ENDPOINT.MASTERDETAIL = "/masterdetail";

CONSTANTS.ENDPOINT.LIST = "/list";

CONSTANTS.ENDPOINT.GRID = "/Homepage";

// Live production URL
CONSTANTS.ENDPOINT.URL = "http://54.251.165.232:80";

CONSTANTS.API.LOGIN = "api/login";
CONSTANTS.API.USER_LIST = "/api/userlist";
CONSTANTS.API.CONTACT_US = "/api/contact_us";

// SYSTEM CALL NOT FOR USER CALLING.
CONSTANTS.SYSTEM.CALL = "/api/ams_system";

module.exports = CONSTANTS;
