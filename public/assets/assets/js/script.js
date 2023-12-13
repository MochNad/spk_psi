function showErrorToast(errorMessage) {
    var toastElement = `
        <div class="bs-toast toast toast-placement-ex m-2 fade bg-danger top-0 start-50 translate-middle-x show" role="alert" aria-live="assertive" aria-atomic="true" data-delay="2000">
            <div class="toast-header">
                <i class="bx bx-bell me-2"></i>
                <div class="me-auto fw-semibold">Gagal</div>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">${errorMessage}</div>
        </div>
    `;

    $('body').append(toastElement);

    setTimeout(function () {
        $('.bs-toast').removeClass('show').addClass('hide');
    }, 5000);
}

function showSuccessToast(successMessage) {
    var toastElement = `
        <div class="bs-toast toast toast-placement-ex m-2 fade bg-success top-0 start-50 translate-middle-x show" role="alert" aria-live="assertive" aria-atomic="true" data-delay="2000">
            <div class="toast-header">
                <i class="bx bx-bell me-2"></i>
                <div class="me-auto fw-semibold">Berhasil</div>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">${successMessage}</div>
        </div>
    `;

    $('body').append(toastElement);

    setTimeout(function () {
        $('.bs-toast').removeClass('show').addClass('hide');
    }, 5000);
}

function togglePassword(inputId) {
    var passwordInput = document.getElementById(inputId);
    var icon = passwordInput.nextElementSibling.querySelector('i');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('bx-hide');
        icon.classList.add('bx-show');
    } else {
        passwordInput.type = 'password';
        icon.classList.remove('bx-show');
        icon.classList.add('bx-hide');
    }
}

function validateInput(input) {
    // Mengganti semua koma dengan titik
    input.value = input.value.replace(/,/g, '.');

    // Menghapus semua karakter selain angka dan titik
    input.value = input.value.replace(/[^\d.]/g, '');

    // Menghapus titik yang berlebihan
    var dotIndex = input.value.indexOf('.');
    if (dotIndex !== -1) {
        input.value = input.value.substring(0, dotIndex + 1) + input.value.substring(dotIndex + 1).replace(/\./g, '');
    }

    // Jika titik (.) ditambahkan di awal, tambahkan angka 0
    if (input.value.indexOf('.') === 0) {
        input.value = '0' + input.value;
    }

    // Jika nilai input adalah 0, tambahkan . di belakang
    if (parseFloat(input.value) === 0 && input.value.indexOf('.') === -1) {
        input.value += '.';
    }

    // Batasi nilai antara 0 dan 100
    var numericValue = parseFloat(input.value);
    if (isNaN(numericValue) || numericValue < 0) {
        input.value = '0.';
    } else if (numericValue > 100) {
        input.value = '100';
    }
}

function setActive(menuId) {
    var menuItem = document.getElementById(menuId);

    var menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach(function (item) {
        item.classList.remove('active');
    });

    menuItem.classList.add('active');

    switch (menuId) {
        case 'dashboard':
            contentDashboard();
            break;
        case 'pengguna':
            contentPengguna();
            break;
        case 'setting':
            contentSetting();
            break;
        case 'input':
            contentInput();
            break;
        case 'output':
            contentOutput();
            break;
        default:
            document.getElementById('content').innerHTML = '';
    }
}

function contentDashboard() {
    var content = `
        <div class="row">
            <div class="col-md-8 col-sm-12 mb-4">
                <div class="card">
                    <h5 class="card-header d-flex justify-content-between" id="tableHeader">
                    Penjelasan metode PSI
                    <div class="spinner-grow spinner-grow-sm text-success" role="status">
                        <span class="visually-hidden"></span>
                    </div>
                    </h5>
                    <div class="card-body">
                        <p>Metode Preference Selection Index (PSI) dikembangkan oleh Maniya dan Bhatt (2010) untuk memecahkan pengambilan keputusan multi-kriteria (MCDM) (Singh et al., 2019).</p>
                        <p>Metode PSI digunakan memecahkan masalah keputusan yang kompleks di bawah ketidakpastian (Madic et al., 2017).</p>
                        <p>Berbeda dengan kebanyakan metode MCDM, metode PSI tidak memerlukan penentuan kepentingan relatif dari kriteria, dan oleh karena itu <strong class="text-danger">tidak perlu menentukan bobot</strong> kriteria (Madic et al., 2017).</p>
                        <p>Metode PSI menentukan bobot kriteria hanya dengan <strong class="text-danger">menggunakan informasi yang disediakan dalam matriks keputusan</strong>, yaitu menggunakan pendekatan objektif untuk menentukan bobot kriteria seperti standar deviasi atau metode entropi.</p>
                    </div>
                </div>
            </div>

            <div class="col-md-4 col-sm-12 mb-4">
                <div class="card">
                    <h5 class="card-header d-flex justify-content-between" id="tableHeader">
                    Tahapan metode PSI
                    <div class="spinner-grow spinner-grow-sm text-success" role="status">
                        <span class="visually-hidden"></span>
                    </div>
                    </h5>
                    <div class="card-body">
                        <ol class="m-0 p-3 pt-0">
                            <li>Identifikasi kriteria yang relevan untuk evaluasi alternatif</li>
                            <li>Membuat matriks keputusan (X)</li>
                            <li>Normalisasi matriks keputusan (̅X)</li>
                            <li>Penentuan nilai rata-rata kinerja yang dinormalisasi (N)</li>
                            <li>Penentuan nilai variasi preferensi (∅𝑗)</li>
                            <li>Penentuan deviasi nilai preferensi (Ω𝑗)</li>
                            <li>Penentuan bobot kriteria (𝑤𝑗)</li>
                            <li>Penentuan nilai PSI (𝜃𝑖)</li>
                            <li>Perangkingan alternatif</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add the content to your target container
    document.getElementById('content').innerHTML = content;
}

function setModal(title, formContent, saveButtonContent) {
    var modalTitle = document.getElementById('modalTitle');
    if (modalTitle) {
        modalTitle.innerText = title;
    }

    var modalContent = document.getElementById('modalContent');
    if (modalContent) {
        modalContent.innerHTML = formContent;
    }

    var modalFooter = document.getElementById('modalFooter');
    if (modalFooter) {
        modalFooter.innerHTML = saveButtonContent;
    }

    $('#modal').modal('show');
}

function addUserForm() {
    var formContent = `
        <form id="form">
            <input type="hidden" name="_token" value="${csrfToken}">
            <div class="row">
                <div class="col mb-3">
                    <label for="username" class="form-label">Username</label>
                    <input type="text" id="username" class="form-control" placeholder="Masukkan Username" autocomplete="username" required>
                </div>
            </div>
            <div class="row g-2">
                <div class="col mb-0">
                    <div class="form-password-toggle">
                        <label for="password" class="form-label">Password</label>
                        <div class="input-group input-group-merge">
                            <input type="password" id="password" class="form-control" placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                                aria-describedby="password" autocomplete="new-password" required>
                            <span class="input-group-text cursor-pointer" onclick="togglePassword('password')"><i class="bx bx-hide"></i></span>
                        </div>
                    </div>
                </div>
                <div class="col mb-0">
                    <div class="form-password-toggle">
                        <label for="repeatPassword" class="form-label">Ulang Password</label>
                        <div class="input-group input-group-merge">
                            <input type="password" id="repeatPassword" class="form-control" placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                                autocomplete="new-password" required>
                            <span class="input-group-text cursor-pointer" onclick="togglePassword('repeatPassword')"><i class="bx bx-hide"></i></span>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    `;

    var saveButtonContent = `
        <button type="button" class="btn btn-sm btn-success" form="form" onclick="addUserCallback()">
            <i class="bx bx-save"></i>
        </button>
    `;

    setModal('Tambah Pengguna', formContent, saveButtonContent);
}

function addUserCallback() {
    var form = document.getElementById('form');

    var username = form.elements['username'].value;
    var password = form.elements['password'].value;
    var repeatPassword = form.elements['repeatPassword'].value;
    var csrfToken = form.elements['_token'].value;

    if (password !== repeatPassword) {
        showErrorToast('Password and Ulang Password harus cocok.');
        return;
    }

    if (!username || !password || !repeatPassword) {
        showErrorToast('Silakan isi semua.');
        return;
    }

    var data = {
        username: username,
        password: password,
        repeatPassword: repeatPassword,
        _token: csrfToken
    };
    fetch(addUser, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Terjadi kesalahan saat menambahkan pengguna');
            }
            return response.json();
        })
        .then(result => {
            contentPengguna();
            console.log('Pengguna berhasil ditambahkan:', result);
            showSuccessToast('Pengguna berhasil ditambahkan');
            form.reset();
            $('#modal').modal('hide');
        })
        .catch(error => {
            console.error('Terjadi kesalahan saat menambahkan pengguna:', error);
            showErrorToast('Terjadi kesalahan saat menambahkan pengguna');
        });
}

function editUserForm(userId) {
    fetch(`${getUser}/${userId}`)
        .then(response => response.json())
        .then(user => {
            var formContent = `
                <form id="form">
                    <input type="hidden" name="_token" value="${csrfToken}">
                    <input type="hidden" name="userId" value="${userId}">
                    <div class="row">
                        <div class="col mb-3">
                            <label for="username" class="form-label">Username</label>
                            <input type="text" id="username" class="form-control" placeholder="Masukkan Username" autocomplete="username" value="${user.username}" required>
                        </div>
                    </div>
                    <div class="row g-2">
                        <div class="col mb-0">
                            <div class="form-password-toggle">
                                <label for="password" class="form-label">Password</label>
                                <div class="input-group input-group-merge">
                                    <input type="password" id="password" class="form-control" placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                                        aria-describedby="password" autocomplete="new-password" required>
                                    <span class="input-group-text cursor-pointer" onclick="togglePassword('password')"><i class="bx bx-hide"></i></span>
                                </div>
                            </div>
                        </div>
                        <div class="col mb-0">
                            <div class="form-password-toggle">
                                <label for="repeatPassword" class="form-label">Ulang Password</label>
                                <div class="input-group input-group-merge">
                                    <input type="password" id="repeatPassword" class="form-control" placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                                        autocomplete="new-password" required>
                                    <span class="input-group-text cursor-pointer" onclick="togglePassword('repeatPassword')"><i class="bx bx-hide"></i></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            `;

            var saveButtonContent = `
                <button type="button" class="btn btn-sm btn-success" onclick="editUserCallback()">
                    <i class="bx bx-save"></i>
                </button>
            `;

            setModal('Edit Pengguna', formContent, saveButtonContent);
        })
        .catch(error => {
            console.error('Error fetching user data for edit:', error);
        });
}

function editUserCallback() {
    var userId = document.getElementsByName('userId')[0].value;
    var csrfToken = document.getElementsByName('_token')[0].value;
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var repeatPassword = document.getElementById('repeatPassword').value;

    if (password !== repeatPassword) {
        showErrorToast('Password and Ulang Password harus cocok.');
        return;
    }

    var data = {
        userId: userId,
        _token: csrfToken,
        username: username,
        password: password,
        repeatPassword: repeatPassword
    };

    fetch(`${updateUser}/${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error updating user');
            }
            return response.json();
        })
        .then(result => {
            contentPengguna();
            console.log('Pengguna berhasil diubah:', result);
            showSuccessToast('Pengguna berhasil diubah');
            form.reset();
            $('#modal').modal('hide');
        })
        .catch(error => {
            console.error('Terjadi kesalahan saat mengubah pengguna:', error);
            showErrorToast('Terjadi kesalahan saat mengubah pengguna');
        });
}

