/* global QUnit, sinon */

sap.ui.define([
	"sap/f/ShellBar",
	"sap/f/shellBar/Factory",
	"sap/f/shellBar/ResponsiveHandler",
	"sap/f/shellBar/AdditionalContentSupport",
	"sap/f/shellBar/ContentButton",
	"sap/f/shellBar/ControlSpacer",
	"sap/m/ToolbarSpacer",
	"sap/m/OverflowToolbarButton",
	"sap/ui/core/theming/Parameters",
	"sap/f/Avatar",
	"sap/m/Menu",
	"sap/ui/core/Core"
],
function (
	ShellBar,
	Factory,
	ResponsiveHandler,
	AdditionalContentSupport,
	ContentButton,
	ControlSpacer,
	ToolbarSpacer,
	OverflowToolbarButton,
	Parameters,
	Avatar,
	Menu,
	Core
) {
	"use strict";

	var DOM_RENDER_LOCATION = "qunit-fixture";

	QUnit.module("Init");

	QUnit.test("Proper initialization", function (assert) {
		// Arrange
		var oSB;

		// Act
		oSB = new ShellBar();

		// Factory
		assert.ok(oSB._oFactory instanceof Factory, "Factory is instance of correct class");

		// Overflow Toolbar
		assert.ok(oSB._oOverflowToolbar.isA("sap.m.OverflowToolbar"), "Overflow Toolbar initialized");
		assert.strictEqual(oSB.getAggregation("_overflowToolbar"), oSB._oOverflowToolbar,
			"OTB added to Aggregation");

		// Others
		assert.ok(oSB._bOTBUpdateNeeded, "Initial update requirement registered");
		assert.ok(oSB._oToolbarSpacer instanceof ToolbarSpacer, "Toolbar spacer initialized");
		assert.ok(oSB._oControlSpacer instanceof ControlSpacer, "Control spacer initialized");
		assert.ok(oSB._oResponsiveHandler instanceof ResponsiveHandler, "ResponsiveHandler initialized");
		assert.ok(Array.isArray(oSB._aOverflowControls), "Overflow controls collection initialized");

		// Cleanup
		oSB.destroy();
	});

	QUnit.module("API", {
		beforeEach: function () {
			this.oSB = new ShellBar();

		},
		afterEach: function () {
			this.oSB.destroy();
		},
		getPropertiesObject: function () {
			var aProperties = [],
				oProperties = this.oSB.getMetadata().getProperties();

			Object.keys(oProperties).forEach(function (sKey) {
				var oProperty = oProperties[sKey];
				aProperties.push({
					name: oProperty.name,
					type: oProperty.type,
					defaultValue: oProperty.defaultValue
				});
			});
			return aProperties;
		},
		getAggregationsObject: function () {
			var aAggregations = [],
				oAggregations = this.oSB.getMetadata().getAggregations();

			Object.keys(oAggregations).forEach(function (sKey) {
				var oAggregation = oAggregations[sKey],
					oForwarding;

				if (oAggregation.forwarding) {
					oForwarding = {
						aggregation: oAggregation.forwarding.aggregation,
						getter: oAggregation.forwarding.getter
					};
				}

				aAggregations.push({
					name: oAggregation.name,
					type: oAggregation.type,
					multiple: oAggregation.multiple,
					singularName: oAggregation.singularName,
					forwarding: oForwarding
				});
			});
			return aAggregations;
		},
		getEventsObject: function () {
			var aEvents = [],
				oEvents = this.oSB.getMetadata().getEvents();

			Object.keys(oEvents).forEach(function (sKey) {
				var oEvent = oEvents[sKey];
				aEvents.push({
					name: oEvent.name,
					parameters: oEvent.appData ? oEvent.appData.parameters : undefined
				});
			});
			return aEvents;
		}
	});

	QUnit.test("Properties", function (assert) {
		var oExpectedObject = [
			{name: "title", type: "string", defaultValue: ""},
			{name: "secondTitle", type: "string", defaultValue: ""},
			{name: "homeIcon", type: "sap.ui.core.URI", defaultValue: ""},
			{name: "showMenuButton", type: "boolean", defaultValue: false},
			{name: "showNavButton", type: "boolean", defaultValue: false},
			{name: "showCopilot", type: "boolean", defaultValue: false},
			{name: "showSearch", type: "boolean", defaultValue: false},
			{name: "showNotifications", type: "boolean", defaultValue: false},
			{name: "showProductSwitcher", type: "boolean", defaultValue: false}];

		assert.deepEqual(this.getPropertiesObject(), oExpectedObject, "All properties setup as expected");
	});

	QUnit.test("Aggregations", function (assert) {
		var oExpectedObject = [
			{
				name: "menu",
				type: "sap.m.Menu",
				multiple: false,
				singularName: undefined,
				forwarding: {
					aggregation: "menu",
					getter: "_getMenu"
				}},
			{
				name: "profile",
				type: "sap.f.Avatar",
				multiple: false,
				singularName: undefined,
				forwarding: {
					aggregation: "avatar",
					getter: "_getProfile"
				}},
			{
				name: "additionalContent",
				type: "sap.f.IShellBar",
				multiple: true,
				singularName: "additionalContent",
				forwarding: undefined
			}
		];

		assert.deepEqual(this.getAggregationsObject(), oExpectedObject, "All aggregations setup as expected");
	});

	QUnit.test("Events", function (assert) {
		var oExpectedObject = [
			{name: "homeIconPressed", parameters: {icon: {type: "sap.m.Image"}}},
			{name: "menuButtonPressed", parameters: {button: {type: "sap.m.Button"}}},
			{name: "navButtonPressed", parameters: {button: {type: "sap.m.Button"}}},
			{name: "copilotPressed", parameters: {image: {type: "sap.m.Image"}}},
			{name: "searchButtonPressed", parameters: {button: {type: "sap.m.Button"}}},
			{name: "notificationsPressed", parameters: {button: {type: "sap.m.Button"}}},
			{name: "productSwitcherPressed", parameters: {button: {type: "sap.m.Button"}}},
			{name: "avatarPressed", parameters: {avatar: {type: "sap.f.Avatar"}}}
		];

		assert.deepEqual(this.getEventsObject(), oExpectedObject, "All events setup as expected");
	});

	QUnit.test("Setters no value", function (assert) {
		// Assert
		[
			this.oSB._oHomeIcon,
			this.oSB._oMegaMenu,
			this.oSB._oSecondTitle,
			this.oSB._oCopilot,
			this.oSB._oSearch,
			this.oSB._oNotifications,
			this.oSB._oProductSwitcher,
			this.oSB._oNavButton,
			this.oSB._oMenuButton
		].forEach(function (oInternalObject) {
			assert.strictEqual(typeof oInternalObject, "undefined", "Internal object is undefined");
		});

		// Act - call setters with falsy value
		this.oSB.setHomeIcon("");
		this.oSB.setTitle("");
		this.oSB.setSecondTitle("");
		this.oSB.setShowCopilot(false);
		this.oSB.setShowSearch(false);
		this.oSB.setShowNotifications(false);
		this.oSB.setShowProductSwitcher(false);
		this.oSB.setShowNavButton(false);
		this.oSB.setShowMenuButton(false);

		// Assert
		[
			this.oSB._oHomeIcon,
			this.oSB._oMegaMenu,
			this.oSB._oSecondTitle,
			this.oSB._oCopilot,
			this.oSB._oSearch,
			this.oSB._oNotifications,
			this.oSB._oProductSwitcher,
			this.oSB._oNavButton,
			this.oSB._oMenuButton
		].forEach(function (oInternalObject) {
			assert.ok(oInternalObject === null, "Internal object is equal to 'null'");
		});
	});

	QUnit.module("Rendering", {
		beforeEach: function () {
			this.oSB = new ShellBar();
		},
		afterEach: function () {
			this.oSB.destroy();
		}
	});

	QUnit.test("Defaults", function (assert) {
		// Act
		this.oSB.placeAt(DOM_RENDER_LOCATION);
		Core.applyChanges();

		// Assert
		assert.ok(this.oSB.getDomRef(), "Control is rendered");
		assert.ok(this.oSB.getDomRef().classList.contains("sapFShellBar"), "Main control class is applied");
	});

	QUnit.module("Lifecycle handlers", {
		beforeEach: function () {
			this.oSB = new ShellBar();
		},
		afterEach: function () {
			this.oSB.destroy();
		}
	});

	QUnit.test("onBeforeRendering", function (assert) {
		// Arrange
		var oAssignControlsToOverflowToolbarSpy = sinon.spy(this.oSB, "_assignControlsToOverflowToolbar");

		// Act
		this.oSB.onBeforeRendering();

		// Assert
		assert.strictEqual(oAssignControlsToOverflowToolbarSpy.callCount, 1, "Assign method called once");

		// Cleanup
		oAssignControlsToOverflowToolbarSpy.restore();
	});

	QUnit.test("exit", function (assert) {
		// Arrange
		var oResponsiveHandlerSpy = sinon.spy(this.oSB._oResponsiveHandler, "exit"),
			oFactorySpy = sinon.spy(this.oSB._oFactory, "destroy");

		// Act
		this.oSB.destroy();

		// Assert
		assert.strictEqual(oResponsiveHandlerSpy.callCount, 1, "Exit method called once");
		assert.strictEqual(oFactorySpy.callCount, 1, "Cleanup method called once");

		// Cleanup
		oResponsiveHandlerSpy.restore();
		oFactorySpy.restore();
	});

	QUnit.module("Utility methods", {
		beforeEach: function () {
			this.oSB = new ShellBar();
		},
		afterEach: function () {
			this.oSB.destroy();
		}
	});

	QUnit.test("_getProfile", function (assert) {
		// Arrange
		var oFactoryGetterSpy = sinon.spy(this.oSB._oFactory, "getAvatarButton");

		// Act
		var oProfile = this.oSB._getProfile();

		// Assert
		assert.strictEqual(oFactoryGetterSpy.callCount, 1, "Factory getter called once");
		assert.ok(oProfile.isA("sap.f.shallBar.ContentButton"), "Method returned correct object");

		// Cleanup
		oFactoryGetterSpy.restore();
	});

	QUnit.test("_getMenu", function (assert) {
		// Arrange
		var oFactoryGetterSpy = sinon.spy(this.oSB._oFactory, "getMegaMenu");

		// Act
		var oMenuButton = this.oSB._getMenu();

		// Assert
		assert.strictEqual(oFactoryGetterSpy.callCount, 1, "Factory getter called once");
		assert.ok(oMenuButton.isA("sap.m.MenuButton"), "Method returned correct object");

		// Cleanup
		oFactoryGetterSpy.restore();
	});

	QUnit.test("_getOverflowToolbar", function (assert) {
		// Act
		var oOTB = this.oSB._getOverflowToolbar();

		// Assert
		assert.ok(oOTB.isA("sap.m.OverflowToolbar"), "Method returned correct object");
	});

	QUnit.test("_assignControlsToOverflowToolbar - robustness and optimization", function (assert) {
		// Arrange
		this.oSB._bOTBUpdateNeeded = false;
		this.oSB._aOverflowControls = undefined;

		// Act
		this.oSB._assignControlsToOverflowToolbar();

		// Assert
		assert.strictEqual(this.oSB._aOverflowControls, undefined, "Internal array remains undefined");

		// Arrange
		this.oSB._bOTBUpdateNeeded = true;
		this.oSB._oOverflowToolbar = undefined;

		// Act
		this.oSB._assignControlsToOverflowToolbar();

		// Assert
		assert.strictEqual(this.oSB._aOverflowControls, undefined, "Internal array remains undefined");
	});

	QUnit.test("_assignControlsToOverflowToolbar - empty ShellBar", function (assert) {
		// Arrange
		var oOTB = this.oSB._oOverflowToolbar;

		// Act
		this.oSB._bOTBUpdateNeeded = true;
		this.oSB._assignControlsToOverflowToolbar();

		// Assert
		assert.strictEqual(oOTB.getContent().length, 2, "Only 2 spacers added to OverflowToolbar");
		assert.ok(Array.isArray(this.oSB._aOverflowControls), "Property '_aOverflowControls' of type array is created");
		assert.strictEqual(this.oSB._aOverflowControls.length, 0, "Array '_aOverflowControls' is empty");
		assert.strictEqual(this.oSB._bOTBUpdateNeeded, false,
			"Property '_bOTBUpdateNeeded' set to false after method called");
	});

	QUnit.test("_assignControlsToOverflowToolbar - Full ShellBar", function (assert) {
		// Arrange
		var oOTB = this.oSB._oOverflowToolbar,
			oAdditionalButton1 = new OverflowToolbarButton(),
			oAdditionalButton2 = new OverflowToolbarButton(),
			aContent;

		this.oSB.setShowNavButton(true);
		this.oSB.setShowMenuButton(true);
		this.oSB.setHomeIcon(sap.ui.require.toUrl("sap/ui/documentation/sdk/images/logo_sap.png"));
		this.oSB.setTitle("Test title");
		this.oSB.setSecondTitle("Test second title");
		this.oSB.setShowCopilot(true);
		this.oSB.setShowSearch(true);
		this.oSB.setShowNotifications(true);
		this.oSB.setShowProductSwitcher(true);
		this.oSB.setProfile(new Avatar());
		this.oSB.setMenu(new Menu());
		this.oSB.addAdditionalContent(oAdditionalButton1);
		this.oSB.addAdditionalContent(oAdditionalButton2);

		// Act
		this.oSB._bOTBUpdateNeeded = true;
		this.oSB._assignControlsToOverflowToolbar();

		// Arrange
		aContent = oOTB.getContent();

		// Assert
		assert.strictEqual(aContent.length, 14, "Expected number of controls added to OverflowToolbar");

		// Assert - Order of controls in aggregation
		assert.ok(aContent[0] === this.oSB._oNavButton, "Control at index 0 is NavButton");
		assert.ok(aContent[1] === this.oSB._oMenuButton, "Control at index 1 is MenuButton");
		assert.ok(aContent[2] === this.oSB._oHomeIcon, "Control at index 2 is HomeIcon");
		assert.ok(aContent[3] === this.oSB._oMegaMenu, "Control at index 3 is MegaMenu");
		assert.ok(aContent[4] === this.oSB._oSecondTitle, "Control at index 4 is SecondTitle");
		assert.ok(aContent[5] === this.oSB._oControlSpacer, "Control at index 5 is ControlSpacer");
		assert.ok(aContent[6] === this.oSB._oCopilot, "Control at index 6 is CoPilot");
		assert.ok(aContent[7] === this.oSB._oToolbarSpacer, "Control at index 7 is ToolbarSpcer");
		assert.ok(aContent[8] === this.oSB._oSearch, "Control at index 8 is Search");
		assert.ok(aContent[9] === this.oSB._oNotifications, "Control at index 9 is Notifications");
		assert.ok(aContent[10] === oAdditionalButton1, "Control at index 10 is AdditionalButton 1");
		assert.ok(aContent[11] === oAdditionalButton2, "Control at index 11 is AdditionalButton 2");
		assert.ok(aContent[12] === this.oSB._oAvatarButton, "Control at index 12 is AvatarButton");
		assert.ok(aContent[13] === this.oSB._oProductSwitcher, "Control at index 13 is ProductSwitcher");

		// Assert - _aOverflowControls
		assert.strictEqual(this.oSB._aOverflowControls.length, 5, "Array '_aOverflowControls' has 5 controls in it");
		assert.ok(this.oSB._aOverflowControls[0] === this.oSB._oSearch, "Control at index 0 is Search");
		assert.ok(this.oSB._aOverflowControls[1] === this.oSB._oNotifications, "Control at index 1 is Notifications");
		assert.ok(this.oSB._aOverflowControls[2] === oAdditionalButton1, "Control at index 2 is AdditionalButton 1");
		assert.ok(this.oSB._aOverflowControls[3] === oAdditionalButton2, "Control at index 3 is AdditionalButton 2");
		assert.ok(this.oSB._aOverflowControls[4] === this.oSB._oProductSwitcher, "Control at index 4 is ProductSwitcher");
	});

	// Accessibility related tests
	QUnit.module("Accessibility", {
		beforeEach: function () {
			this.oSB = new ShellBar({
				title: "Application title",
				secondTitle: "Short description",
				homeIcon: "./resources/sap/ui/documentation/sdk/images/logo_ui5.png",
				showNavButton: true,
				showCopilot: true,
				showSearch: true,
				showNotifications: true,
				showProductSwitcher: true,
				showMenuButton: true
			});
			this.oSB.setAggregation("profile", new Avatar({initials: "UI"}));
			this.oRb = Core.getLibraryResourceBundle("sap.f");
			this.oSB.placeAt(DOM_RENDER_LOCATION);
			Core.applyChanges();
		},
		afterEach: function () {
			this.oSB.destroy();
			this.oRb = null;
		}
	});

	QUnit.test("Mega menu attributes", function (assert) {
		var $oMegaMenu = this.oSB._oMegaMenu._getButtonControl().$();

		// Assert
		assert.strictEqual($oMegaMenu.attr("role"), "heading", "Mega menu role is correct");
		assert.strictEqual($oMegaMenu.attr("aria-level"), "1", "Mega menu aria-level is correct");
	});

	QUnit.test("Second title attributes", function (assert) {
		var $oSecondTitle = this.oSB._oSecondTitle.$();

		// Assert
		assert.strictEqual($oSecondTitle.attr("role"), "heading", "Second title role is correct");
		assert.strictEqual($oSecondTitle.attr("aria-level"), "2", "Second title aria-level is correct");
	});

	QUnit.test("Home icon tooltip", function (assert) {
		var oHomeIcon = this.oSB._oHomeIcon,
			sTooltip = this.oRb.getText("SHELLBAR_LOGO_TOOLTIP");

		// Assert
		assert.strictEqual(oHomeIcon.getTooltip(), sTooltip, "Home icon tooltip is correct");
	});

	QUnit.test("CoPilot attributes", function (assert) {
		var oCopilot = this.oSB._oCopilot,
			sTooltip = this.oRb.getText("SHELLBAR_COPILOT_TOOLTIP");

		// Assert
		assert.strictEqual(oCopilot.$().attr("role"), "button", "CoPilot role is correct");
		assert.strictEqual(oCopilot.$().attr("aria-label"), sTooltip, "CoPilot aria-label is correct");
		assert.strictEqual(oCopilot.getTooltip(), sTooltip, "CoPilot tooltip is correct");
	});

	QUnit.test("Search attributes", function (assert) {
		var oSearch = this.oSB._oSearch,
			sTooltip = this.oRb.getText("SHELLBAR_SEARCH_TOOLTIP");

		// Assert
		assert.strictEqual(oSearch.$().attr("aria-label"), sTooltip, "Search aria-label is correct");
		assert.strictEqual(oSearch.getTooltip(), sTooltip, "Search tooltip is correct");
	});

	QUnit.test("Nav button attributes", function (assert) {
		var oNavButton = this.oSB._oNavButton,
			sTooltip = this.oRb.getText("SHELLBAR_BACK_TOOLTIP");

		// Assert
		assert.strictEqual(oNavButton.$().attr("aria-label"), sTooltip, "Nav button aria-label is correct");
		assert.strictEqual(oNavButton.getTooltip(), sTooltip, "Nav button tooltip is correct");
	});

	QUnit.test("Menu button attributes", function (assert) {
		var oMenuButton = this.oSB._oMenuButton,
			$oMenuButton = oMenuButton.$(),
			sTooltip = this.oRb.getText("SHELLBAR_MENU_TOOLTIP");

		// Assert
		assert.strictEqual($oMenuButton.attr("aria-haspopup"), "menu", "Menu button aria-haspopup is correct");
		assert.strictEqual($oMenuButton.attr("aria-label"), sTooltip, "Menu button aria-label is correct");
		assert.strictEqual(oMenuButton.getTooltip(), sTooltip, "Menu button tooltip is correct");
	});

	QUnit.test("Notifications attributes", function (assert) {
		var oNotifications = this.oSB._oNotifications,
			$oNotifications = oNotifications.$(),
			sTooltip = this.oRb.getText("SHELLBAR_NOTIFICATIONS_TOOLTIP");

		// Assert
		assert.strictEqual($oNotifications.attr("aria-haspopup"), "dialog", "Notifications aria-haspopup is correct");
		assert.strictEqual($oNotifications.attr("aria-label"), sTooltip, "Notifications aria-label is correct");
		assert.strictEqual(oNotifications.getTooltip(), sTooltip, "Notifications tooltip is correct");
	});

	QUnit.test("Products attributes", function (assert) {
		var oProducts = this.oSB._oProductSwitcher,
			$oProducts = oProducts.$(),
			sTooltip = this.oRb.getText("SHELLBAR_PRODUCTS_TOOLTIP");

		// Assert
		assert.strictEqual($oProducts.attr("aria-haspopup"), "menu", "Products aria-haspopup is correct");
		assert.strictEqual($oProducts.attr("aria-label"), sTooltip, "Products aria-label is correct");
		assert.strictEqual(oProducts.getTooltip(), sTooltip, "Products tooltip is correct");
	});

	QUnit.test("Avatar attributes", function (assert) {
		var oAvatar = this.oSB._oAvatarButton,
			$oAvatar = oAvatar.$(),
			sTooltip = this.oRb.getText("SHELLBAR_PROFILE_TOOLTIP");

		// Assert
		assert.strictEqual($oAvatar.attr("aria-haspopup"), "menu", "Avatar aria-haspopup is correct");
		assert.strictEqual($oAvatar.attr("aria-label"), sTooltip, "Avatar aria-label is correct");
		assert.strictEqual(oAvatar.getTooltip(), sTooltip, "Avatar tooltip is correct");
	});

});
