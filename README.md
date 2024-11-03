# Profugo Documentation

The API supports all CRUD operations and includes checks to ensure that a person’s identification number is not already registered. It also validates the input using Zod and verifies the correctness of the identification number with the Luhn algorithm.

The Luhn algorithm or Luhn formula, also known as the "modulus 10" or "mod 10" algorithm, named after its creator, IBM scientist Hans Peter Luhn, is a simple check digit formula used to validate a variety of identification numbers.
https://en.wikipedia.org/wiki/Luhn_algorithm



## Get All Persons
**Endpoint:** `GET /api/v1/registration/`  
**Responses:**
- `200 OK:` List of persons retrieved.
- `500 Internal Server Error:` Request processing error.

## Add Person
**Endpoint:** `POST /api/v1/registration/`  
**Responses:**
- `201 Created:` Person registered, returns ID.
- `400 Bad Request:` Invalid input.
- `500 Internal Server Error:` Request processing error.

## Get Person by ID
**Endpoint:** `GET /api/v1/registration/:id`  
**Responses:**
- `200 OK:` Person details retrieved.
- `404 Not Found:` Person ID does not exist.
- `500 Internal Server Error:` Request processing error.

## Delete Person by ID
**Endpoint:** `DELETE /api/v1/registration/:id`  
**Responses:**
- `200 OK:` Person deleted.
- `404 Not Found:` Person ID does not exist.
- `500 Internal Server Error:` Request processing error.

## Update Person by ID
**Endpoint:** `PUT /api/v1/registration/:id`  
**Responses:**
- `200 OK:` Person details updated.
- `400 Bad Request:` Invalid input.
- `404 Not Found:` Person ID does not exist.
- `500 Internal Server Error:` Request processing error.
