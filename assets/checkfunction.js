
document.addEventListener('DOMContentLoaded', function () {
    
    Validator({
      form: '#form-1',
      formGroupSelector: '.form-group',
      errorSelector: '.form-message',
      rules: [
        Validator.isRequired('#fullname', 'Vui lòng nhập tên đầy đủ của bạn'),
        Validator.isEmail('#email'),
        Validator.minLength('#password', 6),
        Validator.isRequired('#password_confirmation'),
        Validator.isConfirmed('#password_confirmation', function () {

          return document.querySelector('#form-1 #password').value;
        }, 'Mật khẩu nhập lại không chính xác')
      ],
      onSubmit: function (data) {

          var formData ={
            email : data.email,
            password : data.password
          };

          var dataJSON = JSON.stringify(formData);
          const asyncPostCall = async () => {
            try {
              
              const response = await fetch('http://localhost:3000/user', {

                      method: 'POST',
                      headers: {
                      'Content-Type': 'application/json'
                      },
                      body: dataJSON

              });

              const data = await response.json();

              setTimeout(() => {
                document.location.reload();
              }, 500);

            }catch(error) 
              {console.log(error)} 
            }
          asyncPostCall()
      }   
    });


    Validator({
      form: '#form-2',
      formGroupSelector: '.form-group',
      errorSelector: '.form-message',
      rules: [
        Validator.isEmail('#email'),
        Validator.minLength('#password', 6),
      ],
      onSubmit: function (data) {

        var checkaccount  = {

            email : data.email,
            password : data.password
        };
        // Call API
        const checkedlogin = async () => {

            const response = await fetch('http://localhost:3000/user'); // thả link host vào đây
            if (response.ok) {
                const jsonValue = await response.json(); // Get JSON value from the response body
                return books =  Promise.resolve(jsonValue);
            
            } else {
                return Promise.reject('file not found');
            }
            
        }

    // Run server add cart
        var serveradd = checkedlogin().then((data) => {
            console.log(checkaccount.email, checkaccount.password)
            for( var i = 0; i < data.length; i++){

                if(data[i].email === checkaccount.email && data[i].password === checkaccount.password){

                    location.href = "index.html";
    
                }
                else{
                    var failure = form2.querySelector('.failure');
                    failure.style.display = 'block';
                }
            }
        })


      }
    });
  });

let form1 = document.querySelector('#form-1'); // create 
let form2 = document.querySelector('#form-2'); // login
let bglogin  = document.querySelector('#bglogin');
let checkform1 = document.querySelector('.checkform1');
let btnchecked1 = document.querySelector('#btn-checked1');

let checkform2 = document.querySelector('.checkform2');
let btnchecked2 = document.querySelector('#btn-checked2');

btnchecked2.addEventListener('click',()=>{

    checkform2.classList.add('end-form');
    form2.classList.add('end-form');
    form1.classList.remove('end-form');
    checkform1.classList.remove('end-form');
    if(bglogin.matches('.create-main') || bglogin.matches('.login-main') ){
        console.log(bglogin);
        bglogin.classList.remove('create-main');
        bglogin.classList.remove('login-main');
    }
    bglogin.classList.add('create-main');
})

btnchecked1.addEventListener('click',()=>{

    checkform1.classList.add('end-form');
    form1.classList.add('end-form');
    form2.classList.remove('end-form');
    checkform2.classList.remove('end-form');
    if(bglogin.matches('.create-main') || bglogin.matches('.login-main') ){
        console.log(bglogin);
        bglogin.classList.remove('create-main');
        bglogin.classList.remove('login-main');
    }
    bglogin.classList.add('login-main');
    
})



// Đối tượng `Validator`
function Validator(options) {
    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    var selectorRules = {};

    // Hàm thực hiện validate
    function validate(inputElement, rule) {
        var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
        var errorMessage;

        // Lấy ra các rules của selector
        var rules = selectorRules[rule.selector];
        
        // Lặp qua từng rule & kiểm tra
        // Nếu có lỗi thì dừng việc kiểm
        for (var i = 0; i < rules.length; ++i) {
            switch (inputElement.type) {
                case 'radio':
                case 'checkbox':
                    errorMessage = rules[i](
                        formElement.querySelector(rule.selector + ':checked')
                    );
                    break;
                default:
                    errorMessage = rules[i](inputElement.value);
            }
            if (errorMessage) break;
        }
        
        if (errorMessage) {
            errorElement.innerText = errorMessage;
            getParent(inputElement, options.formGroupSelector).classList.add('invalid');
        } else {
            errorElement.innerText = '';
            getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
        }

        return !errorMessage;
    }

    // Lấy element của form cần validate
    var formElement = document.querySelector(options.form);
    if (formElement) {
        // Khi submit form
        formElement.onsubmit = function (e) {
            e.preventDefault();

            var isFormValid = true;

            // Lặp qua từng rules và validate
            options.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement, rule);
                if (!isValid) {
                    isFormValid = false;
                }
            });

            if (isFormValid) {
                // Trường hợp submit với javascript
                if (typeof options.onSubmit === 'function') {
                    var enableInputs = formElement.querySelectorAll('[name]');
                    var formValues = Array.from(enableInputs).reduce(function (values, input) {
                        
                        switch(input.type) {
                            case 'radio':
                                values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
                                break;
                            case 'checkbox':
                                if (!input.matches(':checked')) {
                                    values[input.name] = '';
                                    return values;
                                }
                                if (!Array.isArray(values[input.name])) {
                                    values[input.name] = [];
                                }
                                values[input.name].push(input.value);
                                break;
                            case 'file':
                                values[input.name] = input.files;
                                break;
                            default:
                                values[input.name] = input.value;
                        }

                        return values;
                    }, {});
                    options.onSubmit(formValues);
                }
                // Trường hợp submit với hành vi mặc định
                else {
                    
                    formElement.submit();
                }
            }
        }

        // Lặp qua mỗi rule và xử lý (lắng nghe sự kiện blur, input, ...)
        options.rules.forEach(function (rule) {

            // Lưu lại các rules cho mỗi input
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }

            var inputElements = formElement.querySelectorAll(rule.selector);

            Array.from(inputElements).forEach(function (inputElement) {
               // Xử lý trường hợp blur khỏi input
                inputElement.onblur = function () {
                    validate(inputElement, rule);
                }

                // Xử lý mỗi khi người dùng nhập vào input
                inputElement.oninput = function () {
                    var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
                    errorElement.innerText = '';
                    getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
                } 
            });
        });
    }

}



// Định nghĩa rules
// Nguyên tắc của các rules:
// 1. Khi có lỗi => Trả ra message lỗi
// 2. Khi hợp lệ => Không trả ra cái gì cả (undefined)
Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value ? undefined :  message || 'Vui lòng nhập trường này'
        }
    };
}

Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined :  message || 'Trường này phải là email';
        }
    };
}

Validator.minLength = function (selector, min, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined :  message || `Vui lòng nhập tối thiểu ${min} kí tự`;
        }
    };
}

Validator.isConfirmed = function (selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function (value) {
            return value === getConfirmValue() ? undefined : message || 'Giá trị nhập vào không chính xác';
        }
    }
}


