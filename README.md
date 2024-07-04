node-red-contrib-node-red-contrib-3cx-xapi
================

Node-RED node for node-red-contrib-3cx-xapi

This OData service is located at /xapi/v1

## Install

To install the stable version use the `Menu - Manage palette - Install` 
option and search for node-red-contrib-node-red-contrib-3cx-xapi, or run the following 
command in your Node-RED user directory, typically `~/.node-red`

    npm install node-red-contrib-node-red-contrib-3cx-xapi

## Usage

### Methods

#### GET /ActiveCalls

Get entities from ActiveCalls

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### POST /ActiveCalls({Id})/Pbx.DropCall

Invoke action DropCall

    Id : integer
     
    Accept : 'application/json'

#### GET /ActivityLog/Pbx.GetFilter()

Invoke function GetFilter

     
    Accept : 'application/json'

#### GET /ActivityLog/Pbx.GetLogs(extension={extension},call={call},search={search},severity={severity},top={top},skip={skip})

Invoke function GetLogs

    extension : string
    call : string
    search : string
    severity : string
    top : integer
    skip : integer
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $select : array
    $orderby : array
    $expand : array
     
    Accept : 'application/json'

#### POST /ActivityLog/Pbx.PurgeLogs

Invoke action PurgeLogs

     
    Accept : 'application/json'

#### GET /AntiHackingSettings

Get AntiHackingSettings

    $select : array
    $expand : array
     
    Accept : 'application/json'

#### PATCH /AntiHackingSettings

Update AntiHackingSettings

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /Backups

Get entities from Backups

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### GET /Backups({FileName})/Pbx.GetBackupExtras()

Invoke function GetBackupExtras

    FileName : string
     
    Accept : 'application/json'

#### DELETE /Backups({FileName})

Delete entity from Backups

    FileName : string
    If-Match : string
     
    Accept : 'application/json'

#### POST /Backups({FileName})/Pbx.Restore

Invoke action Restore

    FileName : string
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /Backups/Pbx.Backup

Invoke action Backup

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /Backups/Pbx.GetCanCreateBackup()

Invoke function GetCanCreateBackup

     
    Accept : 'application/json'

#### GET /Backups/Pbx.GetBackupSettings()

Invoke function GetBackupSettings

     
    Accept : 'application/json'

#### GET /Backups/Pbx.GetBackupFailoverSettings()

Invoke function GetBackupFailoverSettings

     
    Accept : 'application/json'

#### POST /Backups/Pbx.SetBackupFailoverSettings

Invoke action SetBackupFailoverSettings

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /Backups/Pbx.GetFailoverScripts()

Invoke function GetFailoverScripts

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
     
    Accept : 'application/json'

#### POST /Backups/Pbx.SetBackupSettings

Invoke action SetBackupSettings

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /Backups/Pbx.GetBackupRepositorySettings()

Invoke function GetBackupRepositorySettings

     
    Accept : 'application/json'

#### POST /Backups/Pbx.SetBackupRepositorySettings

Invoke action SetBackupRepositorySettings

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /Backups/Pbx.GetRestoreSettings()

Invoke function GetRestoreSettings

     
    Accept : 'application/json'

#### POST /Backups/Pbx.SetRestoreSettings

Invoke action SetRestoreSettings

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /BlackListNumbers

Get entities from BlackListNumbers

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### POST /BlackListNumbers

Add new entity to BlackListNumbers

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /BlackListNumbers({Id})

Get entity from BlackListNumbers by key

    Id : string
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### PATCH /BlackListNumbers({Id})

Update entity in BlackListNumbers

    Id : string
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### DELETE /BlackListNumbers({Id})

Delete entity from BlackListNumbers

    Id : string
    If-Match : string
     
    Accept : 'application/json'

#### POST /BlackListNumbers/Pbx.BulkNumbersDelete

Invoke action BulkNumbersDelete

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /Blocklist

Get entities from Blocklist

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### POST /Blocklist

Add new entity to Blocklist

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /Blocklist({Id})

Get entity from Blocklist by key

    Id : integer
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### PATCH /Blocklist({Id})

Update entity in Blocklist

    Id : integer
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### DELETE /Blocklist({Id})

Delete entity from Blocklist

    Id : integer
    If-Match : string
     
    Accept : 'application/json'

#### POST /Blocklist/Pbx.BulkIpsDelete

Invoke action BulkIpsDelete

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /CallCostSettings

Get entities from CallCostSettings

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### POST /CallCostSettings/Pbx.UpdateCost

Invoke action UpdateCost

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /CallCostSettings/Pbx.ExportCallCosts()

Invoke function ExportCallCosts

     
    Accept : 'application/json'

#### GET /CallFlowApps({Id})

Get entity from CallFlowApps by key

    Id : integer
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### PATCH /CallFlowApps({Id})

Update entity in CallFlowApps

    Id : integer
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### DELETE /CallFlowApps({Id})

Delete entity from CallFlowApps

    Id : integer
    If-Match : string
     
    Accept : 'application/json'

#### GET /CallFlowApps

Get entities from CallFlowApps

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### POST /CallFlowApps

Add new entity to CallFlowApps

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /CallFlowApps({Id})/Pbx.GetAudioFiles()

Invoke function GetAudioFiles

    Id : integer
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
     
    Accept : 'application/json'

#### POST /CallFlowApps({Id})/Pbx.DeleteAudioFile

Invoke action DeleteAudioFile

    Id : integer
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /CallHistoryView/Pbx.DownloadCallHistory()

Invoke function DownloadCallHistory

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $select : array
    $orderby : array
    $expand : array
     
    Accept : 'application/json'

#### GET /CallHistoryView

Get entities from CallHistoryView

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### GET /CallParkingSettings

Get CallParkingSettings

    $select : array
    $expand : array
     
    Accept : 'application/json'

#### PATCH /CallParkingSettings

Update CallParkingSettings

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /CallTypesSettings

Get CallTypesSettings

    $select : array
    $expand : array
     
    Accept : 'application/json'

#### PATCH /CallTypesSettings

Update CallTypesSettings

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /CDRSettings

Get CDRSettings

    $select : array
    $expand : array
     
    Accept : 'application/json'

#### PATCH /CDRSettings

Update CDRSettings

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /ChatHistoryView/Pbx.DownloadChatHistory(clientTimeZone={clientTimeZone})

Invoke function DownloadChatHistory

    clientTimeZone : string
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $select : array
    $orderby : array
    $expand : array
     
    Accept : 'application/json'

#### GET /ChatHistoryView

Get entities from ChatHistoryView

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### GET /ChatLogSettings

Get ChatLogSettings

    $select : array
    $expand : array
     
    Accept : 'application/json'

#### PATCH /ChatLogSettings

Update ChatLogSettings

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /ChatMessagesHistoryView/Pbx.DownloadChatMessagesHistory(clientTimeZone={clientTimeZone})

Invoke function DownloadChatMessagesHistory

    clientTimeZone : string
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $select : array
    $orderby : array
    $expand : array
     
    Accept : 'application/json'

#### GET /ChatMessagesHistoryView

Get entities from ChatMessagesHistoryView

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### GET /CodecsSettings

Get CodecsSettings

    $select : array
    $expand : array
     
    Accept : 'application/json'

#### PATCH /CodecsSettings

Update CodecsSettings

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /ConferenceSettings/Pbx.GetWebMeetingZones()

Invoke function GetWebMeetingZones

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
     
    Accept : 'application/json'

#### GET /ConferenceSettings/Pbx.GenerateApiKey()

Invoke function GenerateApiKey

     
    Accept : 'application/json'

#### GET /ConferenceSettings

Get ConferenceSettings

    $select : array
    $expand : array
     
    Accept : 'application/json'

#### PATCH /ConferenceSettings

Update ConferenceSettings

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /ConferenceSettings/Pbx.GetMCURequestStatus()

Invoke function GetMCURequestStatus

     
    Accept : 'application/json'

#### GET /ConferenceSettings/Pbx.GetOnboardMcuData()

Invoke function GetOnboardMcuData

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
     
    Accept : 'application/json'

#### GET /ConferenceSettings/Pbx.GetOnboardMeetings()

Invoke function GetOnboardMeetings

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
     
    Accept : 'application/json'

#### GET /ConferenceSettings/Pbx.GetMCURows()

Invoke function GetMCURows

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
     
    Accept : 'application/json'

#### GET /ConferenceSettings/Pbx.GetMCURow(guid={guid})

Invoke function GetMCURow

    guid : string
     
    Accept : 'application/json'

#### POST /ConferenceSettings/Pbx.UpdateMCURequestStatus

Invoke action UpdateMCURequestStatus

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /ConsoleRestrictions

Get ConsoleRestrictions

    $select : array
    $expand : array
     
    Accept : 'application/json'

#### PATCH /ConsoleRestrictions

Update ConsoleRestrictions

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /Contacts

Get entities from Contacts

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### POST /Contacts

Add new entity to Contacts

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /Contacts/Pbx.SetDirSearchSettings

Invoke action SetDirSearchSettings

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /Contacts/Pbx.GetDirSearchSettings()

Invoke function GetDirSearchSettings

     
    Accept : 'application/json'

#### POST /Contacts/Pbx.BatchContactsDelete

