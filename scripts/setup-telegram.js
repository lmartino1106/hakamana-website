/**
 * Script para registrar el webhook de Telegram
 * Uso: node scripts/setup-telegram.js
 *
 * Requiere en .env.local:
 *   TELEGRAM_BOT_TOKEN=tu_token_de_botfather
 *   TELEGRAM_ADMIN_CHAT_ID=tu_chat_id (opcional)
 */

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const DOMAIN = process.env.NEXT_PUBLIC_SITE_URL || "https://www.hakamana.cl";

if (!TOKEN) {
  console.error("❌ Falta TELEGRAM_BOT_TOKEN en .env.local");
  process.exit(1);
}

async function setup() {
  const webhookUrl = `${DOMAIN}/api/telegram/webhook`;

  // Registrar webhook
  const res = await fetch(`https://api.telegram.org/bot${TOKEN}/setWebhook`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: webhookUrl, allowed_updates: ["message"] }),
  });
  const data = await res.json();

  if (data.ok) {
    console.log(`✅ Webhook registrado en: ${webhookUrl}`);
  } else {
    console.error("❌ Error:", data.description);
  }

  // Obtener info del bot
  const infoRes = await fetch(`https://api.telegram.org/bot${TOKEN}/getMe`);
  const info = await infoRes.json();
  if (info.ok) {
    console.log(`🤖 Bot: @${info.result.username}`);
    console.log(`📱 Abre Telegram y busca @${info.result.username} para empezar`);
  }
}

setup();
