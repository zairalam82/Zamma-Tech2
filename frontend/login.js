      function showform() {
            let role = document.getElementById('roleselect').value;
            let  form = document.getElementById('myform');

            if (role !== '') {
                form.classList.add('visible');
            } else {
                form.classList.remove('visible');
            }
        }