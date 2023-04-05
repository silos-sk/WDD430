# Endoscopy Staff Allocation App | MEAN Stack
This is a single-page application that allows CRUD operations for the employees list and theatre allocation.

After cloning the repository, make sure to install the dependencies using 'npm install' then follow the instructions below to run the server and the front-end page.

## Starting the Server
Go inside the 'server' directory and run the code below: 

npx ts-node src/server.ts

## Starting the App Front-end
Go inside the 'client' directory and run 'ng serve'

Navigate to http:/localhost:4200

## RESTFUL API:
### Employees
GET /employees

GET /employees/:id

POST /employees

PUT /employees/:id

DELETE /employees/:id

### Allocations
GET /allocations

GET /allocations/:id

POST /allocations

PUT /allocations/:id

DELETE /allocations/:id
