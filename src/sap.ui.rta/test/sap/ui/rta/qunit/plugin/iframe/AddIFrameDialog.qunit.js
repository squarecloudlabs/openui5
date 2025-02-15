/* global QUnit */

sap.ui.define([
	"sap/ui/rta/plugin/iframe/AddIFrameDialog",
	"sap/base/util/isEmptyObject",
	"sap/ui/core/library",
	"sap/ui/core/Lib",
	"sap/ui/rta/plugin/iframe/AddIFrameDialogController",
	"sap/ui/qunit/utils/nextUIUpdate",
	"sap/ui/qunit/QUnitUtils",
	"sap/ui/core/Element",
	"sap/ui/events/KeyCodes",
	"sap/ui/model/json/JSONModel"
], function(
	AddIFrameDialog,
	isEmptyObject,
	coreLibrary,
	Lib,
	AddIFrameDialogController,
	nextUIUpdate,
	QUnitUtils,
	Element,
	KeyCodes,
	JSONModel
) {
	"use strict";

	// shortcut for sap.ui.core.ValueState
	const { ValueState } = coreLibrary;

	const oTextResources = Lib.getResourceBundleFor("sap.ui.rta");
	const aTextInputFields = ["frameUrl"];
	const aNumericInputFields = ["frameWidth", "frameHeight"];
	const aUnitsOfWidthMeasure = [{
		unit: "%",
		descriptionText: oTextResources.getText("IFRAME_ADDIFRAME_DIALOG_SELECT_ADDITIONAL_TEXT_PERCENT_SECTION")
	}, {
		unit: "px",
		descriptionText: oTextResources.getText("IFRAME_ADDIFRAME_DIALOG_SELECT_ADDITIONAL_TEXT_PX")
	}, {
		unit: "rem",
		descriptionText: oTextResources.getText("IFRAME_ADDIFRAME_DIALOG_SELECT_ADDITIONAL_TEXT_REM")
	}];
	const aUnitsOfHeightMeasure = [{
		unit: "vh",
		descriptionText: oTextResources.getText("IFRAME_ADDIFRAME_DIALOG_SELECT_ADDITIONAL_TEXT_VH")
	}, {
		unit: "px",
		descriptionText: oTextResources.getText("IFRAME_ADDIFRAME_DIALOG_SELECT_ADDITIONAL_TEXT_PX")
	}, {
		unit: "rem",
		descriptionText: oTextResources.getText("IFRAME_ADDIFRAME_DIALOG_SELECT_ADDITIONAL_TEXT_REM")
	}];
	const mParameters = {
		frameUrl: "http://blabla.company.com",
		parameters: [{
			label: "Guid",
			key: "{Guid}",
			value: "guid13423412342314"
		}, {
			label: "Region",
			key: "{Region}",
			value: "Germany"
		}, {
			label: "Year",
			key: "{Year}",
			value: "2020"
		}, {
			label: "Month",
			key: "{Month}",
			value: "July"
		}, {
			label: "Product Category",
			key: "{Product_Category}",
			value: "Ice Cream"
		}, {
			label: "Campaign Name",
			key: "{Campaign_Name}",
			value: "Langnese Brand"
		}, {
			label: "Brand Name",
			key: "{Brand_Name}",
			value: "Langnese"
		}]
	};

	const aImportTestData = [{
		input: {
			asContainer: true,
			frameWidth: "16px",
			frameHeight: "9rem",
			frameUrl: "https_url"
		},
		expectedResults: {
			asContainer: true,
			frameWidth: 16,
			frameHeight: 9,
			frameWidthUnit: "px",
			frameHeightUnit: "rem",
			frameUrl: "https_url",
			unitsOfWidthMeasure: aUnitsOfWidthMeasure,
			unitsOfHeightMeasure: aUnitsOfHeightMeasure
		}
	}, {
		input: {
			frameWidth: "50.5%",
			frameHeight: "75.5vh"
		},
		expectedResults: {
			frameWidth: 50.5,
			frameHeight: 75.5,
			frameWidthUnit: "%",
			frameHeightUnit: "vh"
		}
	}];
	const mTestURLBuilderData = {
		asContainer: true,
		frameWidth: "16px",
		frameHeight: "9rem",
		frameUrl: "https_url",
		unitsOfWidthMeasure: aUnitsOfWidthMeasure,
		unitsOfHeightMeasure: aUnitsOfHeightMeasure,
		urlBuilderParameters: [{
			label: "Guid",
			key: "{Guid}",
			value: "guid13423412342314"
		}, {
			label: "Region",
			key: "{Region}",
			value: "Germany"
		}, {
			label: "Year",
			key: "{Year}",
			value: "2020"
		}, {
			label: "Month",
			key: "{Month}",
			value: "July"
		}, {
			label: "Product_Category",
			key: "{Product_Category}",
			value: "Ice Cream" // Make sure this includes a whitespace to test encoding
		}, {
			label: "Campaign_Name",
			key: "{Campaign_Name}",
			value: "Langnese Brand"
		}, {
			label: "Brand_Name",
			key: "{Brand_Name}",
			value: "Langnese"
		}]
	};

	function createJSONModel() {
		return new JSONModel({
			title: {
				value: "",
				valueState: ValueState.None
			},
			frameWidth: {
				value: "",
				valueState: ValueState.None
			},
			frameHeight: {
				value: "",
				valueState: ValueState.None
			},
			frameUrl: {
				value: "",
				valueState: ValueState.None
			}
		});
	}

	function clickOnButton(sId) {
		const oButton = Element.getElementById(sId);
		QUnitUtils.triggerEvent("tap", oButton.getDomRef());
	}

	function clickOnCancel() {
		clickOnButton("sapUiRtaAddIFrameDialogCancelButton");
	}

	function clickOnSave() {
		clickOnButton("sapUiRtaAddIFrameDialogSaveButton");
	}

	async function updateSaveButtonEnablement(bEnabled) {
		Element.getElementById("sapUiRtaAddIFrameDialogSaveButton").setEnabled(bEnabled);
		await nextUIUpdate();
	}

	QUnit.module("Given that a AddIFrameDialog is available...", {
		beforeEach() {
			this.oAddIFrameDialog = new AddIFrameDialog();
		}
	}, function() {
		QUnit.test("When AddIFrameDialog gets initialized and open is called,", function(assert) {
			this.oAddIFrameDialog.attachOpened(function() {
				assert.ok(true, "then dialog pops up,");
				assert.strictEqual(
					this.oAddIFrameDialog._oDialog.getTitle(),
					oTextResources.getText("IFRAME_ADDIFRAME_DIALOG_TITLE"),
					"then the correct title is set"
				);
				assert.strictEqual(this.oAddIFrameDialog._oDialog.getButtons().length, 2, "then 2 buttons are added");
				clickOnCancel();
			}, this);
			return this.oAddIFrameDialog.open();
		});

		QUnit.test("When AddIFrameDialog gets initialized and open is called in Update Mode,", function(assert) {
			this.oAddIFrameDialog.attachOpened(function() {
				assert.ok(true, "then dialog pops up,");
				assert.strictEqual(
					this.oAddIFrameDialog._oDialog.getTitle(),
					oTextResources.getText("IFRAME_ADDIFRAME_DIALOG_UPDATE_TITLE"),
					"then the correct title is set"
				);
				clickOnCancel();
			}, this);
			return this.oAddIFrameDialog.open({updateMode: true});
		});

		QUnit.test("When AddIFrameDialog is opened then there should be no error value state", function(assert) {
			this.oAddIFrameDialog.attachOpened(function() {
				this.oController = new AddIFrameDialogController(this.oAddIFrameDialog._oJSONModel);
				assert.strictEqual(this.oController._areAllValueStateNones(), true, "Value states are correct");
				clickOnCancel();
			}, this);
			return this.oAddIFrameDialog.open();
		});

		QUnit.test("When the dialog is opened then hash map is built correctly", function(assert) {
			this.oAddIFrameDialog.attachOpened(function() {
				const mHashmap = AddIFrameDialogController.prototype._buildParameterHashMap(mParameters);
				function checkParam(oParam) {
					assert.strictEqual(oParam.value, mHashmap[oParam.key], `Found ${oParam.key}`);
				}
				mParameters.parameters.forEach(checkParam);
				clickOnCancel();
			}, this);
			return this.oAddIFrameDialog.open();
		});

		QUnit.test("When there is an error value state in AddIFrameDialog then it can be detected", function(assert) {
			function checkField(sFieldName) {
				this.oAddIFrameDialog._oJSONModel = createJSONModel();
				this.oController = new AddIFrameDialogController(this.oAddIFrameDialog._oJSONModel);
				this.oAddIFrameDialog._oJSONModel.getData()[sFieldName].valueState = ValueState.Error;
				assert.strictEqual(this.oController._areAllValueStateNones(), false, `Detected ${sFieldName} field's error value state`);
			}
			this.oAddIFrameDialog.attachOpened(function() {
				aTextInputFields.concat(aNumericInputFields).forEach(checkField.bind(this));
				clickOnCancel();
			}, this);
			return this.oAddIFrameDialog.open();
		});

		QUnit.test("When AddIFrameDialog is opened then text input fields should be empty", function(assert) {
			this.oAddIFrameDialog.attachOpened(function() {
				const oData = new AddIFrameDialogController(this.oAddIFrameDialog._oJSONModel)._oJSONModel.getData();
				assert.strictEqual(oData.frameUrl.value, "", "then the url input is empty");
				assert.strictEqual(oData.title.value, "Embedded Content", "then the default title is set");
				clickOnCancel();
			}, this);
			return this.oAddIFrameDialog.open();
		});

		QUnit.test("When there is no empty text input field then it can be detected", function(assert) {
			const aTextInputFieldsCopy = aTextInputFields.slice();
			const sLastTextInputField = aTextInputFieldsCopy.pop();
			function checkField(sFieldName) {
				this.oAddIFrameDialog._oJSONModel.getData()[sFieldName].value = "Text entered";
				assert.notOk(this.oController._areAllTextFieldsValid(), "Some text input fields are still empty");
			}
			this.oAddIFrameDialog.attachOpened(function() {
				this.oController = new AddIFrameDialogController(this.oAddIFrameDialog._oJSONModel);
				aTextInputFieldsCopy.forEach((checkField.bind(this)));
				this.oAddIFrameDialog._oJSONModel.getData()[sLastTextInputField].value = "Text entered";
				assert.strictEqual(this.oController._areAllTextFieldsValid(), true, "No more empty text input field");
				clickOnCancel();
			}, this);
			return this.oAddIFrameDialog.open();
		});

		QUnit.test("When parameters are passed to the dialog then they should be imported correctly", function(assert) {
			this.oAddIFrameDialog.attachOpened(function() {
				const oData = this.oAddIFrameDialog._oJSONModel.getData();
				function checkFields(sFieldName) {
					assert.strictEqual(oData[sFieldName].value, mParameters[sFieldName], `${sFieldName} is imported correctly`);
				}
				Object.keys(mParameters).forEach(checkFields);
				clickOnCancel();
			}, this);
			return this.oAddIFrameDialog.open(mParameters);
		});

		QUnit.test("When URL parameters are added then the frame URL is built correctly", function(assert) {
			this.oAddIFrameDialog.attachOpened(function() {
				let sUrl = this.oAddIFrameDialog._oController._addURLParameter("firstParameter");
				this.oAddIFrameDialog._oJSONModel.setProperty("/frameUrl/value", sUrl);
				assert.strictEqual(sUrl.endsWith("firstParameter"), true, "Found firstParameter");

				sUrl = this.oAddIFrameDialog._oController._addURLParameter("secondParameter");
				this.oAddIFrameDialog._oJSONModel.setProperty("/frameUrl/value", sUrl);
				assert.strictEqual(sUrl.endsWith("secondParameter"), true, "Found secondParameter");

				sUrl = this.oAddIFrameDialog._oController._addURLParameter("secondParameter");
				this.oAddIFrameDialog._oJSONModel.setProperty("/frameUrl/value", sUrl);
				assert.strictEqual(sUrl.endsWith("secondParametersecondParameter"), true, "Found duplicate parameters");

				clickOnCancel();
			}, this);
			return this.oAddIFrameDialog.open(mParameters);
		});

		QUnit.test("When URL parameter values contain characters that need to be encoded", function(assert) {
			this.oAddIFrameDialog.attachOpened(function() {
				const sUrl = "https://example.com/{Product_Category}";
				this.oAddIFrameDialog._oJSONModel.setProperty("/frameUrl/value", sUrl);
				this.oAddIFrameDialog._oController.onShowPreview();
				const oIFrame = Element.getElementById("sapUiRtaAddIFrameDialog_PreviewFrame");
				assert.strictEqual(
					oIFrame.getUrl(),
					"https://example.com/Ice%20Cream",
					"then the preview url is encoded properly"
				);
				clickOnCancel();
			}, this);

			return this.oAddIFrameDialog.open(mParameters);
		});

		QUnit.test("When Show Preview is clicked then preview URL is built correctly", function(assert) {
			let sUrl;
			this.oAddIFrameDialog.attachOpened(function() {
				function checkParam(oParam) {
					sUrl = this.oAddIFrameDialog._oController._addURLParameter(oParam.key);
					this.oAddIFrameDialog._oJSONModel.setProperty("/frameUrl/value", sUrl);
				}
				mParameters.parameters.forEach(checkParam.bind(this));
				sUrl = this.oAddIFrameDialog._oController._buildPreviewURL(
					this.oAddIFrameDialog._oJSONModel.getProperty("/frameUrl/value")
				);
				assert.strictEqual(sUrl, "http://blabla.company.comguid13423412342314Germany2020JulyIce CreamLangnese BrandLangnese", "Preview URL is correct");
				clickOnCancel();
			}, this);
			return this.oAddIFrameDialog.open(mParameters);
		});

		QUnit.test("When Cancel button is clicked then the promise should return no setting", function(assert) {
			this.oAddIFrameDialog.attachOpened(function() {
				clickOnCancel();
			}, this);
			return this.oAddIFrameDialog.open().then(function(mSettings) {
				assert.strictEqual(mSettings, undefined, "The promise returns no setting");
			});
		});

		QUnit.test("The Save-Button is only enabled when URL is entered", function(assert) {
			this.oAddIFrameDialog.attachOpened(function() {
				const oData = this.oAddIFrameDialog._oJSONModel.getData();
				const bButtonEnabledFirstUrl = !!oData.frameUrl.value;
				assert.notOk(Element.getElementById("sapUiRtaAddIFrameDialogSaveButton").getEnabled(), "Initial state is disabled");
				assert.strictEqual(
					Element.getElementById("sapUiRtaAddIFrameDialogSaveButton").getEnabled(),
					bButtonEnabledFirstUrl,
					"Initial state of URL-Textarea is empty"
				);
				oData.frameUrl.value = "https:\\www.sap.com";
				const bButtonEnabledSecondUrl = !!oData.frameUrl.value;
				updateSaveButtonEnablement(!!oData.frameUrl.value);
				assert.strictEqual(
					Element.getElementById("sapUiRtaAddIFrameDialogSaveButton").getEnabled(),
					bButtonEnabledSecondUrl,
					"Button is enabled wheen URL-Textarea is not empty"
				);
				clickOnCancel();
			}, this);
			return this.oAddIFrameDialog.open();
		});

		QUnit.test("when an url is entered", function(assert) {
			this.oAddIFrameDialog.attachOpened(async () => {
				const oUrlTextArea = Element.getElementById("sapUiRtaAddIFrameDialog_EditUrlTA");
				const oPreviewButton = Element.getElementById("sapUiRtaAddIFrameDialog_PreviewButton");
				assert.notOk(oPreviewButton.getEnabled(), "then the preview button is disabled before anything is entered");
				oUrlTextArea.setValue("someUrl");
				QUnitUtils.triggerEvent("input", oUrlTextArea.getFocusDomRef());
				this.oAddIFrameDialog._oController._oJSONModel.refresh();
				await nextUIUpdate();
				assert.ok(oPreviewButton.getEnabled(), "then the preview button is enabled after url was entered");
				assert.strictEqual(
					Element.getElementById("sapUiRtaAddIFrameDialogSaveButton").getEnabled(),
					true,
					"Then save is enabled after url was entered"
				);
				this.oAddIFrameDialog._oController.onShowPreview();
				assert.notOk(oPreviewButton.getEnabled(), "then the preview button is disabled after refreshing the preview");
				clickOnCancel();
			});
			return this.oAddIFrameDialog.open();
		});

		QUnit.test("when an url is entered and the useLegacyNavigation switch is toggled", function(assert) {
			this.oAddIFrameDialog.attachOpened(async () => {
				const oPreviewButton = Element.getElementById("sapUiRtaAddIFrameDialog_PreviewButton");
				const oUrlTextArea = Element.getElementById("sapUiRtaAddIFrameDialog_EditUrlTA");
				assert.notOk(oPreviewButton.getEnabled(), "then the preview button is disabled by default");
				const oSwitch = Element.getElementById("sapUiRtaAddIFrameDialog_UseLegacyNavigationToggle");
				oUrlTextArea.setValue("someUrl");
				oSwitch.focus();
				QUnitUtils.triggerKeyup(oSwitch.getDomRef(), KeyCodes.SPACE);
				this.oAddIFrameDialog._oController._oJSONModel.refresh();
				await nextUIUpdate();
				assert.ok(oPreviewButton.getEnabled(), "then the preview button is enabled after switch was toggled");
				this.oAddIFrameDialog._oController.onShowPreview();
				assert.notOk(oPreviewButton.getEnabled(), "then the preview button is disabled after refreshing the preview");
				clickOnCancel();
			});
			return this.oAddIFrameDialog.open();
		});

		QUnit.test("when a forbidden url is entered", function(assert) {
			this.oAddIFrameDialog.attachOpened(async function() {
				const oUrlTextArea = Element.getElementById("sapUiRtaAddIFrameDialog_EditUrlTA");
				// eslint-disable-next-line no-script-url
				oUrlTextArea.setValue("javascript:someJs");
				QUnitUtils.triggerEvent("input", oUrlTextArea.getFocusDomRef());
				await nextUIUpdate();

				assert.strictEqual(oUrlTextArea.getValueState(), "Error", "then an error is displayed");
				this.oAddIFrameDialog._oController.onShowPreview();
				assert.strictEqual(
					this.oAddIFrameDialog._oJSONModel.getProperty("/previewUrl/value"),
					"",
					"then the preview is not updated"
				);
				assert.strictEqual(
					Element.getElementById("sapUiRtaAddIFrameDialogSaveButton").getEnabled(),
					false,
					"then the save button is disabled"
				);
				clickOnCancel();
			}.bind(this));
			return this.oAddIFrameDialog.open(mTestURLBuilderData)
			.then(function(oResponse) {
				assert.strictEqual(oResponse, undefined, "then the dialog can only be closed via cancel");
			});
		});

		QUnit.test("when an empty string is entered as url", function(assert) {
			this.oAddIFrameDialog.attachOpened(async function() {
				const oUrlTextArea = Element.getElementById("sapUiRtaAddIFrameDialog_EditUrlTA");
				// Set a valure beforehand to ensure that the empty string is really refused as input
				oUrlTextArea.setValue("someValue");
				this.oAddIFrameDialog._oController.onShowPreview();
				oUrlTextArea.setValue("   ");
				QUnitUtils.triggerEvent("input", oUrlTextArea.getFocusDomRef());
				await nextUIUpdate();

				assert.strictEqual(oUrlTextArea.getValueState(), "Error", "then an error is displayed");
				this.oAddIFrameDialog._oController.onShowPreview();
				assert.strictEqual(
					this.oAddIFrameDialog._oJSONModel.getProperty("/previewUrl/value"),
					"someValue",
					"then the preview is not updated"
				);
				assert.strictEqual(
					Element.getElementById("sapUiRtaAddIFrameDialogSaveButton").getEnabled(),
					false,
					"then the save button is disabled"
				);
				clickOnCancel();
			}.bind(this));
			return this.oAddIFrameDialog.open(mTestURLBuilderData)
			.then(function(oResponse) {
				assert.strictEqual(oResponse, undefined, "then the dialog can only be closed via cancel");
			});
		});

		QUnit.test("when a url with bindings is entered", function(assert) {
			this.oAddIFrameDialog.attachOpened(async function() {
				const oUrlTextArea = Element.getElementById("sapUiRtaAddIFrameDialog_EditUrlTA");
				const oPreviewButton = Element.getElementById("sapUiRtaAddIFrameDialog_PreviewButton");
				oUrlTextArea.setValue("https://example.com/{productCategory}");
				QUnitUtils.triggerEvent("input", oUrlTextArea.getFocusDomRef());
				await nextUIUpdate();

				assert.strictEqual(oUrlTextArea.getValueState(), "None", "then it is not showing an error");
				assert.ok(oPreviewButton.getEnabled(), "then the preview button is enabled after url was entered");
				this.oAddIFrameDialog._oController.onShowPreview();
				assert.notOk(oPreviewButton.getEnabled(), "then the preview button is disabled after refreshing the preview");
				clickOnCancel();
			}.bind(this));
			return this.oAddIFrameDialog.open(mTestURLBuilderData);
		});

		QUnit.test("When OK button is clicked then the promise should return settings", function(assert) {
			this.oAddIFrameDialog.attachOpened(function() {
				aTextInputFields.forEach(function(sFieldName) {
					this.oAddIFrameDialog._oJSONModel.getData()[sFieldName].value = "Text entered";
				}, this);
				clickOnSave();
			}, this);
			return this.oAddIFrameDialog.open({
				frameUrl: "test_url"
			}).then(function(mSettings) {
				assert.strictEqual(isEmptyObject(mSettings), false, "Non empty settings returned");
				assert.strictEqual(
					mSettings.frameHeightUnit,
					"vh",
					"then vh is selected as the default frame height unit"
				);
			});
		});

		QUnit.test("When OK button is clicked then the returned settings should be correct", function(assert) {
			this.oAddIFrameDialog.attachOpened(function() {
				const oData = this.oAddIFrameDialog._oJSONModel.getData();
				oData.frameUrl.value = "https://www.sap.com/\tindex.html\r\n";
				aNumericInputFields.forEach(function(sFieldName) {
					oData[sFieldName].value = 100;
				});
				oData.frameWidthUnit.value = "rem";
				oData.frameHeightUnit.value = "vh";
				updateSaveButtonEnablement(!!oData.frameUrl.value);
				clickOnSave();
			}, this);
			return this.oAddIFrameDialog.open().then(function(mSettings) {
				assert.strictEqual(mSettings.frameUrl, "https://www.sap.com/index.html", "Setting for frameUrl is correct");
				aNumericInputFields.forEach(function(sFieldName) {
					assert.strictEqual(mSettings[sFieldName], 100, `Setting for ${sFieldName} is correct`);
				});
				assert.strictEqual(mSettings.frameWidthUnit, "rem", "Setting for frameWidthUnit is correct");
				assert.strictEqual(mSettings.frameHeightUnit, "vh", "Setting for frameHeightUnit is correct");
			});
		});

		aImportTestData.forEach(function(mData, iIndex) {
			QUnit.test(`When existing settings are passed to the dialog then they should be imported correctly, part ${iIndex + 1}`, function(assert) {
				this.oAddIFrameDialog.attachOpened(function() {
					const oData = this.oAddIFrameDialog._oJSONModel.getData();
					function checkField(sFieldName) {
						if (Array.isArray(oData[sFieldName])) {
							assert.deepEqual(oData[sFieldName], mData.expectedResults[sFieldName], `${sFieldName} is imported correctly`);
						} else {
							assert.strictEqual(oData[sFieldName].value, mData.expectedResults[sFieldName], `${sFieldName} is imported correctly`);
						}
					}
					Object.keys(mData.expectedResults).forEach(checkField);
					clickOnCancel();
				}, this);
				return this.oAddIFrameDialog.open(mData.input);
			}, this);
		});

		QUnit.test("When existing settings contain % values for the section height", function(assert) {
			this.oAddIFrameDialog.attachOpened(async function() {
				const oHeightValueArea = Element.getElementById("sapUiRtaAddIFrameDialog_HeightInput");
				oHeightValueArea.setValue("50");
				QUnitUtils.triggerEvent("input", oHeightValueArea.getFocusDomRef());
				await nextUIUpdate();
				clickOnSave();
			}, this);
			return this.oAddIFrameDialog.open({
				asContainer: true,
				frameWidth: "16px",
				frameHeight: "100%",
				frameUrl: "some_url"
			}).then(function(oSettings) {
				assert.strictEqual(
					oSettings.frameHeight,
					50,
					"then the frame height value is modified"
				);
				assert.strictEqual(
					oSettings.frameHeightUnit,
					"%",
					"then the frame height unit isn't touched if it wasn't modified"
				);
			});
		}, this);
	});

	QUnit.done(function() {
		document.getElementById("qunit-fixture").style.display = "none";
	});
});
