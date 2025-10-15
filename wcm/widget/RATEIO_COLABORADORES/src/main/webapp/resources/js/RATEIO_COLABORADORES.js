/*
 * ANALISTA RICARDO ANDRADE                                
 * 24.11.v05 
 */
var USER, subMAIL, userCode, cargoAprovador, qCargo, qMail, xData,
   PWSD, userNome, userMail, COMPANY, myInstance, myModalOBS, myLoading, qSO, gOBS = '',
   xMSGClick = 'Click sobre a linha da relação abaixo para aprovação individual',
   server, userId, myURL, datasetFilhos, qBrowser, mydata,
   myTable,
   totWFS = 0, totRET = 0;


var rateioCOLABORADORES = SuperWidget.extend({
   init: function() {
      // TIPO DE USUARIO
      myLoading = FLUIGC.loading(window, {
         textMessage: 'Processando...'
      });
      var tipUSU = tipoUSUARIO();
      if(!tipUSU) {
         $('.super-widget').hide();
         FLUIGC.toast({
            message: 'Usuário sem permissão de acesso. Favor verificar seu cadastro no grupo grp_RATEIO_COLABORADORES.',
            type: 'danger'
         });
         return false;
      } else {
         // VERIFICA SE EH MOBILE OU WEB
         qSO = isMobile();
         if(qSO !== 'mobile') {
            // VERIFICA QUAL O NAVEGADOR EM USO
            qBrowser = getBrowserName();
            if((qBrowser !== 'Chrome' && qSO == 'web') && qBrowser !== 'Safari' && qBrowser !== 'unknown')
               FLUIGC.toast({
                  message: 'Navegador não homologado:' + qBrowser,
                  type: 'warning'
               });
         } else {
            // NAO EH PERMITIDO EDITAR EM MOBILE
            FLUIGC.toast({
               message: 'Edição não permitida em dispositivos móveis.',
               type: 'warning'
            });
            return false;
         }

         // DATASET COM USUARIO E SENHA DO USUARIO ADM
         var ds_usuarioIntegrador = DatasetFactory.getDataset("DS_USUARIO_INTEGRADOR");
         USER = ds_usuarioIntegrador.values[0]["user"];
         PWSD = ds_usuarioIntegrador.values[0]["password"];

         // DADOS DO USUARIO APROVADOR
         server         = WCMAPI.serverURL;
         COMPANY        = WCMAPI.getOrganizationId();
         userNome       = WCMAPI["user"];
         userMail       = WCMAPI["userEmail"];
         ApprovalID     = WCMAPI["userId"];
         userCode       = WCMAPI["userCode"];
         cargoAprovador = '';

         $('#userNOME')[0].innerHTML = userNome.toUpperCase();
         $('#imgCOLABORADOR')[0].src = server + '/social/api/rest/social/image/profile/' + userCode + '/SMALL_PICTURE';

         // CARREGAR TABELA COM PENDENCIAS
         myInstance = this.instanceId;

         // CARREGAR TAREFAS
         myLoading.show();
         setTimeout(function() {
            loadTable();
            ajustaCSSCards();
         }, 300);
      }
   }
});

function loadTable(){
   // INICIAR PROCEDIMENTO DE CARREGAR APROVACOES
   userId;
   myURL;
   
   // PASSO 1 - INICIALIZAR VARIAVEIS
   var that = this,
      record;
   //
   mydata      = [];
   myLoading.hide();
}

function tipoUSUARIO() {
   // CONFIGURAR ACESSO MENUS DE ACORDO COM OS GRUPOS DE USUARIOS
   // (grp_RATEIO_COLABORADORES)
   var adm = false,
      myUSER = WCMAPI.userCode,
      myServer = WCMAPI.serverURL,
      myURL = myServer + '/api/public/2.0/groups/containsUser/grp_RATEIO_COLABORADORES/' + myUSER;
   FLUIGC.ajax({
      url: myURL,
      type: 'GET',
      dataType: 'json',
      contenttype: 'application/json',
      async: false,
      success: function(result) {
         adm = result["content"];
      },
      error: function(request, status, error) {
         FLUIGC.toast({
            message: 'Não foi possivel localizar a permissão de acesso do usuário logado. Favor verificar seu cadastro no grupo grp_RATEIO_COLABORADORES.\n' + error,
            type: 'danger'
         })
      }
   });
   return adm;
}

