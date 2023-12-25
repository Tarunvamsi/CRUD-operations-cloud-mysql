CRUD: create folder public in CRUD directory

place frontend files(index.html,script.js,style.css),Dockerfile in public folder

place all the backend files(app.js,Dockerfile,docker-compose.yml) in CRUD directory

//Install dependencies: npm i npm install mysql npm install express

//Open docker daemon in background

//change the endpoints in docker-compose.yml,app.js

docker-compose build

docker-compose up

New terminal: docker ps

docker exec -it mysql_container_id /bin/bash

docker exec -it 6eb768372fa0 /bin/bash

mysql -h database-1.cnzkvkf31hel.us-east-1.rds.amazonaws.com -u admin -p

For testing purpose: INSERT INTO facebookdata (name, email) VALUES ('sita', 'sita@gmail.com');

UPDATE facebookdata SET email = 'sitayahoo@gmail.com' WHERE name = 'sita';

DELETE FROM facebookdata WHERE name = 'sita';