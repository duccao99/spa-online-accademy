(this["webpackJsonpspa-online-academy"]=this["webpackJsonpspa-online-academy"]||[]).push([[13],{362:function(e,t,a){"use strict";var c=a(0),n=c.createContext();t.a=n},369:function(e,t,a){"use strict";var c=a(0),n=c.createContext();t.a=n},408:function(e,t,a){"use strict";var c=a(1),n=a(3),r=a(0),o=(a(7),a(4)),i=a(6),s=a(362),l=a(23),d=r.forwardRef((function(e,t){var a=e.classes,i=e.className,l=e.component,d=void 0===l?"tr":l,u=e.hover,p=void 0!==u&&u,b=e.selected,h=void 0!==b&&b,j=Object(n.a)(e,["classes","className","component","hover","selected"]),m=r.useContext(s.a);return r.createElement(d,Object(c.a)({ref:t,className:Object(o.a)(a.root,i,m&&{head:a.head,footer:a.footer}[m.variant],p&&a.hover,h&&a.selected),role:"tr"===d?null:"row"},j))}));t.a=Object(i.a)((function(e){return{root:{color:"inherit",display:"table-row",verticalAlign:"middle",outline:0,"&$hover:hover":{backgroundColor:e.palette.action.hover},"&$selected, &$selected:hover":{backgroundColor:Object(l.c)(e.palette.secondary.main,e.palette.action.selectedOpacity)}},selected:{},hover:{},head:{},footer:{}}}),{name:"MuiTableRow"})(d)},409:function(e,t,a){"use strict";var c=a(3),n=a(1),r=a(0),o=(a(7),a(4)),i=a(6),s=a(9),l=a(23),d=a(369),u=a(362),p=r.forwardRef((function(e,t){var a,i,l=e.align,p=void 0===l?"inherit":l,b=e.classes,h=e.className,j=e.component,m=e.padding,f=e.scope,g=e.size,O=e.sortDirection,v=e.variant,x=Object(c.a)(e,["align","classes","className","component","padding","scope","size","sortDirection","variant"]),y=r.useContext(d.a),C=r.useContext(u.a),w=C&&"head"===C.variant;j?(i=j,a=w?"columnheader":"cell"):i=w?"th":"td";var N=f;!N&&w&&(N="col");var k=m||(y&&y.padding?y.padding:"default"),_=g||(y&&y.size?y.size:"medium"),R=v||C&&C.variant,S=null;return O&&(S="asc"===O?"ascending":"descending"),r.createElement(i,Object(n.a)({ref:t,className:Object(o.a)(b.root,b[R],h,"inherit"!==p&&b["align".concat(Object(s.a)(p))],"default"!==k&&b["padding".concat(Object(s.a)(k))],"medium"!==_&&b["size".concat(Object(s.a)(_))],"head"===R&&y&&y.stickyHeader&&b.stickyHeader),"aria-sort":S,role:a,scope:N},x))}));t.a=Object(i.a)((function(e){return{root:Object(n.a)({},e.typography.body2,{display:"table-cell",verticalAlign:"inherit",borderBottom:"1px solid\n    ".concat("light"===e.palette.type?Object(l.e)(Object(l.c)(e.palette.divider,1),.88):Object(l.a)(Object(l.c)(e.palette.divider,1),.68)),textAlign:"left",padding:16}),head:{color:e.palette.text.primary,lineHeight:e.typography.pxToRem(24),fontWeight:e.typography.fontWeightMedium},body:{color:e.palette.text.primary},footer:{color:e.palette.text.secondary,lineHeight:e.typography.pxToRem(21),fontSize:e.typography.pxToRem(12)},sizeSmall:{padding:"6px 24px 6px 16px","&:last-child":{paddingRight:16},"&$paddingCheckbox":{width:24,padding:"0 12px 0 16px","&:last-child":{paddingLeft:12,paddingRight:16},"& > *":{padding:0}}},paddingCheckbox:{width:48,padding:"0 0 0 4px","&:last-child":{paddingLeft:0,paddingRight:4}},paddingNone:{padding:0,"&:last-child":{padding:0}},alignLeft:{textAlign:"left"},alignCenter:{textAlign:"center"},alignRight:{textAlign:"right",flexDirection:"row-reverse"},alignJustify:{textAlign:"justify"},stickyHeader:{position:"sticky",top:0,left:0,zIndex:2,backgroundColor:e.palette.background.default}}}),{name:"MuiTableCell"})(p)},410:function(e,t,a){"use strict";var c=a(1),n=a(3),r=a(0),o=(a(7),a(4)),i=a(6),s=a(362),l={variant:"head"},d="thead",u=r.forwardRef((function(e,t){var a=e.classes,i=e.className,u=e.component,p=void 0===u?d:u,b=Object(n.a)(e,["classes","className","component"]);return r.createElement(s.a.Provider,{value:l},r.createElement(p,Object(c.a)({className:Object(o.a)(a.root,i),ref:t,role:p===d?null:"rowgroup"},b)))}));t.a=Object(i.a)({root:{display:"table-header-group"}},{name:"MuiTableHead"})(u)},411:function(e,t,a){"use strict";var c=a(1),n=a(3),r=a(0),o=(a(7),a(4)),i=a(6),s=a(362),l={variant:"body"},d="tbody",u=r.forwardRef((function(e,t){var a=e.classes,i=e.className,u=e.component,p=void 0===u?d:u,b=Object(n.a)(e,["classes","className","component"]);return r.createElement(s.a.Provider,{value:l},r.createElement(p,Object(c.a)({className:Object(o.a)(a.root,i),ref:t,role:p===d?null:"rowgroup"},b)))}));t.a=Object(i.a)({root:{display:"table-row-group"}},{name:"MuiTableBody"})(u)},433:function(e,t,a){"use strict";var c=a(1),n=a(3),r=a(0),o=(a(7),a(4)),i=a(6),s=r.forwardRef((function(e,t){var a=e.classes,i=e.className,s=e.component,l=void 0===s?"div":s,d=Object(n.a)(e,["classes","className","component"]);return r.createElement(l,Object(c.a)({ref:t,className:Object(o.a)(a.root,i)},d))}));t.a=Object(i.a)({root:{width:"100%",overflowX:"auto"}},{name:"MuiTableContainer"})(s)},449:function(e,t,a){"use strict";var c=a(3),n=a(1),r=a(0),o=(a(7),a(4)),i=a(6),s=a(369),l="table",d=r.forwardRef((function(e,t){var a=e.classes,i=e.className,d=e.component,u=void 0===d?l:d,p=e.padding,b=void 0===p?"default":p,h=e.size,j=void 0===h?"medium":h,m=e.stickyHeader,f=void 0!==m&&m,g=Object(c.a)(e,["classes","className","component","padding","size","stickyHeader"]),O=r.useMemo((function(){return{padding:b,size:j,stickyHeader:f}}),[b,j,f]);return r.createElement(s.a.Provider,{value:O},r.createElement(u,Object(n.a)({role:u===l?null:"table",ref:t,className:Object(o.a)(a.root,i,f&&a.stickyHeader)},g)))}));t.a=Object(i.a)((function(e){return{root:{display:"table",width:"100%",borderCollapse:"collapse",borderSpacing:0,"& caption":Object(n.a)({},e.typography.body2,{padding:e.spacing(2),color:e.palette.text.secondary,textAlign:"left",captionSide:"bottom"})},stickyHeader:{borderCollapse:"separate"}}}),{name:"MuiTable"})(d)},641:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return S}));var c=a(8),n=a(342),r=a(352),o=a(54),i=a(357),s=a(341),l=a(339),d=a(358),u=a(343),p=a(297),b=a(354),h=a(153),j=a(449),m=a(411),f=a(409),g=a(433),O=a(410),v=a(408),x=a(20),y=a.n(x),C=a(0),w=a.n(C),N=a(16),k=a(22),_=a(2),R=Object(h.a)((function(e){return{formControl:{minWidth:120},selectEmpty:{}}}));function S(e){var t=e.email,a=R(),h=w.a.useState(""),x=Object(c.a)(h,2),S=(x[0],x[1],w.a.useState("")),E=Object(c.a)(S,2),z=E[0],H=E[1],T=Object(C.useState)([]),A=Object(c.a)(T,2),M=A[0],W=A[1],P=Object(C.useState)(""),$=Object(c.a)(P,2),D=$[0],I=$[1],J=Object(C.useState)(0),L=Object(c.a)(J,2),B=L[0],K=L[1],U=Object(C.useState)(!1),X=Object(c.a)(U,2),q=X[0],F=X[1],G=Object(C.useState)([1,2,3]),Q=Object(c.a)(G,2),V=Q[0],Y=Q[1],Z={};function ee(e){var t="".concat(N.b,"/api/instructor/chap-exists/").concat(+e);y.a.get(t,{}).then((function(e){Y(e.data.chap_exists)})).catch((function(e){Y([])}))}Object(C.useEffect)((function(){var e=sessionStorage.getItem("user_login_id");K(+e),function(){var e="".concat(N.b,"/api/instructor/uploaded-course/").concat(t);y.a.get(e,Z).then((function(e){W(e.data.uploaded_course)}))}()}),[]);var te=function(e){var t={chap_name:z,course_id:+D,user_id:B};if(""!==t.chap_name&&""!==t.course_id&&""!==t.user_id){var a="".concat(N.b,"/api/instructor/upload-chapter");y.a.post(a,t,Z).then((function(e){Object(k.a)("Success!","Chapter added!",2500,"success"),F(!q)})).catch((function(e){Object(k.a)("error!","Something broke!",2500,"error"),F(!q)}))}else{Object(k.a)("error!","Cannot empty!",2500,"error")}};return Object(C.useEffect)((function(){ee(D)}),[q]),Object(_.jsxs)(n.a,{container:!0,children:[Object(_.jsx)(n.a,{item:!0,xs:12,children:Object(_.jsxs)(l.a,{fullWidth:!0,className:a.formControl,children:[Object(_.jsx)(d.a,{id:"demo-simple-select-error-label",children:"Course uploaded"}),Object(_.jsx)(b.a,{fullWidth:!0,labelId:"demo-simple-select-error-label",id:"demo-simple-select-error",value:D,onChange:function(e){I(e.target.value),ee(e.target.value),F(!q)},children:M.map((function(e){return Object(_.jsx)(u.a,{name:e.course_name,value:e.course_id,children:e.course_name},e.course_id)}))})]})}),Object(_.jsxs)(n.a,{item:!0,xs:12,children:[Object(_.jsx)(r.a,{my:3,children:Object(_.jsx)(o.a,{variant:"h6",children:"Chapter exists information"})}),Object(_.jsx)(r.a,{my:3,children:Object(_.jsx)(g.a,{component:p.a,children:Object(_.jsxs)(j.a,{className:a.table,"aria-label":"simple table",children:[Object(_.jsx)(O.a,{children:Object(_.jsxs)(v.a,{children:[Object(_.jsx)(f.a,{align:"left",children:"Chap id"}),Object(_.jsx)(f.a,{align:"left",children:"Chap name"}),Object(_.jsx)(f.a,{align:"left",children:"Course name"})]})}),Object(_.jsx)(m.a,{children:V.map((function(e){return Object(_.jsxs)(v.a,{hover:!0,children:[Object(_.jsx)(f.a,{align:"left",component:"th",scope:"row",children:e.chap_id}),Object(_.jsx)(f.a,{align:"left",children:e.chap_name}),Object(_.jsx)(f.a,{align:"left",children:e.course_name})]},e.chap_id)}))})]})})})]}),Object(_.jsx)(n.a,{item:!0,xs:12,children:Object(_.jsx)(r.a,{my:3,children:Object(_.jsx)(l.a,{fullWidth:!0,children:Object(_.jsx)(i.a,{fullWidth:!0,onKeyPress:function(e){13===e.which&&te()},label:"Chapter name",value:z,onChange:function(e){return H(e.target.value)}})})})}),Object(_.jsx)(n.a,{item:!0,xs:12,children:Object(_.jsx)(r.a,{my:3,children:Object(_.jsxs)(s.a,{className:a.btn,variant:"contained",color:"primary",onClick:te,children:["Upload"," "]})})})]})}}}]);
//# sourceMappingURL=13.17d9caba.chunk.js.map