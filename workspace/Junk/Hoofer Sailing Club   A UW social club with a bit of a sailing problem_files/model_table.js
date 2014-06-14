/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
//
//  Global vars
//
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////
// constants
////////////////////////////////////
var weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

var weekdayShort = new Array(7);
weekdayShort[0] = "Sun";
weekdayShort[1] = "Mon";
weekdayShort[2] = "Tue";
weekdayShort[3] = "Wed";
weekdayShort[4] = "Thu";
weekdayShort[5] = "Fri";
weekdayShort[6] = "Sat";

var months = new Array(12);
months[0] = "January";
months[1] = "February";
months[2] = "March";
months[3] = "April";
months[4] = "May";
months[5] = "June";
months[6] = "July";
months[7] = "August";
months[8] = "September";
months[9] = "October";
months[10] = "November";
months[11] = "December";

var monthsShort = new Array(12);
monthsShort[0] = "Jan";
monthsShort[1] = "Feb";
monthsShort[2] = "Mar";
monthsShort[3] = "Apr";
monthsShort[4] = "May";
monthsShort[5] = "Jun";
monthsShort[6] = "Jul";
monthsShort[7] = "Aug";
monthsShort[8] = "Sep";
monthsShort[9] = "Oct";
monthsShort[10] = "Nov";
monthsShort[11] = "Dec";

var fillColorsWind = new Array();
fillColorsWind = [
	"#FFFFFF", "#CBCBFF", "#D0FCFA", "#8AF8F4", "#82F8C1",
	"#26FC59", "#00FF00", "#78F700", "#EBF100", "#FFCA09",
	"#FF9617", "#FF3C12", "#FF0000", "#7F0000", "#920011",
	"#A60027", "#BA0041", "#CD0060", "#E00084", "#E000AC"
];

var fillColorsTemp = new Array();
fillColorsTemp = [
	"#0000E1", "#000FE1", "#0021E1", "#0031EB", "#0041F6",
	"#004DF1", "#005AEB", "#0067E5", "#0074DF", "#0085D3",
	"#0098C7", "#00ADBB", "#00C2AF", "#00D2A3", "#3CDD6E",
	"#64E83C", "#8CF41E", "#B5FF0A", "#C6FF07", "#D7FF03",
	"#FFFF00", "#FFF000", "#FFE400", "#FFD200", "#FFC100",
	"#FFB000", "#FF9E00", "#FF8C00", "#FF7B00", "#FF6A00",
	"#FF5900", "#FF4800", "#FF3600", "#FF2500", "#FF1300",
	"#F80A00", "#EF0000", "#DE0000", "#CD0000", "#BB0000"
];





///////////////////////////////////
// non-constant
//////////////////////////////////

/////////////////////////////////
// Data Storage
var modelDataNewOnModelId = -1;
var modelDataSelectedModelIds = new Array();
modelDataSelectedModelIds.push(-1);  // set the default load to Quicklook
var modelDataLoadedModelIds = new Array();
var modelDataAllModelIds = new Array();  // need to keep track of all ids for Select All.  Can't seem to use .val() for <select> when using this multiselect jquery plugin.

var modelDataById = new Array();  // modelDatasById[model_id][modelData]
var modelData = new Array();       // modelData[short_time-hour][value,value,value,value...]
var modelDataModelNames = new Array()  //modelDataModelNames[model_id]"name"
var modelDataModelColors = new Array()  //modelDataModelColors[model_id]"color"
var modelDataModelHourInterval = new Array()  //modelDataModelHourInterval[model_id]interval
var modelDataModelRowCount = new Array()  //modelDataModelRowCount[model_id]count
var modelDataHourLabelsBestFit = new Array(); //modelDataHourLabels[model_id][0,3,6,9,12,15,18,21]  // best fit hours
var modelDataShortDateLabelsBestFit = new Array();  //modelDataShortDateLabels[model_id]["short date", "short date"]
var modelDataModelHasWave = new Array()  //modelDataModelHasWave[modelName]false
var modelDataModelHasGenWeather = new Array()  //modelDataModelHasGenWeather[modelName]false
var modelDataModelMaxWind = new Array()  //modelDataModelMaxWind[modelName]maxSpeed
var modelDataModelMaxWaveHeight = new Array()  //modelDataModelMaxWaveHeight[modelName]maxHeight
var modelDataModelHasGust = new Array()  //modelDataModelHasGust[modelName]false

var modelDataShortDateLabelsCompare = new Array();  // holds the 7 day labels - calculated using the data in the first model loaded
var modelDataHourLabelsCompare = [0,3,6,9,12,15,18,21];  //this is changed when a 3 hour model is loaded
var modelDataHourLabelsFinal = false; // used to only set modelDataHourLabelsCompare one time 

var modelDataPopupOn = new Array(); //modelDataPopupOn[shortDateLabel]true/false
var modelDataPopupOnById = new Array(); //modelDataPopupOnById[modelId]true/false
var modelDataPopupOnSelectedDateById = new Array(); //modelDataPopupOnById[modelId]shortDateLabel
var modelDataPopupOnSelectedColIndexById = new Array(); //modelDataPopupOnSelectedColIndexById[modelId]colIndex




var modelDataTableModelId = -1;



/////////////////////////////////
// Units
//if(unitsWind == undefined || unitsWind == null){
//	unitsWind = "mph";
//}
//if(unitsTemp == undefined || unitsTemp == null){
//	unitsTemp = "F";
//}
//if(unitsHeight == undefined || unitsHeight == null){
//	unitsHeight = "ft";
//}
var unitsPres = "MB";
var modelName = "";


// other
var mode = "bestfit";    //[bestfit,compare]
var showAdditionalData = false;
var demoMode = false;
var modelDataWaveData = false;
var modelDataGenWeatherData = false;
var modelDataStartOfModelReached = false;
var modelDataEndOfModelReached = false;
var numDays = 4;
var modelDataHourInterval = 0;
var dataRecordCount = 24 / modelDataHourInterval * numDays;


// contentHeight already in scope
// set some initial heights.  will change these later
//var dateRowHeight = 12;
//var hourRowHeight = 10;
//var windRowHeight = 70;
//var genRowHeight = 30;
//var tempRowHeight = 10;
//var waveRowHeight = 70;
var dateRowHeight = 0;
var hourRowHeight = 0;
var windRowHeight = 0;
var windGustRowHeight = 0;
var genRowHeight = 0;
var tempRowHeight = 0;
var waveRowHeight = 0;

var windSpeedFloorFactor = 1;  // windHeight = (windSpeed*2)/windSpeedFloorFactor
var windSpeedHeightBooster = 0;  //  windSpeedHeightBooster = windRowCalculatedHeight - windRowMinHeight  - help fill the wind area
var maxWindSpeedMph = 0;

var waveHeightFloorFactor = 1;  // waveDivHeight = (aveHeight*2)/waveHeightFloorFactor
var maxWaveHeightFt = 0;



// widgetLayout already in scope [wide{default), tall]  will not be undefined or another value








////////////////////////////////
//Main
////////////////////////////////
//$(document).ready(function () {
//    buildModelDataTable();
//});










/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
//
//  Popup Display
//
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////
// Main Control
//
//     make rest ajax request to get model data if it is not already local
//     create a string will all presentation code
//     put the presentation code into the content div
//////////////////////////////////////////////

