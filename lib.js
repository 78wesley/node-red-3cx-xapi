/*jshint -W069 */
/**
 * This OData service is located at /xapi/v1
 * @class Xapi
 * @param {(string|object)} [domainOrOptions] - The project domain or options object. If object, see the object's optional properties.
 * @param {string} [domainOrOptions.domain] - The project domain
 * @param {object} [domainOrOptions.token] - auth token - object with value property and optional headerOrQueryName and isQuery properties
 */
var Xapi = (function(){
    'use strict';

    var request = require('request');
    var Q = require('q');
    var fileType = require('file-type');

    function Xapi(options){
        var domain = (typeof options === 'object') ? options.domain : options;
        this.domain = domain ? domain : '';
        if(this.domain.length === 0) {
            throw new Error('Domain parameter must be specified as a string.');
        }
                this.token = (typeof options === 'object') ? (options.token ? options.token : {}) : {};
    }

    function mergeQueryParams(parameters, queryParameters) {
        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                  .forEach(function(parameterName) {
                      var parameter = parameters.$queryParameters[parameterName];
                      queryParameters[parameterName] = parameter;
            });
        }
        return queryParameters;
    }

    /**
     * HTTP Request
     * @method
     * @name Xapi#request
     * @param {string} method - http method
     * @param {string} url - url to do request
     * @param {object} parameters
     * @param {object} body - body parameters / object
     * @param {object} headers - header parameters
     * @param {object} queryParameters - querystring parameters
     * @param {object} form - form data object
     * @param {object} deferred - promise object
     */
    Xapi.prototype.request = function(method, url, parameters, body, headers, queryParameters, form, deferred){
        var req = {
            method: method,
            uri: url,
            qs: queryParameters,
            headers: headers,
            body: body
        };
        if(Object.keys(form).length > 0) {
            if (req.headers['Content-Type'] && req.headers['Content-Type'][0] === 'multipart/form-data') {
                delete req.body;
                var keyName = Object.keys(form)[0]
                req.formData = {
                    [keyName]: {
                        value: form[keyName],
                        options: {
                            filename: (fileType(form[keyName]) != null ? `file.${ fileType(form[keyName]).ext }` : `file` )
                        }
                    }
                };
            } else {
                req.form = form;
            }
        }
        if(typeof(body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
        }
        request(req, function(error, response, body){
            if(error) {
                deferred.reject(error);
            } else {
                if(/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch(e) {}
                }
                if(response.statusCode === 204) {
                    deferred.resolve({ response: response });
                } else if(response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({ response: response, body: body });
                } else {
                    deferred.reject({ response: response, body: body });
                }
            }
        });
    };

            /**
            * Set Token
            * @method
            * @name Xapi#setToken
            * @param {string} value - token's value
            * @param {string} headerOrQueryName - the header or query name to send the token at
            * @param {boolean} isQuery - true if send the token as query param, otherwise, send as header param
            */
            Xapi.prototype.setToken = function (value, headerOrQueryName, isQuery) {
                this.token.value = value;
                this.token.headerOrQueryName = headerOrQueryName;
                this.token.isQuery = isQuery;
            };
        /**
        * Set Auth headers
        * @method
        * @name Xapi#setAuthHeaders
        * @param {object} headerParams - headers object
        */
        Xapi.prototype.setAuthHeaders = function (headerParams) {
            var headers = headerParams ? headerParams : {};
            if (!this.token.isQuery) {
                if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.value) {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }
            }
            return headers;
        };

/**
 * Get entities from ActiveCalls
 * @method
 * @name Xapi#ListActiveCall
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListActiveCall = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ActiveCalls';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action DropCall
 * @method
 * @name Xapi#DropCall
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of ActiveCall
 */
 Xapi.prototype.DropCall = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ActiveCalls({Id})/Pbx.DropCall';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetFilter
 * @method
 * @name Xapi#GetFilter
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.GetFilter = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ActivityLog/Pbx.GetFilter()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetLogs
 * @method
 * @name Xapi#GetLogs
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.extension - Usage: extension={extension}
     * @param {string} parameters.call - Usage: call={call}
     * @param {string} parameters.search - Usage: search={search}
     * @param {string} parameters.severity - Usage: severity={severity}
     * @param {integer} parameters.top - Usage: top={top}
     * @param {integer} parameters.skip - Usage: skip={skip}
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetLogs = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ActivityLog/Pbx.GetLogs(extension={extension},call={call},search={search},severity={severity},top={top},skip={skip})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{extension}', parameters['extension']);
        
        


        if(parameters['extension'] === undefined){
            deferred.reject(new Error('Missing required  parameter: extension'));
            return deferred.promise;
        }
 
        
            path = path.replace('{call}', parameters['call']);
        
        


        if(parameters['call'] === undefined){
            deferred.reject(new Error('Missing required  parameter: call'));
            return deferred.promise;
        }
 
        
            path = path.replace('{search}', parameters['search']);
        
        


        if(parameters['search'] === undefined){
            deferred.reject(new Error('Missing required  parameter: search'));
            return deferred.promise;
        }
 
        
            path = path.replace('{severity}', parameters['severity']);
        
        


        if(parameters['severity'] === undefined){
            deferred.reject(new Error('Missing required  parameter: severity'));
            return deferred.promise;
        }
 
        
            path = path.replace('{top}', parameters['top']);
        
        


        if(parameters['top'] === undefined){
            deferred.reject(new Error('Missing required  parameter: top'));
            return deferred.promise;
        }
 
        
            path = path.replace('{skip}', parameters['skip']);
        
        


        if(parameters['skip'] === undefined){
            deferred.reject(new Error('Missing required  parameter: skip'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action PurgeLogs
 * @method
 * @name Xapi#PurgeLogs
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.PurgeLogs = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ActivityLog/Pbx.PurgeLogs';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get AntiHackingSettings
 * @method
 * @name Xapi#GetAntiHackingSettings
 * @param {object} parameters - method options and parameters
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetAntiHackingSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/AntiHackingSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update AntiHackingSettings
 * @method
 * @name Xapi#UpdateAntiHackingSettings
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - New property values
 */
 Xapi.prototype.UpdateAntiHackingSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/AntiHackingSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entities from Backups
 * @method
 * @name Xapi#ListBackups
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListBackups = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Backups';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetBackupExtras
 * @method
 * @name Xapi#GetBackupExtras
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.fileName - The unique identifier of Backups
 */
 Xapi.prototype.GetBackupExtras = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Backups({FileName})/Pbx.GetBackupExtras()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{FileName}', parameters['fileName']);
        
        


        if(parameters['fileName'] === undefined){
            deferred.reject(new Error('Missing required  parameter: fileName'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Delete entity from Backups
 * @method
 * @name Xapi#DeleteBackups
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.fileName - The unique identifier of Backups
     * @param {string} parameters.ifMatch - ETag
 */
 Xapi.prototype.DeleteBackups = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Backups({FileName})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{FileName}', parameters['fileName']);
        
        


        if(parameters['fileName'] === undefined){
            deferred.reject(new Error('Missing required  parameter: fileName'));
            return deferred.promise;
        }
 
        
        
                if(parameters['ifMatch'] !== undefined){
                    headers['If-Match'] = parameters['ifMatch'];
                }
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action Restore
 * @method
 * @name Xapi#Restore
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.fileName - The unique identifier of Backups
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.Restore = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Backups({FileName})/Pbx.Restore';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{FileName}', parameters['fileName']);
        
        


        if(parameters['fileName'] === undefined){
            deferred.reject(new Error('Missing required  parameter: fileName'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action Backup
 * @method
 * @name Xapi#Backup
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.Backup = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Backups/Pbx.Backup';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetCanCreateBackup
 * @method
 * @name Xapi#GetCanCreateBackup
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.GetCanCreateBackup = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Backups/Pbx.GetCanCreateBackup()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetBackupSettings
 * @method
 * @name Xapi#GetBackupSettings
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.GetBackupSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Backups/Pbx.GetBackupSettings()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetBackupFailoverSettings
 * @method
 * @name Xapi#GetBackupFailoverSettings
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.GetBackupFailoverSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Backups/Pbx.GetBackupFailoverSettings()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action SetBackupFailoverSettings
 * @method
 * @name Xapi#SetBackupFailoverSettings
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.SetBackupFailoverSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Backups/Pbx.SetBackupFailoverSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetFailoverScripts
 * @method
 * @name Xapi#GetFailoverScripts
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
 */
 Xapi.prototype.GetFailoverScripts = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Backups/Pbx.GetFailoverScripts()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action SetBackupSettings
 * @method
 * @name Xapi#SetBackupSettings
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.SetBackupSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Backups/Pbx.SetBackupSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetBackupRepositorySettings
 * @method
 * @name Xapi#GetBackupRepositorySettings
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.GetBackupRepositorySettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Backups/Pbx.GetBackupRepositorySettings()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action SetBackupRepositorySettings
 * @method
 * @name Xapi#SetBackupRepositorySettings
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.SetBackupRepositorySettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Backups/Pbx.SetBackupRepositorySettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetRestoreSettings
 * @method
 * @name Xapi#GetRestoreSettings
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.GetRestoreSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Backups/Pbx.GetRestoreSettings()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action SetRestoreSettings
 * @method
 * @name Xapi#SetRestoreSettings
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.SetRestoreSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Backups/Pbx.SetRestoreSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entities from BlackListNumbers
 * @method
 * @name Xapi#ListBlackListNumber
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListBlackListNumber = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/BlackListNumbers';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Add new entity to BlackListNumbers
 * @method
 * @name Xapi#CreateBlackListNumber
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - New entity
 */
 Xapi.prototype.CreateBlackListNumber = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/BlackListNumbers';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entity from BlackListNumbers by key
 * @method
 * @name Xapi#GetBlackListNumber
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - The unique identifier of BlackListNumber
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetBlackListNumber = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/BlackListNumbers({Id})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update entity in BlackListNumbers
 * @method
 * @name Xapi#UpdateBlackListNumber
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - The unique identifier of BlackListNumber
     * @param {} parameters.body - New property values
 */
 Xapi.prototype.UpdateBlackListNumber = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/BlackListNumbers({Id})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Delete entity from BlackListNumbers
 * @method
 * @name Xapi#DeleteBlackListNumber
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - The unique identifier of BlackListNumber
     * @param {string} parameters.ifMatch - ETag
 */
 Xapi.prototype.DeleteBlackListNumber = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/BlackListNumbers({Id})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
        
        
                if(parameters['ifMatch'] !== undefined){
                    headers['If-Match'] = parameters['ifMatch'];
                }
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action BulkNumbersDelete
 * @method
 * @name Xapi#BulkNumbersDelete
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.BulkNumbersDelete = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/BlackListNumbers/Pbx.BulkNumbersDelete';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entities from Blocklist
 * @method
 * @name Xapi#ListBlocklistAddr
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListBlocklistAddr = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Blocklist';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Add new entity to Blocklist
 * @method
 * @name Xapi#CreateBlocklistAddr
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - New entity
 */
 Xapi.prototype.CreateBlocklistAddr = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Blocklist';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entity from Blocklist by key
 * @method
 * @name Xapi#GetBlocklistAddr
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of BlocklistAddr
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetBlocklistAddr = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Blocklist({Id})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update entity in Blocklist
 * @method
 * @name Xapi#UpdateBlocklistAddr
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of BlocklistAddr
     * @param {} parameters.body - New property values
 */
 Xapi.prototype.UpdateBlocklistAddr = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Blocklist({Id})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Delete entity from Blocklist
 * @method
 * @name Xapi#DeleteBlocklistAddr
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of BlocklistAddr
     * @param {string} parameters.ifMatch - ETag
 */
 Xapi.prototype.DeleteBlocklistAddr = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Blocklist({Id})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
        
        
                if(parameters['ifMatch'] !== undefined){
                    headers['If-Match'] = parameters['ifMatch'];
                }
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action BulkIpsDelete
 * @method
 * @name Xapi#BulkIpsDelete
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.BulkIpsDelete = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Blocklist/Pbx.BulkIpsDelete';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entities from CallCostSettings
 * @method
 * @name Xapi#ListCallCostSettings
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListCallCostSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/CallCostSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action UpdateCost
 * @method
 * @name Xapi#UpdateCost
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.UpdateCost = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/CallCostSettings/Pbx.UpdateCost';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function ExportCallCosts
 * @method
 * @name Xapi#ExportCallCosts
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.ExportCallCosts = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/CallCostSettings/Pbx.ExportCallCosts()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entity from CallFlowApps by key
 * @method
 * @name Xapi#GetCallFlowApp
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of CallFlowApp
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetCallFlowApp = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/CallFlowApps({Id})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update entity in CallFlowApps
 * @method
 * @name Xapi#UpdateCallFlowApp
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of CallFlowApp
     * @param {} parameters.body - New property values
 */
 Xapi.prototype.UpdateCallFlowApp = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/CallFlowApps({Id})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Delete entity from CallFlowApps
 * @method
 * @name Xapi#DeleteCallFlowApp
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of CallFlowApp
     * @param {string} parameters.ifMatch - ETag
 */
 Xapi.prototype.DeleteCallFlowApp = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/CallFlowApps({Id})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
        
        
                if(parameters['ifMatch'] !== undefined){
                    headers['If-Match'] = parameters['ifMatch'];
                }
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entities from CallFlowApps
 * @method
 * @name Xapi#ListCallFlowApp
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListCallFlowApp = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/CallFlowApps';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Add new entity to CallFlowApps
 * @method
 * @name Xapi#CreateCallFlowApp
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - New entity
 */
 Xapi.prototype.CreateCallFlowApp = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/CallFlowApps';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetAudioFiles
 * @method
 * @name Xapi#GetAudioFiles
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of CallFlowApp
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
 */
 Xapi.prototype.GetAudioFiles = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/CallFlowApps({Id})/Pbx.GetAudioFiles()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action DeleteAudioFile
 * @method
 * @name Xapi#DeleteAudioFile
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of CallFlowApp
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.DeleteAudioFile = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/CallFlowApps({Id})/Pbx.DeleteAudioFile';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function DownloadCallHistory
 * @method
 * @name Xapi#DownloadCallHistory
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.DownloadCallHistory = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/CallHistoryView/Pbx.DownloadCallHistory()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entities from CallHistoryView
 * @method
 * @name Xapi#ListCallHistoryView
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListCallHistoryView = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/CallHistoryView';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get CallParkingSettings
 * @method
 * @name Xapi#GetCallParkingSettings
 * @param {object} parameters - method options and parameters
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetCallParkingSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/CallParkingSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update CallParkingSettings
 * @method
 * @name Xapi#UpdateCallParkingSettings
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - New property values
 */
 Xapi.prototype.UpdateCallParkingSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/CallParkingSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get CallTypesSettings
 * @method
 * @name Xapi#GetCallTypesSettings
 * @param {object} parameters - method options and parameters
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetCallTypesSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/CallTypesSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update CallTypesSettings
 * @method
 * @name Xapi#UpdateCallTypesSettings
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - New property values
 */
 Xapi.prototype.UpdateCallTypesSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/CallTypesSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get CDRSettings
 * @method
 * @name Xapi#GetCDRSettings
 * @param {object} parameters - method options and parameters
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetCDRSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/CDRSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update CDRSettings
 * @method
 * @name Xapi#UpdateCDRSettings
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - New property values
 */
 Xapi.prototype.UpdateCDRSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/CDRSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function DownloadChatHistory
 * @method
 * @name Xapi#DownloadChatHistory
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.clientTimeZone - Usage: clientTimeZone={clientTimeZone}
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.DownloadChatHistory = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ChatHistoryView/Pbx.DownloadChatHistory(clientTimeZone={clientTimeZone})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{clientTimeZone}', parameters['clientTimeZone']);
        
        


        if(parameters['clientTimeZone'] === undefined){
            deferred.reject(new Error('Missing required  parameter: clientTimeZone'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entities from ChatHistoryView
 * @method
 * @name Xapi#ListChatHistoryView
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListChatHistoryView = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ChatHistoryView';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get ChatLogSettings
 * @method
 * @name Xapi#GetChatLogSettings
 * @param {object} parameters - method options and parameters
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetChatLogSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ChatLogSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update ChatLogSettings
 * @method
 * @name Xapi#UpdateChatLogSettings
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - New property values
 */
 Xapi.prototype.UpdateChatLogSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ChatLogSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function DownloadChatMessagesHistory
 * @method
 * @name Xapi#DownloadChatMessagesHistory
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.clientTimeZone - Usage: clientTimeZone={clientTimeZone}
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.DownloadChatMessagesHistory = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ChatMessagesHistoryView/Pbx.DownloadChatMessagesHistory(clientTimeZone={clientTimeZone})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{clientTimeZone}', parameters['clientTimeZone']);
        
        


        if(parameters['clientTimeZone'] === undefined){
            deferred.reject(new Error('Missing required  parameter: clientTimeZone'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entities from ChatMessagesHistoryView
 * @method
 * @name Xapi#ListChatMessagesHistoryView
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListChatMessagesHistoryView = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ChatMessagesHistoryView';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get CodecsSettings
 * @method
 * @name Xapi#GetCodecsSettings
 * @param {object} parameters - method options and parameters
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetCodecsSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/CodecsSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update CodecsSettings
 * @method
 * @name Xapi#UpdateCodecsSettings
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - New property values
 */
 Xapi.prototype.UpdateCodecsSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/CodecsSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetWebMeetingZones
 * @method
 * @name Xapi#GetWebMeetingZones
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
 */
 Xapi.prototype.GetWebMeetingZones = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ConferenceSettings/Pbx.GetWebMeetingZones()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GenerateApiKey
 * @method
 * @name Xapi#GenerateApiKey
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.GenerateApiKey = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ConferenceSettings/Pbx.GenerateApiKey()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get ConferenceSettings
 * @method
 * @name Xapi#GetConferenceSettings
 * @param {object} parameters - method options and parameters
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetConferenceSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ConferenceSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update ConferenceSettings
 * @method
 * @name Xapi#UpdateConferenceSettings
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - New property values
 */
 Xapi.prototype.UpdateConferenceSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ConferenceSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetMCURequestStatus
 * @method
 * @name Xapi#GetMCURequestStatus
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.GetMCURequestStatus = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ConferenceSettings/Pbx.GetMCURequestStatus()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetOnboardMcuData
 * @method
 * @name Xapi#GetOnboardMcuData
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
 */
 Xapi.prototype.GetOnboardMcuData = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ConferenceSettings/Pbx.GetOnboardMcuData()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetOnboardMeetings
 * @method
 * @name Xapi#GetOnboardMeetings
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
 */
 Xapi.prototype.GetOnboardMeetings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ConferenceSettings/Pbx.GetOnboardMeetings()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetMCURows
 * @method
 * @name Xapi#GetMCURows
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
 */
 Xapi.prototype.GetMCURows = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ConferenceSettings/Pbx.GetMCURows()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetMCURow
 * @method
 * @name Xapi#GetMCURow
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.guid - Usage: guid={guid}
 */
 Xapi.prototype.GetMCURow = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ConferenceSettings/Pbx.GetMCURow(guid={guid})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{guid}', parameters['guid']);
        
        


        if(parameters['guid'] === undefined){
            deferred.reject(new Error('Missing required  parameter: guid'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action UpdateMCURequestStatus
 * @method
 * @name Xapi#UpdateMCURequestStatus
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.UpdateMCURequestStatus = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ConferenceSettings/Pbx.UpdateMCURequestStatus';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get ConsoleRestrictions
 * @method
 * @name Xapi#GetConsoleRestrictions
 * @param {object} parameters - method options and parameters
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetConsoleRestrictions = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ConsoleRestrictions';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update ConsoleRestrictions
 * @method
 * @name Xapi#UpdateConsoleRestrictions
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - New property values
 */
 Xapi.prototype.UpdateConsoleRestrictions = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ConsoleRestrictions';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entities from Contacts
 * @method
 * @name Xapi#ListContact
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListContact = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Contacts';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Add new entity to Contacts
 * @method
 * @name Xapi#CreateContact
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - New entity
 */
 Xapi.prototype.CreateContact = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Contacts';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action SetDirSearchSettings
 * @method
 * @name Xapi#SetDirSearchSettings
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.SetDirSearchSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Contacts/Pbx.SetDirSearchSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetDirSearchSettings
 * @method
 * @name Xapi#GetDirSearchSettings
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.GetDirSearchSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Contacts/Pbx.GetDirSearchSettings()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action BatchContactsDelete
 * @method
 * @name Xapi#BatchContactsDelete
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.BatchContactsDelete = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Contacts/Pbx.BatchContactsDelete';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action Office365ContactsBulkDelete
 * @method
 * @name Xapi#Office365ContactsBulkDelete
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.Office365ContactsBulkDelete = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Contacts/Pbx.Office365ContactsBulkDelete';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action CRMContactsBulkDelete
 * @method
 * @name Xapi#CRMContactsBulkDelete
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.CRMContactsBulkDelete = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Contacts/Pbx.CRMContactsBulkDelete';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action AllContactsBulkDelete
 * @method
 * @name Xapi#AllContactsBulkDelete
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.AllContactsBulkDelete = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Contacts/Pbx.AllContactsBulkDelete';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function ExportContacts
 * @method
 * @name Xapi#ExportContacts
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.ExportContacts = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Contacts/Pbx.ExportContacts()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entity from Contacts by key
 * @method
 * @name Xapi#GetContact
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of Contact
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetContact = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Contacts({Id})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update entity in Contacts
 * @method
 * @name Xapi#UpdateContact
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of Contact
     * @param {} parameters.body - New property values
 */
 Xapi.prototype.UpdateContact = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Contacts({Id})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Delete entity from Contacts
 * @method
 * @name Xapi#DeleteContact
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of Contact
     * @param {string} parameters.ifMatch - ETag
 */
 Xapi.prototype.DeleteContact = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Contacts({Id})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
        
        
                if(parameters['ifMatch'] !== undefined){
                    headers['If-Match'] = parameters['ifMatch'];
                }
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entities from Countries
 * @method
 * @name Xapi#ListCountry
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListCountry = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Countries';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get CountryCodes
 * @method
 * @name Xapi#GetCountryCodes
 * @param {object} parameters - method options and parameters
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetCountryCodes = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/CountryCodes';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update CountryCodes
 * @method
 * @name Xapi#UpdateCountryCodes
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - New property values
 */
 Xapi.prototype.UpdateCountryCodes = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/CountryCodes';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get CrmIntegration
 * @method
 * @name Xapi#GetCrmIntegration
 * @param {object} parameters - method options and parameters
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetCrmIntegration = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/CrmIntegration';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update CrmIntegration
 * @method
 * @name Xapi#UpdateCrmIntegration
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - New property values
 */
 Xapi.prototype.UpdateCrmIntegration = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/CrmIntegration';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action Test
 * @method
 * @name Xapi#Test
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.Test = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/CrmIntegration/Pbx.Test';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action DeleteCrmContacts
 * @method
 * @name Xapi#DeleteCrmContacts
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.DeleteCrmContacts = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/CrmIntegration/Pbx.DeleteCrmContacts';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action SetOAuthState
 * @method
 * @name Xapi#SetOAuthState
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.SetOAuthState = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/CrmIntegration/Pbx.SetOAuthState';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetOAuth
 * @method
 * @name Xapi#GetOAuth
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.variable - Usage: variable={variable}
 */
 Xapi.prototype.GetOAuth = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/CrmIntegration/Pbx.GetOAuth(variable={variable})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{variable}', parameters['variable']);
        
        


        if(parameters['variable'] === undefined){
            deferred.reject(new Error('Missing required  parameter: variable'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetCrmTemplateSource
 * @method
 * @name Xapi#GetCrmTemplateSource
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.name - Usage: name={name}
 */
 Xapi.prototype.GetCrmTemplateSource = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/CrmIntegration/Pbx.GetCrmTemplateSource(name={name})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{name}', parameters['name']);
        
        


        if(parameters['name'] === undefined){
            deferred.reject(new Error('Missing required  parameter: name'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GeCrmtTemplates
 * @method
 * @name Xapi#GeCrmtTemplates
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GeCrmtTemplates = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/CrmTemplates/Pbx.GeCrmtTemplates()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entity from CrmTemplates by key
 * @method
 * @name Xapi#GetCrmTemplate
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.name - The unique identifier of CrmTemplate
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetCrmTemplate = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/CrmTemplates({Name})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Name}', parameters['name']);
        
        


        if(parameters['name'] === undefined){
            deferred.reject(new Error('Missing required  parameter: name'));
            return deferred.promise;
        }
 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Delete entity from CrmTemplates
 * @method
 * @name Xapi#DeleteCrmTemplate
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.name - The unique identifier of CrmTemplate
     * @param {string} parameters.ifMatch - ETag
 */
 Xapi.prototype.DeleteCrmTemplate = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/CrmTemplates({Name})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Name}', parameters['name']);
        
        


        if(parameters['name'] === undefined){
            deferred.reject(new Error('Missing required  parameter: name'));
            return deferred.promise;
        }
 
        
        
                if(parameters['ifMatch'] !== undefined){
                    headers['If-Match'] = parameters['ifMatch'];
                }
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entities from CustomPrompts
 * @method
 * @name Xapi#ListCustomPrompt
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListCustomPrompt = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/CustomPrompts';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Delete entity from CustomPrompts
 * @method
 * @name Xapi#DeleteCustomPrompt
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.filename - The unique identifier of CustomPrompt
     * @param {string} parameters.ifMatch - ETag
 */
 Xapi.prototype.DeleteCustomPrompt = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/CustomPrompts({Filename})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Filename}', parameters['filename']);
        
        


        if(parameters['filename'] === undefined){
            deferred.reject(new Error('Missing required  parameter: filename'));
            return deferred.promise;
        }
 
        
        
                if(parameters['ifMatch'] !== undefined){
                    headers['If-Match'] = parameters['ifMatch'];
                }
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get Defs
 * @method
 * @name Xapi#GetDefs
 * @param {object} parameters - method options and parameters
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetDefs = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Defs';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get Codecs from Defs
 * @method
 * @name Xapi#ListCodecs
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListCodecs = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Defs/Codecs';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get GatewayParameters from Defs
 * @method
 * @name Xapi#ListGatewayParameters
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListGatewayParameters = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Defs/GatewayParameters';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get GatewayParameterValues from Defs
 * @method
 * @name Xapi#ListGatewayParameterValues
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListGatewayParameterValues = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Defs/GatewayParameterValues';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get TimeZones from Defs
 * @method
 * @name Xapi#ListTimeZones
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListTimeZones = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Defs/TimeZones';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetSystemParameters
 * @method
 * @name Xapi#GetSystemParameters
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.GetSystemParameters = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Defs/Pbx.GetSystemParameters()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function HasSystemOwner
 * @method
 * @name Xapi#HasSystemOwner
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.HasSystemOwner = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Defs/Pbx.HasSystemOwner()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action GetRoutes
 * @method
 * @name Xapi#GetRoutes
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.GetRoutes = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Defs/Pbx.GetRoutes';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entities from DeviceInfos
 * @method
 * @name Xapi#ListDeviceInfo
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListDeviceInfo = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/DeviceInfos';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entity from DeviceInfos by key
 * @method
 * @name Xapi#GetDeviceInfo
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of DeviceInfo
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetDeviceInfo = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/DeviceInfos({Id})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Delete entity from DeviceInfos
 * @method
 * @name Xapi#DeleteDeviceInfo
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of DeviceInfo
     * @param {string} parameters.ifMatch - ETag
 */
 Xapi.prototype.DeleteDeviceInfo = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/DeviceInfos({Id})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
        
        
                if(parameters['ifMatch'] !== undefined){
                    headers['If-Match'] = parameters['ifMatch'];
                }
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action Provision
 * @method
 * @name Xapi#Provision
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of DeviceInfo
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.Provision = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/DeviceInfos({Id})/Pbx.Provision';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get DialCodeSettings
 * @method
 * @name Xapi#GetDialCodeSettings
 * @param {object} parameters - method options and parameters
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetDialCodeSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/DialCodeSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update DialCodeSettings
 * @method
 * @name Xapi#UpdateDialCodeSettings
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - New property values
 */
 Xapi.prototype.UpdateDialCodeSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/DialCodeSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entities from DidNumbers
 * @method
 * @name Xapi#ListDidNumber
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListDidNumber = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/DidNumbers';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetPropertiesByDn
 * @method
 * @name Xapi#GetPropertiesByDn
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.dnNumber - Usage: dnNumber={dnNumber}
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetPropertiesByDn = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/DNProperties/Pbx.GetPropertiesByDn(dnNumber={dnNumber})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{dnNumber}', parameters['dnNumber']);
        
        


        if(parameters['dnNumber'] === undefined){
            deferred.reject(new Error('Missing required  parameter: dnNumber'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action CreateDNProperty
 * @method
 * @name Xapi#CreateDNProperty
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.CreateDNProperty = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/DNProperties/Pbx.CreateDNProperty';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action UpdateDNProperty
 * @method
 * @name Xapi#UpdateDNProperty
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.UpdateDNProperty = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/DNProperties/Pbx.UpdateDNProperty';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action DeleteDNProperty
 * @method
 * @name Xapi#DeleteDNProperty
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.DeleteDNProperty = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/DNProperties/Pbx.DeleteDNProperty';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetDNPropertyByName
 * @method
 * @name Xapi#GetDNPropertyByName
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.dnNumber - Usage: dnNumber={dnNumber}
     * @param {string} parameters.name - Usage: name={name}
 */
 Xapi.prototype.GetDNPropertyByName = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/DNProperties/Pbx.GetDNPropertyByName(dnNumber={dnNumber},name={name})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{dnNumber}', parameters['dnNumber']);
        
        


        if(parameters['dnNumber'] === undefined){
            deferred.reject(new Error('Missing required  parameter: dnNumber'));
            return deferred.promise;
        }
 
        
            path = path.replace('{name}', parameters['name']);
        
        


        if(parameters['name'] === undefined){
            deferred.reject(new Error('Missing required  parameter: name'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get E164Settings
 * @method
 * @name Xapi#GetE164Settings
 * @param {object} parameters - method options and parameters
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetE164Settings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/E164Settings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update E164Settings
 * @method
 * @name Xapi#UpdateE164Settings
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - New property values
 */
 Xapi.prototype.UpdateE164Settings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/E164Settings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entities from EmailTemplate
 * @method
 * @name Xapi#ListEmailTemplate
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListEmailTemplate = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/EmailTemplate';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entity from EmailTemplate by key
 * @method
 * @name Xapi#GetEmailTemplate
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.templatePath - The unique identifier of EmailTemplate
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetEmailTemplate = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/EmailTemplate({TemplatePath})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{TemplatePath}', parameters['templatePath']);
        
        


        if(parameters['templatePath'] === undefined){
            deferred.reject(new Error('Missing required  parameter: templatePath'));
            return deferred.promise;
        }
 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update entity in EmailTemplate
 * @method
 * @name Xapi#UpdateEmailTemplate
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.templatePath - The unique identifier of EmailTemplate
     * @param {} parameters.body - New property values
 */
 Xapi.prototype.UpdateEmailTemplate = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/EmailTemplate({TemplatePath})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{TemplatePath}', parameters['templatePath']);
        
        


        if(parameters['templatePath'] === undefined){
            deferred.reject(new Error('Missing required  parameter: templatePath'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action SetDefault
 * @method
 * @name Xapi#SetDefault
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.templatePath - The unique identifier of EmailTemplate
 */
 Xapi.prototype.SetDefault = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/EmailTemplate({TemplatePath})/Pbx.SetDefault';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{TemplatePath}', parameters['templatePath']);
        
        


        if(parameters['templatePath'] === undefined){
            deferred.reject(new Error('Missing required  parameter: templatePath'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get EmergencyNotificationsSettings
 * @method
 * @name Xapi#GetEmergencyNotificationsSettings
 * @param {object} parameters - method options and parameters
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetEmergencyNotificationsSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/EmergencyNotificationsSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update EmergencyNotificationsSettings
 * @method
 * @name Xapi#UpdateEmergencyNotificationsSettings
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - New property values
 */
 Xapi.prototype.UpdateEmergencyNotificationsSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/EmergencyNotificationsSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entities from EventLogs
 * @method
 * @name Xapi#ListEventLog
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListEventLog = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/EventLogs';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function DownloadEventLogs
 * @method
 * @name Xapi#DownloadEventLogs
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.DownloadEventLogs = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/EventLogs/Pbx.DownloadEventLogs()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action PurgeEventLog
 * @method
 * @name Xapi#PurgeEventLog
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.PurgeEventLog = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/EventLogs/Pbx.PurgeEventLog';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function InitFax
 * @method
 * @name Xapi#InitFax
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.InitFax = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Fax/Pbx.InitFax()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entities from Fax
 * @method
 * @name Xapi#ListFax
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListFax = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Fax';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Add new entity to Fax
 * @method
 * @name Xapi#CreateFax
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - New entity
 */
 Xapi.prototype.CreateFax = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Fax';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entity from Fax by key
 * @method
 * @name Xapi#GetFax
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of Fax
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetFax = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Fax({Id})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update entity in Fax
 * @method
 * @name Xapi#UpdateFax
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of Fax
     * @param {} parameters.body - New property values
 */
 Xapi.prototype.UpdateFax = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Fax({Id})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Delete entity from Fax
 * @method
 * @name Xapi#DeleteFax
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of Fax
     * @param {string} parameters.ifMatch - ETag
 */
 Xapi.prototype.DeleteFax = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Fax({Id})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
        
        
                if(parameters['ifMatch'] !== undefined){
                    headers['If-Match'] = parameters['ifMatch'];
                }
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action BulkFaxDelete
 * @method
 * @name Xapi#BulkFaxDelete
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.BulkFaxDelete = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Fax/Pbx.BulkFaxDelete';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetByNumber
 * @method
 * @name Xapi#GetFaxByNumber
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.number - Usage: number={number}
 */
 Xapi.prototype.GetFaxByNumber = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Fax/Pbx.GetByNumber(number={number})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{number}', parameters['number']);
        
        


        if(parameters['number'] === undefined){
            deferred.reject(new Error('Missing required  parameter: number'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get FaxServerSettings
 * @method
 * @name Xapi#GetFaxServerSettings
 * @param {object} parameters - method options and parameters
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetFaxServerSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/FaxServerSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update FaxServerSettings
 * @method
 * @name Xapi#UpdateFaxServerSettings
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - New property values
 */
 Xapi.prototype.UpdateFaxServerSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/FaxServerSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetFaxFilesSize
 * @method
 * @name Xapi#GetFaxFilesSize
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.GetFaxFilesSize = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/FaxServerSettings/Pbx.GetFaxFilesSize()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action CleanUpFax
 * @method
 * @name Xapi#CleanUpFax
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.CleanUpFax = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/FaxServerSettings/Pbx.CleanUpFax';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get Firewall
 * @method
 * @name Xapi#GetFirewallState
 * @param {object} parameters - method options and parameters
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetFirewallState = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Firewall';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetLastResult
 * @method
 * @name Xapi#GetLastResult
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.GetLastResult = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Firewall/Pbx.GetLastResult()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action StartCheck
 * @method
 * @name Xapi#StartCheck
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.StartCheck = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Firewall/Pbx.StartCheck';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action StopCheck
 * @method
 * @name Xapi#StopCheck
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.StopCheck = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Firewall/Pbx.StopCheck';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get Firmware
 * @method
 * @name Xapi#GetFirmwareState
 * @param {object} parameters - method options and parameters
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetFirmwareState = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Firmware';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action CleanUp
 * @method
 * @name Xapi#CleanUp
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.CleanUp = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Firmware/Pbx.CleanUp';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entities from Fxs
 * @method
 * @name Xapi#ListFxs
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListFxs = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Fxs';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Add new entity to Fxs
 * @method
 * @name Xapi#CreateFxs
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - New entity
 */
 Xapi.prototype.CreateFxs = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Fxs';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entity from Fxs by key
 * @method
 * @name Xapi#GetFxs
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.macAddress - The unique identifier of Fxs
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetFxs = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Fxs({MacAddress})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{MacAddress}', parameters['macAddress']);
        
        


        if(parameters['macAddress'] === undefined){
            deferred.reject(new Error('Missing required  parameter: macAddress'));
            return deferred.promise;
        }
 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update entity in Fxs
 * @method
 * @name Xapi#UpdateFxs
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.macAddress - The unique identifier of Fxs
     * @param {} parameters.body - New property values
 */
 Xapi.prototype.UpdateFxs = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Fxs({MacAddress})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{MacAddress}', parameters['macAddress']);
        
        


        if(parameters['macAddress'] === undefined){
            deferred.reject(new Error('Missing required  parameter: macAddress'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Delete entity from Fxs
 * @method
 * @name Xapi#DeleteFxs
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.macAddress - The unique identifier of Fxs
     * @param {string} parameters.ifMatch - ETag
 */
 Xapi.prototype.DeleteFxs = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Fxs({MacAddress})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{MacAddress}', parameters['macAddress']);
        
        


        if(parameters['macAddress'] === undefined){
            deferred.reject(new Error('Missing required  parameter: macAddress'));
            return deferred.promise;
        }
 
        
        
                if(parameters['ifMatch'] !== undefined){
                    headers['If-Match'] = parameters['ifMatch'];
                }
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entities from FxsTemplates
 * @method
 * @name Xapi#ListFxsTemplate
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListFxsTemplate = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/FxsTemplates';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Add new entity to FxsTemplates
 * @method
 * @name Xapi#CreateFxsTemplate
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - New entity
 */
 Xapi.prototype.CreateFxsTemplate = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/FxsTemplates';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entity from FxsTemplates by key
 * @method
 * @name Xapi#GetFxsTemplate
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - The unique identifier of FxsTemplate
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetFxsTemplate = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/FxsTemplates({Id})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update entity in FxsTemplates
 * @method
 * @name Xapi#UpdateFxsTemplate
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - The unique identifier of FxsTemplate
     * @param {} parameters.body - New property values
 */
 Xapi.prototype.UpdateFxsTemplate = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/FxsTemplates({Id})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Delete entity from FxsTemplates
 * @method
 * @name Xapi#DeleteFxsTemplate
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - The unique identifier of FxsTemplate
     * @param {string} parameters.ifMatch - ETag
 */
 Xapi.prototype.DeleteFxsTemplate = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/FxsTemplates({Id})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
        
        
                if(parameters['ifMatch'] !== undefined){
                    headers['If-Match'] = parameters['ifMatch'];
                }
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get GeneralSettingsForApps
 * @method
 * @name Xapi#GetGeneralSettingsForApps
 * @param {object} parameters - method options and parameters
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetGeneralSettingsForApps = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/GeneralSettingsForApps';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update GeneralSettingsForApps
 * @method
 * @name Xapi#UpdateGeneralSettingsForApps
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - New property values
 */
 Xapi.prototype.UpdateGeneralSettingsForApps = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/GeneralSettingsForApps';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get GeneralSettingsForPbx
 * @method
 * @name Xapi#GetGeneralSettingsForPbx
 * @param {object} parameters - method options and parameters
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetGeneralSettingsForPbx = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/GeneralSettingsForPbx';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update GeneralSettingsForPbx
 * @method
 * @name Xapi#UpdateGeneralSettingsForPbx
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - New property values
 */
 Xapi.prototype.UpdateGeneralSettingsForPbx = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/GeneralSettingsForPbx';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get GoogleSettings
 * @method
 * @name Xapi#GetGoogleSettings
 * @param {object} parameters - method options and parameters
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetGoogleSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/GoogleSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update GoogleSettings
 * @method
 * @name Xapi#UpdateGoogleSettings
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - New property values
 */
 Xapi.prototype.UpdateGoogleSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/GoogleSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entity from Groups by key
 * @method
 * @name Xapi#GetGroup
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of Group
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetGroup = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Groups({Id})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update entity in Groups
 * @method
 * @name Xapi#UpdateGroup
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of Group
     * @param {} parameters.body - New property values
 */
 Xapi.prototype.UpdateGroup = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Groups({Id})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Delete entity from Groups
 * @method
 * @name Xapi#DeleteGroup
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of Group
     * @param {string} parameters.ifMatch - ETag
 */
 Xapi.prototype.DeleteGroup = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Groups({Id})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
        
        
                if(parameters['ifMatch'] !== undefined){
                    headers['If-Match'] = parameters['ifMatch'];
                }
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entities from Groups
 * @method
 * @name Xapi#ListGroup
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListGroup = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Groups';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Add new entity to Groups
 * @method
 * @name Xapi#CreateGroup
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - New entity
 */
 Xapi.prototype.CreateGroup = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Groups';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetRestrictions
 * @method
 * @name Xapi#GetRestrictions
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of Group
 */
 Xapi.prototype.GetRestrictions = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Groups({Id})/Pbx.GetRestrictions()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action DeleteCompanyByNumber
 * @method
 * @name Xapi#DeleteCompanyByNumber
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.DeleteCompanyByNumber = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Groups/Pbx.DeleteCompanyByNumber';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action DeleteCompanyById
 * @method
 * @name Xapi#DeleteCompanyById
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.DeleteCompanyById = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Groups/Pbx.DeleteCompanyById';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get Members from Groups
 * @method
 * @name Xapi#ListMembers
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of Group
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListMembers = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Groups({Id})/Members';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get Rights from Groups
 * @method
 * @name Xapi#ListRights
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of Group
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListRights = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Groups({Id})/Rights';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action ReplaceGroupLicenseKey
 * @method
 * @name Xapi#ReplaceGroupLicenseKey
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.ReplaceGroupLicenseKey = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Groups/Pbx.ReplaceGroupLicenseKey';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action LinkGroupPartner
 * @method
 * @name Xapi#LinkGroupPartner
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.LinkGroupPartner = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Groups/Pbx.LinkGroupPartner';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action UnlinkGroupPartner
 * @method
 * @name Xapi#UnlinkGroupPartner
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.UnlinkGroupPartner = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Groups/Pbx.UnlinkGroupPartner';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get HotelServices
 * @method
 * @name Xapi#GetHotelServices
 * @param {object} parameters - method options and parameters
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetHotelServices = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/HotelServices';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update HotelServices
 * @method
 * @name Xapi#UpdateHotelServices
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - New property values
 */
 Xapi.prototype.UpdateHotelServices = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/HotelServices';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entities from InboundRules
 * @method
 * @name Xapi#ListInboundRule
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListInboundRule = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/InboundRules';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Add new entity to InboundRules
 * @method
 * @name Xapi#CreateInboundRule
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - New entity
 */
 Xapi.prototype.CreateInboundRule = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/InboundRules';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entity from InboundRules by key
 * @method
 * @name Xapi#GetInboundRule
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of InboundRule
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetInboundRule = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/InboundRules({Id})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update entity in InboundRules
 * @method
 * @name Xapi#UpdateInboundRule
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of InboundRule
     * @param {} parameters.body - New property values
 */
 Xapi.prototype.UpdateInboundRule = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/InboundRules({Id})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Delete entity from InboundRules
 * @method
 * @name Xapi#DeleteInboundRule
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of InboundRule
     * @param {string} parameters.ifMatch - ETag
 */
 Xapi.prototype.DeleteInboundRule = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/InboundRules({Id})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
        
        
                if(parameters['ifMatch'] !== undefined){
                    headers['If-Match'] = parameters['ifMatch'];
                }
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action BulkInboundRulesDelete
 * @method
 * @name Xapi#BulkInboundRulesDelete
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.BulkInboundRulesDelete = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/InboundRules/Pbx.BulkInboundRulesDelete';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get LicenseInfo
 * @method
 * @name Xapi#GetLicenseInfo
 * @param {object} parameters - method options and parameters
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetLicenseInfo = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/LicenseInfo';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action ReplaceLicenseKey
 * @method
 * @name Xapi#ReplaceLicenseKey
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.ReplaceLicenseKey = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/LicenseInfo/Pbx.ReplaceLicenseKey';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action EditLicenseInfo
 * @method
 * @name Xapi#EditLicenseInfo
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.EditLicenseInfo = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/LicenseInfo/Pbx.EditLicenseInfo';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action RefreshLicenseStatus
 * @method
 * @name Xapi#RefreshLicenseStatus
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.RefreshLicenseStatus = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/LicenseStatus/Pbx.RefreshLicenseStatus';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get LicenseStatus
 * @method
 * @name Xapi#GetLicenseStatus
 * @param {object} parameters - method options and parameters
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetLicenseStatus = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/LicenseStatus';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action UnlinkPartner
 * @method
 * @name Xapi#UnlinkPartner
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.UnlinkPartner = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/LicenseStatus/Pbx.UnlinkPartner';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action LinkPartner
 * @method
 * @name Xapi#LinkPartner
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.LinkPartner = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/LicenseStatus/Pbx.LinkPartner';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function PartnerInfo
 * @method
 * @name Xapi#PartnerInfo
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.resellerId - Usage: resellerId={resellerId}
 */
 Xapi.prototype.PartnerInfo = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/LicenseStatus/Pbx.PartnerInfo(resellerId={resellerId})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{resellerId}', parameters['resellerId']);
        
        


        if(parameters['resellerId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: resellerId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get LoggingSettings
 * @method
 * @name Xapi#GetLoggingSettings
 * @param {object} parameters - method options and parameters
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetLoggingSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/LoggingSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update LoggingSettings
 * @method
 * @name Xapi#UpdateLoggingSettings
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - New property values
 */
 Xapi.prototype.UpdateLoggingSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/LoggingSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function TestSubscription
 * @method
 * @name Xapi#TestSubscription
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.TestSubscription = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Microsoft365Integration/Pbx.TestSubscription()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get Microsoft365Integration
 * @method
 * @name Xapi#GetMicrosoft365Integration
 * @param {object} parameters - method options and parameters
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetMicrosoft365Integration = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Microsoft365Integration';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update Microsoft365Integration
 * @method
 * @name Xapi#UpdateMicrosoft365Integration
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - New property values
 */
 Xapi.prototype.UpdateMicrosoft365Integration = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Microsoft365Integration';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action AuthorizePresence
 * @method
 * @name Xapi#AuthorizePresence
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.AuthorizePresence = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Microsoft365Integration/Pbx.AuthorizePresence';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action TestPresence
 * @method
 * @name Xapi#TestPresence
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.TestPresence = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Microsoft365Integration/Pbx.TestPresence';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action DeauthorizePresence
 * @method
 * @name Xapi#DeauthorizePresence
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.DeauthorizePresence = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Microsoft365Integration/Pbx.DeauthorizePresence';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetMicrosoftAccessToken
 * @method
 * @name Xapi#GetMicrosoftAccessToken
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.GetMicrosoftAccessToken = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Microsoft365Integration/Pbx.GetMicrosoftAccessToken()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetMicrosoft365Directory
 * @method
 * @name Xapi#GetMicrosoft365Directory
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.GetMicrosoft365Directory = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Microsoft365Integration/Pbx.GetMicrosoft365Directory()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action GetUsers
 * @method
 * @name Xapi#GetUsers
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.GetUsers = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Microsoft365Integration/Pbx.GetUsers';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action GetUsersByPrincipalNames
 * @method
 * @name Xapi#GetUsersByPrincipalNames
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.GetUsersByPrincipalNames = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Microsoft365Integration/Pbx.GetUsersByPrincipalNames';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get Microsoft365TeamsIntegration
 * @method
 * @name Xapi#GetMicrosoft365TeamsIntegration
 * @param {object} parameters - method options and parameters
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetMicrosoft365TeamsIntegration = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Microsoft365TeamsIntegration';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update Microsoft365TeamsIntegration
 * @method
 * @name Xapi#UpdateMicrosoft365TeamsIntegration
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - New property values
 */
 Xapi.prototype.UpdateMicrosoft365TeamsIntegration = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Microsoft365TeamsIntegration';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function CheckFqdnRecord
 * @method
 * @name Xapi#CheckFqdnRecord
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.fqdn - Usage: fqdn={fqdn}
 */
 Xapi.prototype.CheckFqdnRecord = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Microsoft365TeamsIntegration/Pbx.CheckFqdnRecord(fqdn={fqdn})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{fqdn}', parameters['fqdn']);
        
        


        if(parameters['fqdn'] === undefined){
            deferred.reject(new Error('Missing required  parameter: fqdn'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetDialPlanScript
 * @method
 * @name Xapi#GetDialPlanScript
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.GetDialPlanScript = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Microsoft365TeamsIntegration/Pbx.GetDialPlanScript()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetMapUsersScript
 * @method
 * @name Xapi#GetMapUsersScript
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.GetMapUsersScript = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Microsoft365TeamsIntegration/Pbx.GetMapUsersScript()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function CheckMapUsersScript
 * @method
 * @name Xapi#CheckMapUsersScript
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.CheckMapUsersScript = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Microsoft365TeamsIntegration/Pbx.CheckMapUsersScript()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get MusicOnHoldSettings
 * @method
 * @name Xapi#GetMusicOnHoldSettings
 * @param {object} parameters - method options and parameters
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetMusicOnHoldSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/MusicOnHoldSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update MusicOnHoldSettings
 * @method
 * @name Xapi#UpdateMusicOnHoldSettings
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - New property values
 */
 Xapi.prototype.UpdateMusicOnHoldSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/MusicOnHoldSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get MyGroup
 * @method
 * @name Xapi#GetMyGroup
 * @param {object} parameters - method options and parameters
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetMyGroup = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/MyGroup';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update MyGroup
 * @method
 * @name Xapi#UpdateMyGroup
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - New property values
 */
 Xapi.prototype.UpdateMyGroup = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/MyGroup';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get Members from MyGroup
 * @method
 * @name Xapi#ListMyGroupMembers
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListMyGroupMembers = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/MyGroup/Members';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get Rights from MyGroup
 * @method
 * @name Xapi#ListMyGroupRights
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListMyGroupRights = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/MyGroup/Rights';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetRestrictions
 * @method
 * @name Xapi#GetMyGroupRestrictions
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.GetMyGroupRestrictions = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/MyGroup/Pbx.GetRestrictions()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action ReplaceMyGroupLicenseKey
 * @method
 * @name Xapi#ReplaceMyGroupLicenseKey
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - This OData service is located at /xapi/v1
 */
 Xapi.prototype.ReplaceMyGroupLicenseKey = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/MyGroup/Pbx.ReplaceMyGroupLicenseKey';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetMyGroupPartnerInfo
 * @method
 * @name Xapi#GetMyGroupPartnerInfo
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.resellerId - Usage: resellerId={resellerId}
 */
 Xapi.prototype.GetMyGroupPartnerInfo = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/MyGroup/Pbx.GetMyGroupPartnerInfo(resellerId={resellerId})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{resellerId}', parameters['resellerId']);
        
        


        if(parameters['resellerId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: resellerId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action UnlinkMyGroupPartner
 * @method
 * @name Xapi#UnlinkMyGroupPartner
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.UnlinkMyGroupPartner = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/MyGroup/Pbx.UnlinkMyGroupPartner';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action LinkMyGroupPartner
 * @method
 * @name Xapi#LinkMyGroupPartner
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - This OData service is located at /xapi/v1
 */
 Xapi.prototype.LinkMyGroupPartner = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/MyGroup/Pbx.LinkMyGroupPartner';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entities from MyTokens
 * @method
 * @name Xapi#ListRefreshToken
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListRefreshToken = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/MyTokens';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action RevokeToken
 * @method
 * @name Xapi#RevokeToken
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of RefreshToken
 */
 Xapi.prototype.RevokeToken = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/MyTokens({Id})/Pbx.RevokeToken';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get MyUser
 * @method
 * @name Xapi#GetMyUser
 * @param {object} parameters - method options and parameters
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetMyUser = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/MyUser';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update MyUser
 * @method
 * @name Xapi#UpdateMyUser
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - New property values
 */
 Xapi.prototype.UpdateMyUser = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/MyUser';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get Groups from MyUser
 * @method
 * @name Xapi#ListMyUserGroups
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListMyUserGroups = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/MyUser/Groups';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get ForwardingProfiles from MyUser
 * @method
 * @name Xapi#ListMyUserForwardingProfiles
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListMyUserForwardingProfiles = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/MyUser/ForwardingProfiles';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get Greetings from MyUser
 * @method
 * @name Xapi#ListMyUserGreetings
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListMyUserGreetings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/MyUser/Greetings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GenerateProvLink
 * @method
 * @name Xapi#MyUserGenerateProvLink
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.MyUserGenerateProvLink = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/MyUser/Pbx.GenerateProvLink()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entities from NetworkInterfaces
 * @method
 * @name Xapi#ListNetworkInterface
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListNetworkInterface = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/NetworkInterfaces';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get NetworkSettings
 * @method
 * @name Xapi#GetNetworkSettings
 * @param {object} parameters - method options and parameters
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetNetworkSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/NetworkSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update NetworkSettings
 * @method
 * @name Xapi#UpdateNetworkSettings
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - New property values
 */
 Xapi.prototype.UpdateNetworkSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/NetworkSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetIfaces
 * @method
 * @name Xapi#GetIfaces
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
 */
 Xapi.prototype.GetIfaces = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/NetworkSettings/Pbx.GetIfaces()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get NotificationSettings
 * @method
 * @name Xapi#GetNotificationSettings
 * @param {object} parameters - method options and parameters
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetNotificationSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/NotificationSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update NotificationSettings
 * @method
 * @name Xapi#UpdateNotificationSettings
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - New property values
 */
 Xapi.prototype.UpdateNotificationSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/NotificationSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action TestEmail
 * @method
 * @name Xapi#TestEmail
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.TestEmail = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/NotificationSettings/Pbx.TestEmail';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get OfficeHours
 * @method
 * @name Xapi#GetOfficeHours
 * @param {object} parameters - method options and parameters
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetOfficeHours = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/OfficeHours';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update OfficeHours
 * @method
 * @name Xapi#UpdateOfficeHours
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - New property values
 */
 Xapi.prototype.UpdateOfficeHours = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/OfficeHours';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entity from OutboundRules by key
 * @method
 * @name Xapi#GetOutboundRule
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of OutboundRule
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetOutboundRule = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/OutboundRules({Id})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update entity in OutboundRules
 * @method
 * @name Xapi#UpdateOutboundRule
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of OutboundRule
     * @param {} parameters.body - New property values
 */
 Xapi.prototype.UpdateOutboundRule = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/OutboundRules({Id})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Delete entity from OutboundRules
 * @method
 * @name Xapi#DeleteOutboundRule
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of OutboundRule
     * @param {string} parameters.ifMatch - ETag
 */
 Xapi.prototype.DeleteOutboundRule = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/OutboundRules({Id})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
        
        
                if(parameters['ifMatch'] !== undefined){
                    headers['If-Match'] = parameters['ifMatch'];
                }
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entities from OutboundRules
 * @method
 * @name Xapi#ListOutboundRule
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListOutboundRule = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/OutboundRules';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Add new entity to OutboundRules
 * @method
 * @name Xapi#CreateOutboundRule
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - New entity
 */
 Xapi.prototype.CreateOutboundRule = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/OutboundRules';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetEmergencyOutboundRules
 * @method
 * @name Xapi#GetEmergencyOutboundRules
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetEmergencyOutboundRules = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/OutboundRules/Pbx.GetEmergencyOutboundRules()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action Purge
 * @method
 * @name Xapi#Purge
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.Purge = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/OutboundRules/Pbx.Purge';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action MoveUpDown
 * @method
 * @name Xapi#MoveUpDown
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.MoveUpDown = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/OutboundRules/Pbx.MoveUpDown';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetParameterByName
 * @method
 * @name Xapi#GetParameterByName
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.name - Usage: name={name}
 */
 Xapi.prototype.GetParameterByName = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Parameters/Pbx.GetParameterByName(name={name})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{name}', parameters['name']);
        
        


        if(parameters['name'] === undefined){
            deferred.reject(new Error('Missing required  parameter: name'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entities from Parameters
 * @method
 * @name Xapi#ListParameter
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListParameter = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Parameters';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Add new entity to Parameters
 * @method
 * @name Xapi#CreateParameter
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - New entity
 */
 Xapi.prototype.CreateParameter = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Parameters';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entity from Parameters by key
 * @method
 * @name Xapi#GetParameter
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of Parameter
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetParameter = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Parameters({Id})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update entity in Parameters
 * @method
 * @name Xapi#UpdateParameter
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of Parameter
     * @param {} parameters.body - New property values
 */
 Xapi.prototype.UpdateParameter = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Parameters({Id})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Delete entity from Parameters
 * @method
 * @name Xapi#DeleteParameter
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of Parameter
     * @param {string} parameters.ifMatch - ETag
 */
 Xapi.prototype.DeleteParameter = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Parameters({Id})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
        
        
                if(parameters['ifMatch'] !== undefined){
                    headers['If-Match'] = parameters['ifMatch'];
                }
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get Groups from Parkings
 * @method
 * @name Xapi#ListParkingGroups
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of Parking
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListParkingGroups = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Parkings({Id})/Groups';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetByNumber
 * @method
 * @name Xapi#GetByNumber
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.number - Usage: number={number}
 */
 Xapi.prototype.GetByNumber = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Parkings/Pbx.GetByNumber(number={number})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{number}', parameters['number']);
        
        


        if(parameters['number'] === undefined){
            deferred.reject(new Error('Missing required  parameter: number'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entities from Parkings
 * @method
 * @name Xapi#ListParking
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListParking = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Parkings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Add new entity to Parkings
 * @method
 * @name Xapi#CreateParking
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - New entity
 */
 Xapi.prototype.CreateParking = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Parkings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entity from Parkings by key
 * @method
 * @name Xapi#GetParking
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of Parking
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetParking = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Parkings({Id})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update entity in Parkings
 * @method
 * @name Xapi#UpdateParking
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of Parking
     * @param {} parameters.body - New property values
 */
 Xapi.prototype.UpdateParking = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Parkings({Id})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Delete entity from Parkings
 * @method
 * @name Xapi#DeleteParking
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of Parking
     * @param {string} parameters.ifMatch - ETag
 */
 Xapi.prototype.DeleteParking = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Parkings({Id})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
        
        
                if(parameters['ifMatch'] !== undefined){
                    headers['If-Match'] = parameters['ifMatch'];
                }
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entities from Peers
 * @method
 * @name Xapi#ListPeer
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListPeer = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Peers';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetPeerByNumber
 * @method
 * @name Xapi#GetPeerByNumber
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.number - Usage: number={number}
 */
 Xapi.prototype.GetPeerByNumber = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Peers/Pbx.GetPeerByNumber(number={number})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{number}', parameters['number']);
        
        


        if(parameters['number'] === undefined){
            deferred.reject(new Error('Missing required  parameter: number'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetReportPeers
 * @method
 * @name Xapi#GetReportPeers
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetReportPeers = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Peers/Pbx.GetReportPeers()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get PhoneBookSettings
 * @method
 * @name Xapi#GetPhoneBookSettings
 * @param {object} parameters - method options and parameters
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetPhoneBookSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/PhoneBookSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update PhoneBookSettings
 * @method
 * @name Xapi#UpdatePhoneBookSettings
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - New property values
 */
 Xapi.prototype.UpdatePhoneBookSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/PhoneBookSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entities from PhoneLogos
 * @method
 * @name Xapi#ListPhoneLogo
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListPhoneLogo = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/PhoneLogos';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Delete entity from PhoneLogos
 * @method
 * @name Xapi#DeletePhoneLogo
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.filename - The unique identifier of PhoneLogo
     * @param {string} parameters.ifMatch - ETag
 */
 Xapi.prototype.DeletePhoneLogo = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/PhoneLogos({Filename})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Filename}', parameters['filename']);
        
        


        if(parameters['filename'] === undefined){
            deferred.reject(new Error('Missing required  parameter: filename'));
            return deferred.promise;
        }
 
        
        
                if(parameters['ifMatch'] !== undefined){
                    headers['If-Match'] = parameters['ifMatch'];
                }
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get PhonesSettings
 * @method
 * @name Xapi#GetPhonesSettings
 * @param {object} parameters - method options and parameters
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetPhonesSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/PhonesSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update PhonesSettings
 * @method
 * @name Xapi#UpdatePhonesSettings
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - New property values
 */
 Xapi.prototype.UpdatePhonesSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/PhonesSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entities from PhoneTemplates
 * @method
 * @name Xapi#ListPhoneTemplate
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListPhoneTemplate = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/PhoneTemplates';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Add new entity to PhoneTemplates
 * @method
 * @name Xapi#CreatePhoneTemplate
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - New entity
 */
 Xapi.prototype.CreatePhoneTemplate = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/PhoneTemplates';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entity from PhoneTemplates by key
 * @method
 * @name Xapi#GetPhoneTemplate
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - The unique identifier of PhoneTemplate
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetPhoneTemplate = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/PhoneTemplates({Id})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update entity in PhoneTemplates
 * @method
 * @name Xapi#UpdatePhoneTemplate
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - The unique identifier of PhoneTemplate
     * @param {} parameters.body - New property values
 */
 Xapi.prototype.UpdatePhoneTemplate = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/PhoneTemplates({Id})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Delete entity from PhoneTemplates
 * @method
 * @name Xapi#DeletePhoneTemplate
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - The unique identifier of PhoneTemplate
     * @param {string} parameters.ifMatch - ETag
 */
 Xapi.prototype.DeletePhoneTemplate = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/PhoneTemplates({Id})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
        
        
                if(parameters['ifMatch'] !== undefined){
                    headers['If-Match'] = parameters['ifMatch'];
                }
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entities from Playlists
 * @method
 * @name Xapi#ListPlaylist
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListPlaylist = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Playlists';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Add new entity to Playlists
 * @method
 * @name Xapi#CreatePlaylist
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - New entity
 */
 Xapi.prototype.CreatePlaylist = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Playlists';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entity from Playlists by key
 * @method
 * @name Xapi#GetPlaylist
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.name - The unique identifier of Playlist
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetPlaylist = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Playlists({Name})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Name}', parameters['name']);
        
        


        if(parameters['name'] === undefined){
            deferred.reject(new Error('Missing required  parameter: name'));
            return deferred.promise;
        }
 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update entity in Playlists
 * @method
 * @name Xapi#UpdatePlaylist
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.name - The unique identifier of Playlist
     * @param {} parameters.body - New property values
 */
 Xapi.prototype.UpdatePlaylist = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Playlists({Name})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{Name}', parameters['name']);
        
        


        if(parameters['name'] === undefined){
            deferred.reject(new Error('Missing required  parameter: name'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Delete entity from Playlists
 * @method
 * @name Xapi#DeletePlaylist
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.name - The unique identifier of Playlist
     * @param {string} parameters.ifMatch - ETag
 */
 Xapi.prototype.DeletePlaylist = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Playlists({Name})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Name}', parameters['name']);
        
        


        if(parameters['name'] === undefined){
            deferred.reject(new Error('Missing required  parameter: name'));
            return deferred.promise;
        }
 
        
        
                if(parameters['ifMatch'] !== undefined){
                    headers['If-Match'] = parameters['ifMatch'];
                }
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action DeletePlaylistFile
 * @method
 * @name Xapi#DeletePlaylistFile
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.DeletePlaylistFile = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Playlists/Pbx.DeletePlaylistFile';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function DownloadPlaylistFile
 * @method
 * @name Xapi#DownloadPlaylistFile
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.playlistKey - Usage: playlistKey={playlistKey}
     * @param {string} parameters.fileName - Usage: fileName={fileName}
 */
 Xapi.prototype.DownloadPlaylistFile = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Playlists/Pbx.DownloadPlaylistFile(playlistKey={playlistKey},fileName={fileName})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{playlistKey}', parameters['playlistKey']);
        
        


        if(parameters['playlistKey'] === undefined){
            deferred.reject(new Error('Missing required  parameter: playlistKey'));
            return deferred.promise;
        }
 
        
            path = path.replace('{fileName}', parameters['fileName']);
        
        


        if(parameters['fileName'] === undefined){
            deferred.reject(new Error('Missing required  parameter: fileName'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entities from PromptSets
 * @method
 * @name Xapi#ListPromptSet
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListPromptSet = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/PromptSets';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entity from PromptSets by key
 * @method
 * @name Xapi#GetPromptSet
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of PromptSet
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetPromptSet = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/PromptSets({Id})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update entity in PromptSets
 * @method
 * @name Xapi#UpdatePromptSet
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of PromptSet
     * @param {} parameters.body - New property values
 */
 Xapi.prototype.UpdatePromptSet = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/PromptSets({Id})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Delete entity from PromptSets
 * @method
 * @name Xapi#DeletePromptSet
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of PromptSet
     * @param {string} parameters.ifMatch - ETag
 */
 Xapi.prototype.DeletePromptSet = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/PromptSets({Id})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
        
        
                if(parameters['ifMatch'] !== undefined){
                    headers['If-Match'] = parameters['ifMatch'];
                }
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetActive
 * @method
 * @name Xapi#GetActive
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.GetActive = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/PromptSets/Pbx.GetActive()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get Prompts from PromptSets
 * @method
 * @name Xapi#ListPrompts
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of PromptSet
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListPrompts = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/PromptSets({Id})/Prompts';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action SetActive
 * @method
 * @name Xapi#SetActive
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of PromptSet
 */
 Xapi.prototype.SetActive = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/PromptSets({Id})/Pbx.SetActive';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action SetAlternatePronunciation
 * @method
 * @name Xapi#SetAlternatePronunciation
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of PromptSet
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.SetAlternatePronunciation = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/PromptSets({Id})/Pbx.SetAlternatePronunciation';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action Copy
 * @method
 * @name Xapi#Copy
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of PromptSet
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.Copy = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/PromptSets({Id})/Pbx.Copy';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action PlayPrompt
 * @method
 * @name Xapi#PlayPrompt
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of PromptSet
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.PlayPrompt = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/PromptSets({Id})/Pbx.PlayPrompt';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action RecordPrompt
 * @method
 * @name Xapi#RecordPrompt
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of PromptSet
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.RecordPrompt = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/PromptSets({Id})/Pbx.RecordPrompt';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke actionImport PurgeCalls
 * @method
 * @name Xapi#PurgeCalls
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.PurgeCalls = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/PurgeCalls';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke actionImport PurgeChats
 * @method
 * @name Xapi#PurgeChats
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.PurgeChats = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/PurgeChats';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get Agents from Queues
 * @method
 * @name Xapi#ListAgents
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of Queue
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListAgents = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Queues({Id})/Agents';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get Managers from Queues
 * @method
 * @name Xapi#ListManagers
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of Queue
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListManagers = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Queues({Id})/Managers';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action ResetQueueStatistics
 * @method
 * @name Xapi#ResetQueueStatistics
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of Queue
 */
 Xapi.prototype.ResetQueueStatistics = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Queues({Id})/Pbx.ResetQueueStatistics';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetFirstAvailableQueueNumber
 * @method
 * @name Xapi#GetFirstAvailableQueueNumber
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.GetFirstAvailableQueueNumber = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Queues/Pbx.GetFirstAvailableQueueNumber()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetByNumber
 * @method
 * @name Xapi#GetQueueByNumber
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.number - Usage: number={number}
 */
 Xapi.prototype.GetQueueByNumber = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Queues/Pbx.GetByNumber(number={number})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{number}', parameters['number']);
        
        


        if(parameters['number'] === undefined){
            deferred.reject(new Error('Missing required  parameter: number'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entities from Queues
 * @method
 * @name Xapi#ListQueue
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListQueue = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Queues';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Add new entity to Queues
 * @method
 * @name Xapi#CreateQueue
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - New entity
 */
 Xapi.prototype.CreateQueue = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Queues';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entity from Queues by key
 * @method
 * @name Xapi#GetQueue
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of Queue
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetQueue = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Queues({Id})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update entity in Queues
 * @method
 * @name Xapi#UpdateQueue
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of Queue
     * @param {} parameters.body - New property values
 */
 Xapi.prototype.UpdateQueue = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Queues({Id})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Delete entity from Queues
 * @method
 * @name Xapi#DeleteQueue
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of Queue
     * @param {string} parameters.ifMatch - ETag
 */
 Xapi.prototype.DeleteQueue = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Queues({Id})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
        
        
                if(parameters['ifMatch'] !== undefined){
                    headers['If-Match'] = parameters['ifMatch'];
                }
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get Forwards from Receptionists
 * @method
 * @name Xapi#ListForwards
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of Receptionist
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListForwards = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Receptionists({Id})/Forwards';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetFirstAvailableReceptionistNumber
 * @method
 * @name Xapi#GetFirstAvailableReceptionistNumber
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.GetFirstAvailableReceptionistNumber = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Receptionists/Pbx.GetFirstAvailableReceptionistNumber()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetByNumber
 * @method
 * @name Xapi#GetReceptionistByNumber
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.number - Usage: number={number}
 */
 Xapi.prototype.GetReceptionistByNumber = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Receptionists/Pbx.GetByNumber(number={number})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{number}', parameters['number']);
        
        


        if(parameters['number'] === undefined){
            deferred.reject(new Error('Missing required  parameter: number'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entities from Receptionists
 * @method
 * @name Xapi#ListReceptionist
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListReceptionist = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Receptionists';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Add new entity to Receptionists
 * @method
 * @name Xapi#CreateReceptionist
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - New entity
 */
 Xapi.prototype.CreateReceptionist = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Receptionists';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entity from Receptionists by key
 * @method
 * @name Xapi#GetReceptionist
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of Receptionist
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetReceptionist = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Receptionists({Id})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update entity in Receptionists
 * @method
 * @name Xapi#UpdateReceptionist
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of Receptionist
     * @param {} parameters.body - New property values
 */
 Xapi.prototype.UpdateReceptionist = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Receptionists({Id})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Delete entity from Receptionists
 * @method
 * @name Xapi#DeleteReceptionist
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of Receptionist
     * @param {string} parameters.ifMatch - ETag
 */
 Xapi.prototype.DeleteReceptionist = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Receptionists({Id})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
        
        
                if(parameters['ifMatch'] !== undefined){
                    headers['If-Match'] = parameters['ifMatch'];
                }
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entities from Recordings
 * @method
 * @name Xapi#ListRecording
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListRecording = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Recordings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function DownloadRecording
 * @method
 * @name Xapi#DownloadRecording
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.recId - Usage: recId={recId}
 */
 Xapi.prototype.DownloadRecording = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Recordings/Pbx.DownloadRecording(recId={recId})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{recId}', parameters['recId']);
        
        


        if(parameters['recId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: recId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetRecordingRepositorySettings
 * @method
 * @name Xapi#GetRecordingRepositorySettings
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.GetRecordingRepositorySettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Recordings/Pbx.GetRecordingRepositorySettings()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action SetRecordingRepositorySettings
 * @method
 * @name Xapi#SetRecordingRepositorySettings
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.SetRecordingRepositorySettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Recordings/Pbx.SetRecordingRepositorySettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetRecordingSettings
 * @method
 * @name Xapi#GetRecordingSettings
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.GetRecordingSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Recordings/Pbx.GetRecordingSettings()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action SetRecordingSettings
 * @method
 * @name Xapi#SetRecordingSettings
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.SetRecordingSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Recordings/Pbx.SetRecordingSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action PurgeLocal
 * @method
 * @name Xapi#PurgeLocal
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.PurgeLocal = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Recordings/Pbx.PurgeLocal';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action PurgeArchive
 * @method
 * @name Xapi#PurgeArchive
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.PurgeArchive = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Recordings/Pbx.PurgeArchive';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action Archive
 * @method
 * @name Xapi#Archive
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.Archive = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Recordings/Pbx.Archive';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action BulkRecordingsDelete
 * @method
 * @name Xapi#BulkRecordingsDelete
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.BulkRecordingsDelete = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Recordings/Pbx.BulkRecordingsDelete';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action BulkRecordingsArchive
 * @method
 * @name Xapi#BulkRecordingsArchive
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.BulkRecordingsArchive = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Recordings/Pbx.BulkRecordingsArchive';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetAbandonedChatsStatisticsData
 * @method
 * @name Xapi#GetAbandonedChatsStatisticsData
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.queueDnStr - Usage: queueDnStr={queueDnStr}
     * @param {string} parameters.startDt - Usage: startDt={startDt}
     * @param {string} parameters.endDt - Usage: endDt={endDt}
     * @param {integer} parameters.participantType - Usage: participantType={participantType}
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetAbandonedChatsStatisticsData = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ReportAbandonedChatsStatistics/Pbx.GetAbandonedChatsStatisticsData(queueDnStr={queueDnStr},startDt={startDt},endDt={endDt},participantType={participantType})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{queueDnStr}', parameters['queueDnStr']);
        
        


        if(parameters['queueDnStr'] === undefined){
            deferred.reject(new Error('Missing required  parameter: queueDnStr'));
            return deferred.promise;
        }
 
        
            path = path.replace('{startDt}', parameters['startDt']);
        
        


        if(parameters['startDt'] === undefined){
            deferred.reject(new Error('Missing required  parameter: startDt'));
            return deferred.promise;
        }
 
        
            path = path.replace('{endDt}', parameters['endDt']);
        
        


        if(parameters['endDt'] === undefined){
            deferred.reject(new Error('Missing required  parameter: endDt'));
            return deferred.promise;
        }
 
        
            path = path.replace('{participantType}', parameters['participantType']);
        
        


        if(parameters['participantType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: participantType'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function DownloadAbandonedChatsStatistics
 * @method
 * @name Xapi#DownloadAbandonedChatsStatistics
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.queueDnStr - Usage: queueDnStr={queueDnStr}
     * @param {string} parameters.startDt - Usage: startDt={startDt}
     * @param {string} parameters.endDt - Usage: endDt={endDt}
     * @param {integer} parameters.participantType - Usage: participantType={participantType}
     * @param {string} parameters.clientTimeZone - Usage: clientTimeZone={clientTimeZone}
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.DownloadAbandonedChatsStatistics = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ReportAbandonedChatsStatistics/Pbx.DownloadAbandonedChatsStatistics(queueDnStr={queueDnStr},startDt={startDt},endDt={endDt},participantType={participantType},clientTimeZone={clientTimeZone})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{queueDnStr}', parameters['queueDnStr']);
        
        


        if(parameters['queueDnStr'] === undefined){
            deferred.reject(new Error('Missing required  parameter: queueDnStr'));
            return deferred.promise;
        }
 
        
            path = path.replace('{startDt}', parameters['startDt']);
        
        


        if(parameters['startDt'] === undefined){
            deferred.reject(new Error('Missing required  parameter: startDt'));
            return deferred.promise;
        }
 
        
            path = path.replace('{endDt}', parameters['endDt']);
        
        


        if(parameters['endDt'] === undefined){
            deferred.reject(new Error('Missing required  parameter: endDt'));
            return deferred.promise;
        }
 
        
            path = path.replace('{participantType}', parameters['participantType']);
        
        


        if(parameters['participantType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: participantType'));
            return deferred.promise;
        }
 
        
            path = path.replace('{clientTimeZone}', parameters['clientTimeZone']);
        
        


        if(parameters['clientTimeZone'] === undefined){
            deferred.reject(new Error('Missing required  parameter: clientTimeZone'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetAbandonedQueueCallsData
 * @method
 * @name Xapi#GetAbandonedQueueCallsData
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.periodFrom - Usage: periodFrom={periodFrom}
     * @param {string} parameters.periodTo - Usage: periodTo={periodTo}
     * @param {string} parameters.queueDns - Usage: queueDns={queueDns}
     * @param {string} parameters.waitInterval - Usage: waitInterval={waitInterval}
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetAbandonedQueueCallsData = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ReportAbandonedQueueCalls/Pbx.GetAbandonedQueueCallsData(periodFrom={periodFrom},periodTo={periodTo},queueDns={queueDns},waitInterval={waitInterval})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{periodFrom}', parameters['periodFrom']);
        
        


        if(parameters['periodFrom'] === undefined){
            deferred.reject(new Error('Missing required  parameter: periodFrom'));
            return deferred.promise;
        }
 
        
            path = path.replace('{periodTo}', parameters['periodTo']);
        
        


        if(parameters['periodTo'] === undefined){
            deferred.reject(new Error('Missing required  parameter: periodTo'));
            return deferred.promise;
        }
 
        
            path = path.replace('{queueDns}', parameters['queueDns']);
        
        


        if(parameters['queueDns'] === undefined){
            deferred.reject(new Error('Missing required  parameter: queueDns'));
            return deferred.promise;
        }
 
        
            path = path.replace('{waitInterval}', parameters['waitInterval']);
        
        


        if(parameters['waitInterval'] === undefined){
            deferred.reject(new Error('Missing required  parameter: waitInterval'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function DownloadAbandonedQueueCalls
 * @method
 * @name Xapi#DownloadAbandonedQueueCalls
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.periodFrom - Usage: periodFrom={periodFrom}
     * @param {string} parameters.periodTo - Usage: periodTo={periodTo}
     * @param {string} parameters.queueDns - Usage: queueDns={queueDns}
     * @param {string} parameters.waitInterval - Usage: waitInterval={waitInterval}
     * @param {string} parameters.clientTimeZone - Usage: clientTimeZone={clientTimeZone}
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.DownloadAbandonedQueueCalls = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ReportAbandonedQueueCalls/Pbx.DownloadAbandonedQueueCalls(periodFrom={periodFrom},periodTo={periodTo},queueDns={queueDns},waitInterval={waitInterval},clientTimeZone={clientTimeZone})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{periodFrom}', parameters['periodFrom']);
        
        


        if(parameters['periodFrom'] === undefined){
            deferred.reject(new Error('Missing required  parameter: periodFrom'));
            return deferred.promise;
        }
 
        
            path = path.replace('{periodTo}', parameters['periodTo']);
        
        


        if(parameters['periodTo'] === undefined){
            deferred.reject(new Error('Missing required  parameter: periodTo'));
            return deferred.promise;
        }
 
        
            path = path.replace('{queueDns}', parameters['queueDns']);
        
        


        if(parameters['queueDns'] === undefined){
            deferred.reject(new Error('Missing required  parameter: queueDns'));
            return deferred.promise;
        }
 
        
            path = path.replace('{waitInterval}', parameters['waitInterval']);
        
        


        if(parameters['waitInterval'] === undefined){
            deferred.reject(new Error('Missing required  parameter: waitInterval'));
            return deferred.promise;
        }
 
        
            path = path.replace('{clientTimeZone}', parameters['clientTimeZone']);
        
        


        if(parameters['clientTimeZone'] === undefined){
            deferred.reject(new Error('Missing required  parameter: clientTimeZone'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetAgentLoginHistoryData
 * @method
 * @name Xapi#GetAgentLoginHistoryData
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.clientTimeZone - Usage: clientTimeZone={clientTimeZone}
     * @param {string} parameters.startDt - Usage: startDt={startDt}
     * @param {string} parameters.endDt - Usage: endDt={endDt}
     * @param {string} parameters.queueDnStr - Usage: queueDnStr={queueDnStr}
     * @param {string} parameters.agentDnStr - Usage: agentDnStr={agentDnStr}
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetAgentLoginHistoryData = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ReportAgentLoginHistory/Pbx.GetAgentLoginHistoryData(clientTimeZone={clientTimeZone},startDt={startDt},endDt={endDt},queueDnStr={queueDnStr},agentDnStr={agentDnStr})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{clientTimeZone}', parameters['clientTimeZone']);
        
        


        if(parameters['clientTimeZone'] === undefined){
            deferred.reject(new Error('Missing required  parameter: clientTimeZone'));
            return deferred.promise;
        }
 
        
            path = path.replace('{startDt}', parameters['startDt']);
        
        


        if(parameters['startDt'] === undefined){
            deferred.reject(new Error('Missing required  parameter: startDt'));
            return deferred.promise;
        }
 
        
            path = path.replace('{endDt}', parameters['endDt']);
        
        


        if(parameters['endDt'] === undefined){
            deferred.reject(new Error('Missing required  parameter: endDt'));
            return deferred.promise;
        }
 
        
            path = path.replace('{queueDnStr}', parameters['queueDnStr']);
        
        


        if(parameters['queueDnStr'] === undefined){
            deferred.reject(new Error('Missing required  parameter: queueDnStr'));
            return deferred.promise;
        }
 
        
            path = path.replace('{agentDnStr}', parameters['agentDnStr']);
        
        


        if(parameters['agentDnStr'] === undefined){
            deferred.reject(new Error('Missing required  parameter: agentDnStr'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function DownloadAgentLoginHistory
 * @method
 * @name Xapi#DownloadAgentLoginHistory
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.clientTimeZone - Usage: clientTimeZone={clientTimeZone}
     * @param {string} parameters.startDt - Usage: startDt={startDt}
     * @param {string} parameters.endDt - Usage: endDt={endDt}
     * @param {string} parameters.queueDnStr - Usage: queueDnStr={queueDnStr}
     * @param {string} parameters.agentDnStr - Usage: agentDnStr={agentDnStr}
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.DownloadAgentLoginHistory = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ReportAgentLoginHistory/Pbx.DownloadAgentLoginHistory(clientTimeZone={clientTimeZone},startDt={startDt},endDt={endDt},queueDnStr={queueDnStr},agentDnStr={agentDnStr})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{clientTimeZone}', parameters['clientTimeZone']);
        
        


        if(parameters['clientTimeZone'] === undefined){
            deferred.reject(new Error('Missing required  parameter: clientTimeZone'));
            return deferred.promise;
        }
 
        
            path = path.replace('{startDt}', parameters['startDt']);
        
        


        if(parameters['startDt'] === undefined){
            deferred.reject(new Error('Missing required  parameter: startDt'));
            return deferred.promise;
        }
 
        
            path = path.replace('{endDt}', parameters['endDt']);
        
        


        if(parameters['endDt'] === undefined){
            deferred.reject(new Error('Missing required  parameter: endDt'));
            return deferred.promise;
        }
 
        
            path = path.replace('{queueDnStr}', parameters['queueDnStr']);
        
        


        if(parameters['queueDnStr'] === undefined){
            deferred.reject(new Error('Missing required  parameter: queueDnStr'));
            return deferred.promise;
        }
 
        
            path = path.replace('{agentDnStr}', parameters['agentDnStr']);
        
        


        if(parameters['agentDnStr'] === undefined){
            deferred.reject(new Error('Missing required  parameter: agentDnStr'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetAgentsInQueueStatisticsData
 * @method
 * @name Xapi#GetAgentsInQueueStatisticsData
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.queueDnStr - Usage: queueDnStr={queueDnStr}
     * @param {string} parameters.startDt - Usage: startDt={startDt}
     * @param {string} parameters.endDt - Usage: endDt={endDt}
     * @param {string} parameters.waitInterval - Usage: waitInterval={waitInterval}
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetAgentsInQueueStatisticsData = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ReportAgentsInQueueStatistics/Pbx.GetAgentsInQueueStatisticsData(queueDnStr={queueDnStr},startDt={startDt},endDt={endDt},waitInterval={waitInterval})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{queueDnStr}', parameters['queueDnStr']);
        
        


        if(parameters['queueDnStr'] === undefined){
            deferred.reject(new Error('Missing required  parameter: queueDnStr'));
            return deferred.promise;
        }
 
        
            path = path.replace('{startDt}', parameters['startDt']);
        
        


        if(parameters['startDt'] === undefined){
            deferred.reject(new Error('Missing required  parameter: startDt'));
            return deferred.promise;
        }
 
        
            path = path.replace('{endDt}', parameters['endDt']);
        
        


        if(parameters['endDt'] === undefined){
            deferred.reject(new Error('Missing required  parameter: endDt'));
            return deferred.promise;
        }
 
        
            path = path.replace('{waitInterval}', parameters['waitInterval']);
        
        


        if(parameters['waitInterval'] === undefined){
            deferred.reject(new Error('Missing required  parameter: waitInterval'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function DownloadAgentsInQueueStatistics
 * @method
 * @name Xapi#DownloadAgentsInQueueStatistics
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.queueDnStr - Usage: queueDnStr={queueDnStr}
     * @param {string} parameters.startDt - Usage: startDt={startDt}
     * @param {string} parameters.endDt - Usage: endDt={endDt}
     * @param {string} parameters.waitInterval - Usage: waitInterval={waitInterval}
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.DownloadAgentsInQueueStatistics = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ReportAgentsInQueueStatistics/Pbx.DownloadAgentsInQueueStatistics(queueDnStr={queueDnStr},startDt={startDt},endDt={endDt},waitInterval={waitInterval})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{queueDnStr}', parameters['queueDnStr']);
        
        


        if(parameters['queueDnStr'] === undefined){
            deferred.reject(new Error('Missing required  parameter: queueDnStr'));
            return deferred.promise;
        }
 
        
            path = path.replace('{startDt}', parameters['startDt']);
        
        


        if(parameters['startDt'] === undefined){
            deferred.reject(new Error('Missing required  parameter: startDt'));
            return deferred.promise;
        }
 
        
            path = path.replace('{endDt}', parameters['endDt']);
        
        


        if(parameters['endDt'] === undefined){
            deferred.reject(new Error('Missing required  parameter: endDt'));
            return deferred.promise;
        }
 
        
            path = path.replace('{waitInterval}', parameters['waitInterval']);
        
        


        if(parameters['waitInterval'] === undefined){
            deferred.reject(new Error('Missing required  parameter: waitInterval'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetAuditLogData
 * @method
 * @name Xapi#GetAuditLogData
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetAuditLogData = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ReportAuditLog/Pbx.GetAuditLogData()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function DownloadAuditLog
 * @method
 * @name Xapi#DownloadAuditLog
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.clientTimeZone - Usage: clientTimeZone={clientTimeZone}
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.DownloadAuditLog = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ReportAuditLog/Pbx.DownloadAuditLog(clientTimeZone={clientTimeZone})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{clientTimeZone}', parameters['clientTimeZone']);
        
        


        if(parameters['clientTimeZone'] === undefined){
            deferred.reject(new Error('Missing required  parameter: clientTimeZone'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetAverageQueueWaitingTimeData
 * @method
 * @name Xapi#GetAverageQueueWaitingTimeData
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.chartDate - Usage: chartDate={chartDate}
     * @param {string} parameters.chartBy - Usage: chartBy={chartBy}
     * @param {string} parameters.queueDnStr - Usage: queueDnStr={queueDnStr}
     * @param {string} parameters.waitInterval - Usage: waitInterval={waitInterval}
     * @param {string} parameters.clientTimeZone - Usage: clientTimeZone={clientTimeZone}
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetAverageQueueWaitingTimeData = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ReportAverageQueueWaitingTime/Pbx.GetAverageQueueWaitingTimeData(chartDate={chartDate},chartBy={chartBy},queueDnStr={queueDnStr},waitInterval={waitInterval},clientTimeZone={clientTimeZone})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{chartDate}', parameters['chartDate']);
        
        


        if(parameters['chartDate'] === undefined){
            deferred.reject(new Error('Missing required  parameter: chartDate'));
            return deferred.promise;
        }
 
        
            path = path.replace('{chartBy}', parameters['chartBy']);
        
        


        if(parameters['chartBy'] === undefined){
            deferred.reject(new Error('Missing required  parameter: chartBy'));
            return deferred.promise;
        }
 
        
            path = path.replace('{queueDnStr}', parameters['queueDnStr']);
        
        


        if(parameters['queueDnStr'] === undefined){
            deferred.reject(new Error('Missing required  parameter: queueDnStr'));
            return deferred.promise;
        }
 
        
            path = path.replace('{waitInterval}', parameters['waitInterval']);
        
        


        if(parameters['waitInterval'] === undefined){
            deferred.reject(new Error('Missing required  parameter: waitInterval'));
            return deferred.promise;
        }
 
        
            path = path.replace('{clientTimeZone}', parameters['clientTimeZone']);
        
        


        if(parameters['clientTimeZone'] === undefined){
            deferred.reject(new Error('Missing required  parameter: clientTimeZone'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function DownloadAverageQueueWaitingTimeReport
 * @method
 * @name Xapi#DownloadAverageQueueWaitingTimeReport
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.chartDate - Usage: chartDate={chartDate}
     * @param {string} parameters.chartBy - Usage: chartBy={chartBy}
     * @param {string} parameters.queueDnStr - Usage: queueDnStr={queueDnStr}
     * @param {string} parameters.waitInterval - Usage: waitInterval={waitInterval}
     * @param {string} parameters.clientTimeZone - Usage: clientTimeZone={clientTimeZone}
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.DownloadAverageQueueWaitingTimeReport = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ReportAverageQueueWaitingTime/Pbx.DownloadAverageQueueWaitingTimeReport(chartDate={chartDate},chartBy={chartBy},queueDnStr={queueDnStr},waitInterval={waitInterval},clientTimeZone={clientTimeZone})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{chartDate}', parameters['chartDate']);
        
        


        if(parameters['chartDate'] === undefined){
            deferred.reject(new Error('Missing required  parameter: chartDate'));
            return deferred.promise;
        }
 
        
            path = path.replace('{chartBy}', parameters['chartBy']);
        
        


        if(parameters['chartBy'] === undefined){
            deferred.reject(new Error('Missing required  parameter: chartBy'));
            return deferred.promise;
        }
 
        
            path = path.replace('{queueDnStr}', parameters['queueDnStr']);
        
        


        if(parameters['queueDnStr'] === undefined){
            deferred.reject(new Error('Missing required  parameter: queueDnStr'));
            return deferred.promise;
        }
 
        
            path = path.replace('{waitInterval}', parameters['waitInterval']);
        
        


        if(parameters['waitInterval'] === undefined){
            deferred.reject(new Error('Missing required  parameter: waitInterval'));
            return deferred.promise;
        }
 
        
            path = path.replace('{clientTimeZone}', parameters['clientTimeZone']);
        
        


        if(parameters['clientTimeZone'] === undefined){
            deferred.reject(new Error('Missing required  parameter: clientTimeZone'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetBreachesSlaData
 * @method
 * @name Xapi#GetBreachesSlaData
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.queueDnStr - Usage: queueDnStr={queueDnStr}
     * @param {string} parameters.startDt - Usage: startDt={startDt}
     * @param {string} parameters.endDt - Usage: endDt={endDt}
     * @param {string} parameters.waitInterval - Usage: waitInterval={waitInterval}
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetBreachesSlaData = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ReportBreachesSla/Pbx.GetBreachesSlaData(queueDnStr={queueDnStr},startDt={startDt},endDt={endDt},waitInterval={waitInterval})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{queueDnStr}', parameters['queueDnStr']);
        
        


        if(parameters['queueDnStr'] === undefined){
            deferred.reject(new Error('Missing required  parameter: queueDnStr'));
            return deferred.promise;
        }
 
        
            path = path.replace('{startDt}', parameters['startDt']);
        
        


        if(parameters['startDt'] === undefined){
            deferred.reject(new Error('Missing required  parameter: startDt'));
            return deferred.promise;
        }
 
        
            path = path.replace('{endDt}', parameters['endDt']);
        
        


        if(parameters['endDt'] === undefined){
            deferred.reject(new Error('Missing required  parameter: endDt'));
            return deferred.promise;
        }
 
        
            path = path.replace('{waitInterval}', parameters['waitInterval']);
        
        


        if(parameters['waitInterval'] === undefined){
            deferred.reject(new Error('Missing required  parameter: waitInterval'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function DownloadBreachesSla
 * @method
 * @name Xapi#DownloadBreachesSla
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.queueDnStr - Usage: queueDnStr={queueDnStr}
     * @param {string} parameters.startDt - Usage: startDt={startDt}
     * @param {string} parameters.endDt - Usage: endDt={endDt}
     * @param {string} parameters.waitInterval - Usage: waitInterval={waitInterval}
     * @param {string} parameters.clientTimeZone - Usage: clientTimeZone={clientTimeZone}
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.DownloadBreachesSla = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ReportBreachesSla/Pbx.DownloadBreachesSla(queueDnStr={queueDnStr},startDt={startDt},endDt={endDt},waitInterval={waitInterval},clientTimeZone={clientTimeZone})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{queueDnStr}', parameters['queueDnStr']);
        
        


        if(parameters['queueDnStr'] === undefined){
            deferred.reject(new Error('Missing required  parameter: queueDnStr'));
            return deferred.promise;
        }
 
        
            path = path.replace('{startDt}', parameters['startDt']);
        
        


        if(parameters['startDt'] === undefined){
            deferred.reject(new Error('Missing required  parameter: startDt'));
            return deferred.promise;
        }
 
        
            path = path.replace('{endDt}', parameters['endDt']);
        
        


        if(parameters['endDt'] === undefined){
            deferred.reject(new Error('Missing required  parameter: endDt'));
            return deferred.promise;
        }
 
        
            path = path.replace('{waitInterval}', parameters['waitInterval']);
        
        


        if(parameters['waitInterval'] === undefined){
            deferred.reject(new Error('Missing required  parameter: waitInterval'));
            return deferred.promise;
        }
 
        
            path = path.replace('{clientTimeZone}', parameters['clientTimeZone']);
        
        


        if(parameters['clientTimeZone'] === undefined){
            deferred.reject(new Error('Missing required  parameter: clientTimeZone'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetCallCostByExtensionGroupData
 * @method
 * @name Xapi#GetCallCostByExtensionGroupData
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.periodFrom - Usage: periodFrom={periodFrom}
     * @param {string} parameters.periodTo - Usage: periodTo={periodTo}
     * @param {string} parameters.groupFilter - Usage: groupFilter={groupFilter}
     * @param {integer} parameters.callClass - Usage: callClass={callClass}
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetCallCostByExtensionGroupData = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ReportCallCostByExtensionGroup/Pbx.GetCallCostByExtensionGroupData(periodFrom={periodFrom},periodTo={periodTo},groupFilter={groupFilter},callClass={callClass})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{periodFrom}', parameters['periodFrom']);
        
        


        if(parameters['periodFrom'] === undefined){
            deferred.reject(new Error('Missing required  parameter: periodFrom'));
            return deferred.promise;
        }
 
        
            path = path.replace('{periodTo}', parameters['periodTo']);
        
        


        if(parameters['periodTo'] === undefined){
            deferred.reject(new Error('Missing required  parameter: periodTo'));
            return deferred.promise;
        }
 
        
            path = path.replace('{groupFilter}', parameters['groupFilter']);
        
        


        if(parameters['groupFilter'] === undefined){
            deferred.reject(new Error('Missing required  parameter: groupFilter'));
            return deferred.promise;
        }
 
        
            path = path.replace('{callClass}', parameters['callClass']);
        
        


        if(parameters['callClass'] === undefined){
            deferred.reject(new Error('Missing required  parameter: callClass'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function DownloadCallCostByExtensionGroup
 * @method
 * @name Xapi#DownloadCallCostByExtensionGroup
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.periodFrom - Usage: periodFrom={periodFrom}
     * @param {string} parameters.periodTo - Usage: periodTo={periodTo}
     * @param {string} parameters.groupFilter - Usage: groupFilter={groupFilter}
     * @param {integer} parameters.callClass - Usage: callClass={callClass}
     * @param {string} parameters.clientTimeZone - Usage: clientTimeZone={clientTimeZone}
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.DownloadCallCostByExtensionGroup = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ReportCallCostByExtensionGroup/Pbx.DownloadCallCostByExtensionGroup(periodFrom={periodFrom},periodTo={periodTo},groupFilter={groupFilter},callClass={callClass},clientTimeZone={clientTimeZone})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{periodFrom}', parameters['periodFrom']);
        
        


        if(parameters['periodFrom'] === undefined){
            deferred.reject(new Error('Missing required  parameter: periodFrom'));
            return deferred.promise;
        }
 
        
            path = path.replace('{periodTo}', parameters['periodTo']);
        
        


        if(parameters['periodTo'] === undefined){
            deferred.reject(new Error('Missing required  parameter: periodTo'));
            return deferred.promise;
        }
 
        
            path = path.replace('{groupFilter}', parameters['groupFilter']);
        
        


        if(parameters['groupFilter'] === undefined){
            deferred.reject(new Error('Missing required  parameter: groupFilter'));
            return deferred.promise;
        }
 
        
            path = path.replace('{callClass}', parameters['callClass']);
        
        


        if(parameters['callClass'] === undefined){
            deferred.reject(new Error('Missing required  parameter: callClass'));
            return deferred.promise;
        }
 
        
            path = path.replace('{clientTimeZone}', parameters['clientTimeZone']);
        
        


        if(parameters['clientTimeZone'] === undefined){
            deferred.reject(new Error('Missing required  parameter: clientTimeZone'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetCallDistributionData
 * @method
 * @name Xapi#GetCallDistributionData
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.chartDate - Usage: chartDate={chartDate}
     * @param {string} parameters.chartBy - Usage: chartBy={chartBy}
     * @param {boolean} parameters.includeInternalCalls - Usage: includeInternalCalls={includeInternalCalls}
     * @param {boolean} parameters.includeQueueCalls - Usage: includeQueueCalls={includeQueueCalls}
     * @param {string} parameters.queueDnStr - Usage: queueDnStr={queueDnStr}
     * @param {string} parameters.groupStr - Usage: groupStr={groupStr}
     * @param {string} parameters.clientTimeZone - Usage: clientTimeZone={clientTimeZone}
     * @param {string} parameters.waitInterval - Usage: waitInterval={waitInterval}
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetCallDistributionData = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ReportCallDistribution/Pbx.GetCallDistributionData(chartDate={chartDate},chartBy={chartBy},includeInternalCalls={includeInternalCalls},includeQueueCalls={includeQueueCalls},queueDnStr={queueDnStr},groupStr={groupStr},clientTimeZone={clientTimeZone},waitInterval={waitInterval})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{chartDate}', parameters['chartDate']);
        
        


        if(parameters['chartDate'] === undefined){
            deferred.reject(new Error('Missing required  parameter: chartDate'));
            return deferred.promise;
        }
 
        
            path = path.replace('{chartBy}', parameters['chartBy']);
        
        


        if(parameters['chartBy'] === undefined){
            deferred.reject(new Error('Missing required  parameter: chartBy'));
            return deferred.promise;
        }
 
        
            path = path.replace('{includeInternalCalls}', parameters['includeInternalCalls']);
        
        


        if(parameters['includeInternalCalls'] === undefined){
            deferred.reject(new Error('Missing required  parameter: includeInternalCalls'));
            return deferred.promise;
        }
 
        
            path = path.replace('{includeQueueCalls}', parameters['includeQueueCalls']);
        
        


        if(parameters['includeQueueCalls'] === undefined){
            deferred.reject(new Error('Missing required  parameter: includeQueueCalls'));
            return deferred.promise;
        }
 
        
            path = path.replace('{queueDnStr}', parameters['queueDnStr']);
        
        


        if(parameters['queueDnStr'] === undefined){
            deferred.reject(new Error('Missing required  parameter: queueDnStr'));
            return deferred.promise;
        }
 
        
            path = path.replace('{groupStr}', parameters['groupStr']);
        
        


        if(parameters['groupStr'] === undefined){
            deferred.reject(new Error('Missing required  parameter: groupStr'));
            return deferred.promise;
        }
 
        
            path = path.replace('{clientTimeZone}', parameters['clientTimeZone']);
        
        


        if(parameters['clientTimeZone'] === undefined){
            deferred.reject(new Error('Missing required  parameter: clientTimeZone'));
            return deferred.promise;
        }
 
        
            path = path.replace('{waitInterval}', parameters['waitInterval']);
        
        


        if(parameters['waitInterval'] === undefined){
            deferred.reject(new Error('Missing required  parameter: waitInterval'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function DownloadCallDistributionReport
 * @method
 * @name Xapi#DownloadCallDistributionReport
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.chartDate - Usage: chartDate={chartDate}
     * @param {string} parameters.chartBy - Usage: chartBy={chartBy}
     * @param {boolean} parameters.includeInternalCalls - Usage: includeInternalCalls={includeInternalCalls}
     * @param {boolean} parameters.includeQueueCalls - Usage: includeQueueCalls={includeQueueCalls}
     * @param {string} parameters.queueDnStr - Usage: queueDnStr={queueDnStr}
     * @param {string} parameters.groupStr - Usage: groupStr={groupStr}
     * @param {string} parameters.clientTimeZone - Usage: clientTimeZone={clientTimeZone}
     * @param {string} parameters.waitInterval - Usage: waitInterval={waitInterval}
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.DownloadCallDistributionReport = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ReportCallDistribution/Pbx.DownloadCallDistributionReport(chartDate={chartDate},chartBy={chartBy},includeInternalCalls={includeInternalCalls},includeQueueCalls={includeQueueCalls},queueDnStr={queueDnStr},groupStr={groupStr},clientTimeZone={clientTimeZone},waitInterval={waitInterval})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{chartDate}', parameters['chartDate']);
        
        


        if(parameters['chartDate'] === undefined){
            deferred.reject(new Error('Missing required  parameter: chartDate'));
            return deferred.promise;
        }
 
        
            path = path.replace('{chartBy}', parameters['chartBy']);
        
        


        if(parameters['chartBy'] === undefined){
            deferred.reject(new Error('Missing required  parameter: chartBy'));
            return deferred.promise;
        }
 
        
            path = path.replace('{includeInternalCalls}', parameters['includeInternalCalls']);
        
        


        if(parameters['includeInternalCalls'] === undefined){
            deferred.reject(new Error('Missing required  parameter: includeInternalCalls'));
            return deferred.promise;
        }
 
        
            path = path.replace('{includeQueueCalls}', parameters['includeQueueCalls']);
        
        


        if(parameters['includeQueueCalls'] === undefined){
            deferred.reject(new Error('Missing required  parameter: includeQueueCalls'));
            return deferred.promise;
        }
 
        
            path = path.replace('{queueDnStr}', parameters['queueDnStr']);
        
        


        if(parameters['queueDnStr'] === undefined){
            deferred.reject(new Error('Missing required  parameter: queueDnStr'));
            return deferred.promise;
        }
 
        
            path = path.replace('{groupStr}', parameters['groupStr']);
        
        


        if(parameters['groupStr'] === undefined){
            deferred.reject(new Error('Missing required  parameter: groupStr'));
            return deferred.promise;
        }
 
        
            path = path.replace('{clientTimeZone}', parameters['clientTimeZone']);
        
        


        if(parameters['clientTimeZone'] === undefined){
            deferred.reject(new Error('Missing required  parameter: clientTimeZone'));
            return deferred.promise;
        }
 
        
            path = path.replace('{waitInterval}', parameters['waitInterval']);
        
        


        if(parameters['waitInterval'] === undefined){
            deferred.reject(new Error('Missing required  parameter: waitInterval'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetCallLogData
 * @method
 * @name Xapi#GetCallLogData
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.periodFrom - Usage: periodFrom={periodFrom}
     * @param {string} parameters.periodTo - Usage: periodTo={periodTo}
     * @param {integer} parameters.sourceType - Usage: sourceType={sourceType}
     * @param {string} parameters.sourceFilter - Usage: sourceFilter={sourceFilter}
     * @param {integer} parameters.destinationType - Usage: destinationType={destinationType}
     * @param {string} parameters.destinationFilter - Usage: destinationFilter={destinationFilter}
     * @param {integer} parameters.callsType - Usage: callsType={callsType}
     * @param {integer} parameters.callTimeFilterType - Usage: callTimeFilterType={callTimeFilterType}
     * @param {string} parameters.callTimeFilterFrom - Usage: callTimeFilterFrom={callTimeFilterFrom}
     * @param {string} parameters.callTimeFilterTo - Usage: callTimeFilterTo={callTimeFilterTo}
     * @param {boolean} parameters.hidePcalls - Usage: hidePcalls={hidePcalls}
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetCallLogData = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ReportCallLogData/Pbx.GetCallLogData(periodFrom={periodFrom},periodTo={periodTo},sourceType={sourceType},sourceFilter={sourceFilter},destinationType={destinationType},destinationFilter={destinationFilter},callsType={callsType},callTimeFilterType={callTimeFilterType},callTimeFilterFrom={callTimeFilterFrom},callTimeFilterTo={callTimeFilterTo},hidePcalls={hidePcalls})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{periodFrom}', parameters['periodFrom']);
        
        


        if(parameters['periodFrom'] === undefined){
            deferred.reject(new Error('Missing required  parameter: periodFrom'));
            return deferred.promise;
        }
 
        
            path = path.replace('{periodTo}', parameters['periodTo']);
        
        


        if(parameters['periodTo'] === undefined){
            deferred.reject(new Error('Missing required  parameter: periodTo'));
            return deferred.promise;
        }
 
        
            path = path.replace('{sourceType}', parameters['sourceType']);
        
        


        if(parameters['sourceType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: sourceType'));
            return deferred.promise;
        }
 
        
            path = path.replace('{sourceFilter}', parameters['sourceFilter']);
        
        


        if(parameters['sourceFilter'] === undefined){
            deferred.reject(new Error('Missing required  parameter: sourceFilter'));
            return deferred.promise;
        }
 
        
            path = path.replace('{destinationType}', parameters['destinationType']);
        
        


        if(parameters['destinationType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: destinationType'));
            return deferred.promise;
        }
 
        
            path = path.replace('{destinationFilter}', parameters['destinationFilter']);
        
        


        if(parameters['destinationFilter'] === undefined){
            deferred.reject(new Error('Missing required  parameter: destinationFilter'));
            return deferred.promise;
        }
 
        
            path = path.replace('{callsType}', parameters['callsType']);
        
        


        if(parameters['callsType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: callsType'));
            return deferred.promise;
        }
 
        
            path = path.replace('{callTimeFilterType}', parameters['callTimeFilterType']);
        
        


        if(parameters['callTimeFilterType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: callTimeFilterType'));
            return deferred.promise;
        }
 
        
            path = path.replace('{callTimeFilterFrom}', parameters['callTimeFilterFrom']);
        
        


        if(parameters['callTimeFilterFrom'] === undefined){
            deferred.reject(new Error('Missing required  parameter: callTimeFilterFrom'));
            return deferred.promise;
        }
 
        
            path = path.replace('{callTimeFilterTo}', parameters['callTimeFilterTo']);
        
        


        if(parameters['callTimeFilterTo'] === undefined){
            deferred.reject(new Error('Missing required  parameter: callTimeFilterTo'));
            return deferred.promise;
        }
 
        
            path = path.replace('{hidePcalls}', parameters['hidePcalls']);
        
        


        if(parameters['hidePcalls'] === undefined){
            deferred.reject(new Error('Missing required  parameter: hidePcalls'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function DownloadCallLog
 * @method
 * @name Xapi#DownloadCallLog
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.periodFrom - Usage: periodFrom={periodFrom}
     * @param {string} parameters.periodTo - Usage: periodTo={periodTo}
     * @param {integer} parameters.sourceType - Usage: sourceType={sourceType}
     * @param {string} parameters.sourceFilter - Usage: sourceFilter={sourceFilter}
     * @param {integer} parameters.destinationType - Usage: destinationType={destinationType}
     * @param {string} parameters.destinationFilter - Usage: destinationFilter={destinationFilter}
     * @param {integer} parameters.callsType - Usage: callsType={callsType}
     * @param {integer} parameters.callTimeFilterType - Usage: callTimeFilterType={callTimeFilterType}
     * @param {string} parameters.callTimeFilterFrom - Usage: callTimeFilterFrom={callTimeFilterFrom}
     * @param {string} parameters.callTimeFilterTo - Usage: callTimeFilterTo={callTimeFilterTo}
     * @param {boolean} parameters.hidePcalls - Usage: hidePcalls={hidePcalls}
     * @param {string} parameters.clientTimeZone - Usage: clientTimeZone={clientTimeZone}
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.DownloadCallLog = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ReportCallLogData/Pbx.DownloadCallLog(periodFrom={periodFrom},periodTo={periodTo},sourceType={sourceType},sourceFilter={sourceFilter},destinationType={destinationType},destinationFilter={destinationFilter},callsType={callsType},callTimeFilterType={callTimeFilterType},callTimeFilterFrom={callTimeFilterFrom},callTimeFilterTo={callTimeFilterTo},hidePcalls={hidePcalls},clientTimeZone={clientTimeZone})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{periodFrom}', parameters['periodFrom']);
        
        


        if(parameters['periodFrom'] === undefined){
            deferred.reject(new Error('Missing required  parameter: periodFrom'));
            return deferred.promise;
        }
 
        
            path = path.replace('{periodTo}', parameters['periodTo']);
        
        


        if(parameters['periodTo'] === undefined){
            deferred.reject(new Error('Missing required  parameter: periodTo'));
            return deferred.promise;
        }
 
        
            path = path.replace('{sourceType}', parameters['sourceType']);
        
        


        if(parameters['sourceType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: sourceType'));
            return deferred.promise;
        }
 
        
            path = path.replace('{sourceFilter}', parameters['sourceFilter']);
        
        


        if(parameters['sourceFilter'] === undefined){
            deferred.reject(new Error('Missing required  parameter: sourceFilter'));
            return deferred.promise;
        }
 
        
            path = path.replace('{destinationType}', parameters['destinationType']);
        
        


        if(parameters['destinationType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: destinationType'));
            return deferred.promise;
        }
 
        
            path = path.replace('{destinationFilter}', parameters['destinationFilter']);
        
        


        if(parameters['destinationFilter'] === undefined){
            deferred.reject(new Error('Missing required  parameter: destinationFilter'));
            return deferred.promise;
        }
 
        
            path = path.replace('{callsType}', parameters['callsType']);
        
        


        if(parameters['callsType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: callsType'));
            return deferred.promise;
        }
 
        
            path = path.replace('{callTimeFilterType}', parameters['callTimeFilterType']);
        
        


        if(parameters['callTimeFilterType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: callTimeFilterType'));
            return deferred.promise;
        }
 
        
            path = path.replace('{callTimeFilterFrom}', parameters['callTimeFilterFrom']);
        
        


        if(parameters['callTimeFilterFrom'] === undefined){
            deferred.reject(new Error('Missing required  parameter: callTimeFilterFrom'));
            return deferred.promise;
        }
 
        
            path = path.replace('{callTimeFilterTo}', parameters['callTimeFilterTo']);
        
        


        if(parameters['callTimeFilterTo'] === undefined){
            deferred.reject(new Error('Missing required  parameter: callTimeFilterTo'));
            return deferred.promise;
        }
 
        
            path = path.replace('{hidePcalls}', parameters['hidePcalls']);
        
        


        if(parameters['hidePcalls'] === undefined){
            deferred.reject(new Error('Missing required  parameter: hidePcalls'));
            return deferred.promise;
        }
 
        
            path = path.replace('{clientTimeZone}', parameters['clientTimeZone']);
        
        


        if(parameters['clientTimeZone'] === undefined){
            deferred.reject(new Error('Missing required  parameter: clientTimeZone'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetCallQualityReport
 * @method
 * @name Xapi#GetCallQualityReport
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.callId - Usage: call_id={call_id}
     * @param {string} parameters.srcNumber - Usage: srcNumber={srcNumber}
     * @param {string} parameters.dstNumber - Usage: dstNumber={dstNumber}
     * @param {string} parameters.srcCallerId - Usage: srcCallerId={srcCallerId}
     * @param {string} parameters.dstCallerId - Usage: dstCallerId={dstCallerId}
 */
 Xapi.prototype.GetCallQualityReport = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ReportCallLogData/Pbx.GetCallQualityReport(call_id={call_id},srcNumber={srcNumber},dstNumber={dstNumber},srcCallerId={srcCallerId},dstCallerId={dstCallerId})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{call_id}', parameters['callId']);
        
        


        if(parameters['callId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: callId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{srcNumber}', parameters['srcNumber']);
        
        


        if(parameters['srcNumber'] === undefined){
            deferred.reject(new Error('Missing required  parameter: srcNumber'));
            return deferred.promise;
        }
 
        
            path = path.replace('{dstNumber}', parameters['dstNumber']);
        
        


        if(parameters['dstNumber'] === undefined){
            deferred.reject(new Error('Missing required  parameter: dstNumber'));
            return deferred.promise;
        }
 
        
            path = path.replace('{srcCallerId}', parameters['srcCallerId']);
        
        


        if(parameters['srcCallerId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: srcCallerId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{dstCallerId}', parameters['dstCallerId']);
        
        


        if(parameters['dstCallerId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: dstCallerId'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetDetailedQueueStatisticsData
 * @method
 * @name Xapi#GetDetailedQueueStatisticsData
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.queueDnStr - Usage: queueDnStr={queueDnStr}
     * @param {string} parameters.startDt - Usage: startDt={startDt}
     * @param {string} parameters.endDt - Usage: endDt={endDt}
     * @param {string} parameters.waitInterval - Usage: waitInterval={waitInterval}
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetDetailedQueueStatisticsData = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ReportDetailedQueueStatistics/Pbx.GetDetailedQueueStatisticsData(queueDnStr={queueDnStr},startDt={startDt},endDt={endDt},waitInterval={waitInterval})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{queueDnStr}', parameters['queueDnStr']);
        
        


        if(parameters['queueDnStr'] === undefined){
            deferred.reject(new Error('Missing required  parameter: queueDnStr'));
            return deferred.promise;
        }
 
        
            path = path.replace('{startDt}', parameters['startDt']);
        
        


        if(parameters['startDt'] === undefined){
            deferred.reject(new Error('Missing required  parameter: startDt'));
            return deferred.promise;
        }
 
        
            path = path.replace('{endDt}', parameters['endDt']);
        
        


        if(parameters['endDt'] === undefined){
            deferred.reject(new Error('Missing required  parameter: endDt'));
            return deferred.promise;
        }
 
        
            path = path.replace('{waitInterval}', parameters['waitInterval']);
        
        


        if(parameters['waitInterval'] === undefined){
            deferred.reject(new Error('Missing required  parameter: waitInterval'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function DownloadDetailedQueueStatistics
 * @method
 * @name Xapi#DownloadDetailedQueueStatistics
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.queueDnStr - Usage: queueDnStr={queueDnStr}
     * @param {string} parameters.startDt - Usage: startDt={startDt}
     * @param {string} parameters.endDt - Usage: endDt={endDt}
     * @param {string} parameters.waitInterval - Usage: waitInterval={waitInterval}
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.DownloadDetailedQueueStatistics = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ReportDetailedQueueStatistics/Pbx.DownloadDetailedQueueStatistics(queueDnStr={queueDnStr},startDt={startDt},endDt={endDt},waitInterval={waitInterval})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{queueDnStr}', parameters['queueDnStr']);
        
        


        if(parameters['queueDnStr'] === undefined){
            deferred.reject(new Error('Missing required  parameter: queueDnStr'));
            return deferred.promise;
        }
 
        
            path = path.replace('{startDt}', parameters['startDt']);
        
        


        if(parameters['startDt'] === undefined){
            deferred.reject(new Error('Missing required  parameter: startDt'));
            return deferred.promise;
        }
 
        
            path = path.replace('{endDt}', parameters['endDt']);
        
        


        if(parameters['endDt'] === undefined){
            deferred.reject(new Error('Missing required  parameter: endDt'));
            return deferred.promise;
        }
 
        
            path = path.replace('{waitInterval}', parameters['waitInterval']);
        
        


        if(parameters['waitInterval'] === undefined){
            deferred.reject(new Error('Missing required  parameter: waitInterval'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetExtensionsStatisticsByRingGroupsData
 * @method
 * @name Xapi#GetExtensionsStatisticsByRingGroupsData
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.periodFrom - Usage: periodFrom={periodFrom}
     * @param {string} parameters.periodTo - Usage: periodTo={periodTo}
     * @param {string} parameters.ringGroupDns - Usage: ringGroupDns={ringGroupDns}
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetExtensionsStatisticsByRingGroupsData = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ReportExtensionsStatisticsByRingGroups/Pbx.GetExtensionsStatisticsByRingGroupsData(periodFrom={periodFrom},periodTo={periodTo},ringGroupDns={ringGroupDns})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{periodFrom}', parameters['periodFrom']);
        
        


        if(parameters['periodFrom'] === undefined){
            deferred.reject(new Error('Missing required  parameter: periodFrom'));
            return deferred.promise;
        }
 
        
            path = path.replace('{periodTo}', parameters['periodTo']);
        
        


        if(parameters['periodTo'] === undefined){
            deferred.reject(new Error('Missing required  parameter: periodTo'));
            return deferred.promise;
        }
 
        
            path = path.replace('{ringGroupDns}', parameters['ringGroupDns']);
        
        


        if(parameters['ringGroupDns'] === undefined){
            deferred.reject(new Error('Missing required  parameter: ringGroupDns'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function DownloadExtensionsStatisticsByRingGroups
 * @method
 * @name Xapi#DownloadExtensionsStatisticsByRingGroups
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.periodFrom - Usage: periodFrom={periodFrom}
     * @param {string} parameters.periodTo - Usage: periodTo={periodTo}
     * @param {string} parameters.ringGroupDns - Usage: ringGroupDns={ringGroupDns}
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.DownloadExtensionsStatisticsByRingGroups = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ReportExtensionsStatisticsByRingGroups/Pbx.DownloadExtensionsStatisticsByRingGroups(periodFrom={periodFrom},periodTo={periodTo},ringGroupDns={ringGroupDns})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{periodFrom}', parameters['periodFrom']);
        
        


        if(parameters['periodFrom'] === undefined){
            deferred.reject(new Error('Missing required  parameter: periodFrom'));
            return deferred.promise;
        }
 
        
            path = path.replace('{periodTo}', parameters['periodTo']);
        
        


        if(parameters['periodTo'] === undefined){
            deferred.reject(new Error('Missing required  parameter: periodTo'));
            return deferred.promise;
        }
 
        
            path = path.replace('{ringGroupDns}', parameters['ringGroupDns']);
        
        


        if(parameters['ringGroupDns'] === undefined){
            deferred.reject(new Error('Missing required  parameter: ringGroupDns'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetExtensionStatisticsByGroupData
 * @method
 * @name Xapi#GetExtensionStatisticsByGroupData
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.groupNumber - Usage: groupNumber={groupNumber}
     * @param {string} parameters.periodFrom - Usage: periodFrom={periodFrom}
     * @param {string} parameters.periodTo - Usage: periodTo={periodTo}
     * @param {integer} parameters.callArea - Usage: callArea={callArea}
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetExtensionStatisticsByGroupData = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ReportExtensionStatisticsByGroup/Pbx.GetExtensionStatisticsByGroupData(groupNumber={groupNumber},periodFrom={periodFrom},periodTo={periodTo},callArea={callArea})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{groupNumber}', parameters['groupNumber']);
        
        


        if(parameters['groupNumber'] === undefined){
            deferred.reject(new Error('Missing required  parameter: groupNumber'));
            return deferred.promise;
        }
 
        
            path = path.replace('{periodFrom}', parameters['periodFrom']);
        
        


        if(parameters['periodFrom'] === undefined){
            deferred.reject(new Error('Missing required  parameter: periodFrom'));
            return deferred.promise;
        }
 
        
            path = path.replace('{periodTo}', parameters['periodTo']);
        
        


        if(parameters['periodTo'] === undefined){
            deferred.reject(new Error('Missing required  parameter: periodTo'));
            return deferred.promise;
        }
 
        
            path = path.replace('{callArea}', parameters['callArea']);
        
        


        if(parameters['callArea'] === undefined){
            deferred.reject(new Error('Missing required  parameter: callArea'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function DownloadExtensionStatisticsByGroup
 * @method
 * @name Xapi#DownloadExtensionStatisticsByGroup
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.groupNumber - Usage: groupNumber={groupNumber}
     * @param {string} parameters.periodFrom - Usage: periodFrom={periodFrom}
     * @param {string} parameters.periodTo - Usage: periodTo={periodTo}
     * @param {integer} parameters.callArea - Usage: callArea={callArea}
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.DownloadExtensionStatisticsByGroup = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ReportExtensionStatisticsByGroup/Pbx.DownloadExtensionStatisticsByGroup(groupNumber={groupNumber},periodFrom={periodFrom},periodTo={periodTo},callArea={callArea})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{groupNumber}', parameters['groupNumber']);
        
        


        if(parameters['groupNumber'] === undefined){
            deferred.reject(new Error('Missing required  parameter: groupNumber'));
            return deferred.promise;
        }
 
        
            path = path.replace('{periodFrom}', parameters['periodFrom']);
        
        


        if(parameters['periodFrom'] === undefined){
            deferred.reject(new Error('Missing required  parameter: periodFrom'));
            return deferred.promise;
        }
 
        
            path = path.replace('{periodTo}', parameters['periodTo']);
        
        


        if(parameters['periodTo'] === undefined){
            deferred.reject(new Error('Missing required  parameter: periodTo'));
            return deferred.promise;
        }
 
        
            path = path.replace('{callArea}', parameters['callArea']);
        
        


        if(parameters['callArea'] === undefined){
            deferred.reject(new Error('Missing required  parameter: callArea'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetExtensionStatisticsData
 * @method
 * @name Xapi#GetExtensionStatisticsData
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.periodFrom - Usage: periodFrom={periodFrom}
     * @param {string} parameters.periodTo - Usage: periodTo={periodTo}
     * @param {string} parameters.extensionFilter - Usage: extensionFilter={extensionFilter}
     * @param {integer} parameters.callArea - Usage: callArea={callArea}
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetExtensionStatisticsData = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ReportExtensionStatistics/Pbx.GetExtensionStatisticsData(periodFrom={periodFrom},periodTo={periodTo},extensionFilter={extensionFilter},callArea={callArea})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{periodFrom}', parameters['periodFrom']);
        
        


        if(parameters['periodFrom'] === undefined){
            deferred.reject(new Error('Missing required  parameter: periodFrom'));
            return deferred.promise;
        }
 
        
            path = path.replace('{periodTo}', parameters['periodTo']);
        
        


        if(parameters['periodTo'] === undefined){
            deferred.reject(new Error('Missing required  parameter: periodTo'));
            return deferred.promise;
        }
 
        
            path = path.replace('{extensionFilter}', parameters['extensionFilter']);
        
        


        if(parameters['extensionFilter'] === undefined){
            deferred.reject(new Error('Missing required  parameter: extensionFilter'));
            return deferred.promise;
        }
 
        
            path = path.replace('{callArea}', parameters['callArea']);
        
        


        if(parameters['callArea'] === undefined){
            deferred.reject(new Error('Missing required  parameter: callArea'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function DownloadExtensionStatistics
 * @method
 * @name Xapi#DownloadExtensionStatistics
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.periodFrom - Usage: periodFrom={periodFrom}
     * @param {string} parameters.periodTo - Usage: periodTo={periodTo}
     * @param {string} parameters.extensionFilter - Usage: extensionFilter={extensionFilter}
     * @param {integer} parameters.callArea - Usage: callArea={callArea}
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.DownloadExtensionStatistics = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ReportExtensionStatistics/Pbx.DownloadExtensionStatistics(periodFrom={periodFrom},periodTo={periodTo},extensionFilter={extensionFilter},callArea={callArea})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{periodFrom}', parameters['periodFrom']);
        
        


        if(parameters['periodFrom'] === undefined){
            deferred.reject(new Error('Missing required  parameter: periodFrom'));
            return deferred.promise;
        }
 
        
            path = path.replace('{periodTo}', parameters['periodTo']);
        
        


        if(parameters['periodTo'] === undefined){
            deferred.reject(new Error('Missing required  parameter: periodTo'));
            return deferred.promise;
        }
 
        
            path = path.replace('{extensionFilter}', parameters['extensionFilter']);
        
        


        if(parameters['extensionFilter'] === undefined){
            deferred.reject(new Error('Missing required  parameter: extensionFilter'));
            return deferred.promise;
        }
 
        
            path = path.replace('{callArea}', parameters['callArea']);
        
        


        if(parameters['callArea'] === undefined){
            deferred.reject(new Error('Missing required  parameter: callArea'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entities from ReportGroup
 * @method
 * @name Xapi#ListReportGroup
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListReportGroup = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ReportGroup';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetInboundRulesData
 * @method
 * @name Xapi#GetInboundRulesData
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetInboundRulesData = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ReportInboundRules/Pbx.GetInboundRulesData()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function DownloadInboundRules
 * @method
 * @name Xapi#DownloadInboundRules
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.DownloadInboundRules = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ReportInboundRules/Pbx.DownloadInboundRules()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetQueueAgentsChatStatisticsData
 * @method
 * @name Xapi#GetQueueAgentsChatStatisticsData
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.queueDnStr - Usage: queueDnStr={queueDnStr}
     * @param {string} parameters.startDt - Usage: startDt={startDt}
     * @param {string} parameters.endDt - Usage: endDt={endDt}
     * @param {integer} parameters.participantType - Usage: participantType={participantType}
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetQueueAgentsChatStatisticsData = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ReportQueueAgentsChatStatistics/Pbx.GetQueueAgentsChatStatisticsData(queueDnStr={queueDnStr},startDt={startDt},endDt={endDt},participantType={participantType})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{queueDnStr}', parameters['queueDnStr']);
        
        


        if(parameters['queueDnStr'] === undefined){
            deferred.reject(new Error('Missing required  parameter: queueDnStr'));
            return deferred.promise;
        }
 
        
            path = path.replace('{startDt}', parameters['startDt']);
        
        


        if(parameters['startDt'] === undefined){
            deferred.reject(new Error('Missing required  parameter: startDt'));
            return deferred.promise;
        }
 
        
            path = path.replace('{endDt}', parameters['endDt']);
        
        


        if(parameters['endDt'] === undefined){
            deferred.reject(new Error('Missing required  parameter: endDt'));
            return deferred.promise;
        }
 
        
            path = path.replace('{participantType}', parameters['participantType']);
        
        


        if(parameters['participantType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: participantType'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function DownloadQueueAgentsChatStatistics
 * @method
 * @name Xapi#DownloadQueueAgentsChatStatistics
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.queueDnStr - Usage: queueDnStr={queueDnStr}
     * @param {string} parameters.startDt - Usage: startDt={startDt}
     * @param {string} parameters.endDt - Usage: endDt={endDt}
     * @param {integer} parameters.participantType - Usage: participantType={participantType}
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.DownloadQueueAgentsChatStatistics = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ReportQueueAgentsChatStatistics/Pbx.DownloadQueueAgentsChatStatistics(queueDnStr={queueDnStr},startDt={startDt},endDt={endDt},participantType={participantType})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{queueDnStr}', parameters['queueDnStr']);
        
        


        if(parameters['queueDnStr'] === undefined){
            deferred.reject(new Error('Missing required  parameter: queueDnStr'));
            return deferred.promise;
        }
 
        
            path = path.replace('{startDt}', parameters['startDt']);
        
        


        if(parameters['startDt'] === undefined){
            deferred.reject(new Error('Missing required  parameter: startDt'));
            return deferred.promise;
        }
 
        
            path = path.replace('{endDt}', parameters['endDt']);
        
        


        if(parameters['endDt'] === undefined){
            deferred.reject(new Error('Missing required  parameter: endDt'));
            return deferred.promise;
        }
 
        
            path = path.replace('{participantType}', parameters['participantType']);
        
        


        if(parameters['participantType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: participantType'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetQueueAgentsChatStatisticsTotalsData
 * @method
 * @name Xapi#GetQueueAgentsChatStatisticsTotalsData
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.queueDnStr - Usage: queueDnStr={queueDnStr}
     * @param {string} parameters.startDt - Usage: startDt={startDt}
     * @param {string} parameters.endDt - Usage: endDt={endDt}
     * @param {integer} parameters.participantType - Usage: participantType={participantType}
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetQueueAgentsChatStatisticsTotalsData = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ReportQueueAgentsChatStatisticsTotals/Pbx.GetQueueAgentsChatStatisticsTotalsData(queueDnStr={queueDnStr},startDt={startDt},endDt={endDt},participantType={participantType})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{queueDnStr}', parameters['queueDnStr']);
        
        


        if(parameters['queueDnStr'] === undefined){
            deferred.reject(new Error('Missing required  parameter: queueDnStr'));
            return deferred.promise;
        }
 
        
            path = path.replace('{startDt}', parameters['startDt']);
        
        


        if(parameters['startDt'] === undefined){
            deferred.reject(new Error('Missing required  parameter: startDt'));
            return deferred.promise;
        }
 
        
            path = path.replace('{endDt}', parameters['endDt']);
        
        


        if(parameters['endDt'] === undefined){
            deferred.reject(new Error('Missing required  parameter: endDt'));
            return deferred.promise;
        }
 
        
            path = path.replace('{participantType}', parameters['participantType']);
        
        


        if(parameters['participantType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: participantType'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function DownloadQueueAgentsChatStatisticsTotals
 * @method
 * @name Xapi#DownloadQueueAgentsChatStatisticsTotals
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.queueDnStr - Usage: queueDnStr={queueDnStr}
     * @param {string} parameters.startDt - Usage: startDt={startDt}
     * @param {string} parameters.endDt - Usage: endDt={endDt}
     * @param {integer} parameters.participantType - Usage: participantType={participantType}
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.DownloadQueueAgentsChatStatisticsTotals = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ReportQueueAgentsChatStatisticsTotals/Pbx.DownloadQueueAgentsChatStatisticsTotals(queueDnStr={queueDnStr},startDt={startDt},endDt={endDt},participantType={participantType})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{queueDnStr}', parameters['queueDnStr']);
        
        


        if(parameters['queueDnStr'] === undefined){
            deferred.reject(new Error('Missing required  parameter: queueDnStr'));
            return deferred.promise;
        }
 
        
            path = path.replace('{startDt}', parameters['startDt']);
        
        


        if(parameters['startDt'] === undefined){
            deferred.reject(new Error('Missing required  parameter: startDt'));
            return deferred.promise;
        }
 
        
            path = path.replace('{endDt}', parameters['endDt']);
        
        


        if(parameters['endDt'] === undefined){
            deferred.reject(new Error('Missing required  parameter: endDt'));
            return deferred.promise;
        }
 
        
            path = path.replace('{participantType}', parameters['participantType']);
        
        


        if(parameters['participantType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: participantType'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetQueueAnsweredCallsByWaitTimeData
 * @method
 * @name Xapi#GetQueueAnsweredCallsByWaitTimeData
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.queueDnStr - Usage: queueDnStr={queueDnStr}
     * @param {string} parameters.startDt - Usage: startDt={startDt}
     * @param {string} parameters.endDt - Usage: endDt={endDt}
     * @param {string} parameters.answerInterval - Usage: answerInterval={answerInterval}
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetQueueAnsweredCallsByWaitTimeData = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ReportQueueAnsweredCallsByWaitTime/Pbx.GetQueueAnsweredCallsByWaitTimeData(queueDnStr={queueDnStr},startDt={startDt},endDt={endDt},answerInterval={answerInterval})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{queueDnStr}', parameters['queueDnStr']);
        
        


        if(parameters['queueDnStr'] === undefined){
            deferred.reject(new Error('Missing required  parameter: queueDnStr'));
            return deferred.promise;
        }
 
        
            path = path.replace('{startDt}', parameters['startDt']);
        
        


        if(parameters['startDt'] === undefined){
            deferred.reject(new Error('Missing required  parameter: startDt'));
            return deferred.promise;
        }
 
        
            path = path.replace('{endDt}', parameters['endDt']);
        
        


        if(parameters['endDt'] === undefined){
            deferred.reject(new Error('Missing required  parameter: endDt'));
            return deferred.promise;
        }
 
        
            path = path.replace('{answerInterval}', parameters['answerInterval']);
        
        


        if(parameters['answerInterval'] === undefined){
            deferred.reject(new Error('Missing required  parameter: answerInterval'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function DownloadQueueAnsweredCallsByWaitTime
 * @method
 * @name Xapi#DownloadQueueAnsweredCallsByWaitTime
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.queueDnStr - Usage: queueDnStr={queueDnStr}
     * @param {string} parameters.startDt - Usage: startDt={startDt}
     * @param {string} parameters.endDt - Usage: endDt={endDt}
     * @param {string} parameters.answerInterval - Usage: answerInterval={answerInterval}
     * @param {string} parameters.clientTimeZone - Usage: clientTimeZone={clientTimeZone}
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.DownloadQueueAnsweredCallsByWaitTime = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ReportQueueAnsweredCallsByWaitTime/Pbx.DownloadQueueAnsweredCallsByWaitTime(queueDnStr={queueDnStr},startDt={startDt},endDt={endDt},answerInterval={answerInterval},clientTimeZone={clientTimeZone})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{queueDnStr}', parameters['queueDnStr']);
        
        


        if(parameters['queueDnStr'] === undefined){
            deferred.reject(new Error('Missing required  parameter: queueDnStr'));
            return deferred.promise;
        }
 
        
            path = path.replace('{startDt}', parameters['startDt']);
        
        


        if(parameters['startDt'] === undefined){
            deferred.reject(new Error('Missing required  parameter: startDt'));
            return deferred.promise;
        }
 
        
            path = path.replace('{endDt}', parameters['endDt']);
        
        


        if(parameters['endDt'] === undefined){
            deferred.reject(new Error('Missing required  parameter: endDt'));
            return deferred.promise;
        }
 
        
            path = path.replace('{answerInterval}', parameters['answerInterval']);
        
        


        if(parameters['answerInterval'] === undefined){
            deferred.reject(new Error('Missing required  parameter: answerInterval'));
            return deferred.promise;
        }
 
        
            path = path.replace('{clientTimeZone}', parameters['clientTimeZone']);
        
        


        if(parameters['clientTimeZone'] === undefined){
            deferred.reject(new Error('Missing required  parameter: clientTimeZone'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetQueueAnUnCallsData
 * @method
 * @name Xapi#GetQueueAnUnCallsData
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.chartDate - Usage: chartDate={chartDate}
     * @param {string} parameters.chartBy - Usage: chartBy={chartBy}
     * @param {string} parameters.queueDnStr - Usage: queueDnStr={queueDnStr}
     * @param {string} parameters.clientTimeZone - Usage: clientTimeZone={clientTimeZone}
     * @param {string} parameters.waitInterval - Usage: waitInterval={waitInterval}
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetQueueAnUnCallsData = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ReportQueueAnUnCalls/Pbx.GetQueueAnUnCallsData(chartDate={chartDate},chartBy={chartBy},queueDnStr={queueDnStr},clientTimeZone={clientTimeZone},waitInterval={waitInterval})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{chartDate}', parameters['chartDate']);
        
        


        if(parameters['chartDate'] === undefined){
            deferred.reject(new Error('Missing required  parameter: chartDate'));
            return deferred.promise;
        }
 
        
            path = path.replace('{chartBy}', parameters['chartBy']);
        
        


        if(parameters['chartBy'] === undefined){
            deferred.reject(new Error('Missing required  parameter: chartBy'));
            return deferred.promise;
        }
 
        
            path = path.replace('{queueDnStr}', parameters['queueDnStr']);
        
        


        if(parameters['queueDnStr'] === undefined){
            deferred.reject(new Error('Missing required  parameter: queueDnStr'));
            return deferred.promise;
        }
 
        
            path = path.replace('{clientTimeZone}', parameters['clientTimeZone']);
        
        


        if(parameters['clientTimeZone'] === undefined){
            deferred.reject(new Error('Missing required  parameter: clientTimeZone'));
            return deferred.promise;
        }
 
        
            path = path.replace('{waitInterval}', parameters['waitInterval']);
        
        


        if(parameters['waitInterval'] === undefined){
            deferred.reject(new Error('Missing required  parameter: waitInterval'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function DownloadQueueAnUnCallsReport
 * @method
 * @name Xapi#DownloadQueueAnUnCallsReport
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.chartDate - Usage: chartDate={chartDate}
     * @param {string} parameters.chartBy - Usage: chartBy={chartBy}
     * @param {string} parameters.queueDnStr - Usage: queueDnStr={queueDnStr}
     * @param {string} parameters.clientTimeZone - Usage: clientTimeZone={clientTimeZone}
     * @param {string} parameters.waitInterval - Usage: waitInterval={waitInterval}
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.DownloadQueueAnUnCallsReport = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ReportQueueAnUnCalls/Pbx.DownloadQueueAnUnCallsReport(chartDate={chartDate},chartBy={chartBy},queueDnStr={queueDnStr},clientTimeZone={clientTimeZone},waitInterval={waitInterval})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{chartDate}', parameters['chartDate']);
        
        


        if(parameters['chartDate'] === undefined){
            deferred.reject(new Error('Missing required  parameter: chartDate'));
            return deferred.promise;
        }
 
        
            path = path.replace('{chartBy}', parameters['chartBy']);
        
        


        if(parameters['chartBy'] === undefined){
            deferred.reject(new Error('Missing required  parameter: chartBy'));
            return deferred.promise;
        }
 
        
            path = path.replace('{queueDnStr}', parameters['queueDnStr']);
        
        


        if(parameters['queueDnStr'] === undefined){
            deferred.reject(new Error('Missing required  parameter: queueDnStr'));
            return deferred.promise;
        }
 
        
            path = path.replace('{clientTimeZone}', parameters['clientTimeZone']);
        
        


        if(parameters['clientTimeZone'] === undefined){
            deferred.reject(new Error('Missing required  parameter: clientTimeZone'));
            return deferred.promise;
        }
 
        
            path = path.replace('{waitInterval}', parameters['waitInterval']);
        
        


        if(parameters['waitInterval'] === undefined){
            deferred.reject(new Error('Missing required  parameter: waitInterval'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetQueueCallbacksData
 * @method
 * @name Xapi#GetQueueCallbacksData
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.queueDnStr - Usage: queueDnStr={queueDnStr}
     * @param {string} parameters.startDt - Usage: startDt={startDt}
     * @param {string} parameters.endDt - Usage: endDt={endDt}
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetQueueCallbacksData = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ReportQueueCallbacks/Pbx.GetQueueCallbacksData(queueDnStr={queueDnStr},startDt={startDt},endDt={endDt})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{queueDnStr}', parameters['queueDnStr']);
        
        


        if(parameters['queueDnStr'] === undefined){
            deferred.reject(new Error('Missing required  parameter: queueDnStr'));
            return deferred.promise;
        }
 
        
            path = path.replace('{startDt}', parameters['startDt']);
        
        


        if(parameters['startDt'] === undefined){
            deferred.reject(new Error('Missing required  parameter: startDt'));
            return deferred.promise;
        }
 
        
            path = path.replace('{endDt}', parameters['endDt']);
        
        


        if(parameters['endDt'] === undefined){
            deferred.reject(new Error('Missing required  parameter: endDt'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function DownloadQueueCallbacks
 * @method
 * @name Xapi#DownloadQueueCallbacks
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.queueDnStr - Usage: queueDnStr={queueDnStr}
     * @param {string} parameters.startDt - Usage: startDt={startDt}
     * @param {string} parameters.endDt - Usage: endDt={endDt}
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.DownloadQueueCallbacks = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ReportQueueCallbacks/Pbx.DownloadQueueCallbacks(queueDnStr={queueDnStr},startDt={startDt},endDt={endDt})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{queueDnStr}', parameters['queueDnStr']);
        
        


        if(parameters['queueDnStr'] === undefined){
            deferred.reject(new Error('Missing required  parameter: queueDnStr'));
            return deferred.promise;
        }
 
        
            path = path.replace('{startDt}', parameters['startDt']);
        
        


        if(parameters['startDt'] === undefined){
            deferred.reject(new Error('Missing required  parameter: startDt'));
            return deferred.promise;
        }
 
        
            path = path.replace('{endDt}', parameters['endDt']);
        
        


        if(parameters['endDt'] === undefined){
            deferred.reject(new Error('Missing required  parameter: endDt'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetQueueChatPerformanceData
 * @method
 * @name Xapi#GetQueueChatPerformanceData
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.queueDnStr - Usage: queueDnStr={queueDnStr}
     * @param {string} parameters.startDt - Usage: startDt={startDt}
     * @param {string} parameters.endDt - Usage: endDt={endDt}
     * @param {integer} parameters.participantType - Usage: participantType={participantType}
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetQueueChatPerformanceData = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ReportQueueChatPerformance/Pbx.GetQueueChatPerformanceData(queueDnStr={queueDnStr},startDt={startDt},endDt={endDt},participantType={participantType})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{queueDnStr}', parameters['queueDnStr']);
        
        


        if(parameters['queueDnStr'] === undefined){
            deferred.reject(new Error('Missing required  parameter: queueDnStr'));
            return deferred.promise;
        }
 
        
            path = path.replace('{startDt}', parameters['startDt']);
        
        


        if(parameters['startDt'] === undefined){
            deferred.reject(new Error('Missing required  parameter: startDt'));
            return deferred.promise;
        }
 
        
            path = path.replace('{endDt}', parameters['endDt']);
        
        


        if(parameters['endDt'] === undefined){
            deferred.reject(new Error('Missing required  parameter: endDt'));
            return deferred.promise;
        }
 
        
            path = path.replace('{participantType}', parameters['participantType']);
        
        


        if(parameters['participantType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: participantType'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function DownloadQueueChatPerformance
 * @method
 * @name Xapi#DownloadQueueChatPerformance
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.queueDnStr - Usage: queueDnStr={queueDnStr}
     * @param {string} parameters.startDt - Usage: startDt={startDt}
     * @param {string} parameters.endDt - Usage: endDt={endDt}
     * @param {integer} parameters.participantType - Usage: participantType={participantType}
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.DownloadQueueChatPerformance = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ReportQueueChatPerformance/Pbx.DownloadQueueChatPerformance(queueDnStr={queueDnStr},startDt={startDt},endDt={endDt},participantType={participantType})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{queueDnStr}', parameters['queueDnStr']);
        
        


        if(parameters['queueDnStr'] === undefined){
            deferred.reject(new Error('Missing required  parameter: queueDnStr'));
            return deferred.promise;
        }
 
        
            path = path.replace('{startDt}', parameters['startDt']);
        
        


        if(parameters['startDt'] === undefined){
            deferred.reject(new Error('Missing required  parameter: startDt'));
            return deferred.promise;
        }
 
        
            path = path.replace('{endDt}', parameters['endDt']);
        
        


        if(parameters['endDt'] === undefined){
            deferred.reject(new Error('Missing required  parameter: endDt'));
            return deferred.promise;
        }
 
        
            path = path.replace('{participantType}', parameters['participantType']);
        
        


        if(parameters['participantType'] === undefined){
            deferred.reject(new Error('Missing required  parameter: participantType'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetQueueFailedCallbacksData
 * @method
 * @name Xapi#GetQueueFailedCallbacksData
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.queueDnStr - Usage: queueDnStr={queueDnStr}
     * @param {string} parameters.startDt - Usage: startDt={startDt}
     * @param {string} parameters.endDt - Usage: endDt={endDt}
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetQueueFailedCallbacksData = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ReportQueueFailedCallbacks/Pbx.GetQueueFailedCallbacksData(queueDnStr={queueDnStr},startDt={startDt},endDt={endDt})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{queueDnStr}', parameters['queueDnStr']);
        
        


        if(parameters['queueDnStr'] === undefined){
            deferred.reject(new Error('Missing required  parameter: queueDnStr'));
            return deferred.promise;
        }
 
        
            path = path.replace('{startDt}', parameters['startDt']);
        
        


        if(parameters['startDt'] === undefined){
            deferred.reject(new Error('Missing required  parameter: startDt'));
            return deferred.promise;
        }
 
        
            path = path.replace('{endDt}', parameters['endDt']);
        
        


        if(parameters['endDt'] === undefined){
            deferred.reject(new Error('Missing required  parameter: endDt'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function DownloadQueueFailedCallbacks
 * @method
 * @name Xapi#DownloadQueueFailedCallbacks
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.queueDnStr - Usage: queueDnStr={queueDnStr}
     * @param {string} parameters.startDt - Usage: startDt={startDt}
     * @param {string} parameters.endDt - Usage: endDt={endDt}
     * @param {string} parameters.clientTimeZone - Usage: clientTimeZone={clientTimeZone}
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.DownloadQueueFailedCallbacks = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ReportQueueFailedCallbacks/Pbx.DownloadQueueFailedCallbacks(queueDnStr={queueDnStr},startDt={startDt},endDt={endDt},clientTimeZone={clientTimeZone})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{queueDnStr}', parameters['queueDnStr']);
        
        


        if(parameters['queueDnStr'] === undefined){
            deferred.reject(new Error('Missing required  parameter: queueDnStr'));
            return deferred.promise;
        }
 
        
            path = path.replace('{startDt}', parameters['startDt']);
        
        


        if(parameters['startDt'] === undefined){
            deferred.reject(new Error('Missing required  parameter: startDt'));
            return deferred.promise;
        }
 
        
            path = path.replace('{endDt}', parameters['endDt']);
        
        


        if(parameters['endDt'] === undefined){
            deferred.reject(new Error('Missing required  parameter: endDt'));
            return deferred.promise;
        }
 
        
            path = path.replace('{clientTimeZone}', parameters['clientTimeZone']);
        
        


        if(parameters['clientTimeZone'] === undefined){
            deferred.reject(new Error('Missing required  parameter: clientTimeZone'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetQueuePerformanceOverviewData
 * @method
 * @name Xapi#GetQueuePerformanceOverviewData
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.periodFrom - Usage: periodFrom={periodFrom}
     * @param {string} parameters.periodTo - Usage: periodTo={periodTo}
     * @param {string} parameters.queueDns - Usage: queueDns={queueDns}
     * @param {string} parameters.waitInterval - Usage: waitInterval={waitInterval}
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetQueuePerformanceOverviewData = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ReportQueuePerformanceOverview/Pbx.GetQueuePerformanceOverviewData(periodFrom={periodFrom},periodTo={periodTo},queueDns={queueDns},waitInterval={waitInterval})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{periodFrom}', parameters['periodFrom']);
        
        


        if(parameters['periodFrom'] === undefined){
            deferred.reject(new Error('Missing required  parameter: periodFrom'));
            return deferred.promise;
        }
 
        
            path = path.replace('{periodTo}', parameters['periodTo']);
        
        


        if(parameters['periodTo'] === undefined){
            deferred.reject(new Error('Missing required  parameter: periodTo'));
            return deferred.promise;
        }
 
        
            path = path.replace('{queueDns}', parameters['queueDns']);
        
        


        if(parameters['queueDns'] === undefined){
            deferred.reject(new Error('Missing required  parameter: queueDns'));
            return deferred.promise;
        }
 
        
            path = path.replace('{waitInterval}', parameters['waitInterval']);
        
        


        if(parameters['waitInterval'] === undefined){
            deferred.reject(new Error('Missing required  parameter: waitInterval'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function DownloadQueuePerformanceOverview
 * @method
 * @name Xapi#DownloadQueuePerformanceOverview
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.periodFrom - Usage: periodFrom={periodFrom}
     * @param {string} parameters.periodTo - Usage: periodTo={periodTo}
     * @param {string} parameters.queueDns - Usage: queueDns={queueDns}
     * @param {string} parameters.waitInterval - Usage: waitInterval={waitInterval}
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.DownloadQueuePerformanceOverview = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ReportQueuePerformanceOverview/Pbx.DownloadQueuePerformanceOverview(periodFrom={periodFrom},periodTo={periodTo},queueDns={queueDns},waitInterval={waitInterval})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{periodFrom}', parameters['periodFrom']);
        
        


        if(parameters['periodFrom'] === undefined){
            deferred.reject(new Error('Missing required  parameter: periodFrom'));
            return deferred.promise;
        }
 
        
            path = path.replace('{periodTo}', parameters['periodTo']);
        
        


        if(parameters['periodTo'] === undefined){
            deferred.reject(new Error('Missing required  parameter: periodTo'));
            return deferred.promise;
        }
 
        
            path = path.replace('{queueDns}', parameters['queueDns']);
        
        


        if(parameters['queueDns'] === undefined){
            deferred.reject(new Error('Missing required  parameter: queueDns'));
            return deferred.promise;
        }
 
        
            path = path.replace('{waitInterval}', parameters['waitInterval']);
        
        


        if(parameters['waitInterval'] === undefined){
            deferred.reject(new Error('Missing required  parameter: waitInterval'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetQueuePerformanceTotalsData
 * @method
 * @name Xapi#GetQueuePerformanceTotalsData
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.periodFrom - Usage: periodFrom={periodFrom}
     * @param {string} parameters.periodTo - Usage: periodTo={periodTo}
     * @param {string} parameters.queueDns - Usage: queueDns={queueDns}
     * @param {string} parameters.waitInterval - Usage: waitInterval={waitInterval}
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetQueuePerformanceTotalsData = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ReportQueuePerformanceTotals/Pbx.GetQueuePerformanceTotalsData(periodFrom={periodFrom},periodTo={periodTo},queueDns={queueDns},waitInterval={waitInterval})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{periodFrom}', parameters['periodFrom']);
        
        


        if(parameters['periodFrom'] === undefined){
            deferred.reject(new Error('Missing required  parameter: periodFrom'));
            return deferred.promise;
        }
 
        
            path = path.replace('{periodTo}', parameters['periodTo']);
        
        


        if(parameters['periodTo'] === undefined){
            deferred.reject(new Error('Missing required  parameter: periodTo'));
            return deferred.promise;
        }
 
        
            path = path.replace('{queueDns}', parameters['queueDns']);
        
        


        if(parameters['queueDns'] === undefined){
            deferred.reject(new Error('Missing required  parameter: queueDns'));
            return deferred.promise;
        }
 
        
            path = path.replace('{waitInterval}', parameters['waitInterval']);
        
        


        if(parameters['waitInterval'] === undefined){
            deferred.reject(new Error('Missing required  parameter: waitInterval'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function DownloadQueuePerformanceTotals
 * @method
 * @name Xapi#DownloadQueuePerformanceTotals
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.periodFrom - Usage: periodFrom={periodFrom}
     * @param {string} parameters.periodTo - Usage: periodTo={periodTo}
     * @param {string} parameters.queueDns - Usage: queueDns={queueDns}
     * @param {string} parameters.waitInterval - Usage: waitInterval={waitInterval}
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.DownloadQueuePerformanceTotals = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ReportQueuePerformanceTotals/Pbx.DownloadQueuePerformanceTotals(periodFrom={periodFrom},periodTo={periodTo},queueDns={queueDns},waitInterval={waitInterval})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{periodFrom}', parameters['periodFrom']);
        
        


        if(parameters['periodFrom'] === undefined){
            deferred.reject(new Error('Missing required  parameter: periodFrom'));
            return deferred.promise;
        }
 
        
            path = path.replace('{periodTo}', parameters['periodTo']);
        
        


        if(parameters['periodTo'] === undefined){
            deferred.reject(new Error('Missing required  parameter: periodTo'));
            return deferred.promise;
        }
 
        
            path = path.replace('{queueDns}', parameters['queueDns']);
        
        


        if(parameters['queueDns'] === undefined){
            deferred.reject(new Error('Missing required  parameter: queueDns'));
            return deferred.promise;
        }
 
        
            path = path.replace('{waitInterval}', parameters['waitInterval']);
        
        


        if(parameters['waitInterval'] === undefined){
            deferred.reject(new Error('Missing required  parameter: waitInterval'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetRingGroupStatisticsData
 * @method
 * @name Xapi#GetRingGroupStatisticsData
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.periodFrom - Usage: periodFrom={periodFrom}
     * @param {string} parameters.periodTo - Usage: periodTo={periodTo}
     * @param {string} parameters.ringGroupDns - Usage: ringGroupDns={ringGroupDns}
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetRingGroupStatisticsData = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ReportRingGroupStatistics/Pbx.GetRingGroupStatisticsData(periodFrom={periodFrom},periodTo={periodTo},ringGroupDns={ringGroupDns})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{periodFrom}', parameters['periodFrom']);
        
        


        if(parameters['periodFrom'] === undefined){
            deferred.reject(new Error('Missing required  parameter: periodFrom'));
            return deferred.promise;
        }
 
        
            path = path.replace('{periodTo}', parameters['periodTo']);
        
        


        if(parameters['periodTo'] === undefined){
            deferred.reject(new Error('Missing required  parameter: periodTo'));
            return deferred.promise;
        }
 
        
            path = path.replace('{ringGroupDns}', parameters['ringGroupDns']);
        
        


        if(parameters['ringGroupDns'] === undefined){
            deferred.reject(new Error('Missing required  parameter: ringGroupDns'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function DownloadRingGroupStatistics
 * @method
 * @name Xapi#DownloadRingGroupStatistics
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.periodFrom - Usage: periodFrom={periodFrom}
     * @param {string} parameters.periodTo - Usage: periodTo={periodTo}
     * @param {string} parameters.ringGroupDns - Usage: ringGroupDns={ringGroupDns}
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.DownloadRingGroupStatistics = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ReportRingGroupStatistics/Pbx.DownloadRingGroupStatistics(periodFrom={periodFrom},periodTo={periodTo},ringGroupDns={ringGroupDns})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{periodFrom}', parameters['periodFrom']);
        
        


        if(parameters['periodFrom'] === undefined){
            deferred.reject(new Error('Missing required  parameter: periodFrom'));
            return deferred.promise;
        }
 
        
            path = path.replace('{periodTo}', parameters['periodTo']);
        
        


        if(parameters['periodTo'] === undefined){
            deferred.reject(new Error('Missing required  parameter: periodTo'));
            return deferred.promise;
        }
 
        
            path = path.replace('{ringGroupDns}', parameters['ringGroupDns']);
        
        


        if(parameters['ringGroupDns'] === undefined){
            deferred.reject(new Error('Missing required  parameter: ringGroupDns'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetStatisticSlaData
 * @method
 * @name Xapi#GetStatisticSlaData
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.queueDnStr - Usage: queueDnStr={queueDnStr}
     * @param {string} parameters.startDt - Usage: startDt={startDt}
     * @param {string} parameters.endDt - Usage: endDt={endDt}
     * @param {string} parameters.waitInterval - Usage: waitInterval={waitInterval}
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetStatisticSlaData = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ReportStatisticSla/Pbx.GetStatisticSlaData(queueDnStr={queueDnStr},startDt={startDt},endDt={endDt},waitInterval={waitInterval})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{queueDnStr}', parameters['queueDnStr']);
        
        


        if(parameters['queueDnStr'] === undefined){
            deferred.reject(new Error('Missing required  parameter: queueDnStr'));
            return deferred.promise;
        }
 
        
            path = path.replace('{startDt}', parameters['startDt']);
        
        


        if(parameters['startDt'] === undefined){
            deferred.reject(new Error('Missing required  parameter: startDt'));
            return deferred.promise;
        }
 
        
            path = path.replace('{endDt}', parameters['endDt']);
        
        


        if(parameters['endDt'] === undefined){
            deferred.reject(new Error('Missing required  parameter: endDt'));
            return deferred.promise;
        }
 
        
            path = path.replace('{waitInterval}', parameters['waitInterval']);
        
        


        if(parameters['waitInterval'] === undefined){
            deferred.reject(new Error('Missing required  parameter: waitInterval'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function DownloadStatisticSla
 * @method
 * @name Xapi#DownloadStatisticSla
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.queueDnStr - Usage: queueDnStr={queueDnStr}
     * @param {string} parameters.startDt - Usage: startDt={startDt}
     * @param {string} parameters.endDt - Usage: endDt={endDt}
     * @param {string} parameters.waitInterval - Usage: waitInterval={waitInterval}
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.DownloadStatisticSla = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ReportStatisticSla/Pbx.DownloadStatisticSla(queueDnStr={queueDnStr},startDt={startDt},endDt={endDt},waitInterval={waitInterval})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{queueDnStr}', parameters['queueDnStr']);
        
        


        if(parameters['queueDnStr'] === undefined){
            deferred.reject(new Error('Missing required  parameter: queueDnStr'));
            return deferred.promise;
        }
 
        
            path = path.replace('{startDt}', parameters['startDt']);
        
        


        if(parameters['startDt'] === undefined){
            deferred.reject(new Error('Missing required  parameter: startDt'));
            return deferred.promise;
        }
 
        
            path = path.replace('{endDt}', parameters['endDt']);
        
        


        if(parameters['endDt'] === undefined){
            deferred.reject(new Error('Missing required  parameter: endDt'));
            return deferred.promise;
        }
 
        
            path = path.replace('{waitInterval}', parameters['waitInterval']);
        
        


        if(parameters['waitInterval'] === undefined){
            deferred.reject(new Error('Missing required  parameter: waitInterval'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetTeamQueueGeneralStatisticsData
 * @method
 * @name Xapi#GetTeamQueueGeneralStatisticsData
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.queueDnStr - Usage: queueDnStr={queueDnStr}
     * @param {string} parameters.startDt - Usage: startDt={startDt}
     * @param {string} parameters.endDt - Usage: endDt={endDt}
     * @param {string} parameters.waitInterval - Usage: waitInterval={waitInterval}
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetTeamQueueGeneralStatisticsData = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ReportTeamQueueGeneralStatistics/Pbx.GetTeamQueueGeneralStatisticsData(queueDnStr={queueDnStr},startDt={startDt},endDt={endDt},waitInterval={waitInterval})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{queueDnStr}', parameters['queueDnStr']);
        
        


        if(parameters['queueDnStr'] === undefined){
            deferred.reject(new Error('Missing required  parameter: queueDnStr'));
            return deferred.promise;
        }
 
        
            path = path.replace('{startDt}', parameters['startDt']);
        
        


        if(parameters['startDt'] === undefined){
            deferred.reject(new Error('Missing required  parameter: startDt'));
            return deferred.promise;
        }
 
        
            path = path.replace('{endDt}', parameters['endDt']);
        
        


        if(parameters['endDt'] === undefined){
            deferred.reject(new Error('Missing required  parameter: endDt'));
            return deferred.promise;
        }
 
        
            path = path.replace('{waitInterval}', parameters['waitInterval']);
        
        


        if(parameters['waitInterval'] === undefined){
            deferred.reject(new Error('Missing required  parameter: waitInterval'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function DownloadTeamQueueGeneralStatistics
 * @method
 * @name Xapi#DownloadTeamQueueGeneralStatistics
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.queueDnStr - Usage: queueDnStr={queueDnStr}
     * @param {string} parameters.startDt - Usage: startDt={startDt}
     * @param {string} parameters.endDt - Usage: endDt={endDt}
     * @param {string} parameters.waitInterval - Usage: waitInterval={waitInterval}
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.DownloadTeamQueueGeneralStatistics = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ReportTeamQueueGeneralStatistics/Pbx.DownloadTeamQueueGeneralStatistics(queueDnStr={queueDnStr},startDt={startDt},endDt={endDt},waitInterval={waitInterval})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{queueDnStr}', parameters['queueDnStr']);
        
        


        if(parameters['queueDnStr'] === undefined){
            deferred.reject(new Error('Missing required  parameter: queueDnStr'));
            return deferred.promise;
        }
 
        
            path = path.replace('{startDt}', parameters['startDt']);
        
        


        if(parameters['startDt'] === undefined){
            deferred.reject(new Error('Missing required  parameter: startDt'));
            return deferred.promise;
        }
 
        
            path = path.replace('{endDt}', parameters['endDt']);
        
        


        if(parameters['endDt'] === undefined){
            deferred.reject(new Error('Missing required  parameter: endDt'));
            return deferred.promise;
        }
 
        
            path = path.replace('{waitInterval}', parameters['waitInterval']);
        
        


        if(parameters['waitInterval'] === undefined){
            deferred.reject(new Error('Missing required  parameter: waitInterval'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetUserActivityData
 * @method
 * @name Xapi#GetUserActivityData
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.chartDate - Usage: chartDate={chartDate}
     * @param {string} parameters.chartBy - Usage: chartBy={chartBy}
     * @param {boolean} parameters.includeInternalCalls - Usage: includeInternalCalls={includeInternalCalls}
     * @param {boolean} parameters.includeQueueCalls - Usage: includeQueueCalls={includeQueueCalls}
     * @param {string} parameters.queueDnStr - Usage: queueDnStr={queueDnStr}
     * @param {string} parameters.clientTimeZone - Usage: clientTimeZone={clientTimeZone}
     * @param {string} parameters.waitInterval - Usage: waitInterval={waitInterval}
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetUserActivityData = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ReportUserActivity/Pbx.GetUserActivityData(chartDate={chartDate},chartBy={chartBy},includeInternalCalls={includeInternalCalls},includeQueueCalls={includeQueueCalls},queueDnStr={queueDnStr},clientTimeZone={clientTimeZone},waitInterval={waitInterval})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{chartDate}', parameters['chartDate']);
        
        


        if(parameters['chartDate'] === undefined){
            deferred.reject(new Error('Missing required  parameter: chartDate'));
            return deferred.promise;
        }
 
        
            path = path.replace('{chartBy}', parameters['chartBy']);
        
        


        if(parameters['chartBy'] === undefined){
            deferred.reject(new Error('Missing required  parameter: chartBy'));
            return deferred.promise;
        }
 
        
            path = path.replace('{includeInternalCalls}', parameters['includeInternalCalls']);
        
        


        if(parameters['includeInternalCalls'] === undefined){
            deferred.reject(new Error('Missing required  parameter: includeInternalCalls'));
            return deferred.promise;
        }
 
        
            path = path.replace('{includeQueueCalls}', parameters['includeQueueCalls']);
        
        


        if(parameters['includeQueueCalls'] === undefined){
            deferred.reject(new Error('Missing required  parameter: includeQueueCalls'));
            return deferred.promise;
        }
 
        
            path = path.replace('{queueDnStr}', parameters['queueDnStr']);
        
        


        if(parameters['queueDnStr'] === undefined){
            deferred.reject(new Error('Missing required  parameter: queueDnStr'));
            return deferred.promise;
        }
 
        
            path = path.replace('{clientTimeZone}', parameters['clientTimeZone']);
        
        


        if(parameters['clientTimeZone'] === undefined){
            deferred.reject(new Error('Missing required  parameter: clientTimeZone'));
            return deferred.promise;
        }
 
        
            path = path.replace('{waitInterval}', parameters['waitInterval']);
        
        


        if(parameters['waitInterval'] === undefined){
            deferred.reject(new Error('Missing required  parameter: waitInterval'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function DownloadUserActivityReport
 * @method
 * @name Xapi#DownloadUserActivityReport
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.chartDate - Usage: chartDate={chartDate}
     * @param {string} parameters.chartBy - Usage: chartBy={chartBy}
     * @param {boolean} parameters.includeInternalCalls - Usage: includeInternalCalls={includeInternalCalls}
     * @param {boolean} parameters.includeQueueCalls - Usage: includeQueueCalls={includeQueueCalls}
     * @param {string} parameters.queueDnStr - Usage: queueDnStr={queueDnStr}
     * @param {string} parameters.clientTimeZone - Usage: clientTimeZone={clientTimeZone}
     * @param {string} parameters.waitInterval - Usage: waitInterval={waitInterval}
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.DownloadUserActivityReport = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ReportUserActivity/Pbx.DownloadUserActivityReport(chartDate={chartDate},chartBy={chartBy},includeInternalCalls={includeInternalCalls},includeQueueCalls={includeQueueCalls},queueDnStr={queueDnStr},clientTimeZone={clientTimeZone},waitInterval={waitInterval})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{chartDate}', parameters['chartDate']);
        
        


        if(parameters['chartDate'] === undefined){
            deferred.reject(new Error('Missing required  parameter: chartDate'));
            return deferred.promise;
        }
 
        
            path = path.replace('{chartBy}', parameters['chartBy']);
        
        


        if(parameters['chartBy'] === undefined){
            deferred.reject(new Error('Missing required  parameter: chartBy'));
            return deferred.promise;
        }
 
        
            path = path.replace('{includeInternalCalls}', parameters['includeInternalCalls']);
        
        


        if(parameters['includeInternalCalls'] === undefined){
            deferred.reject(new Error('Missing required  parameter: includeInternalCalls'));
            return deferred.promise;
        }
 
        
            path = path.replace('{includeQueueCalls}', parameters['includeQueueCalls']);
        
        


        if(parameters['includeQueueCalls'] === undefined){
            deferred.reject(new Error('Missing required  parameter: includeQueueCalls'));
            return deferred.promise;
        }
 
        
            path = path.replace('{queueDnStr}', parameters['queueDnStr']);
        
        


        if(parameters['queueDnStr'] === undefined){
            deferred.reject(new Error('Missing required  parameter: queueDnStr'));
            return deferred.promise;
        }
 
        
            path = path.replace('{clientTimeZone}', parameters['clientTimeZone']);
        
        


        if(parameters['clientTimeZone'] === undefined){
            deferred.reject(new Error('Missing required  parameter: clientTimeZone'));
            return deferred.promise;
        }
 
        
            path = path.replace('{waitInterval}', parameters['waitInterval']);
        
        


        if(parameters['waitInterval'] === undefined){
            deferred.reject(new Error('Missing required  parameter: waitInterval'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entities from ScheduledReports
 * @method
 * @name Xapi#ListScheduledReport
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListScheduledReport = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ScheduledReports';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Add new entity to ScheduledReports
 * @method
 * @name Xapi#CreateScheduledReport
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - New entity
 */
 Xapi.prototype.CreateScheduledReport = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ScheduledReports';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entity from ScheduledReports by key
 * @method
 * @name Xapi#GetScheduledReport
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of ScheduledReport
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetScheduledReport = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ScheduledReports({Id})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update entity in ScheduledReports
 * @method
 * @name Xapi#UpdateScheduledReport
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of ScheduledReport
     * @param {} parameters.body - New property values
 */
 Xapi.prototype.UpdateScheduledReport = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ScheduledReports({Id})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Delete entity from ScheduledReports
 * @method
 * @name Xapi#DeleteScheduledReport
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of ScheduledReport
     * @param {string} parameters.ifMatch - ETag
 */
 Xapi.prototype.DeleteScheduledReport = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/ScheduledReports({Id})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
        
        
                if(parameters['ifMatch'] !== undefined){
                    headers['If-Match'] = parameters['ifMatch'];
                }
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get Members from RingGroups
 * @method
 * @name Xapi#ListRingGroupMembers
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of RingGroup
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListRingGroupMembers = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/RingGroups({Id})/Members';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetFirstAvailableRingGroupNumber
 * @method
 * @name Xapi#GetFirstAvailableRingGroupNumber
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.GetFirstAvailableRingGroupNumber = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/RingGroups/Pbx.GetFirstAvailableRingGroupNumber()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetByNumber
 * @method
 * @name Xapi#GetRingGroupByNumber
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.number - Usage: number={number}
 */
 Xapi.prototype.GetRingGroupByNumber = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/RingGroups/Pbx.GetByNumber(number={number})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{number}', parameters['number']);
        
        


        if(parameters['number'] === undefined){
            deferred.reject(new Error('Missing required  parameter: number'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entities from RingGroups
 * @method
 * @name Xapi#ListRingGroup
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListRingGroup = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/RingGroups';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Add new entity to RingGroups
 * @method
 * @name Xapi#CreateRingGroup
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - New entity
 */
 Xapi.prototype.CreateRingGroup = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/RingGroups';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entity from RingGroups by key
 * @method
 * @name Xapi#GetRingGroup
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of RingGroup
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetRingGroup = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/RingGroups({Id})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update entity in RingGroups
 * @method
 * @name Xapi#UpdateRingGroup
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of RingGroup
     * @param {} parameters.body - New property values
 */
 Xapi.prototype.UpdateRingGroup = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/RingGroups({Id})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Delete entity from RingGroups
 * @method
 * @name Xapi#DeleteRingGroup
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of RingGroup
     * @param {string} parameters.ifMatch - ETag
 */
 Xapi.prototype.DeleteRingGroup = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/RingGroups({Id})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
        
        
                if(parameters['ifMatch'] !== undefined){
                    headers['If-Match'] = parameters['ifMatch'];
                }
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entity from Sbcs by key
 * @method
 * @name Xapi#GetSbc
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.name - The unique identifier of Sbc
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetSbc = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Sbcs({Name})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Name}', parameters['name']);
        
        


        if(parameters['name'] === undefined){
            deferred.reject(new Error('Missing required  parameter: name'));
            return deferred.promise;
        }
 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update entity in Sbcs
 * @method
 * @name Xapi#UpdateSbc
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.name - The unique identifier of Sbc
     * @param {} parameters.body - New property values
 */
 Xapi.prototype.UpdateSbc = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Sbcs({Name})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{Name}', parameters['name']);
        
        


        if(parameters['name'] === undefined){
            deferred.reject(new Error('Missing required  parameter: name'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Delete entity from Sbcs
 * @method
 * @name Xapi#DeleteSbc
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.name - The unique identifier of Sbc
     * @param {string} parameters.ifMatch - ETag
 */
 Xapi.prototype.DeleteSbc = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Sbcs({Name})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Name}', parameters['name']);
        
        


        if(parameters['name'] === undefined){
            deferred.reject(new Error('Missing required  parameter: name'));
            return deferred.promise;
        }
 
        
        
                if(parameters['ifMatch'] !== undefined){
                    headers['If-Match'] = parameters['ifMatch'];
                }
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entities from Sbcs
 * @method
 * @name Xapi#ListSbc
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListSbc = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Sbcs';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Add new entity to Sbcs
 * @method
 * @name Xapi#CreateSbc
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - New entity
 */
 Xapi.prototype.CreateSbc = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Sbcs';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get SecureSipSettings
 * @method
 * @name Xapi#GetSecureSipSettings
 * @param {object} parameters - method options and parameters
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetSecureSipSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/SecureSipSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update SecureSipSettings
 * @method
 * @name Xapi#UpdateSecureSipSettings
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - New property values
 */
 Xapi.prototype.UpdateSecureSipSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/SecureSipSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entities from SecurityTokens
 * @method
 * @name Xapi#ListSecurityRefreshToken
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListSecurityRefreshToken = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/SecurityTokens';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action RevokeToken
 * @method
 * @name Xapi#RevokeSecurityToken
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of RefreshToken
 */
 Xapi.prototype.RevokeSecurityToken = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/SecurityTokens({Id})/Pbx.RevokeToken';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entities from Services
 * @method
 * @name Xapi#ListServiceInfo
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListServiceInfo = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Services';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action GarbageCollect
 * @method
 * @name Xapi#GarbageCollect
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.GarbageCollect = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Services/Pbx.GarbageCollect';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action Start
 * @method
 * @name Xapi#Start
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.Start = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Services/Pbx.Start';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action Stop
 * @method
 * @name Xapi#Stop
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.Stop = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Services/Pbx.Stop';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action Enable
 * @method
 * @name Xapi#Enable
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.Enable = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Services/Pbx.Enable';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action Disable
 * @method
 * @name Xapi#Disable
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.Disable = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Services/Pbx.Disable';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action Restart
 * @method
 * @name Xapi#Restart
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.Restart = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Services/Pbx.Restart';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action RestartAll
 * @method
 * @name Xapi#RestartAll
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.RestartAll = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Services/Pbx.RestartAll';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action RestartOperatingSystem
 * @method
 * @name Xapi#RestartOperatingSystem
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.RestartOperatingSystem = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Services/Pbx.RestartOperatingSystem';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entities from SipDevices
 * @method
 * @name Xapi#ListSipDevice
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListSipDevice = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/SipDevices';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke actionImport GetDirectoryInfo
 * @method
 * @name Xapi#GetDirectoryInfo
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.GetDirectoryInfo = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/GetDirectoryInfo';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get SystemStatus
 * @method
 * @name Xapi#GetSystemStatus
 * @param {object} parameters - method options and parameters
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetSystemStatus = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/SystemStatus';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function SystemExtensions
 * @method
 * @name Xapi#SystemExtensions
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
 */
 Xapi.prototype.SystemExtensions = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/SystemStatus/Pbx.SystemExtensions()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function SystemDatabaseInformation
 * @method
 * @name Xapi#SystemDatabaseInformation
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.SystemDatabaseInformation = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/SystemStatus/Pbx.SystemDatabaseInformation()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetVersionType
 * @method
 * @name Xapi#GetVersionType
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.GetVersionType = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/SystemStatus/Pbx.GetVersionType()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action SetChatLogStatus
 * @method
 * @name Xapi#SetChatLogStatus
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.SetChatLogStatus = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/SystemStatus/Pbx.SetChatLogStatus';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action StartDBMaintenance
 * @method
 * @name Xapi#StartDBMaintenance
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.StartDBMaintenance = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/SystemStatus/Pbx.StartDBMaintenance';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function SystemHealthStatus
 * @method
 * @name Xapi#SystemHealthStatus
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.SystemHealthStatus = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/SystemStatus/Pbx.SystemHealthStatus()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function APIToken
 * @method
 * @name Xapi#APIToken
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.APIToken = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/SystemStatus/Pbx.APIToken()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action SetMultiCompanyMode
 * @method
 * @name Xapi#SetMultiCompanyMode
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.SetMultiCompanyMode = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/SystemStatus/Pbx.SetMultiCompanyMode';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entities from TenantProperties
 * @method
 * @name Xapi#ListProperty
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListProperty = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/TenantProperties';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Add new entity to TenantProperties
 * @method
 * @name Xapi#CreateProperty
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - New entity
 */
 Xapi.prototype.CreateProperty = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/TenantProperties';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entity from TenantProperties by key
 * @method
 * @name Xapi#GetProperty
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.name - The unique identifier of Property
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetProperty = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/TenantProperties({Name})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Name}', parameters['name']);
        
        


        if(parameters['name'] === undefined){
            deferred.reject(new Error('Missing required  parameter: name'));
            return deferred.promise;
        }
 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update entity in TenantProperties
 * @method
 * @name Xapi#UpdateProperty
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.name - The unique identifier of Property
     * @param {} parameters.body - New property values
 */
 Xapi.prototype.UpdateProperty = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/TenantProperties({Name})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{Name}', parameters['name']);
        
        


        if(parameters['name'] === undefined){
            deferred.reject(new Error('Missing required  parameter: name'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Delete entity from TenantProperties
 * @method
 * @name Xapi#DeleteProperty
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.name - The unique identifier of Property
     * @param {string} parameters.ifMatch - ETag
 */
 Xapi.prototype.DeleteProperty = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/TenantProperties({Name})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Name}', parameters['name']);
        
        


        if(parameters['name'] === undefined){
            deferred.reject(new Error('Missing required  parameter: name'));
            return deferred.promise;
        }
 
        
        
                if(parameters['ifMatch'] !== undefined){
                    headers['If-Match'] = parameters['ifMatch'];
                }
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetFirstAvailableTrunkNumber
 * @method
 * @name Xapi#GetFirstAvailableTrunkNumber
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.GetFirstAvailableTrunkNumber = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Trunks/Pbx.GetFirstAvailableTrunkNumber()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entity from Trunks by key
 * @method
 * @name Xapi#GetTrunk
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of Trunk
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetTrunk = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Trunks({Id})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update entity in Trunks
 * @method
 * @name Xapi#UpdateTrunk
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of Trunk
     * @param {} parameters.body - New property values
 */
 Xapi.prototype.UpdateTrunk = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Trunks({Id})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Delete entity from Trunks
 * @method
 * @name Xapi#DeleteTrunk
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of Trunk
     * @param {string} parameters.ifMatch - ETag
 */
 Xapi.prototype.DeleteTrunk = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Trunks({Id})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
        
        
                if(parameters['ifMatch'] !== undefined){
                    headers['If-Match'] = parameters['ifMatch'];
                }
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function InitMasterBridge
 * @method
 * @name Xapi#InitMasterBridge
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.InitMasterBridge = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Trunks/Pbx.InitMasterBridge()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function InitSlaveBridge
 * @method
 * @name Xapi#InitSlaveBridge
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.InitSlaveBridge = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Trunks/Pbx.InitSlaveBridge()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function InitTrunk
 * @method
 * @name Xapi#InitTrunk
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.template - Usage: template={template}
 */
 Xapi.prototype.InitTrunk = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Trunks/Pbx.InitTrunk(template={template})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{template}', parameters['template']);
        
        


        if(parameters['template'] === undefined){
            deferred.reject(new Error('Missing required  parameter: template'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function ExportTrunk
 * @method
 * @name Xapi#ExportTrunk
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of Trunk
 */
 Xapi.prototype.ExportTrunk = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Trunks({Id})/Pbx.ExportTrunk()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action RefreshRegistration
 * @method
 * @name Xapi#RefreshRegistration
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.RefreshRegistration = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Trunks/Pbx.RefreshRegistration';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action SetRoutes
 * @method
 * @name Xapi#SetRoutes
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.SetRoutes = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Trunks/Pbx.SetRoutes';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetTrunkByNumber
 * @method
 * @name Xapi#GetTrunkByNumber
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.number - Usage: number={number}
 */
 Xapi.prototype.GetTrunkByNumber = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Trunks/Pbx.GetTrunkByNumber(number={number})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{number}', parameters['number']);
        
        


        if(parameters['number'] === undefined){
            deferred.reject(new Error('Missing required  parameter: number'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entities from Trunks
 * @method
 * @name Xapi#ListTrunk
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListTrunk = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Trunks';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Add new entity to Trunks
 * @method
 * @name Xapi#CreateTrunk
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - New entity
 */
 Xapi.prototype.CreateTrunk = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Trunks';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action ProvisionTrunk
 * @method
 * @name Xapi#ProvisionTrunk
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.ProvisionTrunk = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Trunks/Pbx.ProvisionTrunk';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action TelegramSession
 * @method
 * @name Xapi#TelegramSession
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.TelegramSession = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Trunks/Pbx.TelegramSession';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entities from TrunkTemplates
 * @method
 * @name Xapi#ListTrunkTemplate
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListTrunkTemplate = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/TrunkTemplates';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Add new entity to TrunkTemplates
 * @method
 * @name Xapi#CreateTrunkTemplate
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - New entity
 */
 Xapi.prototype.CreateTrunkTemplate = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/TrunkTemplates';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entity from TrunkTemplates by key
 * @method
 * @name Xapi#GetTrunkTemplate
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - The unique identifier of TrunkTemplate
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetTrunkTemplate = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/TrunkTemplates({Id})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update entity in TrunkTemplates
 * @method
 * @name Xapi#UpdateTrunkTemplate
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - The unique identifier of TrunkTemplate
     * @param {} parameters.body - New property values
 */
 Xapi.prototype.UpdateTrunkTemplate = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/TrunkTemplates({Id})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Delete entity from TrunkTemplates
 * @method
 * @name Xapi#DeleteTrunkTemplate
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.id - The unique identifier of TrunkTemplate
     * @param {string} parameters.ifMatch - ETag
 */
 Xapi.prototype.DeleteTrunkTemplate = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/TrunkTemplates({Id})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
        
        
                if(parameters['ifMatch'] !== undefined){
                    headers['If-Match'] = parameters['ifMatch'];
                }
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke functionImport GetUpdateSettings
 * @method
 * @name Xapi#GetUpdateSettings
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.GetUpdateSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/GetUpdateSettings()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke actionImport SetUpdateSettings
 * @method
 * @name Xapi#SetUpdateSettings
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.SetUpdateSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/SetUpdateSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke functionImport HasDebianUpgrade
 * @method
 * @name Xapi#HasDebianUpgrade
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.HasDebianUpgrade = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/HasDebianUpgrade()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke actionImport UpgradeDebian
 * @method
 * @name Xapi#UpgradeDebian
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.UpgradeDebian = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/UpgradeDebian';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke functionImport GetUpdates
 * @method
 * @name Xapi#GetUpdates
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.GetUpdates = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/GetUpdates()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke functionImport GetPromptSetUpdates
 * @method
 * @name Xapi#GetPromptSetUpdates
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.GetPromptSetUpdates = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/GetPromptSetUpdates()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke functionImport GetClientCrmUpdates
 * @method
 * @name Xapi#GetClientCrmUpdates
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.GetClientCrmUpdates = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/GetClientCrmUpdates()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke functionImport GetServerCrmUpdates
 * @method
 * @name Xapi#GetServerCrmUpdates
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.GetServerCrmUpdates = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/GetServerCrmUpdates()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke actionImport InstallUpdates
 * @method
 * @name Xapi#InstallUpdates
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.InstallUpdates = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/InstallUpdates';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke functionImport GetUpdatesStats
 * @method
 * @name Xapi#GetUpdatesStats
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.GetUpdatesStats = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/GetUpdatesStats()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function HasDuplicatedEmail
 * @method
 * @name Xapi#HasDuplicatedEmail
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of User
 */
 Xapi.prototype.HasDuplicatedEmail = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Users({Id})/Pbx.HasDuplicatedEmail()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action GetDuplicatedEmails
 * @method
 * @name Xapi#GetDuplicatedEmails
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.GetDuplicatedEmails = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Users/Pbx.GetDuplicatedEmails';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetFirstAvailableExtensionNumber
 * @method
 * @name Xapi#GetFirstAvailableExtensionNumber
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.GetFirstAvailableExtensionNumber = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Users/Pbx.GetFirstAvailableExtensionNumber()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetFirstAvailableHotdeskingNumber
 * @method
 * @name Xapi#GetFirstAvailableHotdeskingNumber
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.GetFirstAvailableHotdeskingNumber = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Users/Pbx.GetFirstAvailableHotdeskingNumber()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action SendWelcomeEmail
 * @method
 * @name Xapi#SendWelcomeEmail
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of User
 */
 Xapi.prototype.SendWelcomeEmail = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Users({Id})/Pbx.SendWelcomeEmail';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get Groups from Users
 * @method
 * @name Xapi#ListGroups
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of User
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListGroups = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Users({Id})/Groups';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get ForwardingProfiles from Users
 * @method
 * @name Xapi#ListForwardingProfiles
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of User
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListForwardingProfiles = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Users({Id})/ForwardingProfiles';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetPhoneSecret
 * @method
 * @name Xapi#GetPhoneSecret
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of User
 */
 Xapi.prototype.GetPhoneSecret = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Users({Id})/Pbx.GetPhoneSecret()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action Regenerate
 * @method
 * @name Xapi#Regenerate
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of User
     * @param {} parameters.body - This OData service is located at /xapi/v1
 */
 Xapi.prototype.Regenerate = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Users({Id})/Pbx.Regenerate';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action RegeneratePasswords
 * @method
 * @name Xapi#RegeneratePasswords
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.RegeneratePasswords = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Users/Pbx.RegeneratePasswords';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function ExportExtensions
 * @method
 * @name Xapi#ExportExtensions
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ExportExtensions = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Users/Pbx.ExportExtensions()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetPhoneRegistrar
 * @method
 * @name Xapi#GetPhoneRegistrar
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.mac - Usage: mac={mac}
 */
 Xapi.prototype.GetPhoneRegistrar = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Users/Pbx.GetPhoneRegistrar(mac={mac})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{mac}', parameters['mac']);
        
        


        if(parameters['mac'] === undefined){
            deferred.reject(new Error('Missing required  parameter: mac'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action BulkUpdate
 * @method
 * @name Xapi#BulkUpdate
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.BulkUpdate = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Users/Pbx.BulkUpdate';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action GetPhoneRegistrars
 * @method
 * @name Xapi#GetPhoneRegistrars
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.GetPhoneRegistrars = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Users/Pbx.GetPhoneRegistrars';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action RebootPhone
 * @method
 * @name Xapi#RebootPhone
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.RebootPhone = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Users/Pbx.RebootPhone';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action ReprovisionPhone
 * @method
 * @name Xapi#ReprovisionPhone
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.ReprovisionPhone = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Users/Pbx.ReprovisionPhone';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action UpgradePhone
 * @method
 * @name Xapi#UpgradePhone
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.UpgradePhone = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Users/Pbx.UpgradePhone';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GenerateProvLink
 * @method
 * @name Xapi#GenerateProvLink
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of User
 */
 Xapi.prototype.GenerateProvLink = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Users({Id})/Pbx.GenerateProvLink()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entity from Users by key
 * @method
 * @name Xapi#GetUser
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of User
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetUser = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Users({Id})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update entity in Users
 * @method
 * @name Xapi#UpdateUser
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of User
     * @param {} parameters.body - New property values
 */
 Xapi.prototype.UpdateUser = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Users({Id})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Delete entity from Users
 * @method
 * @name Xapi#DeleteUser
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of User
     * @param {string} parameters.ifMatch - ETag
 */
 Xapi.prototype.DeleteUser = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Users({Id})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
        
        
                if(parameters['ifMatch'] !== undefined){
                    headers['If-Match'] = parameters['ifMatch'];
                }
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get Greetings from Users
 * @method
 * @name Xapi#ListGreetings
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of User
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListGreetings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Users({Id})/Greetings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 

                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action MakeCallUserRecordGreeting
 * @method
 * @name Xapi#MakeCallUserRecordGreeting
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of User
     * @param {} parameters.body - This OData service is located at /xapi/v1
 */
 Xapi.prototype.MakeCallUserRecordGreeting = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Users({Id})/Pbx.MakeCallUserRecordGreeting';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function DownloadGreeting
 * @method
 * @name Xapi#DownloadGreeting
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.userId - Usage: userId={userId}
     * @param {string} parameters.fileName - Usage: fileName={fileName}
 */
 Xapi.prototype.DownloadGreeting = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Users/Pbx.DownloadGreeting(userId={userId},fileName={fileName})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{userId}', parameters['userId']);
        
        


        if(parameters['userId'] === undefined){
            deferred.reject(new Error('Missing required  parameter: userId'));
            return deferred.promise;
        }
 
        
            path = path.replace('{fileName}', parameters['fileName']);
        
        


        if(parameters['fileName'] === undefined){
            deferred.reject(new Error('Missing required  parameter: fileName'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action BatchDelete
 * @method
 * @name Xapi#BatchDelete
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.BatchDelete = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Users/Pbx.BatchDelete';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetMonitorStatus
 * @method
 * @name Xapi#GetMonitorStatus
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
 */
 Xapi.prototype.GetMonitorStatus = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Users/Pbx.GetMonitorStatus()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action SetMonitorStatus
 * @method
 * @name Xapi#SetMonitorStatus
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.id - The unique identifier of User
     * @param {} parameters.body - This OData service is located at /xapi/v1
 */
 Xapi.prototype.SetMonitorStatus = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Users({Id})/Pbx.SetMonitorStatus';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{Id}', parameters['id']);
        
        


        if(parameters['id'] === undefined){
            deferred.reject(new Error('Missing required  parameter: id'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetByNumber
 * @method
 * @name Xapi#GetUserByNumber
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.number - Usage: number={number}
 */
 Xapi.prototype.GetUserByNumber = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Users/Pbx.GetByNumber(number={number})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{number}', parameters['number']);
        
        


        if(parameters['number'] === undefined){
            deferred.reject(new Error('Missing required  parameter: number'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entities from Users
 * @method
 * @name Xapi#ListUser
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListUser = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Users';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Add new entity to Users
 * @method
 * @name Xapi#CreateUser
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - New entity
 */
 Xapi.prototype.CreateUser = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/Users';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke function GetTranscribeLanguages
 * @method
 * @name Xapi#GetTranscribeLanguages
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
 */
 Xapi.prototype.GetTranscribeLanguages = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/VoicemailSettings/Pbx.GetTranscribeLanguages()';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get VoicemailSettings
 * @method
 * @name Xapi#GetVoicemailSettings
 * @param {object} parameters - method options and parameters
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetVoicemailSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/VoicemailSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update VoicemailSettings
 * @method
 * @name Xapi#UpdateVoicemailSettings
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - New property values
 */
 Xapi.prototype.UpdateVoicemailSettings = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/VoicemailSettings';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action DeleteAllUserVoicemails
 * @method
 * @name Xapi#DeleteAllUserVoicemails
 * @param {object} parameters - method options and parameters
 */
 Xapi.prototype.DeleteAllUserVoicemails = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/VoicemailSettings/Pbx.DeleteAllUserVoicemails';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entities from WebsiteLinks
 * @method
 * @name Xapi#ListWeblink
 * @param {object} parameters - method options and parameters
     * @param {integer} parameters.top - Show only the first n items
     * @param {integer} parameters.skip - Skip the first n items
     * @param {string} parameters.search - Search items by search phrases
     * @param {string} parameters.filter - Filter items by property values
     * @param {boolean} parameters.count - Include count of items
     * @param {array} parameters.orderby - Order items by property values
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.ListWeblink = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/WebsiteLinks';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];


                if(parameters['top'] !== undefined){
                    queryParameters['$top'] = parameters['top'];
                }
        
        
        


 

                if(parameters['skip'] !== undefined){
                    queryParameters['$skip'] = parameters['skip'];
                }
        
        
        


 

                if(parameters['search'] !== undefined){
                    queryParameters['$search'] = parameters['search'];
                }
        
        
        


 

                if(parameters['filter'] !== undefined){
                    queryParameters['$filter'] = parameters['filter'];
                }
        
        
        


 

                if(parameters['count'] !== undefined){
                    queryParameters['$count'] = parameters['count'];
                }
        
        
        


 

                if(parameters['orderby'] !== undefined){
                    queryParameters['$orderby'] = parameters['orderby'];
                }
        
        
        


 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Add new entity to WebsiteLinks
 * @method
 * @name Xapi#CreateWeblink
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - New entity
 */
 Xapi.prototype.CreateWeblink = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/WebsiteLinks';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action ValidateLink
 * @method
 * @name Xapi#ValidateLink
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.ValidateLink = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/WebsiteLinks/Pbx.ValidateLink';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Invoke action BulkLinksDelete
 * @method
 * @name Xapi#BulkLinksDelete
 * @param {object} parameters - method options and parameters
     * @param {} parameters.body - Action parameters
 */
 Xapi.prototype.BulkLinksDelete = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/WebsiteLinks/Pbx.BulkLinksDelete';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Get entity from WebsiteLinks by key
 * @method
 * @name Xapi#GetWeblink
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.link - The unique identifier of Weblink
     * @param {array} parameters.select - Select properties to be returned
     * @param {array} parameters.expand - Expand related entities
 */
 Xapi.prototype.GetWeblink = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/WebsiteLinks({Link})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Link}', parameters['link']);
        
        


        if(parameters['link'] === undefined){
            deferred.reject(new Error('Missing required  parameter: link'));
            return deferred.promise;
        }
 

                if(parameters['select'] !== undefined){
                    queryParameters['$select'] = parameters['select'];
                }
        
        
        


 

                if(parameters['expand'] !== undefined){
                    queryParameters['$expand'] = parameters['expand'];
                }
        
        
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Update entity in WebsiteLinks
 * @method
 * @name Xapi#UpdateWeblink
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.link - The unique identifier of Weblink
     * @param {} parameters.body - New property values
 */
 Xapi.prototype.UpdateWeblink = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/WebsiteLinks({Link})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];
        headers['Content-Type'] = ['application/json'];

        
            path = path.replace('{Link}', parameters['link']);
        
        


        if(parameters['link'] === undefined){
            deferred.reject(new Error('Missing required  parameter: link'));
            return deferred.promise;
        }
 
        
        
        
            if(parameters['body'] !== undefined){
                body = parameters['body'];
            }


        if(parameters['body'] === undefined){
            deferred.reject(new Error('Missing required  parameter: body'));
            return deferred.promise;
        }
 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };
/**
 * Delete entity from WebsiteLinks
 * @method
 * @name Xapi#DeleteWeblink
 * @param {object} parameters - method options and parameters
     * @param {string} parameters.link - The unique identifier of Weblink
     * @param {string} parameters.ifMatch - ETag
 */
 Xapi.prototype.DeleteWeblink = function(parameters){
    if(parameters === undefined) {
        parameters = {};
    }
    var deferred = Q.defer();
    var domain = this.domain,  path = '/WebsiteLinks({Link})';
    var body = {}, queryParameters = {}, headers = {}, form = {};

        headers = this.setAuthHeaders(headers);
        headers['Accept'] = ['application/json'];

        
            path = path.replace('{Link}', parameters['link']);
        
        


        if(parameters['link'] === undefined){
            deferred.reject(new Error('Missing required  parameter: link'));
            return deferred.promise;
        }
 
        
        
                if(parameters['ifMatch'] !== undefined){
                    headers['If-Match'] = parameters['ifMatch'];
                }
        


 
    queryParameters = mergeQueryParams(parameters, queryParameters);

    this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

    return deferred.promise;
 };

    return Xapi;
})();

exports.Xapi = Xapi;
