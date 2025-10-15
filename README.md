<<<<<<< HEAD
# 📊 Rateio de Colaboradores - Fluig Widget

Sistema moderno para gestão de rateio de colaboradores por filiais, desenvolvido para plataforma Fluig.

## 🎯 Funcionalidades

### 📋 **Visão Global**
- Visualização de todos os lançamentos por período (Mês/Ano)
- Filtros inteligentes com máscara automática
- Interface responsiva e moderna

### 👤 **Gestão de Colaborador**
- Dados detalhados do colaborador
- Configuração de rateio por filiais
- Validação automática de percentuais (100%)
- Controle de distribuição inteligente

### 💼 **Características Técnicas**
- **Framework:** Fluig SuperWidget
- **Tecnologias:** HTML5, CSS3, JavaScript ES6+
- **Template Engine:** FreeMarker (.ftl)
- **Responsivo:** Mobile-first design
- **Acessibilidade:** WCAG 2.1 compliant

## 🎨 **Design System**

### 🌈 **Paleta de Cores**
- **Primária:** #038982 (Verde corporativo)
- **Secundária:** #059669, #10b981
- **Neutros:** Escala de cinzas moderna
- **Estados:** Success, Warning, Danger, Info

### 📱 **Layout Responsivo**
- **Desktop:** Grid layout otimizado
- **Tablet:** Adaptação automática
- **Mobile:** Interface simplificada

## 🗂️ **Estrutura do Projeto**

```
RateioColaboradores/
├── wcm/
│   └── widget/
│       └── RATEIO_COLABORADORES/
│           ├── src/main/
│           │   ├── resources/
│           │   │   ├── view.ftl           # Template principal
│           │   │   ├── edit.ftl           # Template de edição
│           │   │   └── application.info   # Configurações
│           │   └── webapp/resources/
│           │       ├── css/
│           │       │   └── RATEIO_COLABORADORES.css
│           │       ├── js/
│           │       │   └── RATEIO_COLABORADORES.js
│           │       ├── images/
│           │       └── excel/
│           └── target/
│               └── RATEIO_COLABORADORES.war
└── forms/
    └── Rateio de Colaborares/
        ├── Rateio de Colaborares.html
        └── css/
            └── rateio-colaboradores.css
```

## 🚀 **Instalação e Configuração**

### 📋 **Pré-requisitos**
- Fluig Platform 1.6.x ou superior
- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Permissões de grupo: `grp_RATEIO_COLABORADORES`

### 🔧 **Deploy**
1. Fazer upload do arquivo `.war` via Fluig Studio
2. Configurar permissões de acesso ao grupo
3. Instalar formulário HTML via Central de Formulários
4. Configurar dataset de filiais (se necessário)

### ⚙️ **Configurações**
```javascript
// Configurações principais no application.info
widget.name=RATEIO_COLABORADORES
widget.version=1.00
widget.compatibility=1.6
widget.category=Social
```

## 🛠️ **Desenvolvimento**

### 🎯 **Funcionalidades Implementadas**
- ✅ Sistema de abas moderno
- ✅ Máscaras automáticas (MM/AAAA)
- ✅ Validação de formulários
- ✅ Tabelas responsivas
- ✅ Cálculo automático de percentuais
- ✅ Interface drag & drop
- ✅ Exportação para Excel

### 🔄 **Próximas Versões**
- [ ] Integração com API de colaboradores
- [ ] Relatórios avançados
- [ ] Notificações em tempo real
- [ ] Auditoria de alterações
- [ ] Bulk operations

## 📱 **Compatibilidade**

### 🌐 **Navegadores Suportados**
- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅

### 📱 **Dispositivos**
- Desktop (1920x1080+) ✅
- Tablet (768x1024) ✅
- Mobile (375x667+) ✅

## 🤝 **Contribuição**

### 📝 **Como Contribuir**
1. Fork o repositório
2. Crie uma branch feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

### 🐛 **Reportando Bugs**
Use as [Issues](https://github.com/rca0261negocios/RateioColaboradores/issues) para reportar problemas.

## 📄 **Licença**

Este projeto está sob licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👥 **Equipe**

- **Analista:** Ricardo Andrade
- **Versão:** 1.00 (Outubro 2025)
- **Status:** Em Produção ✅

## 📞 **Suporte**

Para suporte técnico:
- 📧 Email: ricardo.andrade@oncoclinicas.com
- 🎫 Sistema de tickets interno
- 📱 Teams: @ricardoandrade

---

⭐ **Se este projeto foi útil, deixe uma estrela!**

*Desenvolvido com ❤️ para Rede Oncoclinicas*
=======
# RateioColaboradores
Rateio de Colaboradores
>>>>>>> 1cccec2ec07f796857e3e10e0eef6c480940cdc5
