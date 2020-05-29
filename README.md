# projects-api

### Documentation

#### Register user
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
