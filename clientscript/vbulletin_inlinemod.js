/*======================================================================*\
|| #################################################################### ||
|| # vBulletin 3.8.11
|| # ---------------------------------------------------------------- # ||
|| # Copyright �2000-2018 vBulletin Solutions Inc. All Rights Reserved. ||
|| # This file may not be redistributed in whole or significant part. # ||
|| # ---------------- VBULLETIN IS NOT FREE SOFTWARE ---------------- # ||
|| #        www.vbulletin.com | www.vbulletin.com/license.html        # ||
|| #################################################################### ||
\*======================================================================*/
function vB_Inline_Mod(A,E,F,C,B,D){this.varname=A;this.type=E.toLowerCase();this.formobj=fetch_object(F);this.go_phrase=C;if(typeof B!="undefined"){this.cookieprefix=B}else{this.cookieprefix="vbulletin_inline"}if(this.type=="thread"){this.list="tlist_"}else{if(this.type=="post"){this.list="plist_"}else{this.list=this.type+"list_"}}if(typeof D!="undefined"){this.highlighttype=D}else{this.highlighttype=this.type}this.cookie_ids=null;this.cookie_array=new Array();this.init=function(H){var G;for(G=0;G<H.length;G++){if(this.is_in_list(H[G])){H[G].inlineModID=this.varname;H[G].onclick=inlinemod_checkbox_onclick}}this.cookie_array=new Array();if(this.fetch_ids()){for(G in this.cookie_ids){if(YAHOO.lang.hasOwnProperty(this.cookie_ids,G)&&this.cookie_ids[G]!=""){if(checkbox=fetch_object(this.list+this.cookie_ids[G])){checkbox.checked=true;if(typeof (this["highlight_"+this.highlighttype])!="undefined"){this["highlight_"+this.highlighttype](checkbox)}}this.cookie_array[this.cookie_array.length]=this.cookie_ids[G]}}}this.set_output_counters()};this.fetch_ids=function(){this.cookie_ids=fetch_cookie(this.cookieprefix+this.type);if(this.cookie_ids!=null&&this.cookie_ids!=""){this.cookie_ids=this.cookie_ids.split("-");if(this.cookie_ids.length>0){return true}}return false};this.toggle=function(G){if(typeof (this["highlight_"+this.highlighttype])!="undefined"){this["highlight_"+this.highlighttype](G)}this.save(G.id.substring(this.list.length),G.checked)};this.save=function(I,H){this.cookie_array=new Array();if(this.fetch_ids()){for(var G in this.cookie_ids){if(YAHOO.lang.hasOwnProperty(this.cookie_ids,G)&&this.cookie_ids[G]!=I&&this.cookie_ids[G]!=""){this.cookie_array[this.cookie_array.length]=this.cookie_ids[G]}}}if(H){this.cookie_array[this.cookie_array.length]=I}this.set_output_counters();this.set_cookie();return true};this.set_cookie=function(){expires=new Date();expires.setTime(expires.getTime()+3600000);set_cookie(this.cookieprefix+this.type,this.cookie_array.join("-"),expires)};this.check_all=function(J,G,H){if(typeof J=="undefined"){J=this.formobj.allbox.checked}this.cookie_array=new Array();if(this.fetch_ids()){for(I in this.cookie_ids){if(YAHOO.lang.hasOwnProperty(this.cookie_ids,I)&&!fetch_object(this.list+this.cookie_ids[I])){this.cookie_array[this.cookie_array.length]=this.cookie_ids[I]}}}counter=0;for(var I=0;I<this.formobj.elements.length;I++){if(this.is_in_list(this.formobj.elements[I])){var K=this.formobj.elements[I];if(typeof G!="undefined"){if(isNaN(G)){if(K.value==G){K.checked=J}}else{if(K.value&G){K.checked=J}else{K.checked=!J}}}else{if(J=="invert"){K.checked=!K.checked}else{K.checked=J}}if(typeof (this["highlight_"+this.highlighttype])!="undefined"){this["highlight_"+this.highlighttype](K)}if(K.checked){this.cookie_array[this.cookie_array.length]=K.id.substring(this.list.length)}}}this.set_output_counters();this.set_cookie();return true};this.is_in_list=function(G){return(G.type=="checkbox"&&G.id.indexOf(this.list)==0&&(G.disabled==false||G.disabled=="undefined"))};this.set_output_counters=function(){var G;if(this.type=="thread"||this.type=="post"){G="inlinego"}else{G=this.type+"_inlinego"}var H;if(H=fetch_object(G)){H.value=construct_phrase(this.go_phrase,this.cookie_array.length)}};this.toggle_highlight=function(G,I,H){if(G.tagName){if(H||YAHOO.util.Dom.hasClass(G,"alt1")||YAHOO.util.Dom.hasClass(G,"alt2")||YAHOO.util.Dom.hasClass(G,"inlinemod")){if(I.checked){YAHOO.util.Dom.addClass(G,"inlinemod")}else{YAHOO.util.Dom.removeClass(G,"inlinemod")}}}};this.highlight_thread=function(J){var G=J;while(G.tagName!="TR"){if(G.parentNode.tagName=="HTML"){break}else{G=G.parentNode}}if(G.tagName=="TR"){var I=G.childNodes;for(var H=0;H<I.length;H++){this.toggle_highlight(I[H],J)}}};this.highlight_post=function(I){if(table=fetch_object(this.type+I.id.substr(this.list.length))){var H=fetch_tags(table,"td");for(var G=0;G<H.length;G++){this.toggle_highlight(H[G],I)}}};this.highlight_message=function(K){var J=0;var H=K.id.substr(this.list.length);var G=YAHOO.util.Dom.get(this.type+H);if(G){this.toggle_highlight(G,K,true);var I=YAHOO.util.Dom.getElementsByClassName("alt2","div",G);if(I.length){this.toggle_highlight(I[0],K)}}};this.highlight_div=function(I){var J;if(J=fetch_object(this.type+I.id.substr(this.list.length))){console.log("Highlight %s",this.type+I.id.substr(this.list.length));this.toggle_highlight(J,I);var H=fetch_tags(J,"div");for(var G=0;G<H.length;G++){this.toggle_highlight(H[G],I)}}};this.init(this.formobj.elements)}function inlinemod_checkbox_onclick(e){var inlineModObj=eval(this.inlineModID);inlineModObj.toggle(this)}function im_init(C,B){var A=fetch_tags(C,"input");if(typeof B=="object"&&typeof B.init=="function"){B.init(A)}else{inlineMod.init(A)}};