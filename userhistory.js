if (!localStorage.getItem('UserisLoggedIn')) {
    // If not logged in, redirect to the login page
    alert('Please login first.')
    window.location.href = 'login.html';
  } else {
    // Otherwise, show the logged-in content
    console.log('User is logged in');
  }

  const tableBody = document.getElementById('dataTable').querySelector('tbody');
  let name = document.getElementById('name');
  let price = document.getElementById('price');
  let submit = document.getElementById('submit');
  
  // Function to read array from localStorage and display it in a table
  function loadArrayFromLocalStorage() {

    const storedData = JSON.parse(localStorage.getItem('orders')) || [];
  
  // Check if data exists in localStorage
  if (storedData.length > 0) {
  
      // Create table rows for each user
      let currentUser = JSON.parse(localStorage.getItem('currentUser'));
      let results = storedData.filter(order => order.userName === currentUser.userName);
      results.forEach((order, index) => {
          const newRow = document.createElement('tr');
  
          // Create table cells for each property of the user object
          newRow.innerHTML = `
              <td>${order.order_id}</td>
              <td>${order.productName}</td>
              <td>${order.productPrice}</td>
              <td>${order.quantity_bought}</td>
          `;
  
          // Append the new row to the table body
          tableBody.appendChild(newRow);
      });
  } else {
      // If no data is found in localStorage, show the default message
      alert('NO DATA SAVED YET!');
  }
  }
  
  // SEARCH FUNCTION
submit.addEventListener('click', function () {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    tableBody.innerHTML = '';
    
        let results = orders.filter(order =>
            name.value.toLowerCase() === order.productName.toLowerCase()
        );
      
    results.forEach((order, index) => {
        let content = `
            <div>
                <td>${order.order_id}</td>
                <td>${order.productName}</td>
                <td>${order.productPrice}</td>
                <td>${order.quantity_bought}</td>
                <td>${order.userName}</td>
            </div>
        `;

        tableBody.innerHTML += content;
    }

        
);  

        if((results.length === 0)) {
            tableBody.innerHTML = '<p>No matching properties found.</p>';
        }
});
  
  // Call the function when the page loads
  window.onload = loadArrayFromLocalStorage;

  function logOut(){
    const userConfirmed = confirm(`Do you want to logout?`);
    if (userConfirmed) {
        localStorage.removeItem('UserisLoggedIn');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('AdminisLoggedIn');
        window.location.href = "login.html";}
    else{
        ('Logout cancelled.');
    };
}