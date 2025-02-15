/*global QUnit */
sap.ui.define([
	"sap/ui/core/Lib",
	"sap/ui/thirdparty/jquery",
	"sap/ui/events/KeyCodes",
	"sap/ui/core/Core",
	"sap/ui/qunit/QUnitUtils",
	"sap/m/Link",
	"sap/m/Text",
	"sap/uxap/BreadCrumbs",
	"sap/ui/core/Icon",
	"sap/ui/core/Item",
	"sap/m/Select",
	"sap/ui/Device"
],
function(Library, $, KeyCodes, Core, QUtils, Link, Text, BreadCrumbs, Icon, Item, Select, Device) {
	"use strict";

	var	oFactory = {
			getLink: function (sText, sHref) {
				return new Link({
					text: sText || "Page 1 long link",
					href: sHref || "http://go.sap.com/index.html"
				});
			},
			getText: function (sText) {
				return new Text({
					text: sText || "Current Location Text"
				});
			},
			getLinks: function (iCount) {
				var aLinks = [];

				for (var i = 0; i < iCount; i++) {
					aLinks.push(this.getLink());
				}

				return aLinks;
			},
			getBreadCrumbControlWithLinks: function (iLinkCount) {
				return new BreadCrumbs({
					links: [this.getLinks(iLinkCount)],
					currentLocation: oFactory.getText()
				});
			},
			getResourceBundle: function () {
				return Library.getResourceBundleFor("sap.uxap");
			}
		},
		helpers = {
			verifyFocusOnKeyDown: function (assert, iKeyCode, oItemToStartWith, oSpy, sMessage) {
				oItemToStartWith.$().trigger("focus");
				QUtils.triggerKeydown(oItemToStartWith.getId(), iKeyCode);
				assert.ok(oSpy.calledOnce, sMessage);
			},
			renderObject: function (oSapUiObject) {
				oSapUiObject.placeAt("qunit-fixture");
				Core.applyChanges();
				return oSapUiObject;
			},
			checkType: function (assert, fnConstructor, oObjectToCheck, sMessage) {
				assert.strictEqual(oObjectToCheck instanceof fnConstructor, true, sMessage);
			},
			objectIsInTheDom: function (sSelector) {
				var $object = $(sSelector);
				return $object.length > 0;
			},
			_stubBreadcrumbsAsJQueryObject: function (iReturnHeight, oBreadcrumbsControl) {
				oBreadcrumbsControl._getBreadcrumbsAsJQueryObject = function () {
					return {
						css: function (property, value) {
							oBreadcrumbsControl[property] = value;
						},
						removeClass: function () {
						},
						addClass: function () {
						},
						outerHeight: function () {
							return iReturnHeight || 20;
						}
					};
				};
			}
		};

	QUnit.module("BreadCrumbs - API", {
		beforeEach: function () {
			this.oStandardBreadCrumbsControl = oFactory.getBreadCrumbControlWithLinks(4);
		},
		afterEach: function () {
			this.oStandardBreadCrumbsControl.destroy();
		}
	});

	QUnit.test("Instantiation", function (assert) {
		var oStandardBreadCrumbsControl = this.oStandardBreadCrumbsControl,
			iLinksCount = oStandardBreadCrumbsControl.getLinks().length;

		assert.ok(oStandardBreadCrumbsControl, "is instantiated correctly");
		assert.strictEqual(oStandardBreadCrumbsControl.getLinks().length, iLinksCount, "has " + iLinksCount + " links");
	});

	QUnit.test("Changing the control dynamically", function (assert) {
		var oStandardBreadCrumbsControl = this.oStandardBreadCrumbsControl,
			iLinksCount = oStandardBreadCrumbsControl.getLinks().length;

		oStandardBreadCrumbsControl.addLink(oFactory.getLink());
		assert.strictEqual(oStandardBreadCrumbsControl.getLinks().length, iLinksCount + 1,
			"the link is correctly added to the control");

		oStandardBreadCrumbsControl.removeLink(1);
		assert.strictEqual(oStandardBreadCrumbsControl.getLinks().length, iLinksCount,
			"the link is correctly removed from the control");

		assert.throws(function () {
			oStandardBreadCrumbsControl.addLink(oFactory.getText());
		}, "an exception is thrown when trying to add an incorrect type to the links aggregation");

		assert.throws(function () {
			oStandardBreadCrumbsControl.setCurrentLocation(oFactory.getLink());
		}, "an exception is thrown when trying to set an incorrect type to currentLocation");
	});

	QUnit.module("BreadCrumbs - Internals", {
		beforeEach: function () {
			this.oStandardBreadCrumbsControl = oFactory.getBreadCrumbControlWithLinks(4);
			this.sResultMessage = "an object is returned from the function";
		},
		afterEach: function () {
			this.oStandardBreadCrumbsControl.destroy();
		}
	});

	QUnit.test("Creating the internal icon for link separation", function (assert) {
		var oBreadCrumbControl = this.oStandardBreadCrumbsControl,
			oTubeIcon = oBreadCrumbControl._getTubeIcon();

		assert.ok(oTubeIcon, "an object is returned from the function");
		helpers.checkType(assert, Icon, oTubeIcon, "the tube separator is an Icon");
		assert.strictEqual(oTubeIcon.getSrc(), "sap-icon://slim-arrow-right", "a correct icon is used");
		assert.strictEqual(oTubeIcon.getColor(), "#bfbfbf", "the correct color is selected");
		assert.strictEqual(oTubeIcon.getSize(), "1rem", "the correct size of 1rem is used");
	});

	QUnit.test("Creating the internal select for the overflown version of the control", function (assert) {
		var oBreadCrumbControl = this.oStandardBreadCrumbsControl,
			oOverflowSelect = oBreadCrumbControl._getOverflowSelect();

		assert.ok(oOverflowSelect, this.sResultMessage);
		helpers.checkType(assert, Select, oOverflowSelect, "the OverflownSelect is an sap.m.Select");
		assert.strictEqual(oOverflowSelect.getItems().length, oBreadCrumbControl.getLinks().length + 1,
			"the select has all of the items from the normal version of the control");

		var oLink = oFactory.getLink(),
			oText = oFactory.getText(),
			oSelectItem = oBreadCrumbControl._createSelectItem(oLink),
			oCurrentlySelectedItem = oBreadCrumbControl._createSelectItem(oText);

		assert.ok(oSelectItem, this.sResultMessage);
		helpers.checkType(assert, Item, oSelectItem, "the selectItem is an sap.ui.core.Item");

		assert.ok(oCurrentlySelectedItem, this.sResultMessage);
		helpers.checkType(assert, Item, oCurrentlySelectedItem,
			"the oCurrentlySelectedItem is an sap.ui.core.Item");
	});

	QUnit.test("Mode state selection", function (assert) {
		var oBreadCrumbControl = this.oStandardBreadCrumbsControl;

		helpers._stubBreadcrumbsAsJQueryObject(60, oBreadCrumbControl);

		assert.strictEqual(oBreadCrumbControl._shouldOverflow(), true,
			"when there's not enough space the control should go into overflow select mode");

		helpers._stubBreadcrumbsAsJQueryObject(20, oBreadCrumbControl);

		assert.strictEqual(oBreadCrumbControl._shouldOverflow(), false,
			"given enough space the control should not go into overflow select mode");

		assert.ok(!oBreadCrumbControl.visibility,
			"after' _shouldOverflow' is called the visibility of the control should be restored");
	});

	QUnit.test("On phone always show overflowSelect", function (assert) {
		var oBreadCrumbControl = this.oStandardBreadCrumbsControl;
		Device.system.phone = true;
		oBreadCrumbControl.onBeforeRendering();
		oBreadCrumbControl._handleInitialModeSelection();
		assert.ok(oBreadCrumbControl._getUsingOverflowSelect());
	});

	QUnit.module("BreadCrumbs - Rendering", {
		beforeEach: function () {
			Device.system.phone = false;
			this.oBreadCrumbs = oFactory.getBreadCrumbControlWithLinks(2);
			helpers.renderObject(this.oBreadCrumbs);
			this.$breadCrumbs = this.oBreadCrumbs.$();
		},
		afterEach: function () {
			this.oBreadCrumbs.destroy();
		},
		baseCaseTests: function (assert) {
			assert.ok(helpers.objectIsInTheDom("#" + this.oBreadCrumbs.getId()),
				"the breadcrumb control is in the DOM");
			assert.ok(this.$breadCrumbs.hasClass("sapUxAPBreadCrumbs"),
				"the breadcrumb control has the correct CSS class");
		}
	});

	QUnit.test("The control is rendered in standard mode", function (assert) {
		this.baseCaseTests(assert);
	});

	QUnit.test("The control is rendered in overflow mode", function (assert) {
		this.baseCaseTests(assert);
		this.oBreadCrumbs._bUseOverflowSelect = true;
		this.oBreadCrumbs.rerender();

		var $breadCrumbs = this.oBreadCrumbs.$(),
			$overflowDots = $breadCrumbs.find("span.sapUxAPBreadCrumbsDots"),
			$overflowSelect = $breadCrumbs.find(".sapMSlt");

		assert.ok($overflowDots.length, "the overflow dots are rendered");
		assert.ok($overflowSelect.length, "the overflowSelect is rendered ");
	});

	QUnit.test("Changing the state of visibility of the breadcrumb", function (assert) {
		var oBreadCrumbControl = this.oBreadCrumbs,
			$BreadCrumbControl = oBreadCrumbControl.$(),
			$breadcrumbs = oBreadCrumbControl._getBreadcrumbsAsJQueryObject();

		oBreadCrumbControl._setBreadcrumbsVisible(true);

		assert.ok(!$breadcrumbs.hasClass("sapUiHidden"));
		assert.ok(!$BreadCrumbControl.hasClass("sapUxAPFullWidth"));

		oBreadCrumbControl._setBreadcrumbsVisible(false);

		assert.ok($breadcrumbs.hasClass("sapUiHidden"));
		assert.ok($BreadCrumbControl.hasClass("sapUxAPFullWidth"));
	});

	QUnit.test("Changing the state of visibility of the select", function (assert) {
		var oBreadCrumbControl = this.oBreadCrumbs,
			$select = oBreadCrumbControl._getOverflowSelectAsJQueryObject();

		oBreadCrumbControl._setSelectVisible(false);

		assert.ok($select.hasClass("sapUiHidden"));

		oBreadCrumbControl._setSelectVisible(true);

		assert.ok(!$select.hasClass("sapUiHidden"));
	});

	QUnit.module("BreadCrumbs - Accessibility", {
		beforeEach: function () {
			Device.system.phone = false;
			this.oBreadCrumbs = oFactory.getBreadCrumbControlWithLinks(10);
			helpers.renderObject(this.oBreadCrumbs);
			this.$breadCrumbs = this.oBreadCrumbs.$();
		},
		afterEach: function () {
			this.oBreadCrumbs.destroy();
		},
		baseCaseTests: function (assert) {
			assert.ok(helpers.objectIsInTheDom("#" + this.oBreadCrumbs.getId()), "the breadcrumb control is in the DOM");
			assert.ok(this.$breadCrumbs.hasClass("sapUxAPBreadCrumbs"),
				"the breadcrumb control has the correct CSS class");
		}
	});

	QUnit.test("Screen reader support", function (assert) {
		assert.strictEqual(this.$breadCrumbs.attr("role"), "navigation",
			"BreadCrumbs have appropriate ARIA role set");
	});

	QUnit.test("BreadCrumbs receives correct AriaLabelledBy", function (assert) {
		var oBreadCrumbControl = this.oBreadCrumbs,
			oHiddenLabel = oBreadCrumbControl._getAriaLabelledBy(),
			sLabelText = oFactory.getResourceBundle().getText("BREADCRUMB_TRAIL_LABEL");

		assert.strictEqual(oHiddenLabel.getText(), sLabelText,
			"The AriaLabelledBy element is set a hidden label is created with the correct text");

		assert.strictEqual(this.$breadCrumbs.attr("aria-labelledby"), oHiddenLabel.getId(),
			"The 'aria-labelledby' attribute is correctly set to the control");
	});

	QUnit.test("PAGE DOWN/PAGE UP keyboard handling", function (assert) {
		var oBreadCrumbControl = this.oBreadCrumbs,
			oItemsToNavigate = oBreadCrumbControl._getItemsToNavigate(),
			iTotalItemCount = oItemsToNavigate.length,
			oFirstItemSpy = this.spy(oItemsToNavigate[0], "focus"),
			oFifthItemSpy = this.spy(oItemsToNavigate[5], "focus"),
			oLastItemSpy = this.spy(oItemsToNavigate[10], "focus");

		oBreadCrumbControl._toggleOverflowMode(false);

		helpers.verifyFocusOnKeyDown(assert, KeyCodes.PAGE_DOWN, oItemsToNavigate[0],
			oFifthItemSpy, "5th item down should be focused after PAGE DOWN");

		oFifthItemSpy.restore();

		helpers.verifyFocusOnKeyDown(assert, KeyCodes.PAGE_UP, oItemsToNavigate[10],
			oFifthItemSpy, "5th item up should be focused after PAGE UP");

		helpers.verifyFocusOnKeyDown(assert, KeyCodes.PAGE_DOWN, oItemsToNavigate[iTotalItemCount - 3],
			oLastItemSpy, "Last item down should be focused after PAGE DOWN");

		helpers.verifyFocusOnKeyDown(assert, KeyCodes.PAGE_UP, oItemsToNavigate[3],
			oFirstItemSpy, "First item down should be focused after PAGE DOWN");
	});

});
