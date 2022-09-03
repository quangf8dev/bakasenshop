    // Loading pages Home

    const pagehome = document.querySelector(".pagehome");
    var classname = document.querySelector(".loadingpage");
    var opacity = classname.style.opacity;

    setTimeout(()=>{

        classname.classList.add('endloadhome');
        pagehome.classList.add('onloadhome');

    }, 1500 )

    //Function run POPUP BUY
    ready();
