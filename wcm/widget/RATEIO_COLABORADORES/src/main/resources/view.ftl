<!-- 
    ANALISTA RICARDO ANDRADE
     *** NAO IDENTAR ESTE CODIGO ***
        24.11.v05 - MODERNIZADO
-->
<script>
   // RESPONSIVO E META TAGS MODERNOS
   $('head').append("<meta name='viewport' content='width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no' />");
   $('head').append("<base href='/'>");
   $('head').append("<meta http-equiv='Cache-Control' content='no-cache, no-store, must-revalidate' />");
   $('head').append("<meta http-equiv='Pragma' content='no-cache' />");
   $('head').append("<meta http-equiv='Expires' content='0' />");
   
   // CSS MODERNOS - Usar apenas o CSS unificado
   $('head').append("<link rel='preconnect' href='https://fonts.googleapis.com'>");
   $('head').append("<link rel='preconnect' href='https://fonts.gstatic.com' crossorigin>");
   $('head').append("<link href='https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap' rel='stylesheet'>");
</script>

<!-- CUSTOMIZADOS -->
<script type="application/javascript" src="/webdesk/vcXMLRPC.js" charset="utf-8"></script> 

<div id="rateioCOLABORADORES_${instanceId}" 
	class="super-widget wcm-widget-class fluig-style-guide widget-modern" 
	data-params="rateioCOLABORADORES.instance()"
	style="margin: 0; padding: 1.5rem; background: linear-gradient(135deg, var(--cor-cinza-100) 0%, var(--cor-cinza-200) 100%); border-radius: 16px; box-shadow: 0 10px 25px var(--cor-primaria-sombra);">

 	<!-- CABEÇALHO MODERNO -->
 	<header class="widget-header-modern">
		<div class="widget-header-content">
			<div class="widget-logo-section">
				<div class="widget-logo-icon">
					<i class="fluigicon fluigicon-users" style="font-size: 2.5rem; color: var(--cor-branco);"></i>
				</div>
				<div class="widget-title-section">
					<h1 class="widget-title">Rateio de Colaboradores</h1>
					<p class="widget-subtitle">Gestão de distribuição por filiais</p>
					<span class="widget-version">v1.00</span>
				</div>
			</div>
			<div class="widget-user-section">
				<div class="user-info">
					<h5 id="userNOME" class="user-name"></h5>
					<span class="user-role">Usuário Logado</span>
				</div>
				<div class="user-avatar">
					<img id="imgCOLABORADOR"  
					     src="/social/api/rest/social/image/profile/admin.financeiro/SMALL_PICTURE" 
					     class="fluig-style-guide avatar-modern" />
				</div>
			</div>
		</div>
	</header>

	<!-- NAVEGAÇÃO ENTRE ABAS -->
	<nav class="nav nav-tabs clearfix" role="tablist">
		<li class="active">
			<a href="#abaGlobal" data-toggle="tab"> 🌍 Global </a>
		</li>
		<li>
			<a href="#abaColaborador" data-toggle="tab"> 👤 Colaborador </a>
		</li>
		<li>
			<a href="#abaMensagens" data-toggle="tab"> 💬 Mensagens </a>
		</li>
	</nav>

	<!-- SECAO UNICA 1A ABA -->
	<div id="abaGlobal" class="tab-content-modern active">
		<section class="widget-section-modern">
			<div class="section-card-modern">
				<div class="section-header-modern">
					<div class="section-icon-modern section-icon-secondary">
						<i class="flaticon flaticon-widgets icon-xl"></i>
					</div>
					<div class="section-title-modern">
						<h3>Visão Global</h3>
						<p>Aqui você tem uma visão de todos os lantos conforme Mês/Ano</p>
					</div>
				</div>
				<!-- FILTROS E BOTOES DE ACOES -->
				<div class="section-filters-modern">
					<div class="filters-grid-modern">
						<div class="filter-field-modern">
							<label class="filter-label-modern">
								<i class="fluigicon fluigicon-calendar icon-sm"></i>Período
							</label>
							<input type="text" name="mesAnoFiltro" id="mesAnoFiltro" 
								class="filter-input-modern form-control-modern" 
								placeholder="MM/AAAA" 
								data-mask="99/9999"
								maxlength="7"/>
						</div>
						<div class="filter-actions-modern">
							<button type="button" class="btn-action-modern btn-primary-modern" title="Carregar Dados" onclick="carregarLANCTOS()">
								<span class="btn-text"> 🔄 Carregar</span>
								<span class="btn-subtext">Atualizar visão</span>
							</button>
						</div>
					</div>
				</div>

				<!-- LISTAR TODOS OS LANCTOS POR MÊS/ANO -->
				<div class="table-container-modern">
					<div id="verLANCTOS_${instanceId}" class="table-wrapper-modern">
						<div id="tabLANCTOS_${instanceId}" class="table-modern-widget">
							<div class="table-header-modern">
								<div class="header-cell-modern header-code">Código</div>
								<div class="header-cell-modern header-name">Nome Completo</div>
								<div class="header-cell-modern header-code">Cód. Filial</div>
								<div class="header-cell-modern header-name">Filial Origem</div>
								<div class="header-cell-modern header-valor">Custo Total</div>
							</div>
							<div class="table-body-modern">
								<!-- Linhas serão inseridas dinamicamente -->
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>

	<!-- 2A ABA - REFATORADA COM DUAS DIVISÕES -->
	<div id="abaColaborador" class="tab-content-modern">
		<!-- 1A SECAO 2A ABA -->
		<section class="widget-section-modern section-split">
			<div class="section-split-container">
				<!-- 1A DIVISAO - DADOS DO COLABORADOR (70%) -->
				<div class="section-division-modern division-main" style="flex: 0 0 70%;">
					<div class="section-card-modern">
						<div class="section-header-modern">
							<div class="section-icon-modern">
								<i class="fluigicon fluigicon-user"></i>
							</div>
							<div class="section-title-modern">
								<h3>Dados do Colaborador</h3>
								<p>Informações básicas para processamento do rateio</p>
							</div>
						</div>
						<div class="section-content-modern">
							<div class="form-grid-modern">
								<div class="form-field-modern">
									<label class="field-label-modern">
										<i class="fluigicon fluigicon-calendar"></i>Período
									</label>
									<input type="text" name="mesAno" id="mesAno" 
										class="field-input-modern field-readonly" 
										placeholder="MM/AAAA" 
										data-mask="99/9999"
										maxlength="7" />
								</div>
								<div class="form-field-modern">
									<label class="field-label-modern">
										<i class="fluigicon fluigicon-hash"></i>Código
									</label>
									<input type="text" name="codColaborador" id="codColaborador" 
										class="field-input-modern field-readonly" 
										placeholder="Código" readonly />
								</div>
								<div class="form-field-modern form-field-wide">
									<label class="field-label-modern">
										<i class="fluigicon fluigicon-user"></i>Nome Completo
									</label>
									<input type="text" name="nomeColaborador" id="nomeColaborador" 
										class="field-input-modern field-readonly" 
										placeholder="Nome do colaborador" />
								</div>
								<div class="form-field-modern">
									<label class="field-label-modern">
										<i class="fluigicon fluigicon-hash"></i>Cód. Filial
									</label>
									<input type="text" name="codFilialOrigem" id="codFilialOrigem" 
										class="field-input-modern field-readonly" 
										placeholder="000" readonly />
								</div>
								<div class="form-field-modern">
									<label class="field-label-modern">
										<i class="fluigicon fluigicon-building"></i>Filial Origem
									</label>
									<input type="text" name="nomeFilial" id="nomeFilial" 
										class="field-input-modern field-readonly" 
										placeholder="Nome da filial" />
								</div>
								<div class="form-field-modern">
									<label class="field-label-modern">
										<i class="fluigicon fluigicon-dollar"></i>Custo Total
									</label>
									<input type="text" name="vlrSalarioImpostos" id="vlrSalarioImpostos" 
										class="field-input-modern field-readonly field-currency" 
										placeholder="R$ 0,00" title="Salário + Impostos" />
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- 2A DIVISAO - BOTÕES DE AÇÃO (30%) -->
				<div class="section-division-modern division-actions" style="flex: 0 0 30%;">
					<div class="section-card-modern">
						<div class="section-header-modern">
							<div class="section-icon-modern">
								<i class="fluigicon fluigicon-cog"></i>
							</div>
							<div class="section-title-modern">
								<h3>Botões de Ação</h3>
								<p>Operações e controles do sistema</p>
							</div>
						</div>
						<div class="section-content-modern">
							<div class="actions-grid-modern">
								<button type="button" class="btn-action-modern btn-primary-modern btn-full" title="Salvar Alterações">
									<span class="btn-text"> 💾 Salvar</span>
									<span class="btn-subtext">Gravar edição</span>
								</button>
								<button type="button" class="btn-action-modern btn-secondary-modern btn-full" title="Cancelar Edição">
									<span class="btn-text"> ❌ Cancelar</span>
									<span class="btn-subtext">Desfazer mudanças</span>
								</button>
								<button type="button" class="btn-action-modern btn-tertiary-modern btn-full" title="Copiar Período Anterior">
									<span class="btn-text"> 📋 Copiar</span>
									<span class="btn-subtext">Do mês anterior</span>
								</button>
								<button type="button" class="btn-action-modern btn-danger-modern btn-full" title="Copiar Período Anterior">
									<span class="btn-text"> 🚮 Eliminar</span>
									<span class="btn-subtext">Exclusão do colaborador</span>
								</button>
								<button type="button" class="btn-action-modern btn-info-modern btn-full" title="Validar Rateio">
									<span class="btn-text"> 🔍 Validar</span>
									<span class="btn-subtext">Verificar dados</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	
		<!--2A SECAO 2A ABA -->
		<section class="widget-section-modern">
			<!-- DADOS DO RATEIO -->
			<div class="section-card-modern">
				<div class="section-header-modern">
					<div class="section-icon-modern section-icon-primary">
						<i class="fluigicon fluigicon-list"></i>
					</div>
					<div class="section-title-modern">
						<h3>Distribuição por Filiais</h3>
						<p>Configuração do rateio e percentuais de participação</p>
					</div>
				</div>
				
				<!-- TABELA DE RATEIO MODERNA -->
				<div class="table-container-modern">
					<div id="verRATEIOS_${instanceId}" class="table-wrapper-modern">
						<div id="tabRATEIOS_${instanceId}" class="table-modern-widget">
							<!-- Cabeçalho da tabela será inserido via JavaScript -->
							<div class="table-header-modern">
								<div class="header-cell-modern header-actions">Ações</div>
								<div class="header-cell-modern header-code">Código</div>
								<div class="header-cell-modern header-name">Filial Destino</div>
								<div class="header-cell-modern header-percent">Percentual (%)</div>
							</div>
							<div class="table-body-modern">
								<!-- Linhas serão inseridas dinamicamente -->
							</div>
						</div>
					</div>
					
					<!-- RESUMO MODERNO -->
					<div class="summary-section-modern">
						<div class="summary-card-modern summary-adicionar">
							<button type="button" class="btn-action-modern btn-primary-modern" title="Adicionar Nova Linha" onclick="adicionarRATEIO()">
								➕ Adicionar Filial Destino
							</button>
						</div>
						<div class="summary-card-modern summary-total">
							<div class="summary-icon-modern">
								<i class="fluigicon fluigicon-chart-pie"></i>
							</div>
							<div class="summary-content-modern">
								<span class="summary-label-modern">Total Distribuído</span>
								<span class="summary-value-modern" id="totalPercentual">0%</span>
							</div>
						</div>
						<div class="summary-card-modern summary-count">
							<div class="summary-icon-modern">
								<i class="fluigicon fluigicon-building"></i>
							</div>
							<div class="summary-content-modern">
								<span class="summary-label-modern">Filiais</span>
								<span class="summary-value-modern" id="totalFiliais">0</span>
							</div>
						</div>
						<div class="summary-card-modern summary-status" id="statusValidacao">
							<div class="summary-icon-modern">
								<i class="fluigicon fluigicon-check"></i>
							</div>
							<div class="summary-content-modern">
								<span class="summary-label-modern">Status</span>
								<span class="summary-value-modern">Válido</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>

	<!-- 3A ABA - MENSAGENS -->
	<div id="abaMensagens" class="tab-content-modern">
		<!-- Conteúdo da aba de mensagens -->
	</div>
</div>

<!-- TEMPLATE DATATABLE MODERNO -->
<script type="text/template" class="tarefas_datatable">
    <div class="table-row-modern" data-row-id="{{id}}">
        <div class="row-cell-modern cell-actions">
			<button type="button" class="btn-row-modern btn-danger-modern" title="Remover Linha">
				<i class="fluigicon fluigicon-trash"></i>
			</button>
        </div>
		<div class="row-cell-modern cell-code">
			<span class="cell-value">{{codFilialDestino}}</span>
		</div>
		<div class="row-cell-modern cell-name">
			<span class="cell-value">{{filialDestino}}</span>
		</div>
		<div class="row-cell-modern cell-percent">
			<span class="cell-value">{{percentualParticipacao}}%</span>
			<div class="progress-bar-modern">
				<div class="progress-fill-modern" style="width: {{percentualParticipacao}}%"></div>
			</div>
		</div>
    </div>
</script>

