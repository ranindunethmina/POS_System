document.addEventListener('DOMContentLoaded', () => {
    const customerForm = document.getElementById('customerForm');
    const customerTableBody = document.getElementById('customerTable').querySelector('tbody');
    const selectedCustomerId = document.getElementById('selectedCustomerId');
    const selectedCustomerName = document.getElementById('selectedCustomerName');
    const selectedCustomerAddress = document.getElementById('selectedCustomerAddress');
    const selectedCustomerSalary = document.getElementById('selectedCustomerSalary');

    let customers = [];
    let editIndex = -1;

    customerForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const customerId = document.getElementById('customerId').value;
        const customerName = document.getElementById('customerName').value;
        const customerAddress = document.getElementById('customerAddress').value;
        const customerSalary = document.getElementById('customerSalary').value;

        const customer = {
            id: customerId,
            name: customerName,
            address: customerAddress,
            salary: customerSalary
        };
        if (editIndex >= 0) {
            // Update existing customer
            customers[editIndex] = customer;
            editIndex = -1;
        } else {
            // Add new customer
            customers.push(customer);
        }
        displayCustomers();
        updateDropdown();

        updateTable();
        customerForm.reset();
    });

    function displayCustomers() {
        customerTableBody.innerHTML = '';
        customers.forEach((customer, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${customer.id}</td>
                <td>${customer.name}</td>
                <td>${customer.address}</td>
                <td>${customer.salary}</td>
            `;
            customerTableBody.appendChild(row);
        });
    }

    function updateTable() {
        customerTableBody.innerHTML = '';

        customers.forEach((customer, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${customer.id}</td>
                <td>${customer.name}</td>
                <td>${customer.address}</td>
                <td>${customer.salary}</td>

                <td>
                    <button onclick="editCustomer(${index})">Edit</button>
                    <button onclick="deleteCustomer(${index})">Delete</button>
                </td>
            `;
            customerTableBody.appendChild(row);
        });
    }

    window.editCustomer = function(index) {
        const customer = customers[index];
        document.getElementById('customerId').value = customer.id;
        document.getElementById('customerName').value = customer.name;
        document.getElementById('customerAddress').value = customer.address;
        document.getElementById('customerSalary').value = customer.salary;

        editIndex = index;

        document.querySelectorAll('tr').forEach(tr => tr.classList.remove('edit-mode'));
        document.querySelectorAll('tr')[index + 1].classList.add('edit-mode');
    };

    window.deleteCustomer = function(index) {
        customers.splice(index, 1);
        updateTable();
        customerForm.reset();
        editIndex = -1;
    };   
    function updateDropdown() {
        // Clear the existing options except the first one
        customerDropdown.innerHTML = '<option value="" disabled selected>Select a customer</option>';
        
        customers.forEach((customer) => {
            const option = document.createElement('option');
            option.value = customer.id;
            option.textContent = `${customer.id}`;
            customerDropdown.appendChild(option);
        });
    } 
    customerDropdown.addEventListener('change', function() {
        const selectedId = this.value;
        const selectedCustomer = customers.find(customer => customer.id === selectedId);

        if (selectedCustomer) {
            selectedCustomerId.value = selectedCustomer.id;
            selectedCustomerName.value = selectedCustomer.name;
            selectedCustomerAddress.value = selectedCustomer.address;
            selectedCustomerSalary.value = selectedCustomer.salary;
        }
    });
});