Invoke action BatchContactsDelete

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /Contacts/Pbx.Office365ContactsBulkDelete

Invoke action Office365ContactsBulkDelete

     
    Accept : 'application/json'

#### POST /Contacts/Pbx.CRMContactsBulkDelete

Invoke action CRMContactsBulkDelete

     
    Accept : 'application/json'

#### POST /Contacts/Pbx.AllContactsBulkDelete

Invoke action AllContactsBulkDelete

     
    Accept : 'application/json'

#### GET /Contacts/Pbx.ExportContacts()

Invoke function ExportContacts

     
    Accept : 'application/json'

#### GET /Contacts({Id})

Get entity from Contacts by key

    Id : integer
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### PATCH /Contacts({Id})

Update entity in Contacts

    Id : integer
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### DELETE /Contacts({Id})

Delete entity from Contacts

    Id : integer
    If-Match : string
     
    Accept : 'application/json'

#### GET /Countries

Get entities from Countries

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### GET /CountryCodes

Get CountryCodes

    $select : array
    $expand : array
     
    Accept : 'application/json'

#### PATCH /CountryCodes

Update CountryCodes

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /CrmIntegration

Get CrmIntegration

    $select : array
    $expand : array
     
    Accept : 'application/json'

#### PATCH /CrmIntegration

Update CrmIntegration

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /CrmIntegration/Pbx.Test

Invoke action Test

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /CrmIntegration/Pbx.DeleteCrmContacts

Invoke action DeleteCrmContacts

     
    Accept : 'application/json'

#### POST /CrmIntegration/Pbx.SetOAuthState

Invoke action SetOAuthState

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /CrmIntegration/Pbx.GetOAuth(variable={variable})

Invoke function GetOAuth

    variable : string
     
    Accept : 'application/json'

#### GET /CrmIntegration/Pbx.GetCrmTemplateSource(name={name})

Invoke function GetCrmTemplateSource

    name : string
     
    Accept : 'application/json'

#### GET /CrmTemplates/Pbx.GeCrmtTemplates()

Invoke function GeCrmtTemplates

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $select : array
    $orderby : array
    $expand : array
     
    Accept : 'application/json'

#### GET /CrmTemplates({Name})

Get entity from CrmTemplates by key

    Name : string
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### DELETE /CrmTemplates({Name})

Delete entity from CrmTemplates

    Name : string
    If-Match : string
     
    Accept : 'application/json'

#### GET /CustomPrompts

Get entities from CustomPrompts

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### DELETE /CustomPrompts({Filename})

Delete entity from CustomPrompts

    Filename : string
    If-Match : string
     
    Accept : 'application/json'

#### GET /Defs

Get Defs

    $select : array
    $expand : array
     
    Accept : 'application/json'

#### GET /Defs/Codecs

Get Codecs from Defs

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### GET /Defs/GatewayParameters

Get GatewayParameters from Defs

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### GET /Defs/GatewayParameterValues

Get GatewayParameterValues from Defs

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### GET /Defs/TimeZones

Get TimeZones from Defs

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### GET /Defs/Pbx.GetSystemParameters()

Invoke function GetSystemParameters

     
    Accept : 'application/json'

#### GET /Defs/Pbx.HasSystemOwner()

Invoke function HasSystemOwner

     
    Accept : 'application/json'

#### POST /Defs/Pbx.GetRoutes

Invoke action GetRoutes

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /DeviceInfos

Get entities from DeviceInfos

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### GET /DeviceInfos({Id})

Get entity from DeviceInfos by key

    Id : integer
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### DELETE /DeviceInfos({Id})

Delete entity from DeviceInfos

    Id : integer
    If-Match : string
     
    Accept : 'application/json'

#### POST /DeviceInfos({Id})/Pbx.Provision

Invoke action Provision

    Id : integer
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /DialCodeSettings

Get DialCodeSettings

    $select : array
    $expand : array
     
    Accept : 'application/json'

#### PATCH /DialCodeSettings

Update DialCodeSettings

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /DidNumbers

Get entities from DidNumbers

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### GET /DNProperties/Pbx.GetPropertiesByDn(dnNumber={dnNumber})

Invoke function GetPropertiesByDn

    dnNumber : string
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $select : array
    $orderby : array
    $expand : array
     
    Accept : 'application/json'

#### POST /DNProperties/Pbx.CreateDNProperty

Invoke action CreateDNProperty

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /DNProperties/Pbx.UpdateDNProperty

Invoke action UpdateDNProperty

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /DNProperties/Pbx.DeleteDNProperty

Invoke action DeleteDNProperty

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /DNProperties/Pbx.GetDNPropertyByName(dnNumber={dnNumber},name={name})

Invoke function GetDNPropertyByName

    dnNumber : string
    name : string
     
    Accept : 'application/json'

#### GET /E164Settings

Get E164Settings

    $select : array
    $expand : array
     
    Accept : 'application/json'

#### PATCH /E164Settings

Update E164Settings

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /EmailTemplate

Get entities from EmailTemplate

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### GET /EmailTemplate({TemplatePath})

Get entity from EmailTemplate by key

    TemplatePath : string
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### PATCH /EmailTemplate({TemplatePath})

Update entity in EmailTemplate

    TemplatePath : string
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /EmailTemplate({TemplatePath})/Pbx.SetDefault

Invoke action SetDefault

    TemplatePath : string
     
    Accept : 'application/json'

#### GET /EmergencyNotificationsSettings

Get EmergencyNotificationsSettings

    $select : array
    $expand : array
     
    Accept : 'application/json'

#### PATCH /EmergencyNotificationsSettings

Update EmergencyNotificationsSettings

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /EventLogs

Get entities from EventLogs

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### GET /EventLogs/Pbx.DownloadEventLogs()

Invoke function DownloadEventLogs

     
    Accept : 'application/json'

#### POST /EventLogs/Pbx.PurgeEventLog

Invoke action PurgeEventLog

     
    Accept : 'application/json'

#### GET /Fax/Pbx.InitFax()

Invoke function InitFax

     
    Accept : 'application/json'

#### GET /Fax

Get entities from Fax

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### POST /Fax

Add new entity to Fax

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /Fax({Id})

Get entity from Fax by key

    Id : integer
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### PATCH /Fax({Id})

Update entity in Fax

    Id : integer
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### DELETE /Fax({Id})

Delete entity from Fax

    Id : integer
    If-Match : string
     
    Accept : 'application/json'

#### POST /Fax/Pbx.BulkFaxDelete

Invoke action BulkFaxDelete

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /Fax/Pbx.GetByNumber(number={number})

Invoke function GetByNumber

    number : string
     
    Accept : 'application/json'

#### GET /FaxServerSettings

Get FaxServerSettings

    $select : array
    $expand : array
     
    Accept : 'application/json'

#### PATCH /FaxServerSettings

Update FaxServerSettings

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /FaxServerSettings/Pbx.GetFaxFilesSize()

Invoke function GetFaxFilesSize

     
    Accept : 'application/json'

#### POST /FaxServerSettings/Pbx.CleanUpFax

Invoke action CleanUpFax

     
    Accept : 'application/json'

#### GET /Firewall

Get Firewall

    $select : array
    $expand : array
     
    Accept : 'application/json'

#### GET /Firewall/Pbx.GetLastResult()

Invoke function GetLastResult

     
    Accept : 'application/json'

#### POST /Firewall/Pbx.StartCheck

Invoke action StartCheck

     
    Accept : 'application/json'

#### POST /Firewall/Pbx.StopCheck

Invoke action StopCheck

     
    Accept : 'application/json'

#### GET /Firmware

Get Firmware

    $select : array
    $expand : array
     
    Accept : 'application/json'

#### POST /Firmware/Pbx.CleanUp

Invoke action CleanUp

     
    Accept : 'application/json'

#### GET /Fxs

Get entities from Fxs

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### POST /Fxs

Add new entity to Fxs

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /Fxs({MacAddress})

Get entity from Fxs by key

    MacAddress : string
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### PATCH /Fxs({MacAddress})

Update entity in Fxs

    MacAddress : string
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### DELETE /Fxs({MacAddress})

Delete entity from Fxs

    MacAddress : string
    If-Match : string
     
    Accept : 'application/json'

#### GET /FxsTemplates

Get entities from FxsTemplates

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### POST /FxsTemplates

Add new entity to FxsTemplates

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /FxsTemplates({Id})

Get entity from FxsTemplates by key

    Id : string
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### PATCH /FxsTemplates({Id})

Update entity in FxsTemplates

    Id : string
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### DELETE /FxsTemplates({Id})

Delete entity from FxsTemplates

    Id : string
    If-Match : string
     
    Accept : 'application/json'

#### GET /GeneralSettingsForApps

Get GeneralSettingsForApps

    $select : array
    $expand : array
     
    Accept : 'application/json'

#### PATCH /GeneralSettingsForApps

Update GeneralSettingsForApps

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /GeneralSettingsForPbx

Get GeneralSettingsForPbx

    $select : array
    $expand : array
     
    Accept : 'application/json'

#### PATCH /GeneralSettingsForPbx

Update GeneralSettingsForPbx

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /GoogleSettings

Get GoogleSettings

    $select : array
    $expand : array
     
    Accept : 'application/json'

