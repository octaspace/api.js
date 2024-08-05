## Octaspace API Client Package

### @octaspace/api.js

## Installation

`npm install @octaspace/api.js`

## Usage

### Import necessary classes and functions from the package:

`import { Octa, KeyError, UUIDError, ApiError } from '@octaspace/api.js';`

### Initialize Octa Instance:

`const octa = new Octa('your-api-key');`

Fetch this from Settings of [Cube](https://cube.octa.space/settings) portal.

### Create VPN Service:

Pass type ("wg" or "openvpn") and nodeid (number) as parameter.

`const createdVPN = await octa.createVPN('type', 1);`

Returns UUID

### Get VPN Service Details:

`const vpnDetails = await octa.getVPN('uuid');`

### Stop VPN Service:

`await octa.stopVPN('uuid');`

### Get VPN Node List:

`const vpnNodes = await octa.getVPNNodes();`

### Create MR Service:

Pass image (string), disk size(number), env(optional), and nodeid (number) as parameter.

`const createdMR = await octa.createMR('image', 1, nodeid, {"env1":"value","env2":"value"});`


### Get MR Service Details:

`const mrDetails = await octa.getMR('uuid');`

### Stop MR Service:

`await octa.stopMR('uuid');`

### Get MR Node List:

`const mrNodes = await octa.getMRNodes();`

### Get Account Details:

`const accountDetails = await octa.getAccountInfo();`

### Get Account Balance:

`const accountBalance = await octa.getAccountBalance();`

Note: checkout `lib/src/types.ts` for detail information about what they return.

### Error Handling:

-   `KeyError`: Thrown for issues with the API key. Ex: Wrong API Key
-   `UUIDError`: Thrown for issues with the UUID.
-   `ApiError`: Generic API error. Ex: Due to Network Error

## License

MIT License - see LICENSE file for details.
