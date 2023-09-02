const sendTelegramMessage = async function (form) {

    const buttonName = $(form).closest("form").find("input[type=hidden]").val();
    const name = $(form).closest("form").find("input[name='name']").val();
    const phone = $(form).closest("form").find("input[name='phone']").val();

    return fetch('https://team404kyiv.club/telegram_bot/message/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            data: {
                text: `<b><u>ОТРИМАНО ЗАЯВКУ КОРИСТУВАЧА</u></b>\n
<b>Ім'я: </b> <i>${name}</i>\n
<b>Телефон: </b> <i>${phone}</i>\n
<b>Форма: </b> <i>"${buttonName}"</i>\n
<b>Мова:</b> <i>Українська</i>`,
                options: { parse_mode: 'HTML' }
            }
        })
    }).then(() => true);
}