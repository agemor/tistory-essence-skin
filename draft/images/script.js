var categories = [];

// 전체 글 갯수 구하기
var totalNumberOfPosts = $("a.link_tit > span").text().match(/\(([^)]+)\)/)[1];
categories.push(["All", "/category", totalNumberOfPosts]);

// 카테고리 구하기
$("ul.category_list > li > a").each(function (index) {
    var category = $.trim($(this).contents().filter(function () { return this.nodeType == 3; })[0].nodeValue);
    var href = $(this).attr('href');
    var numberOfPosts = $(this).find("span").text().match(/\(([^)]+)\)/)[1];

    categories.push([category, href, numberOfPosts]);
});

// 카테고리 메뉴 생성
var listGroup = $('.list-group');
$.each(categories, function (i) {

    var li = $('<a/>')
        .attr('class', 'list-group-item list-group-item-action d-flex justify-content-between align-items-center')
        .attr('href', categories[i][1])
        .text(categories[i][0])
        .appendTo(listGroup);

    var span = $("<span/>")
        .attr('class', "badge badge-primary badge-pill")
        .text(categories[i][2])
        .appendTo(li);

});

// 기존의 메뉴 교체
$(".tt_category").remove();

// 태그
if ($("div.tag-container > a") != null) {
    var tags = [];
    $("div.tag-container > a").each(function (index) {

        var tag = $.trim($(this).text());
        var href = $(this).attr('href');
        tags.push([tag, href]);
    });

    var listGroup = $("div.tag-container").empty();
    $.each(tags, function (i) {
        var a = $('<a/> ')
            .attr('class', 'badge badge-primary mr-1')
            .attr('href', tags[i][1])
            .text(tags[i][0])
            .appendTo(listGroup);
    });

    // 신고버튼 교체
    var reportAbuseButton = $('a[href*="abuseReport"]');
    var newReportAbuseButton = $("#reportAbuse");

    newReportAbuseButton.attr("href", reportAbuseButton.attr('href'));
    newReportAbuseButton.attr("onclick", reportAbuseButton.attr('onclick'));
    reportAbuseButton.parent().remove();

    // pagination 교체
    $(".no-more-prev").addClass("disabled");
    $(".no-more-next").addClass("disabled");
    $("a.page-link > span.selected").parent().attr("href", "#")
    $("a.page-link > span.selected").parent().parent().addClass('active');

    // 검색결과 없을 때 보여주기
    if ($(".article-card").length == 0 && $(".article-content").length == 0) {
        $('<div class="alert alert-info" role="alert">No search results</div>').appendTo($(".article-base"));

    }
}