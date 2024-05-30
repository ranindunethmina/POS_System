document.addEventListener('DOMContentLoaded', () => {
    const itemForm = document.getElementById('itemForm');
    const itemTableBody = document.getElementById('itemTable').querySelector('tbody');
    const selectedItemCode = document.getElementById('orderItemCode');
    const selectedItemName = document.getElementById('orderitemName');
    const selectedItemQty = document.getElementById('price');
    const selectedUnitPrice = document.getElementById('QtyOnH');

    let items = [];
    let editIndex = -1;

    itemForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const itemCode = document.getElementById('itemCode').value;
        const itemName = document.getElementById('itemName').value;
        const itemQty = document.getElementById('itemQty').value;
        const unitPrice = document.getElementById('unitPrice').value;

        const item = {
            code: itemCode,
            name: itemName,
            qty: itemQty,
            unitPrice: unitPrice
        };
        if (editIndex >= 0) {
            // Update existing item
            items[editIndex] = item;
            editIndex = -1;
        } else {
            // Add new item
            items.push(item);
        }
        displayitems();
        updateDropdown();

        updateTable();
        itemForm.reset();
    });

    function displayitems() {
        itemTableBody.innerHTML = '';
        items.forEach((item, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.code}</td>
                <td>${item.name}</td>
                <td>${item.qty}</td>
                <td>${item.unitPrice}</td>
            `;
            itemTableBody.appendChild(row);
        });
    }

    function updateTable() {
        itemTableBody.innerHTML = '';

        items.forEach((item, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.code}</td>
                <td>${item.name}</td>
                <td>${item.qty}</td>
                <td>${item.unitPrice}</td>

                <td>
                    <button onclick="editItem(${index})">Edit</button>
                    <button onclick="deleteItem(${index})">Delete</button>
                </td>
            `;
            itemTableBody.appendChild(row);
        });
    }

    window.editItem = function(index) {
        const item = items[index];
        document.getElementById('itemCode').value = item.code;
        document.getElementById('itemName').value = item.name;
        document.getElementById('itemQty').value = item.qty;
        document.getElementById('unitPrice').value = item.unitPrice;

        editIndex = index;

        document.querySelectorAll('tr').forEach(tr => tr.classList.remove('editMode'));
        document.querySelectorAll('tr')[index + 1].classList.add('editMode');
    };

    window.deleteItem = function(index) {
        items.splice(index, 1);
        updateTable();
        itemForm.reset();
        editIndex = -1;
    }; 

    function updateDropdown() {
        // Clear the existing options except the first one
        itemDropdown.innerHTML = '<option value="" disabled selected>Select a Item</option>';
        
        items.forEach((item) => {
            const option = document.createElement('option');
            option.value = item.code;
            option.textContent = `${item.code}`;
            itemDropdown.appendChild(option);
        });
    } 
    itemDropdown.addEventListener('change', function() {
        const selectedId = this.value;
        const selectedItem = items.find(item => item.code === selectedId);

        if (selectedItem) {
            selectedItemCode.value = selectedItem.code;
            selectedItemName.value = selectedItem.name;
            selectedItemQty.value = selectedItem.qty;
            selectedUnitPrice.value = selectedItem.unitPrice;
        }
    });   
});