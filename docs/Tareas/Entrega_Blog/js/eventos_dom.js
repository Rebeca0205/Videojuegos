// 1. Mostrar la posición del mouse en el documento
document.addEventListener("mousemove", (event) => {
    const mousePosition = document.getElementById("mousePosition");
    mousePosition.textContent = `Posición del mouse: X=${event.clientX}, Y=${event.clientY}`;
});

// 2. Obtener nombre y apellido y mostrar nombre completo
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('form1').addEventListener('submit', (event) => {
        event.preventDefault();
        const firstName = document.getElementById('form-fname').value;
        const lastName = document.getElementById('form-lname').value;
        const fullName = `${firstName} ${lastName}`;
        
        const fullNameElement = document.createElement('p');
        fullNameElement.textContent = `Nombre completo: ${fullName}`;
        document.getElementById('form1').appendChild(fullNameElement);
    });

    document.getElementById('btn-insert-r').addEventListener('click', () => {
        const table = document.getElementById('sampleTable');
        const newRow = table.insertRow();
        const cellsCount = table.rows[0].cells.length;
        
        for (let i = 0; i < cellsCount; i++) {
            const newCell = newRow.insertCell();
            newCell.textContent = `New row cell ${i + 1}`;
        }
    });

    document.getElementById('btn-insert-c').addEventListener('click', () => {
        const table = document.getElementById('sampleTable');
        
        for (let i = 0; i < table.rows.length; i++) {
            const newCell = table.rows[i].insertCell();
            newCell.textContent = `New col cell ${i + 1}`;
        }
    });

    document.getElementById('btn-change').addEventListener('click', () => {
        const rowIndex = parseInt(document.getElementById('rowIndex').value);
        const colIndex = parseInt(document.getElementById('colIndex').value);
        const newValue = document.getElementById('newValue').value;
        
        const table = document.getElementById('myTable');
        const row = table.rows[rowIndex];
        if (row) {
            const cell = row.cells[colIndex];
            if (cell) {
                cell.textContent = newValue;
            } else {
                alert('Columna no válida');
            }
        } else {
            alert('Fila no válida');
        }
    });

    document.getElementById('btn-add-color').addEventListener('click', () => {
        const colorSelect = document.getElementById('colorSelect');
        const newColor = `Color ${Math.floor(Math.random() * 1000)}`;
        const newOption = document.createElement('option');
        newOption.textContent = newColor;
        colorSelect.appendChild(newOption);
    });

    document.getElementById('btn-rmv-color').addEventListener('click', () => {
        const colorSelect = document.getElementById('colorSelect');
        if (colorSelect.options.length > 0) {
            colorSelect.remove(colorSelect.options.length - 1);
        } else {
            alert('No hay más colores para eliminar');
        }
    });

    document.getElementById('imagenGato').addEventListener('mouseenter', () => {
        const randomSize = Math.floor(Math.random() * 4) + 1;
        const imagenGato = document.getElementById('imagenGato');
        
        // Remover todas las clases de tamaño
        imagenGato.classList.remove('size1', 'size2', 'size3', 'size4');
        
        // Agregar la clase de tamaño aleatorio
        imagenGato.classList.add(`size${randomSize}`);
    });
});