(this["webpackJsonpspa-online-academy"]=this["webpackJsonpspa-online-academy"]||[]).push([[4],{101:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var a="BRING_SCROLLBAR_BACK"},16:function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"a",(function(){return c})),n.d(t,"c",(function(){return r}));var a="http://localhost:1212",c="500824031046665",r="156641585094-f4amukbgq4r53ccfsbc9lpeb6qjm9kiu.apps.googleusercontent.com"},22:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var a=n(66),c=n.n(a);function r(e,t,n,a){c.a.fire({title:e,html:t,timer:n,icon:a,timerProgressBar:!0,didOpen:function(){},willClose:function(){clearInterval(undefined)}}).then((function(e){e.dismiss===c.a.DismissReason.timer&&console.log("I was closed by the timer")}))}},295:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(13),i=n.n(r),o=n(8),s=n(17),l=n(12),u=n(18),b=n(23),j=n(335),d=n(336),m=n(356),p=n(54),h=n(357),O=n(341),x=n(352),g=n(342),f=n(153),v=n(75),_=n.n(v),y=n(20),S=n.n(y),w=n(74),C=n.n(w),k=n(16),N=n(22),T=n(56),I=n(100),D=n(139),E=n.n(D),A=n(2);function B(e){Object(I.a)(e);var t=Object(a.useState)(!1),n=Object(o.a)(t,2),c=n[0],r=n[1],i=Object(u.g)();return Object(a.useEffect)((function(){r(!0)}),[c]),Object(A.jsx)(E.a,{appId:k.a,autoLoad:!0,fields:"name,email,picture",onClick:function(e){},callback:function(e){!function(e,t){var n="".concat(k.b,"/api/user/facebook/sign-in"),a={user_name:e,email:t};S.a.post(n,a,{}).then((function(e){var t=e.data.user_info;sessionStorage.setItem("user_name",JSON.stringify(t.user_name)),sessionStorage.setItem("email",JSON.stringify(t.email)),sessionStorage.setItem("isLogout",!1),sessionStorage.setItem("user_login_id",e.data.user_info.user_id),sessionStorage.setItem("user_role",e.data.user_info.role_id),i.push(e.data.href)})).catch((function(e){var t=e.response.data.message||"Something broke!";Object(N.a)("error!",t,2500,"error")}))}(e.name,e.email)},textButton:"Sign in with Facebook",icon:"fa-facebook"})}var P=n(140),z=n.n(P);function R(){var e=Object(u.g)(),t=function(t){var n="".concat(k.b,"/api/user/google/sign-in"),a={user_name:"".concat(t.profileObj.name),email:"".concat(t.profileObj.email)};S.a.post(n,a,{}).then((function(t){var n=t.data.user_info;sessionStorage.setItem("user_name",JSON.stringify(n.user_name)),sessionStorage.setItem("email",JSON.stringify(n.email)),sessionStorage.setItem("isLogout",!1),sessionStorage.setItem("user_login_id",t.data.user_info.user_id),sessionStorage.setItem("user_role",t.data.user_info.role_id),e.push(t.data.href)})).catch((function(e){var t=e.response.data.message||"Something broke!";Object(N.a)("error!",t,2500,"error")}))};return Object(A.jsx)(z.a,{clientId:"".concat(k.c),buttonText:"Sign in with Google",onSuccess:t,onFailure:t,cookiePolicy:"single_host_origin"})}var L=Object(f.a)((function(e){return{paper:{marginTop:e.spacing(8),display:"flex",flexDirection:"column",alignItems:"center"},avatar:{margin:e.spacing(1),backgroundColor:e.palette.secondary.main},form:{width:"100%",marginTop:e.spacing(1)},submit:{margin:e.spacing(3,0,2)},helperText:{color:"red"},link:{color:"inherit",textDecoration:"none","&:visited":{color:"inherit",textDecoration:"none"}}}}));function M(){var e,t=L(),n=Object(a.useState)(!1),c=Object(o.a)(n,2),r=c[0],i=c[1],s=Object(a.useState)(!1),f=Object(o.a)(s,2),v=f[0],y=f[1],w=Object(a.useState)(""),I=Object(o.a)(w,2),D=I[0],E=I[1],P=Object(a.useState)(""),z=Object(o.a)(P,2),M=z[0],F=z[1],W=Object(u.g)();Object(a.useEffect)((function(){}),[W]);var q=function(e){e.preventDefault();var t="".concat(k.b,"/api/user/sign-in"),n={email:D,password:M};S.a.post(t,n,{}).then((function(e){var t=e.data.user_info;sessionStorage.setItem("user_name",JSON.stringify(t.user_name)),sessionStorage.setItem("email",JSON.stringify(t.email)),sessionStorage.setItem("isLogout",!1),sessionStorage.setItem("user_role",e.data.user_info.role_id),sessionStorage.setItem("user_login_id",e.data.user_info.user_id),W.push(e.data.href)})).catch((function(e){Object(N.a)("Error!","Incorrect information",2500,"error")}))};return Object(A.jsxs)(j.a,{component:"main",maxWidth:"xs",children:[Object(A.jsx)(d.a,{}),Object(A.jsxs)("div",{className:t.paper,children:[Object(A.jsx)(m.a,{className:t.avatar,children:Object(A.jsx)(_.a,{})}),Object(A.jsx)(p.a,{component:"h1",variant:"h5",children:"Sign in"}),Object(A.jsxs)("form",{className:t.form,noValidate:!0,onSubmit:q,onKeyPress:function(e){13===e.which&&q(e)},children:[Object(A.jsx)(h.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,id:"email",value:D,onChange:function(e){E(e.target.value),!1===C.a.isEmail(e.target.value)?i(!0):i(!1)},FormHelperTextProps:{className:t.helperText},helperText:!0===r?"Email invalid!":"",label:"Email Address",name:"email",autoComplete:"email",autoFocus:!0}),Object(A.jsx)(h.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,name:"password",label:"Password",type:"password",id:"password",value:M,onChange:function(e){F(e.target.value),e.target.value.length<6?y(!0):y(!1)},FormHelperTextProps:{className:t.helperText},helperText:!0===v?"At least 6 characters!":"",autoComplete:"current-password"}),Object(A.jsx)(O.a,{type:"submit",fullWidth:!0,variant:"contained",color:"primary",className:t.submit,onClick:function(e){q(e)},children:"Sign In"})]}),Object(A.jsxs)(x.a,{children:[Object(A.jsx)(x.a,{width:"100%",display:"none",justifyContent:"center",alignItems:"center",my:1,children:Object(A.jsx)(B,{})}),Object(A.jsx)(x.a,{width:"100%",display:"flex",justifyContent:"center",alignItems:"center",mb:3,mt:1,children:Object(A.jsx)(B,{})}),Object(A.jsx)(x.a,(e={width:"100%",display:"flex"},Object(b.a)(e,"display","none"),Object(b.a)(e,"justifyContent","center"),Object(b.a)(e,"alignItems","center"),Object(b.a)(e,"my",3),Object(b.a)(e,"children",Object(A.jsx)(R,{})),e)),Object(A.jsx)(x.a,{width:"100%",display:"flex",justifyContent:"center",alignItems:"center",my:3,children:Object(A.jsx)(R,{})}),Object(A.jsx)(g.a,{container:!0,children:Object(A.jsx)(g.a,{item:!0,children:Object(A.jsx)(l.b,{className:t.link,to:"/user/sign-up",variant:"body2",children:"Don't have an account? Sign up"})})})]})]}),Object(A.jsx)(x.a,{mt:8,children:Object(A.jsx)(T.a,{})})]})}var F=Object(f.a)((function(e){return{root:{".MuiFormHelperText-root":{color:"red"}},paper:{marginTop:e.spacing(8),display:"flex",flexDirection:"column",alignItems:"center"},avatar:{margin:e.spacing(1),backgroundColor:e.palette.secondary.main},form:{width:"100%",marginTop:e.spacing(3)},submit:{margin:e.spacing(3,0,2)},helperText:{color:"red"},link:{color:"inherit",textDecoration:"none","&:visited":{color:"inherit",textDecoration:"none"}}}}));function W(){var e=F(),t=Object(a.useState)(!1),n=Object(o.a)(t,2),c=n[0],r=n[1],i=Object(a.useState)(!1),u=Object(o.a)(i,2),b=u[0],f=u[1],v=Object(a.useState)(""),y=Object(o.a)(v,2),w=y[0],I=y[1],D=Object(a.useState)(""),E=Object(o.a)(D,2),B=E[0],P=E[1],z=Object(a.useState)(""),R=Object(o.a)(z,2),L=R[0],M=R[1],W=function(e){var t="".concat(k.b,"/api/user/sign-up"),n={user_name:w,email:B,password:L};if(""!==n.user_name&&""!==n.email&&""!==n.password){var a={};S.a.post(t,n,a).then((function(e){var t="".concat(k.b,"/api/auth"),c=Object(s.a)({},n);S.a.post(t,c,a).then((function(e){Object(N.a)("Account created!","",2e3,"success")})).catch((function(e){console.log(e)}))})).catch((function(e){console.log(e),Object(N.a)("Error!","",2e3,"error")}))}else{Object(N.a)("Error!","Cannot empty!",2e3,"error")}},q=function(e){e.preventDefault(),13===e.which&&W(),W()};return Object(a.useEffect)((function(){}),[]),Object(A.jsxs)(j.a,{component:"main",maxWidth:"xs",className:e.root,children:[Object(A.jsx)(d.a,{}),Object(A.jsxs)("div",{className:e.paper,children:[Object(A.jsx)(m.a,{className:e.avatar,children:Object(A.jsx)(_.a,{})}),Object(A.jsx)(p.a,{component:"h1",variant:"h5",children:"Sign up"}),Object(A.jsxs)("form",{className:e.form,noValidate:!0,onKeyPress:function(e){13===e.which&&q(e)},onSubmit:q,children:[Object(A.jsxs)(g.a,{container:!0,spacing:2,children:[Object(A.jsx)(g.a,{item:!0,xs:12,sm:12,children:Object(A.jsx)(h.a,{autoComplete:"fname",name:"Username",variant:"outlined",required:!0,fullWidth:!0,id:"Username",label:"Username",autoFocus:!0,onChange:function(e){I(e.target.value)}})}),Object(A.jsx)(g.a,{item:!0,xs:12,children:Object(A.jsx)(h.a,{variant:"outlined",required:!0,fullWidth:!0,id:"email",label:"Email Address",name:"email",autoComplete:"email",className:e.email,onChange:function(e){P(e.target.value),!1===C.a.isEmail(B)?r(!0):r(!1)},value:B,FormHelperTextProps:{className:e.helperText},helperText:!0===c?"Email invalid!":""})}),Object(A.jsx)(g.a,{item:!0,xs:12,children:Object(A.jsx)(h.a,{variant:"outlined",required:!0,fullWidth:!0,name:"password",label:"Password",type:"password",id:"password",onChange:function(e){M(e.target.value),e.target.value.length<6?f(!0):f(!1)},FormHelperTextProps:{className:e.helperText},helperText:!0===b?"At least 6 characters":"",autoComplete:"current-password"})})]}),Object(A.jsx)(O.a,{type:"submit",fullWidth:!0,variant:"contained",color:"primary",className:e.submit,onClick:function(e){q(e)},children:"Sign Up"}),Object(A.jsx)(g.a,{container:!0,justify:"flex-end",children:Object(A.jsx)(g.a,{item:!0,children:Object(A.jsx)(l.b,{className:e.link,to:"/user/sign-in",variant:"body2",children:"Already have an account? Sign in"})})})]})]}),Object(A.jsx)(x.a,{mt:5,children:Object(A.jsx)(T.a,{})})]})}var q=n(297),G=n(96),U=n.n(G),J=n(97),K=n(98),H=n(152),V=n(148),Y=n.n(V),Q=n(43),X=n(345),Z=n(353),$=n(349),ee=n(350);function te(e){var t=e.children,n=e.value,a=e.index,c=Object(H.a)(e,["children","value","index"]);return Object(A.jsx)("div",Object(s.a)(Object(s.a)({role:"tabpanel",hidden:n!==a,id:"full-width-tabpanel-".concat(a),"aria-labelledby":"full-width-tab-".concat(a)},c),{},{children:n===a&&Object(A.jsx)(x.a,{p:3,children:Object(A.jsx)(p.a,{children:t})})}))}function ne(e){return{id:"full-width-tab-".concat(e),"aria-controls":"full-width-tabpanel-".concat(e)}}var ae=Object(f.a)((function(e){return{root:{backgroundColor:e.palette.background.paper},tab:{textTransform:"initial"},appbar:{width:"100%"},btn:{textTransform:"initial",justifyContent:"flex-end"},link:{color:"inherit",textDecoration:"none","&:visited":{color:"inherit",textDecoration:"none"}}}}));function ce(e){var t=e.setupdate,n=e.update,r=ae(),i=Object(Q.a)(),u=c.a.useState(0),b=Object(o.a)(u,2),j=b[0],d=b[1],m=Object(a.useState)(!1),p=Object(o.a)(m,2),g=p[0],f=(p[1],Object(a.useState)("")),v=Object(o.a)(f,2),_=v[0],y=v[1],w=Object(a.useState)(""),C=Object(o.a)(w,2),T=C[0],I=C[1],D=Object(a.useState)(0),E=Object(o.a)(D,2),B=E[0],P=E[1],z=Object(a.useState)(""),R=Object(o.a)(z,2),L=R[0],M=R[1],F=Object(a.useState)(""),W=Object(o.a)(F,2),q=W[0],G=W[1],U=function(e){var a="".concat(k.b,"/api/user/change-name"),c={user_name:_,user_id:B};S.a.patch(a,c,{}).then((function(e){t(!n);Object(N.a)("Success!","Changed!",2500,"success")})).catch((function(e){var t=e.response.data.message||"Something broke!";Object(N.a)("error!",t,2500,"error")}))},J=function(e){var a="".concat(k.b,"/api/user/change-email"),c={email:T,user_id:B};S.a.patch(a,c,{}).then((function(e){t(!n);Object(N.a)("Success!","Changed!",2500,"success")})).catch((function(e){var t=e.response.data.message||"Something broke!";Object(N.a)("error!",t,2500,"error")}))},K=function(e){var a="".concat(k.b,"/api/user/change-password"),c={user_id:B,old_pass:q,new_pass:L};S.a.patch(a,c,{}).then((function(e){t(!n);Object(N.a)("Success!","Changed!",2500,"success")})).catch((function(e){console.log(e.response);var t=e.response.data.message||"Something broke!";Object(N.a)("error!",t,2500,"error")}))};return Object(a.useEffect)((function(){var e=sessionStorage.getItem("user_login_id");P(+e)}),[]),Object(A.jsxs)("div",{className:r.root,children:[Object(A.jsx)(X.a,{position:"static",color:"default",className:r.appbar,children:Object(A.jsxs)(Z.a,{value:j,onChange:function(e,t){d(t)},indicatorColor:"primary",textColor:"primary",variant:"fullWidth","aria-label":"full width tabs example",children:[Object(A.jsx)($.a,Object(s.a)({className:r.tab,label:"Change username"},ne(0))),Object(A.jsx)($.a,Object(s.a)({className:r.tab,label:"Change email"},ne(1))),Object(A.jsx)($.a,Object(s.a)({className:r.tab,label:"Change password"},ne(2)))]})}),Object(A.jsxs)(Y.a,{axis:"rtl"===i.direction?"x-reverse":"x",index:j,onChangeIndex:function(e){d(e)},children:[Object(A.jsx)(te,{value:j,index:0,dir:i.direction,children:Object(A.jsxs)(l.b,{className:r.link,to:"/user/profile/change-name",children:[Object(A.jsx)(h.a,{label:"Username",fullWidth:!0,value:_,onKeyPress:function(e){13===e.which&&U()},onChange:function(e){return y(e.target.value)},error:g,helperText:!0===g?"Cannot empty":""}),Object(A.jsx)(x.a,{my:2,children:Object(A.jsx)(O.a,{color:"primary",className:r.btn,variant:"contained",onClick:U,children:"Change"})})]})}),Object(A.jsx)(te,{value:j,index:1,dir:i.direction,children:Object(A.jsxs)(l.b,{className:r.link,to:"/user/profile/change-email",children:[Object(A.jsx)(h.a,{label:"Email",type:"email",onKeyPress:function(e){13===e.which&&J()},fullWidth:!0,value:T,onChange:function(e){return I(e.target.value)},error:g,helperText:!0===g?"Cannot empty?":""}),Object(A.jsx)(x.a,{my:2,children:Object(A.jsx)(O.a,{onClick:J,className:r.btn,color:"primary",variant:"contained",children:"Change"})})]})}),Object(A.jsx)(te,{value:j,index:2,dir:i.direction,children:Object(A.jsxs)(l.b,{className:r.link,to:"/user/profile/change-password",children:[Object(A.jsx)(x.a,{my:3,children:Object(A.jsx)(ee.a,{children:Object(A.jsx)(h.a,{onKeyPress:function(e){13===e.which&&K()},label:"Old password",type:"password",fullWidth:!0,value:q,onChange:function(e){return G(e.target.value)},error:g,helperText:!0===g?"Error":""})})}),Object(A.jsx)(x.a,{my:3,children:Object(A.jsx)(ee.a,{children:Object(A.jsx)(h.a,{label:"New password",type:"password",fullWidth:!0,value:L,onChange:function(e){return M(e.target.value)},error:g,helperText:!0===g?"Cannot empty?":""})})}),Object(A.jsx)(x.a,{mt:1,children:Object(A.jsx)(O.a,{className:r.btn,color:"primary",variant:"contained",onClick:K,children:"Change"})})]})})]})]})}var re=Object(f.a)((function(e){return{paper:{padding:32,textAlign:"left",color:e.palette.text.secondary},group_btn:{display:"flex",justifyContent:"space-between",alignItems:"flex-end"},link:{color:"inherit",textDecoration:"none","&:visited":{color:"inherit",textDecoration:"none"}},btn:{fontSize:32,textTransform:"initial",justifyContent:"flex-end"},change:{height:370}}}));function ie(){var e=re(),t=(Object(u.i)().id,Object(a.useState)("")),n=Object(o.a)(t,2),r=n[0],i=n[1],s=Object(a.useState)(""),l=Object(o.a)(s,2),b=l[0],d=l[1],m=Object(a.useState)(!0),h=Object(o.a)(m,2),O=(h[0],h[1]),f=Object(a.useState)(!1),v=Object(o.a)(f,2),_=v[0],y=v[1],w=Object(a.useState)(0),C=Object(o.a)(w,2),N=C[0],T=C[1];return Object(a.useEffect)((function(){var e=sessionStorage.getItem("user_login_id");T(+e);sessionStorage.getItem("isLogout",!1);!function(e){var t="".concat(k.b,"/api/user/").concat(e);S.a.get(t,{}).then((function(e){i(e.data.user_detail.user_name),d(e.data.user_detail.email)}))}(+e),i(r),d(b)}),[_]),void 0===N||null===N?Object(A.jsx)(u.a,{to:"/"}):Object(A.jsxs)(c.a.Fragment,{children:[Object(A.jsx)(K.a,{setisLogout:O}),Object(A.jsx)(j.a,{children:Object(A.jsx)(x.a,{mt:12,mb:4,children:Object(A.jsxs)(g.a,{container:!0,spacing:4,children:[Object(A.jsx)(g.a,{item:!0,xs:12,sm:4,children:Object(A.jsxs)(q.a,{className:e.paper,children:[Object(A.jsx)(x.a,{my:3,children:Object(A.jsxs)(p.a,{variant:"h6",component:"p",children:["Username: ",r]})}),Object(A.jsx)(x.a,{my:3,children:Object(A.jsxs)(p.a,{variant:"h6",component:"p",children:["Email: ",b]})})]})}),Object(A.jsx)(g.a,{item:!0,xs:12,sm:8,children:Object(A.jsx)(q.a,{className:U()(e.paper,e.change),children:Object(A.jsx)(ce,{setupdate:y,update:_})})})]})})}),Object(A.jsx)(J.a,{})]})}var oe=Object(f.a)((function(e){return{root:{backgroundColor:"#fafafa",height:"95vh",width:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"},btn:{marginTop:12}}}));function se(){var e=Object(u.i)().id,t=(Object(u.g)(),oe());return Object(a.useEffect)((function(){}),[]),Object(A.jsxs)(x.a,{className:t.root,children:[Object(A.jsx)(p.a,{variant:"h5",children:"Verify your account!"}),Object(A.jsx)(O.a,{className:t.btn,variant:"contained",onClick:function(t){var n="".concat(k.b,"/api/user/access-link-otp/").concat(e);S.a.get(n,{}).then((function(e){e.data.verify_status.affectedRows,window.close()})).catch((function(e){window.close()}))},children:"Verify"})]})}var le=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(7),n.e(17)]).then(n.bind(null,663))})),ue=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(9),n.e(18)]).then(n.bind(null,658))})),be=Object(a.lazy)((function(){return Promise.all([n.e(1),n.e(16)]).then(n.bind(null,662))})),je=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(8)]).then(n.bind(null,656))})),de=Object(a.lazy)((function(){return n.e(22).then(n.bind(null,651))})),me=Object(a.lazy)((function(){return n.e(15).then(n.bind(null,664))})),pe=Object(a.lazy)((function(){return n.e(10).then(n.bind(null,660))})),he=Object(a.lazy)((function(){return Promise.all([n.e(3),n.e(12)]).then(n.bind(null,655))})),Oe=Object(a.lazy)((function(){return n.e(24).then(n.bind(null,652))})),xe=Object(a.lazy)((function(){return n.e(21).then(n.bind(null,653))})),ge=Object(a.lazy)((function(){return Promise.all([n.e(1),n.e(2),n.e(14)]).then(n.bind(null,661))})),fe=function(e){return Object(A.jsx)(a.Suspense,{fallback:Object(A.jsx)("div",{children:"... loading"}),children:Object(A.jsx)(be,Object(s.a)({},e))})};var ve=function(){var e=Object(a.useState)(!1),t=Object(o.a)(e,2),n=(t[0],t[1]),c=Object(a.useState)(""),r=Object(o.a)(c,2),i=r[0],b=r[1],j=Object(a.useState)(!0),d=Object(o.a)(j,2);return d[0],d[1],Object(a.useEffect)((function(){b(JSON.parse(sessionStorage.getItem("access_token"))),""===i&&void 0===i||n(!0)}),[i]),Object(A.jsx)(l.a,{children:Object(A.jsx)(a.Suspense,{fallback:Object(A.jsx)("div",{children:"... loading"}),children:Object(A.jsxs)(u.d,{children:[Object(A.jsx)(u.b,{exact:!0,path:"/",component:le}),Object(A.jsx)(u.b,{exact:!0,path:"/user/sign-in",component:M}),Object(A.jsx)(u.b,{exact:!0,path:"/user/sign-up",component:W}),Object(A.jsx)(u.b,{exact:!0,path:"/user/sign-out",component:le}),Object(A.jsx)(u.b,{exact:!0,path:"/user/profile",component:ie}),Object(A.jsx)(u.b,{exact:!0,path:"/user/profile/:id",component:ie}),Object(A.jsx)(u.b,{exact:!0,path:"/user/forgot-password",component:de}),Object(A.jsx)(u.b,{exact:!0,path:"/user/cart",component:pe}),Object(A.jsx)(u.b,{exact:!0,path:"/user/purchased-course/:email",component:me}),Object(A.jsx)(u.b,{exact:!0,path:"/user/favorite-course/:email",component:xe}),Object(A.jsx)(u.b,{exact:!0,path:"/courses-list/:id",component:ue}),Object(A.jsx)(u.b,{exact:!0,path:"/courses-list",component:ue}),Object(A.jsx)(u.b,{exact:!0,path:"/courses-list/byRate/:rate_value",component:ue}),Object(A.jsx)(u.b,{exact:!0,path:"/courses-list/byPrice/:price_value",component:ue}),Object(A.jsx)(u.b,{exact:!0,path:"/course/:course_id",component:je}),Object(A.jsx)(u.b,{exact:!0,path:"/admin/",component:he}),Object(A.jsx)(u.b,{exact:!0,path:"/admin/cat-management",component:he}),Object(A.jsx)(u.b,{exact:!0,path:"/admin/cat-management/subcat/:id",component:he}),Object(A.jsx)(u.b,{exact:!0,path:"/admin/delete-course",component:he}),Object(A.jsx)(u.b,{exact:!0,path:"/admin/student-management",component:he}),Object(A.jsx)(u.b,{exact:!0,path:"/admin/student-management/student/:id",component:he}),Object(A.jsx)(u.b,{exact:!0,path:"/admin/instructor-management",component:he}),Object(A.jsx)(u.b,{exact:!0,path:"/admin/instructor-management/instructor/:id",component:he}),Object(A.jsx)(u.b,{exact:!0,path:"/student/enroll/course/:course_id",component:ge}),Object(A.jsx)(u.b,{exact:!0,path:"/instructor/upload-course",component:function(e){return Object(A.jsx)(fe,Object(s.a)({},e))}}),Object(A.jsx)(u.b,{exact:!0,path:"/instructor/uploaded-course/:id",component:Oe}),Object(A.jsx)(u.b,{exact:!0,path:"/ins/case/uploaded/:id",component:Oe}),Object(A.jsx)(u.b,{exact:!0,path:"/ins/case/upload-lesson/:id",component:Oe}),Object(A.jsx)(u.b,{exact:!0,path:"/ins/case/upload-chapter/:id",component:Oe}),Object(A.jsx)(u.b,{exact:!0,path:"/join-with-ins",component:M}),Object(A.jsx)(u.b,{exact:!0,path:"/:id",component:se})]})})})},_e=function(e){e&&e instanceof Function&&n.e(25).then(n.bind(null,654)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,r=t.getLCP,i=t.getTTFB;n(e),a(e),c(e),r(e),i(e)}))},ye=n(151),Se=n(351),we=n(68),Ce=n(57),ke=n(149),Ne=n(150),Te=function(e){return function(t,n,a){return e((function(e,n){var a,c=performance.now(),r=t(e,n),i=performance.now(),o=(a=i-c,Math.round(100*a)/100);return console.log("reducer process time:",o),r}),n,a)}},Ie=function(e){return function(t){return function(n){console.group(n.type),console.info("dispatching",n);var a=t(n);return console.log("next state",e.getState()),console.groupEnd(),a}}},De=n(134),Ee=n(87),Ae=n(62),Be={cart:[],quantity:0},Pe=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Be,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case Ee.a:var n=e.cart,a=[].concat(Object(De.a)(n),[t.payload]);return Object(s.a)(Object(s.a)({},e),{},{cart:a,quantity:a.length});case Ae.c:var c=e.cart,r=c.filter((function(e){return e.course_id!==t.payload}));return{cart:r,quantity:r.length};case Ee.b:return{cart:[],quantity:0};default:return e}},ze={all_courses_sale:[]},Re=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ze,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case Ae.b:return Object(s.a)({},e.all_courses_sale);case Ae.a:return{all_courses_sale:t.payload};default:return e}},Le=n(101),Me={isShowScrollbar:!0},Fe=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Me,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case Le.a:return Object(s.a)(Object(s.a)({},e),{},{isShowScrollbar:!e.isShowScrollbar});default:return e}},We=Object(Ce.combineReducers)({cartReducer:Pe,courseReducer:Re,homeReducer:Fe});var qe=function(e){var t=[Ie,ke.a],n=[Ce.applyMiddleware.apply(void 0,t),Te],a=Ne.composeWithDevTools.apply(void 0,n);return Object(Ce.createStore)(We,e,a)}(),Ge=Object(ye.a)({palette:{primary:{main:"#455a64"}}});i.a.render(Object(A.jsx)(c.a.StrictMode,{children:Object(A.jsx)(we.a,{store:qe,children:Object(A.jsx)(Se.a,{theme:Ge,children:Object(A.jsx)(ve,{})})})}),document.getElementById("root")),_e()},56:function(e,t,n){"use strict";var a=n(153),c=n(54),r=(n(0),n(12)),i=n(2),o=Object(a.a)((function(e){return{link:{color:"inherit",textDecoration:"none","&:visited":{color:"inherit",textDecoration:"none"}}}}));t.a=function(){var e=o();return Object(i.jsxs)(c.a,{variant:"body2",color:"textSecondary",align:"center",children:["Copyright \xa9 ",Object(i.jsx)(r.b,{className:e.link,color:"inherit",to:"/",children:"Online Academy"})," ",(new Date).getFullYear(),"."]})}},62:function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"a",(function(){return c})),n.d(t,"c",(function(){return r}));var a="GET_ALL_COURSES_SALE",c="ADD_SALES_INTO_GLOBAL_STATE",r="REMOVE_COURSE"},87:function(e,t,n){"use strict";n.d(t,"a",(function(){return a})),n.d(t,"b",(function(){return c}));var a="ADD_COURSE_TO_CART",c="CLEAR_CART"},97:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var a=n(153),c=n(54),r=(n(0),n(56)),i=n(2),o=Object(a.a)((function(e){return{icon:{marginRight:e.spacing(2)},heroContent:{backgroundColor:e.palette.background.paper,padding:e.spacing(8,0,6)},heroButtons:{marginTop:e.spacing(4)},cardGrid:{paddingTop:e.spacing(8),paddingBottom:e.spacing(8)},card:{height:"100%",display:"flex",flexDirection:"column"},cardMedia:{paddingTop:"56.25%"},cardContent:{flexGrow:1},footer:{backgroundColor:e.palette.background.paper,padding:e.spacing(6)}}}));function s(){var e=o();return Object(i.jsxs)("footer",{className:e.footer,children:[Object(i.jsx)(c.a,{variant:"h6",align:"center",gutterBottom:!0,children:"Online Academy"}),Object(i.jsx)(c.a,{variant:"subtitle1",align:"center",color:"textSecondary",component:"p"}),Object(i.jsx)(r.a,{})]})}},98:function(e,t,n){"use strict";var a=n(8),c=n(23),r=n(345),i=n(348),o=n(352),s=n(341),l=n(336),u=n(347),b=n(141),j=n(343),d=n(153),m=n(6),p=n(346),h=n(54),O=n(147),x=n.n(O),g=n(145),f=n.n(g),v=n(143),_=n.n(v),y=n(144),S=n.n(y),w=n(146),C=n.n(w),k=n(0),N=n.n(k),T=n(68),I=n(18),D=n(12),E=n(20),A=n.n(E),B=n(16),P=n(302),z=n(130),R=n.n(z),L=n(17),M=n(344),F=n(2),W=Object(m.a)({paper:{border:"1px solid #d3d4d5"},btn_cat_name:{padding:12},link:{color:"inherit",textDecoration:"none","&:visited":{color:"inherit",textDecoration:"none"}}})((function(e){return Object(F.jsx)(b.a,Object(L.a)({elevation:0,getContentAnchorEl:null,anchorOrigin:{vertical:"bottom",horizontal:"center"},transformOrigin:{vertical:"top",horizontal:"left"}},e))})),q=Object(m.a)((function(e){return{root:{"&:focus":{backgroundColor:e.palette.primary.main,"& .MuiListItemIcon-root, & .MuiListItemText-primary":{color:e.palette.common.white}}},link:{color:"inherit",textDecoration:"none","&:visited":{color:"inherit",textDecoration:"none"}}}}))(j.a);function G(e){var t=e.cat_name,n=e.set_cat_close,c=e.sub_web_cat,r=e.sub_mobi_cat,i=e.classes,l=N.a.useState(null),u=Object(a.a)(l,2),b=u[0],j=u[1];Object(I.i)().id;return Object(F.jsxs)("div",{children:[Object(F.jsx)(s.a,{"aria-controls":"customized-menu","aria-haspopup":"true",variant:"text",color:"primary",className:i.cat_name,onClick:function(e){j(e.currentTarget)},children:Object(F.jsx)(o.a,{p:1,children:t})}),Object(F.jsxs)(W,{id:"customized-menu",anchorEl:b,keepMounted:!0,className:i.popover_cat,open:Boolean(b),onClose:function(){n(!0)},children:[0!==c.length?c.map((function(e,t){return Object(F.jsx)(D.b,{onClick:function(){n(!0)},className:i.link,to:"/courses-list/".concat(e.subject_name),children:Object(F.jsx)(q,{children:Object(F.jsx)(M.a,{primary:e.subject_name})})},e.subject_name)})):"",0!==r.length?r.map((function(e,t){return Object(F.jsx)(D.b,{onClick:function(){n(!0)},className:i.link,to:"/courses-list/".concat(e.subject_name),children:Object(F.jsx)(q,{children:Object(F.jsx)(M.a,{primary:e.subject_name})})},e.subject_name)})):""]})]})}var U=Object(d.a)((function(e){return{typography:{padding:e.spacing(2)},popover:{boxShadow:"none!important",textTransform:"initial","&.MuiButton-root":{padding:"0!important",transition:"0!important"},"&.MuiPaper-root":Object(c.a)({transition:0},"transition","0!important")},popover_cat:{"&:hover":{cursor:"pointer"},transition:"0!important","&.MuiButton-root":{transition:"0!important"},"&.MuiPaper-root":{transition:"0!important"}},cat_name:{width:"100%!important","&.MuiButton-root":{transition:"0!important"},"&.MuiPaper-root":{transition:"0!important"}},cat_icon:{display:"flex",alignItems:"center"},icon_category:{marginRight:6},link:{color:"inherit",textDecoration:"none","&:visited":{color:"inherit",textDecoration:"none"}}}}));function J(e){var t=e.title,n=e.categories,c=e.sub_mobi_cat,r=e.sub_web_cat,i=U(),s=N.a.useState(null),l=Object(a.a)(s,2),u=l[0],b=l[1],j=Object(k.useState)(!1),d=Object(a.a)(j,2),m=d[0],p=d[1],O=function(){b(null)},x=Boolean(u),g=x?"simple-popover":void 0;return Object(k.useEffect)((function(){!0===m&&O()}),[m]),Object(F.jsxs)("div",{children:[Object(F.jsx)(o.a,{"aria-describedby":g,variant:"text",color:"inherit",className:i.popover,onClick:function(e){b(e.currentTarget),p(!1)},children:Object(F.jsxs)(h.a,{variant:"h6",className:i.cat_icon,children:[" ",Object(F.jsx)(R.a,{className:i.icon_category})," ",t]})}),Object(F.jsx)(P.a,{className:i.popover_cat,id:g,open:x,anchorEl:u,onClose:O,anchorOrigin:{vertical:"bottom",horizontal:"center"},transformOrigin:{vertical:"top",horizontal:"center"},children:n.map((function(e,t){return Object(F.jsx)(G,{classes:i,set_cat_close:p,sub_mobi_cat:2===e.cat_id?c:[],sub_web_cat:1===e.cat_id?r:[],className:i.typography,cat_name:e.cat_name},e.cat_id)}))})]})}var K=Object(d.a)((function(e){return{typography:{padding:e.spacing(2)}}}));function H(){K();var e=N.a.useState(null),t=Object(a.a)(e,2),n=t[0],c=(t[1],Object(k.useState)([])),r=Object(a.a)(c,2),i=(r[0],r[1]),o=Object(k.useState)([]),s=Object(a.a)(o,2),l=s[0],u=s[1],b=Object(k.useState)([]),j=Object(a.a)(b,2),d=j[0],m=j[1];Boolean(n);return Object(k.useEffect)((function(){var e="".concat(B.b,"/api/sub-category");A.a.get(e,{}).then((function(e){i(e.data.all_sub_cats);var t=e.data.all_sub_cats.filter((function(e){return 1===e.cat_id})),n=e.data.all_sub_cats.filter((function(e){return 2===e.cat_id}));u(t),m(n)})).catch((function(e){console.log(e)}))}),[]),Object(F.jsx)("div",{children:Object(F.jsx)(J,{title:"Categories",sub_web_cat:l,sub_mobi_cat:d,categories:[{cat_id:1,cat_name:"Web application development"},{cat_id:2,cat_name:"Mobile application development"}],anchorOrigin:{vertical:"bottom",horizontal:"center"},transformOrigin:{vertical:"top",horizontal:"left"}})})}var V=n(142),Y=n.n(V),Q=Object(d.a)((function(e){return{root:{flexGrow:1},menuButton:{marginRight:e.spacing(2)}}}));function X(){var e=Q();return Object(F.jsx)("div",{className:e.root,children:Object(F.jsx)(r.a,{position:"static",children:Object(F.jsxs)(p.a,{variant:"dense",children:[Object(F.jsx)(u.a,{edge:"start",className:e.menuButton,color:"inherit","aria-label":"menu",children:Object(F.jsx)(Y.a,{})}),Object(F.jsx)(h.a,{variant:"h6",color:"inherit",children:"Online Academy"})]})})})}var Z=Object(d.a)((function(e){var t,n;return{"@global":{"*::-webkit-scrollbar":{width:"1em"},"*::-webkit-scrollbar-track":{"-webkit-box-shadow":"inset 0 0 6px rgba(0,0,0,0.00)"},"*::-webkit-scrollbar-thumb":{backgroundColor:"#455a64",outline:"1px solid slategrey"}},nav_root:(t={"& a":{textDecoration:"none",color:"inherit"},"& a:hover":{textDecoration:"none",color:"inherit"}},Object(c.a)(t,e.breakpoints.down("xs"),{display:"none"}),Object(c.a)(t,e.breakpoints.down("md"),{display:"none"}),Object(c.a)(t,e.breakpoints.between("md","lg"),{display:"flex"}),t),nav_mobi:(n={},Object(c.a)(n,e.breakpoints.down("xs"),{display:"flex"}),Object(c.a)(n,e.breakpoints.down("md"),{display:"flex"}),Object(c.a)(n,e.breakpoints.between("md","lg"),{display:"none"}),n),icon:{marginRight:e.spacing(2)},heroContent:{backgroundColor:e.palette.background.paper,padding:e.spacing(8,0,6)},heroButtons:{marginTop:e.spacing(4)},cardGrid:{paddingTop:e.spacing(8),paddingBottom:e.spacing(8)},card:{height:"100%",display:"flex",flexDirection:"column",boxShadow:"0 4px 8px rgb(0 1 1 / 10%)"},cardMedia:{paddingTop:"56.25%"},cardContent:{flexGrow:1},footer:{backgroundColor:e.palette.background.paper,padding:e.spacing(6)},root:{flexGrow:1},menuButton:{marginRight:e.spacing(2)},title:{flexGrow:1,display:"flex"},btn_sign_in:{color:"inherit",fontSize:16,textDecoration:"none",textTransform:"capitalize","&:visited":{color:"inherit",textDecoration:"none"}},ten_most_newest_courses:{textAlign:"center",marginTop:32,marginBottom:32},outstanding_courses:{textAlign:"center",marginTop:32,marginBottom:32},card_wrapper:{},nav_typo:{margin:12,display:"flex",alignItems:"center","&:hover":{cursor:"pointer"}},btn_si:{textTransform:"capitalize"},outstanding_course_wrapper:{marginTop:100,marginBottom:100},link:{color:"inherit",textDecoration:"none","&:visited":{color:"inherit",textDecoration:"none"}},btn:{textTransform:"capitalize"},btn_signout:{textTransform:"capitalize",textAlign:"left"},cart_css:{color:"white"},header:{marginTop:50,marginBottom:100},icon_courses_list:{marginRight:6}}})),$=Object(m.a)((function(e){return{badge:{right:-3,top:0,border:"2px solid ".concat(e.palette.primary),padding:"0 4px"}}}))(i.a);t.a=Object(T.b)((function(e){return{cart_global_state:e.cartReducer.cart,quantity_global_state:e.cartReducer.quantity}}),null)((function(e){var t=e.setisLogout,n=(e.cart_global_state,e.quantity_global_state),c=Z(),i=Object(k.useState)(""),d=Object(a.a)(i,2),m=d[0],O=d[1],g=Object(k.useState)(""),v=Object(a.a)(g,2),y=v[0],w=v[1],T=Object(k.useState)(0),E=Object(a.a)(T,2),A=E[0],B=E[1],P=(Object(I.i)(),Object(I.g)()),z=Object(k.useState)(!1),R=Object(a.a)(z,2),L=(R[0],R[1],N.a.useState(null)),M=Object(a.a)(L,2),W=M[0],q=M[1],G=Object(k.useState)(0),U=Object(a.a)(G,2),J=U[0],K=U[1],V=Boolean(W),Y=function(){q(null)};return Object(k.useEffect)((function(){var e=sessionStorage.getItem("user_role");B(null!==e?e:null),K(n);var t=sessionStorage.getItem("user_name"),a=sessionStorage.getItem("email");return""===t||void 0===t||null===t?O(void 0):(a=a.substring(1,a.length-1),O(t),void w(a))}),[m,J,n]),Object(F.jsxs)(N.a.Fragment,{children:[Object(F.jsx)(l.a,{}),Object(F.jsx)(o.a,{className:c.nav_mobi,children:Object(F.jsx)(X,{})}),Object(F.jsx)(r.a,{position:"static",className:c.nav_root,children:Object(F.jsxs)(p.a,{children:[Object(F.jsx)(u.a,{edge:"start",className:c.menuButton,color:"inherit","aria-label":"menu"}),Object(F.jsxs)(o.a,{className:c.title,children:[Object(F.jsx)(D.b,{className:c.link,to:"/",children:Object(F.jsx)(h.a,{variant:"h6",className:c.nav_typo,children:"Online Academy"})}),Object(F.jsx)(h.a,{variant:"h6",className:c.nav_typo,children:Object(F.jsx)(H,{})}),Object(F.jsxs)(D.b,{className:c.link,to:"/courses-list",children:[" ",Object(F.jsxs)(h.a,{variant:"h6",className:c.nav_typo,children:[Object(F.jsx)(_.a,{className:c.icon_courses_list}),"Courses list"]})]}),3===+A||4===+A?Object(F.jsxs)(D.b,{className:c.link,to:"/instructor/upload-course",children:[" ",Object(F.jsxs)(h.a,{variant:"h6",className:c.nav_typo,children:[Object(F.jsx)(S.a,{className:c.icon_courses_list}),"Upload-course"]})]}):"",4===+A?Object(F.jsxs)(D.b,{className:c.link,to:"/admin",children:[" ",Object(F.jsxs)(h.a,{variant:"h6",className:c.nav_typo,children:[Object(F.jsx)(f.a,{className:c.icon_courses_list}),"Admin Page"]})]}):""]}),void 0!==m?Object(F.jsxs)("div",{children:[2===+A||4===+A?Object(F.jsx)(D.b,{to:"/user/cart",children:Object(F.jsx)(u.a,{className:c.cart_css,children:Object(F.jsx)($,{badgeContent:J,color:"secondary",children:Object(F.jsx)(C.a,{})})})}):"",Object(F.jsx)(u.a,{"aria-label":"account of current user","aria-controls":"menu-appbar","aria-haspopup":"true",onClick:function(e){q(e.currentTarget)},color:"inherit",children:Object(F.jsx)(x.a,{})}),Object(F.jsxs)(b.a,{id:"menu-appbar",anchorEl:W,anchorOrigin:{vertical:"top",horizontal:"right"},keepMounted:!0,transformOrigin:{vertical:"top",horizontal:"right"},open:V,onClose:Y,children:[Object(F.jsx)(D.b,{className:c.link,to:"/user/profile",children:Object(F.jsx)(j.a,{onClick:Y,children:"Profile"})}),2===+A?Object(F.jsxs)(o.a,{children:[Object(F.jsx)(D.b,{className:c.link,to:"/user/purchased-course/".concat(y),children:Object(F.jsx)(j.a,{onClick:Y,children:"Purchased course"})}),Object(F.jsx)(D.b,{className:c.link,to:"/user/favorite-course/".concat(y),children:Object(F.jsx)(j.a,{onClick:Y,children:"Favorite course"})})]}):"",3===+A?Object(F.jsx)(D.b,{className:c.link,to:"/instructor/uploaded-course/".concat(y),children:Object(F.jsx)(j.a,{onClick:Y,children:"Uploaded course"})}):"",Object(F.jsx)(j.a,{className:c.btn_signout,onClick:function(e){return sessionStorage.removeItem("user_name"),sessionStorage.removeItem("email"),sessionStorage.clear(),sessionStorage.setItem("isLogout",!0),t(!0),O(void 0),P.push("/")},children:"Sign out"})]})]}):Object(F.jsx)(D.b,{className:c.btn_sign_in,to:"/user/sign-in",children:Object(F.jsx)(s.a,{color:"inherit",className:c.btn_si,children:"Sign in"})})]})})]})}))}},[[295,5,6]]]);
//# sourceMappingURL=main.d314371e.chunk.js.map