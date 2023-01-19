/**
 * My Function
 *
 * @param {Array} instances an array of instance holding configurations
 * @param {string} rsName the name of the replicaset
 * @return {string} a connection string to mongodb
 */
exports.generateConnectionString = ({instances, rsName}={}) => {
    if(typeof instances !== "object" || !(instances instanceof Array)) throw Error("Please provide an array of instances, or check your config file!");
    const rsPrimary = instances.find(instance=> instance.type === "primary");

    if(rsPrimary === undefined) throw new Error("no primary detected in instances!");

    let content = `mongodb://${rsPrimary.host}:${rsPrimary.port}/<DB_NAME>?replicaSet=${rsName}&serverSelectionTimeoutMS=5000`;  


    return content;
}