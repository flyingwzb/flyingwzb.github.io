/*打赏js*/
(function($){
    var id = Date.now();
    if($("#STYLE_"+id).size()<1){
        document.writeln("<style id='STYLE_"+id+"'>@CHARSET \"UTF-8\";*{-webkit-tap-highlight-color:rgba(255,0,0,0)}.box-size{box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box}.ds-hide{display:none}.ds-reward-stl{font-family:\"microsoft yahei\";text-align:center;background:#f1f1f1;padding:10px 0;color:#666;margin:20px auto;width:90%}#dsRewardBtn {padding: 0;margin: 0;position: absolute;background: #7ab951;left: 110px;top: -7px;width: 50px;height: 50px;font-size: 16px;font-weight: 600;line-height: 43px;display: block;border: 4px solid #fff;border-radius: 40px;color: #FFF;}#dsRewardBtn span{display:inline-block;width:50px;height:50px;border-radius:100%;line-height:58px;color:#fff;font:400 25px/50px 'microsoft yahei';background:#FEC22C}#dsRewardBtn:hover{cursor:pointer}.ds-dialog{z-index:9999;width:100%;height:100%;position:fixed;top:0;left:0;border:1px solid #d9d9d9}.ds-dialog .ds-close-dialog{position:absolute;top:15px;right:20px;font:400 24px/24px Arial;width:20px;height:20px;text-align:center;padding:0;cursor:pointer;background:transparent;border:0;-webkit-appearance:none;font-weight:700;line-height:20px;opacity:.6;filter:alpha(opacity=20)}.ds-dialog .ds-close-dialog:hover{color:#000;text-decoration:none;cursor:pointer;opacity:.6;filter:alpha(opacity=40)}.ds-dialog-bg{position:absolute;opacity:.6;filter:alpha(opacity=30);background:#000;z-index:9999;left:0;top:0;width:100%;height:100%}.ds-dialog-content{font-family:'microsoft yahei';font-size:14px;background-color:#FFF;position:fixed;padding:0 20px;z-index:10000;overflow:hidden;border-radius:6px;-webkit-box-shadow:0 3px 7px rgba(0,0,0,.3);-moz-box-shadow:0 3px 7px rgba(0,0,0,.3);box-shadow:0 3px 7px rgba(0,0,0,.3);-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.ds-dialog-pc{width:390px;height:380px;top:50%;left:50%;margin:-190px 0 0 -195px}.ds-dialog-wx{width:90%;height:280px;top:50%;margin-top:-140px;margin-left:5%}.ds-dialog-content h5{text-align:left;font-size:15px;font-weight:700;margin:15px 0;color:#555}.ds-payment-way{text-align:left}.ds-payment-way label{cursor:pointer;font-weight:400;display:inline-block;font-size:14px;margin:0 15px 0 0;padding:0}.ds-payment-way input[type=radio]{vertical-align:middle;margin:-2px 5px 0 0}.ds-payment-img{margin:15px 0;text-align:center}p.ds-pay-info{font-size:15px;margin:0 0 10px}.ds-pay-money{font-size:14px;margin-top:10px}.ds-pay-money p{margin:0}.ds-pay-money .ds-pay-money-sum{margin-bottom:4px}.ds-payment-img img{margin:0 auto;width:185px;}.ds-payment-img #qrCode_1{display:none}.ds-payment-img .qrcode-border{margin:0 auto}.ds-payment-img .qrcode-tip{width:48.13px;position:relative;margin:0 auto;font-size:12px;font-weight:700;background:#fff;height:15px;line-height:15px;margin-top:-12px}#qrCode_0 .qrcode-tip{color:#3caf36}#qrCode_3 .qrcode-tip{color:#e10602}.ds-payment-img #qrCode_3{display:none}.ds-payment-img #qrCode_2{display:none}#qrCode_2 .qrcode-tip{color:#eb5f01}#qrCode_1 .qrcode-tip{color:#6699cc}.wx_qrcode_container{text-align:center}.wx_qrcode_container h2{font-size:17px}.wx_qrcode_container p{font-size:14px}.ds-reward-stl{text-align:left;background:#fff;padding:0;color:#666;margin:0;width:0}#dsRewardBtn span{position:absolute;left:115px;top:-7px;background:#7ab951;width:50px;height:50px;font-size:16px;font-weight:600;line-height:43px;border:4px solid #fff;border-radius:40px}.share-s a{margin-top:-25px} .ds-payment-img .qrcode-border{border-radius: 29.97px; width: 236.89px; height: 236.89px; padding: 18.05px; margin-top: 25.53px; } </style>");
    }
    function write(){
        var content = "<div class=\"ds-dialog\" id='PAY_"+id+"'>"
            +"   <div class=\"ds-dialog-bg\" onclick=\"PaymentUtils.hide();\"></div>"
            +"   <div class=\"ds-dialog-content ds-dialog-pc \">"
            +"    <i class=\"ds-close-dialog\">&times;</i>"
            +"    <h5>选择打赏方式：</h5>"
            +"    <div class=\"ds-payment-way\">"
            +"     <label for=\"wechat\"><input type=\"radio\" id=\"wechat\" class=\"reward-radio\" value=\"0\" checked=\"checked\" name=\"reward-way\" />微信红包</label>"
            + "     <label for=\"qqqb\"><input type=\"radio\" id=\"qqqb\" class=\"reward-radio\" value=\"1\" name=\"reward-way\" />QQ钱包</label>"
            +"     <label for=\"alipay\"><input type=\"radio\" id=\"alipay\" class=\"reward-radio\" value=\"2\" name=\"reward-way\" />支付宝</label>"
            + "     <label for=\"bdBaifubao\"><input type=\"radio\" id=\"bdBaifubao\" class=\"reward-radio\" value=\"3\" name=\"reward-way\" />百度钱包</label>"
            + "    </div>"
            + "    <div class=\"ds-payment-img\">"
            + "     <div class=\"qrcode-img qrCode_0\" id=\"qrCode_0\">"
            + "      <div class=\"qrcode-border box-size\" style=\"border: 9.02px solid rgb(60, 175, 54\">"
            + "       <img  class=\"qrcode-img qrCode_0\" id=\"qrCode_0\" src=\"https://github.com/flyingwzb/flyingwzb.github.io/blob/master/img/willwang/wxpay.png?raw=true\" />"
            + "      </div>"
            + "      <p class=\"qrcode-tip\">打赏</p>"
            + "     </div>"

            + "     <div class=\"qrcode-img qrCode_1\" id=\"qrCode_1\">"
            + "      <div class=\"qrcode-border box-size\" style=\"border: 9.02px solid rgb(102, 153, 204\">"
            + "       <img  class=\"qrcode-img qrCode_1\" id=\"qrCode_1\" src=\"http://res.zgboke.com/wp-content/themes/begin/img/qqqb.png\" />"
            + "      </div>"
            + "      <p class=\"qrcode-tip\">打赏</p>"
            + "     </div>"
            + "     <div class=\"qrcode-img qrCode_2\" id=\"qrCode_2\">"
            + "      <div class=\"qrcode-border box-size\" style=\"border: 9.02px solid rgb(235, 95, 1\">"
            + "       <img  class=\"qrcode-img qrCode_2\" id=\"qrCode_2\" src=\"https://github.com/flyingwzb/flyingwzb.github.io/blob/master/img/willwang/Alipay.jpg?raw=true\" />"
            + "      </div>"
            + "      <p class=\"qrcode-tip\">打赏</p>"
            + "     </div>"
            + "     <div class=\"qrcode-img qrCode_3\" id=\"qrCode_3\">"
            + "      <div class=\"qrcode-border box-size\" style=\"border: 9.02px solid rgb(225, 6, 2\">"
            + "         <img  class=\"qrcode-img qrCode_3\" id=\"qrCode_3\" src=\"http://res.zgboke.com/wp-content/themes/begin/img/bdqb.png \" />"
            + "      </div>"
            + "      <p class=\"qrcode-tip\">打赏</p>"
            + "     </div>"
            + "    </div>"
            + "   </div>"
            + "  </div> ";
        $("body").append(content);
    }
    $(function(){
        write();
        var $pay = $("#PAY_"+id).hide();
        $pay.find(".ds-payment-way").bind("click",function(){
            $pay.find(".qrcode-img").hide();
            $pay.find(".qrCode_"+$pay.find("input[name=reward-way]:checked").val()).show();
        });
        $pay.find(".ds-close-dialog").bind("click",function(){
            $pay.hide();
        });
    });
    var PaymentUtils = window['PaymentUtils']={};
    PaymentUtils.show=function(){
        $("#PAY_"+id).show();
    }
    PaymentUtils.hide=function(){
        $("#PAY_"+id).hide();
    }
})(jQuery);