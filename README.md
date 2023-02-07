# Bus GPS Scraper

## Overview
To make bus GPS / estimated time of arrival available programmatically.
The system makes use of ASP / ASP sessions and View State security.

## Problems to solve:
### Logging in results in error.

```
[ArgumentException]: Invalid postback or callback argument.  Event validation is enabled using <pages enableEventValidation='true'/> in configuration or <%@ Page EnableEventValidation='true' %> in a page.  For security purposes, this feature verifies that arguments to postback or callback events originate from the server control that originally rendered them.  If the data is valid and expected, use the ClientScriptManager.RegisterForEventValidation method in order to register the postback or callback data for validation.
```

### ~ASP session cookies not being sent~ Resolved
Using tough cookie to persist cookie across requests.

## Environment variables
* USERNAME
* PASSWORD

## Interactions

`1. GET https://vtrans-web.hopkinsschools.org/onscreen/MyStop/LoginMobile.aspx`
Get the login page / its viewstate & ASP session cookie.

`2. POST https://vtrans-web.hopkinsschools.org/onscreen/MyStop/LoginMobile.aspx`

Needs cookie and form payload:

```__LASTFOCUS=
__VIEWSTATE=%2FwEPDwUKLTQwMzA4Njk2MWRkbdP4dfrfFQkiF1WSBBfmsgbOf7w%3D
__VIEWSTATEGENERATOR=156BCDAA
__EVENTTARGET=
__EVENTARGUMENT=
__EVENTVALIDATION=%2FwEdAATn685D1cmuoXojJqgOrPpyalagurCmXr0jQwpcBQX7V2bimIF5bgqWwyKI4QE%2FrLtCJRqBRwNy7ryDJ62zNGRJ12hMIuaLUW2MtiP5zFeMe8Z%2BrZc%3D
TxtBxUName=LOGIN_REDACTED
TxtBxPWord=PASSWORD_REDACTED
BtnLogin=Login
```

`3. POST https://vtrans-web.hopkinsschools.org/onscreen/MyStop/WheresMyBus.aspx/GetVehicleData`

```
{
  "d": {
    "__type": "VersaTrans.GPS.Web.UI.BusData",
    "RPVehicleId": "729",
    "IsActive": false,
    "ClosestStreet": null,
    "Latitude": 0,
    "Longitude": 0,
    "Heading": null,
    "HeadingDegrees": 0,
    "ETA": null,
    "Route": null,
    "LogTime": "/Date(-62135575200000)/"
  }
}
```
