$( document ).ready(function() {
    $(".button-collapse").sideNav();
    $('.nav-link-mobile').click(() => {
        "use strict";
        $("#sidenav-overlay").trigger("click");
    });
});