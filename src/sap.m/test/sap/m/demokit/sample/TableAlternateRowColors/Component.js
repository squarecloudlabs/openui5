sap.ui.define(['sap/ui/core/UIComponent','sap/ui/core/mvc/XMLView'],
	function(UIComponent, XMLView) {
	"use strict";

	var Component = UIComponent.extend("sap.m.sample.TableAlternateRowColors.Component", {

		metadata : {
		    publicMethods : [
				"getTable"
			],

			manifest: "json"
		},

		getTable : function () {
			return this._rootView.getContent()[0];
		}
	});

	Component.prototype.createContent = function () {
		this._rootView = sap.ui.xmlview({ viewName : "sap.m.sample.TableAlternateRowColors.Table" });
		return this._rootView;
	};

	return Component;

});
