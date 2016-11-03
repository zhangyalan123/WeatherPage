/**
 * Created by Administrator on 2016/9/3.
 */
var dom = null;
var code = null;
$(function () {
    $.ajax({
        type:'get',
        url:'city.xml',
        dateType: 'xml',
        success:function (date) {
            dom = date;
            // console.log(date);
            $(date).find('province').each(function (k,v) {
                var name = $(this).attr('name');
                var id   = $(this).attr('id');
                // console.log(name,id);
                var option = '<option value="'+ id  +'">' + name + '</option>';
                $('#province').append(option);
            });
        },
        error:function () {
            console.log("错误");
        }
    })
})
function showCity() {

    $("#city").empty();
    var provinceValue = $('#province option:selected').val();

    $(dom).find('city[id^='+ provinceValue +']').each(function () {
        var cityID = $(this).attr('id');
        var cityName = $(this).attr('name');
        // console.log(cityID,cityName);
        var option = '<option value="'+ cityID  +'">' + cityName + '</option>';
        $("#city").append(option);


    });
    showArea();
}

function showArea() {

    $("#area").empty();
    var cityValue = $('#city option:selected').val();

    $(dom).find('county[id^='+ cityValue +']').each(function () {
        var areaID = $(this).attr('id');
        var areaName = $(this).attr('name');
        code = $(this).attr('weatherCode');
        // console.log(areaID,areaName,code);
        var option = '<option value="'+ areaID  +'">' + areaName + '</option>';
        $("#area").append(option);

    });
    showWeather();
}




function weather(data) {
    console.log(data);
    var wea = data.weather;
    var showInfo = $('#showInfo');
    showInfo.html('');

    for (var i = 0; i< wea.length; i++){
        var date = wea[i].date; //日期

        var day = wea[i].info.day; //白天的信息
        var we = null;
        if (day[1] == '晴'){
            we = 'sunny';
        }else if(day[1] == "多云"){
            we = 'cloudy';
        }else if(day[1] == "雷阵雨"){
            we = 'stormy';
        }else {
            we = 'rainy';
        }

        var night = wea[i].info.night; //晚上的信息


        var tag = '<ul class="box">';
        tag += '<li>'+date+'(白天)</li>';
        tag += '<li class=" ' + we +'"></li>';
        tag += '<li style="margin-top:170px;">'+ day[1]+'</li>';
        tag += '<li>'+ day[2]+'</li>';
        tag += '<li>'+ day[3]+'</li>';
        tag += '<li>'+ day[4]+'</li>';

        tag += '<li>晚上</li>';
        tag += '<li class="starry" style="margin-top:280px;"></li>';
        tag += '<li style="margin-top:170px;">'+ night[1]+'</li>';
        tag += '<li>'+ night[2]+'</li>';
        tag += '<li>'+ night[3]+'</li>';
        tag += '<li>'+ night[4]+'</li></ul>';

        showInfo.append('<div style="float: left">' + tag+'</div>');
    }


}

function showWeather() {
    var url = 'http://cdn.weather.hao.360.cn/api_weather_info.php?app=hao360&_jsonp=weather&code='+code;
    $('body').before('<script src="'+ url  +  '"></script>' );
}