(function(e){function t(t){for(var i,a,c=t[0],s=t[1],d=t[2],u=0,p=[];u<c.length;u++)a=c[u],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&p.push(o[a][0]),o[a]=0;for(i in s)Object.prototype.hasOwnProperty.call(s,i)&&(e[i]=s[i]);l&&l(t);while(p.length)p.shift()();return r.push.apply(r,d||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],i=!0,c=1;c<n.length;c++){var s=n[c];0!==o[s]&&(i=!1)}i&&(r.splice(t--,1),e=a(a.s=n[0]))}return e}var i={},o={app:0},r=[];function a(t){if(i[t])return i[t].exports;var n=i[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=i,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)a.d(n,i,function(t){return e[t]}.bind(null,i));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],s=c.push.bind(c);c.push=t,c=c.slice();for(var d=0;d<c.length;d++)t(c[d]);var l=s;r.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},"13be":function(e,t,n){},"2c99":function(e,t,n){"use strict";n("cc40")},"68ac":function(e){e.exports=JSON.parse('{"keyboardSettings":{"keys":{"component":"FormDropdown","options":[{"id":"25","value":25},{"id":"37","value":37},{"id":"49","value":49},{"id":"61","value":61},{"id":"73","value":73},{"id":"88","value":88}]}},"noteReading":{"speed":{"component":"FormDropdown","options":[{"id":"largo","value":7000},{"id":"adagio","value":5000},{"id":"moderato","value":4000},{"id":"allegro","value":3000},{"id":"presto","value":2000}]},"noteLimit":{"component":"FormDropdown","options":[{"id":"3","value":3},{"id":"5","value":5},{"id":"9","value":9},{"id":"15","value":15},{"id":"0","value":0}]},"accidentals":{"component":"FormDropdown","options":[{"id":"no","value":"no"},{"id":"sharps","value":"sharps"},{"id":"flats","value":"flats"},{"id":"random","value":"random"}]}}}')},"75d1":function(e){e.exports=JSON.parse('{"header":{"title":"Jaslmus","punchline":"Learn to play the piano, all right."},"midi":{"loading":"Loading MIDI capability…","error":"Problem loading MIDI capability. Please check browser {0} and permissions.","compatibilityAnchor":"compatibility"},"midiOptions":{"title":"MIDI options","close":"Close","input":{"title":"MIDI In","device":{"title":"Select Device:","placeholder":"Please select one"},"preview":{"title":"Preview","description":"Strike a key to try the device! Notes will be shown here.","placeholder":"Please select one"}}},"preferences":{"title":"Preferences","close":"Close","keyboardSettings":{"title":"Keyboard settings","keys":{"label":"Number of keyboard keys","options":{"25":"25 keys","37":"37 keys","49":"49 keys","61":"61 keys","73":"73 keys","88":"88 keys"}}},"noteReading":{"title":"Note reading","noteLimit":{"label":"Notes","placeholder":"Please select one","options":{"0":"all notes","3":"3","5":"5","9":"9","15":"15"}},"speed":{"label":"Speed","options":{"largo":"Largo","adagio":"Adagio","moderato":"Moderato","allegro":"Allegro","presto":"Presto"}},"accidentals":{"label":"Accidentals","options":{"no":"no sharps/no flats","sharps":"sharps","flats":"flats","random":"random"}}}},"error":{"noMidiDevice":"Jaslmus needs at least one input device to work. Please configure one."},"game":{"noteReading":{"title":"Note reading","description":"Play the respective key!","analysis":{"successes":"Successes:","mistakes":"Mistakes:"},"start":"Start","stop":"Stop","reset":"Reset","startViaKeyHint":"You can also start the game by playing key {key}.","finished":"Finished!"}},"scoreBoard":{"games":"Games: ","virtuosicScore":"Virtuosic score: ","noVirtuosicScore":"We shall see…"}}')},b236:function(e,t,n){"use strict";n("c6ae")},c6ae:function(e,t,n){},cc40:function(e,t,n){},cd49:function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var i=n("7a23"),o=Object(i["createVNode"])("hr",null,null,-1),r={key:0},a={key:0},c={key:1},s={key:2},d=Object(i["createVNode"])("hr",null,null,-1),l=Object(i["createVNode"])("hr",null,null,-1),u={key:0};function p(e,t,n,p,b,h){var f=Object(i["resolveComponent"])("SubscriptionHandlingDeviceSelector"),m=Object(i["resolveComponent"])("ShowPlay"),O=Object(i["resolveComponent"])("Preferences"),g=Object(i["resolveComponent"])("ScoreBoard"),j=Object(i["resolveComponent"])("Challenge"),v=Object(i["resolveComponent"])("VirtualKeyboard"),y=Object(i["resolveComponent"])("MidiCapability");return Object(i["openBlock"])(),Object(i["createBlock"])(i["Fragment"],null,[Object(i["createVNode"])("h1",null,Object(i["toDisplayString"])(e.$i18n.t("header.title")),1),Object(i["createVNode"])("p",null,Object(i["toDisplayString"])(e.$i18n.t("header.punchline")),1),o,Object(i["createVNode"])(y,{onMidiReady:e.midiReady},{default:Object(i["withCtx"])((function(){return[e.showMidiOptions?(Object(i["openBlock"])(),Object(i["createBlock"])("div",r,[Object(i["createVNode"])("button",{onClick:t[1]||(t[1]=function(t){return e.showMidiOptions=!1})},Object(i["toDisplayString"])(e.$i18n.t("midiOptions.close")),1),Object(i["createVNode"])("h2",null,Object(i["toDisplayString"])(e.$i18n.t("midiOptions.title")),1),Object(i["createVNode"])("fieldset",null,[Object(i["createVNode"])("legend",null,Object(i["toDisplayString"])(e.$i18n.t("midiOptions.input.title")),1),Object(i["createVNode"])(f,{deviceId:e.midiOptions.input,onDeviceChanged:e.deviceChanged},null,8,["deviceId","onDeviceChanged"]),e.midiInput?(Object(i["openBlock"])(),Object(i["createBlock"])("div",a,[Object(i["createVNode"])("h3",null,Object(i["toDisplayString"])(e.$i18n.t("midiOptions.input.preview.title")),1),Object(i["createVNode"])("p",null,Object(i["toDisplayString"])(e.$i18n.t("midiOptions.input.preview.description")),1),Object(i["createVNode"])(m,{keyboard:e.midiInput},null,8,["keyboard"])])):Object(i["createCommentVNode"])("",!0)])])):e.showPreferences?(Object(i["openBlock"])(),Object(i["createBlock"])("div",c,[Object(i["createVNode"])("button",{onClick:t[2]||(t[2]=function(t){return e.showPreferences=!1})},Object(i["toDisplayString"])(e.$i18n.t("preferences.close")),1),Object(i["createVNode"])(O,{preferences:e.preferences,onUpdated:t[3]||(t[3]=function(t){return e.preferences=t})},null,8,["preferences"])])):(Object(i["openBlock"])(),Object(i["createBlock"])("div",s,[Object(i["createVNode"])("button",{onClick:t[4]||(t[4]=function(t){return e.showMidiOptions=!0})},Object(i["toDisplayString"])(e.$i18n.t("midiOptions.title")),1),Object(i["createVNode"])("button",{onClick:t[5]||(t[5]=function(t){return e.showPreferences=!0})},Object(i["toDisplayString"])(e.$i18n.t("preferences.title")),1),d,Object(i["createVNode"])(g,{games:e.games},null,8,["games"]),l,Object(i["createVNode"])(j,{keyboards:e.keyboards,"base-note":e.preferences.noteReading.baseNote,"note-limit":e.preferences.noteReading.noteLimit,speed:e.preferences.noteReading.speed,accidentals:e.preferences.noteReading.accidentals,onFinished:e.gameFinished},null,8,["keyboards","base-note","note-limit","speed","accidentals","onFinished"]),Object(i["createVNode"])(v,{settings:e.preferences.keyboardSettings,onNoteon:t[6]||(t[6]=function(t){return e.virtualKeyboard.broadcast(t)})},null,8,["settings"]),e.midiInput?Object(i["createCommentVNode"])("",!0):(Object(i["openBlock"])(),Object(i["createBlock"])("div",u,Object(i["toDisplayString"])(e.$i18n.t("error.noMidiDevice")),1))]))]})),_:1},8,["onMidiReady"])],64)}n("d3b7"),n("25f0");var b={ref:"notes"};function h(e,t,n,o,r,a){var c=Object(i["resolveComponent"])("AbcNotation");return Object(i["openBlock"])(),Object(i["createBlock"])(i["Fragment"],null,[Object(i["createVNode"])(c,{abc:e.abc},null,8,["abc"]),Object(i["createVNode"])("p",b,null,512)],64)}n("99af");var f={ref:"notation"};function m(e,t,n,o,r,a){return Object(i["openBlock"])(),Object(i["createBlock"])("div",f,null,512)}var O=n("ee1c"),g=n.n(O),j=(n("adab"),Object(i["defineComponent"])({props:{abc:{required:!0,type:String}},watch:{abc:function(){this.render()}},mounted:function(){this.render()},methods:{render:function(){""!==this.abc&&(g.a.renderAbc(this.$refs.notation,this.abc,{add_classes:!0}),this.$emit("rendered"))}},emits:["rendered"]}));j.render=m;var v=j,y=n("208b"),k=n("49cb"),S=Object(i["defineComponent"])({name:"ShowPlay",props:{keyboard:{required:!0,type:Object}},data:function(){return{abc:""}},components:{AbcNotation:v},unmounted:function(){this.keyboard.removeListener(this.midiSubscription)},mounted:function(){this.keyboard.addListener(this.midiSubscription)},methods:{midiSubscription:function(e){var t=k["a"].scientificToAbcNotation(y["a"].midiToNoteName(e));this.abc="X:1\nK:C\n".concat(t),this.$refs.notes.innerHTML+="".concat(e," (").concat(t,")<br />")}}});S.render=h;var N=S,V={class:"challenge"},w={key:0},D=Object(i["createVNode"])("br",null,null,-1),B=Object(i["createVNode"])("br",null,null,-1),C=Object(i["createVNode"])("br",null,null,-1),$={key:1},I=Object(i["createVNode"])("br",null,null,-1),M=Object(i["createVNode"])("br",null,null,-1),R={key:2};function x(e,t,n,o,r,a){var c=Object(i["resolveComponent"])("AnimatedAbcNotation");return Object(i["openBlock"])(),Object(i["createBlock"])("div",V,[Object(i["createVNode"])("h1",null,Object(i["toDisplayString"])(e.$i18n.t("game.noteReading.title")),1),e.gaming?(Object(i["openBlock"])(),Object(i["createBlock"])("div",w,[Object(i["createVNode"])("p",null,Object(i["toDisplayString"])(e.$i18n.t("game.noteReading.description")),1),Object(i["createVNode"])(c,{abc:e.abc,animationDuration:e.speed,key:"heat_no_".concat(e.heat)},null,8,["abc","animationDuration"]),Object(i["createVNode"])("span",null,Object(i["toDisplayString"])(e.challenge.pitch)+" ("+Object(i["toDisplayString"])(e.challenge.note)+")",1),D,Object(i["createVNode"])("span",null,Object(i["toDisplayString"])(e.heat)+"/"+Object(i["toDisplayString"])(e.heats),1),B,Object(i["createVNode"])("span",null,Object(i["toDisplayString"])(e.$i18n.t("game.noteReading.analysis.successes"))+" "+Object(i["toDisplayString"])(e.successes)+", "+Object(i["toDisplayString"])(e.$i18n.t("game.noteReading.analysis.mistakes"))+" "+Object(i["toDisplayString"])(e.mistakes),1),C,Object(i["createVNode"])("button",{onClick:t[1]||(t[1]=function(t){return e.finish()})},Object(i["toDisplayString"])(e.$i18n.t("game.noteReading.stop")),1)])):e.finished?(Object(i["openBlock"])(),Object(i["createBlock"])("div",$,[Object(i["createTextVNode"])(Object(i["toDisplayString"])(e.$i18n.t("game.noteReading.finished")),1),I,Object(i["createTextVNode"])(" "+Object(i["toDisplayString"])(e.$i18n.t("game.noteReading.analysis.successes"))+" "+Object(i["toDisplayString"])(e.successes)+", "+Object(i["toDisplayString"])(e.$i18n.t("game.noteReading.analysis.mistakes"))+" "+Object(i["toDisplayString"])(e.mistakes)+" ",1),M,Object(i["createVNode"])("button",{onClick:t[2]||(t[2]=function(t){return e.reset()})},Object(i["toDisplayString"])(e.$i18n.t("game.noteReading.reset")),1)])):(Object(i["openBlock"])(),Object(i["createBlock"])("div",R,[Object(i["createVNode"])("button",{onClick:t[3]||(t[3]=function(t){return e.start()})},Object(i["toDisplayString"])(e.$i18n.t("game.noteReading.start")),1),Object(i["createVNode"])("p",null,[Object(i["createVNode"])("sub",null,Object(i["toDisplayString"])(e.startViaKeyHint),1)])]))])}n("a9e3"),n("8ba4"),n("159b");function P(e,t,n,o,r,a){var c=Object(i["resolveComponent"])("AbcNotation");return Object(i["openBlock"])(),Object(i["createBlock"])(c,{class:"animated-abc-notation",abc:e.abc,ref:"abc",onRendered:e.postProcessAbc,style:e.styleVariables},null,8,["abc","onRendered","style"])}n("5319"),n("ac1f");var A=Object(i["defineComponent"])({components:{AbcNotation:v},props:{abc:{required:!0,type:String},animationDuration:{required:!0,type:Number}},data:function(){return{abcWidth:0}},computed:{styleVariables:function(){return{"--staff-width":this.abcWidth-100+"px","--animation-duration":this.animationDuration+"ms"}}},methods:{postProcessAbc:function(){this.abcWidth=this.$refs.abc.$el.children[0].clientWidth,this.$refs.abc.$el.querySelectorAll(".abcjs-staff").forEach((function(e){var t=e.getAttribute("d").replace("M 15 ","M 0 ").replace("L 15 ","L 0 ");e.setAttribute("d",t)}))}}});n("b236");A.render=P;var L,F=A,q=n("d4ec"),T=(n("96cf"),n("caad"),n("2532"),12),_=[1,3,6,8,10],K=127,E=regeneratorRuntime.mark(G);function J(e,t,n){for(var i=[],o=-1,r=-1;r<=9;r++)for(var a=0;a<T;a++){if(o++,o>K||i.length>=t)return i;o<e||(n&&_.includes(a)||i.push(o))}return i}function U(e){return e[Math.floor(Math.random()*e.length)]}function H(e){return 1!==e}function W(e,t){return k["a"].scientificToAbcNotation(y["a"].midiToNoteName(e,{sharps:t}))}(function(e){e["no"]="no",e["sharps"]="sharps",e["flats"]="flats",e["random"]="random"})(L||(L={}));var X=function e(t,n){Object(q["a"])(this,e),this.note=t,this.pitch=n};function G(e,t,n){var i,o,r,a,c;return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:i=J(e,t,"no"===n),o=null;case 2:0,r=void 0;do{r=U(i)}while(o&&r===o.pitch&&H(t));return a=W(r,"sharps"===n||"random"===n&&Math.random()<.5),c=new X(a,r),o=c,s.next=10,c;case 10:s.next=2;break;case 12:case"end":return s.stop()}}),E)}var Y=60,z=Object(i["defineComponent"])({props:{keyboards:{required:!0,type:Object},baseNote:{required:!0,type:Number,validator:Number.isInteger},noteLimit:{required:!0,type:Number,validator:Number.isInteger},speed:{required:!0,type:Number,validator:Number.isInteger},accidentals:{required:!0,type:String},heats:{default:10,type:Number}},data:function(){return{gaming:!1,finished:!1,challenge:{},mistakes:0,successes:0,timeout:void 0,generator:void 0,heat:0}},components:{AnimatedAbcNotation:F},unmounted:function(){var e=this;this.keyboards.forEach((function(t){return t.removeListener(e.evaluateInput)}))},mounted:function(){var e=this;this.keyboards.forEach((function(t){return t.addListener(e.evaluateInput)}))},computed:{startViaKeyHint:function(){return this.$i18n.t("game.noteReading.startViaKeyHint",{key:"".concat(Y," (").concat(this.midiToAbc(Y),")")})},abc:function(){return"X:1\nK:C\n".concat(this.challenge.note)}},methods:{reset:function(){Object.assign(this.$data,this.$options.data.apply(this))},start:function(){this.reset(),this.gaming=!0,this.generator=G(this.baseNote,this.noteLimit,L[this.accidentals]),this.next()},finish:function(){window.clearTimeout(this.timeout),this.gaming=!1,this.finished=!0,this.$emit("finished",{heats:this.heats,heat:this.heat,successes:this.successes,mistakes:this.mistakes})},next:function(){if(!this.generator)throw new Error("Can only run after generator was set up");var e=this.generator.next();e.done||this.heat>=this.heats?this.finish():(this.challenge=e.value,this.timeout=window.setTimeout(this.noResponse,this.speed),this.heat++)},evaluateInput:function(e){this.gaming?this.evaluateResponse(e):e===Y&&(this.finished?this.reset():this.start())},noResponse:function(){this.mistakes++,this.next()},evaluateResponse:function(e){e===this.challenge.pitch?(window.clearTimeout(this.timeout),this.successes++,this.next()):this.mistakes++},midiToAbc:function(e){return k["a"].scientificToAbcNotation(y["a"].midiToNoteName(e))}},emits:["finished"]});n("e300");z.render=x;var Q=z,Z={key:0},ee={key:0},te={href:"https://caniuse.com/midi",target:"_blank"};function ne(e,t,n,o,r,a){var c=Object(i["resolveComponent"])("i18n-t");return e.loading?(Object(i["openBlock"])(),Object(i["createBlock"])("div",Z,Object(i["toDisplayString"])(e.$i18n.t("midi.loading")),1)):(Object(i["openBlock"])(),Object(i["createBlock"])(i["Fragment"],{key:1},[e.error?(Object(i["openBlock"])(),Object(i["createBlock"])("div",ee,[Object(i["createVNode"])(c,{keypath:"midi.error",tag:!1,for:"midi.compatibilityAnchor"},{default:Object(i["withCtx"])((function(){return[Object(i["createVNode"])("a",te,Object(i["toDisplayString"])(e.$t("midi.compatibilityAnchor")),1)]})),_:1})])):Object(i["renderSlot"])(e.$slots,"default",{key:1})],64))}var ie=n("c62b"),oe=n.n(ie),re=Object(i["defineComponent"])({name:"MidiCapability",data:function(){return{loading:!0,error:!1}},unmounted:function(){oe.a.disable()},created:function(){var e=this;oe.a.enabled||oe.a.enable((function(t){e.error=!!t,e.loading=!1,e.$emit("midiReady")}),!1)},emits:["midiReady"]});re.render=ne;var ae=re;function ce(e,t,n,o,r,a){var c=Object(i["resolveComponent"])("MidiDeviceSelector");return Object(i["openBlock"])(),Object(i["createBlock"])(c,{preferred:e.preferred,onDeviceChanged:e.deviceChanged},null,8,["preferred","onDeviceChanged"])}n("b0c0");var se={for:"jaslmus-settings-midi-device"},de={disabled:"",value:""};function le(e,t,n,o,r,a){return Object(i["openBlock"])(),Object(i["createBlock"])("div",null,[Object(i["createVNode"])("label",se,Object(i["toDisplayString"])(e.$i18n.t("midiOptions.input.device.title")),1),Object(i["withDirectives"])(Object(i["createVNode"])("select",{id:"jaslmus-settings-midi-device","onUpdate:modelValue":t[1]||(t[1]=function(t){return e.selected=t})},[Object(i["createVNode"])("option",de,Object(i["toDisplayString"])(e.$i18n.t("midiOptions.input.device.placeholder")),1),(Object(i["openBlock"])(!0),Object(i["createBlock"])(i["Fragment"],null,Object(i["renderList"])(e.inputs,(function(e){return Object(i["openBlock"])(),Object(i["createBlock"])("option",{value:e.id,key:e.id},Object(i["toDisplayString"])(e.name)+" ("+Object(i["toDisplayString"])(e.manufacturer)+") ",9,["value"])})),128))],512),[[i["vModelSelect"],e.selected]])])}var ue=Object(i["defineComponent"])({name:"MidiDeviceSelector",props:{preferred:{required:!1,type:String,default:""}},data:function(){return{selected:oe.a.getInputById(this.preferred)?this.preferred:"",inputs:[]}},watch:{selected:function(e,t){this.$emit("deviceChanged",oe.a.getInputById(e)||null,oe.a.getInputById(t)||null)}},created:function(){if(!oe.a.enabled)throw new Error("WebMidi must be enabled for this component to work!");this.inputs=oe.a.inputs},emits:["deviceChanged"]});ue.render=le;var pe=ue,be=Object(i["defineComponent"])({name:"SubscriptionHandlingDeviceSelector",components:{MidiDeviceSelector:pe},props:{deviceId:{required:!1,type:String}},data:function(){return{preferred:""}},created:function(){this.deviceId&&(this.preferred=this.deviceId)},methods:{deviceChanged:function(e,t){t&&"function"===typeof t.removeListener&&t.removeListener(),this.$emit("deviceChanged",e,t)}},emits:["deviceChanged"]});be.render=ce;var he=be;function fe(e,t,n,o,r,a){var c=Object(i["resolveComponent"])("SchemaBasedForm"),s=Object(i["resolveComponent"])("Fieldset");return Object(i["openBlock"])(),Object(i["createBlock"])("div",null,[Object(i["createVNode"])("h2",null,Object(i["toDisplayString"])(e.$i18n.t("preferences.title")),1),Object(i["createVNode"])(s,{legend:e.$i18n.t("preferences.keyboardSettings.title")},{default:Object(i["withCtx"])((function(){return[Object(i["createVNode"])(c,{schema:e.schema.keyboardSettings,"user-data":e.preferences.keyboardSettings,"i18n-prefix":"preferences.keyboardSettings",onUpdated:t[1]||(t[1]=function(t){return e.preferencesUpdated("keyboardSettings",t)})},null,8,["schema","user-data"])]})),_:1},8,["legend"]),Object(i["createVNode"])(s,{legend:e.$i18n.t("preferences.noteReading.title")},{default:Object(i["withCtx"])((function(){return[Object(i["createVNode"])(c,{schema:e.schema.noteReading,"user-data":e.preferences.noteReading,"i18n-prefix":"preferences.noteReading",onUpdated:t[2]||(t[2]=function(t){return e.preferencesUpdated("noteReading",t)})},null,8,["schema","user-data"])]})),_:1},8,["legend"])])}var me=n("ade3"),Oe=n("5530"),ge=n("743f");function je(e,t,n,o,r,a){var c=Object(i["resolveComponent"])("SchemaForm");return Object(i["openBlock"])(),Object(i["createBlock"])(c,{schema:e.augmentedSchema,"onUpdate:modelValue":t[1]||(t[1]=function(t){return e.$emit("updated",t)})},null,8,["schema"])}n("b64b");var ve=n("c689"),ye={class:"p-float-label"};function ke(e,t,n,o,r,a){var c=Object(i["resolveComponent"])("Dropdown");return Object(i["openBlock"])(),Object(i["createBlock"])("span",ye,[Object(i["createVNode"])("label",{for:e.uuid},Object(i["toDisplayString"])(e.label),9,["for"]),Object(i["createVNode"])(c,{modelValue:e.modelValue,options:e.options,optionLabel:"label",optionValue:"value",placeholder:e.placeholder,id:e.uuid,onChange:t[1]||(t[1]=function(t){return e.$emit("update:modelValue",t.value)})},null,8,["modelValue","options","placeholder","id"])])}var Se=n("0100"),Ne=Object(i["defineComponent"])({components:{Dropdown:Se["a"]},props:{modelValue:{required:!0},label:{type:String,required:!0},options:{type:Array,required:!0},uuid:{type:Number,default:0},placeholder:{type:String,default:""}},emits:["update:modelValue"]});Ne.render=ke;var Ve=Ne;Object(i["markRaw"])(Ve);var we=Object(i["defineComponent"])({props:{schema:{required:!0,type:Object},userData:{required:!0,type:Object},i18nPrefix:{required:!0,type:String}},computed:{augmentedSchema:function(){return this.augmentSchema(this.schema,this.$i18n,this.i18nPrefix)}},components:{SchemaForm:Object(ve["SchemaFormFactory"])([],{FormDropdown:Ve})},emits:["updated"],methods:{augmentSchema:function(e,t,n){var i={};return Object.keys(e).forEach((function(o){var r=e[o],a=[];r.options&&r.options.forEach((function(e){var i;i=e.label?e.label:t.t("".concat(n,".").concat(o,".options.").concat(e.id)),a.push({label:i,value:e.value})}));var c="".concat(n,".").concat(o,".placeholder");i[o]=Object(Oe["a"])(Object(Oe["a"])({},r),{},{label:t.t("".concat(n,".").concat(o,".label")),placeholder:t.te(c)?t.t(c):void 0,options:a.length?a:void 0})})),i}},setup:function(e){var t=Object(i["toRefs"])(e),n=t.userData;Object(ve["useSchemaForm"])(n)}});we.render=je;var De=we,Be=n("68ac"),Ce=Object(i["defineComponent"])({components:{SchemaBasedForm:De,Fieldset:ge["a"]},props:{preferences:Object},data:function(){return{schema:Be}},emits:["updated"],methods:{preferencesUpdated:function(e,t){this.$emit("updated",Object(Oe["a"])(Object(Oe["a"])({},this.preferences),{},Object(me["a"])({},e,t)))}}});Ce.render=fe;var $e=Ce;function Ie(e,t,n){function o(){return"storedData_".concat(e,"_").concat(t)}var r=window.localStorage.getItem(o()),a=Object(i["ref"])(r?JSON.parse(r):n);return Object(i["watch"])(a,(function(e){window.localStorage.setItem(o(),JSON.stringify(e))}),{deep:!0}),a}var Me=n("ceec"),Re=n("e0a9"),xe=Object(i["createTextVNode"])(" — "),Pe={key:0},Ae={key:1};function Le(e,t,n,o,r,a){return Object(i["openBlock"])(),Object(i["createBlock"])("div",null,[Object(i["createVNode"])("span",null,Object(i["toDisplayString"])(e.$i18n.t("scoreBoard.games"))+" "+Object(i["toDisplayString"])(e.games.length),1),xe,Object(i["createVNode"])("span",null,[Object(i["createTextVNode"])(Object(i["toDisplayString"])(e.$i18n.t("scoreBoard.virtuosicScore"))+" ",1),e.games.length?(Object(i["openBlock"])(),Object(i["createBlock"])("span",Pe,Object(i["toDisplayString"])(Math.round(100*e.virtuosicScore))+"% ",1)):(Object(i["openBlock"])(),Object(i["createBlock"])("span",Ae,Object(i["toDisplayString"])(e.$i18n.t("scoreBoard.noVirtuosicScore")),1))])])}var Fe=Object(i["defineComponent"])({props:{games:{required:!0,type:Array}},computed:{virtuosicScore:function(){var e=0,t=0;return this.games.forEach((function(n){e+=Math.max(n.gameInfo.successes-n.gameInfo.mistakes,1),t+=n.gameInfo.heats})),0===t?0:e/t}}});Fe.render=Le;var qe=Fe,Te=n("bee2"),_e=(n("a434"),function(){function e(t){var n=this;Object(q["a"])(this,e),this.input=t,this.listeners=[],this.dispatcher=function(e){n.listeners.forEach((function(t){return t(e.data[1])}))}}return Object(Te["a"])(e,[{key:"addListener",value:function(e){return this.listeners.push(e),1===this.listeners.length&&this.input.addListener("noteon","all",this.dispatcher),this}},{key:"removeListener",value:function(e){if(e){var t=this.listeners.indexOf(e);-1!==t&&this.listeners.splice(t,1)}else this.listeners=[];return 0===this.listeners.length&&this.input.removeListener("noteon","all",this.dispatcher),this}}]),e}()),Ke={ref:"keyboard"};function Ee(e,t,n,o,r,a){return Object(i["openBlock"])(),Object(i["createBlock"])("div",Ke,null,512)}n("ddb0");var Je=n("bb66"),Ue=n("f159"),He=Object(i["defineComponent"])({props:{settings:{required:!0,type:Object},highlightedNotes:{required:!1,default:[]}},computed:{octaves:function(){return Math.ceil(this.settings.keys/T)},startNote:function(){var e=this.settings.keys%T;return this.octaves>7&&e>0?"A":"C"},startOctave:function(){return 4-Math.floor(this.octaves/2)},endOctave:function(){return 4+Math.floor(this.octaves/2)}},watch:{settings:function(){this.render()}},data:function(){return{piano:null}},unmounted:function(){this.piano.destroy()},mounted:function(){this.render()},methods:{keyPlay:function(e){var t=Object(Ue["b"])(e.toString()).midi;t&&this.$emit("noteon",t)},render:function(){var e=this;this.piano=new Je["a"](this.$refs.keyboard,{startOctave:this.startOctave,startNote:this.startNote,endOctave:this.endOctave,highlightedNotes:this.highlightedNotes}),this.piano.create(),this.piano.addKeyMouseUpListener(this.piano.keyUp),this.piano.addKeyMouseDownListener((function(t){e.piano.keyDown(t),e.keyPlay(t)}))}},emits:["noteon"]});He.render=Ee;var We=He,Xe=function(){function e(){Object(q["a"])(this,e),this.listeners=[]}return Object(Te["a"])(e,[{key:"addListener",value:function(e){return this.listeners.push(e),this}},{key:"removeListener",value:function(e){if(e){var t=this.listeners.indexOf(e);-1!==t&&this.listeners.splice(t,1)}else this.listeners=[];return this}},{key:"broadcast",value:function(e){this.listeners.forEach((function(t){return t(e)}))}}]),e}(),Ge=Object(i["defineComponent"])({name:"App",data:function(){return{showMidiOptions:!1,showPreferences:!1,midiInput:null,virtualKeyboard:new Xe}},components:{SubscriptionHandlingDeviceSelector:he,MidiCapability:ae,Challenge:Q,ShowPlay:N,Preferences:$e,ScoreBoard:qe,VirtualKeyboard:We},computed:{keyboards:function(){var e=[this.virtualKeyboard];return this.midiInput&&e.push(this.midiInput),e}},setup:function(){return{midiOptions:Ie("midiOptions",Me.version.toString(),Me.defaults),preferences:Ie("preferences",Re.version.toString(),Re.defaults),games:Ie("games","1",[])}},methods:{deviceChanged:function(e){this.midiOptions.input=e.id,this.midiInput=this.wrapMidiInput(e)},midiReady:function(){if(this.midiOptions.input){var e=oe.a.getInputById(this.midiOptions.input);this.midiInput=e?this.wrapMidiInput(e):null}this.showMidiOptions=!this.midiInput},gameFinished:function(e){this.games.push({name:"noteReading",time:(new Date).toISOString(),preferences:this.preferences.noteReading,gameInfo:e})},wrapMidiInput:function(e){return new _e(e)}}});n("2c99");Ge.render=p;var Ye=Ge,ze=n("47e2"),Qe=n("75d1"),Ze=n("9319"),et=(n("098b"),n("e1ae"),n("4121"),Object(ze["a"])({locale:"en",messages:{en:Qe}}));Object(i["createApp"])(Ye).use(et).use(Ze["a"]).mount("#app")},ceec:function(e){e.exports=JSON.parse('{"version":1,"defaults":{"input":""}}')},e0a9:function(e){e.exports=JSON.parse('{"version":5,"defaults":{"keyboardSettings":{"keys":49},"noteReading":{"baseNote":60,"noteLimit":3,"speed":4000,"accidentals":"no"}}}')},e300:function(e,t,n){"use strict";n("13be")}});
//# sourceMappingURL=app.5d6a6e7d.js.map