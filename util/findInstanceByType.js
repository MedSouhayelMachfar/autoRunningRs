/**
 * My Function
 *
 * @param {Array} instances an array of instance configuration
 * @param {type} string PSA(primary | secondary | arbiter)
 * @return {Array} array of instances
 */
exports.findInstanceByType = ({instances, type}={}) => {
    if(typeof instances !== "object" || !(instances instanceof Array)) {
        throw Error("Please provide an array of instances, or check your config file!");
    }
    if(!["primary", "secondary", "arbiter"].includes(type)) {
        throw Error("Please provide a valid instance type : ['primary', 'secondary', 'arbiter']");
    }
    switch(type){
        case "primary":
            const rsPrimary = instances.find((instance)=>instance.type==="primary");
            return rsPrimary ? [rsPrimary] : [];
        case "secondary":
            const rsSecondaries = [];
            
            instances.forEach((instance)=> {
                if(instance.type==="secondary") 
                    rsSecondaries.push(instance);
            });
            return rsSecondaries;
        case "arbiter":
            const rsArbiter = instances.find((instance)=>instance.type==="arbiter");
            return rsArbiter ? [rsArbiter] : [];
    }
}