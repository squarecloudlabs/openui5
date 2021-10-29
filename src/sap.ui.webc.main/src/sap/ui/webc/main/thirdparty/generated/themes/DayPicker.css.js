sap.ui.define(['sap/ui/webc/common/thirdparty/base/asset-registries/Themes', 'sap/ui/webc/common/thirdparty/theming/generated/themes/sap_fiori_3/parameters-bundle.css', './sap_fiori_3/parameters-bundle.css'], function (Themes, defaultThemeBase, parametersBundle_css) { 'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

	var defaultThemeBase__default = /*#__PURE__*/_interopDefaultLegacy(defaultThemeBase);

	Themes.registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_fiori_3", () => defaultThemeBase__default);
	Themes.registerThemePropertiesLoader("@ui5/webcomponents", "sap_fiori_3", () => parametersBundle_css);
	var dayPickerCSS = {packageName:"@ui5/webcomponents",fileName:"themes/DayPicker.css",content:":host(:not([hidden])){display:block}:host{height:100%;width:100%}:host([hide-week-numbers]) .ui5-dp-content{flex-basis:100%}:host([secondary-calendar-type]) .ui5-dp-item{flex-direction:column;justify-content:space-between}:host([secondary-calendar-type]) .ui5-dp-daytext{height:1.575rem;padding:.575rem 0 0 0}:host([secondary-calendar-type]) .ui5-dp-daysectext{font-size:.625rem;height:1rem;padding:0 .375rem .375rem 50%}.ui5-dp-dayname,.ui5-dp-item,.ui5-dp-weekname{width:var(--_ui5_day_picker_item_width);height:var(--_ui5_day_picker_item_height);margin-top:var(--_ui5_daypicker_item_margin);margin-right:var(--_ui5_daypicker_item_margin);font-family:\"72override\",var(--sapFontFamily);border-radius:var(--_ui5_daypicker_item_border_radius)}.ui5-dp-weekname{color:var(--_ui5_daypicker_weekname_color)}.ui5-dp-weeks-row{display:flex}.ui5-dp-content{display:flex;flex-basis:87.5%;flex-direction:column;font-family:\"72override\",var(--sapFontFamily)}.ui5-dp-days-names-container{display:flex;height:var(--_ui5_daypicker_daynames_container_height)}.ui5-dp-weeknumber-container{padding-top:var(--_ui5_daypicker_weeknumbers_container_padding_top);flex-basis:12.5%}.ui5-dp-dayname,.ui5-dp-item,.ui5-dp-weekname,.ui5-dp-weekname-container{display:flex;flex-grow:1;justify-content:center;align-items:center;font-size:var(--sapFontSmallSize);outline:none;box-sizing:border-box;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.ui5-dp-item{position:relative;color:var(--sapTextColor);background:var(--sapLegend_WorkingBackground);font-size:var(--sapFontSize);border:var(--_ui5_daypicker_item_border)}.ui5-dp-item:hover{background:var(--sapList_Hover_Background)}.ui5-dp-daytext{display:flex;width:100%;height:100%;justify-content:center;align-items:center;box-sizing:border-box}.ui5-dp-dayname{color:var(--_ui5_daypicker_dayname_color);height:100%}.ui5-dp-item.ui5-dp-item--weeekend{background:var(--sapLegend_NonWorkingBackground)}.ui5-dp-item.ui5-dp-item--disabled{pointer-events:none;opacity:.5}.ui5-dp-item.ui5-dp-item--weeekend:hover{background:var(--sapList_Hover_Background)}.ui5-dp-item.ui5-dp-item--othermonth{color:var(--_ui5_daypicker_item_othermonth_color);background:var(--_ui5_daypicker_item_othermonth_background_color);border-color:transparent}.ui5-dp-item.ui5-dp-item--othermonth:hover,.ui5-dp-item.ui5-dp-item--weeekend.ui5-dp-item--othermonth:hover{color:var(--_ui5_daypicker_item_othermonth_hover_color);background:var(--sapList_Hover_Background)}.ui5-dp-item:focus:after{content:\"\";width:calc(100% - .25rem);height:calc(100% - .25rem);border:var(--_ui5_daypicker_item_outline_width) dotted var(--sapContent_FocusColor);position:absolute;top:var(--_ui5_daypicker_item_outline_offset);left:var(--_ui5_daypicker_item_outline_offset)}.ui5-dp-item.ui5-dp-item--now{border:.125rem solid var(--sapLegend_CurrentDateTime);padding:.0625rem;box-shadow:inset 0 0 0 .0625rem var(--_ui5_daypicker_item_selected_border_color)}:host([secondary-calendar-type]) .ui5-dp-item.ui5-dp-item--now .ui5-dp-daytext{height:1.387rem;padding-top:.387rem}:host([secondary-calendar-type]) .ui5-dp-item.ui5-dp-item--now .ui5-dp-daysectext{height:.812rem;padding-top:0;padding-bottom:.187rem}.ui5-dp-item.ui5-dp-item--selected{background:var(--sapContent_Selected_Background)}.ui5-dp-item.ui5-dp-item--selected .ui5-dp-daytext{background:var(--sapContent_Selected_Background);color:var(--sapContent_Selected_TextColor)}.ui5-dp-item.ui5-dp-item--selected:hover .ui5-dp-daytext{background:var(--sapContent_Selected_Hover_Background);color:var(--sapContent_Selected_TextColor)}.ui5-dp-item.ui5-dp-item--now:focus:after{width:var(--_ui5_daypicker_item_now_focus_after_width);height:var(--_ui5_daypicker_item_now_focus_after_height);top:var(--_ui5_daypicker_item_now_outline_offset);left:var(--_ui5_daypicker_item_now_outline_offset)}.ui5-dp-item.ui5-dp-item--selected.ui5-dp-item--now:focus:after{width:var(--_ui5_daypicker_item_now_selected_focus_after_width);height:var(--_ui5_daypicker_item_now_selected_focus_after_height);border-color:var(--sapContent_ContrastFocusColor);top:var(--_ui5_daypicker_item_now_selected_outline_offset);left:var(--_ui5_daypicker_item_now_selected_outline_offset)}.ui5-dp-item.ui5-dp-item--selected:hover{background:var(--sapContent_Selected_Hover_Background);color:var(--sapContent_ContrastTextColor)}.ui5-dp-item.ui5-dp-item--selected:focus:after{border-color:var(--sapContent_ContrastFocusColor)}.ui5-dp-items-container{outline:none}.ui5-dp-item.ui5-dp-item--selected-between .ui5-dp-daytext,.ui5-dp-item[hovered] .ui5-dp-daytext{background-color:var(--sapList_SelectionBackgroundColor);color:var(--sapTextColor)}.ui5-dp-item.ui5-dp-item--selected-between,.ui5-dp-item[hovered]{border:1px solid var(--sapContent_Selected_Background);border-radius:5%}.ui5-dp-item.ui5-dp-item--selected.ui5-dp-item--selected-between:focus:after{border-color:var(--sapContent_FocusColor)}.ui5-dp-items-container>:first-child{justify-content:flex-end}.ui5-dp-emptyweek{height:var(--_ui5_day_picker_empty_height)}"};

	return dayPickerCSS;

});
