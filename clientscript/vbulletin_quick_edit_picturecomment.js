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
function vB_QuickEditor_PictureComment_Vars(A){this.init(A[0],A[1],A[2])}vB_QuickEditor_PictureComment_Vars.prototype.init=function(B,A,C){this.peritemsettings=true;this.pictureid=B;this.xid=A;if(C){this.type="group"}else{this.type="album"}this.target="picturecomment.php";this.postaction="message";this.objecttype="commentid";this.getaction="message";this.ajaxtarget="picturecomment.php";this.ajaxaction="quickedit";this.deleteaction="deletepc";this.messagetype="picturecomment_text_";this.containertype="picturecomment";this.responsecontainer="commentbits"};function vB_QuickEditor_PictureComment(D,A,C,B){this.objectid=D;this.watcher=A;this.vars=C;this.controlid=B;this.originalhtml=null;this.ajax_req=null;this.show_advanced=true;this.messageobj=null;this.node=null;this.progress_indicator=null;this.editbutton=null}vBulletin.extend(vB_QuickEditor_PictureComment,vB_QuickEditor_Generic);vB_QuickEditor_PictureComment.prototype.fetch_editor=function(){if(this.progress_indicator){this.progress_indicator.style.display=""}document.body.style.cursor="wait";YAHOO.util.Connect.asyncRequest("POST",this.vars.ajaxtarget+"?do="+this.vars.ajaxaction+"&"+this.vars.objecttype+"="+this.objectid+"&pictureid="+this.vars.pictureid+"&"+this.vars.type+"id="+this.vars.xid,{success:this.display_editor,failure:this.error_opening_editor,timeout:vB_Default_Timeout,scope:this},SESSIONURL+"securitytoken="+SECURITYTOKEN+"&do="+this.vars.ajaxaction+"&"+this.vars.objecttype+"="+this.objectid+"&pictureid="+this.vars.pictureid+"&"+this.vars.type+"id="+this.vars.xid+"&editorid="+PHP.urlencode(this.editorid))};vB_QuickEditor_Generic.prototype.save=function(B){YAHOO.util.Event.stopEvent(B);var C=vB_Editor[this.editorid].get_editor_contents();var A=YAHOO.util.Dom.get(this.editorid+"_edit_reason");if(C==this.unchanged&&A&&A.value==this.unchanged_reason){this.abort(B)}else{YAHOO.util.Dom.get(this.editorid+"_posting_msg").style.display="";document.body.style.cursor="wait";this.ajax_req=YAHOO.util.Connect.asyncRequest("POST",this.vars.target+"?do"+this.vars.postaction+"&"+this.vars.objecttype+"="+this.objectid+"&pictureid="+this.vars.pictureid+"&"+this.vars.type+"id="+this.vars.xid,{success:this.update,faulure:this.handle_save_error,timeout:vB_Default_Timeout,scope:this},SESSIONURL+"securitytoken="+SECURITYTOKEN+"&do="+this.vars.postaction+"&ajax=1&"+this.vars.objecttype+"="+this.objectid+"&pictureid="+this.vars.pictureid+"&"+this.vars.type+"id="+this.vars.xid+"&wysiwyg="+vB_Editor[this.editorid].wysiwyg_mode+"&message="+PHP.urlencode(C)+"&reason="+PHP.urlencode(YAHOO.util.Dom.get(this.editorid+"_edit_reason").value)+"&parseurl=1");this.pending=true}};vB_QuickEditor_PictureComment.prototype.full_edit=function(B){if(B){YAHOO.util.Event.stopEvent(B)}var A=new vB_Hidden_Form(this.vars.target+"?do="+this.vars.postaction+"&"+this.vars.objecttype+"="+this.objectid+"&pictureid="+this.vars.pictureid+"&"+this.vars.type+"id="+this.vars.xid);A.add_variable("do",this.vars.postaction);A.add_variable("s",fetch_sessionhash());A.add_variable("securitytoken",SECURITYTOKEN);if(this.show_advanced){A.add_variable("advanced",1)}A.add_variable(this.vars.objecttype,this.objectid);A.add_variable(this.vars.type,this.vars.xid);A.add_variable("pictureid",this.vars.pictureid);A.add_variable("wysiwyg",vB_Editor[this.editorid].wysiwyg_mode);A.add_variable("message",vB_Editor[this.editorid].get_editor_contents());A.add_variable("reason",YAHOO.util.Dom.get(this.editorid+"_edit_reason").value);A.submit_form()};vB_QuickEditor_Generic.prototype.fail_url=function(){return this.vars.target+"?"+SESSIONURL+"do="+this.getaction+"&"+this.vars.objecttype+"="+this.objectid+"&pictureid="+this.vars.pictureid+"&"+this.vars.type+"id="+this.vars.xid};