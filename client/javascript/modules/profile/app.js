exports = module.exports = function (templates, api) {

    function bindToClickEvents (list, modal) {
        // bind to click event on .btn elements under #source-list
        $(list).on('click', '.btn', function (event) {
            event.preventDefault();

            var element = $(event.target);
            var action = element.attr('data-action');
            console.log('action: ' + action);

            handleButtonClick(action, element);
        });

        // bind to button events for modal
        $(modal).on('click', '.btn', function (event) {
            event.preventDefault();

            var element = $(event.target);
            var action = element.attr('data-action');

            handleAction(action, element);
        });
    }

    // perform a request for the action (add, remove, edit, template)
    function handleAction (action, element) {
        var modalElement = $('#action-modal');

        console.log('action: ' + action);

        element.empty().append(templates.common.loader());

        if (action == 'update') {
            var body = $('#update-form').serializeObject();

            api.profile.update(body, function (err, user) {
                if (err) {
                    alertify.error(err);
                    element.empty().append('Update Profile');
                    return;
                }

                modalElement.modal('hide');
                alertify.success('Profile updated!');
                console.log(user);
            });
        }
    }

    // handle the initial button clicks
    function handleButtonClick (action, element) {
        if (action == 'update') {
            renderModal(action, templates.profile.modal.edit);
        }
    }

    function renderModal (action, template, options) {
        var modalElement = $('#action-modal');

        // use template to add data to modal
        api.profile.get(function (err, user) {
            if (err) return console.log(err);

            var dataRendered = template({
                user: user
            });

            modalElement.empty().append(dataRendered);
            modalElement.modal();
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

    // init the app
    loadProfileData('#main');
    bindToClickEvents('#button-panel', '#action-modal');
};