#### PATCH /GoogleSettings

Update GoogleSettings

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /Groups({Id})

Get entity from Groups by key

    Id : integer
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### PATCH /Groups({Id})

Update entity in Groups

    Id : integer
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### DELETE /Groups({Id})

Delete entity from Groups

    Id : integer
    If-Match : string
     
    Accept : 'application/json'

#### GET /Groups

Get entities from Groups

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### POST /Groups

Add new entity to Groups

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /Groups({Id})/Pbx.GetRestrictions()

Invoke function GetRestrictions

    Id : integer
     
    Accept : 'application/json'

#### POST /Groups/Pbx.DeleteCompanyByNumber

Invoke action DeleteCompanyByNumber

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /Groups/Pbx.DeleteCompanyById

Invoke action DeleteCompanyById

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /Groups({Id})/Members

Get Members from Groups

    Id : integer
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### GET /Groups({Id})/Rights

Get Rights from Groups

    Id : integer
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### POST /Groups/Pbx.ReplaceGroupLicenseKey

Invoke action ReplaceGroupLicenseKey

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /Groups/Pbx.LinkGroupPartner

Invoke action LinkGroupPartner

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /Groups/Pbx.UnlinkGroupPartner

Invoke action UnlinkGroupPartner

     
    Accept : 'application/json'

#### GET /HotelServices

Get HotelServices

    $select : array
    $expand : array
     
    Accept : 'application/json'

#### PATCH /HotelServices

Update HotelServices

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /InboundRules

Get entities from InboundRules

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### POST /InboundRules

Add new entity to InboundRules

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /InboundRules({Id})

Get entity from InboundRules by key

    Id : integer
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### PATCH /InboundRules({Id})

Update entity in InboundRules

    Id : integer
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### DELETE /InboundRules({Id})

Delete entity from InboundRules

    Id : integer
    If-Match : string
     
    Accept : 'application/json'

#### POST /InboundRules/Pbx.BulkInboundRulesDelete

Invoke action BulkInboundRulesDelete

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /LicenseInfo

Get LicenseInfo

    $select : array
    $expand : array
     
    Accept : 'application/json'

#### POST /LicenseInfo/Pbx.ReplaceLicenseKey

Invoke action ReplaceLicenseKey

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /LicenseInfo/Pbx.EditLicenseInfo

Invoke action EditLicenseInfo

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /LicenseStatus/Pbx.RefreshLicenseStatus

Invoke action RefreshLicenseStatus

     
    Accept : 'application/json'

#### GET /LicenseStatus

Get LicenseStatus

    $select : array
    $expand : array
     
    Accept : 'application/json'

#### POST /LicenseStatus/Pbx.UnlinkPartner

Invoke action UnlinkPartner

     
    Accept : 'application/json'

#### POST /LicenseStatus/Pbx.LinkPartner

Invoke action LinkPartner

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /LicenseStatus/Pbx.PartnerInfo(resellerId={resellerId})

Invoke function PartnerInfo

    resellerId : string
     
    Accept : 'application/json'

#### GET /LoggingSettings

Get LoggingSettings

    $select : array
    $expand : array
     
    Accept : 'application/json'

#### PATCH /LoggingSettings

Update LoggingSettings

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /Microsoft365Integration/Pbx.TestSubscription()

Invoke function TestSubscription

     
    Accept : 'application/json'

#### GET /Microsoft365Integration

Get Microsoft365Integration

    $select : array
    $expand : array
     
    Accept : 'application/json'

#### PATCH /Microsoft365Integration

Update Microsoft365Integration

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /Microsoft365Integration/Pbx.AuthorizePresence

Invoke action AuthorizePresence

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /Microsoft365Integration/Pbx.TestPresence

Invoke action TestPresence

     
    Accept : 'application/json'

#### POST /Microsoft365Integration/Pbx.DeauthorizePresence

Invoke action DeauthorizePresence

     
    Accept : 'application/json'

#### GET /Microsoft365Integration/Pbx.GetMicrosoftAccessToken()

Invoke function GetMicrosoftAccessToken

     
    Accept : 'application/json'

#### GET /Microsoft365Integration/Pbx.GetMicrosoft365Directory()

Invoke function GetMicrosoft365Directory

     
    Accept : 'application/json'

#### POST /Microsoft365Integration/Pbx.GetUsers

Invoke action GetUsers

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /Microsoft365Integration/Pbx.GetUsersByPrincipalNames

Invoke action GetUsersByPrincipalNames

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /Microsoft365TeamsIntegration

Get Microsoft365TeamsIntegration

    $select : array
    $expand : array
     
    Accept : 'application/json'

#### PATCH /Microsoft365TeamsIntegration

Update Microsoft365TeamsIntegration

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /Microsoft365TeamsIntegration/Pbx.CheckFqdnRecord(fqdn={fqdn})

Invoke function CheckFqdnRecord

    fqdn : string
     
    Accept : 'application/json'

#### GET /Microsoft365TeamsIntegration/Pbx.GetDialPlanScript()

Invoke function GetDialPlanScript

     
    Accept : 'application/json'

#### GET /Microsoft365TeamsIntegration/Pbx.GetMapUsersScript()

Invoke function GetMapUsersScript

     
    Accept : 'application/json'

#### GET /Microsoft365TeamsIntegration/Pbx.CheckMapUsersScript()

Invoke function CheckMapUsersScript

     
    Accept : 'application/json'

#### GET /MusicOnHoldSettings

Get MusicOnHoldSettings

    $select : array
    $expand : array
     
    Accept : 'application/json'

#### PATCH /MusicOnHoldSettings

Update MusicOnHoldSettings

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /MyGroup

Get MyGroup

    $select : array
    $expand : array
     
    Accept : 'application/json'

#### PATCH /MyGroup

Update MyGroup

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /MyGroup/Members

Get Members from MyGroup

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### GET /MyGroup/Rights

Get Rights from MyGroup

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### GET /MyGroup/Pbx.GetRestrictions()

Invoke function GetRestrictions

     
    Accept : 'application/json'

#### POST /MyGroup/Pbx.ReplaceMyGroupLicenseKey

Invoke action ReplaceMyGroupLicenseKey

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /MyGroup/Pbx.GetMyGroupPartnerInfo(resellerId={resellerId})

Invoke function GetMyGroupPartnerInfo

    resellerId : string
     
    Accept : 'application/json'

#### POST /MyGroup/Pbx.UnlinkMyGroupPartner

Invoke action UnlinkMyGroupPartner

     
    Accept : 'application/json'

#### POST /MyGroup/Pbx.LinkMyGroupPartner

Invoke action LinkMyGroupPartner

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /MyTokens

Get entities from MyTokens

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### POST /MyTokens({Id})/Pbx.RevokeToken

Invoke action RevokeToken

    Id : integer
     
    Accept : 'application/json'

#### GET /MyUser

Get MyUser

    $select : array
    $expand : array
     
    Accept : 'application/json'

#### PATCH /MyUser

Update MyUser

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /MyUser/Groups

Get Groups from MyUser

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### GET /MyUser/ForwardingProfiles

Get ForwardingProfiles from MyUser

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### GET /MyUser/Greetings

Get Greetings from MyUser

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### GET /MyUser/Pbx.GenerateProvLink()

Invoke function GenerateProvLink

     
    Accept : 'application/json'

#### GET /NetworkInterfaces

Get entities from NetworkInterfaces

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### GET /NetworkSettings

Get NetworkSettings

    $select : array
    $expand : array
     
    Accept : 'application/json'

#### PATCH /NetworkSettings

Update NetworkSettings

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /NetworkSettings/Pbx.GetIfaces()

Invoke function GetIfaces

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
     
    Accept : 'application/json'

#### GET /NotificationSettings

Get NotificationSettings

    $select : array
    $expand : array
     
    Accept : 'application/json'

#### PATCH /NotificationSettings

Update NotificationSettings

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /NotificationSettings/Pbx.TestEmail

Invoke action TestEmail

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /OfficeHours

Get OfficeHours

    $select : array
    $expand : array
     
    Accept : 'application/json'

#### PATCH /OfficeHours

Update OfficeHours

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /OutboundRules({Id})

Get entity from OutboundRules by key

    Id : integer
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### PATCH /OutboundRules({Id})

Update entity in OutboundRules

    Id : integer
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### DELETE /OutboundRules({Id})

Delete entity from OutboundRules

    Id : integer
    If-Match : string
     
    Accept : 'application/json'

#### GET /OutboundRules

Get entities from OutboundRules

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### POST /OutboundRules

Add new entity to OutboundRules

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /OutboundRules/Pbx.GetEmergencyOutboundRules()

Invoke function GetEmergencyOutboundRules

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $select : array
    $orderby : array
    $expand : array
     
    Accept : 'application/json'

#### POST /OutboundRules/Pbx.Purge

Invoke action Purge

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /OutboundRules/Pbx.MoveUpDown

Invoke action MoveUpDown

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /Parameters/Pbx.GetParameterByName(name={name})

Invoke function GetParameterByName

    name : string
     
    Accept : 'application/json'

#### GET /Parameters

Get entities from Parameters

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### POST /Parameters

Add new entity to Parameters

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /Parameters({Id})

