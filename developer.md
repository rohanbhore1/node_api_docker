
# Zipco Code by Rohan Bhore

Developed node API


# Zipco Code by Rohan Bhore

Developed node API


## API Reference
### User Section
#### Get all user details

```http
  GET /user
```

#### Get user by email id

```http
  GET /user/email?email=${email}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. email id to fetch details|

#### Add New User

```http
  POST /user
```

| Body Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `first_name`      | `string` | **Required**. |
| `last_name`      | `string` | **Required**.  |
| `email`      | `string` | **Required**.  |
| `monthly_salary`      | `number` | **Required**.  |
| `monthly_expenses`      | `number` | **Required**.  |

### Accounts Section

#### Get all active account user

```http
  GET /account
```

#### Activate Accounts for existing user

```http
  POST /account
```

| Body Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. |

## Features improvement 

- test case can be mocked 
- business logic separation can be done

