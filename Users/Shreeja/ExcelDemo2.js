const ExcelJs = require('exceljs');


// senario : seaching value & returing its row number & cell number 
async function excelTest() {
    
    const workbook = new ExcelJs.Workbook();

    await workbook.xlsx.readFile("C:/Users/QED42/Downloads/lighthouse-metrics.xlsx");

    const worksheet = workbook.getWorksheet('sheet 1');

    worksheet.eachRow((row, rowNumber) => {

        row.eachCell((cell, colNumber) => {

            if (cell.value === "60Â ms") {

                console.log(rowNumber);
                console.log(colNumber);

            }

        });


    });
    

    // senario : replace value from the sheet 

    const cell = worksheet.getCell(4,7)
    cell.value = "64Â ms";

    await workbook.xlsx.writeFile("C:/Users/QED42/Downloads/lighthouse-metrics.xlsx"); //saving the file after update 



}

excelTest();