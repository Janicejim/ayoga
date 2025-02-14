FROM --platform=linux/x86-64 node:18.20.6-alpine3.21         
WORKDIR /usr/src/app              
COPY  dist .                       
COPY  package.json .
COPY  init_data.xlsx .
COPY  model ./model
EXPOSE 8080   
RUN ls -al                    
CMD yarn install && \             
    yarn knex migrate:latest &&\
    yarn knex seed:run &&\
    node server.js