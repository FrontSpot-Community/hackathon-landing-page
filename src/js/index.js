let registerButton = document.getElementById('register');
let formElement = document.getElementById('regForm');

function toJSONString(form) {
    let obj = {};
    let elements = form.querySelectorAll("input, textarea");
    for (let i = 0; i < elements.length; ++i) {
        let element = elements[i];
        let name = element.name;
        let value = element.value;
        if (name) {
            obj[name] = value;
        }
    }
    return JSON.stringify(obj);
}

function validateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true)
    }
    return (false)
}

function showError(type) {
    switch (type) {
        case 'name':
            document.getElementById('nameLabel').classList.add('error');
            break;
        case 'email':
            document.getElementById('emailLabel').classList.add('error');
            break;
    }
}

function removeError(item) {
    item.parentElement.classList.remove('error');
}
function showHidePlaceholder(item) {
    item.parentNode.querySelector('.placeholder').style.display = item.value ? 'block' : 'none';
}

document.querySelectorAll('input').forEach((item) => {
    item.addEventListener('input', function () {
        removeError(item);
        showHidePlaceholder(item);
    });
    item.addEventListener('change', function () {
        removeError(item);
        showHidePlaceholder(item);
    });
});

registerButton.addEventListener('click', function (e) {
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    e.preventDefault();
    let data = toJSONString(formElement);

    if (document.getElementById('name').value.length < 2) {
        showError('name');
        return false;
    }

    if (!validateEmail(document.getElementById('email').value)) {
        showError('email');
        return false;
    }

    name.value = '';
    email.value = '';

    fetch('/register', {
        method: "POST",
        body: data,
        headers: {
            'content-type': 'application/json'
        },
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            document.getElementById('regForm').classList.add('success');
        });
    return false;
});

let animationElements = document.querySelectorAll('.animation');

document.querySelector('#cta').addEventListener('click', function (e) {
    if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
        e.preventDefault();
        let velocity = 0.2;
        let w = window.pageYOffset,
            hash = this.href.replace(/[^#]*(.*)/, '$1');
        let t = document.querySelector(hash).getBoundingClientRect().top,
            start = null;

        requestAnimationFrame(step);
        function step(time) {
            if (start === null) start = time;
            let progress = time - start,
                r = (t < 0 ? Math.max(w - progress/velocity, w + t) : Math.min(w + progress/velocity, w + t));
            window.scrollTo(0,r);
            if (r !== w + t) {
                requestAnimationFrame(step)
            } else {
                location.hash = hash;
            }
        }
    }
});
