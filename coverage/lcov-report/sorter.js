// Sorter for coverage summary tables
(function() {
    const tables = document.querySelectorAll('.coverage-summary');
    
    tables.forEach(table => {
        const headers = table.querySelectorAll('th');
        const rows = Array.from(table.querySelectorAll('tbody tr'));
        
        headers.forEach((header, index) => {
            header.addEventListener('click', () => {
                const isAscending = header.classList.contains('asc');
                
                // Sort rows based on the clicked header
                const sortedRows = rows.sort((a, b) => {
                    const aText = a.children[index].innerText;
                    const bText = b.children[index].innerText;
                    
                    // Convert to number if the header is a numeric type
                    const aValue = isNaN(aText) ? aText : parseFloat(aText);
                    const bValue = isNaN(bText) ? bText : parseFloat(bText);
                    
                    return isAscending ? aValue > bValue ? 1 : -1 : aValue < bValue ? 1 : -1;
                });
                
                // Remove existing rows
                rows.forEach(row => table.querySelector('tbody').removeChild(row));
                
                // Append sorted rows
                sortedRows.forEach(row => table.querySelector('tbody').appendChild(row));
                
                // Update header classes
                headers.forEach(h => h.classList.remove('asc', 'desc'));
                header.classList.toggle('asc', !isAscending);
                header.classList.toggle('desc', isAscending);
            });
        });
    });
})();
