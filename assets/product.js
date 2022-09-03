   
    var pro = document.querySelector('.loadpro');
    var prohome = document.querySelector('.pagepro');

    setTimeout(()=>{

        pro.classList.add('endloadpro')
        prohome.classList.add('onloadpro')

    },1500);

    // Get value
    let democart = document.querySelector('.democart');
    let demoboss = document.querySelector('#demoboss')
    let cartplus = democart.innerHTML + '';
    let showstring ='';
    let paninumbers = document.querySelector('.numbers');
    let pagesize ;
    let myUL = document.querySelector("#myUL");
    let nextpanigation = document.querySelector("#next");
    let prevpanigation = document.querySelector('#prev');

    // Function to do an Ajax call start
   
    const doAjax = async () => {

            const response = await fetch(' http://localhost:3000/furniture'); // thả link host vào đây
            if (response.ok) {
                const jsonValue = await response.json(); // Get JSON value from the response body
                return books =  Promise.resolve(jsonValue);
            
            } else {
                return Promise.reject('file not found');
            }
            
        }

    // Run server add cart
    var serveradd = doAjax().then((data) => {

            createpagination(data); 
            showmorecart(data);
            addNamechecked(data);
            runcategory(data);
            ready();
    })

    // Render cart
    function showmorecart(data) {

            ready();
            var id = 0;
            adddemocart(data, 0 , 12);

            //Page number
            paninumbers.addEventListener('click',button =>{
                
                if(button.target.matches('button')){

                    id = parseInt(button.target.textContent);
                    democart.id = id;
                    adddemocart(data, id );
                    ready()

                }          
            })

            //Next page
            nextpanigation.addEventListener('click',()=>{

                var id =parseInt(democart.id);
                id = id + 1;
                if(id > pagesize){ id = 0;}
                democart.id = id;
                adddemocart( data, id );    
                ready()

            })

            // Prev page
            prevpanigation.addEventListener('click',()=>{

                var id =parseInt( democart.id );
                id = id - 1;
                if(id < 0){
                id = 0;
                }
                democart.id = id;
                adddemocart( data,id );
                ready()

            })
    }

    //Add cart items
    function adddemocart( data, id ){

        let pagestart = id*12;
        let pageend = (id+1)*12;
        democart.innerHTML = '';

        for( var i = pagestart ; i < pageend; i++ ){

            showstring = showcart(data[i],i).replace(';','');
            democart.innerHTML += showstring;

        }

        demoboss.classList.add("democart");
    }

    //Create pagination
    function createpagination (data){

        pagesize = parseFloat((data.length -1) / 12 ); 

        for(var i = 0; i <=pagesize; i++){

                paninumbers.innerHTML +=`
                <button class="btn btn-outline-danger btn-sm my-1  buttonpagi" id=${i}>${i}</button>`

        }
    }

    // Category onclick
    function runcategory(data){

        var companies = document.querySelector('.companies');
        var buttoncategory = companies.getElementsByTagName('button');

        for(var i = 0; i < buttoncategory.length; i++){
            var arr = data
            var button ;
            buttoncategory[i].addEventListener('click',(btn)=>{
                 
                button = btn.target;
                titlebutton = button.textContent.toUpperCase();      
                categoryevent(data,titlebutton);
                ready();
                
            })
        }

    }

    function categoryevent(data,titlebutton) {

        democart.innerHTML = '';
        document.querySelector('.pagination').style.display = 'none';
        for(var i = 0; i < data.length ; i++ ){
            
            let datacategory = data[i].category.toUpperCase();

            if( datacategory === titlebutton ){
                democart.innerHTML += showcart(data[i],i).replace(';','');;
            }
        }
    }
    //Create search carts

    //render menu
    function addNamechecked(data){
        

        var ArrName = [];
        for( var i=0; i < data.length; i++ ){

            ArrName.push( data[i].name );

        }
        for(var i =0; i < ArrName.length; i++){

            myUL.innerHTML += `
            <li><a class="grey-5 fs-8 p-0" href="#">${ArrName[i]}</a></li>
            `
        }
        
    
    }

    function checkedsearch() {

        var input, filter,li, a, i, txtValue;

        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        li = myUL.getElementsByTagName("li");

        for (i = 0; i < li.length; i++) {

            a = li[i].getElementsByTagName("a")[0];
            txtValue = a.textContent || a.innerText;

            if ( txtValue.toUpperCase().indexOf(filter) > -1 ) {
        
                myUL.classList.remove('show-checked');
                li[i].style.display = "block";

            }else {

                li[i].style.display = "none";
            }
        }
    }
    function nonechecked() {
        
        myUL.classList.add('show-checked');

    }
    // Cart items
    var showcart = (cart,id) => {

        return `
        <div class="shop-items col-sm-10 col-md-4 container-fluid m-0 p-0" id="${id}">
        <div class="product  container-fluid shop-item position-relative product-img  products-icons px-0">
            <img class="shop-item-image rounded-2 position-relative" src="${cart.image}">

            <div class="sale-cart position-absolute start top-0 rounded-circle text-white fw-bold" style="z-index: 1 ">${cart.sale === undefined ? '' : (
                `<p class="p-2 text-center">${cart.sale}</p>`
            ) }</div>

            <div class="shop-item-details ">
                <a href="./product.html" class=" product-icon bt-search rounded-circle bg-red-light text-white p-1 border border-1 position-absolute ">
                    <i class="fas fa-search"></i>
                </a>
                <button class="shop-item-button  product-icon border border-1 rounded-circle fs-7 bg-red-light text-white p-1 position-absolute mx-5" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Buy
                </button>
            <div class="shop-item-title text-center m-0 text-light grey-5">${cart.name}</div>
            <div class="shop-item-price text-center fw-bold grey-3">${cart.money}</div>
            </div>
        </div>                
        </div>
        ;`

    }
    


