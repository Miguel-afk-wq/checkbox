document.addEventListener('DOMContentLoaded', () => {
    // 1. Selecionar todos os elementos relevantes
    const taskList = document.getElementById('task-list');
    const checkboxes = taskList.querySelectorAll('input[type="checkbox"]');
    const totalTasks = checkboxes.length;
    
    // Elementos da barra de progresso
    const progressBar = document.getElementById('progress-bar');
    const progressBarInner = progressBar.querySelector('::before'); // Não funciona diretamente
    const progressText = document.getElementById('progress-text');
    
    // Para manipular o ::before, vamos usar uma variável CSS customizada.
    // É uma técnica mais limpa para manipular pseudo-elementos via JS.
    const rootStyle = document.documentElement.style;
    
    // Função principal para calcular e atualizar o progresso
    function updateProgress() {
        // Conta as tarefas completadas
        const completedTasks = taskList.querySelectorAll('input[type="checkbox"]:checked').length;
        
        // Calcula a porcentagem
        const percentage = totalTasks > 0 
            ? Math.round((completedTasks / totalTasks) * 100) 
            : 0;
        
        // 2. Atualiza a barra de progresso (CSS)
        // Setando a largura no elemento root que é herdado pelo pseudo-elemento ::before
        // NOTA: No CSS, troquei o seletor #progress-bar::before para usar o background do #progress-bar
        // e mudei a estratégia no JS para simplificar.
        
        const barInner = progressBar.querySelector('::before');
        
        // Vamos usar a propriedade style diretamente no #progress-bar (sem o ::before para simplificar)
        // Alterando o CSS para que a cor seja diretamente o fundo, e a largura mude.
        
        // 2.1. Atualiza a largura
        // Vamos aplicar o estilo da largura na div #progress-bar diretamente, 
        // mas é preciso remover o ::before do CSS e JS.
        // A maneira mais simples é modificar o CSS para que a div #progress-bar tenha 
        // um elemento interno que de fato mude de tamanho.
        
        // Vamos refazer a parte HTML e CSS para simplificar a manipulação no JS.

        // MUDANÇA NO HTML:
        // <div id="progress-bar"><div id="progress-fill"></div></div>
        
        // MUDANÇA NO CSS:
        // #progress-bar { ... }
        // #progress-fill { height: 100%; width: 0%; background-color: #28a745; border-radius: 12px; transition: width 0.4s ease-in-out; }

        // MODO MAIS FÁCIL (mantendo o HTML original, mas manipulando a propriedade CSS `width` do pseudo-elemento através de uma **variável CSS customizada** no elemento pai):
        progressBar.style.setProperty('--progress-width', `${percentage}%`);

        // 3. Atualiza o texto
        progressText.textContent = `${percentage}% Seguro`;
        
        // Extra: Mudar a cor do texto/progresso dependendo da porcentagem
        if (percentage < 50) {
             progressText.style.color = '#dc3545'; // Vermelho
        } else if (percentage < 100) {
             progressText.style.color = '#ffc107'; // Amarelo
        } else {
             progressText.style.color = '#28a745'; // Verde
        }
    }
    
    // 4. Adiciona um Listener de Evento para todas as caixas de seleção
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateProgress);
    });
    
    // 5. Inicializa o progresso ao carregar a página
    updateProgress();
    
    // Implementação dos botões de exclusão (opcional, mas bom para manter a funcionalidade)
    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-button')) {
            e.target.closest('.task-item').remove();
            // Após remover, recalcula o progresso
            updateProgress();
        }
    });
});