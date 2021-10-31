# Commands to run

### To build the jar
`$ ./gradlew bootjar`

### To run tests test
`$ ./gradlew test`

### To run coverage
`$ ./gradlew jacocoTestReport`


### To run the application locally

* Start database `$ docker-compose -f docker-compose-postgres.yml up`

    You can see the database console at http://localhost:9090

* Run application `$ ./gradlew bootrun`

### To run application and database as containers
`$ docker compose up`

#### To restart

* Builds a new jar `$ ./gradlew bootjar`

* Build new docker image with the new jar `$ docker-compose build`

* Stop docker compose containers `$ docker-compose down`

* Start docker compose containers, forcing them to recreate with new images `$ docker-compose up -d --force-recreate`

All the above steps put in one place
`$ ./bin/redeploy.sh`
