<h1 align="center">Welcome to a Rate Limiter App Using Typescript Express and Redis 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0-blue.svg?cacheSeconds=2592000" />
</p>

> A micro service API server that exposes the following 2 APIs that accept JSON data as input to POST requests using Redis as cache memory and PostgreSQL as database.

## Backend

### Requirements

```
typescript
body-parser,
cors,
rootpath,
dotenv,
express,
ioredis,
pg,
pg-hstore,
sequelize
```

### Running The Backend

1. clone the repository `git clone https://github.com/toshmanuel/rate-limiter.git`
1. run the `npm install` command to install all the dependencies.
1. create a .env file in the root directory of the project.
1. copy the variables from the sample env file below into your env file. Replace `<somevalue>` with the appropiate value.
1. run the `npm run build` command to build the project.
1. run the `npm run dev` command to start the development server

### API Examples

1. `POST /API/inbound/sms/`

> Request Body
>
> ```json
> {
>   "to": "91983435345",
>   "from": "14152243533",
>   "text": "Hello WORLD!"
> }
> ```
>
> When text is STOP or STOP\n or STOP\r or STOP\r\n The ‘from’ and ‘to’ pair must be stored in cache as a unique entry and should expire after 4 hours. The to and from parematers must have a minimum of 6 characters and a maximum of 16 characters. The text parameter must have a minimum of 1 character and a maximum of 120 characters.
>
> On a successful request, this endpoint would return a 200 status code and
>
> Response Body
>
> ```json
> {
>   "message": "outbound sms ok",
>   "error": ""
> }
> ```
>
> On a failed request e.g, if If the ‘to’ parameter is not present in the phone_number table for this specific account you used for the basic authentication

> Possible Error Response, may return one or more of the following error:

> If required parameter is missing:
>
> ```json
> {
>   "message": "",
>   "error": "<parameter_name> is missing"
> }
> ```

> If required parameter is invalid:
>
> ```json
> {
>   "message": "",
>   "error": "<parameter_name> is invalid"
> }
> ```

> If ‘to’ is not found in the phone_number table for this account:
>
> ```json
> {
>   "message": "",
>   "error": "to parameter not found"
> }
> ```
>
> Any unexpected error:
>
> ```json
> {
>   "message": "",
>   "error": "unknown failure"
> }
> ```

2. `POST /api/outbound/sms/`

> Request Body
>
> ```json
> {
>   "to": "91983435345",
>   "from": "14152243533",
>   "text": "Hello WORLD!"
> }
> ```
>
> The to and from parematers must have a minimum of 6 characters and a maximum of 16 characters. The text parameter must have a minimum of 1 character and a maximum of 120 characters.
>
> On a successful request, this endpoint would return a 200 status code and
>
> Response Body
>
> ```json
> {
>   "message": "outbound sms ok",
>   "error": ""
> }
> ```
>
> On a failed request e.g, if a parameter does not exist in the request body or if the ‘from’ parameter is not present in the phone_number table for this specific account
> you used for the basic authentication or if the pair ‘to’, ‘from’ matches any entry in cache (STOP) or if the rate limit for the from parameter has exceeded 50 requests in 24 hours. A 400 error code is returned.

> Possible Error Response, may return one or more of the following error:

> If required parameter is missing:
>
> ```json
> {
>   "message": "",
>   "error": "<parameter_name> is missing"
> }
> ```

> If required parameter is invalid:
>
> ```json
> {
>   "message": "",
>   "error": "<parameter_name> is invalid"
> }
> ```

> If ‘from’ is not found in the phone_number table for this account:
>
> ```json
> {
>   "message": "",
>   "error": "from parameter not found"
> }
> ```
>
> If the `to-from’ pair matches an entry in the cache:
>
> ```json
> {
>   "message": "",
>   "error": "“sms from <from> to <to> blocked by STOP request"
> }
> ```
>
> If 50 requests in last 24 hours with same ‘from’ parameter:
>
> ```json
> {
>   "message": "",
>   "error": "limit reached for from <from>"
> }
> ```

> Any unexpected error:
>
> ```json
> {
>   "message": "",
>   "error": "unknown failure"
> }
> ```

## Authors

👤 **toshmanuel**

- Github: [@toshmanuel](https://github.com/toshmanuel)

## Show your support

Give a ⭐️ if this project helped you!


