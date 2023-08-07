document.addEventListener("DOMContentLoaded", function() {
    const downloadBtn = document.getElementById("download-csv");
    const dataTable = document.getElementById("data-table");

    downloadBtn.addEventListener("click", function() {
        const rows = dataTable.getElementsByTagName("tr");
        var inputValue = d3.select("#user-input").node().value.trim();
        if (inputValue === "") {
            alert("No data to download.");
            return;
        }
        let csvContent = "data:text/csv;charset=utf-8,";
        
        const headerRow = dataTable.querySelector("thead tr");
        const headerCells = headerRow.getElementsByTagName("th");
        const columnNames = Array.from(headerCells).map(cell => cell.textContent.trim());
        
        csvContent += columnNames.map(escapeCsvValue).join(",") + "\n";
        for (const row of rows) {
            const cells = row.getElementsByTagName("td");
            const rowData = [];

            for (const cell of cells) {
                rowData.push(escapeCsvValue(cell.textContent.trim()));
            }

            csvContent += rowData.join(",") + "\n";
        }

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "hospitalSpecialitiesAndBedCapacity.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});

function escapeCsvValue(value) {
    if (value.includes(',') || value.includes('"') || value.includes('\n')) {
        return '"' + value.replace(/"/g, '""') + '"';
    } else {
        return value;
    }
}