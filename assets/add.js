//Render website
    
    //Render Footer
    var footer = document.getElementById('footer');

            footer.innerHTML=`

            <footer class="footer bg-red-light w-100 h-25 p-3 d-flex justify-content-around">
            <i class="fab text-center text-white fs-1 fa-instagram"></i>
            <i class="fab text-center text-white fs-1 fa-facebook"></i>
            <i class="fab text-center text-white fs-1 fa-youtube"></i>
            </footer>
            `
            
    //Render buy POPUP cart
    var cartbtn = document.getElementById('cart-element-btn')

    cartbtn.innerHTML=`

            <div class="modal-content">
            <button type="button" class="btn-cart-close rounded-circle m-1 position-absolute top-0 end-0" data-bs-dismiss="modal"><i class="fas fa-times"></i></button>
            <header class="justify-content-center d-flex w-100">
                <p class="fs-1 text-s text-cursive mt-1">Your Bag</p>
            </header>
            <div class="content-cart container fuild w-100 px-3 ">
                <section class="container content-section">
                    <div class="cart-row">
                        <span class="cart-item cart-header cart-column text-cursive">ITEM</span>
                        <span class="cart-price cart-header cart-column text-cursive">PRICE</span>
                        <span class="cart-quantity cart-header cart-column text-cursive">QUANTITY</span>
                    </div>
                    <div class="cart-items">
                    </div>
                    <div class="cart-total">
                        <strong class="cart-total-title">Total</strong>
                        <span class="cart-total-price">$0</span>
                    </div>
                    <button class="btn bg-primary-5 text-white btn-purchase fs-5 mx-5" type="button">PURCHASE</button>
                </section>
            </div>
            <div class="modal-footer">
            </div>
            </div>
            `

    //Render navbar website
    var navbarspage = document.getElementsByClassName('nav-pages-setup')[0];

    navbarspage.innerHTML =`

            <nav class="navbar navbar-expand-lg ">
                    <div class="container-fluid d-flex">
                        <!-- Mobile menu -->
                        <button id="open_side"  class="toggle-nav bg-primary-5 text-white btn ">
                        <i class="fas fa-bars"></i>
                        </button>
                        <!-- Nav menu -->
                        <div class="collapse navbar-collapse col-6  text-conten position-relative" id="navbarNavDropdown">
                            <ul class="navbar-nav m-0">
                            <li class="nav-item mx-3">
                                <a  class=" fs-5 nav-link active" aria-current="page" href="./index.html">Home</a>
                            </li>
                            <li class="nav-item mx-3">
                                <a  class=" fs-5 nav-link" href="./product.html">Products</a>
                            </li>
                            <li class="nav-item mx-3">
                                <a  class=" fs-5 nav-link" href="./about.html">About</a>
                            </li>
                            </ul>
                        </div>
                        <!-- Nav brand -->
                        <a href="./index.html" class="navbar-brand fs-1 text-cursive col-4 justify-content-center">Bakasen</a>
                        <!-- button  -->

                        <button type="button" class="mx-5 text-conten btn-user-login" style="border:none; background:none!important">
                        <i class="fas fa-user fs-3 primary-7"></i></i>
                        </button>

                        <div class="close-main-login " style="z-index:999;">
                                <div class="login-popup position-absolute bg-primary-10 border-top border-3 border-dark m-0  bottom-0 end-0 h-100 flex-column justify-content-around mx-2 text-start p-2" style="z-index:999!important;">
                                <a class="grey-5 text-conten " href="./login.html"><i class="mx-2 fas fa-user-circle text-primary"></i> Login</a>    
                                <a class="grey-5 text-conten " href="./login.html"><i class="mx-2 fas fa-plus-circle text-success"></i> Create Account </a>
                                <a class="grey-5 text-conten " href="./about.html"><i class="mx-2 fas fa-question-circle text-warning"></i> Guide</a>
                                <a class="grey-5 text-conten " href="./about.html"><i class="mx-2 fas fa-envelope text-danger"></i> Contact</a> 
                                <a class="close-login grey-5 text-conten"><i class=" mx-2 fas fa-times"></i> Close</a>                 
                                </div>
                        </div> 
                    </div>
                </nav>
                ` 

    //Render Menu Mobile
    var sidebaroverplay = document.getElementsByClassName('sidebar-overplay')[0];

    sidebaroverplay.innerHTML = 

                `<div class="container-fuild d-flex w-75 h-100 bg-light rounded-3 position-relative">
                <aside class="sidebar ">
                    <!-- Close -->
                    <button id="close_side" class="btn position-absolute top-0 end-0 m-3"><i class="fas fa-times  fs-3"></i></button>
                    <!-- Links-->
                    <ul class="sidebar-links fs-4 p-4 mt-3">
                        <li>
                            <a href="./index.html" class="sidebar-link"><i class="fas fa-home mx-2 p-2 fa-fw"></i> Home</a>
                        </li>
                        <li>
                            <a href="./product.html" class="sidebar-link"><i class="fas fa-couch fa-fw mx-2 p-2 fa-fw"></i> Products</a>
                        </li>
                        <li>
                            <a href="./index.html" class="sidebar-link"><i class="fas fa-book fa-fw mx-2 p-2 fa-fw"></i> About</a>
                        </li>
                        <li>
                        <a class="grey-5 text-conten " href="./login.html"><i class="fas fa-user-circle  mx-2 p-2 fa-fw"></i> Login</a>
                        </li>
                        <li>   
                        <a class="grey-5 text-conten " href="./login.html"><i class="fas fa-plus-circle mx-2 p-2 fa-fw"></i> Create Account </a>
                        </li>
                        <li>
                        <a class="grey-5 text-conten " href="./about.html"><i class="fas fa-question-circle mx-2 p-2 fa-fw"></i> Guide</a>
                        </li>
                        <li>
                        <a class="grey-5 text-conten " href="./about.html"><i class="fas fa-envelope mx-2 p-2 fa-fw"></i> Contact</a>
                        </li>
                    </ul>
                </aside>

                </div>`

    // Value left sidebar Mobile
    var close_side = document.querySelector("#close_side");
    var sidebar = document.querySelector(".sidebar-overplay");
    var open_side = document.querySelector("#open_side");

        //Show menu Mobile
        open_side.addEventListener('click',()=>{

            sidebar.classList.add("show")

        })

        close_side.addEventListener('click',()=>{

            sidebar.classList.remove("show")

        })

    // Value user-login Navbar
    var btnlogin  = document.querySelector('.btn-user-login');
    var  popupuser = document.querySelector('.login-popup');
    var closemainlogin = document.querySelector('.close-main-login');

        // Show menu User
        btnlogin.addEventListener('click',()=>{
        
            popupuser.classList.add('d-flex');
    
        })
        closemainlogin.addEventListener('click',()=>{

            popupuser.classList.remove('d-flex');
            
        })