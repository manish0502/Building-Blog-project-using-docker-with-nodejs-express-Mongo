# Building-Blog-project-using-docker-with-nodejs-express-Mongo
Blog project with docker , node ,express &amp; MongoDB.A blog (a shortened version of “weblog”) is an online journal or informational website displaying information in reverse chronological order, with the latest posts appearing first, at the top. It is a platform where a writer or a group of writers share their views on an individual subject.


## to start the project 
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d 

### to build the image

docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build

### to down the network

docker-compose -f docker-compose.yml -f docker-compose.dev.yml down -v

### to check the server
 docker logs (containerID) -f