function buildModelDataTable() {
    var stopSkippingOldData = false;
    
    // load model data if it is not already loaded
    if (!isModelIdInModelDataLoadedArray(modelDataNewOnModelId)) {
        modelDataLoadedModelIds.push(modelDataNewOnModelId);

        modelData = new Array();
        $('#model-data-table-content').empty();
        $('#model-data-table-content-detail').empty();

        if (widgetSpotId != null && widgetSpotId != "" && widgetSpotId > 0) {
            //url = "http://" + currentCondServer + "/wxengine/rest/model/getModelDataBySpot?"
            url = "http://api.weatherflow.com/wxengine/rest/model/getModelDataBySpot?";
            //url = "http://staging.api.weatherflow.com/wxengine/rest/model/getModelDataBySpot?";
            var spotBit = "spot_id="+widgetSpotId;
        }
        else {
            //url = "http://" + currentCondServer + "/wxengine/rest/model/getModelDataByLatLon?"
            url = "http://api.weatherflow.com/wxengine/rest/model/getModelDataByLatLon?";
            //url = "http://staging.api.weatherflow.com/wxengine/rest/model/getModelDataByLatLon?";
            var spotBit = "lat="+widgetLat+"&lon="+widgetLon;
        }


        //url = "http://staging.api.weatherflow.com/wxengine/rest/model/getModelDataBySpot?"
                url = url + "model_id=" + modelDataNewOnModelId + "&" + spotBit + "&units_wind=" + unitsWind + "&units_temp=" + unitsTemp + "&format=json&wf_apikey="+widgetApiKey+"&wf_token="+widgetWfToken+"&v=1.1&callback=?"


                $.getJSON(url, function (modelDataSet) {
                    if (modelDataSet.status.status_code != 0) {
                        // $('#model-data-table-content').empty();
                        $('#model-data-table-content').append('<br><br><div align="center">Forecast model data currently not available for this spot.</div><br><br><br><br><br><br>');

                        //$('#model-data-table-content').empty();
                        $('#model-data-table-content').append('<br> ');
                    }
                    else {
                        // $('#model-data-table-content').empty();
                        // $('#model-data-table-content').append("  .... Loading  ....");
                        //wig $('#model-data-table-content').append("<br><br>");

                        // Vars
                        modelName = modelDataSet.model_name;
                        modelColor = modelDataSet.model_color;



                        //  0 date short "Tue, 6 Jul"
                        //  1 date long  "Tuesday, 6 July 2010"
                        //  2 time  "14:00"
                        //  3 hour  "14"
                        //  4 wind speed
                        //  5 wind dir
                        //  6 wind dir text
                        //  7 wind_color
                        //  8 temp
                        //  9 temp color
                        // 10 general weather icon
                        // 11 pressure
                        // 12 pressure color
                        // 13 precip icon
                        // 14 wave height  //ft
                        // 15 wave period  //s
                        // 16 wave dir
                        // 17 wave dir text
                        // 18 model run name  "12z"
                        // 19 model name  "QuickLook"
                        // 20 model color
                        // 21 cloud cover
                        // 22 total precip
                        // 23 precip type
                        // 24 wind gust
                        // 25 wind gust color
                        var lastShortDate = "";
                        var dayCount = 0;
                        var lastJsLocalModelTimeDate = new Date();

                        $.each(modelDataSet.model_data, function (i, model_data) {
                            var modelId = model_data.model_id;
                            var jsLocalModelTimeDate = getJsDateFromApiDateStr(model_data.model_time_local);
                            var shortDate = getModelDataShortDate(jsLocalModelTimeDate);
                            var hour = getModelDataHour(jsLocalModelTimeDate);
                            var modelDataKey = shortDate + "-" + hour;

                            // skip first data rows if the hour is in 21,22,23
                            if (hour < 12) {
                                stopSkippingOldData = true;
                            }


                            if (stopSkippingOldData) {
                                //var waveHeight = demoDataWaveHeight[i];
                                //var waveDir = demoDataWaveDir[i];
                                //var wavePeriod = demoDataWavePeriod[i];
                                //var waveDirTxt = directionDegToString(demoDataWaveDir[i]);
                                var hour = getValueOrNull(getModelDataHour(jsLocalModelTimeDate));
                                var shortDate = getModelDataShortDate(jsLocalModelTimeDate);
                                var waveHeight = getModelDataWaveHeight(model_data.wave_height);
                                var waveDir = getValueOrNull(model_data.wave_direction);
                                var wavePeriod = getValueOrNull(model_data.wave_period);
                                var waveDirTxt = getModelDataWaveDirText(model_data.wave_direction);
                                var modelRunName = getValueOrNull(model_data.model_run_name);
                                var modelColor = "#" + getValueOrNull(modelDataSet.model_color);
                                var cloudCover = getValueOrNull(model_data.cloud_cover);
                                var totalPrecip = getValueOrNull(model_data.total_precip);
                                var precipType = getValueOrNull(model_data.precip_type);
                                var genWeatherIcon = getGetWeatherIcon(cloudCover, precipType);
                                var windSpeed = getValueOrNull(model_data.wind_speed);
                                var windGust = getValueOrNull(model_data.wind_gust);

                                modelData[modelDataKey] = [shortDate,
                            getModelDataLongDate(jsLocalModelTimeDate),
                            getModelDataTime(jsLocalModelTimeDate),
                            hour,
                            getModelDataWind(model_data.wind_speed),
                            getModelDataWindDir(model_data.wind_dir),
                            getModelDataWindDirText(model_data.wind_dir),
                            getColorForWind(getModelDataWind(model_data.wind_speed), unitsWind),
                            getModelDataTemp(model_data.temp),
                            getColorForTemp(getModelDataTemp(model_data.temp), unitsTemp),
                            genWeatherIcon,
                            model_data.pres + "",
                            "purple",
                            "precip_1.gif",
                            waveHeight + "",
                            wavePeriod + "",
                            waveDir + "",
                            waveDirTxt,
                            modelRunName,
                            modelName,
                            modelColor,
                            cloudCover,
                            totalPrecip,
                            precipType,
                            windGust,
                            getColorForWind(getModelDataWind(windGust), unitsWind)];

                                // need to know what the short labels are for all 7 days
                                // just using the first one to set the start
                                if (modelDataShortDateLabelsCompare.length < 6) {
                                    setModelDataShortDateLabelsCompare(jsLocalModelTimeDate);
                                }
                                // set the short labels for the bestfit mode - only add the dates in the data
                                setModelDataShortDateLabelsBestFit(shortDate, modelId);


                                // need to know what the hour labels are based on the data
                                // the data interval is also set
                                if (modelDataModelHourInterval[modelName] == undefined && shortDate == lastShortDate) {
                                    setModelDataHourLabels(lastJsLocalModelTimeDate, jsLocalModelTimeDate, hour, modelId);
                                }

                                // set modelDataModelHasWave
                                if (modelDataModelHasWave[modelName] == undefined) {
                                    modelDataModelHasWave[modelName] = false;
                                }
                                else {
                                    if (waveHeight != undefined && waveHeight != null && waveHeight > 0) {
                                        modelDataModelHasWave[modelName] = true;
                                    }
                                }

                                // set modelDataModelHasGust
                              if (modelDataModelHasGust[modelName] == undefined) {
                                  modelDataModelHasGust[modelName] = false;
                              }
                              else {
                                  if (windGust != undefined && windGust != null && windGust > 0) {
                                      modelDataModelHasGust[modelName] = true;
                                  }
                              }

                                // set modelDataModelMaxWaveHeight 
                                // - only look at the days displayed in the widget 
                                // - only look at visible hours[0,3,6,9,12,15,18,21]
                                if(modelDataModelHasWave[modelName]){
                                    if(dayCount < numDays){
                                        if (waveHeight != undefined && waveHeight != null && waveHeight > 0) {
                                        	if(hour == 0 || hour == 3 || hour == 6 || hour == 9 || hour == 12 || hour == 15 || hour == 18 || hour == 21){
                                                if(modelDataModelMaxWaveHeight[modelName] == undefined){
                                                	modelDataModelMaxWaveHeight[modelName] = waveHeight;
                                                }
                                                else{
                                                	if(waveHeight > modelDataModelMaxWaveHeight[modelName]){
                                                		modelDataModelMaxWaveHeight[modelName] = waveHeight;
                                                	}
                                                }
                                        	}
                                        }
                                    }
                                }
                                

                                
                                
                                
                                
                                // set modelDataModelMaxWind 
                                // - only look at the days displayed in the widget 
                                // - only look at visible hours[0,3,6,9,12,15,18,21]
                                if(dayCount < numDays){
                                    if (windSpeed != undefined && windSpeed != null && windSpeed > 0) {
                                    	if(hour == 0 || hour == 3 || hour == 6 || hour == 9 || hour == 12 || hour == 15 || hour == 18 || hour == 21){
                                            if(modelDataModelMaxWind[modelName] == undefined){
                                            	modelDataModelMaxWind[modelName] = windSpeed;
                                            }
                                            else{
                                            	if(windSpeed > modelDataModelMaxWind[modelName]){
                                                	modelDataModelMaxWind[modelName] = windSpeed;
                                            	}
                                            }
                                    	}
                                    }
                                }


                                // set modelDataModelHasGenWeather
                                if (modelDataModelHasGenWeather[modelName] == undefined) {
                                    modelDataModelHasGenWeather[modelName] = false;
                                }
                                else {
                                    if (precipType != undefined && precipType != null) {
                                        modelDataModelHasGenWeather[modelName] = true;
                                    }
                                }

                                // add names to data
                                if (modelDataModelNames[modelName] == undefined) {
                                    modelDataModelNames[modelName] = modelName;
                                    modelDataModelColors[modelName] = "#" + modelColor;
                                }



                                if(lastShortDate != shortDate){
                                	dayCount += 1;
                                }
                                lastShortDate = shortDate;
                                
                                lastJsLocalModelTimeDate = jsLocalModelTimeDate;
                                modelDataModelRowCount[modelName] = i;
                            }
                        });

                        modelDataById[modelDataNewOnModelId + ""] = modelData;

                        var modelDataCodeStr = createTableStr("7", null, null);
                        //$('#model-data-table-content').empty();
                        $('#model-data-table-content').append(modelDataCodeStr);


                        // label
                        //modelDataPositionLabel(modelDataNewOnModelId, false);




                    }

                });

    }
    else {
        // didn't need to load new data.
        // just create with current selected array list
        var modelDataCodeStr = createTableStr("7", null, null);
        $('#model-data-table-content').empty();
        $('#model-data-table-content').append(modelDataCodeStr);

    }

    // display one day if they were active
    //          modelDataPopupOnById[modelId] = true;
    //          modelDataPopupOnSelectedDateById[modelId] = shortDateLabel;
    //          modelDataPopupOnSelectedColIndexById[modelId] = colIndex;
    //          modelDataDisplayOneDay(shortDateLabel, modelId, colIndex)
    if (modelDataPopupOnSelectedDateById != undefined && modelDataPopupOnSelectedDateById != null) {
        for (id in modelDataPopupOnSelectedDateById) {
            shortDateLabel = modelDataPopupOnSelectedDateById[id];
            colIndex = modelDataPopupOnSelectedColIndexById[id];
            var isReload = true;
            modelDataDisplayOneDay(shortDateLabel, id, colIndex, isReload);
        }
    }

}



// this function must be called after data is loaded into modelData
// many important global vars are initialized.
function setModelDataShortDateLabelsCompare(jsDate) {
    for (var i = 0; i < 7; i++) {
        var adjustedDate = new Date(jsDate.getTime() + (i * 86400000));
        modelDataShortDateLabelsCompare[i] = getModelDataShortDate(adjustedDate);
    }
    //$('#debug').append('<hr>jsDate =' + jsDate);
    //$('#debug').append('<br>setModelDataShortDateLabelsCompare were just set to ' + modelDataShortDateLabelsCompare.toString() + '<hr>');

}

function setModelDataShortDateLabelsBestFit(shortDate, modelName) {
    if (modelDataShortDateLabelsBestFit[modelName] == undefined) {
        modelDataShortDateLabelsBestFit[modelName] = [shortDate];
        //$('#debug').append('<br>modelDataShortDateLabelsBestFit added shortDate [' + modelId + '] =' + shortDate);

        //modelDataShortDateLabelsBestFit[modelId].push(shortDate);
    }
    else {
        // add this shortDate if it is not already in the array
        if (modelDataShortDateLabelsBestFit[modelName].toString().indexOf(shortDate) == -1) {
            modelDataShortDateLabelsBestFit[modelName].push(shortDate);
            //$('#debug').append('<br>modelDataShortDateLabelsBestFit added shortDate [' + modelId + '] =' + shortDate);
        }
    }
}

//this function must be called after data is loaded into modelData
//many important global vars are initialized.
function setModelDataHourLabels(firstJsDate, nextJsDate, hour, modelId) {
    var gapMs = nextJsDate.getTime() - firstJsDate.getTime();
    modelDataHourInterval = gapMs / (60 * 60 * 1000)

    // set the hour interval for this model
    modelDataModelHourInterval[modelName] = modelDataHourInterval;
    //$('#debug').append('<br>modelDataModelHourInterval[' + modelId + '] set to' + modelDataHourInterval);

    //modelDataHourLabelsCompare = ["0", "3", "6", "9", "12", "15", "18", "21"];
    modelDataHourLabelsBestFit[modelName] = ["0", "3", "6", "9", "12", "15", "18", "21"];
    if (modelDataHourInterval == 3) {
        if (hour == "1" || hour == "4" || hour == "7" || hour == "10" || hour == "13" || hour == "16" || hour == "19" || hour == "22") {
            modelDataHourLabelsCompare = ["1", "4", "7", "10", "13", "16", "19", "22"];
            modelDataHourLabelsBestFit[modelName] = ["1", "4", "7", "10", "13", "16", "19", "22"];
            modelDataHourLabelsFinal = true;
        }
        else if (hour == "2" || hour == "5" || hour == "8" || hour == "11" || hour == "14" || hour == "17" || hour == "20" || hour == "23") {
            modelDataHourLabelsCompare = ["2", "5", "8", "11", "14", "17", "20", "23"];
            modelDataHourLabelsBestFit[modelName] = ["2", "5", "8", "11", "14", "17", "20", "23"];
            modelDataHourLabelsFinal = true;
        }
    }
    else{
        modelDataHourLabelsBestFit[modelName] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
    }
    //$('#debug').append('<br>modelDataHourLabelsCompare set to' + modelDataHourLabelsCompare.toString());
    //$('#debug').append('<br>modelDataHourLabelsBestFit[' + modelId + '] set to' + modelDataHourLabelsBestFit[modelName].toString());
}










