function pad(num) {
   var numRet = num;
   if(parseInt(num) <= 9) {
      numRet = "0" + num;
   }
   return numRet;
}

function DTAgora() {
   var dtAgora = new Date();
   dtAgora.setDate(dtAgora.getDate());
   //
   var fData = pad(dtAgora.getDate()) + "/" +
      pad(parseInt(dtAgora.getMonth() + 1)) + "/" +
      dtAgora.getFullYear();
   //
   var hrAgora = new Date();
   hrAgora = pad(hrAgora.getHours()) + ':' + pad(hrAgora.getMinutes());
   //
   fData = fData + ' as ' + hrAgora;

   // VERIFICA SO
   fData = fData + ' / ' + qSO;

   return fData;
}

String.prototype.replaceAll = function(de, para) {
   var str = this;
   var pos = str.indexOf(de);
   while (pos > -1) {
      str = str.replace(de, para);
      pos = str.indexOf(de);
   }
   return (str);
}

function ajustaCSSCards() {
   var xTamCards = 0;
   var qCards = document.getElementsByClassName('panel').length;
   if(qCards > 1) {
      for (var index1 = 0; index1 < qCards; index1++) {
         if(xTamCards == 0) {
            xTamCards = document.getElementsByClassName('panel')[index1].offsetHeight;
         } else {
            if(xTamCards < document.getElementsByClassName('panel')[index1].offsetHeight) {
               xTamCards = document.getElementsByClassName('panel')[index1].offsetHeight;
            }
         }
      }
      if(xTamCards > 0)
         for (var index1 = 0; index1 < qCards; index1++) {
            document.getElementsByClassName('panel')[index1].style.height = xTamCards + 'px';
         }
   }
}

var linhas = 0;
function adicionarRATEIO() {
   try {
      // Criar ID único para a nova linha de acordo com o indice da tabela 
      var novoId = 'linha_' + linhas++;

      // HTML da nova linha baseado no template
      var novaLinhaHTML = `
         <div class="table-row-modern" data-row-id="${novoId}">
            <div class="row-cell-modern cell-actions">
               <button type="button" class="btn-row-modern" title="Remover Linha" onclick="removerRATEIO(this)">
                 <p>🚮</p>
               </button>
            </div>
            <div class="row-cell-modern cell-code">
               <input type="text" 
                      class="field-input-table" 
                      placeholder="Código" 
                      onchange="atualizarDadosLinha(this, 'codigo')" 
                      maxlength="6" />
            </div>
            <div class="row-cell-modern cell-name">
               <input type="text" 
                      class="field-input-table field-input-wide" 
                      placeholder="Nome da Filial" 
                      onchange="atualizarDadosLinha(this, 'nome')" />
            </div>
            <div class="row-cell-modern cell-percent">
               <div style="display: flex; flex-direction: column; gap: 0.5rem; width: 100%;">
                  <input type="number" class="field-input-modern" placeholder="%" min="0" max="100" step="0.01"
                         onchange="atualizarPercentual(this)" style="text-align: center;" />
                  <div class="progress-bar-modern">
                     <div class="progress-fill-modern" style="width: 0%"></div>
                  </div>
               </div>
            </div>
         </div>
      `;
      
      // Adicionar a nova linha ao corpo da tabela
      $('#tabRATEIOS_' + myInstance + ' .table-body-modern').append(novaLinhaHTML);
      
      // Atualizar contadores
      atualizarContadores();
      // Ajustar CSS se necessário
      ajustaCSSCards();
      
   } catch (error) {
      console.error('Erro ao adicionar linha:', error);
      FLUIGC.toast({
         message: 'Erro ao adicionar nova linha: ' + error.message,
         type: 'danger'
      });
   }
}

function removerRATEIO(botao) {
   try {
      // Encontrar a linha pai do botão clicado
      var linha = $(botao).closest('.table-row-modern');
      
      if (linha.length === 0) {
         throw new Error('Linha não encontrada');
      }
      
		// Remover a linha com animação
		linha.fadeOut(300, function() {
         linha.remove();
         
         // Atualizar contadores após remoção
         atualizarContadores();
         // Ajustar CSS se necessário
         ajustaCSSCards();
		});
      
      
   } catch (error) {
      console.error('Erro ao remover linha:', error);
      FLUIGC.toast({
         message: 'Erro ao remover linha: ' + error.message,
         type: 'danger'
      });
   }
}

