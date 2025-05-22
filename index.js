// Bot Conecta Pro com whatsapp-web.js (Railway 24/7 Ready)
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: { headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] }
});

let users = {};

client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
  console.log('📲 Escaneie o QR Code acima para conectar ao WhatsApp');
});

client.on('ready', () => {
  console.log('🤖 Bot Conecta Pro está online!');
});

client.on('message', async msg => {
  const userId = msg.from;
  const text = msg.body.trim().toLowerCase();

  if (!users[userId]) {
    users[userId] = { stage: 'main_menu' };
  }

  const user = users[userId];

  if (user.stage === 'main_menu' || text === 'oi' || text === 'olá') {
    await msg.reply(
      'Conecta Pro – Internet privada, rápida e sem enrolação\n\n' +
      '📲 Baixe nosso app:\n👉 https://play.google.com/store/apps/details?id=google.android.a3\n\n' +
      '⚠️ Compatível com Android (operadoras TIM ou VIVO)\n\n' +
      'Escolha uma opção:\n' +
      '1️⃣ Testar grátis por 1 hora\n' +
      '2️⃣ Comprar acesso\n' +
      '3️⃣ Ver dúvidas frequentes\n' +
      '4️⃣ Funcionamento dos chips (TIM & VIVO)'
    );
    user.stage = 'awaiting_option';
    return;
  }

  switch (user.stage) {
    case 'awaiting_option':
      if (text === '1') {
        await msg.reply(
          '🔓 Perfeito! Você escolheu o *TESTE GRATUITO de 1 hora*.\n\n' +
          '✅ Clique no link abaixo para gerar seu teste:\n' +
          'https://conectassh.xyz/criarteste.php?token=4yvzq\n\n' +
          '📌 O teste tem validade de *60 minutos*.\n❗ O link é exclusivo e não deve ser compartilhado.\n\n' +
          'Se gostar da conexão, volte aqui e digite *2* para comprar seu plano completo.'
        );
        user.stage = 'main_menu';
      } else if (text === '2') {
        await msg.reply(
          '💳 Para comprar seu plano de 30 dias, acesse:\n\n' +
          '👉 https://conectassh.xyz/comprar.php?token=4yvzq\n\n' +
          '📝 Após o pagamento, envie o *comprovante* e o *usuário* criado para liberarmos o acesso.\n\n' +
          'Digite 0 para voltar ao menu.'
        );
        user.stage = 'awaiting_payment';
      } else if (text === '3') {
        await msg.reply(
          '📌 *Dúvidas Frequentes:*\n\n' +
          '1. *Como configurar a VPN?*\nR: Baixe o app e use seu login. Simples e direto.\n\n' +
          '2. *Onde baixo o app?*\nR: https://play.google.com/store/apps/details?id=google.android.a3\n\n' +
          '3. *E se a conexão cair?*\n- Ative o modo avião por 3 segundos\n- Desative\n- Reconecte\n\n' +
          '4. *Como renovar?*\nR: Pelo app, na opção "Renovar".\n\n' +
          'Ou renove por aqui se preferir.\nDigite 0 para voltar ao menu.'
        );
        user.stage = 'awaiting_option';
      } else if (text === '4') {
        await msg.reply(
          '📡 *Funcionamento dos Chips (TIM & VIVO)*\n\n' +
          '✅ *Vantagens com chip TIM:*\n- Sem recarga\n- Sem proxies instáveis\n- Sem CDNs lentas\n\n' +
          '⚙️ *Como usar o chip TIM:*\n1. Pegue um chip TIM sem créditos\n2. Não cadastre o chip\n3. Ative a conexão no app\n4. Se não conectar, ative e desative o modo avião ✈️\n\n' +
          '🔄 Se o chip já estiver cadastrado, aguarde o saldo expirar e use normalmente.\n\n' +
          '🟣 *Sobre chips VIVO:*\n- Se estiver sem saldo, use Gcloud (vivo-g1 ou vivo-g2)\n- Se não funcionar, será necessário ter saldo válido\n\n' +
          '💡 A VIVO exige chip ativo. Mantenha com saldo ou use chip novo.\n\n' +
          '🛡️ *Recomendação final:*\nUse chips *não cadastrados* sempre que possível para garantir estabilidade e durabilidade.\n*(Válido apenas para chips da TIM)*\n\nDigite 0 para voltar ao menu.'
        );
        user.stage = 'awaiting_option';
      } else if (text === '0') {
        user.stage = 'main_menu';
        await msg.reply('🔁 Voltando ao menu principal...');
      } else {
        await msg.reply('❌ Opção inválida. Digite 1, 2, 3, 4 ou 0 para voltar.');
      }
      break;

    case 'awaiting_payment':
      if (text === '0') {
        user.stage = 'main_menu';
        await msg.reply('🔁 Voltando ao menu principal...');
      } else {
        await msg.reply(
          '✅ Pagamento confirmado!\n\n📡 Aqui estão seus dados de acesso:\n\n' +
          '🔗 Host: conecta.pro\n👤 Login: [usuário criado pelo cliente]\n🔐 Senha: [definida pelo cliente]\n📆 Validade: 30 dias\n\n📲 Use o app para renovar de forma antecipada se quiser!'
        );
        user.stage = 'main_menu';
      }
      break;
  }
});

client.initialize();
