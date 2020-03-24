<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Menu.ascx.cs" Inherits="WebFrom.Aspx.Menu" %>

<style type="text/css">
    form, #Menu {
        padding: 0;
        background-image: url('Image/b4.jpg');
        background-size: 100% 220px;
        height: 220px;
        width: 100%;
    }

    #Architecture {
        height: 50%;
    }

    .Architecture-btn {
        height: 38px;
        font-weight: bold;
        border: 2px solid;
        margin-left: 5px;
        border-color: black;
    }
    .btn font {
        vertical-align:initial !important;
    }

    .DivPage {
        position: relative;
        height: 25%;
    }

    #DivSize {
        height: 0%;
        display: none;
        background-color: #009FCC;
    }

    .ResolutionBtn {
        position: relative;
        height: 32px;
        font-weight: bold;
        border: 2px solid;
        border-color: black;
        font-size: 12px;
    }

    #PageDropdown {
        height: 38px;
        font-weight: bold;
        margin-left:10px;
    }

    #DropdownMenuButton {
        width: 103px;
        height: 38px;
        font-size: 16px;
        border: 2px solid;
        font-weight: bold;
        padding-right: 1px;
    }

    .DropdownItem {
        border-bottom: 1px solid #ccc;
    }

    #Resolution {
        padding: 0.3rem
    }

    .dropdown-item {
        height: 30px;
        padding-top: 0px;
    }

        .dropdown-item:hover {
            background-color: #FF7744;
        }

    .DivResolution {
        position: relative;
        width: 90px;
        top: 13px;
        display: inline-block;
    }
    @media screen and (max-width: 480px) {
        #DropdownMenuButton, #PageDropdown {
            height: 32px;
            font-size: 12px;
            width: 90px;
            padding-left: 2px;
        }
        #DivSize .col-8 {
            padding-left: 25px;      
            padding-right: 0;
        }

        .PageDropdownDivClass.justify-content-end {
            justify-content:initial !important;
        }
    }
</style>
<div id="Menu">
    <div id="Architecture" class="row justify-content-center align-items-center">
        <button class="Architecture-btn btn btn-outline-info" onclick="SetArchitecture('MVC','<%=ConfigurationManager.AppSettings["CoreApiServiceUrl"] %>')" id="MVC">Mvc架構網頁</button>
        <button class="Architecture-btn btn btn-outline-info" onclick="SetArchitecture('VUE','<%=ConfigurationManager.AppSettings["CoreApiServiceUrl"] %>')" id="VUE">Vue.Cli架構網頁</button>
    </div>
    <div id="DivPage" class="DivPage row justify-content-center">
    </div>
    <div id="DivSize">
        <div class="row h-100">
            <div class="col-4 col-sm-6 row">
                <div class="col-2 col-sm-6  row justify-content-center align-items-center">
                    <button type="button" onclick="ShowResolution()" class="ResolutionBtn btn btn-primary d-none d-sm-block">顯示螢幕比例</button>
                    <a href="javascript:ShowResolution()" class="d-block d-sm-none ml-2" data-toggle="tooltip" data-placement="bottom" title="顯示當前畫面比例">
                        <img width="36" height="36" src="http://114.32.54.227/DTW_Business/Image/Icon/Tablet.svg" />
                    </a>
                </div>
                <div class="PageDropdownDivClass col-10 col-sm-6 row justify-content-end align-items-center">
                    <div id="PageDropdown" class=" dropdown">
                        <button class="btn btn-warning dropdown-toggle" type="button" id="DropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            選擇比例
                        </button>
                        <div id="Resolution" class="dropdown-menu" aria-labelledby="DropdownMenuButton"></div>
                    </div>
                </div>
            </div>
            <div class="col-8 col-sm-6">
                <div class="DivResolution">
                    <span style="font-weight: bold;">寬：</span>
                    <input id="Width" type="text" class="ResolutionText text-center" maxlength="3" style="ime-mode: disabled; width: 45px;" onkeyup="return ValidateNumber(this,value)" onblur="SetResolution()" disabled/>
                </div>
                <div class="DivResolution">
                    <span style="font-weight: bold;">高：</span>
                    <input id="Height" type="text" class="ResolutionText text-center" maxlength="3" style="ime-mode: disabled; width: 45px;" onkeyup="return ValidateNumber(this,value)" onblur="SetResolution()" disabled/>

                </div>
            </div>
        </div>
    </div>
</div>