/*

<th>Ações</th>
<th>Cód. Filial Destino</th>
<th>Filial Destino</th>
<th>% Participação</th>

  // HEADER
  var xHeader = new Array();
  if(qSO == 'mobile') {
	  xHeader.push({
                     'title': 'Sel'
                  }, {'title': 'Decisão','display': false
                  }, {'title': 'Processo'
                  }, {'title': 'Nº WF'
                  }, {'title': 'Requerente','display': false
                  }, {'title': 'Atividade','display': false
                  }, {'title': 'Aprovador','display': false
                  }, {'title': 'Obs'
                  }, {'title': 'Anexo'
                  }, {'title': 'Docto'
	  });
  } else
  xHeader.push({   'title': 'Sel'
               }, {'title': 'Decisão'
               }, {'title': 'Processo'
               }, {'title': 'Nº WF'
               }, {'title': 'Requerente'
               }, {'title': 'Atividade'
               }, {'title': 'Aprovador'
               }, {'title': 'Obs'
               }, {'title': 'Anexo'
               }, {'title': 'Docto'
               });

  //
  var qSearch = {
		  enabled: true,
		  onlyEnterkey: true,
		  searchAreaStyle: 'col-md-4 col-xs-12',
		  onSearch: function(res) {
			  myTable.reload(that.tableData);
			  var bResult;
			  if(res) {
				  var data = myTable.getData();
				  var search = data.filter(function(el) {
					  for (var [key, value] of Object.entries(el)) {
						  if(typeof value === "string") {
							  if(value.toUpperCase().indexOf(res.toUpperCase()) >= 0)
								  return el;
						  } else {
							  if(typeof value === "number") {
								  if(value.toString().toUpperCase().indexOf(res.toUpperCase()) >= 0)
									  return el;
							  }
						  }
					  }
				  });
				  myTable.reload(search);

				  if(search && search.length) {
					  myTable.reload(search);
					  bResult = true;
				  } else {
					  bResult = false;
				  }
			  }

			  if(!bResult && res) {
				  FLUIGC.toast({
					  title: 'Procurando por ' + res + ': ',
					  message: 'Não localizado',
					  type: 'warning'
				  });
			  } else {
				  temAnexos();
			  }
		  }
  };
  var qTemplate = '.template_area_buttons';
  if(qSO == 'mobile') {
	  qSearch = {
			  enabled: false
	  }
	  $('.template_area_buttons').hide();
	  qTemplate = '';
  }
  myTable = FLUIGC.datatable('#tabREQUERENTES_' + that.myInstance, {
	  dataRequest: that.mydata,
	  emptymessage: '<div class="text-center" style="color:red;"><b>Nenhuma pendência encontrada até o momento.</b></div>',
	  navButtons: {
		  enabled: false
	  },
	  draggable: {
		  enabled: false
	  },
	  classSelected: 'warning',
	  renderContent: '.tarefas_datatable',
	  header: xHeader,
	  tableStyle: 'table-hover',
	  search: qSearch,
	  actions: {
		  enabled: true,
		  template: qTemplate,
		  actionAreaStyle: 'col-md-8'
	  },
	  scroll: {
		  target: '#tabREQUERENTES_' + that.myInstance,
		  enabled: false
	  },
  }, function(err, data) {
	  if(err) {
		  FLUIGC.toast({
			  message: 'Erro ao tentar carregar o portal. \n ' + err,
			  type: 'danger'
		  });
	  } else {
		  if(qSO == 'mobile')
			  $('#msgClick').hide();
	  }
  });

  myTable.on('fluig.datatable.loadcomplete', function() {
	  if(!that.tableData) {
		  that.tableData = myTable.getData();
	  }
  });

  // ON CLICK SOLICITACAO
  $('#tabREQUERENTES_' + myInstance + ' tbody').on('click', 'tr', function() {
	  var xK = event.target.id;
	  var data = this.cells;
	  var myIndice = this.rowIndex - 1;

	  // SEGURANCA NENHUMA APROVACAO
	  if(data[0].children[0].innerHTML == 'Não há dados para serem exibidos.') {
		  FLUIGC.toast({
			  title: 'ATENÇÃO',
			  message: "Não há dados para serem exibidos. Você pode clicar no botão Atualizar para nova busca!",
			  type: 'info'
		  });
		  return false;
	  }

	  //
	  if(xK !== 'itSelecionado' && xK !== 'btnVerAnexos' & xK !== 'btnVerDoc') {
		  var Requerente  = data.Solicitante.textContent,
		  	  Decisao     = data.Decisao.textContent,
		  	  Workflow    = data.Workflow.textContent,
		  	  Solicitacao = data.Solicitacao.textContent

		  avaliarREQUERENTE(myIndice,Requerente,Decisao,Workflow,Solicitacao);
	  } else
		  if(xK == 'itSelecionado') {
			  // SOMAR ITEN SELECIONADO
			  var data = this.cells;
			  var myIndice = this.rowIndex - 1;
			  var qValor = data.Selecionado["children"]["itSelecionado"].checked;
			  var qSomar;
			  if(qValor) {
				  qSomar = +1;
			  } else {
				  qSomar = -1;
			  }
			  qSomar += parseInt($('.apvTOTAL')[0].innerText);
			  $('.apvTOTAL')[0].innerText = qSomar;
			  $('.repTOTAL')[0].innerText = qSomar;
		  } else
			  if(xK == 'btnVerAnexos') {
				  verAnexos(data.Solicitacao.textContent);
			  } else
				  if(xK == 'btnVerDoc') {
					  openDocument(data.Formulario.textContent, data.Versao.textContent, data.Solicitacao.textContent);
				  }
  });

  // ON CLICK GRAVAR OBSERVACAO REPROVACAO GLOBAL
  $(document).on("click", "[data-open-modal03]", function(ev) {
	  if($('#globalOBS').val() == '' || $('#globalOBS').val() == undefined || $('#globalOBS').val() == null) {
		  FLUIGC.toast({
			  title: 'ATENÇÃO',
			  message: "É preciso preencher a observação.",
			  type: 'warning',
			  timeout: 3000
		  });
	  } else {
		  // REPROVAR
		  var xAchei = false;
		  myModalOBS.remove();
		  var qLinhas = $('.regAprovacao td#Decisao').length;
		  qOBS = $('#globalOBS').val();
		  if(qLinhas > 0) {
			  for (var i = 0; i < qLinhas; i++) {
				  if($('.regAprovacao td#Selecionado input#itSelecionado')[i].checked) {
					  $('.regAprovacao td#Decisao')[i].innerText = 'Reprovado';
					  $('.regAprovacao td#Obs')[i].innerText = gOBS;
					  xAchei = true;
				  }
			  }
			  //
			  if(xAchei) {
				  // PROCESSAR DECISAO
				  $('#pbACOMPANHA').show();
				  setTimeout(function() {
					  confirmarENVIO(-1);
				  }, 300);
				  $('#pbACOMPANHA').hide();
			  } else {
				  $('#pbACOMPANHA').hide();
				  FLUIGC.toast({
					  title: 'ATENÇÃO',
					  message: "Nenhuma solicitação selecionada para ação de reprovação",
					  type: 'warning',
					  timeout: 3000
				  });
			  }
		  } else {
			  $('#pbACOMPANHA').hide();
			  FLUIGC.toast({
				  title: 'ATENÇÃO',
				  message: "Nenhuma solicitação encontrada",
				  type: 'warning',
				  timeout: 3000
			  });
		  }
	  }
	  $('#pbACOMPANHA').hide();
  });
*/

