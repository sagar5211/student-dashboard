const studentsPerPage = 5;
let currentPage = 1;
let students = [];

// Function to fetch students from API
async function fetchStudents() {
    try {
        const response = await fetch('http://3.223.98.72:1337/api/students');
        const data = await response.json();
        students = data.data.map(student => ({
            id: student.id,
            first_name: student.attributes.first_name,
            last_name: student.attributes.last_name,
            email: student.attributes.email,
            phone: student.attributes.phone,
            year_group: student.attributes.year_group,
            photo: student.attributes.photo ? student.attributes.photo : 'https://via.placeholder.com/50'
        }));
        displayStudents(currentPage);
    } catch (error) {
        console.error('Error fetching student data:', error);
    }
}

function displayStudents(page) {
    const startIndex = (page - 1) * studentsPerPage;
    const endIndex = page * studentsPerPage;
    const currentStudents = students.slice(startIndex, endIndex);

    const tbody = document.querySelector('#student-table tbody');
    tbody.innerHTML = '';
    currentStudents.forEach(student => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><img src="${student.photo}" alt="${student.first_name}" class="w-10 h-10 rounded-full"></td>
            <td>${student.id}</td>
            <td>${student.first_name}</td>
            <td>${student.last_name}</td>
            <td>${student.email}</td>
            <td>${student.phone}</td>
            <td>${student.year_group}</td>
        `;
        tbody.appendChild(tr);
    });

    displayPagination();
}

function displayPagination() {
    const totalPages = Math.ceil(students.length / studentsPerPage);
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.className = i === currentPage ? 'active' : '';
        button.addEventListener('click', () => {
            currentPage = i;
            displayStudents(currentPage);
        });
        pagination.appendChild(button);
    }
}

document.getElementById('search').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredStudents = students.filter(student => 
        student.first_name.toLowerCase().includes(searchTerm) || 
        student.last_name.toLowerCase().includes(searchTerm)
    );

    currentPage = 1;
    displayStudents(currentPage, filteredStudents);
});

fetchStudents();