Get entity from Parameters by key

    Id : integer
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### PATCH /Parameters({Id})

Update entity in Parameters

    Id : integer
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### DELETE /Parameters({Id})

Delete entity from Parameters

    Id : integer
    If-Match : string
     
    Accept : 'application/json'

#### GET /Parkings({Id})/Groups

Get Groups from Parkings

    Id : integer
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### GET /Parkings/Pbx.GetByNumber(number={number})

Invoke function GetByNumber

    number : string
     
    Accept : 'application/json'

#### GET /Parkings

Get entities from Parkings

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### POST /Parkings

Add new entity to Parkings

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /Parkings({Id})

Get entity from Parkings by key

    Id : integer
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### PATCH /Parkings({Id})

Update entity in Parkings

    Id : integer
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### DELETE /Parkings({Id})

Delete entity from Parkings

    Id : integer
    If-Match : string
     
    Accept : 'application/json'

#### GET /Peers

Get entities from Peers

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### GET /Peers/Pbx.GetPeerByNumber(number={number})

Invoke function GetPeerByNumber

    number : string
     
    Accept : 'application/json'

#### GET /Peers/Pbx.GetReportPeers()

Invoke function GetReportPeers

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $select : array
    $orderby : array
    $expand : array
     
    Accept : 'application/json'

#### GET /PhoneBookSettings

Get PhoneBookSettings

    $select : array
    $expand : array
     
    Accept : 'application/json'

#### PATCH /PhoneBookSettings

Update PhoneBookSettings

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /PhoneLogos

Get entities from PhoneLogos

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### DELETE /PhoneLogos({Filename})

Delete entity from PhoneLogos

    Filename : string
    If-Match : string
     
    Accept : 'application/json'

#### GET /PhonesSettings

Get PhonesSettings

    $select : array
    $expand : array
     
    Accept : 'application/json'

#### PATCH /PhonesSettings

Update PhonesSettings

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /PhoneTemplates

Get entities from PhoneTemplates

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### POST /PhoneTemplates

Add new entity to PhoneTemplates

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /PhoneTemplates({Id})

Get entity from PhoneTemplates by key

    Id : string
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### PATCH /PhoneTemplates({Id})

Update entity in PhoneTemplates

    Id : string
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### DELETE /PhoneTemplates({Id})

Delete entity from PhoneTemplates

    Id : string
    If-Match : string
     
    Accept : 'application/json'

#### GET /Playlists

Get entities from Playlists

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### POST /Playlists

Add new entity to Playlists

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /Playlists({Name})

Get entity from Playlists by key

    Name : string
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### PATCH /Playlists({Name})

Update entity in Playlists

    Name : string
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### DELETE /Playlists({Name})

Delete entity from Playlists

    Name : string
    If-Match : string
     
    Accept : 'application/json'

#### POST /Playlists/Pbx.DeletePlaylistFile

Invoke action DeletePlaylistFile

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /Playlists/Pbx.DownloadPlaylistFile(playlistKey={playlistKey},fileName={fileName})

Invoke function DownloadPlaylistFile

    playlistKey : string
    fileName : string
     
    Accept : 'application/json'

#### GET /PromptSets

Get entities from PromptSets

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### GET /PromptSets({Id})

Get entity from PromptSets by key

    Id : integer
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### PATCH /PromptSets({Id})

Update entity in PromptSets

    Id : integer
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### DELETE /PromptSets({Id})

Delete entity from PromptSets

    Id : integer
    If-Match : string
     
    Accept : 'application/json'

#### GET /PromptSets/Pbx.GetActive()

Invoke function GetActive

     
    Accept : 'application/json'

#### GET /PromptSets({Id})/Prompts

Get Prompts from PromptSets

    Id : integer
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### POST /PromptSets({Id})/Pbx.SetActive

Invoke action SetActive

    Id : integer
     
    Accept : 'application/json'

#### POST /PromptSets({Id})/Pbx.SetAlternatePronunciation

Invoke action SetAlternatePronunciation

    Id : integer
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /PromptSets({Id})/Pbx.Copy

Invoke action Copy

    Id : integer
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /PromptSets({Id})/Pbx.PlayPrompt

Invoke action PlayPrompt

    Id : integer
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /PromptSets({Id})/Pbx.RecordPrompt

Invoke action RecordPrompt

    Id : integer
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /PurgeCalls

Invoke actionImport PurgeCalls

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /PurgeChats

Invoke actionImport PurgeChats

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /Queues({Id})/Agents

Get Agents from Queues

    Id : integer
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### GET /Queues({Id})/Managers

Get Managers from Queues

    Id : integer
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### POST /Queues({Id})/Pbx.ResetQueueStatistics

Invoke action ResetQueueStatistics

    Id : integer
     
    Accept : 'application/json'

#### GET /Queues/Pbx.GetFirstAvailableQueueNumber()

Invoke function GetFirstAvailableQueueNumber

     
    Accept : 'application/json'

#### GET /Queues/Pbx.GetByNumber(number={number})

Invoke function GetByNumber

    number : string
     
    Accept : 'application/json'

#### GET /Queues

Get entities from Queues

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### POST /Queues

Add new entity to Queues

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /Queues({Id})

Get entity from Queues by key

    Id : integer
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### PATCH /Queues({Id})

Update entity in Queues

    Id : integer
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### DELETE /Queues({Id})

Delete entity from Queues

    Id : integer
    If-Match : string
     
    Accept : 'application/json'

#### GET /Receptionists({Id})/Forwards

Get Forwards from Receptionists

    Id : integer
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### GET /Receptionists/Pbx.GetFirstAvailableReceptionistNumber()

Invoke function GetFirstAvailableReceptionistNumber

     
    Accept : 'application/json'

#### GET /Receptionists/Pbx.GetByNumber(number={number})

Invoke function GetByNumber

    number : string
     
    Accept : 'application/json'

#### GET /Receptionists

Get entities from Receptionists

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### POST /Receptionists

Add new entity to Receptionists

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /Receptionists({Id})

Get entity from Receptionists by key

    Id : integer
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### PATCH /Receptionists({Id})

Update entity in Receptionists

    Id : integer
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### DELETE /Receptionists({Id})

Delete entity from Receptionists

    Id : integer
    If-Match : string
     
    Accept : 'application/json'

#### GET /Recordings

Get entities from Recordings

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### GET /Recordings/Pbx.DownloadRecording(recId={recId})

Invoke function DownloadRecording

    recId : integer
     
    Accept : 'application/json'

#### GET /Recordings/Pbx.GetRecordingRepositorySettings()

Invoke function GetRecordingRepositorySettings

     
    Accept : 'application/json'

#### POST /Recordings/Pbx.SetRecordingRepositorySettings

Invoke action SetRecordingRepositorySettings

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /Recordings/Pbx.GetRecordingSettings()

Invoke function GetRecordingSettings

     
    Accept : 'application/json'

#### POST /Recordings/Pbx.SetRecordingSettings

Invoke action SetRecordingSettings

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /Recordings/Pbx.PurgeLocal

Invoke action PurgeLocal

     
    Accept : 'application/json'

#### POST /Recordings/Pbx.PurgeArchive

Invoke action PurgeArchive

     
    Accept : 'application/json'

#### POST /Recordings/Pbx.Archive

Invoke action Archive

     
    Accept : 'application/json'

#### POST /Recordings/Pbx.BulkRecordingsDelete

Invoke action BulkRecordingsDelete

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /Recordings/Pbx.BulkRecordingsArchive

Invoke action BulkRecordingsArchive

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /ReportAbandonedChatsStatistics/Pbx.GetAbandonedChatsStatisticsData(queueDnStr={queueDnStr},startDt={startDt},endDt={endDt},participantType={participantType})

Invoke function GetAbandonedChatsStatisticsData

    queueDnStr : string
    startDt : string
    endDt : string
    participantType : integer
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $select : array
    $orderby : array
    $expand : array
     
    Accept : 'application/json'

#### GET /ReportAbandonedChatsStatistics/Pbx.DownloadAbandonedChatsStatistics(queueDnStr={queueDnStr},startDt={startDt},endDt={endDt},participantType={participantType},clientTimeZone={clientTimeZone})

Invoke function DownloadAbandonedChatsStatistics

    queueDnStr : string
    startDt : string
    endDt : string
    participantType : integer
    clientTimeZone : string
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $select : array
    $orderby : array
    $expand : array
     
    Accept : 'application/json'

#### GET /ReportAbandonedQueueCalls/Pbx.GetAbandonedQueueCallsData(periodFrom={periodFrom},periodTo={periodTo},queueDns={queueDns},waitInterval={waitInterval})

Invoke function GetAbandonedQueueCallsData

    periodFrom : string
    periodTo : string
    queueDns : string
    waitInterval : string
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $select : array
    $orderby : array
    $expand : array
     
    Accept : 'application/json'

#### GET /ReportAbandonedQueueCalls/Pbx.DownloadAbandonedQueueCalls(periodFrom={periodFrom},periodTo={periodTo},queueDns={queueDns},waitInterval={waitInterval},clientTimeZone={clientTimeZone})

Invoke function DownloadAbandonedQueueCalls

    periodFrom : string
    periodTo : string
    queueDns : string
    waitInterval : string
    clientTimeZone : string
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $select : array
    $orderby : array
    $expand : array
     
    Accept : 'application/json'

