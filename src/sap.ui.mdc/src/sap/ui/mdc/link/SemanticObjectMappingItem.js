/*!
 * ${copyright}
 */

sap.ui.define([
	'sap/ui/core/Element'
], function(Element) {
	"use strict";

	/**
	 * Constructor for a new SemanticObjectMappingItem.
	 *
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] initial settings for the new control
	 * @class Type for...
	 * @extends sap.ui.core.Element
	 * @version ${version}
	 * @constructor
	 * @private
	 * @since 1.58.0
	 * @alias sap.ui.mdc.link.SemanticObjectMappingItem
	 * @deprecated since version 1.120 - please see {@link sap.ui.mdc.ushell.SemanticObjectMappingItem}
	 */
	const SemanticObjectMappingItem = Element.extend("sap.ui.mdc.link.SemanticObjectMappingItem", /** @lends sap.ui.mdc.link.SemanticObjectMappingItem.prototype */
	{
		metadata: {
			library: "sap.ui.mdc",
			properties: {
				key: {
					type: "string"
				},
				value: {
					type: "any"
				}
			}
		}
	});

	return SemanticObjectMappingItem;

});
