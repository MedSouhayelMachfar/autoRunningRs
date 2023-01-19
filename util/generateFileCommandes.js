const fs = require("fs");

/**
 * My Function
 *
 * @param {Array} secondaryArray an array of instance configuration of type secondary
 * @param {Array} arbiterArray array of instance configuration of type secondary
 */
exports.generateFileCommandes = ({secondaryArray, arbiterArray}={}) => {
    if(typeof secondaryArray !== "object" || !(secondaryArray instanceof Array)) {
        throw Error("Please provide an array of secondaryArray, or check your config file!");
    }
    if(typeof arbiterArray !== "object" || !(secondaryArray instanceof Array)) {
        throw Error("Please provide an array of arbiterArray, or check your config file!");
    }
    
    let content = `rs.initiate()\nrs.status()\n`;

    secondaryArray.forEach(instance=>{
        content += `rs.add("${instance.host}:${instance.port}")\n`;
    });

    arbiterArray.forEach(instance=>{
        content += `rs.addArb("${instance.host}:${instance.port}")\n`;
    });

    fs.writeFileSync("./commandes.txt", content);
}