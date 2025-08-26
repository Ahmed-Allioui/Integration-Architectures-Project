# *Integration Architectures* MEAN-Template

This is an academic project developed at the Bonn-Rhein-Sieg University of Applied Sciences, aimed at integrating OrangeHRM with OpenCRX. The backend was developed by me, while the frontend was implemented by the university college team.

## Prerequisites
 1. You need a **Node.js** runtime. It is available at: https://nodejs.org/ .

 2. Access to a **MongoDB** server is necessary.

## Setup

 1. **Cloning this git repository**

 2. **Installing dependencies**

    Navigate to the location of the `package.json` inside your shell and then run `npm install`.
    <br><br>
    __Either way, this has to be done both in the directory `frontend/` and `backend/`.__

## Launching the Applications

For both front- and backend there ar run scripts included in their `package.json`.
So you can just start them by running `npm run start` in their respective directories. On Windows systems you should  start
the _backend_ with `npm run start_win`, because there environment variables are handled a little different than in Unix.

After they are done starting, the frontend can be reached from your browser at: http://localhost:4200/

You can log in with username *admin* and the password, which is preconfigured at `backend/environment/environment.js` for local use or `backend/environment/environment.prod.js` remote deployment.
In case you changed and forgot your password, you can still empty the collection 'user' in the database and restart the backend. Then a new admin user will be created upon restart/redeployment.
