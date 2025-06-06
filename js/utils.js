/**
 * 工具函数模块
 */

// XLSX相关功能
const gk_isXlsx = false;
const gk_xlsxFileLookup = {};
const gk_fileData = {};

/**
 * 检查单元格是否有内容
 * @param {*} cell - 单元格内容
 * @returns {boolean} - 是否有内容
 */
function filledCell(cell) {
  return cell !== '' && cell != null;
}

/**
 * 加载文件数据
 * @param {string} filename - 文件名
 * @returns {string} - 文件数据
 */
function loadFileData(filename) {
  if (gk_isXlsx && gk_xlsxFileLookup[filename]) {
    try {
      var workbook = XLSX.read(gk_fileData[filename], { type: 'base64' });
      var firstSheetName = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[firstSheetName];

      // Convert sheet to JSON to filter blank rows
      var jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, blankrows: false, defval: '' });
      // Filter out blank rows (rows where all cells are empty, null, or undefined)
      var filteredData = jsonData.filter(row => row.some(filledCell));

      // Heuristic to find the header row by ignoring rows with fewer filled cells than the next row
      var headerRowIndex = filteredData.findIndex((row, index) =>
        row.filter(filledCell).length >= filteredData[index + 1]?.filter(filledCell).length
      );
      // Fallback
      if (headerRowIndex === -1 || headerRowIndex > 25) {
        headerRowIndex = 0;
      }

      // Convert filtered JSON back to CSV
      var csv = XLSX.utils.aoa_to_sheet(filteredData.slice(headerRowIndex)); // Create a new sheet from filtered array of arrays
      csv = XLSX.utils.sheet_to_csv(csv, { header: 1 });
      return csv;
    } catch (e) {
      console.error(e);
      return "";
    }
  }
  return gk_fileData[filename] || "";
}

// 导出函数和变量
export { filledCell, loadFileData, gk_isXlsx, gk_xlsxFileLookup, gk_fileData }; 