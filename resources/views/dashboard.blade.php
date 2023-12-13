<!DOCTYPE html>
<html lang="en" class="light-style layout-menu-fixed" dir="ltr" data-theme="theme-default"
    data-assets-path="{{ asset('assets/assets/') }}" data-template="vertical-menu-template-free">

<head>
    <meta charset="utf-8" />
    <meta name="viewport"
        content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>PSI - Dashboard</title>
    <meta name="description" content="" />
    <link rel="icon" type="image/x-icon" href="{{ asset('assets/assets/img/favicon/bx-rocket.svg') }}" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
        href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
        rel="stylesheet" />
    <link rel="stylesheet" href="{{ asset('assets/assets/vendor/fonts/boxicons.css') }}" />
    <link rel="stylesheet" href="{{ asset('assets/assets/vendor/css/core.css') }}"
        class="template-customizer-core-css" />
    <link rel="stylesheet" href="{{ asset('assets/assets/vendor/css/theme-default.css') }}"
        class="template-customizer-theme-css" />
    <link rel="stylesheet" href="{{ asset('assets/assets/css/demo.css') }}" />
    <link rel="stylesheet" href="{{ asset('assets/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css') }}" />
    <script src="{{ asset('assets/assets/vendor/js/helpers.js') }}"></script>
    <script src="{{ asset('assets/assets/js/config.js') }}"></script>
</head>

