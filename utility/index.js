const parseObject = async function(v,transform){
    const result = matchobj(v.value, transform);
    if(result){
        v.value = v.value.replace(`{${Object.keys(result)[0]}}`, Object.values(result)[0])
    }
    return v;
}

const matchobj = function(str, transformobj){
    for (const iterator in transformobj) {
        if(str.match(`{${iterator}}`)){
          return {[iterator]:transformobj[iterator]}
        }
    }
    return false
}

const parseArray = async function(obj,transform){
    obj.value.map(v=>{
        if(v.valueType == "string"){
            v =   parseObject(v,transform)
        }
        if(v.valueType == "array"){
            v =   parseArray(v,transform)
        }
    })
    return obj;
}

module.exports.transformpayload = async function(data,transform){
    data.value.map(v => {
        if(v.valueType == "string"){
          v =   parseObject(v,transform)
        }
        if(v.valueType == "array"){
            v =   parseArray(v,transform)
        }
        return v
    });
    return data;
}