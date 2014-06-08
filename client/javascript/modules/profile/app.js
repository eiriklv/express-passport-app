exports = module.exports = function (templates, api) {

    function bindToEvent (options) {
        var parent = $(options.element);
        parent.on(options.eventType, options.elementType, function (event) {
            event.preventDefault();

            var element = $(event.target);
            var action = element.attr('data-action');

            if(options.handlers[action]) options.handlers[action](element, parent, options.templates);
        });
    }

    function loadProfileData (container) {
        $(container)
            .empty()
            .append(templates.common.spinner());

        api.profile.get(function (err, user) {
            $(container)
                .empty()
                .append(templates.profile.data({
                    user: user
                }));
        });
    }

    // bind event handlers to the button panel
    bindToEvent({
        element: '#button-panel',
        eventType: 'click',
        elementType: '.btn',
        templates: templates,
        handlers: {
            update: function (target, parent, templates) {
                api.profile.get(function (err, user) {
                    if (err) return console.log(err);

                    var renderedData = templates.profile.modal.edit({ user: user });
                    $('#action-modal').empty().append(renderedData).modal();
                });
            }
        }
    });

    // bind event handlers to the action modal / update form
    bindToEvent({
        element: '#action-modal',
        eventType: 'click',
        elementType: '.btn',
        templates: templates,
        handlers: {
            update: function (target, parent, templates) {
                target.empty().append(templates.common.loader());

                var body = $('form', parent).serializeObject();

                api.profile.update(body, function (err, user) {
                    if (err) {
                        alertify.error(err);
                        target.empty().append('Update Profile');
                        return;
                    }

                    parent.modal('hide');
                    alertify.success('Profile updated!');
                    console.log(user);
                });
            }
        }
    });

    // init the app
    loadProfileData('#main');
};