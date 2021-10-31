./gradlew bootjar
docker-compose build
docker-compose down
docker-compose up -d --force-recreate
