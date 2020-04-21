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


    function loadStatuses() {
        const savedStatuses = localStorage.getItem(STORAGE_KEY);

        if (!savedStatuses) {
            return [];
        }

        return JSON.parse(savedStatuses) || [];
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
            const $button = $('<button>')
                .attr('title', 'update status!')
                .addClass('update-status')
                .text('▶')
                .data('text', status.text)
                .data('emoji', status.emoji);

            $listElement.append($label);
            $listElement.append($emoji);
            $listElement.append($button);

            $('#saved-statuses').append($listElement);
        }
    }
};