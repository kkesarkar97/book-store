FROM openjdk:8-alpine
VOLUME /tmp
ADD /build/libs/shoppingcart-api-1.0-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-Dspring.profiles.active=prod","-jar","/app.jar"]
