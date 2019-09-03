sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/model/json/JSONModel',
	"sap/m/MessageToast",
	"sap/m/MessageBox"
], function(Controller, JSONModel, MessageToast, MessageBox) {
	"use strict";
	var oModel;
	return Controller.extend("pushjob.com.brzwiki_wizard.controller.View1", {

		onInit: function() {
			var sServiceUrl = "/sap/opu/odata/sap/ZWIKI_WIZARD_SRV/";
			oModel = new sap.ui.model.odata.ODataModel(sServiceUrl);
			this.getView().setModel(oModel);
		},
		sendmessage: function(sMessage, sMessageBoxType) {
			//Get the text and the user...
			var user = this.getView().byId('__input4').getSelectedKey();
			var message = this.getView().byId('__area0').getValue();
			if (message) {
				MessageBox["warning"]("Do you want to send your message now?", {
					actions: [MessageBox.Action.YES, MessageBox.Action.NO],
					onClose: function(oAction) {
						if (oAction === MessageBox.Action.YES) {
							//Send it...
							var oEntry = {};
							//Please do it on a "more beatifull" way here rsrs ;)
							var key = "/TUsersSet(" + "'" + user + "'" + ")";
							oEntry.Uname = user;
							oEntry.Fullname = "";
							oEntry.Message = message;
							//Here you could also get the return from the backend, now just simple returns...
							oModel.update(key, oEntry, null, function() {
									MessageBox.success(
										"Message sent successfully!", {}
									);
								},
								function() {
									MessageBox.success(
										"Message not delivered!", {}
									);
								});
						}
					}.bind(this)
				});
			}
		},
		back: function() {
			this.getView().byId('CreateMessageWizard').previousStep();
		}
	});
});