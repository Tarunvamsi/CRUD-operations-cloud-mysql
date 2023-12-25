async function createUser() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;

  try {
    const response = await fetch('/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email }),
    });

    const result = await response.json();
    alert(result.message);
    fetchUsers();
  } catch (error) {
    console.error('Error creating user:', error);
  }
}

async function fetchUsers() {
  try {
    const response = await fetch('/users');
    const users = await response.json();

    const userListElement = document.getElementById('userList');
    userListElement.innerHTML = '<h2>User List</h2>';

    users.forEach(user => {
      const userDiv = document.createElement('div');
      userDiv.innerHTML = `
        <p><strong>${user.name}</strong> - ${user.email} 
          <button onclick="updateUser(${user.id})">Update</button>
          <button onclick="deleteUser(${user.id})">Delete</button>
        </p>`;
      userListElement.appendChild(userDiv);
    });
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

async function updateUser(userId) {
  const newName = prompt('Enter the new name:');
  const newEmail = prompt('Enter the new email:');

  try {
    const response = await fetch(`/update/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newName, email: newEmail }),
    });

    const result = await response.json();
    alert(result.message);
    fetchUsers();
  } catch (error) {
    console.error('Error updating user:', error);
  }
}

async function deleteUser(userId) {
  const confirmation = confirm('Are you sure you want to delete this user?');

  if (confirmation) {
    try {
      const response = await fetch(`/delete/${userId}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      alert(result.message);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }
}

// Fetch initial user list on page load
fetchUsers();
