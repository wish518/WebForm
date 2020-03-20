$(document).ready(function () {
    $(".dropdown-toggle").dropdown();
    $('[data-toggle="tooltip"]').tooltip();
});
//選取網站選項時
function SetArchitecture(id) {
    $('#DivSize').css('display', 'none');
    $('.Architecture-btn').removeClass('btn-info');
    $('.Architecture-btn').addClass('btn-outline-info');

    $("#" + id).removeClass('btn-outline-info');
    $("#" + id).addClass('btn-info');

    $.post("http://114.32.54.227:3000/CoreAPI/Api/GetPageData", { PageArchitecture: id },
        function (result) {
            //console.log(result);
            if (result.IS_Error == "N") {
                var html = "";
                var htm2 = "";
                result.Data.PageDataList.forEach(function (item) {
                    var url = item.RwdUrl.replace(/\//g, 'OoggoO');
                    html += '<Button class="Architecture-btn PageBtn btn btn-outline-success" onclick=ShowDivSize(event,"' + window.location.origin + url + '")>'
                        + item.PageName + '</Button> '
                })
                $('#DivPage').html(html);
                result.Data.DropDownData.forEach(function (item, index) {
                    var _class = "DropdownItem";
                    if (index === result.Data.DropDownData.length - 1)
                        _class = "FinalDropdownItem";

                    var Text = item.Text.replace(/ /, '&nbsp;');
                    htm2 += ' <button class="dropdown-item ' + _class + '" type="button" onclick=GetResolution("' + item.Value + '","' + Text + '")>' + Text+ '</button> '
                })
                window.sessionStorage["ResolutionData"] = JSON.stringify(result.Data.DropDownData);
                $('#Resolution').html(htm2);
            }
            return;
        }).fail(function () {
            alert("取得資料錯誤");
        });
}
//選取網頁選項時
function ShowDivSize(e, PageUrl) {
    $(".PageBtn").removeClass('btn-success');
    $(".PageBtn").addClass('btn-outline-success');

    $(e.target).removeClass('btn-outline-success');
    $(e.target).addClass('btn-success');

    $('#DivSize').css('display', 'block');
    $('#DivSize').animate({ height: '25%' })
    window.sessionStorage["PageUrl"] = PageUrl;
}
//顯示螢幕比例
function ShowResolution() {
    alert("寬:" + window.innerWidth + "px 高:" + window.innerHeight);
}
//選取比例時
function GetResolution(Value,Text) {
    $('#Width').val('');
    $('#Height').val('');
    $('#DropdownMenuButton')[0].innerText =Text;
    if (Value == 0 )
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

    $('#LeftShowDiv').css('max-height', (parseInt(Height) + 3.5) + 'px')
    $('#LeftShowDiv').css('max-width', (parseInt(Width) + 3.5) + 'px')

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
        console.log(IframeHtml);
        IframeHtml.getElementsByTagName('html')[0].style.maxWidth = Width;
        IframeHtml.getElementsByTagName('html')[0].style.maxHeight = Height;
        IframeHtml.getElementsByTagName('html')[0].style.minWidth = Width;
        IframeHtml.getElementsByTagName('html')[0].style.minHeight = Height;
        IframeHtml.getElementsByTagName('html')[0].style.pointerEvents = 'none';
        $('.spinner-border').css('display', 'none')
        $('#ShowPageIframe').css('display', 'block')
    }
}