#### GET /ReportAgentLoginHistory/Pbx.GetAgentLoginHistoryData(clientTimeZone={clientTimeZone},startDt={startDt},endDt={endDt},queueDnStr={queueDnStr},agentDnStr={agentDnStr})

Invoke function GetAgentLoginHistoryData

    clientTimeZone : string
    startDt : string
    endDt : string
    queueDnStr : string
    agentDnStr : string
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $select : array
    $orderby : array
    $expand : array
     
    Accept : 'application/json'

#### GET /ReportAgentLoginHistory/Pbx.DownloadAgentLoginHistory(clientTimeZone={clientTimeZone},startDt={startDt},endDt={endDt},queueDnStr={queueDnStr},agentDnStr={agentDnStr})

Invoke function DownloadAgentLoginHistory

    clientTimeZone : string
    startDt : string
    endDt : string
    queueDnStr : string
    agentDnStr : string
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $select : array
    $orderby : array
    $expand : array
     
    Accept : 'application/json'

#### GET /ReportAgentsInQueueStatistics/Pbx.GetAgentsInQueueStatisticsData(queueDnStr={queueDnStr},startDt={startDt},endDt={endDt},waitInterval={waitInterval})

Invoke function GetAgentsInQueueStatisticsData

    queueDnStr : string
    startDt : string
    endDt : string
    waitInterval : string
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $select : array
    $orderby : array
    $expand : array
     
    Accept : 'application/json'

#### GET /ReportAgentsInQueueStatistics/Pbx.DownloadAgentsInQueueStatistics(queueDnStr={queueDnStr},startDt={startDt},endDt={endDt},waitInterval={waitInterval})

Invoke function DownloadAgentsInQueueStatistics

    queueDnStr : string
    startDt : string
    endDt : string
    waitInterval : string
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $select : array
    $orderby : array
    $expand : array
     
    Accept : 'application/json'

#### GET /ReportAuditLog/Pbx.GetAuditLogData()

Invoke function GetAuditLogData

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $select : array
    $orderby : array
    $expand : array
     
    Accept : 'application/json'

#### GET /ReportAuditLog/Pbx.DownloadAuditLog(clientTimeZone={clientTimeZone})

Invoke function DownloadAuditLog

    clientTimeZone : string
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $select : array
    $orderby : array
    $expand : array
     
    Accept : 'application/json'

#### GET /ReportAverageQueueWaitingTime/Pbx.GetAverageQueueWaitingTimeData(chartDate={chartDate},chartBy={chartBy},queueDnStr={queueDnStr},waitInterval={waitInterval},clientTimeZone={clientTimeZone})

Invoke function GetAverageQueueWaitingTimeData

    chartDate : string
    chartBy : string
    queueDnStr : string
    waitInterval : string
    clientTimeZone : string
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $select : array
    $orderby : array
    $expand : array
     
    Accept : 'application/json'

#### GET /ReportAverageQueueWaitingTime/Pbx.DownloadAverageQueueWaitingTimeReport(chartDate={chartDate},chartBy={chartBy},queueDnStr={queueDnStr},waitInterval={waitInterval},clientTimeZone={clientTimeZone})

Invoke function DownloadAverageQueueWaitingTimeReport

    chartDate : string
    chartBy : string
    queueDnStr : string
    waitInterval : string
    clientTimeZone : string
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $select : array
    $orderby : array
    $expand : array
     
    Accept : 'application/json'

#### GET /ReportBreachesSla/Pbx.GetBreachesSlaData(queueDnStr={queueDnStr},startDt={startDt},endDt={endDt},waitInterval={waitInterval})

Invoke function GetBreachesSlaData

    queueDnStr : string
    startDt : string
    endDt : string
    waitInterval : string
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $select : array
    $orderby : array
    $expand : array
     
    Accept : 'application/json'

#### GET /ReportBreachesSla/Pbx.DownloadBreachesSla(queueDnStr={queueDnStr},startDt={startDt},endDt={endDt},waitInterval={waitInterval},clientTimeZone={clientTimeZone})

Invoke function DownloadBreachesSla

    queueDnStr : string
    startDt : string
    endDt : string
    waitInterval : string
    clientTimeZone : string
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $select : array
    $orderby : array
    $expand : array
     
    Accept : 'application/json'

#### GET /ReportCallCostByExtensionGroup/Pbx.GetCallCostByExtensionGroupData(periodFrom={periodFrom},periodTo={periodTo},groupFilter={groupFilter},callClass={callClass})

Invoke function GetCallCostByExtensionGroupData

    periodFrom : string
    periodTo : string
    groupFilter : string
    callClass : integer
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $select : array
    $orderby : array
    $expand : array
     
    Accept : 'application/json'

#### GET /ReportCallCostByExtensionGroup/Pbx.DownloadCallCostByExtensionGroup(periodFrom={periodFrom},periodTo={periodTo},groupFilter={groupFilter},callClass={callClass},clientTimeZone={clientTimeZone})

Invoke function DownloadCallCostByExtensionGroup

    periodFrom : string
    periodTo : string
    groupFilter : string
    callClass : integer
    clientTimeZone : string
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $select : array
    $orderby : array
    $expand : array
     
    Accept : 'application/json'

#### GET /ReportCallDistribution/Pbx.GetCallDistributionData(chartDate={chartDate},chartBy={chartBy},includeInternalCalls={includeInternalCalls},includeQueueCalls={includeQueueCalls},queueDnStr={queueDnStr},groupStr={groupStr},clientTimeZone={clientTimeZone},waitInterval={waitInterval})

Invoke function GetCallDistributionData

    chartDate : string
    chartBy : string
    includeInternalCalls : boolean
    includeQueueCalls : boolean
    queueDnStr : string
    groupStr : string
    clientTimeZone : string
    waitInterval : string
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $select : array
    $orderby : array
    $expand : array
     
    Accept : 'application/json'

#### GET /ReportCallDistribution/Pbx.DownloadCallDistributionReport(chartDate={chartDate},chartBy={chartBy},includeInternalCalls={includeInternalCalls},includeQueueCalls={includeQueueCalls},queueDnStr={queueDnStr},groupStr={groupStr},clientTimeZone={clientTimeZone},waitInterval={waitInterval})

Invoke function DownloadCallDistributionReport

    chartDate : string
    chartBy : string
    includeInternalCalls : boolean
    includeQueueCalls : boolean
    queueDnStr : string
    groupStr : string
    clientTimeZone : string
    waitInterval : string
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $select : array
    $orderby : array
    $expand : array
     
    Accept : 'application/json'

#### GET /ReportCallLogData/Pbx.GetCallLogData(periodFrom={periodFrom},periodTo={periodTo},sourceType={sourceType},sourceFilter={sourceFilter},destinationType={destinationType},destinationFilter={destinationFilter},callsType={callsType},callTimeFilterType={callTimeFilterType},callTimeFilterFrom={callTimeFilterFrom},callTimeFilterTo={callTimeFilterTo},hidePcalls={hidePcalls})

Invoke function GetCallLogData

    periodFrom : string
    periodTo : string
    sourceType : integer
    sourceFilter : string
    destinationType : integer
    destinationFilter : string
    callsType : integer
    callTimeFilterType : integer
    callTimeFilterFrom : string
    callTimeFilterTo : string
    hidePcalls : boolean
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $select : array
    $orderby : array
    $expand : array
     
    Accept : 'application/json'

#### GET /ReportCallLogData/Pbx.DownloadCallLog(periodFrom={periodFrom},periodTo={periodTo},sourceType={sourceType},sourceFilter={sourceFilter},destinationType={destinationType},destinationFilter={destinationFilter},callsType={callsType},callTimeFilterType={callTimeFilterType},callTimeFilterFrom={callTimeFilterFrom},callTimeFilterTo={callTimeFilterTo},hidePcalls={hidePcalls},clientTimeZone={clientTimeZone})

Invoke function DownloadCallLog

    periodFrom : string
    periodTo : string
    sourceType : integer
    sourceFilter : string
    destinationType : integer
    destinationFilter : string
    callsType : integer
    callTimeFilterType : integer
    callTimeFilterFrom : string
    callTimeFilterTo : string
    hidePcalls : boolean
    clientTimeZone : string
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $select : array
    $orderby : array
    $expand : array
     
    Accept : 'application/json'

#### GET /ReportCallLogData/Pbx.GetCallQualityReport(call_id={call_id},srcNumber={srcNumber},dstNumber={dstNumber},srcCallerId={srcCallerId},dstCallerId={dstCallerId})

Invoke function GetCallQualityReport

    call_id : integer
    srcNumber : string
    dstNumber : string
    srcCallerId : string
    dstCallerId : string
     
    Accept : 'application/json'

#### GET /ReportDetailedQueueStatistics/Pbx.GetDetailedQueueStatisticsData(queueDnStr={queueDnStr},startDt={startDt},endDt={endDt},waitInterval={waitInterval})

Invoke function GetDetailedQueueStatisticsData

    queueDnStr : string
    startDt : string
    endDt : string
    waitInterval : string
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $select : array
    $orderby : array
    $expand : array
     
    Accept : 'application/json'

