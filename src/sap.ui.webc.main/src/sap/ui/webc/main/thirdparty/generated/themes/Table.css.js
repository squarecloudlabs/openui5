sap.ui.define(['sap/ui/webc/common/thirdparty/base/asset-registries/Themes', 'sap/ui/webc/common/thirdparty/theming/generated/themes/sap_fiori_3/parameters-bundle.css', './sap_fiori_3/parameters-bundle.css'], function (Themes, defaultThemeBase, parametersBundle_css) { 'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

	var defaultThemeBase__default = /*#__PURE__*/_interopDefaultLegacy(defaultThemeBase);

	Themes.registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_fiori_3", () => defaultThemeBase__default);
	Themes.registerThemePropertiesLoader("@ui5/webcomponents", "sap_fiori_3", () => parametersBundle_css);
	var styles = {packageName:"@ui5/webcomponents",fileName:"themes/Table.css",content:"[growing-button]{display:flex;align-items:center;padding:var(--_ui5_load_more_padding);border-top:1px solid var(--sapList_BorderColor);box-sizing:border-box;cursor:pointer;outline:none}[growing-button-inner]{display:flex;align-items:center;justify-content:center;flex-direction:column;min-height:var(--_ui5_load_more_text_height);width:100%;color:var(--sapButton_TextColor);background-color:var(--sapList_Background);border:var(--_ui5_load_more_border);border-radius:var(--_ui5_load_more_border_radius);box-sizing:border-box}[growing-button-inner]:focus{outline:var(--_ui5_load_more_outline_width) dotted var(--sapContent_FocusColor);outline-offset:-.125rem;border-color:transparent}[growing-button-inner]:hover{background-color:var(--sapList_Hover_Background)}[growing-button-inner]:active,[growing-button-inner][active]{background-color:var(--sapList_Active_Background);border-color:var(--sapList_Active_Background)}[growing-button-inner]:active>*,[growing-button-inner][active]>*{color:var(--sapList_Active_TextColor)}[growing-button-subtext],[growing-button-text]{width:100%;text-align:center;font-family:\"72override\",var(--sapFontFamily);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;box-sizing:border-box}[growing-button-text]{height:var(--_ui5_load_more_text_height);padding:.875rem 1rem 0 1rem;font-size:var(--_ui5_load_more_text_font_size);font-weight:700}[growing-button-subtext]{font-size:var(--sapFontSize);padding:var(--_ui5_load_more_desc_padding)}:host(:not([hidden])){display:inline-block;width:100%}.ui5-table-root{position:relative;border-bottom:1px solid var(--sapList_BorderColor)}table{width:100%;border-spacing:0;border-collapse:collapse}.ui5-table-header-row{color:var(--sapTextColor);height:3rem;font-family:\"72override\",var(--sapFontFamily);font-size:var(--sapFontSize)}.ui5-table-header-row:focus{outline:var(--ui5_table_header_row_outline_width) dotted var(--sapContent_FocusColor);outline-offset:-.125rem}tr{height:3rem}.ui5-table-no-data-row{display:flex;align-items:center;width:100%;height:auto;justify-content:center;text-align:center;padding:.5rem 1rem;font-family:\"72override\",var(--sapFontFamily);font-size:.875rem;box-sizing:border-box;color:var(--sapTextColor);min-height:3rem;background-color:var(--sapList_Background);border-top:1px solid var(--sapList_BorderColor)}.ui5-table-end-row{height:0}:host([busy]) .ui5-table-busy-row{position:absolute;left:0;right:0;bottom:0;top:0;outline:none}:host([busy]) .ui5-table-busy-ind{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:1}:host([busy]) [growing-button]{opacity:.72}.ui5-table-select-all-column{width:var(--ui5_table_multiselect_column_width);text-align:center}:host([sticky-column-header]) .ui5-table-select-all-column{position:sticky;top:0;z-index:99}th{background:var(--sapList_HeaderBackground)}"};

	return styles;

});