// Função para atualizar dados da linha quando o usuário digita
function atualizarDadosLinha(input, tipo) {
   try {
      var linha = $(input).closest('.table-row-modern');
      var valor = $(input).val();
      
      // Validações básicas
      if (tipo === 'codigo' && valor) {
         // Validar se o código tem formato válido
         if (!/^\d{1,6}$/.test(valor)) {
            FLUIGC.toast({
               message: 'Código deve conter apenas números (máximo 6 dígitos).',
               type: 'warning'
            });
            $(input).focus();
            return;
         }
      }
      
      // Salvar dados da linha (aqui você pode implementar salvamento automático)
      console.log('Dados atualizados:', {
         linha: linha.data('row-id'),
         tipo: tipo,
         valor: valor
      });
      
   } catch (error) {
      console.error('Erro ao atualizar dados da linha:', error);
   }
}

// Função para atualizar percentual e barra de progresso
function atualizarPercentual(input) {
   try {
      var valor = parseFloat($(input).val()) || 0;
      
      // Validar limites
      if (valor < 0) {
         valor = 0;
         $(input).val(0);
      } else if (valor > 100) {
         valor = 100;
         $(input).val(100);
      }
      
      // Atualizar barra de progresso
      var progressBar = $(input).siblings('.progress-bar-modern').find('.progress-fill-modern');
      progressBar.css('width', valor + '%');
      
      // Atualizar contadores globais
      atualizarContadores();
      
   } catch (error) {
      console.error('Erro ao atualizar percentual:', error);
   }
}

