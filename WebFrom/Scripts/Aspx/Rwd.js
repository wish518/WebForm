$(document).ready(function () {
    $(".dropdown-toggle").dropdown();
    $('[data-toggle="tooltip"]').tooltip();
});
var _Url, _CssTagIndex, _CssTagCount;
//選取網站選項時
function SetArchitecture(id, Url) {
    $('#DivSize').css('display', 'none');
    $('.Architecture-btn').removeClass('btn-info');
    $('.Architecture-btn').addClass('btn-outline-info');

    $("#" + id).removeClass('btn-outline-info');
    $("#" + id).addClass('btn-info');
    _Url = Url;

    $.ajax({
        type: 'post',
        url: Url + "GetPageData",
        contentType: 'application/json',
        dataType: "json", //資料格式
        data: JSON.stringify({ PageArchitecture: id }),
        success: function (result) {
            //console.log(result);
            if (result.IS_Error == "N") {
                var html = "";
                var htm2 = "";
                result.Data.PageDataList.forEach(function (item) {
                    var url = item.RwdUrl.replace(/\//g, 'OoggoO');
                    html += '<Button class="Architecture-btn PageBtn btn btn-outline-success" onclick=ShowDivSize(event,"' + window.location.origin + url + '","' + item.PageCode + '")>'
                        + item.PageName + '</Button> '
                })
                $('#DivPage').html(html);
                result.Data.DropDownData.forEach(function (item, index) {
                    var _class = "DropdownItem";
                    if (index === result.Data.DropDownData.length - 1)
                        _class = "FinalDropdownItem";

                    var Text = item.Text.replace(/ /, '&nbsp;');
                    htm2 += ' <button class="dropdown-item ' + _class + '" type="button" onclick=GetResolution("' + item.Value + '","' + Text + '")>' + Text + '</button> '
                })
                window.sessionStorage["ResolutionData"] = JSON.stringify(result.Data.DropDownData);
                $('#Resolution').html(htm2);
            }
            else {
                alert("取得資料錯誤");
            }
        },
        error: function () {
            alert("取得資料 發生未知錯誤");
        }
    })
}
//選取網頁選項時
function ShowDivSize(e, PageUrl, PageCode) {
    $(".PageBtn").removeClass('btn-success');
    $(".PageBtn").addClass('btn-outline-success');

    $(e.target).removeClass('btn-outline-success');
    $(e.target).addClass('btn-success');

    $('#DivSize').css('display', 'block');
    $('#DivSize').animate({ height: '25%' })
    window.sessionStorage["PageUrl"] = PageUrl;
    window.sessionStorage["PageCode"] = PageCode;
}
//顯示螢幕比例
function ShowResolution() {
    alert("寬:" + window.innerWidth + "px 高:" + window.innerHeight);
}
//選取比例時
function GetResolution(Value, Text) {
    $('#Width').val('');
    $('#Height').val('');
    $('#DropdownMenuButton')[0].innerText = Text;
    if (Value == 0)
        $('.ResolutionText').removeAttr('disabled');
    else if (Value == 99) {
        SetResolution("Y");
        return;
    }
    else {
        $('.ResolutionText').attr('disabled', true);

        var ResolutionListData = JSON.parse(window.sessionStorage["ResolutionData"]);
        var ResolutionData = ResolutionListData.filter(function (item) {
            return item.Value === Value;
        });

        $('#Width').val(ResolutionData[0].Value2);
        $('#Height').val(ResolutionData[0].Value3);

        SetResolution();
    }
}
//設定比例時
function SetResolution(Default) {
    $('.spinner-border').css('display', 'black')
    var Width = $('#Width')[0].value;
    var Height = $('#Height')[0].value;
    if (Default === "Y") {
        Width = '636'; Height = '951';
    }

    if (Width == "" || Height == "") {
        $('.ShowPage').css('display', 'none');
        return;
    }
    $('.ShowPage').css('display', 'flex');
    $('#ShowPageIframe').css('display', 'none')

    if ((Width >= 950 || Height > 812) && Default != 'Y') {
        $('#ErrWord').css('display', 'block')
        $('.spinner-border').css('display', 'none')
        return;
    }

    var Uid = "System";
    if (localStorage.getItem('token') == 'ImLogin') {
        Uid = localStorage.getItem('UID');
    }
    var Data = { PageCode: window.sessionStorage["PageCode"], Width: parseInt(Width), Height: parseInt(Height) }
    var request = JSON.stringify({ Uid: Uid, Data: Data })

    $.ajax({
        type: 'post',
        url: _Url + "GetHtmlCssSet",
        contentType: 'application/json',
        dataType: "json", //資料格式
        data: request,
        success: function (data) {
            console.log(data);
            if (data.IS_Error == "N") {
                var html = "";
                _CssTagCount = data.Data.HtmlCssSetData.length;
                //HtmlCssSet
                data.Data.HtmlCssSetData.forEach(function (item, index) {
                    html += '<li class="HtmlCssSet d-none text-center col-12 d-none " ><strong>' + item.CssTagName + '</strong></li>'
                })
                html = '<ul id="HtmlCssSet" style="flex-wrap:nowrap;white-space:nowrap" class="p-0 w-100 h-100 row align-items-center" type="none">' + html + '</ul>';
                $('#CssTag').html(html);
                _CssTagIndex = 0;
                $(".HtmlCssSet").eq(0).removeClass(" d-none");
                $(".HtmlCssSet").eq(0).css("margin-left", "0");
                if (_CssTagCount <= 1)
                    $(".ChgCssTagBtn").css("display", "none");
                //HtmlSet
                window.sessionStorage["HtmlSetData"] = JSON.stringify(data.Data.HtmlSetData);
                html = '<ul id="HtmlSet" style="flex - wrap: nowrap; white - space: nowrap" class="p - 0 w - 100 h - 100 row align - items - center" type="none">'
                data.Data.HtmlSetData.forEach(function (item, index) {
                    html += '<li class="HtmlSet d-none"><strong>' + item.Html + '</strong ></li >'
                })
                html +='</ul>';
                $('#HtmlSetHtml').html(html);
                //_CssTagIndex = 0;
                $(".HtmlSet").eq(0).removeClass(" d-none");
            }
            else {
                alert("取得資料錯誤");
            }
        },
        error: function (key, value) {
            alert("資料源連線中斷");
        }
    })

    $('#LeftShowDiv,#RightShowDiv').css('max-height', (parseInt(Height) + 3.5) + 'px')
    $('#LeftShowDiv,#RightShowDiv').css('max-width', (parseInt(Width) + 3.5) + 'px')

    var url = window.sessionStorage["PageUrl"].replace(/OoggoO/g, '/') + Width.padStart(3, '0') + Height.padStart(3, '0');
    Width += 'px';
    Height += 'px';
    $('#ShowPageIframe').css('height', Height)
    $('#ShowPageIframe').css('width', Width)
    $('#ShowPageIframe').attr("scrolling", "no")
    $('#ShowPageIframe').attr("src", url)
    $('#ErrWord').css('display', 'none')

    var iframe = document.getElementById("ShowPageIframe");
    iframe.onload = function () {
        var IframeHtml = iframe.contentWindow.document;
        //console.log(IframeHtml);
        IframeHtml.getElementsByTagName('html')[0].style.maxWidth = Width;
        IframeHtml.getElementsByTagName('html')[0].style.maxHeight = Height;
        IframeHtml.getElementsByTagName('html')[0].style.minWidth = Width;
        IframeHtml.getElementsByTagName('html')[0].style.minHeight = Height;
        IframeHtml.getElementsByTagName('html')[0].style.pointerEvents = 'none';
        $('.spinner-border').css('display', 'none')
        $('#ShowPageIframe').css('display', 'block')
    }
}

//CssTag向左移
function ChgCssTagLeft() {
    $(".ChgCssTagBtn").attr('disabled', true);
    var CssTagIndex = _CssTagIndex;

    if (_CssTagIndex == _CssTagCount - 1) {
        _CssTagIndex = 0;
        $(".HtmlCssSet").eq(_CssTagIndex).addClass("order-last");
    }
    else
        _CssTagIndex += 1;

    $(".HtmlCssSet").eq(_CssTagIndex).css("margin-left", "100%");
    $(".HtmlCssSet").eq(_CssTagIndex).removeClass("d-none");

    $('.HtmlCssSet').eq(CssTagIndex).animate({ marginLeft: "-100%" }, function () {
        $(".HtmlCssSet").eq(CssTagIndex).addClass("d-none");
        $(".HtmlCssSet").eq(_CssTagIndex).removeClass("order-last");
        $(".ChgCssTagBtn").attr('disabled', false);
    })
    $('.HtmlCssSet').eq(_CssTagIndex).animate({ marginLeft: "0" })

}
//CssTag向右移
function ChgCssTagRight() {
    $(".ChgCssTagBtn").attr('disabled', true);
    var CssTagIndex = _CssTagIndex;

    if (_CssTagIndex == 0) {
        _CssTagIndex = _CssTagCount - 1;
        $(".HtmlCssSet").eq(_CssTagIndex).addClass("order-first");
    }
    else
        _CssTagIndex -= 1;

    $(".HtmlCssSet").eq(_CssTagIndex).css("margin-left", "-100%");
    $(".HtmlCssSet").eq(_CssTagIndex).removeClass("d-none");

    $('.HtmlCssSet').eq(CssTagIndex).animate({ marginLeft: "100%" }, function () {
        $(".HtmlCssSet").eq(CssTagIndex).addClass("d-none");
        $(".HtmlCssSet").eq(_CssTagIndex).removeClass("order-first");
        $(".ChgCssTagBtn").attr('disabled', false);
    })
    $('.HtmlCssSet').eq(_CssTagIndex).animate({ marginLeft: "0" })
}

//特殊事件
function Fake(ID) {
    if (window.sessionStorage["HtmlSetData"]!=null)
        eval(JSON.parse(window.sessionStorage["HtmlSetData"]).filter((item) => { return item.Id === ID; }).map((item) => (item.Js)).toString())
}