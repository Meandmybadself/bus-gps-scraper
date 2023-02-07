## Environment variables
* USERNAME
* PASSWORD

## Interactions

`GET https://vtrans-web.hopkinsschools.org/onscreen/MyStop/LoginMobile.aspx`
Get the login page / its viewstate & ASP session cookie.

`POST https://vtrans-web.hopkinsschools.org/onscreen/MyStop/LoginMobile.aspx`

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

`POST https://vtrans-web.hopkinsschools.org/onscreen/MyStop/WheresMyBus.aspx/GetVehicleData`

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