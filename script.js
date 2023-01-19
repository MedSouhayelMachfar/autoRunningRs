const { spawn } = require('node:child_process');
const config = require("./config.json");
const {findInstanceByType} = require("./util/findInstanceByType.js");
const {generateFileCommandes} = require("./util/generateFileCommandes.js");
const {generateConnectionString} = require("./util/generateConnectionString.js");
const REPLSET_NAME = config.replset_name;
const MONGO_BIN_PATH = config.mongo_bin_path;
const { instances } = config;
const INITIATE = process.argv[2];


/**
 * My Function
 *
 * @param {string} path Argument 1
 * @param {string} port Argument 2
 * @param {string} replset_name Argument 3
 * @param {string} mongo_bin_path Argument 4
 */
const launchInstance = ({path, port, replset_name, mongo_bin_path} = {}) => {
    const command = 'cmd.exe';
    const args =  ['/c', `${__dirname}/shell/replset_process.bat`, mongo_bin_path, replset_name, path, port];

    const bat = spawn(command, args);

    bat.stdout.on('data', (data) => {
    });
    
    bat.stderr.on('data', (data) => {
        console.error(data.toString());
    });
    
    bat.on('exit', (code) => {
    }); 
}

/**
 * My Function
 *
 * @param {Array} instances Argument 1
 * @param {string} mongo_bin_path Argument 2
 */
const initiateReplSet = ({instances, mongo_bin_path} = {}) => {
    const rsPrimary = findInstanceByType({instances: instances, type: "primary"});
    if(rsPrimary.length === 0) throw new Error("no primary detected in instances!");
    
    const rsSecondaries = findInstanceByType({instances: instances, type: "secondary"});
    const rsArbiter = findInstanceByType({instances: instances, type: "arbiter"});

    const portRsPrimary = rsPrimary[0].port;
    const command = 'cmd.exe';
    const args =  ['/c', `${__dirname}/shell/initiate_rs.bat`, mongo_bin_path, portRsPrimary];
    // Spanning process and handling events
    const bat = spawn(command, args);
    bat.stdout.on('data', (data) => {
        // Generate a file with the apropriate commandes
        generateFileCommandes({secondaryArray: rsSecondaries, arbiterArray: rsArbiter})
    });
    
    bat.stderr.on('data', (data) => {
        console.error(data.toString());
    });
    
    bat.on('exit', (code) => {
        if(code === 1)
            return console.log(`couldn't connect to ${rsPrimary[0].host}:${portRsPrimary}`);
    }); 
}


(function run(){
    // Running all instances specified in the config file
    instances.forEach(instance => {
        launchInstance({path: instance.path, port: instance.port, replset_name: REPLSET_NAME, mongo_bin_path: MONGO_BIN_PATH});
    })


    // Initiate replicasetcm
    if(INITIATE === "-init") {
        setTimeout(()=>{
            initiateReplSet({instances: instances, mongo_bin_path: MONGO_BIN_PATH });
            console.log(`File generated: \x1b[44mcommandes.txt\x1b[0m`);
        }, 6000);
    }
    setTimeout(()=>{
        let connectionString = generateConnectionString({instances: instances, rsName: REPLSET_NAME});
        connectionString = connectionString.replace("<DB_NAME>", "\x1b[41m<DB_NAME>\x1b[0m");
        const splittedString = connectionString.split("?");
        connectionString = `\x1b[44m${splittedString[0]}\x1b[44m?${splittedString[1]}\x1b[0m`;
        console.log(`Mongo connection string: ${connectionString}`);
    }, 1000);
})();


