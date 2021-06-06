# YAUS ( Yet another URL shortner )

#### 🚀  A Robust, Scalable, and fast URL shortener App .

[![GitHub license](https://img.shields.io/github/license/Mainak10/url-shortner)](https://github.com/Mainak10/url-shortner) [![](https://img.shields.io/badge/NodeJs-14.17.0-brightgreen)](https://nodejs.dev/download/) [![](https://img.shields.io/badge/Express-4.17.1-green)](https://www.npmjs.com/package/express) [![](https://img.shields.io/badge/PostgreSQL-8.6.0-orange)](https://www.postgresql.org/download/) [![](https://img.shields.io/badge/Dependencies-updated-brightgreen)](https://github.com/Mainak10/url-shortner/blob/master/package.json)

## A brief Note on URL shortner
URL shorteners are everywhere, from links you share on twitter to popular services like [bit.ly](https://bitly.com/) or [tiny url](https://tinyurl.com/app/) But have you ever wondered how you could create a quick URL shortener for yourself ?

## Test case
On a high level we can think of URL Shortener as passing the long the url through some encoder and in return we will get the short url.
URL Shortener design revolves around 2 operations:

1. Creating a short url using a long url.
2. Decoding short to long url.

For Creating a short url we can consider alphabets a-z , A-Z and numeric 0–9, - , _ .  So total we have 64 characters which we can use. For our case let’s consider creating 7 character urls. So with 64 characters and 7 char long url we will have 64^7 combinations available.

So we have 64^7 ~ 281 trillion combinations. 

Considering **10000** requests per second.  
One Year Request = __10000 * 60 * 60 * 24 * 365 = 315360000000__  
Years with __281 trillion__ combination = 281 / 0.31536 ~ __891__ years.  
So with 64 characters our system can create short a url for 891 years with average 10000 requests per second.

We can use multiple encoders/algorithms for creating urls. Few are below:  
1. Base62
2. MD5
3. ZooKeeper    

Here I have used radix64 Algorithm to encode/ decode short URLS

## Radix64 Algorithm 

With radix64 we can create short urls (7 characters) easily with small algo.

The first challenge is How can we make sure it always generate 7 chars code only ?    
 
This code always guarenteed to generate always 7 chars random digits 

`parseInt(Math.random() * 1000000000000)`  

But how?  
log of 1000000000000 of base 64 always generate 7. Same logic when we check how many bits are there in any decimal number. 

Note: There is a possibility of collision with radix64 also but chances are less since we have taken large sample space. 

## Platform setup to run the app
1. Install latest version of [Node](https://nodejs.dev/download/).   
Note: Please install node 14+ some of the latest JS features may break in older version of node.

2. Install [postgres](https://www.postgresql.org/) as your RDBMS.     
 For mac users please install it via homebrew (assuming you have already installed homebrew.)  
`brew install postgresql`

3. create a database as mentioned in the db.js file `url_shortner_db`  and create a role for `dbadmin`. To change the databse-name / role / password please change db.js file accordingly. 

4. To start the application type `node server.js` on your terminal. 

5. To create a new link enter `/api/links` add body as json :  
`{    
    link:"https://youtube.com",                                    
    code:"rTYgH5_" // optional:: user defined short code 
 }`

 6. To get the actual URL enter short code e.g `/rTYgH5_` it will redirect to youtube's site. 