function modelDataLoadModel() {
    modelDataHourLabels = new Array();
    modelDataShortDateLabels = new Array();
    modelDataWaveData = false;
    modelDataGenWeatherData = false;
    modelDataTableModelId = $("#model-data-model-select option:selected").val();
    modelDataNewOnModelId = $("#model-data-model-select option:selected").val();
    modelDataSelectedModelIds.push(modelDataNewOnModelId);
    buildModelDataTable();
}





//var modelDataNewOnModelId = -1;
//var modelDataSelectedModelIds = new Array();
//modelDataSelectedModelIds.push(-1);
//var modelDataLoadedModelIds = new Array();
//var modelDataAllModelIds = new Array();  // need to keep track of all ids for Select All.  Can't seem to use .val() for <select> when using this multiselect jquery plugin.
var modelDataAllModelsSelected = false;

function toggleModelIdInSelectedArrayModelData(modelId) {
    //modelDataHourLabels = new Array();
    //modelDataShortDateLabels = new Array();
    modelDataWaveData = false;
    modelDataGenWeatherData = false;
    modelDataNewOnModelId = modelId;

    if (modelId == "on") {
        //handle Select All toggle - "on" is passed each way
        if (modelDataAllModelIds.length != modelDataSelectedModelIds.length) {
            // turn on select all
            modelDataAllModelsSelected = true;
            modelDataSelectedModelIds = modelDataAllModelIds;
        }
        else {
            // turn off select all
            modelDataAllModelsSelected = false;
            modelDataSelectedModelIds = new Array();

        }
    }
    else {
        if (isModelIdInModelDataSelectedArray(modelId)) {
            //$("#debug").append("<br>removing modelId from modelDataSelectedModelIds -  modelId=" + modelId);
            //remove the id from the list

            // find the array index to remove
            var removeIndex = 0;
            for (var i = 0; i < modelDataSelectedModelIds.length; i++) {
                if (modelDataSelectedModelIds[i] == modelId) {
                    removeIndex = i;
                }
            }
            modelDataSelectedModelIds.splice(removeIndex, 1);
        }
        else {
            //$("#debug").append("<br>adding modelId to modelDataSelectedModelIds -  modelId=" + modelId);
            modelDataSelectedModelIds.push(modelId);
        }

        // keep list in nice order = same order as allModelIds
        //
        var modelDataSelectedModelIdsSortedTemp = new Array();
        var tempPosition = 0;
        // loop over all modelIds
        for (var i = 0; i < modelDataAllModelIds.length; i++) {
            // if the id is selected pull it out and put it in the temp array
            for (var j = 0; j < modelDataSelectedModelIds.length; j++) {
                if (modelDataSelectedModelIds[j] == modelDataAllModelIds[i]) {
                    // got one, add it
                    modelDataSelectedModelIdsSortedTemp[tempPosition] = modelDataSelectedModelIds[j];
                    tempPosition++;
                }
            }
        }
        modelDataSelectedModelIds = modelDataSelectedModelIdsSortedTemp;

    }

    // select the quicklook checkbox - it is always in the graph if no models are selected.
    if (modelDataSelectedModelIds.length == 0) {
        $("input[type='checkbox'][value='-1']").attr("checked", true); //select beta
        modelDataSelectedModelIds.push(-1);
    }
    else if (modelDataSelectedModelIds.length == 1) {
        if (modelDataSelectedModelIds[0] == -1) {
            //alert("Quicklook found in selectedIds, making sure it is checked");
            $("input[type='checkbox'][value='-1']").attr("checked", true); //select beta
        }
    }

}


//function modelDataChangeMode() {
//    mode = $("#model-data-mode-select option:selected").val();
//    buildModelDataTable();
//}

function toggleModeModelData(submittedModeValue) {
    if (submittedModeValue == mode) {
        // no loading
        // just make sure the checkbox stays checked
        $("input[type='checkbox'][value='" + submittedModeValue + "']").attr("checked", true);
    }
    else {
        // uncheck the current mode  (simulate radio button)
        $("input[type='checkbox'][value='" + mode + "']").attr("checked", false);

        // set mode to new value
        mode = submittedModeValue;

        // reload the view in the new mode
        buildModelDataTable();
    }
}

function toggleAdditionalData() {
    if (showAdditionalData) {
        showAdditionalData = false;
        buildModelDataTable();
    }
    else {
        showAdditionalData = true;
        buildModelDataTable();
    }
}





























/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
//
//  Writers
//
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
//var modelDataById = new Array();  // modelDatasById[model_id][modelData]
//var modelData = new Array();       // modelData[short_time-hour][value,value,value,value...]
//var modelDataModelNames = new Array()  //modelDataModelNames[model_id]"name"
//var modelDataModelColors = new Array()  //modelDataModelColors[model_id]"color"
//var modelDataModelHourInterval = new Array()  //modelDataModelHourInterval[model_id]interval
//var modelDataModelRowCount = new Array()  //modelDataModelRowCount[model_id]count
//var modelDataHourLabelsBestFit = new Array(); //modelDataHourLabels[model_id][0,3,6,9,12,15,18,21]  // best fit hours
//var modelDataShortDateLabelsBestFit = new Array();  //modelDataShortDateLabels[model_id]["short date", "short date"]

//var modelDataShortDateLabelsCompare = new Array();  // holds the 7 day labels - calculated using the data in the first model loaded
//var modelDataHourLabelsCompare = [0, 3, 6, 9, 12, 15, 18, 21];  //this is changed when a 3 hour model is loaded

