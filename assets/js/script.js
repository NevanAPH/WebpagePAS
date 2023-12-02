




/* Input form handling and add plan button listener */
(() => {
    const form = document.querySelector('form#contact-form');
    const button = document.querySelector('form#contact-form button');

    if (form) {

        const nama = document.querySelector('input[name="nama"]');
        const email = document.querySelector('input[name="email"]');
        const telp = document.querySelector('input[name="notelp"]');
        const pesan = document.querySelector('textarea[name="pesan"]');

        const personal = document.querySelector('a#pesanPersonal');
        const shop = document.querySelector('a#pesanShop');
        const business = document.querySelector('a#pesanBusiness');

        personal.addEventListener('click', () => {
            pesan.value = "Saya ingin memesan jasa pembuatan website untuk personal."
        });
        shop.addEventListener('click', () => {
            pesan.value = "Saya ingin memesan jasa pembuatan website untuk shop produk saya."
        });
        business.addEventListener('click', () => {
            pesan.value = "Saya ingin memesan jasa pembuatan website untuk bisnis saya."
        });

        form.addEventListener('submit', (e) => {
    
            e.preventDefault();
            
            button.setAttribute('disabled', '');
            nama.setAttribute('disabled', '');
            email.setAttribute('disabled', '');
            telp.setAttribute('disabled', '');
            pesan.setAttribute('disabled', '');
    
            const data = new FormData();
            data.append('nama', nama.value);
            data.append('email', email.value);
            data.append('phone', telp.value);
            data.append('pesan', pesan.value);
            
            fetch('https://formspree.io/f/meqbwrol', {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then((response) => {
                button.removeAttribute('disabled');
                nama.removeAttribute("disabled");
                email.removeAttribute("disabled");
                telp.removeAttribute("disabled");
                pesan.removeAttribute("disabled");
    
                if (response.ok) {
                    nama.value = '';
                    email.value = '';
                    telp.value = '';
                    pesan.value = '';
                    
                    Swal.fire({
                        html: 'Pesan telah terkirim!<br>Terima kasih sudah menghubungi!',
                        icon: 'success', toast: true, timer: 3000, showConfirmButton: false,
                        customClass: { popup: 'w-96 px-8 rounded-xl', icon: 'ml-8' }, position: 'top-right'
                    });
    
                } else {
                    response.json().then((data) => {
                        if ('errors' in data) {
                            let errors = [];
                            data['errors'].forEach((element) => {
                                errors.push(element.message);
                            });

                            Swal.fire({
                                html: `Error:<br>${errors.join(',<br>')}`,
                                icon: 'warning', toast: true, timer: 3000, showConfirmButton: false,
                                customClass: { popup: 'w-80 px-8 rounded-xl', icon: 'ml-8' }, position: 'top-right'
                            });
                        } else {
                            Swal.fire({
                                html: 'Validasi gagal!<br>Silahkan coba lagi!',
                                icon: 'warning', toast: true, timer: 3000, showConfirmButton: false,
                                customClass: { popup: 'w-80 px-8 rounded-xl', icon: 'ml-8' }, position: 'top-right'
                            });
                        }
                    }).catch((error) => {
                        Swal.fire({
                            html: 'Pesan gagal terkirim!<br>Silahkan coba lagi!',
                            icon: 'warning', toast: true, timer: 3000, showConfirmButton: false,
                            customClass: { popup: 'w-80 px-8 rounded-xl', icon: 'ml-8' }, position: 'top-right'
                        });
                    });
                }
            })
            .catch((error) => {
                button.removeAttribute('disabled');
                nama.removeAttribute("disabled");
                email.removeAttribute("disabled");
                telp.removeAttribute("disabled");
                pesan.removeAttribute("disabled");
    
                Swal.fire({
                    html: 'Pesan gagal terkirim!<br>Silahkan coba lagi!',
                    icon: 'warning', toast: true, timer: 3000, showConfirmButton: false,
                    customClass: { popup: 'w-80 px-8 rounded-xl', icon: 'ml-2' }, position: 'top-right'
                });
            });
        });
    }
})();





/* Used to add or remove navbar background when scrolled
   Also to detect page change and update anchor style */
(() => {
    const navbar = document.querySelector('nav');
    
    const home = document.getElementById('home');
    const about = document.getElementById('about');
    const work = document.getElementById('work');
    const plan = document.getElementById('plan');
    const contact = document.getElementById('contact');

    const homeHref = document.querySelector('nav div.anchors a[href="#home"]');
    const aboutHref = document.querySelector('nav div.anchors a[href="#about"]');
    const workHref = document.querySelector('nav div.anchors a[href="#work"]');
    const planHref = document.querySelector('nav div.anchors a[href="#plan"]');
    const contactHref = document.querySelector('nav div.anchors a[href="#contact"]');

    if (navbar) {
        const navFunction = () => {
            if (window.scrollY < 80) {
                navbar.classList.add('bg-transparent');
                navbar.classList.remove('bg-blue-700');
            } else {
                navbar.classList.add('bg-blue-700');
                navbar.classList.remove('bg-transparent');
            }
    
            listenPageChange();
        }

        window.addEventListener('load', navFunction);
        window.addEventListener('scroll', navFunction);
    }

    const listenPageChange = () => {
        const selected = (element) => {
            element.classList.add('text-white', 'font-semibold', 'pointer-events-none', 'after:bg-white', 'after:opacity-100');
            element.classList.remove('after:-mb-1', 'after:opacity-0', 'after:bg-white/70');
        }
        const unselected = (element) => {
            element.classList.remove('text-white', 'font-semibold', 'pointer-events-none', 'after:bg-white', 'after:opacity-100');
            element.classList.add('after:-mb-1', 'after:opacity-0', 'after:bg-white/70');
        }

        if (home.getBoundingClientRect().bottom > navbar.offsetHeight) {
            selected(homeHref); unselected(aboutHref); unselected(workHref); unselected(planHref); unselected(contactHref);

        } else if (about.getBoundingClientRect().bottom > navbar.offsetHeight) {
            unselected(homeHref); selected(aboutHref); unselected(workHref); unselected(planHref); unselected(contactHref);

        } else if (work.getBoundingClientRect().bottom > navbar.offsetHeight) {
            unselected(homeHref); unselected(aboutHref); selected(workHref); unselected(planHref); unselected(contactHref);

        } else if (plan.getBoundingClientRect().bottom > navbar.offsetHeight) {
            unselected(homeHref); unselected(aboutHref); unselected(workHref); selected(planHref); unselected(contactHref);

        } else if (contact.getBoundingClientRect().bottom > navbar.offsetHeight) {
            unselected(homeHref); unselected(aboutHref); unselected(workHref); unselected(planHref); selected(contactHref);
        }
    }
})();





/* Used to initialize scroller and parallax */
(() => {
    new Rellax('.animate-hero2', {
        speed: 2,
    });
    new Rellax('section#iconbg i', {
        speed: -2,
    });

})();