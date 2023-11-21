




/* Input form handling */
(() => {
    const form = document.querySelector('form#contact-form');
    const button = document.querySelector('form#contact-form button');

    form.addEventListener('submit', (e) => {

        const nama = document.querySelector('input[name="nama"]');
        const kontak = document.querySelector('input[name="kontak"]');
        const pesan = document.querySelector('textarea[name="pesan"]');

        e.preventDefault();
        
        button.setAttribute('disabled', '');
        nama.setAttribute('disabled', '');
        kontak.setAttribute('disabled', '');
        pesan.setAttribute('disabled', '');

        const data = new FormData();
        data.append('nama', nama.value);
        data.append('kontak', kontak.value);
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
            kontak.removeAttribute("disabled");
            pesan.removeAttribute("disabled");

            if (response.ok) {
                nama.value = '';
                kontak.value = '';
                pesan.value = '';
                
                Swal.fire({
                    html: 'Pesan telah terkirim!<br>Terima kasih sudah menghubungi!',
                    icon: 'success', toast: true, timer: 3000, showConfirmButton: false,
                    customClass: { popup: 'w-96 px-8 rounded-xl', icon: 'ml-8' }, position: 'top-right'
                });

            } else {
                Swal.fire({
                    html: 'Pesan gagal terkirim!<br>Silahkan coba lagi!',
                    icon: 'warning', toast: true, timer: 3000, showConfirmButton: false,
                    customClass: { popup: 'w-80 px-8 rounded-xl', icon: 'ml-8' }, position: 'top-right'
                });

            }
        })
        .catch((error) => {
            button.removeAttribute('disabled');
            nama.removeAttribute("disabled");
            kontak.removeAttribute("disabled");
            pesan.removeAttribute("disabled");

            Swal.fire({
                html: 'Pesan gagal terkirim!<br>Silahkan coba lagi!',
                icon: 'warning', toast: true, timer: 3000, showConfirmButton: false,
                customClass: { popup: 'w-80 px-8 rounded-xl', icon: 'ml-2' }, position: 'top-right'
            });
        });
    });
})();





/* Used to add or remove navbar background when scrolled
   Also to detect page change and update anchor style */
(() => {
    const navbar = document.querySelector('nav');
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

    const home = document.getElementById('home');
    const about = document.getElementById('about');
    const work = document.getElementById('work');
    const contact = document.getElementById('contact');

    const homeHref = document.querySelector('nav div.anchors a[href="#home"]');
    const aboutHref = document.querySelector('nav div.anchors a[href="#about"]');
    const workHref = document.querySelector('nav div.anchors a[href="#work"]');
    const contactHref = document.querySelector('nav div.anchors a[href="#contact"]');

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
            selected(homeHref); unselected(aboutHref); unselected(workHref); unselected(contactHref);

        } else if (about.getBoundingClientRect().bottom > navbar.offsetHeight) {
            unselected(homeHref); selected(aboutHref); unselected(workHref); unselected(contactHref);

        } else if (work.getBoundingClientRect().bottom > navbar.offsetHeight) {
            unselected(homeHref); unselected(aboutHref); selected(workHref); unselected(contactHref);

        } else if (contact.getBoundingClientRect().bottom > navbar.offsetHeight) {
            unselected(homeHref); unselected(aboutHref); unselected(workHref); selected(contactHref);

        }
    }
})();





/* Used to initialize scroller and parallax
   and to add smooth scrolling to anchored links */
(() => {
    new Rellax('.animate-hero2', {
        speed: 2,
    });
    new Rellax('section#iconbg i', {
        speed: -2,
    });
    
    /*const lenis = new Lenis();

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);


    * Add smooth scrolling to anchor links *
    window.addEventListener('load', () => {
        const id = window.location.hash.substring(1);
        const target = document.getElementById(id);

        if (target) lenis.scrollTo(target, 300);
    });


    window.addEventListener('hashchange', (e) => {
        e.preventDefault();
        const id = window.location.hash.substring(1);
        const target = document.getElementById(id);

        if (target) lenis.scrollTo(target, 300);
    });


    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const id = this.getAttribute('href').replace('#', '');
            const target = document.getElementById(id);

            if (target) {
                window.location.hash = id;
                lenis.scrollTo(target, 300);
            }
        });
    });
    */

})();
