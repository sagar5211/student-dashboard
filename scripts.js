const students = [
    { id: 12289, first_name: 'Daisy', last_name: 'Scott', email: 'daisy22@gmail.com', phone: '+442146886341', year_group: 'Grade 10', photo: 'https://via.placeholder.com/50' },
    { id: 12288, first_name: 'Isabel', last_name: 'Harris', email: 'isabel887@gmail.com', phone: '+442251886322', year_group: 'Grade 12', photo: 'https://via.placeholder.com/50' },
    { id: 12287, first_name: 'Dan', last_name: 'Thomas', email: 'dan87675@gmail.com', phone: '+442445823555', year_group: 'Grade 12', photo: 'https://via.placeholder.com/50' },
    { id: 12286, first_name: 'Debra', last_name: 'Nelson', email: 'debra1212@gmail.com', phone: '+442342292343', year_group: 'Grade 11', photo: 'https://via.placeholder.com/50' },
    { id: 12285, first_name: 'Vera', last_name: 'Cooper', email: 'vera8888@gmail.com', phone: '+442118925444', year_group: 'Grade 12', photo: 'https://via.placeholder.com/50' },
    { id: 12284, first_name: 'Brian', last_name: 'Miller', email: 'brian5564@gmail.com', phone: '+442423326311', year_group: 'Grade 12', photo: 'https://via.placeholder.com/50' },
    { id: 12283, first_name: 'Lauren', last_name: 'Martin', email: 'lauren7712@gmail.com', phone: '+442898235622', year_group: 'Grade 10', photo: 'https://via.placeholder.com/50' },
    { id: 12282, first_name: 'Milton', last_name: 'Smith', email: 'milton2244@gmail.com', phone: '+442044975177', year_group: 'Grade 12', photo: 'https://via.placeholder.com/50' },
    { id: 12281, first_name: 'Molly', last_name: 'White', email: 'molly4747@gmail.com', phone: '+442041996398', year_group: 'Grade 12', photo: 'https://via.placeholder.com/50' }
];

const studentsPerPage = 5;
let currentPage = 1;

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

displayStudents(currentPage);
