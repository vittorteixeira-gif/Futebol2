/**
 * NEOFOOTBALL_OS // Script Tático e Interatividade
 * Versão: 3.0.42
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initButtons();
    initTacticalNodes();
    initRealTimeMetrics();
    initTerminalFeed();
});

/* ==========================================================================
   1. NAVEGAÇÃO SUAVE E ESTADOS DOS LINKS
   ========================================================================== */
function initNavigation() {
    const navLinks = document.querySelectorAll('.cyber-nav .nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
}

/* ==========================================================================
   2. INTERAÇÃO DOS BOTÕES
   ========================================================================== */
function initButtons() {
    const btnNexus = document.getElementById('btn-nexus');
    const btnTelemetry = document.getElementById('btn-telemetry');

    if (btnNexus) {
        btnNexus.addEventListener('click', () => {
            appendTerminalLog('sys-ok', '[CONEXÃO]', 'Sincronização de dados biométricos estabelecida com sucesso.');
            alert('// CONEXÃO ESTABELECIDA: Dados táticos sincronizados em tempo real.');
        });
    }

    if (btnTelemetry) {
        btnTelemetry.addEventListener('click', () => {
            appendTerminalLog('sys-info', '[TELEMETRIA]', 'Varredura de satélite ativa. Rastreando 22 nós em campo.');
            const statsSection = document.getElementById('stats');
            if (statsSection) {
                statsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

/* ==========================================================================
   3. SIMULADOR DE JOGADORES NO CAMPO TÁTICO
   ========================================================================== */
function initTacticalNodes() {
    const players = document.querySelectorAll('.node-player');

    players.forEach(player => {
        // Exibir nome do jogador ao clicar
        player.addEventListener('click', () => {
            const playerName = player.getAttribute('data-player') || 'Atleta Biónico';
            appendTerminalLog('sys-info', '[ATLETA]', `Inspecionando métricas de: ${playerName}`);
            
            // Efeito visual temporário
            player.style.boxShadow = '0 0 25px var(--neon-green)';
            setTimeout(() => {
                player.style.boxShadow = '0 0 10px var(--neon-blue)';
            }, 1000);
        });
    });

    // Animação sutil de movimentação tática
    setInterval(() => {
        players.forEach(player => {
            if (player.textContent !== 'GK') { // Goleiro fica fixo
                const randomX = (Math.random() - 0.5) * 4;
                const randomY = (Math.random() - 0.5) * 4;
                player.style.transform = `translate(calc(-50% + ${randomX}px), calc(-50% + ${randomY}px))`;
            }
        });
    }, 2000);
}

/* ==========================================================================
   4. ATUALIZAÇÃO DE MÉTRICAS EM TEMPO REAL
   ========================================================================== */
function initRealTimeMetrics() {
    const possessionElement = document.getElementById('possession-val');

    setInterval(() => {
        if (possessionElement) {
            // Flutuação realista da posse de bola (entre 60% e 75%)
            const currentVal = parseFloat(possessionElement.textContent);
            const variation = (Math.random() - 0.5) * 1.5;
            const newVal = Math.min(Math.max(currentVal + variation, 60.0), 75.0).toFixed(1);
            
            possessionElement.textContent = `${newVal}%`;
        }
    }, 4000);
}

/* ==========================================================================
   5. ALIMENTAÇÃO DINÂMICA DO TERMINAL (LOGS)
   ========================================================================== */
const logTemplates = [
    { type: 'sys-ok', tag: '[EVENTO]', text: 'Passe de alta precisão computado no setor central.' },
    { type: 'sys-warn', tag: '[ALERTA]', text: 'Frequência cardíaca do atleta #09 acima do limiar ideal.' },
    { type: 'sys-info', tag: '[IA]', text: 'Novo padrão tático detectado na equipe adversária.' },
    { type: 'sys-ok', tag: '[MERCADO]', text: 'Proposta criptografada recebida por Neo_Striker_09.' },
    { type: 'sys-info', tag: '[ESTATÍSTICA]', text: 'Velocidade de chute registrada: 112.8 km/h.' }
];

function initTerminalFeed() {
    setInterval(() => {
        const randomLog = logTemplates[Math.floor(Math.random() * logTemplates.length)];
        appendTerminalLog(randomLog.type, randomLog.tag, randomLog.text);
    }, 6000);
}

function appendTerminalLog(typeClass, tagText, messageText) {
    const terminalBody = document.getElementById('terminal-content');
    if (!terminalBody) return;

    const now = new Date();
    const timeStr = `[${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}]`;

    const newLog = document.createElement('p');
    newLog.className = 'log-line';
    newLog.innerHTML = `<span class="timestamp">${timeStr}</span> <span class="${typeClass}">${tagText}</span> ${messageText}`;

    terminalBody.appendChild(newLog);

    // Manter o terminal com no máximo 8 linhas para não quebrar o layout
    while (terminalBody.children.length > 8) {
        terminalBody.removeChild(terminalBody.firstChild);
    }
}
