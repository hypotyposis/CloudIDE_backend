/*! For license information please see app.06583402ae5ae3bcd891.js.LICENSE */
webpackJsonp([2],{"+0Qw":function(t,e){},"+Tn7":function(t,e){},"0u1n":function(t,e){},"1O6n":function(t,e){},"4YMn":function(t,e){},"4Yhh":function(t,e){},"5RGO":function(t,e){},"5kgg":function(t,e){},"6nME":function(t,e){},"7Do+":function(t,e){},"84z/":function(t,e){},"8BNP":function(t,e){},"8EM9":function(t,e){},"9vcT":function(t,e){},"EG+O":function(t,e){},Eawl:function(t,e){},Gu5N:function(t,e){},KL86:function(t,e){},KU51:function(t,e){},"L/b2":function(t,e){},LC7R:function(t,e){},LCUL:function(t,e){},MfYP:function(t,e){},MlKm:function(t,e){},NHnr:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=o("lRwf"),i=o.n(n),s={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var a=o("VU/8")({name:"App"},s,!1,function(t){o("4YMn")},null,null).exports,c=o("pRNm"),r=o.n(c),l=o("//Fk"),u=o.n(l),d=o("mvHQ"),h=o.n(d),f=o("Ny4g"),m=(o("TFmH"),{name:"CodeMirror",props:{language:{type:String,default:"C++"}},data:function(){return{monacoEditor:{},cinEditor:{},coutEditor:{},fontSize:15,direction:"",uid:"",websocket:null,lockReconnect:!1,timeoutObj:null,serverTimeoutObj:null,timeoutnum:null,codeShareEditor:null,codeShare:!1,loading:!1,codeValueShared:"",posColumnShared:null,posRowShared:null}},methods:{initCodeShare:function(){var t=this;console.log("init"),this.$nextTick(function(){null==t.codeShareEditor&&(console.log("nextTick..."),t.codeShareEditor=f.d.create(t.$refs.codeShareEditor,{value:t.codeValueShared||"#include <bits/stdc++.h>\nusing namespace std;\n\nint main(void) {\n\n\treturn 0;\n}",readOnly:!0,theme:"vs-light",language:"cpp",fontSize:16,automaticLayout:!0}),t.codeShareEditor.addCommand(f.b.CtrlCmd|f.a.KEY_C,function(){return null}),t.codeShareEditor.onDidChangeCursorSelection(function(){var e=t.codeShareEditor.getPosition(),o=e.column,n=e.lineNumber;console.log({column:o,lineNumber:n}),t.codeShareEditor.setPosition({lineNumber:n,column:o})}))})},buildCodeShare:function(){var t=this;this.codeShareEditor.addCommand(f.b.CtrlCmd|f.a.KEY_C,function(){return console.log("Ctrl C"),null}),this.codeShareEditor.addCommand(f.b.CtrlCmd|f.a.KEY_X,function(){return console.log("Ctrl X"),null}),this.codeShareEditor.onDidChangeCursorSelection(function(){var e=t.codeShareEditor.getPosition(),o=e.column,n=e.lineNumber;console.log({column:o,lineNumber:n}),t.codeShareEditor.setPosition({lineNumber:n,column:o})})},revealCodeShare:function(){console.log("revealCodeShare..."),this.codeShare=!0},handleClose:function(t){var e=this;this.loading||this.$confirm("确定要提交表单吗？").then(function(o){e.loading=!0,e.timer=setTimeout(function(){t(),setTimeout(function(){e.loading=!1},400)},2e3)}).catch(function(t){})},tryws:function(){console.log("close websocket"),this.websocket.close()},initSocket:function(){var t=this,e=new WebSocket("ws://ide-ws.hz.ac-code.com/ws/code/"+this.uid+"/");this.websocket=e,this.websocket.onopen=function(e){console.log("websocket connected");var o={};o.uid=t.uid,o.codeValue=t.monacoEditor.getValue(),o.cinEditor=t.cinEditor.getValue(),o.coutValue=t.coutEditor.getValue(),o.posColumn=t.monacoEditor.getPosition().column,o.posRow=t.monacoEditor.getPosition().lineNumber,console.log(h()(o)),t.websocket.send(h()(o)),t.startHeartbeat()},this.websocket.onclose=function(e){console.log(e.code,e.reason,e.wasClean),t.reconnect()},this.websocket.onmessage=function(e){if(console.log("accept ws message! ",e.data),"Heartbeat Checked"!==e.data){var o;if("new teacher link up!"===(o=JSON.parse(e.data)).message){var n={};return n.uid=t.uid,n.codeValue=t.monacoEditor.getValue(),n.cinValue=t.cinEditor.getValue(),n.coutValue=t.coutEditor.getValue(),n.posColumn=t.monacoEditor.getPosition().column,n.posRow=t.monacoEditor.getPosition().lineNumber,console.log(h()(n)),void t.websocket.send(h()(n))}if("codeShare"===(o=JSON.parse(o.message)).messageType){console.log("receive code share message: ",o.codeValue);var i={encode:function(t){return btoa(encodeURIComponent(t).replace(/%([0-9A-F]{2})/g,function(t,e){return String.fromCharCode("0x"+e)}))},decode:function(t){return decodeURIComponent(atob(t).split("").map(function(t){return"%"+("00"+t.charCodeAt(0).toString(16)).slice(-2)}).join(""))}};t.codeValueShared=i.decode(o.codeValue),t.posColumnShared=o.posColumn,t.posRowShared=o.posRow,null!=t.codeShareEditor&&(t.codeShareEditor.setValue(t.codeValueShared),t.codeShareEditor.setPosition({column:t.posColumnShared,lineNumber:t.posRowShared}))}}else t.resetHeartbeat()},this.websocket.onerror=function(e){console.log(t.websocket.readyState),t.reconnect()}},reconnect:function(){console.log("reconnecting...");var t=this;this.lockReconnect||(this.lockReconnect=!0,this.timeoutnum&&clearTimeout(this.timeoutnum),this.timeoutnum=setTimeout(function(){t.initSocket(),t.lockReconnect=!1},5e3))},startHeartbeat:function(){var t=this,e=3;this.timeoutObj&&clearTimeout(this.timeoutObj),this.serverTimeoutObj&&clearTimeout(this.serverTimeoutObj),this.timeoutObj=setTimeout(function(){1===t.websocket.readyState?t.websocket.send("Heartbeat Check"):(console.log("websocket is disconnected"),t.reconnect()),t.serverTimeoutObj=setTimeout(function(){0===--e&&t.websocket.close()},5e3)},5e3)},resetHeartbeat:function(){clearTimeout(this.timeoutObj),clearTimeout(this.serverTimeoutObj),this.startHeartbeat()},changeFontSize:function(t){if(17===t.keyCode){console.log("ctrl pressed");this.monacoEditor.updateOptions({scrollbar:{alwaysConsumeMouseWheel:!1,handleMouseWheel:!1}}),window.addEventListener("mousewheel",this.handleScroll,!0,{passive:!1})}121===t.keyCode&&(console.log("F10 pressed"),!1===this.codeShare?this.revealCodeShare():this.codeShare=!1)},removeListener:function(t){if(17===t.keyCode){console.log("ctrl unpressed");this.monacoEditor.updateOptions({scrollbar:{alwaysConsumeMouseWheel:!1,handleMouseWheel:!0}}),window.removeEventListener("mousewheel",this.handleScroll,!0,{passive:!1})}},debounce:function(t,e){var o=void 0;return function(){var n=this,i=arguments;o&&clearTimeout(o),o=setTimeout(function(){t.apply(n,i)},e)}},handleScroll:function(t){if(console.log("handleScrolling..."),this.direction=t.deltaY>0?"down":"up","down"==this.direction){this.fontSize=this.fontSize-.5;var e={fontSize:this.fontSize};this.monacoEditor.updateOptions(e)}else if("up"==this.direction){this.fontSize=this.fontSize+.5;var o={fontSize:this.fontSize};this.monacoEditor.updateOptions(o)}t.preventDefault()},submit:function(){var t=this.monacoEditor.getValue();console.log(t);var e=this.cinEditor.getValue();this.coutEditor.setValue("编译运行中...");var o=this,n=(new Date).valueOf();console.log(n),this.$axios.post("/api/code/",{code:t,cin:e,timestamp:n}).then(function(t){console.log(t),o.coutEditor.setValue(t.data+"")}).catch(function(t){console.log(t)})}},computed:{socketStatus:function(){return this.websocket.readyState}},created:function(){var t=this;new u.a(function(e,o){t.$axios.post("/api/codemonitor/",{usertype:"student"}).then(function(o){console.log(o.data),t.uid=o.data,e("solved")})}).then(function(e){t.initSocket()})},destroyed:function(){console.log("destroyed..."),this.websocket.close(),window.removeEventListener("keydown",this.changeFontSize),window.removeEventListener("keyup",this.removeListener)},mounted:function(){var t=this;window.addEventListener("keydown",this.changeFontSize),window.addEventListener("keyup",this.removeListener),console.log("creating monacoEditor..."),this.monacoEditor=f.d.create(this.$refs.monacoEditor,{value:"#include <bits/stdc++.h>\nusing namespace std;\n\nint main(void) {\n\n\treturn 0;\n}",readOnly:!1,language:"cpp",theme:"vs-light",fontSize:this.fontSize,folding:!0,scrollbar:{alwaysConsumeMouseWheel:!1,vertical:"hidden"},automaticLayout:!0}),this.monacoEditor.getModel().onDidChangeContent(function(e){console.log("change content"),console.log(e),console.log(t.monacoEditor.getValue());var o={};o.uid=t.uid,o.codeValue=t.monacoEditor.getValue(),o.cinValue=t.cinEditor.getValue(),o.coutValue=t.coutEditor.getValue(),o.posColumn=t.monacoEditor.getPosition().column,o.posRow=t.monacoEditor.getPosition().lineNumber,console.log(h()(o)),t.websocket.send(h()(o))});this.monacoEditor.deltaDecorations([],[{range:new f.c(3,1,5,1),options:{isWholeLine:!0,linesDecorationsClassName:"myLineDecoration"}},{range:new f.c(7,1,7,24),options:{inlineClassName:"myInlineDecoration"}}]);this.cinEditor=f.d.create(this.$refs.cinEditor,{value:"",readOnly:!1,theme:"vs-light",fontSize:14,minimap:{enabled:!1},automaticLayout:!0}),this.cinEditor.getModel().onDidChangeContent(function(e){console.log("change cin content"),console.log(e),console.log(t.cinEditor.getValue());var o={};o.uid=t.uid,o.codeValue=t.monacoEditor.getValue(),o.cinValue=t.cinEditor.getValue(),o.coutValue=t.coutEditor.getValue(),o.posColumn=t.cinEditor.getPosition().column,o.posRow=t.cinEditor.getPosition().lineNumber,console.log(h()(o)),t.websocket.send(h()(o))}),this.coutEditor=f.d.create(this.$refs.coutEditor,{value:"",readOnly:!0,theme:"vs-light",fontSize:14,minimap:{enabled:!1},automaticLayout:!0}),this.coutEditor.getModel().onDidChangeContent(function(e){console.log("change cout content"),console.log(e),console.log(t.coutEditor.getValue());var o={};o.uid=t.uid,o.codeValue=t.monacoEditor.getValue(),o.cinValue=t.cinEditor.getValue(),o.coutValue=t.coutEditor.getValue(),o.posColumn=t.coutEditor.getPosition().column,o.posRow=t.coutEditor.getPosition().lineNumber,console.log(h()(o)),t.websocket.send(h()(o))})}}),g={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"ide-canvas"},[o("el-drawer",{attrs:{title:"这里是教师分享的代码",visible:t.codeShare,direction:"rtl",size:"70%"},on:{"update:visible":function(e){t.codeShare=e},open:function(e){return t.initCodeShare()},opened:function(e){return t.buildCodeShare()}}},[o("div",{ref:"codeShareEditor",staticStyle:{width:"100%",height:"100%",float:"left"}})]),t._v(" "),o("div",{staticClass:"editor-top-bar",staticStyle:{width:"100%",height:"auto",float:"left",display:"flex","flex-direction":"row"}},[t._m(0),t._v(" "),o("el-select",{staticStyle:{height:"30px",float:"right"},attrs:{size:"mini"},on:{change:t.onLangChange},model:{value:t.language,callback:function(e){t.language=e},expression:"language"}},t._l(t.languages,function(e){return o("Option",{key:e,attrs:{value:e}},[t._v(t._s(e)+"\n            ")])}),1)],1),t._v(" "),o("div",{staticStyle:{width:"100%",height:"70%"},attrs:{id:"container"}},[o("div",{ref:"monacoEditor",staticStyle:{width:"100%",height:"100%",float:"left"}}),t._v(" "),t._m(1),t._v(" "),o("div",{staticClass:"editor-top-bar",staticStyle:{width:"50%",height:"auto",float:"left"}},[t._m(2),t._v(" "),o("el-button",{staticStyle:{height:"auto",float:"right"},attrs:{id:"submitButton",size:"small"},on:{click:t.submit}},[t._v("编译运行")])],1),t._v(" "),o("div",{staticStyle:{width:"50%",height:"30%",float:"left"},attrs:{id:"input-container"}},[o("div",{ref:"cinEditor",staticStyle:{width:"100%",height:"100%",float:"left"}})]),t._v(" "),o("div",{staticStyle:{width:"50%",height:"30%",float:"left"},attrs:{id:"output-container"}},[o("div",{ref:"coutEditor",staticStyle:{width:"100%",height:"100%",float:"left"}})])])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"editor-tab",staticStyle:{"text-align":"center"}},[e("span",{staticStyle:{"font-family":"arial",color:"grey","font-size":"14px"}},[this._v("代码")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"editor-top-bar",staticStyle:{width:"50%",height:"auto",float:"left"}},[e("div",{staticClass:"editor-tab",staticStyle:{float:"left","text-align":"center"}},[e("span",{staticStyle:{"font-family":"arial",color:"grey","font-size":"14px"}},[this._v("输入")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"editor-tab",staticStyle:{float:"left","text-align":"center"}},[e("span",{staticStyle:{"font-family":"arial",color:"grey","font-size":"14px"}},[this._v("输出")])])}]};var v=o("VU/8")(m,g,!1,function(t){o("OdDG")},"data-v-ddf0baa2",null).exports,S=o("Zrlr"),p=o.n(S),b=o("wxAW"),w=o.n(b),E=(function(){function t(){p()(this,t),this.id=0}w()(t,[{key:"getId",value:function(){return this.id++,this.id}}])}(),{data:function(){return{editor:{},fontSize:16,websocket:null,timestamp:0,id:0,signature:"",uid:""}},methods:{getTimeStamp:function(){return this.timeStamp++,this.timeStamp},setTimeStamp:function(t){this.timeStamp=t},updateTimeStamp:function(t){t>this.timeStamp&&(this.timeStamp=t)},getId:function(){return this.id++,this.id}},mounted:function(){var t=this;this.$axios.post("/api/codemonitor/",{usertype:"student"}).then(function(e){console.log(e.data),t.uid=e.data}),this.editor=monaco.editor.create(this.$refs.editor,{value:"#include <bits/stdc++.h>\nusing namespace std;\n\nint main(void) {\n\n\treturn 0;\n}",readOnly:!1,language:"cpp",theme:"vs-light",fontSize:this.fontSize,folding:!0}),this.editor.getModel().onDidChangeContent(function(e){console.log("change content"),console.log(e),console.log(t.editor.getValue()),t.websocket.send(t.editor.getValue())})},created:function(){var t=new WebSocket("ws://localhost:8000/ws/code/");this.websocket=t},computed:function(){}}),C={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"ide-canvas"},[e("div",{ref:"editor",staticStyle:{width:"100%",height:"100%",float:"left"}})])},staticRenderFns:[]};var y=o("VU/8")(E,C,!1,function(t){o("6nME")},"data-v-0b3e08f8",null).exports,k={data:function(){return{uid:"",fontSize:16,students:[],currentStudent:"",editor:null,cinEditor:null,coutEditor:null,lockReconnect:!1,timeoutObj:null,serverTimeoutObj:null,timeoutnum:null,websocketStatus:"",logMessage:"",statusColor:"green",codeShareEditor:null,codeShare:!1,loading:!1}},methods:{initCodeShare:function(){var t=this;console.log("init"),this.$nextTick(function(){null==t.codeShareEditor&&(console.log("nextTick..."),t.codeShareEditor=monaco.editor.create(t.$refs.codeShareEditor,{value:"#include <bits/stdc++.h>\nusing namespace std;\n\nint main(void) {\n\n\treturn 0;\n}",readOnly:!1,theme:"vs-light",language:"cpp",fontSize:16,automaticLayout:!0}))})},buildCodeListener:function(){var t=this;this.codeShareEditor.getModel().onDidChangeContent(function(e){console.log("change content"),console.log(t.codeShareEditor.getValue());var o={messageType:"codeShare"};o.uid=t.uid;var n=function(t){return btoa(encodeURIComponent(t).replace(/%([0-9A-F]{2})/g,function(t,e){return String.fromCharCode("0x"+e)}))};o.codeValue=n(t.codeShareEditor.getValue()),console.log("codeValue in Base64: ",o.codeValue),o.posColumn=t.codeShareEditor.getPosition().column,o.posRow=t.codeShareEditor.getPosition().lineNumber,console.log(h()(o)),t.websocket.send(h()(o))})},revealCodeShare:function(){console.log("revealCodeShare..."),this.codeShare=!0},handleClose:function(t){var e=this;this.loading||this.$confirm("确定要提交表单吗？").then(function(o){e.loading=!0,e.timer=setTimeout(function(){t(),setTimeout(function(){e.loading=!1},400)},2e3)}).catch(function(t){})},updateLogMessage:function(t){var e=(new Date).getTime();e=new Date(e).toLocaleString(),this.logMessage=this.logMessage+e+" "+t+"\n"},setValue:function(){for(var t in console.log("setValue..."),console.log(this.students),this.students)if(console.log(this.students[t][0]),this.students[t][0]==this.currentStudent){console.log("yes!");var e=this.students[t][1],o=this.students[t][2],n=this.students[t][3],i=this.students[t][4],s=this.students[t][5];null!=e?this.editor.setValue(e):this.editor.setValue(""),null!=o?this.cinEditor.setValue(o):this.cinEditor.setValue(""),null!=n?this.coutEditor.setValue(n):this.coutEditor.setValue(""),this.editor.setPosition({column:i,lineNumber:s}),console.log(this.editor.getPosition())}},chooseStudent:function(t){console.log("buttonValue:"+t),this.currentStudent=t,this.setValue()},deleteButton:function(t){for(var e in this.students)console.log("deleting..."),this.students[e][0]==t&&(this.students.splice(e,1),t==this.currentStudent&&(this.editor.setValue("当前会话已关闭"),this.cinEditor.setValue(""),this.coutEditor.setValue("")),console.log("delete success!"),this.updateLogMessage(t+" 断开连接！"))},initSocket:function(){var t=this,e=new WebSocket("ws://ide-ws.hz.ac-code.com/ws/code/"+this.uid+"/");this.websocket=e,this.websocket.onopen=function(e){t.$message.success("WebSocket 连接成功！"),t.startHeartbeat(),t.websocketStatus="Connected",t.statusColor="green",t.updateLogMessage("与服务器连接成功")},this.websocket.onmessage=function(e){if(console.log(e.data),"Heartbeat Checked"!==e.data){var o=JSON.parse(e.data);if(console.log(o),"Close!"===o.message)return console.log("Closing!"),console.log("uid:"+o.uid),void t.deleteButton(o.uid);if("new student link up!"===o.message){console.log("new student link up!");var n={messageType:"codeShare"};return n.uid=t.uid,t.codeShareEditor?(n.codeValue=t.codeShareEditor.getValue(),n.posColumn=t.codeShareEditor.getPosition().column,n.posRow=t.codeShareEditor.getPosition().lineNumber):(n.codeValue="",n.posColumn=0,n.posRow=0),console.log(h()(n)),void t.websocket.send(h()(n))}o=JSON.parse(o.message),console.log(o);var i=o.uid,s=!1;for(var a in 0==t.students.length&&(t.currentStudent=i),t.students)if(t.students[a][0]==i){t.students[a][1]=o.codeValue,t.students[a][2]=o.cinValue,t.students[a][3]=o.coutValue,t.students[a][4]=o.posColumn,t.students[a][5]=o.posRow,console.log(t.students),s=!0,t.setValue();break}0==s&&(t.updateLogMessage(i+" 连接了服务器"),t.students.push([i,o.codeValue,o.cinValue,o.coutValue,o.posColumn,o.posRow]),t.setValue())}else t.resetHeartbeat()},this.websocket.onclose=function(e){console.log(e.code,e.reason,e.wasClean),t.$message.error("WebSocket 连接已断开! "),t.updateLogMessage("与服务器断开！！！"),t.websocketStatus="Closed",t.statusColor="red",t.reconnect()}},reconnect:function(){console.log("reconnecting..."),this.updateLogMessage("正在重连...");var t=this;this.lockReconnect||(this.lockReconnect=!0,this.timeoutnum&&clearTimeout(this.timeoutnum),this.timeoutnum=setTimeout(function(){t.initSocket(),t.lockReconnect=!1},2e3))},startHeartbeat:function(){var t=this,e=1;this.timeoutObj&&clearTimeout(this.timeoutObj),this.serverTimeoutObj&&clearTimeout(this.serverTimeoutObj),this.timeoutObj=setTimeout(function(){1===t.websocket.readyState?t.websocket.send("Heartbeat Check"):(console.log("websocket is disconnected"),t.reconnect()),t.serverTimeoutObj=setTimeout(function(){0===--e&&t.websocket.close()},5e3)},5e3)},resetHeartbeat:function(){clearTimeout(this.timeoutObj),clearTimeout(this.serverTimeoutObj),this.startHeartbeat()}},mounted:function(){this.editor=monaco.editor.create(this.$refs.editor,{value:"//此处显示学生的代码",readOnly:!0,language:"cpp",theme:"vs-light",fontSize:this.fontSize,folding:!0,automaticLayout:!0}),this.cinEditor=monaco.editor.create(this.$refs.cinEditor,{value:"",readOnly:!0,theme:"vs-light",fontSize:12,minimap:{enabled:!1}}),this.coutEditor=monaco.editor.create(this.$refs.coutEditor,{value:"",readOnly:!0,theme:"vs-light",fontSize:12,minimap:{enabled:!1}}),document.getElementById("textField").value="这里是日志消息"},created:function(){var t=this;new u.a(function(e,o){t.$axios.post("/api/codemonitor/",{usertype:"teacher"}).then(function(o){console.log(o.data),t.uid=o.data,e("solved")})}).then(function(e){t.initSocket()})},destroyed:function(){this.websocket.close()}},V={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"ide-canvas"},[o("el-drawer",{attrs:{title:"在这里编辑代码",visible:t.codeShare,direction:"rtl",size:"70%"},on:{"update:visible":function(e){t.codeShare=e},open:function(e){return t.initCodeShare()},opened:function(e){return t.buildCodeListener()}}},[o("div",{ref:"codeShareEditor",staticStyle:{width:"100%",height:"100%",float:"left"}})]),t._v(" "),o("div",{staticClass:"header",staticStyle:{width:"100%",height:"5%","background-color":"#ececec",border:"1px solid #ececec"}},[o("div",{staticClass:"editor-tab",staticStyle:{"text-align":"center",float:"left"}},[o("span",{staticStyle:{"font-family":"arial",color:"grey","font-size":"14px"}},[t._v(t._s(t.currentStudent))])]),t._v(" "),o("el-button",{attrs:{type:"text"},on:{click:t.revealCodeShare}},[t._v("向学生共享代码")]),t._v(" "),o("div",{staticClass:"editor-tab",staticStyle:{"text-align":"center",float:"right"}},[o("span",{staticStyle:{"font-family":"arial","font-size":"14px"},style:{color:t.statusColor},attrs:{id:"websocketStatus"}},[t._v("WebSocket: "+t._s(t.websocketStatus))])])],1),t._v(" "),o("div",{staticClass:"main",staticStyle:{width:"100%",height:"95%"}},[o("div",{staticClass:"editor-container",staticStyle:{width:"85%",height:"100%",float:"left"}},[o("div",{staticClass:"code-container",staticStyle:{width:"100%",height:"80%",float:"left"}},[o("div",{ref:"editor",staticStyle:{width:"100%",height:"100%",float:"left"}})]),t._v(" "),o("div",{staticStyle:{width:"100%",height:"20%",float:"left"}},[o("div",{staticClass:"cin-container",staticStyle:{width:"50%",height:"100%",float:"left"}},[o("div",{ref:"cinEditor",staticStyle:{width:"100%",height:"100%",float:"left"}})]),t._v(" "),o("div",{staticClass:"cout-container",staticStyle:{width:"50%",height:"100%",float:"right"}},[o("div",{ref:"coutEditor",staticStyle:{width:"100%",height:"100%",float:"left"}})])])]),t._v(" "),o("div",{staticClass:"editor-container-sidebar",staticStyle:{width:"15%",height:"100%",float:"left","align-items":"center"}},[o("div",{staticClass:"namelist-container",staticStyle:{width:"100%",height:"60%","align-items":"center","overflow-y":"auto"}},t._l(t.students,function(e){return o("div",{key:e[1],staticClass:"namelist",attrs:{student:e[0]}},[o("el-button",{attrs:{round:"",type:"primary"},on:{click:function(o){return t.chooseStudent(e[0])}}},[t._v(t._s(e[0]))])],1)}),0)])])],1)},staticRenderFns:[]};var _=o("VU/8")(k,V,!1,function(t){o("uuAb")},"data-v-48085514",null).exports,T={data:function(){return{codeShareEditor:null,codeShare:!1,dialog:!1}},methods:{init:function(){var t=this;console.log("init"),this.$nextTick(function(){console.log("init...",t),t.codeShareEditor=monaco.editor.create(t.$refs.codeShareEditor,{value:"#include <bits/stdc++.h>\nusing namespace std;\n\nint main(void) {\n\n\treturn 0;\n}",readOnly:!0,theme:"vs-light",language:"cpp",fontSize:16}),t.codeShareEditor.addCommand(monaco.KeyMod.CtrlCmd|monaco.KeyCode.KEY_C,function(){return null}),t.codeShareEditor.onDidChangeCursorSelection(function(){var e=t.codeShareEditor.getPosition(),o=e.column,n=e.lineNumber;console.log({column:o,lineNumber:n}),t.codeShareEditor.setPosition({lineNumber:n,column:o})})})},revealCodeShare:function(){console.log("revealCodeShare..."),this.codeShare=!0,console.log(this.codeShareEditor.getValue())},handleClose:function(t){var e=this;this.loading||this.$confirm("确定要提交表单吗？").then(function(o){e.loading=!0,e.timer=setTimeout(function(){t(),setTimeout(function(){e.loading=!1},400)},2e3)}).catch(function(t){})}},mounted:function(){},created:function(){}},O={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"ide-canvas"},[o("el-button",{attrs:{type:"text"},on:{click:t.revealCodeShare}},[t._v("查看教师代码分享")]),t._v(" "),o("el-drawer",{attrs:{title:"这里是教师分享的代码",visible:t.codeShare,direction:"rtl",size:"70%"},on:{"update:visible":function(e){t.codeShare=e},open:function(e){return t.init()}}},[o("div",{ref:"codeShareEditor",staticStyle:{width:"100%",height:"100%",float:"left"}})])],1)},staticRenderFns:[]};var x=o("VU/8")(T,O,!1,function(t){o("kFHT")},"data-v-3acdff66",null).exports,z={data:function(){return{codeShareEditor:null,codeShare:!1,dialog:!1}},methods:{init:function(){var t=this;console.log("init"),this.$nextTick(function(){console.log("init...",t),t.codeShareEditor=monaco.editor.create(t.$refs.codeShareEditor,{value:"#include <bits/stdc++.h>\nusing namespace std;\n\nint main(void) {\n\n\treturn 0;\n}",readOnly:!1,theme:"vs-light",language:"cpp",fontSize:16})})},revealCodeShare:function(){console.log("revealCodeShare..."),this.codeShare=!0,console.log(this.codeShareEditor.getValue())},handleClose:function(t){var e=this;this.loading||this.$confirm("确定要提交表单吗？").then(function(o){e.loading=!0,e.timer=setTimeout(function(){t(),setTimeout(function(){e.loading=!1},400)},2e3)}).catch(function(t){})}},mounted:function(){},created:function(){}},R={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"ide-canvas"},[o("el-button",{attrs:{type:"text"},on:{click:t.revealCodeShare}},[t._v("向同伴共享代码")]),t._v(" "),o("el-drawer",{attrs:{title:"在这里编辑代码",visible:t.codeShare,direction:"rtl",size:"70%"},on:{"update:visible":function(e){t.codeShare=e},open:function(e){return t.init()}}},[o("div",{ref:"codeShareEditor",staticStyle:{width:"100%",height:"100%",float:"left"}})])],1)},staticRenderFns:[]};var N=o("VU/8")(z,R,!1,function(t){o("WkBk")},"data-v-99751040",null).exports;i.a.use(r.a);var M=new VueRouter({mode:"history",routes:[{path:"/",name:"Monaco",component:v},{path:"/edit",name:"CoEdit",component:y},{path:"/monitor",name:"Monitor",component:_},{path:"/test",name:"Playground",component:x},{path:"/test2",name:"ShowCode",component:N}]}),L=o("OMN4"),$=o.n(L),j=o("l6IN"),P=o.n(j);i.a.use(P.a),i.a.prototype.$axios=$.a,$.a.defaults.xsrfHeaderName="X-CSRFToken",$.a.defaults.xsrfCookieName="csrftoken",i.a.config.productionTip=!1,window.MonacoEnvironment={getWorkerUrl:function(){return H}};var H=URL.createObjectURL(new Blob(["\n    self.MonacoEnvironment = {\n        baseUrl: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.21.2/min'\n    };\n    importScripts('https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.21.2/min/vs/base/worker/workerMain.min.js');\n"],{type:"text/cpp"}));new i.a({el:"#app",router:M,components:{App:a},template:"<App/>"})},OMN4:function(t,e){t.exports=axios},OdDG:function(t,e){},OkZj:function(t,e){},"R/+A":function(t,e){},WkBk:function(t,e){},XTA7:function(t,e){},byCY:function(t,e){},czDl:function(t,e){},gCdB:function(t,e){},gvGx:function(t,e){},"jF/U":function(t,e){},kFHT:function(t,e){},l6IN:function(t,e){t.exports=ELEMENT},lRwf:function(t,e){t.exports=Vue},nLHh:function(t,e){},nfAi:function(t,e){},pRNm:function(t,e){t.exports=VueRouter},rc56:function(t,e){},sOVj:function(t,e){},sOjV:function(t,e){},sZ3n:function(t,e){},uHSv:function(t,e){},uuAb:function(t,e){},wzEN:function(t,e){},x33M:function(t,e){}},["NHnr"]);