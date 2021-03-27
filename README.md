# Pathfinder FEC's metadata service

> Holds product metadata and renders several react components


## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage



## Requirements

- Node 6.13.0
- Mysql 5.7
- etc


## Seeding the Database

To prepare the database:
- execute schema.sql in server/database/
- modify connection.js in server/database/ to use your mysql login info.

Then, from the root directory:

```sh
npm run seed
```

## Initializing the service

Once the database is seeded, do the following from the main directory

```sh
npm run compile //creates public directory with webpack
npm start //starts the service
```

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```
