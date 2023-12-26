(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (Buffer){(function (){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _superagent = _interopRequireDefault(require("superagent"));
var _querystring = _interopRequireDefault(require("querystring"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
* @module ApiClient
* @version 4.0.23
*/
/**
* Manages low level client-server communications, parameter marshalling, etc. There should not be any need for an
* application to use this class directly - the *Api and model classes provide the public API for the service. The
* contents of this file should be regarded as internal but are documented for completeness.
* @alias module:ApiClient
* @class
*/
var ApiClient = /*#__PURE__*/function () {
  /**
   * The base URL against which to resolve every API call's (relative) path.
   * Overrides the default value set in spec file if present
   * @param {String} basePath
   */
  function ApiClient() {
    var basePath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'https://api.elasticemail.com/v4';
    _classCallCheck(this, ApiClient);
    /**
     * The base URL against which to resolve every API call's (relative) path.
     * @type {String}
     * @default https://api.elasticemail.com/v4
     */
    this.basePath = basePath.replace(/\/+$/, '');

    /**
     * The authentication methods to be included for all API calls.
     * @type {Array.<String>}
     */
    this.authentications = {
      'apikey': {
        type: 'apiKey',
        'in': 'header',
        name: 'X-ElasticEmail-ApiKey'
      }
    };

    /**
     * The default HTTP headers to be included for all API calls.
     * @type {Array.<String>}
     * @default {}
     */
    this.defaultHeaders = {
      'User-Agent': 'OpenAPI-Generator/4.0.23/Javascript'
    };

    /**
     * The default HTTP timeout for all API calls.
     * @type {Number}
     * @default 60000
     */
    this.timeout = 60000;

    /**
     * If set to false an additional timestamp parameter is added to all API GET calls to
     * prevent browser caching
     * @type {Boolean}
     * @default true
     */
    this.cache = true;

    /**
     * If set to true, the client will save the cookies from each server
     * response, and return them in the next request.
     * @default false
     */
    this.enableCookies = false;

    /*
     * Used to save and return cookies in a node.js (non-browser) setting,
     * if this.enableCookies is set to true.
     */
    if (typeof window === 'undefined') {
      this.agent = new _superagent["default"].agent();
    }

    /*
     * Allow user to override superagent agent
     */
    this.requestAgent = null;

    /*
     * Allow user to add superagent plugins
     */
    this.plugins = null;
  }

  /**
  * Returns a string representation for an actual parameter.
  * @param param The actual parameter.
  * @returns {String} The string representation of <code>param</code>.
  */
  _createClass(ApiClient, [{
    key: "paramToString",
    value: function paramToString(param) {
      if (param == undefined || param == null) {
        return '';
      }
      if (param instanceof Date) {
        return param.toJSON();
      }
      if (ApiClient.canBeJsonified(param)) {
        return JSON.stringify(param);
      }
      return param.toString();
    }

    /**
    * Returns a boolean indicating if the parameter could be JSON.stringified
    * @param param The actual parameter
    * @returns {Boolean} Flag indicating if <code>param</code> can be JSON.stringified
    */
  }, {
    key: "buildUrl",
    value:
    /**
     * Builds full URL by appending the given path to the base URL and replacing path parameter place-holders with parameter values.
     * NOTE: query parameters are not handled here.
     * @param {String} path The path to append to the base URL.
     * @param {Object} pathParams The parameter values to append.
     * @param {String} apiBasePath Base path defined in the path, operation level to override the default one
     * @returns {String} The encoded path with parameter values substituted.
     */
    function buildUrl(path, pathParams, apiBasePath) {
      var _this = this;
      if (!path.match(/^\//)) {
        path = '/' + path;
      }
      var url = this.basePath + path;

      // use API (operation, path) base path if defined
      if (apiBasePath !== null && apiBasePath !== undefined) {
        url = apiBasePath + path;
      }
      url = url.replace(/\{([\w-\.]+)\}/g, function (fullMatch, key) {
        var value;
        if (pathParams.hasOwnProperty(key)) {
          value = _this.paramToString(pathParams[key]);
        } else {
          value = fullMatch;
        }
        return encodeURIComponent(value);
      });
      return url;
    }

    /**
    * Checks whether the given content type represents JSON.<br>
    * JSON content type examples:<br>
    * <ul>
    * <li>application/json</li>
    * <li>application/json; charset=UTF8</li>
    * <li>APPLICATION/JSON</li>
    * </ul>
    * @param {String} contentType The MIME content type to check.
    * @returns {Boolean} <code>true</code> if <code>contentType</code> represents JSON, otherwise <code>false</code>.
    */
  }, {
    key: "isJsonMime",
    value: function isJsonMime(contentType) {
      return Boolean(contentType != null && contentType.match(/^application\/json(;.*)?$/i));
    }

    /**
    * Chooses a content type from the given array, with JSON preferred; i.e. return JSON if included, otherwise return the first.
    * @param {Array.<String>} contentTypes
    * @returns {String} The chosen content type, preferring JSON.
    */
  }, {
    key: "jsonPreferredMime",
    value: function jsonPreferredMime(contentTypes) {
      for (var i = 0; i < contentTypes.length; i++) {
        if (this.isJsonMime(contentTypes[i])) {
          return contentTypes[i];
        }
      }
      return contentTypes[0];
    }

    /**
    * Checks whether the given parameter value represents file-like content.
    * @param param The parameter to check.
    * @returns {Boolean} <code>true</code> if <code>param</code> represents a file.
    */
  }, {
    key: "isFileParam",
    value: function isFileParam(param) {
      // fs.ReadStream in Node.js and Electron (but not in runtime like browserify)
      if (typeof require === 'function') {
        var fs;
        try {
          fs = require('fs');
        } catch (err) {}
        if (fs && fs.ReadStream && param instanceof fs.ReadStream) {
          return true;
        }
      }

      // Buffer in Node.js
      if (typeof Buffer === 'function' && param instanceof Buffer) {
        return true;
      }

      // Blob in browser
      if (typeof Blob === 'function' && param instanceof Blob) {
        return true;
      }

      // File in browser (it seems File object is also instance of Blob, but keep this for safe)
      if (typeof File === 'function' && param instanceof File) {
        return true;
      }
      return false;
    }

    /**
    * Normalizes parameter values:
    * <ul>
    * <li>remove nils</li>
    * <li>keep files and arrays</li>
    * <li>format to string with `paramToString` for other cases</li>
    * </ul>
    * @param {Object.<String, Object>} params The parameters as object properties.
    * @returns {Object.<String, Object>} normalized parameters.
    */
  }, {
    key: "normalizeParams",
    value: function normalizeParams(params) {
      var newParams = {};
      for (var key in params) {
        if (params.hasOwnProperty(key) && params[key] != undefined && params[key] != null) {
          var value = params[key];
          if (this.isFileParam(value) || Array.isArray(value)) {
            newParams[key] = value;
          } else {
            newParams[key] = this.paramToString(value);
          }
        }
      }
      return newParams;
    }

    /**
    * Builds a string representation of an array-type actual parameter, according to the given collection format.
    * @param {Array} param An array parameter.
    * @param {module:ApiClient.CollectionFormatEnum} collectionFormat The array element separator strategy.
    * @returns {String|Array} A string representation of the supplied collection, using the specified delimiter. Returns
    * <code>param</code> as is if <code>collectionFormat</code> is <code>multi</code>.
    */
  }, {
    key: "buildCollectionParam",
    value: function buildCollectionParam(param, collectionFormat) {
      if (param == null) {
        return null;
      }
      switch (collectionFormat) {
        case 'csv':
          return param.map(this.paramToString, this).join(',');
        case 'ssv':
          return param.map(this.paramToString, this).join(' ');
        case 'tsv':
          return param.map(this.paramToString, this).join('\t');
        case 'pipes':
          return param.map(this.paramToString, this).join('|');
        case 'multi':
          //return the array directly as SuperAgent will handle it as expected
          return param.map(this.paramToString, this);
        case 'passthrough':
          return param;
        default:
          throw new Error('Unknown collection format: ' + collectionFormat);
      }
    }

    /**
    * Applies authentication headers to the request.
    * @param {Object} request The request object created by a <code>superagent()</code> call.
    * @param {Array.<String>} authNames An array of authentication method names.
    */
  }, {
    key: "applyAuthToRequest",
    value: function applyAuthToRequest(request, authNames) {
      var _this2 = this;
      authNames.forEach(function (authName) {
        var auth = _this2.authentications[authName];
        switch (auth.type) {
          case 'basic':
            if (auth.username || auth.password) {
              request.auth(auth.username || '', auth.password || '');
            }
            break;
          case 'bearer':
            if (auth.accessToken) {
              var localVarBearerToken = typeof auth.accessToken === 'function' ? auth.accessToken() : auth.accessToken;
              request.set({
                'Authorization': 'Bearer ' + localVarBearerToken
              });
            }
            break;
          case 'apiKey':
            if (auth.apiKey) {
              var data = {};
              if (auth.apiKeyPrefix) {
                data[auth.name] = auth.apiKeyPrefix + ' ' + auth.apiKey;
              } else {
                data[auth.name] = auth.apiKey;
              }
              if (auth['in'] === 'header') {
                request.set(data);
              } else {
                request.query(data);
              }
            }
            break;
          case 'oauth2':
            if (auth.accessToken) {
              request.set({
                'Authorization': 'Bearer ' + auth.accessToken
              });
            }
            break;
          default:
            throw new Error('Unknown authentication type: ' + auth.type);
        }
      });
    }

    /**
     * Deserializes an HTTP response body into a value of the specified type.
     * @param {Object} response A SuperAgent response object.
     * @param {(String|Array.<String>|Object.<String, Object>|Function)} returnType The type to return. Pass a string for simple types
     * or the constructor function for a complex type. Pass an array containing the type name to return an array of that type. To
     * return an object, pass an object with one property whose name is the key type and whose value is the corresponding value type:
     * all properties on <code>data<code> will be converted to this type.
     * @returns A value of the specified type.
     */
  }, {
    key: "deserialize",
    value: function deserialize(response, returnType) {
      if (response == null || returnType == null || response.status == 204) {
        return null;
      }

      // Rely on SuperAgent for parsing response body.
      // See http://visionmedia.github.io/superagent/#parsing-response-bodies
      var data = response.body;
      if (data == null || _typeof(data) === 'object' && typeof data.length === 'undefined' && !Object.keys(data).length) {
        // SuperAgent does not always produce a body; use the unparsed response as a fallback
        data = response.text;
      }
      return ApiClient.convertToType(data, returnType);
    }

    /**
     * Callback function to receive the result of the operation.
     * @callback module:ApiClient~callApiCallback
     * @param {String} error Error message, if any.
     * @param data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Invokes the REST service using the supplied settings and parameters.
     * @param {String} path The base URL to invoke.
     * @param {String} httpMethod The HTTP method to use.
     * @param {Object.<String, String>} pathParams A map of path parameters and their values.
     * @param {Object.<String, Object>} queryParams A map of query parameters and their values.
     * @param {Object.<String, Object>} headerParams A map of header parameters and their values.
     * @param {Object.<String, Object>} formParams A map of form parameters and their values.
     * @param {Object} bodyParam The value to pass as the request body.
     * @param {Array.<String>} authNames An array of authentication type names.
     * @param {Array.<String>} contentTypes An array of request MIME types.
     * @param {Array.<String>} accepts An array of acceptable response MIME types.
     * @param {(String|Array|ObjectFunction)} returnType The required type to return; can be a string for simple types or the
     * constructor for a complex type.
     * @param {String} apiBasePath base path defined in the operation/path level to override the default one
     * @param {module:ApiClient~callApiCallback} callback The callback function.
     * @returns {Object} The SuperAgent request object.
     */
  }, {
    key: "callApi",
    value: function callApi(path, httpMethod, pathParams, queryParams, headerParams, formParams, bodyParam, authNames, contentTypes, accepts, returnType, apiBasePath, callback) {
      var _this3 = this;
      var url = this.buildUrl(path, pathParams, apiBasePath);
      var request = (0, _superagent["default"])(httpMethod, url);
      if (this.plugins !== null) {
        for (var index in this.plugins) {
          if (this.plugins.hasOwnProperty(index)) {
            request.use(this.plugins[index]);
          }
        }
      }

      // apply authentications
      this.applyAuthToRequest(request, authNames);

      // set query parameters
      if (httpMethod.toUpperCase() === 'GET' && this.cache === false) {
        queryParams['_'] = new Date().getTime();
      }
      request.query(this.normalizeParams(queryParams));

      // set header parameters
      request.set(this.defaultHeaders).set(this.normalizeParams(headerParams));

      // set requestAgent if it is set by user
      if (this.requestAgent) {
        request.agent(this.requestAgent);
      }

      // set request timeout
      request.timeout(this.timeout);
      var contentType = this.jsonPreferredMime(contentTypes);
      if (contentType) {
        // Issue with superagent and multipart/form-data (https://github.com/visionmedia/superagent/issues/746)
        if (contentType != 'multipart/form-data') {
          request.type(contentType);
        }
      }
      if (contentType === 'application/x-www-form-urlencoded') {
        request.send(_querystring["default"].stringify(this.normalizeParams(formParams)));
      } else if (contentType == 'multipart/form-data') {
        var _formParams = this.normalizeParams(formParams);
        for (var key in _formParams) {
          if (_formParams.hasOwnProperty(key)) {
            var _formParamsValue = _formParams[key];
            if (this.isFileParam(_formParamsValue)) {
              // file field
              request.attach(key, _formParamsValue);
            } else if (Array.isArray(_formParamsValue) && _formParamsValue.length && this.isFileParam(_formParamsValue[0])) {
              // multiple files
              _formParamsValue.forEach(function (file) {
                return request.attach(key, file);
              });
            } else {
              request.field(key, _formParamsValue);
            }
          }
        }
      } else if (bodyParam !== null && bodyParam !== undefined) {
        if (!request.header['Content-Type']) {
          request.type('application/json');
        }
        request.send(bodyParam);
      }
      var accept = this.jsonPreferredMime(accepts);
      if (accept) {
        request.accept(accept);
      }
      if (returnType === 'Blob') {
        request.responseType('blob');
      } else if (returnType === 'String') {
        request.responseType('text');
      }

      // Attach previously saved cookies, if enabled
      if (this.enableCookies) {
        if (typeof window === 'undefined') {
          this.agent._attachCookies(request);
        } else {
          request.withCredentials();
        }
      }
      request.end(function (error, response) {
        if (callback) {
          var data = null;
          if (!error) {
            try {
              data = _this3.deserialize(response, returnType);
              if (_this3.enableCookies && typeof window === 'undefined') {
                _this3.agent._saveCookies(response);
              }
            } catch (err) {
              error = err;
            }
          }
          callback(error, data, response);
        }
      });
      return request;
    }

    /**
    * Parses an ISO-8601 string representation or epoch representation of a date value.
    * @param {String} str The date value as a string.
    * @returns {Date} The parsed date object.
    */
  }, {
    key: "hostSettings",
    value:
    /**
      * Gets an array of host settings
      * @returns An array of host settings
      */
    function hostSettings() {
      return [{
        'url': "https://api.elasticemail.com/v4",
        'description': "No description provided"
      }];
    }
  }, {
    key: "getBasePathFromSettings",
    value: function getBasePathFromSettings(index) {
      var variables = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var servers = this.hostSettings();

      // check array index out of bound
      if (index < 0 || index >= servers.length) {
        throw new Error("Invalid index " + index + " when selecting the host settings. Must be less than " + servers.length);
      }
      var server = servers[index];
      var url = server['url'];

      // go through variable and assign a value
      for (var variable_name in server['variables']) {
        if (variable_name in variables) {
          var variable = server['variables'][variable_name];
          if (!('enum_values' in variable) || variable['enum_values'].includes(variables[variable_name])) {
            url = url.replace("{" + variable_name + "}", variables[variable_name]);
          } else {
            throw new Error("The variable `" + variable_name + "` in the host URL has invalid value " + variables[variable_name] + ". Must be " + server['variables'][variable_name]['enum_values'] + ".");
          }
        } else {
          // use default value
          url = url.replace("{" + variable_name + "}", server['variables'][variable_name]['default_value']);
        }
      }
      return url;
    }

    /**
    * Constructs a new map or array model from REST data.
    * @param data {Object|Array} The REST data.
    * @param obj {Object|Array} The target object or array.
    */
  }], [{
    key: "canBeJsonified",
    value: function canBeJsonified(str) {
      if (typeof str !== 'string' && _typeof(str) !== 'object') return false;
      try {
        var type = str.toString();
        return type === '[object Object]' || type === '[object Array]';
      } catch (err) {
        return false;
      }
    }
  }, {
    key: "parseDate",
    value: function parseDate(str) {
      if (isNaN(str)) {
        return new Date(str.replace(/(\d)(T)(\d)/i, '$1 $3'));
      }
      return new Date(+str);
    }

    /**
    * Converts a value to the specified type.
    * @param {(String|Object)} data The data to convert, as a string or object.
    * @param {(String|Array.<String>|Object.<String, Object>|Function)} type The type to return. Pass a string for simple types
    * or the constructor function for a complex type. Pass an array containing the type name to return an array of that type. To
    * return an object, pass an object with one property whose name is the key type and whose value is the corresponding value type:
    * all properties on <code>data<code> will be converted to this type.
    * @returns An instance of the specified type or null or undefined if data is null or undefined.
    */
  }, {
    key: "convertToType",
    value: function convertToType(data, type) {
      if (data === null || data === undefined) return data;
      switch (type) {
        case 'Boolean':
          return Boolean(data);
        case 'Integer':
          return parseInt(data, 10);
        case 'Number':
          return parseFloat(data);
        case 'String':
          return String(data);
        case 'Date':
          return ApiClient.parseDate(String(data));
        case 'Blob':
          return data;
        default:
          if (type === Object) {
            // generic object, return directly
            return data;
          } else if (typeof type.constructFromObject === 'function') {
            // for model type like User and enum class
            return type.constructFromObject(data);
          } else if (Array.isArray(type)) {
            // for array type like: ['String']
            var itemType = type[0];
            return data.map(function (item) {
              return ApiClient.convertToType(item, itemType);
            });
          } else if (_typeof(type) === 'object') {
            // for plain object type like: {'String': 'Integer'}
            var keyType, valueType;
            for (var k in type) {
              if (type.hasOwnProperty(k)) {
                keyType = k;
                valueType = type[k];
                break;
              }
            }
            var result = {};
            for (var k in data) {
              if (data.hasOwnProperty(k)) {
                var key = ApiClient.convertToType(k, keyType);
                var value = ApiClient.convertToType(data[k], valueType);
                result[key] = value;
              }
            }
            return result;
          } else {
            // for unknown type, return the data directly
            return data;
          }
      }
    }
  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj, itemType) {
      if (Array.isArray(data)) {
        for (var i = 0; i < data.length; i++) {
          if (data.hasOwnProperty(i)) obj[i] = ApiClient.convertToType(data[i], itemType);
        }
      } else {
        for (var k in data) {
          if (data.hasOwnProperty(k)) obj[k] = ApiClient.convertToType(data[k], itemType);
        }
      }
    }
  }]);
  return ApiClient;
}();
/**
 * Enumeration of collection format separator strategies.
 * @enum {String}
 * @readonly
 */
ApiClient.CollectionFormatEnum = {
  /**
   * Comma-separated values. Value: <code>csv</code>
   * @const
   */
  CSV: ',',
  /**
   * Space-separated values. Value: <code>ssv</code>
   * @const
   */
  SSV: ' ',
  /**
   * Tab-separated values. Value: <code>tsv</code>
   * @const
   */
  TSV: '\t',
  /**
   * Pipe(|)-separated values. Value: <code>pipes</code>
   * @const
   */
  PIPES: '|',
  /**
   * Native array. Value: <code>multi</code>
   * @const
   */
  MULTI: 'multi'
};

/**
* The default API client implementation.
* @type {module:ApiClient}
*/
ApiClient.instance = new ApiClient();
var _default = ApiClient;
exports["default"] = _default;
}).call(this)}).call(this,require("buffer").Buffer)
},{"buffer":110,"fs":109,"querystring":114,"superagent":102}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _Campaign = _interopRequireDefault(require("../model/Campaign"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
* Campaigns service.
* @module api/CampaignsApi
* @version 4.0.23
*/
var CampaignsApi = /*#__PURE__*/function () {
  /**
  * Constructs a new CampaignsApi. 
  * @alias module:api/CampaignsApi
  * @class
  * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
  * default to {@link module:ApiClient#instance} if unspecified.
  */
  function CampaignsApi(apiClient) {
    _classCallCheck(this, CampaignsApi);
    this.apiClient = apiClient || _ApiClient["default"].instance;
  }

  /**
   * Callback function to receive the result of the campaignsByNameDelete operation.
   * @callback module:api/CampaignsApi~campaignsByNameDeleteCallback
   * @param {String} error Error message, if any.
   * @param data This operation does not return a value.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Delete Campaign
   * Delete the specific campaign.  This does not cancel in progress email, see Cancel In Progress. Required Access Level: ModifyCampaigns
   * @param {String} name Name of Campaign to delete
   * @param {module:api/CampaignsApi~campaignsByNameDeleteCallback} callback The callback function, accepting three arguments: error, data, response
   */
  _createClass(CampaignsApi, [{
    key: "campaignsByNameDelete",
    value: function campaignsByNameDelete(name, callback) {
      var postBody = null;
      // verify the required parameter 'name' is set
      if (name === undefined || name === null) {
        throw new Error("Missing the required parameter 'name' when calling campaignsByNameDelete");
      }
      var pathParams = {
        'name': name
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = [];
      var accepts = [];
      var returnType = null;
      return this.apiClient.callApi('/campaigns/{name}', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the campaignsByNameGet operation.
     * @callback module:api/CampaignsApi~campaignsByNameGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Campaign} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Load Campaign
     * Returns the specified campaign details. Required Access Level: ViewCampaigns
     * @param {String} name Name of Campaign to get
     * @param {module:api/CampaignsApi~campaignsByNameGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Campaign}
     */
  }, {
    key: "campaignsByNameGet",
    value: function campaignsByNameGet(name, callback) {
      var postBody = null;
      // verify the required parameter 'name' is set
      if (name === undefined || name === null) {
        throw new Error("Missing the required parameter 'name' when calling campaignsByNameGet");
      }
      var pathParams = {
        'name': name
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _Campaign["default"];
      return this.apiClient.callApi('/campaigns/{name}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the campaignsByNamePut operation.
     * @callback module:api/CampaignsApi~campaignsByNamePutCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Campaign} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update Campaign
     * Updates a previously added campaign.  Only Active and Paused campaigns can be updated. Required Access Level: ModifyCampaigns
     * @param {String} name Name of Campaign to update
     * @param {module:model/Campaign} campaign JSON representation of a campaign
     * @param {module:api/CampaignsApi~campaignsByNamePutCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Campaign}
     */
  }, {
    key: "campaignsByNamePut",
    value: function campaignsByNamePut(name, campaign, callback) {
      var postBody = campaign;
      // verify the required parameter 'name' is set
      if (name === undefined || name === null) {
        throw new Error("Missing the required parameter 'name' when calling campaignsByNamePut");
      }
      // verify the required parameter 'campaign' is set
      if (campaign === undefined || campaign === null) {
        throw new Error("Missing the required parameter 'campaign' when calling campaignsByNamePut");
      }
      var pathParams = {
        'name': name
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = _Campaign["default"];
      return this.apiClient.callApi('/campaigns/{name}', 'PUT', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the campaignsGet operation.
     * @callback module:api/CampaignsApi~campaignsGetCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/Campaign>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Load Campaigns
     * Returns a list all of your campaigns. Limited to 1000 results. Required Access Level: ViewCampaigns
     * @param {Object} opts Optional parameters
     * @param {String} opts.search Text fragment used for searching in Campaign name (using the 'contains' rule)
     * @param {Number} opts.offset How many items should be returned ahead.
     * @param {Number} opts.limit Maximum number of returned items.
     * @param {module:api/CampaignsApi~campaignsGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/Campaign>}
     */
  }, {
    key: "campaignsGet",
    value: function campaignsGet(opts, callback) {
      opts = opts || {};
      var postBody = null;
      var pathParams = {};
      var queryParams = {
        'search': opts['search'],
        'offset': opts['offset'],
        'limit': opts['limit']
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = [_Campaign["default"]];
      return this.apiClient.callApi('/campaigns', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the campaignsPost operation.
     * @callback module:api/CampaignsApi~campaignsPostCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Campaign} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Add Campaign
     * Add a campaign for processing. Required Access Level: ModifyCampaigns
     * @param {module:model/Campaign} campaign JSON representation of a campaign
     * @param {module:api/CampaignsApi~campaignsPostCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Campaign}
     */
  }, {
    key: "campaignsPost",
    value: function campaignsPost(campaign, callback) {
      var postBody = campaign;
      // verify the required parameter 'campaign' is set
      if (campaign === undefined || campaign === null) {
        throw new Error("Missing the required parameter 'campaign' when calling campaignsPost");
      }
      var pathParams = {};
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = _Campaign["default"];
      return this.apiClient.callApi('/campaigns', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
  }]);
  return CampaignsApi;
}();
exports["default"] = CampaignsApi;
},{"../ApiClient":1,"../model/Campaign":23}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _CompressionFormat = _interopRequireDefault(require("../model/CompressionFormat"));
var _Contact = _interopRequireDefault(require("../model/Contact"));
var _ContactPayload = _interopRequireDefault(require("../model/ContactPayload"));
var _ContactUpdatePayload = _interopRequireDefault(require("../model/ContactUpdatePayload"));
var _EmailsPayload = _interopRequireDefault(require("../model/EmailsPayload"));
var _ExportFileFormats = _interopRequireDefault(require("../model/ExportFileFormats"));
var _ExportLink = _interopRequireDefault(require("../model/ExportLink"));
var _ExportStatus = _interopRequireDefault(require("../model/ExportStatus"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
* Contacts service.
* @module api/ContactsApi
* @version 4.0.23
*/
var ContactsApi = /*#__PURE__*/function () {
  /**
  * Constructs a new ContactsApi. 
  * @alias module:api/ContactsApi
  * @class
  * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
  * default to {@link module:ApiClient#instance} if unspecified.
  */
  function ContactsApi(apiClient) {
    _classCallCheck(this, ContactsApi);
    this.apiClient = apiClient || _ApiClient["default"].instance;
  }

  /**
   * Callback function to receive the result of the contactsByEmailDelete operation.
   * @callback module:api/ContactsApi~contactsByEmailDeleteCallback
   * @param {String} error Error message, if any.
   * @param data This operation does not return a value.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Delete Contact
   * Deletes the provided contact. Required Access Level: ModifyContacts
   * @param {String} email Proper email address.
   * @param {module:api/ContactsApi~contactsByEmailDeleteCallback} callback The callback function, accepting three arguments: error, data, response
   */
  _createClass(ContactsApi, [{
    key: "contactsByEmailDelete",
    value: function contactsByEmailDelete(email, callback) {
      var postBody = null;
      // verify the required parameter 'email' is set
      if (email === undefined || email === null) {
        throw new Error("Missing the required parameter 'email' when calling contactsByEmailDelete");
      }
      var pathParams = {
        'email': email
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = [];
      var accepts = [];
      var returnType = null;
      return this.apiClient.callApi('/contacts/{email}', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the contactsByEmailGet operation.
     * @callback module:api/ContactsApi~contactsByEmailGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Contact} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Load Contact
     * Load detailed contact information for specified email. Required Access Level: ViewContacts
     * @param {String} email Proper email address.
     * @param {module:api/ContactsApi~contactsByEmailGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Contact}
     */
  }, {
    key: "contactsByEmailGet",
    value: function contactsByEmailGet(email, callback) {
      var postBody = null;
      // verify the required parameter 'email' is set
      if (email === undefined || email === null) {
        throw new Error("Missing the required parameter 'email' when calling contactsByEmailGet");
      }
      var pathParams = {
        'email': email
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _Contact["default"];
      return this.apiClient.callApi('/contacts/{email}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the contactsByEmailPut operation.
     * @callback module:api/ContactsApi~contactsByEmailPutCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Contact} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update Contact
     * Update selected contact. Omitted contact's fields will not be changed. Required Access Level: ModifyContacts
     * @param {String} email Proper email address.
     * @param {module:model/ContactUpdatePayload} contactUpdatePayload 
     * @param {module:api/ContactsApi~contactsByEmailPutCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Contact}
     */
  }, {
    key: "contactsByEmailPut",
    value: function contactsByEmailPut(email, contactUpdatePayload, callback) {
      var postBody = contactUpdatePayload;
      // verify the required parameter 'email' is set
      if (email === undefined || email === null) {
        throw new Error("Missing the required parameter 'email' when calling contactsByEmailPut");
      }
      // verify the required parameter 'contactUpdatePayload' is set
      if (contactUpdatePayload === undefined || contactUpdatePayload === null) {
        throw new Error("Missing the required parameter 'contactUpdatePayload' when calling contactsByEmailPut");
      }
      var pathParams = {
        'email': email
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = _Contact["default"];
      return this.apiClient.callApi('/contacts/{email}', 'PUT', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the contactsDeletePost operation.
     * @callback module:api/ContactsApi~contactsDeletePostCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete Contacts Bulk
     * Deletes provided contacts in bulk. Required Access Level: ModifyContacts
     * @param {module:model/EmailsPayload} emailsPayload Provide either rule or a list of emails, not both.
     * @param {module:api/ContactsApi~contactsDeletePostCallback} callback The callback function, accepting three arguments: error, data, response
     */
  }, {
    key: "contactsDeletePost",
    value: function contactsDeletePost(emailsPayload, callback) {
      var postBody = emailsPayload;
      // verify the required parameter 'emailsPayload' is set
      if (emailsPayload === undefined || emailsPayload === null) {
        throw new Error("Missing the required parameter 'emailsPayload' when calling contactsDeletePost");
      }
      var pathParams = {};
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = ['application/json'];
      var accepts = [];
      var returnType = null;
      return this.apiClient.callApi('/contacts/delete', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the contactsExportByIdStatusGet operation.
     * @callback module:api/ContactsApi~contactsExportByIdStatusGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ExportStatus} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Check Export Status
     * Check the current status of the export. Required Access Level: Export
     * @param {String} id ID of the exported file
     * @param {module:api/ContactsApi~contactsExportByIdStatusGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ExportStatus}
     */
  }, {
    key: "contactsExportByIdStatusGet",
    value: function contactsExportByIdStatusGet(id, callback) {
      var postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling contactsExportByIdStatusGet");
      }
      var pathParams = {
        'id': id
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _ExportStatus["default"];
      return this.apiClient.callApi('/contacts/export/{id}/status', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the contactsExportPost operation.
     * @callback module:api/ContactsApi~contactsExportPostCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ExportLink} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Export Contacts
     * Request an Export of specified Contacts. Required Access Level: Export
     * @param {Object} opts Optional parameters
     * @param {module:model/ExportFileFormats} opts.fileFormat Format of the exported file
     * @param {String} opts.rule Query used for filtering.
     * @param {Array.<String>} opts.emails Comma delimited list of contact emails
     * @param {module:model/CompressionFormat} opts.compressionFormat FileResponse compression format. None or Zip.
     * @param {String} opts.fileName Name of your file including extension.
     * @param {module:api/ContactsApi~contactsExportPostCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ExportLink}
     */
  }, {
    key: "contactsExportPost",
    value: function contactsExportPost(opts, callback) {
      opts = opts || {};
      var postBody = null;
      var pathParams = {};
      var queryParams = {
        'fileFormat': opts['fileFormat'],
        'rule': opts['rule'],
        'emails': this.apiClient.buildCollectionParam(opts['emails'], 'multi'),
        'compressionFormat': opts['compressionFormat'],
        'fileName': opts['fileName']
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _ExportLink["default"];
      return this.apiClient.callApi('/contacts/export', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the contactsGet operation.
     * @callback module:api/ContactsApi~contactsGetCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/Contact>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Load Contacts
     * Returns a list of contacts. Required Access Level: ViewContacts
     * @param {Object} opts Optional parameters
     * @param {Number} opts.limit Maximum number of returned items.
     * @param {Number} opts.offset How many items should be returned ahead.
     * @param {module:api/ContactsApi~contactsGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/Contact>}
     */
  }, {
    key: "contactsGet",
    value: function contactsGet(opts, callback) {
      opts = opts || {};
      var postBody = null;
      var pathParams = {};
      var queryParams = {
        'limit': opts['limit'],
        'offset': opts['offset']
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = [_Contact["default"]];
      return this.apiClient.callApi('/contacts', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the contactsImportPost operation.
     * @callback module:api/ContactsApi~contactsImportPostCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Upload Contacts
     * Upload contacts from a file. Required Access Level: ModifyContacts
     * @param {Object} opts Optional parameters
     * @param {String} opts.listName Name of an existing list to add these contacts to
     * @param {String} opts.encodingName In what encoding the file is uploaded
     * @param {String} opts.fileUrl Optional url of csv to import
     * @param {File} opts.file 
     * @param {module:api/ContactsApi~contactsImportPostCallback} callback The callback function, accepting three arguments: error, data, response
     */
  }, {
    key: "contactsImportPost",
    value: function contactsImportPost(opts, callback) {
      opts = opts || {};
      var postBody = null;
      var pathParams = {};
      var queryParams = {
        'listName': opts['listName'],
        'encodingName': opts['encodingName'],
        'fileUrl': opts['fileUrl']
      };
      var headerParams = {};
      var formParams = {
        'file': opts['file']
      };
      var authNames = ['apikey'];
      var contentTypes = ['multipart/form-data'];
      var accepts = [];
      var returnType = null;
      return this.apiClient.callApi('/contacts/import', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the contactsPost operation.
     * @callback module:api/ContactsApi~contactsPostCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/Contact>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Add Contact
     * Add new Contacts to your Lists. Up to 1000 can be added (for more please refer to the import request). Required Access Level: ModifyContacts
     * @param {Array.<module:model/ContactPayload>} contactPayload 
     * @param {Object} opts Optional parameters
     * @param {Array.<String>} opts.listnames Names of lists to which the uploaded contacts should be added to
     * @param {module:api/ContactsApi~contactsPostCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/Contact>}
     */
  }, {
    key: "contactsPost",
    value: function contactsPost(contactPayload, opts, callback) {
      opts = opts || {};
      var postBody = contactPayload;
      // verify the required parameter 'contactPayload' is set
      if (contactPayload === undefined || contactPayload === null) {
        throw new Error("Missing the required parameter 'contactPayload' when calling contactsPost");
      }
      var pathParams = {};
      var queryParams = {
        'listnames': this.apiClient.buildCollectionParam(opts['listnames'], 'multi')
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = [_Contact["default"]];
      return this.apiClient.callApi('/contacts', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
  }]);
  return ContactsApi;
}();
exports["default"] = ContactsApi;
},{"../ApiClient":1,"../model/CompressionFormat":29,"../model/Contact":32,"../model/ContactPayload":34,"../model/ContactUpdatePayload":37,"../model/EmailsPayload":50,"../model/ExportFileFormats":54,"../model/ExportLink":55,"../model/ExportStatus":56}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _EmailData = _interopRequireDefault(require("../model/EmailData"));
var _EmailMessageData = _interopRequireDefault(require("../model/EmailMessageData"));
var _EmailSend = _interopRequireDefault(require("../model/EmailSend"));
var _EmailTransactionalMessageData = _interopRequireDefault(require("../model/EmailTransactionalMessageData"));
var _MergeEmailPayload = _interopRequireDefault(require("../model/MergeEmailPayload"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
* Emails service.
* @module api/EmailsApi
* @version 4.0.23
*/
var EmailsApi = /*#__PURE__*/function () {
  /**
  * Constructs a new EmailsApi. 
  * @alias module:api/EmailsApi
  * @class
  * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
  * default to {@link module:ApiClient#instance} if unspecified.
  */
  function EmailsApi(apiClient) {
    _classCallCheck(this, EmailsApi);
    this.apiClient = apiClient || _ApiClient["default"].instance;
  }

  /**
   * Callback function to receive the result of the emailsByMsgidViewGet operation.
   * @callback module:api/EmailsApi~emailsByMsgidViewGetCallback
   * @param {String} error Error message, if any.
   * @param {module:model/EmailData} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * View Email
   * Returns email details for viewing or rendering. Required Access Level: None
   * @param {String} msgid Message identifier
   * @param {module:api/EmailsApi~emailsByMsgidViewGetCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/EmailData}
   */
  _createClass(EmailsApi, [{
    key: "emailsByMsgidViewGet",
    value: function emailsByMsgidViewGet(msgid, callback) {
      var postBody = null;
      // verify the required parameter 'msgid' is set
      if (msgid === undefined || msgid === null) {
        throw new Error("Missing the required parameter 'msgid' when calling emailsByMsgidViewGet");
      }
      var pathParams = {
        'msgid': msgid
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _EmailData["default"];
      return this.apiClient.callApi('/emails/{msgid}/view', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the emailsMergefilePost operation.
     * @callback module:api/EmailsApi~emailsMergefilePostCallback
     * @param {String} error Error message, if any.
     * @param {module:model/EmailSend} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Send Bulk Emails CSV
     * Send bulk merge email. Required Access Level: SendHttp
     * @param {module:model/MergeEmailPayload} mergeEmailPayload Email data
     * @param {module:api/EmailsApi~emailsMergefilePostCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/EmailSend}
     */
  }, {
    key: "emailsMergefilePost",
    value: function emailsMergefilePost(mergeEmailPayload, callback) {
      var postBody = mergeEmailPayload;
      // verify the required parameter 'mergeEmailPayload' is set
      if (mergeEmailPayload === undefined || mergeEmailPayload === null) {
        throw new Error("Missing the required parameter 'mergeEmailPayload' when calling emailsMergefilePost");
      }
      var pathParams = {};
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = _EmailSend["default"];
      return this.apiClient.callApi('/emails/mergefile', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the emailsPost operation.
     * @callback module:api/EmailsApi~emailsPostCallback
     * @param {String} error Error message, if any.
     * @param {module:model/EmailSend} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Send Bulk Emails
     * Send bulk merge email. Required Access Level: SendHttp
     * @param {module:model/EmailMessageData} emailMessageData Email data
     * @param {module:api/EmailsApi~emailsPostCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/EmailSend}
     */
  }, {
    key: "emailsPost",
    value: function emailsPost(emailMessageData, callback) {
      var postBody = emailMessageData;
      // verify the required parameter 'emailMessageData' is set
      if (emailMessageData === undefined || emailMessageData === null) {
        throw new Error("Missing the required parameter 'emailMessageData' when calling emailsPost");
      }
      var pathParams = {};
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = _EmailSend["default"];
      return this.apiClient.callApi('/emails', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the emailsTransactionalPost operation.
     * @callback module:api/EmailsApi~emailsTransactionalPostCallback
     * @param {String} error Error message, if any.
     * @param {module:model/EmailSend} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Send Transactional Email
     * Send transactional emails (recipients will be known to each other). Required Access Level: SendHttp
     * @param {module:model/EmailTransactionalMessageData} emailTransactionalMessageData Email data
     * @param {module:api/EmailsApi~emailsTransactionalPostCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/EmailSend}
     */
  }, {
    key: "emailsTransactionalPost",
    value: function emailsTransactionalPost(emailTransactionalMessageData, callback) {
      var postBody = emailTransactionalMessageData;
      // verify the required parameter 'emailTransactionalMessageData' is set
      if (emailTransactionalMessageData === undefined || emailTransactionalMessageData === null) {
        throw new Error("Missing the required parameter 'emailTransactionalMessageData' when calling emailsTransactionalPost");
      }
      var pathParams = {};
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = _EmailSend["default"];
      return this.apiClient.callApi('/emails/transactional', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
  }]);
  return EmailsApi;
}();
exports["default"] = EmailsApi;
},{"../ApiClient":1,"../model/EmailData":41,"../model/EmailMessageData":42,"../model/EmailSend":44,"../model/EmailTransactionalMessageData":46,"../model/MergeEmailPayload":68}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _CompressionFormat = _interopRequireDefault(require("../model/CompressionFormat"));
var _EventType = _interopRequireDefault(require("../model/EventType"));
var _EventsOrderBy = _interopRequireDefault(require("../model/EventsOrderBy"));
var _ExportFileFormats = _interopRequireDefault(require("../model/ExportFileFormats"));
var _ExportLink = _interopRequireDefault(require("../model/ExportLink"));
var _ExportStatus = _interopRequireDefault(require("../model/ExportStatus"));
var _RecipientEvent = _interopRequireDefault(require("../model/RecipientEvent"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
* Events service.
* @module api/EventsApi
* @version 4.0.23
*/
var EventsApi = /*#__PURE__*/function () {
  /**
  * Constructs a new EventsApi. 
  * @alias module:api/EventsApi
  * @class
  * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
  * default to {@link module:ApiClient#instance} if unspecified.
  */
  function EventsApi(apiClient) {
    _classCallCheck(this, EventsApi);
    this.apiClient = apiClient || _ApiClient["default"].instance;
  }

  /**
   * Callback function to receive the result of the eventsByTransactionidGet operation.
   * @callback module:api/EventsApi~eventsByTransactionidGetCallback
   * @param {String} error Error message, if any.
   * @param {Array.<module:model/RecipientEvent>} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Load Email Events
   * Returns a log of delivery events for the specific transaction ID. Required Access Level: ViewReports
   * @param {String} transactionid ID number of transaction
   * @param {Object} opts Optional parameters
   * @param {Date} opts.from Starting date for search in YYYY-MM-DDThh:mm:ss format.
   * @param {Date} opts.to Ending date for search in YYYY-MM-DDThh:mm:ss format.
   * @param {module:model/EventsOrderBy} opts.orderBy 
   * @param {Number} opts.limit Maximum number of returned items.
   * @param {Number} opts.offset How many items should be returned ahead.
   * @param {module:api/EventsApi~eventsByTransactionidGetCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link Array.<module:model/RecipientEvent>}
   */
  _createClass(EventsApi, [{
    key: "eventsByTransactionidGet",
    value: function eventsByTransactionidGet(transactionid, opts, callback) {
      opts = opts || {};
      var postBody = null;
      // verify the required parameter 'transactionid' is set
      if (transactionid === undefined || transactionid === null) {
        throw new Error("Missing the required parameter 'transactionid' when calling eventsByTransactionidGet");
      }
      var pathParams = {
        'transactionid': transactionid
      };
      var queryParams = {
        'from': opts['from'],
        'to': opts['to'],
        'orderBy': opts['orderBy'],
        'limit': opts['limit'],
        'offset': opts['offset']
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = [_RecipientEvent["default"]];
      return this.apiClient.callApi('/events/{transactionid}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the eventsChannelsByNameExportPost operation.
     * @callback module:api/EventsApi~eventsChannelsByNameExportPostCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ExportLink} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Export Channel Events
     * Export delivery events log information to the specified file format. Required Access Level: Export
     * @param {String} name Name of selected channel.
     * @param {Object} opts Optional parameters
     * @param {Array.<module:model/EventType>} opts.eventTypes Types of Events to return
     * @param {Date} opts.from Starting date for search in YYYY-MM-DDThh:mm:ss format.
     * @param {Date} opts.to Ending date for search in YYYY-MM-DDThh:mm:ss format.
     * @param {module:model/ExportFileFormats} opts.fileFormat Format of the exported file
     * @param {module:model/CompressionFormat} opts.compressionFormat FileResponse compression format. None or Zip.
     * @param {String} opts.fileName Name of your file including extension.
     * @param {module:api/EventsApi~eventsChannelsByNameExportPostCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ExportLink}
     */
  }, {
    key: "eventsChannelsByNameExportPost",
    value: function eventsChannelsByNameExportPost(name, opts, callback) {
      opts = opts || {};
      var postBody = null;
      // verify the required parameter 'name' is set
      if (name === undefined || name === null) {
        throw new Error("Missing the required parameter 'name' when calling eventsChannelsByNameExportPost");
      }
      var pathParams = {
        'name': name
      };
      var queryParams = {
        'eventTypes': this.apiClient.buildCollectionParam(opts['eventTypes'], 'multi'),
        'from': opts['from'],
        'to': opts['to'],
        'fileFormat': opts['fileFormat'],
        'compressionFormat': opts['compressionFormat'],
        'fileName': opts['fileName']
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _ExportLink["default"];
      return this.apiClient.callApi('/events/channels/{name}/export', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the eventsChannelsByNameGet operation.
     * @callback module:api/EventsApi~eventsChannelsByNameGetCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/RecipientEvent>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Load Channel Events
     * Returns a log of delivery events filtered by specified parameters. Required Access Level: ViewReports
     * @param {String} name Name of selected channel.
     * @param {Object} opts Optional parameters
     * @param {Array.<module:model/EventType>} opts.eventTypes Types of Events to return
     * @param {Date} opts.from Starting date for search in YYYY-MM-DDThh:mm:ss format.
     * @param {Date} opts.to Ending date for search in YYYY-MM-DDThh:mm:ss format.
     * @param {module:model/EventsOrderBy} opts.orderBy 
     * @param {Number} opts.limit How many items to load. Maximum for this request is 1000 items
     * @param {Number} opts.offset How many items should be returned ahead.
     * @param {module:api/EventsApi~eventsChannelsByNameGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/RecipientEvent>}
     */
  }, {
    key: "eventsChannelsByNameGet",
    value: function eventsChannelsByNameGet(name, opts, callback) {
      opts = opts || {};
      var postBody = null;
      // verify the required parameter 'name' is set
      if (name === undefined || name === null) {
        throw new Error("Missing the required parameter 'name' when calling eventsChannelsByNameGet");
      }
      var pathParams = {
        'name': name
      };
      var queryParams = {
        'eventTypes': this.apiClient.buildCollectionParam(opts['eventTypes'], 'multi'),
        'from': opts['from'],
        'to': opts['to'],
        'orderBy': opts['orderBy'],
        'limit': opts['limit'],
        'offset': opts['offset']
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = [_RecipientEvent["default"]];
      return this.apiClient.callApi('/events/channels/{name}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the eventsChannelsExportByIdStatusGet operation.
     * @callback module:api/EventsApi~eventsChannelsExportByIdStatusGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ExportStatus} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Check Channel Export Status
     * Check the current status of the channel export. Required Access Level: Export
     * @param {String} id ID of the exported file
     * @param {module:api/EventsApi~eventsChannelsExportByIdStatusGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ExportStatus}
     */
  }, {
    key: "eventsChannelsExportByIdStatusGet",
    value: function eventsChannelsExportByIdStatusGet(id, callback) {
      var postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling eventsChannelsExportByIdStatusGet");
      }
      var pathParams = {
        'id': id
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _ExportStatus["default"];
      return this.apiClient.callApi('/events/channels/export/{id}/status', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the eventsExportByIdStatusGet operation.
     * @callback module:api/EventsApi~eventsExportByIdStatusGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ExportStatus} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Check Export Status
     * Check the current status of the export. Required Access Level: Export
     * @param {String} id ID of the exported file
     * @param {module:api/EventsApi~eventsExportByIdStatusGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ExportStatus}
     */
  }, {
    key: "eventsExportByIdStatusGet",
    value: function eventsExportByIdStatusGet(id, callback) {
      var postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling eventsExportByIdStatusGet");
      }
      var pathParams = {
        'id': id
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _ExportStatus["default"];
      return this.apiClient.callApi('/events/export/{id}/status', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the eventsExportPost operation.
     * @callback module:api/EventsApi~eventsExportPostCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ExportLink} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Export Events
     * Export delivery events log information to the specified file format. Required Access Level: Export
     * @param {Object} opts Optional parameters
     * @param {Array.<module:model/EventType>} opts.eventTypes Types of Events to return
     * @param {Date} opts.from Starting date for search in YYYY-MM-DDThh:mm:ss format.
     * @param {Date} opts.to Ending date for search in YYYY-MM-DDThh:mm:ss format.
     * @param {module:model/ExportFileFormats} opts.fileFormat Format of the exported file
     * @param {module:model/CompressionFormat} opts.compressionFormat FileResponse compression format. None or Zip.
     * @param {String} opts.fileName Name of your file including extension.
     * @param {module:api/EventsApi~eventsExportPostCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ExportLink}
     */
  }, {
    key: "eventsExportPost",
    value: function eventsExportPost(opts, callback) {
      opts = opts || {};
      var postBody = null;
      var pathParams = {};
      var queryParams = {
        'eventTypes': this.apiClient.buildCollectionParam(opts['eventTypes'], 'multi'),
        'from': opts['from'],
        'to': opts['to'],
        'fileFormat': opts['fileFormat'],
        'compressionFormat': opts['compressionFormat'],
        'fileName': opts['fileName']
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _ExportLink["default"];
      return this.apiClient.callApi('/events/export', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the eventsGet operation.
     * @callback module:api/EventsApi~eventsGetCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/RecipientEvent>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Load Events
     * Returns a log of delivery events filtered by specified parameters. Required Access Level: ViewReports
     * @param {Object} opts Optional parameters
     * @param {Array.<module:model/EventType>} opts.eventTypes Types of Events to return
     * @param {Date} opts.from Starting date for search in YYYY-MM-DDThh:mm:ss format.
     * @param {Date} opts.to Ending date for search in YYYY-MM-DDThh:mm:ss format.
     * @param {module:model/EventsOrderBy} opts.orderBy 
     * @param {Number} opts.limit How many items to load. Maximum for this request is 1000 items
     * @param {Number} opts.offset How many items should be returned ahead.
     * @param {module:api/EventsApi~eventsGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/RecipientEvent>}
     */
  }, {
    key: "eventsGet",
    value: function eventsGet(opts, callback) {
      opts = opts || {};
      var postBody = null;
      var pathParams = {};
      var queryParams = {
        'eventTypes': this.apiClient.buildCollectionParam(opts['eventTypes'], 'multi'),
        'from': opts['from'],
        'to': opts['to'],
        'orderBy': opts['orderBy'],
        'limit': opts['limit'],
        'offset': opts['offset']
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = [_RecipientEvent["default"]];
      return this.apiClient.callApi('/events', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
  }]);
  return EventsApi;
}();
exports["default"] = EventsApi;
},{"../ApiClient":1,"../model/CompressionFormat":29,"../model/EventType":52,"../model/EventsOrderBy":53,"../model/ExportFileFormats":54,"../model/ExportLink":55,"../model/ExportStatus":56,"../model/RecipientEvent":74}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _FileInfo = _interopRequireDefault(require("../model/FileInfo"));
var _FilePayload = _interopRequireDefault(require("../model/FilePayload"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
* Files service.
* @module api/FilesApi
* @version 4.0.23
*/
var FilesApi = /*#__PURE__*/function () {
  /**
  * Constructs a new FilesApi. 
  * @alias module:api/FilesApi
  * @class
  * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
  * default to {@link module:ApiClient#instance} if unspecified.
  */
  function FilesApi(apiClient) {
    _classCallCheck(this, FilesApi);
    this.apiClient = apiClient || _ApiClient["default"].instance;
  }

  /**
   * Callback function to receive the result of the filesByNameDelete operation.
   * @callback module:api/FilesApi~filesByNameDeleteCallback
   * @param {String} error Error message, if any.
   * @param data This operation does not return a value.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Delete File
   * Permanently deletes the file from your Account. Required Access Level: ModifyFiles
   * @param {String} name Name of your file including extension.
   * @param {module:api/FilesApi~filesByNameDeleteCallback} callback The callback function, accepting three arguments: error, data, response
   */
  _createClass(FilesApi, [{
    key: "filesByNameDelete",
    value: function filesByNameDelete(name, callback) {
      var postBody = null;
      // verify the required parameter 'name' is set
      if (name === undefined || name === null) {
        throw new Error("Missing the required parameter 'name' when calling filesByNameDelete");
      }
      var pathParams = {
        'name': name
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = [];
      var accepts = [];
      var returnType = null;
      return this.apiClient.callApi('/files/{name}', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the filesByNameGet operation.
     * @callback module:api/FilesApi~filesByNameGetCallback
     * @param {String} error Error message, if any.
     * @param {File} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Download File
     * Gets content of the specified File. Required Access Level: ViewFiles
     * @param {String} name Name of your file including extension.
     * @param {module:api/FilesApi~filesByNameGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link File}
     */
  }, {
    key: "filesByNameGet",
    value: function filesByNameGet(name, callback) {
      var postBody = null;
      // verify the required parameter 'name' is set
      if (name === undefined || name === null) {
        throw new Error("Missing the required parameter 'name' when calling filesByNameGet");
      }
      var pathParams = {
        'name': name
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = [];
      var accepts = ['application/*'];
      var returnType = File;
      return this.apiClient.callApi('/files/{name}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the filesByNameInfoGet operation.
     * @callback module:api/FilesApi~filesByNameInfoGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/FileInfo} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Load File Details
     * Returns the specified File's details. Required Access Level: ViewFiles
     * @param {String} name Name of your file including extension.
     * @param {module:api/FilesApi~filesByNameInfoGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/FileInfo}
     */
  }, {
    key: "filesByNameInfoGet",
    value: function filesByNameInfoGet(name, callback) {
      var postBody = null;
      // verify the required parameter 'name' is set
      if (name === undefined || name === null) {
        throw new Error("Missing the required parameter 'name' when calling filesByNameInfoGet");
      }
      var pathParams = {
        'name': name
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _FileInfo["default"];
      return this.apiClient.callApi('/files/{name}/info', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the filesGet operation.
     * @callback module:api/FilesApi~filesGetCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/FileInfo>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List Files
     * Returns a list of all your available files. Required Access Level: ViewFiles
     * @param {Object} opts Optional parameters
     * @param {Number} opts.limit Maximum number of returned items.
     * @param {Number} opts.offset How many items should be returned ahead.
     * @param {module:api/FilesApi~filesGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/FileInfo>}
     */
  }, {
    key: "filesGet",
    value: function filesGet(opts, callback) {
      opts = opts || {};
      var postBody = null;
      var pathParams = {};
      var queryParams = {
        'limit': opts['limit'],
        'offset': opts['offset']
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = [_FileInfo["default"]];
      return this.apiClient.callApi('/files', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the filesPost operation.
     * @callback module:api/FilesApi~filesPostCallback
     * @param {String} error Error message, if any.
     * @param {module:model/FileInfo} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Upload File
     * Uploads selected file to the server. Required Access Level: ModifyFiles
     * @param {module:model/FilePayload} filePayload 
     * @param {Object} opts Optional parameters
     * @param {Number} opts.expiresAfterDays After how many days should the file be deleted.
     * @param {module:api/FilesApi~filesPostCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/FileInfo}
     */
  }, {
    key: "filesPost",
    value: function filesPost(filePayload, opts, callback) {
      opts = opts || {};
      var postBody = filePayload;
      // verify the required parameter 'filePayload' is set
      if (filePayload === undefined || filePayload === null) {
        throw new Error("Missing the required parameter 'filePayload' when calling filesPost");
      }
      var pathParams = {};
      var queryParams = {
        'expiresAfterDays': opts['expiresAfterDays']
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = _FileInfo["default"];
      return this.apiClient.callApi('/files', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
  }]);
  return FilesApi;
}();
exports["default"] = FilesApi;
},{"../ApiClient":1,"../model/FileInfo":57,"../model/FilePayload":58}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _InboundPayload = _interopRequireDefault(require("../model/InboundPayload"));
var _InboundRoute = _interopRequireDefault(require("../model/InboundRoute"));
var _SortOrderItem = _interopRequireDefault(require("../model/SortOrderItem"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
* InboundRoute service.
* @module api/InboundRouteApi
* @version 4.0.23
*/
var InboundRouteApi = /*#__PURE__*/function () {
  /**
  * Constructs a new InboundRouteApi. 
  * @alias module:api/InboundRouteApi
  * @class
  * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
  * default to {@link module:ApiClient#instance} if unspecified.
  */
  function InboundRouteApi(apiClient) {
    _classCallCheck(this, InboundRouteApi);
    this.apiClient = apiClient || _ApiClient["default"].instance;
  }

  /**
   * Callback function to receive the result of the inboundrouteByIdDelete operation.
   * @callback module:api/InboundRouteApi~inboundrouteByIdDeleteCallback
   * @param {String} error Error message, if any.
   * @param data This operation does not return a value.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Delete Route
   * Deletes the Inbound Route. Required Access Level: ModifySettings
   * @param {String} id 
   * @param {module:api/InboundRouteApi~inboundrouteByIdDeleteCallback} callback The callback function, accepting three arguments: error, data, response
   */
  _createClass(InboundRouteApi, [{
    key: "inboundrouteByIdDelete",
    value: function inboundrouteByIdDelete(id, callback) {
      var postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling inboundrouteByIdDelete");
      }
      var pathParams = {
        'id': id
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = [];
      var accepts = [];
      var returnType = null;
      return this.apiClient.callApi('/inboundroute/{id}', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the inboundrouteByIdGet operation.
     * @callback module:api/InboundRouteApi~inboundrouteByIdGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InboundRoute} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get Route
     * Load an Inbound Route. Required Access Level: ViewSettings
     * @param {String} id ID number of your attachment
     * @param {module:api/InboundRouteApi~inboundrouteByIdGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/InboundRoute}
     */
  }, {
    key: "inboundrouteByIdGet",
    value: function inboundrouteByIdGet(id, callback) {
      var postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling inboundrouteByIdGet");
      }
      var pathParams = {
        'id': id
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _InboundRoute["default"];
      return this.apiClient.callApi('/inboundroute/{id}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the inboundrouteByIdPut operation.
     * @callback module:api/InboundRouteApi~inboundrouteByIdPutCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InboundRoute} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update Route
     * Update the Inbound Route. Required Access Level: ModifySettings
     * @param {String} id 
     * @param {module:model/InboundPayload} inboundPayload 
     * @param {module:api/InboundRouteApi~inboundrouteByIdPutCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/InboundRoute}
     */
  }, {
    key: "inboundrouteByIdPut",
    value: function inboundrouteByIdPut(id, inboundPayload, callback) {
      var postBody = inboundPayload;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling inboundrouteByIdPut");
      }
      // verify the required parameter 'inboundPayload' is set
      if (inboundPayload === undefined || inboundPayload === null) {
        throw new Error("Missing the required parameter 'inboundPayload' when calling inboundrouteByIdPut");
      }
      var pathParams = {
        'id': id
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = _InboundRoute["default"];
      return this.apiClient.callApi('/inboundroute/{id}', 'PUT', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the inboundrouteGet operation.
     * @callback module:api/InboundRouteApi~inboundrouteGetCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/InboundRoute>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get Routes
     * Get all your Inbound Routes. Required Access Level: ViewSettings
     * @param {module:api/InboundRouteApi~inboundrouteGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/InboundRoute>}
     */
  }, {
    key: "inboundrouteGet",
    value: function inboundrouteGet(callback) {
      var postBody = null;
      var pathParams = {};
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = [_InboundRoute["default"]];
      return this.apiClient.callApi('/inboundroute', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the inboundrouteOrderPut operation.
     * @callback module:api/InboundRouteApi~inboundrouteOrderPutCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/InboundRoute>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update Sorting
     * Required Access Level: ViewSettings
     * @param {Array.<module:model/SortOrderItem>} sortOrderItem Change the ordering of inbound routes for when matching the inbound
     * @param {module:api/InboundRouteApi~inboundrouteOrderPutCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/InboundRoute>}
     */
  }, {
    key: "inboundrouteOrderPut",
    value: function inboundrouteOrderPut(sortOrderItem, callback) {
      var postBody = sortOrderItem;
      // verify the required parameter 'sortOrderItem' is set
      if (sortOrderItem === undefined || sortOrderItem === null) {
        throw new Error("Missing the required parameter 'sortOrderItem' when calling inboundrouteOrderPut");
      }
      var pathParams = {};
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = [_InboundRoute["default"]];
      return this.apiClient.callApi('/inboundroute/order', 'PUT', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the inboundroutePost operation.
     * @callback module:api/InboundRouteApi~inboundroutePostCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InboundRoute} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Create Route
     * Create new Inbound Route. Required Access Level: ModifySettings
     * @param {module:model/InboundPayload} inboundPayload 
     * @param {module:api/InboundRouteApi~inboundroutePostCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/InboundRoute}
     */
  }, {
    key: "inboundroutePost",
    value: function inboundroutePost(inboundPayload, callback) {
      var postBody = inboundPayload;
      // verify the required parameter 'inboundPayload' is set
      if (inboundPayload === undefined || inboundPayload === null) {
        throw new Error("Missing the required parameter 'inboundPayload' when calling inboundroutePost");
      }
      var pathParams = {};
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = _InboundRoute["default"];
      return this.apiClient.callApi('/inboundroute', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
  }]);
  return InboundRouteApi;
}();
exports["default"] = InboundRouteApi;
},{"../ApiClient":1,"../model/InboundPayload":60,"../model/InboundRoute":61,"../model/SortOrderItem":79}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _ContactsList = _interopRequireDefault(require("../model/ContactsList"));
var _EmailsPayload = _interopRequireDefault(require("../model/EmailsPayload"));
var _ListPayload = _interopRequireDefault(require("../model/ListPayload"));
var _ListUpdatePayload = _interopRequireDefault(require("../model/ListUpdatePayload"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
* Lists service.
* @module api/ListsApi
* @version 4.0.23
*/
var ListsApi = /*#__PURE__*/function () {
  /**
  * Constructs a new ListsApi. 
  * @alias module:api/ListsApi
  * @class
  * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
  * default to {@link module:ApiClient#instance} if unspecified.
  */
  function ListsApi(apiClient) {
    _classCallCheck(this, ListsApi);
    this.apiClient = apiClient || _ApiClient["default"].instance;
  }

  /**
   * Callback function to receive the result of the listsByNameContactsPost operation.
   * @callback module:api/ListsApi~listsByNameContactsPostCallback
   * @param {String} error Error message, if any.
   * @param {module:model/ContactsList} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Add Contacts to List
   * Add existing Contacts to specified list. Required Access Level: ModifyContacts
   * @param {String} name Name of your list.
   * @param {module:model/EmailsPayload} emailsPayload Provide either rule or a list of emails, not both.
   * @param {module:api/ListsApi~listsByNameContactsPostCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/ContactsList}
   */
  _createClass(ListsApi, [{
    key: "listsByNameContactsPost",
    value: function listsByNameContactsPost(name, emailsPayload, callback) {
      var postBody = emailsPayload;
      // verify the required parameter 'name' is set
      if (name === undefined || name === null) {
        throw new Error("Missing the required parameter 'name' when calling listsByNameContactsPost");
      }
      // verify the required parameter 'emailsPayload' is set
      if (emailsPayload === undefined || emailsPayload === null) {
        throw new Error("Missing the required parameter 'emailsPayload' when calling listsByNameContactsPost");
      }
      var pathParams = {
        'name': name
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = _ContactsList["default"];
      return this.apiClient.callApi('/lists/{name}/contacts', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the listsByNameContactsRemovePost operation.
     * @callback module:api/ListsApi~listsByNameContactsRemovePostCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Remove Contacts from List
     * Remove specified Contacts from your list. Required Access Level: ModifyContacts
     * @param {String} name Name of your list.
     * @param {module:model/EmailsPayload} emailsPayload Provide either rule or a list of emails, not both.
     * @param {module:api/ListsApi~listsByNameContactsRemovePostCallback} callback The callback function, accepting three arguments: error, data, response
     */
  }, {
    key: "listsByNameContactsRemovePost",
    value: function listsByNameContactsRemovePost(name, emailsPayload, callback) {
      var postBody = emailsPayload;
      // verify the required parameter 'name' is set
      if (name === undefined || name === null) {
        throw new Error("Missing the required parameter 'name' when calling listsByNameContactsRemovePost");
      }
      // verify the required parameter 'emailsPayload' is set
      if (emailsPayload === undefined || emailsPayload === null) {
        throw new Error("Missing the required parameter 'emailsPayload' when calling listsByNameContactsRemovePost");
      }
      var pathParams = {
        'name': name
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = ['application/json'];
      var accepts = [];
      var returnType = null;
      return this.apiClient.callApi('/lists/{name}/contacts/remove', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the listsByNameDelete operation.
     * @callback module:api/ListsApi~listsByNameDeleteCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete List
     * Deletes List and removes all the Contacts from it (does not delete Contacts). Required Access Level: ModifyContacts
     * @param {String} name Name of your list.
     * @param {module:api/ListsApi~listsByNameDeleteCallback} callback The callback function, accepting three arguments: error, data, response
     */
  }, {
    key: "listsByNameDelete",
    value: function listsByNameDelete(name, callback) {
      var postBody = null;
      // verify the required parameter 'name' is set
      if (name === undefined || name === null) {
        throw new Error("Missing the required parameter 'name' when calling listsByNameDelete");
      }
      var pathParams = {
        'name': name
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = [];
      var accepts = [];
      var returnType = null;
      return this.apiClient.callApi('/lists/{name}', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the listsByNameGet operation.
     * @callback module:api/ListsApi~listsByNameGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ContactsList} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Load List
     * Returns detailed information about specified list. Required Access Level: ViewContacts
     * @param {String} name Name of your list.
     * @param {module:api/ListsApi~listsByNameGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ContactsList}
     */
  }, {
    key: "listsByNameGet",
    value: function listsByNameGet(name, callback) {
      var postBody = null;
      // verify the required parameter 'name' is set
      if (name === undefined || name === null) {
        throw new Error("Missing the required parameter 'name' when calling listsByNameGet");
      }
      var pathParams = {
        'name': name
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _ContactsList["default"];
      return this.apiClient.callApi('/lists/{name}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the listsByNamePut operation.
     * @callback module:api/ListsApi~listsByNamePutCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ContactsList} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update List
     * Update existing list. Required Access Level: ModifyContacts
     * @param {String} name Name of your list.
     * @param {module:model/ListUpdatePayload} listUpdatePayload 
     * @param {module:api/ListsApi~listsByNamePutCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ContactsList}
     */
  }, {
    key: "listsByNamePut",
    value: function listsByNamePut(name, listUpdatePayload, callback) {
      var postBody = listUpdatePayload;
      // verify the required parameter 'name' is set
      if (name === undefined || name === null) {
        throw new Error("Missing the required parameter 'name' when calling listsByNamePut");
      }
      // verify the required parameter 'listUpdatePayload' is set
      if (listUpdatePayload === undefined || listUpdatePayload === null) {
        throw new Error("Missing the required parameter 'listUpdatePayload' when calling listsByNamePut");
      }
      var pathParams = {
        'name': name
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = _ContactsList["default"];
      return this.apiClient.callApi('/lists/{name}', 'PUT', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the listsGet operation.
     * @callback module:api/ListsApi~listsGetCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/ContactsList>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Load Lists
     * Returns all your existing lists. Required Access Level: ViewContacts
     * @param {Object} opts Optional parameters
     * @param {Number} opts.limit Maximum number of returned items.
     * @param {Number} opts.offset How many items should be returned ahead.
     * @param {module:api/ListsApi~listsGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/ContactsList>}
     */
  }, {
    key: "listsGet",
    value: function listsGet(opts, callback) {
      opts = opts || {};
      var postBody = null;
      var pathParams = {};
      var queryParams = {
        'limit': opts['limit'],
        'offset': opts['offset']
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = [_ContactsList["default"]];
      return this.apiClient.callApi('/lists', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the listsPost operation.
     * @callback module:api/ListsApi~listsPostCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ContactsList} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Add List
     * Add a new list. Required Access Level: ModifyContacts
     * @param {module:model/ListPayload} listPayload 
     * @param {module:api/ListsApi~listsPostCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ContactsList}
     */
  }, {
    key: "listsPost",
    value: function listsPost(listPayload, callback) {
      var postBody = listPayload;
      // verify the required parameter 'listPayload' is set
      if (listPayload === undefined || listPayload === null) {
        throw new Error("Missing the required parameter 'listPayload' when calling listsPost");
      }
      var pathParams = {};
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = _ContactsList["default"];
      return this.apiClient.callApi('/lists', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
  }]);
  return ListsApi;
}();
exports["default"] = ListsApi;
},{"../ApiClient":1,"../model/ContactsList":38,"../model/EmailsPayload":50,"../model/ListPayload":64,"../model/ListUpdatePayload":65}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _ApiKey = _interopRequireDefault(require("../model/ApiKey"));
var _ApiKeyPayload = _interopRequireDefault(require("../model/ApiKeyPayload"));
var _NewApiKey = _interopRequireDefault(require("../model/NewApiKey"));
var _NewSmtpCredentials = _interopRequireDefault(require("../model/NewSmtpCredentials"));
var _SmtpCredentials = _interopRequireDefault(require("../model/SmtpCredentials"));
var _SmtpCredentialsPayload = _interopRequireDefault(require("../model/SmtpCredentialsPayload"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
* Security service.
* @module api/SecurityApi
* @version 4.0.23
*/
var SecurityApi = /*#__PURE__*/function () {
  /**
  * Constructs a new SecurityApi. 
  * @alias module:api/SecurityApi
  * @class
  * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
  * default to {@link module:ApiClient#instance} if unspecified.
  */
  function SecurityApi(apiClient) {
    _classCallCheck(this, SecurityApi);
    this.apiClient = apiClient || _ApiClient["default"].instance;
  }

  /**
   * Callback function to receive the result of the securityApikeysByNameDelete operation.
   * @callback module:api/SecurityApi~securityApikeysByNameDeleteCallback
   * @param {String} error Error message, if any.
   * @param data This operation does not return a value.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Delete ApiKey
   * Delete your existing ApiKey. Required Access Level: Security
   * @param {String} name Name of the ApiKey
   * @param {Object} opts Optional parameters
   * @param {String} opts.subaccount Email of the subaccount of which ApiKey should be deleted
   * @param {module:api/SecurityApi~securityApikeysByNameDeleteCallback} callback The callback function, accepting three arguments: error, data, response
   */
  _createClass(SecurityApi, [{
    key: "securityApikeysByNameDelete",
    value: function securityApikeysByNameDelete(name, opts, callback) {
      opts = opts || {};
      var postBody = null;
      // verify the required parameter 'name' is set
      if (name === undefined || name === null) {
        throw new Error("Missing the required parameter 'name' when calling securityApikeysByNameDelete");
      }
      var pathParams = {
        'name': name
      };
      var queryParams = {
        'subaccount': opts['subaccount']
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = [];
      var accepts = [];
      var returnType = null;
      return this.apiClient.callApi('/security/apikeys/{name}', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the securityApikeysByNameGet operation.
     * @callback module:api/SecurityApi~securityApikeysByNameGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ApiKey} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Load ApiKey
     * Load your existing ApiKey info. Required Access Level: Security
     * @param {String} name Name of the ApiKey
     * @param {Object} opts Optional parameters
     * @param {String} opts.subaccount Email of the subaccount of which ApiKey should be loaded
     * @param {module:api/SecurityApi~securityApikeysByNameGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ApiKey}
     */
  }, {
    key: "securityApikeysByNameGet",
    value: function securityApikeysByNameGet(name, opts, callback) {
      opts = opts || {};
      var postBody = null;
      // verify the required parameter 'name' is set
      if (name === undefined || name === null) {
        throw new Error("Missing the required parameter 'name' when calling securityApikeysByNameGet");
      }
      var pathParams = {
        'name': name
      };
      var queryParams = {
        'subaccount': opts['subaccount']
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _ApiKey["default"];
      return this.apiClient.callApi('/security/apikeys/{name}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the securityApikeysByNamePut operation.
     * @callback module:api/SecurityApi~securityApikeysByNamePutCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ApiKey} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update ApiKey
     * Update your existing ApiKey. Required Access Level: Security
     * @param {String} name Name of the ApiKey
     * @param {module:model/ApiKeyPayload} apiKeyPayload 
     * @param {module:api/SecurityApi~securityApikeysByNamePutCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ApiKey}
     */
  }, {
    key: "securityApikeysByNamePut",
    value: function securityApikeysByNamePut(name, apiKeyPayload, callback) {
      var postBody = apiKeyPayload;
      // verify the required parameter 'name' is set
      if (name === undefined || name === null) {
        throw new Error("Missing the required parameter 'name' when calling securityApikeysByNamePut");
      }
      // verify the required parameter 'apiKeyPayload' is set
      if (apiKeyPayload === undefined || apiKeyPayload === null) {
        throw new Error("Missing the required parameter 'apiKeyPayload' when calling securityApikeysByNamePut");
      }
      var pathParams = {
        'name': name
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = _ApiKey["default"];
      return this.apiClient.callApi('/security/apikeys/{name}', 'PUT', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the securityApikeysGet operation.
     * @callback module:api/SecurityApi~securityApikeysGetCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/ApiKey>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List ApiKeys
     * List all your existing ApiKeys. Required Access Level: Security
     * @param {Object} opts Optional parameters
     * @param {String} opts.subaccount Email of the subaccount of which ApiKeys should be loaded
     * @param {module:api/SecurityApi~securityApikeysGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/ApiKey>}
     */
  }, {
    key: "securityApikeysGet",
    value: function securityApikeysGet(opts, callback) {
      opts = opts || {};
      var postBody = null;
      var pathParams = {};
      var queryParams = {
        'subaccount': opts['subaccount']
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = [_ApiKey["default"]];
      return this.apiClient.callApi('/security/apikeys', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the securityApikeysPost operation.
     * @callback module:api/SecurityApi~securityApikeysPostCallback
     * @param {String} error Error message, if any.
     * @param {module:model/NewApiKey} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Add ApiKey
     * Add a new ApiKey. Required Access Level: Security
     * @param {module:model/ApiKeyPayload} apiKeyPayload 
     * @param {module:api/SecurityApi~securityApikeysPostCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/NewApiKey}
     */
  }, {
    key: "securityApikeysPost",
    value: function securityApikeysPost(apiKeyPayload, callback) {
      var postBody = apiKeyPayload;
      // verify the required parameter 'apiKeyPayload' is set
      if (apiKeyPayload === undefined || apiKeyPayload === null) {
        throw new Error("Missing the required parameter 'apiKeyPayload' when calling securityApikeysPost");
      }
      var pathParams = {};
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = _NewApiKey["default"];
      return this.apiClient.callApi('/security/apikeys', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the securitySmtpByNameDelete operation.
     * @callback module:api/SecurityApi~securitySmtpByNameDeleteCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete SMTP Credential
     * Delete your existing SMTP Credentials. Required Access Level: Security
     * @param {String} name Name of the SMTP Credential
     * @param {Object} opts Optional parameters
     * @param {String} opts.subaccount Email of the subaccount of which credential should be deleted
     * @param {module:api/SecurityApi~securitySmtpByNameDeleteCallback} callback The callback function, accepting three arguments: error, data, response
     */
  }, {
    key: "securitySmtpByNameDelete",
    value: function securitySmtpByNameDelete(name, opts, callback) {
      opts = opts || {};
      var postBody = null;
      // verify the required parameter 'name' is set
      if (name === undefined || name === null) {
        throw new Error("Missing the required parameter 'name' when calling securitySmtpByNameDelete");
      }
      var pathParams = {
        'name': name
      };
      var queryParams = {
        'subaccount': opts['subaccount']
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = [];
      var accepts = [];
      var returnType = null;
      return this.apiClient.callApi('/security/smtp/{name}', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the securitySmtpByNameGet operation.
     * @callback module:api/SecurityApi~securitySmtpByNameGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/SmtpCredentials} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Load SMTP Credential
     * Load your existing SMTP Credential info. Required Access Level: Security
     * @param {String} name Name of the SMTP Credential
     * @param {Object} opts Optional parameters
     * @param {String} opts.subaccount Email of the subaccount of which credential should be loaded
     * @param {module:api/SecurityApi~securitySmtpByNameGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/SmtpCredentials}
     */
  }, {
    key: "securitySmtpByNameGet",
    value: function securitySmtpByNameGet(name, opts, callback) {
      opts = opts || {};
      var postBody = null;
      // verify the required parameter 'name' is set
      if (name === undefined || name === null) {
        throw new Error("Missing the required parameter 'name' when calling securitySmtpByNameGet");
      }
      var pathParams = {
        'name': name
      };
      var queryParams = {
        'subaccount': opts['subaccount']
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _SmtpCredentials["default"];
      return this.apiClient.callApi('/security/smtp/{name}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the securitySmtpByNamePut operation.
     * @callback module:api/SecurityApi~securitySmtpByNamePutCallback
     * @param {String} error Error message, if any.
     * @param {module:model/SmtpCredentials} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update SMTP Credential
     * Update your existing SMTP Credentials. Required Access Level: Security
     * @param {String} name Name of the SMTP Credential
     * @param {module:model/SmtpCredentialsPayload} smtpCredentialsPayload 
     * @param {module:api/SecurityApi~securitySmtpByNamePutCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/SmtpCredentials}
     */
  }, {
    key: "securitySmtpByNamePut",
    value: function securitySmtpByNamePut(name, smtpCredentialsPayload, callback) {
      var postBody = smtpCredentialsPayload;
      // verify the required parameter 'name' is set
      if (name === undefined || name === null) {
        throw new Error("Missing the required parameter 'name' when calling securitySmtpByNamePut");
      }
      // verify the required parameter 'smtpCredentialsPayload' is set
      if (smtpCredentialsPayload === undefined || smtpCredentialsPayload === null) {
        throw new Error("Missing the required parameter 'smtpCredentialsPayload' when calling securitySmtpByNamePut");
      }
      var pathParams = {
        'name': name
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = _SmtpCredentials["default"];
      return this.apiClient.callApi('/security/smtp/{name}', 'PUT', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the securitySmtpGet operation.
     * @callback module:api/SecurityApi~securitySmtpGetCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/SmtpCredentials>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List SMTP Credentials
     * List all your existing SMTP Credentials. Required Access Level: Security
     * @param {Object} opts Optional parameters
     * @param {String} opts.subaccount Email of the subaccount of which credentials should be listed
     * @param {module:api/SecurityApi~securitySmtpGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/SmtpCredentials>}
     */
  }, {
    key: "securitySmtpGet",
    value: function securitySmtpGet(opts, callback) {
      opts = opts || {};
      var postBody = null;
      var pathParams = {};
      var queryParams = {
        'subaccount': opts['subaccount']
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = [_SmtpCredentials["default"]];
      return this.apiClient.callApi('/security/smtp', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the securitySmtpPost operation.
     * @callback module:api/SecurityApi~securitySmtpPostCallback
     * @param {String} error Error message, if any.
     * @param {module:model/NewSmtpCredentials} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Add SMTP Credential
     * Add new SMTP Credential. Required Access Level: Security
     * @param {module:model/SmtpCredentialsPayload} smtpCredentialsPayload 
     * @param {module:api/SecurityApi~securitySmtpPostCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/NewSmtpCredentials}
     */
  }, {
    key: "securitySmtpPost",
    value: function securitySmtpPost(smtpCredentialsPayload, callback) {
      var postBody = smtpCredentialsPayload;
      // verify the required parameter 'smtpCredentialsPayload' is set
      if (smtpCredentialsPayload === undefined || smtpCredentialsPayload === null) {
        throw new Error("Missing the required parameter 'smtpCredentialsPayload' when calling securitySmtpPost");
      }
      var pathParams = {};
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = _NewSmtpCredentials["default"];
      return this.apiClient.callApi('/security/smtp', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
  }]);
  return SecurityApi;
}();
exports["default"] = SecurityApi;
},{"../ApiClient":1,"../model/ApiKey":19,"../model/ApiKeyPayload":20,"../model/NewApiKey":71,"../model/NewSmtpCredentials":72,"../model/SmtpCredentials":77,"../model/SmtpCredentialsPayload":78}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _Segment = _interopRequireDefault(require("../model/Segment"));
var _SegmentPayload = _interopRequireDefault(require("../model/SegmentPayload"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
* Segments service.
* @module api/SegmentsApi
* @version 4.0.23
*/
var SegmentsApi = /*#__PURE__*/function () {
  /**
  * Constructs a new SegmentsApi. 
  * @alias module:api/SegmentsApi
  * @class
  * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
  * default to {@link module:ApiClient#instance} if unspecified.
  */
  function SegmentsApi(apiClient) {
    _classCallCheck(this, SegmentsApi);
    this.apiClient = apiClient || _ApiClient["default"].instance;
  }

  /**
   * Callback function to receive the result of the segmentsByNameDelete operation.
   * @callback module:api/SegmentsApi~segmentsByNameDeleteCallback
   * @param {String} error Error message, if any.
   * @param data This operation does not return a value.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Delete Segment
   * Delete an existing segment. Required Access Level: ModifyContacts
   * @param {String} name Name of your segment.
   * @param {module:api/SegmentsApi~segmentsByNameDeleteCallback} callback The callback function, accepting three arguments: error, data, response
   */
  _createClass(SegmentsApi, [{
    key: "segmentsByNameDelete",
    value: function segmentsByNameDelete(name, callback) {
      var postBody = null;
      // verify the required parameter 'name' is set
      if (name === undefined || name === null) {
        throw new Error("Missing the required parameter 'name' when calling segmentsByNameDelete");
      }
      var pathParams = {
        'name': name
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = [];
      var accepts = [];
      var returnType = null;
      return this.apiClient.callApi('/segments/{name}', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the segmentsByNameGet operation.
     * @callback module:api/SegmentsApi~segmentsByNameGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Segment} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Load Segment
     * Returns details for the specified segment. Required Access Level: ViewContacts
     * @param {String} name Name of the segment you want to load. Will load all contacts if the 'All Contacts' name has been provided
     * @param {module:api/SegmentsApi~segmentsByNameGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Segment}
     */
  }, {
    key: "segmentsByNameGet",
    value: function segmentsByNameGet(name, callback) {
      var postBody = null;
      // verify the required parameter 'name' is set
      if (name === undefined || name === null) {
        throw new Error("Missing the required parameter 'name' when calling segmentsByNameGet");
      }
      var pathParams = {
        'name': name
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _Segment["default"];
      return this.apiClient.callApi('/segments/{name}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the segmentsByNamePut operation.
     * @callback module:api/SegmentsApi~segmentsByNamePutCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Segment} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update Segment
     * Rename or change RULE for your segment. Required Access Level: ModifyContacts
     * @param {String} name Name of your segment.
     * @param {module:model/SegmentPayload} segmentPayload 
     * @param {module:api/SegmentsApi~segmentsByNamePutCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Segment}
     */
  }, {
    key: "segmentsByNamePut",
    value: function segmentsByNamePut(name, segmentPayload, callback) {
      var postBody = segmentPayload;
      // verify the required parameter 'name' is set
      if (name === undefined || name === null) {
        throw new Error("Missing the required parameter 'name' when calling segmentsByNamePut");
      }
      // verify the required parameter 'segmentPayload' is set
      if (segmentPayload === undefined || segmentPayload === null) {
        throw new Error("Missing the required parameter 'segmentPayload' when calling segmentsByNamePut");
      }
      var pathParams = {
        'name': name
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = _Segment["default"];
      return this.apiClient.callApi('/segments/{name}', 'PUT', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the segmentsGet operation.
     * @callback module:api/SegmentsApi~segmentsGetCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/Segment>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Load Segments
     * Returns a list of all your available Segments. Required Access Level: ViewContacts
     * @param {Object} opts Optional parameters
     * @param {Number} opts.limit Maximum number of returned items.
     * @param {Number} opts.offset How many items should be returned ahead.
     * @param {module:api/SegmentsApi~segmentsGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/Segment>}
     */
  }, {
    key: "segmentsGet",
    value: function segmentsGet(opts, callback) {
      opts = opts || {};
      var postBody = null;
      var pathParams = {};
      var queryParams = {
        'limit': opts['limit'],
        'offset': opts['offset']
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = [_Segment["default"]];
      return this.apiClient.callApi('/segments', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the segmentsPost operation.
     * @callback module:api/SegmentsApi~segmentsPostCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Segment} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Add Segment
     * Add a new segment, based on specified RULE. Required Access Level: ModifyContacts
     * @param {module:model/SegmentPayload} segmentPayload 
     * @param {module:api/SegmentsApi~segmentsPostCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Segment}
     */
  }, {
    key: "segmentsPost",
    value: function segmentsPost(segmentPayload, callback) {
      var postBody = segmentPayload;
      // verify the required parameter 'segmentPayload' is set
      if (segmentPayload === undefined || segmentPayload === null) {
        throw new Error("Missing the required parameter 'segmentPayload' when calling segmentsPost");
      }
      var pathParams = {};
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = _Segment["default"];
      return this.apiClient.callApi('/segments', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
  }]);
  return SegmentsApi;
}();
exports["default"] = SegmentsApi;
},{"../ApiClient":1,"../model/Segment":75,"../model/SegmentPayload":76}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _ChannelLogStatusSummary = _interopRequireDefault(require("../model/ChannelLogStatusSummary"));
var _LogStatusSummary = _interopRequireDefault(require("../model/LogStatusSummary"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
* Statistics service.
* @module api/StatisticsApi
* @version 4.0.23
*/
var StatisticsApi = /*#__PURE__*/function () {
  /**
  * Constructs a new StatisticsApi. 
  * @alias module:api/StatisticsApi
  * @class
  * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
  * default to {@link module:ApiClient#instance} if unspecified.
  */
  function StatisticsApi(apiClient) {
    _classCallCheck(this, StatisticsApi);
    this.apiClient = apiClient || _ApiClient["default"].instance;
  }

  /**
   * Callback function to receive the result of the statisticsCampaignsByNameGet operation.
   * @callback module:api/StatisticsApi~statisticsCampaignsByNameGetCallback
   * @param {String} error Error message, if any.
   * @param {module:model/ChannelLogStatusSummary} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Load Campaign Stats
   * Retrieve stats of an existing campaign. Required Access Level: ViewChannels
   * @param {String} name The name of the campaign to get.
   * @param {module:api/StatisticsApi~statisticsCampaignsByNameGetCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/ChannelLogStatusSummary}
   */
  _createClass(StatisticsApi, [{
    key: "statisticsCampaignsByNameGet",
    value: function statisticsCampaignsByNameGet(name, callback) {
      var postBody = null;
      // verify the required parameter 'name' is set
      if (name === undefined || name === null) {
        throw new Error("Missing the required parameter 'name' when calling statisticsCampaignsByNameGet");
      }
      var pathParams = {
        'name': name
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _ChannelLogStatusSummary["default"];
      return this.apiClient.callApi('/statistics/campaigns/{name}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the statisticsCampaignsGet operation.
     * @callback module:api/StatisticsApi~statisticsCampaignsGetCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/ChannelLogStatusSummary>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Load Campaigns Stats
     * Returns a list of your Campaigns' stats. Required Access Level: ViewChannels
     * @param {Object} opts Optional parameters
     * @param {Number} opts.limit Maximum number of returned items.
     * @param {Number} opts.offset How many items should be returned ahead.
     * @param {module:api/StatisticsApi~statisticsCampaignsGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/ChannelLogStatusSummary>}
     */
  }, {
    key: "statisticsCampaignsGet",
    value: function statisticsCampaignsGet(opts, callback) {
      opts = opts || {};
      var postBody = null;
      var pathParams = {};
      var queryParams = {
        'limit': opts['limit'],
        'offset': opts['offset']
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = [_ChannelLogStatusSummary["default"]];
      return this.apiClient.callApi('/statistics/campaigns', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the statisticsChannelsByNameGet operation.
     * @callback module:api/StatisticsApi~statisticsChannelsByNameGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ChannelLogStatusSummary} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Load Channel Stats
     * Retrieve an existing channel stats. Required Access Level: ViewChannels
     * @param {String} name The name of the channel to get.
     * @param {module:api/StatisticsApi~statisticsChannelsByNameGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ChannelLogStatusSummary}
     */
  }, {
    key: "statisticsChannelsByNameGet",
    value: function statisticsChannelsByNameGet(name, callback) {
      var postBody = null;
      // verify the required parameter 'name' is set
      if (name === undefined || name === null) {
        throw new Error("Missing the required parameter 'name' when calling statisticsChannelsByNameGet");
      }
      var pathParams = {
        'name': name
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _ChannelLogStatusSummary["default"];
      return this.apiClient.callApi('/statistics/channels/{name}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the statisticsChannelsGet operation.
     * @callback module:api/StatisticsApi~statisticsChannelsGetCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/ChannelLogStatusSummary>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Load Channels Stats
     * Returns a list of your Channels' stats. Required Access Level: ViewChannels
     * @param {Object} opts Optional parameters
     * @param {Number} opts.limit Maximum number of returned items.
     * @param {Number} opts.offset How many items should be returned ahead.
     * @param {module:api/StatisticsApi~statisticsChannelsGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/ChannelLogStatusSummary>}
     */
  }, {
    key: "statisticsChannelsGet",
    value: function statisticsChannelsGet(opts, callback) {
      opts = opts || {};
      var postBody = null;
      var pathParams = {};
      var queryParams = {
        'limit': opts['limit'],
        'offset': opts['offset']
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = [_ChannelLogStatusSummary["default"]];
      return this.apiClient.callApi('/statistics/channels', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the statisticsGet operation.
     * @callback module:api/StatisticsApi~statisticsGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/LogStatusSummary} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Load Statistics
     * Returns basic statistics. Required Access Level: ViewReports
     * @param {Date} from Starting date for search in YYYY-MM-DDThh:mm:ss format.
     * @param {Object} opts Optional parameters
     * @param {Date} opts.to Ending date for search in YYYY-MM-DDThh:mm:ss format.
     * @param {module:api/StatisticsApi~statisticsGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/LogStatusSummary}
     */
  }, {
    key: "statisticsGet",
    value: function statisticsGet(from, opts, callback) {
      opts = opts || {};
      var postBody = null;
      // verify the required parameter 'from' is set
      if (from === undefined || from === null) {
        throw new Error("Missing the required parameter 'from' when calling statisticsGet");
      }
      var pathParams = {};
      var queryParams = {
        'from': from,
        'to': opts['to']
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _LogStatusSummary["default"];
      return this.apiClient.callApi('/statistics', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
  }]);
  return StatisticsApi;
}();
exports["default"] = StatisticsApi;
},{"../ApiClient":1,"../model/ChannelLogStatusSummary":28,"../model/LogStatusSummary":67}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _SubAccountInfo = _interopRequireDefault(require("../model/SubAccountInfo"));
var _SubaccountEmailCreditsPayload = _interopRequireDefault(require("../model/SubaccountEmailCreditsPayload"));
var _SubaccountEmailSettings = _interopRequireDefault(require("../model/SubaccountEmailSettings"));
var _SubaccountPayload = _interopRequireDefault(require("../model/SubaccountPayload"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
* SubAccounts service.
* @module api/SubAccountsApi
* @version 4.0.23
*/
var SubAccountsApi = /*#__PURE__*/function () {
  /**
  * Constructs a new SubAccountsApi. 
  * @alias module:api/SubAccountsApi
  * @class
  * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
  * default to {@link module:ApiClient#instance} if unspecified.
  */
  function SubAccountsApi(apiClient) {
    _classCallCheck(this, SubAccountsApi);
    this.apiClient = apiClient || _ApiClient["default"].instance;
  }

  /**
   * Callback function to receive the result of the subaccountsByEmailCreditsPatch operation.
   * @callback module:api/SubAccountsApi~subaccountsByEmailCreditsPatchCallback
   * @param {String} error Error message, if any.
   * @param data This operation does not return a value.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Add, Subtract Email Credits
   * Update email credits of a subaccount by the given amount. Required Access Level: ModifySubAccounts
   * @param {String} email Email address of Sub-Account
   * @param {module:model/SubaccountEmailCreditsPayload} subaccountEmailCreditsPayload Amount of email credits to add or subtract from the current SubAccount email credits pool (positive or negative value)
   * @param {module:api/SubAccountsApi~subaccountsByEmailCreditsPatchCallback} callback The callback function, accepting three arguments: error, data, response
   */
  _createClass(SubAccountsApi, [{
    key: "subaccountsByEmailCreditsPatch",
    value: function subaccountsByEmailCreditsPatch(email, subaccountEmailCreditsPayload, callback) {
      var postBody = subaccountEmailCreditsPayload;
      // verify the required parameter 'email' is set
      if (email === undefined || email === null) {
        throw new Error("Missing the required parameter 'email' when calling subaccountsByEmailCreditsPatch");
      }
      // verify the required parameter 'subaccountEmailCreditsPayload' is set
      if (subaccountEmailCreditsPayload === undefined || subaccountEmailCreditsPayload === null) {
        throw new Error("Missing the required parameter 'subaccountEmailCreditsPayload' when calling subaccountsByEmailCreditsPatch");
      }
      var pathParams = {
        'email': email
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = ['application/json'];
      var accepts = [];
      var returnType = null;
      return this.apiClient.callApi('/subaccounts/{email}/credits', 'PATCH', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the subaccountsByEmailDelete operation.
     * @callback module:api/SubAccountsApi~subaccountsByEmailDeleteCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete SubAccount
     * Deletes specified SubAccount. An email will be sent to confirm this change. Required Access Level: ModifySubAccounts
     * @param {String} email Email address of Sub-Account
     * @param {module:api/SubAccountsApi~subaccountsByEmailDeleteCallback} callback The callback function, accepting three arguments: error, data, response
     */
  }, {
    key: "subaccountsByEmailDelete",
    value: function subaccountsByEmailDelete(email, callback) {
      var postBody = null;
      // verify the required parameter 'email' is set
      if (email === undefined || email === null) {
        throw new Error("Missing the required parameter 'email' when calling subaccountsByEmailDelete");
      }
      var pathParams = {
        'email': email
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = [];
      var accepts = [];
      var returnType = null;
      return this.apiClient.callApi('/subaccounts/{email}', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the subaccountsByEmailGet operation.
     * @callback module:api/SubAccountsApi~subaccountsByEmailGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/SubAccountInfo} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Load SubAccount
     * Returns details for the specified SubAccount. Required Access Level: ViewSubAccounts
     * @param {String} email Email address of Sub-Account
     * @param {module:api/SubAccountsApi~subaccountsByEmailGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/SubAccountInfo}
     */
  }, {
    key: "subaccountsByEmailGet",
    value: function subaccountsByEmailGet(email, callback) {
      var postBody = null;
      // verify the required parameter 'email' is set
      if (email === undefined || email === null) {
        throw new Error("Missing the required parameter 'email' when calling subaccountsByEmailGet");
      }
      var pathParams = {
        'email': email
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _SubAccountInfo["default"];
      return this.apiClient.callApi('/subaccounts/{email}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the subaccountsByEmailSettingsEmailPut operation.
     * @callback module:api/SubAccountsApi~subaccountsByEmailSettingsEmailPutCallback
     * @param {String} error Error message, if any.
     * @param {module:model/SubaccountEmailSettings} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update SubAccount Email Settings
     * Update SubAccount email settings. Required Access Level: ModifySubAccounts
     * @param {String} email 
     * @param {module:model/SubaccountEmailSettings} subaccountEmailSettings Updated Email Settings
     * @param {module:api/SubAccountsApi~subaccountsByEmailSettingsEmailPutCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/SubaccountEmailSettings}
     */
  }, {
    key: "subaccountsByEmailSettingsEmailPut",
    value: function subaccountsByEmailSettingsEmailPut(email, subaccountEmailSettings, callback) {
      var postBody = subaccountEmailSettings;
      // verify the required parameter 'email' is set
      if (email === undefined || email === null) {
        throw new Error("Missing the required parameter 'email' when calling subaccountsByEmailSettingsEmailPut");
      }
      // verify the required parameter 'subaccountEmailSettings' is set
      if (subaccountEmailSettings === undefined || subaccountEmailSettings === null) {
        throw new Error("Missing the required parameter 'subaccountEmailSettings' when calling subaccountsByEmailSettingsEmailPut");
      }
      var pathParams = {
        'email': email
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = _SubaccountEmailSettings["default"];
      return this.apiClient.callApi('/subaccounts/{email}/settings/email', 'PUT', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the subaccountsGet operation.
     * @callback module:api/SubAccountsApi~subaccountsGetCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/SubAccountInfo>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Load SubAccounts
     * Returns a list of all your SubAccounts. Required Access Level: ViewSubAccounts
     * @param {Object} opts Optional parameters
     * @param {Number} opts.limit Maximum number of returned items.
     * @param {Number} opts.offset How many items should be returned ahead.
     * @param {module:api/SubAccountsApi~subaccountsGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/SubAccountInfo>}
     */
  }, {
    key: "subaccountsGet",
    value: function subaccountsGet(opts, callback) {
      opts = opts || {};
      var postBody = null;
      var pathParams = {};
      var queryParams = {
        'limit': opts['limit'],
        'offset': opts['offset']
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = [_SubAccountInfo["default"]];
      return this.apiClient.callApi('/subaccounts', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the subaccountsPost operation.
     * @callback module:api/SubAccountsApi~subaccountsPostCallback
     * @param {String} error Error message, if any.
     * @param {module:model/SubAccountInfo} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Add SubAccount
     * Add a new SubAccount to your Account. To receive an access token for this SubAccount, make a POST security/apikeys request using the 'subaccount' parameter. Required Access Level: ModifySubAccounts
     * @param {module:model/SubaccountPayload} subaccountPayload 
     * @param {module:api/SubAccountsApi~subaccountsPostCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/SubAccountInfo}
     */
  }, {
    key: "subaccountsPost",
    value: function subaccountsPost(subaccountPayload, callback) {
      var postBody = subaccountPayload;
      // verify the required parameter 'subaccountPayload' is set
      if (subaccountPayload === undefined || subaccountPayload === null) {
        throw new Error("Missing the required parameter 'subaccountPayload' when calling subaccountsPost");
      }
      var pathParams = {};
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = _SubAccountInfo["default"];
      return this.apiClient.callApi('/subaccounts', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
  }]);
  return SubAccountsApi;
}();
exports["default"] = SubAccountsApi;
},{"../ApiClient":1,"../model/SubAccountInfo":82,"../model/SubaccountEmailCreditsPayload":83,"../model/SubaccountEmailSettings":84,"../model/SubaccountPayload":86}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _Suppression = _interopRequireDefault(require("../model/Suppression"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
* Suppressions service.
* @module api/SuppressionsApi
* @version 4.0.23
*/
var SuppressionsApi = /*#__PURE__*/function () {
  /**
  * Constructs a new SuppressionsApi. 
  * @alias module:api/SuppressionsApi
  * @class
  * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
  * default to {@link module:ApiClient#instance} if unspecified.
  */
  function SuppressionsApi(apiClient) {
    _classCallCheck(this, SuppressionsApi);
    this.apiClient = apiClient || _ApiClient["default"].instance;
  }

  /**
   * Callback function to receive the result of the suppressionsBouncesGet operation.
   * @callback module:api/SuppressionsApi~suppressionsBouncesGetCallback
   * @param {String} error Error message, if any.
   * @param {Array.<module:model/Suppression>} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Get Bounce List
   * Retrieve your list of bounced emails. Required Access Level: ViewContacts, ViewSuppressions
   * @param {Object} opts Optional parameters
   * @param {String} opts.search Text fragment used for searching.
   * @param {Number} opts.limit Maximum number of returned items.
   * @param {Number} opts.offset How many items should be returned ahead.
   * @param {module:api/SuppressionsApi~suppressionsBouncesGetCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link Array.<module:model/Suppression>}
   */
  _createClass(SuppressionsApi, [{
    key: "suppressionsBouncesGet",
    value: function suppressionsBouncesGet(opts, callback) {
      opts = opts || {};
      var postBody = null;
      var pathParams = {};
      var queryParams = {
        'search': opts['search'],
        'limit': opts['limit'],
        'offset': opts['offset']
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = [_Suppression["default"]];
      return this.apiClient.callApi('/suppressions/bounces', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the suppressionsBouncesImportPost operation.
     * @callback module:api/SuppressionsApi~suppressionsBouncesImportPostCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Add Bounces Async
     * Add Bounced. Required Access Level: ModifyContacts, ModifySuppressions
     * @param {Object} opts Optional parameters
     * @param {File} opts.file 
     * @param {module:api/SuppressionsApi~suppressionsBouncesImportPostCallback} callback The callback function, accepting three arguments: error, data, response
     */
  }, {
    key: "suppressionsBouncesImportPost",
    value: function suppressionsBouncesImportPost(opts, callback) {
      opts = opts || {};
      var postBody = null;
      var pathParams = {};
      var queryParams = {};
      var headerParams = {};
      var formParams = {
        'file': opts['file']
      };
      var authNames = ['apikey'];
      var contentTypes = ['multipart/form-data'];
      var accepts = [];
      var returnType = null;
      return this.apiClient.callApi('/suppressions/bounces/import', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the suppressionsBouncesPost operation.
     * @callback module:api/SuppressionsApi~suppressionsBouncesPostCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/Suppression>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Add Bounces
     * Add Bounced. Required Access Level: ModifyContacts, ModifySuppressions
     * @param {Array.<String>} requestBody Emails to add as bounces. Limited to 1000 per request
     * @param {module:api/SuppressionsApi~suppressionsBouncesPostCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/Suppression>}
     */
  }, {
    key: "suppressionsBouncesPost",
    value: function suppressionsBouncesPost(requestBody, callback) {
      var postBody = requestBody;
      // verify the required parameter 'requestBody' is set
      if (requestBody === undefined || requestBody === null) {
        throw new Error("Missing the required parameter 'requestBody' when calling suppressionsBouncesPost");
      }
      var pathParams = {};
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = [_Suppression["default"]];
      return this.apiClient.callApi('/suppressions/bounces', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the suppressionsByEmailDelete operation.
     * @callback module:api/SuppressionsApi~suppressionsByEmailDeleteCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete Suppression
     * Delete Suppression. Required Access Level: ViewContacts, ViewSuppressions
     * @param {String} email Proper email address.
     * @param {module:api/SuppressionsApi~suppressionsByEmailDeleteCallback} callback The callback function, accepting three arguments: error, data, response
     */
  }, {
    key: "suppressionsByEmailDelete",
    value: function suppressionsByEmailDelete(email, callback) {
      var postBody = null;
      // verify the required parameter 'email' is set
      if (email === undefined || email === null) {
        throw new Error("Missing the required parameter 'email' when calling suppressionsByEmailDelete");
      }
      var pathParams = {
        'email': email
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = [];
      var accepts = [];
      var returnType = null;
      return this.apiClient.callApi('/suppressions/{email}', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the suppressionsByEmailGet operation.
     * @callback module:api/SuppressionsApi~suppressionsByEmailGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Suppression} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get Suppression
     * Retrieve your suppression. Required Access Level: ViewContacts, ViewSuppressions
     * @param {String} email Proper email address.
     * @param {module:api/SuppressionsApi~suppressionsByEmailGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Suppression}
     */
  }, {
    key: "suppressionsByEmailGet",
    value: function suppressionsByEmailGet(email, callback) {
      var postBody = null;
      // verify the required parameter 'email' is set
      if (email === undefined || email === null) {
        throw new Error("Missing the required parameter 'email' when calling suppressionsByEmailGet");
      }
      var pathParams = {
        'email': email
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _Suppression["default"];
      return this.apiClient.callApi('/suppressions/{email}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the suppressionsComplaintsGet operation.
     * @callback module:api/SuppressionsApi~suppressionsComplaintsGetCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/Suppression>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get Complaints List
     * Retrieve your list of complaints. Required Access Level: ViewContacts, ViewSuppressions
     * @param {Object} opts Optional parameters
     * @param {String} opts.search Text fragment used for searching.
     * @param {Number} opts.limit Maximum number of returned items.
     * @param {Number} opts.offset How many items should be returned ahead.
     * @param {module:api/SuppressionsApi~suppressionsComplaintsGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/Suppression>}
     */
  }, {
    key: "suppressionsComplaintsGet",
    value: function suppressionsComplaintsGet(opts, callback) {
      opts = opts || {};
      var postBody = null;
      var pathParams = {};
      var queryParams = {
        'search': opts['search'],
        'limit': opts['limit'],
        'offset': opts['offset']
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = [_Suppression["default"]];
      return this.apiClient.callApi('/suppressions/complaints', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the suppressionsComplaintsImportPost operation.
     * @callback module:api/SuppressionsApi~suppressionsComplaintsImportPostCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Add Complaints Async
     * Add Complaints. Required Access Level: ModifyContacts, ModifySuppressions
     * @param {Object} opts Optional parameters
     * @param {File} opts.file 
     * @param {module:api/SuppressionsApi~suppressionsComplaintsImportPostCallback} callback The callback function, accepting three arguments: error, data, response
     */
  }, {
    key: "suppressionsComplaintsImportPost",
    value: function suppressionsComplaintsImportPost(opts, callback) {
      opts = opts || {};
      var postBody = null;
      var pathParams = {};
      var queryParams = {};
      var headerParams = {};
      var formParams = {
        'file': opts['file']
      };
      var authNames = ['apikey'];
      var contentTypes = ['multipart/form-data'];
      var accepts = [];
      var returnType = null;
      return this.apiClient.callApi('/suppressions/complaints/import', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the suppressionsComplaintsPost operation.
     * @callback module:api/SuppressionsApi~suppressionsComplaintsPostCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/Suppression>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Add Complaints
     * Add Complaints. Required Access Level: ModifyContacts, ModifySuppressions
     * @param {Array.<String>} requestBody Emails to add as complaints. Limited to 1000 per request
     * @param {module:api/SuppressionsApi~suppressionsComplaintsPostCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/Suppression>}
     */
  }, {
    key: "suppressionsComplaintsPost",
    value: function suppressionsComplaintsPost(requestBody, callback) {
      var postBody = requestBody;
      // verify the required parameter 'requestBody' is set
      if (requestBody === undefined || requestBody === null) {
        throw new Error("Missing the required parameter 'requestBody' when calling suppressionsComplaintsPost");
      }
      var pathParams = {};
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = [_Suppression["default"]];
      return this.apiClient.callApi('/suppressions/complaints', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the suppressionsGet operation.
     * @callback module:api/SuppressionsApi~suppressionsGetCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/Suppression>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get Suppressions
     * Retrieve your suppressions. Required Access Level: ViewContacts, ViewSuppressions
     * @param {Object} opts Optional parameters
     * @param {Number} opts.limit Maximum number of returned items.
     * @param {Number} opts.offset How many items should be returned ahead.
     * @param {module:api/SuppressionsApi~suppressionsGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/Suppression>}
     */
  }, {
    key: "suppressionsGet",
    value: function suppressionsGet(opts, callback) {
      opts = opts || {};
      var postBody = null;
      var pathParams = {};
      var queryParams = {
        'limit': opts['limit'],
        'offset': opts['offset']
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = [_Suppression["default"]];
      return this.apiClient.callApi('/suppressions', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the suppressionsUnsubscribesGet operation.
     * @callback module:api/SuppressionsApi~suppressionsUnsubscribesGetCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/Suppression>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get Unsubscribes List
     * Retrieve your list of unsubscribes. Required Access Level: ViewContacts, ViewSuppressions
     * @param {Object} opts Optional parameters
     * @param {String} opts.search Text fragment used for searching.
     * @param {Number} opts.limit Maximum number of returned items.
     * @param {Number} opts.offset How many items should be returned ahead.
     * @param {module:api/SuppressionsApi~suppressionsUnsubscribesGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/Suppression>}
     */
  }, {
    key: "suppressionsUnsubscribesGet",
    value: function suppressionsUnsubscribesGet(opts, callback) {
      opts = opts || {};
      var postBody = null;
      var pathParams = {};
      var queryParams = {
        'search': opts['search'],
        'limit': opts['limit'],
        'offset': opts['offset']
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = [_Suppression["default"]];
      return this.apiClient.callApi('/suppressions/unsubscribes', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the suppressionsUnsubscribesImportPost operation.
     * @callback module:api/SuppressionsApi~suppressionsUnsubscribesImportPostCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Add Unsubscribes Async
     * Add Unsubscribes. Required Access Level: ModifyContacts, ModifySuppressions
     * @param {Object} opts Optional parameters
     * @param {File} opts.file 
     * @param {module:api/SuppressionsApi~suppressionsUnsubscribesImportPostCallback} callback The callback function, accepting three arguments: error, data, response
     */
  }, {
    key: "suppressionsUnsubscribesImportPost",
    value: function suppressionsUnsubscribesImportPost(opts, callback) {
      opts = opts || {};
      var postBody = null;
      var pathParams = {};
      var queryParams = {};
      var headerParams = {};
      var formParams = {
        'file': opts['file']
      };
      var authNames = ['apikey'];
      var contentTypes = ['multipart/form-data'];
      var accepts = [];
      var returnType = null;
      return this.apiClient.callApi('/suppressions/unsubscribes/import', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the suppressionsUnsubscribesPost operation.
     * @callback module:api/SuppressionsApi~suppressionsUnsubscribesPostCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/Suppression>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Add Unsubscribes
     * Add Unsubscribes. Required Access Level: ModifyContacts, ModifySuppressions
     * @param {Array.<String>} requestBody Emails to add as unsubscribes. Limited to 1000 per request
     * @param {module:api/SuppressionsApi~suppressionsUnsubscribesPostCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/Suppression>}
     */
  }, {
    key: "suppressionsUnsubscribesPost",
    value: function suppressionsUnsubscribesPost(requestBody, callback) {
      var postBody = requestBody;
      // verify the required parameter 'requestBody' is set
      if (requestBody === undefined || requestBody === null) {
        throw new Error("Missing the required parameter 'requestBody' when calling suppressionsUnsubscribesPost");
      }
      var pathParams = {};
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = [_Suppression["default"]];
      return this.apiClient.callApi('/suppressions/unsubscribes', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
  }]);
  return SuppressionsApi;
}();
exports["default"] = SuppressionsApi;
},{"../ApiClient":1,"../model/Suppression":89}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _Template = _interopRequireDefault(require("../model/Template"));
var _TemplatePayload = _interopRequireDefault(require("../model/TemplatePayload"));
var _TemplateScope = _interopRequireDefault(require("../model/TemplateScope"));
var _TemplateType = _interopRequireDefault(require("../model/TemplateType"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
* Templates service.
* @module api/TemplatesApi
* @version 4.0.23
*/
var TemplatesApi = /*#__PURE__*/function () {
  /**
  * Constructs a new TemplatesApi. 
  * @alias module:api/TemplatesApi
  * @class
  * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
  * default to {@link module:ApiClient#instance} if unspecified.
  */
  function TemplatesApi(apiClient) {
    _classCallCheck(this, TemplatesApi);
    this.apiClient = apiClient || _ApiClient["default"].instance;
  }

  /**
   * Callback function to receive the result of the templatesByNameDelete operation.
   * @callback module:api/TemplatesApi~templatesByNameDeleteCallback
   * @param {String} error Error message, if any.
   * @param data This operation does not return a value.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Delete Template
   * Delete template with the specified name. Required Access Level: ModifyTemplates
   * @param {String} name Name of template.
   * @param {module:api/TemplatesApi~templatesByNameDeleteCallback} callback The callback function, accepting three arguments: error, data, response
   */
  _createClass(TemplatesApi, [{
    key: "templatesByNameDelete",
    value: function templatesByNameDelete(name, callback) {
      var postBody = null;
      // verify the required parameter 'name' is set
      if (name === undefined || name === null) {
        throw new Error("Missing the required parameter 'name' when calling templatesByNameDelete");
      }
      var pathParams = {
        'name': name
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = [];
      var accepts = [];
      var returnType = null;
      return this.apiClient.callApi('/templates/{name}', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the templatesByNameGet operation.
     * @callback module:api/TemplatesApi~templatesByNameGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Template} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Load Template
     * Load detailed information of the specified template. Required Access Level: ViewTemplates
     * @param {String} name Name of template.
     * @param {module:api/TemplatesApi~templatesByNameGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Template}
     */
  }, {
    key: "templatesByNameGet",
    value: function templatesByNameGet(name, callback) {
      var postBody = null;
      // verify the required parameter 'name' is set
      if (name === undefined || name === null) {
        throw new Error("Missing the required parameter 'name' when calling templatesByNameGet");
      }
      var pathParams = {
        'name': name
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _Template["default"];
      return this.apiClient.callApi('/templates/{name}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the templatesByNamePut operation.
     * @callback module:api/TemplatesApi~templatesByNamePutCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Template} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update Template
     * Update existing template, overwriting existing data. Required Access Level: ModifyTemplates
     * @param {String} name Name of template.
     * @param {module:model/TemplatePayload} templatePayload 
     * @param {module:api/TemplatesApi~templatesByNamePutCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Template}
     */
  }, {
    key: "templatesByNamePut",
    value: function templatesByNamePut(name, templatePayload, callback) {
      var postBody = templatePayload;
      // verify the required parameter 'name' is set
      if (name === undefined || name === null) {
        throw new Error("Missing the required parameter 'name' when calling templatesByNamePut");
      }
      // verify the required parameter 'templatePayload' is set
      if (templatePayload === undefined || templatePayload === null) {
        throw new Error("Missing the required parameter 'templatePayload' when calling templatesByNamePut");
      }
      var pathParams = {
        'name': name
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = _Template["default"];
      return this.apiClient.callApi('/templates/{name}', 'PUT', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the templatesGet operation.
     * @callback module:api/TemplatesApi~templatesGetCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/Template>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Load Templates
     * Returns a list of templates for the specified type. Required Access Level: ViewTemplates
     * @param {Array.<module:model/TemplateScope>} scopeType Return templates with specified scope only
     * @param {Object} opts Optional parameters
     * @param {Array.<module:model/TemplateType>} opts.templateTypes Return templates with specified type only
     * @param {Number} opts.limit Maximum number of returned items.
     * @param {Number} opts.offset How many items should be returned ahead.
     * @param {module:api/TemplatesApi~templatesGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/Template>}
     */
  }, {
    key: "templatesGet",
    value: function templatesGet(scopeType, opts, callback) {
      opts = opts || {};
      var postBody = null;
      // verify the required parameter 'scopeType' is set
      if (scopeType === undefined || scopeType === null) {
        throw new Error("Missing the required parameter 'scopeType' when calling templatesGet");
      }
      var pathParams = {};
      var queryParams = {
        'scopeType': this.apiClient.buildCollectionParam(scopeType, 'multi'),
        'templateTypes': this.apiClient.buildCollectionParam(opts['templateTypes'], 'multi'),
        'limit': opts['limit'],
        'offset': opts['offset']
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = [_Template["default"]];
      return this.apiClient.callApi('/templates', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the templatesPost operation.
     * @callback module:api/TemplatesApi~templatesPostCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Template} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Add Template
     * Add a new Template. Required Access Level: ModifyTemplates
     * @param {module:model/TemplatePayload} templatePayload 
     * @param {module:api/TemplatesApi~templatesPostCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Template}
     */
  }, {
    key: "templatesPost",
    value: function templatesPost(templatePayload, callback) {
      var postBody = templatePayload;
      // verify the required parameter 'templatePayload' is set
      if (templatePayload === undefined || templatePayload === null) {
        throw new Error("Missing the required parameter 'templatePayload' when calling templatesPost");
      }
      var pathParams = {};
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = _Template["default"];
      return this.apiClient.callApi('/templates', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
  }]);
  return TemplatesApi;
}();
exports["default"] = TemplatesApi;
},{"../ApiClient":1,"../model/Template":90,"../model/TemplatePayload":91,"../model/TemplateScope":92,"../model/TemplateType":93}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _EmailValidationResult = _interopRequireDefault(require("../model/EmailValidationResult"));
var _VerificationFileResult = _interopRequireDefault(require("../model/VerificationFileResult"));
var _VerificationFileResultDetails = _interopRequireDefault(require("../model/VerificationFileResultDetails"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
* Verifications service.
* @module api/VerificationsApi
* @version 4.0.23
*/
var VerificationsApi = /*#__PURE__*/function () {
  /**
  * Constructs a new VerificationsApi. 
  * @alias module:api/VerificationsApi
  * @class
  * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
  * default to {@link module:ApiClient#instance} if unspecified.
  */
  function VerificationsApi(apiClient) {
    _classCallCheck(this, VerificationsApi);
    this.apiClient = apiClient || _ApiClient["default"].instance;
  }

  /**
   * Callback function to receive the result of the verificationsByEmailDelete operation.
   * @callback module:api/VerificationsApi~verificationsByEmailDeleteCallback
   * @param {String} error Error message, if any.
   * @param data This operation does not return a value.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Delete Email Verification Result
   * Delete a result with given email if exists. Required Access Level: VerifyEmails
   * @param {String} email Email address to verification
   * @param {module:api/VerificationsApi~verificationsByEmailDeleteCallback} callback The callback function, accepting three arguments: error, data, response
   */
  _createClass(VerificationsApi, [{
    key: "verificationsByEmailDelete",
    value: function verificationsByEmailDelete(email, callback) {
      var postBody = null;
      // verify the required parameter 'email' is set
      if (email === undefined || email === null) {
        throw new Error("Missing the required parameter 'email' when calling verificationsByEmailDelete");
      }
      var pathParams = {
        'email': email
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = [];
      var accepts = [];
      var returnType = null;
      return this.apiClient.callApi('/verifications/{email}', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the verificationsByEmailGet operation.
     * @callback module:api/VerificationsApi~verificationsByEmailGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/EmailValidationResult} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get Email Verification Result
     * Returns a result of verified email. Required Access Level: VerifyEmails
     * @param {String} email Email address to view verification result of
     * @param {module:api/VerificationsApi~verificationsByEmailGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/EmailValidationResult}
     */
  }, {
    key: "verificationsByEmailGet",
    value: function verificationsByEmailGet(email, callback) {
      var postBody = null;
      // verify the required parameter 'email' is set
      if (email === undefined || email === null) {
        throw new Error("Missing the required parameter 'email' when calling verificationsByEmailGet");
      }
      var pathParams = {
        'email': email
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _EmailValidationResult["default"];
      return this.apiClient.callApi('/verifications/{email}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the verificationsByEmailPost operation.
     * @callback module:api/VerificationsApi~verificationsByEmailPostCallback
     * @param {String} error Error message, if any.
     * @param {module:model/EmailValidationResult} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Verify Email
     * Verify single email address and returns result of verification. Required Access Level: VerifyEmails
     * @param {String} email Email address to verify
     * @param {module:api/VerificationsApi~verificationsByEmailPostCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/EmailValidationResult}
     */
  }, {
    key: "verificationsByEmailPost",
    value: function verificationsByEmailPost(email, callback) {
      var postBody = null;
      // verify the required parameter 'email' is set
      if (email === undefined || email === null) {
        throw new Error("Missing the required parameter 'email' when calling verificationsByEmailPost");
      }
      var pathParams = {
        'email': email
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _EmailValidationResult["default"];
      return this.apiClient.callApi('/verifications/{email}', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the verificationsFilesByIdDelete operation.
     * @callback module:api/VerificationsApi~verificationsFilesByIdDeleteCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete File Verification Result
     * Delete Verification Results if they exist. Required Access Level: VerifyEmails
     * @param {String} id ID of the exported file
     * @param {module:api/VerificationsApi~verificationsFilesByIdDeleteCallback} callback The callback function, accepting three arguments: error, data, response
     */
  }, {
    key: "verificationsFilesByIdDelete",
    value: function verificationsFilesByIdDelete(id, callback) {
      var postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling verificationsFilesByIdDelete");
      }
      var pathParams = {
        'id': id
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = [];
      var accepts = [];
      var returnType = null;
      return this.apiClient.callApi('/verifications/files/{id}', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the verificationsFilesByIdResultDownloadGet operation.
     * @callback module:api/VerificationsApi~verificationsFilesByIdResultDownloadGetCallback
     * @param {String} error Error message, if any.
     * @param {File} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Download File Verification Result
     * Download verification results as a ZIP file. Required Access Level: VerifyEmails
     * @param {String} id Verification ID to download
     * @param {module:api/VerificationsApi~verificationsFilesByIdResultDownloadGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link File}
     */
  }, {
    key: "verificationsFilesByIdResultDownloadGet",
    value: function verificationsFilesByIdResultDownloadGet(id, callback) {
      var postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling verificationsFilesByIdResultDownloadGet");
      }
      var pathParams = {
        'id': id
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = [];
      var accepts = ['application/*'];
      var returnType = File;
      return this.apiClient.callApi('/verifications/files/{id}/result/download', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the verificationsFilesByIdResultGet operation.
     * @callback module:api/VerificationsApi~verificationsFilesByIdResultGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/VerificationFileResultDetails} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get Detailed File Verification Result
     * Returns status and results (if verified) of file with given ID. Required Access Level: VerifyEmails
     * @param {String} id ID of the Verification to display status of
     * @param {Object} opts Optional parameters
     * @param {Number} opts.limit Maximum number of returned email verification results
     * @param {Number} opts.offset How many result items should be returned ahead
     * @param {module:api/VerificationsApi~verificationsFilesByIdResultGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/VerificationFileResultDetails}
     */
  }, {
    key: "verificationsFilesByIdResultGet",
    value: function verificationsFilesByIdResultGet(id, opts, callback) {
      opts = opts || {};
      var postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling verificationsFilesByIdResultGet");
      }
      var pathParams = {
        'id': id
      };
      var queryParams = {
        'limit': opts['limit'],
        'offset': opts['offset']
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _VerificationFileResultDetails["default"];
      return this.apiClient.callApi('/verifications/files/{id}/result', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the verificationsFilesByIdVerificationPost operation.
     * @callback module:api/VerificationsApi~verificationsFilesByIdVerificationPostCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Start verification
     * Start a verification of the previously uploaded file with emails. Required Access Level: VerifyEmails
     * @param {String} id File ID to start verification
     * @param {module:api/VerificationsApi~verificationsFilesByIdVerificationPostCallback} callback The callback function, accepting three arguments: error, data, response
     */
  }, {
    key: "verificationsFilesByIdVerificationPost",
    value: function verificationsFilesByIdVerificationPost(id, callback) {
      var postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling verificationsFilesByIdVerificationPost");
      }
      var pathParams = {
        'id': id
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = [];
      var accepts = [];
      var returnType = null;
      return this.apiClient.callApi('/verifications/files/{id}/verification', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the verificationsFilesPost operation.
     * @callback module:api/VerificationsApi~verificationsFilesPostCallback
     * @param {String} error Error message, if any.
     * @param {module:model/VerificationFileResult} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Upload File with Emails
     * Uploads a CSV file with list of emails that can then be triggered for verification. An 'email' column is required. Required Access Level: VerifyEmails
     * @param {Object} opts Optional parameters
     * @param {File} opts.file 
     * @param {module:api/VerificationsApi~verificationsFilesPostCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/VerificationFileResult}
     */
  }, {
    key: "verificationsFilesPost",
    value: function verificationsFilesPost(opts, callback) {
      opts = opts || {};
      var postBody = null;
      var pathParams = {};
      var queryParams = {};
      var headerParams = {};
      var formParams = {
        'file': opts['file']
      };
      var authNames = ['apikey'];
      var contentTypes = ['multipart/form-data'];
      var accepts = ['application/json'];
      var returnType = _VerificationFileResult["default"];
      return this.apiClient.callApi('/verifications/files', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the verificationsFilesResultGet operation.
     * @callback module:api/VerificationsApi~verificationsFilesResultGetCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/VerificationFileResult>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get Files Verification Results
     * Returns a list of uploaded files, their statuses and results. Required Access Level: VerifyEmails
     * @param {module:api/VerificationsApi~verificationsFilesResultGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/VerificationFileResult>}
     */
  }, {
    key: "verificationsFilesResultGet",
    value: function verificationsFilesResultGet(callback) {
      var postBody = null;
      var pathParams = {};
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = [_VerificationFileResult["default"]];
      return this.apiClient.callApi('/verifications/files/result', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }

    /**
     * Callback function to receive the result of the verificationsGet operation.
     * @callback module:api/VerificationsApi~verificationsGetCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/EmailValidationResult>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get Emails Verification Results
     * Returns a results of all verified single emails. Required Access Level: VerifyEmails
     * @param {Object} opts Optional parameters
     * @param {Number} opts.limit Maximum number of returned items.
     * @param {Number} opts.offset How many items should be returned ahead.
     * @param {module:api/VerificationsApi~verificationsGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/EmailValidationResult>}
     */
  }, {
    key: "verificationsGet",
    value: function verificationsGet(opts, callback) {
      opts = opts || {};
      var postBody = null;
      var pathParams = {};
      var queryParams = {
        'limit': opts['limit'],
        'offset': opts['offset']
      };
      var headerParams = {};
      var formParams = {};
      var authNames = ['apikey'];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = [_EmailValidationResult["default"]];
      return this.apiClient.callApi('/verifications', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
  }]);
  return VerificationsApi;
}();
exports["default"] = VerificationsApi;
},{"../ApiClient":1,"../model/EmailValidationResult":47,"../model/VerificationFileResult":96,"../model/VerificationFileResultDetails":97}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "AccessLevel", {
  enumerable: true,
  get: function get() {
    return _AccessLevel["default"];
  }
});
Object.defineProperty(exports, "AccountStatusEnum", {
  enumerable: true,
  get: function get() {
    return _AccountStatusEnum["default"];
  }
});
Object.defineProperty(exports, "ApiClient", {
  enumerable: true,
  get: function get() {
    return _ApiClient["default"];
  }
});
Object.defineProperty(exports, "ApiKey", {
  enumerable: true,
  get: function get() {
    return _ApiKey["default"];
  }
});
Object.defineProperty(exports, "ApiKeyPayload", {
  enumerable: true,
  get: function get() {
    return _ApiKeyPayload["default"];
  }
});
Object.defineProperty(exports, "BodyContentType", {
  enumerable: true,
  get: function get() {
    return _BodyContentType["default"];
  }
});
Object.defineProperty(exports, "BodyPart", {
  enumerable: true,
  get: function get() {
    return _BodyPart["default"];
  }
});
Object.defineProperty(exports, "Campaign", {
  enumerable: true,
  get: function get() {
    return _Campaign["default"];
  }
});
Object.defineProperty(exports, "CampaignOptions", {
  enumerable: true,
  get: function get() {
    return _CampaignOptions["default"];
  }
});
Object.defineProperty(exports, "CampaignRecipient", {
  enumerable: true,
  get: function get() {
    return _CampaignRecipient["default"];
  }
});
Object.defineProperty(exports, "CampaignStatus", {
  enumerable: true,
  get: function get() {
    return _CampaignStatus["default"];
  }
});
Object.defineProperty(exports, "CampaignTemplate", {
  enumerable: true,
  get: function get() {
    return _CampaignTemplate["default"];
  }
});
Object.defineProperty(exports, "CampaignsApi", {
  enumerable: true,
  get: function get() {
    return _CampaignsApi["default"];
  }
});
Object.defineProperty(exports, "ChannelLogStatusSummary", {
  enumerable: true,
  get: function get() {
    return _ChannelLogStatusSummary["default"];
  }
});
Object.defineProperty(exports, "CompressionFormat", {
  enumerable: true,
  get: function get() {
    return _CompressionFormat["default"];
  }
});
Object.defineProperty(exports, "ConsentData", {
  enumerable: true,
  get: function get() {
    return _ConsentData["default"];
  }
});
Object.defineProperty(exports, "ConsentTracking", {
  enumerable: true,
  get: function get() {
    return _ConsentTracking["default"];
  }
});
Object.defineProperty(exports, "Contact", {
  enumerable: true,
  get: function get() {
    return _Contact["default"];
  }
});
Object.defineProperty(exports, "ContactActivity", {
  enumerable: true,
  get: function get() {
    return _ContactActivity["default"];
  }
});
Object.defineProperty(exports, "ContactPayload", {
  enumerable: true,
  get: function get() {
    return _ContactPayload["default"];
  }
});
Object.defineProperty(exports, "ContactSource", {
  enumerable: true,
  get: function get() {
    return _ContactSource["default"];
  }
});
Object.defineProperty(exports, "ContactStatus", {
  enumerable: true,
  get: function get() {
    return _ContactStatus["default"];
  }
});
Object.defineProperty(exports, "ContactUpdatePayload", {
  enumerable: true,
  get: function get() {
    return _ContactUpdatePayload["default"];
  }
});
Object.defineProperty(exports, "ContactsApi", {
  enumerable: true,
  get: function get() {
    return _ContactsApi["default"];
  }
});
Object.defineProperty(exports, "ContactsList", {
  enumerable: true,
  get: function get() {
    return _ContactsList["default"];
  }
});
Object.defineProperty(exports, "DeliveryOptimizationType", {
  enumerable: true,
  get: function get() {
    return _DeliveryOptimizationType["default"];
  }
});
Object.defineProperty(exports, "EmailContent", {
  enumerable: true,
  get: function get() {
    return _EmailContent["default"];
  }
});
Object.defineProperty(exports, "EmailData", {
  enumerable: true,
  get: function get() {
    return _EmailData["default"];
  }
});
Object.defineProperty(exports, "EmailMessageData", {
  enumerable: true,
  get: function get() {
    return _EmailMessageData["default"];
  }
});
Object.defineProperty(exports, "EmailRecipient", {
  enumerable: true,
  get: function get() {
    return _EmailRecipient["default"];
  }
});
Object.defineProperty(exports, "EmailSend", {
  enumerable: true,
  get: function get() {
    return _EmailSend["default"];
  }
});
Object.defineProperty(exports, "EmailStatus", {
  enumerable: true,
  get: function get() {
    return _EmailStatus["default"];
  }
});
Object.defineProperty(exports, "EmailTransactionalMessageData", {
  enumerable: true,
  get: function get() {
    return _EmailTransactionalMessageData["default"];
  }
});
Object.defineProperty(exports, "EmailValidationResult", {
  enumerable: true,
  get: function get() {
    return _EmailValidationResult["default"];
  }
});
Object.defineProperty(exports, "EmailValidationStatus", {
  enumerable: true,
  get: function get() {
    return _EmailValidationStatus["default"];
  }
});
Object.defineProperty(exports, "EmailView", {
  enumerable: true,
  get: function get() {
    return _EmailView["default"];
  }
});
Object.defineProperty(exports, "EmailsApi", {
  enumerable: true,
  get: function get() {
    return _EmailsApi["default"];
  }
});
Object.defineProperty(exports, "EmailsPayload", {
  enumerable: true,
  get: function get() {
    return _EmailsPayload["default"];
  }
});
Object.defineProperty(exports, "EncodingType", {
  enumerable: true,
  get: function get() {
    return _EncodingType["default"];
  }
});
Object.defineProperty(exports, "EventType", {
  enumerable: true,
  get: function get() {
    return _EventType["default"];
  }
});
Object.defineProperty(exports, "EventsApi", {
  enumerable: true,
  get: function get() {
    return _EventsApi["default"];
  }
});
Object.defineProperty(exports, "EventsOrderBy", {
  enumerable: true,
  get: function get() {
    return _EventsOrderBy["default"];
  }
});
Object.defineProperty(exports, "ExportFileFormats", {
  enumerable: true,
  get: function get() {
    return _ExportFileFormats["default"];
  }
});
Object.defineProperty(exports, "ExportLink", {
  enumerable: true,
  get: function get() {
    return _ExportLink["default"];
  }
});
Object.defineProperty(exports, "ExportStatus", {
  enumerable: true,
  get: function get() {
    return _ExportStatus["default"];
  }
});
Object.defineProperty(exports, "FileInfo", {
  enumerable: true,
  get: function get() {
    return _FileInfo["default"];
  }
});
Object.defineProperty(exports, "FilePayload", {
  enumerable: true,
  get: function get() {
    return _FilePayload["default"];
  }
});
Object.defineProperty(exports, "FileUploadResult", {
  enumerable: true,
  get: function get() {
    return _FileUploadResult["default"];
  }
});
Object.defineProperty(exports, "FilesApi", {
  enumerable: true,
  get: function get() {
    return _FilesApi["default"];
  }
});
Object.defineProperty(exports, "InboundPayload", {
  enumerable: true,
  get: function get() {
    return _InboundPayload["default"];
  }
});
Object.defineProperty(exports, "InboundRoute", {
  enumerable: true,
  get: function get() {
    return _InboundRoute["default"];
  }
});
Object.defineProperty(exports, "InboundRouteActionType", {
  enumerable: true,
  get: function get() {
    return _InboundRouteActionType["default"];
  }
});
Object.defineProperty(exports, "InboundRouteApi", {
  enumerable: true,
  get: function get() {
    return _InboundRouteApi["default"];
  }
});
Object.defineProperty(exports, "InboundRouteFilterType", {
  enumerable: true,
  get: function get() {
    return _InboundRouteFilterType["default"];
  }
});
Object.defineProperty(exports, "ListPayload", {
  enumerable: true,
  get: function get() {
    return _ListPayload["default"];
  }
});
Object.defineProperty(exports, "ListUpdatePayload", {
  enumerable: true,
  get: function get() {
    return _ListUpdatePayload["default"];
  }
});
Object.defineProperty(exports, "ListsApi", {
  enumerable: true,
  get: function get() {
    return _ListsApi["default"];
  }
});
Object.defineProperty(exports, "LogJobStatus", {
  enumerable: true,
  get: function get() {
    return _LogJobStatus["default"];
  }
});
Object.defineProperty(exports, "LogStatusSummary", {
  enumerable: true,
  get: function get() {
    return _LogStatusSummary["default"];
  }
});
Object.defineProperty(exports, "MergeEmailPayload", {
  enumerable: true,
  get: function get() {
    return _MergeEmailPayload["default"];
  }
});
Object.defineProperty(exports, "MessageAttachment", {
  enumerable: true,
  get: function get() {
    return _MessageAttachment["default"];
  }
});
Object.defineProperty(exports, "MessageCategory", {
  enumerable: true,
  get: function get() {
    return _MessageCategory["default"];
  }
});
Object.defineProperty(exports, "NewApiKey", {
  enumerable: true,
  get: function get() {
    return _NewApiKey["default"];
  }
});
Object.defineProperty(exports, "NewSmtpCredentials", {
  enumerable: true,
  get: function get() {
    return _NewSmtpCredentials["default"];
  }
});
Object.defineProperty(exports, "Options", {
  enumerable: true,
  get: function get() {
    return _Options["default"];
  }
});
Object.defineProperty(exports, "RecipientEvent", {
  enumerable: true,
  get: function get() {
    return _RecipientEvent["default"];
  }
});
Object.defineProperty(exports, "SecurityApi", {
  enumerable: true,
  get: function get() {
    return _SecurityApi["default"];
  }
});
Object.defineProperty(exports, "Segment", {
  enumerable: true,
  get: function get() {
    return _Segment["default"];
  }
});
Object.defineProperty(exports, "SegmentPayload", {
  enumerable: true,
  get: function get() {
    return _SegmentPayload["default"];
  }
});
Object.defineProperty(exports, "SegmentsApi", {
  enumerable: true,
  get: function get() {
    return _SegmentsApi["default"];
  }
});
Object.defineProperty(exports, "SmtpCredentials", {
  enumerable: true,
  get: function get() {
    return _SmtpCredentials["default"];
  }
});
Object.defineProperty(exports, "SmtpCredentialsPayload", {
  enumerable: true,
  get: function get() {
    return _SmtpCredentialsPayload["default"];
  }
});
Object.defineProperty(exports, "SortOrderItem", {
  enumerable: true,
  get: function get() {
    return _SortOrderItem["default"];
  }
});
Object.defineProperty(exports, "SplitOptimizationType", {
  enumerable: true,
  get: function get() {
    return _SplitOptimizationType["default"];
  }
});
Object.defineProperty(exports, "SplitOptions", {
  enumerable: true,
  get: function get() {
    return _SplitOptions["default"];
  }
});
Object.defineProperty(exports, "StatisticsApi", {
  enumerable: true,
  get: function get() {
    return _StatisticsApi["default"];
  }
});
Object.defineProperty(exports, "SubAccountInfo", {
  enumerable: true,
  get: function get() {
    return _SubAccountInfo["default"];
  }
});
Object.defineProperty(exports, "SubAccountsApi", {
  enumerable: true,
  get: function get() {
    return _SubAccountsApi["default"];
  }
});
Object.defineProperty(exports, "SubaccountEmailCreditsPayload", {
  enumerable: true,
  get: function get() {
    return _SubaccountEmailCreditsPayload["default"];
  }
});
Object.defineProperty(exports, "SubaccountEmailSettings", {
  enumerable: true,
  get: function get() {
    return _SubaccountEmailSettings["default"];
  }
});
Object.defineProperty(exports, "SubaccountEmailSettingsPayload", {
  enumerable: true,
  get: function get() {
    return _SubaccountEmailSettingsPayload["default"];
  }
});
Object.defineProperty(exports, "SubaccountPayload", {
  enumerable: true,
  get: function get() {
    return _SubaccountPayload["default"];
  }
});
Object.defineProperty(exports, "SubaccountSettingsInfo", {
  enumerable: true,
  get: function get() {
    return _SubaccountSettingsInfo["default"];
  }
});
Object.defineProperty(exports, "SubaccountSettingsInfoPayload", {
  enumerable: true,
  get: function get() {
    return _SubaccountSettingsInfoPayload["default"];
  }
});
Object.defineProperty(exports, "Suppression", {
  enumerable: true,
  get: function get() {
    return _Suppression["default"];
  }
});
Object.defineProperty(exports, "SuppressionsApi", {
  enumerable: true,
  get: function get() {
    return _SuppressionsApi["default"];
  }
});
Object.defineProperty(exports, "Template", {
  enumerable: true,
  get: function get() {
    return _Template["default"];
  }
});
Object.defineProperty(exports, "TemplatePayload", {
  enumerable: true,
  get: function get() {
    return _TemplatePayload["default"];
  }
});
Object.defineProperty(exports, "TemplateScope", {
  enumerable: true,
  get: function get() {
    return _TemplateScope["default"];
  }
});
Object.defineProperty(exports, "TemplateType", {
  enumerable: true,
  get: function get() {
    return _TemplateType["default"];
  }
});
Object.defineProperty(exports, "TemplatesApi", {
  enumerable: true,
  get: function get() {
    return _TemplatesApi["default"];
  }
});
Object.defineProperty(exports, "TransactionalRecipient", {
  enumerable: true,
  get: function get() {
    return _TransactionalRecipient["default"];
  }
});
Object.defineProperty(exports, "Utm", {
  enumerable: true,
  get: function get() {
    return _Utm["default"];
  }
});
Object.defineProperty(exports, "VerificationFileResult", {
  enumerable: true,
  get: function get() {
    return _VerificationFileResult["default"];
  }
});
Object.defineProperty(exports, "VerificationFileResultDetails", {
  enumerable: true,
  get: function get() {
    return _VerificationFileResultDetails["default"];
  }
});
Object.defineProperty(exports, "VerificationStatus", {
  enumerable: true,
  get: function get() {
    return _VerificationStatus["default"];
  }
});
Object.defineProperty(exports, "VerificationsApi", {
  enumerable: true,
  get: function get() {
    return _VerificationsApi["default"];
  }
});
var _ApiClient = _interopRequireDefault(require("./ApiClient"));
var _AccessLevel = _interopRequireDefault(require("./model/AccessLevel"));
var _AccountStatusEnum = _interopRequireDefault(require("./model/AccountStatusEnum"));
var _ApiKey = _interopRequireDefault(require("./model/ApiKey"));
var _ApiKeyPayload = _interopRequireDefault(require("./model/ApiKeyPayload"));
var _BodyContentType = _interopRequireDefault(require("./model/BodyContentType"));
var _BodyPart = _interopRequireDefault(require("./model/BodyPart"));
var _Campaign = _interopRequireDefault(require("./model/Campaign"));
var _CampaignOptions = _interopRequireDefault(require("./model/CampaignOptions"));
var _CampaignRecipient = _interopRequireDefault(require("./model/CampaignRecipient"));
var _CampaignStatus = _interopRequireDefault(require("./model/CampaignStatus"));
var _CampaignTemplate = _interopRequireDefault(require("./model/CampaignTemplate"));
var _ChannelLogStatusSummary = _interopRequireDefault(require("./model/ChannelLogStatusSummary"));
var _CompressionFormat = _interopRequireDefault(require("./model/CompressionFormat"));
var _ConsentData = _interopRequireDefault(require("./model/ConsentData"));
var _ConsentTracking = _interopRequireDefault(require("./model/ConsentTracking"));
var _Contact = _interopRequireDefault(require("./model/Contact"));
var _ContactActivity = _interopRequireDefault(require("./model/ContactActivity"));
var _ContactPayload = _interopRequireDefault(require("./model/ContactPayload"));
var _ContactSource = _interopRequireDefault(require("./model/ContactSource"));
var _ContactStatus = _interopRequireDefault(require("./model/ContactStatus"));
var _ContactUpdatePayload = _interopRequireDefault(require("./model/ContactUpdatePayload"));
var _ContactsList = _interopRequireDefault(require("./model/ContactsList"));
var _DeliveryOptimizationType = _interopRequireDefault(require("./model/DeliveryOptimizationType"));
var _EmailContent = _interopRequireDefault(require("./model/EmailContent"));
var _EmailData = _interopRequireDefault(require("./model/EmailData"));
var _EmailMessageData = _interopRequireDefault(require("./model/EmailMessageData"));
var _EmailRecipient = _interopRequireDefault(require("./model/EmailRecipient"));
var _EmailSend = _interopRequireDefault(require("./model/EmailSend"));
var _EmailStatus = _interopRequireDefault(require("./model/EmailStatus"));
var _EmailTransactionalMessageData = _interopRequireDefault(require("./model/EmailTransactionalMessageData"));
var _EmailValidationResult = _interopRequireDefault(require("./model/EmailValidationResult"));
var _EmailValidationStatus = _interopRequireDefault(require("./model/EmailValidationStatus"));
var _EmailView = _interopRequireDefault(require("./model/EmailView"));
var _EmailsPayload = _interopRequireDefault(require("./model/EmailsPayload"));
var _EncodingType = _interopRequireDefault(require("./model/EncodingType"));
var _EventType = _interopRequireDefault(require("./model/EventType"));
var _EventsOrderBy = _interopRequireDefault(require("./model/EventsOrderBy"));
var _ExportFileFormats = _interopRequireDefault(require("./model/ExportFileFormats"));
var _ExportLink = _interopRequireDefault(require("./model/ExportLink"));
var _ExportStatus = _interopRequireDefault(require("./model/ExportStatus"));
var _FileInfo = _interopRequireDefault(require("./model/FileInfo"));
var _FilePayload = _interopRequireDefault(require("./model/FilePayload"));
var _FileUploadResult = _interopRequireDefault(require("./model/FileUploadResult"));
var _InboundPayload = _interopRequireDefault(require("./model/InboundPayload"));
var _InboundRoute = _interopRequireDefault(require("./model/InboundRoute"));
var _InboundRouteActionType = _interopRequireDefault(require("./model/InboundRouteActionType"));
var _InboundRouteFilterType = _interopRequireDefault(require("./model/InboundRouteFilterType"));
var _ListPayload = _interopRequireDefault(require("./model/ListPayload"));
var _ListUpdatePayload = _interopRequireDefault(require("./model/ListUpdatePayload"));
var _LogJobStatus = _interopRequireDefault(require("./model/LogJobStatus"));
var _LogStatusSummary = _interopRequireDefault(require("./model/LogStatusSummary"));
var _MergeEmailPayload = _interopRequireDefault(require("./model/MergeEmailPayload"));
var _MessageAttachment = _interopRequireDefault(require("./model/MessageAttachment"));
var _MessageCategory = _interopRequireDefault(require("./model/MessageCategory"));
var _NewApiKey = _interopRequireDefault(require("./model/NewApiKey"));
var _NewSmtpCredentials = _interopRequireDefault(require("./model/NewSmtpCredentials"));
var _Options = _interopRequireDefault(require("./model/Options"));
var _RecipientEvent = _interopRequireDefault(require("./model/RecipientEvent"));
var _Segment = _interopRequireDefault(require("./model/Segment"));
var _SegmentPayload = _interopRequireDefault(require("./model/SegmentPayload"));
var _SmtpCredentials = _interopRequireDefault(require("./model/SmtpCredentials"));
var _SmtpCredentialsPayload = _interopRequireDefault(require("./model/SmtpCredentialsPayload"));
var _SortOrderItem = _interopRequireDefault(require("./model/SortOrderItem"));
var _SplitOptimizationType = _interopRequireDefault(require("./model/SplitOptimizationType"));
var _SplitOptions = _interopRequireDefault(require("./model/SplitOptions"));
var _SubAccountInfo = _interopRequireDefault(require("./model/SubAccountInfo"));
var _SubaccountEmailCreditsPayload = _interopRequireDefault(require("./model/SubaccountEmailCreditsPayload"));
var _SubaccountEmailSettings = _interopRequireDefault(require("./model/SubaccountEmailSettings"));
var _SubaccountEmailSettingsPayload = _interopRequireDefault(require("./model/SubaccountEmailSettingsPayload"));
var _SubaccountPayload = _interopRequireDefault(require("./model/SubaccountPayload"));
var _SubaccountSettingsInfo = _interopRequireDefault(require("./model/SubaccountSettingsInfo"));
var _SubaccountSettingsInfoPayload = _interopRequireDefault(require("./model/SubaccountSettingsInfoPayload"));
var _Suppression = _interopRequireDefault(require("./model/Suppression"));
var _Template = _interopRequireDefault(require("./model/Template"));
var _TemplatePayload = _interopRequireDefault(require("./model/TemplatePayload"));
var _TemplateScope = _interopRequireDefault(require("./model/TemplateScope"));
var _TemplateType = _interopRequireDefault(require("./model/TemplateType"));
var _TransactionalRecipient = _interopRequireDefault(require("./model/TransactionalRecipient"));
var _Utm = _interopRequireDefault(require("./model/Utm"));
var _VerificationFileResult = _interopRequireDefault(require("./model/VerificationFileResult"));
var _VerificationFileResultDetails = _interopRequireDefault(require("./model/VerificationFileResultDetails"));
var _VerificationStatus = _interopRequireDefault(require("./model/VerificationStatus"));
var _CampaignsApi = _interopRequireDefault(require("./api/CampaignsApi"));
var _ContactsApi = _interopRequireDefault(require("./api/ContactsApi"));
var _EmailsApi = _interopRequireDefault(require("./api/EmailsApi"));
var _EventsApi = _interopRequireDefault(require("./api/EventsApi"));
var _FilesApi = _interopRequireDefault(require("./api/FilesApi"));
var _InboundRouteApi = _interopRequireDefault(require("./api/InboundRouteApi"));
var _ListsApi = _interopRequireDefault(require("./api/ListsApi"));
var _SecurityApi = _interopRequireDefault(require("./api/SecurityApi"));
var _SegmentsApi = _interopRequireDefault(require("./api/SegmentsApi"));
var _StatisticsApi = _interopRequireDefault(require("./api/StatisticsApi"));
var _SubAccountsApi = _interopRequireDefault(require("./api/SubAccountsApi"));
var _SuppressionsApi = _interopRequireDefault(require("./api/SuppressionsApi"));
var _TemplatesApi = _interopRequireDefault(require("./api/TemplatesApi"));
var _VerificationsApi = _interopRequireDefault(require("./api/VerificationsApi"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
},{"./ApiClient":1,"./api/CampaignsApi":2,"./api/ContactsApi":3,"./api/EmailsApi":4,"./api/EventsApi":5,"./api/FilesApi":6,"./api/InboundRouteApi":7,"./api/ListsApi":8,"./api/SecurityApi":9,"./api/SegmentsApi":10,"./api/StatisticsApi":11,"./api/SubAccountsApi":12,"./api/SuppressionsApi":13,"./api/TemplatesApi":14,"./api/VerificationsApi":15,"./model/AccessLevel":17,"./model/AccountStatusEnum":18,"./model/ApiKey":19,"./model/ApiKeyPayload":20,"./model/BodyContentType":21,"./model/BodyPart":22,"./model/Campaign":23,"./model/CampaignOptions":24,"./model/CampaignRecipient":25,"./model/CampaignStatus":26,"./model/CampaignTemplate":27,"./model/ChannelLogStatusSummary":28,"./model/CompressionFormat":29,"./model/ConsentData":30,"./model/ConsentTracking":31,"./model/Contact":32,"./model/ContactActivity":33,"./model/ContactPayload":34,"./model/ContactSource":35,"./model/ContactStatus":36,"./model/ContactUpdatePayload":37,"./model/ContactsList":38,"./model/DeliveryOptimizationType":39,"./model/EmailContent":40,"./model/EmailData":41,"./model/EmailMessageData":42,"./model/EmailRecipient":43,"./model/EmailSend":44,"./model/EmailStatus":45,"./model/EmailTransactionalMessageData":46,"./model/EmailValidationResult":47,"./model/EmailValidationStatus":48,"./model/EmailView":49,"./model/EmailsPayload":50,"./model/EncodingType":51,"./model/EventType":52,"./model/EventsOrderBy":53,"./model/ExportFileFormats":54,"./model/ExportLink":55,"./model/ExportStatus":56,"./model/FileInfo":57,"./model/FilePayload":58,"./model/FileUploadResult":59,"./model/InboundPayload":60,"./model/InboundRoute":61,"./model/InboundRouteActionType":62,"./model/InboundRouteFilterType":63,"./model/ListPayload":64,"./model/ListUpdatePayload":65,"./model/LogJobStatus":66,"./model/LogStatusSummary":67,"./model/MergeEmailPayload":68,"./model/MessageAttachment":69,"./model/MessageCategory":70,"./model/NewApiKey":71,"./model/NewSmtpCredentials":72,"./model/Options":73,"./model/RecipientEvent":74,"./model/Segment":75,"./model/SegmentPayload":76,"./model/SmtpCredentials":77,"./model/SmtpCredentialsPayload":78,"./model/SortOrderItem":79,"./model/SplitOptimizationType":80,"./model/SplitOptions":81,"./model/SubAccountInfo":82,"./model/SubaccountEmailCreditsPayload":83,"./model/SubaccountEmailSettings":84,"./model/SubaccountEmailSettingsPayload":85,"./model/SubaccountPayload":86,"./model/SubaccountSettingsInfo":87,"./model/SubaccountSettingsInfoPayload":88,"./model/Suppression":89,"./model/Template":90,"./model/TemplatePayload":91,"./model/TemplateScope":92,"./model/TemplateType":93,"./model/TransactionalRecipient":94,"./model/Utm":95,"./model/VerificationFileResult":96,"./model/VerificationFileResultDetails":97,"./model/VerificationStatus":98}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
* Enum class AccessLevel.
* @enum {}
* @readonly
*/
var AccessLevel = /*#__PURE__*/function () {
  function AccessLevel() {
    _classCallCheck(this, AccessLevel);
    _defineProperty(this, "None", "None");
    _defineProperty(this, "ViewAccount", "ViewAccount");
    _defineProperty(this, "ViewContacts", "ViewContacts");
    _defineProperty(this, "ViewForms", "ViewForms");
    _defineProperty(this, "ViewTemplates", "ViewTemplates");
    _defineProperty(this, "ViewCampaigns", "ViewCampaigns");
    _defineProperty(this, "ViewChannels", "ViewChannels");
    _defineProperty(this, "ViewAutomations", "ViewAutomations");
    _defineProperty(this, "ViewSurveys", "ViewSurveys");
    _defineProperty(this, "ViewSettings", "ViewSettings");
    _defineProperty(this, "ViewBilling", "ViewBilling");
    _defineProperty(this, "ViewSubAccounts", "ViewSubAccounts");
    _defineProperty(this, "ViewUsers", "ViewUsers");
    _defineProperty(this, "ViewFiles", "ViewFiles");
    _defineProperty(this, "ViewReports", "ViewReports");
    _defineProperty(this, "ModifyAccount", "ModifyAccount");
    _defineProperty(this, "ModifyContacts", "ModifyContacts");
    _defineProperty(this, "ModifyForms", "ModifyForms");
    _defineProperty(this, "ModifyTemplates", "ModifyTemplates");
    _defineProperty(this, "ModifyCampaigns", "ModifyCampaigns");
    _defineProperty(this, "ModifyChannels", "ModifyChannels");
    _defineProperty(this, "ModifyAutomations", "ModifyAutomations");
    _defineProperty(this, "ModifySurveys", "ModifySurveys");
    _defineProperty(this, "ModifyFiles", "ModifyFiles");
    _defineProperty(this, "Export", "Export");
    _defineProperty(this, "SendSmtp", "SendSmtp");
    _defineProperty(this, "SendSMS", "SendSMS");
    _defineProperty(this, "ModifySettings", "ModifySettings");
    _defineProperty(this, "ModifyBilling", "ModifyBilling");
    _defineProperty(this, "ModifyProfile", "ModifyProfile");
    _defineProperty(this, "ModifySubAccounts", "ModifySubAccounts");
    _defineProperty(this, "ModifyUsers", "ModifyUsers");
    _defineProperty(this, "Security", "Security");
    _defineProperty(this, "ModifyLanguage", "ModifyLanguage");
    _defineProperty(this, "ViewSupport", "ViewSupport");
    _defineProperty(this, "SendHttp", "SendHttp");
    _defineProperty(this, "Modify2FA", "Modify2FA");
    _defineProperty(this, "ModifySupport", "ModifySupport");
    _defineProperty(this, "ViewCustomFields", "ViewCustomFields");
    _defineProperty(this, "ModifyCustomFields", "ModifyCustomFields");
    _defineProperty(this, "ModifyWebNotifications", "ModifyWebNotifications");
    _defineProperty(this, "ExtendedLogs", "ExtendedLogs");
    _defineProperty(this, "VerifyEmails", "VerifyEmails");
    _defineProperty(this, "DisableContactsStore", "DisableContactsStore");
    _defineProperty(this, "ModifyLandingPages", "ModifyLandingPages");
    _defineProperty(this, "ViewLandingPages", "ViewLandingPages");
    _defineProperty(this, "ModifySuppressions", "ModifySuppressions");
    _defineProperty(this, "ViewSuppressions", "ViewSuppressions");
  }
  _createClass(AccessLevel, null, [{
    key: "constructFromObject",
    value:
    /**
    * Returns a <code>AccessLevel</code> enum value from a Javascript object name.
    * @param {Object} data The plain JavaScript object containing the name of the enum value.
    * @return {module:model/AccessLevel} The enum <code>AccessLevel</code> value.
    */
    function constructFromObject(object) {
      return object;
    }
  }]);
  return AccessLevel;
}();
exports["default"] = AccessLevel;
},{"../ApiClient":1}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
* Enum class AccountStatusEnum.
* @enum {}
* @readonly
*/
var AccountStatusEnum = /*#__PURE__*/function () {
  function AccountStatusEnum() {
    _classCallCheck(this, AccountStatusEnum);
    _defineProperty(this, "Disabled", "Disabled");
    _defineProperty(this, "UnderReview", "UnderReview");
    _defineProperty(this, "NeverSignedIn", "NeverSignedIn");
    _defineProperty(this, "Active", "Active");
  }
  _createClass(AccountStatusEnum, null, [{
    key: "constructFromObject",
    value:
    /**
    * Returns a <code>AccountStatusEnum</code> enum value from a Javascript object name.
    * @param {Object} data The plain JavaScript object containing the name of the enum value.
    * @return {module:model/AccountStatusEnum} The enum <code>AccountStatusEnum</code> value.
    */
    function constructFromObject(object) {
      return object;
    }
  }]);
  return AccountStatusEnum;
}();
exports["default"] = AccountStatusEnum;
},{"../ApiClient":1}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _AccessLevel = _interopRequireDefault(require("./AccessLevel"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * The ApiKey model module.
 * @module model/ApiKey
 * @version 4.0.23
 */
var ApiKey = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>ApiKey</code>.
   * ApiKey info
   * @alias module:model/ApiKey
   */
  function ApiKey() {
    _classCallCheck(this, ApiKey);
    ApiKey.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  _createClass(ApiKey, null, [{
    key: "initialize",
    value: function initialize(obj) {}

    /**
     * Constructs a <code>ApiKey</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ApiKey} obj Optional instance to populate.
     * @return {module:model/ApiKey} The populated <code>ApiKey</code> instance.
     */
  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new ApiKey();
        if (data.hasOwnProperty('AccessLevel')) {
          obj['AccessLevel'] = _ApiClient["default"].convertToType(data['AccessLevel'], [_AccessLevel["default"]]);
        }
        if (data.hasOwnProperty('Name')) {
          obj['Name'] = _ApiClient["default"].convertToType(data['Name'], 'String');
        }
        if (data.hasOwnProperty('DateCreated')) {
          obj['DateCreated'] = _ApiClient["default"].convertToType(data['DateCreated'], 'Date');
        }
        if (data.hasOwnProperty('LastUse')) {
          obj['LastUse'] = _ApiClient["default"].convertToType(data['LastUse'], 'Date');
        }
        if (data.hasOwnProperty('Expires')) {
          obj['Expires'] = _ApiClient["default"].convertToType(data['Expires'], 'Date');
        }
        if (data.hasOwnProperty('RestrictAccessToIPRange')) {
          obj['RestrictAccessToIPRange'] = _ApiClient["default"].convertToType(data['RestrictAccessToIPRange'], ['String']);
        }
      }
      return obj;
    }

    /**
     * Validates the JSON data with respect to <code>ApiKey</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>ApiKey</code>.
     */
  }, {
    key: "validateJSON",
    value: function validateJSON(data) {
      // ensure the json data is an array
      if (!Array.isArray(data['AccessLevel'])) {
        throw new Error("Expected the field `AccessLevel` to be an array in the JSON data but got " + data['AccessLevel']);
      }
      // ensure the json data is a string
      if (data['Name'] && !(typeof data['Name'] === 'string' || data['Name'] instanceof String)) {
        throw new Error("Expected the field `Name` to be a primitive type in the JSON string but got " + data['Name']);
      }
      // ensure the json data is an array
      if (!Array.isArray(data['RestrictAccessToIPRange'])) {
        throw new Error("Expected the field `RestrictAccessToIPRange` to be an array in the JSON data but got " + data['RestrictAccessToIPRange']);
      }
      return true;
    }
  }]);
  return ApiKey;
}();
/**
 * Access level or permission to be assigned to this ApiKey.
 * @member {Array.<module:model/AccessLevel>} AccessLevel
 */
ApiKey.prototype['AccessLevel'] = undefined;

/**
 * Name of the ApiKey.
 * @member {String} Name
 */
ApiKey.prototype['Name'] = undefined;

/**
 * Date this ApiKey was created.
 * @member {Date} DateCreated
 */
ApiKey.prototype['DateCreated'] = undefined;

/**
 * Date this ApiKey was last used.
 * @member {Date} LastUse
 */
ApiKey.prototype['LastUse'] = undefined;

/**
 * Date this ApiKey expires.
 * @member {Date} Expires
 */
ApiKey.prototype['Expires'] = undefined;

/**
 * Which IPs can use this ApiKey
 * @member {Array.<String>} RestrictAccessToIPRange
 */
ApiKey.prototype['RestrictAccessToIPRange'] = undefined;
var _default = ApiKey;
exports["default"] = _default;
},{"../ApiClient":1,"./AccessLevel":17}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _AccessLevel = _interopRequireDefault(require("./AccessLevel"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * The ApiKeyPayload model module.
 * @module model/ApiKeyPayload
 * @version 4.0.23
 */
var ApiKeyPayload = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>ApiKeyPayload</code>.
   * Create a new ApiKey
   * @alias module:model/ApiKeyPayload
   * @param name {String} Name of the ApiKey for ease of reference.
   * @param accessLevel {Array.<module:model/AccessLevel>} Access level or permission to be assigned to this ApiKey.
   */
  function ApiKeyPayload(name, accessLevel) {
    _classCallCheck(this, ApiKeyPayload);
    ApiKeyPayload.initialize(this, name, accessLevel);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  _createClass(ApiKeyPayload, null, [{
    key: "initialize",
    value: function initialize(obj, name, accessLevel) {
      obj['Name'] = name;
      obj['AccessLevel'] = accessLevel;
    }

    /**
     * Constructs a <code>ApiKeyPayload</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ApiKeyPayload} obj Optional instance to populate.
     * @return {module:model/ApiKeyPayload} The populated <code>ApiKeyPayload</code> instance.
     */
  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new ApiKeyPayload();
        if (data.hasOwnProperty('Name')) {
          obj['Name'] = _ApiClient["default"].convertToType(data['Name'], 'String');
        }
        if (data.hasOwnProperty('AccessLevel')) {
          obj['AccessLevel'] = _ApiClient["default"].convertToType(data['AccessLevel'], [_AccessLevel["default"]]);
        }
        if (data.hasOwnProperty('Expires')) {
          obj['Expires'] = _ApiClient["default"].convertToType(data['Expires'], 'Date');
        }
        if (data.hasOwnProperty('RestrictAccessToIPRange')) {
          obj['RestrictAccessToIPRange'] = _ApiClient["default"].convertToType(data['RestrictAccessToIPRange'], ['String']);
        }
        if (data.hasOwnProperty('Subaccount')) {
          obj['Subaccount'] = _ApiClient["default"].convertToType(data['Subaccount'], 'String');
        }
      }
      return obj;
    }

    /**
     * Validates the JSON data with respect to <code>ApiKeyPayload</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>ApiKeyPayload</code>.
     */
  }, {
    key: "validateJSON",
    value: function validateJSON(data) {
      // check to make sure all required properties are present in the JSON string
      var _iterator = _createForOfIteratorHelper(ApiKeyPayload.RequiredProperties),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var property = _step.value;
          if (!data[property]) {
            throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
          }
        }
        // ensure the json data is a string
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      if (data['Name'] && !(typeof data['Name'] === 'string' || data['Name'] instanceof String)) {
        throw new Error("Expected the field `Name` to be a primitive type in the JSON string but got " + data['Name']);
      }
      // ensure the json data is an array
      if (!Array.isArray(data['AccessLevel'])) {
        throw new Error("Expected the field `AccessLevel` to be an array in the JSON data but got " + data['AccessLevel']);
      }
      // ensure the json data is an array
      if (!Array.isArray(data['RestrictAccessToIPRange'])) {
        throw new Error("Expected the field `RestrictAccessToIPRange` to be an array in the JSON data but got " + data['RestrictAccessToIPRange']);
      }
      // ensure the json data is a string
      if (data['Subaccount'] && !(typeof data['Subaccount'] === 'string' || data['Subaccount'] instanceof String)) {
        throw new Error("Expected the field `Subaccount` to be a primitive type in the JSON string but got " + data['Subaccount']);
      }
      return true;
    }
  }]);
  return ApiKeyPayload;
}();
ApiKeyPayload.RequiredProperties = ["Name", "AccessLevel"];

/**
 * Name of the ApiKey for ease of reference.
 * @member {String} Name
 */
ApiKeyPayload.prototype['Name'] = undefined;

/**
 * Access level or permission to be assigned to this ApiKey.
 * @member {Array.<module:model/AccessLevel>} AccessLevel
 */
ApiKeyPayload.prototype['AccessLevel'] = undefined;

/**
 * Date this ApiKey expires.
 * @member {Date} Expires
 */
ApiKeyPayload.prototype['Expires'] = undefined;

/**
 * Which IPs can use this ApiKey
 * @member {Array.<String>} RestrictAccessToIPRange
 */
ApiKeyPayload.prototype['RestrictAccessToIPRange'] = undefined;

/**
 * Email of the subaccount for which this ApiKey should be created
 * @member {String} Subaccount
 */
ApiKeyPayload.prototype['Subaccount'] = undefined;
var _default = ApiKeyPayload;
exports["default"] = _default;
},{"../ApiClient":1,"./AccessLevel":17}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
* Enum class BodyContentType.
* @enum {}
* @readonly
*/
var BodyContentType = /*#__PURE__*/function () {
  function BodyContentType() {
    _classCallCheck(this, BodyContentType);
    _defineProperty(this, "HTML", "HTML");
    _defineProperty(this, "PlainText", "PlainText");
    _defineProperty(this, "AMP", "AMP");
    _defineProperty(this, "CSS", "CSS");
  }
  _createClass(BodyContentType, null, [{
    key: "constructFromObject",
    value:
    /**
    * Returns a <code>BodyContentType</code> enum value from a Javascript object name.
    * @param {Object} data The plain JavaScript object containing the name of the enum value.
    * @return {module:model/BodyContentType} The enum <code>BodyContentType</code> value.
    */
    function constructFromObject(object) {
      return object;
    }
  }]);
  return BodyContentType;
}();
exports["default"] = BodyContentType;
},{"../ApiClient":1}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _BodyContentType = _interopRequireDefault(require("./BodyContentType"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * The BodyPart model module.
 * @module model/BodyPart
 * @version 4.0.23
 */
var BodyPart = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>BodyPart</code>.
   * Email body part with user-provided MIME type (text/html, text/plain, etc)
   * @alias module:model/BodyPart
   * @param contentType {module:model/BodyContentType} 
   */
  function BodyPart(contentType) {
    _classCallCheck(this, BodyPart);
    BodyPart.initialize(this, contentType);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  _createClass(BodyPart, null, [{
    key: "initialize",
    value: function initialize(obj, contentType) {
      obj['ContentType'] = contentType;
    }

    /**
     * Constructs a <code>BodyPart</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/BodyPart} obj Optional instance to populate.
     * @return {module:model/BodyPart} The populated <code>BodyPart</code> instance.
     */
  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new BodyPart();
        if (data.hasOwnProperty('ContentType')) {
          obj['ContentType'] = _BodyContentType["default"].constructFromObject(data['ContentType']);
        }
        if (data.hasOwnProperty('Content')) {
          obj['Content'] = _ApiClient["default"].convertToType(data['Content'], 'String');
        }
        if (data.hasOwnProperty('Charset')) {
          obj['Charset'] = _ApiClient["default"].convertToType(data['Charset'], 'String');
        }
      }
      return obj;
    }

    /**
     * Validates the JSON data with respect to <code>BodyPart</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>BodyPart</code>.
     */
  }, {
    key: "validateJSON",
    value: function validateJSON(data) {
      // check to make sure all required properties are present in the JSON string
      var _iterator = _createForOfIteratorHelper(BodyPart.RequiredProperties),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var property = _step.value;
          if (!data[property]) {
            throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
          }
        }
        // ensure the json data is a string
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      if (data['Content'] && !(typeof data['Content'] === 'string' || data['Content'] instanceof String)) {
        throw new Error("Expected the field `Content` to be a primitive type in the JSON string but got " + data['Content']);
      }
      // ensure the json data is a string
      if (data['Charset'] && !(typeof data['Charset'] === 'string' || data['Charset'] instanceof String)) {
        throw new Error("Expected the field `Charset` to be a primitive type in the JSON string but got " + data['Charset']);
      }
      return true;
    }
  }]);
  return BodyPart;
}();
BodyPart.RequiredProperties = ["ContentType"];

/**
 * @member {module:model/BodyContentType} ContentType
 */
BodyPart.prototype['ContentType'] = undefined;

/**
 * Actual content of the body part
 * @member {String} Content
 */
BodyPart.prototype['Content'] = undefined;

/**
 * Text value of charset encoding for example: iso-8859-1, windows-1251, utf-8, us-ascii, windows-1250 and more…
 * @member {String} Charset
 */
BodyPart.prototype['Charset'] = undefined;
var _default = BodyPart;
exports["default"] = _default;
},{"../ApiClient":1,"./BodyContentType":21}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _CampaignOptions = _interopRequireDefault(require("./CampaignOptions"));
var _CampaignRecipient = _interopRequireDefault(require("./CampaignRecipient"));
var _CampaignStatus = _interopRequireDefault(require("./CampaignStatus"));
var _CampaignTemplate = _interopRequireDefault(require("./CampaignTemplate"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * The Campaign model module.
 * @module model/Campaign
 * @version 4.0.23
 */
var Campaign = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>Campaign</code>.
   * @alias module:model/Campaign
   * @param name {String} Campaign name
   * @param recipients {module:model/CampaignRecipient} 
   */
  function Campaign(name, recipients) {
    _classCallCheck(this, Campaign);
    Campaign.initialize(this, name, recipients);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  _createClass(Campaign, null, [{
    key: "initialize",
    value: function initialize(obj, name, recipients) {
      obj['Name'] = name;
      obj['Recipients'] = recipients;
    }

    /**
     * Constructs a <code>Campaign</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Campaign} obj Optional instance to populate.
     * @return {module:model/Campaign} The populated <code>Campaign</code> instance.
     */
  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new Campaign();
        if (data.hasOwnProperty('Content')) {
          obj['Content'] = _ApiClient["default"].convertToType(data['Content'], [_CampaignTemplate["default"]]);
        }
        if (data.hasOwnProperty('Name')) {
          obj['Name'] = _ApiClient["default"].convertToType(data['Name'], 'String');
        }
        if (data.hasOwnProperty('Status')) {
          obj['Status'] = _CampaignStatus["default"].constructFromObject(data['Status']);
        }
        if (data.hasOwnProperty('Recipients')) {
          obj['Recipients'] = _CampaignRecipient["default"].constructFromObject(data['Recipients']);
        }
        if (data.hasOwnProperty('Options')) {
          obj['Options'] = _CampaignOptions["default"].constructFromObject(data['Options']);
        }
      }
      return obj;
    }

    /**
     * Validates the JSON data with respect to <code>Campaign</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>Campaign</code>.
     */
  }, {
    key: "validateJSON",
    value: function validateJSON(data) {
      // check to make sure all required properties are present in the JSON string
      var _iterator = _createForOfIteratorHelper(Campaign.RequiredProperties),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var property = _step.value;
          if (!data[property]) {
            throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      if (data['Content']) {
        // data not null
        // ensure the json data is an array
        if (!Array.isArray(data['Content'])) {
          throw new Error("Expected the field `Content` to be an array in the JSON data but got " + data['Content']);
        }
        // validate the optional field `Content` (array)
        var _iterator2 = _createForOfIteratorHelper(data['Content']),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var item = _step2.value;
            _CampaignTemplate["default"].validateJsonObject(item);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
        ;
      }
      // ensure the json data is a string
      if (data['Name'] && !(typeof data['Name'] === 'string' || data['Name'] instanceof String)) {
        throw new Error("Expected the field `Name` to be a primitive type in the JSON string but got " + data['Name']);
      }
      // validate the optional field `Recipients`
      if (data['Recipients']) {
        // data not null
        _CampaignRecipient["default"].validateJSON(data['Recipients']);
      }
      // validate the optional field `Options`
      if (data['Options']) {
        // data not null
        _CampaignOptions["default"].validateJSON(data['Options']);
      }
      return true;
    }
  }]);
  return Campaign;
}();
Campaign.RequiredProperties = ["Name", "Recipients"];

/**
 * Campaign's email content. Provide multiple items to send an A/X Split Campaign
 * @member {Array.<module:model/CampaignTemplate>} Content
 */
Campaign.prototype['Content'] = undefined;

/**
 * Campaign name
 * @member {String} Name
 */
Campaign.prototype['Name'] = undefined;

/**
 * @member {module:model/CampaignStatus} Status
 */
Campaign.prototype['Status'] = undefined;

/**
 * @member {module:model/CampaignRecipient} Recipients
 */
Campaign.prototype['Recipients'] = undefined;

/**
 * @member {module:model/CampaignOptions} Options
 */
Campaign.prototype['Options'] = undefined;
var _default = Campaign;
exports["default"] = _default;
},{"../ApiClient":1,"./CampaignOptions":24,"./CampaignRecipient":25,"./CampaignStatus":26,"./CampaignTemplate":27}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _DeliveryOptimizationType = _interopRequireDefault(require("./DeliveryOptimizationType"));
var _SplitOptions = _interopRequireDefault(require("./SplitOptions"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * The CampaignOptions model module.
 * @module model/CampaignOptions
 * @version 4.0.23
 */
var CampaignOptions = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>CampaignOptions</code>.
   * Different send options for a Campaign
   * @alias module:model/CampaignOptions
   */
  function CampaignOptions() {
    _classCallCheck(this, CampaignOptions);
    CampaignOptions.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  _createClass(CampaignOptions, null, [{
    key: "initialize",
    value: function initialize(obj) {}

    /**
     * Constructs a <code>CampaignOptions</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/CampaignOptions} obj Optional instance to populate.
     * @return {module:model/CampaignOptions} The populated <code>CampaignOptions</code> instance.
     */
  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new CampaignOptions();
        if (data.hasOwnProperty('DeliveryOptimization')) {
          obj['DeliveryOptimization'] = _DeliveryOptimizationType["default"].constructFromObject(data['DeliveryOptimization']);
        }
        if (data.hasOwnProperty('TrackOpens')) {
          obj['TrackOpens'] = _ApiClient["default"].convertToType(data['TrackOpens'], 'Boolean');
        }
        if (data.hasOwnProperty('TrackClicks')) {
          obj['TrackClicks'] = _ApiClient["default"].convertToType(data['TrackClicks'], 'Boolean');
        }
        if (data.hasOwnProperty('ScheduleFor')) {
          obj['ScheduleFor'] = _ApiClient["default"].convertToType(data['ScheduleFor'], 'Date');
        }
        if (data.hasOwnProperty('SplitOptions')) {
          obj['SplitOptions'] = _SplitOptions["default"].constructFromObject(data['SplitOptions']);
        }
      }
      return obj;
    }

    /**
     * Validates the JSON data with respect to <code>CampaignOptions</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>CampaignOptions</code>.
     */
  }, {
    key: "validateJSON",
    value: function validateJSON(data) {
      // validate the optional field `SplitOptions`
      if (data['SplitOptions']) {
        // data not null
        _SplitOptions["default"].validateJSON(data['SplitOptions']);
      }
      return true;
    }
  }]);
  return CampaignOptions;
}();
/**
 * @member {module:model/DeliveryOptimizationType} DeliveryOptimization
 */
CampaignOptions.prototype['DeliveryOptimization'] = undefined;

/**
 * Should the opens be tracked? If no value has been provided, Account's default setting will be used.
 * @member {Boolean} TrackOpens
 */
CampaignOptions.prototype['TrackOpens'] = undefined;

/**
 * Should the clicks be tracked? If no value has been provided, Account's default setting will be used.
 * @member {Boolean} TrackClicks
 */
CampaignOptions.prototype['TrackClicks'] = undefined;

/**
 * Date when this Campaign is scheduled to be sent on
 * @member {Date} ScheduleFor
 */
CampaignOptions.prototype['ScheduleFor'] = undefined;

/**
 * @member {module:model/SplitOptions} SplitOptions
 */
CampaignOptions.prototype['SplitOptions'] = undefined;
var _default = CampaignOptions;
exports["default"] = _default;
},{"../ApiClient":1,"./DeliveryOptimizationType":39,"./SplitOptions":81}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * The CampaignRecipient model module.
 * @module model/CampaignRecipient
 * @version 4.0.23
 */
var CampaignRecipient = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>CampaignRecipient</code>.
   * A set of lists and segments names to read recipients from
   * @alias module:model/CampaignRecipient
   */
  function CampaignRecipient() {
    _classCallCheck(this, CampaignRecipient);
    CampaignRecipient.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  _createClass(CampaignRecipient, null, [{
    key: "initialize",
    value: function initialize(obj) {}

    /**
     * Constructs a <code>CampaignRecipient</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/CampaignRecipient} obj Optional instance to populate.
     * @return {module:model/CampaignRecipient} The populated <code>CampaignRecipient</code> instance.
     */
  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new CampaignRecipient();
        if (data.hasOwnProperty('ListNames')) {
          obj['ListNames'] = _ApiClient["default"].convertToType(data['ListNames'], ['String']);
        }
        if (data.hasOwnProperty('SegmentNames')) {
          obj['SegmentNames'] = _ApiClient["default"].convertToType(data['SegmentNames'], ['String']);
        }
      }
      return obj;
    }

    /**
     * Validates the JSON data with respect to <code>CampaignRecipient</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>CampaignRecipient</code>.
     */
  }, {
    key: "validateJSON",
    value: function validateJSON(data) {
      // ensure the json data is an array
      if (!Array.isArray(data['ListNames'])) {
        throw new Error("Expected the field `ListNames` to be an array in the JSON data but got " + data['ListNames']);
      }
      // ensure the json data is an array
      if (!Array.isArray(data['SegmentNames'])) {
        throw new Error("Expected the field `SegmentNames` to be an array in the JSON data but got " + data['SegmentNames']);
      }
      return true;
    }
  }]);
  return CampaignRecipient;
}();
/**
 * Names of lists from your Account to read recipients from
 * @member {Array.<String>} ListNames
 */
CampaignRecipient.prototype['ListNames'] = undefined;

/**
 * Names of segments from your Account to read recipients from
 * @member {Array.<String>} SegmentNames
 */
CampaignRecipient.prototype['SegmentNames'] = undefined;
var _default = CampaignRecipient;
exports["default"] = _default;
},{"../ApiClient":1}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
* Enum class CampaignStatus.
* @enum {}
* @readonly
*/
var CampaignStatus = /*#__PURE__*/function () {
  function CampaignStatus() {
    _classCallCheck(this, CampaignStatus);
    _defineProperty(this, "Deleted", "Deleted");
    _defineProperty(this, "Active", "Active");
    _defineProperty(this, "Processing", "Processing");
    _defineProperty(this, "Sending", "Sending");
    _defineProperty(this, "Completed", "Completed");
    _defineProperty(this, "Paused", "Paused");
    _defineProperty(this, "Cancelled", "Cancelled");
    _defineProperty(this, "Draft", "Draft");
  }
  _createClass(CampaignStatus, null, [{
    key: "constructFromObject",
    value:
    /**
    * Returns a <code>CampaignStatus</code> enum value from a Javascript object name.
    * @param {Object} data The plain JavaScript object containing the name of the enum value.
    * @return {module:model/CampaignStatus} The enum <code>CampaignStatus</code> value.
    */
    function constructFromObject(object) {
      return object;
    }
  }]);
  return CampaignStatus;
}();
exports["default"] = CampaignStatus;
},{"../ApiClient":1}],27:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _Utm = _interopRequireDefault(require("./Utm"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * The CampaignTemplate model module.
 * @module model/CampaignTemplate
 * @version 4.0.23
 */
var CampaignTemplate = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>CampaignTemplate</code>.
   * Content of a Campaign
   * @alias module:model/CampaignTemplate
   */
  function CampaignTemplate() {
    _classCallCheck(this, CampaignTemplate);
    CampaignTemplate.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  _createClass(CampaignTemplate, null, [{
    key: "initialize",
    value: function initialize(obj) {}

    /**
     * Constructs a <code>CampaignTemplate</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/CampaignTemplate} obj Optional instance to populate.
     * @return {module:model/CampaignTemplate} The populated <code>CampaignTemplate</code> instance.
     */
  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new CampaignTemplate();
        if (data.hasOwnProperty('Poolname')) {
          obj['Poolname'] = _ApiClient["default"].convertToType(data['Poolname'], 'String');
        }
        if (data.hasOwnProperty('From')) {
          obj['From'] = _ApiClient["default"].convertToType(data['From'], 'String');
        }
        if (data.hasOwnProperty('ReplyTo')) {
          obj['ReplyTo'] = _ApiClient["default"].convertToType(data['ReplyTo'], 'String');
        }
        if (data.hasOwnProperty('Subject')) {
          obj['Subject'] = _ApiClient["default"].convertToType(data['Subject'], 'String');
        }
        if (data.hasOwnProperty('TemplateName')) {
          obj['TemplateName'] = _ApiClient["default"].convertToType(data['TemplateName'], 'String');
        }
        if (data.hasOwnProperty('AttachFiles')) {
          obj['AttachFiles'] = _ApiClient["default"].convertToType(data['AttachFiles'], ['String']);
        }
        if (data.hasOwnProperty('Utm')) {
          obj['Utm'] = _Utm["default"].constructFromObject(data['Utm']);
        }
      }
      return obj;
    }

    /**
     * Validates the JSON data with respect to <code>CampaignTemplate</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>CampaignTemplate</code>.
     */
  }, {
    key: "validateJSON",
    value: function validateJSON(data) {
      // ensure the json data is a string
      if (data['Poolname'] && !(typeof data['Poolname'] === 'string' || data['Poolname'] instanceof String)) {
        throw new Error("Expected the field `Poolname` to be a primitive type in the JSON string but got " + data['Poolname']);
      }
      // ensure the json data is a string
      if (data['From'] && !(typeof data['From'] === 'string' || data['From'] instanceof String)) {
        throw new Error("Expected the field `From` to be a primitive type in the JSON string but got " + data['From']);
      }
      // ensure the json data is a string
      if (data['ReplyTo'] && !(typeof data['ReplyTo'] === 'string' || data['ReplyTo'] instanceof String)) {
        throw new Error("Expected the field `ReplyTo` to be a primitive type in the JSON string but got " + data['ReplyTo']);
      }
      // ensure the json data is a string
      if (data['Subject'] && !(typeof data['Subject'] === 'string' || data['Subject'] instanceof String)) {
        throw new Error("Expected the field `Subject` to be a primitive type in the JSON string but got " + data['Subject']);
      }
      // ensure the json data is a string
      if (data['TemplateName'] && !(typeof data['TemplateName'] === 'string' || data['TemplateName'] instanceof String)) {
        throw new Error("Expected the field `TemplateName` to be a primitive type in the JSON string but got " + data['TemplateName']);
      }
      // ensure the json data is an array
      if (!Array.isArray(data['AttachFiles'])) {
        throw new Error("Expected the field `AttachFiles` to be an array in the JSON data but got " + data['AttachFiles']);
      }
      // validate the optional field `Utm`
      if (data['Utm']) {
        // data not null
        _Utm["default"].validateJSON(data['Utm']);
      }
      return true;
    }
  }]);
  return CampaignTemplate;
}();
/**
 * Name of your custom IP Pool to be used in the sending process
 * @member {String} Poolname
 */
CampaignTemplate.prototype['Poolname'] = undefined;

/**
 * Your e-mail with an optional name (e.g.: John Doe <email@domain.com>)
 * @member {String} From
 */
CampaignTemplate.prototype['From'] = undefined;

/**
 * To what address should the recipients reply to (e.g. John Doe <email@domain.com>)
 * @member {String} ReplyTo
 */
CampaignTemplate.prototype['ReplyTo'] = undefined;

/**
 * Default subject of email.
 * @member {String} Subject
 */
CampaignTemplate.prototype['Subject'] = undefined;

/**
 * Name of template.
 * @member {String} TemplateName
 */
CampaignTemplate.prototype['TemplateName'] = undefined;

/**
 * Names of previously uploaded files that should be sent as downloadable attachments
 * @member {Array.<String>} AttachFiles
 */
CampaignTemplate.prototype['AttachFiles'] = undefined;

/**
 * @member {module:model/Utm} Utm
 */
CampaignTemplate.prototype['Utm'] = undefined;
var _default = CampaignTemplate;
exports["default"] = _default;
},{"../ApiClient":1,"./Utm":95}],28:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * The ChannelLogStatusSummary model module.
 * @module model/ChannelLogStatusSummary
 * @version 4.0.23
 */
var ChannelLogStatusSummary = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>ChannelLogStatusSummary</code>.
   * Summary of channel log status
   * @alias module:model/ChannelLogStatusSummary
   */
  function ChannelLogStatusSummary() {
    _classCallCheck(this, ChannelLogStatusSummary);
    ChannelLogStatusSummary.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  _createClass(ChannelLogStatusSummary, null, [{
    key: "initialize",
    value: function initialize(obj) {}

    /**
     * Constructs a <code>ChannelLogStatusSummary</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ChannelLogStatusSummary} obj Optional instance to populate.
     * @return {module:model/ChannelLogStatusSummary} The populated <code>ChannelLogStatusSummary</code> instance.
     */
  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new ChannelLogStatusSummary();
        if (data.hasOwnProperty('ChannelName')) {
          obj['ChannelName'] = _ApiClient["default"].convertToType(data['ChannelName'], 'String');
        }
        if (data.hasOwnProperty('Recipients')) {
          obj['Recipients'] = _ApiClient["default"].convertToType(data['Recipients'], 'Number');
        }
        if (data.hasOwnProperty('EmailTotal')) {
          obj['EmailTotal'] = _ApiClient["default"].convertToType(data['EmailTotal'], 'Number');
        }
        if (data.hasOwnProperty('SmsTotal')) {
          obj['SmsTotal'] = _ApiClient["default"].convertToType(data['SmsTotal'], 'Number');
        }
        if (data.hasOwnProperty('Delivered')) {
          obj['Delivered'] = _ApiClient["default"].convertToType(data['Delivered'], 'Number');
        }
        if (data.hasOwnProperty('Bounced')) {
          obj['Bounced'] = _ApiClient["default"].convertToType(data['Bounced'], 'Number');
        }
        if (data.hasOwnProperty('InProgress')) {
          obj['InProgress'] = _ApiClient["default"].convertToType(data['InProgress'], 'Number');
        }
        if (data.hasOwnProperty('Opened')) {
          obj['Opened'] = _ApiClient["default"].convertToType(data['Opened'], 'Number');
        }
        if (data.hasOwnProperty('Clicked')) {
          obj['Clicked'] = _ApiClient["default"].convertToType(data['Clicked'], 'Number');
        }
        if (data.hasOwnProperty('Unsubscribed')) {
          obj['Unsubscribed'] = _ApiClient["default"].convertToType(data['Unsubscribed'], 'Number');
        }
        if (data.hasOwnProperty('Complaints')) {
          obj['Complaints'] = _ApiClient["default"].convertToType(data['Complaints'], 'Number');
        }
        if (data.hasOwnProperty('Inbound')) {
          obj['Inbound'] = _ApiClient["default"].convertToType(data['Inbound'], 'Number');
        }
        if (data.hasOwnProperty('ManualCancel')) {
          obj['ManualCancel'] = _ApiClient["default"].convertToType(data['ManualCancel'], 'Number');
        }
        if (data.hasOwnProperty('NotDelivered')) {
          obj['NotDelivered'] = _ApiClient["default"].convertToType(data['NotDelivered'], 'Number');
        }
      }
      return obj;
    }

    /**
     * Validates the JSON data with respect to <code>ChannelLogStatusSummary</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>ChannelLogStatusSummary</code>.
     */
  }, {
    key: "validateJSON",
    value: function validateJSON(data) {
      // ensure the json data is a string
      if (data['ChannelName'] && !(typeof data['ChannelName'] === 'string' || data['ChannelName'] instanceof String)) {
        throw new Error("Expected the field `ChannelName` to be a primitive type in the JSON string but got " + data['ChannelName']);
      }
      return true;
    }
  }]);
  return ChannelLogStatusSummary;
}();
/**
 * Channel name
 * @member {String} ChannelName
 */
ChannelLogStatusSummary.prototype['ChannelName'] = undefined;

/**
 * Number of recipients
 * @member {Number} Recipients
 */
ChannelLogStatusSummary.prototype['Recipients'] = undefined;

/**
 * Number of emails
 * @member {Number} EmailTotal
 */
ChannelLogStatusSummary.prototype['EmailTotal'] = undefined;

/**
 * Number of SMS
 * @member {Number} SmsTotal
 */
ChannelLogStatusSummary.prototype['SmsTotal'] = undefined;

/**
 * Number of delivered messages
 * @member {Number} Delivered
 */
ChannelLogStatusSummary.prototype['Delivered'] = undefined;

/**
 * Number of bounced messages
 * @member {Number} Bounced
 */
ChannelLogStatusSummary.prototype['Bounced'] = undefined;

/**
 * Number of messages in progress
 * @member {Number} InProgress
 */
ChannelLogStatusSummary.prototype['InProgress'] = undefined;

/**
 * Number of opened messages
 * @member {Number} Opened
 */
ChannelLogStatusSummary.prototype['Opened'] = undefined;

/**
 * Number of clicked messages
 * @member {Number} Clicked
 */
ChannelLogStatusSummary.prototype['Clicked'] = undefined;

/**
 * Number of unsubscribed messages
 * @member {Number} Unsubscribed
 */
ChannelLogStatusSummary.prototype['Unsubscribed'] = undefined;

/**
 * Number of complaint messages
 * @member {Number} Complaints
 */
ChannelLogStatusSummary.prototype['Complaints'] = undefined;

/**
 * Number of inbound messages
 * @member {Number} Inbound
 */
ChannelLogStatusSummary.prototype['Inbound'] = undefined;

/**
 * Number of manually cancelled messages
 * @member {Number} ManualCancel
 */
ChannelLogStatusSummary.prototype['ManualCancel'] = undefined;

/**
 * Number of messages flagged with 'Not Delivered'
 * @member {Number} NotDelivered
 */
ChannelLogStatusSummary.prototype['NotDelivered'] = undefined;
var _default = ChannelLogStatusSummary;
exports["default"] = _default;
},{"../ApiClient":1}],29:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
* Enum class CompressionFormat.
* @enum {}
* @readonly
*/
var CompressionFormat = /*#__PURE__*/function () {
  function CompressionFormat() {
    _classCallCheck(this, CompressionFormat);
    _defineProperty(this, "None", "None");
    _defineProperty(this, "Zip", "Zip");
  }
  _createClass(CompressionFormat, null, [{
    key: "constructFromObject",
    value:
    /**
    * Returns a <code>CompressionFormat</code> enum value from a Javascript object name.
    * @param {Object} data The plain JavaScript object containing the name of the enum value.
    * @return {module:model/CompressionFormat} The enum <code>CompressionFormat</code> value.
    */
    function constructFromObject(object) {
      return object;
    }
  }]);
  return CompressionFormat;
}();
exports["default"] = CompressionFormat;
},{"../ApiClient":1}],30:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _ConsentTracking = _interopRequireDefault(require("./ConsentTracking"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * The ConsentData model module.
 * @module model/ConsentData
 * @version 4.0.23
 */
var ConsentData = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>ConsentData</code>.
   * @alias module:model/ConsentData
   */
  function ConsentData() {
    _classCallCheck(this, ConsentData);
    ConsentData.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  _createClass(ConsentData, null, [{
    key: "initialize",
    value: function initialize(obj) {}

    /**
     * Constructs a <code>ConsentData</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ConsentData} obj Optional instance to populate.
     * @return {module:model/ConsentData} The populated <code>ConsentData</code> instance.
     */
  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new ConsentData();
        if (data.hasOwnProperty('ConsentIP')) {
          obj['ConsentIP'] = _ApiClient["default"].convertToType(data['ConsentIP'], 'String');
        }
        if (data.hasOwnProperty('ConsentDate')) {
          obj['ConsentDate'] = _ApiClient["default"].convertToType(data['ConsentDate'], 'Date');
        }
        if (data.hasOwnProperty('ConsentTracking')) {
          obj['ConsentTracking'] = _ConsentTracking["default"].constructFromObject(data['ConsentTracking']);
        }
      }
      return obj;
    }

    /**
     * Validates the JSON data with respect to <code>ConsentData</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>ConsentData</code>.
     */
  }, {
    key: "validateJSON",
    value: function validateJSON(data) {
      // ensure the json data is a string
      if (data['ConsentIP'] && !(typeof data['ConsentIP'] === 'string' || data['ConsentIP'] instanceof String)) {
        throw new Error("Expected the field `ConsentIP` to be a primitive type in the JSON string but got " + data['ConsentIP']);
      }
      return true;
    }
  }]);
  return ConsentData;
}();
/**
 * IP address of consent to send this contact(s) your email. If not provided your current public IP address is used for consent.
 * @member {String} ConsentIP
 */
ConsentData.prototype['ConsentIP'] = undefined;

/**
 * Date of consent to send this contact(s) your email. If not provided current date is used for consent.
 * @member {Date} ConsentDate
 */
ConsentData.prototype['ConsentDate'] = undefined;

/**
 * @member {module:model/ConsentTracking} ConsentTracking
 */
ConsentData.prototype['ConsentTracking'] = undefined;
var _default = ConsentData;
exports["default"] = _default;
},{"../ApiClient":1,"./ConsentTracking":31}],31:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
* Enum class ConsentTracking.
* @enum {}
* @readonly
*/
var ConsentTracking = /*#__PURE__*/function () {
  function ConsentTracking() {
    _classCallCheck(this, ConsentTracking);
    _defineProperty(this, "Unknown", "Unknown");
    _defineProperty(this, "Allow", "Allow");
    _defineProperty(this, "Deny", "Deny");
  }
  _createClass(ConsentTracking, null, [{
    key: "constructFromObject",
    value:
    /**
    * Returns a <code>ConsentTracking</code> enum value from a Javascript object name.
    * @param {Object} data The plain JavaScript object containing the name of the enum value.
    * @return {module:model/ConsentTracking} The enum <code>ConsentTracking</code> value.
    */
    function constructFromObject(object) {
      return object;
    }
  }]);
  return ConsentTracking;
}();
exports["default"] = ConsentTracking;
},{"../ApiClient":1}],32:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _ConsentData = _interopRequireDefault(require("./ConsentData"));
var _ContactActivity = _interopRequireDefault(require("./ContactActivity"));
var _ContactSource = _interopRequireDefault(require("./ContactSource"));
var _ContactStatus = _interopRequireDefault(require("./ContactStatus"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * The Contact model module.
 * @module model/Contact
 * @version 4.0.23
 */
var Contact = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>Contact</code>.
   * Contact
   * @alias module:model/Contact
   */
  function Contact() {
    _classCallCheck(this, Contact);
    Contact.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  _createClass(Contact, null, [{
    key: "initialize",
    value: function initialize(obj) {}

    /**
     * Constructs a <code>Contact</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Contact} obj Optional instance to populate.
     * @return {module:model/Contact} The populated <code>Contact</code> instance.
     */
  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new Contact();
        if (data.hasOwnProperty('Email')) {
          obj['Email'] = _ApiClient["default"].convertToType(data['Email'], 'String');
        }
        if (data.hasOwnProperty('Status')) {
          obj['Status'] = _ContactStatus["default"].constructFromObject(data['Status']);
        }
        if (data.hasOwnProperty('FirstName')) {
          obj['FirstName'] = _ApiClient["default"].convertToType(data['FirstName'], 'String');
        }
        if (data.hasOwnProperty('LastName')) {
          obj['LastName'] = _ApiClient["default"].convertToType(data['LastName'], 'String');
        }
        if (data.hasOwnProperty('CustomFields')) {
          obj['CustomFields'] = _ApiClient["default"].convertToType(data['CustomFields'], {
            'String': 'String'
          });
        }
        if (data.hasOwnProperty('Consent')) {
          obj['Consent'] = _ConsentData["default"].constructFromObject(data['Consent']);
        }
        if (data.hasOwnProperty('Source')) {
          obj['Source'] = _ContactSource["default"].constructFromObject(data['Source']);
        }
        if (data.hasOwnProperty('DateAdded')) {
          obj['DateAdded'] = _ApiClient["default"].convertToType(data['DateAdded'], 'Date');
        }
        if (data.hasOwnProperty('DateUpdated')) {
          obj['DateUpdated'] = _ApiClient["default"].convertToType(data['DateUpdated'], 'Date');
        }
        if (data.hasOwnProperty('StatusChangeDate')) {
          obj['StatusChangeDate'] = _ApiClient["default"].convertToType(data['StatusChangeDate'], 'Date');
        }
        if (data.hasOwnProperty('Activity')) {
          obj['Activity'] = _ContactActivity["default"].constructFromObject(data['Activity']);
        }
      }
      return obj;
    }

    /**
     * Validates the JSON data with respect to <code>Contact</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>Contact</code>.
     */
  }, {
    key: "validateJSON",
    value: function validateJSON(data) {
      // ensure the json data is a string
      if (data['Email'] && !(typeof data['Email'] === 'string' || data['Email'] instanceof String)) {
        throw new Error("Expected the field `Email` to be a primitive type in the JSON string but got " + data['Email']);
      }
      // ensure the json data is a string
      if (data['FirstName'] && !(typeof data['FirstName'] === 'string' || data['FirstName'] instanceof String)) {
        throw new Error("Expected the field `FirstName` to be a primitive type in the JSON string but got " + data['FirstName']);
      }
      // ensure the json data is a string
      if (data['LastName'] && !(typeof data['LastName'] === 'string' || data['LastName'] instanceof String)) {
        throw new Error("Expected the field `LastName` to be a primitive type in the JSON string but got " + data['LastName']);
      }
      // validate the optional field `Consent`
      if (data['Consent']) {
        // data not null
        _ConsentData["default"].validateJSON(data['Consent']);
      }
      // validate the optional field `Activity`
      if (data['Activity']) {
        // data not null
        _ContactActivity["default"].validateJSON(data['Activity']);
      }
      return true;
    }
  }]);
  return Contact;
}();
/**
 * Proper email address.
 * @member {String} Email
 */
Contact.prototype['Email'] = undefined;

/**
 * @member {module:model/ContactStatus} Status
 */
Contact.prototype['Status'] = undefined;

/**
 * First name.
 * @member {String} FirstName
 */
Contact.prototype['FirstName'] = undefined;

/**
 * Last name.
 * @member {String} LastName
 */
Contact.prototype['LastName'] = undefined;

/**
 * A key-value collection of custom contact fields which can be used in the system.
 * @member {Object.<String, String>} CustomFields
 */
Contact.prototype['CustomFields'] = undefined;

/**
 * @member {module:model/ConsentData} Consent
 */
Contact.prototype['Consent'] = undefined;

/**
 * @member {module:model/ContactSource} Source
 */
Contact.prototype['Source'] = undefined;

/**
 * Date of creation in YYYY-MM-DDThh:ii:ss format
 * @member {Date} DateAdded
 */
Contact.prototype['DateAdded'] = undefined;

/**
 * Last change date
 * @member {Date} DateUpdated
 */
Contact.prototype['DateUpdated'] = undefined;

/**
 * Date of last status change.
 * @member {Date} StatusChangeDate
 */
Contact.prototype['StatusChangeDate'] = undefined;

/**
 * @member {module:model/ContactActivity} Activity
 */
Contact.prototype['Activity'] = undefined;
var _default = Contact;
exports["default"] = _default;
},{"../ApiClient":1,"./ConsentData":30,"./ContactActivity":33,"./ContactSource":35,"./ContactStatus":36}],33:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * The ContactActivity model module.
 * @module model/ContactActivity
 * @version 4.0.23
 */
var ContactActivity = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>ContactActivity</code>.
   * @alias module:model/ContactActivity
   */
  function ContactActivity() {
    _classCallCheck(this, ContactActivity);
    ContactActivity.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  _createClass(ContactActivity, null, [{
    key: "initialize",
    value: function initialize(obj) {}

    /**
     * Constructs a <code>ContactActivity</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ContactActivity} obj Optional instance to populate.
     * @return {module:model/ContactActivity} The populated <code>ContactActivity</code> instance.
     */
  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new ContactActivity();
        if (data.hasOwnProperty('TotalSent')) {
          obj['TotalSent'] = _ApiClient["default"].convertToType(data['TotalSent'], 'Number');
        }
        if (data.hasOwnProperty('TotalOpened')) {
          obj['TotalOpened'] = _ApiClient["default"].convertToType(data['TotalOpened'], 'Number');
        }
        if (data.hasOwnProperty('TotalClicked')) {
          obj['TotalClicked'] = _ApiClient["default"].convertToType(data['TotalClicked'], 'Number');
        }
        if (data.hasOwnProperty('TotalFailed')) {
          obj['TotalFailed'] = _ApiClient["default"].convertToType(data['TotalFailed'], 'Number');
        }
        if (data.hasOwnProperty('LastSent')) {
          obj['LastSent'] = _ApiClient["default"].convertToType(data['LastSent'], 'Date');
        }
        if (data.hasOwnProperty('LastOpened')) {
          obj['LastOpened'] = _ApiClient["default"].convertToType(data['LastOpened'], 'Date');
        }
        if (data.hasOwnProperty('LastClicked')) {
          obj['LastClicked'] = _ApiClient["default"].convertToType(data['LastClicked'], 'Date');
        }
        if (data.hasOwnProperty('LastFailed')) {
          obj['LastFailed'] = _ApiClient["default"].convertToType(data['LastFailed'], 'Date');
        }
        if (data.hasOwnProperty('LastIP')) {
          obj['LastIP'] = _ApiClient["default"].convertToType(data['LastIP'], 'String');
        }
        if (data.hasOwnProperty('ErrorCode')) {
          obj['ErrorCode'] = _ApiClient["default"].convertToType(data['ErrorCode'], 'Number');
        }
        if (data.hasOwnProperty('FriendlyErrorMessage')) {
          obj['FriendlyErrorMessage'] = _ApiClient["default"].convertToType(data['FriendlyErrorMessage'], 'String');
        }
      }
      return obj;
    }

    /**
     * Validates the JSON data with respect to <code>ContactActivity</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>ContactActivity</code>.
     */
  }, {
    key: "validateJSON",
    value: function validateJSON(data) {
      // ensure the json data is a string
      if (data['LastIP'] && !(typeof data['LastIP'] === 'string' || data['LastIP'] instanceof String)) {
        throw new Error("Expected the field `LastIP` to be a primitive type in the JSON string but got " + data['LastIP']);
      }
      // ensure the json data is a string
      if (data['FriendlyErrorMessage'] && !(typeof data['FriendlyErrorMessage'] === 'string' || data['FriendlyErrorMessage'] instanceof String)) {
        throw new Error("Expected the field `FriendlyErrorMessage` to be a primitive type in the JSON string but got " + data['FriendlyErrorMessage']);
      }
      return true;
    }
  }]);
  return ContactActivity;
}();
/**
 * Total emails sent.
 * @member {Number} TotalSent
 */
ContactActivity.prototype['TotalSent'] = undefined;

/**
 * Total emails opened.
 * @member {Number} TotalOpened
 */
ContactActivity.prototype['TotalOpened'] = undefined;

/**
 * Total emails clicked
 * @member {Number} TotalClicked
 */
ContactActivity.prototype['TotalClicked'] = undefined;

/**
 * Total emails failed.
 * @member {Number} TotalFailed
 */
ContactActivity.prototype['TotalFailed'] = undefined;

/**
 * Last date when an email was sent to this contact
 * @member {Date} LastSent
 */
ContactActivity.prototype['LastSent'] = undefined;

/**
 * Date this contact last opened an email
 * @member {Date} LastOpened
 */
ContactActivity.prototype['LastOpened'] = undefined;

/**
 * Date this contact last clicked an email
 * @member {Date} LastClicked
 */
ContactActivity.prototype['LastClicked'] = undefined;

/**
 * Last date when an email sent to this contact bounced
 * @member {Date} LastFailed
 */
ContactActivity.prototype['LastFailed'] = undefined;

/**
 * IP from which this contact opened or clicked their email last time
 * @member {String} LastIP
 */
ContactActivity.prototype['LastIP'] = undefined;

/**
 * Last RFC Error code if any occurred
 * @member {Number} ErrorCode
 */
ContactActivity.prototype['ErrorCode'] = undefined;

/**
 * Last RFC error message if any occurred
 * @member {String} FriendlyErrorMessage
 */
ContactActivity.prototype['FriendlyErrorMessage'] = undefined;
var _default = ContactActivity;
exports["default"] = _default;
},{"../ApiClient":1}],34:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _ConsentData = _interopRequireDefault(require("./ConsentData"));
var _ContactStatus = _interopRequireDefault(require("./ContactStatus"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * The ContactPayload model module.
 * @module model/ContactPayload
 * @version 4.0.23
 */
var ContactPayload = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>ContactPayload</code>.
   * @alias module:model/ContactPayload
   * @param email {String} Proper email address.
   */
  function ContactPayload(email) {
    _classCallCheck(this, ContactPayload);
    ContactPayload.initialize(this, email);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  _createClass(ContactPayload, null, [{
    key: "initialize",
    value: function initialize(obj, email) {
      obj['Email'] = email;
    }

    /**
     * Constructs a <code>ContactPayload</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ContactPayload} obj Optional instance to populate.
     * @return {module:model/ContactPayload} The populated <code>ContactPayload</code> instance.
     */
  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new ContactPayload();
        if (data.hasOwnProperty('Email')) {
          obj['Email'] = _ApiClient["default"].convertToType(data['Email'], 'String');
        }
        if (data.hasOwnProperty('Status')) {
          obj['Status'] = _ContactStatus["default"].constructFromObject(data['Status']);
        }
        if (data.hasOwnProperty('FirstName')) {
          obj['FirstName'] = _ApiClient["default"].convertToType(data['FirstName'], 'String');
        }
        if (data.hasOwnProperty('LastName')) {
          obj['LastName'] = _ApiClient["default"].convertToType(data['LastName'], 'String');
        }
        if (data.hasOwnProperty('CustomFields')) {
          obj['CustomFields'] = _ApiClient["default"].convertToType(data['CustomFields'], {
            'String': 'String'
          });
        }
        if (data.hasOwnProperty('Consent')) {
          obj['Consent'] = _ConsentData["default"].constructFromObject(data['Consent']);
        }
      }
      return obj;
    }

    /**
     * Validates the JSON data with respect to <code>ContactPayload</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>ContactPayload</code>.
     */
  }, {
    key: "validateJSON",
    value: function validateJSON(data) {
      // check to make sure all required properties are present in the JSON string
      var _iterator = _createForOfIteratorHelper(ContactPayload.RequiredProperties),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var property = _step.value;
          if (!data[property]) {
            throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
          }
        }
        // ensure the json data is a string
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      if (data['Email'] && !(typeof data['Email'] === 'string' || data['Email'] instanceof String)) {
        throw new Error("Expected the field `Email` to be a primitive type in the JSON string but got " + data['Email']);
      }
      // ensure the json data is a string
      if (data['FirstName'] && !(typeof data['FirstName'] === 'string' || data['FirstName'] instanceof String)) {
        throw new Error("Expected the field `FirstName` to be a primitive type in the JSON string but got " + data['FirstName']);
      }
      // ensure the json data is a string
      if (data['LastName'] && !(typeof data['LastName'] === 'string' || data['LastName'] instanceof String)) {
        throw new Error("Expected the field `LastName` to be a primitive type in the JSON string but got " + data['LastName']);
      }
      // validate the optional field `Consent`
      if (data['Consent']) {
        // data not null
        _ConsentData["default"].validateJSON(data['Consent']);
      }
      return true;
    }
  }]);
  return ContactPayload;
}();
ContactPayload.RequiredProperties = ["Email"];

/**
 * Proper email address.
 * @member {String} Email
 */
ContactPayload.prototype['Email'] = undefined;

/**
 * @member {module:model/ContactStatus} Status
 */
ContactPayload.prototype['Status'] = undefined;

/**
 * First name.
 * @member {String} FirstName
 */
ContactPayload.prototype['FirstName'] = undefined;

/**
 * Last name.
 * @member {String} LastName
 */
ContactPayload.prototype['LastName'] = undefined;

/**
 * A key-value collection of custom contact fields which can be used in the system. Only already existing custom fields will be saved.
 * @member {Object.<String, String>} CustomFields
 */
ContactPayload.prototype['CustomFields'] = undefined;

/**
 * @member {module:model/ConsentData} Consent
 */
ContactPayload.prototype['Consent'] = undefined;
var _default = ContactPayload;
exports["default"] = _default;
},{"../ApiClient":1,"./ConsentData":30,"./ContactStatus":36}],35:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
* Enum class ContactSource.
* @enum {}
* @readonly
*/
var ContactSource = /*#__PURE__*/function () {
  function ContactSource() {
    _classCallCheck(this, ContactSource);
    _defineProperty(this, "DeliveryApi", "DeliveryApi");
    _defineProperty(this, "ManualInput", "ManualInput");
    _defineProperty(this, "FileUpload", "FileUpload");
    _defineProperty(this, "WebForm", "WebForm");
    _defineProperty(this, "ContactApi", "ContactApi");
    _defineProperty(this, "VerificationApi", "VerificationApi");
    _defineProperty(this, "FileVerificationApi", "FileVerificationApi");
  }
  _createClass(ContactSource, null, [{
    key: "constructFromObject",
    value:
    /**
    * Returns a <code>ContactSource</code> enum value from a Javascript object name.
    * @param {Object} data The plain JavaScript object containing the name of the enum value.
    * @return {module:model/ContactSource} The enum <code>ContactSource</code> value.
    */
    function constructFromObject(object) {
      return object;
    }
  }]);
  return ContactSource;
}();
exports["default"] = ContactSource;
},{"../ApiClient":1}],36:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
* Enum class ContactStatus.
* @enum {}
* @readonly
*/
var ContactStatus = /*#__PURE__*/function () {
  function ContactStatus() {
    _classCallCheck(this, ContactStatus);
    _defineProperty(this, "Transactional", "Transactional");
    _defineProperty(this, "Engaged", "Engaged");
    _defineProperty(this, "Active", "Active");
    _defineProperty(this, "Bounced", "Bounced");
    _defineProperty(this, "Unsubscribed", "Unsubscribed");
    _defineProperty(this, "Abuse", "Abuse");
    _defineProperty(this, "Inactive", "Inactive");
    _defineProperty(this, "Stale", "Stale");
    _defineProperty(this, "NotConfirmed", "NotConfirmed");
  }
  _createClass(ContactStatus, null, [{
    key: "constructFromObject",
    value:
    /**
    * Returns a <code>ContactStatus</code> enum value from a Javascript object name.
    * @param {Object} data The plain JavaScript object containing the name of the enum value.
    * @return {module:model/ContactStatus} The enum <code>ContactStatus</code> value.
    */
    function constructFromObject(object) {
      return object;
    }
  }]);
  return ContactStatus;
}();
exports["default"] = ContactStatus;
},{"../ApiClient":1}],37:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * The ContactUpdatePayload model module.
 * @module model/ContactUpdatePayload
 * @version 4.0.23
 */
var ContactUpdatePayload = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>ContactUpdatePayload</code>.
   * @alias module:model/ContactUpdatePayload
   */
  function ContactUpdatePayload() {
    _classCallCheck(this, ContactUpdatePayload);
    ContactUpdatePayload.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  _createClass(ContactUpdatePayload, null, [{
    key: "initialize",
    value: function initialize(obj) {}

    /**
     * Constructs a <code>ContactUpdatePayload</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ContactUpdatePayload} obj Optional instance to populate.
     * @return {module:model/ContactUpdatePayload} The populated <code>ContactUpdatePayload</code> instance.
     */
  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new ContactUpdatePayload();
        if (data.hasOwnProperty('FirstName')) {
          obj['FirstName'] = _ApiClient["default"].convertToType(data['FirstName'], 'String');
        }
        if (data.hasOwnProperty('LastName')) {
          obj['LastName'] = _ApiClient["default"].convertToType(data['LastName'], 'String');
        }
        if (data.hasOwnProperty('CustomFields')) {
          obj['CustomFields'] = _ApiClient["default"].convertToType(data['CustomFields'], {
            'String': 'String'
          });
        }
      }
      return obj;
    }

    /**
     * Validates the JSON data with respect to <code>ContactUpdatePayload</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>ContactUpdatePayload</code>.
     */
  }, {
    key: "validateJSON",
    value: function validateJSON(data) {
      // ensure the json data is a string
      if (data['FirstName'] && !(typeof data['FirstName'] === 'string' || data['FirstName'] instanceof String)) {
        throw new Error("Expected the field `FirstName` to be a primitive type in the JSON string but got " + data['FirstName']);
      }
      // ensure the json data is a string
      if (data['LastName'] && !(typeof data['LastName'] === 'string' || data['LastName'] instanceof String)) {
        throw new Error("Expected the field `LastName` to be a primitive type in the JSON string but got " + data['LastName']);
      }
      return true;
    }
  }]);
  return ContactUpdatePayload;
}();
/**
 * First name.
 * @member {String} FirstName
 */
ContactUpdatePayload.prototype['FirstName'] = undefined;

/**
 * Last name.
 * @member {String} LastName
 */
ContactUpdatePayload.prototype['LastName'] = undefined;

/**
 * A key-value collection of custom contact fields which can be used in the system.
 * @member {Object.<String, String>} CustomFields
 */
ContactUpdatePayload.prototype['CustomFields'] = undefined;
var _default = ContactUpdatePayload;
exports["default"] = _default;
},{"../ApiClient":1}],38:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * The ContactsList model module.
 * @module model/ContactsList
 * @version 4.0.23
 */
var ContactsList = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>ContactsList</code>.
   * List of Lists, with detailed data about its contents.
   * @alias module:model/ContactsList
   */
  function ContactsList() {
    _classCallCheck(this, ContactsList);
    ContactsList.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  _createClass(ContactsList, null, [{
    key: "initialize",
    value: function initialize(obj) {}

    /**
     * Constructs a <code>ContactsList</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ContactsList} obj Optional instance to populate.
     * @return {module:model/ContactsList} The populated <code>ContactsList</code> instance.
     */
  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new ContactsList();
        if (data.hasOwnProperty('ListName')) {
          obj['ListName'] = _ApiClient["default"].convertToType(data['ListName'], 'String');
        }
        if (data.hasOwnProperty('PublicListID')) {
          obj['PublicListID'] = _ApiClient["default"].convertToType(data['PublicListID'], 'String');
        }
        if (data.hasOwnProperty('DateAdded')) {
          obj['DateAdded'] = _ApiClient["default"].convertToType(data['DateAdded'], 'Date');
        }
        if (data.hasOwnProperty('AllowUnsubscribe')) {
          obj['AllowUnsubscribe'] = _ApiClient["default"].convertToType(data['AllowUnsubscribe'], 'Boolean');
        }
      }
      return obj;
    }

    /**
     * Validates the JSON data with respect to <code>ContactsList</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>ContactsList</code>.
     */
  }, {
    key: "validateJSON",
    value: function validateJSON(data) {
      // ensure the json data is a string
      if (data['ListName'] && !(typeof data['ListName'] === 'string' || data['ListName'] instanceof String)) {
        throw new Error("Expected the field `ListName` to be a primitive type in the JSON string but got " + data['ListName']);
      }
      // ensure the json data is a string
      if (data['PublicListID'] && !(typeof data['PublicListID'] === 'string' || data['PublicListID'] instanceof String)) {
        throw new Error("Expected the field `PublicListID` to be a primitive type in the JSON string but got " + data['PublicListID']);
      }
      return true;
    }
  }]);
  return ContactsList;
}();
/**
 * Name of your list.
 * @member {String} ListName
 */
ContactsList.prototype['ListName'] = undefined;

/**
 * ID code of list. Please note that this is different from the listid field.
 * @member {String} PublicListID
 */
ContactsList.prototype['PublicListID'] = undefined;

/**
 * Date of creation in YYYY-MM-DDThh:ii:ss format
 * @member {Date} DateAdded
 */
ContactsList.prototype['DateAdded'] = undefined;

/**
 * True: Allow unsubscribing from this list. Otherwise, false
 * @member {Boolean} AllowUnsubscribe
 */
ContactsList.prototype['AllowUnsubscribe'] = undefined;
var _default = ContactsList;
exports["default"] = _default;
},{"../ApiClient":1}],39:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
* Enum class DeliveryOptimizationType.
* @enum {}
* @readonly
*/
var DeliveryOptimizationType = /*#__PURE__*/function () {
  function DeliveryOptimizationType() {
    _classCallCheck(this, DeliveryOptimizationType);
    _defineProperty(this, "None", "None");
    _defineProperty(this, "ToEngagedFirst", "ToEngagedFirst");
    _defineProperty(this, "ByOpenTime", "ByOpenTime");
  }
  _createClass(DeliveryOptimizationType, null, [{
    key: "constructFromObject",
    value:
    /**
    * Returns a <code>DeliveryOptimizationType</code> enum value from a Javascript object name.
    * @param {Object} data The plain JavaScript object containing the name of the enum value.
    * @return {module:model/DeliveryOptimizationType} The enum <code>DeliveryOptimizationType</code> value.
    */
    function constructFromObject(object) {
      return object;
    }
  }]);
  return DeliveryOptimizationType;
}();
exports["default"] = DeliveryOptimizationType;
},{"../ApiClient":1}],40:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _BodyPart = _interopRequireDefault(require("./BodyPart"));
var _MessageAttachment = _interopRequireDefault(require("./MessageAttachment"));
var _Utm = _interopRequireDefault(require("./Utm"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * The EmailContent model module.
 * @module model/EmailContent
 * @version 4.0.23
 */
var EmailContent = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>EmailContent</code>.
   * Proper e-mail content
   * @alias module:model/EmailContent
   */
  function EmailContent() {
    _classCallCheck(this, EmailContent);
    EmailContent.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  _createClass(EmailContent, null, [{
    key: "initialize",
    value: function initialize(obj) {}

    /**
     * Constructs a <code>EmailContent</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/EmailContent} obj Optional instance to populate.
     * @return {module:model/EmailContent} The populated <code>EmailContent</code> instance.
     */
  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new EmailContent();
        if (data.hasOwnProperty('Body')) {
          obj['Body'] = _ApiClient["default"].convertToType(data['Body'], [_BodyPart["default"]]);
        }
        if (data.hasOwnProperty('Merge')) {
          obj['Merge'] = _ApiClient["default"].convertToType(data['Merge'], {
            'String': 'String'
          });
        }
        if (data.hasOwnProperty('Attachments')) {
          obj['Attachments'] = _ApiClient["default"].convertToType(data['Attachments'], [_MessageAttachment["default"]]);
        }
        if (data.hasOwnProperty('Headers')) {
          obj['Headers'] = _ApiClient["default"].convertToType(data['Headers'], {
            'String': 'String'
          });
        }
        if (data.hasOwnProperty('Postback')) {
          obj['Postback'] = _ApiClient["default"].convertToType(data['Postback'], 'String');
        }
        if (data.hasOwnProperty('EnvelopeFrom')) {
          obj['EnvelopeFrom'] = _ApiClient["default"].convertToType(data['EnvelopeFrom'], 'String');
        }
        if (data.hasOwnProperty('From')) {
          obj['From'] = _ApiClient["default"].convertToType(data['From'], 'String');
        }
        if (data.hasOwnProperty('ReplyTo')) {
          obj['ReplyTo'] = _ApiClient["default"].convertToType(data['ReplyTo'], 'String');
        }
        if (data.hasOwnProperty('Subject')) {
          obj['Subject'] = _ApiClient["default"].convertToType(data['Subject'], 'String');
        }
        if (data.hasOwnProperty('TemplateName')) {
          obj['TemplateName'] = _ApiClient["default"].convertToType(data['TemplateName'], 'String');
        }
        if (data.hasOwnProperty('AttachFiles')) {
          obj['AttachFiles'] = _ApiClient["default"].convertToType(data['AttachFiles'], ['String']);
        }
        if (data.hasOwnProperty('Utm')) {
          obj['Utm'] = _Utm["default"].constructFromObject(data['Utm']);
        }
      }
      return obj;
    }

    /**
     * Validates the JSON data with respect to <code>EmailContent</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>EmailContent</code>.
     */
  }, {
    key: "validateJSON",
    value: function validateJSON(data) {
      if (data['Body']) {
        // data not null
        // ensure the json data is an array
        if (!Array.isArray(data['Body'])) {
          throw new Error("Expected the field `Body` to be an array in the JSON data but got " + data['Body']);
        }
        // validate the optional field `Body` (array)
        var _iterator = _createForOfIteratorHelper(data['Body']),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var item = _step.value;
            _BodyPart["default"].validateJsonObject(item);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        ;
      }
      if (data['Attachments']) {
        // data not null
        // ensure the json data is an array
        if (!Array.isArray(data['Attachments'])) {
          throw new Error("Expected the field `Attachments` to be an array in the JSON data but got " + data['Attachments']);
        }
        // validate the optional field `Attachments` (array)
        var _iterator2 = _createForOfIteratorHelper(data['Attachments']),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var _item = _step2.value;
            _MessageAttachment["default"].validateJsonObject(_item);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
        ;
      }
      // ensure the json data is a string
      if (data['Postback'] && !(typeof data['Postback'] === 'string' || data['Postback'] instanceof String)) {
        throw new Error("Expected the field `Postback` to be a primitive type in the JSON string but got " + data['Postback']);
      }
      // ensure the json data is a string
      if (data['EnvelopeFrom'] && !(typeof data['EnvelopeFrom'] === 'string' || data['EnvelopeFrom'] instanceof String)) {
        throw new Error("Expected the field `EnvelopeFrom` to be a primitive type in the JSON string but got " + data['EnvelopeFrom']);
      }
      // ensure the json data is a string
      if (data['From'] && !(typeof data['From'] === 'string' || data['From'] instanceof String)) {
        throw new Error("Expected the field `From` to be a primitive type in the JSON string but got " + data['From']);
      }
      // ensure the json data is a string
      if (data['ReplyTo'] && !(typeof data['ReplyTo'] === 'string' || data['ReplyTo'] instanceof String)) {
        throw new Error("Expected the field `ReplyTo` to be a primitive type in the JSON string but got " + data['ReplyTo']);
      }
      // ensure the json data is a string
      if (data['Subject'] && !(typeof data['Subject'] === 'string' || data['Subject'] instanceof String)) {
        throw new Error("Expected the field `Subject` to be a primitive type in the JSON string but got " + data['Subject']);
      }
      // ensure the json data is a string
      if (data['TemplateName'] && !(typeof data['TemplateName'] === 'string' || data['TemplateName'] instanceof String)) {
        throw new Error("Expected the field `TemplateName` to be a primitive type in the JSON string but got " + data['TemplateName']);
      }
      // ensure the json data is an array
      if (!Array.isArray(data['AttachFiles'])) {
        throw new Error("Expected the field `AttachFiles` to be an array in the JSON data but got " + data['AttachFiles']);
      }
      // validate the optional field `Utm`
      if (data['Utm']) {
        // data not null
        _Utm["default"].validateJSON(data['Utm']);
      }
      return true;
    }
  }]);
  return EmailContent;
}();
/**
 * List of e-mail body parts, with user-provided MIME types (text/html, text/plain etc)
 * @member {Array.<module:model/BodyPart>} Body
 */
EmailContent.prototype['Body'] = undefined;

/**
 * A key-value collection of custom merge fields, shared between recipients. Should be used in e-mail body like so: {firstname}, {lastname} etc.
 * @member {Object.<String, String>} Merge
 */
EmailContent.prototype['Merge'] = undefined;

/**
 * Attachments provided by sending binary data
 * @member {Array.<module:model/MessageAttachment>} Attachments
 */
EmailContent.prototype['Attachments'] = undefined;

/**
 * A key-value collection of custom e-mail headers.
 * @member {Object.<String, String>} Headers
 */
EmailContent.prototype['Headers'] = undefined;

/**
 * Postback header.
 * @member {String} Postback
 */
EmailContent.prototype['Postback'] = undefined;

/**
 * E-mail with an optional name to be used as the envelope from address (e.g.: John Doe <email@domain.com>)
 * @member {String} EnvelopeFrom
 */
EmailContent.prototype['EnvelopeFrom'] = undefined;

/**
 * Your e-mail with an optional name (e.g.: John Doe <email@domain.com>)
 * @member {String} From
 */
EmailContent.prototype['From'] = undefined;

/**
 * To what address should the recipients reply to (e.g. John Doe <email@domain.com>)
 * @member {String} ReplyTo
 */
EmailContent.prototype['ReplyTo'] = undefined;

/**
 * Default subject of email.
 * @member {String} Subject
 */
EmailContent.prototype['Subject'] = undefined;

/**
 * Name of template.
 * @member {String} TemplateName
 */
EmailContent.prototype['TemplateName'] = undefined;

/**
 * Names of previously uploaded files that should be sent as downloadable attachments
 * @member {Array.<String>} AttachFiles
 */
EmailContent.prototype['AttachFiles'] = undefined;

/**
 * @member {module:model/Utm} Utm
 */
EmailContent.prototype['Utm'] = undefined;
var _default = EmailContent;
exports["default"] = _default;
},{"../ApiClient":1,"./BodyPart":22,"./MessageAttachment":69,"./Utm":95}],41:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _EmailStatus = _interopRequireDefault(require("./EmailStatus"));
var _EmailView = _interopRequireDefault(require("./EmailView"));
var _FileInfo = _interopRequireDefault(require("./FileInfo"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * The EmailData model module.
 * @module model/EmailData
 * @version 4.0.23
 */
var EmailData = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>EmailData</code>.
   * @alias module:model/EmailData
   */
  function EmailData() {
    _classCallCheck(this, EmailData);
    EmailData.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  _createClass(EmailData, null, [{
    key: "initialize",
    value: function initialize(obj) {}

    /**
     * Constructs a <code>EmailData</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/EmailData} obj Optional instance to populate.
     * @return {module:model/EmailData} The populated <code>EmailData</code> instance.
     */
  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new EmailData();
        if (data.hasOwnProperty('Preview')) {
          obj['Preview'] = _EmailView["default"].constructFromObject(data['Preview']);
        }
        if (data.hasOwnProperty('Attachments')) {
          obj['Attachments'] = _ApiClient["default"].convertToType(data['Attachments'], [_FileInfo["default"]]);
        }
        if (data.hasOwnProperty('Status')) {
          obj['Status'] = _EmailStatus["default"].constructFromObject(data['Status']);
        }
      }
      return obj;
    }

    /**
     * Validates the JSON data with respect to <code>EmailData</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>EmailData</code>.
     */
  }, {
    key: "validateJSON",
    value: function validateJSON(data) {
      // validate the optional field `Preview`
      if (data['Preview']) {
        // data not null
        _EmailView["default"].validateJSON(data['Preview']);
      }
      if (data['Attachments']) {
        // data not null
        // ensure the json data is an array
        if (!Array.isArray(data['Attachments'])) {
          throw new Error("Expected the field `Attachments` to be an array in the JSON data but got " + data['Attachments']);
        }
        // validate the optional field `Attachments` (array)
        var _iterator = _createForOfIteratorHelper(data['Attachments']),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var item = _step.value;
            _FileInfo["default"].validateJsonObject(item);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        ;
      }
      // validate the optional field `Status`
      if (data['Status']) {
        // data not null
        _EmailStatus["default"].validateJSON(data['Status']);
      }
      return true;
    }
  }]);
  return EmailData;
}();
/**
 * @member {module:model/EmailView} Preview
 */
EmailData.prototype['Preview'] = undefined;

/**
 * Attachments sent with the email
 * @member {Array.<module:model/FileInfo>} Attachments
 */
EmailData.prototype['Attachments'] = undefined;

/**
 * @member {module:model/EmailStatus} Status
 */
EmailData.prototype['Status'] = undefined;
var _default = EmailData;
exports["default"] = _default;
},{"../ApiClient":1,"./EmailStatus":45,"./EmailView":49,"./FileInfo":57}],42:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _EmailContent = _interopRequireDefault(require("./EmailContent"));
var _EmailRecipient = _interopRequireDefault(require("./EmailRecipient"));
var _Options = _interopRequireDefault(require("./Options"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * The EmailMessageData model module.
 * @module model/EmailMessageData
 * @version 4.0.23
 */
var EmailMessageData = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>EmailMessageData</code>.
   * Email data
   * @alias module:model/EmailMessageData
   * @param recipients {Array.<module:model/EmailRecipient>} List of recipients
   */
  function EmailMessageData(recipients) {
    _classCallCheck(this, EmailMessageData);
    EmailMessageData.initialize(this, recipients);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  _createClass(EmailMessageData, null, [{
    key: "initialize",
    value: function initialize(obj, recipients) {
      obj['Recipients'] = recipients;
    }

    /**
     * Constructs a <code>EmailMessageData</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/EmailMessageData} obj Optional instance to populate.
     * @return {module:model/EmailMessageData} The populated <code>EmailMessageData</code> instance.
     */
  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new EmailMessageData();
        if (data.hasOwnProperty('Recipients')) {
          obj['Recipients'] = _ApiClient["default"].convertToType(data['Recipients'], [_EmailRecipient["default"]]);
        }
        if (data.hasOwnProperty('Content')) {
          obj['Content'] = _EmailContent["default"].constructFromObject(data['Content']);
        }
        if (data.hasOwnProperty('Options')) {
          obj['Options'] = _Options["default"].constructFromObject(data['Options']);
        }
      }
      return obj;
    }

    /**
     * Validates the JSON data with respect to <code>EmailMessageData</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>EmailMessageData</code>.
     */
  }, {
    key: "validateJSON",
    value: function validateJSON(data) {
      // check to make sure all required properties are present in the JSON string
      var _iterator = _createForOfIteratorHelper(EmailMessageData.RequiredProperties),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var property = _step.value;
          if (!data[property]) {
            throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      if (data['Recipients']) {
        // data not null
        // ensure the json data is an array
        if (!Array.isArray(data['Recipients'])) {
          throw new Error("Expected the field `Recipients` to be an array in the JSON data but got " + data['Recipients']);
        }
        // validate the optional field `Recipients` (array)
        var _iterator2 = _createForOfIteratorHelper(data['Recipients']),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var item = _step2.value;
            _EmailRecipient["default"].validateJsonObject(item);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
        ;
      }
      // validate the optional field `Content`
      if (data['Content']) {
        // data not null
        _EmailContent["default"].validateJSON(data['Content']);
      }
      // validate the optional field `Options`
      if (data['Options']) {
        // data not null
        _Options["default"].validateJSON(data['Options']);
      }
      return true;
    }
  }]);
  return EmailMessageData;
}();
EmailMessageData.RequiredProperties = ["Recipients"];

/**
 * List of recipients
 * @member {Array.<module:model/EmailRecipient>} Recipients
 */
EmailMessageData.prototype['Recipients'] = undefined;

/**
 * @member {module:model/EmailContent} Content
 */
EmailMessageData.prototype['Content'] = undefined;

/**
 * @member {module:model/Options} Options
 */
EmailMessageData.prototype['Options'] = undefined;
var _default = EmailMessageData;
exports["default"] = _default;
},{"../ApiClient":1,"./EmailContent":40,"./EmailRecipient":43,"./Options":73}],43:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * The EmailRecipient model module.
 * @module model/EmailRecipient
 * @version 4.0.23
 */
var EmailRecipient = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>EmailRecipient</code>.
   * List of recipients
   * @alias module:model/EmailRecipient
   * @param email {String} Proper email address.
   */
  function EmailRecipient(email) {
    _classCallCheck(this, EmailRecipient);
    EmailRecipient.initialize(this, email);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  _createClass(EmailRecipient, null, [{
    key: "initialize",
    value: function initialize(obj, email) {
      obj['Email'] = email;
    }

    /**
     * Constructs a <code>EmailRecipient</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/EmailRecipient} obj Optional instance to populate.
     * @return {module:model/EmailRecipient} The populated <code>EmailRecipient</code> instance.
     */
  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new EmailRecipient();
        if (data.hasOwnProperty('Email')) {
          obj['Email'] = _ApiClient["default"].convertToType(data['Email'], 'String');
        }
        if (data.hasOwnProperty('Fields')) {
          obj['Fields'] = _ApiClient["default"].convertToType(data['Fields'], {
            'String': 'String'
          });
        }
      }
      return obj;
    }

    /**
     * Validates the JSON data with respect to <code>EmailRecipient</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>EmailRecipient</code>.
     */
  }, {
    key: "validateJSON",
    value: function validateJSON(data) {
      // check to make sure all required properties are present in the JSON string
      var _iterator = _createForOfIteratorHelper(EmailRecipient.RequiredProperties),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var property = _step.value;
          if (!data[property]) {
            throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
          }
        }
        // ensure the json data is a string
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      if (data['Email'] && !(typeof data['Email'] === 'string' || data['Email'] instanceof String)) {
        throw new Error("Expected the field `Email` to be a primitive type in the JSON string but got " + data['Email']);
      }
      return true;
    }
  }]);
  return EmailRecipient;
}();
EmailRecipient.RequiredProperties = ["Email"];

/**
 * Proper email address.
 * @member {String} Email
 */
EmailRecipient.prototype['Email'] = undefined;

/**
 * A key-value collection of merge fields which can be used in e-mail body.
 * @member {Object.<String, String>} Fields
 */
EmailRecipient.prototype['Fields'] = undefined;
var _default = EmailRecipient;
exports["default"] = _default;
},{"../ApiClient":1}],44:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * The EmailSend model module.
 * @module model/EmailSend
 * @version 4.0.23
 */
var EmailSend = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>EmailSend</code>.
   * @alias module:model/EmailSend
   */
  function EmailSend() {
    _classCallCheck(this, EmailSend);
    EmailSend.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  _createClass(EmailSend, null, [{
    key: "initialize",
    value: function initialize(obj) {}

    /**
     * Constructs a <code>EmailSend</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/EmailSend} obj Optional instance to populate.
     * @return {module:model/EmailSend} The populated <code>EmailSend</code> instance.
     */
  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new EmailSend();
        if (data.hasOwnProperty('TransactionID')) {
          obj['TransactionID'] = _ApiClient["default"].convertToType(data['TransactionID'], 'String');
        }
        if (data.hasOwnProperty('MessageID')) {
          obj['MessageID'] = _ApiClient["default"].convertToType(data['MessageID'], 'String');
        }
      }
      return obj;
    }

    /**
     * Validates the JSON data with respect to <code>EmailSend</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>EmailSend</code>.
     */
  }, {
    key: "validateJSON",
    value: function validateJSON(data) {
      // ensure the json data is a string
      if (data['TransactionID'] && !(typeof data['TransactionID'] === 'string' || data['TransactionID'] instanceof String)) {
        throw new Error("Expected the field `TransactionID` to be a primitive type in the JSON string but got " + data['TransactionID']);
      }
      // ensure the json data is a string
      if (data['MessageID'] && !(typeof data['MessageID'] === 'string' || data['MessageID'] instanceof String)) {
        throw new Error("Expected the field `MessageID` to be a primitive type in the JSON string but got " + data['MessageID']);
      }
      return true;
    }
  }]);
  return EmailSend;
}();
/**
 * ID number of transaction
 * @member {String} TransactionID
 */
EmailSend.prototype['TransactionID'] = undefined;

/**
 * Unique identifier for this email.
 * @member {String} MessageID
 */
EmailSend.prototype['MessageID'] = undefined;
var _default = EmailSend;
exports["default"] = _default;
},{"../ApiClient":1}],45:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _LogJobStatus = _interopRequireDefault(require("./LogJobStatus"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * The EmailStatus model module.
 * @module model/EmailStatus
 * @version 4.0.23
 */
var EmailStatus = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>EmailStatus</code>.
   * Status information of the specified email
   * @alias module:model/EmailStatus
   */
  function EmailStatus() {
    _classCallCheck(this, EmailStatus);
    EmailStatus.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  _createClass(EmailStatus, null, [{
    key: "initialize",
    value: function initialize(obj) {}

    /**
     * Constructs a <code>EmailStatus</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/EmailStatus} obj Optional instance to populate.
     * @return {module:model/EmailStatus} The populated <code>EmailStatus</code> instance.
     */
  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new EmailStatus();
        if (data.hasOwnProperty('From')) {
          obj['From'] = _ApiClient["default"].convertToType(data['From'], 'String');
        }
        if (data.hasOwnProperty('To')) {
          obj['To'] = _ApiClient["default"].convertToType(data['To'], 'String');
        }
        if (data.hasOwnProperty('Date')) {
          obj['Date'] = _ApiClient["default"].convertToType(data['Date'], 'Date');
        }
        if (data.hasOwnProperty('Status')) {
          obj['Status'] = _LogJobStatus["default"].constructFromObject(data['Status']);
        }
        if (data.hasOwnProperty('StatusName')) {
          obj['StatusName'] = _ApiClient["default"].convertToType(data['StatusName'], 'String');
        }
        if (data.hasOwnProperty('StatusChangeDate')) {
          obj['StatusChangeDate'] = _ApiClient["default"].convertToType(data['StatusChangeDate'], 'Date');
        }
        if (data.hasOwnProperty('DateSent')) {
          obj['DateSent'] = _ApiClient["default"].convertToType(data['DateSent'], 'Date');
        }
        if (data.hasOwnProperty('DateOpened')) {
          obj['DateOpened'] = _ApiClient["default"].convertToType(data['DateOpened'], 'Date');
        }
        if (data.hasOwnProperty('DateClicked')) {
          obj['DateClicked'] = _ApiClient["default"].convertToType(data['DateClicked'], 'Date');
        }
        if (data.hasOwnProperty('ErrorMessage')) {
          obj['ErrorMessage'] = _ApiClient["default"].convertToType(data['ErrorMessage'], 'String');
        }
        if (data.hasOwnProperty('TransactionID')) {
          obj['TransactionID'] = _ApiClient["default"].convertToType(data['TransactionID'], 'String');
        }
        if (data.hasOwnProperty('EnvelopeFrom')) {
          obj['EnvelopeFrom'] = _ApiClient["default"].convertToType(data['EnvelopeFrom'], 'String');
        }
      }
      return obj;
    }

    /**
     * Validates the JSON data with respect to <code>EmailStatus</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>EmailStatus</code>.
     */
  }, {
    key: "validateJSON",
    value: function validateJSON(data) {
      // ensure the json data is a string
      if (data['From'] && !(typeof data['From'] === 'string' || data['From'] instanceof String)) {
        throw new Error("Expected the field `From` to be a primitive type in the JSON string but got " + data['From']);
      }
      // ensure the json data is a string
      if (data['To'] && !(typeof data['To'] === 'string' || data['To'] instanceof String)) {
        throw new Error("Expected the field `To` to be a primitive type in the JSON string but got " + data['To']);
      }
      // ensure the json data is a string
      if (data['StatusName'] && !(typeof data['StatusName'] === 'string' || data['StatusName'] instanceof String)) {
        throw new Error("Expected the field `StatusName` to be a primitive type in the JSON string but got " + data['StatusName']);
      }
      // ensure the json data is a string
      if (data['ErrorMessage'] && !(typeof data['ErrorMessage'] === 'string' || data['ErrorMessage'] instanceof String)) {
        throw new Error("Expected the field `ErrorMessage` to be a primitive type in the JSON string but got " + data['ErrorMessage']);
      }
      // ensure the json data is a string
      if (data['TransactionID'] && !(typeof data['TransactionID'] === 'string' || data['TransactionID'] instanceof String)) {
        throw new Error("Expected the field `TransactionID` to be a primitive type in the JSON string but got " + data['TransactionID']);
      }
      // ensure the json data is a string
      if (data['EnvelopeFrom'] && !(typeof data['EnvelopeFrom'] === 'string' || data['EnvelopeFrom'] instanceof String)) {
        throw new Error("Expected the field `EnvelopeFrom` to be a primitive type in the JSON string but got " + data['EnvelopeFrom']);
      }
      return true;
    }
  }]);
  return EmailStatus;
}();
/**
 * Email address this email was sent from.
 * @member {String} From
 */
EmailStatus.prototype['From'] = undefined;

/**
 * Email address this email was sent to.
 * @member {String} To
 */
EmailStatus.prototype['To'] = undefined;

/**
 * Date the email was submitted.
 * @member {Date} Date
 */
EmailStatus.prototype['Date'] = undefined;

/**
 * @member {module:model/LogJobStatus} Status
 */
EmailStatus.prototype['Status'] = undefined;

/**
 * Name of email's status
 * @member {String} StatusName
 */
EmailStatus.prototype['StatusName'] = undefined;

/**
 * Date of last status change.
 * @member {Date} StatusChangeDate
 */
EmailStatus.prototype['StatusChangeDate'] = undefined;

/**
 * Date when the email was sent
 * @member {Date} DateSent
 */
EmailStatus.prototype['DateSent'] = undefined;

/**
 * Date when the email changed the status to 'opened'
 * @member {Date} DateOpened
 */
EmailStatus.prototype['DateOpened'] = undefined;

/**
 * Date when the email changed the status to 'clicked'
 * @member {Date} DateClicked
 */
EmailStatus.prototype['DateClicked'] = undefined;

/**
 * Detailed error or bounced message.
 * @member {String} ErrorMessage
 */
EmailStatus.prototype['ErrorMessage'] = undefined;

/**
 * ID number of transaction
 * @member {String} TransactionID
 */
EmailStatus.prototype['TransactionID'] = undefined;

/**
 * Envelope from address
 * @member {String} EnvelopeFrom
 */
EmailStatus.prototype['EnvelopeFrom'] = undefined;
var _default = EmailStatus;
exports["default"] = _default;
},{"../ApiClient":1,"./LogJobStatus":66}],46:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _EmailContent = _interopRequireDefault(require("./EmailContent"));
var _Options = _interopRequireDefault(require("./Options"));
var _TransactionalRecipient = _interopRequireDefault(require("./TransactionalRecipient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * The EmailTransactionalMessageData model module.
 * @module model/EmailTransactionalMessageData
 * @version 4.0.23
 */
var EmailTransactionalMessageData = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>EmailTransactionalMessageData</code>.
   * Email data
   * @alias module:model/EmailTransactionalMessageData
   * @param recipients {module:model/TransactionalRecipient} 
   */
  function EmailTransactionalMessageData(recipients) {
    _classCallCheck(this, EmailTransactionalMessageData);
    EmailTransactionalMessageData.initialize(this, recipients);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  _createClass(EmailTransactionalMessageData, null, [{
    key: "initialize",
    value: function initialize(obj, recipients) {
      obj['Recipients'] = recipients;
    }

    /**
     * Constructs a <code>EmailTransactionalMessageData</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/EmailTransactionalMessageData} obj Optional instance to populate.
     * @return {module:model/EmailTransactionalMessageData} The populated <code>EmailTransactionalMessageData</code> instance.
     */
  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new EmailTransactionalMessageData();
        if (data.hasOwnProperty('Recipients')) {
          obj['Recipients'] = _TransactionalRecipient["default"].constructFromObject(data['Recipients']);
        }
        if (data.hasOwnProperty('Content')) {
          obj['Content'] = _EmailContent["default"].constructFromObject(data['Content']);
        }
        if (data.hasOwnProperty('Options')) {
          obj['Options'] = _Options["default"].constructFromObject(data['Options']);
        }
      }
      return obj;
    }

    /**
     * Validates the JSON data with respect to <code>EmailTransactionalMessageData</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>EmailTransactionalMessageData</code>.
     */
  }, {
    key: "validateJSON",
    value: function validateJSON(data) {
      // check to make sure all required properties are present in the JSON string
      var _iterator = _createForOfIteratorHelper(EmailTransactionalMessageData.RequiredProperties),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var property = _step.value;
          if (!data[property]) {
            throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
          }
        }
        // validate the optional field `Recipients`
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      if (data['Recipients']) {
        // data not null
        _TransactionalRecipient["default"].validateJSON(data['Recipients']);
      }
      // validate the optional field `Content`
      if (data['Content']) {
        // data not null
        _EmailContent["default"].validateJSON(data['Content']);
      }
      // validate the optional field `Options`
      if (data['Options']) {
        // data not null
        _Options["default"].validateJSON(data['Options']);
      }
      return true;
    }
  }]);
  return EmailTransactionalMessageData;
}();
EmailTransactionalMessageData.RequiredProperties = ["Recipients"];

/**
 * @member {module:model/TransactionalRecipient} Recipients
 */
EmailTransactionalMessageData.prototype['Recipients'] = undefined;

/**
 * @member {module:model/EmailContent} Content
 */
EmailTransactionalMessageData.prototype['Content'] = undefined;

/**
 * @member {module:model/Options} Options
 */
EmailTransactionalMessageData.prototype['Options'] = undefined;
var _default = EmailTransactionalMessageData;
exports["default"] = _default;
},{"../ApiClient":1,"./EmailContent":40,"./Options":73,"./TransactionalRecipient":94}],47:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _EmailValidationStatus = _interopRequireDefault(require("./EmailValidationStatus"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * The EmailValidationResult model module.
 * @module model/EmailValidationResult
 * @version 4.0.23
 */
var EmailValidationResult = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>EmailValidationResult</code>.
   * @alias module:model/EmailValidationResult
   */
  function EmailValidationResult() {
    _classCallCheck(this, EmailValidationResult);
    EmailValidationResult.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  _createClass(EmailValidationResult, null, [{
    key: "initialize",
    value: function initialize(obj) {}

    /**
     * Constructs a <code>EmailValidationResult</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/EmailValidationResult} obj Optional instance to populate.
     * @return {module:model/EmailValidationResult} The populated <code>EmailValidationResult</code> instance.
     */
  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new EmailValidationResult();
        if (data.hasOwnProperty('Account')) {
          obj['Account'] = _ApiClient["default"].convertToType(data['Account'], 'String');
        }
        if (data.hasOwnProperty('Domain')) {
          obj['Domain'] = _ApiClient["default"].convertToType(data['Domain'], 'String');
        }
        if (data.hasOwnProperty('Email')) {
          obj['Email'] = _ApiClient["default"].convertToType(data['Email'], 'String');
        }
        if (data.hasOwnProperty('SuggestedSpelling')) {
          obj['SuggestedSpelling'] = _ApiClient["default"].convertToType(data['SuggestedSpelling'], 'String');
        }
        if (data.hasOwnProperty('Disposable')) {
          obj['Disposable'] = _ApiClient["default"].convertToType(data['Disposable'], 'Boolean');
        }
        if (data.hasOwnProperty('Role')) {
          obj['Role'] = _ApiClient["default"].convertToType(data['Role'], 'Boolean');
        }
        if (data.hasOwnProperty('Reason')) {
          obj['Reason'] = _ApiClient["default"].convertToType(data['Reason'], 'String');
        }
        if (data.hasOwnProperty('DateAdded')) {
          obj['DateAdded'] = _ApiClient["default"].convertToType(data['DateAdded'], 'Date');
        }
        if (data.hasOwnProperty('Result')) {
          obj['Result'] = _EmailValidationStatus["default"].constructFromObject(data['Result']);
        }
      }
      return obj;
    }

    /**
     * Validates the JSON data with respect to <code>EmailValidationResult</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>EmailValidationResult</code>.
     */
  }, {
    key: "validateJSON",
    value: function validateJSON(data) {
      // ensure the json data is a string
      if (data['Account'] && !(typeof data['Account'] === 'string' || data['Account'] instanceof String)) {
        throw new Error("Expected the field `Account` to be a primitive type in the JSON string but got " + data['Account']);
      }
      // ensure the json data is a string
      if (data['Domain'] && !(typeof data['Domain'] === 'string' || data['Domain'] instanceof String)) {
        throw new Error("Expected the field `Domain` to be a primitive type in the JSON string but got " + data['Domain']);
      }
      // ensure the json data is a string
      if (data['Email'] && !(typeof data['Email'] === 'string' || data['Email'] instanceof String)) {
        throw new Error("Expected the field `Email` to be a primitive type in the JSON string but got " + data['Email']);
      }
      // ensure the json data is a string
      if (data['SuggestedSpelling'] && !(typeof data['SuggestedSpelling'] === 'string' || data['SuggestedSpelling'] instanceof String)) {
        throw new Error("Expected the field `SuggestedSpelling` to be a primitive type in the JSON string but got " + data['SuggestedSpelling']);
      }
      // ensure the json data is a string
      if (data['Reason'] && !(typeof data['Reason'] === 'string' || data['Reason'] instanceof String)) {
        throw new Error("Expected the field `Reason` to be a primitive type in the JSON string but got " + data['Reason']);
      }
      return true;
    }
  }]);
  return EmailValidationResult;
}();
/**
 * Local part of an email
 * @member {String} Account
 */
EmailValidationResult.prototype['Account'] = undefined;

/**
 * Name of selected domain.
 * @member {String} Domain
 */
EmailValidationResult.prototype['Domain'] = undefined;

/**
 * Full email address that was verified
 * @member {String} Email
 */
EmailValidationResult.prototype['Email'] = undefined;

/**
 * Suggested spelling if a possible mistake was found
 * @member {String} SuggestedSpelling
 */
EmailValidationResult.prototype['SuggestedSpelling'] = undefined;

/**
 * Does the email have a temporary domain
 * @member {Boolean} Disposable
 */
EmailValidationResult.prototype['Disposable'] = undefined;

/**
 * Is an email a role email (e.g. info@, noreply@ etc.)
 * @member {Boolean} Role
 */
EmailValidationResult.prototype['Role'] = undefined;

/**
 * All detected issues
 * @member {String} Reason
 */
EmailValidationResult.prototype['Reason'] = undefined;

/**
 * Date of creation in YYYY-MM-DDThh:ii:ss format
 * @member {Date} DateAdded
 */
EmailValidationResult.prototype['DateAdded'] = undefined;

/**
 * @member {module:model/EmailValidationStatus} Result
 */
EmailValidationResult.prototype['Result'] = undefined;
var _default = EmailValidationResult;
exports["default"] = _default;
},{"../ApiClient":1,"./EmailValidationStatus":48}],48:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
* Enum class EmailValidationStatus.
* @enum {}
* @readonly
*/
var EmailValidationStatus = /*#__PURE__*/function () {
  function EmailValidationStatus() {
    _classCallCheck(this, EmailValidationStatus);
    _defineProperty(this, "None", "None");
    _defineProperty(this, "Valid", "Valid");
    _defineProperty(this, "Unknown", "Unknown");
    _defineProperty(this, "Risky", "Risky");
    _defineProperty(this, "Invalid", "Invalid");
  }
  _createClass(EmailValidationStatus, null, [{
    key: "constructFromObject",
    value:
    /**
    * Returns a <code>EmailValidationStatus</code> enum value from a Javascript object name.
    * @param {Object} data The plain JavaScript object containing the name of the enum value.
    * @return {module:model/EmailValidationStatus} The enum <code>EmailValidationStatus</code> value.
    */
    function constructFromObject(object) {
      return object;
    }
  }]);
  return EmailValidationStatus;
}();
exports["default"] = EmailValidationStatus;
},{"../ApiClient":1}],49:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * The EmailView model module.
 * @module model/EmailView
 * @version 4.0.23
 */
var EmailView = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>EmailView</code>.
   * Email details formatted in json
   * @alias module:model/EmailView
   */
  function EmailView() {
    _classCallCheck(this, EmailView);
    EmailView.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  _createClass(EmailView, null, [{
    key: "initialize",
    value: function initialize(obj) {}

    /**
     * Constructs a <code>EmailView</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/EmailView} obj Optional instance to populate.
     * @return {module:model/EmailView} The populated <code>EmailView</code> instance.
     */
  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new EmailView();
        if (data.hasOwnProperty('Body')) {
          obj['Body'] = _ApiClient["default"].convertToType(data['Body'], 'String');
        }
        if (data.hasOwnProperty('Subject')) {
          obj['Subject'] = _ApiClient["default"].convertToType(data['Subject'], 'String');
        }
        if (data.hasOwnProperty('From')) {
          obj['From'] = _ApiClient["default"].convertToType(data['From'], 'String');
        }
      }
      return obj;
    }

    /**
     * Validates the JSON data with respect to <code>EmailView</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>EmailView</code>.
     */
  }, {
    key: "validateJSON",
    value: function validateJSON(data) {
      // ensure the json data is a string
      if (data['Body'] && !(typeof data['Body'] === 'string' || data['Body'] instanceof String)) {
        throw new Error("Expected the field `Body` to be a primitive type in the JSON string but got " + data['Body']);
      }
      // ensure the json data is a string
      if (data['Subject'] && !(typeof data['Subject'] === 'string' || data['Subject'] instanceof String)) {
        throw new Error("Expected the field `Subject` to be a primitive type in the JSON string but got " + data['Subject']);
      }
      // ensure the json data is a string
      if (data['From'] && !(typeof data['From'] === 'string' || data['From'] instanceof String)) {
        throw new Error("Expected the field `From` to be a primitive type in the JSON string but got " + data['From']);
      }
      return true;
    }
  }]);
  return EmailView;
}();
/**
 * Body (HTML, otherwise plain text) of email
 * @member {String} Body
 */
EmailView.prototype['Body'] = undefined;

/**
 * Default subject of email.
 * @member {String} Subject
 */
EmailView.prototype['Subject'] = undefined;

/**
 * From email address
 * @member {String} From
 */
EmailView.prototype['From'] = undefined;
var _default = EmailView;
exports["default"] = _default;
},{"../ApiClient":1}],50:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * The EmailsPayload model module.
 * @module model/EmailsPayload
 * @version 4.0.23
 */
var EmailsPayload = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>EmailsPayload</code>.
   * Provide either rule or a list of emails, not both.
   * @alias module:model/EmailsPayload
   */
  function EmailsPayload() {
    _classCallCheck(this, EmailsPayload);
    EmailsPayload.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  _createClass(EmailsPayload, null, [{
    key: "initialize",
    value: function initialize(obj) {}

    /**
     * Constructs a <code>EmailsPayload</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/EmailsPayload} obj Optional instance to populate.
     * @return {module:model/EmailsPayload} The populated <code>EmailsPayload</code> instance.
     */
  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new EmailsPayload();
        if (data.hasOwnProperty('Rule')) {
          obj['Rule'] = _ApiClient["default"].convertToType(data['Rule'], 'String');
        }
        if (data.hasOwnProperty('Emails')) {
          obj['Emails'] = _ApiClient["default"].convertToType(data['Emails'], ['String']);
        }
      }
      return obj;
    }

    /**
     * Validates the JSON data with respect to <code>EmailsPayload</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>EmailsPayload</code>.
     */
  }, {
    key: "validateJSON",
    value: function validateJSON(data) {
      // ensure the json data is a string
      if (data['Rule'] && !(typeof data['Rule'] === 'string' || data['Rule'] instanceof String)) {
        throw new Error("Expected the field `Rule` to be a primitive type in the JSON string but got " + data['Rule']);
      }
      // ensure the json data is an array
      if (!Array.isArray(data['Emails'])) {
        throw new Error("Expected the field `Emails` to be an array in the JSON data but got " + data['Emails']);
      }
      return true;
    }
  }]);
  return EmailsPayload;
}();
/**
 * SQL-like rule. Sending 'All' as a value loads all resources of the given type. Help for building a segment rule can be found here: https://help.elasticemail.com/en/articles/5162182-segment-rules
 * @member {String} Rule
 */
EmailsPayload.prototype['Rule'] = undefined;

/**
 * Comma delimited list of contact emails
 * @member {Array.<String>} Emails
 */
EmailsPayload.prototype['Emails'] = undefined;
var _default = EmailsPayload;
exports["default"] = _default;
},{"../ApiClient":1}],51:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
* Enum class EncodingType.
* @enum {}
* @readonly
*/
var EncodingType = /*#__PURE__*/function () {
  function EncodingType() {
    _classCallCheck(this, EncodingType);
    _defineProperty(this, "UserProvided", "UserProvided");
    _defineProperty(this, "None", "None");
    _defineProperty(this, "Raw7bit", "Raw7bit");
    _defineProperty(this, "Raw8bit", "Raw8bit");
    _defineProperty(this, "QuotedPrintable", "QuotedPrintable");
    _defineProperty(this, "Base64", "Base64");
    _defineProperty(this, "Uue", "Uue");
  }
  _createClass(EncodingType, null, [{
    key: "constructFromObject",
    value:
    /**
    * Returns a <code>EncodingType</code> enum value from a Javascript object name.
    * @param {Object} data The plain JavaScript object containing the name of the enum value.
    * @return {module:model/EncodingType} The enum <code>EncodingType</code> value.
    */
    function constructFromObject(object) {
      return object;
    }
  }]);
  return EncodingType;
}();
exports["default"] = EncodingType;
},{"../ApiClient":1}],52:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
* Enum class EventType.
* @enum {}
* @readonly
*/
var EventType = /*#__PURE__*/function () {
  function EventType() {
    _classCallCheck(this, EventType);
    _defineProperty(this, "Submission", "Submission");
    _defineProperty(this, "FailedAttempt", "FailedAttempt");
    _defineProperty(this, "Bounce", "Bounce");
    _defineProperty(this, "Sent", "Sent");
    _defineProperty(this, "Open", "Open");
    _defineProperty(this, "Click", "Click");
    _defineProperty(this, "Unsubscribe", "Unsubscribe");
    _defineProperty(this, "Complaint", "Complaint");
  }
  _createClass(EventType, null, [{
    key: "constructFromObject",
    value:
    /**
    * Returns a <code>EventType</code> enum value from a Javascript object name.
    * @param {Object} data The plain JavaScript object containing the name of the enum value.
    * @return {module:model/EventType} The enum <code>EventType</code> value.
    */
    function constructFromObject(object) {
      return object;
    }
  }]);
  return EventType;
}();
exports["default"] = EventType;
},{"../ApiClient":1}],53:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
* Enum class EventsOrderBy.
* @enum {}
* @readonly
*/
var EventsOrderBy = /*#__PURE__*/function () {
  function EventsOrderBy() {
    _classCallCheck(this, EventsOrderBy);
    _defineProperty(this, "DateDescending", "DateDescending");
    _defineProperty(this, "DateAscending", "DateAscending");
  }
  _createClass(EventsOrderBy, null, [{
    key: "constructFromObject",
    value:
    /**
    * Returns a <code>EventsOrderBy</code> enum value from a Javascript object name.
    * @param {Object} data The plain JavaScript object containing the name of the enum value.
    * @return {module:model/EventsOrderBy} The enum <code>EventsOrderBy</code> value.
    */
    function constructFromObject(object) {
      return object;
    }
  }]);
  return EventsOrderBy;
}();
exports["default"] = EventsOrderBy;
},{"../ApiClient":1}],54:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
* Enum class ExportFileFormats.
* @enum {}
* @readonly
*/
var ExportFileFormats = /*#__PURE__*/function () {
  function ExportFileFormats() {
    _classCallCheck(this, ExportFileFormats);
    _defineProperty(this, "Csv", "Csv");
    _defineProperty(this, "Xml", "Xml");
    _defineProperty(this, "Json", "Json");
  }
  _createClass(ExportFileFormats, null, [{
    key: "constructFromObject",
    value:
    /**
    * Returns a <code>ExportFileFormats</code> enum value from a Javascript object name.
    * @param {Object} data The plain JavaScript object containing the name of the enum value.
    * @return {module:model/ExportFileFormats} The enum <code>ExportFileFormats</code> value.
    */
    function constructFromObject(object) {
      return object;
    }
  }]);
  return ExportFileFormats;
}();
exports["default"] = ExportFileFormats;
},{"../ApiClient":1}],55:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * The ExportLink model module.
 * @module model/ExportLink
 * @version 4.0.23
 */
var ExportLink = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>ExportLink</code>.
   * @alias module:model/ExportLink
   */
  function ExportLink() {
    _classCallCheck(this, ExportLink);
    ExportLink.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  _createClass(ExportLink, null, [{
    key: "initialize",
    value: function initialize(obj) {}

    /**
     * Constructs a <code>ExportLink</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ExportLink} obj Optional instance to populate.
     * @return {module:model/ExportLink} The populated <code>ExportLink</code> instance.
     */
  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new ExportLink();
        if (data.hasOwnProperty('Link')) {
          obj['Link'] = _ApiClient["default"].convertToType(data['Link'], 'String');
        }
        if (data.hasOwnProperty('PublicExportID')) {
          obj['PublicExportID'] = _ApiClient["default"].convertToType(data['PublicExportID'], 'String');
        }
      }
      return obj;
    }

    /**
     * Validates the JSON data with respect to <code>ExportLink</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>ExportLink</code>.
     */
  }, {
    key: "validateJSON",
    value: function validateJSON(data) {
      // ensure the json data is a string
      if (data['Link'] && !(typeof data['Link'] === 'string' || data['Link'] instanceof String)) {
        throw new Error("Expected the field `Link` to be a primitive type in the JSON string but got " + data['Link']);
      }
      // ensure the json data is a string
      if (data['PublicExportID'] && !(typeof data['PublicExportID'] === 'string' || data['PublicExportID'] instanceof String)) {
        throw new Error("Expected the field `PublicExportID` to be a primitive type in the JSON string but got " + data['PublicExportID']);
      }
      return true;
    }
  }]);
  return ExportLink;
}();
/**
 * Direct URL to the exported file
 * @member {String} Link
 */
ExportLink.prototype['Link'] = undefined;

/**
 * ID of the exported file
 * @member {String} PublicExportID
 */
ExportLink.prototype['PublicExportID'] = undefined;
var _default = ExportLink;
exports["default"] = _default;
},{"../ApiClient":1}],56:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
* Enum class ExportStatus.
* @enum {}
* @readonly
*/
var ExportStatus = /*#__PURE__*/function () {
  function ExportStatus() {
    _classCallCheck(this, ExportStatus);
    _defineProperty(this, "Error", "Error");
    _defineProperty(this, "Loading", "Loading");
    _defineProperty(this, "Ready", "Ready");
    _defineProperty(this, "Expired", "Expired");
  }
  _createClass(ExportStatus, null, [{
    key: "constructFromObject",
    value:
    /**
    * Returns a <code>ExportStatus</code> enum value from a Javascript object name.
    * @param {Object} data The plain JavaScript object containing the name of the enum value.
    * @return {module:model/ExportStatus} The enum <code>ExportStatus</code> value.
    */
    function constructFromObject(object) {
      return object;
    }
  }]);
  return ExportStatus;
}();
exports["default"] = ExportStatus;
},{"../ApiClient":1}],57:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * The FileInfo model module.
 * @module model/FileInfo
 * @version 4.0.23
 */
var FileInfo = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>FileInfo</code>.
   * File information
   * @alias module:model/FileInfo
   */
  function FileInfo() {
    _classCallCheck(this, FileInfo);
    FileInfo.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  _createClass(FileInfo, null, [{
    key: "initialize",
    value: function initialize(obj) {}

    /**
     * Constructs a <code>FileInfo</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/FileInfo} obj Optional instance to populate.
     * @return {module:model/FileInfo} The populated <code>FileInfo</code> instance.
     */
  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new FileInfo();
        if (data.hasOwnProperty('FileName')) {
          obj['FileName'] = _ApiClient["default"].convertToType(data['FileName'], 'String');
        }
        if (data.hasOwnProperty('Size')) {
          obj['Size'] = _ApiClient["default"].convertToType(data['Size'], 'Number');
        }
        if (data.hasOwnProperty('DateAdded')) {
          obj['DateAdded'] = _ApiClient["default"].convertToType(data['DateAdded'], 'Date');
        }
        if (data.hasOwnProperty('ExpirationDate')) {
          obj['ExpirationDate'] = _ApiClient["default"].convertToType(data['ExpirationDate'], 'Date');
        }
        if (data.hasOwnProperty('ContentType')) {
          obj['ContentType'] = _ApiClient["default"].convertToType(data['ContentType'], 'String');
        }
      }
      return obj;
    }

    /**
     * Validates the JSON data with respect to <code>FileInfo</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>FileInfo</code>.
     */
  }, {
    key: "validateJSON",
    value: function validateJSON(data) {
      // ensure the json data is a string
      if (data['FileName'] && !(typeof data['FileName'] === 'string' || data['FileName'] instanceof String)) {
        throw new Error("Expected the field `FileName` to be a primitive type in the JSON string but got " + data['FileName']);
      }
      // ensure the json data is a string
      if (data['ContentType'] && !(typeof data['ContentType'] === 'string' || data['ContentType'] instanceof String)) {
        throw new Error("Expected the field `ContentType` to be a primitive type in the JSON string but got " + data['ContentType']);
      }
      return true;
    }
  }]);
  return FileInfo;
}();
/**
 * Name of your file including extension.
 * @member {String} FileName
 */
FileInfo.prototype['FileName'] = undefined;

/**
 * Size of your attachment (in bytes).
 * @member {Number} Size
 */
FileInfo.prototype['Size'] = undefined;

/**
 * Date of creation in YYYY-MM-DDThh:ii:ss format
 * @member {Date} DateAdded
 */
FileInfo.prototype['DateAdded'] = undefined;

/**
 * Date when the file will be deleted from your Account.
 * @member {Date} ExpirationDate
 */
FileInfo.prototype['ExpirationDate'] = undefined;

/**
 * Content type of the file.
 * @member {String} ContentType
 */
FileInfo.prototype['ContentType'] = undefined;
var _default = FileInfo;
exports["default"] = _default;
},{"../ApiClient":1}],58:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * The FilePayload model module.
 * @module model/FilePayload
 * @version 4.0.23
 */
var FilePayload = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>FilePayload</code>.
   * @alias module:model/FilePayload
   * @param binaryContent {Blob} Content of the file sent as binary data
   */
  function FilePayload(binaryContent) {
    _classCallCheck(this, FilePayload);
    FilePayload.initialize(this, binaryContent);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  _createClass(FilePayload, null, [{
    key: "initialize",
    value: function initialize(obj, binaryContent) {
      obj['BinaryContent'] = binaryContent;
    }

    /**
     * Constructs a <code>FilePayload</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/FilePayload} obj Optional instance to populate.
     * @return {module:model/FilePayload} The populated <code>FilePayload</code> instance.
     */
  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new FilePayload();
        if (data.hasOwnProperty('BinaryContent')) {
          obj['BinaryContent'] = _ApiClient["default"].convertToType(data['BinaryContent'], 'Blob');
        }
        if (data.hasOwnProperty('Name')) {
          obj['Name'] = _ApiClient["default"].convertToType(data['Name'], 'String');
        }
        if (data.hasOwnProperty('ContentType')) {
          obj['ContentType'] = _ApiClient["default"].convertToType(data['ContentType'], 'String');
        }
      }
      return obj;
    }

    /**
     * Validates the JSON data with respect to <code>FilePayload</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>FilePayload</code>.
     */
  }, {
    key: "validateJSON",
    value: function validateJSON(data) {
      // check to make sure all required properties are present in the JSON string
      var _iterator = _createForOfIteratorHelper(FilePayload.RequiredProperties),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var property = _step.value;
          if (!data[property]) {
            throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
          }
        }
        // ensure the json data is a string
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      if (data['Name'] && !(typeof data['Name'] === 'string' || data['Name'] instanceof String)) {
        throw new Error("Expected the field `Name` to be a primitive type in the JSON string but got " + data['Name']);
      }
      // ensure the json data is a string
      if (data['ContentType'] && !(typeof data['ContentType'] === 'string' || data['ContentType'] instanceof String)) {
        throw new Error("Expected the field `ContentType` to be a primitive type in the JSON string but got " + data['ContentType']);
      }
      return true;
    }
  }]);
  return FilePayload;
}();
FilePayload.RequiredProperties = ["BinaryContent"];

/**
 * Content of the file sent as binary data
 * @member {Blob} BinaryContent
 */
FilePayload.prototype['BinaryContent'] = undefined;

/**
 * Filename
 * @member {String} Name
 */
FilePayload.prototype['Name'] = undefined;

/**
 * Type of file's content (e.g. image/jpeg)
 * @member {String} ContentType
 */
FilePayload.prototype['ContentType'] = undefined;
var _default = FilePayload;
exports["default"] = _default;
},{"../ApiClient":1}],59:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * The FileUploadResult model module.
 * @module model/FileUploadResult
 * @version 4.0.23
 */
var FileUploadResult = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>FileUploadResult</code>.
   * @alias module:model/FileUploadResult
   */
  function FileUploadResult() {
    _classCallCheck(this, FileUploadResult);
    FileUploadResult.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  _createClass(FileUploadResult, null, [{
    key: "initialize",
    value: function initialize(obj) {}

    /**
     * Constructs a <code>FileUploadResult</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/FileUploadResult} obj Optional instance to populate.
     * @return {module:model/FileUploadResult} The populated <code>FileUploadResult</code> instance.
     */
  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new FileUploadResult();
        if (data.hasOwnProperty('EmailsCount')) {
          obj['EmailsCount'] = _ApiClient["default"].convertToType(data['EmailsCount'], 'Number');
        }
        if (data.hasOwnProperty('DuplicatedEmailsCount')) {
          obj['DuplicatedEmailsCount'] = _ApiClient["default"].convertToType(data['DuplicatedEmailsCount'], 'Number');
        }
      }
      return obj;
    }

    /**
     * Validates the JSON data with respect to <code>FileUploadResult</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>FileUploadResult</code>.
     */
  }, {
    key: "validateJSON",
    value: function validateJSON(data) {
      return true;
    }
  }]);
  return FileUploadResult;
}();
/**
 * How many unique emails were detected the file
 * @member {Number} EmailsCount
 */
FileUploadResult.prototype['EmailsCount'] = undefined;

/**
 * How many email duplicates were detected
 * @member {Number} DuplicatedEmailsCount
 */
FileUploadResult.prototype['DuplicatedEmailsCount'] = undefined;
var _default = FileUploadResult;
exports["default"] = _default;
},{"../ApiClient":1}],60:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _InboundRouteActionType = _interopRequireDefault(require("./InboundRouteActionType"));
var _InboundRouteFilterType = _interopRequireDefault(require("./InboundRouteFilterType"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * The InboundPayload model module.
 * @module model/InboundPayload
 * @version 4.0.23
 */
var InboundPayload = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>InboundPayload</code>.
   * @alias module:model/InboundPayload
   * @param filter {String} Filter of the inbound data
   * @param name {String} Name of this route
   * @param filterType {module:model/InboundRouteFilterType} 
   * @param actionType {module:model/InboundRouteActionType} 
   */
  function InboundPayload(filter, name, filterType, actionType) {
    _classCallCheck(this, InboundPayload);
    InboundPayload.initialize(this, filter, name, filterType, actionType);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  _createClass(InboundPayload, null, [{
    key: "initialize",
    value: function initialize(obj, filter, name, filterType, actionType) {
      obj['Filter'] = filter;
      obj['Name'] = name;
      obj['FilterType'] = filterType;
      obj['ActionType'] = actionType;
    }

    /**
     * Constructs a <code>InboundPayload</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/InboundPayload} obj Optional instance to populate.
     * @return {module:model/InboundPayload} The populated <code>InboundPayload</code> instance.
     */
  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new InboundPayload();
        if (data.hasOwnProperty('Filter')) {
          obj['Filter'] = _ApiClient["default"].convertToType(data['Filter'], 'String');
        }
        if (data.hasOwnProperty('Name')) {
          obj['Name'] = _ApiClient["default"].convertToType(data['Name'], 'String');
        }
        if (data.hasOwnProperty('FilterType')) {
          obj['FilterType'] = _InboundRouteFilterType["default"].constructFromObject(data['FilterType']);
        }
        if (data.hasOwnProperty('ActionType')) {
          obj['ActionType'] = _InboundRouteActionType["default"].constructFromObject(data['ActionType']);
        }
        if (data.hasOwnProperty('EmailAddress')) {
          obj['EmailAddress'] = _ApiClient["default"].convertToType(data['EmailAddress'], 'String');
        }
        if (data.hasOwnProperty('HttpAddress')) {
          obj['HttpAddress'] = _ApiClient["default"].convertToType(data['HttpAddress'], 'String');
        }
      }
      return obj;
    }

    /**
     * Validates the JSON data with respect to <code>InboundPayload</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>InboundPayload</code>.
     */
  }, {
    key: "validateJSON",
    value: function validateJSON(data) {
      // check to make sure all required properties are present in the JSON string
      var _iterator = _createForOfIteratorHelper(InboundPayload.RequiredProperties),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var property = _step.value;
          if (!data[property]) {
            throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
          }
        }
        // ensure the json data is a string
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      if (data['Filter'] && !(typeof data['Filter'] === 'string' || data['Filter'] instanceof String)) {
        throw new Error("Expected the field `Filter` to be a primitive type in the JSON string but got " + data['Filter']);
      }
      // ensure the json data is a string
      if (data['Name'] && !(typeof data['Name'] === 'string' || data['Name'] instanceof String)) {
        throw new Error("Expected the field `Name` to be a primitive type in the JSON string but got " + data['Name']);
      }
      // ensure the json data is a string
      if (data['EmailAddress'] && !(typeof data['EmailAddress'] === 'string' || data['EmailAddress'] instanceof String)) {
        throw new Error("Expected the field `EmailAddress` to be a primitive type in the JSON string but got " + data['EmailAddress']);
      }
      // ensure the json data is a string
      if (data['HttpAddress'] && !(typeof data['HttpAddress'] === 'string' || data['HttpAddress'] instanceof String)) {
        throw new Error("Expected the field `HttpAddress` to be a primitive type in the JSON string but got " + data['HttpAddress']);
      }
      return true;
    }
  }]);
  return InboundPayload;
}();
InboundPayload.RequiredProperties = ["Filter", "Name", "FilterType", "ActionType"];

/**
 * Filter of the inbound data
 * @member {String} Filter
 */
InboundPayload.prototype['Filter'] = undefined;

/**
 * Name of this route
 * @member {String} Name
 */
InboundPayload.prototype['Name'] = undefined;

/**
 * @member {module:model/InboundRouteFilterType} FilterType
 */
InboundPayload.prototype['FilterType'] = undefined;

/**
 * @member {module:model/InboundRouteActionType} ActionType
 */
InboundPayload.prototype['ActionType'] = undefined;

/**
 * Email to forward the inbound to
 * @member {String} EmailAddress
 */
InboundPayload.prototype['EmailAddress'] = undefined;

/**
 * Address to notify about the inbound
 * @member {String} HttpAddress
 */
InboundPayload.prototype['HttpAddress'] = undefined;
var _default = InboundPayload;
exports["default"] = _default;
},{"../ApiClient":1,"./InboundRouteActionType":62,"./InboundRouteFilterType":63}],61:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _InboundRouteActionType = _interopRequireDefault(require("./InboundRouteActionType"));
var _InboundRouteFilterType = _interopRequireDefault(require("./InboundRouteFilterType"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * The InboundRoute model module.
 * @module model/InboundRoute
 * @version 4.0.23
 */
var InboundRoute = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>InboundRoute</code>.
   * @alias module:model/InboundRoute
   */
  function InboundRoute() {
    _classCallCheck(this, InboundRoute);
    InboundRoute.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  _createClass(InboundRoute, null, [{
    key: "initialize",
    value: function initialize(obj) {}

    /**
     * Constructs a <code>InboundRoute</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/InboundRoute} obj Optional instance to populate.
     * @return {module:model/InboundRoute} The populated <code>InboundRoute</code> instance.
     */
  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new InboundRoute();
        if (data.hasOwnProperty('PublicId')) {
          obj['PublicId'] = _ApiClient["default"].convertToType(data['PublicId'], 'String');
        }
        if (data.hasOwnProperty('Name')) {
          obj['Name'] = _ApiClient["default"].convertToType(data['Name'], 'String');
        }
        if (data.hasOwnProperty('FilterType')) {
          obj['FilterType'] = _InboundRouteFilterType["default"].constructFromObject(data['FilterType']);
        }
        if (data.hasOwnProperty('Filter')) {
          obj['Filter'] = _ApiClient["default"].convertToType(data['Filter'], 'String');
        }
        if (data.hasOwnProperty('ActionType')) {
          obj['ActionType'] = _InboundRouteActionType["default"].constructFromObject(data['ActionType']);
        }
        if (data.hasOwnProperty('ActionParameter')) {
          obj['ActionParameter'] = _ApiClient["default"].convertToType(data['ActionParameter'], 'String');
        }
        if (data.hasOwnProperty('SortOrder')) {
          obj['SortOrder'] = _ApiClient["default"].convertToType(data['SortOrder'], 'Number');
        }
      }
      return obj;
    }

    /**
     * Validates the JSON data with respect to <code>InboundRoute</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>InboundRoute</code>.
     */
  }, {
    key: "validateJSON",
    value: function validateJSON(data) {
      // ensure the json data is a string
      if (data['PublicId'] && !(typeof data['PublicId'] === 'string' || data['PublicId'] instanceof String)) {
        throw new Error("Expected the field `PublicId` to be a primitive type in the JSON string but got " + data['PublicId']);
      }
      // ensure the json data is a string
      if (data['Name'] && !(typeof data['Name'] === 'string' || data['Name'] instanceof String)) {
        throw new Error("Expected the field `Name` to be a primitive type in the JSON string but got " + data['Name']);
      }
      // ensure the json data is a string
      if (data['Filter'] && !(typeof data['Filter'] === 'string' || data['Filter'] instanceof String)) {
        throw new Error("Expected the field `Filter` to be a primitive type in the JSON string but got " + data['Filter']);
      }
      // ensure the json data is a string
      if (data['ActionParameter'] && !(typeof data['ActionParameter'] === 'string' || data['ActionParameter'] instanceof String)) {
        throw new Error("Expected the field `ActionParameter` to be a primitive type in the JSON string but got " + data['ActionParameter']);
      }
      return true;
    }
  }]);
  return InboundRoute;
}();
/**
 * @member {String} PublicId
 */
InboundRoute.prototype['PublicId'] = undefined;

/**
 * Name of this route
 * @member {String} Name
 */
InboundRoute.prototype['Name'] = undefined;

/**
 * @member {module:model/InboundRouteFilterType} FilterType
 */
InboundRoute.prototype['FilterType'] = undefined;

/**
 * Filter of the inbound data
 * @member {String} Filter
 */
InboundRoute.prototype['Filter'] = undefined;

/**
 * @member {module:model/InboundRouteActionType} ActionType
 */
InboundRoute.prototype['ActionType'] = undefined;

/**
 * URL address or Email to notify about the inbound
 * @member {String} ActionParameter
 */
InboundRoute.prototype['ActionParameter'] = undefined;

/**
 * Place of this route in your routes queue's order
 * @member {Number} SortOrder
 */
InboundRoute.prototype['SortOrder'] = undefined;
var _default = InboundRoute;
exports["default"] = _default;
},{"../ApiClient":1,"./InboundRouteActionType":62,"./InboundRouteFilterType":63}],62:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
* Enum class InboundRouteActionType.
* @enum {}
* @readonly
*/
var InboundRouteActionType = /*#__PURE__*/function () {
  function InboundRouteActionType() {
    _classCallCheck(this, InboundRouteActionType);
    _defineProperty(this, "ForwardToEmail", "ForwardToEmail");
    _defineProperty(this, "NotifyViaHttp", "NotifyViaHttp");
    _defineProperty(this, "Stop", "Stop");
  }
  _createClass(InboundRouteActionType, null, [{
    key: "constructFromObject",
    value:
    /**
    * Returns a <code>InboundRouteActionType</code> enum value from a Javascript object name.
    * @param {Object} data The plain JavaScript object containing the name of the enum value.
    * @return {module:model/InboundRouteActionType} The enum <code>InboundRouteActionType</code> value.
    */
    function constructFromObject(object) {
      return object;
    }
  }]);
  return InboundRouteActionType;
}();
exports["default"] = InboundRouteActionType;
},{"../ApiClient":1}],63:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
* Enum class InboundRouteFilterType.
* @enum {}
* @readonly
*/
var InboundRouteFilterType = /*#__PURE__*/function () {
  function InboundRouteFilterType() {
    _classCallCheck(this, InboundRouteFilterType);
    _defineProperty(this, "EmailAddress", "EmailAddress");
    _defineProperty(this, "Subject", "Subject");
  }
  _createClass(InboundRouteFilterType, null, [{
    key: "constructFromObject",
    value:
    /**
    * Returns a <code>InboundRouteFilterType</code> enum value from a Javascript object name.
    * @param {Object} data The plain JavaScript object containing the name of the enum value.
    * @return {module:model/InboundRouteFilterType} The enum <code>InboundRouteFilterType</code> value.
    */
    function constructFromObject(object) {
      return object;
    }
  }]);
  return InboundRouteFilterType;
}();
exports["default"] = InboundRouteFilterType;
},{"../ApiClient":1}],64:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * The ListPayload model module.
 * @module model/ListPayload
 * @version 4.0.23
 */
var ListPayload = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>ListPayload</code>.
   * @alias module:model/ListPayload
   * @param listName {String} Name of your list.
   */
  function ListPayload(listName) {
    _classCallCheck(this, ListPayload);
    ListPayload.initialize(this, listName);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  _createClass(ListPayload, null, [{
    key: "initialize",
    value: function initialize(obj, listName) {
      obj['ListName'] = listName;
    }

    /**
     * Constructs a <code>ListPayload</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ListPayload} obj Optional instance to populate.
     * @return {module:model/ListPayload} The populated <code>ListPayload</code> instance.
     */
  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new ListPayload();
        if (data.hasOwnProperty('ListName')) {
          obj['ListName'] = _ApiClient["default"].convertToType(data['ListName'], 'String');
        }
        if (data.hasOwnProperty('AllowUnsubscribe')) {
          obj['AllowUnsubscribe'] = _ApiClient["default"].convertToType(data['AllowUnsubscribe'], 'Boolean');
        }
        if (data.hasOwnProperty('Emails')) {
          obj['Emails'] = _ApiClient["default"].convertToType(data['Emails'], ['String']);
        }
      }
      return obj;
    }

    /**
     * Validates the JSON data with respect to <code>ListPayload</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>ListPayload</code>.
     */
  }, {
    key: "validateJSON",
    value: function validateJSON(data) {
      // check to make sure all required properties are present in the JSON string
      var _iterator = _createForOfIteratorHelper(ListPayload.RequiredProperties),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var property = _step.value;
          if (!data[property]) {
            throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
          }
        }
        // ensure the json data is a string
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      if (data['ListName'] && !(typeof data['ListName'] === 'string' || data['ListName'] instanceof String)) {
        throw new Error("Expected the field `ListName` to be a primitive type in the JSON string but got " + data['ListName']);
      }
      // ensure the json data is an array
      if (!Array.isArray(data['Emails'])) {
        throw new Error("Expected the field `Emails` to be an array in the JSON data but got " + data['Emails']);
      }
      return true;
    }
  }]);
  return ListPayload;
}();
ListPayload.RequiredProperties = ["ListName"];

/**
 * Name of your list.
 * @member {String} ListName
 */
ListPayload.prototype['ListName'] = undefined;

/**
 * True: Allow unsubscribing from this list. Otherwise, false
 * @member {Boolean} AllowUnsubscribe
 */
ListPayload.prototype['AllowUnsubscribe'] = undefined;

/**
 * Comma delimited list of existing contact emails that should be added to this list. Leave empty for all contacts
 * @member {Array.<String>} Emails
 */
ListPayload.prototype['Emails'] = undefined;
var _default = ListPayload;
exports["default"] = _default;
},{"../ApiClient":1}],65:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * The ListUpdatePayload model module.
 * @module model/ListUpdatePayload
 * @version 4.0.23
 */
var ListUpdatePayload = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>ListUpdatePayload</code>.
   * @alias module:model/ListUpdatePayload
   */
  function ListUpdatePayload() {
    _classCallCheck(this, ListUpdatePayload);
    ListUpdatePayload.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  _createClass(ListUpdatePayload, null, [{
    key: "initialize",
    value: function initialize(obj) {}

    /**
     * Constructs a <code>ListUpdatePayload</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ListUpdatePayload} obj Optional instance to populate.
     * @return {module:model/ListUpdatePayload} The populated <code>ListUpdatePayload</code> instance.
     */
  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new ListUpdatePayload();
        if (data.hasOwnProperty('NewListName')) {
          obj['NewListName'] = _ApiClient["default"].convertToType(data['NewListName'], 'String');
        }
        if (data.hasOwnProperty('AllowUnsubscribe')) {
          obj['AllowUnsubscribe'] = _ApiClient["default"].convertToType(data['AllowUnsubscribe'], 'Boolean');
        }
      }
      return obj;
    }

    /**
     * Validates the JSON data with respect to <code>ListUpdatePayload</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>ListUpdatePayload</code>.
     */
  }, {
    key: "validateJSON",
    value: function validateJSON(data) {
      // ensure the json data is a string
      if (data['NewListName'] && !(typeof data['NewListName'] === 'string' || data['NewListName'] instanceof String)) {
        throw new Error("Expected the field `NewListName` to be a primitive type in the JSON string but got " + data['NewListName']);
      }
      return true;
    }
  }]);
  return ListUpdatePayload;
}();
/**
 * Name of your list if you want to change it.
 * @member {String} NewListName
 */
ListUpdatePayload.prototype['NewListName'] = undefined;

/**
 * True: Allow unsubscribing from this list. Otherwise, false
 * @member {Boolean} AllowUnsubscribe
 */
ListUpdatePayload.prototype['AllowUnsubscribe'] = undefined;
var _default = ListUpdatePayload;
exports["default"] = _default;
},{"../ApiClient":1}],66:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
* Enum class LogJobStatus.
* @enum {}
* @readonly
*/
var LogJobStatus = /*#__PURE__*/function () {
  function LogJobStatus() {
    _classCallCheck(this, LogJobStatus);
    _defineProperty(this, "All", "All");
    _defineProperty(this, "ReadyToSend", "ReadyToSend");
    _defineProperty(this, "WaitingToRetry", "WaitingToRetry");
    _defineProperty(this, "Sending", "Sending");
    _defineProperty(this, "Error", "Error");
    _defineProperty(this, "Sent", "Sent");
    _defineProperty(this, "Opened", "Opened");
    _defineProperty(this, "Clicked", "Clicked");
    _defineProperty(this, "Unsubscribed", "Unsubscribed");
    _defineProperty(this, "AbuseReport", "AbuseReport");
  }
  _createClass(LogJobStatus, null, [{
    key: "constructFromObject",
    value:
    /**
    * Returns a <code>LogJobStatus</code> enum value from a Javascript object name.
    * @param {Object} data The plain JavaScript object containing the name of the enum value.
    * @return {module:model/LogJobStatus} The enum <code>LogJobStatus</code> value.
    */
    function constructFromObject(object) {
      return object;
    }
  }]);
  return LogJobStatus;
}();
exports["default"] = LogJobStatus;
},{"../ApiClient":1}],67:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * The LogStatusSummary model module.
 * @module model/LogStatusSummary
 * @version 4.0.23
 */
var LogStatusSummary = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>LogStatusSummary</code>.
   * Summary of log status
   * @alias module:model/LogStatusSummary
   */
  function LogStatusSummary() {
    _classCallCheck(this, LogStatusSummary);
    LogStatusSummary.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  _createClass(LogStatusSummary, null, [{
    key: "initialize",
    value: function initialize(obj) {}

    /**
     * Constructs a <code>LogStatusSummary</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/LogStatusSummary} obj Optional instance to populate.
     * @return {module:model/LogStatusSummary} The populated <code>LogStatusSummary</code> instance.
     */
  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new LogStatusSummary();
        if (data.hasOwnProperty('Recipients')) {
          obj['Recipients'] = _ApiClient["default"].convertToType(data['Recipients'], 'Number');
        }
        if (data.hasOwnProperty('EmailTotal')) {
          obj['EmailTotal'] = _ApiClient["default"].convertToType(data['EmailTotal'], 'Number');
        }
        if (data.hasOwnProperty('SmsTotal')) {
          obj['SmsTotal'] = _ApiClient["default"].convertToType(data['SmsTotal'], 'Number');
        }
        if (data.hasOwnProperty('Delivered')) {
          obj['Delivered'] = _ApiClient["default"].convertToType(data['Delivered'], 'Number');
        }
        if (data.hasOwnProperty('Bounced')) {
          obj['Bounced'] = _ApiClient["default"].convertToType(data['Bounced'], 'Number');
        }
        if (data.hasOwnProperty('InProgress')) {
          obj['InProgress'] = _ApiClient["default"].convertToType(data['InProgress'], 'Number');
        }
        if (data.hasOwnProperty('Opened')) {
          obj['Opened'] = _ApiClient["default"].convertToType(data['Opened'], 'Number');
        }
        if (data.hasOwnProperty('Clicked')) {
          obj['Clicked'] = _ApiClient["default"].convertToType(data['Clicked'], 'Number');
        }
        if (data.hasOwnProperty('Unsubscribed')) {
          obj['Unsubscribed'] = _ApiClient["default"].convertToType(data['Unsubscribed'], 'Number');
        }
        if (data.hasOwnProperty('Complaints')) {
          obj['Complaints'] = _ApiClient["default"].convertToType(data['Complaints'], 'Number');
        }
        if (data.hasOwnProperty('Inbound')) {
          obj['Inbound'] = _ApiClient["default"].convertToType(data['Inbound'], 'Number');
        }
        if (data.hasOwnProperty('ManualCancel')) {
          obj['ManualCancel'] = _ApiClient["default"].convertToType(data['ManualCancel'], 'Number');
        }
        if (data.hasOwnProperty('NotDelivered')) {
          obj['NotDelivered'] = _ApiClient["default"].convertToType(data['NotDelivered'], 'Number');
        }
      }
      return obj;
    }

    /**
     * Validates the JSON data with respect to <code>LogStatusSummary</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>LogStatusSummary</code>.
     */
  }, {
    key: "validateJSON",
    value: function validateJSON(data) {
      return true;
    }
  }]);
  return LogStatusSummary;
}();
/**
 * Number of recipients
 * @member {Number} Recipients
 */
LogStatusSummary.prototype['Recipients'] = undefined;

/**
 * Number of emails
 * @member {Number} EmailTotal
 */
LogStatusSummary.prototype['EmailTotal'] = undefined;

/**
 * Number of SMS
 * @member {Number} SmsTotal
 */
LogStatusSummary.prototype['SmsTotal'] = undefined;

/**
 * Number of delivered messages
 * @member {Number} Delivered
 */
LogStatusSummary.prototype['Delivered'] = undefined;

/**
 * Number of bounced messages
 * @member {Number} Bounced
 */
LogStatusSummary.prototype['Bounced'] = undefined;

/**
 * Number of messages in progress
 * @member {Number} InProgress
 */
LogStatusSummary.prototype['InProgress'] = undefined;

/**
 * Number of opened messages
 * @member {Number} Opened
 */
LogStatusSummary.prototype['Opened'] = undefined;

/**
 * Number of clicked messages
 * @member {Number} Clicked
 */
LogStatusSummary.prototype['Clicked'] = undefined;

/**
 * Number of unsubscribed messages
 * @member {Number} Unsubscribed
 */
LogStatusSummary.prototype['Unsubscribed'] = undefined;

/**
 * Number of complaint messages
 * @member {Number} Complaints
 */
LogStatusSummary.prototype['Complaints'] = undefined;

/**
 * Number of inbound messages
 * @member {Number} Inbound
 */
LogStatusSummary.prototype['Inbound'] = undefined;

/**
 * Number of manually cancelled messages
 * @member {Number} ManualCancel
 */
LogStatusSummary.prototype['ManualCancel'] = undefined;

/**
 * Number of messages flagged with 'Not Delivered'
 * @member {Number} NotDelivered
 */
LogStatusSummary.prototype['NotDelivered'] = undefined;
var _default = LogStatusSummary;
exports["default"] = _default;
},{"../ApiClient":1}],68:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _EmailContent = _interopRequireDefault(require("./EmailContent"));
var _MessageAttachment = _interopRequireDefault(require("./MessageAttachment"));
var _Options = _interopRequireDefault(require("./Options"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * The MergeEmailPayload model module.
 * @module model/MergeEmailPayload
 * @version 4.0.23
 */
var MergeEmailPayload = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>MergeEmailPayload</code>.
   * @alias module:model/MergeEmailPayload
   * @param mergeFile {module:model/MessageAttachment} 
   */
  function MergeEmailPayload(mergeFile) {
    _classCallCheck(this, MergeEmailPayload);
    MergeEmailPayload.initialize(this, mergeFile);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  _createClass(MergeEmailPayload, null, [{
    key: "initialize",
    value: function initialize(obj, mergeFile) {
      obj['MergeFile'] = mergeFile;
    }

    /**
     * Constructs a <code>MergeEmailPayload</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/MergeEmailPayload} obj Optional instance to populate.
     * @return {module:model/MergeEmailPayload} The populated <code>MergeEmailPayload</code> instance.
     */
  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new MergeEmailPayload();
        if (data.hasOwnProperty('MergeFile')) {
          obj['MergeFile'] = _MessageAttachment["default"].constructFromObject(data['MergeFile']);
        }
        if (data.hasOwnProperty('Content')) {
          obj['Content'] = _EmailContent["default"].constructFromObject(data['Content']);
        }
        if (data.hasOwnProperty('Options')) {
          obj['Options'] = _Options["default"].constructFromObject(data['Options']);
        }
      }
      return obj;
    }

    /**
     * Validates the JSON data with respect to <code>MergeEmailPayload</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>MergeEmailPayload</code>.
     */
  }, {
    key: "validateJSON",
    value: function validateJSON(data) {
      // check to make sure all required properties are present in the JSON string
      var _iterator = _createForOfIteratorHelper(MergeEmailPayload.RequiredProperties),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var property = _step.value;
          if (!data[property]) {
            throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
          }
        }
        // validate the optional field `MergeFile`
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      if (data['MergeFile']) {
        // data not null
        _MessageAttachment["default"].validateJSON(data['MergeFile']);
      }
      // validate the optional field `Content`
      if (data['Content']) {
        // data not null
        _EmailContent["default"].validateJSON(data['Content']);
      }
      // validate the optional field `Options`
      if (data['Options']) {
        // data not null
        _Options["default"].validateJSON(data['Options']);
      }
      return true;
    }
  }]);
  return MergeEmailPayload;
}();
MergeEmailPayload.RequiredProperties = ["MergeFile"];

/**
 * @member {module:model/MessageAttachment} MergeFile
 */
MergeEmailPayload.prototype['MergeFile'] = undefined;

/**
 * @member {module:model/EmailContent} Content
 */
MergeEmailPayload.prototype['Content'] = undefined;

/**
 * @member {module:model/Options} Options
 */
MergeEmailPayload.prototype['Options'] = undefined;
var _default = MergeEmailPayload;
exports["default"] = _default;
},{"../ApiClient":1,"./EmailContent":40,"./MessageAttachment":69,"./Options":73}],69:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * The MessageAttachment model module.
 * @module model/MessageAttachment
 * @version 4.0.23
 */
var MessageAttachment = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>MessageAttachment</code>.
   * @alias module:model/MessageAttachment
   * @param binaryContent {Blob} File's content as byte array (or a Base64 string)
   * @param name {String} Display name of the file
   */
  function MessageAttachment(binaryContent, name) {
    _classCallCheck(this, MessageAttachment);
    MessageAttachment.initialize(this, binaryContent, name);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  _createClass(MessageAttachment, null, [{
    key: "initialize",
    value: function initialize(obj, binaryContent, name) {
      obj['BinaryContent'] = binaryContent;
      obj['Name'] = name;
    }

    /**
     * Constructs a <code>MessageAttachment</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/MessageAttachment} obj Optional instance to populate.
     * @return {module:model/MessageAttachment} The populated <code>MessageAttachment</code> instance.
     */
  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new MessageAttachment();
        if (data.hasOwnProperty('BinaryContent')) {
          obj['BinaryContent'] = _ApiClient["default"].convertToType(data['BinaryContent'], 'Blob');
        }
        if (data.hasOwnProperty('Name')) {
          obj['Name'] = _ApiClient["default"].convertToType(data['Name'], 'String');
        }
        if (data.hasOwnProperty('ContentType')) {
          obj['ContentType'] = _ApiClient["default"].convertToType(data['ContentType'], 'String');
        }
        if (data.hasOwnProperty('Size')) {
          obj['Size'] = _ApiClient["default"].convertToType(data['Size'], 'Number');
        }
      }
      return obj;
    }

    /**
     * Validates the JSON data with respect to <code>MessageAttachment</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>MessageAttachment</code>.
     */
  }, {
    key: "validateJSON",
    value: function validateJSON(data) {
      // check to make sure all required properties are present in the JSON string
      var _iterator = _createForOfIteratorHelper(MessageAttachment.RequiredProperties),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var property = _step.value;
          if (!data[property]) {
            throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
          }
        }
        // ensure the json data is a string
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      if (data['Name'] && !(typeof data['Name'] === 'string' || data['Name'] instanceof String)) {
        throw new Error("Expected the field `Name` to be a primitive type in the JSON string but got " + data['Name']);
      }
      // ensure the json data is a string
      if (data['ContentType'] && !(typeof data['ContentType'] === 'string' || data['ContentType'] instanceof String)) {
        throw new Error("Expected the field `ContentType` to be a primitive type in the JSON string but got " + data['ContentType']);
      }
      return true;
    }
  }]);
  return MessageAttachment;
}();
MessageAttachment.RequiredProperties = ["BinaryContent", "Name"];

/**
 * File's content as byte array (or a Base64 string)
 * @member {Blob} BinaryContent
 */
MessageAttachment.prototype['BinaryContent'] = undefined;

/**
 * Display name of the file
 * @member {String} Name
 */
MessageAttachment.prototype['Name'] = undefined;

/**
 * MIME content type
 * @member {String} ContentType
 */
MessageAttachment.prototype['ContentType'] = undefined;

/**
 * Size of your attachment (in bytes).
 * @member {Number} Size
 */
MessageAttachment.prototype['Size'] = undefined;
var _default = MessageAttachment;
exports["default"] = _default;
},{"../ApiClient":1}],70:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
* Enum class MessageCategory.
* @enum {}
* @readonly
*/
var MessageCategory = /*#__PURE__*/function () {
  function MessageCategory() {
    _classCallCheck(this, MessageCategory);
    _defineProperty(this, "Unknown", "Unknown");
    _defineProperty(this, "Ignore", "Ignore");
    _defineProperty(this, "Spam", "Spam");
    _defineProperty(this, "BlackListed", "BlackListed");
    _defineProperty(this, "NoMailbox", "NoMailbox");
    _defineProperty(this, "GreyListed", "GreyListed");
    _defineProperty(this, "Throttled", "Throttled");
    _defineProperty(this, "Timeout", "Timeout");
    _defineProperty(this, "ConnectionProblem", "ConnectionProblem");
    _defineProperty(this, "SPFProblem", "SPFProblem");
    _defineProperty(this, "AccountProblem", "AccountProblem");
    _defineProperty(this, "DNSProblem", "DNSProblem");
    _defineProperty(this, "NotDeliveredCancelled", "NotDeliveredCancelled");
    _defineProperty(this, "CodeError", "CodeError");
    _defineProperty(this, "ManualCancel", "ManualCancel");
    _defineProperty(this, "ConnectionTerminated", "ConnectionTerminated");
    _defineProperty(this, "NotDelivered", "NotDelivered");
  }
  _createClass(MessageCategory, null, [{
    key: "constructFromObject",
    value:
    /**
    * Returns a <code>MessageCategory</code> enum value from a Javascript object name.
    * @param {Object} data The plain JavaScript object containing the name of the enum value.
    * @return {module:model/MessageCategory} The enum <code>MessageCategory</code> value.
    */
    function constructFromObject(object) {
      return object;
    }
  }]);
  return MessageCategory;
}();
exports["default"] = MessageCategory;
},{"../ApiClient":1}],71:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _AccessLevel = _interopRequireDefault(require("./AccessLevel"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * The NewApiKey model module.
 * @module model/NewApiKey
 * @version 4.0.23
 */
var NewApiKey = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>NewApiKey</code>.
   * Newly generated ApiKey with Token
   * @alias module:model/NewApiKey
   */
  function NewApiKey() {
    _classCallCheck(this, NewApiKey);
    NewApiKey.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  _createClass(NewApiKey, null, [{
    key: "initialize",
    value: function initialize(obj) {}

    /**
     * Constructs a <code>NewApiKey</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/NewApiKey} obj Optional instance to populate.
     * @return {module:model/NewApiKey} The populated <code>NewApiKey</code> instance.
     */
  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new NewApiKey();
        if (data.hasOwnProperty('Token')) {
          obj['Token'] = _ApiClient["default"].convertToType(data['Token'], 'String');
        }
        if (data.hasOwnProperty('AccessLevel')) {
          obj['AccessLevel'] = _ApiClient["default"].convertToType(data['AccessLevel'], [_AccessLevel["default"]]);
        }
        if (data.hasOwnProperty('Name')) {
          obj['Name'] = _ApiClient["default"].convertToType(data['Name'], 'String');
        }
        if (data.hasOwnProperty('DateCreated')) {
          obj['DateCreated'] = _ApiClient["default"].convertToType(data['DateCreated'], 'Date');
        }
        if (data.hasOwnProperty('LastUse')) {
          obj['LastUse'] = _ApiClient["default"].convertToType(data['LastUse'], 'Date');
        }
        if (data.hasOwnProperty('Expires')) {
          obj['Expires'] = _ApiClient["default"].convertToType(data['Expires'], 'Date');
        }
        if (data.hasOwnProperty('RestrictAccessToIPRange')) {
          obj['RestrictAccessToIPRange'] = _ApiClient["default"].convertToType(data['RestrictAccessToIPRange'], ['String']);
        }
      }
      return obj;
    }

    /**
     * Validates the JSON data with respect to <code>NewApiKey</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>NewApiKey</code>.
     */
  }, {
    key: "validateJSON",
    value: function validateJSON(data) {
      // ensure the json data is a string
      if (data['Token'] && !(typeof data['Token'] === 'string' || data['Token'] instanceof String)) {
        throw new Error("Expected the field `Token` to be a primitive type in the JSON string but got " + data['Token']);
      }
      // ensure the json data is an array
      if (!Array.isArray(data['AccessLevel'])) {
        throw new Error("Expected the field `AccessLevel` to be an array in the JSON data but got " + data['AccessLevel']);
      }
      // ensure the json data is a string
      if (data['Name'] && !(typeof data['Name'] === 'string' || data['Name'] instanceof String)) {
        throw new Error("Expected the field `Name` to be a primitive type in the JSON string but got " + data['Name']);
      }
      // ensure the json data is an array
      if (!Array.isArray(data['RestrictAccessToIPRange'])) {
        throw new Error("Expected the field `RestrictAccessToIPRange` to be an array in the JSON data but got " + data['RestrictAccessToIPRange']);
      }
      return true;
    }
  }]);
  return NewApiKey;
}();
/**
 * Unique token to be used in the system
 * @member {String} Token
 */
NewApiKey.prototype['Token'] = undefined;

/**
 * Access level or permission to be assigned to this ApiKey.
 * @member {Array.<module:model/AccessLevel>} AccessLevel
 */
NewApiKey.prototype['AccessLevel'] = undefined;

/**
 * Name of the ApiKey.
 * @member {String} Name
 */
NewApiKey.prototype['Name'] = undefined;

/**
 * Date this ApiKey was created.
 * @member {Date} DateCreated
 */
NewApiKey.prototype['DateCreated'] = undefined;

/**
 * Date this ApiKey was last used.
 * @member {Date} LastUse
 */
NewApiKey.prototype['LastUse'] = undefined;

/**
 * Date this ApiKey expires.
 * @member {Date} Expires
 */
NewApiKey.prototype['Expires'] = undefined;

/**
 * Which IPs can use this ApiKey
 * @member {Array.<String>} RestrictAccessToIPRange
 */
NewApiKey.prototype['RestrictAccessToIPRange'] = undefined;
var _default = NewApiKey;
exports["default"] = _default;
},{"../ApiClient":1,"./AccessLevel":17}],72:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _AccessLevel = _interopRequireDefault(require("./AccessLevel"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * The NewSmtpCredentials model module.
 * @module model/NewSmtpCredentials
 * @version 4.0.23
 */
var NewSmtpCredentials = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>NewSmtpCredentials</code>.
   * Newly generated SMTP Credentials with Token
   * @alias module:model/NewSmtpCredentials
   */
  function NewSmtpCredentials() {
    _classCallCheck(this, NewSmtpCredentials);
    NewSmtpCredentials.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  _createClass(NewSmtpCredentials, null, [{
    key: "initialize",
    value: function initialize(obj) {}

    /**
     * Constructs a <code>NewSmtpCredentials</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/NewSmtpCredentials} obj Optional instance to populate.
     * @return {module:model/NewSmtpCredentials} The populated <code>NewSmtpCredentials</code> instance.
     */
  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new NewSmtpCredentials();
        if (data.hasOwnProperty('Token')) {
          obj['Token'] = _ApiClient["default"].convertToType(data['Token'], 'String');
        }
        if (data.hasOwnProperty('AccessLevel')) {
          obj['AccessLevel'] = _AccessLevel["default"].constructFromObject(data['AccessLevel']);
        }
        if (data.hasOwnProperty('Name')) {
          obj['Name'] = _ApiClient["default"].convertToType(data['Name'], 'String');
        }
        if (data.hasOwnProperty('DateCreated')) {
          obj['DateCreated'] = _ApiClient["default"].convertToType(data['DateCreated'], 'Date');
        }
        if (data.hasOwnProperty('LastUse')) {
          obj['LastUse'] = _ApiClient["default"].convertToType(data['LastUse'], 'Date');
        }
        if (data.hasOwnProperty('Expires')) {
          obj['Expires'] = _ApiClient["default"].convertToType(data['Expires'], 'Date');
        }
        if (data.hasOwnProperty('RestrictAccessToIPRange')) {
          obj['RestrictAccessToIPRange'] = _ApiClient["default"].convertToType(data['RestrictAccessToIPRange'], ['String']);
        }
      }
      return obj;
    }

    /**
     * Validates the JSON data with respect to <code>NewSmtpCredentials</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>NewSmtpCredentials</code>.
     */
  }, {
    key: "validateJSON",
    value: function validateJSON(data) {
      // ensure the json data is a string
      if (data['Token'] && !(typeof data['Token'] === 'string' || data['Token'] instanceof String)) {
        throw new Error("Expected the field `Token` to be a primitive type in the JSON string but got " + data['Token']);
      }
      // ensure the json data is a string
      if (data['Name'] && !(typeof data['Name'] === 'string' || data['Name'] instanceof String)) {
        throw new Error("Expected the field `Name` to be a primitive type in the JSON string but got " + data['Name']);
      }
      // ensure the json data is an array
      if (!Array.isArray(data['RestrictAccessToIPRange'])) {
        throw new Error("Expected the field `RestrictAccessToIPRange` to be an array in the JSON data but got " + data['RestrictAccessToIPRange']);
      }
      return true;
    }
  }]);
  return NewSmtpCredentials;
}();
/**
 * Unique token to be used in the system
 * @member {String} Token
 */
NewSmtpCredentials.prototype['Token'] = undefined;

/**
 * @member {module:model/AccessLevel} AccessLevel
 */
NewSmtpCredentials.prototype['AccessLevel'] = undefined;

/**
 * Name of the key.
 * @member {String} Name
 */
NewSmtpCredentials.prototype['Name'] = undefined;

/**
 * Date this SmtpCredential was created.
 * @member {Date} DateCreated
 */
NewSmtpCredentials.prototype['DateCreated'] = undefined;

/**
 * Date this SmtpCredential was last used.
 * @member {Date} LastUse
 */
NewSmtpCredentials.prototype['LastUse'] = undefined;

/**
 * Date this SmtpCredential expires.
 * @member {Date} Expires
 */
NewSmtpCredentials.prototype['Expires'] = undefined;

/**
 * Which IPs can use this SmtpCredential
 * @member {Array.<String>} RestrictAccessToIPRange
 */
NewSmtpCredentials.prototype['RestrictAccessToIPRange'] = undefined;
var _default = NewSmtpCredentials;
exports["default"] = _default;
},{"../ApiClient":1,"./AccessLevel":17}],73:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _EncodingType = _interopRequireDefault(require("./EncodingType"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * The Options model module.
 * @module model/Options
 * @version 4.0.23
 */
var Options = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>Options</code>.
   * E-mail configuration
   * @alias module:model/Options
   */
  function Options() {
    _classCallCheck(this, Options);
    Options.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  _createClass(Options, null, [{
    key: "initialize",
    value: function initialize(obj) {}

    /**
     * Constructs a <code>Options</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Options} obj Optional instance to populate.
     * @return {module:model/Options} The populated <code>Options</code> instance.
     */
  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new Options();
        if (data.hasOwnProperty('TimeOffset')) {
          obj['TimeOffset'] = _ApiClient["default"].convertToType(data['TimeOffset'], 'Number');
        }
        if (data.hasOwnProperty('PoolName')) {
          obj['PoolName'] = _ApiClient["default"].convertToType(data['PoolName'], 'String');
        }
        if (data.hasOwnProperty('ChannelName')) {
          obj['ChannelName'] = _ApiClient["default"].convertToType(data['ChannelName'], 'String');
        }
        if (data.hasOwnProperty('Encoding')) {
          obj['Encoding'] = _EncodingType["default"].constructFromObject(data['Encoding']);
        }
        if (data.hasOwnProperty('TrackOpens')) {
          obj['TrackOpens'] = _ApiClient["default"].convertToType(data['TrackOpens'], 'Boolean');
        }
        if (data.hasOwnProperty('TrackClicks')) {
          obj['TrackClicks'] = _ApiClient["default"].convertToType(data['TrackClicks'], 'Boolean');
        }
      }
      return obj;
    }

    /**
     * Validates the JSON data with respect to <code>Options</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>Options</code>.
     */
  }, {
    key: "validateJSON",
    value: function validateJSON(data) {
      // ensure the json data is a string
      if (data['PoolName'] && !(typeof data['PoolName'] === 'string' || data['PoolName'] instanceof String)) {
        throw new Error("Expected the field `PoolName` to be a primitive type in the JSON string but got " + data['PoolName']);
      }
      // ensure the json data is a string
      if (data['ChannelName'] && !(typeof data['ChannelName'] === 'string' || data['ChannelName'] instanceof String)) {
        throw new Error("Expected the field `ChannelName` to be a primitive type in the JSON string but got " + data['ChannelName']);
      }
      return true;
    }
  }]);
  return Options;
}();
/**
 * By how long should an e-mail be delayed (in minutes). Maximum is 35 days.
 * @member {Number} TimeOffset
 */
Options.prototype['TimeOffset'] = undefined;

/**
 * Name of your custom IP Pool to be used in the sending process
 * @member {String} PoolName
 */
Options.prototype['PoolName'] = undefined;

/**
 * Name of selected channel.
 * @member {String} ChannelName
 */
Options.prototype['ChannelName'] = undefined;

/**
 * @member {module:model/EncodingType} Encoding
 */
Options.prototype['Encoding'] = undefined;

/**
 * Should the opens be tracked? If no value has been provided, Account's default setting will be used.
 * @member {Boolean} TrackOpens
 */
Options.prototype['TrackOpens'] = undefined;

/**
 * Should the clicks be tracked? If no value has been provided, Account's default setting will be used.
 * @member {Boolean} TrackClicks
 */
Options.prototype['TrackClicks'] = undefined;
var _default = Options;
exports["default"] = _default;
},{"../ApiClient":1,"./EncodingType":51}],74:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _EventType = _interopRequireDefault(require("./EventType"));
var _MessageCategory = _interopRequireDefault(require("./MessageCategory"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * The RecipientEvent model module.
 * @module model/RecipientEvent
 * @version 4.0.23
 */
var RecipientEvent = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>RecipientEvent</code>.
   * Detailed information about message recipient
   * @alias module:model/RecipientEvent
   */
  function RecipientEvent() {
    _classCallCheck(this, RecipientEvent);
    RecipientEvent.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  _createClass(RecipientEvent, null, [{
    key: "initialize",
    value: function initialize(obj) {}

    /**
     * Constructs a <code>RecipientEvent</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/RecipientEvent} obj Optional instance to populate.
     * @return {module:model/RecipientEvent} The populated <code>RecipientEvent</code> instance.
     */
  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new RecipientEvent();
        if (data.hasOwnProperty('TransactionID')) {
          obj['TransactionID'] = _ApiClient["default"].convertToType(data['TransactionID'], 'String');
        }
        if (data.hasOwnProperty('MsgID')) {
          obj['MsgID'] = _ApiClient["default"].convertToType(data['MsgID'], 'String');
        }
        if (data.hasOwnProperty('FromEmail')) {
          obj['FromEmail'] = _ApiClient["default"].convertToType(data['FromEmail'], 'String');
        }
        if (data.hasOwnProperty('To')) {
          obj['To'] = _ApiClient["default"].convertToType(data['To'], 'String');
        }
        if (data.hasOwnProperty('Subject')) {
          obj['Subject'] = _ApiClient["default"].convertToType(data['Subject'], 'String');
        }
        if (data.hasOwnProperty('EventType')) {
          obj['EventType'] = _EventType["default"].constructFromObject(data['EventType']);
        }
        if (data.hasOwnProperty('EventDate')) {
          obj['EventDate'] = _ApiClient["default"].convertToType(data['EventDate'], 'Date');
        }
        if (data.hasOwnProperty('ChannelName')) {
          obj['ChannelName'] = _ApiClient["default"].convertToType(data['ChannelName'], 'String');
        }
        if (data.hasOwnProperty('MessageCategory')) {
          obj['MessageCategory'] = _MessageCategory["default"].constructFromObject(data['MessageCategory']);
        }
        if (data.hasOwnProperty('NextTryOn')) {
          obj['NextTryOn'] = _ApiClient["default"].convertToType(data['NextTryOn'], 'Date');
        }
        if (data.hasOwnProperty('Message')) {
          obj['Message'] = _ApiClient["default"].convertToType(data['Message'], 'String');
        }
        if (data.hasOwnProperty('IPAddress')) {
          obj['IPAddress'] = _ApiClient["default"].convertToType(data['IPAddress'], 'String');
        }
        if (data.hasOwnProperty('PoolName')) {
          obj['PoolName'] = _ApiClient["default"].convertToType(data['PoolName'], 'String');
        }
      }
      return obj;
    }

    /**
     * Validates the JSON data with respect to <code>RecipientEvent</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>RecipientEvent</code>.
     */
  }, {
    key: "validateJSON",
    value: function validateJSON(data) {
      // ensure the json data is a string
      if (data['TransactionID'] && !(typeof data['TransactionID'] === 'string' || data['TransactionID'] instanceof String)) {
        throw new Error("Expected the field `TransactionID` to be a primitive type in the JSON string but got " + data['TransactionID']);
      }
      // ensure the json data is a string
      if (data['MsgID'] && !(typeof data['MsgID'] === 'string' || data['MsgID'] instanceof String)) {
        throw new Error("Expected the field `MsgID` to be a primitive type in the JSON string but got " + data['MsgID']);
      }
      // ensure the json data is a string
      if (data['FromEmail'] && !(typeof data['FromEmail'] === 'string' || data['FromEmail'] instanceof String)) {
        throw new Error("Expected the field `FromEmail` to be a primitive type in the JSON string but got " + data['FromEmail']);
      }
      // ensure the json data is a string
      if (data['To'] && !(typeof data['To'] === 'string' || data['To'] instanceof String)) {
        throw new Error("Expected the field `To` to be a primitive type in the JSON string but got " + data['To']);
      }
      // ensure the json data is a string
      if (data['Subject'] && !(typeof data['Subject'] === 'string' || data['Subject'] instanceof String)) {
        throw new Error("Expected the field `Subject` to be a primitive type in the JSON string but got " + data['Subject']);
      }
      // ensure the json data is a string
      if (data['ChannelName'] && !(typeof data['ChannelName'] === 'string' || data['ChannelName'] instanceof String)) {
        throw new Error("Expected the field `ChannelName` to be a primitive type in the JSON string but got " + data['ChannelName']);
      }
      // ensure the json data is a string
      if (data['Message'] && !(typeof data['Message'] === 'string' || data['Message'] instanceof String)) {
        throw new Error("Expected the field `Message` to be a primitive type in the JSON string but got " + data['Message']);
      }
      // ensure the json data is a string
      if (data['IPAddress'] && !(typeof data['IPAddress'] === 'string' || data['IPAddress'] instanceof String)) {
        throw new Error("Expected the field `IPAddress` to be a primitive type in the JSON string but got " + data['IPAddress']);
      }
      // ensure the json data is a string
      if (data['PoolName'] && !(typeof data['PoolName'] === 'string' || data['PoolName'] instanceof String)) {
        throw new Error("Expected the field `PoolName` to be a primitive type in the JSON string but got " + data['PoolName']);
      }
      return true;
    }
  }]);
  return RecipientEvent;
}();
/**
 * ID number of transaction
 * @member {String} TransactionID
 */
RecipientEvent.prototype['TransactionID'] = undefined;

/**
 * ID number of selected message.
 * @member {String} MsgID
 */
RecipientEvent.prototype['MsgID'] = undefined;

/**
 * Default From: email address.
 * @member {String} FromEmail
 */
RecipientEvent.prototype['FromEmail'] = undefined;

/**
 * Ending date for search in YYYY-MM-DDThh:mm:ss format.
 * @member {String} To
 */
RecipientEvent.prototype['To'] = undefined;

/**
 * Default subject of email.
 * @member {String} Subject
 */
RecipientEvent.prototype['Subject'] = undefined;

/**
 * @member {module:model/EventType} EventType
 */
RecipientEvent.prototype['EventType'] = undefined;

/**
 * Creation date
 * @member {Date} EventDate
 */
RecipientEvent.prototype['EventDate'] = undefined;

/**
 * Name of selected channel.
 * @member {String} ChannelName
 */
RecipientEvent.prototype['ChannelName'] = undefined;

/**
 * @member {module:model/MessageCategory} MessageCategory
 */
RecipientEvent.prototype['MessageCategory'] = undefined;

/**
 * Date of next try
 * @member {Date} NextTryOn
 */
RecipientEvent.prototype['NextTryOn'] = undefined;

/**
 * Content of message, HTML encoded
 * @member {String} Message
 */
RecipientEvent.prototype['Message'] = undefined;

/**
 * IP which this email was sent through
 * @member {String} IPAddress
 */
RecipientEvent.prototype['IPAddress'] = undefined;

/**
 * Name of an IP pool this email was sent through
 * @member {String} PoolName
 */
RecipientEvent.prototype['PoolName'] = undefined;
var _default = RecipientEvent;
exports["default"] = _default;
},{"../ApiClient":1,"./EventType":52,"./MessageCategory":70}],75:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * The Segment model module.
 * @module model/Segment
 * @version 4.0.23
 */
var Segment = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>Segment</code>.
   * Dynamic collection of Contacts, managed by SQL-like rule.
   * @alias module:model/Segment
   */
  function Segment() {
    _classCallCheck(this, Segment);
    Segment.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  _createClass(Segment, null, [{
    key: "initialize",
    value: function initialize(obj) {}

    /**
     * Constructs a <code>Segment</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Segment} obj Optional instance to populate.
     * @return {module:model/Segment} The populated <code>Segment</code> instance.
     */
  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new Segment();
        if (data.hasOwnProperty('Name')) {
          obj['Name'] = _ApiClient["default"].convertToType(data['Name'], 'String');
        }
        if (data.hasOwnProperty('Rule')) {
          obj['Rule'] = _ApiClient["default"].convertToType(data['Rule'], 'String');
        }
      }
      return obj;
    }

    /**
     * Validates the JSON data with respect to <code>Segment</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>Segment</code>.
     */
  }, {
    key: "validateJSON",
    value: function validateJSON(data) {
      // ensure the json data is a string
      if (data['Name'] && !(typeof data['Name'] === 'string' || data['Name'] instanceof String)) {
        throw new Error("Expected the field `Name` to be a primitive type in the JSON string but got " + data['Name']);
      }
      // ensure the json data is a string
      if (data['Rule'] && !(typeof data['Rule'] === 'string' || data['Rule'] instanceof String)) {
        throw new Error("Expected the field `Rule` to be a primitive type in the JSON string but got " + data['Rule']);
      }
      return true;
    }
  }]);
  return Segment;
}();
/**
 * Segment name
 * @member {String} Name
 */
Segment.prototype['Name'] = undefined;

/**
 * SQL-like rule to determine which Contacts belong to this Segment.
 * @member {String} Rule
 */
Segment.prototype['Rule'] = undefined;
var _default = Segment;
exports["default"] = _default;
},{"../ApiClient":1}],76:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * The SegmentPayload model module.
 * @module model/SegmentPayload
 * @version 4.0.23
 */
var SegmentPayload = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>SegmentPayload</code>.
   * @alias module:model/SegmentPayload
   * @param name {String} Segment name
   * @param rule {String} SQL-like rule to determine which Contacts belong to this Segment. Help for building a segment rule can be found here: https://help.elasticemail.com/en/articles/5162182-segment-rules
   */
  function SegmentPayload(name, rule) {
    _classCallCheck(this, SegmentPayload);
    SegmentPayload.initialize(this, name, rule);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  _createClass(SegmentPayload, null, [{
    key: "initialize",
    value: function initialize(obj, name, rule) {
      obj['Name'] = name;
      obj['Rule'] = rule;
    }

    /**
     * Constructs a <code>SegmentPayload</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/SegmentPayload} obj Optional instance to populate.
     * @return {module:model/SegmentPayload} The populated <code>SegmentPayload</code> instance.
     */
  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new SegmentPayload();
        if (data.hasOwnProperty('Name')) {
          obj['Name'] = _ApiClient["default"].convertToType(data['Name'], 'String');
        }
        if (data.hasOwnProperty('Rule')) {
          obj['Rule'] = _ApiClient["default"].convertToType(data['Rule'], 'String');
        }
      }
      return obj;
    }

    /**
     * Validates the JSON data with respect to <code>SegmentPayload</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>SegmentPayload</code>.
     */
  }, {
    key: "validateJSON",
    value: function validateJSON(data) {
      // check to make sure all required properties are present in the JSON string
      var _iterator = _createForOfIteratorHelper(SegmentPayload.RequiredProperties),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var property = _step.value;
          if (!data[property]) {
            throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
          }
        }
        // ensure the json data is a string
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      if (data['Name'] && !(typeof data['Name'] === 'string' || data['Name'] instanceof String)) {
        throw new Error("Expected the field `Name` to be a primitive type in the JSON string but got " + data['Name']);
      }
      // ensure the json data is a string
      if (data['Rule'] && !(typeof data['Rule'] === 'string' || data['Rule'] instanceof String)) {
        throw new Error("Expected the field `Rule` to be a primitive type in the JSON string but got " + data['Rule']);
      }
      return true;
    }
  }]);
  return SegmentPayload;
}();
SegmentPayload.RequiredProperties = ["Name", "Rule"];

/**
 * Segment name
 * @member {String} Name
 */
SegmentPayload.prototype['Name'] = undefined;

/**
 * SQL-like rule to determine which Contacts belong to this Segment. Help for building a segment rule can be found here: https://help.elasticemail.com/en/articles/5162182-segment-rules
 * @member {String} Rule
 */
SegmentPayload.prototype['Rule'] = undefined;
var _default = SegmentPayload;
exports["default"] = _default;
},{"../ApiClient":1}],77:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _AccessLevel = _interopRequireDefault(require("./AccessLevel"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * The SmtpCredentials model module.
 * @module model/SmtpCredentials
 * @version 4.0.23
 */
var SmtpCredentials = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>SmtpCredentials</code>.
   * SMTP Credentials info
   * @alias module:model/SmtpCredentials
   */
  function SmtpCredentials() {
    _classCallCheck(this, SmtpCredentials);
    SmtpCredentials.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  _createClass(SmtpCredentials, null, [{
    key: "initialize",
    value: function initialize(obj) {}

    /**
     * Constructs a <code>SmtpCredentials</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/SmtpCredentials} obj Optional instance to populate.
     * @return {module:model/SmtpCredentials} The populated <code>SmtpCredentials</code> instance.
     */
  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new SmtpCredentials();
        if (data.hasOwnProperty('AccessLevel')) {
          obj['AccessLevel'] = _AccessLevel["default"].constructFromObject(data['AccessLevel']);
        }
        if (data.hasOwnProperty('Name')) {
          obj['Name'] = _ApiClient["default"].convertToType(data['Name'], 'String');
        }
        if (data.hasOwnProperty('DateCreated')) {
          obj['DateCreated'] = _ApiClient["default"].convertToType(data['DateCreated'], 'Date');
        }
        if (data.hasOwnProperty('LastUse')) {
          obj['LastUse'] = _ApiClient["default"].convertToType(data['LastUse'], 'Date');
        }
        if (data.hasOwnProperty('Expires')) {
          obj['Expires'] = _ApiClient["default"].convertToType(data['Expires'], 'Date');
        }
        if (data.hasOwnProperty('RestrictAccessToIPRange')) {
          obj['RestrictAccessToIPRange'] = _ApiClient["default"].convertToType(data['RestrictAccessToIPRange'], ['String']);
        }
      }
      return obj;
    }

    /**
     * Validates the JSON data with respect to <code>SmtpCredentials</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>SmtpCredentials</code>.
     */
  }, {
    key: "validateJSON",
    value: function validateJSON(data) {
      // ensure the json data is a string
      if (data['Name'] && !(typeof data['Name'] === 'string' || data['Name'] instanceof String)) {
        throw new Error("Expected the field `Name` to be a primitive type in the JSON string but got " + data['Name']);
      }
      // ensure the json data is an array
      if (!Array.isArray(data['RestrictAccessToIPRange'])) {
        throw new Error("Expected the field `RestrictAccessToIPRange` to be an array in the JSON data but got " + data['RestrictAccessToIPRange']);
      }
      return true;
    }
  }]);
  return SmtpCredentials;
}();
/**
 * @member {module:model/AccessLevel} AccessLevel
 */
SmtpCredentials.prototype['AccessLevel'] = undefined;

/**
 * Name of the key.
 * @member {String} Name
 */
SmtpCredentials.prototype['Name'] = undefined;

/**
 * Date this SmtpCredential was created.
 * @member {Date} DateCreated
 */
SmtpCredentials.prototype['DateCreated'] = undefined;

/**
 * Date this SmtpCredential was last used.
 * @member {Date} LastUse
 */
SmtpCredentials.prototype['LastUse'] = undefined;

/**
 * Date this SmtpCredential expires.
 * @member {Date} Expires
 */
SmtpCredentials.prototype['Expires'] = undefined;

/**
 * Which IPs can use this SmtpCredential
 * @member {Array.<String>} RestrictAccessToIPRange
 */
SmtpCredentials.prototype['RestrictAccessToIPRange'] = undefined;
var _default = SmtpCredentials;
exports["default"] = _default;
},{"../ApiClient":1,"./AccessLevel":17}],78:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * The SmtpCredentialsPayload model module.
 * @module model/SmtpCredentialsPayload
 * @version 4.0.23
 */
var SmtpCredentialsPayload = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>SmtpCredentialsPayload</code>.
   * Create new SMTP Credentials
   * @alias module:model/SmtpCredentialsPayload
   * @param name {String} Name of the Credential for ease of reference. It must be a valid email address.
   */
  function SmtpCredentialsPayload(name) {
    _classCallCheck(this, SmtpCredentialsPayload);
    SmtpCredentialsPayload.initialize(this, name);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  _createClass(SmtpCredentialsPayload, null, [{
    key: "initialize",
    value: function initialize(obj, name) {
      obj['Name'] = name;
    }

    /**
     * Constructs a <code>SmtpCredentialsPayload</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/SmtpCredentialsPayload} obj Optional instance to populate.
     * @return {module:model/SmtpCredentialsPayload} The populated <code>SmtpCredentialsPayload</code> instance.
     */
  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new SmtpCredentialsPayload();
        if (data.hasOwnProperty('Name')) {
          obj['Name'] = _ApiClient["default"].convertToType(data['Name'], 'String');
        }
        if (data.hasOwnProperty('Expires')) {
          obj['Expires'] = _ApiClient["default"].convertToType(data['Expires'], 'Date');
        }
        if (data.hasOwnProperty('RestrictAccessToIPRange')) {
          obj['RestrictAccessToIPRange'] = _ApiClient["default"].convertToType(data['RestrictAccessToIPRange'], ['String']);
        }
        if (data.hasOwnProperty('Subaccount')) {
          obj['Subaccount'] = _ApiClient["default"].convertToType(data['Subaccount'], 'String');
        }
      }
      return obj;
    }

    /**
     * Validates the JSON data with respect to <code>SmtpCredentialsPayload</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>SmtpCredentialsPayload</code>.
     */
  }, {
    key: "validateJSON",
    value: function validateJSON(data) {
      // check to make sure all required properties are present in the JSON string
      var _iterator = _createForOfIteratorHelper(SmtpCredentialsPayload.RequiredProperties),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var property = _step.value;
          if (!data[property]) {
            throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
          }
        }
        // ensure the json data is a string
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      if (data['Name'] && !(typeof data['Name'] === 'string' || data['Name'] instanceof String)) {
        throw new Error("Expected the field `Name` to be a primitive type in the JSON string but got " + data['Name']);
      }
      // ensure the json data is an array
      if (!Array.isArray(data['RestrictAccessToIPRange'])) {
        throw new Error("Expected the field `RestrictAccessToIPRange` to be an array in the JSON data but got " + data['RestrictAccessToIPRange']);
      }
      // ensure the json data is a string
      if (data['Subaccount'] && !(typeof data['Subaccount'] === 'string' || data['Subaccount'] instanceof String)) {
        throw new Error("Expected the field `Subaccount` to be a primitive type in the JSON string but got " + data['Subaccount']);
      }
      return true;
    }
  }]);
  return SmtpCredentialsPayload;
}();
SmtpCredentialsPayload.RequiredProperties = ["Name"];

/**
 * Name of the Credential for ease of reference. It must be a valid email address.
 * @member {String} Name
 */
SmtpCredentialsPayload.prototype['Name'] = undefined;

/**
 * Date this SmtpCredential expires.
 * @member {Date} Expires
 */
SmtpCredentialsPayload.prototype['Expires'] = undefined;

/**
 * Which IPs can use this SmtpCredential
 * @member {Array.<String>} RestrictAccessToIPRange
 */
SmtpCredentialsPayload.prototype['RestrictAccessToIPRange'] = undefined;

/**
 * Email of the subaccount for which this SmtpCredential should be created
 * @member {String} Subaccount
 */
SmtpCredentialsPayload.prototype['Subaccount'] = undefined;
var _default = SmtpCredentialsPayload;
exports["default"] = _default;
},{"../ApiClient":1}],79:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * The SortOrderItem model module.
 * @module model/SortOrderItem
 * @version 4.0.23
 */
var SortOrderItem = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>SortOrderItem</code>.
   * Change the ordering of this inbound route for when matching the inbound
   * @alias module:model/SortOrderItem
   * @param publicInboundId {String} ID of the route to change the order of
   * @param sortOrder {Number} 1 - route will be used first
   */
  function SortOrderItem(publicInboundId, sortOrder) {
    _classCallCheck(this, SortOrderItem);
    SortOrderItem.initialize(this, publicInboundId, sortOrder);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  _createClass(SortOrderItem, null, [{
    key: "initialize",
    value: function initialize(obj, publicInboundId, sortOrder) {
      obj['PublicInboundId'] = publicInboundId;
      obj['SortOrder'] = sortOrder;
    }

    /**
     * Constructs a <code>SortOrderItem</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/SortOrderItem} obj Optional instance to populate.
     * @return {module:model/SortOrderItem} The populated <code>SortOrderItem</code> instance.
     */
  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new SortOrderItem();
        if (data.hasOwnProperty('PublicInboundId')) {
          obj['PublicInboundId'] = _ApiClient["default"].convertToType(data['PublicInboundId'], 'String');
        }
        if (data.hasOwnProperty('SortOrder')) {
          obj['SortOrder'] = _ApiClient["default"].convertToType(data['SortOrder'], 'Number');
        }
      }
      return obj;
    }

    /**
     * Validates the JSON data with respect to <code>SortOrderItem</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>SortOrderItem</code>.
     */
  }, {
    key: "validateJSON",
    value: function validateJSON(data) {
      // check to make sure all required properties are present in the JSON string
      var _iterator = _createForOfIteratorHelper(SortOrderItem.RequiredProperties),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var property = _step.value;
          if (!data[property]) {
            throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
          }
        }
        // ensure the json data is a string
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      if (data['PublicInboundId'] && !(typeof data['PublicInboundId'] === 'string' || data['PublicInboundId'] instanceof String)) {
        throw new Error("Expected the field `PublicInboundId` to be a primitive type in the JSON string but got " + data['PublicInboundId']);
      }
      return true;
    }
  }]);
  return SortOrderItem;
}();
SortOrderItem.RequiredProperties = ["PublicInboundId", "SortOrder"];

/**
 * ID of the route to change the order of
 * @member {String} PublicInboundId
 */
SortOrderItem.prototype['PublicInboundId'] = undefined;

/**
 * 1 - route will be used first
 * @member {Number} SortOrder
 */
SortOrderItem.prototype['SortOrder'] = undefined;
var _default = SortOrderItem;
exports["default"] = _default;
},{"../ApiClient":1}],80:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
* Enum class SplitOptimizationType.
* @enum {}
* @readonly
*/
var SplitOptimizationType = /*#__PURE__*/function () {
  function SplitOptimizationType() {
    _classCallCheck(this, SplitOptimizationType);
    _defineProperty(this, "Opens", "Opens");
    _defineProperty(this, "Clicks", "Clicks");
  }
  _createClass(SplitOptimizationType, null, [{
    key: "constructFromObject",
    value:
    /**
    * Returns a <code>SplitOptimizationType</code> enum value from a Javascript object name.
    * @param {Object} data The plain JavaScript object containing the name of the enum value.
    * @return {module:model/SplitOptimizationType} The enum <code>SplitOptimizationType</code> value.
    */
    function constructFromObject(object) {
      return object;
    }
  }]);
  return SplitOptimizationType;
}();
exports["default"] = SplitOptimizationType;
},{"../ApiClient":1}],81:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _SplitOptimizationType = _interopRequireDefault(require("./SplitOptimizationType"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * The SplitOptions model module.
 * @module model/SplitOptions
 * @version 4.0.23
 */
var SplitOptions = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>SplitOptions</code>.
   * Optional A/X split campaign options
   * @alias module:model/SplitOptions
   */
  function SplitOptions() {
    _classCallCheck(this, SplitOptions);
    SplitOptions.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  _createClass(SplitOptions, null, [{
    key: "initialize",
    value: function initialize(obj) {}

    /**
     * Constructs a <code>SplitOptions</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/SplitOptions} obj Optional instance to populate.
     * @return {module:model/SplitOptions} The populated <code>SplitOptions</code> instance.
     */
  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new SplitOptions();
        if (data.hasOwnProperty('OptimizeFor')) {
          obj['OptimizeFor'] = _SplitOptimizationType["default"].constructFromObject(data['OptimizeFor']);
        }
        if (data.hasOwnProperty('OptimizePeriodMinutes')) {
          obj['OptimizePeriodMinutes'] = _ApiClient["default"].convertToType(data['OptimizePeriodMinutes'], 'Number');
        }
      }
      return obj;
    }

    /**
     * Validates the JSON data with respect to <code>SplitOptions</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>SplitOptions</code>.
     */
  }, {
    key: "validateJSON",
    value: function validateJSON(data) {
      return true;
    }
  }]);
  return SplitOptions;
}();
/**
 * @member {module:model/SplitOptimizationType} OptimizeFor
 */
SplitOptions.prototype['OptimizeFor'] = undefined;

/**
 * For how long should the results be measured until determining the winner template (content)
 * @member {Number} OptimizePeriodMinutes
 */
SplitOptions.prototype['OptimizePeriodMinutes'] = undefined;
var _default = SplitOptions;
exports["default"] = _default;
},{"../ApiClient":1,"./SplitOptimizationType":80}],82:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _AccountStatusEnum = _interopRequireDefault(require("./AccountStatusEnum"));
var _SubaccountSettingsInfo = _interopRequireDefault(require("./SubaccountSettingsInfo"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * The SubAccountInfo model module.
 * @module model/SubAccountInfo
 * @version 4.0.23
 */
var SubAccountInfo = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>SubAccountInfo</code>.
   * Detailed information about SubAccount.
   * @alias module:model/SubAccountInfo
   */
  function SubAccountInfo() {
    _classCallCheck(this, SubAccountInfo);
    SubAccountInfo.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  _createClass(SubAccountInfo, null, [{
    key: "initialize",
    value: function initialize(obj) {}

    /**
     * Constructs a <code>SubAccountInfo</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/SubAccountInfo} obj Optional instance to populate.
     * @return {module:model/SubAccountInfo} The populated <code>SubAccountInfo</code> instance.
     */
  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new SubAccountInfo();
        if (data.hasOwnProperty('PublicAccountID')) {
          obj['PublicAccountID'] = _ApiClient["default"].convertToType(data['PublicAccountID'], 'String');
        }
        if (data.hasOwnProperty('Email')) {
          obj['Email'] = _ApiClient["default"].convertToType(data['Email'], 'String');
        }
        if (data.hasOwnProperty('Settings')) {
          obj['Settings'] = _SubaccountSettingsInfo["default"].constructFromObject(data['Settings']);
        }
        if (data.hasOwnProperty('LastActivity')) {
          obj['LastActivity'] = _ApiClient["default"].convertToType(data['LastActivity'], 'Date');
        }
        if (data.hasOwnProperty('EmailCredits')) {
          obj['EmailCredits'] = _ApiClient["default"].convertToType(data['EmailCredits'], 'Number');
        }
        if (data.hasOwnProperty('TotalEmailsSent')) {
          obj['TotalEmailsSent'] = _ApiClient["default"].convertToType(data['TotalEmailsSent'], 'Number');
        }
        if (data.hasOwnProperty('Reputation')) {
          obj['Reputation'] = _ApiClient["default"].convertToType(data['Reputation'], 'Number');
        }
        if (data.hasOwnProperty('Status')) {
          obj['Status'] = _AccountStatusEnum["default"].constructFromObject(data['Status']);
        }
        if (data.hasOwnProperty('ContactsCount')) {
          obj['ContactsCount'] = _ApiClient["default"].convertToType(data['ContactsCount'], 'Number');
        }
      }
      return obj;
    }

    /**
     * Validates the JSON data with respect to <code>SubAccountInfo</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>SubAccountInfo</code>.
     */
  }, {
    key: "validateJSON",
    value: function validateJSON(data) {
      // ensure the json data is a string
      if (data['PublicAccountID'] && !(typeof data['PublicAccountID'] === 'string' || data['PublicAccountID'] instanceof String)) {
        throw new Error("Expected the field `PublicAccountID` to be a primitive type in the JSON string but got " + data['PublicAccountID']);
      }
      // ensure the json data is a string
      if (data['Email'] && !(typeof data['Email'] === 'string' || data['Email'] instanceof String)) {
        throw new Error("Expected the field `Email` to be a primitive type in the JSON string but got " + data['Email']);
      }
      // validate the optional field `Settings`
      if (data['Settings']) {
        // data not null
        _SubaccountSettingsInfo["default"].validateJSON(data['Settings']);
      }
      return true;
    }
  }]);
  return SubAccountInfo;
}();
/**
 * Public key for limited access to your Account such as contact/add so you can use it safely on public websites.
 * @member {String} PublicAccountID
 */
SubAccountInfo.prototype['PublicAccountID'] = undefined;

/**
 * Proper email address.
 * @member {String} Email
 */
SubAccountInfo.prototype['Email'] = undefined;

/**
 * @member {module:model/SubaccountSettingsInfo} Settings
 */
SubAccountInfo.prototype['Settings'] = undefined;

/**
 * Date of last activity on Account
 * @member {Date} LastActivity
 */
SubAccountInfo.prototype['LastActivity'] = undefined;

/**
 * Amount of email credits
 * @member {Number} EmailCredits
 */
SubAccountInfo.prototype['EmailCredits'] = undefined;

/**
 * Amount of emails sent from this Account
 * @member {Number} TotalEmailsSent
 */
SubAccountInfo.prototype['TotalEmailsSent'] = undefined;

/**
 * Numeric reputation
 * @member {Number} Reputation
 */
SubAccountInfo.prototype['Reputation'] = undefined;

/**
 * @member {module:model/AccountStatusEnum} Status
 */
SubAccountInfo.prototype['Status'] = undefined;

/**
 * How many contacts this SubAccount has stored
 * @member {Number} ContactsCount
 */
SubAccountInfo.prototype['ContactsCount'] = undefined;
var _default = SubAccountInfo;
exports["default"] = _default;
},{"../ApiClient":1,"./AccountStatusEnum":18,"./SubaccountSettingsInfo":87}],83:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * The SubaccountEmailCreditsPayload model module.
 * @module model/SubaccountEmailCreditsPayload
 * @version 4.0.23
 */
var SubaccountEmailCreditsPayload = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>SubaccountEmailCreditsPayload</code>.
   * A change to SubAccount email credits pool, with an additional note.
   * @alias module:model/SubaccountEmailCreditsPayload
   * @param credits {Number} Positive or negative value; this will be added or subtracted from Subaccount's current email Credits pool.
   */
  function SubaccountEmailCreditsPayload(credits) {
    _classCallCheck(this, SubaccountEmailCreditsPayload);
    SubaccountEmailCreditsPayload.initialize(this, credits);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  _createClass(SubaccountEmailCreditsPayload, null, [{
    key: "initialize",
    value: function initialize(obj, credits) {
      obj['Credits'] = credits;
    }

    /**
     * Constructs a <code>SubaccountEmailCreditsPayload</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/SubaccountEmailCreditsPayload} obj Optional instance to populate.
     * @return {module:model/SubaccountEmailCreditsPayload} The populated <code>SubaccountEmailCreditsPayload</code> instance.
     */
  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new SubaccountEmailCreditsPayload();
        if (data.hasOwnProperty('Credits')) {
          obj['Credits'] = _ApiClient["default"].convertToType(data['Credits'], 'Number');
        }
        if (data.hasOwnProperty('Notes')) {
          obj['Notes'] = _ApiClient["default"].convertToType(data['Notes'], 'String');
        }
      }
      return obj;
    }

    /**
     * Validates the JSON data with respect to <code>SubaccountEmailCreditsPayload</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>SubaccountEmailCreditsPayload</code>.
     */
  }, {
    key: "validateJSON",
    value: function validateJSON(data) {
      // check to make sure all required properties are present in the JSON string
      var _iterator = _createForOfIteratorHelper(SubaccountEmailCreditsPayload.RequiredProperties),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var property = _step.value;
          if (!data[property]) {
            throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
          }
        }
        // ensure the json data is a string
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      if (data['Notes'] && !(typeof data['Notes'] === 'string' || data['Notes'] instanceof String)) {
        throw new Error("Expected the field `Notes` to be a primitive type in the JSON string but got " + data['Notes']);
      }
      return true;
    }
  }]);
  return SubaccountEmailCreditsPayload;
}();
SubaccountEmailCreditsPayload.RequiredProperties = ["Credits"];

/**
 * Positive or negative value; this will be added or subtracted from Subaccount's current email Credits pool.
 * @member {Number} Credits
 */
SubaccountEmailCreditsPayload.prototype['Credits'] = undefined;

/**
 * Note to append to this credits change, for history.
 * @member {String} Notes
 */
SubaccountEmailCreditsPayload.prototype['Notes'] = undefined;
var _default = SubaccountEmailCreditsPayload;
exports["default"] = _default;
},{"../ApiClient":1}],84:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * The SubaccountEmailSettings model module.
 * @module model/SubaccountEmailSettings
 * @version 4.0.23
 */
var SubaccountEmailSettings = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>SubaccountEmailSettings</code>.
   * Settings related to sending emails
   * @alias module:model/SubaccountEmailSettings
   */
  function SubaccountEmailSettings() {
    _classCallCheck(this, SubaccountEmailSettings);
    SubaccountEmailSettings.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  _createClass(SubaccountEmailSettings, null, [{
    key: "initialize",
    value: function initialize(obj) {}

    /**
     * Constructs a <code>SubaccountEmailSettings</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/SubaccountEmailSettings} obj Optional instance to populate.
     * @return {module:model/SubaccountEmailSettings} The populated <code>SubaccountEmailSettings</code> instance.
     */
  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new SubaccountEmailSettings();
        if (data.hasOwnProperty('MonthlyRefillCredits')) {
          obj['MonthlyRefillCredits'] = _ApiClient["default"].convertToType(data['MonthlyRefillCredits'], 'Number');
        }
        if (data.hasOwnProperty('RequiresEmailCredits')) {
          obj['RequiresEmailCredits'] = _ApiClient["default"].convertToType(data['RequiresEmailCredits'], 'Boolean');
        }
        if (data.hasOwnProperty('EmailSizeLimit')) {
          obj['EmailSizeLimit'] = _ApiClient["default"].convertToType(data['EmailSizeLimit'], 'Number');
        }
        if (data.hasOwnProperty('DailySendLimit')) {
          obj['DailySendLimit'] = _ApiClient["default"].convertToType(data['DailySendLimit'], 'Number');
        }
        if (data.hasOwnProperty('MaxContacts')) {
          obj['MaxContacts'] = _ApiClient["default"].convertToType(data['MaxContacts'], 'Number');
        }
        if (data.hasOwnProperty('EnablePrivateIPPurchase')) {
          obj['EnablePrivateIPPurchase'] = _ApiClient["default"].convertToType(data['EnablePrivateIPPurchase'], 'Boolean');
        }
        if (data.hasOwnProperty('PoolName')) {
          obj['PoolName'] = _ApiClient["default"].convertToType(data['PoolName'], 'String');
        }
        if (data.hasOwnProperty('ValidSenderDomainOnly')) {
          obj['ValidSenderDomainOnly'] = _ApiClient["default"].convertToType(data['ValidSenderDomainOnly'], 'Boolean');
        }
      }
      return obj;
    }

    /**
     * Validates the JSON data with respect to <code>SubaccountEmailSettings</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>SubaccountEmailSettings</code>.
     */
  }, {
    key: "validateJSON",
    value: function validateJSON(data) {
      // ensure the json data is a string
      if (data['PoolName'] && !(typeof data['PoolName'] === 'string' || data['PoolName'] instanceof String)) {
        throw new Error("Expected the field `PoolName` to be a primitive type in the JSON string but got " + data['PoolName']);
      }
      return true;
    }
  }]);
  return SubaccountEmailSettings;
}();
/**
 * Amount of credits added to Account automatically
 * @member {Number} MonthlyRefillCredits
 */
SubaccountEmailSettings.prototype['MonthlyRefillCredits'] = undefined;

/**
 * True, if Account needs credits to send emails. Otherwise, false
 * @member {Boolean} RequiresEmailCredits
 */
SubaccountEmailSettings.prototype['RequiresEmailCredits'] = undefined;

/**
 * Maximum size of email including attachments in MB's
 * @member {Number} EmailSizeLimit
 */
SubaccountEmailSettings.prototype['EmailSizeLimit'] = undefined;

/**
 * Amount of emails Account can send daily
 * @member {Number} DailySendLimit
 */
SubaccountEmailSettings.prototype['DailySendLimit'] = undefined;

/**
 * Maximum number of contacts the Account can have. 0 means that parent account's limit is used.
 * @member {Number} MaxContacts
 */
SubaccountEmailSettings.prototype['MaxContacts'] = undefined;

/**
 * Can the SubAccount purchase Private IP for themselves
 * @member {Boolean} EnablePrivateIPPurchase
 */
SubaccountEmailSettings.prototype['EnablePrivateIPPurchase'] = undefined;

/**
 * Name of your custom IP Pool to be used in the sending process
 * @member {String} PoolName
 */
SubaccountEmailSettings.prototype['PoolName'] = undefined;

/**
 * @member {Boolean} ValidSenderDomainOnly
 */
SubaccountEmailSettings.prototype['ValidSenderDomainOnly'] = undefined;
var _default = SubaccountEmailSettings;
exports["default"] = _default;
},{"../ApiClient":1}],85:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * The SubaccountEmailSettingsPayload model module.
 * @module model/SubaccountEmailSettingsPayload
 * @version 4.0.23
 */
var SubaccountEmailSettingsPayload = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>SubaccountEmailSettingsPayload</code>.
   * Settings related to sending emails
   * @alias module:model/SubaccountEmailSettingsPayload
   */
  function SubaccountEmailSettingsPayload() {
    _classCallCheck(this, SubaccountEmailSettingsPayload);
    SubaccountEmailSettingsPayload.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  _createClass(SubaccountEmailSettingsPayload, null, [{
    key: "initialize",
    value: function initialize(obj) {}

    /**
     * Constructs a <code>SubaccountEmailSettingsPayload</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/SubaccountEmailSettingsPayload} obj Optional instance to populate.
     * @return {module:model/SubaccountEmailSettingsPayload} The populated <code>SubaccountEmailSettingsPayload</code> instance.
     */
  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new SubaccountEmailSettingsPayload();
        if (data.hasOwnProperty('RequiresEmailCredits')) {
          obj['RequiresEmailCredits'] = _ApiClient["default"].convertToType(data['RequiresEmailCredits'], 'Boolean');
        }
        if (data.hasOwnProperty('EmailSizeLimit')) {
          obj['EmailSizeLimit'] = _ApiClient["default"].convertToType(data['EmailSizeLimit'], 'Number');
        }
        if (data.hasOwnProperty('DailySendLimit')) {
          obj['DailySendLimit'] = _ApiClient["default"].convertToType(data['DailySendLimit'], 'Number');
        }
        if (data.hasOwnProperty('MaxContacts')) {
          obj['MaxContacts'] = _ApiClient["default"].convertToType(data['MaxContacts'], 'Number');
        }
        if (data.hasOwnProperty('EnablePrivateIPPurchase')) {
          obj['EnablePrivateIPPurchase'] = _ApiClient["default"].convertToType(data['EnablePrivateIPPurchase'], 'Boolean');
        }
        if (data.hasOwnProperty('PoolName')) {
          obj['PoolName'] = _ApiClient["default"].convertToType(data['PoolName'], 'String');
        }
        if (data.hasOwnProperty('ValidSenderDomainOnly')) {
          obj['ValidSenderDomainOnly'] = _ApiClient["default"].convertToType(data['ValidSenderDomainOnly'], 'Boolean');
        }
      }
      return obj;
    }

    /**
     * Validates the JSON data with respect to <code>SubaccountEmailSettingsPayload</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>SubaccountEmailSettingsPayload</code>.
     */
  }, {
    key: "validateJSON",
    value: function validateJSON(data) {
      // ensure the json data is a string
      if (data['PoolName'] && !(typeof data['PoolName'] === 'string' || data['PoolName'] instanceof String)) {
        throw new Error("Expected the field `PoolName` to be a primitive type in the JSON string but got " + data['PoolName']);
      }
      return true;
    }
  }]);
  return SubaccountEmailSettingsPayload;
}();
/**
 * True, if Account needs credits to send emails. Otherwise, false
 * @member {Boolean} RequiresEmailCredits
 */
SubaccountEmailSettingsPayload.prototype['RequiresEmailCredits'] = undefined;

/**
 * Maximum size of email including attachments in MB's
 * @member {Number} EmailSizeLimit
 */
SubaccountEmailSettingsPayload.prototype['EmailSizeLimit'] = undefined;

/**
 * Amount of emails Account can send daily
 * @member {Number} DailySendLimit
 */
SubaccountEmailSettingsPayload.prototype['DailySendLimit'] = undefined;

/**
 * Maximum number of contacts the Account can have. 0 means that parent account's limit is used.
 * @member {Number} MaxContacts
 */
SubaccountEmailSettingsPayload.prototype['MaxContacts'] = undefined;

/**
 * Can the SubAccount purchase Private IP for themselves
 * @member {Boolean} EnablePrivateIPPurchase
 */
SubaccountEmailSettingsPayload.prototype['EnablePrivateIPPurchase'] = undefined;

/**
 * Name of your custom IP Pool to be used in the sending process
 * @member {String} PoolName
 */
SubaccountEmailSettingsPayload.prototype['PoolName'] = undefined;

/**
 * @member {Boolean} ValidSenderDomainOnly
 */
SubaccountEmailSettingsPayload.prototype['ValidSenderDomainOnly'] = undefined;
var _default = SubaccountEmailSettingsPayload;
exports["default"] = _default;
},{"../ApiClient":1}],86:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _SubaccountSettingsInfoPayload = _interopRequireDefault(require("./SubaccountSettingsInfoPayload"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * The SubaccountPayload model module.
 * @module model/SubaccountPayload
 * @version 4.0.23
 */
var SubaccountPayload = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>SubaccountPayload</code>.
   * New SubAccount payload
   * @alias module:model/SubaccountPayload
   * @param email {String} Proper email address.
   * @param password {String} Current password.
   */
  function SubaccountPayload(email, password) {
    _classCallCheck(this, SubaccountPayload);
    SubaccountPayload.initialize(this, email, password);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  _createClass(SubaccountPayload, null, [{
    key: "initialize",
    value: function initialize(obj, email, password) {
      obj['Email'] = email;
      obj['Password'] = password;
    }

    /**
     * Constructs a <code>SubaccountPayload</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/SubaccountPayload} obj Optional instance to populate.
     * @return {module:model/SubaccountPayload} The populated <code>SubaccountPayload</code> instance.
     */
  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new SubaccountPayload();
        if (data.hasOwnProperty('Email')) {
          obj['Email'] = _ApiClient["default"].convertToType(data['Email'], 'String');
        }
        if (data.hasOwnProperty('Password')) {
          obj['Password'] = _ApiClient["default"].convertToType(data['Password'], 'String');
        }
        if (data.hasOwnProperty('SendActivation')) {
          obj['SendActivation'] = _ApiClient["default"].convertToType(data['SendActivation'], 'Boolean');
        }
        if (data.hasOwnProperty('Settings')) {
          obj['Settings'] = _SubaccountSettingsInfoPayload["default"].constructFromObject(data['Settings']);
        }
      }
      return obj;
    }

    /**
     * Validates the JSON data with respect to <code>SubaccountPayload</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>SubaccountPayload</code>.
     */
  }, {
    key: "validateJSON",
    value: function validateJSON(data) {
      // check to make sure all required properties are present in the JSON string
      var _iterator = _createForOfIteratorHelper(SubaccountPayload.RequiredProperties),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var property = _step.value;
          if (!data[property]) {
            throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
          }
        }
        // ensure the json data is a string
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      if (data['Email'] && !(typeof data['Email'] === 'string' || data['Email'] instanceof String)) {
        throw new Error("Expected the field `Email` to be a primitive type in the JSON string but got " + data['Email']);
      }
      // ensure the json data is a string
      if (data['Password'] && !(typeof data['Password'] === 'string' || data['Password'] instanceof String)) {
        throw new Error("Expected the field `Password` to be a primitive type in the JSON string but got " + data['Password']);
      }
      // validate the optional field `Settings`
      if (data['Settings']) {
        // data not null
        _SubaccountSettingsInfoPayload["default"].validateJSON(data['Settings']);
      }
      return true;
    }
  }]);
  return SubaccountPayload;
}();
SubaccountPayload.RequiredProperties = ["Email", "Password"];

/**
 * Proper email address.
 * @member {String} Email
 */
SubaccountPayload.prototype['Email'] = undefined;

/**
 * Current password.
 * @member {String} Password
 */
SubaccountPayload.prototype['Password'] = undefined;

/**
 * True, if you want to send activation email to this Account to confirm the creation of a new SubAccount. Otherwise, false (SubAccount will immediately be Active).
 * @member {Boolean} SendActivation
 */
SubaccountPayload.prototype['SendActivation'] = undefined;

/**
 * @member {module:model/SubaccountSettingsInfoPayload} Settings
 */
SubaccountPayload.prototype['Settings'] = undefined;
var _default = SubaccountPayload;
exports["default"] = _default;
},{"../ApiClient":1,"./SubaccountSettingsInfoPayload":88}],87:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _SubaccountEmailSettings = _interopRequireDefault(require("./SubaccountEmailSettings"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * The SubaccountSettingsInfo model module.
 * @module model/SubaccountSettingsInfo
 * @version 4.0.23
 */
var SubaccountSettingsInfo = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>SubaccountSettingsInfo</code>.
   * SubAccount settings
   * @alias module:model/SubaccountSettingsInfo
   */
  function SubaccountSettingsInfo() {
    _classCallCheck(this, SubaccountSettingsInfo);
    SubaccountSettingsInfo.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  _createClass(SubaccountSettingsInfo, null, [{
    key: "initialize",
    value: function initialize(obj) {}

    /**
     * Constructs a <code>SubaccountSettingsInfo</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/SubaccountSettingsInfo} obj Optional instance to populate.
     * @return {module:model/SubaccountSettingsInfo} The populated <code>SubaccountSettingsInfo</code> instance.
     */
  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new SubaccountSettingsInfo();
        if (data.hasOwnProperty('Email')) {
          obj['Email'] = _SubaccountEmailSettings["default"].constructFromObject(data['Email']);
        }
      }
      return obj;
    }

    /**
     * Validates the JSON data with respect to <code>SubaccountSettingsInfo</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>SubaccountSettingsInfo</code>.
     */
  }, {
    key: "validateJSON",
    value: function validateJSON(data) {
      // validate the optional field `Email`
      if (data['Email']) {
        // data not null
        _SubaccountEmailSettings["default"].validateJSON(data['Email']);
      }
      return true;
    }
  }]);
  return SubaccountSettingsInfo;
}();
/**
 * @member {module:model/SubaccountEmailSettings} Email
 */
SubaccountSettingsInfo.prototype['Email'] = undefined;
var _default = SubaccountSettingsInfo;
exports["default"] = _default;
},{"../ApiClient":1,"./SubaccountEmailSettings":84}],88:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _SubaccountEmailSettingsPayload = _interopRequireDefault(require("./SubaccountEmailSettingsPayload"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * The SubaccountSettingsInfoPayload model module.
 * @module model/SubaccountSettingsInfoPayload
 * @version 4.0.23
 */
var SubaccountSettingsInfoPayload = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>SubaccountSettingsInfoPayload</code>.
   * SubAccount settings
   * @alias module:model/SubaccountSettingsInfoPayload
   */
  function SubaccountSettingsInfoPayload() {
    _classCallCheck(this, SubaccountSettingsInfoPayload);
    SubaccountSettingsInfoPayload.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  _createClass(SubaccountSettingsInfoPayload, null, [{
    key: "initialize",
    value: function initialize(obj) {}

    /**
     * Constructs a <code>SubaccountSettingsInfoPayload</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/SubaccountSettingsInfoPayload} obj Optional instance to populate.
     * @return {module:model/SubaccountSettingsInfoPayload} The populated <code>SubaccountSettingsInfoPayload</code> instance.
     */
  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new SubaccountSettingsInfoPayload();
        if (data.hasOwnProperty('Email')) {
          obj['Email'] = _SubaccountEmailSettingsPayload["default"].constructFromObject(data['Email']);
        }
      }
      return obj;
    }

    /**
     * Validates the JSON data with respect to <code>SubaccountSettingsInfoPayload</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>SubaccountSettingsInfoPayload</code>.
     */
  }, {
    key: "validateJSON",
    value: function validateJSON(data) {
      // validate the optional field `Email`
      if (data['Email']) {
        // data not null
        _SubaccountEmailSettingsPayload["default"].validateJSON(data['Email']);
      }
      return true;
    }
  }]);
  return SubaccountSettingsInfoPayload;
}();
/**
 * @member {module:model/SubaccountEmailSettingsPayload} Email
 */
SubaccountSettingsInfoPayload.prototype['Email'] = undefined;
var _default = SubaccountSettingsInfoPayload;
exports["default"] = _default;
},{"../ApiClient":1,"./SubaccountEmailSettingsPayload":85}],89:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * The Suppression model module.
 * @module model/Suppression
 * @version 4.0.23
 */
var Suppression = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>Suppression</code>.
   * Suppression - Email returning Hard Bounces
   * @alias module:model/Suppression
   */
  function Suppression() {
    _classCallCheck(this, Suppression);
    Suppression.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  _createClass(Suppression, null, [{
    key: "initialize",
    value: function initialize(obj) {}

    /**
     * Constructs a <code>Suppression</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Suppression} obj Optional instance to populate.
     * @return {module:model/Suppression} The populated <code>Suppression</code> instance.
     */
  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new Suppression();
        if (data.hasOwnProperty('Email')) {
          obj['Email'] = _ApiClient["default"].convertToType(data['Email'], 'String');
        }
        if (data.hasOwnProperty('FriendlyErrorMessage')) {
          obj['FriendlyErrorMessage'] = _ApiClient["default"].convertToType(data['FriendlyErrorMessage'], 'String');
        }
        if (data.hasOwnProperty('ErrorCode')) {
          obj['ErrorCode'] = _ApiClient["default"].convertToType(data['ErrorCode'], 'Number');
        }
        if (data.hasOwnProperty('DateUpdated')) {
          obj['DateUpdated'] = _ApiClient["default"].convertToType(data['DateUpdated'], 'Date');
        }
      }
      return obj;
    }

    /**
     * Validates the JSON data with respect to <code>Suppression</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>Suppression</code>.
     */
  }, {
    key: "validateJSON",
    value: function validateJSON(data) {
      // ensure the json data is a string
      if (data['Email'] && !(typeof data['Email'] === 'string' || data['Email'] instanceof String)) {
        throw new Error("Expected the field `Email` to be a primitive type in the JSON string but got " + data['Email']);
      }
      // ensure the json data is a string
      if (data['FriendlyErrorMessage'] && !(typeof data['FriendlyErrorMessage'] === 'string' || data['FriendlyErrorMessage'] instanceof String)) {
        throw new Error("Expected the field `FriendlyErrorMessage` to be a primitive type in the JSON string but got " + data['FriendlyErrorMessage']);
      }
      return true;
    }
  }]);
  return Suppression;
}();
/**
 * Proper email address.
 * @member {String} Email
 */
Suppression.prototype['Email'] = undefined;

/**
 * RFC error message
 * @member {String} FriendlyErrorMessage
 */
Suppression.prototype['FriendlyErrorMessage'] = undefined;

/**
 * SMTP Error code
 * @member {Number} ErrorCode
 */
Suppression.prototype['ErrorCode'] = undefined;

/**
 * Last change date
 * @member {Date} DateUpdated
 */
Suppression.prototype['DateUpdated'] = undefined;
var _default = Suppression;
exports["default"] = _default;
},{"../ApiClient":1}],90:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _BodyPart = _interopRequireDefault(require("./BodyPart"));
var _TemplateScope = _interopRequireDefault(require("./TemplateScope"));
var _TemplateType = _interopRequireDefault(require("./TemplateType"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * The Template model module.
 * @module model/Template
 * @version 4.0.23
 */
var Template = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>Template</code>.
   * Template info
   * @alias module:model/Template
   */
  function Template() {
    _classCallCheck(this, Template);
    Template.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  _createClass(Template, null, [{
    key: "initialize",
    value: function initialize(obj) {}

    /**
     * Constructs a <code>Template</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Template} obj Optional instance to populate.
     * @return {module:model/Template} The populated <code>Template</code> instance.
     */
  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new Template();
        if (data.hasOwnProperty('TemplateType')) {
          obj['TemplateType'] = _TemplateType["default"].constructFromObject(data['TemplateType']);
        }
        if (data.hasOwnProperty('Name')) {
          obj['Name'] = _ApiClient["default"].convertToType(data['Name'], 'String');
        }
        if (data.hasOwnProperty('DateAdded')) {
          obj['DateAdded'] = _ApiClient["default"].convertToType(data['DateAdded'], 'Date');
        }
        if (data.hasOwnProperty('Subject')) {
          obj['Subject'] = _ApiClient["default"].convertToType(data['Subject'], 'String');
        }
        if (data.hasOwnProperty('Body')) {
          obj['Body'] = _ApiClient["default"].convertToType(data['Body'], [_BodyPart["default"]]);
        }
        if (data.hasOwnProperty('TemplateScope')) {
          obj['TemplateScope'] = _TemplateScope["default"].constructFromObject(data['TemplateScope']);
        }
      }
      return obj;
    }

    /**
     * Validates the JSON data with respect to <code>Template</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>Template</code>.
     */
  }, {
    key: "validateJSON",
    value: function validateJSON(data) {
      // ensure the json data is a string
      if (data['Name'] && !(typeof data['Name'] === 'string' || data['Name'] instanceof String)) {
        throw new Error("Expected the field `Name` to be a primitive type in the JSON string but got " + data['Name']);
      }
      // ensure the json data is a string
      if (data['Subject'] && !(typeof data['Subject'] === 'string' || data['Subject'] instanceof String)) {
        throw new Error("Expected the field `Subject` to be a primitive type in the JSON string but got " + data['Subject']);
      }
      if (data['Body']) {
        // data not null
        // ensure the json data is an array
        if (!Array.isArray(data['Body'])) {
          throw new Error("Expected the field `Body` to be an array in the JSON data but got " + data['Body']);
        }
        // validate the optional field `Body` (array)
        var _iterator = _createForOfIteratorHelper(data['Body']),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var item = _step.value;
            _BodyPart["default"].validateJsonObject(item);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        ;
      }
      return true;
    }
  }]);
  return Template;
}();
/**
 * @member {module:model/TemplateType} TemplateType
 */
Template.prototype['TemplateType'] = undefined;

/**
 * Template name
 * @member {String} Name
 */
Template.prototype['Name'] = undefined;

/**
 * Date of creation in YYYY-MM-DDThh:ii:ss format
 * @member {Date} DateAdded
 */
Template.prototype['DateAdded'] = undefined;

/**
 * Default subject of email.
 * @member {String} Subject
 */
Template.prototype['Subject'] = undefined;

/**
 * Email content of this template
 * @member {Array.<module:model/BodyPart>} Body
 */
Template.prototype['Body'] = undefined;

/**
 * @member {module:model/TemplateScope} TemplateScope
 */
Template.prototype['TemplateScope'] = undefined;
var _default = Template;
exports["default"] = _default;
},{"../ApiClient":1,"./BodyPart":22,"./TemplateScope":92,"./TemplateType":93}],91:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _BodyPart = _interopRequireDefault(require("./BodyPart"));
var _TemplateScope = _interopRequireDefault(require("./TemplateScope"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * The TemplatePayload model module.
 * @module model/TemplatePayload
 * @version 4.0.23
 */
var TemplatePayload = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>TemplatePayload</code>.
   * New template object
   * @alias module:model/TemplatePayload
   * @param name {String} Template name
   */
  function TemplatePayload(name) {
    _classCallCheck(this, TemplatePayload);
    TemplatePayload.initialize(this, name);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  _createClass(TemplatePayload, null, [{
    key: "initialize",
    value: function initialize(obj, name) {
      obj['Name'] = name;
    }

    /**
     * Constructs a <code>TemplatePayload</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/TemplatePayload} obj Optional instance to populate.
     * @return {module:model/TemplatePayload} The populated <code>TemplatePayload</code> instance.
     */
  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new TemplatePayload();
        if (data.hasOwnProperty('Name')) {
          obj['Name'] = _ApiClient["default"].convertToType(data['Name'], 'String');
        }
        if (data.hasOwnProperty('Subject')) {
          obj['Subject'] = _ApiClient["default"].convertToType(data['Subject'], 'String');
        }
        if (data.hasOwnProperty('Body')) {
          obj['Body'] = _ApiClient["default"].convertToType(data['Body'], [_BodyPart["default"]]);
        }
        if (data.hasOwnProperty('TemplateScope')) {
          obj['TemplateScope'] = _TemplateScope["default"].constructFromObject(data['TemplateScope']);
        }
      }
      return obj;
    }

    /**
     * Validates the JSON data with respect to <code>TemplatePayload</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>TemplatePayload</code>.
     */
  }, {
    key: "validateJSON",
    value: function validateJSON(data) {
      // check to make sure all required properties are present in the JSON string
      var _iterator = _createForOfIteratorHelper(TemplatePayload.RequiredProperties),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var property = _step.value;
          if (!data[property]) {
            throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
          }
        }
        // ensure the json data is a string
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      if (data['Name'] && !(typeof data['Name'] === 'string' || data['Name'] instanceof String)) {
        throw new Error("Expected the field `Name` to be a primitive type in the JSON string but got " + data['Name']);
      }
      // ensure the json data is a string
      if (data['Subject'] && !(typeof data['Subject'] === 'string' || data['Subject'] instanceof String)) {
        throw new Error("Expected the field `Subject` to be a primitive type in the JSON string but got " + data['Subject']);
      }
      if (data['Body']) {
        // data not null
        // ensure the json data is an array
        if (!Array.isArray(data['Body'])) {
          throw new Error("Expected the field `Body` to be an array in the JSON data but got " + data['Body']);
        }
        // validate the optional field `Body` (array)
        var _iterator2 = _createForOfIteratorHelper(data['Body']),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var item = _step2.value;
            _BodyPart["default"].validateJsonObject(item);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
        ;
      }
      return true;
    }
  }]);
  return TemplatePayload;
}();
TemplatePayload.RequiredProperties = ["Name"];

/**
 * Template name
 * @member {String} Name
 */
TemplatePayload.prototype['Name'] = undefined;

/**
 * Default subject of email.
 * @member {String} Subject
 */
TemplatePayload.prototype['Subject'] = undefined;

/**
 * Email content of this template
 * @member {Array.<module:model/BodyPart>} Body
 */
TemplatePayload.prototype['Body'] = undefined;

/**
 * @member {module:model/TemplateScope} TemplateScope
 */
TemplatePayload.prototype['TemplateScope'] = undefined;
var _default = TemplatePayload;
exports["default"] = _default;
},{"../ApiClient":1,"./BodyPart":22,"./TemplateScope":92}],92:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
* Enum class TemplateScope.
* @enum {}
* @readonly
*/
var TemplateScope = /*#__PURE__*/function () {
  function TemplateScope() {
    _classCallCheck(this, TemplateScope);
    _defineProperty(this, "Personal", "Personal");
    _defineProperty(this, "Global", "Global");
  }
  _createClass(TemplateScope, null, [{
    key: "constructFromObject",
    value:
    /**
    * Returns a <code>TemplateScope</code> enum value from a Javascript object name.
    * @param {Object} data The plain JavaScript object containing the name of the enum value.
    * @return {module:model/TemplateScope} The enum <code>TemplateScope</code> value.
    */
    function constructFromObject(object) {
      return object;
    }
  }]);
  return TemplateScope;
}();
exports["default"] = TemplateScope;
},{"../ApiClient":1}],93:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
* Enum class TemplateType.
* @enum {}
* @readonly
*/
var TemplateType = /*#__PURE__*/function () {
  function TemplateType() {
    _classCallCheck(this, TemplateType);
    _defineProperty(this, "RawHTML", "RawHTML");
    _defineProperty(this, "DragDropEditor", "DragDropEditor");
    _defineProperty(this, "LandingPageEditor", "LandingPageEditor");
  }
  _createClass(TemplateType, null, [{
    key: "constructFromObject",
    value:
    /**
    * Returns a <code>TemplateType</code> enum value from a Javascript object name.
    * @param {Object} data The plain JavaScript object containing the name of the enum value.
    * @return {module:model/TemplateType} The enum <code>TemplateType</code> value.
    */
    function constructFromObject(object) {
      return object;
    }
  }]);
  return TemplateType;
}();
exports["default"] = TemplateType;
},{"../ApiClient":1}],94:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * The TransactionalRecipient model module.
 * @module model/TransactionalRecipient
 * @version 4.0.23
 */
var TransactionalRecipient = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>TransactionalRecipient</code>.
   * List of transactional recipients
   * @alias module:model/TransactionalRecipient
   * @param to {Array.<String>} List of recipients (visible to others)
   */
  function TransactionalRecipient(to) {
    _classCallCheck(this, TransactionalRecipient);
    TransactionalRecipient.initialize(this, to);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  _createClass(TransactionalRecipient, null, [{
    key: "initialize",
    value: function initialize(obj, to) {
      obj['To'] = to;
    }

    /**
     * Constructs a <code>TransactionalRecipient</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/TransactionalRecipient} obj Optional instance to populate.
     * @return {module:model/TransactionalRecipient} The populated <code>TransactionalRecipient</code> instance.
     */
  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new TransactionalRecipient();
        if (data.hasOwnProperty('To')) {
          obj['To'] = _ApiClient["default"].convertToType(data['To'], ['String']);
        }
        if (data.hasOwnProperty('CC')) {
          obj['CC'] = _ApiClient["default"].convertToType(data['CC'], ['String']);
        }
        if (data.hasOwnProperty('BCC')) {
          obj['BCC'] = _ApiClient["default"].convertToType(data['BCC'], ['String']);
        }
      }
      return obj;
    }

    /**
     * Validates the JSON data with respect to <code>TransactionalRecipient</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>TransactionalRecipient</code>.
     */
  }, {
    key: "validateJSON",
    value: function validateJSON(data) {
      // check to make sure all required properties are present in the JSON string
      var _iterator = _createForOfIteratorHelper(TransactionalRecipient.RequiredProperties),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var property = _step.value;
          if (!data[property]) {
            throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
          }
        }
        // ensure the json data is an array
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      if (!Array.isArray(data['To'])) {
        throw new Error("Expected the field `To` to be an array in the JSON data but got " + data['To']);
      }
      // ensure the json data is an array
      if (!Array.isArray(data['CC'])) {
        throw new Error("Expected the field `CC` to be an array in the JSON data but got " + data['CC']);
      }
      // ensure the json data is an array
      if (!Array.isArray(data['BCC'])) {
        throw new Error("Expected the field `BCC` to be an array in the JSON data but got " + data['BCC']);
      }
      return true;
    }
  }]);
  return TransactionalRecipient;
}();
TransactionalRecipient.RequiredProperties = ["To"];

/**
 * List of recipients (visible to others)
 * @member {Array.<String>} To
 */
TransactionalRecipient.prototype['To'] = undefined;

/**
 * List of Carbon Copy recipients (visible to others)
 * @member {Array.<String>} CC
 */
TransactionalRecipient.prototype['CC'] = undefined;

/**
 * List of Blind Carbon Copy recipients (hidden from other recipients)
 * @member {Array.<String>} BCC
 */
TransactionalRecipient.prototype['BCC'] = undefined;
var _default = TransactionalRecipient;
exports["default"] = _default;
},{"../ApiClient":1}],95:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * The Utm model module.
 * @module model/Utm
 * @version 4.0.23
 */
var Utm = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>Utm</code>.
   * Utm marketing data to be attached to every link in this e-mail.
   * @alias module:model/Utm
   */
  function Utm() {
    _classCallCheck(this, Utm);
    Utm.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  _createClass(Utm, null, [{
    key: "initialize",
    value: function initialize(obj) {}

    /**
     * Constructs a <code>Utm</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Utm} obj Optional instance to populate.
     * @return {module:model/Utm} The populated <code>Utm</code> instance.
     */
  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new Utm();
        if (data.hasOwnProperty('Source')) {
          obj['Source'] = _ApiClient["default"].convertToType(data['Source'], 'String');
        }
        if (data.hasOwnProperty('Medium')) {
          obj['Medium'] = _ApiClient["default"].convertToType(data['Medium'], 'String');
        }
        if (data.hasOwnProperty('Campaign')) {
          obj['Campaign'] = _ApiClient["default"].convertToType(data['Campaign'], 'String');
        }
        if (data.hasOwnProperty('Content')) {
          obj['Content'] = _ApiClient["default"].convertToType(data['Content'], 'String');
        }
      }
      return obj;
    }

    /**
     * Validates the JSON data with respect to <code>Utm</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>Utm</code>.
     */
  }, {
    key: "validateJSON",
    value: function validateJSON(data) {
      // ensure the json data is a string
      if (data['Source'] && !(typeof data['Source'] === 'string' || data['Source'] instanceof String)) {
        throw new Error("Expected the field `Source` to be a primitive type in the JSON string but got " + data['Source']);
      }
      // ensure the json data is a string
      if (data['Medium'] && !(typeof data['Medium'] === 'string' || data['Medium'] instanceof String)) {
        throw new Error("Expected the field `Medium` to be a primitive type in the JSON string but got " + data['Medium']);
      }
      // ensure the json data is a string
      if (data['Campaign'] && !(typeof data['Campaign'] === 'string' || data['Campaign'] instanceof String)) {
        throw new Error("Expected the field `Campaign` to be a primitive type in the JSON string but got " + data['Campaign']);
      }
      // ensure the json data is a string
      if (data['Content'] && !(typeof data['Content'] === 'string' || data['Content'] instanceof String)) {
        throw new Error("Expected the field `Content` to be a primitive type in the JSON string but got " + data['Content']);
      }
      return true;
    }
  }]);
  return Utm;
}();
/**
 * utmsource value
 * @member {String} Source
 */
Utm.prototype['Source'] = undefined;

/**
 * utmmedium value
 * @member {String} Medium
 */
Utm.prototype['Medium'] = undefined;

/**
 * utmcampaign value
 * @member {String} Campaign
 */
Utm.prototype['Campaign'] = undefined;

/**
 * utmcontent value
 * @member {String} Content
 */
Utm.prototype['Content'] = undefined;
var _default = Utm;
exports["default"] = _default;
},{"../ApiClient":1}],96:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _FileUploadResult = _interopRequireDefault(require("./FileUploadResult"));
var _VerificationStatus = _interopRequireDefault(require("./VerificationStatus"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * The VerificationFileResult model module.
 * @module model/VerificationFileResult
 * @version 4.0.23
 */
var VerificationFileResult = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>VerificationFileResult</code>.
   * Simple verification file result info
   * @alias module:model/VerificationFileResult
   */
  function VerificationFileResult() {
    _classCallCheck(this, VerificationFileResult);
    VerificationFileResult.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  _createClass(VerificationFileResult, null, [{
    key: "initialize",
    value: function initialize(obj) {}

    /**
     * Constructs a <code>VerificationFileResult</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/VerificationFileResult} obj Optional instance to populate.
     * @return {module:model/VerificationFileResult} The populated <code>VerificationFileResult</code> instance.
     */
  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new VerificationFileResult();
        if (data.hasOwnProperty('VerificationID')) {
          obj['VerificationID'] = _ApiClient["default"].convertToType(data['VerificationID'], 'String');
        }
        if (data.hasOwnProperty('Filename')) {
          obj['Filename'] = _ApiClient["default"].convertToType(data['Filename'], 'String');
        }
        if (data.hasOwnProperty('VerificationStatus')) {
          obj['VerificationStatus'] = _VerificationStatus["default"].constructFromObject(data['VerificationStatus']);
        }
        if (data.hasOwnProperty('FileUploadResult')) {
          obj['FileUploadResult'] = _FileUploadResult["default"].constructFromObject(data['FileUploadResult']);
        }
        if (data.hasOwnProperty('DateAdded')) {
          obj['DateAdded'] = _ApiClient["default"].convertToType(data['DateAdded'], 'Date');
        }
        if (data.hasOwnProperty('Source')) {
          obj['Source'] = _ApiClient["default"].convertToType(data['Source'], 'String');
        }
      }
      return obj;
    }

    /**
     * Validates the JSON data with respect to <code>VerificationFileResult</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>VerificationFileResult</code>.
     */
  }, {
    key: "validateJSON",
    value: function validateJSON(data) {
      // ensure the json data is a string
      if (data['VerificationID'] && !(typeof data['VerificationID'] === 'string' || data['VerificationID'] instanceof String)) {
        throw new Error("Expected the field `VerificationID` to be a primitive type in the JSON string but got " + data['VerificationID']);
      }
      // ensure the json data is a string
      if (data['Filename'] && !(typeof data['Filename'] === 'string' || data['Filename'] instanceof String)) {
        throw new Error("Expected the field `Filename` to be a primitive type in the JSON string but got " + data['Filename']);
      }
      // validate the optional field `FileUploadResult`
      if (data['FileUploadResult']) {
        // data not null
        _FileUploadResult["default"].validateJSON(data['FileUploadResult']);
      }
      // ensure the json data is a string
      if (data['Source'] && !(typeof data['Source'] === 'string' || data['Source'] instanceof String)) {
        throw new Error("Expected the field `Source` to be a primitive type in the JSON string but got " + data['Source']);
      }
      return true;
    }
  }]);
  return VerificationFileResult;
}();
/**
 * Identifier of this verification result
 * @member {String} VerificationID
 */
VerificationFileResult.prototype['VerificationID'] = undefined;

/**
 * Origin file name
 * @member {String} Filename
 */
VerificationFileResult.prototype['Filename'] = undefined;

/**
 * @member {module:model/VerificationStatus} VerificationStatus
 */
VerificationFileResult.prototype['VerificationStatus'] = undefined;

/**
 * @member {module:model/FileUploadResult} FileUploadResult
 */
VerificationFileResult.prototype['FileUploadResult'] = undefined;

/**
 * Date of creation in YYYY-MM-DDThh:ii:ss format
 * @member {Date} DateAdded
 */
VerificationFileResult.prototype['DateAdded'] = undefined;

/**
 * Origin file extension
 * @member {String} Source
 */
VerificationFileResult.prototype['Source'] = undefined;
var _default = VerificationFileResult;
exports["default"] = _default;
},{"../ApiClient":1,"./FileUploadResult":59,"./VerificationStatus":98}],97:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
var _EmailValidationResult = _interopRequireDefault(require("./EmailValidationResult"));
var _FileUploadResult = _interopRequireDefault(require("./FileUploadResult"));
var _VerificationStatus = _interopRequireDefault(require("./VerificationStatus"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * The VerificationFileResultDetails model module.
 * @module model/VerificationFileResultDetails
 * @version 4.0.23
 */
var VerificationFileResultDetails = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>VerificationFileResultDetails</code>.
   * Detailed verification file result info
   * @alias module:model/VerificationFileResultDetails
   */
  function VerificationFileResultDetails() {
    _classCallCheck(this, VerificationFileResultDetails);
    VerificationFileResultDetails.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  _createClass(VerificationFileResultDetails, null, [{
    key: "initialize",
    value: function initialize(obj) {}

    /**
     * Constructs a <code>VerificationFileResultDetails</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/VerificationFileResultDetails} obj Optional instance to populate.
     * @return {module:model/VerificationFileResultDetails} The populated <code>VerificationFileResultDetails</code> instance.
     */
  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new VerificationFileResultDetails();
        if (data.hasOwnProperty('VerificationResult')) {
          obj['VerificationResult'] = _ApiClient["default"].convertToType(data['VerificationResult'], [_EmailValidationResult["default"]]);
        }
        if (data.hasOwnProperty('VerificationID')) {
          obj['VerificationID'] = _ApiClient["default"].convertToType(data['VerificationID'], 'String');
        }
        if (data.hasOwnProperty('Filename')) {
          obj['Filename'] = _ApiClient["default"].convertToType(data['Filename'], 'String');
        }
        if (data.hasOwnProperty('VerificationStatus')) {
          obj['VerificationStatus'] = _VerificationStatus["default"].constructFromObject(data['VerificationStatus']);
        }
        if (data.hasOwnProperty('FileUploadResult')) {
          obj['FileUploadResult'] = _FileUploadResult["default"].constructFromObject(data['FileUploadResult']);
        }
        if (data.hasOwnProperty('DateAdded')) {
          obj['DateAdded'] = _ApiClient["default"].convertToType(data['DateAdded'], 'Date');
        }
        if (data.hasOwnProperty('Source')) {
          obj['Source'] = _ApiClient["default"].convertToType(data['Source'], 'String');
        }
      }
      return obj;
    }

    /**
     * Validates the JSON data with respect to <code>VerificationFileResultDetails</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>VerificationFileResultDetails</code>.
     */
  }, {
    key: "validateJSON",
    value: function validateJSON(data) {
      if (data['VerificationResult']) {
        // data not null
        // ensure the json data is an array
        if (!Array.isArray(data['VerificationResult'])) {
          throw new Error("Expected the field `VerificationResult` to be an array in the JSON data but got " + data['VerificationResult']);
        }
        // validate the optional field `VerificationResult` (array)
        var _iterator = _createForOfIteratorHelper(data['VerificationResult']),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var item = _step.value;
            _EmailValidationResult["default"].validateJsonObject(item);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        ;
      }
      // ensure the json data is a string
      if (data['VerificationID'] && !(typeof data['VerificationID'] === 'string' || data['VerificationID'] instanceof String)) {
        throw new Error("Expected the field `VerificationID` to be a primitive type in the JSON string but got " + data['VerificationID']);
      }
      // ensure the json data is a string
      if (data['Filename'] && !(typeof data['Filename'] === 'string' || data['Filename'] instanceof String)) {
        throw new Error("Expected the field `Filename` to be a primitive type in the JSON string but got " + data['Filename']);
      }
      // validate the optional field `FileUploadResult`
      if (data['FileUploadResult']) {
        // data not null
        _FileUploadResult["default"].validateJSON(data['FileUploadResult']);
      }
      // ensure the json data is a string
      if (data['Source'] && !(typeof data['Source'] === 'string' || data['Source'] instanceof String)) {
        throw new Error("Expected the field `Source` to be a primitive type in the JSON string but got " + data['Source']);
      }
      return true;
    }
  }]);
  return VerificationFileResultDetails;
}();
/**
 * Verification result's details
 * @member {Array.<module:model/EmailValidationResult>} VerificationResult
 */
VerificationFileResultDetails.prototype['VerificationResult'] = undefined;

/**
 * Identifier of this verification result
 * @member {String} VerificationID
 */
VerificationFileResultDetails.prototype['VerificationID'] = undefined;

/**
 * Origin file name
 * @member {String} Filename
 */
VerificationFileResultDetails.prototype['Filename'] = undefined;

/**
 * @member {module:model/VerificationStatus} VerificationStatus
 */
VerificationFileResultDetails.prototype['VerificationStatus'] = undefined;

/**
 * @member {module:model/FileUploadResult} FileUploadResult
 */
VerificationFileResultDetails.prototype['FileUploadResult'] = undefined;

/**
 * Date of creation in YYYY-MM-DDThh:ii:ss format
 * @member {Date} DateAdded
 */
VerificationFileResultDetails.prototype['DateAdded'] = undefined;

/**
 * Origin file extension
 * @member {String} Source
 */
VerificationFileResultDetails.prototype['Source'] = undefined;
var _default = VerificationFileResultDetails;
exports["default"] = _default;
},{"../ApiClient":1,"./EmailValidationResult":47,"./FileUploadResult":59,"./VerificationStatus":98}],98:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ApiClient = _interopRequireDefault(require("../ApiClient"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
* Enum class VerificationStatus.
* @enum {}
* @readonly
*/
var VerificationStatus = /*#__PURE__*/function () {
  function VerificationStatus() {
    _classCallCheck(this, VerificationStatus);
    _defineProperty(this, "Processing", "Processing");
    _defineProperty(this, "Ready", "Ready");
    _defineProperty(this, "Expired", "Expired");
    _defineProperty(this, "Verified", "Verified");
    _defineProperty(this, "Error", "Error");
  }
  _createClass(VerificationStatus, null, [{
    key: "constructFromObject",
    value:
    /**
    * Returns a <code>VerificationStatus</code> enum value from a Javascript object name.
    * @param {Object} data The plain JavaScript object containing the name of the enum value.
    * @return {module:model/VerificationStatus} The enum <code>VerificationStatus</code> value.
    */
    function constructFromObject(object) {
      return object;
    }
  }]);
  return VerificationStatus;
}();
exports["default"] = VerificationStatus;
},{"../ApiClient":1}],99:[function(require,module,exports){

/**
 * Expose `Emitter`.
 */

if (typeof module !== 'undefined') {
  module.exports = Emitter;
}

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }

  // Remove event specific arrays for event types that no
  // one is subscribed for to avoid memory leak.
  if (callbacks.length === 0) {
    delete this._callbacks['$' + event];
  }

  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};

  var args = new Array(arguments.length - 1)
    , callbacks = this._callbacks['$' + event];

  for (var i = 1; i < arguments.length; i++) {
    args[i - 1] = arguments[i];
  }

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};

},{}],100:[function(require,module,exports){
module.exports = stringify
stringify.default = stringify
stringify.stable = deterministicStringify
stringify.stableStringify = deterministicStringify

var LIMIT_REPLACE_NODE = '[...]'
var CIRCULAR_REPLACE_NODE = '[Circular]'

var arr = []
var replacerStack = []

function defaultOptions () {
  return {
    depthLimit: Number.MAX_SAFE_INTEGER,
    edgesLimit: Number.MAX_SAFE_INTEGER
  }
}

// Regular stringify
function stringify (obj, replacer, spacer, options) {
  if (typeof options === 'undefined') {
    options = defaultOptions()
  }

  decirc(obj, '', 0, [], undefined, 0, options)
  var res
  try {
    if (replacerStack.length === 0) {
      res = JSON.stringify(obj, replacer, spacer)
    } else {
      res = JSON.stringify(obj, replaceGetterValues(replacer), spacer)
    }
  } catch (_) {
    return JSON.stringify('[unable to serialize, circular reference is too complex to analyze]')
  } finally {
    while (arr.length !== 0) {
      var part = arr.pop()
      if (part.length === 4) {
        Object.defineProperty(part[0], part[1], part[3])
      } else {
        part[0][part[1]] = part[2]
      }
    }
  }
  return res
}

function setReplace (replace, val, k, parent) {
  var propertyDescriptor = Object.getOwnPropertyDescriptor(parent, k)
  if (propertyDescriptor.get !== undefined) {
    if (propertyDescriptor.configurable) {
      Object.defineProperty(parent, k, { value: replace })
      arr.push([parent, k, val, propertyDescriptor])
    } else {
      replacerStack.push([val, k, replace])
    }
  } else {
    parent[k] = replace
    arr.push([parent, k, val])
  }
}

function decirc (val, k, edgeIndex, stack, parent, depth, options) {
  depth += 1
  var i
  if (typeof val === 'object' && val !== null) {
    for (i = 0; i < stack.length; i++) {
      if (stack[i] === val) {
        setReplace(CIRCULAR_REPLACE_NODE, val, k, parent)
        return
      }
    }

    if (
      typeof options.depthLimit !== 'undefined' &&
      depth > options.depthLimit
    ) {
      setReplace(LIMIT_REPLACE_NODE, val, k, parent)
      return
    }

    if (
      typeof options.edgesLimit !== 'undefined' &&
      edgeIndex + 1 > options.edgesLimit
    ) {
      setReplace(LIMIT_REPLACE_NODE, val, k, parent)
      return
    }

    stack.push(val)
    // Optimize for Arrays. Big arrays could kill the performance otherwise!
    if (Array.isArray(val)) {
      for (i = 0; i < val.length; i++) {
        decirc(val[i], i, i, stack, val, depth, options)
      }
    } else {
      var keys = Object.keys(val)
      for (i = 0; i < keys.length; i++) {
        var key = keys[i]
        decirc(val[key], key, i, stack, val, depth, options)
      }
    }
    stack.pop()
  }
}

// Stable-stringify
function compareFunction (a, b) {
  if (a < b) {
    return -1
  }
  if (a > b) {
    return 1
  }
  return 0
}

function deterministicStringify (obj, replacer, spacer, options) {
  if (typeof options === 'undefined') {
    options = defaultOptions()
  }

  var tmp = deterministicDecirc(obj, '', 0, [], undefined, 0, options) || obj
  var res
  try {
    if (replacerStack.length === 0) {
      res = JSON.stringify(tmp, replacer, spacer)
    } else {
      res = JSON.stringify(tmp, replaceGetterValues(replacer), spacer)
    }
  } catch (_) {
    return JSON.stringify('[unable to serialize, circular reference is too complex to analyze]')
  } finally {
    // Ensure that we restore the object as it was.
    while (arr.length !== 0) {
      var part = arr.pop()
      if (part.length === 4) {
        Object.defineProperty(part[0], part[1], part[3])
      } else {
        part[0][part[1]] = part[2]
      }
    }
  }
  return res
}

function deterministicDecirc (val, k, edgeIndex, stack, parent, depth, options) {
  depth += 1
  var i
  if (typeof val === 'object' && val !== null) {
    for (i = 0; i < stack.length; i++) {
      if (stack[i] === val) {
        setReplace(CIRCULAR_REPLACE_NODE, val, k, parent)
        return
      }
    }
    try {
      if (typeof val.toJSON === 'function') {
        return
      }
    } catch (_) {
      return
    }

    if (
      typeof options.depthLimit !== 'undefined' &&
      depth > options.depthLimit
    ) {
      setReplace(LIMIT_REPLACE_NODE, val, k, parent)
      return
    }

    if (
      typeof options.edgesLimit !== 'undefined' &&
      edgeIndex + 1 > options.edgesLimit
    ) {
      setReplace(LIMIT_REPLACE_NODE, val, k, parent)
      return
    }

    stack.push(val)
    // Optimize for Arrays. Big arrays could kill the performance otherwise!
    if (Array.isArray(val)) {
      for (i = 0; i < val.length; i++) {
        deterministicDecirc(val[i], i, i, stack, val, depth, options)
      }
    } else {
      // Create a temporary object in the required way
      var tmp = {}
      var keys = Object.keys(val).sort(compareFunction)
      for (i = 0; i < keys.length; i++) {
        var key = keys[i]
        deterministicDecirc(val[key], key, i, stack, val, depth, options)
        tmp[key] = val[key]
      }
      if (typeof parent !== 'undefined') {
        arr.push([parent, k, val])
        parent[k] = tmp
      } else {
        return tmp
      }
    }
    stack.pop()
  }
}

// wraps replacer function to handle values we couldn't replace
// and mark them as replaced value
function replaceGetterValues (replacer) {
  replacer =
    typeof replacer !== 'undefined'
      ? replacer
      : function (k, v) {
        return v
      }
  return function (key, val) {
    if (replacerStack.length > 0) {
      for (var i = 0; i < replacerStack.length; i++) {
        var part = replacerStack[i]
        if (part[1] === key && part[0] === val) {
          val = part[2]
          replacerStack.splice(i, 1)
          break
        }
      }
    }
    return replacer.call(this, key, val)
  }
}

},{}],101:[function(require,module,exports){
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function Agent() {
  this._defaults = [];
}

['use', 'on', 'once', 'set', 'query', 'type', 'accept', 'auth', 'withCredentials', 'sortQuery', 'retry', 'ok', 'redirects', 'timeout', 'buffer', 'serialize', 'parse', 'ca', 'key', 'pfx', 'cert', 'disableTLSCerts'].forEach(function (fn) {
  // Default setting for all requests from this agent
  Agent.prototype[fn] = function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    this._defaults.push({
      fn: fn,
      args: args
    });

    return this;
  };
});

Agent.prototype._setDefaults = function (req) {
  this._defaults.forEach(function (def) {
    req[def.fn].apply(req, _toConsumableArray(def.args));
  });
};

module.exports = Agent;

},{}],102:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Root reference for iframes.
 */
var root;

if (typeof window !== 'undefined') {
  // Browser window
  root = window;
} else if (typeof self === 'undefined') {
  // Other environments
  console.warn('Using browser-only version of superagent in non-browser environment');
  root = void 0;
} else {
  // Web Worker
  root = self;
}

var Emitter = require('component-emitter');

var safeStringify = require('fast-safe-stringify');

var RequestBase = require('./request-base');

var isObject = require('./is-object');

var ResponseBase = require('./response-base');

var Agent = require('./agent-base');
/**
 * Noop.
 */


function noop() {}
/**
 * Expose `request`.
 */


module.exports = function (method, url) {
  // callback
  if (typeof url === 'function') {
    return new exports.Request('GET', method).end(url);
  } // url first


  if (arguments.length === 1) {
    return new exports.Request('GET', method);
  }

  return new exports.Request(method, url);
};

exports = module.exports;
var request = exports;
exports.Request = Request;
/**
 * Determine XHR.
 */

request.getXHR = function () {
  if (root.XMLHttpRequest && (!root.location || root.location.protocol !== 'file:' || !root.ActiveXObject)) {
    return new XMLHttpRequest();
  }

  try {
    return new ActiveXObject('Microsoft.XMLHTTP');
  } catch (_unused) {}

  try {
    return new ActiveXObject('Msxml2.XMLHTTP.6.0');
  } catch (_unused2) {}

  try {
    return new ActiveXObject('Msxml2.XMLHTTP.3.0');
  } catch (_unused3) {}

  try {
    return new ActiveXObject('Msxml2.XMLHTTP');
  } catch (_unused4) {}

  throw new Error('Browser-only version of superagent could not find XHR');
};
/**
 * Removes leading and trailing whitespace, added to support IE.
 *
 * @param {String} s
 * @return {String}
 * @api private
 */


var trim = ''.trim ? function (s) {
  return s.trim();
} : function (s) {
  return s.replace(/(^\s*|\s*$)/g, '');
};
/**
 * Serialize the given `obj`.
 *
 * @param {Object} obj
 * @return {String}
 * @api private
 */

function serialize(obj) {
  if (!isObject(obj)) return obj;
  var pairs = [];

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) pushEncodedKeyValuePair(pairs, key, obj[key]);
  }

  return pairs.join('&');
}
/**
 * Helps 'serialize' with serializing arrays.
 * Mutates the pairs array.
 *
 * @param {Array} pairs
 * @param {String} key
 * @param {Mixed} val
 */


function pushEncodedKeyValuePair(pairs, key, val) {
  if (val === undefined) return;

  if (val === null) {
    pairs.push(encodeURI(key));
    return;
  }

  if (Array.isArray(val)) {
    val.forEach(function (v) {
      pushEncodedKeyValuePair(pairs, key, v);
    });
  } else if (isObject(val)) {
    for (var subkey in val) {
      if (Object.prototype.hasOwnProperty.call(val, subkey)) pushEncodedKeyValuePair(pairs, "".concat(key, "[").concat(subkey, "]"), val[subkey]);
    }
  } else {
    pairs.push(encodeURI(key) + '=' + encodeURIComponent(val));
  }
}
/**
 * Expose serialization method.
 */


request.serializeObject = serialize;
/**
 * Parse the given x-www-form-urlencoded `str`.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function parseString(str) {
  var obj = {};
  var pairs = str.split('&');
  var pair;
  var pos;

  for (var i = 0, len = pairs.length; i < len; ++i) {
    pair = pairs[i];
    pos = pair.indexOf('=');

    if (pos === -1) {
      obj[decodeURIComponent(pair)] = '';
    } else {
      obj[decodeURIComponent(pair.slice(0, pos))] = decodeURIComponent(pair.slice(pos + 1));
    }
  }

  return obj;
}
/**
 * Expose parser.
 */


request.parseString = parseString;
/**
 * Default MIME type map.
 *
 *     superagent.types.xml = 'application/xml';
 *
 */

request.types = {
  html: 'text/html',
  json: 'application/json',
  xml: 'text/xml',
  urlencoded: 'application/x-www-form-urlencoded',
  form: 'application/x-www-form-urlencoded',
  'form-data': 'application/x-www-form-urlencoded'
};
/**
 * Default serialization map.
 *
 *     superagent.serialize['application/xml'] = function(obj){
 *       return 'generated xml here';
 *     };
 *
 */

request.serialize = {
  'application/x-www-form-urlencoded': serialize,
  'application/json': safeStringify
};
/**
 * Default parsers.
 *
 *     superagent.parse['application/xml'] = function(str){
 *       return { object parsed from str };
 *     };
 *
 */

request.parse = {
  'application/x-www-form-urlencoded': parseString,
  'application/json': JSON.parse
};
/**
 * Parse the given header `str` into
 * an object containing the mapped fields.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function parseHeader(str) {
  var lines = str.split(/\r?\n/);
  var fields = {};
  var index;
  var line;
  var field;
  var val;

  for (var i = 0, len = lines.length; i < len; ++i) {
    line = lines[i];
    index = line.indexOf(':');

    if (index === -1) {
      // could be empty line, just skip it
      continue;
    }

    field = line.slice(0, index).toLowerCase();
    val = trim(line.slice(index + 1));
    fields[field] = val;
  }

  return fields;
}
/**
 * Check if `mime` is json or has +json structured syntax suffix.
 *
 * @param {String} mime
 * @return {Boolean}
 * @api private
 */


function isJSON(mime) {
  // should match /json or +json
  // but not /json-seq
  return /[/+]json($|[^-\w])/.test(mime);
}
/**
 * Initialize a new `Response` with the given `xhr`.
 *
 *  - set flags (.ok, .error, etc)
 *  - parse header
 *
 * Examples:
 *
 *  Aliasing `superagent` as `request` is nice:
 *
 *      request = superagent;
 *
 *  We can use the promise-like API, or pass callbacks:
 *
 *      request.get('/').end(function(res){});
 *      request.get('/', function(res){});
 *
 *  Sending data can be chained:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' })
 *        .end(function(res){});
 *
 *  Or passed to `.send()`:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' }, function(res){});
 *
 *  Or passed to `.post()`:
 *
 *      request
 *        .post('/user', { name: 'tj' })
 *        .end(function(res){});
 *
 * Or further reduced to a single call for simple cases:
 *
 *      request
 *        .post('/user', { name: 'tj' }, function(res){});
 *
 * @param {XMLHTTPRequest} xhr
 * @param {Object} options
 * @api private
 */


function Response(req) {
  this.req = req;
  this.xhr = this.req.xhr; // responseText is accessible only if responseType is '' or 'text' and on older browsers

  this.text = this.req.method !== 'HEAD' && (this.xhr.responseType === '' || this.xhr.responseType === 'text') || typeof this.xhr.responseType === 'undefined' ? this.xhr.responseText : null;
  this.statusText = this.req.xhr.statusText;
  var status = this.xhr.status; // handle IE9 bug: http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request

  if (status === 1223) {
    status = 204;
  }

  this._setStatusProperties(status);

  this.headers = parseHeader(this.xhr.getAllResponseHeaders());
  this.header = this.headers; // getAllResponseHeaders sometimes falsely returns "" for CORS requests, but
  // getResponseHeader still works. so we get content-type even if getting
  // other headers fails.

  this.header['content-type'] = this.xhr.getResponseHeader('content-type');

  this._setHeaderProperties(this.header);

  if (this.text === null && req._responseType) {
    this.body = this.xhr.response;
  } else {
    this.body = this.req.method === 'HEAD' ? null : this._parseBody(this.text ? this.text : this.xhr.response);
  }
} // eslint-disable-next-line new-cap


ResponseBase(Response.prototype);
/**
 * Parse the given body `str`.
 *
 * Used for auto-parsing of bodies. Parsers
 * are defined on the `superagent.parse` object.
 *
 * @param {String} str
 * @return {Mixed}
 * @api private
 */

Response.prototype._parseBody = function (str) {
  var parse = request.parse[this.type];

  if (this.req._parser) {
    return this.req._parser(this, str);
  }

  if (!parse && isJSON(this.type)) {
    parse = request.parse['application/json'];
  }

  return parse && str && (str.length > 0 || str instanceof Object) ? parse(str) : null;
};
/**
 * Return an `Error` representative of this response.
 *
 * @return {Error}
 * @api public
 */


Response.prototype.toError = function () {
  var req = this.req;
  var method = req.method;
  var url = req.url;
  var msg = "cannot ".concat(method, " ").concat(url, " (").concat(this.status, ")");
  var err = new Error(msg);
  err.status = this.status;
  err.method = method;
  err.url = url;
  return err;
};
/**
 * Expose `Response`.
 */


request.Response = Response;
/**
 * Initialize a new `Request` with the given `method` and `url`.
 *
 * @param {String} method
 * @param {String} url
 * @api public
 */

function Request(method, url) {
  var self = this;
  this._query = this._query || [];
  this.method = method;
  this.url = url;
  this.header = {}; // preserves header name case

  this._header = {}; // coerces header names to lowercase

  this.on('end', function () {
    var err = null;
    var res = null;

    try {
      res = new Response(self);
    } catch (err_) {
      err = new Error('Parser is unable to parse the response');
      err.parse = true;
      err.original = err_; // issue #675: return the raw response if the response parsing fails

      if (self.xhr) {
        // ie9 doesn't have 'response' property
        err.rawResponse = typeof self.xhr.responseType === 'undefined' ? self.xhr.responseText : self.xhr.response; // issue #876: return the http status code if the response parsing fails

        err.status = self.xhr.status ? self.xhr.status : null;
        err.statusCode = err.status; // backwards-compat only
      } else {
        err.rawResponse = null;
        err.status = null;
      }

      return self.callback(err);
    }

    self.emit('response', res);
    var new_err;

    try {
      if (!self._isResponseOK(res)) {
        new_err = new Error(res.statusText || res.text || 'Unsuccessful HTTP response');
      }
    } catch (err_) {
      new_err = err_; // ok() callback can throw
    } // #1000 don't catch errors from the callback to avoid double calling it


    if (new_err) {
      new_err.original = err;
      new_err.response = res;
      new_err.status = res.status;
      self.callback(new_err, res);
    } else {
      self.callback(null, res);
    }
  });
}
/**
 * Mixin `Emitter` and `RequestBase`.
 */
// eslint-disable-next-line new-cap


Emitter(Request.prototype); // eslint-disable-next-line new-cap

RequestBase(Request.prototype);
/**
 * Set Content-Type to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.xml = 'application/xml';
 *
 *      request.post('/')
 *        .type('xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 *      request.post('/')
 *        .type('application/xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 * @param {String} type
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.type = function (type) {
  this.set('Content-Type', request.types[type] || type);
  return this;
};
/**
 * Set Accept to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.json = 'application/json';
 *
 *      request.get('/agent')
 *        .accept('json')
 *        .end(callback);
 *
 *      request.get('/agent')
 *        .accept('application/json')
 *        .end(callback);
 *
 * @param {String} accept
 * @return {Request} for chaining
 * @api public
 */


Request.prototype.accept = function (type) {
  this.set('Accept', request.types[type] || type);
  return this;
};
/**
 * Set Authorization field value with `user` and `pass`.
 *
 * @param {String} user
 * @param {String} [pass] optional in case of using 'bearer' as type
 * @param {Object} options with 'type' property 'auto', 'basic' or 'bearer' (default 'basic')
 * @return {Request} for chaining
 * @api public
 */


Request.prototype.auth = function (user, pass, options) {
  if (arguments.length === 1) pass = '';

  if (_typeof(pass) === 'object' && pass !== null) {
    // pass is optional and can be replaced with options
    options = pass;
    pass = '';
  }

  if (!options) {
    options = {
      type: typeof btoa === 'function' ? 'basic' : 'auto'
    };
  }

  var encoder = function encoder(string) {
    if (typeof btoa === 'function') {
      return btoa(string);
    }

    throw new Error('Cannot use basic auth, btoa is not a function');
  };

  return this._auth(user, pass, options, encoder);
};
/**
 * Add query-string `val`.
 *
 * Examples:
 *
 *   request.get('/shoes')
 *     .query('size=10')
 *     .query({ color: 'blue' })
 *
 * @param {Object|String} val
 * @return {Request} for chaining
 * @api public
 */


Request.prototype.query = function (val) {
  if (typeof val !== 'string') val = serialize(val);
  if (val) this._query.push(val);
  return this;
};
/**
 * Queue the given `file` as an attachment to the specified `field`,
 * with optional `options` (or filename).
 *
 * ``` js
 * request.post('/upload')
 *   .attach('content', new Blob(['<a id="a"><b id="b">hey!</b></a>'], { type: "text/html"}))
 *   .end(callback);
 * ```
 *
 * @param {String} field
 * @param {Blob|File} file
 * @param {String|Object} options
 * @return {Request} for chaining
 * @api public
 */


Request.prototype.attach = function (field, file, options) {
  if (file) {
    if (this._data) {
      throw new Error("superagent can't mix .send() and .attach()");
    }

    this._getFormData().append(field, file, options || file.name);
  }

  return this;
};

Request.prototype._getFormData = function () {
  if (!this._formData) {
    this._formData = new root.FormData();
  }

  return this._formData;
};
/**
 * Invoke the callback with `err` and `res`
 * and handle arity check.
 *
 * @param {Error} err
 * @param {Response} res
 * @api private
 */


Request.prototype.callback = function (err, res) {
  if (this._shouldRetry(err, res)) {
    return this._retry();
  }

  var fn = this._callback;
  this.clearTimeout();

  if (err) {
    if (this._maxRetries) err.retries = this._retries - 1;
    this.emit('error', err);
  }

  fn(err, res);
};
/**
 * Invoke callback with x-domain error.
 *
 * @api private
 */


Request.prototype.crossDomainError = function () {
  var err = new Error('Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.');
  err.crossDomain = true;
  err.status = this.status;
  err.method = this.method;
  err.url = this.url;
  this.callback(err);
}; // This only warns, because the request is still likely to work


Request.prototype.agent = function () {
  console.warn('This is not supported in browser version of superagent');
  return this;
};

Request.prototype.ca = Request.prototype.agent;
Request.prototype.buffer = Request.prototype.ca; // This throws, because it can't send/receive data as expected

Request.prototype.write = function () {
  throw new Error('Streaming is not supported in browser version of superagent');
};

Request.prototype.pipe = Request.prototype.write;
/**
 * Check if `obj` is a host object,
 * we don't want to serialize these :)
 *
 * @param {Object} obj host object
 * @return {Boolean} is a host object
 * @api private
 */

Request.prototype._isHost = function (obj) {
  // Native objects stringify to [object File], [object Blob], [object FormData], etc.
  return obj && _typeof(obj) === 'object' && !Array.isArray(obj) && Object.prototype.toString.call(obj) !== '[object Object]';
};
/**
 * Initiate request, invoking callback `fn(res)`
 * with an instanceof `Response`.
 *
 * @param {Function} fn
 * @return {Request} for chaining
 * @api public
 */


Request.prototype.end = function (fn) {
  if (this._endCalled) {
    console.warn('Warning: .end() was called twice. This is not supported in superagent');
  }

  this._endCalled = true; // store callback

  this._callback = fn || noop; // querystring

  this._finalizeQueryString();

  this._end();
};

Request.prototype._setUploadTimeout = function () {
  var self = this; // upload timeout it's wokrs only if deadline timeout is off

  if (this._uploadTimeout && !this._uploadTimeoutTimer) {
    this._uploadTimeoutTimer = setTimeout(function () {
      self._timeoutError('Upload timeout of ', self._uploadTimeout, 'ETIMEDOUT');
    }, this._uploadTimeout);
  }
}; // eslint-disable-next-line complexity


Request.prototype._end = function () {
  if (this._aborted) return this.callback(new Error('The request has been aborted even before .end() was called'));
  var self = this;
  this.xhr = request.getXHR();
  var xhr = this.xhr;
  var data = this._formData || this._data;

  this._setTimeouts(); // state change


  xhr.onreadystatechange = function () {
    var readyState = xhr.readyState;

    if (readyState >= 2 && self._responseTimeoutTimer) {
      clearTimeout(self._responseTimeoutTimer);
    }

    if (readyState !== 4) {
      return;
    } // In IE9, reads to any property (e.g. status) off of an aborted XHR will
    // result in the error "Could not complete the operation due to error c00c023f"


    var status;

    try {
      status = xhr.status;
    } catch (_unused5) {
      status = 0;
    }

    if (!status) {
      if (self.timedout || self._aborted) return;
      return self.crossDomainError();
    }

    self.emit('end');
  }; // progress


  var handleProgress = function handleProgress(direction, e) {
    if (e.total > 0) {
      e.percent = e.loaded / e.total * 100;

      if (e.percent === 100) {
        clearTimeout(self._uploadTimeoutTimer);
      }
    }

    e.direction = direction;
    self.emit('progress', e);
  };

  if (this.hasListeners('progress')) {
    try {
      xhr.addEventListener('progress', handleProgress.bind(null, 'download'));

      if (xhr.upload) {
        xhr.upload.addEventListener('progress', handleProgress.bind(null, 'upload'));
      }
    } catch (_unused6) {// Accessing xhr.upload fails in IE from a web worker, so just pretend it doesn't exist.
      // Reported here:
      // https://connect.microsoft.com/IE/feedback/details/837245/xmlhttprequest-upload-throws-invalid-argument-when-used-from-web-worker-context
    }
  }

  if (xhr.upload) {
    this._setUploadTimeout();
  } // initiate request


  try {
    if (this.username && this.password) {
      xhr.open(this.method, this.url, true, this.username, this.password);
    } else {
      xhr.open(this.method, this.url, true);
    }
  } catch (err) {
    // see #1149
    return this.callback(err);
  } // CORS


  if (this._withCredentials) xhr.withCredentials = true; // body

  if (!this._formData && this.method !== 'GET' && this.method !== 'HEAD' && typeof data !== 'string' && !this._isHost(data)) {
    // serialize stuff
    var contentType = this._header['content-type'];

    var _serialize = this._serializer || request.serialize[contentType ? contentType.split(';')[0] : ''];

    if (!_serialize && isJSON(contentType)) {
      _serialize = request.serialize['application/json'];
    }

    if (_serialize) data = _serialize(data);
  } // set header fields


  for (var field in this.header) {
    if (this.header[field] === null) continue;
    if (Object.prototype.hasOwnProperty.call(this.header, field)) xhr.setRequestHeader(field, this.header[field]);
  }

  if (this._responseType) {
    xhr.responseType = this._responseType;
  } // send stuff


  this.emit('request', this); // IE11 xhr.send(undefined) sends 'undefined' string as POST payload (instead of nothing)
  // We need null here if data is undefined

  xhr.send(typeof data === 'undefined' ? null : data);
};

request.agent = function () {
  return new Agent();
};

['GET', 'POST', 'OPTIONS', 'PATCH', 'PUT', 'DELETE'].forEach(function (method) {
  Agent.prototype[method.toLowerCase()] = function (url, fn) {
    var req = new request.Request(method, url);

    this._setDefaults(req);

    if (fn) {
      req.end(fn);
    }

    return req;
  };
});
Agent.prototype.del = Agent.prototype.delete;
/**
 * GET `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.get = function (url, data, fn) {
  var req = request('GET', url);

  if (typeof data === 'function') {
    fn = data;
    data = null;
  }

  if (data) req.query(data);
  if (fn) req.end(fn);
  return req;
};
/**
 * HEAD `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */


request.head = function (url, data, fn) {
  var req = request('HEAD', url);

  if (typeof data === 'function') {
    fn = data;
    data = null;
  }

  if (data) req.query(data);
  if (fn) req.end(fn);
  return req;
};
/**
 * OPTIONS query to `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */


request.options = function (url, data, fn) {
  var req = request('OPTIONS', url);

  if (typeof data === 'function') {
    fn = data;
    data = null;
  }

  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};
/**
 * DELETE `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} [data]
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */


function del(url, data, fn) {
  var req = request('DELETE', url);

  if (typeof data === 'function') {
    fn = data;
    data = null;
  }

  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
}

request.del = del;
request.delete = del;
/**
 * PATCH `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} [data]
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.patch = function (url, data, fn) {
  var req = request('PATCH', url);

  if (typeof data === 'function') {
    fn = data;
    data = null;
  }

  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};
/**
 * POST `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} [data]
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */


request.post = function (url, data, fn) {
  var req = request('POST', url);

  if (typeof data === 'function') {
    fn = data;
    data = null;
  }

  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};
/**
 * PUT `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */


request.put = function (url, data, fn) {
  var req = request('PUT', url);

  if (typeof data === 'function') {
    fn = data;
    data = null;
  }

  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

},{"./agent-base":101,"./is-object":103,"./request-base":104,"./response-base":105,"component-emitter":99,"fast-safe-stringify":100}],103:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Check if `obj` is an object.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */
function isObject(obj) {
  return obj !== null && _typeof(obj) === 'object';
}

module.exports = isObject;

},{}],104:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Module of mixed-in functions shared between node and client code
 */
var isObject = require('./is-object');
/**
 * Expose `RequestBase`.
 */


module.exports = RequestBase;
/**
 * Initialize a new `RequestBase`.
 *
 * @api public
 */

function RequestBase(obj) {
  if (obj) return mixin(obj);
}
/**
 * Mixin the prototype properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */


function mixin(obj) {
  for (var key in RequestBase.prototype) {
    if (Object.prototype.hasOwnProperty.call(RequestBase.prototype, key)) obj[key] = RequestBase.prototype[key];
  }

  return obj;
}
/**
 * Clear previous timeout.
 *
 * @return {Request} for chaining
 * @api public
 */


RequestBase.prototype.clearTimeout = function () {
  clearTimeout(this._timer);
  clearTimeout(this._responseTimeoutTimer);
  clearTimeout(this._uploadTimeoutTimer);
  delete this._timer;
  delete this._responseTimeoutTimer;
  delete this._uploadTimeoutTimer;
  return this;
};
/**
 * Override default response body parser
 *
 * This function will be called to convert incoming data into request.body
 *
 * @param {Function}
 * @api public
 */


RequestBase.prototype.parse = function (fn) {
  this._parser = fn;
  return this;
};
/**
 * Set format of binary response body.
 * In browser valid formats are 'blob' and 'arraybuffer',
 * which return Blob and ArrayBuffer, respectively.
 *
 * In Node all values result in Buffer.
 *
 * Examples:
 *
 *      req.get('/')
 *        .responseType('blob')
 *        .end(callback);
 *
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */


RequestBase.prototype.responseType = function (val) {
  this._responseType = val;
  return this;
};
/**
 * Override default request body serializer
 *
 * This function will be called to convert data set via .send or .attach into payload to send
 *
 * @param {Function}
 * @api public
 */


RequestBase.prototype.serialize = function (fn) {
  this._serializer = fn;
  return this;
};
/**
 * Set timeouts.
 *
 * - response timeout is time between sending request and receiving the first byte of the response. Includes DNS and connection time.
 * - deadline is the time from start of the request to receiving response body in full. If the deadline is too short large files may not load at all on slow connections.
 * - upload is the time  since last bit of data was sent or received. This timeout works only if deadline timeout is off
 *
 * Value of 0 or false means no timeout.
 *
 * @param {Number|Object} ms or {response, deadline}
 * @return {Request} for chaining
 * @api public
 */


RequestBase.prototype.timeout = function (options) {
  if (!options || _typeof(options) !== 'object') {
    this._timeout = options;
    this._responseTimeout = 0;
    this._uploadTimeout = 0;
    return this;
  }

  for (var option in options) {
    if (Object.prototype.hasOwnProperty.call(options, option)) {
      switch (option) {
        case 'deadline':
          this._timeout = options.deadline;
          break;

        case 'response':
          this._responseTimeout = options.response;
          break;

        case 'upload':
          this._uploadTimeout = options.upload;
          break;

        default:
          console.warn('Unknown timeout option', option);
      }
    }
  }

  return this;
};
/**
 * Set number of retry attempts on error.
 *
 * Failed requests will be retried 'count' times if timeout or err.code >= 500.
 *
 * @param {Number} count
 * @param {Function} [fn]
 * @return {Request} for chaining
 * @api public
 */


RequestBase.prototype.retry = function (count, fn) {
  // Default to 1 if no count passed or true
  if (arguments.length === 0 || count === true) count = 1;
  if (count <= 0) count = 0;
  this._maxRetries = count;
  this._retries = 0;
  this._retryCallback = fn;
  return this;
};

var ERROR_CODES = ['ECONNRESET', 'ETIMEDOUT', 'EADDRINFO', 'ESOCKETTIMEDOUT'];
/**
 * Determine if a request should be retried.
 * (Borrowed from segmentio/superagent-retry)
 *
 * @param {Error} err an error
 * @param {Response} [res] response
 * @returns {Boolean} if segment should be retried
 */

RequestBase.prototype._shouldRetry = function (err, res) {
  if (!this._maxRetries || this._retries++ >= this._maxRetries) {
    return false;
  }

  if (this._retryCallback) {
    try {
      var override = this._retryCallback(err, res);

      if (override === true) return true;
      if (override === false) return false; // undefined falls back to defaults
    } catch (err_) {
      console.error(err_);
    }
  }

  if (res && res.status && res.status >= 500 && res.status !== 501) return true;

  if (err) {
    if (err.code && ERROR_CODES.includes(err.code)) return true; // Superagent timeout

    if (err.timeout && err.code === 'ECONNABORTED') return true;
    if (err.crossDomain) return true;
  }

  return false;
};
/**
 * Retry request
 *
 * @return {Request} for chaining
 * @api private
 */


RequestBase.prototype._retry = function () {
  this.clearTimeout(); // node

  if (this.req) {
    this.req = null;
    this.req = this.request();
  }

  this._aborted = false;
  this.timedout = false;
  this.timedoutError = null;
  return this._end();
};
/**
 * Promise support
 *
 * @param {Function} resolve
 * @param {Function} [reject]
 * @return {Request}
 */


RequestBase.prototype.then = function (resolve, reject) {
  var _this = this;

  if (!this._fullfilledPromise) {
    var self = this;

    if (this._endCalled) {
      console.warn('Warning: superagent request was sent twice, because both .end() and .then() were called. Never call .end() if you use promises');
    }

    this._fullfilledPromise = new Promise(function (resolve, reject) {
      self.on('abort', function () {
        if (_this._maxRetries && _this._maxRetries > _this._retries) {
          return;
        }

        if (_this.timedout && _this.timedoutError) {
          reject(_this.timedoutError);
          return;
        }

        var err = new Error('Aborted');
        err.code = 'ABORTED';
        err.status = _this.status;
        err.method = _this.method;
        err.url = _this.url;
        reject(err);
      });
      self.end(function (err, res) {
        if (err) reject(err);else resolve(res);
      });
    });
  }

  return this._fullfilledPromise.then(resolve, reject);
};

RequestBase.prototype.catch = function (cb) {
  return this.then(undefined, cb);
};
/**
 * Allow for extension
 */


RequestBase.prototype.use = function (fn) {
  fn(this);
  return this;
};

RequestBase.prototype.ok = function (cb) {
  if (typeof cb !== 'function') throw new Error('Callback required');
  this._okCallback = cb;
  return this;
};

RequestBase.prototype._isResponseOK = function (res) {
  if (!res) {
    return false;
  }

  if (this._okCallback) {
    return this._okCallback(res);
  }

  return res.status >= 200 && res.status < 300;
};
/**
 * Get request header `field`.
 * Case-insensitive.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */


RequestBase.prototype.get = function (field) {
  return this._header[field.toLowerCase()];
};
/**
 * Get case-insensitive header `field` value.
 * This is a deprecated internal API. Use `.get(field)` instead.
 *
 * (getHeader is no longer used internally by the superagent code base)
 *
 * @param {String} field
 * @return {String}
 * @api private
 * @deprecated
 */


RequestBase.prototype.getHeader = RequestBase.prototype.get;
/**
 * Set header `field` to `val`, or multiple fields with one object.
 * Case-insensitive.
 *
 * Examples:
 *
 *      req.get('/')
 *        .set('Accept', 'application/json')
 *        .set('X-API-Key', 'foobar')
 *        .end(callback);
 *
 *      req.get('/')
 *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
 *        .end(callback);
 *
 * @param {String|Object} field
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.set = function (field, val) {
  if (isObject(field)) {
    for (var key in field) {
      if (Object.prototype.hasOwnProperty.call(field, key)) this.set(key, field[key]);
    }

    return this;
  }

  this._header[field.toLowerCase()] = val;
  this.header[field] = val;
  return this;
};
/**
 * Remove header `field`.
 * Case-insensitive.
 *
 * Example:
 *
 *      req.get('/')
 *        .unset('User-Agent')
 *        .end(callback);
 *
 * @param {String} field field name
 */


RequestBase.prototype.unset = function (field) {
  delete this._header[field.toLowerCase()];
  delete this.header[field];
  return this;
};
/**
 * Write the field `name` and `val`, or multiple fields with one object
 * for "multipart/form-data" request bodies.
 *
 * ``` js
 * request.post('/upload')
 *   .field('foo', 'bar')
 *   .end(callback);
 *
 * request.post('/upload')
 *   .field({ foo: 'bar', baz: 'qux' })
 *   .end(callback);
 * ```
 *
 * @param {String|Object} name name of field
 * @param {String|Blob|File|Buffer|fs.ReadStream} val value of field
 * @return {Request} for chaining
 * @api public
 */


RequestBase.prototype.field = function (name, val) {
  // name should be either a string or an object.
  if (name === null || undefined === name) {
    throw new Error('.field(name, val) name can not be empty');
  }

  if (this._data) {
    throw new Error(".field() can't be used if .send() is used. Please use only .send() or only .field() & .attach()");
  }

  if (isObject(name)) {
    for (var key in name) {
      if (Object.prototype.hasOwnProperty.call(name, key)) this.field(key, name[key]);
    }

    return this;
  }

  if (Array.isArray(val)) {
    for (var i in val) {
      if (Object.prototype.hasOwnProperty.call(val, i)) this.field(name, val[i]);
    }

    return this;
  } // val should be defined now


  if (val === null || undefined === val) {
    throw new Error('.field(name, val) val can not be empty');
  }

  if (typeof val === 'boolean') {
    val = String(val);
  }

  this._getFormData().append(name, val);

  return this;
};
/**
 * Abort the request, and clear potential timeout.
 *
 * @return {Request} request
 * @api public
 */


RequestBase.prototype.abort = function () {
  if (this._aborted) {
    return this;
  }

  this._aborted = true;
  if (this.xhr) this.xhr.abort(); // browser

  if (this.req) this.req.abort(); // node

  this.clearTimeout();
  this.emit('abort');
  return this;
};

RequestBase.prototype._auth = function (user, pass, options, base64Encoder) {
  switch (options.type) {
    case 'basic':
      this.set('Authorization', "Basic ".concat(base64Encoder("".concat(user, ":").concat(pass))));
      break;

    case 'auto':
      this.username = user;
      this.password = pass;
      break;

    case 'bearer':
      // usage would be .auth(accessToken, { type: 'bearer' })
      this.set('Authorization', "Bearer ".concat(user));
      break;

    default:
      break;
  }

  return this;
};
/**
 * Enable transmission of cookies with x-domain requests.
 *
 * Note that for this to work the origin must not be
 * using "Access-Control-Allow-Origin" with a wildcard,
 * and also must set "Access-Control-Allow-Credentials"
 * to "true".
 *
 * @api public
 */


RequestBase.prototype.withCredentials = function (on) {
  // This is browser-only functionality. Node side is no-op.
  if (on === undefined) on = true;
  this._withCredentials = on;
  return this;
};
/**
 * Set the max redirects to `n`. Does nothing in browser XHR implementation.
 *
 * @param {Number} n
 * @return {Request} for chaining
 * @api public
 */


RequestBase.prototype.redirects = function (n) {
  this._maxRedirects = n;
  return this;
};
/**
 * Maximum size of buffered response body, in bytes. Counts uncompressed size.
 * Default 200MB.
 *
 * @param {Number} n number of bytes
 * @return {Request} for chaining
 */


RequestBase.prototype.maxResponseSize = function (n) {
  if (typeof n !== 'number') {
    throw new TypeError('Invalid argument');
  }

  this._maxResponseSize = n;
  return this;
};
/**
 * Convert to a plain javascript object (not JSON string) of scalar properties.
 * Note as this method is designed to return a useful non-this value,
 * it cannot be chained.
 *
 * @return {Object} describing method, url, and data of this request
 * @api public
 */


RequestBase.prototype.toJSON = function () {
  return {
    method: this.method,
    url: this.url,
    data: this._data,
    headers: this._header
  };
};
/**
 * Send `data` as the request body, defaulting the `.type()` to "json" when
 * an object is given.
 *
 * Examples:
 *
 *       // manual json
 *       request.post('/user')
 *         .type('json')
 *         .send('{"name":"tj"}')
 *         .end(callback)
 *
 *       // auto json
 *       request.post('/user')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // manual x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send('name=tj')
 *         .end(callback)
 *
 *       // auto x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // defaults to x-www-form-urlencoded
 *      request.post('/user')
 *        .send('name=tobi')
 *        .send('species=ferret')
 *        .end(callback)
 *
 * @param {String|Object} data
 * @return {Request} for chaining
 * @api public
 */
// eslint-disable-next-line complexity


RequestBase.prototype.send = function (data) {
  var isObj = isObject(data);
  var type = this._header['content-type'];

  if (this._formData) {
    throw new Error(".send() can't be used if .attach() or .field() is used. Please use only .send() or only .field() & .attach()");
  }

  if (isObj && !this._data) {
    if (Array.isArray(data)) {
      this._data = [];
    } else if (!this._isHost(data)) {
      this._data = {};
    }
  } else if (data && this._data && this._isHost(this._data)) {
    throw new Error("Can't merge these send calls");
  } // merge


  if (isObj && isObject(this._data)) {
    for (var key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) this._data[key] = data[key];
    }
  } else if (typeof data === 'string') {
    // default to x-www-form-urlencoded
    if (!type) this.type('form');
    type = this._header['content-type'];

    if (type === 'application/x-www-form-urlencoded') {
      this._data = this._data ? "".concat(this._data, "&").concat(data) : data;
    } else {
      this._data = (this._data || '') + data;
    }
  } else {
    this._data = data;
  }

  if (!isObj || this._isHost(data)) {
    return this;
  } // default to json


  if (!type) this.type('json');
  return this;
};
/**
 * Sort `querystring` by the sort function
 *
 *
 * Examples:
 *
 *       // default order
 *       request.get('/user')
 *         .query('name=Nick')
 *         .query('search=Manny')
 *         .sortQuery()
 *         .end(callback)
 *
 *       // customized sort function
 *       request.get('/user')
 *         .query('name=Nick')
 *         .query('search=Manny')
 *         .sortQuery(function(a, b){
 *           return a.length - b.length;
 *         })
 *         .end(callback)
 *
 *
 * @param {Function} sort
 * @return {Request} for chaining
 * @api public
 */


RequestBase.prototype.sortQuery = function (sort) {
  // _sort default to true but otherwise can be a function or boolean
  this._sort = typeof sort === 'undefined' ? true : sort;
  return this;
};
/**
 * Compose querystring to append to req.url
 *
 * @api private
 */


RequestBase.prototype._finalizeQueryString = function () {
  var query = this._query.join('&');

  if (query) {
    this.url += (this.url.includes('?') ? '&' : '?') + query;
  }

  this._query.length = 0; // Makes the call idempotent

  if (this._sort) {
    var index = this.url.indexOf('?');

    if (index >= 0) {
      var queryArr = this.url.slice(index + 1).split('&');

      if (typeof this._sort === 'function') {
        queryArr.sort(this._sort);
      } else {
        queryArr.sort();
      }

      this.url = this.url.slice(0, index) + '?' + queryArr.join('&');
    }
  }
}; // For backwards compat only


RequestBase.prototype._appendQueryString = function () {
  console.warn('Unsupported');
};
/**
 * Invoke callback with timeout error.
 *
 * @api private
 */


RequestBase.prototype._timeoutError = function (reason, timeout, errno) {
  if (this._aborted) {
    return;
  }

  var err = new Error("".concat(reason + timeout, "ms exceeded"));
  err.timeout = timeout;
  err.code = 'ECONNABORTED';
  err.errno = errno;
  this.timedout = true;
  this.timedoutError = err;
  this.abort();
  this.callback(err);
};

RequestBase.prototype._setTimeouts = function () {
  var self = this; // deadline

  if (this._timeout && !this._timer) {
    this._timer = setTimeout(function () {
      self._timeoutError('Timeout of ', self._timeout, 'ETIME');
    }, this._timeout);
  } // response timeout


  if (this._responseTimeout && !this._responseTimeoutTimer) {
    this._responseTimeoutTimer = setTimeout(function () {
      self._timeoutError('Response timeout of ', self._responseTimeout, 'ETIMEDOUT');
    }, this._responseTimeout);
  }
};

},{"./is-object":103}],105:[function(require,module,exports){
"use strict";

/**
 * Module dependencies.
 */
var utils = require('./utils');
/**
 * Expose `ResponseBase`.
 */


module.exports = ResponseBase;
/**
 * Initialize a new `ResponseBase`.
 *
 * @api public
 */

function ResponseBase(obj) {
  if (obj) return mixin(obj);
}
/**
 * Mixin the prototype properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */


function mixin(obj) {
  for (var key in ResponseBase.prototype) {
    if (Object.prototype.hasOwnProperty.call(ResponseBase.prototype, key)) obj[key] = ResponseBase.prototype[key];
  }

  return obj;
}
/**
 * Get case-insensitive `field` value.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */


ResponseBase.prototype.get = function (field) {
  return this.header[field.toLowerCase()];
};
/**
 * Set header related properties:
 *
 *   - `.type` the content type without params
 *
 * A response of "Content-Type: text/plain; charset=utf-8"
 * will provide you with a `.type` of "text/plain".
 *
 * @param {Object} header
 * @api private
 */


ResponseBase.prototype._setHeaderProperties = function (header) {
  // TODO: moar!
  // TODO: make this a util
  // content-type
  var ct = header['content-type'] || '';
  this.type = utils.type(ct); // params

  var params = utils.params(ct);

  for (var key in params) {
    if (Object.prototype.hasOwnProperty.call(params, key)) this[key] = params[key];
  }

  this.links = {}; // links

  try {
    if (header.link) {
      this.links = utils.parseLinks(header.link);
    }
  } catch (_unused) {// ignore
  }
};
/**
 * Set flags such as `.ok` based on `status`.
 *
 * For example a 2xx response will give you a `.ok` of __true__
 * whereas 5xx will be __false__ and `.error` will be __true__. The
 * `.clientError` and `.serverError` are also available to be more
 * specific, and `.statusType` is the class of error ranging from 1..5
 * sometimes useful for mapping respond colors etc.
 *
 * "sugar" properties are also defined for common cases. Currently providing:
 *
 *   - .noContent
 *   - .badRequest
 *   - .unauthorized
 *   - .notAcceptable
 *   - .notFound
 *
 * @param {Number} status
 * @api private
 */


ResponseBase.prototype._setStatusProperties = function (status) {
  var type = status / 100 | 0; // status / class

  this.statusCode = status;
  this.status = this.statusCode;
  this.statusType = type; // basics

  this.info = type === 1;
  this.ok = type === 2;
  this.redirect = type === 3;
  this.clientError = type === 4;
  this.serverError = type === 5;
  this.error = type === 4 || type === 5 ? this.toError() : false; // sugar

  this.created = status === 201;
  this.accepted = status === 202;
  this.noContent = status === 204;
  this.badRequest = status === 400;
  this.unauthorized = status === 401;
  this.notAcceptable = status === 406;
  this.forbidden = status === 403;
  this.notFound = status === 404;
  this.unprocessableEntity = status === 422;
};

},{"./utils":106}],106:[function(require,module,exports){
"use strict";

/**
 * Return the mime type for the given `str`.
 *
 * @param {String} str
 * @return {String}
 * @api private
 */
exports.type = function (str) {
  return str.split(/ *; */).shift();
};
/**
 * Return header field parameters.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */


exports.params = function (str) {
  return str.split(/ *; */).reduce(function (obj, str) {
    var parts = str.split(/ *= */);
    var key = parts.shift();
    var val = parts.shift();
    if (key && val) obj[key] = val;
    return obj;
  }, {});
};
/**
 * Parse Link header fields.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */


exports.parseLinks = function (str) {
  return str.split(/ *, */).reduce(function (obj, str) {
    var parts = str.split(/ *; */);
    var url = parts[0].slice(1, -1);
    var rel = parts[1].split(/ *= */)[1].slice(1, -1);
    obj[rel] = url;
    return obj;
  }, {});
};
/**
 * Strip content related fields from `header`.
 *
 * @param {Object} header
 * @return {Object} header
 * @api private
 */


exports.cleanHeader = function (header, changesOrigin) {
  delete header['content-type'];
  delete header['content-length'];
  delete header['transfer-encoding'];
  delete header.host; // secuirty

  if (changesOrigin) {
    delete header.authorization;
    delete header.cookie;
  }

  return header;
};

},{}],107:[function(require,module,exports){

	function isFormAvailable(){
		var email = document.getElementById("contact-email").value;
		var name = document.getElementById("contact-name").value;
		return (email != null && email != "" && name != null && name != "");
	}
	
	function api_send (name, email) {
		/* Initialization */
		const ElasticEmail = require('@elasticemail/elasticemail-client');

		const client = ElasticEmail.ApiClient.instance;

		/* Generate and use your API key */
		const apikey = client.authentications['apikey'];
		apikey.apiKey = "8101B53C4E22323142EDB26DC6F020ECFD2D396D516ACB7BAABBAD7D30434CF3D975A10634A5D0A4E6006CB4D0197483";

		/**
		 * Send transactional emails
		 * Example api call that sends transactional email.
		 * Limit of 50 maximum recipients.
		 */

		const emailsApi = new ElasticEmail.EmailsApi();
		const emailData = {
			Recipients: {
				To: ["gosias13@gmail.com"]
			},
			Content: {
				Body: [
					{
						ContentType: "HTML",
						Charset: "utf-8",
						Content: "<strong>Mail content.<strong>"
					},
					{
						ContentType: "PlainText",
						Charset: "utf-8",
						Content: "Mail content."
					}
				],
				From: "info@choosefrequency.com",
				Subject: "Example transactional email"
			}
		};

		const callback = (error, data, response) => {
			if (error) {
				console.error(error);
			} else {
				console.log('API called successfully.');
				console.log('Email sent.');
			}
		};
		emailsApi.emailsTransactionalPost(emailData, callback);

		
	}
	
	
    function send_email(name, email) {
		
			var msgBody = '<html><h2>Dear ' + name + ',</h2>' +
						'<p>Thank you for sharing the passion for creating synchronicities to change your faith and the World.</p>' +
						'<p><strong>Please find the link to the book below: </p>' +
						'<p><a href="https://bit.ly/3RSVe8x">e-Book: "Create your synchronicities"</a></strong></p>' +
						'</br>' +
						'<p>In 2023, I am launching my new online course about creating synchronicities with 10h of theory, exercises and examples.</p>' +
						'<p>I will send you an email when it becomes available.</p>' +
						'<p><img src="https://www.choosefrequency.com/images/CF_LogoCircle.png"  alt="Choose Frequency" width="50" height="50"></img></p>'+
						'<em> Best Wishes,</em></p><p><em> Malgorzata Witkowska - Choose Frequency</em></p><p><strong> www.choosefrequency.com</strong></p></html>';
						

			Email.send({
				Host : "smtp.elasticemail.com",
				Username : "choosefrequency@gmail.com",
				Password : "869976CC3F8BF7E2F23FBEF9CAB889D8C996",
				To : email,
				From : "info@choosefrequency.com",
				Subject : "Create your synchronicities",
				Body : msgBody,						
				Attachments : [
					{
						name : "CF_LogoCircle.jpg",
						path : "https://www.choosefrequency.com/images/books/book01_Christmas.jpg"
					}]
			});
	}
	// Use Ajax to submit form data			
	const form = document.forms['book-reg-form']
	form.addEventListener('submit', e => {
		
		if (!isFormAvailable) {
			alert("Please provide anme and email address. Thank you." );
			return;
		}
		
		document.getElementById("book-reg-form").style.display="none";
		document.getElementById("submit").disabled = true;
		document.getElementById("sending-spinner").style.display="block";
		
		var name = document.getElementById("contact-name").value;
		var email = document.getElementById("contact-email").value;
		
		e.preventDefault();
		api_send(name, email);
		
/*		var url = 'https://script.google.com/macros/s/AKfycbxvuSQCFDR-i6aZqJIU2ikmA5i_XLwwOlHGlY9in9IdZdr1xbGRVij5bkW0BM5NGkGwDg/exec';		
		e.preventDefault()
		fetch(url, { method: 'POST', body: new FormData(form)})
		.then(response => {
			document.getElementById("sending-spinner").style.display="none";
			document.getElementById("success-box").style.display="block";
			send_email(name, email);
		})
		//.then(() => { window.location.reload(); })
		.catch(error => console.error('Error!', error.message))
	*/	
	})




  

},{"@elasticemail/elasticemail-client":16}],108:[function(require,module,exports){
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}

},{}],109:[function(require,module,exports){

},{}],110:[function(require,module,exports){
(function (Buffer){(function (){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

var K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function () { return 42 } }
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length)
  buf.__proto__ = Buffer.prototype
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
if (typeof Symbol !== 'undefined' && Symbol.species != null &&
    Buffer[Symbol.species] === Buffer) {
  Object.defineProperty(Buffer, Symbol.species, {
    value: null,
    configurable: true,
    enumerable: false,
    writable: false
  })
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayLike(value)
  }

  if (value == null) {
    throw TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  var valueOf = value.valueOf && value.valueOf()
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  var b = fromObject(value)
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(
      value[Symbol.toPrimitive]('string'), encodingOrOffset, length
    )
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Buffer.prototype.__proto__ = Uint8Array.prototype
Buffer.__proto__ = Uint8Array

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  var length = byteLength(string, encoding) | 0
  var buf = createBuffer(length)

  var actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  var buf = createBuffer(length)
  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  var buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  buf.__proto__ = Buffer.prototype
  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    var buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
}

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (isInstance(buf, Uint8Array)) {
      buf = Buffer.from(buf)
    }
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  var len = string.length
  var mustMatch = (arguments.length > 2 && arguments[2] === true)
  if (!mustMatch && len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
  if (this.length > max) str += ' ... '
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength)
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  var strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
        : (firstByte > 0xBF) ? 2
          : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  newBuf.__proto__ = Buffer.prototype
  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (var i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : Buffer.from(val, encoding)
    var len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}

}).call(this)}).call(this,require("buffer").Buffer)
},{"base64-js":108,"buffer":110,"ieee754":111}],111:[function(require,module,exports){
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],112:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

},{}],113:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};

},{}],114:[function(require,module,exports){
'use strict';

exports.decode = exports.parse = require('./decode');
exports.encode = exports.stringify = require('./encode');

},{"./decode":112,"./encode":113}]},{},[107]);
