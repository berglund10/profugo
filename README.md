The API provides a way for restaurants and stores to report leftovers or food that would otherwise go to waste. Additionally, it allows the organization to retrieve a list of restaurants with guaranteed food contributions, enabling prioritized visits to these locations before continuing with regular outreach.

If someone wishes to register, the API supports all CRUD operations and includes checks to ensure that a person’s identification number is not already registered. It also validates the input using Zod and verifies the correctness of the identification number with the Luhn algorithm.

The Luhn algorithm or Luhn formula, also known as the "modulus 10" or "mod 10" algorithm, named after its creator, IBM scientist Hans Peter Luhn, is a simple check digit formula used to validate a variety of identification numbers.
https://en.wikipedia.org/wiki/Luhn_algorithm

### Start project:
npm install<br>
npm run dev

## Endpoints

### Get All Contributions
- **URL:** `/api/v1/food-contributions/`
- **Method:** `GET`
- **Description:** Retrieves a list of all food contributions.
- **Responses:**
  - `200 OK:` List of contributions retrieved.
  - `500 Internal Server Error:` Request processing error.

### Add Contribution
- **URL:** `/api/v1/food-contributions/`
- **Method:** `POST`
- **Description:** Adds a new food contribution.
- **Responses:**
  - `201 Created:` Contribution registered, returns ID.
  - `400 Bad Request:` Invalid input.
  - `500 Internal Server Error:` Request processing error.

### Delete Contribution by ID
- **URL:** `/api/v1/food-contributions/:id`
- **Method:** `DELETE`
- **Description:** Deletes a food contribution by its ID.
- **Responses:**
  - `200 OK:` Contribution deleted.
  - `404 Not Found:` Contribution ID does not exist.
  - `500 Internal Server Error:` Request processing error.

### Get All Persons
- **URL:** `/api/v1/registration/`
- **Method:** `GET`
- **Description:** Retrieves a list of all registered persons.
- **Responses:**
  - `200 OK:` List of persons retrieved.
  - `500 Internal Server Error:` Request processing error.

### Add Person
- **URL:** `/api/v1/registration/`
- **Method:** `POST`
- **Description:** Adds a new person to the registration.
- **Responses:**
  - `201 Created:` Person registered, returns ID.
  - `400 Bad Request:` Invalid input.
  - `500 Internal Server Error:` Request processing error.

### Get Person by ID
- **URL:** `/api/v1/registration/:id`
- **Method:** `GET`
- **Description:** Retrieves details of a specific person by their ID.
- **Responses:**
  - `200 OK:` Person details retrieved.
  - `404 Not Found:` Person ID does not exist.
  - `500 Internal Server Error:` Request processing error.

### Delete Person by ID
- **URL:** `/api/v1/registration/:id`
- **Method:** `DELETE`
- **Description:** Deletes a person from the registration by their ID.
- **Responses:**
  - `200 OK:` Person deleted.
  - `404 Not Found:` Person ID does not exist.
  - `500 Internal Server Error:` Request processing error.

### Update Person by ID
- **URL:** `/api/v1/registration/:id`
- **Method:** `PUT`
- **Description:** Updates the details of a specific person by their ID.
- **Responses:**
  - `200 OK:` Person details updated.
  - `400 Bad Request:` Invalid input.
  - `404 Not Found:` Person ID does not exist.
  - `500 Internal Server Error:` Request processing error.