// create the html for the table
function createTableStr(maxDays, shortDateLabelIn, modelNameIn) {
    var colLimit = 56;
    
 // contentHeight already in scope = widgetHeight - headerHeight - footerHeight
    contentHeight -= 10;
    if(modelDataModelHasWave["Quicklook"]){
    	// QuickLook has wave data
        dateRowHeight = Math.floor(contentHeight*.05);
        hourRowHeight = Math.floor(contentHeight*.05);
        windRowHeight = Math.floor(contentHeight*.36);
        windGustRowHeight = Math.floor(contentHeight*.08);
        genRowHeight = Math.floor(contentHeight*.10);
        tempRowHeight = Math.floor(contentHeight*.08);
        waveRowHeight = Math.floor(contentHeight*.28);
        
        if(windRowHeight < 75){
        	// too small - reset to a nice size
        	var dateRowHeight = 12;
        	var hourRowHeight = 10;
        	var windRowHeight = 76;
        	var windGustRowHeight = 12;
        	var genRowHeight = 20;
        	var tempRowHeight = 12;
        	var waveRowHeight = 56;
        }
    }
    else{
        dateRowHeight = Math.floor(contentHeight*.10);
        hourRowHeight = Math.floor(contentHeight*.10);
        windRowHeight = Math.floor(contentHeight*.50);
        windGustRowHeight = Math.floor(contentHeight*.10);
        genRowHeight = Math.floor(contentHeight*.10);
        tempRowHeight = Math.floor(contentHeight*.10);
        waveRowHeight = 0;

        if(windRowHeight < 70){
        	// too small - reset to a nice size
        	var dateRowHeight = 12;
        	var hourRowHeight = 10;
        	var windRowHeight = 70;
        	var windGustRowHeight = 12;
        	var genRowHeight = 20;
        	var tempRowHeight = 12;
        	var waveRowHeight = 0;
        }

    }
    
    
    // adjust height booster
//    if(windRowHeight > 80){
//    	windSpeedHeightBooster = windRowHeight - 80;
//    }

    // adjust wind speed floor if necessary
    // first convert max to mph if necessary - keeps graph height/color the same for all units
    maxWindSpeedMph = Math.round(modelDataModelMaxWind["Quicklook"]);
    if (unitsWind == "kph") {
    	maxWindSpeedMph = Math.round(convertKphToMph(maxWindSpeedMph));
    }
    else if (unitsWind == "kts") {
    	maxWindSpeedMph = Math.round(convertKtsToMph(maxWindSpeedMph));
    }
    else if (unitsWind == "mps") {
    	maxWindSpeedMph = Math.round(convertMpsToMph(maxWindSpeedMph));
    }
    
    windSpeedFloorFactor = 1;  // windHeight = (windSpeed*2)/windSpeedFloorFactor
    
    
    
    if(maxWindSpeedMph >= 21 && maxWindSpeedMph <= 40){
    	windSpeedFloorFactor = 2;
    }
    else if(maxWindSpeedMph >= 41 && maxWindSpeedMph <= 60){
    	windSpeedFloorFactor = 3;
    }
    else if(maxWindSpeedMph >= 61 && maxWindSpeedMph <= 80){
    	windSpeedFloorFactor = 4;
    }
    else if(maxWindSpeedMph >= 81 && maxWindSpeedMph <= 100){
    	windSpeedFloorFactor = 5;
    }
    else if(maxWindSpeedMph >= 101 && maxWindSpeedMph <= 120){
    	windSpeedFloorFactor = 6;
    }
    else if(maxWindSpeedMph >= 121 && maxWindSpeedMph <= 140){
    	windSpeedFloorFactor = 7;
    }
    else if(maxWindSpeedMph >= 141 && maxWindSpeedMph <= 160){
    	windSpeedFloorFactor = 8;
    }
    else if(maxWindSpeedMph >= 161 && maxWindSpeedMph <= 180){
    	windSpeedFloorFactor = 9;
    }
    else if(maxWindSpeedMph >= 181){
    	windSpeedFloorFactor = 10;
    }


    
    
    
    // adjust wave height floor if necessary
    // first convert max to ft if necessary - keeps graph height/color the same for all units
    maxWaveHeightFt = Math.round(modelDataModelMaxWaveHeight[0]);
    if (unitsHeight == "m") {
    	maxWaveHeightFt = Math.round(convertMtoFt(modelDataModelMaxWaveHeight[0]));
    }
    
    waveHeightFloorFactor = 1;  // 
    
    
    
    if(maxWaveHeightFt >= 11 && maxWaveHeightFt <= 20){
    	waveHeightFloorFactor = 2;
    }
    else if(maxWaveHeightFt >= 21 && maxWaveHeightFt <= 30){
    	waveHeightFloorFactor = 3;
    }
    else if(maxWaveHeightFt >= 31 && maxWaveHeightFt <= 40){
    	waveHeightFloorFactor = 4;
    }
    else if(maxWaveHeightFt >= 41 && maxWaveHeightFt <= 50){
    	waveHeightFloorFactor = 5;
    }
    else if(maxWaveHeightFt >= 51 && maxWaveHeightFt <= 60){
    	waveHeightFloorFactor = 6;
    }
    else if(maxWaveHeightFt >= 61 && maxWaveHeightFt <= 70){
    	waveHeightFloorFactor = 7;
    }
    else if(maxWaveHeightFt >= 71){
    	waveHeightFloorFactor = 8;
    }
    
    
    
    
    
    
    
    
    var modelIdLoop = new Array();
    // figure out what modelIds to loop over
    if (maxDays == 1 && modelNameIn != null) {
        modelIdLoop[0] = modelNameIn;
    }
    else {
        modelIdLoop = modelDataSelectedModelIds;
    }
    //$("#debug").append("<br>modelIdLoop=" + modelIdLoop.toString());

    var stringBuffer = "";

    for (var ii = 0; ii < modelIdLoop.length; ii++) {
        modelDataStartOfModelReached = false;
        modelDataEndOfModelReached = false;
        modelDataEndIndex = 200;
        var labelColSpans = [8,8,8,8,8,8,8];
        var modelId = modelIdLoop[ii] + "";

        var canExpand = false;
        if (modelDataModelRowCount[modelName] > 56 && modelDataModelHourInterval[modelName] == 1) {
            canExpand = true;
        }

        var modelDataEndOfDataTd = "<td class='model-data-end-of-data' onmouseover='javascript:displayModelEndPopup(event,"+modelId+");'>&nbsp;</td>";


        //$("#debug").append("<br>Creating table for modelId="+modelId);
        var modelDataForTable = new Array();
        modelDataForTable = modelDataById[modelId + ""];
        //$("#debug").append("<br>modelDataForTable.length=" + modelDataForTable.length);
        //$("#debug").append("<br>modelDataById[modelName].length=" + modelDataById["-1"].length);

        shortDateLabels = modelDataShortDateLabelsCompare;  //modelDataShortDateLabels;
        var hourLabels = modelDataHourLabelsCompare;  // modelDataHourLabels;

        //$('#debug').append('<br>shortDateLabels start = ' + shortDateLabels.toString());

        if (mode == "compare") {
            // already set as default
            //$("#debug").append("<br>Using compare mode");
        }
        else if (mode == "bestfit") {
            //$("#debug").append("<br>Using bestfit mode");
            //$("#debug").append("<br>data length = " + modelDataForTable.length);
            if (modelDataModelRowCount[modelId+""] <= 56) {
                shortDateLabels = modelDataShortDateLabelsBestFit[modelName];
                //$('#debug').append('<br>shortDateLabels set by <= 56 to ' + shortDateLabels.toString());
                hourLabels = modelDataHourLabelsBestFit[modelName];

                if (modelDataHourLabelsBestFit[modelName].length > 8) {
                    labelColSpans = [24, 24];
                }
                else {
                    labelColSpans = new Array();
                    for (i = 0; i < shortDateLabels.length; i++) {
                        labelColSpans.push(8);
                    }
                }
            }
        }

        
        // new section added for widget - set labelColSpans based on numDays
        if(numDays != null && numDays > 0){
            labelColSpans = new Array();
            for (i = 0; i < numDays; i++) {
                labelColSpans.push(8);
            }
        }
        

        /////////////////////////////////
        // Container and table start
        /////////////////////////////////
        var isOneDay = false;
        if (maxDays == 1 && modelNameIn != null) {
            isOneDay = true;
            //shortDateLabels[0] = shortDateLabel;


            key = shortDateLabelIn + "-0";
            if(modelDataForTable[key] == undefined){
                key = shortDateLabelIn + "-23";
            }
            longDateLabel = modelDataForTable[key][1];
            stringBuffer += "<div class='model-data-model-title-one-day' id='model-data-model-title-one-day-" + modelId + "'> " + longDateLabel + "<span style='float:right;'><a href='javascript:modelDataDisplayOneDay(\"" + shortDateLabelIn + "\",\"" + modelId + "\",\"-2\");' class='model-data-header-link-on'>X</a></span></div>"
            stringBuffer += "<div class='model-data-one-day-container'><table class='model-data-one-day' id='model-data-one-day-id-" + modelId + "' cellpadding=0 cellspacing=0 border=0 onmouseout='javascript:hideModelDataPopup();'>"
        }
        else {
//wig            stringBuffer += "<div class='model-data-model-title' id='model-data-model-title-"+modelId+"'><span style='background-color:" + modelDataModelColors[modelName] + "; width:15;'>&nbsp;&nbsp;&nbsp;</span> " + modelDataModelNames[modelName] + "</div>"
            stringBuffer += "<table class='model-data' id='model-data-id-" + modelId + "' cellpadding=0 cellspacing=0 border=0 onmouseout='javascript:hideModelDataPopup();'>"
        }


        /////////////////////////////////
        // header row
        /////////////////////////////////
        stringBuffer += "<tr class='model-data-header'>";
        stringBuffer += "<td class='model-data-label-td' style='height:"+dateRowHeight+"px'></td>";
//wig        if (maxDays == 7) {
//wig            if (modelDataModelHourInterval[modelName] == 1 && modelDataModelRowCount[modelId + ""] > 56) {
//wig                for (var i = 0; i < labelColSpans.length; i++) {
//wig                    stringBuffer += "<td colspan='" + labelColSpans[i] + "' class='model-data-content-td model-data-start-day-"+i+"' id='model-data-connect-top-" + i + "-" + modelId + "'><a class='model-data-header-link' id='model-data-header-link-" + i + "-" + modelId + "' href='javascript:modelDataDisplayOneDay(\"" + shortDateLabels[i] + "\",\"" + modelId + "\",\"" + i + "\");'>" + shortDateLabels[i] + "</a></td>";
//wig                }
//wig            }
//wig            else {
                for (var i = 0; i < labelColSpans.length; i++) {
                    stringBuffer += "<td colspan='" + labelColSpans[i] + "' class='model-data-content-td model-data-vert-middle-td model-data-start-day-" + i + "'>" + shortDateLabels[i] + "</td>";
                }
//wig            }
//wig        }
//wig        else {
//wig            labelColSpans = [24];
//wig            hourLabels = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];

//wig            var key = shortDateLabelIn + "-23";
//wig            //		$('#debug').append("key="+key);
//wig            if (modelDataForTable[key] == undefined) {
//wig                key = shortDateLabelIn + "-0";
//wig                longDateLabel = modelDataForTable[key][1];
//wig            }
//wig            else {
//wig                var longDateLabel = modelDataForTable[key][1];
//wig            }
//wig        }
        stringBuffer += "</tr>";


        /////////////////////////////////
        // hour row
        /////////////////////////////////
        stringBuffer += "<tr>";
        stringBuffer += "<td class='model-data-label-td' style='height:"+hourRowHeight+"px'>Hour</td>";
        for (var i = 0; i < labelColSpans.length; i++) {
            var oddDay = getOddDayBit(i);
            for (var j = 0; j < hourLabels.length; j++) {
                var dayStart = "";
                if (j == (hourLabels.length - 1)) {
                    dayStart = " model-data-start-day-"+i;
                }
                var key = shortDateLabels[i] + "-" + hourLabels[j];
                if (shortDateLabelIn != null) {
                    key = shortDateLabelIn;
                }
                var hour = hourLabels[j];
                if (maxDays == 1 && modelNameIn != null) {
                    hour = hourLabels[j] + ":00";
                }
//wig                if (canExpand) {
//wig                    stringBuffer += "<td class='model-data-content-td" + oddDay + dayStart + "' onclick='javascript:modelDataDisplayOneDay(\"" + shortDateLabels[i] + "\",\"" + modelId + "\",\"" + i + "\");' onmouseover='javascript:displayModelDataPopup(event, \"" + key + "\" ,\"" + modelId + "\", " + isOneDay + ");'><div class='model-data-content model-data-hour'>" + hour + "</div></td>";
//wig                }
//wig                else {
                    stringBuffer += "<td class='model-data-content-td model-data-vert-middle-td" + oddDay + dayStart + "' onmouseover='javascript:displayModelDataPopup(event, \"" + key + "\" ,\"" + modelId + "\", " + isOneDay + ");'><div class='model-data-content model-data-hour'>" + hour + "</div></td>";
//wig                }
            }
        }
        stringBuffer += "</tr>";



        /////////////////////////////////
        // wind row
        /////////////////////////////////
        count = 0;
        var maxWind = 0;
        stringBuffer += "<tr>";
        stringBuffer += "<td class='model-data-label-td' style='height:"+windRowHeight+"px'>Wind<br><span class='model-data-unit'>(" + unitsWind + ")</span></td>";
        for (var i = 0; i < labelColSpans.length; i++) {
            var oddDay = getOddDayBit(i);
            for (var j = 0; j < hourLabels.length; j++) {
                var dayStart = "";
                if (j == (hourLabels.length-1)) {
                    dayStart = " model-data-start-day-"+i;
                }
                var key = shortDateLabels[i] + "-" + hourLabels[j];
                if (shortDateLabelIn != null) {
                    key = shortDateLabelIn + "-" + hourLabels[j];
                }
                if (modelDataForTable[key] == undefined) {
                    // no data for this time

                    if (modelDataStartOfModelReached && !modelDataEndOfModelReached) {
                        modelDataEndOfModelReached = true;
                        modelDataEndIndex = count;
                    }

                    if (modelDataEndOfModelReached) {
                        stringBuffer += modelDataEndOfDataTd;
                    }
                    else{
                        stringBuffer += "<td class='model-data-content-td" + oddDay + dayStart +"'><div style='width:12px'>&nbsp;</div></td>";
                    }
                }
                else {
                    modelDataStartOfModelReached = true;

                    var windSpeed = modelDataForTable[key][4];
                    var windDir = modelDataForTable[key][5];
                    var windColor = modelDataForTable[key][7];
                    
                    var windSpeedMph = windSpeed;
                    if (unitsWind == "kph") {
                    	windSpeedMph = convertKphToMph(windSpeed);
                    }
                    else if (unitsWind == "kts") {
                    	windSpeedMph = convertKtsToMph(windSpeed);
                    }
                    else if (unitsWind == "mps") {
                    	windSpeedMph = convertMpsToMph(windSpeed);
                    }
                    var windDivHeight = (Math.floor((windSpeedMph*2)/windSpeedFloorFactor))+windSpeedHeightBooster;

//wig                    if (canExpand) {
//wig                        stringBuffer += "<td class='model-data-content-td" + oddDay + dayStart + "' onclick='javascript:modelDataDisplayOneDay(\"" + shortDateLabels[i] + "\",\"" + modelId + "\",\"" + i + "\");' onmouseover='javascript:displayModelDataPopup(event, \"" + key + "\" ,\"" + modelId + "\", " + isOneDay + ");'><div style='height:7px;'></div><div style='height:15px;'>" + windSpeed + "</div><div class='model-data-wind' style='background-color:" + windColor + ";height:" + ((windSpeed * 2) + 14) + "px;background-image:url(\"http://images.windalert.com/atmosphere/App_Common/Images/arrows/wind/" + windDir + ".png\");'></div></td>";
//wig                    }
//wig                    else {
                        stringBuffer += "<td class='model-data-content-td" + oddDay + dayStart + "' onmouseover='javascript:displayModelDataPopup(event, \"" + key + "\" ,\"" + modelId + "\", " + isOneDay + ");'><div class='model-data-windspeed'>" + windSpeed + "</div><div class='model-data-wind model-data-col' style='background-color:" + windColor + ";vertical-align:bottom;'><div style='height:" + windDivHeight + "px;'></div><img height='12' width='12' src='http://images.windalert.com/atmosphere/App_Common/Images/arrows/wind/" + windDir + ".png'></div></td>";
//wig                    }
                }
                count++;
            }
        }
        stringBuffer += "</tr>";

        /////////////////////////////////
        // wind gust
        /////////////////////////////////
        if (modelDataModelHasGust[modelName]) {
            count = 0;
            stringBuffer += "<tr>";
            stringBuffer += "<td class='model-data-label-td' style='height:"+windGustRowHeight+"px;'>Gust</td>";
            for (var i = 0; i < labelColSpans.length; i++) {
                var oddDay = getOddDayBit(i);
                for (var j = 0; j < hourLabels.length; j++) {
                    var dayStart = "";
                    if (j == (hourLabels.length - 1)) {
                        dayStart = " model-data-start-day-" + i;
                    }
                    var key = shortDateLabels[i] + "-" + hourLabels[j];
                    if (shortDateLabelIn != null) {
                        key = shortDateLabelIn + "-" + hourLabels[j];
                    }
                    if (modelDataForTable[key] == undefined) {
                        // no data for this time
                        if (count >= modelDataEndIndex) {
                            stringBuffer += modelDataEndOfDataTd;
                        }
                        else {
                            stringBuffer += "<td class='model-data-content-td" + oddDay + dayStart + "'>&nbsp;</td>";
                        }
                    }
                    else {
                        var gust = modelDataForTable[key][24];
                        var gustColor = modelDataForTable[key][25];
                        var gustStyle = "model-data-temp";
                        
                        var windGustMph = gust;
                        if (unitsWind == "kph") {
                            windGustMph = convertKphToMph(gust);
                        }
                        else if (unitsWind == "kts") {
                            windGustMph = convertKtsToMph(gust);
                        }
                        else if (unitsWind == "mps") {
                            windGustMph = convertMpsToMph(gust);
                        }
                        
                        if(windGustMph < 20){
                            var gustStyle = "model-data-temp2";
                        }
                        if(gust != undefined && gust > 0){
                        	gust = Math.round(gust);
                        }
                        stringBuffer += "<td class='model-data-content-td" + oddDay + dayStart + " model-data-vert-middle-td' style='background-color:" + gustColor + ";border-top:1px solid #000000;' onmouseover='javascript:displayModelDataPopup(event, \"" + key + "\" ,\"" + modelId + "\", " + isOneDay + ");'><div class='" + gustStyle + " model-data-content'>" + gust + "</div></td>";
                    }
                    count++;
                }
            }
            stringBuffer += "</tr>";
        }

        
        
        /////////////////////////////////
        // gen weather row
        /////////////////////////////////
        if (modelDataModelHasGenWeather[modelName]) {
            count = 0;
            stringBuffer += "<tr>";
            stringBuffer += "<td class='model-data-label-td' style='height:"+genRowHeight+"px'>Sky</td>";
            for (var i = 0; i < labelColSpans.length; i++) {
                var oddDay = getOddDayBit(i);
                for (var j = 0; j < hourLabels.length; j++) {
                    var dayStart = "";
                    if (j == (hourLabels.length - 1)) {
                        dayStart = " model-data-start-day-" + i;
                    }
                    var key = shortDateLabels[i] + "-" + hourLabels[j];
                    if (shortDateLabelIn != null) {
                        key = shortDateLabelIn + "-" + hourLabels[j];
                    }
                    if (modelDataForTable[key] == undefined) {
                        // no data for this time
                        if (count >= modelDataEndIndex) {
                            stringBuffer += modelDataEndOfDataTd;
                        }
                        else {
                            stringBuffer += "<td class='model-data-content-td" + oddDay + dayStart + "'>&nbsp;</td>";
                        }
                    }
                    else {
                        var genIcon = modelDataForTable[key][10];
                        stringBuffer += "<td class='model-data-content-td model-data-vert-middle-td" + oddDay + dayStart + "' onmouseover='javascript:displayModelDataPopup(event, \"" + key + "\" ,\"" + modelId + "\", " + isOneDay + ");' style=''><img src='http://images.windalert.com/atmosphere/App_Common/Images/weather/"+genIcon+"' height=17 width=12></td>";
                    }
                    count++;
                }
            }
            stringBuffer += "</tr>";
        }


        /////////////////////////////////
        // temp row
        /////////////////////////////////style='height:5%'
        count = 0;
        stringBuffer += "<tr>";
        stringBuffer += "<td class='model-data-label-td' style='height:"+tempRowHeight+"px'>&deg;<span class='model-data-unit'>" + unitsTemp + "</span></td>";
        for (var i = 0; i < labelColSpans.length; i++) {
            var oddDay = getOddDayBit(i);
            for (var j = 0; j < hourLabels.length; j++) {
                var dayStart = "";
                if (j == (hourLabels.length - 1)) {
                    dayStart = " model-data-start-day-" + i;
                }
                var key = shortDateLabels[i] + "-" + hourLabels[j];
                if (shortDateLabelIn != null) {
                    key = shortDateLabelIn + "-" + hourLabels[j];
                }
                if (modelDataForTable[key] == undefined) {
                    // no data for this time
                    if (count >= modelDataEndIndex) {
                        stringBuffer += modelDataEndOfDataTd;
                    }
                    else {
                        stringBuffer += "<td class='model-data-content-td" + oddDay + dayStart + "'>&nbsp;</td>";
                    }
                }
                else {
                    var temp = modelDataForTable[key][8];
                    var tempColor = modelDataForTable[key][9];

                    var tempStyle = "model-data-temp";
                    if (unitsTemp == "F" && temp < 70) {
                        tempStyle = "model-data-temp2";
                    }
                    if (unitsTemp == "C" && temp < 21) {
                        tempStyle = "model-data-temp2";
                    }

//wig                    if (canExpand) {
//wig                        stringBuffer += "<td class='model-data-content-td" + oddDay + dayStart + "' onclick='javascript:modelDataDisplayOneDay(\"" + shortDateLabels[i] + "\",\"" + modelId + "\",\"" + i + "\");' onmouseover='javascript:displayModelDataPopup(event, \"" + key + "\" ,\"" + modelId + "\", " + isOneDay + ");'><div style='background-color:" + tempColor + ";'><div class='" + tempStyle + " model-data-content'>" + temp + "</div></div></td>";
//wig                    }
//wig                    else {
                        stringBuffer += "<td class='model-data-content-td" + oddDay + dayStart + " model-data-vert-middle-td' style='background-color:" + tempColor + ";' onmouseover='javascript:displayModelDataPopup(event, \"" + key + "\" ,\"" + modelId + "\", " + isOneDay + ");'><div class='" + tempStyle + " model-data-content'>" + temp + "</div></td>";
//wig                    }
                }
                count++;
            }
        }
        stringBuffer += "</tr>";



        /////////////////////////////////
        // wave row
        /////////////////////////////////

        if (modelDataModelHasWave[modelName]) {
            count = 0;
            stringBuffer += "<tr>";
            stringBuffer += "<td class='model-data-label-td' id='model-data-label-wave-" + modelId + "' style='vertical-align:top;height:"+waveRowHeight+"px'><div style='padding-top:2px;'>Wave</div><div style='padding-top:2px;' class='model-data-unit'>Ht(" + unitsHeight + ")</div><div style='padding-top:12px;'>Per(s)<div></td>";
            for (var i = 0; i < labelColSpans.length; i++) {
                var oddDay = getOddDayBit(i);
                for (var j = 0; j < hourLabels.length; j++) {
                    var dayStart = "";
                    if (j == (hourLabels.length - 1)) {
                        dayStart = " model-data-start-day-" + i;
                    }
                    var key = shortDateLabels[i] + "-" + hourLabels[j];
                    if (shortDateLabelIn != null) {
                        key = shortDateLabelIn + "-" + hourLabels[j];
                    }
                    if (modelDataForTable[key] == undefined) {
                        // no data for this time
                        if (count >= modelDataEndIndex) {
                            stringBuffer += modelDataEndOfDataTd;
                        }
                        else {
                            stringBuffer += "<td class='model-data-content-td" + oddDay + dayStart + "'></td>";
                        }
                    }
                    else {
                        if (modelDataForTable[key][14] != "null") {
                            var waveHeight = modelDataForTable[key][14];
                            var wavePeriod = modelDataForTable[key][15];
                            var waveDir = modelDataForTable[key][16];

                            var waveHeightFt = waveHeight;
                            if (unitsHeight == "m") {
                            	waveHeightFt = convertMtoFt(waveHeight);
                            }

                            var waveDirStr = "<img src='http://images.windalert.com/atmosphere/App_Common/Images/arrows/wave/" + waveDir + ".png'>";
                            var wavePeriodStr = "<div>"+parseInt(wavePeriod)+"</div>";
                            
                        	if(waveHeightFt != undefined && waveHeight >= 0){
                        		if(wavePeriod == "null"){
                        			wavePeriodStr = "<div style='letter-spacing:0px;'>na</div>";
                        		}
                        		if(waveDir == "null"){
                        			waveDirStr = "<div style='height:15px;'> </div>";
                        		}
                        		else if(waveDir == 0 && waveHeightFt == 0){
                        			waveDirStr = "<div style='height:15px;'> </div>";
                        		}
                        	}
                            

                            var barHeight = Math.floor((waveHeightFt*2)/waveHeightFloorFactor);  // 15 = space for wave period text

                            stringBuffer += "<td class='model-data-content-td" + oddDay + dayStart + "' onmouseover='javascript:displayModelDataPopup(event, \"" + key + "\" ,\"" + modelId + "\", " + isOneDay + ");'><div style='height:5px;'></div><div style='height:15px;'>" + waveHeight + "</div><div class='model-data-wave model-data-col'><div class='model-data-content' style='height:" + barHeight + "px;'></div>"+wavePeriodStr+waveDirStr+"</div></td>";


                        }
                        else {
                            stringBuffer += "<td class='model-data-content-td" + oddDay + dayStart + "'></td>";
                        }

                    }
                    count++;
                }
            }
            stringBuffer += "</tr>";
        }




        /////////////////////////////////
        // Additional Info Row
        /////////////////////////////////
        if (!showAdditionalData) {
                if (maxDays != 1) {
                  //wig                    stringBuffer += "<tr class='model-data-show-additional-data'>";
                  //wig                    stringBuffer += "<td colspan='57'><div id='model-data-more-" + modelId + "'><a class='model-data-header-link' href='javascript:toggleAdditionalData();'>Show Additional Data</a></div></td>";
                  //wig                    stringBuffer += "</tr>";

                    // label
                    var stringLabelRowPrecip = "";
                    var stringLabelRowPressure = "";
                    var stringLabelRowCloud = "";
                    var stringLabelRowModelRun = "";
                }
            }
            else {


                /////////////////////////////////
                // precip
                /////////////////////////////////
                count = 0;
                stringBuffer += "<tr>";
                stringBuffer += "<td class='model-data-label-td'>Prec</td>";
                for (var i = 0; i < labelColSpans.length; i++) {
                    var dayStart = "";
                    var oddDay = getOddDayBit(i);
                    for (var j = 0; j < hourLabels.length; j++) {
                        if (j == (hourLabels.length - 1)) {
                            dayStart = " model-data-start-day-" + i;
                        }
                        var key = shortDateLabels[i] + "-" + hourLabels[j];
                        if (shortDateLabelIn != null) {
                            key = shortDateLabelIn + "-" + hourLabels[j];
                        }
                        if (modelDataForTable[key] == undefined) {
                            // no data for this time
                            if (count >= modelDataEndIndex) {
                                stringBuffer += modelDataEndOfDataTd;
                            }
                            else {
                                stringBuffer += "<td class='model-data-content-td" + oddDay + dayStart + "'></td>";
                            }
                        }
                        else {
                            var totalPrecip = modelDataForTable[key][22];
                            var precipImage = "none";
                            if (totalPrecip > 0 && totalPrecip <= .1) {
                                precipImage = "precip_1.gif";
                            }
                            else if (totalPrecip > .1 && totalPrecip <= .2) {
                                precipImage = "precip_2.gif";
                            }
                            else if (totalPrecip > .2 && totalPrecip <= .3) {
                                precipImage = "precip_3.gif";
                            }
                            else if (totalPrecip > .3) {
                                precipImage = "precip_4.gif";
                            }


                            //				stringBuffer += "<td><img src='images/weather/weather001.gif'></td>";
                            if (precipImage == "none") {
                                if (canExpand) {
                                    stringBuffer += "<td class='model-data-content-td" + oddDay + dayStart + "' onclick='javascript:modelDataDisplayOneDay(\"" + shortDateLabels[i] + "\",\"" + modelId + "\",\"" + i + "\");' onmouseover='javascript:displayModelDataPopup(event, \"" + key + "\" ,\"" + modelId + "\", " + isOneDay + ");'></td>";
                                }
                                else {
                                    stringBuffer += "<td class='model-data-content-td" + oddDay + dayStart + "' onmouseover='javascript:displayModelDataPopup(event, \"" + key + "\" ,\"" + modelId + "\", " + isOneDay + ");'></td>";
                                }
                            }
                            else {
                                if (canExpand) {
                                    stringBuffer += "<td class='model-data-content-td" + oddDay + dayStart + "' onclick='javascript:modelDataDisplayOneDay(\"" + shortDateLabels[i] + "\",\"" + modelId + "\",\"" + i + "\");' onmouseover='javascript:displayModelDataPopup(event, \"" + key + "\" ,\"" + modelId + "\", " + isOneDay + ");'><img src='http://images.windalert.com/atmosphere/App_Common/Images/weather/" + precipImage + "' height=30 width=10></td>";
                                }
                                else {
                                    stringBuffer += "<td class='model-data-content-td" + oddDay + dayStart + "' onmouseover='javascript:displayModelDataPopup(event, \"" + key + "\" ,\"" + modelId + "\", " + isOneDay + ");'><img src='http://images.windalert.com/atmosphere/App_Common/Images/weather/" + precipImage + "' height=30 width=10></td>";
                                }
                            }
                        }
                        count++;
                    }
                }
                stringBuffer += "</tr>";




                /////////////////////////////////
                // cloud cover row
                /////////////////////////////////
                count = 0;
                stringBuffer += "<tr>";
                stringBuffer += "<td class='model-data-label-td'>Cloud</td>";
                for (var i = 0; i < labelColSpans.length; i++) {
                    var oddDay = getOddDayBit(i);
                    for (var j = 0; j < hourLabels.length; j++) {
                        var dayStart = "";
                        if (j == (hourLabels.length - 1)) {
                            dayStart = " model-data-start-day-" + i;
                        }
                        var key = shortDateLabels[i] + "-" + hourLabels[j];
                        if (shortDateLabelIn != null) {
                            key = shortDateLabelIn + "-" + hourLabels[j];
                        }
                        if (modelDataForTable[key] == undefined) {
                            // no data for this time
                            if (count >= modelDataEndIndex) {
                                stringBuffer += modelDataEndOfDataTd;
                            }
                            else {
                                stringBuffer += "<td class='model-data-content-td" + oddDay + dayStart + "'>&nbsp;</td>";
                            }
                        }
                        else {
                            var cloudCover = modelDataForTable[key][21];
                            cloudCover = Math.round(cloudCover);

                            var cloudCoverDisplay = cloudCover;
                            if (isOneDay) {
                                cloudCoverDisplay += "%";
                            }

                            if (canExpand) {
                                stringBuffer += "<td class='model-data-content-td" + oddDay + dayStart + "' onclick='javascript:modelDataDisplayOneDay(\"" + shortDateLabels[i] + "\",\"" + modelId + "\",\"" + i + "\");' onmouseover='javascript:displayModelDataPopup(event, \"" + key + "\" ,\"" + modelId + "\", " + isOneDay + ");'><div class='model-data-content'>" + cloudCoverDisplay + "</div></td>";
                            }
                            else {
                                stringBuffer += "<td class='model-data-content-td" + oddDay + dayStart + "' onmouseover='javascript:displayModelDataPopup(event, \"" + key + "\" ,\"" + modelId + "\", " + isOneDay + ");'><div class='model-data-content'>" + cloudCoverDisplay + "</div></td>";
                            }
                        }
                        count++;
                    }
                }
                stringBuffer += "</tr>";




                /////////////////////////////////
                // pressure row
                /////////////////////////////////
                count = 0;
                stringBuffer += "<tr>";
                stringBuffer += "<td class='model-data-label-td'>Pres<br><span class='model-data-unit'>(MB)</span></td>";
                for (var i = 0; i < labelColSpans.length; i++) {
                    var oddDay = getOddDayBit(i);
                    for (var j = 0; j < hourLabels.length; j++) {
                        var dayStart = "";
                        if (j == (hourLabels.length - 1)) {
                            dayStart = " model-data-start-day-" + i;
                        }
                        var key = shortDateLabels[i] + "-" + hourLabels[j];
                        if (shortDateLabelIn != null) {
                            key = shortDateLabelIn + "-" + hourLabels[j];
                        }
                        if (modelDataForTable[key] == undefined) {
                            // no data for this time
                            if (count >= modelDataEndIndex) {
                                stringBuffer += modelDataEndOfDataTd;
                            }
                            else {
                                stringBuffer += "<td class='model-data-content-td" + oddDay + dayStart + "'>&nbsp;</td>";
                            }
                        }
                        else {
                            var pressure = modelDataForTable[key][11];
                            var pressureHeight = 0;
                            var pressureDisplay = "";


                            if (pressure > 980) {
                                pressureHeight = pressure - 980;
                            }
                            if (isOneDay && pressure != null) {
                                pressureDisplay = Math.round(pressure);
                            }

                            if (canExpand) {
                                stringBuffer += "<td class='model-data-content-td" + oddDay + dayStart + "' onclick='javascript:modelDataDisplayOneDay(\"" + shortDateLabels[i] + "\",\"" + modelId + "\",\"" + i + "\");' onmouseover='javascript:displayModelDataPopup(event, \"" + key + "\" ,\"" + modelId + "\", " + isOneDay + ");'><div style='height:7px;'></div><div class='' style='background-color:#98869E;color:#ffffff;height:" + pressureHeight + "px;'>" + pressureDisplay + "</div></td>";
                            }
                            else {
                                stringBuffer += "<td class='model-data-content-td" + oddDay + dayStart + "' onmouseover='javascript:displayModelDataPopup(event, \"" + key + "\" ,\"" + modelId + "\", " + isOneDay + ");'><div style='height:7px;'></div><div class='' style='background-color:#98869E;color:#ffffff;height:" + pressureHeight + "px;'>" + pressureDisplay + "</div></td>";
                            }
                        }
                        count++;
                    }
                }
                stringBuffer += "</tr>";


                /////////////////////////////////
                // model run row
                /////////////////////////////////
                count = 0;
                stringBuffer += "<tr>";
                stringBuffer += "<td class='model-data-label-td'>Run</td>";
                for (var i = 0; i < labelColSpans.length; i++) {
                    var oddDay = getOddDayBit(i);
                    for (var j = 0; j < hourLabels.length; j++) {
                        var dayStart = "";
                        if (j == (hourLabels.length - 1)) {
                            dayStart = " model-data-start-day-" + i;
                        }
                        var key = shortDateLabels[i] + "-" + hourLabels[j];
                        if (shortDateLabelIn != null) {
                            key = shortDateLabelIn + "-" + hourLabels[j];
                        }
                        if (modelDataForTable[key] == undefined) {
                            // no data for this time
                            if (count >= modelDataEndIndex) {
                                stringBuffer += modelDataEndOfDataTd;
                            }
                            else {
                                stringBuffer += "<td class='" + oddDay + dayStart + "'>&nbsp;</td>";
                            }
                        }
                        else {
                            var modelRun = modelDataForTable[key][18];
                            if (!isOneDay) {
                                modelRun = modelRun.substr(0, 2);
                            }

                            if (canExpand) {
                                stringBuffer += "<td class='model-data-content-td" + oddDay + dayStart + "' onclick='javascript:modelDataDisplayOneDay(\"" + shortDateLabels[i] + "\",\"" + modelId + "\",\"" + i + "\");' onmouseover='javascript:displayModelDataPopup(event, \"" + key + "\" ,\"" + modelId + "\", " + isOneDay + ");'><div class='model-data-content'>" + modelRun + "</div></td>";
                            }
                            else {
                                stringBuffer += "<td class='model-data-content-td" + oddDay + dayStart + "' onmouseover='javascript:displayModelDataPopup(event, \"" + key + "\" ,\"" + modelId + "\", " + isOneDay + ");'><div class='model-data-content'>" + modelRun + "</div></td>";
                            }
                        }
                        count++;
                    }
                }
                stringBuffer += "</tr>";
            }

            if (maxDays == 1 && modelNameIn != null) {
                // hide additional data
                stringBuffer += "</table></div>"

                	//wig                var moreLink = "Show Additional Data";
                	//wig                if (showAdditionalData) {
                	//wig                    moreLink = "Hide Additional Data";
                	//wig                }
                	//wig                stringBuffer += "<table class='model-data' cellpadding=0 cellspacing=0 border=0><tr class='model-data-show-additional-data'>";
                	//wig                stringBuffer += "<td colspan='56'><a class='model-data-header-link' href='javascript:toggleAdditionalData();'>" + moreLink + "</a></td>";
                	//wig                stringBuffer += "</tr></table>";

            }
            else {
                // hide additional data
            	//wig                if (showAdditionalData) {
            	//wig                    stringBuffer += "<tr class='model-data-show-additional-data'>";
            	//wig                    stringBuffer += "<td colspan='57'><div id='model-data-more-" + modelId + "'><a class='model-data-header-link' href='javascript:toggleAdditionalData();'>Hide Additional Data</a></div></td>";
            	//wig                    stringBuffer += "</tr>";
            	//wig                }

            	//wig                stringBuffer += "</table><div id='model-data-one-day-id-" + modelId + "'></div>";
                stringBuffer += "</table>"
            }
    }



    return stringBuffer;
}






