<body>
    @if (session()->has('message'))
        <div class="bs-toast toast toast-placement-ex m-2 fade bg-success top-0 start-50 translate-middle-x show"
            role="alert" aria-live="assertive" aria-atomic="true" data-delay="2000">
            <div class="toast-header">
                <i class="bx bx-bell me-2"></i>
                <div class="me-auto fw-semibold">Berhasil</div>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">{{ session('message') }}</div>
        </div>
    @endif
    <div class="layout-wrapper layout-content-navbar">
        <div class="layout-container">
            <aside id="layout-menu" class="layout-menu menu-vertical menu bg-menu-theme">
                <div class="app-brand demo">
                    <a href="{{ url('/dashboard') }}" class="app-brand-link">
                        <span class="app-brand-logo demo text-danger">
                            <i class="menu-icon tf-icons bx bx-rocket bx-sm"></i>
                        </span>
                        <span class="app-brand-text demo menu-text fw-bolder ms-2">PSI</span>
                    </a>
                    <a href="javascript:void(0);"
                        class="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none bg-danger">
                        <i class="bx bx-chevron-left bx-sm align-middle"></i>
                    </a>
                </div>

                <div class="menu-inner-shadow"></div>
                <ul class="menu-inner py-1">
                    <li class="menu-item" id="dashboard">
                        <a class="menu-link" onclick="setActive('dashboard')" style="cursor: pointer">
                            <i class="menu-icon tf-icons bx bx-cloud"></i>
                            <div data-i18n="Analytics">Dashboard</div>
                        </a>
                    </li>
                    <li class="menu-item" id="pengguna">
                        <a class="menu-link" onclick="setActive('pengguna')" style="cursor: pointer">
                            <i class="menu-icon tf-icons bx bx-crown"></i>
                            <div data-i18n="Basic">Pengguna</div>
                        </a>
                    </li>
                    <li class="menu-header small text-uppercase">
                        <span class="menu-header-text">Studi Kasus</span>
                    </li>
                    <li class="menu-item">
                        <a href="javascript:void(0);" class="menu-link menu-toggle">
                            <i class="menu-icon tf-icons bx bx-star"></i>
                            <div data-i18n="Account Settings">Jenis Kucing</div>
                        </a>
                        <ul class="menu-sub">
                            <li class="menu-item" id="setting">
                                <a class="menu-link" onclick="setActive('setting')" style="cursor: pointer">
                                    <div data-i18n="Account">Setting</div>
                                </a>
                            </li>
                            <li class="menu-item" id="input">
                                <a class="menu-link" onclick="setActive('input')" style="cursor: pointer">
                                    <div data-i18n="Notifications">Input</div>
                                </a>
                            </li>
                            <li class="menu-item" id="output">
                                <a class="menu-link" onclick="setActive('output')" style="cursor: pointer">
                                    <div data-i18n="Connections">Output</div>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </aside>

            <div class="layout-page">
                <nav class="layout-navbar container-fluid navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
                    id="layout-navbar">
                    <div class="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
                        <a class="nav-item nav-link px-0 me-xl-4" href="javascript:void(0)">
                            <i class="bx bx-menu bx-sm"></i>
                        </a>
                    </div>
                    <div class="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
                        <ul class="navbar-nav flex-row align-items-center ms-auto">
                            <div class="buy-now">
                                <a href="{{ url('/logout') }}" class="btn btn-sm btn-danger btn-buy-now"><i
                                        class="menu-icon tf-icons bx bx-log-out-circle"></i>Logout</a>
                            </div>
                        </ul>
                    </div>
                </nav>

                <div class="content-wrapper">
                    <div class="container-xxl flex-grow-1 container-p-y" id="content">

                    </div>

                    <div class="modal fade" id="modal" tabindex="-1" style="display: none;"
                        aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="modalTitle"></h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div class="modal-body" id="modalContent"></div>
                                <div class="modal-footer" id="modalFooter"></div>
                            </div>
                        </div>
                    </div>

                    <footer class="content-footer footer bg-footer-theme">
                        <div
                            class="container-xxl d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column">
                            <div class="mb-2 mb-md-0">
                                ©
                                <script>
                                    document.write(new Date().getFullYear());
                                </script>
                                , dibuat oleh
                                <a href="https://themeselection.com" target="_blank"
                                    class="footer-link fw-bolder">Kelompok 7 🚀</a>
                            </div>
                        </div>
                    </footer>

                    <div class="content-backdrop fade"></div>
                </div>
            </div>
        </div>

        <div class="layout-overlay layout-menu-toggle"></div>
    </div>

    <script src="{{ asset('assets/assets/vendor/libs/jquery/jquery.js') }}"></script>
    <script src="{{ asset('assets/assets/vendor/libs/popper/popper.js') }}"></script>
    <script src="{{ asset('assets/assets/vendor/js/bootstrap.js') }}"></script>
    <script src="{{ asset('assets/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js') }}"></script>
    <script src="{{ asset('assets/assets/vendor/js/menu.js') }}"></script>
    <script src="{{ asset('assets/assets/js/main.js') }}"></script>
    <script src="{{ asset('assets/assets/js/script.js') }}"></script>
    <script src="{{ asset('assets/assets/js/ui-popover.js') }}"></script>
    <script async defer src="https://buttons.github.io/buttons.js"></script>
    <script>
        var inputValues = [];
        var matriksKeputusan = [];
        var matriksNormalisasi = [];
        var matriksRataRata = [];
        var matriksPreferensi = [];
        var matriksDeviasi = [];
        var matriksPSI = [];

        var csrfToken = "{{ csrf_token() }}";

        var getUsers = "{{ url('/get-users') }}";
        var addUser = "{{ url('/add-user') }}";
        var getUser = "{{ url('/get-user/') }}";
        var updateUser = "{{ url('/update-user/') }}";
        var deleteUser = "{{ url('/delete-user/') }}";

        var getCriterias = "{{ url('/get-criterias') }}";
        var getAlternatives = "{{ url('/get-alternatives') }}";
        var addCriteria = "{{ url('/add-criteria') }}";
        var addAlternative = "{{ url('/add-alternative') }}";
        var getCriteria = "{{ url('/get-criteria/') }}";
        var getAlternative = "{{ url('/get-alternative/') }}";
        var updateCriteria = "{{ url('/update-criteria/') }}";
        var updateAlternative = "{{ url('/update-alternative/') }}";
        var deleteCriteria = "{{ url('/delete-criteria/') }}";
        var deleteAlternative = "{{ url('/delete-alternative/') }}";

        var getInputs = "{{ url('/get-inputs') }}";
        var saveInputs = "{{ url('/save-inputs') }}";

        var getMatrixs = "{{ url('/get-matriks') }}";

        document.addEventListener("DOMContentLoaded", function() {
            setActive('dashboard');
        });
    </script>
</body>

</html>
