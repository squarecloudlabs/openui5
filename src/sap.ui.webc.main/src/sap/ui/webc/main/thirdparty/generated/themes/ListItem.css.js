sap.ui.define(['sap/ui/webc/common/thirdparty/base/asset-registries/Themes', 'sap/ui/webc/common/thirdparty/theming/generated/themes/sap_fiori_3/parameters-bundle.css', './sap_fiori_3/parameters-bundle.css'], function (Themes, defaultThemeBase, parametersBundle_css) { 'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

	var defaultThemeBase__default = /*#__PURE__*/_interopDefaultLegacy(defaultThemeBase);

	Themes.registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_fiori_3", () => defaultThemeBase__default);
	Themes.registerThemePropertiesLoader("@ui5/webcomponents", "sap_fiori_3", () => parametersBundle_css);
	var styles = {packageName:"@ui5/webcomponents",fileName:"themes/ListItem.css",content:".ui5-hidden-text{position:absolute;clip:rect(1px,1px,1px,1px);user-select:none;left:-1000px;top:-1000px;pointer-events:none;font-size:0}:host([actionable]:not([disabled])){cursor:pointer}:host([selected][actionable]:not([active]):hover){background:var(--sapList_Hover_SelectionBackground)}:host([active][actionable]),:host([selected][active][actionable]){background:var(--sapList_Active_Background)}:host([actionable]:not([active]):not([selected]):hover){background:var(--sapList_Hover_Background)}:host([active][actionable]) .ui5-li-root.ui5-li--focusable .ui5-li-content:focus,:host([active][actionable]) .ui5-li-root.ui5-li--focusable:focus{outline-color:var(--sapContent_ContrastFocusColor)}:host([active][actionable]) .ui5-li-root .ui5-li-icon{color:var(--sapList_Active_TextColor)}:host([active][actionable]) .ui5-li-additional-text,:host([active][actionable]) .ui5-li-desc,:host([active][actionable]) .ui5-li-title{color:var(--sapList_Active_TextColor)}:host([additional-text-state=Warning]) .ui5-li-additional-text{color:var(--sapCriticalTextColor)}:host([additional-text-state=Success]) .ui5-li-additional-text{color:var(--sapPositiveTextColor)}:host([additional-text-state=Error]) .ui5-li-additional-text{color:var(--sapNegativeTextColor)}:host([additional-text-state=Information]) .ui5-li-additional-text{color:var(--sapInformativeTextColor)}:host([has-title][description]){height:5rem}:host([has-title][image]){height:5rem}:host([image]) .ui5-li-content{height:3rem}:host([description]) .ui5-li-root{padding:1rem}:host([description]) .ui5-li-content{height:3rem}:host([has-title][description]) .ui5-li-title{padding-bottom:.375rem}.ui5-li-text-wrapper{display:flex;flex-direction:column;flex:auto;min-width:1px;line-height:normal}:host([description]) .ui5-li-text-wrapper{height:100%;justify-content:space-between;padding:.125rem 0}.ui5-li-description-info-wrapper{display:flex;justify-content:space-between}.ui5-li-title{color:var(--sapTextColor);font-size:var(--_ui5_list_item_title_size)}.ui5-li-additional-text,.ui5-li-desc,.ui5-li-title{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ui5-li-desc{color:var(--sapContent_LabelColor);font-size:var(--sapFontSize)}.ui5-li-additional-text{margin:0 .25rem;color:var(--sapNeutralTextColor);font-size:.875rem;min-width:3.75rem;text-align:right;max-width:40%}:host([description]) .ui5-li-additional-text{align-self:flex-end}.ui5-li-img{width:var(--_ui5_list_item_img_size);min-width:var(--_ui5_list_item_img_size);height:var(--_ui5_list_item_img_size);min-height:var(--_ui5_list_item_img_size);margin:var(--_ui5_list_item_img_margin);border-radius:.25rem}.ui5-li-img-inner{object-fit:contain}.ui5-li-icon{min-width:var(--_ui5_list_item_icon_size);min-height:var(--_ui5_list_item_icon_size);color:var(--sapContent_NonInteractiveIconColor);padding-right:.5rem}.ui5-li-content{display:flex;align-items:center;flex:auto;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;pointer-events:none}.ui5-li-deletebtn,.ui5-li-detailbtn{display:flex;align-items:center}.ui5-li-multisel-cb,.ui5-li-singlesel-radiobtn{flex-shrink:0}:host([description]) .ui5-li-singlesel-radiobtn{align-self:flex-start;margin-top:var(--_ui5_list_item_selection_btn_margin_top)}:host([description]) .ui5-li-multisel-cb{align-self:flex-start;margin-top:var(--_ui5_list_item_selection_btn_margin_top)}:host([_mode=SingleSelectBegin]) .ui5-li-root{padding-right:1rem;padding-left:0}:host([_mode=MultiSelect]) .ui5-li-root{padding-right:1rem;padding-left:0}:host([_mode=SingleSelectEnd]) .ui5-li-root{padding-right:0;padding-left:1rem}:host [ui5-checkbox].ui5-li-singlesel-radiobtn{margin-right:var(--_ui5_list_item_cb_margin_right)}:host [dir=rtl] .ui5-li-icon{padding-left:.5rem;padding-right:0}:host [dir=rtl] .ui5-li-img{margin:.5rem 0 .5rem .75rem}[dir=rtl] .ui5-li-additional-text{text-align:left}:host([_mode=SingleSelectBegin]) [dir=rtl].ui5-li-root{padding-right:0;padding-left:1rem}:host([_mode=MultiSelect]) [dir=rtl].ui5-li-root{padding-right:0;padding-left:1rem}:host([_mode=SingleSelectEnd]) [dir=rtl].ui5-li-root{padding-right:1rem;padding-left:0}"};

	return styles;

});
