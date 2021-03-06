var INPUT_TYPE_LABEL = '<label class="{{content.labelClass}}" ng-if="content.labelname">{{content.labelname}}</label>';
var DATE_TYPE_LABEL = '<label class="{{content.labelClass}}" style="position: relative" ng-if="content.labelname">{{content.labelname}}</label>';


var INPUT_TYPE_CONTROL = '<input ng-change="content.onchange ? callAction() : void" type="getType"' +
    ' placeholder="{{content.fieldPlaceholder}}" ng-model="saveModel[content.fieldModel]" ' +
    ' ng-disabled="content.isDisabled === true" class="{{content.fieldClass}}">';

var TEXT_AREA_CONTROL = '<textarea ng-change="content.onchange ? callAction() : void" ' +
' rows="{{content.rows}}" cols="{{content.cols}}" ng-model="saveModel[content.fieldModel]" ' +
' ng-disabled="content.isDisabled === true" class="{{content.fieldClass}}">' ;

var DATE_TYPE_CONTROL = '<input ng-change="content.onchange ? callAction() : void"' +
    ' input-format="{{content.inputFormat}}" save-format="{{content.saveFormat}}" display-format="{{content.displayFormat}}" '+
    ' placeholder="{{content.fieldPlaceholder}}" date-type="{{content.type}}"  type="text" format-dtm data-date="" ' +
    ' ng-model="saveModel[content.fieldModel]" ' +
    ' ng-disabled="content.isDisabled === true" class="{{content.fieldClass}}" >' ;


var CHK_TYPE_CONTROL=  '<span class="form-check  {{content.fieldClass}}">'
    + ' <label class="form-check-label"> '
    + '  <input type="getType" ng-model="saveModel[content.fieldModel]" '
    + '   ng-disabled="content.isDisabled===true" ng-change="content.onchange ? callAction() : void" >'
    + '     {{content.labelname}}'
    + ' </label>'
    + '</span>';


var RADIO_TYPE_CONTROL=  '<span ng-repeat="opt in content.options" class="form-check  {{content.fieldClass}}">'
                        + ' <label class="form-check-label"> '
                        + '  <input type="getType"  ng-disabled="content.isDisabled===true" ng-model="saveModel[content.fieldModel]" value="{{opt.value}}" ng-change="content.onchange ? callAction() : void" >'
                        + '     {{opt.label}}'
                        + ' </label>'
                        + '</span>';


var SEL_CONTROL = ' <select class="form-control {{content.fieldClass}}" ng-change="content.onchange ? callAction() : void"   '
                     + ' ng-disabled="content.isDisabled===true" ng-model="saveModel[content.fieldModel]" '
                     +  'ng-options="x[content.optionsDisplay] for x in content.options track by x[content.optionsDisplay]"> '
                     + '<option ng-if="content.defaultOptionStr != null" value="">{{content.defaultOptionStr }}'
                     + '</select>' ;

var SEL_REF_CONTROL =  '<select class="form-control {{content.fieldClass}}" ng-change="content.onchange ? callAction() : void"  '
+    ' ng-disabled="content.isDisabled===true" ng-model="saveModel[content.fieldModel]" '
+  'ng-options="x[content.optionsDisplay] for x in saveModel[content.optionsModel] track by x[content.optionsDisplay]"> '
+ '<option ng-if="content.defaultOptionStr != null" value="">{{content.defaultOptionStr }}'
+ '</select>' ;


var INPUT_TEMPLATE = INPUT_TYPE_LABEL + " " + INPUT_TYPE_CONTROL;
var DATE_TEMPLATE = DATE_TYPE_LABEL + " " + DATE_TYPE_CONTROL ;
var CHK_TEMPLATE =  CHK_TYPE_CONTROL ;
var RADIO_TEMPLATE = INPUT_TYPE_LABEL + " " + RADIO_TYPE_CONTROL ;

var TEXT_AREA_TEMPLATE = INPUT_TYPE_LABEL + " " + TEXT_AREA_CONTROL ;
 //TODO: figure out how to disable this
