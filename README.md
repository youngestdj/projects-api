# projects-api  
[![Build Status](https://travis-ci.com/youngestdj/projects-api.svg?branch=master)](https://travis-ci.com/youngestdj/projects-api) [![Test Coverage](https://api.codeclimate.com/v1/badges/5f3cf4d1625acae6f289/test_coverage)](https://codeclimate.com/github/youngestdj/projects-api/test_coverage)  


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

#### Get all tasks

`GET /API/tasks`
`{param}`: `name`, `description`, `status`, `assignerName`, `assignerSurname`,
`assigneeName`,`assigneeSurname`, `assigneeId`, `score`

##### Response

```
{
  "tasks": {
    "count": 2,
    "rows": [
      {
        "id": 2,
        "name": "Cool stuff",
        "description": "Stuff",
        "score": 5,
        "status": "active",
        "userId": 1,
        "projectId": 1,
        "createdAt": "2020-05-30T08:54:59.721Z",
        "updatedAt": "2020-05-30T08:54:59.721Z",
        "assignee": {
          "id": 1,
          "name": "valid",
          "surname": "surname"
        },
        "Project": {
          "id": 1,
          "name": "Sample project",
          "body": "Sample project description",
          "status": "active",
          "userId": 1,
          "createdAt": "2020-05-29T22:14:02.593Z",
          "updatedAt": "2020-05-29T22:14:02.593Z",
          "assigner": {
            "id": 1,
            "name": "valid",
            "surname": "surname"
          }
        }
      },
      {
        "id": 1,
        "name": "Sample task",
        "description": "Lorem ipsum stuff",
        "score": 4,
        "status": "declined",
        "userId": 1,
        "projectId": 1,
        "createdAt": "2020-05-29T22:14:04.128Z",
        "updatedAt": "2020-05-29T22:14:04.128Z",
        "assignee": {
          "id": 1,
          "name": "valid",
          "surname": "surname"
        },
        "Project": {
          "id": 1,
          "name": "Sample project",
          "body": "Sample project description",
          "status": "active",
          "userId": 1,
          "createdAt": "2020-05-29T22:14:02.593Z",
          "updatedAt": "2020-05-29T22:14:02.593Z",
          "assigner": {
            "id": 1,
            "name": "valid",
            "surname": "surname"
          }
        }
      }
    ]
  }
}
```

`GET /API/tasks?name=Cool stuff&description=Stuff&status=active&status=declined&assignerName=valid&assignerSurname=surname&assigneeName=valid&assigneeSurname=surname&assigneeId=1&score=5`

```
{
  "tasks": {
    "count": 1,
    "rows": [
      {
        "id": 2,
        "name": "Cool stuff",
        "description": "Stuff",
        "score": 5,
        "status": "active",
        "userId": 1,
        "projectId": 1,
        "createdAt": "2020-05-30T08:54:59.721Z",
        "updatedAt": "2020-05-30T08:54:59.721Z",
        "assignee": {
          "id": 1,
          "name": "valid",
          "surname": "surname"
        },
        "Project": {
          "id": 1,
          "name": "Sample project",
          "body": "Sample project description",
          "status": "active",
          "userId": 1,
          "createdAt": "2020-05-29T22:14:02.593Z",
          "updatedAt": "2020-05-29T22:14:02.593Z",
          "assigner": {
            "id": 1,
            "name": "valid",
            "surname": "surname"
          }
        }
      }
    ]
  }
}
```

#### Get all projects

`GET /API/projects`
`{param}`: `name`, `body`, `status`, `assignerName`, `assignerSurname`, `assigneeName`, `assigneeSurname`, `assigneeId`, `taskScore`,

##### Response

```
{
  "projects": {
    "count": 3,
    "rows": [
      {
        "id": 1,
        "name": "Sample project",
        "body": "Sample project description",
        "status": "active",
        "userId": 1,
        "createdAt": "2020-05-30T13:43:43.606Z",
        "updatedAt": "2020-05-30T13:43:43.606Z",
        "assigner": {
          "id": 1,
          "name": "valid",
          "surname": "surname"
        },
        "Tasks": [
          {
            "id": 1,
            "name": "Sample task",
            "description": "Lorem ipsum stuff",
            "score": 4,
            "status": "declined",
            "userId": 1,
            "projectId": 1,
            "createdAt": "2020-05-30T13:43:45.450Z",
            "updatedAt": "2020-05-30T13:43:45.450Z",
            "assignee": {
              "id": 1,
              "name": "valid",
              "surname": "surname"
            }
          },
          {
            "id": 2,
            "name": "Cool stuff",
            "description": "Stuff",
            "score": 5,
            "status": "active",
            "userId": 1,
            "projectId": 1,
            "createdAt": "2020-05-30T14:06:48.689Z",
            "updatedAt": "2020-05-30T14:06:48.689Z",
            "assignee": {
              "id": 1,
              "name": "valid",
              "surname": "surname"
            }
          }
        ]
      },
      {
        "id": 2,
        "name": "Test project",
        "body": "Lorem ipsum",
        "status": "active",
        "userId": 1,
        "createdAt": "2020-05-30T14:06:54.619Z",
        "updatedAt": "2020-05-30T14:06:54.619Z",
        "assigner": {
          "id": 1,
          "name": "valid",
          "surname": "surname"
        },
        "Tasks": []
      },
      {
        "id": 3,
        "name": "insom Test project",
        "body": "insom Lorem ipsum",
        "status": "active",
        "userId": 1,
        "createdAt": "2020-05-30T14:22:51.672Z",
        "updatedAt": "2020-05-30T14:22:51.672Z",
        "assigner": {
          "id": 1,
          "name": "valid",
          "surname": "surname"
        },
        "Tasks": []
      }
    ]
  }
}
```

`GET /API/projects?name=Sample project&status=active&assignerName=valid&assignerSurname=surname&assigneeName=valid&assigneeSurname=surname&assigneeId=1&taskScore=4`

##### Response

```
{
  "projects": {
    "count": 1,
    "rows": [
      {
        "id": 1,
        "name": "Sample project",
        "body": "Sample project description",
        "status": "active",
        "userId": 1,
        "createdAt": "2020-05-30T13:43:43.606Z",
        "updatedAt": "2020-05-30T13:43:43.606Z",
        "assigner": {
          "id": 1,
          "name": "valid",
          "surname": "surname"
        },
        "Tasks": [
          {
            "id": 1,
            "name": "Sample task",
            "description": "Lorem ipsum stuff",
            "score": 4,
            "status": "declined",
            "userId": 1,
            "projectId": 1,
            "createdAt": "2020-05-30T13:43:45.450Z",
            "updatedAt": "2020-05-30T13:43:45.450Z",
            "assignee": {
              "id": 1,
              "name": "valid",
              "surname": "surname"
            }
          }
        ]
      }
    ]
  }
}
```
