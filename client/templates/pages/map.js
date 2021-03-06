import { LeafletDataLayer } from '../../js/LeafletDataLayer'
import { LeafletMap } from "../../js/LeafletMap";

// on startup run resizing event
Meteor.startup(function() {
	$(window).resize(function() {
		$('#map').css('height', window.innerHeight - 82);
	});

	$(window).resize(); // trigger resize event
});

// create marker collection
Meteor.subscribe('areas');


Template.mapPage.rendered = function() {

	$('#map').css('height', window.innerHeight - 82);

	var leafletMap = new LeafletMap("map");
	Meteor.subscribe('layers');
	Layers.find().observe({
		added: $.proxy(function (newDocument) {
			leafletMap.addDataLayer(new LeafletDataLayer(newDocument.title, newDocument._id));
		}, leafletMap),
		removed: $.proxy(function (oldDocument) {
			this.removeDataLayer(oldDocument._id);
		}, leafletMap),
		changed: $.proxy(function (newDocument, oldDocument) {

			var oldDataLayerName = this.currentDataLayer.layerName;
			var newDataLayer = new LeafletDataLayer(newDocument.title, newDocument._id);

			this.removeDataLayer(oldDocument._id);
			this.addDataLayer(newDataLayer);
		}, leafletMap)

	});
};
