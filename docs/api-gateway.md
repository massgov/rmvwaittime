
# Overview
RMV wait times data is hosted and managed by MassDOT (see feed url below). This data is used by the Mayflower design system (Mayflower Assets), and is fronted by an AWS API Gateway `rmvwaittime (9p83os0fkf)`.

In order to change the MassDOT server url, if/when needed, Go to _AWS > APIs > rmvwaittime (9p83os0fkf) > Resources>/waittime (a5hsyy) > GET_


## Amazon API Gateway
APIs > rmvwaittime (9p83os0fkf) > Resources>/waittime (a5hsyy) > GET > Endpoint URL

```
var rmvWaitTimeURL = 'https://9p83os0fkf.execute-api.us-east-1.amazonaws.com/v1/waittime';
```

## Feed URL:
### Old feed url:
https://www.massdot.state.ma.us/feeds/qmaticxml/qmaticXML.aspx 

### New feed url:
https://dotfeeds.state.ma.us/api/RMVBranchWaitTime/Index

