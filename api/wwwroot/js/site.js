const STORAGE_KEY = 'slack-statuses';

window.initStatusScript = () => {
    const savedStatuses = loadStatuses();
    createList(savedStatuses);

    $(document).on('click', '#add', () => {
        const text = $('#statustext').val();
        const emoji = $('#statusemoji').val();

        if (text && emoji) {
            const savedStatuses = loadStatuses();

            savedStatuses.push({
                id: genUUID(),
                text,
                emoji
            });

            saveStatuses(savedStatuses);
            createList(savedStatuses);

            $('#statustext').val('');
            $('#statusemoji').val('');
        }
    });

    $(document).on('click', '.update-status', (evt) => {
        const $btn = $(evt.target);

        const text = $btn.data('text');
        const emoji = $btn.data('emoji');

        if (text && emoji) {
            const linkId = $('[name=linkId]').val();
            const statustext = encodeURIComponent(text);
            const statusemoji = encodeURIComponent(emoji);

            $.post(`/api/slack/status?linkId=${linkId}&statustext=${statustext}&statusemoji=${statusemoji}`);
        }
    });

    $(document).on('click', '.remove-status', (evt) => {
        const $btn = $(evt.target);

        const id = $btn.data('id');

        if (id) {
            const savedStatuses = loadStatuses();
            const newStatuses = savedStatuses.filter(s => s.id !== id);

            saveStatuses(newStatuses);
            createList(newStatuses);
        }
    });


    function loadStatuses() {
        const savedStatuses = localStorage.getItem(STORAGE_KEY);

        if (!savedStatuses) {
            return [{ id: genUUID(), text: 'Coffee break', emoji: ':coffee:'}];
        }

        return JSON.parse(savedStatuses);
    }

    function saveStatuses(statuses) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(statuses || []));
    }

    function createList(savedStatuses) {
        $('#saved-statuses').html('');

        for (const status of savedStatuses) {
            const $listElement = $('<div class="status-list-item"/>');
            const $label = $('<span class="status-text"/>').text(status.text);
            const $emoji = $('<span class="status-emoji"/>').text(status.emoji);
            const $updatebutton = $('<button class="update-status">')
                .attr('title', 'update status!')
                .addClass('update-status')
                .text('▶')
                .data('id', status.id)
                .data('text', status.text)
                .data('emoji', status.emoji);

            const $removebutton = $('<button class="remove-status">')
                .attr('title', 'remove status')
                .text('🗑')
                .data('id', status.id)

            $listElement.append($label);
            $listElement.append($emoji);
            $listElement.append($updatebutton);
            $listElement.append($removebutton);

            $('#saved-statuses').append($listElement);
        }
    }

    function genUUID() {
        // Reference: https://stackoverflow.com/a/2117523/709884
        return ("10000000-1000-4000-8000-100000000000").replace(/[018]/g, s => {
            const c = Number.parseInt(s, 10)
            return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        })
    }
};