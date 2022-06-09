# Node installing 
## Step 1 :  Adding NodeJs PPA

First you need to node.js ppa in our system provide by nodejs official website. We also need to install python-software-properties package if not installed already.

root@e2enetworks ~ $ apt-get install python-software-properties
root@e2enetworks ~ $ curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash –

## Step 2: Install Node.js and NPM

After adding required PPA file, lets install Nodejs package. NPM will also be installed with node.js. This command will also install many other dependent packages on your system.

root@e2enetworks ~ $ apt-get install nodejs

## Step 3: Check Node.js and NPM Version

After installing node.js , now check the installed version. You can find more details about current version on node.js official website.

root@e2enetworks ~ $ node -v

v6.6.0

Also check the version of npm.

root@e2enetworks ~ $ npm -v


# DB installing

## Step 1 :  Adding sqlite3

sudo apt install sqlite3


# Run project 
1. npm i
2. npm run build
3. npm run start:dev

# API using
1. go to: http://localhost:5000/api/docs/#

### user: 
{
  "email": "user@mail.com",
  "password": "user_password"
}
### admin: 
{
  "email": "admin@mail.com",
  "password": "admin_password"
}
### conductor:
{
  "email": "conductor@mail.com",
  "password": "conductor_password"
}
