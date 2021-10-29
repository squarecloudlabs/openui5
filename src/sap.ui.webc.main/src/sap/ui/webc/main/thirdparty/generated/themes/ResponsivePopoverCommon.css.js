sap.ui.define(['sap/ui/webc/common/thirdparty/base/asset-registries/Themes', 'sap/ui/webc/common/thirdparty/theming/generated/themes/sap_fiori_3/parameters-bundle.css', './sap_fiori_3/parameters-bundle.css'], function (Themes, defaultThemeBase, parametersBundle_css) { 'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

	var defaultThemeBase__default = /*#__PURE__*/_interopDefaultLegacy(defaultThemeBase);

	Themes.registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_fiori_3", () => defaultThemeBase__default);
	Themes.registerThemePropertiesLoader("@ui5/webcomponents", "sap_fiori_3", () => parametersBundle_css);
	var ResponsivePopoverCommonCss = {packageName:"@ui5/webcomponents",fileName:"themes/ResponsivePopoverCommon.css",content:".input-root-phone{flex:1;height:var(--_ui5_input_height);color:var(--sapField_TextColor);font-size:var(--sapFontSize);font-family:\"72override\",var(--sapFontFamily);background-color:var(--sapField_Background);border:1px solid var(--sapField_BorderColor);border-radius:var(--sapField_BorderCornerRadius);box-sizing:border-box}.input-root-phone [inner-input]{padding:0 .5rem;width:100%;height:100%}.input-root-phone[value-state]:not([value-state=None])[focused]{outline:var(--_ui5_input_focus_border_width) dotted var(--sapContent_FocusColor);outline-offset:-4px}.input-root-phone [value-state=Error] [input-icon][data-ui5-compact-size],.input-root-phone [value-state=Success] [input-icon][data-ui5-compact-size],.input-root-phone [value-state=Warning] [input-icon][data-ui5-compact-size]{padding:.1875rem .5rem}[inner-input]{background:transparent;color:inherit;border:none;font-style:normal;-webkit-appearance:none;-moz-appearance:textfield;line-height:normal;padding:var(--_ui5_input_inner_padding);box-sizing:border-box;min-width:3rem;text-overflow:ellipsis;flex:1;outline:none;font-size:inherit;font-family:inherit}[inner-input]::-moz-selection,[inner-input]::selection{background:var(--sapSelectedColor);color:var(--sapContent_ContrastTextColor)}[inner-input]::-webkit-input-placeholder{font-style:italic;color:var(--sapField_PlaceholderTextColor)}[inner-input]::-moz-placeholder{font-style:italic;color:var(--sapField_PlaceholderTextColor)}[inner-input]:-ms-input-placeholder{font-style:italic;color:var(--sapField_PlaceholderTextColor)}.input-root-phone[value-state]:not([value-state=None]){border-width:var(--_ui5_input_state_border_width)}.input-root-phone[value-state=Error] [inner-input],.input-root-phone[value-state=Warning] [inner-input]{font-style:var(--_ui5_input_error_warning_font_style)}.input-root-phone[value-state=Error] [inner-input]{font-weight:var(--_ui5_input_error_font_weight)}.input-root-phone[value-state=Error]:not([readonly]){background-color:var(--sapField_InvalidBackground);border-color:var(--sapField_InvalidColor)}.input-root-phone[value-state=Error]:not([readonly]):not([disabled]),.input-root-phone[value-state=Warning]:not([readonly]):not([disabled]){border-style:var(--_ui5_input_error_warning_border_style)}.input-root-phone[value-state=Warning]:not([readonly]){background-color:var(--sapField_WarningBackground);border-color:var(--sapField_WarningColor)}.input-root-phone[value-state=Success]:not([readonly]){background-color:var(--sapField_SuccessBackground);border-color:var(--sapField_SuccessColor)}[inner-input]::-ms-clear{height:0;width:0}.ui5-multi-combobox-toggle-button{margin-left:.5rem}.ui5-responsive-popover-header{width:100%;min-height:2.5rem;display:flex;flex-direction:column}.ui5-responsive-popover-header-text{width:calc(100% - var(--_ui5_button_base_min_width))}.ui5-responsive-popover-header .row{box-sizing:border-box;padding:.25rem 1rem;min-height:2.5rem;display:flex;justify-content:center;align-items:center;font-size:var(--sapFontHeader5Size)}.ui5-responsive-popover-footer{display:flex;justify-content:flex-end;padding:.25rem;width:100%}.ui5-responsive-popover-close-btn{position:absolute;right:1rem}"};

	return ResponsivePopoverCommonCss;

});
