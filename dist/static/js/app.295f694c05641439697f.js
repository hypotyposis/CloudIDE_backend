/*! For license information please see app.295f694c05641439697f.js.LICENSE */
webpackJsonp([2],{"+0Qw":function(t,e){},"+Tn7":function(t,e){},"0u1n":function(t,e){},"1O6n":function(t,e){},"4YMn":function(t,e){},"4Yhh":function(t,e){},"5RGO":function(t,e){},"5kgg":function(t,e){},"6nME":function(t,e){},"7Do+":function(t,e){},"84z/":function(t,e){},"8BNP":function(t,e){},"8EM9":function(t,e){},"9vcT":function(t,e){},E1dP:function(t,e){},"EG+O":function(t,e){},Eawl:function(t,e){},Gu5N:function(t,e){},KL86:function(t,e){},KU51:function(t,e){},"L/b2":function(t,e){},LC7R:function(t,e){},LCUL:function(t,e){},MfYP:function(t,e){},MlKm:function(t,e){},"N/Nz":function(t,e){},NHnr:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=o("lRwf"),i=o.n(n),s={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var a=o("VU/8")({name:"App"},s,!1,function(t){o("4YMn")},null,null).exports,c=o("pRNm"),l=o.n(c),r=o("//Fk"),u=o.n(r),d=o("mvHQ"),h=o.n(d),f=o("Ny4g"),m=(o("TFmH"),{name:"CodeMirror",props:{language:{type:String,default:"C++"}},data:function(){return{monacoEditor:{},cinEditor:{},coutEditor:{},fontSize:15,direction:"",uid:"",websocket:null,lockReconnect:!1,timeoutObj:null,serverTimeoutObj:null,timeoutnum:null}},methods:{tryws:function(){console.log("close websocket"),this.websocket.close()},initSocket:function(){var t=this,e=new WebSocket("ws://ide-ws.ac-code.com/ws/code/"+this.uid+"/");this.websocket=e,this.websocket.onopen=function(e){console.log("websocket connected");var o={};o.uid=t.uid,o.codeValue=t.monacoEditor.getValue(),o.cinEditor=t.cinEditor.getValue(),o.coutValue=t.coutEditor.getValue(),o.posColumn=t.monacoEditor.getPosition().column,o.posRow=t.monacoEditor.getPosition().lineNumber,console.log(h()(o)),t.websocket.send(h()(o)),t.startHeartbeat()},this.websocket.onclose=function(e){console.log(e.code,e.reason,e.wasClean),t.reconnect()},this.websocket.onmessage=function(e){if(console.log("accept ws message!"),"Heartbeat Checked"!==e.data){if("new teacher link up!"===JSON.parse(e.data).message){var o={};o.uid=t.uid,o.codeValue=t.monacoEditor.getValue(),o.cinValue=t.cinEditor.getValue(),o.coutValue=t.coutEditor.getValue(),o.posColumn=t.monacoEditor.getPosition().column,o.posRow=t.monacoEditor.getPosition().lineNumber,console.log(h()(o)),t.websocket.send(h()(o))}}else t.resetHeartbeat()},this.websocket.onerror=function(e){console.log(t.websocket.readyState),t.reconnect()}},reconnect:function(){console.log("reconnecting...");var t=this;this.lockReconnect||(this.lockReconnect=!0,this.timeoutnum&&clearTimeout(this.timeoutnum),this.timeoutnum=setTimeout(function(){t.initSocket(),t.lockReconnect=!1},5e3))},startHeartbeat:function(){console.log("开启心跳");var t=this,e=3;this.timeoutObj&&clearTimeout(this.timeoutObj),this.serverTimeoutObj&&clearTimeout(this.serverTimeoutObj),this.timeoutObj=setTimeout(function(){1===t.websocket.readyState?(t.websocket.send("Heartbeat Check"),console.log("websocket is healthy")):(console.log("websocket is disconnected"),t.reconnect()),t.serverTimeoutObj=setTimeout(function(){0===--e&&t.websocket.close()},5e3)},5e3)},resetHeartbeat:function(){console.log("重置心跳"),clearTimeout(this.timeoutObj),clearTimeout(this.serverTimeoutObj),this.startHeartbeat()},changeFontSize:function(t){if(17===t.keyCode){console.log("ctrl pressed");this.monacoEditor.updateOptions({scrollbar:{alwaysConsumeMouseWheel:!1,handleMouseWheel:!1}}),window.addEventListener("mousewheel",this.handleScroll,!0,{passive:!1})}},removeListener:function(t){if(17===t.keyCode){console.log("ctrl unpressed");this.monacoEditor.updateOptions({scrollbar:{alwaysConsumeMouseWheel:!1,handleMouseWheel:!0}}),window.removeEventListener("mousewheel",this.handleScroll,!0,{passive:!1})}},debounce:function(t,e){var o=void 0;return function(){var n=this,i=arguments;o&&clearTimeout(o),o=setTimeout(function(){t.apply(n,i)},e)}},handleScroll:function(t){if(console.log("handleScrolling..."),this.direction=t.deltaY>0?"down":"up","down"==this.direction){this.fontSize=this.fontSize-.5;var e={fontSize:this.fontSize};this.monacoEditor.updateOptions(e)}else if("up"==this.direction){this.fontSize=this.fontSize+.5;var o={fontSize:this.fontSize};this.monacoEditor.updateOptions(o)}t.preventDefault()},submit:function(){var t=this.monacoEditor.getValue();console.log(t);var e=this.cinEditor.getValue();this.coutEditor.setValue("编译运行中...");var o=this,n=(new Date).valueOf();console.log(n),this.$axios.post("/api/code/",{code:t,cin:e,timestamp:n}).then(function(t){console.log(t),o.coutEditor.setValue(t.data+"")}).catch(function(t){console.log(t)})}},computed:{socketStatus:function(){return this.websocket.readyState}},created:function(){var t=this;new u.a(function(e,o){t.$axios.post("/api/codemonitor/",{usertype:"student"}).then(function(o){console.log(o.data),t.uid=o.data,e("solved")})}).then(function(e){t.initSocket()})},destroyed:function(){console.log("destroyed..."),this.websocket.close(),window.removeEventListener("keydown",this.changeFontSize),window.removeEventListener("keyup",this.removeListener)},mounted:function(){var t=this;window.addEventListener("keydown",this.changeFontSize),window.addEventListener("keyup",this.removeListener),console.log("creating monacoEditor..."),this.monacoEditor=f.b.create(this.$refs.monacoEditor,{value:"#include <bits/stdc++.h>\nusing namespace std;\n\nint main(void) {\n\n\treturn 0;\n}",readOnly:!1,language:"cpp",theme:"vs-light",fontSize:this.fontSize,folding:!0,scrollbar:{alwaysConsumeMouseWheel:!1,vertical:"hidden"},automaticLayout:!0}),this.monacoEditor.getModel().onDidChangeContent(function(e){console.log("change content"),console.log(e),console.log(t.monacoEditor.getValue());var o={};o.uid=t.uid,o.codeValue=t.monacoEditor.getValue(),o.cinValue=t.cinEditor.getValue(),o.coutValue=t.coutEditor.getValue(),o.posColumn=t.monacoEditor.getPosition().column,o.posRow=t.monacoEditor.getPosition().lineNumber,console.log(h()(o)),t.websocket.send(h()(o))});this.monacoEditor.deltaDecorations([],[{range:new f.a(3,1,5,1),options:{isWholeLine:!0,linesDecorationsClassName:"myLineDecoration"}},{range:new f.a(7,1,7,24),options:{inlineClassName:"myInlineDecoration"}}]);this.cinEditor=f.b.create(this.$refs.cinEditor,{value:"",readOnly:!1,theme:"vs-light",fontSize:14,minimap:{enabled:!1},automaticLayout:!0}),this.cinEditor.getModel().onDidChangeContent(function(e){console.log("change cin content"),console.log(e),console.log(t.cinEditor.getValue());var o={};o.uid=t.uid,o.codeValue=t.monacoEditor.getValue(),o.cinValue=t.cinEditor.getValue(),o.coutValue=t.coutEditor.getValue(),o.posColumn=t.cinEditor.getPosition().column,o.posRow=t.cinEditor.getPosition().lineNumber,console.log(h()(o)),t.websocket.send(h()(o))}),this.coutEditor=f.b.create(this.$refs.coutEditor,{value:"",readOnly:!0,theme:"vs-light",fontSize:14,minimap:{enabled:!1},automaticLayout:!0}),this.coutEditor.getModel().onDidChangeContent(function(e){console.log("change cout content"),console.log(e),console.log(t.coutEditor.getValue());var o={};o.uid=t.uid,o.codeValue=t.monacoEditor.getValue(),o.cinValue=t.cinEditor.getValue(),o.coutValue=t.coutEditor.getValue(),o.posColumn=t.coutEditor.getPosition().column,o.posRow=t.coutEditor.getPosition().lineNumber,console.log(h()(o)),t.websocket.send(h()(o))})}}),g={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"ide-canvas"},[o("div",{staticClass:"editor-top-bar",staticStyle:{width:"100%",height:"auto",float:"left"}},[o("el-select",{staticStyle:{height:"30px",float:"right"},on:{change:t.onLangChange},model:{value:t.language,callback:function(e){t.language=e},expression:"language"}},t._l(t.languages,function(e){return o("Option",{key:e,attrs:{value:e}},[t._v(t._s(e)+"\n                ")])}),1),t._v(" "),t._m(0)],1),t._v(" "),o("div",{staticStyle:{width:"100%",height:"70%"},attrs:{id:"container"}},[o("div",{ref:"monacoEditor",staticStyle:{width:"100%",height:"100%",float:"left"}}),t._v(" "),t._m(1),t._v(" "),o("div",{staticClass:"editor-top-bar",staticStyle:{width:"50%",height:"auto",float:"left"}},[t._m(2),t._v(" "),o("el-button",{staticStyle:{height:"auto",float:"right"},attrs:{id:"submitButton",size:"small"},on:{click:t.submit}},[t._v("编译运行")])],1),t._v(" "),o("div",{staticStyle:{width:"50%",height:"30%",float:"left"},attrs:{id:"input-container"}},[o("div",{ref:"cinEditor",staticStyle:{width:"100%",height:"100%",float:"left"}})]),t._v(" "),o("div",{staticStyle:{width:"50%",height:"30%",float:"left"},attrs:{id:"output-container"}},[o("div",{ref:"coutEditor",staticStyle:{width:"100%",height:"100%",float:"left"}})])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"editor-tab",staticStyle:{"text-align":"center"}},[e("span",{staticStyle:{"font-family":"arial",color:"grey","font-size":"14px"}},[this._v("代码")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"editor-top-bar",staticStyle:{width:"50%",height:"auto",float:"left"}},[e("div",{staticClass:"editor-tab",staticStyle:{float:"left","text-align":"center"}},[e("span",{staticStyle:{"font-family":"arial",color:"grey","font-size":"14px"}},[this._v("输入")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"editor-tab",staticStyle:{float:"left","text-align":"center"}},[e("span",{staticStyle:{"font-family":"arial",color:"grey","font-size":"14px"}},[this._v("输出")])])}]};var v=o("VU/8")(m,g,!1,function(t){o("N/Nz")},"data-v-4d64c1b9",null).exports,p=o("Zrlr"),b=o.n(p),w=o("wxAW"),S=o.n(w),y=(function(){function t(){b()(this,t),this.id=0}S()(t,[{key:"getId",value:function(){return this.id++,this.id}}])}(),{data:function(){return{editor:{},fontSize:16,websocket:null,timestamp:0,id:0,signature:"",uid:""}},methods:{getTimeStamp:function(){return this.timeStamp++,this.timeStamp},setTimeStamp:function(t){this.timeStamp=t},updateTimeStamp:function(t){t>this.timeStamp&&(this.timeStamp=t)},getId:function(){return this.id++,this.id}},mounted:function(){var t=this;this.$axios.post("/api/codemonitor/",{usertype:"student"}).then(function(e){console.log(e.data),t.uid=e.data}),this.editor=monaco.editor.create(this.$refs.editor,{value:"#include <bits/stdc++.h>\nusing namespace std;\n\nint main(void) {\n\n\treturn 0;\n}",readOnly:!1,language:"cpp",theme:"vs-light",fontSize:this.fontSize,folding:!0}),this.editor.getModel().onDidChangeContent(function(e){console.log("change content"),console.log(e),console.log(t.editor.getValue()),t.websocket.send(t.editor.getValue())})},created:function(){var t=new WebSocket("ws://localhost:8000/ws/code/");this.websocket=t},computed:function(){}}),E={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"ide-canvas"},[e("div",{ref:"editor",staticStyle:{width:"100%",height:"100%",float:"left"}})])},staticRenderFns:[]};var k=o("VU/8")(y,E,!1,function(t){o("6nME")},"data-v-0b3e08f8",null).exports,C={data:function(){return{uid:"",fontSize:16,students:[],currentStudent:"",editor:null,cinEditor:null,coutEditor:null,lockReconnect:!1,timeoutObj:null,serverTimeoutObj:null,timeoutnum:null,websocketStatus:"",logMessage:"",statusColor:"green"}},methods:{updateLogMessage:function(t){var e=(new Date).getTime();e=new Date(e).toLocaleString(),this.logMessage=this.logMessage+e+" "+t+"\n"},setValue:function(){for(var t in console.log("setValue..."),console.log(this.students),this.students)if(console.log(this.students[t][0]),this.students[t][0]==this.currentStudent){console.log("yes!");var e=this.students[t][1],o=this.students[t][2],n=this.students[t][3],i=this.students[t][4],s=this.students[t][5];null!=e?this.editor.setValue(e):this.editor.setValue(""),null!=o?this.cinEditor.setValue(o):this.cinEditor.setValue(""),null!=n?this.coutEditor.setValue(n):this.coutEditor.setValue(""),this.editor.setPosition({column:i,lineNumber:s}),console.log(this.editor.getPosition())}},chooseStudent:function(t){console.log("buttonValue:"+t),this.currentStudent=t,this.setValue()},deleteButton:function(t){for(var e in this.students)console.log("deleting..."),this.students[e][0]==t&&(this.students.splice(e,1),t==this.currentStudent&&(this.editor.setValue("当前会话已关闭"),this.cinEditor.setValue(""),this.coutEditor.setValue("")),console.log("delete success!"),this.updateLogMessage(t+" 断开连接！"))},initSocket:function(){var t=this,e=new WebSocket("ws://ide-ws.ac-code.com/ws/code/"+this.uid+"/");this.websocket=e,this.websocket.onopen=function(e){t.$message.success("WebSocket 连接成功！"),t.startHeartbeat(),t.websocketStatus="Connected",t.statusColor="green",t.updateLogMessage("与服务器连接成功")},this.websocket.onmessage=function(e){if(console.log(e.data),"Heartbeat Checked"!==e.data){var o=JSON.parse(e.data);if(console.log(o),"Close!"===o.message)return console.log("Closing!"),console.log("uid:"+o.uid),void t.deleteButton(o.uid);o=JSON.parse(o.message),console.log(o);var n=o.uid,i=!1;for(var s in 0==t.students.length&&(t.currentStudent=n),t.students)if(t.students[s][0]==n){t.students[s][1]=o.codeValue,t.students[s][2]=o.cinValue,t.students[s][3]=o.coutValue,t.students[s][4]=o.posColumn,t.students[s][5]=o.posRow,console.log(t.students),i=!0,t.setValue();break}0==i&&(t.updateLogMessage(n+" 连接了服务器"),t.students.push([n,o.codeValue,o.cinValue,o.coutValue,o.posColumn,o.posRow]),t.setValue())}else t.resetHeartbeat()},this.websocket.onclose=function(e){console.log(e.code,e.reason,e.wasClean),t.$message.error("WebSocket 连接已断开! "),t.updateLogMessage("与服务器断开！！！"),t.websocketStatus="Closed",t.statusColor="red",t.reconnect()}},reconnect:function(){console.log("reconnecting..."),this.updateLogMessage("正在重连...");var t=this;this.lockReconnect||(this.lockReconnect=!0,this.timeoutnum&&clearTimeout(this.timeoutnum),this.timeoutnum=setTimeout(function(){t.initSocket(),t.lockReconnect=!1},2e3))},startHeartbeat:function(){console.log("开启心跳");var t=this,e=1;this.timeoutObj&&clearTimeout(this.timeoutObj),this.serverTimeoutObj&&clearTimeout(this.serverTimeoutObj),this.timeoutObj=setTimeout(function(){1===t.websocket.readyState?(t.websocket.send("Heartbeat Check"),console.log("websocket is healthy")):(console.log("websocket is disconnected"),t.reconnect()),t.serverTimeoutObj=setTimeout(function(){0===--e&&t.websocket.close()},5e3)},5e3)},resetHeartbeat:function(){console.log("重置心跳"),clearTimeout(this.timeoutObj),clearTimeout(this.serverTimeoutObj),this.startHeartbeat()}},mounted:function(){this.editor=monaco.editor.create(this.$refs.editor,{value:"//此处显示学生的代码",readOnly:!0,language:"cpp",theme:"vs-light",fontSize:this.fontSize,folding:!0}),this.cinEditor=monaco.editor.create(this.$refs.cinEditor,{value:"",readOnly:!0,theme:"vs-light",fontSize:12,minimap:{enabled:!1}}),this.coutEditor=monaco.editor.create(this.$refs.coutEditor,{value:"",readOnly:!0,theme:"vs-light",fontSize:12,minimap:{enabled:!1}}),document.getElementById("textField").value="这里是日志消息"},created:function(){var t=this;new u.a(function(e,o){t.$axios.post("/api/codemonitor/",{usertype:"teacher"}).then(function(o){console.log(o.data),t.uid=o.data,e("solved")})}).then(function(e){t.initSocket()})},destroyed:function(){this.websocket.close()}},V={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"ide-canvas"},[o("div",{staticClass:"header",staticStyle:{width:"100%",height:"5%","background-color":"#ececec",border:"1px solid #ececec"}},[o("div",{staticClass:"editor-tab",staticStyle:{"text-align":"center",float:"left"}},[o("span",{staticStyle:{"font-family":"arial",color:"grey","font-size":"14px"}},[t._v(t._s(t.currentStudent))])]),t._v(" "),o("div",{staticClass:"editor-tab",staticStyle:{"text-align":"center",float:"right"}},[o("span",{staticStyle:{"font-family":"arial","font-size":"14px"},style:{color:t.statusColor},attrs:{id:"websocketStatus"}},[t._v("WebSocket: "+t._s(t.websocketStatus))])])]),t._v(" "),o("div",{staticClass:"main",staticStyle:{width:"100%",height:"95%"}},[o("div",{staticClass:"editor-container",staticStyle:{width:"85%",height:"100%",float:"left"}},[o("div",{staticClass:"code-container",staticStyle:{width:"100%",height:"80%",float:"left"}},[o("div",{ref:"editor",staticStyle:{width:"100%",height:"100%",float:"left"}})]),t._v(" "),o("div",{staticStyle:{width:"100%",height:"20%",float:"left"}},[o("div",{staticClass:"cin-container",staticStyle:{width:"50%",height:"100%",float:"left"}},[o("div",{ref:"cinEditor",staticStyle:{width:"100%",height:"100%",float:"left"}})]),t._v(" "),o("div",{staticClass:"cout-container",staticStyle:{width:"50%",height:"100%",float:"right"}},[o("div",{ref:"coutEditor",staticStyle:{width:"100%",height:"100%",float:"left"}})])])]),t._v(" "),o("div",{staticClass:"editor-container-sidebar",staticStyle:{width:"15%",height:"100%",float:"left","align-items":"center"}},[o("div",{staticClass:"namelist-container",staticStyle:{width:"100%",height:"60%","align-items":"center","overflow-y":"auto"}},t._l(t.students,function(e){return o("div",{key:e[1],staticClass:"namelist",attrs:{student:e[0]}},[o("el-button",{attrs:{round:"",type:"primary"},on:{click:function(o){return t.chooseStudent(e[0])}}},[t._v(t._s(e[0]))])],1)}),0),t._v(" "),t._m(0)])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticStyle:{height:"40%",width:"90%"}},[e("textarea",{staticStyle:{height:"100%",width:"100%"},attrs:{id:"textField",type:"text"}})])}]};var _=o("VU/8")(C,V,!1,function(t){o("E1dP")},"data-v-5e6380d4",null).exports,O={data:function(){return{editor:null}},mounted:function(){var t=this;this.editor=monaco.editor.create(this.$refs.editor,{value:"#include <bits/stdc++.h>\nusing namespace std;\n\nint main(void) {\n\n\treturn 0;\n}",readOnly:!0,theme:"vs-light",language:"cpp",fontSize:16}),this.editor.addCommand(monaco.KeyMod.CtrlCmd|monaco.KeyCode.KEY_C,function(){return null}),this.editor.onDidChangeCursorSelection(function(){var e=t.editor.getPosition(),o=e.column,n=e.lineNumber;console.log({column:o,lineNumber:n}),t.editor.setPosition({lineNumber:n,column:o})})}},T={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"ide-canvas",attrs:{onselectstart:"return false"}},[e("div",{ref:"editor",staticStyle:{width:"100%",height:"100%",float:"left"}})])},staticRenderFns:[]};var x=o("VU/8")(O,T,!1,function(t){o("TT8T")},"data-v-2f5ddc4e",null).exports;i.a.use(l.a);var M=new VueRouter({mode:"history",routes:[{path:"/",name:"Monaco",component:v},{path:"/edit",name:"CoEdit",component:k},{path:"/monitor",name:"Monitor",component:_},{path:"/test",name:"Playground",component:x}]}),z=o("OMN4"),N=o.n(z),R=o("l6IN"),j=o.n(R);i.a.use(j.a),i.a.prototype.$axios=N.a,N.a.defaults.xsrfHeaderName="X-CSRFToken",N.a.defaults.xsrfCookieName="csrftoken",i.a.config.productionTip=!1,window.MonacoEnvironment={getWorkerUrl:function(){return L}};var L=URL.createObjectURL(new Blob(["\n    self.MonacoEnvironment = {\n        baseUrl: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.21.2/min'\n    };\n    importScripts('https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.21.2/min/vs/base/worker/workerMain.min.js');\n"],{type:"text/cpp"}));new i.a({el:"#app",router:M,components:{App:a},template:"<App/>"})},OMN4:function(t,e){t.exports=axios},OkZj:function(t,e){},"R/+A":function(t,e){},TT8T:function(t,e){},XTA7:function(t,e){},byCY:function(t,e){},czDl:function(t,e){},gCdB:function(t,e){},gvGx:function(t,e){},"jF/U":function(t,e){},l6IN:function(t,e){t.exports=ELEMENT},lRwf:function(t,e){t.exports=Vue},nLHh:function(t,e){},nfAi:function(t,e){},pRNm:function(t,e){t.exports=VueRouter},rc56:function(t,e){},sOVj:function(t,e){},sOjV:function(t,e){},sZ3n:function(t,e){},uHSv:function(t,e){},wzEN:function(t,e){},x33M:function(t,e){}},["NHnr"]);