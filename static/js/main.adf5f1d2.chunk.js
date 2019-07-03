(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{3883:function(e,t,n){e.exports=n(3905)},3905:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),r=n(9),c=n.n(r),l=n(21),o=n(53),d=n(3954),m=n(31),s=n.n(m),u=n(62),p=n(72),h=n.n(p),E=n(73),b=n(74),v=n(80),f=n(11),O=n(38),I={add:Object(O.createStandardAction)("ITEM/ADD")(),toggle:Object(O.createStandardAction)("ITEM/TOGGLE")(),remove:Object(O.createStandardAction)("ITEM/REMOVE")(),edit:Object(O.createStandardAction)("ITEM/EDIT")()},y=Object(O.createReducer)({items:[]},{"ITEM/ADD":function(e,t){var n=t.payload;return Object(f.a)({},e,{items:[].concat(Object(v.a)(e.items),[Object(f.a)({id:"item_"+s.a.slug(),done:!1},n)])})},"ITEM/TOGGLE":function(e,t){var n=t.payload;return Object(f.a)({},e,{items:e.items.map(function(e){return e.id===n.id?Object(f.a)({},e,{done:!e.done}):e})})},"ITEM/REMOVE":function(e,t){var n=t.payload;return Object(f.a)({},e,{items:e.items.filter(function(e){return e.id!==n.id})})},"ITEM/EDIT":function(e,t){var n=t.payload;return Object(f.a)({},e,{items:e.items.map(function(e){return e.id===n.id?Object(f.a)({},e,n):e})})}}),j=n(43),A=n(44),g=n(54),C=n(45),k=n(55),M=n(79),T=n(3942),D=n(3906),w=n(3943),x=n(3953),F=n(3944),S=n(3945),R=n(3940),L=n(3956),G=n(3948),K=n(3951),W=n(57),_=n(3938),q=n(3949),B=n(3946),H=n(3947),J=n(40),P=n(42),V=n(3935),z=n(3952),N=n(3939),Q=n(3941),U=function(e){function t(){var e,n;Object(j.a)(this,t);for(var a=arguments.length,i=new Array(a),r=0;r<a;r++)i[r]=arguments[r];return(n=Object(g.a)(this,(e=Object(C.a)(t)).call.apply(e,[this].concat(i)))).state=Object(f.a)({},n.props),n.handleInputChange=function(e){var t=e.target,a=t.name,i=t.value;n.setState(function(e){return Object(f.a)({},e,Object(P.a)({},a,i))})},n.handleApplyClick=function(){n.props.onApply(Object(f.a)({},n.state))},n.handleKeyDown=function(e){"Enter"===e.key?n.props.onApply(Object(f.a)({},n.state)):"Escape"===e.key&&n.props.onCancel()},n}return Object(k.a)(t,e),Object(A.a)(t,[{key:"render",value:function(){var e=this.state,t=e.title,n=e.description,a=this.props.onCancel;return i.a.createElement(V.a,{fullWidth:!0},i.a.createElement(z.a,{name:"title",label:"Title",autoFocus:!0,error:!t,value:t,onKeyDown:this.handleKeyDown,onChange:this.handleInputChange}),i.a.createElement(z.a,{name:"description",label:"Description",multiline:!0,value:n,onKeyDown:this.handleKeyDown,onChange:this.handleInputChange}),i.a.createElement(N.a,{row:!0,style:{justifyContent:"flex-end"}},i.a.createElement(L.a,{title:"Item title cannot be empty",open:!t},i.a.createElement("span",null,i.a.createElement(L.a,{title:"Enter"},i.a.createElement(R.a,{color:"primary",onClick:this.handleApplyClick,disabled:!t},i.a.createElement(J.a,null))))),i.a.createElement(L.a,{title:"Escape",placement:"right"},i.a.createElement(R.a,{color:"secondary",onClick:a},i.a.createElement(Q.a,null)))))}}]),t}(a.Component);U.defaultProps={title:"",description:"",onApply:function(){},onCancel:function(){}};var X=function(e){function t(){var e,n;Object(j.a)(this,t);for(var a=arguments.length,i=new Array(a),r=0;r<a;r++)i[r]=arguments[r];return(n=Object(g.a)(this,(e=Object(C.a)(t)).call.apply(e,[this].concat(i)))).state={activeItem:null,addForm:!1},n.handleItemToggle=function(e){n.props.itemToggle({id:e})},n.handleMenuOpen=function(e,t){var a=t.currentTarget,i=n.props.items.find(function(t){return t.id===e});i&&n.setState(function(e){return Object(f.a)({},e,{activeItem:Object(f.a)({},i,{menuAnchorElement:a,status:"menu"})})})},n.handleMenuClose=function(){n.resetActiveItem()},n.handleMenuItemEdit=function(){n.setState(function(e){return e.activeItem?Object(f.a)({},e,{activeItem:Object(f.a)({},e.activeItem,{status:"edit"})}):e})},n.handleItemEditApply=function(e){n.state.activeItem&&(n.props.itemEdit(Object(f.a)({},n.state.activeItem,e)),n.resetActiveItem())},n.handleItemEditCancel=function(){n.resetActiveItem()},n.handleItemAddFormOpen=function(){n.setState(function(e){return Object(f.a)({},e,{addForm:!0})})},n.handleItemAddApply=function(e){n.state.addForm&&(n.props.itemAdd(e),n.hideAddForm())},n.handleItemAddCancel=function(){n.hideAddForm()},n.handleMenuItemRemove=function(){n.setState(function(e){return e.activeItem?Object(f.a)({},e,{activeItem:Object(f.a)({},e.activeItem,{status:"exiting"})}):e})},n.handleMenuItemRemoveExited=function(){n.state.activeItem&&(n.props.itemRemove(Object(f.a)({},n.state.activeItem)),n.resetActiveItem())},n}return Object(k.a)(t,e),Object(A.a)(t,[{key:"resetActiveItem",value:function(){this.setState(function(e){return Object(f.a)({},e,{activeItem:null})})}},{key:"hideAddForm",value:function(){this.setState(function(e){return Object(f.a)({},e,{addForm:!1})})}},{key:"renderMenu",value:function(e){var t=this.props.items;return i.a.createElement(M.a,{id:"item-menu",anchorEl:e.menuAnchorElement,MenuListProps:{},open:!0,onClose:this.handleMenuClose},i.a.createElement(T.a,{disabled:t.find(function(t){return t.id===e.id}).done,style:{minHeight:"24px"},onClick:this.handleMenuItemEdit},"Edit"),i.a.createElement(T.a,{style:{minHeight:"24px"},onClick:this.handleMenuItemRemove},"Remove"))}},{key:"renderListItem",value:function(e){var t=this.state.activeItem,n=!!t&&e.id===t.id,a=n&&"edit"===t.status;return i.a.createElement(D.a,{divider:!0,selected:n,disabled:e.done},i.a.createElement(w.a,{style:{minWidth:"48px"}},i.a.createElement(x.a,{disabled:n,color:"default",disableRipple:!0,checkedIcon:i.a.createElement(J.a,null),icon:i.a.createElement(J.b,null),onChange:this.handleItemToggle.bind(this,e.id),checked:e.done})),a?i.a.createElement(U,{title:e.title,description:e.description,onApply:this.handleItemEditApply,onCancel:this.handleItemEditCancel}):i.a.createElement(F.a,{style:e.done?{textDecoration:"line-through"}:void 0,primary:e.title,secondary:e.description}),i.a.createElement(S.a,null,i.a.createElement(R.a,{onClick:this.handleMenuOpen.bind(this,e.id),disabled:a},i.a.createElement(B.a,{color:"action",fontSize:"inherit"}))))}},{key:"renderAddItem",value:function(){this.state.addForm;var e=i.a.createElement(w.a,{style:{minWidth:"48px"}},i.a.createElement(x.a,{disabled:!0,color:"default",disableRipple:!0,icon:i.a.createElement(H.a,null),checked:!1}));return this.state.addForm?i.a.createElement(D.a,{divider:!0},e,i.a.createElement(U,{onApply:this.handleItemAddApply,onCancel:this.handleItemAddCancel})):i.a.createElement(L.a,{title:"Click to add new TODO item",enterDelay:850,leaveDelay:250},i.a.createElement(D.a,{button:!0,divider:!0,onClick:this.handleItemAddFormOpen},e))}},{key:"render",value:function(){var e=this,t=this.props.items,n=this.state.activeItem;return i.a.createElement(G.a,{maxWidth:"sm",style:{marginTop:"1rem"}},i.a.createElement(K.a,null,i.a.createElement(W.a,{variant:"h5",component:"h1",align:"center"},"TODO"),n&&"menu"===n.status&&this.renderMenu(n),i.a.createElement(_.a,null,t.map(function(t,a){return i.a.createElement(q.a,{enter:!1,appear:!1,key:a,in:!(n&&n.id===t.id&&"exiting"===n.status),onExited:e.handleMenuItemRemoveExited},e.renderListItem(t))}),this.renderAddItem())))}}]),t}(a.Component),Y=Object(o.b)(function(e){return{items:e.items}},{itemAdd:I.add,itemToggle:I.toggle,itemRemove:I.remove,itemEdit:I.edit})(X),Z={key:"root",storage:h.a},$=Object(u.a)(Z,y),ee={items:[{id:"item_"+Object(m.slug)(),title:"Go to doctor",description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, pariatur, ullam.",done:!1},{id:"item_"+Object(m.slug)(),title:"Buy some food for breakfast",description:"Aliquid at ducimus ipsum quod totam ut vitae voluptatem.",done:!1},{id:"item_"+Object(m.slug)(),title:"Fix the car",description:"Accusamus autem deleniti dolore dolores, expedita illo inventore ipsam, ipsum libero maiores necessitatibus nesciunt non obcaecati optio provident reprehenderit vel, veniam voluptatem.",done:!1},{id:"item_"+Object(m.slug)(),title:"Clean the apartment",done:!1}]},te=Object(l.createStore)($,ee,Object(b.composeWithDevTools)()),ne=Object(u.b)(te);c.a.render(i.a.createElement(o.a,{store:te},i.a.createElement(E.a,{loading:null,persistor:ne},i.a.createElement(d.a,null),i.a.createElement(Y,null))),document.getElementById("root"))}},[[3883,1,2]]]);
//# sourceMappingURL=main.adf5f1d2.chunk.js.map