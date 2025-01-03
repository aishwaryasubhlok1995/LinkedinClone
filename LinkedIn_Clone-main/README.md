# LinkedIn Simulation

This application is an adaptation of an business and employment oriented service architecture such as 'LinkedIn' using open-source technologies. It makes use of MERN stack web-development to enhance request handling performance and makes use of messaging service such as Kafka.

This is a completely RESTful API based application and makes use of HTTP protocol.The back-end of this application is built using Node Javascript. The database used is No-SQL which helps in storing product metadata and helps improving scalability of the architecture.

The middleware is built using Kafka messaging service to ensure that no requests are lost and proper subscription and publishing queues are maintained, from where requests are assigned to servers.

The front end of this application is coded using React-Redux, HTML5, CSS3 and bootstrap.

The testing will be performed using Jmeter to support 10000 concurrent users and Mocha.

The application will be hosted on AWS.

This project is built for acamedic purposes and should not be used in any commercial way.

## USAGE

### Installation

Please install the following before running this application

1. Express-Node environment
2. Kafka Server
3. MongoDB Server

Start your Kafka and MongoDB servers.

### Running the application

**Go to the Frontend module and run the following commands**

```
npm install
npm start
```

**Go to Backend module and run the following commands**

```
npm install
node index.js
```

Run Zookeeper and Kafka servers

**Go to Kafka Backend module and run the following commands**

```
npm install
npm start
```

Run the server on localhost:3000/ to land on the Home page.

## Development

1. Node Javascript
2. React-Redux
3. Bootstrap
4. HTML5
5. CSS
6. MongoDB
7. Kafka
8. Mocha
9. JMeter
10. PassportJS