#### GET /ReportDetailedQueueStatistics/Pbx.DownloadDetailedQueueStatistics(queueDnStr={queueDnStr},startDt={startDt},endDt={endDt},waitInterval={waitInterval})

Invoke function DownloadDetailedQueueStatistics

    queueDnStr : string
    startDt : string
    endDt : string
    waitInterval : string
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $select : array
    $orderby : array
    $expand : array
     
    Accept : 'application/json'

#### GET /ReportExtensionsStatisticsByRingGroups/Pbx.GetExtensionsStatisticsByRingGroupsData(periodFrom={periodFrom},periodTo={periodTo},ringGroupDns={ringGroupDns})

Invoke function GetExtensionsStatisticsByRingGroupsData

    periodFrom : string
    periodTo : string
    ringGroupDns : string
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $select : array
    $orderby : array
    $expand : array
     
    Accept : 'application/json'

#### GET /ReportExtensionsStatisticsByRingGroups/Pbx.DownloadExtensionsStatisticsByRingGroups(periodFrom={periodFrom},periodTo={periodTo},ringGroupDns={ringGroupDns})

Invoke function DownloadExtensionsStatisticsByRingGroups

    periodFrom : string
    periodTo : string
    ringGroupDns : string
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $select : array
    $orderby : array
    $expand : array
     
    Accept : 'application/json'

#### GET /ReportExtensionStatisticsByGroup/Pbx.GetExtensionStatisticsByGroupData(groupNumber={groupNumber},periodFrom={periodFrom},periodTo={periodTo},callArea={callArea})

Invoke function GetExtensionStatisticsByGroupData

    groupNumber : string
    periodFrom : string
    periodTo : string
    callArea : integer
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $select : array
    $orderby : array
    $expand : array
     
    Accept : 'application/json'

#### GET /ReportExtensionStatisticsByGroup/Pbx.DownloadExtensionStatisticsByGroup(groupNumber={groupNumber},periodFrom={periodFrom},periodTo={periodTo},callArea={callArea})

Invoke function DownloadExtensionStatisticsByGroup

    groupNumber : string
    periodFrom : string
    periodTo : string
    callArea : integer
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $select : array
    $orderby : array
    $expand : array
     
    Accept : 'application/json'

#### GET /ReportExtensionStatistics/Pbx.GetExtensionStatisticsData(periodFrom={periodFrom},periodTo={periodTo},extensionFilter={extensionFilter},callArea={callArea})

Invoke function GetExtensionStatisticsData

    periodFrom : string
    periodTo : string
    extensionFilter : string
    callArea : integer
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $select : array
    $orderby : array
    $expand : array
     
    Accept : 'application/json'

#### GET /ReportExtensionStatistics/Pbx.DownloadExtensionStatistics(periodFrom={periodFrom},periodTo={periodTo},extensionFilter={extensionFilter},callArea={callArea})

Invoke function DownloadExtensionStatistics

    periodFrom : string
    periodTo : string
    extensionFilter : string
    callArea : integer
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $select : array
    $orderby : array
    $expand : array
     
    Accept : 'application/json'

#### GET /ReportGroup

Get entities from ReportGroup

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### GET /ReportInboundRules/Pbx.GetInboundRulesData()

Invoke function GetInboundRulesData

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $select : array
    $orderby : array
    $expand : array
     
    Accept : 'application/json'

#### GET /ReportInboundRules/Pbx.DownloadInboundRules()

Invoke function DownloadInboundRules

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $select : array
    $orderby : array
    $expand : array
     
    Accept : 'application/json'

#### GET /ReportQueueAgentsChatStatistics/Pbx.GetQueueAgentsChatStatisticsData(queueDnStr={queueDnStr},startDt={startDt},endDt={endDt},participantType={participantType})

Invoke function GetQueueAgentsChatStatisticsData

    queueDnStr : string
    startDt : string
    endDt : string
    participantType : integer
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $select : array
    $orderby : array
    $expand : array
     
    Accept : 'application/json'

#### GET /ReportQueueAgentsChatStatistics/Pbx.DownloadQueueAgentsChatStatistics(queueDnStr={queueDnStr},startDt={startDt},endDt={endDt},participantType={participantType})

Invoke function DownloadQueueAgentsChatStatistics

    queueDnStr : string
    startDt : string
    endDt : string
    participantType : integer
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $select : array
    $orderby : array
    $expand : array
     
    Accept : 'application/json'

#### GET /ReportQueueAgentsChatStatisticsTotals/Pbx.GetQueueAgentsChatStatisticsTotalsData(queueDnStr={queueDnStr},startDt={startDt},endDt={endDt},participantType={participantType})

Invoke function GetQueueAgentsChatStatisticsTotalsData

    queueDnStr : string
    startDt : string
    endDt : string
    participantType : integer
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $select : array
    $orderby : array
    $expand : array
     
    Accept : 'application/json'

#### GET /ReportQueueAgentsChatStatisticsTotals/Pbx.DownloadQueueAgentsChatStatisticsTotals(queueDnStr={queueDnStr},startDt={startDt},endDt={endDt},participantType={participantType})

Invoke function DownloadQueueAgentsChatStatisticsTotals

    queueDnStr : string
    startDt : string
    endDt : string
    participantType : integer
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $select : array
    $orderby : array
    $expand : array
     
    Accept : 'application/json'

#### GET /ReportQueueAnsweredCallsByWaitTime/Pbx.GetQueueAnsweredCallsByWaitTimeData(queueDnStr={queueDnStr},startDt={startDt},endDt={endDt},answerInterval={answerInterval})

Invoke function GetQueueAnsweredCallsByWaitTimeData

    queueDnStr : string
    startDt : string
    endDt : string
    answerInterval : string
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $select : array
    $orderby : array
    $expand : array
     
    Accept : 'application/json'

#### GET /ReportQueueAnsweredCallsByWaitTime/Pbx.DownloadQueueAnsweredCallsByWaitTime(queueDnStr={queueDnStr},startDt={startDt},endDt={endDt},answerInterval={answerInterval},clientTimeZone={clientTimeZone})

Invoke function DownloadQueueAnsweredCallsByWaitTime

    queueDnStr : string
    startDt : string
    endDt : string
    answerInterval : string
    clientTimeZone : string
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $select : array
    $orderby : array
    $expand : array
     
    Accept : 'application/json'

#### GET /ReportQueueAnUnCalls/Pbx.GetQueueAnUnCallsData(chartDate={chartDate},chartBy={chartBy},queueDnStr={queueDnStr},clientTimeZone={clientTimeZone},waitInterval={waitInterval})

Invoke function GetQueueAnUnCallsData

    chartDate : string
    chartBy : string
    queueDnStr : string
    clientTimeZone : string
    waitInterval : string
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $select : array
    $orderby : array
    $expand : array
     
    Accept : 'application/json'

#### GET /ReportQueueAnUnCalls/Pbx.DownloadQueueAnUnCallsReport(chartDate={chartDate},chartBy={chartBy},queueDnStr={queueDnStr},clientTimeZone={clientTimeZone},waitInterval={waitInterval})

Invoke function DownloadQueueAnUnCallsReport

    chartDate : string
    chartBy : string
    queueDnStr : string
    clientTimeZone : string
    waitInterval : string
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $select : array
    $orderby : array
    $expand : array
     
    Accept : 'application/json'

#### GET /ReportQueueCallbacks/Pbx.GetQueueCallbacksData(queueDnStr={queueDnStr},startDt={startDt},endDt={endDt})

Invoke function GetQueueCallbacksData

    queueDnStr : string
    startDt : string
    endDt : string
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $select : array
    $orderby : array
    $expand : array
     
    Accept : 'application/json'

#### GET /ReportQueueCallbacks/Pbx.DownloadQueueCallbacks(queueDnStr={queueDnStr},startDt={startDt},endDt={endDt})

Invoke function DownloadQueueCallbacks

    queueDnStr : string
    startDt : string
    endDt : string
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $select : array
    $orderby : array
    $expand : array
     
    Accept : 'application/json'

#### GET /ReportQueueChatPerformance/Pbx.GetQueueChatPerformanceData(queueDnStr={queueDnStr},startDt={startDt},endDt={endDt},participantType={participantType})

Invoke function GetQueueChatPerformanceData

    queueDnStr : string
    startDt : string
    endDt : string
    participantType : integer
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $select : array
    $orderby : array
    $expand : array
     
    Accept : 'application/json'

#### GET /ReportQueueChatPerformance/Pbx.DownloadQueueChatPerformance(queueDnStr={queueDnStr},startDt={startDt},endDt={endDt},participantType={participantType})

Invoke function DownloadQueueChatPerformance

    queueDnStr : string
    startDt : string
    endDt : string
    participantType : integer
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $select : array
    $orderby : array
    $expand : array
     
    Accept : 'application/json'

#### GET /ReportQueueFailedCallbacks/Pbx.GetQueueFailedCallbacksData(queueDnStr={queueDnStr},startDt={startDt},endDt={endDt})

Invoke function GetQueueFailedCallbacksData

    queueDnStr : string
    startDt : string
    endDt : string
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $select : array
    $orderby : array
    $expand : array
     
    Accept : 'application/json'

