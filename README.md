# projects-api

### Documentation

#### Register user

`POST /API/users`

##### Request body

```
{
	"email": "test@gmail.com",
	"name": "First",
	"surname": "Appuser"
}
```

##### Response

```
{
  "message": "You have signed up successfully",
  "user": {
    "id": 1,
    "email": "test@gmail.com",
    "name": "First",
    "surname": "Appuser",
    "updatedAt": "2020-05-29T13:30:15.551Z",
    "createdAt": "2020-05-29T13:30:15.551Z"
  }
}
```

#### Add new project

`POST /API/projects`

##### Request body

```
{
	"body": "Lorem ipsum",
	"status": "active",
	"name": "Test project",
	"userId": 1
}
```

`{status}`: `active`, `inactive`, `declined`, `completed`

##### Response body

```
{
  "message": "Project added successfully.",
  "project": {
    "id": 2,
    "body": "Lorem ipsum",
    "name": "Test project",
    "status": "active",
    "userId": 1,
    "updatedAt": "2020-05-29T19:17:46.204Z",
    "createdAt": "2020-05-29T19:17:46.204Z"
  }
}
```

#### Add new task

`POST /API/tasks`

##### Request body

```
{
  "description": "Stuff",
	"name": "Cool stuff",
	"userId": 1,
	"score": 5,
	"status": "active",
	"projectId": 100
}
```

`{status}`: `active`, `inactive`, `declined`, `completed`

##### Response body

```
{
  "message": "Task added successfully.",
  "task": {
    "id": 2,
    "description": "Stuff",
    "name": "Cool stuff",
    "status": "active",
    "score": 5,
    "userId": 1,
    "projectId": 1,
    "updatedAt": "2020-05-29T20:34:57.133Z",
    "createdAt": "2020-05-29T20:34:57.133Z"
  }
}
```

#### Get all users

`GET /API/users`
`{param}`: `name`, `surname`

##### Response

```
{
  "users": {
    "count": 2,
    "rows": [
      {
        "id": 1,
        "email": "validemail@test.com",
        "name": "valid",
        "surname": "surname",
        "createdAt": "2020-05-29T20:32:48.453Z",
        "updatedAt": "2020-05-29T20:32:48.453Z"
      },
      {
        "id": 3,
        "email": "test@gmail.com",
        "name": "First",
        "surname": "Appuser",
        "createdAt": "2020-05-29T21:24:40.366Z",
        "updatedAt": "2020-05-29T21:24:40.366Z"
      }
    ]
  }
}
```
