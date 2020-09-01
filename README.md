## Installation

First, specify the database credentials in `config/config.json`. Easiest way to set up a database is to use WAMP / XAMPP servers as default credentials are used and no additional setup would be required.  
Here we install `sequelize` globally, you could also install it locally and use with `npx`.

- `npm i -g sequelize-cli`
- `npm install`
- `sequelize db:create`
- `sequelize db:migrate`
- `sequelize-cli db:seed:all`
- `npm start`

Codecommit