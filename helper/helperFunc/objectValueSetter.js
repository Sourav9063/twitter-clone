export function objectValueSetter(obj, value) {

    for (let el in obj) {
        obj[ el ] = value;

    }
    console.log(obj);
    return obj;

}