/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
//
//  Popup Display
//
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

function displayModelEndPopup(e, modelId) {
    // close data popup if it is active
    $('#model-data-table-popup').css("display", "none");

    // Find Y
    var modelDataTableTitle = $("#model-data-model-title-" + modelId);
    var modelDataTableTitlePosition = modelDataTableTitle.offset();
    var modelDataTableTitleTop = modelDataTableTitlePosition.top;

    y = modelDataTableTitleTop;

    // Find X
    x = e.clientX;

    // Offset values
    var modelDataContentOffset = $('#model-data-table-content').offset();
    var modelDataContentOffsetLeft = modelDataContentOffset.left;

    var offsetX = 50 - modelDataContentOffsetLeft;
    var offsetY = 110;   // distance down from title

    // Display the popup
    $('#model-data-end-popup').css("display", "block");
    $('#model-data-end-popup').css("left", x + offsetX);
    $('#model-data-end-popup').css("top", y + offsetY);
}




function displayModelDataPopup(e, key, modelId, isOneDay) {
/*
	// Hide the end of data popup.
    $('#model-data-end-popup').css("display", "none");


    ///////////////////////////////////////////////////
    //  Get values and update popup
    //////////////////////////////////////////////////
    if (modelDataById[modelName][key] != undefined) {
        var shortDate = modelDataById[modelName][key][0];
        // var longDate = modelDataById[modelName][key][1];
        var time = modelDataById[modelName][key][2];
        var windSpeed = modelDataById[modelName][key][4];
        var windDir = modelDataById[modelName][key][5];
        var windDirTxt = modelDataById[modelName][key][6];
        var windColor = modelDataById[modelName][key][7];
        var temp = modelDataById[modelName][key][8];
        var tempColor = modelDataById[modelName][key][9];
        var waveHeight = coalesce(modelDataById[modelName][key][14], "-");
        var wavePeriod = coalesce(modelDataById[modelName][key][15], "-");
        var waveDir = modelDataById[modelName][key][16];
        var waveDirTxt = coalesce(modelDataById[modelName][key][17], "-");
        var modelName = modelDataById[modelName][key][19];
        var modelColor = modelDataById[modelName][key][20];
        var modelRunName = modelDataById[modelName][key][18];
        var cloudCover = coalesce(modelDataById[modelName][key][21], "-");
        var totalPrecip = coalesce(modelDataById[modelName][key][22], "-");
        var pressure = coalesce(modelDataById[modelName][key][11], "-");
        var genIcon = coalesce(modelDataById[modelName][key][10], "-"); ;
        var genIconUrl = "http://images.windalert.com/atmosphere/App_Common/Images/weather/" + genIcon;


        var precipImage = "<img src='http://images.windalert.com/atmosphere/App_Common/Images/weather/precip_0.gif' height=30 width=10>";

        if (totalPrecip != "-") {
            if (totalPrecip > 0 && totalPrecip <= 1) {
                precipImage = "<img src='http://images.windalert.com/atmosphere/App_Common/Images/weather/precip_1.gif' height=30 width=10> ";
            }
            else if (totalPrecip > 1 && totalPrecip <= 2) {
                precipImage = "<img src='http://images.windalert.com/atmosphere/App_Common/Images/weather/precip_2.gif' height=30 width=10> ";
            }
            else if (totalPrecip > 2 && totalPrecip <= 3) {
                precipImage = "<img src='http://images.windalert.com/atmosphere/App_Common/Images/weather/precip_3.gif' height=30 width=10> ";
            }
            else if (totalPrecip > 3) {
                precipImage = "<img src='http://images.windalert.com/atmosphere/App_Common/Images/weather/precip_4.gif' height=30 width=10> ";
            }
        }


        $('#model-data-table-popup-forecast-date').empty();
        $('#model-data-table-popup-forecast-time').empty();
        $('#model-data-table-popup-forecast-windspeed').empty();
        $('#model-data-table-popup-forecast-winddir').empty();
        $('#model-data-table-popup-forecast-skies').empty();
        $('#model-data-table-popup-forecast-airtemp').empty();
        $('#model-data-table-popup-forecast-waveheight').empty();
        $('#model-data-table-popup-forecast-waveperiod').empty();
        $('#model-data-table-popup-forecast-wavedirection').empty();
        $('#model-data-table-popup-forecast-modelname').empty();
        $('#model-data-table-popup-forecast-modelrunname').empty();
        $('#model-data-table-popup-forecast-cloudcover').empty();
        $('#model-data-table-popup-forecast-totalprecip').empty();
        $('#model-data-table-popup-forecast-pressure').empty();

        $('#model-data-table-popup-forecast-date').append(shortDate);
        $('#model-data-table-popup-forecast-time').append(time);
        $('#model-data-table-popup-forecast-windspeed').append(windSpeed + ' ' + unitsWind);
        //$('#model-data-table-popup-forecast-winddir').append("<div style=\"height:" + windSpeed*2 + "px;\"></div><img src=\"http://images.windalert.com/atmosphere/App_Common/Images/arrows/wind/" + windDir + ".png\"> " + windDirTxt);
        $('#model-data-table-popup-forecast-winddir').append("<img src=\"http://images.windalert.com/atmosphere/App_Common/Images/arrows/wind/" + windDir + ".png\"> " + windDirTxt);

        if (genIcon != undefined && genIcon != null && genIcon != "-") {
            $('#model-data-table-popup-forecast-skies').append("<image src=\"" + genIconUrl + "\">");
        }
        else {
            $('#model-data-table-popup-forecast-skies').append("n/a");
        }
        $('#model-data-table-popup-forecast-airtemp').append(temp + ' &deg;' + unitsTemp);
        $('#model-data-table-popup-forecast-cloudcover').append(cloudCover + "%");
        $('#model-data-table-popup-forecast-pressure').append(pressure + ' ' + unitsPres);
        $('#model-data-table-popup-forecast-totalprecip').append(precipImage + totalPrecip + "in");
        $('#model-data-table-popup-forecast-modelname').append(modelName);
        $('#model-data-table-popup-forecast-modelrunname').append(modelRunName);


        $('#model-data-table-popup-forecast-winddir').css("background-color", windColor);
        $('#model-data-table-popup-forecast-airtemp').css("background-color", tempColor);
        $('#model-data-table-popup-forecast-modelname').css("background-color", modelColor);
        $('#model-data-table-popup-forecast-pressure').css("background-color", "#98869E");
        $('#model-data-table-popup-forecast-pressure').css("color", "#ffffff");
        if (unitsTemp == "F" && temp > 69) {
            $('#model-data-table-popup-forecast-airtemp').css("color", "#ffffff");
        }
        else if (unitsTemp == "C" && temp > 20) {
            $('#model-data-table-popup-forecast-airtemp').css("color", "#ffffff");
        }
        else {
            $('#model-data-table-popup-forecast-airtemp').css("color", "#000000");
        }

        if (waveHeight != "-") {
            $('#model-data-table-popup-forecast-waveheight').append(waveHeight + ' ' + unitsHeight);
            //$('#model-data-table-popup-forecast-waveperiod').append("<div style=\"height:" + waveHeight * 2 + "px;\"></div>" + wavePeriod);
            $('#model-data-table-popup-forecast-waveperiod').append(wavePeriod + "s");
            $('#model-data-table-popup-forecast-wavedirection').append("<img src=\"http://images.windalert.com/atmosphere/App_Common/Images/arrows/wave/" + waveDir + ".png\"> " + waveDirTxt);

            $('#model-data-table-popup-forecast-wavedirection').css("background-color", "#4169E1");
            $('#model-data-table-popup-forecast-wavedirection').css("color", "#ffffff");
            $('#model-data-table-popup-forecast-waveperiod').css("background-color", "#4169E1");
            $('#model-data-table-popup-forecast-waveperiod').css("color", "#ffffff");

            $('#model-data-table-popup-forecast-waveperiod-row').css("visibility", "visible");
            $('#model-data-table-popup-forecast-waveheight-row').css("visibility", "visible");
            $('#model-data-table-popup-forecast-wavedirection-row').css("visibility", "visible");

        }
        else {
            $('#model-data-table-popup-forecast-waveperiod-row').css("visibility", "collapse");
            $('#model-data-table-popup-forecast-waveheight-row').css("visibility", "collapse");
            $('#model-data-table-popup-forecast-wavedirection-row').css("visibility", "collapse");
        }


        ///////////////////////////////////////////////////
        //  Position and display the popup
        //////////////////////////////////////////////////

        // Find Y
        var modelDataTableTitle = $("#model-data-model-title-" + modelId);
        if (isOneDay) {
            modelDataTableTitle = $("#model-data-model-title-one-day-" + modelId);
        }

        var modelDataTableTitlePosition = modelDataTableTitle.offset();
        var modelDataTableTitleTop = modelDataTableTitlePosition.top;

        y = modelDataTableTitleTop;

        // Find X
        x = e.clientX;

        // Offset values
        var modelDataContentOffset = $('#model-data-table-content').offset();
        var modelDataContentOffsetLeft = modelDataContentOffset.left;

        var offsetX = 50 - modelDataContentOffsetLeft;
        var offsetY = 110;   // distance down from title

        // Display the popup
        $('#model-data-table-popup').css("display", "block");
        $('#model-data-table-popup').css("left", x + offsetX);
        $('#model-data-table-popup').css("top", y + offsetY);




    }
*/
}

