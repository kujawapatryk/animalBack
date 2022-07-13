import  {createPool}  from "mysql2/promise";


export const pool = createPool({
    host: 'localhost',
    user: 'root',
    database: 'animal_adoption',
    namedPlaceholders: true,
    decimalNumbers: true,
});