#### GET /ReportQueueFailedCallbacks/Pbx.DownloadQueueFailedCallbacks(queueDnStr={queueDnStr},startDt={startDt},endDt={endDt},clientTimeZone={clientTimeZone})

Invoke function DownloadQueueFailedCallbacks

    queueDnStr : string
    startDt : string
    endDt : string
    clientTimeZone : string
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $select : array
    $orderby : array
    $expand : array
     
    Accept : 'application/json'

#### GET /ReportQueuePerformanceOverview/Pbx.GetQueuePerformanceOverviewData(periodFrom={periodFrom},periodTo={periodTo},queueDns={queueDns},waitInterval={waitInterval})

Invoke function GetQueuePerformanceOverviewData

    periodFrom : string
    periodTo : string
    queueDns : string
    waitInterval : string
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $select : array
    $orderby : array
    $expand : array
     
    Accept : 'application/json'

#### GET /ReportQueuePerformanceOverview/Pbx.DownloadQueuePerformanceOverview(periodFrom={periodFrom},periodTo={periodTo},queueDns={queueDns},waitInterval={waitInterval})

Invoke function DownloadQueuePerformanceOverview

    periodFrom : string
    periodTo : string
    queueDns : string
    waitInterval : string
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $select : array
    $orderby : array
    $expand : array
     
    Accept : 'application/json'

#### GET /ReportQueuePerformanceTotals/Pbx.GetQueuePerformanceTotalsData(periodFrom={periodFrom},periodTo={periodTo},queueDns={queueDns},waitInterval={waitInterval})

Invoke function GetQueuePerformanceTotalsData

    periodFrom : string
    periodTo : string
    queueDns : string
    waitInterval : string
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $select : array
    $orderby : array
    $expand : array
     
    Accept : 'application/json'

#### GET /ReportQueuePerformanceTotals/Pbx.DownloadQueuePerformanceTotals(periodFrom={periodFrom},periodTo={periodTo},queueDns={queueDns},waitInterval={waitInterval})

Invoke function DownloadQueuePerformanceTotals

    periodFrom : string
    periodTo : string
    queueDns : string
    waitInterval : string
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $select : array
    $orderby : array
    $expand : array
     
    Accept : 'application/json'

#### GET /ReportRingGroupStatistics/Pbx.GetRingGroupStatisticsData(periodFrom={periodFrom},periodTo={periodTo},ringGroupDns={ringGroupDns})

Invoke function GetRingGroupStatisticsData

    periodFrom : string
    periodTo : string
    ringGroupDns : string
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $select : array
    $orderby : array
    $expand : array
     
    Accept : 'application/json'

#### GET /ReportRingGroupStatistics/Pbx.DownloadRingGroupStatistics(periodFrom={periodFrom},periodTo={periodTo},ringGroupDns={ringGroupDns})

Invoke function DownloadRingGroupStatistics

    periodFrom : string
    periodTo : string
    ringGroupDns : string
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $select : array
    $orderby : array
    $expand : array
     
    Accept : 'application/json'

#### GET /ReportStatisticSla/Pbx.GetStatisticSlaData(queueDnStr={queueDnStr},startDt={startDt},endDt={endDt},waitInterval={waitInterval})

Invoke function GetStatisticSlaData

    queueDnStr : string
    startDt : string
    endDt : string
    waitInterval : string
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $select : array
    $orderby : array
    $expand : array
     
    Accept : 'application/json'

#### GET /ReportStatisticSla/Pbx.DownloadStatisticSla(queueDnStr={queueDnStr},startDt={startDt},endDt={endDt},waitInterval={waitInterval})

Invoke function DownloadStatisticSla

    queueDnStr : string
    startDt : string
    endDt : string
    waitInterval : string
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $select : array
    $orderby : array
    $expand : array
     
    Accept : 'application/json'

#### GET /ReportTeamQueueGeneralStatistics/Pbx.GetTeamQueueGeneralStatisticsData(queueDnStr={queueDnStr},startDt={startDt},endDt={endDt},waitInterval={waitInterval})

Invoke function GetTeamQueueGeneralStatisticsData

    queueDnStr : string
    startDt : string
    endDt : string
    waitInterval : string
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $select : array
    $orderby : array
    $expand : array
     
    Accept : 'application/json'

#### GET /ReportTeamQueueGeneralStatistics/Pbx.DownloadTeamQueueGeneralStatistics(queueDnStr={queueDnStr},startDt={startDt},endDt={endDt},waitInterval={waitInterval})

Invoke function DownloadTeamQueueGeneralStatistics

    queueDnStr : string
    startDt : string
    endDt : string
    waitInterval : string
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $select : array
    $orderby : array
    $expand : array
     
    Accept : 'application/json'

#### GET /ReportUserActivity/Pbx.GetUserActivityData(chartDate={chartDate},chartBy={chartBy},includeInternalCalls={includeInternalCalls},includeQueueCalls={includeQueueCalls},queueDnStr={queueDnStr},clientTimeZone={clientTimeZone},waitInterval={waitInterval})

Invoke function GetUserActivityData

    chartDate : string
    chartBy : string
    includeInternalCalls : boolean
    includeQueueCalls : boolean
    queueDnStr : string
    clientTimeZone : string
    waitInterval : string
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $select : array
    $orderby : array
    $expand : array
     
    Accept : 'application/json'

#### GET /ReportUserActivity/Pbx.DownloadUserActivityReport(chartDate={chartDate},chartBy={chartBy},includeInternalCalls={includeInternalCalls},includeQueueCalls={includeQueueCalls},queueDnStr={queueDnStr},clientTimeZone={clientTimeZone},waitInterval={waitInterval})

Invoke function DownloadUserActivityReport

    chartDate : string
    chartBy : string
    includeInternalCalls : boolean
    includeQueueCalls : boolean
    queueDnStr : string
    clientTimeZone : string
    waitInterval : string
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $select : array
    $orderby : array
    $expand : array
     
    Accept : 'application/json'

#### GET /ScheduledReports

Get entities from ScheduledReports

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### POST /ScheduledReports

Add new entity to ScheduledReports

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /ScheduledReports({Id})

Get entity from ScheduledReports by key

    Id : integer
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### PATCH /ScheduledReports({Id})

Update entity in ScheduledReports

    Id : integer
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### DELETE /ScheduledReports({Id})

Delete entity from ScheduledReports

    Id : integer
    If-Match : string
     
    Accept : 'application/json'

#### GET /RingGroups({Id})/Members

Get Members from RingGroups

    Id : integer
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### GET /RingGroups/Pbx.GetFirstAvailableRingGroupNumber()

Invoke function GetFirstAvailableRingGroupNumber

     
    Accept : 'application/json'

#### GET /RingGroups/Pbx.GetByNumber(number={number})

Invoke function GetByNumber

    number : string
     
    Accept : 'application/json'

#### GET /RingGroups

Get entities from RingGroups

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### POST /RingGroups

Add new entity to RingGroups

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /RingGroups({Id})

Get entity from RingGroups by key

    Id : integer
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### PATCH /RingGroups({Id})

Update entity in RingGroups

    Id : integer
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### DELETE /RingGroups({Id})

Delete entity from RingGroups

    Id : integer
    If-Match : string
     
    Accept : 'application/json'

#### GET /Sbcs({Name})

Get entity from Sbcs by key

    Name : string
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### PATCH /Sbcs({Name})

Update entity in Sbcs

    Name : string
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### DELETE /Sbcs({Name})

Delete entity from Sbcs

    Name : string
    If-Match : string
     
    Accept : 'application/json'

#### GET /Sbcs

Get entities from Sbcs

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### POST /Sbcs

Add new entity to Sbcs

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /SecureSipSettings

Get SecureSipSettings

    $select : array
    $expand : array
     
    Accept : 'application/json'

#### PATCH /SecureSipSettings

Update SecureSipSettings

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /SecurityTokens

Get entities from SecurityTokens

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### POST /SecurityTokens({Id})/Pbx.RevokeToken

Invoke action RevokeToken

    Id : integer
     
    Accept : 'application/json'

#### GET /Services

Get entities from Services

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### POST /Services/Pbx.GarbageCollect

Invoke action GarbageCollect

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /Services/Pbx.Start

Invoke action Start

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /Services/Pbx.Stop

Invoke action Stop

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /Services/Pbx.Enable

Invoke action Enable

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /Services/Pbx.Disable

Invoke action Disable

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /Services/Pbx.Restart

Invoke action Restart

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /Services/Pbx.RestartAll

Invoke action RestartAll

     
    Accept : 'application/json'

#### POST /Services/Pbx.RestartOperatingSystem

Invoke action RestartOperatingSystem

     
    Accept : 'application/json'

#### GET /SipDevices

Get entities from SipDevices

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### POST /GetDirectoryInfo

Invoke actionImport GetDirectoryInfo

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /SystemStatus

Get SystemStatus

    $select : array
    $expand : array
     
    Accept : 'application/json'

#### GET /SystemStatus/Pbx.SystemExtensions()

Invoke function SystemExtensions

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
     
    Accept : 'application/json'

#### GET /SystemStatus/Pbx.SystemDatabaseInformation()

Invoke function SystemDatabaseInformation

     
    Accept : 'application/json'

#### GET /SystemStatus/Pbx.GetVersionType()

