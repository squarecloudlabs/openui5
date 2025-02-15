/*global QUnit, sinon */
sap.ui.define([
	"sap/ui/core/ControlBehavior",
	"sap/ui/core/Element",
	"sap/ui/thirdparty/jquery",
	"sap/m/NavContainer",
	"sap/m/ResponsivePopover",
	"sap/m/Page",
	"sap/m/Toolbar",
	"sap/m/OverflowToolbar",
	"sap/m/ToolbarSpacer",
	"sap/m/Button",
	"sap/m/List",
	"sap/m/ListBase",
	"sap/m/StandardListItem",
	"sap/ui/layout/FixFlex",
	"sap/m/ScrollContainer",
	"sap/m/Title",
	"sap/m/SelectionDetails",
	"sap/ui/core/Item",
	"sap/m/SelectionDetailsItem",
	"sap/ui/Device",
	"sap/ui/base/ManagedObject",
	"sap/ui/core/Control",
	"sap/ui/core/Core"
], function(
	ControlBehavior,
	Element,
	jQuery,
	NavContainer,
	ResponsivePopover,
	Page,
	Toolbar,
	OverflowToolbar,
	ToolbarSpacer,
	Button,
	List,
	ListBase,
	StandardListItem,
	FixFlex,
	ScrollContainer,
	Title,
	SelectionDetails,
	Item,
	SelectionDetailsItem,
	Device,
	ManagedObject,
	Control,
	oCore
) {
	"use strict";

	var aHandlePressLazyArgs = [NavContainer, ResponsivePopover, Page, Toolbar, OverflowToolbar, ToolbarSpacer, Button, List,
		StandardListItem, FixFlex, ScrollContainer, Title];

	QUnit.module("Default values", {
		beforeEach : function() {
			this.oSelectionDetails = new SelectionDetails();
			this.oSelectionDetails.placeAt("qunit-fixture");
			oCore.applyChanges();
		},
		afterEach : function() {
			this.oSelectionDetails.destroy();
			this.oSelectionDetails = null;
		}
	});

	QUnit.test("Button text", function(assert) {
		//Assert
		assert.ok((this.oSelectionDetails.getAggregation("_button").getText().length > 0), "The button text is set.");
	});

	QUnit.test("Internal aggregations created on init", function(assert) {
		//Assert
		assert.equal(this.oSelectionDetails.getAggregation("_button").getMetadata().getName(), "sap.m.Button", "Private button created");
	});

	QUnit.test("References to '_oItemFactory' and '_oChangeHandler' deleted during destroy", function(assert) {
		//Arrange
		this.oSelectionDetails.registerSelectionDetailsItemFactory(function(){});
		this.oSelectionDetails.attachSelectionHandler("_selectionDetails", new Control());
		//Act
		this.oSelectionDetails.destroy();
		//Assert
		assert.notOk(this.oSelectionDetails._oItemFactory, "Factory reference deleted");
		assert.notOk(this.oSelectionDetails._oChangeHandler, "Change handler reference deleted");
	});

	QUnit.module("Basic Rendering", {
		beforeEach : function() {
			this.oSelectionDetails = new SelectionDetails();
			this.oSelectionDetails.placeAt("qunit-fixture");
			oCore.applyChanges();
		},
		afterEach : function() {
			this.oSelectionDetails.destroy();
			this.oSelectionDetails = null;
		}
	});

	QUnit.test("Control is rendered", function(assert) {
		//Assert
		assert.ok(this.oSelectionDetails.$(), "Minimal dom strcture is present");
	});

	QUnit.test("Button is rendered", function(assert) {
		//Assert
		assert.ok(this.oSelectionDetails.getAggregation("_button").$(), "Button is rendered");
	});

	QUnit.test("Button has text 'Details' and is disabled if no items are present", function(assert) {
		//Assert
		assert.equal(this.oSelectionDetails.getAggregation("_button").getText(), "Details", "The button text is 'Details'");
		assert.equal(this.oSelectionDetails.getAggregation("_button").getEnabled(), false, "The button disabled");
	});

	QUnit.test("Toolbar button is up to date", function(assert) {
		// Arrange
		this.oSelectionDetails.addItem(new SelectionDetailsItem());
		oCore.applyChanges();

		//Assert
		assert.equal(this.oSelectionDetails.getAggregation("_button").getText(), "Details (1)", "The button text is up to date");
		assert.equal(this.oSelectionDetails.getAggregation("_button").getEnabled(), true, "The button enabled");
	});

	QUnit.test("Button has tooltip defined", function(assert) {
		//Assert
		assert.equal(this.oSelectionDetails.getAggregation("_button").getAggregation("tooltip"), "Details", "The button tooltip text is 'Details'");
	});

	QUnit.test("Button has aria-haspopup defined", function(assert) {
		//Assert
		assert.equal(this.oSelectionDetails.getAggregation("_button").$().attr("aria-haspopup"), "dialog", "The button aria-haspop is set to dialog");
	});

	QUnit.module("API methods", {
		beforeEach : function() {
			this.oResponsivePopover = new ResponsivePopover();
			this.oSelectionDetails = new SelectionDetails();
			this.oSelectionDetails.setAggregation("_popover", this.oResponsivePopover, true);
			this.oSelectionDetails.placeAt("qunit-fixture");
			oCore.applyChanges();
		},
		afterEach : function() {
			this.oSelectionDetails.destroy();
			this.oSelectionDetails = null;
		}
	});

	QUnit.test("Method 'setPopoverModal' calls inner popover method", function(assert) {
		//Arrange
		var oSpy = sinon.spy(this.oResponsivePopover, "setModal");
		//Act
		this.oSelectionDetails.setPopoverModal(true);
		//Assert
		assert.equal(oSpy.callCount, 1, "Method delegation executed");
		assert.equal(this.oResponsivePopover.getModal(), true, "Method delegation correctly updated the property value");
	});

	QUnit.test("Method 'isOpen' returns false as default", function(assert) {
		//Assert
		assert.equal(this.oSelectionDetails.isOpen(), false, "Method 'isOpen' returns false");
	});

	QUnit.test("Method 'isOpen' returns true if SelectionDetails is open", function(assert) {
		// Arrange
		sinon.stub(this.oResponsivePopover, "isOpen").returns(true);

		//Assert
		assert.equal(this.oSelectionDetails.isOpen(), true, "Method 'isOpen' returns true");
	});

	QUnit.test("Method 'isOpen' returns false if SelectionDetails is closed", function(assert) {
		//Arrange
		sinon.stub(this.oResponsivePopover, "isOpen").returns(false);

		//Assert
		assert.equal(this.oSelectionDetails.isOpen(), false, "Method 'isOpen' returns false");
	});

	QUnit.test("Method isEnabled, aggregation 'items' is empty", function(assert) {
		//Assert
		assert.equal(this.oSelectionDetails.isEnabled(), false, "Method isEnabled returns false if the aggregation 'items' is empty");
	});

	QUnit.test("Method isEnabled, aggregation 'items' contains items", function(assert) {
		// Arrange
		sinon.stub(this.oSelectionDetails, "getAggregation").returns([ new SelectionDetailsItem() ]);

		//Assert
		assert.equal(this.oSelectionDetails.isEnabled(), true, "Method isEnabled returns true if the aggregation 'items' contains items");
	});

	QUnit.test("Method close", function(assert) {
		// Arrange
		this.oSelectionDetails.destroyAggregation("_popover");
		var oSpy = sinon.spy(ResponsivePopover.prototype, "close");
		this.oSelectionDetails._handlePressLazy.apply(this.oSelectionDetails, aHandlePressLazyArgs);

		// Act
		var oReturnedSelectionDetails = this.oSelectionDetails.close();

		//Assert
		assert.equal(oSpy.callCount, 1, "The 'close' method was called");
		assert.equal(oReturnedSelectionDetails.getMetadata().getName(), "sap.m.SelectionDetails", "Returned value is SelectionDetails control");
	});

	QUnit.module("Internal control creation", {
		beforeEach: function() {
			this.oSelectionDetails = new SelectionDetails();
			this.oSelectionDetails.placeAt("qunit-fixture");
			oCore.applyChanges();

			this.oResponsivePopoverSpy = sinon.spy(ResponsivePopover.prototype, "init");
			this.oPageSpy = sinon.spy(Page.prototype, "init");
			this.oListBaseSpy = sinon.spy(ListBase.prototype, "init");
			this.oFixFlexSpy = sinon.spy(FixFlex.prototype, "init");
			this.oNavContainerSpy = sinon.spy(NavContainer.prototype, "init");
			this._aGetPopoverArgs = [
				NavContainer, ResponsivePopover, Toolbar, ToolbarSpacer, Page,
				List, FixFlex, ScrollContainer, Title
			];
		},
		afterEach: function() {
			this.oResponsivePopoverSpy.restore();
			this.oPageSpy.restore();
			this.oListBaseSpy.restore();
			this.oFixFlexSpy.restore();
			this.oNavContainerSpy.restore();

			this.oSelectionDetails.destroy();
			this.oSelectionDetails = null;
			this._aGetPopoverArgs = null;
		}
	});

	QUnit.test("Function _getPopover only creates Popover and its contents once", function(assert) {
		//Arrange
		var oPopover = this.oSelectionDetails._getPopover.apply(this.oSelectionDetails, this._aGetPopoverArgs);

		//Act
		//Assert
		assert.deepEqual(this.oSelectionDetails._getPopover.apply(this.oSelectionDetails, this._aGetPopoverArgs), oPopover, "Return value is correct.");
			assert.equal(this.oResponsivePopoverSpy.callCount, 1, "Constructor for ResponsivePopover has been called only once.");
			assert.equal(this.oPageSpy.callCount, 1, "Constructor for Page has been called only once.");
			assert.equal(this.oListBaseSpy.callCount, 2, "Constructor for List has been called twice.");
			assert.equal(this.oFixFlexSpy.callCount, 1, "Constructor for FixFlex has been called only once.");
			assert.equal(this.oNavContainerSpy.callCount, 1, "Constructor for NavContainer has been called only once.");
		assert.equal(oPopover.setProperty, this.oSelectionDetails._setPopoverProperty, "Method 'setProperty' overridden");
	});

	QUnit.test("Function _setPopoverProperty", function(assert) {
		//Arrange
		var oPopover = this.oSelectionDetails._getPopover.apply(this.oSelectionDetails, this._aGetPopoverArgs);
		var oInnerControlSpy = sinon.spy(oPopover._oControl, "setProperty");
		var oModalSpy = sinon.spy(oPopover._oControl, "setModal");
		var oControlSpy = sinon.spy(Control.prototype, "setProperty");
		//Act
		var oReturn = this.oSelectionDetails._setPopoverProperty.call(oPopover, "visible", true);
		this.oSelectionDetails._setPopoverProperty.call(oPopover, "modal", true);
		//Assert
		assert.equal(oInnerControlSpy.callCount, 2, "Method 'setProperty' of inner control called twice");
		assert.equal(oModalSpy.callCount, 1, "Method 'setModal' of inner control called twice, in case of property 'modal'");
		assert.equal(oControlSpy.callCount, 2, "Method 'setProperty' of Control called twice");
		assert.equal(oReturn, oPopover, "Popover instance returned");
	});

	QUnit.test("Initial page has header with close button on phones", function(assert) {
		//Arrange
		var bOriginalPhone = Device.system.phone;
		Device.system.phone = true;

		//Act
		this.oSelectionDetails._getPopover.apply(this.oSelectionDetails, this._aGetPopoverArgs);

		//Assert
		var oButton = this.oSelectionDetails._oInitialPage.getCustomHeader().getContent()[3];
		assert.equal(this.oSelectionDetails._oInitialPage.getShowHeader(), true, "The initial page shows its header.");
		assert.ok(this.oSelectionDetails._oInitialPage.getCustomHeader().hasStyleClass("sapMSDPageHeader"), "The new toolbar has the 'sapMSDPageHeader' class.");
		assert.ok(oButton, "The toolbar contains a close button.");

		//Cleanup
		Device.system.phone = bOriginalPhone;
	});

	QUnit.test("ActionGroup List's showNoData is false", function(assert) {
		//Arrange
		this.oSelectionDetails._handlePressLazy.apply(this.oSelectionDetails, aHandlePressLazyArgs);

		//Act
		//Assert
		assert.equal(this.oSelectionDetails._oActionGroupList.getShowNoData(), false, "ActionGroup List doesn't show noData text and is therefore not visible without actionGroups");
	});

	QUnit.test("Value of member _MAX_ACTIONGROUPS is correct", function(assert) {
		assert.equal(SelectionDetails._MAX_ACTIONGROUPS, 5, "The static member value is correct.");
	});

	QUnit.test("Maximum number of displayed actionGroups is correct", function(assert) {
		//Arrange
		var oItem = new Item();
		sinon.stub(this.oSelectionDetails, "getActionGroups").returns([
			oItem, oItem.clone(), oItem.clone(), oItem.clone(), oItem.clone(), oItem.clone()
		]);

		this.oSelectionDetails._oActionGroupList = {
			destroyAggregation: function() {},
			addAggregation: function() {}
		};
		var oAddAggregationSpy = sinon.spy(this.oSelectionDetails._oActionGroupList, "addAggregation");

		//Act
		this.oSelectionDetails._addActionGroupListItems(StandardListItem);

		//Assert
		assert.equal(oAddAggregationSpy.callCount, 5, "The correct number of items has been added to the list.");
	});

	QUnit.module("Popover height handling", {
		beforeEach: function() {
			this.bOriginalPhone = Device.system.phone;
			Device.system.phone = false;

			this.oSelectionDetails = new SelectionDetails();
			this.oSelectionDetails.placeAt("qunit-fixture");
			oCore.applyChanges();

			this._aGetPopoverArgs = [
				NavContainer, ResponsivePopover, Toolbar, ToolbarSpacer, Page,
				List, FixFlex, ScrollContainer, Title
			];
		},
		afterEach: function() {
			Device.system.phone = this.bOriginalPhone;

			this.oSelectionDetails.destroy();
			this.oSelectionDetails = null;
			this._aGetPopoverArgs = null;
		}
	});

	QUnit.test("_POPOVER_MAX_HEIGHT has the correct value", function(assert) {
		assert.equal(SelectionDetails._POPOVER_MAX_HEIGHT, 500, "The value is correct.");
	});

	QUnit.test("Method _getContentHeight calculates the correct height", function(assert) {
		//Arrange
		this.oSelectionDetails._oMainList = {
			$: function() {
				return {
					outerHeight: function() { return 400; }
				};
			}
		};
		this.oSelectionDetails._oActionGroupList = {
			$: function() {
				return {
					outerHeight: function() { return 50; }
				};
			}
		};
		this.oSelectionDetails._oInitialPage = {
			getFooter: function() {
				return {
					$: function() {
						return {
							outerHeight: function() { return 50; }
						};
					}
				};
			}
		};

		//Act
		var iContentHeight = this.oSelectionDetails._getInitialPageHeight();

		//Assert
		assert.equal(iContentHeight, 500, "The content height is calculated correctly.");
	});

	QUnit.test("Event delegate is added to the popover on non-phone devices", function(assert) {
		//Arrange
		var oAddEventDelegateSpy = sinon.spy(ResponsivePopover.prototype, "addEventDelegate");

		//Act
		this.oSelectionDetails._getPopover.apply(this.oSelectionDetails, this._aGetPopoverArgs);

		//Assert
		assert.equal(oAddEventDelegateSpy.callCount, 2, "Method addEventDelegate has been called twice (one call for WrapLabels) on Popover.");

		//Cleanup
		oAddEventDelegateSpy.restore();
	});

	QUnit.test("Popover height is updated after rendering on non-phone devices", function(assert) {
		//Arrange
		var oUpdateContentHeightSpy = sinon.spy(this.oSelectionDetails, "_updatePopoverContentHeight");

		//Act
		this.oSelectionDetails._handlePressLazy.apply(this.oSelectionDetails, aHandlePressLazyArgs);

		//Assert
		assert.equal(oUpdateContentHeightSpy.callCount, 1, "Method _updatePopoverContentHeight has been called.");
	});

	QUnit.test("Popover height is capped at _POPOVER_MAX_HEIGHT", function(assert) {
		//Arrange
		sinon.stub(this.oSelectionDetails, "_getInitialPageHeight").returns(600);
		this.oSelectionDetails._getPopover.apply(this.oSelectionDetails, this._aGetPopoverArgs);
		var oSetPropertySpy = sinon.spy(this.oSelectionDetails._getPopover(), "setProperty");

		//Act
		this.oSelectionDetails._updatePopoverContentHeight();

		//Assert
		assert.equal(oSetPropertySpy.withArgs("contentHeight", SelectionDetails._POPOVER_MAX_HEIGHT + "px").callCount, 1, "Property contentHeight has been updated.");
	});

	QUnit.test("Popover does not exceed viewport", function(assert) {
		//Arrange
		var iOriginalHeight = Device.resize.height;
		Device.resize.height = 400;

		this.oSelectionDetails._handlePressLazy.apply(this.oSelectionDetails, aHandlePressLazyArgs);
		oCore.applyChanges();

		var oPopover = this.oSelectionDetails._getPopover()._oControl;

		//Act
		var iMaxContentHeight = this.oSelectionDetails._getMaxPopoverHeight();

		//Assert
		assert.equal(oPopover._marginBottom, 10, "The internal marginBottom property exists.");
		assert.equal(iMaxContentHeight, 390, "The calculated max height of the popover is correct.");

		//Cleanup
		Device.resize.height = iOriginalHeight;
	});

	QUnit.test("Popover height is set to content height", function(assert) {
		//Arrange
		sinon.stub(this.oSelectionDetails, "_getInitialPageHeight").returns(425);
		this.oSelectionDetails._getPopover.apply(this.oSelectionDetails, this._aGetPopoverArgs);
		var oSetPropertySpy = sinon.spy(this.oSelectionDetails._getPopover(), "setProperty");

		//Act
		this.oSelectionDetails._updatePopoverContentHeight();

		//Assert
		assert.equal(oSetPropertySpy.withArgs("contentHeight", 425 + "px").callCount, 1, "Property contentHeight has been updated.");
	});

	QUnit.module("Navigation", {
		beforeEach : function() {
			this.oSelectionDetails = new SelectionDetails();
			this.oNavContainer = new NavContainer();
			this.oPopover = new ResponsivePopover({
				content: this.oNavContainer
			});
			sinon.stub(this.oPopover, "isOpen").returns(true);
			this.oSelectionDetails.setAggregation("_popover", this.oPopover, true);
			this.oSelectionDetails._oNavContainer = this.oNavContainer;
			this.sTitle = "newPageTitle";
			this.oContent = new Control();
			this.oSelectionDetails.placeAt("qunit-fixture");
			oCore.applyChanges();

			this.aHandleNavLazyArgs = [
				this.sTitle, this.oContent,
				Page, Toolbar, ToolbarSpacer, Title
			];
		},
		afterEach : function() {
			this.oSelectionDetails.destroy();
			this.oSelectionDetails = null;
			this.oNavContainer.destroy();
			this.oNavContainer = null;
			this.oPopover.destroy();
			this.oPopover = null;
			this.sTitle = null;
			this.oContent.destroy();
			this.oContent = null;
		}
	});

	QUnit.test("Method 'navTo' returns reference to 'this'", function(assert) {
		//Arrange
		this.oPopover.isOpen.returns(false);
		var oReturn = this.oSelectionDetails.navTo();

		//Act
		//Assert
		assert.deepEqual(oReturn, this.oSelectionDetails, "The correct reference to 'this' has been returned to allow method chaining.");
	});

	QUnit.test("Method 'navTo' creates page with given content and title", function(assert) {
		// Arrange
		// Act
		this.oSelectionDetails._handleNavLazy.apply(this.oSelectionDetails, this.aHandleNavLazyArgs);

		// Assert
		assert.deepEqual(this.oNavContainer.getPages()[0].getContent()[0], this.oContent, "Content is wrapped in page. The page is set as current page in NavContainer.");
		assert.equal(this.oNavContainer.getPages()[0].getCustomHeader().getContent()[2].getText(), this.sTitle, "Page has the correct title.");
	});

	QUnit.test("Method 'navTo' results in navigation to the page with correct ID if Popover is open", function(assert) {
		// Arrange
		var oToSpy = sinon.spy(this.oNavContainer, "to"),
			oAddPageSpy = sinon.spy(this.oNavContainer, "addPage"),
			sPageId = this.oSelectionDetails.getId() + "-page-for-" + this.oContent.getId();

		// Act
		this.oSelectionDetails._handleNavLazy.apply(this.oSelectionDetails, this.aHandleNavLazyArgs);

		// Assert
		assert.equal(oAddPageSpy.callCount, 1, "called the method addPage that has been overwritten in NavContainer");
		assert.equal(oToSpy.args[0][0].indexOf(sPageId), 0, "Navigation occurs with correct page ID");
	});

	QUnit.test("Method 'navTo' loads dependencies", function(assert) {
		// Arrange
		var oRequireStub = sinon.spy(sap.ui, "require");
		var oContent = this.oContent;
		var done = assert.async();

		this.oSelectionDetails._handleNavLazy = function() {
			// Assert
		assert.equal(oRequireStub.callCount, 1, "sap.ui.require has been called once.");
			assert.equal(arguments[0], "newPageTitle", "The first parameter of callback is correct.");
			assert.deepEqual(arguments[1], oContent, "The second parameter of callback is correct.");

			//Cleanup
			oRequireStub.restore();
			done();
		};

		// Act
		this.oSelectionDetails.navTo(this.sTitle, this.oContent);
	});

	QUnit.test("Method 'navTo' does not result in dependency loading and navigation if Popover has not been opened", function(assert) {
		// Arrange
		this.oPopover.isOpen.returns(false);
		var oRequireSpy = sinon.spy(sap.ui, "require");

		// Act
		this.oSelectionDetails.navTo(this.sTitle, this.oContent);

		// Assert
		assert.equal(oRequireSpy.callCount, 0, "Navigation did not occur.");

		//Cleanup
		oRequireSpy.restore();
	});

	QUnit.test("Method 'navTo' builds a new toolbar for the popover", function(assert) {
		// Arrange
		//Act
		this.oSelectionDetails._handleNavLazy.apply(this.oSelectionDetails, this.aHandleNavLazyArgs);

		//Assert
		var aToolbarContent = this.oNavContainer.getPages()[0].getCustomHeader().getContent();
		assert.ok(aToolbarContent.length > 0, "The new page has a toolbar with content.");
	});

	QUnit.test("New toolbar shows close button on phones", function(assert) {
		// Arrange
		var bOriginalPhone = Device.system.phone;
		Device.system.phone = true;
		var oGetCloseButtonSpy = sinon.spy(this.oSelectionDetails, "_getCloseButton");
		var oAddAggregationSpy = sinon.spy(Toolbar.prototype, "addAggregation");

		//Act
		this.oSelectionDetails._handleNavLazy.apply(this.oSelectionDetails, this.aHandleNavLazyArgs);

		//Assert
		assert.equal(oGetCloseButtonSpy.callCount, 1, "A new close button has been created.");
		assert.equal(oAddAggregationSpy.withArgs("content", oGetCloseButtonSpy.returnValues[0]).callCount, 1, "The same new close button has been added to the toolbar.");

		//Cleanup
		Device.system.phone = bOriginalPhone;
	});

	QUnit.test("The 'back' method of navContainer is executed in the back button's press handler", function(assert) {
		// Arrange
		var oBackSpy = sinon.spy(this.oNavContainer, "back");
		var oBackButtonPressSpy = sinon.spy(this.oSelectionDetails, "_onBackButtonPress");
		this.oSelectionDetails._handleNavLazy.apply(this.oSelectionDetails, this.aHandleNavLazyArgs);

		// Act
		this.oNavContainer.getPages()[0].getCustomHeader().getContent()[0].firePress();

		// Assert
		assert.equal(oBackSpy.callCount, 1, "Backward navigation occured.");
		assert.equal(oBackButtonPressSpy.callCount, 1, "Backward navigation handler has been called.");
	});

	QUnit.test("If 'back' navigation happens, event 'navigate' is triggered", function(assert) {
		// Arrange
		var oSelectionDetailsItem = new SelectionDetailsItem();
		//var oContent = this.aHandleNavLazyArgs[1];
		this.oSelectionDetails.addItem(oSelectionDetailsItem);
		this.oSelectionDetails._onNavigate({
			getSource: function () {
				return oSelectionDetailsItem;
			}
		});
		this.oSelectionDetails._handleNavLazy.apply(this.oSelectionDetails, this.aHandleNavLazyArgs);
		this.oSelectionDetails.attachNavigate(onNavigate, this);

		// Act
		this.oNavContainer.getPages()[0].getCustomHeader().getContent()[0].firePress();
		this.oSelectionDetails._oNavContainer.fireEvent("afterNavigate");

		// Assert
		function onNavigate(oEvent) {
			assert.equal(oEvent.getParameter("direction"), "back", "Event property 'direction' is 'back'");
			assert.equal(oEvent.getParameter("item"), oSelectionDetailsItem, "Event property 'item' is provided");
			assert.equal(oEvent.getParameter("content"), this.oContent, "Event property 'content' is the content of page which is navigated from");
		}
	});

	QUnit.test("Backward navigation to the initial page triggers animation", function(assert) {
		// Arrange
		var oInitialPageMock = {
			getContent: function () {
				return [ "" ];
			}
		};
		this.oSelectionDetails._handleNavLazy.apply(this.oSelectionDetails, this.aHandleNavLazyArgs);
		this.oSelectionDetails._oInitialPage = oInitialPageMock;
		sinon.stub(this.oSelectionDetails, "_getInitialPageHeight").returns(500);
		sinon.stub(this.oSelectionDetails._oNavContainer, "getCurrentPage").returns(oInitialPageMock);
		var oSetPopoverHeightSpy = sinon.spy(this.oSelectionDetails, "_setPopoverHeight");

		// Act
		this.oSelectionDetails._onBackButtonPress();

		// Assert
		assert.equal(oSetPopoverHeightSpy.callCount, 1, "Method _setPopoverHeight has been called.");
	});

	QUnit.test("Method _setPopoverHeight removes and reattaches the popover's resize handler", function(assert) {
		// Arrange
		var bOriginalPhone = Device.system.phone;
		Device.system.phone = false;

		this.oNavContainer.destroy();
		this.oNavContainer = new NavContainer();
		this.oPopover.destroy();
		this.oPopover = new ResponsivePopover({
			content: this.oNavContainer
		});
		sinon.stub(this.oPopover, "isOpen").returns(true);
		this.oSelectionDetails.setAggregation("_popover", this.oPopover, true);

		this.oPopover.openBy(this.oSelectionDetails);
		var oGetAnimationModeStub = sinon.stub(ControlBehavior, "getAnimationMode").returns("none");

		var oRegisterSpy = sinon.spy(this.oPopover._oControl, "_registerContentResizeHandler");
		var oDeregisterSpy = sinon.spy(this.oPopover._oControl, "_deregisterContentResizeHandler");

		// Act
		this.oSelectionDetails._setPopoverHeight(500);

		// Assert
		assert.equal(oDeregisterSpy.callCount, 1, "The popover's resize handler has been deregistered.");
		assert.equal(oRegisterSpy.callCount, 1, "The popover's resize handler has been registered.");

		//Cleanup
		Device.system.phone = bOriginalPhone;
		oGetAnimationModeStub.restore();
	});

	QUnit.test("Successive forward and backward navigation results in the first page being opened", function(assert) {
		// Arrange
		var oFirstPage = new Page();
		this.oNavContainer.addPage(oFirstPage);
		this.oSelectionDetails._handleNavLazy.apply(this.oSelectionDetails, this.aHandleNavLazyArgs);

		// Act
		this.oNavContainer.getPages()[1].getCustomHeader().getContent()[0].firePress();

		// Assert
		assert.deepEqual(this.oNavContainer.getCurrentPage(), oFirstPage, "Forward and backward navigation results in first page being opened");
	});

	QUnit.module("Main List Navigation", {
		beforeEach : function() {
			this.oSelectionDetails = new SelectionDetails();
			this.oSelectionDetails.placeAt("qunit-fixture");
			oCore.applyChanges();
		},
		afterEach : function() {
			this.oSelectionDetails.destroy();
			this.oSelectionDetails = null;
		}
	});

	QUnit.test("'_navigate' Event of SelectionDetailsItem results in navigate event in SelectionDetails", function(assert) {
		//Arrange
		var oSelectionDetailsItem = new SelectionDetailsItem();
		this.oSelectionDetails.addItem(oSelectionDetailsItem);
		this.oSelectionDetails._handlePressLazy.apply(this.oSelectionDetails, aHandlePressLazyArgs);
		var oFireNavigateSpy = sinon.spy(this.oSelectionDetails, "fireNavigate");

		//Act
		oSelectionDetailsItem.fireEvent("_navigate");

		//Assert
		assert.deepEqual(oFireNavigateSpy.getCall(0).args[0].item, oSelectionDetailsItem, "'navigate' event of SelectionDetails was called with correct 'item' parameter");
		assert.deepEqual(oFireNavigateSpy.getCall(0).args[0].direction, "to", "'navigate' event of SelectionDetails was called with correct 'direction' parameter");
		assert.deepEqual(this.oSelectionDetails._oItemForNavigation, oSelectionDetailsItem, "Item for navigation saved");
	});

	QUnit.test("'_onNavigate' event handler attached once per navigate button", function(assert) {
		// Arrange
		var oSelectionDetailsItem = new SelectionDetailsItem();
		this.oSelectionDetails.addItem(oSelectionDetailsItem);
		var oSpy = sinon.spy(this.oSelectionDetails, "_onNavigate");
		this.oSelectionDetails._handlePressLazy.apply(this.oSelectionDetails, aHandlePressLazyArgs);

		// Act
		this.oSelectionDetails._handlePressLazy.apply(this.oSelectionDetails, aHandlePressLazyArgs);
		oSelectionDetailsItem.fireEvent("_navigate");

		//Assert
		assert.ok(oSpy.calledOnce, "Event handler called once");
	});

	QUnit.module("Popover interaction", {
		beforeEach : function() {
			this.oSelectionDetails = new SelectionDetails();
			this.oSelectionDetails.placeAt("qunit-fixture");
			oCore.applyChanges();
		},
		afterEach : function() {
			this.oSelectionDetails.destroy();
			this.oSelectionDetails = null;
		}
	});

	QUnit.test("The _onToolbarButtonPress function is being called upon the press on the SelectionDetails toolbar button", function(assert) {
		// Arrange
		var oStub = sinon.stub(this.oSelectionDetails._onToolbarButtonPress, "call");
		// Act
		this.oSelectionDetails.getAggregation("_button").firePress();
		//Assert
		assert.equal(oStub.callCount, 1, "The function _onToolbarButtonPress has been called");
	});

	QUnit.test("Popover aggregation is filled when the Click handler is executed", function(assert) {
		// Arrange
		this.oSelectionDetails._handlePressLazy.apply(this.oSelectionDetails, aHandlePressLazyArgs);

		// Act
		//Assert
		assert.ok(this.oSelectionDetails.getAggregation("_popover"), "The aggregation is filled");
	});

	QUnit.test("Click handler opens the popover", function(assert) {
		// Arrange
		var oSpy = sinon.spy(ResponsivePopover.prototype, "openBy");

		// Act
		this.oSelectionDetails._handlePressLazy.apply(this.oSelectionDetails, aHandlePressLazyArgs);

		//Assert
		assert.ok(oSpy.calledOnce, "The 'openBy' function was called");

		// Restore
		oSpy.restore();
	});

	QUnit.test("Click handler creates list items and puts them in the list", function(assert) {
		// Arrange
		var oSelectionDetailsItem = new SelectionDetailsItem();
		this.oSelectionDetails.addItem(oSelectionDetailsItem);

		// Act
		this.oSelectionDetails._handlePressLazy.apply(this.oSelectionDetails, aHandlePressLazyArgs);
		var oList = Element.getElementById(this.oSelectionDetails.getId() + "-list");

		//Assert
		assert.equal(oList.getAggregation("items").length, 1, "One list item has been added to the list");
	});

	QUnit.test("Click handler creates buttons for actions", function(assert) {
		// Arrange
		var sText = "myText";
		this.oSelectionDetails.addAction(new Item({text: sText, enabled: true}));

		// Act
		this.oSelectionDetails._handlePressLazy.apply(this.oSelectionDetails, aHandlePressLazyArgs);

		//Assert
		var oButton = Element.getElementById(this.oSelectionDetails.getId() + "-action-0");
		assert.equal(oButton.getText(), sText, "Button has correct text");
		assert.equal(oButton.getEnabled(), true, "Button has correct text");
	});

	QUnit.test("Click handler attached once per action button", function(assert) {
		// Arrange
		var oSelectionDetailsItem = new SelectionDetailsItem({
			actions: [new Item()]
		});
		this.oSelectionDetails.addItem(oSelectionDetailsItem);
		var oSpy = sinon.spy(this.oSelectionDetails, "_onActionPress");
		this.oSelectionDetails._handlePressLazy.apply(this.oSelectionDetails, aHandlePressLazyArgs);
		var oButton = Element.getElementById(oSelectionDetailsItem.getId() + "-action-0");

		// Act
		this.oSelectionDetails._handlePressLazy.apply(this.oSelectionDetails, aHandlePressLazyArgs);
		oButton.firePress();

		//Assert
		assert.ok(oSpy.calledOnce, "Event handler called once");
	});

	QUnit.test("ActionPress event on item action triggered in correct context", function(assert) {
		// Arrange
		var oButton,
			oSelectionDetailsItem1 = new SelectionDetailsItem({
				actions: [new Item("item1Action", {})]
			}),
			oSelectionDetailsItem2 = new SelectionDetailsItem({
				actions: [new Item("item2Action", {})]
			});

		this.oSelectionDetails.addItem(oSelectionDetailsItem1).addItem(oSelectionDetailsItem2);
		this.oSelectionDetails.attachActionPress(onActionPress);
		var oSpy = sinon.spy(this.oSelectionDetails, "fireActionPress");
		this.oSelectionDetails._handlePressLazy.apply(this.oSelectionDetails, aHandlePressLazyArgs);

		// Act
		this.oSelectionDetails.removeItem(oSelectionDetailsItem1);
		this.oSelectionDetails._handlePressLazy.apply(this.oSelectionDetails, aHandlePressLazyArgs);
		oButton = Element.getElementById(this.oSelectionDetails.getAggregation("items")[0].getId() + "-action-0");
		oButton.firePress();

		//Assert
		assert.deepEqual(oSpy.getCall(0).args[0].items[0], oSelectionDetailsItem2, "Event triggered in correct context");
		assert.equal(oSpy.getCall(0).args[0].level, "Item", "Event triggered with correct level parameter");
		assert.equal(oSpy.getCall(0).args[0].action.getId(), "item2Action", "Event triggered with correct action parameter");
		function onActionPress (oEvent) {
			assert.deepEqual(oEvent.getParameter("items")[0], oSelectionDetailsItem2, "Event parameter items returns correctly");
		}
	});

	QUnit.test("Press on the button results in action Press event", function(assert) {
		// Arrange
		var oAction = new Item();
		this.oSelectionDetails.addAction(oAction);
		this.oSelectionDetails._handlePressLazy.apply(this.oSelectionDetails, aHandlePressLazyArgs);
		var oButton = Element.getElementById(this.oSelectionDetails.getId() + "-action-0");
		var oSpy = sinon.spy(this.oSelectionDetails, "fireActionPress");

		// Act
		oButton.firePress();

		//Assert
		assert.deepEqual(oSpy.getCall(0).args[0].action, oAction, "The actionPress event of SelectionDetails has been triggered");
		assert.equal(oSpy.getCall(0).args[0].level, "List", "The action level is on list level");
	});

	QUnit.test("First action group has special class", function(assert) {
		// Arrange
		var oActionGroup = new Item();
		this.oSelectionDetails.addActionGroup(oActionGroup);
		this.oSelectionDetails.addActionGroup(oActionGroup.clone());

		// Act
		this.oSelectionDetails._handlePressLazy.apply(this.oSelectionDetails, aHandlePressLazyArgs);

		// Assert
		var sId = this.oSelectionDetails.getId() + "-actionGroup-";
		assert.ok(jQuery("#" + sId + "0").is(".sapMSDFirstActionGroup"), "The first item has the correct style class.");
		assert.notOk(jQuery("#" + sId + "1").is(".sapMSDFirstActionGroup"), "The second item doesn't have an additional style class.");
	});

	QUnit.test("StandardListItem is created for actionGroups aggregation", function(assert) {
		// Arrange
		var oActionGroup = new Item();
		this.oSelectionDetails.addActionGroup(oActionGroup);

		// Act
		this.oSelectionDetails._handlePressLazy.apply(this.oSelectionDetails, aHandlePressLazyArgs);

		// Assert
		assert.equal(Element.getElementById(this.oSelectionDetails.getId() + "-actionGroup-0").getMetadata().getName(), "sap.m.StandardListItem", "The created item has the correct class.");
	});

	QUnit.test("Press on the StandardListItem triggers action press event", function(assert) {
		// Arrange
		var oActionGroup = new Item();
		var oSelectionDetailsItem = new SelectionDetailsItem();
		this.oSelectionDetails.addActionGroup(oActionGroup);
		this.oSelectionDetails.addItem(oSelectionDetailsItem);

		this.oSelectionDetails._handlePressLazy.apply(this.oSelectionDetails, aHandlePressLazyArgs);
		var oStandardListItem = Element.getElementById(this.oSelectionDetails.getId() + "-actionGroup-0");
		var oSpy = sinon.spy(this.oSelectionDetails, "fireActionPress");

		// Act
		oStandardListItem.firePress();

		// Assert
		assert.deepEqual(oSpy.getCall(0).args[0].action, oActionGroup, "The actionPress event of SelectionDetails has been triggered");
		assert.deepEqual(oSpy.getCall(0).args[0].items, [oSelectionDetailsItem], "The items are attached in the actionPress event");
		assert.equal(oSpy.getCall(0).args[0].level, "Group", "The action level is on group level");
	});

	QUnit.test("List is destroyed", function(assert) {
		//Arrange
		this.oSelectionDetails.addItem(new SelectionDetailsItem());
		this.oSelectionDetails._handlePressLazy.apply(this.oSelectionDetails, aHandlePressLazyArgs);
		var oSpy = sinon.spy(this.oSelectionDetails._oMainList, "destroy");

		//Act
		this.oSelectionDetails.destroy();

		//Assert
		assert.ok(oSpy.calledOnce, "List is destroyed");
	});

	QUnit.test("Toolbar for list actions is destroyed", function(assert) {
		//Arrange
		this.oSelectionDetails.addAction(new Item());
		var oSpy = sinon.spy(Page.prototype, "destroyAggregation");

		//Act
		this.oSelectionDetails._handlePressLazy.apply(this.oSelectionDetails, aHandlePressLazyArgs);

		//Assert
		assert.equal(oSpy.withArgs("footer", true).callCount, 1, "Correct aggregation 'footer' is destroyed once without invalidating.");

		//Cleanup
		oSpy.restore();
	});

	QUnit.module("Control Facade", {
		beforeEach : function() {
			this.oSelectionDetails = new SelectionDetails();
		},
		afterEach : function() {
			this.oSelectionDetails.destroy();
			this.oSelectionDetails = null;
		}
	});

	QUnit.test("Facade is not returning the original instance", function(assert) {
		// Act
		var oFacade = this.oSelectionDetails.getFacade();

		//Assert
		assert.notDeepEqual(this.oSelectionDetails, oFacade, "Proxy object is returned.");
	});

	QUnit.test("Facade proxy object is buffered on instance level", function(assert) {
		// Act
		var oFacadeFirstCall = this.oSelectionDetails.getFacade();
		var oFacadeSecondCall = this.oSelectionDetails.getFacade();

		//Assert
		assert.equal(oFacadeFirstCall, oFacadeSecondCall, "Same proxy object is returned");
	});

	QUnit.test("Facade methods exist", function(assert) {
		// Act
		var aFacadeMethods = this.oSelectionDetails._aFacadeMethods;

		//Assert
		assert.ok(aFacadeMethods.indexOf("addCustomData") > -1, "Facade contains method 'addCustomData'");
		assert.ok(aFacadeMethods.indexOf("getCustomData") > -1, "Facade contains method 'getCustomData'");
		assert.ok(aFacadeMethods.indexOf("indexOfCustomData") > -1, "Facade contains method 'indexOfCustomData'");
		assert.ok(aFacadeMethods.indexOf("insertCustomData") > -1, "Facade contains method 'insertCustomData'");
		assert.ok(aFacadeMethods.indexOf("removeCustomData") > -1, "Facade contains method 'removeCustomData'");
		assert.ok(aFacadeMethods.indexOf("removeAllCustomData") > -1, "Facade contains method 'removeAllCustomData'");
		assert.ok(aFacadeMethods.indexOf("destroyCustomData") > -1, "Facade contains method 'destroyCustomData'");
		assert.ok(aFacadeMethods.indexOf("data") > -1, "Facade contains method 'data'");
		assert.ok(aFacadeMethods.indexOf("addEventDelegate") > -1, "Facade contains method 'addEventDelegate'");
		assert.ok(aFacadeMethods.indexOf("removeEventDelegate") > -1, "Facade contains method 'removeEventDelegate'");
		assert.ok(aFacadeMethods.indexOf("close") > -1, "Facade contains method 'close'");
		assert.ok(aFacadeMethods.indexOf("isOpen") > -1, "Facade contains method 'isOpen'");
		assert.ok(aFacadeMethods.indexOf("isEnabled") > -1, "Facade contains method 'isEnabled'");
		assert.ok(aFacadeMethods.indexOf("attachBeforeOpen") > -1, "Facade contains method 'attachBeforeOpen'");
		assert.ok(aFacadeMethods.indexOf("detachBeforeOpen") > -1, "Facade contains method 'detachBeforeOpen'");
		assert.ok(aFacadeMethods.indexOf("attachBeforeClose") > -1, "Facade contains method 'attachBeforeClose'");
		assert.ok(aFacadeMethods.indexOf("detachBeforeClose") > -1, "Facade contains method 'detachBeforeClose'");
		assert.ok(aFacadeMethods.indexOf("attachNavigate") > -1, "Facade contains method 'attachNavigate'");
		assert.ok(aFacadeMethods.indexOf("detachNavigate") > -1, "Facade contains method 'detachNavigate'");
		assert.ok(aFacadeMethods.indexOf("attachActionPress") > -1, "Facade contains method 'attachActionPress'");
		assert.ok(aFacadeMethods.indexOf("detachActionPress") > -1, "Facade contains method 'detachActionPress'");
		assert.ok(aFacadeMethods.indexOf("addAction") > -1, "Facade contains method 'addAction'");
		assert.ok(aFacadeMethods.indexOf("removeAction") > -1, "Facade contains method 'removeAction'");
		assert.ok(aFacadeMethods.indexOf("removeAllActions") > -1, "Facade contains method 'removeAllActions'");
		assert.ok(aFacadeMethods.indexOf("addActionGroup") > -1, "Facade contains method 'addActionGroup'");
		assert.ok(aFacadeMethods.indexOf("removeActionGroup") > -1, "Facade contains method 'removeActionGroup'");
		assert.ok(aFacadeMethods.indexOf("removeAllActionGroups") > -1, "Facade contains method 'removeActionGroups'");
		assert.ok(aFacadeMethods.indexOf("navTo") > -1, "Facade contains method 'navTo'");
	});

	QUnit.test("Custom facade method implementation for getItems", function(assert) {
		//Arrange
		this.oSelectionDetails.addItem(new SelectionDetailsItem());
		this.oSelectionDetails.addItem(new SelectionDetailsItem());

		var oGetItemFacadesSpy = sinon.spy(SelectionDetails.prototype, "_getItemFacades");
		var oGetItemFacadeSpy = sinon.spy(SelectionDetailsItem.prototype, "getFacade");
		var oFacade = this.oSelectionDetails.getFacade();

		//Act
		var aItems = oFacade.getItems();

		//Assert
		assert.equal(oGetItemFacadesSpy.callCount, 1, "The correct method has been called.");
		assert.equal(aItems.length, 2, "The correct number of item facades has been returned.");
		assert.equal(oGetItemFacadeSpy.callCount, 2, "The correct number of item facades has been built.");

		//Cleanuo
		oGetItemFacadesSpy.restore();
		oGetItemFacadeSpy.restore();
	});

	QUnit.module("Factory function registration", {
		beforeEach : function() {
			this.oSelectionDetails = new SelectionDetails();
			this.oSelectionDetails.placeAt("qunit-fixture");
			oCore.applyChanges();
		},
		afterEach : function() {
			this.oSelectionDetails.destroy();
			this.oSelectionDetails = null;
		}
	});

	QUnit.test("Factory function not registered yet", function(assert) {
		//Assert
		assert.equal(this.oSelectionDetails._oItemFactory, null, "Factory function is undefined");
	});

	QUnit.test("Factory Function - only function provided", function(assert) {
		//Arrange
		var fnFunction = function(){};
		this.oSelectionDetails.registerSelectionDetailsItemFactory(fnFunction);

		//Assert
		assert.equal(this.oSelectionDetails._oItemFactory.factory, fnFunction, "Factory function is defined");
		assert.ok(!this.oSelectionDetails._oItemFactory.data, "Factory data is undefined");
	});

	QUnit.test("Register Factory Function - data and function provided", function(assert) {
		//Arrange
		var fnFunction = function(){};
		var oData = [1, 2];
		this.oSelectionDetails.registerSelectionDetailsItemFactory(oData, fnFunction);

		//Assert
		assert.equal(this.oSelectionDetails._oItemFactory.factory, fnFunction, "Factory function is defined");
		assert.equal(this.oSelectionDetails._oItemFactory.data, oData, "Factory data is defined");
	});

	QUnit.test("Factory Function - invalid data provided", function(assert) {
		//Arrange
		var fnFunction = "Invalid data";
		var oResult = this.oSelectionDetails.registerSelectionDetailsItemFactory(fnFunction);

		//Assert
		assert.equal(this.oSelectionDetails._oItemFactory, null, "Factory function is undefined");
		assert.equal(oResult, this.oSelectionDetails, "Factory function returns SelectionDetails");
	});

	QUnit.module("Events", {
		beforeEach : function() {
			this.oSelectionDetails = new SelectionDetails();
			this.oSelectionDetails.placeAt("qunit-fixture");
			oCore.applyChanges();
		},
		afterEach : function() {
			this.oSelectionDetails.destroy();
			this.oSelectionDetails = null;
		}
	});

	QUnit.test("Event 'beforeOpen' is triggered", function(assert) {
		assert.expect(1);
		//Arrange
		this.oSelectionDetails.attachBeforeOpen(fnBeforeOpen);

		//Act
		this.oSelectionDetails._handlePressLazy.apply(this.oSelectionDetails, aHandlePressLazyArgs);

		//Assert
		function fnBeforeOpen (oEvt) {
			assert.ok(true, "Event was triggered");
		}
	});

	QUnit.test("Event 'beforeClose' is triggered", function(assert) {
		assert.expect(1);
		//Arrange
		this.oSelectionDetails.attachBeforeClose(fnBeforeClose);

		//Act
		this.oSelectionDetails._handlePressLazy.apply(this.oSelectionDetails, aHandlePressLazyArgs);
		// On mobile devices the popover opens in fullscreen. The close needs to be done by hand.
		if (Device.system.phone) {
			this.oSelectionDetails.getAggregation("_popover").close();
		}

		//Assert
		function fnBeforeClose (oEvt) {
			assert.ok(true, "Event was triggered");
		}
	});

	QUnit.test("Popover event 'beforeOpen' is called on button press", function(assert) {
		//Arrange
		var oSpyBeforeOpen = sinon.spy(this.oSelectionDetails, "fireBeforeOpen");

		//Act
		this.oSelectionDetails._handlePressLazy.apply(this.oSelectionDetails, aHandlePressLazyArgs);

		//Assert
		assert.equal(oSpyBeforeOpen.callCount, 1, "Event 'beforeOpen' is triggered on button press.");
	});

	QUnit.module("Change Handler", {
		beforeEach : function() {
			this.oSelectionDetails = new SelectionDetails();
			this.oSelectionDetails.placeAt("qunit-fixture");
			this.oDummyControl = new ManagedObject();
			oCore.applyChanges();
		},
		afterEach : function() {
			this.oSelectionDetails.destroy();
			this.oSelectionDetails = null;
			this.oDummyControl.destroy();
			this.oDummyControl = null;
		}
	});

	QUnit.test("Calling 'attachSelectionHandler' returns this", function(assert) {
		//Act
		var oResult = this.oSelectionDetails.attachSelectionHandler();

		//Assert
		assert.equal(oResult, this.oSelectionDetails, "Function returns SelectionDetails.");
	});

	QUnit.test("A call with wrong parameter does not have any effect", function(assert) {
		var oResult = this.oSelectionDetails.attachSelectionHandler({}, "");
		assert.equal(oResult, this.oSelectionDetails, "Function returns SelectionDetails.");

		var oResult2 = this.oSelectionDetails.attachSelectionHandler(23);
		assert.equal(oResult2, this.oSelectionDetails, "Function returns SelectionDetails (called with invalid eventID).");

		var oResult3 = this.oSelectionDetails.attachSelectionHandler("someEvent", null);
		assert.equal(oResult3, this.oSelectionDetails, "Function returns SelectionDetails (called with invalid listener: null).");

		var oResult4 = this.oSelectionDetails.attachSelectionHandler("someEvent", undefined);
		assert.equal(oResult4, this.oSelectionDetails, "Function returns SelectionDetails (called with invalid listener: undefined).");

		var oResult5 = this.oSelectionDetails.attachSelectionHandler("someEvent", "wrong");
		assert.equal(oResult5, this.oSelectionDetails, "Function returns SelectionDetails (called with invalid listener: string).");

		var oResult6 = this.oSelectionDetails.attachSelectionHandler("someEvent", {});
		assert.equal(oResult6, this.oSelectionDetails, "Function returns SelectionDetails (called with invalid listener: object without attachEvent function).");

		var oResult7 = this.oSelectionDetails.attachSelectionHandler("someEvent", {attachEvent: "wrong"});
		assert.equal(oResult7, this.oSelectionDetails, "Function returns SelectionDetails (called with invalid listener: object with invalid attachEvent property).");
	});

	QUnit.test("Attaching selectionChange handler a second time does not have any effect", function(assert) {
		//Arrange
		this.oSelectionDetails.attachSelectionHandler("myEventName", this.oDummyControl);
		var oSpy = sinon.spy(this.oDummyControl, "attachEvent");

		//Act
		this.oSelectionDetails.attachSelectionHandler("myEventName", this.oDummyControl);

		//Assert
		assert.equal(oSpy.callCount, 0, "Second call does not result in second event attaching");
	});

	QUnit.test("Save parameters to enable detach mechanism", function(assert) {
		//Arrange
		var oExpected = {
			eventId: "myEventName",
			listener: this.oDummyControl
		};

		//Act
		this.oSelectionDetails.attachSelectionHandler("myEventName", this.oDummyControl);

		//Assert
		assert.deepEqual(this.oSelectionDetails._oChangeHandler, oExpected, "Parameters are saved");
	});

	QUnit.test("Attach new event after detaching the old event", function(assert) {
		//Arrange
		var oNewControl = new Control();
		var oExpected = {
			eventId: "newEventName",
			listener: oNewControl
		};
		//Act
		this.oSelectionDetails.attachSelectionHandler("myEventName", this.oDummyControl);
		this.oSelectionDetails.detachSelectionHandler();
		this.oSelectionDetails.attachSelectionHandler("newEventName", oNewControl);
		//Assert
		assert.deepEqual(this.oSelectionDetails._oChangeHandler, oExpected, "Change handler has been correctly updated.");
	});

	QUnit.test("Event listener is attached to listener object", function(assert) {
		//Act
		this.oSelectionDetails.attachSelectionHandler("myEventName", this.oDummyControl);

		//Assert
		assert.ok(this.oDummyControl.mEventRegistry.myEventName, "Event registered");
		assert.equal(this.oDummyControl.mEventRegistry.myEventName[0].fFunction, this.oSelectionDetails._handleSelectionChange, "Internal function assigned");
		assert.equal(this.oDummyControl.mEventRegistry.myEventName[0].oListener, this.oSelectionDetails, "Listener assigned");
	});

	QUnit.test("Function 'detachSelectionHandler' without attach beforehand does nothing", function(assert) {
		//Act
		var oResult = this.oSelectionDetails.detachSelectionHandler();

		//Assert
		assert.equal(oResult, this.oSelectionDetails, "Function returns SelectionDetails.");
	});

	QUnit.test("Function 'detachSelectionHandler' detaches event on listener", function(assert) {
		//Arrange
		this.oSelectionDetails.attachSelectionHandler("myEventName", this.oDummyControl);

		//Act
		this.oSelectionDetails.detachSelectionHandler();

		//Assert
		assert.notOk(this.oDummyControl.mEventRegistry.myEventName, "Event detached on listener object");
	});

	QUnit.module("Selection change handling", {
		beforeEach : function() {
			this.oSelectionDetails = new SelectionDetails({
				items: [new SelectionDetailsItem()]
			});
			this.oSelectionDetails.placeAt("qunit-fixture");
			oCore.applyChanges();
		},
		afterEach : function() {
			this.oSelectionDetails.destroy();
			this.oSelectionDetails = null;
		}
	});

	QUnit.test("Selection data is saved", function(assert) {
		//Arrange
		var oExpected = {
			data: [{
				data: [],
				displayData: []
			}, {
				data: [],
				displayData: []
			}]
		};

		//Act
		this.oSelectionDetails._handleSelectionChange({
			getParameter: function () {
				return oExpected.data;
			}
		});

		//Assert
		assert.equal(this.oSelectionDetails._oSelectionData, oExpected.data, "Event data is saved");
	});

	QUnit.test("Unrecognized event parameters are ignored", function(assert) {
		//Arrange
		var oEventParam = {
			otto: [],
			karl: []
		};

		//Act
		this.oSelectionDetails._handleSelectionChange({
			getParameter: function () {
				return oEventParam;
			}
		});

		//Assert
		assert.notOk(this.oSelectionDetails._oSelectionData, "No selection data has been set.");
	});

	QUnit.test("Selection data updates button text - add items", function(assert) {
		//Arrange
		var oEventParam = {
			data: [{
				data: [],
				displayData: []
			}, {
				data: [],
				displayData: []
			}]
		};

		var oButton = this.oSelectionDetails.getAggregation("_button");

		sinon.stub(oButton, "rerender");
		//Act
		this.oSelectionDetails._handleSelectionChange({
			getParameter: function () {
				return oEventParam.data;
			}
		});

		//Assert
		assert.ok(oButton.rerender.notCalled, "Button rerender not explicitly called");
		assert.equal(this.oSelectionDetails.getAggregation("_button").getText(), "Details (2)", "The button text is up to date");
		assert.equal(this.oSelectionDetails.getAggregation("_button").getEnabled(), true, "The button is enabled");
	});

	QUnit.test("Selection data updates button text - remove items", function(assert) {
		//Arrange
		var oEventParam = {
			data: [{
				data: [],
				displayData: []
			}, {
				data: [],
				displayData: []
			}]
		};

		//Act
		this.oSelectionDetails._handleSelectionChange({
			getParameter: function () {
				return oEventParam.data;
			}
		});
		this.oSelectionDetails._handleSelectionChange({
			getParameter: function () {
				return [];
			}
		});
		oCore.applyChanges();

		//Assert
		assert.equal(this.oSelectionDetails.getAggregation("_button").getText(), "Details", "The button text is up to date");
		assert.equal(this.oSelectionDetails.getAggregation("_button").getEnabled(), false, "The button is disabled");
	});

	QUnit.test("Button is updated with selection data if it exists", function(assert) {
		//Arrange
		this.oSelectionDetails._oSelectionData = new Array(10);

		//Act
		this.oSelectionDetails.invalidate();
		oCore.applyChanges();

		//Assert
		assert.ok(this.oSelectionDetails.getAggregation("_button").getText().indexOf("(10)") > -1, "The button text contains the correct number.");
	});

	QUnit.module("Factory integration", {
		beforeEach : function() {
			this.aCreatedItems = [];
			this.fnFactory = function (aDisplayData, aData, oContext, oData) {
				var oItem = new SelectionDetailsItem();
				this.aCreatedItems.push(oItem);
				return oItem;
			}.bind(this);
			this.oSelectionDetails = new SelectionDetails();
			this.oSelectionDetails.registerSelectionDetailsItemFactory(this.fnFactory);
			this.oSelectionDetails.placeAt("qunit-fixture");
			oCore.applyChanges();
		},
		afterEach : function() {
			this.oSelectionDetails.destroy();
			this.oSelectionDetails = null;
		}
	});

	QUnit.test("Factory function call adds returned item to 'items' aggregation", function(assert) {
		//Arrange
		var oEventParam = {
			data: [{
				data: [],
				displayData: []
			}, {
				data: [],
				displayData: []
			}]
		};

		//Act
		this.oSelectionDetails._handleSelectionChange({
			getParameter: function () {
				return oEventParam.data;
			}
		});
		this.oSelectionDetails._handlePressLazy.apply(this.oSelectionDetails, aHandlePressLazyArgs);

		//Assert
		assert.equal(this.oSelectionDetails.getItems().length, 2, "Items are added");
	});

	QUnit.test("Marker SVG string is passed to factored item", function(assert) {
		//Arrange
		var oItem = {};

		this.oSelectionDetails._oItemFactory = {
			factory: function() {
				return oItem;
			}
		};
		this.oSelectionDetails._oSelectionData = [
			{
				displayData: [],
				data: [],
				shapeString: "<svg></svg>"
			}
		];
		sinon.stub(this.oSelectionDetails, "addAggregation");

		//Act
		this.oSelectionDetails._callFactory();

		//Assert
		assert.equal(oItem._sMarkerShapeString, "<svg></svg>", "Shape string has been passed to created items.");
	});

	QUnit.test("Before factory is called existing items are destroyed", function(assert) {
		//Arrange
		var oEventParam = {
			data: [{
				data: [],
				displayData: []
			}, {
				data: [],
				displayData: []
			}]
		};
		this.oSelectionDetails._handleSelectionChange({
			getParameter: function () {
				return oEventParam.data;
			}
		});
		var oDestroyAggregationSpy = sinon.spy(this.oSelectionDetails, "destroyAggregation");

		//Act
		this.oSelectionDetails._callFactory();

		//Assert
		assert.ok(oDestroyAggregationSpy.withArgs(["items", true]), "Correct aggregation destroyed");
		assert.equal(this.oSelectionDetails.getItems().length, 2, "Items are added");
	});

	QUnit.test("Before factory is called event 'beforeUpdate' is triggered", function(assert) {
		assert.expect(1);

		//Arrange
		var aOldItems = [
			new SelectionDetailsItem(),
			new SelectionDetailsItem()
		];
		this.oSelectionDetails.addItem(aOldItems[0]);
		this.oSelectionDetails.addItem(aOldItems[1]);
		var oEventParam = {
			data: [{
				data: [],
				displayData: []
			}, {
				data: [],
				displayData: []
			}]
		};
		this.oSelectionDetails._handleSelectionChange({
			getParameter: function () {
				return oEventParam.data;
			}
		});

		//Act
		this.oSelectionDetails.attachEvent("beforeUpdate", onBeforeUpdate);
		this.oSelectionDetails._callFactory();

		//Assert
		function onBeforeUpdate(oEvent) {
			assert.deepEqual(oEvent.getParameter("items"), aOldItems, "Event includes old items as parameter");
		}
	});

	QUnit.test("After factory is called event 'afterUpdate' is triggered", function(assert) {
		assert.expect(1);

		//Arrange
		var oEventParam = {
			data: [{
				data: [],
				displayData: []
			}, {
				data: [],
				displayData: []
			}]
		};
		this.oSelectionDetails._handleSelectionChange({
			getParameter: function () {
				return oEventParam.data;
			}
		});

		//Act
		this.oSelectionDetails.attachEvent("afterUpdate", onAfterUpdate.bind(this));
		this.oSelectionDetails._callFactory();

		//Assert
		function onAfterUpdate(oEvent) {
			assert.deepEqual(oEvent.getParameter("items"), this.aCreatedItems, "Event includes new items as parameter");
		}
	});

	QUnit.test("Factory function is called with correct parameters", function(assert) {
		//Arrange
		var oEventParam = {
			data: [{
				data: [],
				displayData: [],
				context: {}
			}]
		};
		this.oSelectionDetails._handleSelectionChange({
			getParameter: function () {
				return oEventParam.data;
			}
		});
		this.oSelectionDetails._oItemFactory.factory = factory;
		//Act
		this.oSelectionDetails._callFactory();

		//Assert
		function factory (displayData, data, context) {
			assert.deepEqual(displayData, oEventParam.data[0].displayData, displayData, "'displayData' as parameter provided");
			assert.deepEqual(data, oEventParam.data[0].data, data, "'data' as parameter provided");
			assert.deepEqual(context, oEventParam.data[0].context, "'context' as parameter provided");
		}
	});

	QUnit.test("Change handler is detached during destroy to prevent runtime error", function(assert) {
		//Arrange
		var oSpy = sinon.spy(this.oSelectionDetails, "detachSelectionHandler");
		//Act
		this.oSelectionDetails.destroy();
		//Assert
		assert.equal(oSpy.callCount, 1, "Selection change handle detached");
	});

});