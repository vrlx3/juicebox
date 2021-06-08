const chalk = require('chalk');
const {client, getAllUsers, createUser} = require('./index');

async function droptables() {
    try{ 
        console.log("Starting to drop tables...")
        await client.query(`
        DROP TABLE IF EXISTS users
        ;`)
        console.log("Drop Table complete...")
       
    } catch(error) {
        console.log(chalk.red("Error dropping tables."))
        throw error;
      
   }
}


async function createTables() {
    try{
        console.log(chalk.whiteBright("Starting build table..."))
        await client.query(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY, 
                username VARCHAR(255) UNIQUE NOT NULL, 
                password VARCHAR(255) NOT NULL
            );

        `)
        console.log("Create table complete")
    } catch (error) {
        console.log(chalk.red("Error creating tables..."))
        throw error;
    }
}

async function createInitialUser () {
    try{
        console.log('starting to create user...')
        const albert = await createUser({username: 'albert', password: 'bertie99'})
        console.log(albert)
        console.log('Finished adding user')

        const sandra = await createUser ({username: 'sandra', password: 'reall'})
        console.log(sandra)

        const glamgal = await createUser({username: 'glamgal', password: 'galgam'})
        console.log(glamgal)

    }
    catch(error) {console.error(chalk.red('Error creaitng user')); 
        throw error;
    }
}

async function rebuildDB() {
    try { client.connect ()
        await droptables ()
        await createTables ()
        await createInitialUser()
    } catch(error){
        throw error;
    } 
  
    }



async function testDB() {
    try{
        console.log("Connecting to DB...");
        const users = await getAllUsers();
        console.log("----------------------------------------------")
        console.log("getallusers ", users)
        console.log("----------------------------------------------")
        console.log("Finsihed testing DB.");
    } catch(error) {
        console.log(chalk.red("Error testing Database."))
        throw error;
    } 
}

rebuildDB()
.then(testDB)
.then(console.error)
.finally(() => client.end());
