import { test } from "@playwright/test";
import ExcelJs from "exceljs";

async function writeExcelTest(searchText, replaceText, change, filePath) {
    const workbook = new ExcelJs.Workbook()
    await workbook.xlsx.readFile(filePath)
    const worksheet = workbook.getWorksheet("Sheet 1")
    const output = readExcel(worksheet, searchText)

    const cell = worksheet.getCell(output.row, output.column + change.colChange)
}

function readExcel(worksheet, searchText) {
    let output = {
        row: -1,
        column: -1
    }
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                output.row = rowNumber
                output.column = colNumber
            }
        })
    })
    return output
}

test("Upload - Download Excel Validation", async ({ page }) => {

    const textSearch = 'Mango';
    const updateValue = '350';

    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html")

    //Download the file using Download button
    const downloadPromise = page.waitForEvent("download")
    await page.getByRole("button", { name: "Download" }).click()
    await downloadPromise

    //Update contents in the excel
    writeExcelTest(textSearch, updateValue, { rowChange: 0, colChange: 2 }, "./assets/files/download.xlsx")

    //Upload the file using Choose File button
    await page.locator("//input[@id='fileinput']").click()
    await page.locator("//input[@id='fileinput']").setInputFiles("./assets/files/download.xlsx")

    const desiredRow = await page.getByRole('row').filter({ has: page.getByText(textSearch) });
    await expect(desiredRow.locator('#cell-4-undefined')).toContainText(updateValue);

})