var STYLED_CHK_TEMPLATE  = '<label class="custom-control custom-checkbox">' +
    '<input type="checkbox" ng-change="content.onchange ? callAction() : void"  class="custom-control-input" ng-model="saveModel[content.fieldModel]">' +
    '<span class="custom-control-indicator"></span>' +
    '<span class="custom-control-description">{{content.labelname}}</span>' +
    '</label>' ;

var FILE_UPLOAD_CONTROL = '<input type="file"  ng-disabled="content.isDisabled===true" class="{{content.fieldClass}}">' ;


var SEL_TEMPLATE = INPUT_TYPE_LABEL + " " + SEL_CONTROL ;
var SEL_REF_TEMPLATE = INPUT_TYPE_LABEL + " " + SEL_REF_CONTROL ;
var IMG_TEMPLATE = '<img ng-src="{{content.src}}" class="{{content.fieldClass}}">';
var FILE_UPLOAD_TEMPLATE = INPUT_TYPE_LABEL + " " + FILE_UPLOAD_CONTROL ;


function getFieldWrapper(fieldWrappers, template){

    if(!fieldWrappers)
        return template;

    try {
        var templateWithWrapper = "" ;

        var allWrappers = fieldWrappers.split(',');
        var wrapperNames =[] ;


        for(var i=0 ;i< allWrappers.length ; i++)
        {
            var wrapperContent = allWrappers[i].split('[');

            if(wrapperContent.length > 1) {
                var wrapperContainer = wrapperContent[0];
                wrapperNames.push(wrapperContainer);
                var wrapperClass = wrapperContent[1].replace(']', '');
                templateWithWrapper+=  "<"  + wrapperContainer + " class='" + wrapperClass +"'" + "> "   ;
            }else{
                wrapperContainer = wrapperContent ;
                wrapperNames.push(wrapperContainer);
                templateWithWrapper+=  "<"  + wrapperContainer + "> "   ;
        }

        }

        templateWithWrapper += template ;

        for(var i=wrapperNames.length-1; i>=0; i--){
            templateWithWrapper+=  " </"  + wrapperNames[i]  + ">";
        }

    }catch(ex){
        console.log("Invalid format for wrapper. Example: div[class1 class2],span[class=3 class=4]... ", ex.message) ;
    }
   return   templateWithWrapper ;


}

function getTemplate(fieldType, fieldWrapper) {
    var template = '';

    switch (fieldType) {
        case 'text':
            template = getFieldWrapper(fieldWrapper, INPUT_TEMPLATE.replace('getType', 'text'));
            break;
        case 'textarea':
            template = getFieldWrapper(fieldWrapper, TEXT_AREA_TEMPLATE);
            break;
        case 'number':
            template = getFieldWrapper(fieldWrapper, INPUT_TEMPLATE.replace('getType', 'number'));
            break;
        case 'password':
            template = getFieldWrapper(fieldWrapper, INPUT_TEMPLATE.replace('getType', 'password'));
            break;
        case 'email':
            template = getFieldWrapper(fieldWrapper, INPUT_TEMPLATE.replace('getType', 'email'));
            break;
        case 'date' : case 'time':
            template = getFieldWrapper(fieldWrapper, DATE_TEMPLATE);
            break;
        case 'checkbox':
             template = getFieldWrapper(fieldWrapper, CHK_TEMPLATE.replace('getType', 'checkbox'));
            break;
        case 'radio':
            template = getFieldWrapper(fieldWrapper, RADIO_TEMPLATE.replace('getType', 'radio'));
            break;
        case 'select':
            template = getFieldWrapper(fieldWrapper, SEL_TEMPLATE);
            break;
        case 'selectRef':
            template = getFieldWrapper(fieldWrapper, SEL_REF_TEMPLATE);
            break;
        case 'styled-checkbox':
            template = getFieldWrapper(fieldWrapper, STYLED_CHK_TEMPLATE) ;
            break;
        case 'img' :
            template = getFieldWrapper(fieldWrapper, IMG_TEMPLATE);
            break;
        case 'file' ://TODO: revisit
            template = getFieldWrapper(fieldWrapper, FILE_UPLOAD_TEMPLATE);
            break;
    }
    return template;
}

