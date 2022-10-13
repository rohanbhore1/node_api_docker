
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
  GET /api/items/email
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. email id to fetch details|

#### Add New User

```http
  POST /user
```

| Parameter | Type     | Description                       |
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
  POST /account/email
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. |

## Features can be improved 

- routing input pattern 
- test case can be in dynamic way 
- business logic separation can be done

