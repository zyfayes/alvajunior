/**
 * Chat Panel 共享组件
 * 用于 Dashboard 和 Strategy 页面的统一 Chat Panel
 */
class ChatPanel {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.error(`ChatPanel: Container #${containerId} not found`);
      return;
    }

    this.options = {
      showConfigArea: false,
      configItems: [],
      contextData: {},
      onSend: null,
      ...options
    };

    this.activeMentions = [];
    this.elements = this.initElements();
    
    if (this.elements) {
      this.renderConfigArea();
      this.initEventListeners();
      this.renderMentionChips();
    }
  }

  initElements() {
    const bd = this.container.querySelector('.bd');
    if (!bd) return null;

    return {
      bd,
      panelToggle: this.container.querySelector('#panelToggle'),
      cfgChatList: bd.querySelector('#cfgChatList'),
      cfgChatInput: bd.querySelector('#cfgChatInput'),
      cfgChatSend: bd.querySelector('#cfgChatSend'),
      chatAtBtn: bd.querySelector('#chatAtBtn'),
      addContextMenu: bd.querySelector('#addContextMenu'),
      addContextBody: bd.querySelector('#addContextBody'),
      buildModeBtn: bd.querySelector('#buildModeBtn'),
      buildMenu: bd.querySelector('#buildMenu'),
      mentionChipsContainer: bd.querySelector('#mentionChipsContainer')
    };
  }

  renderConfigArea() {
    if (!this.options.showConfigArea || !this.options.configItems.length) return;

    const bd = this.elements.bd;
    const chatBox = bd.querySelector('.chat-box');
    if (!chatBox) return;

    // 创建配置区域容器
    const configArea = document.createElement('div');
    configArea.className = 'chat-config-area';

    this.options.configItems.forEach(item => {
      if (item.type === 'bullet') {
        const div = document.createElement('div');
        div.className = 'bullet';
        div.textContent = item.text;
        configArea.appendChild(div);
      } else if (item.type === 'card') {
        const card = document.createElement('div');
        card.className = 'cfg-card';
        const h3 = document.createElement('h3');
        h3.textContent = item.title;
        card.appendChild(h3);
        
        if (item.bullets) {
          item.bullets.forEach(bulletText => {
            const bullet = document.createElement('div');
            bullet.className = 'bullet';
            bullet.textContent = bulletText;
            card.appendChild(bullet);
          });
        }
        
        if (item.activateButton) {
          const btn = document.createElement('button');
          btn.className = 'btn-activate';
          btn.textContent = item.activateButton.text || 'Activate';
          if (item.activateButton.onClick) {
            btn.addEventListener('click', item.activateButton.onClick);
          }
          card.appendChild(btn);
        }
        
        configArea.appendChild(card);
      }
    });

    // 插入到 chat-box 之前
    bd.insertBefore(configArea, chatBox);
  }

  initEventListeners() {
    // Panel toggle
    if (this.elements.panelToggle) {
      this.elements.panelToggle.addEventListener('click', () => {
        const collapsed = this.container.classList.toggle('collapsed');
        document.body.classList.toggle('chat-collapsed', collapsed);
        if (collapsed) {
          this.elements.panelToggle.innerHTML = '<span class="orb" aria-hidden="true"></span>';
          this.elements.panelToggle.setAttribute('aria-label', 'Expand chat panel');
          this.elements.panelToggle.setAttribute('data-tip', 'Chat with Alva！');
        } else {
          this.elements.panelToggle.textContent = '▾';
          this.elements.panelToggle.setAttribute('aria-label', 'Collapse chat panel');
          this.elements.panelToggle.removeAttribute('data-tip');
        }
      });
    }

    // Build mode dropdown
    if (this.elements.buildModeBtn && this.elements.buildMenu) {
      this.elements.buildModeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.elements.buildMenu.classList.toggle('open');
      });

      this.elements.buildMenu.querySelectorAll('.build-menu-item').forEach(item => {
        item.addEventListener('click', () => {
          const mode = item.getAttribute('data-mode');
          this.elements.buildModeBtn.setAttribute('data-mode', mode);
          const label = mode === 'ask' ? 'Ask' : 'Build';
          const ico = mode === 'ask'
            ? '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M8 2a6 6 0 100 12A6 6 0 008 2zm0 1a5 5 0 110 10A5 5 0 008 3zm0 2a3 3 0 100 6 3 3 0 000-6zm0 1a2 2 0 110 4 2 2 0 010-4z" fill="currentColor"/></svg>'
            : '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M2 12h12v2H2v-2zm0-8h2v6H2V4zm4 2h2v4H6V6zm4-4h2v8h-2V2z" fill="currentColor"/></svg>';
          this.elements.buildModeBtn.innerHTML = ico + ' ' + label + ' <span>▾</span>';
          this.elements.buildMenu.querySelectorAll('.build-menu-item').forEach(i => i.classList.remove('active'));
          item.classList.add('active');
          this.elements.buildMenu.classList.remove('open');
          
          if (this.elements.cfgChatInput) {
            if (mode === 'ask') {
              this.elements.cfgChatInput.placeholder = 'Ask anything about investing';
            } else {
              this.elements.cfgChatInput.placeholder = 'Build an investing playbook from your ideas';
            }
          }
        });
      });

      document.addEventListener('click', (e) => {
        const dd = this.elements.buildModeBtn.closest('.build-btn-dd');
        if (dd && !dd.contains(e.target)) {
          this.elements.buildMenu.classList.remove('open');
        }
      });
    }

    // @ mention button
    if (this.elements.chatAtBtn) {
      this.elements.chatAtBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (this.elements.addContextMenu && this.elements.addContextMenu.classList.contains('open')) {
          this.hideAddContextMenu();
        } else {
          this.showAddContextMenu();
        }
      });
    }

    // Input handling
    if (this.elements.cfgChatInput) {
      this.elements.cfgChatInput.addEventListener('input', (e) => {
        const text = this.elements.cfgChatInput.value;
        const cleanedText = text.replace(/@`([^`]+)`/g, '');
        if (cleanedText !== text) {
          const cursorPos = this.elements.cfgChatInput.selectionStart;
          this.elements.cfgChatInput.value = cleanedText;
          this.elements.cfgChatInput.selectionStart = this.elements.cfgChatInput.selectionEnd = Math.min(cursorPos, cleanedText.length);
        }
        
        try {
          const pos = this.elements.cfgChatInput.selectionStart || 0;
          const prev = this.elements.cfgChatInput.value.slice(pos - 1, pos);
          if (prev === '@') {
            this.showAddContextMenu();
          }
        } catch {}
      });

      this.elements.cfgChatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
          e.preventDefault();
          this.handleSend();
        }
      });
    }

    // Send button
    if (this.elements.cfgChatSend) {
      this.elements.cfgChatSend.addEventListener('click', () => {
        this.handleSend();
      });
    }

    // Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.elements.addContextMenu) {
        this.hideAddContextMenu();
      }
    });

    // Click outside
    document.addEventListener('click', (e) => {
      const compose = this.elements.bd.querySelector('.chat-compose');
      if (compose && this.elements.addContextMenu && !compose.contains(e.target) && !this.elements.addContextMenu.contains(e.target)) {
        this.hideAddContextMenu();
      }
    });
  }

  getIconSvg(iconType) {
    const icons = {
      chart: '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M2 12h12v2H2v-2zm0-8h2v6H2V4zm4 2h2v4H6V6zm4-4h2v8h-2V2z" fill="currentColor"/></svg>',
      list: '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M2 3h12v2H2V3zm0 4h12v2H2V7zm0 4h8v2H2v-2z" fill="currentColor"/></svg>',
      refresh: '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 1a6 6 0 110 12A6 6 0 008 2zm0 2v2h2l-2-2zm0 4v2h2l-2-2z" fill="currentColor"/><path d="M8 3l2 2-2 2M8 9l2 2-2 2" stroke="currentColor" stroke-width="1" fill="none" stroke-linecap="round"/></svg>',
      widget: '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="4" width="12" height="8" fill="none" stroke="currentColor" stroke-width="1"/><path d="M4 10l2-2 2 2 4-4 2 2v2H4z" fill="currentColor" opacity="0.6"/><circle cx="5" cy="6" r="0.8" fill="currentColor"/></svg>'
    };
    return icons[iconType] || icons.widget;
  }

  getMentionItem(label) {
    for (const category of Object.keys(this.options.contextData)) {
      const item = this.options.contextData[category].find(i => i.label === label);
      if (item) return item;
    }
    return null;
  }

  addMention(label) {
    if (!this.activeMentions.includes(label)) {
      this.activeMentions.push(label);
      this.renderMentionChips();
    }
  }

  removeMentionFromList(label) {
    this.activeMentions = this.activeMentions.filter(m => m !== label);
    this.renderMentionChips();
  }

  renderMentionChips() {
    if (!this.elements.mentionChipsContainer) return;
    
    this.elements.mentionChipsContainer.innerHTML = '';
    
    const card = this.elements.mentionChipsContainer.closest('.chat-input-card');
    if (card) {
      if (this.activeMentions.length > 0) {
        card.classList.add('has-mentions');
      } else {
        card.classList.remove('has-mentions');
      }
    }
    
    this.activeMentions.forEach(label => {
      const item = this.getMentionItem(label);
      const chip = document.createElement('div');
      chip.className = 'mention-chip';
      
      const icon = document.createElement('div');
      icon.className = 'mention-chip-icon';
      icon.innerHTML = this.getIconSvg(item ? item.icon : 'widget');
      
      const labelEl = document.createElement('span');
      labelEl.className = 'mention-chip-label';
      labelEl.textContent = label;
      
      const removeBtn = document.createElement('button');
      removeBtn.className = 'mention-chip-remove';
      removeBtn.type = 'button';
      removeBtn.setAttribute('aria-label', 'Remove');
      removeBtn.innerHTML = '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';
      removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        this.removeMentionFromList(label);
      });
      
      chip.appendChild(icon);
      chip.appendChild(labelEl);
      chip.appendChild(removeBtn);
      this.elements.mentionChipsContainer.appendChild(chip);
    });
  }

  buildAddContextMenu() {
    if (!this.elements.addContextBody) return;
    this.elements.addContextBody.innerHTML = '';
    
    Object.keys(this.options.contextData).forEach(category => {
      const categoryDiv = document.createElement('div');
      categoryDiv.className = 'add-context-category';
      
      const title = document.createElement('div');
      title.className = 'add-context-category-title';
      title.textContent = category.charAt(0).toUpperCase() + category.slice(1);
      categoryDiv.appendChild(title);
      
      this.options.contextData[category].forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'add-context-item';
        
        const icon = document.createElement('div');
        icon.className = 'add-context-item-icon';
        icon.innerHTML = this.getIconSvg(item.icon || 'widget');
        
        const content = document.createElement('div');
        content.className = 'add-context-item-content';
        
        const label = document.createElement('div');
        label.className = 'add-context-item-label';
        label.textContent = item.label;
        content.appendChild(label);
        
        if (item.badge) {
          const badge = document.createElement('div');
          badge.className = 'add-context-item-badge';
          badge.textContent = item.badge;
          content.appendChild(badge);
        }
        
        itemDiv.appendChild(icon);
        itemDiv.appendChild(content);
        itemDiv.addEventListener('click', () => {
          this.addMention(item.label);
          this.hideAddContextMenu();
        });
        
        categoryDiv.appendChild(itemDiv);
      });
      
      this.elements.addContextBody.appendChild(categoryDiv);
    });
  }

  showAddContextMenu() {
    if (!this.elements.addContextMenu || !this.elements.cfgChatInput) return;
    this.buildAddContextMenu();
    const inputRect = this.elements.cfgChatInput.getBoundingClientRect();
    
    this.elements.addContextMenu.style.visibility = 'hidden';
    this.elements.addContextMenu.style.display = 'flex';
    const menuRect = this.elements.addContextMenu.getBoundingClientRect();
    
    const left = inputRect.left + 6;
    const top = inputRect.top - menuRect.height - 4;
    
    this.elements.addContextMenu.style.left = left + 'px';
    this.elements.addContextMenu.style.top = Math.max(4, top) + 'px';
    this.elements.addContextMenu.style.visibility = 'visible';
    this.elements.addContextMenu.classList.add('open');
  }

  hideAddContextMenu() {
    if (!this.elements.addContextMenu) return;
    this.elements.addContextMenu.classList.remove('open');
    this.elements.addContextMenu.style.visibility = '';
    this.elements.addContextMenu.style.display = '';
  }

  getFinalInputText() {
    const text = this.elements.cfgChatInput ? this.elements.cfgChatInput.value.trim() : '';
    const mentionTexts = this.activeMentions.map(label => '@`' + label + '`').join(' ');
    return text + (text && mentionTexts ? ' ' : '') + mentionTexts;
  }

  handleSend() {
    const text = this.getFinalInputText();
    if (!text.trim()) return;
    
    // Add user message
    if (this.elements.cfgChatList) {
      const you = document.createElement('div');
      you.className = 'chat-msg msg-you';
      you.innerHTML = '<div class="chat-role">You</div><div>' + this.escapeHtml(text) + '</div>';
      this.elements.cfgChatList.appendChild(you);
    }
    
    // Clear input
    if (this.elements.cfgChatInput) {
      this.elements.cfgChatInput.value = '';
    }
    this.activeMentions = [];
    this.renderMentionChips();
    
    // Call custom handler or default
    if (this.options.onSend) {
      this.options.onSend(text, this);
    } else {
      this.defaultResponse();
    }
  }

  defaultResponse() {
    if (!this.elements.cfgChatList) return;
    
    setTimeout(() => {
      const ai = document.createElement('div');
      ai.className = 'chat-msg msg-ai';
      ai.innerHTML = '<div class="chat-role">AI</div><div>Noted. This box is for chatting about the current playbook.</div>';
      this.elements.cfgChatList.appendChild(ai);
      this.elements.cfgChatList.scrollTop = this.elements.cfgChatList.scrollHeight;
    }, 500);
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Public API: 允许外部添加 mention
  addMentionFromExternal(label) {
    this.addMention(label);
  }
}