// Função para atualizar contadores e totais
function atualizarContadores() {
   try {
      var totalLinhas = $('#tabRATEIOS_' + myInstance + ' .table-row-modern').length;
      var totalPercentual = 0;
      
      // Somar todos os percentuais
      $('#tabRATEIOS_' + myInstance + ' input[type="number"]').each(function() {
         var valor = parseFloat($(this).val()) || 0;
         totalPercentual += valor;
      });
      
      // Atualizar displays
      $('#totalFiliais').text(totalLinhas);
      $('#totalPercentual').text(totalPercentual.toFixed(2) + '%');
      
      // Atualizar status de validação
      var statusElement = $('#statusValidacao .summary-value-modern');
      var iconElement = $('#statusValidacao .summary-icon-modern i');
      
      if (Math.abs(totalPercentual - 100) < 0.01) {
         statusElement.text('Válido').css('color', 'var(--cor-sucesso)');
         iconElement.removeClass('fluigicon-warning fluigicon-times')
                   .addClass('fluigicon-check')
                   .parent().css('background', 'linear-gradient(135deg, var(--cor-sucesso) 0%, var(--cor-sucesso-escura) 100%)');
      } else if (totalPercentual > 100) {
         statusElement.text('Excedeu 100%').css('color', 'var(--cor-perigo)');
         iconElement.removeClass('fluigicon-check fluigicon-times')
                   .addClass('fluigicon-warning')
                   .parent().css('background', 'linear-gradient(135deg, var(--cor-perigo) 0%, var(--cor-perigo-escura) 100%)');
      } else {
         statusElement.text('Incompleto').css('color', 'var(--cor-aviso)');
         iconElement.removeClass('fluigicon-check fluigicon-warning')
                   .addClass('fluigicon-times')
                   .parent().css('background', 'linear-gradient(135deg, var(--cor-aviso) 0%, var(--cor-aviso-escura) 100%)');
      }
      
   } catch (error) {
      console.error('Erro ao atualizar contadores:', error);
   }
}

// Função para validar dados antes de salvar
function validarRateio() {
   try {
      var linhas = $('#tabRATEIOS_' + myInstance + ' .table-row-modern');
      var totalPercentual = 0;
      var erros = [];
      
      linhas.each(function(index) {
         var linha = $(this);
         var codigo = linha.find('input[type="text"]').eq(0).val();
         var nome = linha.find('input[type="text"]').eq(1).val();
         var percentual = parseFloat(linha.find('input[type="number"]').val()) || 0;
         
         // Validações
         if (!codigo || codigo.trim() === '') {
            erros.push(`Linha ${index + 1}: Código da filial é obrigatório`);
         }
         
         if (!nome || nome.trim() === '') {
            erros.push(`Linha ${index + 1}: Nome da filial é obrigatório`);
         }
         
         if (percentual <= 0) {
            erros.push(`Linha ${index + 1}: Percentual deve ser maior que zero`);
         }
         
         totalPercentual += percentual;
      });
      
      // Validar total
      if (Math.abs(totalPercentual - 100) > 0.01) {
         erros.push(`Total do rateio deve ser 100%. Atual: ${totalPercentual.toFixed(2)}%`);
      }
      
      return {
         valido: erros.length === 0,
         erros: erros,
         totalPercentual: totalPercentual
      };
      
   } catch (error) {
      console.error('Erro na validação:', error);
      return {
         valido: false,
         erros: ['Erro interno na validação: ' + error.message],
         totalPercentual: 0
      };
   }
}

