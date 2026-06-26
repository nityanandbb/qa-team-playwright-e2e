const ExcelJs = require ('exceljs');

// senario : print all the values from the excel

async function excelTest() {  // to handle await -we need to add async function to the code
    

const workbook = new  ExcelJs.Workbook();

await workbook.xlsx.readFile("C:/Users/QED42/Downloads/lighthouse-metrics.xlsx");

const worksheet = workbook.getWorksheet('sheet 1');

worksheet.eachRow( (row,rowNumber)   =>              // iterate through all the rows

{

row.eachCell((cell,cellNumber)=>             // iterrate throgh the columns

{

console.log(cell.value);


}) // closing inner funtion


}) // closing outer function

} // closing async fnunction

excelTest();   // calling async function