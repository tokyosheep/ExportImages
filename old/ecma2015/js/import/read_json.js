export function read_json(json_path){
    const fs = require(`fs`);
    const file_content = fs.readFileSync(json_path,`utf8`);
    const result = JSON.parse(file_content);
    return result;
}