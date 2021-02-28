# Microservices- System Monitor

This is the system monitoring service, one of my microservices to handle the system monitor need.

For the **entire microservices project overview**, please visit the repo for [**API-Gateway**](https://github.com/PengChen11/Microservices-API_Gateway).

## Table of Contents

---

- [Microservices- System Monitor](#microservices--system-monitor)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Feature Tasks & Requirements](#feature-tasks--requirements)
  - [Implementation Notes](#implementation-notes)
    - [Limitations of MVP](#limitations-of-mvp)
  - [Authors](#authors)
  - [License](#license)
  - [Acknowledgements / Resources](#acknowledgements--resources)

---

## Overview

Create a RESTful API supports full CRUD operations, with proper querying and correct authentication and authorization, will send back all system errors, warnings and events to admin center (front end, under development).

## Feature Tasks & Requirements

Create a single resource REST API using a Mongoose model, constructed using AWS Cloud Services or other providers

- **Database: MongoDB**
  1. model required:
     1. error model:
        - contains all details about server internal errors. This is the most import system log for de-bugging.
     2. warning model:
        - contains all details about known error handled by each services route handler / middle-wares.
     3. event model:
         - contains services events details.

- **Routing:**
  1. POST
     - /:model - Given a JSON body, inserts a record into the database based on the model being selected

  2. GET
     - /:model - returns an array of objects representing all the records in the database
     - /:model/:id - returns an object representing one record, by its id
  
  3. PATCH
     - /:model/:id - Given a JSON body and an ID, updates a record in the database

  4. DELETE
     - /:model/:id - Given an ID removes the matching record from the database

- **ACL:**
  - The only ACL being applied is API gateway validation. This microservice will only respond to requests come from the API gateway and will drop everything comes from everywhere else.

- **System logs:**
  - This microservice will log all errors, warnings and proper events to itself internally.

- **Service discovery:**
  - This microservice will store the API gateway's IP in it's env, when goes online, it will register it self with the API gateway.
  - This service will maintain a heart beat with API gateway and send over it's URL every 30 sec. In this case, if this service goes off line, the API gate way will be able to re-connect to it automatically.

- **Unit Tests**

  - Unit tests are the easiest to apply to for each microservices. The entire routing system and internal middle-wares, error handlers, models, will be tested and only over 90% pass ratio is acceptable.

## Implementation Notes

### Limitations of MVP

1. System monitoring limitations:

   - It is not able to save system logs if connection to the database is lost.
   - It is not able to save system logs from other services if the connection between API gateway and Authentication service is lost. Authentication is required before a service could  any system log.


2. Solution in the future:
   - As of right now, make MVP and create a working system is my top priority. In the future:
   - A alternative way to recording system monitoring logs will be added, it will be:
     - using alternative ways to send logs, e.g using AWS message queue.
     - using local file system to temperately store logs in file, then log everything from them file when system is fully back online.

## Authors

- Software Developer: Peng Chen
  - [Official Github](https://github.com/PengChen11)

## License

This project is under the MIT License.

## Acknowledgements / Resources

- [Things about microservices](https://microservices.io)

- [7 reasons to switch to microservices — and 5 reasons you might not succeed](https://www.cio.com/article/3201193/7-reasons-to-switch-to-microservices-and-5-reasons-you-might-not-succeed.html)
