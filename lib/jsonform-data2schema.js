/**
 * @author yuekailu
 * @fileOverview 
 */

(function(global){
	global = global ? global : this;


	function data2format(dataObj){
    if(Object.prototype.toString.call(dataObj) !== "[object Object]")return null;

    dataObj = JSON.parse(JSON.stringify(dataObj));

    var key,val,format,formatObj = {};
    for(key in dataObj){
      val = dataObj[key];
      format = null;
      format = switchType(key, val);
      if(format){
        formatObj[key] = format;
      }
    }

    return formatObj;
  }

  function switchType(key, val){
    var valType, format;
    valType = Object.prototype.toString.call(val).replace(/\[|\]/g, '').split(' ')[1].toLowerCase();
    switch(valType){
      case 'number':
        format = {
          "type":"number",
          "title":key
        }
        break;
      case 'string':
        format = {
          "type":"string",
          "title":key
        }
        break;
      case 'boolean':
        format = {
          "type":"boolean",
          "title":key
        }
        break;
      case 'null':

        break;
      case 'array':
        format = {
          "type":"array",
          "title":key,
          "items":switchType(key + '_{{idx}}', val[0] ? val[0] : '')
        }
        break;
      case 'object':
        format ={
          "type":"object",
          "title":key,
          "properties":data2format(val)
        }
        break;
      default:

    }

    return format;
  }

global.JSONForm = global.JSONForm || {util:{}};
global.JSONForm.util.data2format = data2format;
})(null);