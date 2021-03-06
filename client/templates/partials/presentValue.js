Template.presentValue.created = function () {
  this.editing = new ReactiveVar;
  this.editing.set(false);
}

Template.presentValue.helpers({
  "editing": function () {
    return Template.instance().editing.get();
  }
});

// Detailed item description events (editing)
Template.presentValue.events({
  "submit form": function (event, template) {
    var textF, text, newData, refId, dbName;
    textF = template.find( ".edit" );
    text = textF.value;

    newData = {};
    newData[dbName] = text;
    Meteor.call("editItem", this.refId, this.dbName, text,
      function (error) {
        if (error) {
          Flash.danger(error);
        }
        else {
          Flash.success("Edit successful");
        }
      }
    );
    Meteor.call("methodName", function (error) {
      if (error.error === "logged-out") {
        Session.set("errorMessage", "Please log in to post a comment.");
      }
    });
    template.editing.set(false);
    return false;
  },
  "click .toggleEdit": function(event, template) {
    var current = template.editing.get();
    template.editing.set(!current);
  }
});