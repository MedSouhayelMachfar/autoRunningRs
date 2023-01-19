# Welcome to AutoRunningRs!

- Description

Hi! this script can let you auto run mongoDB replicaSet based on a specific **configuration**. 


# Config file

### Json format example

```json
{

	"mongo_bin_path": "C:/Program Files/MongoDB/Server/4.4.14/bin",

	"replset_name": "rs0",

	"instances": [

		{"host": "127.0.0.1", "port": 27007, "path":"D:/aba-replicaset/data/R0S1", "type": "primary"},

		{"host": "127.0.0.1", "port": 27008, "path":"D:/aba-replicaset/data/R0S2", "type": "secondary"},

		{"host": "127.0.0.1", "port": 27009, "path":"D:/aba-replicaset/data/arb", "type": "arbiter"}

	]

}
```

### Property description

| Property      | Description | example     |
| :---        |    :----:   |          ---: |
| mongo_bin_path| mongo db bin folder path  | D:/mongo/server/version/bin   |
| replset_name| name of the replicaset | rs0   |
| instances| array of instances | {"host": "localhost", "port":27007, path:D:/rs0/data/R0S1","type": "primary"				}  |


## Initiation

- Start by configuring the **config.json** file
- in your terminal run : `npm run start:init`
>- `start:init` commande will run the script.js with the *-init* option.
>
>- Using *-init* option:  will  lauching all cmd instances listing commandes needed, and after 6seconds a new terminal will be opened pointing to the primary instance to be configured. 
>
>- Text File is generated including commandes **in order**, and we have to copy paste to the terminal named **"config"**. 
>
>- Massage is printed to the console presenting the connection string and the commande file name.
>
>- example : 
>- *mongodb://127.0.0.1:27007/**<DB_Name>**?replicaSet=rs0&serverSelectionTimeoutMS=5000*
>- *check commandes.txt*



## Run replicaSet already initiated

- in your terminal run : `npm run start`
>- `start` commande will run the script.js, and launch all replicaset instances.
>
>- A massage is printed to the console presenting the connection string.
>
>- example : 
>*mongodb://127.0.0.1:27007/**<DB_Name>**?replicaSet=rs0&serverSelectionTimeoutMS=5000*
>Replace `<DB_NAME>` with your data base name.  