function hideModelDataPopup(key) {
    $('#model-data-table-popup').css("display", "none");
    $('#model-data-end-popup').css("display", "none");
    $('#model-data-pop-test').css("display", "none");
}























/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
//
//  Getters and Setters
//
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

// used to switch color for each day
function getOddDayBit(dayNumber) {
    var oddDay = "";
    if (dayNumber == 1 || dayNumber == 3 || dayNumber == 5) {
        oddDay = " model-data-odd-day";
    }
    return oddDay;
}


//convert an api date string into a javascript date
//api format = 2010-08-20 12:00:00+0000
function getJsDateFromApiDateStr(apiDateStr) {
 var year = apiDateStr.substr(0, 4);
 var month = (apiDateStr.substr(5, 2) - 1);
 var day = (apiDateStr.substr(8, 2) - 0);
 var hour = (apiDateStr.substr(11, 2) - 0);
 var min = (apiDateStr.substr(14, 2) - 0);
 var sec = (apiDateStr.substr(17, 2) - 0);

 var d = new Date(year, month, day, hour, min, sec);
 return d;
}


function getModelDataShortDate(jsDate) {
    //  date short "Tue, 6 Jul"
    var month = jsDate.getMonth();
    var day = jsDate.getDay();
    var date = jsDate.getDate();

    return weekdayShort[day] + ", " + date + " " + monthsShort[month];
}