/* === SISTEMA DE ABAS MODERNO === */

/**
 * Inicializa o sistema de navegação entre abas
 */
function inicializarAbas() {
   try {
      console.log('Inicializando sistema de abas...');
      
      // Aplicar máscaras nos campos
      aplicarMascaras();
      
      // Configurar eventos de clique nas abas
      $('.nav.nav-tabs li a').off('click').on('click', function(e) {
         e.preventDefault();
         
         var targetTab = $(this).attr('href');
         console.log('Mudando para aba:', targetTab);
         
         // Alterar aba ativa
         alternarAba(targetTab);
      });
      
      // Mostrar primeira aba por padrão
      alternarAba('#abaGlobal');
      
   } catch (error) {
      console.error('Erro ao inicializar abas:', error);
   }
}

/**
 * Aplica máscaras nos campos de entrada
 */
function aplicarMascaras() {
   try {
      console.log('Aplicando máscaras nos campos...');
      
      // Máscara para campos de período (MM/AAAA)
      $('#mesAnoFiltro, #mesAno').each(function() {
         var campo = this;
         console.log('Aplicando máscara ao campo:', campo.id);
         
         // Aplicar máscara MM/AAAA
         aplicarMascaraPeriodo(campo);
      });
      
   } catch (error) {
      console.error('Erro ao aplicar máscaras:', error);
   }
}

/**
 * Aplica máscara MM/AAAA usando JavaScript puro
 * @param {HTMLElement} campo - Campo de entrada
 */
function aplicarMascaraPeriodo(campo) {
   try {
      // Remover eventos anteriores
      $(campo).off('input.periodo keydown.periodo paste.periodo');
      
      // Evento principal para formatação
      $(campo).on('input.periodo', function(e) {
         var valor = this.value.replace(/\D/g, ''); // Remove tudo que não é dígito
         var posicaoCursor = this.selectionStart;
         var valorAnterior = this.value;
         
         // Limitar a 6 dígitos (MMAAAA)
         if (valor.length > 6) {
            valor = valor.substring(0, 6);
         }
         
         // Formatar com barra
         var valorFormatado = '';
         if (valor.length > 0) {
            if (valor.length <= 2) {
               valorFormatado = valor;
            } else {
               valorFormatado = valor.substring(0, 2) + '/' + valor.substring(2);
            }
         }
         
         // Atualizar valor
         this.value = valorFormatado;
         
         // Ajustar posição do cursor
         var novaPosicao = posicaoCursor;
         if (valorFormatado.length > valorAnterior.length && posicaoCursor === 2) {
            novaPosicao = 3; // Pular a barra
         }
         
         // Definir posição do cursor
         setTimeout(() => {
            this.setSelectionRange(novaPosicao, novaPosicao);
         }, 0);
      });
      
      // Impedir teclas inválidas
      $(campo).on('keydown.periodo', function(e) {
         var tecla = e.key;
         var valor = this.value.replace(/\D/g, '');
         
         // Permitir teclas de controle
         var teclasPermitidas = [
            'Backspace', 'Delete', 'Tab', 'Escape', 'Enter',
            'Home', 'End', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'
         ];
         
         if (teclasPermitidas.includes(tecla)) {
            return true;
         }
         
         // Permitir Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
         if (e.ctrlKey && ['a', 'c', 'v', 'x'].includes(tecla.toLowerCase())) {
            return true;
         }
         
         // Permitir apenas números
         if (!/^\d$/.test(tecla)) {
            e.preventDefault();
            return false;
         }
         
         // Limitar a 6 dígitos
         if (valor.length >= 6) {
            e.preventDefault();
            return false;
         }
         
         return true;
      });
      
      // Tratar colagem
      $(campo).on('paste.periodo', function(e) {
         setTimeout(() => {
            var valor = this.value.replace(/\D/g, '');
            if (valor.length > 6) {
               valor = valor.substring(0, 6);
            }
            
            var valorFormatado = '';
            if (valor.length > 2) {
               valorFormatado = valor.substring(0, 2) + '/' + valor.substring(2);
            } else {
               valorFormatado = valor;
            }
            
            this.value = valorFormatado;
         }, 0);
      });
      
      // Validação ao sair do campo
      $(campo).on('blur.periodo', function() {
         var valor = this.value;
         var $campo = $(this);
         
         // Remover classe de erro anterior
         $campo.removeClass('campo-erro');
         
         if (valor && valor.length > 0) {
            // Verificar se está no formato MM/AAAA
            if (!/^\d{2}\/\d{4}$/.test(valor)) {
               $campo.addClass('campo-erro');
               console.warn('Formato inválido para período:', valor);
               return;
            }
            
            // Validar mês (01-12)
            var mes = parseInt(valor.substring(0, 2));
            if (mes < 1 || mes > 12) {
               $campo.addClass('campo-erro');
               console.warn('Mês inválido:', mes);
               return;
            }
            
            // Validar ano (mínimo 2020)
            var ano = parseInt(valor.substring(3, 7));
            if (ano < 2020 || ano > 2030) {
               $campo.addClass('campo-erro');
               console.warn('Ano inválido:', ano);
               return;
            }
         }
      });
      
   } catch (error) {
      console.error('Erro ao aplicar máscara de período:', error);
   }
}

