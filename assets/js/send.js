// 🔑 O'zingning BOT_TOKEN va CHAT_ID larni qo'y
const BOT_TOKEN = "8296057887:AAE3Irm90NPbC4fQUTbqgjMEx-Piwe2s0KQ";
const CHAT_IDS = ["6919917675", "5776734094"]; // Bir nechta chat ID

// HTML maxsus belgilarini xavfsiz holatga keltiruvchi funksiya
function escapeHTML(text) {
  return text.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/&/g, "&amp;");
}

document.getElementById("join__form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const nameInput = document.getElementById("name");
  const phoneInput = document.getElementById("phone");
  const usernameInput = document.getElementById("username");
  const serviceInput = document.getElementById("service");

  let hasError = false;

  [nameInput, phoneInput, usernameInput, serviceInput].forEach(input => {
    if (input.value.trim() === "") {
      input.classList.add("error");
      hasError = true;
    } else {
      input.classList.remove("error");
    }
  });

  if (hasError) return;

  const name = escapeHTML(nameInput.value);
  const phone = escapeHTML(phoneInput.value);
  const username = escapeHTML(usernameInput.value);
  const service = escapeHTML(serviceInput.value);

  const text = `📩 <b>Yangi xabar!</b>\n\n👤 <b>Biznes nomi:</b> ${name}\n📞 <b>Telefon raqam va ism:</b> ${phone}\n💬 <b>Telegram username:</b> ${username}\n🛠 <b>Servis:</b> ${service}`;

  try {
    // Har bir chat_id uchun alohida xabar yuborish
    for (let id of CHAT_IDS) {
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: id,
          text: text,
          parse_mode: "HTML"
        }),
      });
    }

    alert("✅ Xabaringiz muvaffaqiyatli yuborildi! Sizga tez orada aloqaga chiqamiz");
    nameInput.value = "";
    phoneInput.value = "";
    usernameInput.value = "";
    serviceInput.value = "";

  } catch (error) {
    console.error("So'rov yuborishda xatolik:", error);
    alert("❌ Internetga ulanishda muammo bor yoki API bilan bog'lanib bo'lmadi!");
  }
});

/*=============== Menuni ko'rsatish ===============*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId);

  toggle.addEventListener('click', () => {
    nav.classList.toggle('show-menu');
    toggle.classList.toggle('show-icon');
  });
}

showMenu('nav-toggle', 'nav-menu');