Invoke function GetVersionType

     
    Accept : 'application/json'

#### POST /SystemStatus/Pbx.SetChatLogStatus

Invoke action SetChatLogStatus

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /SystemStatus/Pbx.StartDBMaintenance

Invoke action StartDBMaintenance

     
    Accept : 'application/json'

#### GET /SystemStatus/Pbx.SystemHealthStatus()

Invoke function SystemHealthStatus

     
    Accept : 'application/json'

#### GET /SystemStatus/Pbx.APIToken()

Invoke function APIToken

     
    Accept : 'application/json'

#### POST /SystemStatus/Pbx.SetMultiCompanyMode

Invoke action SetMultiCompanyMode

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /TenantProperties

Get entities from TenantProperties

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### POST /TenantProperties

Add new entity to TenantProperties

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /TenantProperties({Name})

Get entity from TenantProperties by key

    Name : string
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### PATCH /TenantProperties({Name})

Update entity in TenantProperties

    Name : string
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### DELETE /TenantProperties({Name})

Delete entity from TenantProperties

    Name : string
    If-Match : string
     
    Accept : 'application/json'

#### GET /Trunks/Pbx.GetFirstAvailableTrunkNumber()

Invoke function GetFirstAvailableTrunkNumber

     
    Accept : 'application/json'

#### GET /Trunks({Id})

Get entity from Trunks by key

    Id : integer
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### PATCH /Trunks({Id})

Update entity in Trunks

    Id : integer
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### DELETE /Trunks({Id})

Delete entity from Trunks

    Id : integer
    If-Match : string
     
    Accept : 'application/json'

#### GET /Trunks/Pbx.InitMasterBridge()

Invoke function InitMasterBridge

     
    Accept : 'application/json'

#### GET /Trunks/Pbx.InitSlaveBridge()

Invoke function InitSlaveBridge

     
    Accept : 'application/json'

#### GET /Trunks/Pbx.InitTrunk(template={template})

Invoke function InitTrunk

    template : string
     
    Accept : 'application/json'

#### GET /Trunks({Id})/Pbx.ExportTrunk()

Invoke function ExportTrunk

    Id : integer
     
    Accept : 'application/json'

#### POST /Trunks/Pbx.RefreshRegistration

Invoke action RefreshRegistration

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /Trunks/Pbx.SetRoutes

Invoke action SetRoutes

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /Trunks/Pbx.GetTrunkByNumber(number={number})

Invoke function GetTrunkByNumber

    number : string
     
    Accept : 'application/json'

#### GET /Trunks

Get entities from Trunks

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### POST /Trunks

Add new entity to Trunks

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /Trunks/Pbx.ProvisionTrunk

Invoke action ProvisionTrunk

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /Trunks/Pbx.TelegramSession

Invoke action TelegramSession

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /TrunkTemplates

Get entities from TrunkTemplates

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### POST /TrunkTemplates

Add new entity to TrunkTemplates

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /TrunkTemplates({Id})

Get entity from TrunkTemplates by key

    Id : string
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### PATCH /TrunkTemplates({Id})

Update entity in TrunkTemplates

    Id : string
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### DELETE /TrunkTemplates({Id})

Delete entity from TrunkTemplates

    Id : string
    If-Match : string
     
    Accept : 'application/json'

#### GET /GetUpdateSettings()

Invoke functionImport GetUpdateSettings

     
    Accept : 'application/json'

#### POST /SetUpdateSettings

Invoke actionImport SetUpdateSettings

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /HasDebianUpgrade()

Invoke functionImport HasDebianUpgrade

     
    Accept : 'application/json'

#### POST /UpgradeDebian

Invoke actionImport UpgradeDebian

     
    Accept : 'application/json'

#### GET /GetUpdates()

Invoke functionImport GetUpdates

     
    Accept : 'application/json'

#### GET /GetPromptSetUpdates()

Invoke functionImport GetPromptSetUpdates

     
    Accept : 'application/json'

#### GET /GetClientCrmUpdates()

Invoke functionImport GetClientCrmUpdates

     
    Accept : 'application/json'

#### GET /GetServerCrmUpdates()

Invoke functionImport GetServerCrmUpdates

     
    Accept : 'application/json'

#### POST /InstallUpdates

Invoke actionImport InstallUpdates

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /GetUpdatesStats()

Invoke functionImport GetUpdatesStats

     
    Accept : 'application/json'

#### GET /Users({Id})/Pbx.HasDuplicatedEmail()

Invoke function HasDuplicatedEmail

    Id : integer
     
    Accept : 'application/json'

#### POST /Users/Pbx.GetDuplicatedEmails

Invoke action GetDuplicatedEmails

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /Users/Pbx.GetFirstAvailableExtensionNumber()

Invoke function GetFirstAvailableExtensionNumber

     
    Accept : 'application/json'

#### GET /Users/Pbx.GetFirstAvailableHotdeskingNumber()

Invoke function GetFirstAvailableHotdeskingNumber

     
    Accept : 'application/json'

#### POST /Users({Id})/Pbx.SendWelcomeEmail

Invoke action SendWelcomeEmail

    Id : integer
     
    Accept : 'application/json'

#### GET /Users({Id})/Groups

Get Groups from Users

    Id : integer
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### GET /Users({Id})/ForwardingProfiles

Get ForwardingProfiles from Users

    Id : integer
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### GET /Users({Id})/Pbx.GetPhoneSecret()

Invoke function GetPhoneSecret

    Id : integer
     
    Accept : 'application/json'

#### POST /Users({Id})/Pbx.Regenerate

Invoke action Regenerate

    Id : integer
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /Users/Pbx.RegeneratePasswords

Invoke action RegeneratePasswords

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /Users/Pbx.ExportExtensions()

Invoke function ExportExtensions

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $select : array
    $orderby : array
    $expand : array
     
    Accept : 'application/json'

#### GET /Users/Pbx.GetPhoneRegistrar(mac={mac})

Invoke function GetPhoneRegistrar

    mac : string
     
    Accept : 'application/json'

#### POST /Users/Pbx.BulkUpdate

Invoke action BulkUpdate

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /Users/Pbx.GetPhoneRegistrars

Invoke action GetPhoneRegistrars

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /Users/Pbx.RebootPhone

Invoke action RebootPhone

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /Users/Pbx.ReprovisionPhone

Invoke action ReprovisionPhone

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /Users/Pbx.UpgradePhone

Invoke action UpgradePhone

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /Users({Id})/Pbx.GenerateProvLink()

Invoke function GenerateProvLink

    Id : integer
     
    Accept : 'application/json'

#### GET /Users({Id})

Get entity from Users by key

    Id : integer
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### PATCH /Users({Id})

Update entity in Users

    Id : integer
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### DELETE /Users({Id})

Delete entity from Users

    Id : integer
    If-Match : string
     
    Accept : 'application/json'

#### GET /Users({Id})/Greetings

Get Greetings from Users

    Id : integer
    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### POST /Users({Id})/Pbx.MakeCallUserRecordGreeting

Invoke action MakeCallUserRecordGreeting

    Id : integer
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /Users/Pbx.DownloadGreeting(userId={userId},fileName={fileName})

Invoke function DownloadGreeting

    userId : integer
    fileName : string
     
    Accept : 'application/json'

#### POST /Users/Pbx.BatchDelete

Invoke action BatchDelete

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /Users/Pbx.GetMonitorStatus()

Invoke function GetMonitorStatus

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
     
    Accept : 'application/json'

#### POST /Users({Id})/Pbx.SetMonitorStatus

Invoke action SetMonitorStatus

    Id : integer
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /Users/Pbx.GetByNumber(number={number})

Invoke function GetByNumber

    number : string
     
    Accept : 'application/json'

#### GET /Users

Get entities from Users

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### POST /Users

Add new entity to Users

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /VoicemailSettings/Pbx.GetTranscribeLanguages()

Invoke function GetTranscribeLanguages

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
     
    Accept : 'application/json'

#### GET /VoicemailSettings

Get VoicemailSettings

    $select : array
    $expand : array
     
    Accept : 'application/json'

#### PATCH /VoicemailSettings

Update VoicemailSettings

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /VoicemailSettings/Pbx.DeleteAllUserVoicemails

Invoke action DeleteAllUserVoicemails

     
    Accept : 'application/json'

#### GET /WebsiteLinks

Get entities from WebsiteLinks

    $top : integer
    $skip : integer
    $search : string
    $filter : string
    $count : boolean
    $orderby : array
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### POST /WebsiteLinks

Add new entity to WebsiteLinks

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /WebsiteLinks/Pbx.ValidateLink

Invoke action ValidateLink

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### POST /WebsiteLinks/Pbx.BulkLinksDelete

Invoke action BulkLinksDelete

    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### GET /WebsiteLinks({Link})

Get entity from WebsiteLinks by key

    Link : string
    $select : array
    $expand : array
     
    Accept : 'application/json'

#### PATCH /WebsiteLinks({Link})

Update entity in WebsiteLinks

    Link : string
    body : 
     
    Accept : 'application/json'
    Content-Type : 'application/json'

#### DELETE /WebsiteLinks({Link})

Delete entity from WebsiteLinks

    Link : string
    If-Match : string
     
    Accept : 'application/json'


## License

#### Apache-2.0