function getModelDataTime(jsDate) {
    //  time  "14:00"
    var hour = jsDate.getHours();
    var minutes = jsDate.getMinutes();
    //var minutes = "00";

    return hour + ":" + minutes;
}

function getModelDataHour(jsDate) {
    //  time  "14"
    var hour = jsDate.getHours();

    return hour + "";
}

function getModelDataLongDate(jsDate) {
    //  date long  "Tuesday, 6 July 2010"
    var year = jsDate.getFullYear();
    var month = jsDate.getMonth();
    var day = jsDate.getDay();
    var date = jsDate.getDate();

    return weekday[day] + ", " + date + " " + months[month] + " " + year;
}

function getModelDataWind(windSpeed) {
    return Math.round(windSpeed);
}

function getModelDataWindDir(windDir) {
    return windDir;
}

function getModelDataWindDirText(windDir) {
    return directionDegToString(windDir);
}

function getModelDataWaveDirText(waveDir) {
    if (getValueOrNull(waveDir) != null) {
        modelDataWaveData = true;
        return directionDegToString(waveDir);
    }
    else{
        return null;
    }
}

function getModelDataTemp(temp) {
    return Math.round(temp);
}


function getModelDataWaveHeight(waveHeight) {
    return getValueOrNull(waveHeight);
}

