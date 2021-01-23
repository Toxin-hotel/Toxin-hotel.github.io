window.addEventListener('scroll', function() {
    const header = document.querySelector('header');

    if (((document.documentElement && document.documentElement.scrollTop) > 1) || (document.body.scrollTop > 1)) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});