function deleteUserForm(userId) {
    fetch(`${getUser}/${userId}`)
        .then(response => response.json())
        .then(user => {
            var formContent = `
                <form id="form">
                    <input type="hidden" name="_token" value="${csrfToken}">
                    <input type="hidden" name="userId" value="${userId}">
                    <p>Anda yakin ingin menghapus pengguna <strong class="text-danger">${user.username}</strong>?</p>
                </form>
            `;

            var deleteButtonContent = `
                <button type="button" class="btn btn-sm btn-danger" onclick="deleteUserCallback(${userId})">
                    <i class="bx bx-trash"></i>
                </button>
            `;

            setModal('Hapus Pengguna', formContent, deleteButtonContent);
        })
        .catch(error => {
            console.error('Error fetching user data for delete:', error);
        });
}

function deleteUserCallback(userId) {
    var csrfToken = document.getElementsByName('_token')[0].value;

    var data = {
        userId: userId,
        _token: csrfToken
    };

    fetch(`${deleteUser}/${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error deleting user');
            }
            return response.json();
        })
        .then(result => {
            contentPengguna();
            console.log('Pengguna berhasil dihapus:', result);
            showSuccessToast('Pengguna berhasil dihapus');
            $('#modal').modal('hide');
        })
        .catch(error => {
            console.error('Terjadi kesalahan saat menghapus pengguna:', error);
            showErrorToast('Terjadi kesalahan saat menghapus pengguna');
        });
}

function contentPengguna() {
    fetch(getUsers)
        .then(response => response.json())
        .then(data => {
            var tableBody = '';

            if (data.length > 0) {
                data.forEach(user => {
                    tableBody += `
                    <tr>
                        <td><i class="fab fa-angular fa-lg text-danger me-3"></i> <strong>${user.username}</strong></td>
                        <td>
                            <div class="dropdown">
                                <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                    <i class="bx bx-dots-vertical-rounded"></i>
                                </button>
                                <div class="dropdown-menu">
                                    <a class="dropdown-item" onclick="editUserForm(${user.id})">
                                        <i class="bx bx-edit-alt me-1"></i> Edit
                                    </a>
                                    <a class="dropdown-item" onclick="deleteUserForm(${user.id})">
                                        <i class="bx bx-trash me-1"></i> Delete
                                    </a>
                                </div>
                            </div>
                        </td>
                    </tr>
                    `;
                });
            } else {
                tableBody = `
                    <tr>
                        <td colspan="2" class="text-center">Kosong</td>
                    </tr>
                `;
            }

            var content = `
            <div class="card">
                <h5 class="card-header d-flex justify-content-between" id="tableHeader">
                    Pengguna
                    <button type="button" class="btn btn-sm btn-success" onclick="addUserForm()">
                        <i class="bx bx-plus"></i>
                    </button>
                </h5>
                <div class="table-responsive text-nowrap">
                    <table class="table table-sm">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody class="table-border-bottom-0">
                            ${tableBody}
                        </tbody>
                    </table>
                </div>
            </div>
            `;

            document.getElementById('content').innerHTML = content;
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
}

function setTableSetting(data, title) {
    // Pisahkan columns dan data dari objek data
    var columns = Object.keys(data[0] || {}); // Ambil nama kolom dari elemen pertama
    var tableData = data || [];

    // Filter kolom "id" agar tidak ditampilkan
    columns = columns.filter(col => col !== 'id');

    var tableHTML = `
        <h5 class="d-flex justify-content-end">
            <button type="button" class="btn btn-sm btn-success" onclick="addSettingForm('${title}')">
                <i class="bx bx-plus"></i>
            </button>
        </h5>
        <div class="table-responsive text-nowrap">
            <table class="table table-sm">
                <thead>
                    <tr>
                        ${columns.map(col => `<th>${col}</th>`).join('')}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody class="table-border-bottom-0">
                    ${tableData.length > 0
            ? tableData
                .map(
                    row => `<tr>${columns
                        .map((col, index) =>
                            index === 0
                                ? `<td><i class="fab fa-angular fa-lg text-danger me-3"></i><strong>${row[col]}</strong></td>`
                                : `<td>${row[col]}</td>`
                        )
                        .join('')}<td><div class="dropdown"><button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="bx bx-dots-vertical-rounded"></i></button><div class="dropdown-menu"><a class="dropdown-item" onclick="editSettingForm('${title}',${row.id})"><i class="bx bx-edit-alt me-1"></i> Edit</a><a class="dropdown-item" onclick="deleteSettingForm('${title}',${row.id})"><i class="bx bx-trash me-1"></i> Delete</a></div></div></td></tr>`
                )
                .join('')
            : `<tr><td colspan="${columns.length + 1}" class="text-center">${title} Kosong</td></tr>`
        }
                </tbody>
            </table>
        </div>
    `;
    return tableHTML;
}

function setAccordionSetting() {
    var accordionHTML = '<div class="accordion" id="accordion">';

    // Accordion Kriteria (terbuka)
    accordionHTML += `
        <div class="card accordion-item">
            <h2 class="accordion-header" id="headingCriterias">
                <button type="button" class="accordion-button show" data-bs-toggle="collapse" data-bs-target="#accordionCriterias" aria-expanded="true" aria-controls="accordionCriterias">
                    Kriteria
                </button>
            </h2>
            <div id="accordionCriterias" class="accordion-collapse collapse show" aria-labelledby="headingCriterias" data-bs-parent="#accordion">
                <div class="accordion-body" id="bodyCriterias">
                    
                </div>
            </div>
        </div>
    `;

    accordionHTML += `
        <div class="card accordion-item">
            <h2 class="accordion-header" id="headingAlternatives">
                <button type="button" class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#accordionAlternatives" aria-expanded="false" aria-controls="accordionAlternatives">
                    Alternatif
                </button>
            </h2>
            <div id="accordionAlternatives" class="accordion-collapse collapse" aria-labelledby="headingAlternatives" data-bs-parent="#accordion">
                <div class="accordion-body" id="bodyAlternatives">
                    
                </div>
            </div>
        </div>
    `;

    accordionHTML += '</div>';

    document.getElementById('content').innerHTML = accordionHTML;
}

function addSettingForm(title) {
    var formContent = '';

    switch (title) {
        case 'Kriteria':
            formContent = `
                <form id="form">
                    <input type="hidden" name="_token" value="${csrfToken}">
                    <div class="row mb-3">
                        <div class="col">
                            <label for="name" class="form-label">Nama Kriteria</label>
                            <input type="text" id="name" class="form-control" placeholder="Masukkan Nama Kriteria" required>
                        </div>
                        <div class="col">
                            <label class="form-label">Type</label>
                            <div class="form-check">
                                <label class="form-check-label" for="benefit">Benefit</label>
                                <input class="form-check-input" type="radio" name="label" id="benefit" value="Benefit" checked required>
                            </div>
                            <div class="form-check">
                                <label class="form-check-label" for="cost">Cost</label>
                                <input class="form-check-input" type="radio" name="label" id="cost" value="Cost">
                            </div>
                        </div>
                    </div>
                </form>
            `;
            break;

        case 'Alternatif':
            formContent = `
                <form id="form">
                    <input type="hidden" name="_token" value="${csrfToken}">
                    <div class="row mb-3">
                        <div class="col">
                            <label for="name" class="form-label">Nama Alternatif</label>
                            <input type="text" id="name" class="form-control" placeholder="Masukkan Nama Alternatif" required>
                        </div>
                    </div>
                </form>
            `;
            break;

        default:
            // Menampilkan pesan default jika title tidak sesuai dengan yang diharapkan
            formContent = '<p class="text-danger">Form tidak tersedia untuk judul ini.</p>';
            break;
    }

    var saveButtonContent = `
        <button type="button" class="btn btn-sm btn-success" form="form" onclick="addSettingCallback('${title}')">
            <i class="bx bx-save"></i>
        </button>
    `;

    setModal('Tambah ' + title, formContent, saveButtonContent);
}

function addSettingCallback(title) {
    var form = document.getElementById('form');

    var name = form.elements['name'].value;
    var csrfToken = form.elements['_token'].value;

    if (!name) {
        showErrorToast('Silakan isi nama.');
        return;
    }

    var data = { name: name, _token: csrfToken };

    // Include the radio button value in the data
    var typeRadio = form.querySelector('input[name="label"]:checked');
    if (typeRadio) {
        data.type = typeRadio.value;
    }

    var url = '';

    switch (title) {
        case 'Kriteria':
            url = addCriteria; // Ganti dengan URL yang sesuai untuk menambahkan kriteria
            break;

        case 'Alternatif':
            url = addAlternative; // Ganti dengan URL yang sesuai untuk menambahkan alternatif
            break;

        default:
            showErrorToast('Operasi tidak didukung untuk judul ini.');
            return;
    }

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Terjadi kesalahan saat menambahkan data');
            }
            return response.json();
        })
        .then(result => {
            if (title === 'Kriteria') {
                setCriterias();
            } else if (title === 'Alternatif') {
                setAlternatives();
            }

            console.log(title + ' berhasil ditambahkan:', result);
            showSuccessToast('Data berhasil ditambahkan');
            form.reset();
            $('#modal').modal('hide');
        })
        .catch(error => {
            console.error('Terjadi kesalahan saat menambahkan data:', error);
            showErrorToast('Terjadi kesalahan saat menambahkan data');
        });
}

// Fungsi untuk menampilkan formulir pengeditan
function editSettingForm(title, id) {
    // Determine the appropriate endpoint based on the title
    var getDataEndpoint = title === 'Kriteria' ? getCriteria : getAlternative;

    // Fetch data based on the id
    fetch(`${getDataEndpoint}/${id}`)
        .then(response => response.json())
        .then(data => {
            // Create the edit form with the retrieved data
            var formContent = `
                <form id="form">
                    <input type="hidden" name="_token" value="${csrfToken}">
                    <input type="hidden" name="id" value="${id}">
                    <div class="row mb-3">
                        <div class="col">
                            <label for="name" class="form-label">Nama</label>
                            <input type="text" id="name" class="form-control" placeholder="Masukkan Nama" value="${data.name}" required>
                        </div>
                        ${title === 'Kriteria' ? `
                            <div class="col">
                                <label class="form-label">Type</label>
                                <div class="form-check">
                                    <label class="form-check-label" for="benefit">Benefit</label>
                                    <input class="form-check-input" type="radio" name="type" id="benefit" value="Benefit" ${data.type === 'Benefit' ? 'checked' : ''} required>
                                </div>
                                <div class="form-check">
                                    <label class="form-check-label" for="cost">Cost</label>
                                    <input class="form-check-input" type="radio" name="type" id="cost" value="Cost" ${data.type === 'Cost' ? 'checked' : ''}>
                                </div>
                            </div>
                        ` : ''}
                    </div>
                </form>
            `;

            var saveButtonContent = `
                <button type="button" class="btn btn-sm btn-success" form="form" onclick="editSettingCallback('${title}')">
                    <i class="bx bx-save"></i>
                </button>
            `;

            // Set the edit form to the modal
            setModal('Edit ' + title, formContent, saveButtonContent);
        })
        .catch(error => {
            console.error('Error fetching data for editing:', error);
            showErrorToast('Terjadi kesalahan saat mengambil data untuk pengeditan');
        });
}
// Fungsi callback untuk mengirim data pengeditan
function editSettingCallback(title) {
    var form = document.getElementById('form');

    var id = form.elements['id'].value;
    var name = form.elements['name'].value;
    var csrfToken = form.elements['_token'].value;

    if (!name) {
        showErrorToast('Silakan isi nama.');
        return;
    }

    var data = { id: id, name: name, _token: csrfToken };

    // Include the radio button value in the data
    var typeRadio = form.querySelector('input[name="type"]:checked');
    if (typeRadio) {
        data.type = typeRadio.value;
    }

    // Determine the appropriate endpoint based on the title
    var editDataEndpoint = title === 'Kriteria' ? updateCriteria : updateAlternative;

    // Send edit data to the server
    fetch(`${editDataEndpoint}/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Terjadi kesalahan saat mengedit data');
            }
            return response.json();
        })
        .then(result => {
            // Call the appropriate function to display the edited result
            if (title === 'Kriteria') {
                setCriterias();
            } else if (title === 'Alternatif') {
                setAlternatives();
            }

            console.log('Data berhasil diedit:', result);
            showSuccessToast('Data berhasil diedit');
            $('#modal').modal('hide');
        })
        .catch(error => {
            console.error('Terjadi kesalahan saat mengedit data:', error);
            showErrorToast('Terjadi kesalahan saat mengedit data');
        });
}

