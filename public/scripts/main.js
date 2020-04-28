$(".comment-show-edit-button").click(function() {
    $(this).parent().toggleClass("d-none");
    $(this).parent().next().toggleClass("d-none");
});

$(".comment-edit-form-button-cancel").click(function() {
    $(this).parent().parent().toggleClass("d-none");
    $(this).parent().parent().prev().toggleClass("d-none");
});