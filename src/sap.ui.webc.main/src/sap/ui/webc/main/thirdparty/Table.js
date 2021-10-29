sap.ui.define(['sap/ui/webc/common/thirdparty/base/UI5Element', 'sap/ui/webc/common/thirdparty/base/renderer/LitRenderer', 'sap/ui/webc/common/thirdparty/base/delegate/ResizeHandler', 'sap/ui/webc/common/thirdparty/base/delegate/ItemNavigation', 'sap/ui/webc/common/thirdparty/base/types/Integer', 'sap/ui/webc/common/thirdparty/base/types/NavigationMode', 'sap/ui/webc/common/thirdparty/base/Device', 'sap/ui/webc/common/thirdparty/base/Keys', 'sap/ui/webc/common/thirdparty/base/i18nBundle', 'sap/ui/webc/common/thirdparty/base/util/debounce', 'sap/ui/webc/common/thirdparty/base/util/isElementInView', './types/TableGrowingMode', './BusyIndicator', './types/TableMode', './generated/i18n/i18n-defaults', './generated/templates/TableTemplate.lit', './generated/themes/Table.css'], function (UI5Element, litRender, ResizeHandler, ItemNavigation, Integer, NavigationMode, Device, Keys, i18nBundle, debounce, isElementInView, TableGrowingMode, BusyIndicator, TableMode, i18nDefaults, TableTemplate_lit, Table_css) { 'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

	var UI5Element__default = /*#__PURE__*/_interopDefaultLegacy(UI5Element);
	var litRender__default = /*#__PURE__*/_interopDefaultLegacy(litRender);
	var ResizeHandler__default = /*#__PURE__*/_interopDefaultLegacy(ResizeHandler);
	var ItemNavigation__default = /*#__PURE__*/_interopDefaultLegacy(ItemNavigation);
	var Integer__default = /*#__PURE__*/_interopDefaultLegacy(Integer);
	var NavigationMode__default = /*#__PURE__*/_interopDefaultLegacy(NavigationMode);
	var debounce__default = /*#__PURE__*/_interopDefaultLegacy(debounce);
	var isElementInView__default = /*#__PURE__*/_interopDefaultLegacy(isElementInView);

	const GROWING_WITH_SCROLL_DEBOUNCE_RATE = 250;
	const metadata = {
		tag: "ui5-table",
		managedSlots: true,
		slots:  {
			"default": {
				propertyName: "rows",
				type: HTMLElement,
				individualSlots: true,
			},
			columns: {
				type: HTMLElement,
				individualSlots: true,
				invalidateOnChildChange: {
					properties: true,
					slots: false,
				},
			},
		},
		properties:  {
			noDataText: {
				type: String,
			},
			growingButtonText: {
				type: String,
			},
			 growingButtonSubtext: {
				type: String,
			},
			hideNoData: {
				type: Boolean,
			},
			growing: {
				type: TableGrowingMode,
				defaultValue: TableGrowingMode.None,
			},
			busy: {
				type: Boolean,
			},
			busyDelay: {
				type: Integer__default,
				defaultValue: 1000,
			},
			stickyColumnHeader: {
				type: Boolean,
			},
			mode: {
				type: TableMode,
				defaultValue: TableMode.None,
			},
			_hiddenColumns: {
				type: Object,
				multiple: true,
			},
			_noDataDisplayed: {
				type: Boolean,
			},
			_loadMoreActive: {
				type: Boolean,
			},
			_columnHeader: {
				type: Object,
			},
			_inViewport: {
				type: Boolean,
			},
			_allRowsSelected: {
				type: Boolean,
			},
		},
		events:  {
			"row-click": {
				detail: {
					row: { type: HTMLElement },
				},
			},
			"popin-change": {
				detail: {
					poppedColumns: {},
				},
			},
			"load-more": {},
			"selection-change": {
				detail: {
					selectedRows: { type: Array },
					previouslySelectedRows: { type: Array },
				},
			},
		},
	};
	class Table extends UI5Element__default {
		static get metadata() {
			return metadata;
		}
		static get styles() {
			return Table_css;
		}
		static get render() {
			return litRender__default;
		}
		static get template() {
			return TableTemplate_lit;
		}
		static get dependencies() {
			return [BusyIndicator];
		}
		static async onDefine() {
			Table.i18nBundle = await i18nBundle.getI18nBundle("@ui5/webcomponents");
		}
		constructor() {
			super();
			this._columnHeader = {
				id: `${this._id}-columnHeader`,
				_tabIndex: "0",
			};
			this._itemNavigation = new ItemNavigation__default(this, {
				navigationMode: NavigationMode__default.Vertical,
				affectedPropertiesNames: ["_columnHeader"],
				getItemsCallback: () => [this._columnHeader, ...this.rows],
			});
			this.fnOnRowFocused = this.onRowFocused.bind(this);
			this._handleResize = this.popinContent.bind(this);
			this.tableEndObserved = false;
			this.addEventListener("ui5-selection-requested", this._handleSelect.bind(this));
		}
		onBeforeRendering() {
			const columnSettings = this.getColumnPropagationSettings();
			const columnSettingsString = JSON.stringify(columnSettings);
			const rowsCount = this.rows.length;
			this.rows.forEach((row, index) => {
				if (row._columnsInfoString !== columnSettingsString) {
					row._columnsInfo = columnSettings;
					row._columnsInfoString = JSON.stringify(row._columnsInfo);
				}
				row._ariaPosition = Table.i18nBundle.getText(i18nDefaults.TABLE_ROW_POSITION, index + 1, rowsCount);
				row._busy = this.busy;
				row.removeEventListener("ui5-_focused", this.fnOnRowFocused);
				row.addEventListener("ui5-_focused", this.fnOnRowFocused);
				row.mode = this.mode;
			});
			this.visibleColumns = this.columns.filter((column, index) => {
				column.sticky = this.stickyColumnHeader;
				return !this._hiddenColumns[index];
			});
			this._noDataDisplayed = !this.rows.length && !this.hideNoData;
			this.visibleColumnsCount = this.visibleColumns.length;
		}
		onAfterRendering() {
			if (this.growsOnScroll) {
				this.observeTableEnd();
			}
			this.checkTableInViewport();
		}
		onEnterDOM() {
			if (!Device.isIE()) {
				this.growingIntersectionObserver = this.getIntersectionObserver();
			}
			ResizeHandler__default.register(this.getDomRef(), this._handleResize);
		}
		onExitDOM() {
			ResizeHandler__default.deregister(this.getDomRef(), this._handleResize);
			if (!Device.isIE()) {
				this.growingIntersectionObserver.disconnect();
				this.growingIntersectionObserver = null;
				this.tableEndObserved = false;
			}
		}
		onRowFocused(event) {
			this._itemNavigation.setCurrentItem(event.target);
		}
		_onColumnHeaderClick(event) {
			this.getColumnHeader().focus();
			this._itemNavigation.setCurrentItem(this._columnHeader);
		}
		_onLoadMoreKeydown(event) {
			if (Keys.isSpace(event)) {
				event.preventDefault();
				this._loadMoreActive = true;
			}
			if (Keys.isEnter(event)) {
				this._onLoadMoreClick();
				this._loadMoreActive = true;
			}
		}
		_onLoadMoreKeyup(event) {
			if (Keys.isSpace(event)) {
				this._onLoadMoreClick();
			}
			this._loadMoreActive = false;
		}
		_onLoadMoreClick() {
			this.fireEvent("load-more");
		}
		observeTableEnd() {
			if (!this.tableEndObserved) {
				this.getIntersectionObserver().observe(this.tableEndDOM);
				this.tableEndObserved = true;
			}
		}
		onInteresection(entries) {
			if (entries.some(entry => entry.isIntersecting)) {
				debounce__default(this.loadMore.bind(this), GROWING_WITH_SCROLL_DEBOUNCE_RATE);
			}
		}
		loadMore() {
			this.fireEvent("load-more");
		}
		_handleSingleSelect(event) {
			const row = this.getRowParent(event.target);
			if (!row.selected) {
				const previouslySelectedRows = this.selectedRows;
				this.rows.forEach(item => {
					if (item.selected) {
						item.selected = false;
					}
				});
				row.selected = true;
				this.fireEvent("selection-change", {
					selectedRows: [row],
					previouslySelectedRows,
				});
			}
		}
		_handleMultiSelect(event) {
			const row = this.getRowParent(event.target);
			const previouslySelectedRows = this.selectedRows;
			row.selected = !row.selected;
			const selectedRows = this.selectedRows;
			if (selectedRows.length === this.rows.length) {
				this._allRowsSelected = true;
			} else {
				this._allRowsSelected = false;
			}
			this.fireEvent("selection-change", {
				selectedRows,
				previouslySelectedRows,
			});
		}
		_handleSelect(event) {
			this[`_handle${this.mode}`](event);
		}
		_selectAll(event) {
			const bAllSelected = event.target.checked;
			const previouslySelectedRows = this.rows.filter(row => row.selected);
			this._allRowsSelected = bAllSelected;
			this.rows.forEach(row => {
				row.selected = bAllSelected;
			});
			const selectedRows = bAllSelected ? this.rows : [];
			this.fireEvent("selection-change", {
				selectedRows,
				previouslySelectedRows,
			});
		}
		getRowParent(child) {
			const parent = child.parentElement;
			if (child.hasAttribute("ui5-table-row")) {
				return child;
			}
			if (parent && parent.hasAttribute("ui5-table-row")) {
				return parent;
			}
			this.getRowParent(parent);
		}
		getColumnHeader() {
			return this.getDomRef() && this.getDomRef().querySelector(`#${this._id}-columnHeader`);
		}
		handleResize(event) {
			this.checkTableInViewport();
			this.popinContent(event);
		}
		checkTableInViewport() {
			this._inViewport = isElementInView__default(this.getDomRef());
		}
		popinContent(_event) {
			const clientRect = this.getDomRef().getBoundingClientRect();
			const tableWidth = clientRect.width;
			const hiddenColumns = [];
			const visibleColumnsIndexes = [];
			this.columns.forEach((column, index) => {
				if (tableWidth < column.minWidth && column.minWidth !== Infinity) {
					hiddenColumns[index] = {
						index,
						popinText: column.popinText,
						demandPopin: column.demandPopin,
					};
				} else {
					visibleColumnsIndexes.push(index);
				}
			});
			if (visibleColumnsIndexes.length) {
				if (!this.isMultiSelect) {
					this.columns[visibleColumnsIndexes[0]].first = true;
				}
				this.columns[visibleColumnsIndexes[visibleColumnsIndexes.length - 1]].last = true;
			}
			if (this._hiddenColumns.length !== hiddenColumns.length) {
				this._hiddenColumns = hiddenColumns;
				if (hiddenColumns.length) {
					this.fireEvent("popin-change", {
						poppedColumns: this._hiddenColumns,
					});
				}
			}
		}
		getColumnPropagationSettings() {
			return this.columns.map((column, index) => {
				return {
					index,
					minWidth: column.minWidth,
					demandPopin: column.demandPopin,
					text: column.textContent,
					popinText: column.popinText,
					visible: !this._hiddenColumns[index],
				};
			}, this);
		}
		getIntersectionObserver() {
			if (!this.growingIntersectionObserver) {
				this.growingIntersectionObserver = new IntersectionObserver(this.onInteresection.bind(this), {
					root: document,
					rootMargin: "0px",
					threshold: 1.0,
				});
			}
			return this.growingIntersectionObserver;
		}
		get styles() {
			return {
				table: {
					height: "48px",
				},
				busy: {
					position: this.busyIndPosition,
				},
			};
		}
		get growsWithButton() {
			if (Device.isIE()) {
				return this.growing === TableGrowingMode.Button || this.growing === TableGrowingMode.Scroll;
			}
			return this.growing === TableGrowingMode.Button;
		}
		get growsOnScroll() {
			return !Device.isIE() && this.growing === TableGrowingMode.Scroll;
		}
		get _growingButtonText() {
			return this.growingButtonText || Table.i18nBundle.getText(i18nDefaults.LOAD_MORE_TEXT);
		}
		get ariaLabelText() {
			const headerRowText = Table.i18nBundle.getText(i18nDefaults.TABLE_HEADER_ROW_TEXT);
			const columnsTitle = this.columns.map(column => {
				return column.textContent.trim();
			}).join(" ");
			return `${headerRowText} ${columnsTitle}`;
		}
		get ariaLabelSelectAllText() {
			return Table.i18nBundle.getText(i18nDefaults.ARIA_LABEL_SELECT_ALL_CHECKBOX);
		}
		get loadMoreAriaLabelledBy() {
			if (this.moreDataText) {
				return `${this._id}-growingButton-text ${this._id}-growingButton-subtext`;
			}
			return `${this._id}-growingButton-text`;
		}
		get tableEndDOM() {
			return this.shadowRoot.querySelector(".ui5-table-end-marker");
		}
		get busyIndPosition() {
			if (Device.isIE()) {
				return "absolute";
			}
			return this._inViewport ? "absolute" : "sticky";
		}
		get isMultiSelect() {
			return this.mode === "MultiSelect";
		}
		get selectedRows() {
			return this.rows.filter(row => row.selected);
		}
	}
	Table.define();

	return Table;

});
