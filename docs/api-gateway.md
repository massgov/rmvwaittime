
# Overview
RMV wait time data is hosted and managed by MassDOT (see feed url below). This data is used in an iFrame field on the location content type in Mass.gov. Each RMV location page specifies the particular municipality to pull the wait time for, e.g.: "https://massgov.github.io/rmvwaittime/?town=Boston."

The widget is hosted at massgov.github.io/rmvwaittime, which pulls data from the AWS API Gateway `rmvwaittime (9p83os0fkf)`. That, in turn, pulls data from a feed at MassDOT:

## Feed URL:
https://dotfeeds.state.ma.us/api/RMVBranchWaitTime/Index

In order to change the MassDOT server url, if/when needed, Go to:  AWS > APIs > rmvwaittime (9p83os0fkf) > Resources>/waittime (a5hsyy) > GET waittime > Integration Request.

### Old feed url:
This URL was in place until 6/14/2019:
https://www.massdot.state.ma.us/feeds/qmaticxml/qmaticXML.aspx 



