<%@ Page Async="true" Title="東方後台" Language="C#" AutoEventWireup="true" MasterPageFile="./Rwd.Master" CodeBehind="Rwd.aspx.cs" Inherits="WebFrom.Aspx.Rwd" %>



<asp:Content ContentPlaceHolderID="Content" runat="server">

    <style type="text/css">
        #Content {
            padding: 0;
            background-image: url('Image/b1.jpg');
            background-size: cover;
            height: 100%;
            width: 100%;
        }

        .ShowPage {
            display: none;
            position: relative;
            height: 70%;
            padding: 0;
        }

        #ShowPageIframe {
            position: relative;
            width: 100%;
            height: 100%;
            border: solid 2px;
        }

        #LeftShowDiv {
            position: relative;
            width: 95%;
            height: 100%;
            overflow: auto;
            top: 20px;
            /*margin: auto auto;*/
        }
        #RightShowDiv {
            position: relative;
            width: 95%;
            height: 100%;
            top: 20px;
        }

        #ChgCssTag {
            background-color: #B088FF;
            opacity: 0.7;
            height: 8%;
        }

        #CssTag {
            border-radius: 10%;
            background-color: #FFBB66;
            height: 80%;
            overflow: hidden;
        }

        #SetCssTag {
            height: 8%;
        }

        @media screen and (max-height: 812px) {
            #LeftShowDiv,#RightShowDiv {
                height: 90%;
            }
        }

        @media screen and (max-height: 680px) {
            #LeftShowDiv,#RightShowDiv {
                height: 77%;
            }
        }
    </style>
    <div id="Content" class="row">
        <div id="ErrWord" style="color: red; white-space: pre; display: none">
            <strong>目前 自定義寬度不可超過950</strong><br />
            <strong>自定義長度不可超過812</strong>
        </div>

        <div class="col-12 col-sm-6 ShowPage row justify-content-center text-center">
            <div id="LeftShowDiv">
                <div class="spinner-border text-danger" style="margin-top: 25%; width: 3rem; height: 3rem;" role="status"></div>

                <iframe id="ShowPageIframe" ></iframe>
            </div>
        </div>

        <div class="col-12 col-sm-6 ShowPage row pr-2 justify-content-center align-items-start">
            <div id="RightShowDiv">
                <div id="ChgCssTag" class="col-12 mb-1 row justify-content-center align-items-center border border-danger">
                    <button type="button" class="ChgCssTagBtn btn btn-secondary h-100 h4" onclick="ChgCssTagLeft()">&LeftTriangleEqual;</button>
                    <div id="CssTag" class="rounded-pill w-50 mt-n1 border border-secondary "></div>
                    <button type="button" class="ChgCssTagBtn btn btn-secondary h-100 h4" onclick="ChgCssTagRight()">&RightTriangleEqual;</button>
                </div>

                <div id="GetCssTag" class="col-12  border border-secondary mt-2 p-0" style="height: 81%">
                    <div id="HtmlSetDiv" class="col-12 row border border-secondary">
                        <div id="HtmlSetDescribe" class="col  border border-secondary"></div>
                        <div id="HtmlSetHtml" class="col-9  border border-secondary"></div>
                    </div>

                    <div id="HtmlCssSet" class="col-12 row border border-secondary"></div>
                </div>
                <div id="SetCssTag" class="col-12 row justify-content-center align-items-center border border-secondary mt-2"></div>
            </div>
        </div>
    </div>
</asp:Content>
