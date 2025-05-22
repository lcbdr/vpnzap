const venom = require('venom-bot');

let users = {};

venom
  .create({
    session: 'bot-conecta-pro',
    headless: false,
    useChrome: true,
    browserPathExecutable: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    browserArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
    disableSpins: true,
    disableWelcome: true,
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.error('Erro ao iniciar o Venom:', erro);
  });

function start(client) {
  console.log('🤖 Bot Conecta Pro iniciado com sucesso!');

  client.onMessage(async (message) => {
    const userId = message.from;
    const msg = message.body.trim().toLowerCase();

    if (!users[userId]) {
      users[userId] = { stage: 'main_menu' };
    }

    const user = users[userId];

    if (user.stage === 'main_menu' || msg === 'oi' || msg === 'olá') {
      await client.sendText(userId,
        'Conecta Pro – Internet privada, rápida e sem enrolação\n\n📲 Baixe nosso app:\n👉 https://play.google.com/store/apps/details?id=google.android.a3\n\n⚠️ Compatível com Android (operadoras TIM ou VIVO)\n\nEscolha uma opção:\n1️⃣ Testar grátis por 1 hora\n2️⃣ Comprar acesso\n3️⃣ Ver dúvidas frequentes\n4️⃣ Funcionamento dos chips (TIM & VIVO)'
      );
      user.stage = 'awaiting_option';
      return;
    }

    switch (user.stage) {
      case 'awaiting_option':
        if (msg === '1') {
          await client.sendText(userId,
            '🔓 Perfeito! Você escolheu o *TESTE GRATUITO de 1 hora*.\n\n✅ Clique no link abaixo para gerar seu teste:\nhttps://conectassh.xyz/criarteste.php?token=4yvzq\n\n📌 O teste tem validade de *60 minutos*.\n❗ O link é exclusivo e não deve ser compartilhado.\n\nSe gostar da conexão, volte aqui e digite *2* para comprar seu plano completo.'
          );
          user.stage = 'main_menu';
        } else if (msg === '2') {
          await client.sendText(userId,
            '💳 Perfeito! Para comprar seu plano de 30 dias, acesse o link abaixo e crie seu usuário:\n\n👉 https://conectassh.xyz/comprar.php?token=4yvzq\n\n📝 Após realizar o pagamento, envie aqui mesmo o *comprovante* e seu *usuário* criado no painel para validarmos e liberarmos seu acesso mensal. 🚀\n\nDigite 0 para voltar ao menu principal.'
          );
          user.stage = 'awaiting_payment_confirmation';
        } else if (msg === '3') {
          await client.sendText(userId,
            '📌 Dúvidas Frequentes:\n\n1. *Como configurar a VPN?*\nR: Baixe o app e use seu login. Simples e direto.\n\n2. *Onde baixo o app?*\nR: https://play.google.com/store/apps/details?id=google.android.a3\n\n3. *E se a conexão cair?*\n- Ative o modo avião por 3 segundos\n- Desative\n- Reconecte\n\n4. *Como renovar?*\nR: Pelo app. Clique em "Renovar", siga os passos.\n\nOu renove por aqui com a gente se preferir.\n\nDigite 0 para voltar ao menu principal.'
          );
          user.stage = 'awaiting_option';
        } else if (msg === '4') {
          await client.sendText(userId,
            '📡 Funcionamento dos Chips (TIM & VIVO)\n\n✅ *Vantagens com chip TIM:*\n- Sem recarga\n- Sem proxies instáveis\n- Sem CDNs lentas\n\n⚙️ *Como usar o chip TIM:*\n1. Pegue um chip TIM sem créditos\n2. Não cadastre o chip\n3. Ative a conexão no app\n4. Se não conectar, ative e desative o modo avião ✈️\n\n🔄 Se o chip já estiver cadastrado, aguarde o saldo expirar e use normalmente.\n\n🟣 *Sobre chips VIVO:*\n- Se estiver sem saldo, use Gcloud (vivo-g1 ou vivo-g2)\n- Se não funcionar, será necessário ter saldo válido\n\n💡 A VIVO exige chip ativo. Mantenha com saldo ou use chip novo.\n\n🛡️ *Recomendação final:*\nUse chips *não cadastrados* sempre que possível para garantir estabilidade e durabilidade.\n*(Válido apenas para chips da TIM)*\n\nDigite 0 para voltar ao menu principal.'
          );
          user.stage = 'awaiting_option';
        } else if (msg === '0') {
          user.stage = 'main_menu';
          await client.sendText(userId,
            'Conecta Pro – Internet privada, rápida e sem enrolação\n\n📲 Baixe nosso app:\n👉 https://play.google.com/store/apps/details?id=google.android.a3\n\n⚠️ Compatível com Android (operadoras TIM ou VIVO)\n\nEscolha uma opção:\n1️⃣ Testar grátis por 1 hora\n2️⃣ Comprar acesso\n3️⃣ Ver dúvidas frequentes\n4️⃣ Funcionamento dos chips (TIM & VIVO)'
          );
        } else {
          await client.sendText(userId, 'Por favor, escolha uma opção válida: 1, 2, 3, 4 ou 0 para voltar.');
        }
        break;

      case 'awaiting_payment_confirmation':
        if (msg === '0') {
          user.stage = 'main_menu';
          await client.sendText(userId,
            'Conecta Pro – Internet privada, rápida e sem enrolação\n\n📲 Baixe nosso app:\n👉 https://play.google.com/store/apps/details?id=google.android.a3\n\n⚠️ Compatível com Android (operadoras TIM ou VIVO)\n\nEscolha uma opção:\n1️⃣ Testar grátis por 1 hora\n2️⃣ Comprar acesso\n3️⃣ Ver dúvidas frequentes\n4️⃣ Funcionamento dos chips (TIM & VIVO)'
          );
        } else {
          await client.sendText(userId,
            '✅ Pagamento confirmado!\n\n📡 Aqui estão seus dados de acesso:\n\n🔗 Host: conecta.pro\n👤 Login: [usuário criado pelo cliente]\n🔐 Senha: [definida pelo cliente]\n📆 Validade: 30 dias\n\n📲 Use o app para renovar de forma antecipada se quiser!'
          );
          user.stage = 'main_menu';
        }
        break;
    }
  });
}