function getModelDataWaveHeight(waveHeight) {
    if(getValueOrNull(waveHeight) != null){
        if(unitsHeight == "ft"){
            return Math.round(waveHeight);
        }
        else{
            return convertFttoM(waveHeight);
        }
    }
    else{
        return null;
    }
}


function directionDegToString(degree) {
    directions = new Array();
    directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"];

    return directions[parseInt(Math.round((degree % 360) / 22.5))];
}

function getValueOrNull(value) {
    if(value == undefined || value == null){
        return null;
    }
    else{
        return value;
    }
}







function getGetWeatherIcon(cloudCoverPercent, precipType) {
    var icon = "sun_b.gif";
    if (precipType != null && precipType != "none") {
        if (precipType.toLowerCase() == "rain") {
            icon = "rain_b.gif";
        }
        else if (precipType.toLowerCase() == "snow") {
            icon = "snow_b.gif";
        }
        else if (precipType.toLowerCase() == "freezing rain") {
            icon = "freezing_rain_b.gif";
        }
        else if (precipType.toLowerCase() == "ice pellets") {
            icon = "ice_pellets_b.gif";
        }
    }
    else {
        // use cloud cover

        if (cloudCoverPercent != null && cloudCoverPercent > 0) {
            // make sure we have a percent  - no cant do this bc gfs includes values < 1

            //if (cloudCoverPercent > 0 && cloudCoverPercent < 1) {
            //    cloudCoverPercent = cloudCoverPercent * 100;
            //}


            if (cloudCoverPercent < 25) {
                icon = "cloud_1_b.gif";
            }
            else if (cloudCoverPercent >= 25 && cloudCoverPercent < 50) {
                icon = "cloud_2_b.gif";
            }
            else if (cloudCoverPercent >= 50 && cloudCoverPercent < 75) {
                icon = "cloud_3_b.gif";
            }
            else if (cloudCoverPercent >= 75) {
                icon = "cloud_4_b.gif";
            }


        }

    }

    return icon;
}






/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
//
//  Color Getters
//
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
function getColorForWind(windSpeed, windUnit) {
    // these color values are in mph, need to convert input if it is not in mph
    if (windUnit == "kph") {
        windSpeed = convertKphToMph(windSpeed);
    }
    else if (windUnit == "kts") {
        windSpeed = convertKtsToMph(windSpeed);
    }
    else if (windUnit == "mps") {
        windSpeed = convertMpsToMph(windSpeed);
    }


    var windThreshold = 2;
    for (i = 0; i < fillColorsWind.length; i++) {
        if (windSpeed <= windThreshold) {
            return fillColorsWind[i];
        }
        else {
            windThreshold = windThreshold + 2;
        }
    }

    // very fast, return the fastest color
    return fillColorsWind[fillColorsWind.length - 1];
}


function getColorForTemp(temp, tempUnit) {
    // these color values are in F, need to convert input if it is not in F
    if (tempUnit == "C") {
        temp = convertTempCToF(temp);
    }


    var tempThreshold = -18;
    for (i = 0; i < fillColorsTemp.length; i++) {
        if (temp <= tempThreshold) {
            return fillColorsTemp[i];
        }
        else {
            tempThreshold = tempThreshold + 3;
        }
    }

    // very hot, return the hottest color
    return fillColorsTemp[fillColorsTemp.length - 1];
}
















/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
//
//  Converters
//
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
function convertKphToMph(speed) {
    var convertedSpeed = speed / 1.609344;
    return convertedSpeed;
}


function convertKtsToMph(speed) {
    var convertedSpeed = speed / 0.868976242;
    return convertedSpeed;
}

function convertMpsToMph(speed) {
    var convertedSpeed = speed / 0.44704;
    return convertedSpeed;
}


function convertTempCToF(speed) {
    var convertedTemp = ((speed * 9) / 5) + 32;
    return convertedTemp;
}

function convertTempFToC(speed) {
    var convertedTemp = ((speed - 32) / 9) * 5;
    return convertedTemp;
}

function convertMtoFt(height) {
    var convertedHeight = height * 3.2808399;
    return Math.round(convertedHeight);
}

function convertFttoM(height) {
    var convertedHeight = height / 3.2808399;

    return (Math.round(10*convertedHeight))/10;
}















/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
//
//  Other
//
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
function coalesce(value, value2) {
    if (value != undefined && value != null && value != "null" && value != "") {
        return value;
    }
    else {
        return value2;
    }
}



function isModelIdInModelDataSelectedArray(modelId) {
    var isIt = false;
    for (var i = 0; i < modelDataSelectedModelIds.length; i++) {
        if (modelDataSelectedModelIds[i] == modelId) {
            isIt = true;
        }
    }
    return isIt;
}

function isModelIdInModelDataLoadedArray(modelId) {
    var isIt = false;
    for (var i = 0; i < modelDataLoadedModelIds.length; i++) {
        if (modelDataLoadedModelIds[i] == modelId) {
            isIt = true;
        }
    }
    return isIt;
}























/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
//
//  Debug
//
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
//modelDataById

//var modelDataById = new Array();  // modelDatasById[model_id][modelData]
//var modelData = new Array();       // modelData[short_time-hour][value,value,value,value...]
//var modelDataModelNames = new Array()  //modelDataModelNames[model_id]"name"
//var modelDataModelColors = new Array()  //modelDataModelColors[model_id]"color"
//var modelDataModelHourInterval = new Array()  //modelDataModelHourInterval[model_id]interval
//var modelDataModelRowCount = new Array()  //modelDataModelRowCount[model_id]count
//var modelDataHourLabelsBestFit = new Array(); //modelDataHourLabels[model_id][0,3,6,9,12,15,18,21]  // best fit hours
//var modelDataShortDateLabelsBestFit = new Array();  //modelDataShortDateLabels[model_id]["short date", "short date"]

//var modelDataShortDateLabelsCompare = new Array();  // holds the 7 day labels - calculated using the data in the first model loaded
//var modelDataHourLabelsCompare = [0, 3, 6, 9, 12, 15, 18, 21];  //this is changed when a 3 hour model is loaded

function modelDataDebug() {
    $('#debug').empty();

    var stringBuffer = "";
    stringBuffer += "<br>date labels (compare)=" + modelDataShortDateLabelsCompare.toString();
    stringBuffer += "<br>hour labels (compare)=" + modelDataHourLabelsCompare.toString();
    for (var id in modelDataById) {
        var modelDataArray = modelDataById[id];
        stringBuffer += "<br><hr><br>modelId=" + id;
        stringBuffer += "<br>color=" + modelDataModelNames[id];
        stringBuffer += "<br>name=" + modelDataModelColors[id];
        stringBuffer += "<br>date labels (best fit)=" + modelDataShortDateLabelsBestFit[id+""].toString();
        stringBuffer += "<br>hour labels (best fit)=" + modelDataHourLabelsBestFit[id + ""].toString();
        stringBuffer += "<br>modelDataModelHourInterval=" + modelDataModelHourInterval[id+""];
        stringBuffer += "<br>modelDataModelRowCount=" + modelDataModelRowCount[id+""];
        stringBuffer += "<br>modelDataModelHasWave=" + modelDataModelHasWave[id + ""];
        stringBuffer += "<br><br>";
        stringBuffer += "<table border='1' cellpadding='5'><tr><td>short date</td><td>long date</td><td>time</td><td>hour</td><td>wind speed</td><td>wind dir</td><td>wind dir txt</td><td>wind color</td><td>temp</td><td>temp color</td><td>gen weath icon</td><td>pres</td><td>pres color</td><td>precip type</td><td>precip icon</td><td>wave height</td><td>wave period</td><td>wave dir</td><td>wave dir txt</td></tr>";

        "<tr><td>short date</td><td>long date</td><td>time</td><td>hour</td><td>wind speed</td><td>wind dir</td><td>wind dir txt</td><td>wind color</td><td>temp</td><td>temp color</td><td>gen weath icon</td><td>pres</td><td>pres color</td><td>precip icon</td><td>wave height</td><td>wave period</td><td>wave dir</td><td>wave dir txt</td></tr>";
        for (var j in modelDataArray) {
            stringBuffer += "<tr><td>" + modelDataArray[j][0] + "</td><td>" + modelDataArray[j][1] + "</td><td>" + modelDataArray[j][2] + "</td><td>" + modelDataArray[j][3] + "</td><td>" + modelDataArray[j][4] + "</td><td>" + modelDataArray[j][5] + "</td><td>" + modelDataArray[j][6] + "</td><td><div style='background-color:" + modelDataArray[j][7] + ";'>" + modelDataArray[j][7] + "</div></td><td>" + modelDataArray[j][8] + "</td><td><div style='background-color:" + modelDataArray[j][9] + ";'>" + modelDataArray[j][9] + "</div></td><td>" + modelDataArray[j][10] + "</td><td>" + modelDataArray[j][11] + "</td><td>" + modelDataArray[j][12] + "</td><td>" + modelDataArray[j][23] + "</td><td>" + modelDataArray[j][13] + "</td><td>" + modelDataArray[j][14] + "</td><td>" + modelDataArray[j][15] + "</td><td>" + modelDataArray[j][16] + "</td><td>" + modelDataArray[j][17] + "</td></tr>";
        }
        stringBuffer += "</table>";
    }


    for (var i = 0; i < modelDataSelectedModelIds.length; i++) {
        stringBuffer += "<br>modelDataSelectedModelIds[" + i + "]=" + modelDataSelectedModelIds[i];
    }
    for (var i = 0; i < modelDataLoadedModelIds.length; i++) {
        stringBuffer += "<br>modelDataLoadedModelIds[" + i + "]=" + modelDataLoadedModelIds[i];
    }

//    for (var i = 0; i < modelDataShortDateLabels.length; i++) {
//        stringBuffer += "<br>modelDataShortDateLabels[" + i + "]=" + modelDataShortDateLabels[i];
//    }
//    for (var i = 0; i < modelDataHourLabels.length; i++) {
//        stringBuffer += "<br>modelDataHourLabels[" + i + "]=" + modelDataHourLabels[i];
//    }
//    stringBuffer += "<br>modelDataHourInterval=" + modelDataHourInterval;

    $('#debug').append(stringBuffer);

}




function windDebug(){
	alert("maxWindSpeedMph="+maxWindSpeedMph+" \nwindSpeedFloorFactor="+windSpeedFloorFactor);
}