/**
 * Aplica máscara manual quando jQuery Mask não está disponível
 * @param {jQuery} $campo - Campo de entrada
 * @param {string} mascara - Padrão da máscara
 */
function aplicarMascaraManual($campo, mascara) {
   // Esta função foi substituída por aplicarMascaraPeriodo
   // Mantida para compatibilidade
   console.log('Usando aplicarMascaraPeriodo ao invés de aplicarMascaraManual');
}

/**
 * Alterna entre as abas do widget
 * @param {string} tabId - ID da aba de destino
 */
function alternarAba(tabId) {
   try {
      console.log('Alternando para aba:', tabId);
      
      // Remover classe active de todas as abas
      $('.nav.nav-tabs li').removeClass('active');
      $('.tab-content-modern').removeClass('active');
      
      // Adicionar classe active na aba selecionada
      $('.nav.nav-tabs li a[href="' + tabId + '"]').parent().addClass('active');
      
      // Mostrar conteúdo da aba com animação
      setTimeout(function() {
         $(tabId).addClass('active');
      }, 50);
      
      // Executar ações específicas da aba
      executarAcaoAba(tabId);
      
   } catch (error) {
      console.error('Erro ao alternar aba:', error);
   }
}

/**
 * Executa ações específicas ao abrir uma aba
 * @param {string} tabId - ID da aba
 */
function executarAcaoAba(tabId) {
   try {
      switch(tabId) {
         case '#abaGlobal':
            console.log('Carregando dados globais...');
            // Carregar dados da tabela global
            atualizarTabelaGlobal();
            break;
            
         case '#abaColaborador':
            console.log('Carregando dados do colaborador...');
            // Carregar dados do colaborador atual
            atualizarDadosColaborador();
            atualizarTabelaRateio();
            break;
            
         case '#abaMensagens':
            console.log('Carregando mensagens...');
            // Carregar mensagens do sistema
            carregarMensagens();
            break;
            
         default:
            console.log('Aba não reconhecida:', tabId);
      }
   } catch (error) {
      console.error('Erro ao executar ação da aba:', error);
   }
}

/**
 * Atualiza a tabela global de lançamentos
 */
function atualizarTabelaGlobal() {
   try {
      console.log('Atualizando tabela global...');
      // TODO: Implementar carregamento dos dados globais
      
   } catch (error) {
      console.error('Erro ao atualizar tabela global:', error);
   }
}

/**
 * Atualiza os dados do colaborador atual
 */
function atualizarDadosColaborador() {
   try {
      console.log('Atualizando dados do colaborador...');
      // TODO: Implementar carregamento dos dados do colaborador
      
   } catch (error) {
      console.error('Erro ao atualizar dados do colaborador:', error);
   }
}

/**
 * Carrega mensagens do sistema
 */
function carregarMensagens() {
   try {
      console.log('Carregando mensagens...');
      // TODO: Implementar carregamento de mensagens
      
   } catch (error) {
      console.error('Erro ao carregar mensagens:', error);
   }
}

// Inicializar abas quando o documento estiver pronto
$(document).ready(function() {
   setTimeout(function() {
      inicializarAbas();
   }, 500);
});