function deleteSettingForm(title, id) {
    var getDataEndpoint = title === 'Kriteria' ? getCriteria : getAlternative;

    fetch(`${getDataEndpoint}/${id}`)
        .then(response => response.json())
        .then(data => {
            var formContent = `
                <form id="form">
                    <input type="hidden" name="_token" value="${csrfToken}">
                    <input type="hidden" name="id" value="${id}">
                    <p>Anda yakin ingin menghapus ${title} <strong class="text-danger">${data.name}</strong>?</p>
                </form>
            `;

            var deleteButtonContent = `
                <button type="button" class="btn btn-sm btn-danger" onclick="deleteSettingCallback('${title}')">
                    <i class="bx bx-trash"></i>
                </button>
            `;

            setModal('Hapus ' + title, formContent, deleteButtonContent);
        })
        .catch(error => {
            console.error('Error fetching user data for delete:', error);
        });
}

function deleteSettingCallback(title) {
    var form = document.getElementById('form');

    var id = form.elements['id'].value;
    var csrfToken = form.elements['_token'].value;

    var data = { id: id, _token: csrfToken };

    var deleteDataEndpoint = title === 'Kriteria' ? deleteCriteria : deleteAlternative;

    fetch(`${deleteDataEndpoint}/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Terjadi kesalahan saat menghapus data');
            }
            return response.json();
        })
        .then(result => {
            if (title === 'Kriteria') {
                setCriterias();
            } else if (title === 'Alternatif') {
                setAlternatives();
            }

            console.log('Data berhasil dihapus:', result);
            showSuccessToast('Data berhasil dihapus');
            $('#modal').modal('hide');
        })
        .catch(error => {
            console.error('Terjadi kesalahan saat menghapus data:', error);
            showErrorToast('Terjadi kesalahan saat menghapus data');
        });
}

function setCriterias() {
    fetch(getCriterias)
        .then(response => response.json())
        .then(data => {
            document.getElementById('bodyCriterias').innerHTML = setTableSetting(data, 'Kriteria');
        })
        .catch(error => {
            console.error('Error fetching criteria data:', error);
        });
}

function setAlternatives() {
    fetch(getAlternatives)
        .then(response => response.json())
        .then(data => {
            document.getElementById('bodyAlternatives').innerHTML = setTableSetting(data, 'Alternatif');
        })
        .catch(error => {
            console.error('Error fetching criteria data:', error);
        });
}

function contentSetting() {
    setAccordionSetting();
    setCriterias();
    setAlternatives();
}

function contentInput() {
    fetch(getInputs)
        .then(response => response.json())
        .then(data => {
            var tableBody = '';

            if (!data.alternative_ids || data.alternative_ids.length === 0 || !data.criteria_ids || data.criteria_ids.length === 0 || !data.values) {
                tableBody = `
                    <tr>
                        <td colspan="${data.criteria_ids.length + 1}" class="text-center">Kosong</td>
                    </tr>`;
            } else {
                tableBody = data.alternative_ids.map(alternativeId => {
                    return `
                        <tr>
                            <td>
                                <i class="fab fa-angular fa-lg text-danger me-3"></i>
                                <strong>${data.values[2]?.find(entry => entry.alternative_id === alternativeId)?.alternative_name || `Name${alternativeId}`}</strong>
                            </td>
                            ${data.criteria_ids.map(criteriaId => {
                        const criteriaValues = data.values[criteriaId];
                        const cellData = criteriaValues && criteriaValues.find(entry => entry.alternative_id === alternativeId);
                        const cellValue = cellData ? cellData.value : '';
                        return `
                                    <td>
                                        <input class="form-control" type="text" id="Input_${criteriaId}_${alternativeId}" 
                                        onchange="inputChange('Input_${criteriaId}_${alternativeId}', this.value)" 
                                        required oninput="validateInput(this)"
                                        value="${cellValue || ''}" />
                                    </td>
                                `;
                    }).join('')}
                        </tr>`;
                }).join('');
            }

            var content = `
            <div class="card">
                <h5 class="card-header d-flex justify-content-between" id="tableHeader">
                    Input
                    <div class="d-flex">
                        <button type="button" class="btn btn-sm btn-success mx-2" onclick="saveInputData()">
                            <i class="bx bx-save"></i>
                        </button>
                    </div>
                </h5>
                <form>
                    <input id="tokenInput" type="hidden" name="_token" value="${csrfToken}">
                    <div class="table-responsive text-nowrap">
                        <table class="table table-sm">
                            <thead>
                                <tr>
                                    <th></th>
                                    ${data.criteria_ids.map(criteriaId => {
                const criteriaValues = data.values[criteriaId];
                const criteriaName = criteriaValues && criteriaValues.length > 0
                    ? criteriaValues[0].criteria_name
                    : `Name${criteriaId}`;
                return `<th>${criteriaName}</th>`;
            }).join('')}
                                </tr>
                            </thead>
                            <tbody class="table-border-bottom-0">
                                ${tableBody}
                            </tbody>
                        </table>
                    </div>
                </form>
            </div>
            `;

            document.getElementById('content').innerHTML = content;
        })
        .catch(error => {
            console.error('Error fetching input data:', error);
        });
}

// Example onchange function
function inputChange(cellId, value) {
    const match = cellId.match(/Input_(\d+)_(\d+)/);

    if (match) {
        const criteriaId = match[1];
        const alternativeId = match[2];

        // Find the index of the existing entry in inputValues array
        const entryIndex = inputValues.findIndex(
            entry => entry.criteriaId === criteriaId && entry.alternativeId === alternativeId
        );

        if (entryIndex !== -1) {
            // Update the existing entry in inputValues array
            inputValues[entryIndex].value = value;
        } else {
            // Push a new entry to inputValues array
            inputValues.push({ criteriaId, alternativeId, value });
        }
    }
}

// Example function for saving input data
function saveInputData() {
    var tokenInput = document.getElementById('tokenInput');
    var csrfToken = tokenInput.value; // Assuming your hidden input field has the CSRF token

    // Check if any value in inputValues is "0."
    if (inputValues.some(item => item.value === "0.")) {
        showErrorToast('Jangan input 0 saja');
        return; // Stop execution if there is a "0." value
    }


    var data = { inputs: inputValues, _token: csrfToken };

    // Make a POST request to the server to save input data
    fetch(saveInputs, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(responseData => {
            inputValues = []; // Clear the array on success
            contentInput();
            console.log('Server response:', responseData);

            // Check for success message
            if (responseData.message) {
                showSuccessToast(responseData.message);
            } else if (responseData.error) {
                showErrorToast(responseData.error);
            } else {
                showErrorToast('Unknown error occurred.');
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            showErrorToast(error.message);
        });
}

function setAccordionSetting() {
    var accordionHTML = '<div class="accordion" id="accordion">';

    // Accordion Kriteria (terbuka)
    accordionHTML += `
        <div class="card accordion-item">
            <h2 class="accordion-header" id="headingCriterias">
                <button type="button" class="accordion-button show" data-bs-toggle="collapse" data-bs-target="#accordionCriterias" aria-expanded="true" aria-controls="accordionCriterias">
                    Kriteria
                </button>
            </h2>
            <div id="accordionCriterias" class="accordion-collapse collapse show" aria-labelledby="headingCriterias" data-bs-parent="#accordion">
                <div class="accordion-body" id="bodyCriterias">
                    
                </div>
            </div>
        </div>
    `;

    accordionHTML += `
        <div class="card accordion-item">
            <h2 class="accordion-header" id="headingAlternatives">
                <button type="button" class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#accordionAlternatives" aria-expanded="false" aria-controls="accordionAlternatives">
                    Alternatif
                </button>
            </h2>
            <div id="accordionAlternatives" class="accordion-collapse collapse" aria-labelledby="headingAlternatives" data-bs-parent="#accordion">
                <div class="accordion-body" id="bodyAlternatives">
                    
                </div>
            </div>
        </div>
    `;

    accordionHTML += '</div>';

    document.getElementById('content').innerHTML = accordionHTML;
}

function setAccordionOutput() {
    var accordionHTML = '<div class="accordion" id="accordionOutput">';

    // Accordion Matriks Keputusan
    accordionHTML += `
        <div class="card accordion-item">
            <h2 class="accordion-header" id="headingDecisionMatrix">
                <button type="button" class="accordion-button show" data-bs-toggle="collapse" data-bs-target="#accordionDecisionMatrix" aria-expanded="true" aria-controls="accordionDecisionMatrix">
                Membuat matriks keputusan (X)
                </button>
            </h2>
            <div id="accordionDecisionMatrix" class="accordion-collapse collapse show" aria-labelledby="headingDecisionMatrix" data-bs-parent="#accordionOutput">
                <div class="accordion-body" id="bodyDecisionMatrix">

                </div>
            </div>
        </div>
    `;

    // Accordion Normalisasi Matriks
    accordionHTML += `
        <div class="card accordion-item">
            <h2 class="accordion-header" id="headingNormalizationMatrix">
                <button type="button" class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#accordionNormalizationMatrix" aria-expanded="false" aria-controls="accordionNormalizationMatrix">
                Normalisasi matriks keputusan (̅X)
                </button>
            </h2>
            <div id="accordionNormalizationMatrix" class="accordion-collapse collapse" aria-labelledby="headingNormalizationMatrix" data-bs-parent="#accordionOutput">
                <div class="accordion-body" id="bodyNormalizationMatrix">

                </div>
            </div>
        </div>
    `;

    // Accordion Rata-rata Kinerja yang Dinormalisasi
    accordionHTML += `
        <div class="card accordion-item">
            <h2 class="accordion-header" id="headingNormalizedPerformanceAverage">
                <button type="button" class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#accordionNormalizedPerformanceAverage" aria-expanded="false" aria-controls="accordionNormalizedPerformanceAverage">
                Penentuan nilai rata-rata kinerja yang dinormalisasi (N)
                </button>
            </h2>
            <div id="accordionNormalizedPerformanceAverage" class="accordion-collapse collapse" aria-labelledby="headingNormalizedPerformanceAverage" data-bs-parent="#accordionOutput">
                <div class="accordion-body" id="bodyNormalizedPerformanceAverage">

                </div>
            </div>
        </div>
    `;

    // Accordion Variasi Preferensi
    accordionHTML += `
        <div class="card accordion-item">
            <h2 class="accordion-header" id="headingPreferenceVariation">
                <button type="button" class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#accordionPreferenceVariation" aria-expanded="false" aria-controls="accordionPreferenceVariation">
                Penentuan nilai variasi preferensi (∅𝑗)
                </button>
            </h2>
            <div id="accordionPreferenceVariation" class="accordion-collapse collapse" aria-labelledby="headingPreferenceVariation" data-bs-parent="#accordionOutput">
                <div class="accordion-body" id="bodyPreferenceVariation">

                </div>
            </div>
        </div>
    `;

    // Accordion Deviasi Nilai Preferensi
    accordionHTML += `
        <div class="card accordion-item">
            <h2 class="accordion-header" id="headingPreferenceDeviation">
                <button type="button" class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#accordionPreferenceDeviation" aria-expanded="false" aria-controls="accordionPreferenceDeviation">
                Penentuan deviasi nilai preferensi (Ω𝑗)
                </button>
            </h2>
            <div id="accordionPreferenceDeviation" class="accordion-collapse collapse" aria-labelledby="headingPreferenceDeviation" data-bs-parent="#accordionOutput">
                <div class="accordion-body" id="bodyPreferenceDeviation">

                </div>
            </div>
        </div>
    `;

    // Accordion Bobot Kriteria
    accordionHTML += `
        <div class="card accordion-item">
            <h2 class="accordion-header" id="headingCriteriaWeights">
                <button type="button" class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#accordionCriteriaWeights" aria-expanded="false" aria-controls="accordionCriteriaWeights">
                Penentuan bobot kriteria (𝑤𝑗)
                </button>
            </h2>
            <div id="accordionCriteriaWeights" class="accordion-collapse collapse" aria-labelledby="headingCriteriaWeights" data-bs-parent="#accordionOutput">
                <div class="accordion-body" id="bodyCriteriaWeights">

                </div>
            </div>
        </div>
    `;

    // Accordion Nilai PSI
    accordionHTML += `
        <div class="card accordion-item">
            <h2 class="accordion-header" id="headingPSIValue">
                <button type="button" class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#accordionPSIValue" aria-expanded="false" aria-controls="accordionPSIValue">
                Penentuan nilai PSI (𝜃𝑖)
                </button>
            </h2>
            <div id="accordionPSIValue" class="accordion-collapse collapse" aria-labelledby="headingPSIValue" data-bs-parent="#accordionOutput">
                <div class="accordion-body" id="bodyPSIValue">

                </div>
            </div>
        </div>
    `;

    accordionHTML += `
        <div class="card accordion-item">
            <h2 class="accordion-header" id="headingPSIRank">
                <button type="button" class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#accordionPSIRank" aria-expanded="false" aria-controls="accordionPSIRank">
                Perangkingan alternatif
                </button>
            </h2>
            <div id="accordionPSIRank" class="accordion-collapse collapse" aria-labelledby="headingPSIRank" data-bs-parent="#accordionOutput">
                <div class="accordion-body" id="bodyPSIRank">

                </div>
            </div>
        </div>
    `;

    accordionHTML += '</div>';

    document.getElementById('content').innerHTML = accordionHTML;
}

function setMatrixs() {
    // Ganti 'getMatrixs' dengan URL yang sesuai
    fetch(getMatrixs)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            matriksKeputusan = data.map(item => ({
                criteria_id: item.criteria_id,
                criteria_name: item.criteria_name,
                type: item.criteria_type,
                alternative_id: item.alternative_id,
                alternative_name: item.alternative_name,
                value: item.value
            }));
            calculateNormalization(matriksKeputusan);
            calculateAverage(matriksNormalisasi);
            calculatePreference(matriksNormalisasi, matriksRataRata);
            calculateDeviation(matriksPreferensi);
            calculateWeight(matriksDeviasi);
            calculatePSI(matriksNormalisasi, matriksBobot);
            setTableKeputusan(data, 'bodyDecisionMatrix');
            setTableNormalisasi(matriksNormalisasi, matriksRataRata, 'bodyNormalizationMatrix');
            setTableRataRata(matriksRataRata, 'bodyNormalizedPerformanceAverage');
            setTablePreferensi(matriksPreferensi, 'bodyPreferenceVariation');
            setTableDeviasi(matriksDeviasi, 'bodyPreferenceDeviation');
            setTableBobot(matriksBobot, 'bodyCriteriaWeights');
            setTablePSI(matriksPSI, 'bodyPSIValue');
            setTableRankPSI(matriksPSI, 'bodyPSIRank');
        })
        .catch(error => {
            console.error('Error fetching matrix data:', error);
        });
}

function setTableKeputusan(data, targetId) {
    var tableBody = '';

    if (!data || data.length === 0) {
        console.warn('Invalid data structure:', data);
        tableBody = `
            <tr>
                <td colspan="3" class="text-center">Kosong</td>
            </tr>`;
    } else {
        // Group the data by alternative_name
        var groupedData = {};
        data.forEach(item => {
            if (!groupedData[item.alternative_name]) {
                groupedData[item.alternative_name] = {};
            }
            groupedData[item.alternative_name][item.criteria_name] = parseFloat(item.value);
        });

        // Get unique criteria names for the table header
        var uniqueCriteriaNames = Array.from(new Set(data.map(item => item.criteria_name)));

        // Render table body
        tableBody = Object.keys(groupedData).map((altName, index) => {
            return `
                <tr>
                    <td>${index === 0 ? `<i class="fab fa-angular fa-lg text-danger me-3"></i><strong>${altName}</strong>` : `<i class="fab fa-angular fa-lg text-danger me-3"></i><strong>${altName}</strong>`}</td>
                    ${uniqueCriteriaNames.map(criteriaName => {
                // Check if the value exists before accessing it
                const value = groupedData[altName] && groupedData[altName][criteriaName];
                const formattedValue = value !== undefined
                    ? (Number.isInteger(value) ? value.toString() : parseFloat(value).toString())
                    : ''; // Set empty string if value is undefined
                return `<td>${formattedValue}</td>`;
            }).join('')}
                </tr>`;
        }).join('');
    }

    var tableHTML = `
        <form>
            <input id="tokenInput" type="hidden" name="_token" value="${csrfToken}">
            <div class="table-responsive text-nowrap">
                <table class="table table-sm">
                    ${(!data || data.length === 0) ? '' :
            `<thead>
                            <tr>
                                <th></th>
                                ${uniqueCriteriaNames.map(criteriaName => `<th>${criteriaName}</th>`).join('')}
                            </tr>
                        </thead>`
        }
                    <tbody class="table-border-bottom-0">
                        ${tableBody}
                    </tbody>
                </table>
            </div>
        </form>
    `;

    // Display the table in the element with the specified ID
    document.getElementById(targetId).innerHTML = tableHTML;
}

function setTableNormalisasi(data, add, targetId) {
    var tableBody = '';

    if (!data || data.length === 0) {
        console.warn('Invalid data structure:', data);
        tableBody = `
            <tr>
                <td colspan="3" class="text-center">Kosong</td>
            </tr>`;
    } else {
        // Group the data by alternative_id
        var groupedData = {};
        data.forEach(item => {
            if (!groupedData[item.alternative_id]) {
                groupedData[item.alternative_id] = {};
            }
            groupedData[item.alternative_id][item.criteria_id] = parseFloat(item.normalized_value);
        });

        // Get unique criteria names and alternative names for the table header
        var uniqueCriteriaIds = Array.from(new Set(data.map(item => item.criteria_id)));
        var uniqueCriteriaNames = Array.from(new Set(data.map(item => item.criteria_name)));
        var uniqueAlternativeIds = Array.from(new Set(data.map(item => item.alternative_id)));
        var uniqueAlternativeNames = Array.from(new Set(data.map(item => item.alternative_name)));

        // Render table body
        tableBody = uniqueAlternativeIds.map((altId, index) => {
            const alternativeName = uniqueAlternativeNames[index];
            return `
                <tr>
                    <td>${index === 0 ? `<i class="fab fa-angular fa-lg text-danger me-3"></i><strong>${alternativeName}</strong>` : `<i class="fab fa-angular fa-lg text-danger me-3"></i><strong>${alternativeName}</strong>`}</td>
                    ${uniqueCriteriaIds.map(criteriaId => {
                // Check if the value exists before accessing it
                const value = groupedData[altId] && groupedData[altId][criteriaId];
                const formattedValue = value !== undefined
                    ? (Number.isInteger(value) ? value.toString() : parseFloat(value).toString())
                    : ''; // Set empty string if value is undefined
                return `<td>${formattedValue}</td>`;
            }).join('')}
                </tr>`;
        }).join('');

        // Render SUM row
        tableBody += `
        <tr class="text-success">
            <td><i class="fab fa-angular fa-lg text-danger me-3"></i><strong>Total</strong></td>
            ${uniqueCriteriaIds.map(criteriaId => {
            // Find the corresponding entry in the 'add' array
            const addEntry = add.find(entry => entry.criteria_id === criteriaId.toString()); // Ensure criteria_id is a string
            // Display formatted total_normalized_value from 'add' array
            const totalNormalizedValue = addEntry ? (
                addEntry.total_normalized_value !== undefined
                    ? (Number.isInteger(addEntry.total_normalized_value)
                        ? addEntry.total_normalized_value.toString()
                        : parseFloat(addEntry.total_normalized_value).toFixed(4).replace(/\.?0+$/, ''))
                    : ''
            ) : '';
            return `<td>${totalNormalizedValue}</td>`;
        }).join('')}            
        </tr>`;
    }

    var tableHTML = `
    <form>
        <input id="tokenInput" type="hidden" name="_token" value="${csrfToken}">
        <div class="table-responsive text-nowrap">
            <table class="table table-sm">
                ${(!data || data.length === 0) ? '' :
            `<thead>
                        <tr>
                            <th></th>
                            ${uniqueCriteriaNames.map(criteriaName => `<th>${criteriaName}</th>`).join('')}
                        </tr>
                    </thead>`
        }
                <tbody class="table-border-bottom-0">
                    ${tableBody}
                </tbody>
            </table>
        </div>
    </form>
    `;

    // Display the table in the element with the specified ID
    document.getElementById(targetId).innerHTML = tableHTML;
}

function setTableRataRata(data, targetId) {
    var tableBody = '';

    if (!data || data.length === 0 || !data[0].count_alternative) {
        console.warn('Invalid data structure:', data);
        tableBody = `
            <tr>
                <td colspan="3" class="text-center">Kosong</td>
            </tr>`;
    } else {
        const countAlternative = data[0].count_alternative;

        // Render rows for each alternative
        for (let i = 1; i <= countAlternative; i++) {
            const criteriaInfo = data.find(item => item.criteria_id === i.toString());

            // Skip rows without criteria_id
            if (!criteriaInfo || !criteriaInfo.criteria_id) {
                continue;
            }

            const criteriaName = criteriaInfo.criteria_name || `Criteria ${i}`;
            const totalNormalizedValue = criteriaInfo.total_normalized_value !== undefined
                ? (Number.isInteger(criteriaInfo.total_normalized_value)
                    ? criteriaInfo.total_normalized_value.toString()
                    : parseFloat(criteriaInfo.total_normalized_value).toFixed(4).replace(/\.?0+$/, ''))
                : '';

            const average = criteriaInfo.average !== undefined
                ? (Number.isInteger(criteriaInfo.average)
                    ? criteriaInfo.average.toString()
                    : parseFloat(criteriaInfo.average).toFixed(4).replace(/\.?0+$/, ''))
                : '';

            tableBody += `
                <tr>
                    <td><i class="fab fa-angular fa-lg text-danger me-3"></i><strong>${criteriaName}</strong></td>
                    <td>=</td>
                    <td>( ${i} / ${countAlternative} ) * ${totalNormalizedValue}</td>
                    <td>=</td>
                    <td>${average}</td>
                </tr>`;
        }
    }

    var tableHTML = `
    <form>
        <input id="tokenInput" type="hidden" name="_token" value="${csrfToken}">
        <div class="table-responsive text-nowrap">
            <table class="table table-sm">
                <tbody class="table-border-bottom-0">
                    ${tableBody}
                </tbody>
            </table>
        </div>
    </form>
    `;

    // Display the table in the element with the specified ID
    document.getElementById(targetId).innerHTML = tableHTML;
}

function setTablePreferensi(data, targetId) {
    var tableBody = '';
    var uniqueCriteriaIds; // Define uniqueCriteriaIds in the outer scope

    if (!data || data.length === 0) {
        console.warn('Invalid data structure:', data);
        tableBody = `
            <tr>
                <td colspan="3" class="text-center">Kosong</td>
            </tr>`;
    } else {
        // Group the data by alternative_id
        var groupedData = {};
        data.forEach(item => {
            if (!groupedData[item.alternative_id]) {
                groupedData[item.alternative_id] = {};
            }
            groupedData[item.alternative_id][item.criteria_id] = parseFloat(item.preference);
        });

        // Get unique alternative names for the table header
        var uniqueAlternativeIds = Array.from(new Set(data.map(item => item.alternative_id)));
        var uniqueAlternativeNames = Array.from(new Set(data.map(item => item.alternative_name)));

        // Set uniqueCriteriaIds in the outer scope
        uniqueCriteriaIds = Array.from(new Set(data.map(item => item.criteria_id)));

        // Render table body
        tableBody = uniqueAlternativeIds.map((altId, index) => {
            const alternativeName = uniqueAlternativeNames.find(name => data.find(item => item.alternative_id === altId && item.alternative_name === name));

            // Check if alternativeName is not undefined
            if (alternativeName !== undefined) {
                return `
                    <tr>
                        <td><i class="fab fa-angular fa-lg text-danger me-3"></i><strong>${alternativeName}</strong></td>
                        ${uniqueCriteriaIds.map(criteriaId => {
                    const value = groupedData[altId][criteriaId];
                    const formattedValue = value !== undefined
                        ? (Number.isInteger(value) ? value.toString() : parseFloat(value).toFixed(4).replace(/\.?0+$/, ''))
                        : ''; // Set an empty string if the value is undefined
                    return `<td>${formattedValue !== '' ? formattedValue : '0'}</td>`;
                }).join('')}
                    </tr>`;
            }

            return ''; // Return an empty string for undefined alternativeName
        }).join('');

        // Render SUM row
        tableBody += `
        <tr class="text-success">
            <td><i class="fab fa-angular fa-lg text-danger me-3"></i><strong>Total</strong></td>
            ${uniqueCriteriaIds.map(criteriaId => {
            const totalPreferenceEntry = data.find(entry => entry.criteria_id === criteriaId && entry.total_preference_value !== undefined);
            const totalPreferenceValue = totalPreferenceEntry ? totalPreferenceEntry.total_preference_value : '';
            return `<td>${totalPreferenceValue !== undefined
                ? (Number.isInteger(totalPreferenceValue) ? totalPreferenceValue.toString() : parseFloat(totalPreferenceValue).toFixed(4).replace(/\.?0+$/, ''))
                : '0'}</td>`;
        }).join('')}
        </tr>`;
    }

    var tableHTML = `
        <form>
            <input id="tokenInput" type="hidden" name="_token" value="${csrfToken}">
            <div class="table-responsive text-nowrap">
                <table class="table table-sm">
                    <tbody class="table-border-bottom-0">
                        ${tableBody}
                    </tbody>
                </table>
            </div>
        </form>
    `;

    // Display the table in the element with the specified ID
    document.getElementById(targetId).innerHTML = tableHTML;
}

function setTableDeviasi(data, targetId) {
    var tableBody = '';

    if (!data || data.length === 0) {
        console.warn('Invalid data structure:', data);
        tableBody = `
            <tr>
                <td colspan="5" class="text-center">Kosong</td>
            </tr>`;
    } else {
        // Render rows for each criteria
        data.forEach(entry => {
            const criteriaId = entry.criteria_id;

            // Cek apakah entry memiliki criteria_id
            if (criteriaId !== undefined) {
                const criteriaName = entry.criteria_name || `Criteria ${criteriaId}`;
                const preference = entry.preference !== undefined
                    ? (Number.isInteger(entry.preference)
                        ? entry.preference.toString()
                        : parseFloat(entry.preference).toFixed(4).replace(/\.?0+$/, ''))
                    : '';
                const deviation = entry.deviation !== undefined
                    ? (Number.isInteger(entry.deviation)
                        ? entry.deviation.toString()
                        : parseFloat(entry.deviation).toFixed(4).replace(/\.?0+$/, ''))
                    : '';

                tableBody += `
                    <tr>
                        <td><i class="fab fa-angular fa-lg text-danger me-3"></i><strong>${criteriaName}</strong></td>
                        <td>=</td>
                        <td>1 - ${preference}</td>
                        <td>=</td>
                        <td>${deviation}</td>
                    </tr>`;
            }
        });

        // Hitung total deviation
        const totalDeviation = data.reduce((total, entry) => {
            return total + (entry.deviation !== undefined ? entry.deviation : 0);
        }, 0);

        if (!data || data.length === 0) {
            tableBody += `
            <tr class="text-success">
                <td colspan="4"><i class="fab fa-angular fa-lg text-danger me-3"></i><strong>Total</strong></td>
                <td>${totalDeviation.toFixed(4).replace(/\.?0+$/, '')}</td>
            </tr>`;
        } else {
            tableBody += `
            <tr>
                <td colspan="5" class="text-center">Kosong</td>
            </tr>`;
        }
    }

    var tableHTML = `
    <form>
        <input id="tokenInput" type="hidden" name="_token" value="${csrfToken}">
        <div class="table-responsive text-nowrap">
            <table class="table table-sm">
                <tbody class="table-border-bottom-0">
                    ${tableBody}
                </tbody>
            </table>
        </div>
    </form>
    `;

    // Display the table in the element with the specified ID
    document.getElementById(targetId).innerHTML = tableHTML;
}

function setTableBobot(data, targetId) {
    var tableBody = '';
    var totalDeviationValue = ''; // Variable to store total_deviation

    if (!data || data.length === 0 || !data.some(entry => entry.criteria_id !== undefined)) {
        console.warn('Invalid data structure:', data);
        tableBody = `
            <tr>
                <td colspan="5" class="text-center">Kosong</td>
            </tr>`;
    } else {
        // Find and store total_deviation if available
        const totalDeviationEntry = data.find(entry => entry.total_deviation !== undefined);
        if (totalDeviationEntry) {
            totalDeviationValue = parseFloat(totalDeviationEntry.total_deviation).toFixed(4).replace(/\.?0+$/, '');
        }

        // Render rows for each criteria
        data.forEach(entry => {
            if (entry.criteria_id !== undefined) {
                const criteriaName = entry.criteria_name || `Criteria ${entry.criteria_id}`;
                const deviation = entry.deviation !== undefined
                    ? (Number.isInteger(entry.deviation)
                        ? entry.deviation.toString()
                        : parseFloat(entry.deviation).toFixed(4).replace(/\.?0+$/, ''))
                    : '';
                const weight = entry.weight !== undefined
                    ? (Number.isInteger(entry.weight)
                        ? entry.weight.toString()
                        : parseFloat(entry.weight).toFixed(4).replace(/\.?0+$/, ''))
                    : '';

                tableBody += `
                    <tr>
                        <td><i class="fab fa-angular fa-lg text-danger me-3"></i><strong>${criteriaName}</strong></td>
                        <td>=</td>
                        <td>${deviation} / ${totalDeviationValue}</td>
                        <td>=</td>
                        <td>${weight}</td>
                    </tr>`;
            }
        });
    }

    var tableHTML = `
    <form>
        <input id="tokenInput" type="hidden" name="_token" value="${csrfToken}">
        <div class="table-responsive text-nowrap">
            <table class="table table-sm">
                <tbody class="table-border-bottom-0">
                    ${tableBody}
                </tbody>
            </table>
        </div>
    </form>
    `;

    // Display the table in the element with the specified ID
    document.getElementById(targetId).innerHTML = tableHTML;
}

function setTableRankPSI(matriksPSI, targetId) {
    var tableBody = '';
    var uniqueAlternativeIds;

    if (!matriksPSI || matriksPSI.length === 0) {
        console.warn('Invalid data structure:', matriksPSI);
        tableBody = `
            <tr>
                <td colspan="3" class="text-center">Kosong</td>
            </tr>`;
    } else {
        // Filter and sort data by total_PSI_value in descending order
        const sortedData = matriksPSI
            .filter(item => item.total_PSI_value !== undefined)
            .sort((a, b) => b.total_PSI_value - a.total_PSI_value);

        // Group the data by alternative_name
        var groupedData = {};
        sortedData.forEach(item => {
            groupedData[item.alternative_name] = parseFloat(item.total_PSI_value);
        });

        // Get unique alternative names for the table header
        uniqueAlternativeIds = Array.from(new Set(sortedData.map(item => item.alternative_name)));

        // Render table body
        tableBody = sortedData.map((item, index) => {
            const altName = item.alternative_name;
            const value = groupedData[altName];
            const formattedValue = value !== undefined
                ? (Number.isInteger(value) ? value.toString() : parseFloat(value).toFixed(4).replace(/\.?0+$/, ''))
                : ''; // Set an empty string if the value is undefined
            return `
                <tr>
                    <td>${index + 1}</td>
                    <td>${index === 0 ? `<strong>${altName}</strong>` : `<strong>${altName}</strong>`}</td>
                    <td>${formattedValue !== '' ? formattedValue : '0'}</td>
                </tr>`;
        }).join('');
    }

    var tableHTML = `
        <form>
            <input id="tokenInput" type="hidden" name="_token" value="${csrfToken}">
            <div class="table-responsive text-nowrap">
                <table class="table table-sm">
                    ${(!matriksPSI || matriksPSI.length === 0) ? '' :
                        `<thead>
                            <tr>
                                <th>Ranking</th>
                                <th>Alternatif</th>
                                <th>Total PSI</th>
                            </tr>
                        </thead>`
                    }
                    <tbody class="table-border-bottom-0">
                        ${tableBody}
                    </tbody>
                </table>
            </div>
        </form>
    `;

    // Display the table in the element with the specified ID
    document.getElementById(targetId).innerHTML = tableHTML;
}

function setTablePSI(matriksPSI, targetId) {
    var tableBody = '';

    if (!matriksPSI || matriksPSI.length === 0) {
        console.warn('Invalid data structure:', matriksPSI);
        tableBody = `
            <tr>
                <td colspan="5" class="text-center">Kosong</td>
            </tr>`;
    } else {
        // Group the data by alternative_id
        var groupedData = {};
        matriksPSI.forEach(item => {
            if (!groupedData[item.alternative_id]) {
                groupedData[item.alternative_id] = {};
            }
            groupedData[item.alternative_id][item.criteria_id] = parseFloat(item.psiValue);
        });

        // Get unique criteria names and alternative names for the table header
        var uniqueCriteriaIds = Array.from(new Set(matriksPSI.map(item => item.criteria_id)));
        var uniqueCriteriaNames = Array.from(new Set(matriksPSI.map(item => item.criteria_name)));
        var uniqueAlternativeIds = Array.from(new Set(matriksPSI.map(item => item.alternative_id)));
        var uniqueAlternativeNames = Array.from(new Set(matriksPSI.map(item => item.alternative_name)));

        // Render table body
        tableBody = uniqueAlternativeIds
            .filter(altId => matriksPSI.some(entry => entry.alternative_id === altId))
            .map((altId, index) => {
                const alternativeName = uniqueAlternativeNames[index];
                if (alternativeName !== undefined) {
                    return `
              <tr>
                <td>${index === 0 ? `<strong>${alternativeName}</strong>` : `<strong>${alternativeName}</strong>`}</td>
                ${uniqueCriteriaIds.map(criteriaId => {
                        const psiEntry = matriksPSI.find(entry => entry.alternative_id === altId && entry.criteria_id === criteriaId);
                        const formattedValue = psiEntry && psiEntry.psiValue !== undefined
                            ? (Number.isInteger(psiEntry.psiValue) ? psiEntry.psiValue.toString() : psiEntry.psiValue.toFixed(4).replace(/\.?0+$/, ''))
                            : ''; // Set empty string if psiValue is undefined

                        return `<td>${formattedValue}</td>`;
                    }).join('')}
              </tr>`;
                } else {
                    return ''; // Skip rendering the row if alternativeName is undefined
                }
            }).join('');
    }

    var tableHTML = `
        <form>
            <div class="table-responsive text-nowrap">
                <table class="table table-sm">
                    ${(!matriksPSI || matriksPSI.length === 0) ? '' :
                        `<thead>
                                <tr>
                                    <th></th>
                                    ${uniqueCriteriaNames
                            .filter(criteriaName => matriksPSI.some(entry => entry.criteria_name === criteriaName && entry.psiValue !== undefined))
                            .map(criteriaName => `<th>${criteriaName}</th>`).join('')}
                                </tr>
                            </thead>`
                    }
                    <tbody class="table-border-bottom-0">
                        ${tableBody}
                    </tbody>
                </table>
            </div>
        </form>
    `;

    // Display the table in the element with the specified ID
    document.getElementById(targetId).innerHTML = tableHTML;
}

function calculateNormalization(matriksKeputusan) {
    matriksNormalisasi = [];
    // Inisialisasi objek untuk menyimpan nilai min, max, dan sum dari setiap criteria_id
    const minMaxSumValues = {};

    // Iterasi melalui matriksKeputusan
    matriksKeputusan.forEach(data => {
        const criteriaId = data.criteria_id;
        const criteriaName = data.criteria_name;
        const type = data.type;
        const value = parseFloat(data.value);

        // Periksa apakah criteria_id sudah ada dalam objek
        if (minMaxSumValues.hasOwnProperty(criteriaId)) {
            // Update nilai min, max, dan sum jika ditemukan nilai baru yang lebih ekstrem
            minMaxSumValues[criteriaId].min = Math.min(minMaxSumValues[criteriaId].min, value);
            minMaxSumValues[criteriaId].max = Math.max(minMaxSumValues[criteriaId].max, value);
        } else {
            // Jika criteria_id belum ada, tambahkan ke objek
            minMaxSumValues[criteriaId] = {
                criteria_id: criteriaId,
                criteria_name: criteriaName,
                type: type,
                min: value,
                max: value
            };
        }
    });

    // Hitung hasil normalisasi, serta simpan ke matriksNormalisasi (variabel global)
    matriksNormalisasi = matriksKeputusan.map(data => {
        const criteriaId = data.criteria_id;
        const criteriaName = data.criteria_name;
        const type = data.type;
        const alternativeId = data.alternative_id;
        const alternativeName = data.alternative_name;
        const value = parseFloat(data.value);

        const min = minMaxSumValues[criteriaId].min;
        const max = minMaxSumValues[criteriaId].max;

        let normalizedValue;

        if (type === 'Cost') {
            // Jika tipe adalah Cost, normalisasi dengan menggunakan rumus min/value
            normalizedValue = parseFloat((min / value).toFixed(4));
        } else {
            // Jika tipe adalah Benefit, normalisasi dengan menggunakan rumus value/max
            normalizedValue = parseFloat((value / max).toFixed(4));
        }

        return {
            criteria_id: criteriaId,
            criteria_name: criteriaName,
            type: type,
            alternative_id: alternativeId,
            alternative_name: alternativeName,
            normalized_value: normalizedValue,
        };
    });
}

function calculateAverage(matriksNormalisasi) {
    matriksRataRata = [];
    // Inisialisasi objek untuk menyimpan total dan nama kriteria untuk setiap criteria_id
    const totalByCriteriaId = {};
    const criteriaNames = {}; // Menyimpan nama kriteria untuk setiap criteria_id
    const uniqueAlternativeIds = new Set(); // Inisialisasi objek Set untuk melacak unique alternative_id

    // Iterasi melalui matriksNormalisasi
    matriksNormalisasi.forEach(data => {
        const criteriaId = data.criteria_id;
        const criteriaName = data.criteria_name;
        const normalizedValue = data.normalized_value;
        const alternativeId = data.alternative_id;

        // Tambahkan alternativeId ke objek Set untuk melacak unique alternative_id
        uniqueAlternativeIds.add(alternativeId);

        // Periksa apakah criteria_id sudah ada dalam objek
        if (totalByCriteriaId.hasOwnProperty(criteriaId)) {
            // Update total jika ditemukan nilai baru
            totalByCriteriaId[criteriaId] += normalizedValue;
        } else {
            // Jika criteria_id belum ada, tambahkan ke objek
            totalByCriteriaId[criteriaId] = normalizedValue;
            criteriaNames[criteriaId] = criteriaName; // Simpan nama kriteria untuk criteria_id
        }
    });

    const uniqueAlternativeCount = uniqueAlternativeIds.size;

    matriksRataRata.push({
        count_alternative: uniqueAlternativeCount,
    });

    // Iterasi untuk menampilkan total berdasarkan criteria_id
    for (const criteriaId in totalByCriteriaId) {
        if (totalByCriteriaId.hasOwnProperty(criteriaId)) {
            const total = totalByCriteriaId[criteriaId];
            const criteriaName = criteriaNames[criteriaId]; // Ambil nama kriteria untuk criteria_id tertentu

            // Tambahkan hasil total ke variabel global matriksRataRata sebagai objek
            matriksRataRata.push({
                criteria_id: criteriaId,
                criteria_name: criteriaName,
                total_normalized_value: total,
                average: (1 / uniqueAlternativeCount) * total,
            });
        }
    }
}

function calculatePreference(matriksNormalisasi, matriksRataRata) {
    matriksPreferensi = [];
    // Iterasi melalui matriksNormalisasi
    matriksNormalisasi.forEach(data => {
        const criteriaId = data.criteria_id;
        const alternativeId = data.alternative_id;
        const alternativeName = data.alternative_name;
        const value = data.normalized_value;

        // Cari entry yang sesuai di matriksRataRata
        const rataRataEntry = matriksRataRata.find(entry => entry.criteria_id === criteriaId.toString());

        if (rataRataEntry) {
            const average = rataRataEntry.average;

            // Hitung preferensi (value - average) ^ 2
            const preference = Math.pow((value - average), 2);

            // Simpan hasil ke dalam matriksPreferensi
            matriksPreferensi.push({
                criteria_id: criteriaId,
                alternative_id: alternativeId,
                alternative_name: alternativeName,
                preference: preference,
                criteria_name: rataRataEntry.criteria_name // Tambahkan criteria_name ke matriksPreferensi
            });
        }
    });

    const totalPreferenceByCriteria = {};

    matriksPreferensi.forEach(data => {
        const criteriaId = data.criteria_id;
        const preference = data.preference;
        const criteriaName = data.criteria_name;

        // Check if the criteria_id already exists in the totalPreferenceByCriteria object
        if (totalPreferenceByCriteria.hasOwnProperty(criteriaId)) {
            // If it exists, add the preference to the existing total
            totalPreferenceByCriteria[criteriaId] += preference;
        } else {
            // If it doesn't exist, initialize the total with the current preference
            totalPreferenceByCriteria[criteriaId] = preference;
            totalPreferenceByCriteria[criteriaId + '_name'] = criteriaName; // Tambahkan criteria_name ke totalPreferenceByCriteria
        }
    });

    for (const criteriaId in totalPreferenceByCriteria) {
        if (totalPreferenceByCriteria.hasOwnProperty(criteriaId) && !criteriaId.endsWith('_name')) {
            const total = totalPreferenceByCriteria[criteriaId];
            const criteriaName = totalPreferenceByCriteria[criteriaId + '_name'];

            // Parse criteriaId to a numeric value
            const numericCriteriaId = parseInt(criteriaId, 10);

            // Tambahkan hasil total ke variabel global matriksRataRata sebagai objek
            matriksPreferensi.push({
                criteria_id: numericCriteriaId,
                criteria_name: criteriaName,
                total_preference_value: total
            });
        }
    }
}

function calculateDeviation(matriksPreferensi) {
    // Bersihkan nilai sebelumnya dari matriksDeviasi
    matriksDeviasi = [];

    totalDeviation = 0;

    matriksPreferensi.forEach(data => {
        const criteriaId = data.criteria_id;
        const totalPreferenceValue = data.total_preference_value;

        // Periksa apakah total_preference_value tidak undefined
        if (totalPreferenceValue !== undefined) {
            // Temukan criteria_name yang sesuai dengan criteria_id
            const criteriaName = matriksPreferensi.find(entry => entry.criteria_id === criteriaId)?.criteria_name || '';

            // Hitung deviasi dengan rumus 1 - total_preference_value
            const deviation = 1 - totalPreferenceValue;

            totalDeviation += deviation;

            // Simpan hasil perhitungan ke variabel global matriksDeviasi
            matriksDeviasi.push({
                criteria_id: criteriaId,
                criteria_name: criteriaName,
                preference: totalPreferenceValue,
                deviation: deviation,
            });
        }
    });

    matriksDeviasi.push({
        total_deviation: totalDeviation,
    });
}

function calculateWeight(matriksDeviasi) {
    // Bersihkan nilai sebelumnya dari matriksBobot
    matriksBobot = [];

    // Ambil total deviation dari data
    const totalDeviation = matriksDeviasi[matriksDeviasi.length - 1]?.total_deviation || 0;

    // Iterasi melalui matriksDeviasi dan hitung weight
    matriksDeviasi.forEach(entry => {
        if (entry.criteria_id !== undefined) {
            const criteriaId = entry.criteria_id;
            const criteriaName = entry.criteria_name;
            const deviation = entry.deviation;

            // Hitung weight (deviation / totalDeviation)
            const weight = totalDeviation !== 0 ? deviation / totalDeviation : 0;

            // Simpan hasil perhitungan ke variabel global matriksBobot
            matriksBobot.push({
                criteria_id: criteriaId,
                criteria_name: criteriaName,
                deviation: deviation,
                weight: weight,
            });
        }
    });

    matriksBobot.push({
        total_deviation: totalDeviation,
    });
}

function calculatePSI(matriksNormalisasi, matriksBobot) {
    // Reset matriksPSI
    matriksPSI = [];

    // Check if both matrices are not empty
    if (!matriksNormalisasi || !matriksBobot) {
        console.error('Invalid matrices:', matriksNormalisasi, matriksBobot);
        return;
    }

    // Iterate through each row in matriksNormalisasi
    matriksNormalisasi.forEach(normalisasiRow => {
        const alternative_id = normalisasiRow.alternative_id;
        const criteria_id = normalisasiRow.criteria_id;

        // Find the corresponding row in matriksBobot based on criteria_id
        const bobotRow = matriksBobot.find(bobot => bobot.criteria_id === criteria_id);

        // If a matching row is found, calculate PSI and store the result
        if (bobotRow) {
            const value = normalisasiRow.normalized_value || 0;
            const weight = bobotRow.weight || 0;
            const psiValue = value * weight;
            const criteria_name = normalisasiRow.criteria_name || '';
            const alternative_name = normalisasiRow.alternative_name || '';

            // Store the PSI value along with criteria_name and alternative_name
            matriksPSI.push({
                alternative_id: alternative_id,
                criteria_id: criteria_id,
                psiValue: psiValue,
                criteria_name: criteria_name,
                alternative_name: alternative_name
            });
        }
    });

    const totalPSIByAlternative = {};

    matriksPSI.forEach(data => {
        const alternativeId = data.alternative_id;
        const totalPSI = data.psiValue;

        // Check if the alternative_id already exists in the totalPSIByAlternative object
        if (totalPSIByAlternative.hasOwnProperty(alternativeId)) {
            // If it exists, add the PSI value to the existing total
            totalPSIByAlternative[alternativeId].total_PSI_value += totalPSI;
        } else {
            totalPSIByAlternative[alternativeId] = {
                total_PSI_value: totalPSI,
                alternative_name: data.alternative_name,
            };
        }
    });

    for (const alternativeId in totalPSIByAlternative) {
        if (totalPSIByAlternative.hasOwnProperty(alternativeId)) {
            const total = totalPSIByAlternative[alternativeId].total_PSI_value;
            const alternativeName = totalPSIByAlternative[alternativeId].alternative_name;

            // Parse criteriaId to a numeric value
            const numericAlternativeId = parseInt(alternativeId, 10);

            // Tambahkan hasil total ke variabel global matriksRataRata sebagai objek
            matriksPSI.push({
                alternativeId_id: numericAlternativeId,
                alternative_name: alternativeName,
                total_PSI_value: total
            });
        }
    }
}

function contentOutput() {
    setAccordionOutput();
    setMatrixs();
}