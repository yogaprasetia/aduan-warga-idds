var InaUI = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/js/bundle.js
  var bundle_exports = {};
  __export(bundle_exports, {
    DatePicker: () => DatePicker,
    PhoneInput: () => PhoneInput,
    Table: () => Table,
    TimePicker: () => TimePicker,
    initAccordion: () => initAccordion,
    initButtonGroup: () => initButtonGroup,
    initCheckbox: () => initCheckbox,
    initChip: () => initChip2,
    initDatepicker: () => initDatepicker,
    initDrawer: () => initDrawer,
    initDropdown: () => initDropdown,
    initFileUpload: () => initFileUpload,
    initFileUploadBase: () => initFileUploadBase,
    initFileUploadItem: () => initFileUploadItem,
    initImgCompare: () => initImgCompare2,
    initModal: () => initModal,
    initMonthPicker: () => initMonthPicker,
    initPagination: () => initPagination,
    initRadioButton: () => initRadioButton,
    initRangeDatepicker: () => initRangeDatepicker,
    initSelectDropdown: () => initSelectDropdown,
    initSingleFileUpload: () => initSingleFileUpload,
    initStepper: () => initStepper,
    initTab: () => initTab,
    initTabHorizontal: () => initTabHorizontal,
    initTabVertical: () => initTabVertical,
    initTable: () => initTable,
    initTimepicker: () => initTimepicker,
    initToggle: () => initToggle,
    initYearPicker: () => initYearPicker,
    setBrandTheme: () => setBrandTheme,
    showToast: () => showToast
  });

  // src/js/components/stateful/checkbox.js
  function initCheckbox(rootSelector = `.${PREFIX}-checkbox`) {
    const checkboxes = document.querySelectorAll(rootSelector);
    checkboxes.forEach((checkboxLabel) => {
      if (checkboxLabel.__inaCheckboxInitialized) return;
      const input = checkboxLabel.querySelector(`.${PREFIX}-checkbox__input`);
      const box = checkboxLabel.querySelector(`.${PREFIX}-checkbox__box`);
      if (!input || !box) return;
      const ICON_CHECK = `
      <svg class="${PREFIX}-checkbox__icon" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
      const ICON_MINUS = `
      <svg class="${PREFIX}-checkbox__icon" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
      const updateState = () => {
        box.classList.remove(`${PREFIX}-checkbox__box--checked`);
        box.classList.remove(`${PREFIX}-checkbox__box--unchecked`);
        box.classList.remove(`${PREFIX}-checkbox__box--indeterminate`);
        checkboxLabel.classList.remove(`${PREFIX}-checkbox--disabled`);
        if (input.disabled) {
          checkboxLabel.classList.add(`${PREFIX}-checkbox--disabled`);
        }
        if (input.indeterminate) {
          box.classList.add(`${PREFIX}-checkbox__box--indeterminate`);
          box.innerHTML = ICON_MINUS;
        } else if (input.checked) {
          box.classList.add(`${PREFIX}-checkbox__box--checked`);
          box.innerHTML = ICON_CHECK;
        } else {
          box.classList.add(`${PREFIX}-checkbox__box--unchecked`);
          box.innerHTML = "";
        }
      };
      updateState();
      input.addEventListener("change", updateState);
      checkboxLabel.__inaCheckboxInitialized = true;
      checkboxLabel.updateState = updateState;
    });
  }

  // src/js/components/stateful/tab.js
  function initTab(rootSelector = `.${PREFIX}-tab`) {
    document.querySelectorAll(rootSelector).forEach((tab) => {
      const tabItem = tab.querySelectorAll(`.${PREFIX}-tab-item`);
      tabItem.forEach((tabButton) => {
        function updateState() {
          const index = Array.from(tabItem).indexOf(tabButton);
          tabItem.forEach((tabButton2, i) => {
            tabButton2.classList.remove("active");
            tabButton2.setAttribute("aria-selected", "false");
            if (i === index) {
              tabButton2.classList.add("active");
              tabButton2.setAttribute("aria-selected", "true");
            }
          });
          tab.dispatchEvent(
            new CustomEvent("tab:change", {
              detail: { activeIndex: index },
              bubbles: true,
              composed: true
            })
          );
        }
        tabButton.addEventListener("click", updateState);
      });
    });
  }

  // src/js/components/stateful/toggle.js
  function initToggle(rootSelector = `.${PREFIX}-toggle`) {
    const toggles = document.querySelectorAll(rootSelector);
    toggles.forEach((toggle) => {
      const input = toggle.querySelector(`.${PREFIX}-toggle__input`);
      const track = toggle.querySelector(`.${PREFIX}-toggle__track`);
      const thumb = toggle.querySelector(`.${PREFIX}-toggle__thumb`);
      if (!input || !track || !thumb) return;
      const updateState = () => {
        const isChecked = input.checked;
        const isDisabled = input.disabled;
        toggle.setAttribute("aria-checked", String(isChecked));
        if (isChecked) {
          toggle.classList.add(`${PREFIX}-toggle--checked`);
        } else {
          toggle.classList.remove(`${PREFIX}-toggle--checked`);
        }
        if (isDisabled) {
          toggle.classList.add(`${PREFIX}-toggle--disabled`);
        } else {
          toggle.classList.remove(`${PREFIX}-toggle--disabled`);
        }
        if (isChecked) {
          track.classList.add(`${PREFIX}-toggle__track--checked`);
        } else {
          track.classList.remove(`${PREFIX}-toggle__track--checked`);
        }
        if (isDisabled) {
          track.classList.add(`${PREFIX}-toggle__track--disabled`);
        } else {
          track.classList.remove(`${PREFIX}-toggle__track--disabled`);
        }
        if (isChecked) {
          thumb.classList.add(`${PREFIX}-toggle__thumb--checked`);
        } else {
          thumb.classList.remove(`${PREFIX}-toggle__thumb--checked`);
        }
        if (isDisabled) {
          thumb.classList.add(`${PREFIX}-toggle__thumb--disabled`);
        } else {
          thumb.classList.remove(`${PREFIX}-toggle__thumb--disabled`);
        }
      };
      updateState();
      if (!input.disabled) {
        toggle.addEventListener("click", (e) => {
          if (e.target !== input) {
            e.preventDefault();
            input.checked = !input.checked;
            input.dispatchEvent(new Event("change", { bubbles: true }));
          }
        });
        toggle.addEventListener("keydown", (e) => {
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            input.checked = !input.checked;
            input.dispatchEvent(new Event("change", { bubbles: true }));
          }
        });
      }
      input.addEventListener("change", () => {
        updateState();
        toggle.dispatchEvent(
          new CustomEvent("toggle:change", {
            detail: { checked: input.checked },
            bubbles: true,
            composed: true
          })
        );
      });
    });
  }

  // src/js/components/stateless/accordion-group.js
  var AccordionGroup = class {
    constructor(element) {
      this.element = element;
      this.items = /* @__PURE__ */ new Map();
      this.itemsArray = [];
      this.isMultiple = element.getAttribute("data-multiple-open") === "true" || element.getAttribute("data-behavior") === "multiple";
      this.openIndexes = [];
      this.element.__inaAccordionGroup = this;
    }
    registerItem(item) {
      const index = this.items.size;
      this.items.set(item.id, index);
      this.itemsArray.push(item);
      if (item.defaultOpen) {
        if (this.isMultiple) {
          if (!this.openIndexes.includes(index)) {
            this.openIndexes.push(index);
          }
        } else {
          if (this.openIndexes.length === 0) {
            this.openIndexes.push(index);
          }
        }
      }
      return index;
    }
    unregisterItem(item) {
      const index = this.items.get(item.id);
      if (index !== void 0) {
        this.items.delete(item.id);
        this.itemsArray = this.itemsArray.filter((i) => i !== item);
        this.openIndexes = this.openIndexes.filter((idx) => idx !== index).map((idx) => idx > index ? idx - 1 : idx);
        const newMap = /* @__PURE__ */ new Map();
        this.itemsArray.forEach((itm, newIdx) => {
          newMap.set(itm.id, newIdx);
        });
        this.items = newMap;
      }
    }
    handleItemToggle(index, isOpen) {
      const prevIndexes = [...this.openIndexes];
      let nextIndexes = [];
      if (this.isMultiple) {
        if (isOpen) {
          if (!prevIndexes.includes(index)) {
            nextIndexes = [...prevIndexes, index];
          } else {
            nextIndexes = prevIndexes;
          }
        } else {
          nextIndexes = prevIndexes.filter((idx) => idx !== index);
        }
      } else {
        if (isOpen) {
          nextIndexes = [index];
        } else {
          nextIndexes = [];
        }
      }
      this.openIndexes = nextIndexes;
      this.notifyItems();
    }
    isItemOpen(index) {
      return this.openIndexes.includes(index);
    }
    getItemIndex(itemId) {
      return this.items.get(itemId);
    }
    // Notify all children to update their visual state based on new openIndexes
    notifyItems() {
      this.itemsArray.forEach((item, index) => {
        const isOpen = this.openIndexes.includes(index);
        item.setOpenState(isOpen);
      });
    }
  };

  // src/js/components/stateless/accordion.js
  var Accordion = class {
    constructor(element) {
      this.element = element;
      this.toggle = element.querySelector(`.${PREFIX}-accordion__toggle`);
      this.content = element.querySelector(`.${PREFIX}-accordion__content`);
      this.body = element.querySelector(`.${PREFIX}-accordion__body`);
      this.icon = element.querySelector(`.${PREFIX}-accordion__icon`);
      if (!this.toggle || !this.content || !this.body) {
        console.warn("[InaUI] Accordion missing required elements", element);
        return;
      }
      this.id = element.id || `accordion-${Math.random().toString(36).substr(2, 9)}`;
      this.defaultOpen = element.getAttribute("data-default-open") === "true" || element.classList.contains(`${PREFIX}-accordion--open`);
      this.isDisabled = element.classList.contains(`${PREFIX}-accordion--disabled`) || this.toggle.hasAttribute("disabled");
      this.group = this.findParentGroup();
      this.index = -1;
      if (this.group) {
        this.index = this.group.registerItem(this);
      }
      this.toggle.addEventListener("click", (e) => this.handleClick(e));
      this.toggle.addEventListener("keydown", (e) => this.handleKeyDown(e));
      if (this.group) {
        const isOpen = this.group.isItemOpen(this.index);
        this.setOpenState(isOpen);
      } else {
        this.setOpenState(this.defaultOpen);
      }
    }
    findParentGroup() {
      let parent = this.element.parentElement;
      while (parent) {
        if (parent.classList.contains(`${PREFIX}-accordion-group`) && parent.__inaAccordionGroup) {
          return parent.__inaAccordionGroup;
        }
        parent = parent.parentElement;
      }
      return null;
    }
    handleClick(e) {
      if (this.isDisabled) return;
      e.stopPropagation();
      const isOpen = this.element.classList.contains(`${PREFIX}-accordion--open`);
      const nextState = !isOpen;
      if (this.group) {
        this.group.handleItemToggle(this.index, nextState);
      } else {
        this.setOpenState(nextState);
      }
    }
    handleKeyDown(e) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const currentAccordion = this.element;
        const container = currentAccordion.closest(".ina-accordion-group") || currentAccordion.parentElement;
        if (!container) return;
        const toggles = Array.from(
          container.querySelectorAll(".ina-accordion__toggle:not([disabled])")
        );
        const currentIndex = toggles.indexOf(this.toggle);
        if (currentIndex > -1) {
          const nextIndex = e.key === "ArrowDown" ? (currentIndex + 1) % toggles.length : (currentIndex - 1 + toggles.length) % toggles.length;
          toggles[nextIndex]?.focus();
        }
      }
    }
    setOpenState(isOpen) {
      if (isOpen) {
        this.element.classList.add(`${PREFIX}-accordion--open`);
        this.toggle.setAttribute("aria-expanded", "true");
        if (this.icon) this.icon.classList.add(`${PREFIX}-accordion__icon--open`);
        this.content.classList.add(`${PREFIX}-accordion__content--open`);
        this.body.classList.add(`${PREFIX}-accordion__body--open`);
        this.body.style.maxHeight = `${this.body.scrollHeight}px`;
      } else {
        this.element.classList.remove(`${PREFIX}-accordion--open`);
        this.toggle.setAttribute("aria-expanded", "false");
        if (this.icon)
          this.icon.classList.remove(`${PREFIX}-accordion__icon--open`);
        this.content.classList.remove(`${PREFIX}-accordion__content--open`);
        this.body.classList.remove(`${PREFIX}-accordion__body--open`);
        this.body.style.maxHeight = null;
      }
    }
  };
  function initAccordion(rootSelector = `.${PREFIX}-accordion-group`) {
    const accordionGroups = document.querySelectorAll(rootSelector);
    accordionGroups.forEach((groupEl) => {
      if (!groupEl.__inaAccordionGroup) {
        new AccordionGroup(groupEl);
      }
    });
    const accordions = document.querySelectorAll(`.${PREFIX}-accordion`);
    accordions.forEach((accEl) => {
      if (!accEl.__inaAccordion) {
        const acc = new Accordion(accEl);
        accEl.__inaAccordion = acc;
      }
    });
  }

  // src/js/components/stateful/date-picker.js
  var DatePicker = class {
    constructor(selectorOrElement, options = {}) {
      this.container = typeof selectorOrElement === "string" ? document.querySelector(selectorOrElement) : selectorOrElement;
      if (!this.container) {
        console.warn("[IDDS DatePicker] Container not found:", selectorOrElement);
        return;
      }
      if (this.container.dataset.initialized === "true") {
        return;
      }
      this.container.dataset.initialized = "true";
      const dataMode = this.container.dataset.mode;
      const dataFormat = this.container.dataset.format;
      this.options = {
        mode: dataMode || "single",
        // 'single' | 'multiple' | 'range'
        format: dataFormat || "DD/MM/YYYY",
        disabledBackDate: false,
        disabledFutureDate: false,
        disabledDateBefore: null,
        disabledDateAfter: null,
        disabled: false,
        readonly: false,
        panelOnly: false,
        onChange: null,
        triggerWidth: "",
        panelMaxHeight: "",
        allowClear: true,
        // Added allowClear option
        className: "",
        // Added className option
        ...options
      };
      this.state = {
        viewDate: /* @__PURE__ */ new Date(),
        nextViewDate: (() => {
          const next = /* @__PURE__ */ new Date();
          next.setMonth(next.getMonth() + 1);
          return next;
        })(),
        selectedDate: null,
        selectedDates: [],
        rangeDate: [null, null],
        isOpen: false
      };
      this.MONTHS_SHORT_ID = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "Mei",
        "Jun",
        "Jul",
        "Agu",
        "Sep",
        "Okt",
        "Nov",
        "Des"
      ];
      this.DAYS_SHORT = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
      this.elements = {};
      this.initDOM();
      this.bindEvents();
      this.updateTrigger();
    }
    formatDate(date) {
      if (!date) return "";
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }
    isDateDisabled(date) {
      if (this.options.disabled || this.options.readonly) return true;
      const today = /* @__PURE__ */ new Date();
      today.setHours(0, 0, 0, 0);
      const d = new Date(date);
      d.setHours(0, 0, 0, 0);
      if (this.options.disabledBackDate && d < today) return true;
      if (this.options.disabledFutureDate && d > today) return true;
      if (this.options.disabledDateBefore) {
        const before = new Date(this.options.disabledDateBefore);
        before.setHours(0, 0, 0, 0);
        if (d < before) return true;
      }
      if (this.options.disabledDateAfter) {
        const after = new Date(this.options.disabledDateAfter);
        after.setHours(0, 0, 0, 0);
        if (d > after) return true;
      }
      return false;
    }
    createIcon(name, size = 20) {
      if (name === "chevron-left")
        return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6l6 6" /></svg>`;
      if (name === "chevron-right")
        return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6l-6 6" /></svg>`;
      if (name === "calendar")
        return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`;
      return "";
    }
    isLeftGreaterThanRight(leftDate, rightDate) {
      const leftYear = leftDate.getFullYear();
      const leftMonth = leftDate.getMonth();
      const rightYear = rightDate.getFullYear();
      const rightMonth = rightDate.getMonth();
      return leftYear > rightYear || leftYear === rightYear && leftMonth >= rightMonth;
    }
    navigateMonth(isNextMonth, direction) {
      const { mode } = this.options;
      if (isNextMonth) {
        const newDate = new Date(this.state.nextViewDate);
        if (direction === "prev") {
          newDate.setMonth(newDate.getMonth() - 1);
        } else {
          newDate.setMonth(newDate.getMonth() + 1);
        }
        if (mode !== "single" && this.isLeftGreaterThanRight(this.state.viewDate, newDate)) {
          const adjustedLeft = new Date(newDate);
          adjustedLeft.setMonth(adjustedLeft.getMonth() - 1);
          this.state.viewDate = adjustedLeft;
        }
        this.state.nextViewDate = newDate;
      } else {
        const newDate = new Date(this.state.viewDate);
        if (direction === "prev") {
          newDate.setMonth(newDate.getMonth() - 1);
        } else {
          newDate.setMonth(newDate.getMonth() + 1);
        }
        if (mode !== "single" && this.isLeftGreaterThanRight(newDate, this.state.nextViewDate)) {
          const adjustedRight = new Date(newDate);
          adjustedRight.setMonth(adjustedRight.getMonth() + 1);
          this.state.nextViewDate = adjustedRight;
        }
        this.state.viewDate = newDate;
      }
      this.renderPanel();
    }
    setMonthExact(isNextMonth, m) {
      const { mode } = this.options;
      if (isNextMonth) {
        const newDate = new Date(this.state.nextViewDate);
        newDate.setMonth(m);
        if (mode !== "single" && this.isLeftGreaterThanRight(this.state.viewDate, newDate)) {
          const adjustedLeft = new Date(newDate);
          adjustedLeft.setMonth(adjustedLeft.getMonth() - 1);
          this.state.viewDate = adjustedLeft;
        }
        this.state.nextViewDate = newDate;
      } else {
        const newDate = new Date(this.state.viewDate);
        newDate.setMonth(m);
        if (mode !== "single" && this.isLeftGreaterThanRight(newDate, this.state.nextViewDate)) {
          const adjustedRight = new Date(newDate);
          adjustedRight.setMonth(adjustedRight.getMonth() + 1);
          this.state.nextViewDate = adjustedRight;
        }
        this.state.viewDate = newDate;
      }
      this.renderPanel();
    }
    setYearExact(isNextMonth, y) {
      const { mode } = this.options;
      if (isNextMonth) {
        const newDate = new Date(this.state.nextViewDate);
        newDate.setFullYear(y);
        if (mode !== "single" && this.isLeftGreaterThanRight(this.state.viewDate, newDate)) {
          const adjustedLeft = new Date(newDate);
          adjustedLeft.setMonth(adjustedLeft.getMonth() - 1);
          this.state.viewDate = adjustedLeft;
        }
        this.state.nextViewDate = newDate;
      } else {
        const newDate = new Date(this.state.viewDate);
        newDate.setFullYear(y);
        if (mode !== "single" && this.isLeftGreaterThanRight(newDate, this.state.nextViewDate)) {
          const adjustedRight = new Date(newDate);
          adjustedRight.setMonth(adjustedRight.getMonth() + 1);
          this.state.nextViewDate = adjustedRight;
        }
        this.state.viewDate = newDate;
      }
      this.renderPanel();
    }
    getFullDayName(shortName) {
      const map = {
        Min: "Minggu",
        Sen: "Senin",
        Sel: "Selasa",
        Rab: "Rabu",
        Kam: "Kamis",
        Jum: "Jumat",
        Sab: "Sabtu"
      };
      return map[shortName] || shortName;
    }
    initDOM() {
      if (!this.container.classList.contains(`${PREFIX}-date-picker`)) {
        this.container.classList.add(`${PREFIX}-date-picker`);
      }
      let trigger = this.container.querySelector(
        `.${PREFIX}-date-picker__trigger`
      );
      if (!trigger && !this.options.panelOnly) {
        trigger = document.createElement("button");
        trigger.type = "button";
        trigger.className = `${PREFIX}-date-picker__trigger ${PREFIX}-date-picker__trigger--size-md`;
        if (this.options.disabled) trigger.disabled = true;
        if (this.options.triggerWidth) {
          trigger.style.width = typeof this.options.triggerWidth === "number" ? `${this.options.triggerWidth}px` : this.options.triggerWidth;
        }
        trigger.setAttribute("aria-haspopup", "dialog");
        trigger.setAttribute("aria-expanded", "false");
        trigger.setAttribute("aria-label", "Pilih Tanggal");
        const textWrapper = document.createElement("span");
        textWrapper.className = `${PREFIX}-date-picker__trigger-text ${PREFIX}-date-picker__trigger-text--placeholder`;
        textWrapper.textContent = "Pilih Tanggal";
        const iconWrapper = document.createElement("span");
        iconWrapper.className = `${PREFIX}-date-picker__trigger-icon`;
        iconWrapper.innerHTML = this.createIcon("calendar");
        trigger.appendChild(textWrapper);
        trigger.appendChild(iconWrapper);
        this.container.appendChild(trigger);
      } else if (trigger) {
        if (!trigger.hasAttribute("aria-haspopup"))
          trigger.setAttribute("aria-haspopup", "dialog");
        if (!trigger.hasAttribute("aria-expanded"))
          trigger.setAttribute("aria-expanded", "false");
        if (!trigger.hasAttribute("aria-label"))
          trigger.setAttribute("aria-label", "Pilih Tanggal");
      }
      if (this.options.allowClear && !this.options.panelOnly) {
        let clearBtn = this.container.querySelector(`.${PREFIX}-date-picker__clear-button`);
        if (!clearBtn) {
          clearBtn = document.createElement("button");
          clearBtn.type = "button";
          clearBtn.className = `${PREFIX}-date-picker__clear-button`;
          clearBtn.setAttribute("aria-label", "Hapus tanggal terpilih");
          clearBtn.innerHTML = this.createIcon("x");
          clearBtn.style.display = "none";
          this.container.appendChild(clearBtn);
        }
        this.elements.clearBtn = clearBtn;
      }
      this.elements.trigger = trigger;
      if (trigger) {
        this.elements.triggerText = trigger.querySelector(
          `.${PREFIX}-date-picker__trigger-text`
        );
      }
      let panel = this.container.querySelector(`.${PREFIX}-date-picker__panel`);
      if (!panel) {
        panel = document.createElement("div");
        panel.className = `${PREFIX}-date-picker__panel`;
        if (this.options.panelMaxHeight) {
          panel.style.maxHeight = typeof this.options.panelMaxHeight === "number" ? `${this.options.panelMaxHeight}px` : this.options.panelMaxHeight;
          panel.style.overflowY = "auto";
        }
        this.container.appendChild(panel);
      }
      this.elements.panel = panel;
      if (!this.options.panelOnly) {
        panel.style.display = "none";
        panel.style.position = "absolute";
      } else {
        panel.style.display = "block";
        panel.style.position = "relative";
        panel.classList.add(`${PREFIX}-date-picker__panel--open`);
      }
      let panelContent = panel.querySelector(
        `.${PREFIX}-date-picker__panel-content`
      );
      if (!panelContent) {
        panelContent = document.createElement("div");
        panelContent.className = `${PREFIX}-date-picker__panel-content`;
        panel.appendChild(panelContent);
      }
      if (this.options.mode === "range" || this.options.mode === "multiple") {
        panelContent.classList.add(`${PREFIX}-date-picker__panel-content--dual`);
      }
      this.elements.panelContent = panelContent;
    }
    updateTrigger() {
      if (this.options.panelOnly || !this.elements.triggerText) return;
      const { mode } = this.options;
      const textEl = this.elements.triggerText;
      if (mode === "single") {
        if (this.state.selectedDate) {
          textEl.textContent = this.formatDate(this.state.selectedDate);
          textEl.classList.add(`${PREFIX}-date-picker__trigger-text--value`);
          textEl.classList.remove(
            `${PREFIX}-date-picker__trigger-text--placeholder`
          );
        } else {
          textEl.textContent = "Pilih Tanggal";
          textEl.classList.remove(`${PREFIX}-date-picker__trigger-text--value`);
          textEl.classList.add(
            `${PREFIX}-date-picker__trigger-text--placeholder`
          );
        }
      } else if (mode === "range") {
        if (this.state.rangeDate[0] && this.state.rangeDate[1]) {
          const start = this.formatDate(this.state.rangeDate[0]);
          const end = this.formatDate(this.state.rangeDate[1]);
          textEl.textContent = `${start} - ${end}`;
          textEl.classList.add(`${PREFIX}-date-picker__trigger-text--value`);
          textEl.classList.remove(
            `${PREFIX}-date-picker__trigger-text--placeholder`
          );
        } else if (this.state.rangeDate[0]) {
          textEl.textContent = `${this.formatDate(this.state.rangeDate[0])} - ...`;
          textEl.classList.add(`${PREFIX}-date-picker__trigger-text--value`);
        } else {
          textEl.textContent = "Pilih Rentang Tanggal";
          textEl.classList.remove(`${PREFIX}-date-picker__trigger-text--value`);
          textEl.classList.add(
            `${PREFIX}-date-picker__trigger-text--placeholder`
          );
        }
      } else if (mode === "multiple") {
        if (this.state.selectedDates.length > 0) {
          textEl.textContent = `${this.state.selectedDates.length} Tanggal Terpilih`;
          textEl.classList.add(`${PREFIX}-date-picker__trigger-text--value`);
          textEl.classList.remove(
            `${PREFIX}-date-picker__trigger-text--placeholder`
          );
        } else {
          textEl.textContent = "Pilih Beberapa Tanggal";
          textEl.classList.remove(`${PREFIX}-date-picker__trigger-text--value`);
          textEl.classList.add(
            `${PREFIX}-date-picker__trigger-text--placeholder`
          );
        }
      }
    }
    createMonthPicker(initialMonth, onChange) {
      const container = document.createElement("div");
      container.className = `${PREFIX}-month-picker`;
      let currentMonthIdx = initialMonth;
      let isPickerOpen = false;
      const pickerTrigger = document.createElement("button");
      pickerTrigger.type = "button";
      pickerTrigger.className = `${PREFIX}-month-picker__trigger ${PREFIX}-month-picker__trigger--size-sm`;
      const updateText = () => {
        pickerTrigger.innerHTML = `<span class="${PREFIX}-month-picker__trigger-text">${this.MONTHS_SHORT_ID[currentMonthIdx]}</span>`;
      };
      updateText();
      const pickerPanel = document.createElement("div");
      pickerPanel.className = `${PREFIX}-month-picker__panel`;
      const grid = document.createElement("div");
      grid.className = `${PREFIX}-month-picker__grid`;
      this.MONTHS_SHORT_ID.forEach((m, idx) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = `${PREFIX}-month-picker__month-option`;
        if (idx === currentMonthIdx)
          btn.classList.add(`${PREFIX}-month-picker__month-option--selected`);
        btn.textContent = m;
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          currentMonthIdx = idx;
          updateText();
          togglePicker(false);
          onChange(idx);
        });
        grid.appendChild(btn);
      });
      pickerPanel.appendChild(grid);
      container.append(pickerTrigger, pickerPanel);
      pickerTrigger.addEventListener("click", (e) => togglePicker(!isPickerOpen));
      const togglePicker = (show) => {
        isPickerOpen = show;
        if (show) {
          pickerPanel.classList.add(`${PREFIX}-month-picker__panel--open`);
          pickerTrigger.setAttribute("aria-expanded", "true");
        } else {
          pickerPanel.classList.remove(`${PREFIX}-month-picker__panel--open`);
          pickerTrigger.setAttribute("aria-expanded", "false");
        }
      };
      document.addEventListener("click", (e) => {
        if (!container.contains(e.target)) togglePicker(false);
      });
      return {
        element: container,
        setMonth: (m) => {
          currentMonthIdx = m;
          updateText();
        }
      };
    }
    createYearPicker(initialYear, onChange) {
      const container = document.createElement("div");
      container.className = `${PREFIX}-year-picker`;
      let currentYearVal = initialYear;
      let isPickerOpen = false;
      let decadeStart = Math.floor(initialYear / (window.innerWidth <= 639 ? 9 : 20)) * (window.innerWidth <= 639 ? 9 : 20);
      const pickerTrigger = document.createElement("button");
      pickerTrigger.type = "button";
      pickerTrigger.className = `${PREFIX}-year-picker__trigger ${PREFIX}-year-picker__trigger--size-sm`;
      const updateText = () => {
        pickerTrigger.innerHTML = `<span class="${PREFIX}-year-picker__trigger-text">${currentYearVal}</span>`;
      };
      updateText();
      const pickerPanel = document.createElement("div");
      pickerPanel.className = `${PREFIX}-year-picker__panel`;
      const header = document.createElement("div");
      header.className = `${PREFIX}-year-picker__header`;
      const prevBtn = document.createElement("button");
      prevBtn.type = "button";
      prevBtn.className = `${PREFIX}-year-picker__nav-button`;
      prevBtn.innerHTML = this.createIcon("chevron-left");
      prevBtn.onclick = () => {
        const currentDecadeSize = window.innerWidth <= 639 ? 9 : 20;
        decadeStart -= currentDecadeSize;
        renderGrid();
      };
      const nextBtn = document.createElement("button");
      nextBtn.type = "button";
      nextBtn.className = `${PREFIX}-year-picker__nav-button`;
      nextBtn.innerHTML = this.createIcon("chevron-right");
      nextBtn.onclick = () => {
        const currentDecadeSize = window.innerWidth <= 639 ? 9 : 20;
        decadeStart += currentDecadeSize;
        renderGrid();
      };
      const rangeText = document.createElement("span");
      rangeText.className = `${PREFIX}-year-picker__decade-range`;
      header.append(prevBtn, rangeText, nextBtn);
      const grid = document.createElement("div");
      grid.className = `${PREFIX}-year-picker__grid`;
      const renderGrid = () => {
        grid.innerHTML = "";
        const currentDecadeSize = window.innerWidth <= 639 ? 9 : 20;
        rangeText.textContent = `${decadeStart} - ${decadeStart + currentDecadeSize - 1}`;
        for (let y = decadeStart; y < decadeStart + currentDecadeSize; y++) {
          const btn = document.createElement("button");
          btn.type = "button";
          btn.className = `${PREFIX}-year-picker__year-option`;
          if (y === currentYearVal)
            btn.classList.add(`${PREFIX}-year-picker__year-option--selected`);
          btn.textContent = y;
          btn.addEventListener("click", (e) => {
            e.stopPropagation();
            currentYearVal = y;
            updateText();
            togglePicker(false);
            onChange(y);
          });
          grid.appendChild(btn);
        }
      };
      pickerPanel.append(header, grid);
      container.append(pickerTrigger, pickerPanel);
      pickerTrigger.addEventListener("click", () => togglePicker(!isPickerOpen));
      const togglePicker = (show) => {
        isPickerOpen = show;
        if (show) {
          decadeStart = Math.floor(currentYearVal / 20) * 20;
          renderGrid();
          pickerPanel.classList.add(`${PREFIX}-year-picker__panel--open`);
        } else {
          pickerPanel.classList.remove(`${PREFIX}-year-picker__panel--open`);
        }
      };
      document.addEventListener("click", (e) => {
        if (!container.contains(e.target)) togglePicker(false);
      });
      return {
        element: container,
        setYear: (y) => {
          currentYearVal = y;
          updateText();
        }
      };
    }
    renderCalendarGrid(baseDate, isNextMonth = false) {
      const year = baseDate.getFullYear();
      const month = baseDate.getMonth();
      const { mode } = this.options;
      const container = document.createElement("div");
      container.className = !isNextMonth ? `${PREFIX}-date-picker__calendar-container` : `${PREFIX}-date-picker__calendar`;
      const header = document.createElement("div");
      header.className = isNextMonth ? `${PREFIX}-date-picker__next-month-header` : `${PREFIX}-date-picker__calendar-header`;
      const prevBtn = document.createElement("button");
      prevBtn.type = "button";
      prevBtn.className = `${PREFIX}-date-picker__nav-button`;
      prevBtn.innerHTML = this.createIcon("chevron-left");
      prevBtn.onclick = (e) => {
        e.stopPropagation();
        this.navigateMonth(isNextMonth, "prev");
      };
      prevBtn.onkeydown = (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          e.stopPropagation();
          this.navigateMonth(isNextMonth, "prev");
        }
      };
      header.appendChild(prevBtn);
      const controls = document.createElement("div");
      controls.className = `${PREFIX}-date-picker__header-controls`;
      const monthCont = document.createElement("div");
      monthCont.className = `${PREFIX}-date-picker__dropdown-container`;
      const monthPicker = this.createMonthPicker(month, (m) => {
        this.setMonthExact(isNextMonth, m);
      });
      monthCont.appendChild(monthPicker.element);
      const yearCont = document.createElement("div");
      yearCont.className = `${PREFIX}-date-picker__dropdown-container`;
      const yearPicker = this.createYearPicker(year, (y) => {
        this.setYearExact(isNextMonth, y);
      });
      yearCont.appendChild(yearPicker.element);
      controls.append(monthCont, yearCont);
      header.appendChild(controls);
      const nextBtn = document.createElement("button");
      nextBtn.type = "button";
      nextBtn.className = `${PREFIX}-date-picker__nav-button`;
      if (!isNextMonth && (mode === "range" || mode === "multiple")) {
        nextBtn.classList.add(`${PREFIX}-date-picker__nav-button--mobile-only`);
      }
      nextBtn.innerHTML = this.createIcon("chevron-right");
      nextBtn.onclick = (e) => {
        e.stopPropagation();
        this.navigateMonth(isNextMonth, "next");
      };
      nextBtn.onkeydown = (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          e.stopPropagation();
          this.navigateMonth(isNextMonth, "next");
        }
      };
      header.appendChild(nextBtn);
      const grid = document.createElement("div");
      grid.className = `${PREFIX}-date-picker__calendar-grid`;
      grid.setAttribute("role", "grid");
      this.DAYS_SHORT.forEach((d) => {
        const dh = document.createElement("div");
        dh.className = `${PREFIX}-date-picker__day-header`;
        dh.textContent = d;
        dh.setAttribute("role", "columnheader");
        dh.setAttribute("aria-label", this.getFullDayName(d));
        grid.appendChild(dh);
      });
      const firstDayOfMonth = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const daysInPrevMonth = new Date(year, month, 0).getDate();
      const today = /* @__PURE__ */ new Date();
      for (let i = firstDayOfMonth - 1; i >= 0; i--) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = `${PREFIX}-date-picker__day ${PREFIX}-date-picker__day--other-month ${PREFIX}-date-picker__day--disabled`;
        btn.textContent = daysInPrevMonth - i;
        grid.appendChild(btn);
      }
      for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(year, month, i);
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = `${PREFIX}-date-picker__day`;
        btn.textContent = i;
        btn.setAttribute("role", "gridcell");
        btn.tabIndex = -1;
        const disabled = this.isDateDisabled(date);
        if (disabled) {
          btn.classList.add(`${PREFIX}-date-picker__day--disabled`);
          btn.disabled = true;
        }
        let isSelected = false;
        let isInRange = false;
        if (mode === "single" && this.state.selectedDate) {
          if (date.toDateString() === this.state.selectedDate.toDateString())
            isSelected = true;
        } else if (mode === "multiple") {
          if (this.state.selectedDates.some(
            (d) => d.toDateString() === date.toDateString()
          ))
            isSelected = true;
        } else if (mode === "range") {
          const [start, end] = this.state.rangeDate;
          if (start && date.toDateString() === start.toDateString())
            isSelected = true;
          if (end && date.toDateString() === end.toDateString())
            isSelected = true;
          if (start && end && date > start && date < end) isInRange = true;
        }
        btn.setAttribute("aria-selected", isSelected.toString());
        if (isSelected) btn.classList.add(`${PREFIX}-date-picker__day--selected`);
        if (isInRange) btn.classList.add(`${PREFIX}-date-picker__day--in-range`);
        if (date.toDateString() === today.toDateString())
          btn.classList.add(`${PREFIX}-date-picker__day--today`);
        if (!isSelected && !isInRange && !disabled)
          btn.classList.add(`${PREFIX}-date-picker__day--hover`);
        if (!disabled && !this.options.readonly) {
          btn.onclick = (e) => {
            e.stopPropagation();
            this.handleDateSelect(date);
          };
          btn.onkeydown = (e) => {
            if (disabled || this.options.readonly) return;
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              this.handleDateSelect(date);
            } else if (["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp"].includes(e.key)) {
              e.preventDefault();
              const buttons = Array.from(grid.querySelectorAll("button"));
              const currentIndex = buttons.indexOf(btn);
              let nextIndex = currentIndex;
              if (e.key === "ArrowRight") nextIndex += 1;
              else if (e.key === "ArrowLeft") nextIndex -= 1;
              else if (e.key === "ArrowDown") nextIndex += 7;
              else if (e.key === "ArrowUp") nextIndex -= 7;
              const targetBtn = buttons[nextIndex];
              if (targetBtn) targetBtn.focus();
            }
          };
        }
        grid.appendChild(btn);
      }
      const usedCells = grid.children.length - 7;
      const remaining = 42 - usedCells;
      for (let i = 1; i <= remaining; i++) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = `${PREFIX}-date-picker__day ${PREFIX}-date-picker__day--other-month ${PREFIX}-date-picker__day--disabled`;
        btn.textContent = i;
        grid.appendChild(btn);
      }
      setTimeout(() => {
        const allButtons = Array.from(
          grid.querySelectorAll("button:not(.ina-date-picker__day--other-month)")
        );
        const selectedBtn = allButtons.find(
          (b) => b.classList.contains(`${PREFIX}-date-picker__day--selected`)
        );
        const todayBtn = allButtons.find(
          (b) => b.classList.contains(`${PREFIX}-date-picker__day--today`) && !b.disabled
        );
        const focusableBtn = selectedBtn || todayBtn || allButtons.find((b) => !b.disabled);
        if (focusableBtn) focusableBtn.tabIndex = 0;
      }, 0);
      container.append(header, grid);
      return container;
    }
    handleDateSelect(date) {
      const { mode } = this.options;
      if (mode === "single") {
        this.state.selectedDate = date;
        if (!this.options.panelOnly) this.close();
      } else if (mode === "multiple") {
        const existsIdx = this.state.selectedDates.findIndex(
          (d) => d.toDateString() === date.toDateString()
        );
        if (existsIdx >= 0) this.state.selectedDates.splice(existsIdx, 1);
        else this.state.selectedDates.push(date);
      } else if (mode === "range") {
        const [start, end] = this.state.rangeDate;
        if (!start || start && end) {
          this.state.rangeDate = [date, null];
        } else {
          if (date < start) {
            this.state.rangeDate = [date, start];
          } else {
            this.state.rangeDate = [start, date];
          }
          if (!this.options.panelOnly) this.close();
        }
      }
      this.renderPanel();
      this.updateTrigger();
      this.triggerChange();
    }
    renderPanel() {
      this.elements.panelContent.innerHTML = "";
      const cal1 = this.renderCalendarGrid(this.state.viewDate);
      this.elements.panelContent.appendChild(cal1);
      if (this.options.mode === "range" || this.options.mode === "multiple") {
        const cal2 = this.renderCalendarGrid(this.state.nextViewDate, true);
        this.elements.panelContent.appendChild(cal2);
      }
    }
    open() {
      if (this.options.disabled || this.options.panelOnly) return;
      this.state.isOpen = true;
      this.elements.panel.classList.add(`${PREFIX}-date-picker__panel--open`);
      this.elements.panel.style.display = "block";
      if (this.elements.trigger) this.elements.trigger.setAttribute("aria-expanded", "true");
      this.renderPanel();
    }
    close() {
      if (this.options.panelOnly) return;
      this.state.isOpen = false;
      this.elements.panel.classList.remove(`${PREFIX}-date-picker__panel--open`);
      this.elements.panel.style.display = "none";
      if (this.elements.trigger) this.elements.trigger.setAttribute("aria-expanded", "false");
    }
    toggle() {
      if (this.state.isOpen) this.close();
      else this.open();
    }
    bindEvents() {
      if (this.elements.trigger) {
        this.elements.trigger.addEventListener("click", () => this.toggle());
      }
      document.addEventListener("click", (e) => {
        if (!this.container.contains(e.target) && !this.options.panelOnly) {
          this.close();
        }
      });
      if (this.options.panelOnly) {
        this.renderPanel();
      }
    }
    triggerChange() {
      let detailValue;
      if (this.options.mode === "single") detailValue = this.state.selectedDate;
      else if (this.options.mode === "multiple")
        detailValue = this.state.selectedDates;
      else detailValue = this.state.rangeDate;
      this.container.dispatchEvent(
        new CustomEvent("date:changed", {
          bubbles: true,
          composed: true,
          detail: {
            selectedDate: detailValue
          }
        })
      );
      if (typeof this.options.onChange === "function") {
        this.options.onChange(detailValue);
      }
    }
    // --- Public API ---
    getValue() {
      if (this.options.mode === "single") return this.state.selectedDate;
      if (this.options.mode === "multiple") return this.state.selectedDates;
      return this.state.rangeDate;
    }
  };
  function initDatepicker(selectorOrElement, options = {}) {
    const elements = typeof selectorOrElement === "string" ? document.querySelectorAll(selectorOrElement) : selectorOrElement ? typeof selectorOrElement.length !== "undefined" ? selectorOrElement : [selectorOrElement] : document.querySelectorAll(`.${PREFIX}-date-picker`);
    const instances = [];
    elements.forEach((container) => {
      const instance = new DatePicker(container, options);
      container.__datepickerAPI = instance;
      instances.push(instance);
    });
    if (instances.length === 0) return null;
    return instances.length === 1 ? instances[0] : instances;
  }

  // src/js/components/stateful/time-picker.js
  var TimePicker = class {
    constructor(selectorOrElement, options = {}) {
      this.container = typeof selectorOrElement === "string" ? document.querySelector(selectorOrElement) : selectorOrElement;
      if (!this.container) {
        console.warn("[IDDS TimePicker] Container not found:", selectorOrElement);
        return;
      }
      if (this.container.dataset.initialized === "true") {
        return;
      }
      this.container.dataset.initialized = "true";
      const format = this.container.dataset.format || "HH:mm";
      const use12HoursAttr = this.container.dataset.use12Hours === "true" || this.container.getAttribute("data-use-12-hours") === "true" || /a/i.test(format);
      const showSecondAttr = this.container.dataset.showSecond === "true";
      const allowClearAttr = this.container.dataset.allowClear !== "false";
      const disabledAttr = this.container.classList.contains(
        `${PREFIX}-time-picker--disabled`
      );
      this.options = {
        format,
        use12Hours: use12HoursAttr || false,
        showSecond: showSecondAttr || false,
        allowClear: allowClearAttr,
        disabled: disabledAttr || false,
        readonly: false,
        disabledBackTime: false,
        disabledTimeBefore: null,
        disabledTimeAfter: null,
        showNowButton: false,
        hourStep: 1,
        minuteStep: 1,
        secondStep: 1,
        onChange: null,
        size: this.container.dataset.size || "md",
        ...options
      };
      this.state = {
        isOpen: false,
        currentTime: { hours: 0, minutes: 0, seconds: 0, period: "AM" },
        internalValue: ""
      };
      this.elements = {};
      this.inputId = this.container.id || `time-picker-${Math.random().toString(36).substr(2, 9)}`;
      this.initDOM();
      this.bindEvents();
      if (this.elements.input && this.elements.input.value) {
        this.state.internalValue = this.elements.input.value;
        this.state.currentTime = this.parseTime(this.state.internalValue);
      } else if (this.container.dataset.value) {
        this.state.internalValue = this.container.dataset.value;
        this.state.currentTime = this.parseTime(this.state.internalValue);
        this.updateInput();
      }
    }
    createIcon(name, size = 16) {
      if (name === "clock")
        return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`;
      if (name === "x")
        return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
      return "";
    }
    parseTime(timeStr) {
      if (!timeStr) return { hours: 0, minutes: 0, seconds: 0, period: "AM" };
      let hours = 0, minutes = 0, seconds = 0, period = "AM";
      try {
        if (this.options.use12Hours) {
          const [time, p] = timeStr.split(" ");
          const [h, m, s] = time.split(":");
          hours = parseInt(h || "0", 10);
          minutes = parseInt(m || "0", 10);
          seconds = parseInt(s || "0", 10);
          period = p || "AM";
        } else {
          const [h, m, s] = timeStr.split(":");
          hours = parseInt(h || "0", 10);
          minutes = parseInt(m || "0", 10);
          seconds = parseInt(s || "0", 10);
        }
      } catch (e) {
        console.warn("[IDDS TimePicker] Invalid time format:", timeStr);
      }
      return { hours, minutes, seconds, period };
    }
    formatTime(h, m, s, p) {
      const pad = (n) => n.toString().padStart(2, "0");
      if (this.options.use12Hours) {
        let displayHours = h;
        if (displayHours === 0) displayHours = 12;
        const main = `${pad(displayHours)}:${pad(m)}`;
        const sec = this.options.showSecond ? `:${pad(s)}` : "";
        return `${main}${sec} ${p}`;
      } else {
        const main = `${pad(h)}:${pad(m)}`;
        const sec = this.options.showSecond ? `:${pad(s)}` : "";
        return `${main}${sec}`;
      }
    }
    parseTimeToMinutes(timeStr) {
      if (!timeStr) return 0;
      const parts = timeStr.split(":");
      const hours = parseInt(parts[0] || "0", 10);
      const minutes = parseInt(parts[1] || "0", 10);
      if (this.options.use12Hours && timeStr.includes(" ")) {
        const period = timeStr.split(" ")[1];
        let adjustedHours = hours;
        if (period === "PM" && hours !== 12) adjustedHours = hours + 12;
        else if (period === "AM" && hours === 12) adjustedHours = 0;
        return adjustedHours * 60 + minutes;
      }
      return hours * 60 + minutes;
    }
    isTimeDisabled(hours, minutes, seconds, period, checkOptions = {}) {
      const timeStr = this.formatTime(hours, minutes, seconds, period);
      const timeInMinutes = this.parseTimeToMinutes(timeStr);
      if (this.options.disabledBackTime && !checkOptions.ignoreBefore) {
        const now = /* @__PURE__ */ new Date();
        const currentTimeInMinutes = now.getHours() * 60 + now.getMinutes();
        if (timeInMinutes < currentTimeInMinutes) return true;
      }
      if (this.options.disabledTimeBefore && !checkOptions.ignoreBefore) {
        const beforeTimeInMinutes = this.parseTimeToMinutes(
          this.options.disabledTimeBefore
        );
        if (timeInMinutes < beforeTimeInMinutes) return true;
      }
      if (this.options.disabledTimeAfter && !checkOptions.ignoreAfter) {
        const afterTimeInMinutes = this.parseTimeToMinutes(
          this.options.disabledTimeAfter
        );
        if (timeInMinutes > afterTimeInMinutes) return true;
      }
      return false;
    }
    initDOM() {
      if (!this.container.classList.contains(`${PREFIX}-time-picker`)) {
        this.container.classList.add(`${PREFIX}-time-picker`);
      }
      if (this.options.disabled) {
        this.container.classList.add(`${PREFIX}-time-picker--disabled`);
      }
      let wrapper = this.container.querySelector(
        `.${PREFIX}-time-picker__wrapper`
      );
      let input = this.container.querySelector(`.${PREFIX}-time-picker__input`);
      let clearBtn = this.container.querySelector(
        `.${PREFIX}-time-picker__clear-button`
      );
      if (!wrapper) {
        wrapper = document.createElement("div");
        wrapper.className = `${PREFIX}-time-picker__wrapper`;
        wrapper.setAttribute("role", "combobox");
        wrapper.setAttribute("aria-haspopup", "listbox");
        wrapper.setAttribute("aria-expanded", "false");
        const prefixIcon = document.createElement("div");
        prefixIcon.className = `${PREFIX}-time-picker__prefix-icon`;
        prefixIcon.innerHTML = this.createIcon("clock");
        wrapper.appendChild(prefixIcon);
        input = document.createElement("input");
        input.type = "text";
        input.id = this.inputId;
        input.className = `${PREFIX}-time-picker__input ${PREFIX}-time-picker__input--size-${this.options.size} ${PREFIX}-time-picker__input--with-prefix`;
        if (this.options.allowClear)
          input.classList.add(`${PREFIX}-time-picker__input--with-suffix`);
        input.placeholder = this.container.getAttribute("placeholder") || "Select time";
        if (this.options.disabled) input.disabled = true;
        input.readOnly = !!this.options.readonly;
        wrapper.appendChild(input);
        if (this.options.allowClear) {
          clearBtn = document.createElement("button");
          clearBtn.type = "button";
          clearBtn.className = `${PREFIX}-time-picker__clear-button`;
          clearBtn.setAttribute("aria-label", "Hapus waktu");
          clearBtn.innerHTML = this.createIcon("x");
          clearBtn.style.display = "none";
          wrapper.appendChild(clearBtn);
        }
        this.container.appendChild(wrapper);
      } else {
        wrapper.setAttribute("role", "combobox");
        wrapper.setAttribute("aria-haspopup", "listbox");
        wrapper.setAttribute("aria-expanded", "false");
        if (input) {
          if (!input.id) input.id = this.inputId;
          input.readOnly = !!this.options.readonly;
        }
        if (this.options.allowClear && !clearBtn) {
          clearBtn = document.createElement("button");
          clearBtn.type = "button";
          clearBtn.className = `${PREFIX}-time-picker__clear-button`;
          clearBtn.setAttribute("aria-label", "Hapus waktu");
          clearBtn.innerHTML = this.createIcon("x");
          clearBtn.style.display = "none";
          wrapper.appendChild(clearBtn);
          if (input) {
            input.classList.add(`${PREFIX}-time-picker__input--with-suffix`);
          }
        } else if (clearBtn && !clearBtn.hasAttribute("aria-label")) {
          clearBtn.setAttribute("aria-label", "Hapus waktu");
        }
      }
      this.elements.wrapper = wrapper;
      this.elements.input = input;
      this.elements.clearBtn = clearBtn;
      let panel = this.container.querySelector(`.${PREFIX}-time-picker__panel`);
      if (!panel) {
        panel = document.createElement("div");
        panel.className = `${PREFIX}-time-picker__panel`;
        panel.style.display = "none";
        this.container.appendChild(panel);
      }
      let content = panel.querySelector(`.${PREFIX}-time-picker__content`);
      if (!content) {
        content = document.createElement("div");
        content.className = `${PREFIX}-time-picker__content`;
        panel.appendChild(content);
      }
      let actions = panel.querySelector(`.${PREFIX}-time-picker__actions`);
      if (!actions) {
        actions = document.createElement("div");
        actions.className = `${PREFIX}-time-picker__actions`;
        if (this.options.showNowButton) {
          const nowBtn = document.createElement("button");
          nowBtn.type = "button";
          nowBtn.className = `${PREFIX}-time-picker__action-button`;
          nowBtn.textContent = "Sekarang";
          nowBtn.onclick = (e) => {
            e.stopPropagation();
            const now = /* @__PURE__ */ new Date();
            let p = "AM";
            let h = now.getHours();
            if (this.options.use12Hours) {
              p = h >= 12 ? "PM" : "AM";
              h = h % 12 || 12;
            }
            this.state.currentTime = {
              hours: h,
              minutes: now.getMinutes(),
              seconds: this.options.showSecond ? now.getSeconds() : 0,
              period: p
            };
            this.updateInput();
            this.close();
          };
          actions.appendChild(nowBtn);
        }
        const confirmBtn = document.createElement("button");
        confirmBtn.type = "button";
        confirmBtn.className = `${PREFIX}-time-picker__confirm-button`;
        confirmBtn.textContent = "Pilih";
        confirmBtn.onclick = (e) => {
          e.stopPropagation();
          this.close();
        };
        actions.appendChild(confirmBtn);
        panel.appendChild(actions);
      }
      this.elements.panel = panel;
      this.elements.content = content;
      this.elements.actions = actions;
    }
    updateInput() {
      const val = this.formatTime(
        this.state.currentTime.hours,
        this.state.currentTime.minutes,
        this.state.currentTime.seconds,
        this.state.currentTime.period
      );
      this.state.internalValue = val;
      this.elements.input.value = val;
      this.container.dataset.value = val;
      if (this.elements.clearBtn && this.options.allowClear) {
        this.elements.clearBtn.style.display = val && !this.options.disabled ? "flex" : "none";
      }
      this.elements.input.dispatchEvent(new Event("change", { bubbles: true }));
      if (typeof this.options.onChange === "function") {
        this.options.onChange(val);
      }
    }
    generateOptions(type) {
      const options = [];
      const { use12Hours, hourStep, minuteStep, secondStep } = this.options;
      let limit = type === "hour" ? use12Hours ? 12 : 24 : 60;
      let step = type === "hour" ? hourStep : type === "minute" ? minuteStep : secondStep;
      if (limit === 12) {
        for (let i = type === "hour" ? 1 : 0; i <= (type === "hour" ? 12 : 59); i += step) {
          options.push(i);
        }
      } else if (limit === 24) {
        for (let i = 0; i <= 23; i += step) {
          options.push(i);
        }
      } else {
        for (let i = 0; i <= 59; i += step) {
          options.push(i);
        }
      }
      return options;
    }
    renderColumn(type, optionsArr) {
      const column = document.createElement("div");
      column.className = `${PREFIX}-time-picker__column ${PREFIX}-time-picker__column--${type}`;
      const colContent = document.createElement("div");
      colContent.className = `${PREFIX}-time-picker__column-content`;
      column.appendChild(colContent);
      const { use12Hours } = this.options;
      const { currentTime } = this.state;
      optionsArr.forEach((optValue, index) => {
        const option = document.createElement("div");
        option.className = `${PREFIX}-time-picker__option`;
        let isSelected = false;
        let isDisabled = false;
        if (type === "hour") {
          isSelected = currentTime.hours === optValue || use12Hours && currentTime.hours === 0 && optValue === 12;
          const hourValue = use12Hours ? optValue === 12 ? 0 : optValue : optValue;
          const isTooEarly = this.isTimeDisabled(
            hourValue,
            59,
            59,
            use12Hours ? currentTime.period : void 0,
            { ignoreAfter: true }
          );
          const isTooLate = this.isTimeDisabled(
            hourValue,
            0,
            0,
            use12Hours ? currentTime.period : void 0,
            { ignoreBefore: true }
          );
          isDisabled = isTooEarly || isTooLate;
        } else if (type === "minute") {
          isSelected = currentTime.minutes === optValue;
          isDisabled = this.isTimeDisabled(
            currentTime.hours,
            optValue,
            currentTime.seconds,
            use12Hours ? currentTime.period : void 0
          );
        } else if (type === "second") {
          isSelected = currentTime.seconds === optValue;
          isDisabled = this.isTimeDisabled(
            currentTime.hours,
            currentTime.minutes,
            optValue,
            use12Hours ? currentTime.period : void 0
          );
        }
        if (isSelected)
          option.classList.add(`${PREFIX}-time-picker__option--selected`);
        if (isDisabled)
          option.classList.add(`${PREFIX}-time-picker__option--disabled`);
        option.setAttribute("role", "option");
        option.setAttribute("aria-selected", isSelected.toString());
        const isFirstFocusable = index === 0 && !optionsArr.some((opt) => {
          if (type === "hour") {
            return (use12Hours && currentTime.hours === 0 ? 12 : currentTime.hours) === opt;
          } else if (type === "minute") {
            return currentTime.minutes === opt;
          } else if (type === "second") {
            return currentTime.seconds === opt;
          }
          return false;
        });
        option.tabIndex = isSelected || isFirstFocusable ? 0 : -1;
        option.textContent = optValue.toString().padStart(2, "0");
        if (!isDisabled) {
          const handleSelection = (e) => {
            e?.stopPropagation();
            const val = parseInt(optValue, 10);
            if (type === "hour") {
              this.state.currentTime.hours = use12Hours && val === 12 ? 0 : val;
            } else if (type === "minute") {
              this.state.currentTime.minutes = val;
            } else if (type === "second") {
              this.state.currentTime.seconds = val;
            }
            this.updateInput();
            this.buildPanel();
          };
          option.addEventListener("click", handleSelection);
          option.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleSelection();
            } else if (e.key === "ArrowDown") {
              e.preventDefault();
              const nextElement = e.currentTarget.nextElementSibling;
              if (nextElement) nextElement.focus();
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              const prevElement = e.currentTarget.previousElementSibling;
              if (prevElement) prevElement.focus();
            }
          });
        }
        colContent.appendChild(option);
      });
      return column;
    }
    renderPeriodColumn() {
      const column = document.createElement("div");
      column.className = `${PREFIX}-time-picker__column ${PREFIX}-time-picker__column--period`;
      const colContent = document.createElement("div");
      colContent.className = `${PREFIX}-time-picker__column-content`;
      column.appendChild(colContent);
      ["AM", "PM"].forEach((p) => {
        const option = document.createElement("div");
        option.className = `${PREFIX}-time-picker__option`;
        option.textContent = p;
        if (this.state.currentTime.period === p) {
          option.classList.add(`${PREFIX}-time-picker__option--selected`);
        }
        const isDisabled = this.isTimeDisabled(
          this.state.currentTime.hours,
          this.state.currentTime.minutes,
          this.state.currentTime.seconds,
          p
        );
        if (isDisabled)
          option.classList.add(`${PREFIX}-time-picker__option--disabled`);
        option.setAttribute("role", "option");
        option.setAttribute(
          "aria-selected",
          (this.state.currentTime.period === p).toString()
        );
        const isFirstFocusable = p === "AM" && this.state.currentTime.period !== "AM" && this.state.currentTime.period !== "PM";
        option.tabIndex = this.state.currentTime.period === p || isFirstFocusable ? 0 : -1;
        if (!isDisabled) {
          const handleSelection = (e) => {
            e?.stopPropagation();
            this.state.currentTime.period = p;
            this.updateInput();
            this.buildPanel();
          };
          option.addEventListener("click", handleSelection);
          option.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleSelection();
            } else if (e.key === "ArrowDown") {
              e.preventDefault();
              const nextElement = e.currentTarget.nextElementSibling;
              if (nextElement) nextElement.focus();
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              const prevElement = e.currentTarget.previousElementSibling;
              if (prevElement) prevElement.focus();
            }
          });
        }
        colContent.appendChild(option);
      });
      return column;
    }
    buildPanel() {
      this.elements.content.innerHTML = "";
      const hourOps = this.generateOptions("hour");
      const minOps = this.generateOptions("minute");
      this.elements.content.appendChild(this.renderColumn("hour", hourOps));
      this.elements.content.appendChild(this.renderColumn("minute", minOps));
      if (this.options.showSecond) {
        const secOps = this.generateOptions("second");
        this.elements.content.appendChild(this.renderColumn("second", secOps));
      }
      if (this.options.use12Hours) {
        this.elements.content.appendChild(this.renderPeriodColumn());
      }
    }
    open() {
      if (this.options.disabled || this.state.isOpen) return;
      this.state.isOpen = true;
      this.container.classList.add(`${PREFIX}-time-picker--open`);
      this.elements.panel.style.display = "block";
      this.elements.wrapper.setAttribute("aria-expanded", "true");
      this.state.currentTime = this.parseTime(this.elements.input.value);
      this.buildPanel();
      document.dispatchEvent(
        new CustomEvent("closeTimePicker", {
          detail: { exclude: this.container }
        })
      );
    }
    close() {
      this.state.isOpen = false;
      this.container.classList.remove(`${PREFIX}-time-picker--open`);
      this.elements.panel.style.display = "none";
      this.elements.wrapper.setAttribute("aria-expanded", "false");
    }
    toggle() {
      if (this.state.isOpen) this.close();
      else this.open();
    }
    bindEvents() {
      this.elements.wrapper.addEventListener("click", (e) => {
        e.stopPropagation();
        const target = e.target;
        if (target === this.elements.wrapper || target.classList.contains(`${PREFIX}-time-picker__suffix-icon`) || target.classList.contains(`${PREFIX}-time-picker__prefix-icon`)) {
          this.toggle();
        }
      });
      this.elements.input.addEventListener("input", (e) => {
        let val = e.target.value;
        const allowedChars = this.options.use12Hours ? /[0-9: apm]/gi : /[0-9:]/g;
        val = (val.match(allowedChars) || []).join("");
        let rawDigits = val.replace(/[^0-9]/g, "");
        let formatted = "";
        if (rawDigits.length > 0) {
          formatted += rawDigits.slice(0, 2);
          if (rawDigits.length > 2) {
            formatted += ":" + rawDigits.slice(2, 4);
            if (this.options.showSecond && rawDigits.length > 4) {
              formatted += ":" + rawDigits.slice(4, 6);
            }
          }
        }
        if (this.options.use12Hours) {
          const periodMatch = val.match(/(am|pm)/i);
          if (periodMatch) {
            formatted += " " + periodMatch[0].toUpperCase();
          } else if (val.includes(" ")) {
            formatted += " ";
          }
        }
        let maxLen = 5;
        if (this.options.showSecond) maxLen = 8;
        if (this.options.use12Hours) maxLen += 3;
        formatted = formatted.slice(0, maxLen);
        e.target.value = formatted;
        this.state.internalValue = formatted;
        const timeRegex = this.options.use12Hours ? /^(\d{1,2}):(\d{2})(?::(\d{2}))?\s?(AM|PM|am|pm)?$/ : /^(\d{1,2}):(\d{2})(?::(\d{2}))?$/;
        if (timeRegex.test(formatted)) {
          this.state.currentTime = this.parseTime(formatted);
          if (this.state.isOpen) this.buildPanel();
        }
        if (this.elements.clearBtn && this.options.allowClear) {
          this.elements.clearBtn.style.display = formatted && !this.options.disabled ? "flex" : "none";
        }
        if (typeof this.options.onChange === "function") {
          this.options.onChange(formatted);
        }
      });
      this.elements.input.addEventListener("click", (e) => {
        e.stopPropagation();
        this.open();
      });
      this.elements.input.addEventListener("focus", () => {
        this.open();
      });
      this.elements.input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          if (this.state.internalValue) {
            this.close();
          } else {
            this.toggle();
          }
        } else if (e.key === "Escape") {
          if (this.state.isOpen) this.close();
        }
      });
      if (this.elements.clearBtn) {
        this.elements.clearBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          this.state.internalValue = "";
          this.elements.input.value = "";
          this.elements.clearBtn.style.display = "none";
          this.elements.input.dispatchEvent(
            new Event("change", { bubbles: true })
          );
          if (typeof this.options.onChange === "function") {
            this.options.onChange("");
          }
        });
        this.elements.clearBtn.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            this.elements.clearBtn.click();
          }
        });
      }
      document.addEventListener("click", (e) => {
        if (!this.container.contains(e.target)) this.close();
      });
      document.addEventListener("closeTimePicker", (e) => {
        if (e.detail && e.detail.exclude !== this.container) this.close();
      });
    }
    // --- Public API ---
    getValue() {
      return this.state.internalValue;
    }
  };
  function initTimepicker(selectorOrElement, options = {}) {
    const elements = typeof selectorOrElement === "string" ? document.querySelectorAll(selectorOrElement) : selectorOrElement ? typeof selectorOrElement.length !== "undefined" ? selectorOrElement : [selectorOrElement] : document.querySelectorAll(`.${PREFIX}-time-picker`);
    const instances = [];
    elements.forEach((container) => {
      const instance = new TimePicker(container, options);
      container.__timepickerAPI = instance;
      instances.push(instance);
    });
    if (instances.length === 0) return null;
    return instances.length === 1 ? instances[0] : instances;
  }

  // src/js/components/stateless/modal.js
  function trapFocus(element) {
    const focusableEls = element.querySelectorAll(
      'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (focusableEls.length === 0) return;
    const firstFocusableEl = focusableEls[0];
    const lastFocusableEl = focusableEls[focusableEls.length - 1];
    element.addEventListener("keydown", function(e) {
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusableEl) {
            e.preventDefault();
            lastFocusableEl.focus();
          }
        } else {
          if (document.activeElement === lastFocusableEl) {
            e.preventDefault();
            firstFocusableEl.focus();
          }
        }
      }
    });
    const closeBtn = element.querySelector(`.${PREFIX}-modal__close-button`);
    if (closeBtn) {
      closeBtn.focus();
    } else {
      firstFocusableEl.focus();
    }
  }
  function openModal(modalEl) {
    if (!modalEl) return;
    modalEl.style.display = "flex";
    document.body.style.overflow = "hidden";
    modalEl.setAttribute("aria-hidden", "false");
    modalEl.setAttribute("tabindex", "-1");
    if (!modalEl.hasAttribute("role")) {
      modalEl.setAttribute("role", "dialog");
    }
    if (!modalEl.hasAttribute("aria-modal")) {
      modalEl.setAttribute("aria-modal", "true");
    }
    const closeBtn = modalEl.querySelector(`.${PREFIX}-modal__close-button`);
    if (closeBtn && !closeBtn.hasAttribute("aria-label")) {
      closeBtn.setAttribute("aria-label", "Tutup dialog");
    }
    modalEl.classList.remove(
      `${PREFIX}-modal--exit`,
      `${PREFIX}-modal--exit-active`
    );
    modalEl.classList.add(`${PREFIX}-modal--enter`);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        modalEl.classList.add(`${PREFIX}-modal--enter-active`);
        modalEl.classList.remove(`${PREFIX}-modal--enter`);
        trapFocus(modalEl);
      });
    });
  }
  function closeModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.remove(`${PREFIX}-modal--enter-active`);
    modalEl.classList.add(`${PREFIX}-modal--exit-active`);
    document.body.style.overflow = "";
    modalEl.setAttribute("aria-hidden", "true");
    setTimeout(() => {
      modalEl.style.display = "none";
      modalEl.classList.remove(`${PREFIX}-modal--exit-active`);
    }, 300);
  }
  function initModal(rootSelector = `.${PREFIX}-modal`) {
    document.addEventListener("click", (e) => {
      const trigger = e.target.closest(`[data-toggle="modal"]`);
      if (trigger) {
        e.preventDefault();
        const targetSelector = trigger.getAttribute("data-target") || trigger.getAttribute("href");
        const modal = document.querySelector(targetSelector);
        if (modal) {
          modal._previousActiveElement = trigger;
          openModal(modal);
        }
      }
      const dismissBtn = e.target.closest(`[data-dismiss="modal"]`);
      if (dismissBtn) {
        const modal = dismissBtn.closest(rootSelector);
        if (modal) {
          closeModal(modal);
          if (modal._previousActiveElement) {
            modal._previousActiveElement.focus();
          }
        }
      }
      if (e.target.classList.contains(`${PREFIX}-modal`) || e.target.classList.contains(`${PREFIX}-modal__backdrop`)) {
        const modal = e.target.closest(rootSelector);
        if (modal && modal.getAttribute("data-persistent") !== "true") {
          closeModal(modal);
        }
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        const openModalEl = document.querySelector(`${rootSelector}[aria-hidden="false"]`) || document.querySelector(`${rootSelector}[style*="display: flex"]`);
        if (openModalEl && openModalEl.getAttribute("data-persistent") !== "true") {
          closeModal(openModalEl);
          if (openModalEl._previousActiveElement) {
            openModalEl._previousActiveElement.focus();
          }
        }
      }
    });
    document.addEventListener("click", (e) => {
      const closeIconBtn = e.target.closest(`.${PREFIX}-modal__close-button`);
      if (closeIconBtn && !closeIconBtn.hasAttribute("data-dismiss")) {
        const modal = closeIconBtn.closest(rootSelector);
        if (modal) {
          closeModal(modal);
        }
      }
    });
  }

  // src/js/components/stateless/drawer.js
  var PREFIX2 = "ina";
  function initDrawer(rootSelector = `.${PREFIX2}-drawer`) {
    const drawers = document.querySelectorAll(rootSelector);
    const closeDrawer = (drawer) => {
      if (!drawer) return;
      drawer.classList.add(`${PREFIX2}-drawer--closing`);
      drawer.classList.remove(`${PREFIX2}-drawer--open`);
      const onAnimationEnd = () => {
        drawer.classList.remove(`${PREFIX2}-drawer--closing`);
        drawer.style.display = "none";
        document.body.style.overflow = "";
        drawer.removeEventListener("animationend", onAnimationEnd);
      };
      setTimeout(() => {
        if (drawer.style.display !== "none") onAnimationEnd();
      }, 300);
      drawer.addEventListener("animationend", onAnimationEnd, { once: true });
    };
    const openDrawer = (drawer) => {
      if (!drawer) return;
      drawer.style.display = "flex";
      document.body.style.overflow = "hidden";
      drawer.setAttribute("aria-hidden", "false");
      drawer.setAttribute("tabindex", "-1");
      if (!drawer.hasAttribute("role")) {
        drawer.setAttribute("role", "complementary");
      }
      if (!drawer.hasAttribute("aria-modal")) {
        drawer.setAttribute("aria-modal", "true");
      }
      const panel = drawer.querySelector(`.${PREFIX2}-drawer__panel`) || drawer.querySelector(`.${PREFIX2}-drawer__content`) || drawer;
      const closeBtn = panel.querySelector(`.${PREFIX2}-drawer__close-button`);
      if (closeBtn && !closeBtn.hasAttribute("aria-label")) {
        closeBtn.setAttribute("aria-label", "Tutup panel");
      }
      drawer.offsetHeight;
      drawer.classList.add(`${PREFIX2}-drawer--open`);
      drawer.dispatchEvent(new CustomEvent("drawer:open"));
    };
    drawers.forEach((drawer) => {
      if (drawer.__inaDrawerInitialized) return;
      const isPersistent = drawer.getAttribute("data-persistent") === "true";
      if (drawer.parentElement !== document.body) {
        document.body.appendChild(drawer);
      }
      const closeBtns = drawer.querySelectorAll(
        `.${PREFIX2}-drawer__close-button`
      );
      closeBtns.forEach((btn) => {
        btn.addEventListener("click", () => closeDrawer(drawer));
      });
      const backdrop = drawer.querySelector(`.${PREFIX2}-drawer__backdrop`);
      if (backdrop) {
        backdrop.addEventListener("click", (e) => {
          if (!isPersistent) {
            closeDrawer(drawer);
          }
        });
      }
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && drawer.style.display === "flex" && !isPersistent) {
          closeDrawer(drawer);
        }
      });
      drawer.__inaDrawerInitialized = true;
    });
    document.body.addEventListener("click", (e) => {
      const trigger = e.target.closest('[data-trigger="drawer"]');
      if (trigger) {
        const targetId = trigger.getAttribute("data-target");
        if (targetId) {
          const targetDrawer = document.querySelector(targetId);
          if (targetDrawer) {
            openDrawer(targetDrawer);
          }
        }
      }
      const closeTrigger = e.target.closest('[data-dismiss="drawer"]');
      if (closeTrigger) {
        const targetId = closeTrigger.getAttribute("data-target");
        let targetDrawer;
        if (targetId) {
          targetDrawer = document.querySelector(targetId);
        } else {
          targetDrawer = closeTrigger.closest(`.${PREFIX2}-drawer`);
        }
        if (targetDrawer) {
          closeDrawer(targetDrawer);
        }
      }
    });
  }

  // src/js/components/stateful/select-dropdown.js
  var PREFIX3 = "ina";
  function getDropdownState(root) {
    return {
      isOpen: root.getAttribute("data-state") === "open",
      values: JSON.parse(root.getAttribute("data-values") || "[]"),
      isMultiple: root.getAttribute("data-multiple") === "true",
      isSearchable: root.getAttribute("data-searchable") !== "false",
      mandatorySelected: root.getAttribute("data-mandatory-selected") === "true"
    };
  }
  function setDropdownState(root, newState) {
    if (newState.isOpen !== void 0) {
      root.setAttribute("data-state", newState.isOpen ? "open" : "closed");
      const trigger = root.querySelector(`.${PREFIX3}-select-dropdown__trigger`);
      if (trigger) {
        trigger.setAttribute("aria-expanded", newState.isOpen);
        if (!trigger.hasAttribute("aria-haspopup")) {
          trigger.setAttribute("aria-haspopup", "listbox");
        }
      }
      const panel = root.querySelector(`.${PREFIX3}-select-dropdown__panel`);
      if (panel) {
        if (!panel.hasAttribute("role")) {
          panel.setAttribute("role", "listbox");
        }
        if (newState.isMultiple) {
          panel.setAttribute("aria-multiselectable", "true");
        }
        if (newState.isOpen) {
          panel.style.removeProperty("display");
        } else {
          panel.style.display = "none";
        }
      }
    }
    if (newState.values !== void 0) {
      root.setAttribute("data-values", JSON.stringify(newState.values));
      updateTriggerUI(root, newState.values, newState.isMultiple);
    }
  }
  function closeAllSelectDropdowns(exceptRoot = null) {
    document.querySelectorAll(`.${PREFIX3}-select-dropdown[data-state="open"]`).forEach((root) => {
      if (root !== exceptRoot) {
        setDropdownState(root, { isOpen: false });
      }
    });
  }
  function updateTriggerUI(root, values, isMultiple) {
    const trigger = root.querySelector(`.${PREFIX3}-select-dropdown__trigger`);
    const input = trigger.querySelector("input");
    const textSpan = trigger.querySelector(
      `.${PREFIX3}-select-dropdown__trigger-text`
    );
    const placeholder = input ? input.getAttribute("placeholder") : textSpan ? textSpan.getAttribute("data-placeholder") : "Select...";
    const options = root.querySelectorAll(`.${PREFIX3}-select-dropdown__option`);
    const getLabel = (val) => {
      const opt = Array.from(options).find(
        (o) => o.getAttribute("data-value") === val
      );
      return opt ? opt.textContent.trim() : val;
    };
    let label = "";
    if (values.length === 0) {
    } else if (isMultiple) {
      label = values.length > 3 ? `${values.length} data terpilih` : values.map(getLabel).join(", ");
    } else {
      label = getLabel(values[0]);
    }
    if (input) {
      input.value = !isMultiple && values.length > 0 && root.getAttribute("data-state") !== "open" ? label : "";
      if (values.length > 0) {
        input.placeholder = label;
      } else {
        input.placeholder = "Select...";
      }
    } else if (textSpan) {
      textSpan.textContent = values.length > 0 ? label : placeholder;
      textSpan.classList.toggle(
        `${PREFIX3}-select-dropdown__trigger-text--placeholder`,
        values.length === 0
      );
    }
    options.forEach((opt) => {
      const val = opt.getAttribute("data-value");
      const isSelected = values.includes(val);
      if (isMultiple) {
        opt.classList.toggle(
          `${PREFIX3}-select-dropdown__option--selected-multiple`,
          isSelected
        );
        const cb = opt.querySelector(
          `.${PREFIX3}-select-dropdown__option-checkbox`
        );
        if (cb)
          cb.classList.toggle(
            `${PREFIX3}-select-dropdown__option-checkbox--checked`,
            isSelected
          );
      } else {
        opt.classList.toggle(
          `${PREFIX3}-select-dropdown__option--selected-single`,
          isSelected
        );
      }
      if (!opt.hasAttribute("role")) {
        opt.setAttribute("role", "option");
      }
      opt.setAttribute("aria-selected", isSelected);
    });
  }
  function initSelectDropdown() {
    if (window.__inaSelectDropdownInitialized) return;
    document.addEventListener("click", (e) => {
      const target = e.target;
      const trigger = target.closest(`.${PREFIX3}-select-dropdown__trigger`);
      const option = target.closest(`.${PREFIX3}-select-dropdown__option`);
      const root = target.closest(`.${PREFIX3}-select-dropdown`);
      if (trigger) {
        if (root) {
          const state = getDropdownState(root);
          if (target.tagName === "INPUT" && state.isOpen) {
            return;
          }
          closeAllSelectDropdowns(root);
          setDropdownState(root, { isOpen: !state.isOpen });
          if (!state.isOpen) {
            const input = trigger.querySelector("input");
            if (input) input.focus();
          }
        }
        return;
      }
      if (option && root) {
        const state = getDropdownState(root);
        const val = option.getAttribute("data-value");
        let newValues = [...state.values];
        if (state.isMultiple) {
          if (newValues.includes(val)) {
            if (state.mandatorySelected && newValues.length <= 1) {
              return;
            }
            newValues = newValues.filter((v) => v !== val);
          } else {
            newValues.push(val);
          }
          setDropdownState(root, { values: newValues });
        } else {
          if (state.mandatorySelected && state.values.includes(val)) {
            setDropdownState(root, { isOpen: false });
            return;
          }
          newValues = [val];
          setDropdownState(root, { values: newValues, isOpen: false });
        }
        root.dispatchEvent(
          new CustomEvent("change", {
            detail: {
              value: state.isMultiple ? newValues : newValues[0]
            }
          })
        );
        e.stopPropagation();
        return;
      }
      if (!root) {
        closeAllSelectDropdowns();
      }
    });
    document.addEventListener("input", (e) => {
      if (e.target.matches(`.${PREFIX3}-select-dropdown__trigger-input`)) {
        const root = e.target.closest(`.${PREFIX3}-select-dropdown`);
        if (root) {
          const term = e.target.value.toLowerCase();
          const options = root.querySelectorAll(
            `.${PREFIX3}-select-dropdown__option`
          );
          if (root.getAttribute("data-state") !== "open") {
            setDropdownState(root, { isOpen: true });
          }
          options.forEach((opt) => {
            const text = opt.textContent.trim().toLowerCase();
            opt.style.display = text.includes(term) ? "" : "none";
          });
        }
      }
    });
    window.__inaSelectDropdownInitialized = true;
  }

  // src/js/components/stateful/radio-button.js
  function initRadioButton() {
    const radioGroups = document.querySelectorAll(`.${PREFIX}-radio-input`);
    radioGroups.forEach((group) => {
      if (group.dataset.initialized === "true") return;
      group.dataset.initialized = "true";
      const inputs = group.querySelectorAll('input[type="radio"]');
      const displayTargetId = group.dataset.displayTarget;
      const displayTarget = displayTargetId ? document.getElementById(displayTargetId) : null;
      const updateDisplay = () => {
        if (!displayTarget) return;
        const selected = Array.from(inputs).find((input) => input.checked);
        const value = selected ? selected.value : "";
        displayTarget.textContent = `Selected: ${value || "None"}`;
      };
      if (inputs.length > 0) {
        inputs.forEach((input) => {
          input.addEventListener("change", updateDisplay);
        });
        updateDisplay();
      }
    });
  }

  // src/js/components/stateful/stepper.js
  function initStepper() {
    const steppers = document.querySelectorAll(`.${PREFIX}-stepper`);
    steppers.forEach((stepper) => {
      if (stepper.dataset.initialized === "true") return;
      stepper.dataset.initialized = "true";
      const stepperId = stepper.id;
      const items = stepper.querySelectorAll(`.${PREFIX}-stepper__item`);
      const separators = stepper.querySelectorAll(
        `.${PREFIX}-stepper__separator`
      );
      const totalSteps = items.length;
      let currentStep = parseInt(stepper.dataset.currentStep || "0", 10);
      const nextBtns = document.querySelectorAll(
        `[data-stepper-next="${stepperId}"]`
      );
      const prevBtns = document.querySelectorAll(
        `[data-stepper-prev="${stepperId}"]`
      );
      const displayTargetId = stepper.dataset.displayTarget;
      const displayTarget = displayTargetId ? document.getElementById(displayTargetId) : null;
      const checkIcon = `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="${PREFIX}-stepper__check-icon"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        stroke-width="2.5"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M5 12l5 5l10 -10" />
      </svg>
    `;
      const updateUI = () => {
        stepper.dataset.currentStep = currentStep;
        items.forEach((item, index) => {
          const iconWrapper = item.querySelector(
            `.${PREFIX}-stepper__icon-wrapper`
          );
          const itemNumber = index + 1;
          item.classList.remove(
            `${PREFIX}-stepper__item--completed`,
            `${PREFIX}-stepper__item--active`
          );
          if (iconWrapper) iconWrapper.innerHTML = "";
          if (index < currentStep) {
            item.classList.add(`${PREFIX}-stepper__item--completed`);
            if (iconWrapper) iconWrapper.innerHTML = checkIcon;
          } else if (index === currentStep) {
            item.classList.add(`${PREFIX}-stepper__item--active`);
            if (iconWrapper)
              iconWrapper.innerHTML = `<span class="${PREFIX}-stepper__step-number">${itemNumber}</span>`;
          } else {
            if (iconWrapper)
              iconWrapper.innerHTML = `<span class="${PREFIX}-stepper__step-number">${itemNumber}</span>`;
          }
        });
        separators.forEach((separator, index) => {
          if (index < currentStep) {
            separator.classList.add(`${PREFIX}-stepper__separator--completed`);
          } else {
            separator.classList.remove(`${PREFIX}-stepper__separator--completed`);
          }
        });
        prevBtns.forEach((btn) => {
          if (currentStep === 0) {
            btn.setAttribute("disabled", "true");
          } else {
            btn.removeAttribute("disabled");
          }
        });
        nextBtns.forEach((btn) => {
          if (currentStep === totalSteps - 1) {
            btn.setAttribute("disabled", "true");
          } else {
            btn.removeAttribute("disabled");
          }
        });
        if (displayTarget) {
          displayTarget.textContent = `Current Step: ${currentStep + 1}`;
        }
        stepper.dispatchEvent(
          new CustomEvent("stepper:change", {
            bubbles: true,
            detail: { currentStep, totalSteps }
          })
        );
      };
      nextBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          if (currentStep < totalSteps - 1) {
            currentStep++;
            updateUI();
          }
        });
      });
      prevBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          if (currentStep > 0) {
            currentStep--;
            updateUI();
          }
        });
      });
      items.forEach((item, index) => {
        if (item.classList.contains(`${PREFIX}-stepper__item--clickable`) || item.hasAttribute("data-clickable")) {
          item.addEventListener("click", () => {
            if (!item.classList.contains(`${PREFIX}-stepper__item--disabled`)) {
              currentStep = index;
              updateUI();
            }
          });
        }
      });
      updateUI();
    });
  }

  // src/js/components/stateful/file-upload.js
  var ICONS = {
    upload: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="16"></line></svg>`,
    file: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`,
    trash: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>`,
    check: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" size="20" class="tabler-icon tabler-icon-circle-check"><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path><path d="M9 12l2 2l4 -4"></path></svg>`,
    error: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`,
    loader: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${PREFIX}-file-upload__file-icon--spinning"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>`
  };
  function initFileUpload(rootSelector = `.${PREFIX}-file-upload`) {
    const fileUploads = document.querySelectorAll(rootSelector);
    fileUploads.forEach((container) => {
      if (container.__inaFileUploadInitialized) return;
      const input = container.querySelector(`.${PREFIX}-file-upload__input`);
      const dropzone = container.querySelector(
        `.${PREFIX}-file-upload__dropzone`
      );
      let filesContainer = container.querySelector(
        `.${PREFIX}-file-upload__files`
      );
      if (!filesContainer) {
        filesContainer = document.createElement("div");
        filesContainer.className = `${PREFIX}-file-upload__files`;
        container.appendChild(filesContainer);
      }
      if (!input || !dropzone) return;
      const maxFiles = parseInt(container.getAttribute("data-max-files")) || 0;
      const maxSize = parseInt(container.getAttribute("data-max-size")) || 0;
      const allowedExtensions = (container.getAttribute("data-allowed-extensions") || "").toLowerCase().split(",").map((ext) => ext.trim()).filter(Boolean);
      const multiple = input.hasAttribute("multiple");
      let uploadedFiles = [];
      const formatFileSize = (bytes) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
      };
      const generateId = () => Math.random().toString(36).substr(2, 9);
      const validateFile = (file) => {
        if (allowedExtensions.length > 0) {
          const ext = file.name.split(".").pop().toLowerCase();
          if (!allowedExtensions.includes(ext)) {
            return {
              valid: false,
              error: `Ekstensi file harus: ${allowedExtensions.join(", ")}`
            };
          }
        }
        if (maxSize > 0 && file.size > maxSize) {
          return {
            valid: false,
            error: `Ukuran file maksimal ${formatFileSize(maxSize)}`
          };
        }
        return { valid: true };
      };
      const renderFiles = () => {
        filesContainer.innerHTML = "";
        if (uploadedFiles.length > 0) {
          filesContainer.style.display = "flex";
        } else {
          filesContainer.style.display = "none";
        }
        uploadedFiles.forEach((f, index) => {
          const fileEl = document.createElement("div");
          fileEl.className = `${PREFIX}-file-upload__file`;
          let statusClass = "";
          let iconHtml = "";
          if (f.status === "uploading") {
            statusClass = `${PREFIX}-file-upload__file--uploading`;
            iconHtml = `<div class="${PREFIX}-file-upload__file-icon-wrapper ${PREFIX}-file-upload__file-icon-wrapper--uploading">${ICONS.loader}</div>`;
          } else if (f.status === "success") {
            statusClass = `${PREFIX}-file-upload__file--success`;
            iconHtml = `<div class="${PREFIX}-file-upload__file-icon-wrapper ${PREFIX}-file-upload__file-icon-wrapper--success">${ICONS.check}</div>`;
          } else if (f.status === "error") {
            statusClass = `${PREFIX}-file-upload__file--error`;
            iconHtml = `<div class="${PREFIX}-file-upload__file-icon-wrapper ${PREFIX}-file-upload__file-icon-wrapper--error">${ICONS.error}</div>`;
          } else {
            iconHtml = `<div class="${PREFIX}-file-upload__file-icon-wrapper ${PREFIX}-file-upload__file-icon-wrapper--success">${ICONS.check}</div>`;
          }
          if (statusClass) fileEl.classList.add(statusClass);
          fileEl.innerHTML = `
          <div class="${PREFIX}-file-upload__file-indicator">
            ${iconHtml}
          </div>
          <div class="${PREFIX}-file-upload__file-info">
            <div class="${PREFIX}-file-upload__file-name">${f.file.name}</div>
            <div class="${PREFIX}-file-upload__file-size">${formatFileSize(f.file.size)}</div>
            ${f.error ? `<div class="${PREFIX}-file-upload__file-error">${f.error}</div>` : ""}
          </div>
          <div class="${PREFIX}-file-upload__file-actions">
            <button type="button" class="${PREFIX}-file-upload__file-remove" data-id="${f.id}" title="Hapus file">
              ${ICONS.trash}
            </button>
          </div>
        `;
          filesContainer.appendChild(fileEl);
        });
        filesContainer.querySelectorAll(`.${PREFIX}-file-upload__file-remove`).forEach((btn) => {
          btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const id = btn.getAttribute("data-id");
            removeFile(id);
          });
        });
      };
      const addFiles = (newFiles) => {
        const addedFiles = [];
        Array.from(newFiles).forEach((file) => {
          const validation = validateFile(file);
          if (!validation.valid) {
            addedFiles.push({
              file,
              status: "error",
              error: validation.error,
              id: generateId()
            });
          } else {
            addedFiles.push({
              file,
              status: "idle",
              id: generateId()
            });
          }
        });
        const existingValidCount = uploadedFiles.filter(
          (f) => f.status !== "error"
        ).length;
        const newValidCount = addedFiles.filter(
          (f) => f.status !== "error"
        ).length;
        if (multiple && maxFiles > 0) {
          if (existingValidCount + newValidCount > maxFiles) {
            let validFiles = addedFiles.filter((f) => f.status !== "error");
            let errorFiles = addedFiles.filter((f) => f.status === "error");
            const spaceLeft = maxFiles - existingValidCount;
            if (spaceLeft < validFiles.length) {
              validFiles = validFiles.slice(0, spaceLeft);
            }
            const limitedAddedFiles = [...errorFiles, ...validFiles];
          }
        }
        if (!multiple) {
          uploadedFiles = addedFiles.slice(0, 1);
        } else {
          uploadedFiles = [...uploadedFiles, ...addedFiles];
        }
        renderFiles();
        container.dispatchEvent(
          new CustomEvent("file-upload:change", {
            detail: {
              files: uploadedFiles.map((f) => f.file),
              errors: uploadedFiles.filter((f) => f.status === "error").map((f) => ({ file: f.file, error: f.error }))
            },
            bubbles: true
          })
        );
        const filesToUpload = uploadedFiles.filter((f) => f.status === "idle");
        filesToUpload.forEach((f) => {
          f.status = "uploading";
        });
        renderFiles();
        setTimeout(() => {
          filesToUpload.forEach((f) => {
            f.status = "success";
          });
          renderFiles();
        }, 1e3);
      };
      const removeFile = (id) => {
        uploadedFiles = uploadedFiles.filter((f) => f.id !== id);
        renderFiles();
        input.value = "";
      };
      dropzone.addEventListener("click", () => {
        if (!input.disabled) input.click();
      });
      input.addEventListener("change", (e) => {
        if (input.files.length > 0) {
          addFiles(input.files);
        }
      });
      ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
        dropzone.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
        });
      });
      dropzone.addEventListener("dragover", () => {
        if (!input.disabled)
          dropzone.classList.add(`${PREFIX}-file-upload__dropzone--drag-over`);
      });
      dropzone.addEventListener("dragleave", () => {
        dropzone.classList.remove(`${PREFIX}-file-upload__dropzone--drag-over`);
      });
      dropzone.addEventListener("drop", (e) => {
        dropzone.classList.remove(`${PREFIX}-file-upload__dropzone--drag-over`);
        if (input.disabled) return;
        const dt = e.dataTransfer;
        const files = dt.files;
        if (files.length > 0) {
          addFiles(files);
        }
      });
      container.__inaFileUploadInitialized = true;
    });
  }

  // src/js/components/stateful/single-file-upload.js
  var ICONS2 = {
    upload: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" size="24" class="tabler-icon tabler-icon-upload"><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path><path d="M7 9l5 -5l5 5"></path><path d="M12 4l0 12"></path></svg>`,
    trash: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>`,
    file: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`,
    pdf: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><path d="M10 13a1 1 0 0 0-1 1v4"></path><path d="M10 13h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-1"></path><path d="M14 13h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-1v-2"></path><path d="M14 15h2"></path></svg>`,
    image: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>`
  };
  function initSingleFileUpload(rootSelector = `.${PREFIX}-single-file-upload`) {
    const fileUploads = document.querySelectorAll(rootSelector);
    fileUploads.forEach((container) => {
      if (container.__inaSingleFileUploadInitialized) return;
      const input = container.querySelector(
        `.${PREFIX}-single-file-upload__input`
      );
      const containerEl = container.querySelector(
        `.${PREFIX}-single-file-upload__container`
      );
      if (!input || !containerEl) return;
      const titleEl = container.querySelector(
        `.${PREFIX}-single-file-upload__title`
      );
      const descriptionEl = container.querySelector(
        `.${PREFIX}-single-file-upload__description`
      );
      const initialTitle = titleEl ? titleEl.textContent : "Unggah File";
      const initialDescription = descriptionEl && descriptionEl.textContent.trim() ? descriptionEl.textContent : "Unggah atau seret dan lepas ke sini";
      const maxSize = parseInt(container.getAttribute("data-max-size")) || 0;
      const allowedExtensions = (container.getAttribute("data-allowed-extensions") || "").toLowerCase().split(",").map((ext) => ext.trim()).filter(Boolean);
      let status = "idle";
      let currentFile = null;
      let progress = 0;
      const getFileIcon = (file) => {
        if (file.type.includes("pdf")) return ICONS2.pdf;
        if (file.type.includes("image")) return ICONS2.image;
        return ICONS2.file;
      };
      const formatFileSize = (bytes) => {
        return (bytes / (1024 * 1024)).toFixed(2) + " MB";
      };
      const updateUI = () => {
        containerEl.innerHTML = "";
        if (!currentFile && status === "idle") {
          containerEl.innerHTML = `
          <div class="${PREFIX}-single-file-upload__icon-wrapper ${PREFIX}-single-file-upload__icon-wrapper--default">
            ${ICONS2.upload}
          </div>
          <div class="${PREFIX}-single-file-upload__content">
            <div class="${PREFIX}-single-file-upload__title">${initialTitle}</div>
            <div class="${PREFIX}-single-file-upload__description">${initialDescription}</div>
          </div>
        `;
        } else if (!currentFile && status === "uploading") {
          containerEl.innerHTML = `
          <div class="${PREFIX}-single-file-upload__icon-wrapper ${PREFIX}-single-file-upload__icon-wrapper--default">
            ${ICONS2.upload}
          </div>
          <div class="${PREFIX}-single-file-upload__progress">
            <div class="${PREFIX}-single-file-upload__progress-bar">
              <div class="${PREFIX}-single-file-upload__progress-fill" style="width: ${progress}%"></div>
            </div>
            <div class="${PREFIX}-single-file-upload__progress-text">
              Uploading... ${progress}%
            </div>
          </div>
        `;
        } else if (currentFile && status === "success") {
          containerEl.innerHTML = `
          <div class="${PREFIX}-single-file-upload__icon-wrapper ${PREFIX}-single-file-upload__icon-wrapper--file">
            ${getFileIcon(currentFile)}
          </div>
          <div class="${PREFIX}-single-file-upload__content">
            <div class="${PREFIX}-single-file-upload__title">${currentFile.name}</div>
            <div class="${PREFIX}-single-file-upload__description">${initialDescription}</div>
          </div>
          <button type="button" class="${PREFIX}-single-file-upload__delete-button" aria-label="Remove file">
            ${ICONS2.trash}
          </button>
         `;
          const deleteBtn = containerEl.querySelector(
            `.${PREFIX}-single-file-upload__delete-button`
          );
          if (deleteBtn) {
            deleteBtn.addEventListener("click", (e) => {
              e.stopPropagation();
              removeFile();
            });
          }
        }
      };
      const handleFile = (file) => {
        if (maxSize > 0 && file.size > maxSize) {
          alert("File size exceeds limit.");
          return;
        }
        if (allowedExtensions.length > 0) {
          const ext = file.name.split(".").pop().toLowerCase();
          if (!allowedExtensions.includes(ext)) {
            alert("Invalid file extension.");
            return;
          }
        }
        currentFile = file;
        status = "uploading";
        progress = 0;
        updateUI();
        const interval = setInterval(() => {
          progress += 10;
          updateUI();
          if (progress >= 100) {
            clearInterval(interval);
            status = "success";
            updateUI();
            container.dispatchEvent(
              new CustomEvent("single-file-upload:change", {
                detail: { file },
                bubbles: true
              })
            );
          }
        }, 100);
      };
      const removeFile = () => {
        currentFile = null;
        status = "idle";
        input.value = "";
        updateUI();
        container.dispatchEvent(
          new CustomEvent("single-file-upload:change", {
            detail: { file: null },
            bubbles: true
          })
        );
      };
      input.addEventListener("change", () => {
        if (input.files[0]) handleFile(input.files[0]);
      });
      containerEl.addEventListener("click", (e) => {
        if (status === "idle") input.click();
      });
      ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
        containerEl.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
        });
      });
      containerEl.addEventListener("dragover", () => {
        if (!currentFile && !input.disabled) {
          containerEl.classList.add(
            `${PREFIX}-single-file-upload__container--active`
          );
        }
      });
      containerEl.addEventListener("dragleave", () => {
        containerEl.classList.remove(
          `${PREFIX}-single-file-upload__container--active`
        );
      });
      containerEl.addEventListener("drop", (e) => {
        containerEl.classList.remove(
          `${PREFIX}-single-file-upload__container--active`
        );
        if (input.disabled || currentFile) return;
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
      });
      updateUI();
      container.__inaSingleFileUploadInitialized = true;
    });
  }

  // src/js/components/stateful/file-upload-base.js
  function initFileUploadBase(rootSelector = `.${PREFIX}-file-base`) {
    document.querySelectorAll(rootSelector).forEach((fileUploadBase) => {
      const fileIconContainer = fileUploadBase.querySelector(
        ".ina-ss-file-base__icon-container"
      );
      const fileTitle = fileUploadBase.querySelector(".ina-ss-file-base__title");
      const fileDesc = fileUploadBase.querySelector(".ina-ss-file-base__desc");
      const buttonUpload = fileUploadBase.querySelector(
        ".ina-ss-file-base__trigger"
      );
      const inputFile = fileUploadBase.querySelector(".ina-ss-file-base__input");
      buttonUpload.addEventListener("click", () => {
        inputFile.click();
      });
      inputFile.addEventListener("change", () => {
        handleFile(inputFile.files[0]);
      });
      fileUploadBase.addEventListener("dragover", (e) => {
        e.preventDefault();
        fileUploadBase.classList.add("dragover");
      });
      fileUploadBase.addEventListener("dragleave", () => {
        fileUploadBase.classList.remove("dragover");
      });
      fileUploadBase.addEventListener("drop", (e) => {
        e.preventDefault();
        fileUploadBase.classList.remove("dragover");
        const file = e.dataTransfer.files;
        handleFile(file[0]);
      });
      function simulateUpload() {
        const fileIcon = fileUploadBase.querySelector(".ina-ss-file-base__icon");
        const loadingEl = document.createElement("div");
        loadingEl.classList.add("ina-ss-loading__spinner");
        fileIconContainer.replaceChild(loadingEl, fileIcon);
        fileTitle.textContent = "Mengunggah...";
        fileDesc.textContent = "";
        buttonUpload.disabled = true;
      }
      function handleFile(inputFile2) {
        simulateUpload();
        const FILE_NAME = inputFile2.name;
        const FILE_SIZE_IN_MB = inputFile2.size / (1024 * 1024);
        const FILE_TYPE = inputFile2.type;
        const IMAGE_TYPE = ["image/png", "image/jpg", "image/jpeg"];
        setTimeout(() => {
          fileIconContainer.innerHTML = "";
          const defaultFileIcon = document.createElement("div");
          defaultFileIcon.classList.add("ina-ss-file-base__icon");
          fileIconContainer.appendChild(defaultFileIcon);
          if (FILE_TYPE === "application/pdf") {
            defaultFileIcon.style.backgroundImage = "url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2232%22%20height%3D%2232%22%20viewBox%3D%220%200%2032%2032%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M10.1556%200.400421H21.434L30.8002%209.76566V27.834C30.8002%2029.8914%2029.0115%2031.5996%2026.7523%2031.5996H10.056C7.78789%2031.5995%206.00037%2029.8909%206.00037%2027.834V4.16605C6.00033%202.12004%207.87549%200.400437%2010.1556%200.400421Z%22%20fill%3D%22white%22%20stroke%3D%22%23E5E5E5%22%20stroke-width%3D%220.8%22%2F%3E%3Cpath%20d%3D%22M21.6205%206.528V0L31.2%209.6H24.8136C21.9398%209.6%2021.4874%207.552%2021.6205%206.528Z%22%20fill%3D%22%23E5E5E5%22%2F%3E%3Crect%20x%3D%220.799988%22%20y%3D%2215.2%22%20width%3D%2221.4%22%20height%3D%2212.2%22%20rx%3D%222.4%22%20fill%3D%22%23D92D20%22%2F%3E%3Cpath%20d%3D%22M4.89925%2023.8V18.5636H6.96516C7.36232%2018.5636%207.70067%2018.6395%207.98022%2018.7912C8.25977%2018.9412%208.47283%2019.15%208.61942%2019.4176C8.76772%2019.6835%208.84187%2019.9903%208.84187%2020.3381C8.84187%2020.6858%208.76687%2020.9926%208.61687%2021.2585C8.46687%2021.5244%208.24954%2021.7315%207.96488%2021.8798C7.68192%2022.0281%207.33931%2022.1023%206.93704%2022.1023H5.62028V21.215H6.75806C6.97113%2021.215%207.1467%2021.1784%207.28477%2021.1051C7.42454%2021.0301%207.52852%2020.927%207.5967%2020.7957C7.66658%2020.6628%207.70153%2020.5102%207.70153%2020.3381C7.70153%2020.1642%207.66658%2020.0125%207.5967%2019.8829C7.52852%2019.7517%207.42454%2019.6503%207.28477%2019.5787C7.14499%2019.5054%206.96772%2019.4687%206.75295%2019.4687H6.00636V23.8H4.89925ZM11.4172%2023.8H9.56097V18.5636H11.4326C11.9593%2018.5636%2012.4127%2018.6685%2012.7928%2018.8781C13.1729%2019.0861%2013.4652%2019.3852%2013.6698%2019.7756C13.876%2020.1659%2013.9792%2020.6329%2013.9792%2021.1767C13.9792%2021.7221%2013.876%2022.1909%2013.6698%2022.5829C13.4652%2022.975%2013.1712%2023.2758%2012.7877%2023.4855C12.4059%2023.6952%2011.949%2023.8%2011.4172%2023.8ZM10.6681%2022.8514H11.3712C11.6985%2022.8514%2011.9738%2022.7935%2012.1971%2022.6775C12.4221%2022.5599%2012.5908%2022.3784%2012.7033%2022.1329C12.8175%2021.8858%2012.8746%2021.567%2012.8746%2021.1767C12.8746%2020.7898%2012.8175%2020.4736%2012.7033%2020.2281C12.5908%2019.9827%2012.4229%2019.802%2012.1996%2019.6861C11.9763%2019.5702%2011.701%2019.5122%2011.3738%2019.5122H10.6681V22.8514ZM14.7993%2023.8V18.5636H18.2663V19.4764H15.9064V20.7241H18.0362V21.6369H15.9064V23.8H14.7993Z%22%20fill%3D%22white%22%2F%3E%3C%2Fsvg%3E')";
            defaultFileIcon.style.width = "2rem";
            defaultFileIcon.style.height = "2rem";
          }
          if (IMAGE_TYPE.includes(FILE_TYPE)) {
            defaultFileIcon.style.backgroundImage = "url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2232%22%20height%3D%2232%22%20viewBox%3D%220%200%2032%2032%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M10.1556%200.400452H21.434L30.8002%209.76569V27.834C30.8002%2029.8915%2029.0115%2031.5996%2026.7523%2031.5997H10.056C7.78789%2031.5996%206.00037%2029.891%206.00037%2027.834V4.16608C6.00033%202.12007%207.87549%200.400467%2010.1556%200.400452Z%22%20fill%3D%22white%22%20stroke%3D%22%23E5E5E5%22%20stroke-width%3D%220.8%22%2F%3E%3Cpath%20d%3D%22M21.6205%206.528V0L31.2%209.6H24.8136C21.9398%209.6%2021.4874%207.552%2021.6205%206.528Z%22%20fill%3D%22%23E5E5E5%22%2F%3E%3Crect%20x%3D%220.799988%22%20y%3D%2215.2%22%20width%3D%2221.4%22%20height%3D%2212.2%22%20rx%3D%222.4%22%20fill%3D%22%237F56D9%22%2F%3E%3Cpath%20d%3D%22M6.02042%2018.5636V23.8H4.91332V18.5636H6.02042ZM6.93128%2018.5636H8.29663L9.73867%2022.0818H9.80004L11.2421%2018.5636H12.6074V23.8H11.5336V20.3917H11.4901L10.135%2023.7744H9.40373L8.04861%2020.379H8.00515V23.8H6.93128V18.5636ZM16.9917%2020.2562C16.9559%2020.1318%2016.9056%2020.0219%2016.8409%2019.9264C16.7761%2019.8292%2016.6968%2019.7474%2016.6031%2019.681C16.511%2019.6128%2016.4054%2019.5608%2016.286%2019.525C16.1684%2019.4892%2016.038%2019.4713%2015.8949%2019.4713C15.6272%2019.4713%2015.392%2019.5378%2015.1892%2019.6707C14.988%2019.8037%2014.8312%2019.9971%2014.7187%2020.2511C14.6062%2020.5034%2014.55%2020.8119%2014.55%2021.1767C14.55%2021.5415%2014.6054%2021.8517%2014.7162%2022.1074C14.827%2022.3631%2014.9838%2022.5582%2015.1866%2022.6929C15.3895%2022.8258%2015.6289%2022.8923%2015.9051%2022.8923C16.1556%2022.8923%2016.3696%2022.848%2016.5468%2022.7594C16.7258%2022.669%2016.8622%2022.542%2016.9559%2022.3784C17.0514%2022.2148%2017.0991%2022.0213%2017.0991%2021.798L17.3241%2021.8312H15.9741V20.9977H18.1653V21.6574C18.1653%2022.1176%2018.0681%2022.5131%2017.8738%2022.8437C17.6795%2023.1727%2017.4119%2023.4267%2017.071%2023.6057C16.7301%2023.7829%2016.3397%2023.8716%2015.9%2023.8716C15.4091%2023.8716%2014.9778%2023.7633%2014.6062%2023.5469C14.2346%2023.3287%2013.9449%2023.0193%2013.7369%2022.6187C13.5306%2022.2165%2013.4275%2021.7392%2013.4275%2021.1869C13.4275%2020.7625%2013.4889%2020.3841%2013.6116%2020.0517C13.736%2019.7176%2013.9099%2019.4346%2014.1332%2019.2028C14.3565%2018.971%2014.6164%2018.7946%2014.913%2018.6736C15.2096%2018.5525%2015.5309%2018.492%2015.877%2018.492C16.1735%2018.492%2016.4497%2018.5355%2016.7054%2018.6224C16.961%2018.7077%2017.1877%2018.8287%2017.3855%2018.9855C17.5849%2019.1423%2017.7477%2019.329%2017.8738%2019.5454C18%2019.7602%2018.0809%2019.9971%2018.1167%2020.2562H16.9917Z%22%20fill%3D%22white%22%2F%3E%3C%2Fsvg%3E')";
            defaultFileIcon.style.width = "2rem";
            defaultFileIcon.style.height = "2rem";
          }
          fileTitle.textContent = FILE_NAME;
          fileDesc.textContent = `Ukuran File: ${FILE_SIZE_IN_MB.toFixed(2)}MB`;
          buttonUpload.classList.replace(
            "ina-ss-btn--secondary",
            "ina-ss-btn--link"
          );
          buttonUpload.style.textDecoration = "underline";
          buttonUpload.textContent = "Ubah File";
          buttonUpload.disabled = false;
          fileUploadBase.dispatchEvent(
            new CustomEvent("file:changed", { detail: { inputFile: inputFile2 } })
          );
        }, 1e3);
      }
    });
  }

  // src/js/components/stateful/file-upload-item.js
  function initFileUploadItem(rootSelector = `.${PREFIX}-file-item`) {
    document.querySelectorAll(rootSelector).forEach((fileUploadItem) => {
      const fileIconContainer = fileUploadItem.querySelector(
        ".ina-ss-file-item__icon-container"
      );
      const fileTitle = fileUploadItem.querySelector(".ina-ss-file-item__title");
      const fileDesc = fileUploadItem.querySelector(".ina-ss-file-item__desc");
      const inputFile = fileUploadItem.querySelector(".ina-ss-file-item__input");
      fileUploadItem.addEventListener("click", () => {
        inputFile.click();
      });
      inputFile.addEventListener("change", () => {
        handleFile(inputFile.files[0]);
      });
      fileUploadItem.addEventListener("dragover", (e) => {
        e.preventDefault();
        fileUploadItem.classList.add("dragover");
      });
      fileUploadItem.addEventListener("dragleave", () => {
        fileUploadItem.classList.remove("dragover");
      });
      fileUploadItem.addEventListener("drop", (e) => {
        e.preventDefault();
        fileUploadItem.classList.remove("dragover");
        const file = e.dataTransfer.files;
        handleFile(file[0]);
      });
      function simulateUpload() {
        const fileIcon = fileUploadItem.querySelector(".ina-ss-file-item__icon");
        const loadingEl = document.createElement("div");
        loadingEl.classList.add("ina-ss-loading__spinner");
        fileIconContainer.replaceChild(loadingEl, fileIcon);
      }
      function handleFile(inputFile2) {
        simulateUpload();
        const FILE_NAME = inputFile2.name;
        const FILE_SIZE_IN_MB = inputFile2.size / (1024 * 1024);
        const FILE_TYPE = inputFile2.type;
        const IMAGE_TYPE = ["image/png", "image/jpg", "image/jpeg"];
        setTimeout(() => {
          fileIconContainer.innerHTML = "";
          const defaultFileIcon = document.createElement("div");
          defaultFileIcon.classList.add("ina-ss-file-item__icon");
          fileIconContainer.appendChild(defaultFileIcon);
          if (FILE_TYPE === "application/pdf") {
            defaultFileIcon.style.backgroundImage = "url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2232%22%20height%3D%2232%22%20viewBox%3D%220%200%2032%2032%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M10.1556%200.400421H21.434L30.8002%209.76566V27.834C30.8002%2029.8914%2029.0115%2031.5996%2026.7523%2031.5996H10.056C7.78789%2031.5995%206.00037%2029.8909%206.00037%2027.834V4.16605C6.00033%202.12004%207.87549%200.400437%2010.1556%200.400421Z%22%20fill%3D%22white%22%20stroke%3D%22%23E5E5E5%22%20stroke-width%3D%220.8%22%2F%3E%3Cpath%20d%3D%22M21.6205%206.528V0L31.2%209.6H24.8136C21.9398%209.6%2021.4874%207.552%2021.6205%206.528Z%22%20fill%3D%22%23E5E5E5%22%2F%3E%3Crect%20x%3D%220.799988%22%20y%3D%2215.2%22%20width%3D%2221.4%22%20height%3D%2212.2%22%20rx%3D%222.4%22%20fill%3D%22%23D92D20%22%2F%3E%3Cpath%20d%3D%22M4.89925%2023.8V18.5636H6.96516C7.36232%2018.5636%207.70067%2018.6395%207.98022%2018.7912C8.25977%2018.9412%208.47283%2019.15%208.61942%2019.4176C8.76772%2019.6835%208.84187%2019.9903%208.84187%2020.3381C8.84187%2020.6858%208.76687%2020.9926%208.61687%2021.2585C8.46687%2021.5244%208.24954%2021.7315%207.96488%2021.8798C7.68192%2022.0281%207.33931%2022.1023%206.93704%2022.1023H5.62028V21.215H6.75806C6.97113%2021.215%207.1467%2021.1784%207.28477%2021.1051C7.42454%2021.0301%207.52852%2020.927%207.5967%2020.7957C7.66658%2020.6628%207.70153%2020.5102%207.70153%2020.3381C7.70153%2020.1642%207.66658%2020.0125%207.5967%2019.8829C7.52852%2019.7517%207.42454%2019.6503%207.28477%2019.5787C7.14499%2019.5054%206.96772%2019.4687%206.75295%2019.4687H6.00636V23.8H4.89925ZM11.4172%2023.8H9.56097V18.5636H11.4326C11.9593%2018.5636%2012.4127%2018.6685%2012.7928%2018.8781C13.1729%2019.0861%2013.4652%2019.3852%2013.6698%2019.7756C13.876%2020.1659%2013.9792%2020.6329%2013.9792%2021.1767C13.9792%2021.7221%2013.876%2022.1909%2013.6698%2022.5829C13.4652%2022.975%2013.1712%2023.2758%2012.7877%2023.4855C12.4059%2023.6952%2011.949%2023.8%2011.4172%2023.8ZM10.6681%2022.8514H11.3712C11.6985%2022.8514%2011.9738%2022.7935%2012.1971%2022.6775C12.4221%2022.5599%2012.5908%2022.3784%2012.7033%2022.1329C12.8175%2021.8858%2012.8746%2021.567%2012.8746%2021.1767C12.8746%2020.7898%2012.8175%2020.4736%2012.7033%2020.2281C12.5908%2019.9827%2012.4229%2019.802%2012.1996%2019.6861C11.9763%2019.5702%2011.701%2019.5122%2011.3738%2019.5122H10.6681V22.8514ZM14.7993%2023.8V18.5636H18.2663V19.4764H15.9064V20.7241H18.0362V21.6369H15.9064V23.8H14.7993Z%22%20fill%3D%22white%22%2F%3E%3C%2Fsvg%3E')";
            defaultFileIcon.style.width = "2rem";
            defaultFileIcon.style.height = "2rem";
          }
          if (IMAGE_TYPE.includes(FILE_TYPE)) {
            defaultFileIcon.style.backgroundImage = "url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2232%22%20height%3D%2232%22%20viewBox%3D%220%200%2032%2032%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M10.1556%200.400452H21.434L30.8002%209.76569V27.834C30.8002%2029.8915%2029.0115%2031.5996%2026.7523%2031.5997H10.056C7.78789%2031.5996%206.00037%2029.891%206.00037%2027.834V4.16608C6.00033%202.12007%207.87549%200.400467%2010.1556%200.400452Z%22%20fill%3D%22white%22%20stroke%3D%22%23E5E5E5%22%20stroke-width%3D%220.8%22%2F%3E%3Cpath%20d%3D%22M21.6205%206.528V0L31.2%209.6H24.8136C21.9398%209.6%2021.4874%207.552%2021.6205%206.528Z%22%20fill%3D%22%23E5E5E5%22%2F%3E%3Crect%20x%3D%220.799988%22%20y%3D%2215.2%22%20width%3D%2221.4%22%20height%3D%2212.2%22%20rx%3D%222.4%22%20fill%3D%22%237F56D9%22%2F%3E%3Cpath%20d%3D%22M6.02042%2018.5636V23.8H4.91332V18.5636H6.02042ZM6.93128%2018.5636H8.29663L9.73867%2022.0818H9.80004L11.2421%2018.5636H12.6074V23.8H11.5336V20.3917H11.4901L10.135%2023.7744H9.40373L8.04861%2020.379H8.00515V23.8H6.93128V18.5636ZM16.9917%2020.2562C16.9559%2020.1318%2016.9056%2020.0219%2016.8409%2019.9264C16.7761%2019.8292%2016.6968%2019.7474%2016.6031%2019.681C16.511%2019.6128%2016.4054%2019.5608%2016.286%2019.525C16.1684%2019.4892%2016.038%2019.4713%2015.8949%2019.4713C15.6272%2019.4713%2015.392%2019.5378%2015.1892%2019.6707C14.988%2019.8037%2014.8312%2019.9971%2014.7187%2020.2511C14.6062%2020.5034%2014.55%2020.8119%2014.55%2021.1767C14.55%2021.5415%2014.6054%2021.8517%2014.7162%2022.1074C14.827%2022.3631%2014.9838%2022.5582%2015.1866%2022.6929C15.3895%2022.8258%2015.6289%2022.8923%2015.9051%2022.8923C16.1556%2022.8923%2016.3696%2022.848%2016.5468%2022.7594C16.7258%2022.669%2016.8622%2022.542%2016.9559%2022.3784C17.0514%2022.2148%2017.0991%2022.0213%2017.0991%2021.798L17.3241%2021.8312H15.9741V20.9977H18.1653V21.6574C18.1653%2022.1176%2018.0681%2022.5131%2017.8738%2022.8437C17.6795%2023.1727%2017.4119%2023.4267%2017.071%2023.6057C16.7301%2023.7829%2016.3397%2023.8716%2015.9%2023.8716C15.4091%2023.8716%2014.9778%2023.7633%2014.6062%2023.5469C14.2346%2023.3287%2013.9449%2023.0193%2013.7369%2022.6187C13.5306%2022.2165%2013.4275%2021.7392%2013.4275%2021.1869C13.4275%2020.7625%2013.4889%2020.3841%2013.6116%2020.0517C13.736%2019.7176%2013.9099%2019.4346%2014.1332%2019.2028C14.3565%2018.971%2014.6164%2018.7946%2014.913%2018.6736C15.2096%2018.5525%2015.5309%2018.492%2015.877%2018.492C16.1735%2018.492%2016.4497%2018.5355%2016.7054%2018.6224C16.961%2018.7077%2017.1877%2018.8287%2017.3855%2018.9855C17.5849%2019.1423%2017.7477%2019.329%2017.8738%2019.5454C18%2019.7602%2018.0809%2019.9971%2018.1167%2020.2562H16.9917Z%22%20fill%3D%22white%22%2F%3E%3C%2Fsvg%3E')";
            defaultFileIcon.style.width = "2rem";
            defaultFileIcon.style.height = "2rem";
          }
          fileTitle.textContent = FILE_NAME;
          fileDesc.textContent = `Ukuran File: ${FILE_SIZE_IN_MB.toFixed(2)}MB`;
          fileUploadItem.dispatchEvent(
            new CustomEvent("file:changed", { detail: { inputFile: inputFile2 } })
          );
        }, 1e3);
      }
    });
  }

  // src/js/components/stateful/range-datepicker.js
  function initRangeDatepicker() {
    document.querySelectorAll(".ina-ss-range-datepicker").forEach((rangeDatepicker) => {
      let currentDate = /* @__PURE__ */ new Date();
      let currentDateLeft = /* @__PURE__ */ new Date();
      let currentDateRight = new Date(
        currentDateLeft.getFullYear(),
        currentDateLeft.getMonth() + 1,
        currentDateLeft.getDate()
      );
      let selectedDateTarget = null;
      let fromSelectedDate = null;
      let toSelectedDate = null;
      let selectedDate = null;
      const MONTHS = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember"
      ];
      const DAYS = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
      const rangeDatepickerTrigger = rangeDatepicker.querySelector(
        `.ina-ss-range-datepicker__trigger`
      );
      const rangeDatepickerPopover = rangeDatepicker.querySelector(
        `.ina-ss-range-datepicker__popover`
      );
      const datePickerLeftDate = rangeDatepicker.querySelector(
        `.ina-ss-range-datepicker__left-date`
      );
      const datePickerRightDate = rangeDatepicker.querySelector(
        `.ina-ss-range-datepicker__right-date`
      );
      const datepickerMonthLeftTrigger = datePickerLeftDate.querySelector(
        `.ina-ss-range-datepicker__month-trigger`
      );
      const datepickerMonthRightTrigger = datePickerRightDate.querySelector(
        `.ina-ss-range-datepicker__month-trigger`
      );
      const datepickerLeftContent = datePickerLeftDate.querySelector(
        `.ina-ss-range-datepicker__content`
      );
      const datepickerRightContent = datePickerRightDate.querySelector(
        `.ina-ss-range-datepicker__content`
      );
      const prevMonthButtonLeft = datePickerLeftDate.querySelector(
        `.ina-ss-range-datepicker__nav-prev`
      );
      const nextMonthButtonLeft = datePickerLeftDate.querySelector(
        `.ina-ss-range-datepicker__nav-next`
      );
      const prevMonthButtonRight = datePickerRightDate.querySelector(
        `.ina-ss-range-datepicker__nav-prev`
      );
      const nextMonthButtonRight = datePickerRightDate.querySelector(
        `.ina-ss-range-datepicker__nav-next`
      );
      function renderCalendar(targetEl, year, month) {
        const rangeDatepickerMonthTrigger = targetEl.querySelector(
          `.ina-ss-range-datepicker__month-trigger`
        );
        const rangeDatepickerMonthPopover = targetEl.querySelector(
          `.ina-ss-range-datepicker__month-popover`
        );
        const rangeDatepickerMonthItem = targetEl.querySelectorAll(
          `.ina-ss-range-datepicker__month-item`
        );
        const rangeDatepickerYearTrigger = targetEl.querySelector(
          `.ina-ss-range-datepicker__year-trigger`
        );
        const targetContentEl = targetEl.querySelector(
          `.ina-ss-range-datepicker__content`
        );
        targetContentEl.innerHTML = "";
        rangeDatepickerMonthTrigger.textContent = MONTHS[month].substring(0, 3);
        rangeDatepickerYearTrigger.textContent = year;
        DAYS.forEach((day) => {
          const dayNameWrapper = document.createElement("div");
          dayNameWrapper.className = `ina-ss-range-datepicker__dayname-wrapper`;
          const dayNameEl = document.createElement("span");
          dayNameEl.className = `ina-ss-range-datepicker__dayname`;
          dayNameEl.textContent = day.substring(0, 3);
          dayNameWrapper.appendChild(dayNameEl);
          targetContentEl.appendChild(dayNameWrapper);
        });
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrevMonth = new Date(year, month, 0).getDate();
        for (let i = 0; i < firstDayOfMonth; i++) {
          const dayEl = document.createElement("button");
          dayEl.className = `ina-ss-range-datepicker__calendar-day outside-month`;
          dayEl.textContent = daysInPrevMonth - firstDayOfMonth + 1 + i;
          dayEl.disabled = true;
          targetContentEl.appendChild(dayEl);
        }
        const today = /* @__PURE__ */ new Date();
        for (let i = 1; i <= daysInMonth; i++) {
          const dayEl = document.createElement("button");
          dayEl.className = `ina-ss-range-datepicker__calendar-day`;
          dayEl.textContent = i;
          dayEl.dataset.date = new Date(year, month, i).toISOString();
          if (fromSelectedDate && new Date(year, month, i).getTime() === fromSelectedDate?.getTime()) {
            dayEl.classList.add("selected-from");
          }
          if (toSelectedDate && new Date(year, month, i).getTime() === toSelectedDate?.getTime()) {
            dayEl.classList.add("selected-to");
          }
          if (toSelectedDate && new Date(year, month, i) === toSelectedDate) {
            dayEl.classList.add("selected-to");
          }
          if (fromSelectedDate && toSelectedDate && new Date(year, month, i) > fromSelectedDate && new Date(year, month, i) < toSelectedDate) {
            dayEl.classList.add("selected-range");
          }
          if (year === today.getFullYear() && month === today.getMonth() && i === today.getDate()) {
            const marker = document.createElement("span");
            marker.className = `ina-ss-range-datepicker__today-marker`;
            marker.textContent = "Hari ini";
            dayEl.appendChild(marker);
            dayEl.classList.add("today");
          }
          if (selectedDate && year === selectedDate.getFullYear() && month === selectedDate.getMonth() && i === selectedDate.getDate()) {
            dayEl.classList.add("selected");
          }
          targetContentEl.appendChild(dayEl);
        }
        const totalCells = 42;
        const cellsRendered = firstDayOfMonth + daysInMonth;
        const remainingCells = totalCells - cellsRendered;
        for (let i = 1; i <= remainingCells; i++) {
          const dayEl = document.createElement("button");
          dayEl.className = `ina-ss-range-datepicker__calendar-day outside-month`;
          dayEl.textContent = i;
          dayEl.disabled = true;
          targetContentEl.appendChild(dayEl);
        }
      }
      function handleChangeDate(target) {
        if (fromSelectedDate && toSelectedDate) {
          if (target.classList.contains(
            `ina-ss-range-datepicker__calendar-day`
          ) && !target.classList.contains("outside-month")) {
            const targetDate = new Date(target.dataset.date);
            if (target.classList.contains("selected-from") || target.classList.contains("selected-to")) {
              const fromSelectedDateLeftEl = datepickerLeftContent.querySelector(
                `.ina-ss-range-datepicker__calendar-day.selected-from`
              );
              const fromSelectedDateRightEl = datepickerRightContent.querySelector(
                `.ina-ss-range-datepicker__calendar-day.selected-from`
              );
              fromSelectedDateLeftEl?.classList.remove("selected-from");
              fromSelectedDateRightEl?.classList.remove("selected-from");
              const toSelectedDateLeftEl = datepickerLeftContent.querySelector(
                `.ina-ss-range-datepicker__calendar-day.selected-to`
              );
              const toSelectedDateRightEl = datepickerRightContent.querySelector(
                `.ina-ss-range-datepicker__calendar-day.selected-to`
              );
              toSelectedDateLeftEl?.classList.remove("selected-to");
              toSelectedDateRightEl?.classList.remove("selected-to");
              target.classList.add("selected-from");
              target.classList.add("selected-to");
              fromSelectedDate = targetDate;
              toSelectedDate = targetDate;
            }
            if (targetDate < fromSelectedDate) {
              const fromSelectedDateLeftEl = datepickerLeftContent.querySelector(
                `.ina-ss-range-datepicker__calendar-day.selected-from`
              );
              const fromSelectedDateRightEl = datepickerRightContent.querySelector(
                `.ina-ss-range-datepicker__calendar-day.selected-from`
              );
              fromSelectedDateLeftEl?.classList.remove("selected-from");
              fromSelectedDateRightEl?.classList.remove("selected-from");
              fromSelectedDate = targetDate;
              target.classList.add("selected-from");
            }
            if (targetDate > toSelectedDate || targetDate > fromSelectedDate) {
              const toSelectedDateLeftEl = datepickerLeftContent.querySelector(
                `.ina-ss-range-datepicker__calendar-day.selected-to`
              );
              const toSelectedDateRightEl = datepickerRightContent.querySelector(
                `.ina-ss-range-datepicker__calendar-day.selected-to`
              );
              toSelectedDateLeftEl?.classList.remove("selected-to");
              toSelectedDateRightEl?.classList.remove("selected-to");
              toSelectedDate = targetDate;
              target.classList.add("selected-to");
            }
            const leftDays = datepickerLeftContent.querySelectorAll(
              ".ina-ss-range-datepicker__calendar-day"
            );
            const rightDays = datepickerRightContent.querySelectorAll(
              ".ina-ss-range-datepicker__calendar-day"
            );
            const leftDaysArray = Array.from(leftDays);
            const rightDaysArray = Array.from(rightDays);
            const leftFromIndex = leftDaysArray.findIndex(
              (btn) => btn.classList.contains("selected-from")
            );
            const rightFromIndex = rightDaysArray.findIndex(
              (btn) => btn.classList.contains("selected-from")
            );
            const leftToIndex = leftDaysArray.findIndex(
              (btn) => btn.classList.contains("selected-to")
            );
            const rightToIndex = rightDaysArray.findIndex(
              (btn) => btn.classList.contains("selected-to")
            );
            leftDaysArray.forEach(
              (btn) => btn.classList.remove("selected-range")
            );
            rightDaysArray.forEach(
              (btn) => btn.classList.remove("selected-range")
            );
            if (leftFromIndex !== -1 && leftToIndex !== -1 && rightFromIndex === -1 && rightToIndex === -1) {
              for (let i = leftFromIndex + 1; i <= leftToIndex - 1; i++) {
                leftDaysArray[i].classList.add("selected-range");
              }
            }
            if (leftFromIndex !== -1 && rightToIndex !== -1) {
              for (let i = leftFromIndex + 1; i < leftDaysArray.length; i++) {
                leftDaysArray[i].classList.add("selected-range");
              }
              for (let i = 0; i < rightToIndex; i++) {
                rightDaysArray[i].classList.add("selected-range");
              }
            }
            if (leftFromIndex === -1 && leftToIndex === -1 && rightFromIndex !== -1 && rightToIndex !== -1) {
              for (let i = rightFromIndex + 1; i <= rightToIndex - 1; i++) {
                rightDaysArray[i].classList.add("selected-range");
              }
            }
          }
        } else {
          if (target.classList.contains(
            `ina-ss-range-datepicker__calendar-day`
          ) && !target.classList.contains("outside-month")) {
            if (target.classList.contains("selected-from") && target.classList.contains("selected-to")) {
              target.classList.remove("selected-from");
              target.classList.remove("selected-to");
              selectedDateTarget = null;
            } else {
              target.classList.add("selected-from");
              target.classList.add("selected-to");
              selectedDateTarget = target;
            }
            fromSelectedDate = selectedDateTarget ? new Date(selectedDateTarget.dataset.date) : null;
            toSelectedDate = selectedDateTarget ? new Date(selectedDateTarget.dataset.date) : null;
          }
        }
        rangeDatepicker.dispatchEvent(
          new CustomEvent("date:changed", {
            detail: {
              selectedDate: {
                from: fromSelectedDate,
                to: toSelectedDate
              }
            }
          })
        );
      }
      datepickerLeftContent.addEventListener("click", (e) => {
        const target = e.target;
        if (!target) return;
        handleChangeDate(target);
      });
      datepickerRightContent.addEventListener("click", (e) => {
        const target = e.target;
        if (!target) return;
        handleChangeDate(target);
      });
      function togglePopover() {
        if (rangeDatepickerPopover.style.display === "none" || rangeDatepickerPopover.style.display === "") {
          rangeDatepickerPopover.style.display = "flex";
          renderCalendar(
            datePickerLeftDate,
            currentDateLeft.getFullYear(),
            currentDateLeft.getMonth()
          );
          renderCalendar(
            datePickerRightDate,
            currentDateRight.getFullYear(),
            currentDateRight.getMonth()
          );
        } else {
          rangeDatepickerPopover.style.display = "none";
        }
      }
      function getMonthDifference(d1, d2) {
        let months;
        months = (d2.getFullYear() - d1.getFullYear()) * 12;
        months -= d1.getMonth();
        months += d2.getMonth();
        return months;
      }
      rangeDatepickerTrigger.addEventListener("click", (e) => {
        e.stopPropagation();
        togglePopover();
      });
      prevMonthButtonLeft.addEventListener("click", () => {
        currentDateLeft.setMonth(currentDateLeft.getMonth() - 1);
        renderCalendar(
          datePickerLeftDate,
          currentDateLeft.getFullYear(),
          currentDateLeft.getMonth()
        );
      });
      nextMonthButtonLeft.addEventListener("click", () => {
        const monthDiff = getMonthDifference(currentDateLeft, currentDateRight);
        currentDateLeft.setMonth(currentDateLeft.getMonth() + 1);
        renderCalendar(
          datePickerLeftDate,
          currentDateLeft.getFullYear(),
          currentDateLeft.getMonth()
        );
        if (monthDiff === 1) {
          currentDateRight.setMonth(currentDateRight.getMonth() + 1);
          renderCalendar(
            datePickerRightDate,
            currentDateRight.getFullYear(),
            currentDateRight.getMonth()
          );
        }
      });
      prevMonthButtonRight.addEventListener("click", () => {
        const monthDiff = getMonthDifference(currentDateLeft, currentDateRight);
        currentDateRight.setMonth(currentDateRight.getMonth() - 1);
        renderCalendar(
          datePickerRightDate,
          currentDateRight.getFullYear(),
          currentDateRight.getMonth()
        );
        if (monthDiff === 1) {
          currentDateLeft.setMonth(currentDateRight.getMonth() - 1);
          renderCalendar(
            datePickerLeftDate,
            currentDateLeft.getFullYear(),
            currentDateLeft.getMonth()
          );
        }
      });
      nextMonthButtonRight.addEventListener("click", () => {
        currentDateRight.setMonth(currentDateRight.getMonth() + 1);
        renderCalendar(
          datePickerRightDate,
          currentDateRight.getFullYear(),
          currentDateRight.getMonth()
        );
      });
      document.addEventListener("click", (e) => {
        if (!rangeDatepickerPopover.contains(e.target) && e.target !== rangeDatepickerTrigger && !rangeDatepickerTrigger.contains(e.target)) {
          rangeDatepickerPopover.style.display = "none";
        }
      });
    });
  }

  // src/js/components/stateful/pagination.js
  function initPagination() {
    document.querySelectorAll(`.${PREFIX}-pagination`).forEach((container) => {
      if (container.dataset.initialized === "true") return;
      container.dataset.initialized = "true";
      const navButtonsContainer = container.querySelector(
        `.${PREFIX}-pagination__nav-buttons`
      );
      const pageInfo = container.querySelector(
        `.${PREFIX}-pagination__page-info`
      );
      const firstBtn = container.querySelector('[data-action="first"]');
      const prevBtn = container.querySelector('[data-action="prev"]');
      const nextBtn = container.querySelector('[data-action="next"]');
      const lastBtn = container.querySelector('[data-action="last"]');
      const pageSizeSelect = container.querySelector('[data-role="page-size"]');
      if (!navButtonsContainer || !pageInfo) return;
      let currentPage = parseInt(container.dataset.current || "1", 10);
      let totalPages = parseInt(container.dataset.total || "10", 10);
      let pageSize = parseInt(container.dataset.pageSize || "10", 10);
      let isDisabled = container.dataset.disabled === "true";
      let pageButtons = [];
      const updateUI = () => {
        pageInfo.textContent = `Halaman ${currentPage} dari ${totalPages}`;
        const isFirst = currentPage === 1;
        if (firstBtn) {
          const disabled = isDisabled || isFirst;
          firstBtn.disabled = disabled;
          firstBtn.classList.toggle(
            `${PREFIX}-pagination__nav-button--disabled`,
            disabled
          );
          firstBtn.classList.toggle(
            `${PREFIX}-pagination__nav-button--enabled`,
            !disabled
          );
        }
        if (prevBtn) {
          const disabled = isDisabled || isFirst;
          prevBtn.disabled = disabled;
          prevBtn.classList.toggle(
            `${PREFIX}-pagination__nav-button--disabled`,
            disabled
          );
          prevBtn.classList.toggle(
            `${PREFIX}-pagination__nav-button--enabled`,
            !disabled
          );
        }
        const isLast = currentPage === totalPages;
        if (nextBtn) {
          const disabled = isDisabled || isLast;
          nextBtn.disabled = disabled;
          nextBtn.classList.toggle(
            `${PREFIX}-pagination__nav-button--disabled`,
            disabled
          );
          nextBtn.classList.toggle(
            `${PREFIX}-pagination__nav-button--enabled`,
            !disabled
          );
        }
        if (lastBtn) {
          const disabled = isDisabled || isLast;
          lastBtn.disabled = disabled;
          lastBtn.classList.toggle(
            `${PREFIX}-pagination__nav-button--disabled`,
            disabled
          );
          lastBtn.classList.toggle(
            `${PREFIX}-pagination__nav-button--enabled`,
            !disabled
          );
        }
        if (pageSizeSelect) {
          pageSizeSelect.disabled = isDisabled;
          pageSizeSelect.classList.toggle(
            `${PREFIX}-pagination__page-size-select--disabled`,
            isDisabled
          );
        }
        renderPageNumbers();
      };
      const renderPageNumbers = () => {
        let start, end;
        if (currentPage === 1) {
          start = 1;
          end = Math.min(3, totalPages);
        } else if (currentPage === totalPages) {
          start = Math.max(1, totalPages - 2);
          end = totalPages;
        } else {
          start = currentPage - 1;
          end = currentPage + 1;
        }
        if (start < 1) start = 1;
        if (end > totalPages) end = totalPages;
        pageButtons.forEach((btn) => btn.remove());
        pageButtons = [];
        const refNode = nextBtn || null;
        for (let i = start; i <= end; i++) {
          const isActive = i === currentPage;
          const button = document.createElement("button");
          button.type = "button";
          button.textContent = i;
          button.disabled = isDisabled;
          button.className = `${PREFIX}-pagination__page-button ${PREFIX}-pagination__page-button--${isActive ? "active" : isDisabled ? "disabled" : "enabled"}`;
          button.addEventListener("click", (e) => {
            e.stopPropagation();
            if (!isDisabled && i !== currentPage) {
              goToPage(i);
            }
          });
          navButtonsContainer.insertBefore(button, refNode);
          pageButtons.push(button);
        }
      };
      const goToPage = (page) => {
        if (isDisabled) return;
        if (page < 1) page = 1;
        if (page > totalPages) page = totalPages;
        if (page === currentPage) return;
        currentPage = page;
        container.dataset.current = currentPage;
        updateUI();
        dispatchChange();
      };
      const dispatchChange = () => {
        container.dispatchEvent(
          new CustomEvent("pagination:change", {
            bubbles: true,
            detail: {
              page: currentPage,
              pageSize,
              totalPages
            }
          })
        );
      };
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === "attributes") {
            if (mutation.attributeName === "data-current") {
              const newVal = parseInt(container.dataset.current || "1", 10);
              if (newVal !== currentPage) {
                currentPage = newVal;
                updateUI();
              }
            } else if (mutation.attributeName === "data-total") {
              totalPages = parseInt(container.dataset.total || "10", 10);
              updateUI();
            } else if (mutation.attributeName === "data-page-size") {
              pageSize = parseInt(container.dataset.pageSize || "10", 10);
            } else if (mutation.attributeName === "data-disabled") {
              isDisabled = container.dataset.disabled === "true";
              updateUI();
            }
          }
        });
      });
      observer.observe(container, {
        attributes: true,
        attributeFilter: [
          "data-current",
          "data-total",
          "data-page-size",
          "data-disabled"
        ]
      });
      if (firstBtn)
        firstBtn.addEventListener("click", () => {
          if (!isDisabled && currentPage > 1) goToPage(1);
        });
      if (prevBtn)
        prevBtn.addEventListener("click", () => {
          if (!isDisabled && currentPage > 1) goToPage(currentPage - 1);
        });
      if (nextBtn)
        nextBtn.addEventListener("click", () => {
          if (!isDisabled && currentPage < totalPages) goToPage(currentPage + 1);
        });
      if (lastBtn)
        lastBtn.addEventListener("click", () => {
          if (!isDisabled && currentPage < totalPages) goToPage(totalPages);
        });
      if (navButtonsContainer && !navButtonsContainer.__inaKeyboardSet) {
        navButtonsContainer.addEventListener("keydown", (e) => {
          if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
            const focusable = Array.from(
              navButtonsContainer.querySelectorAll("button:not([disabled])")
            );
            if (!focusable.length) return;
            const currentIndex = focusable.indexOf(document.activeElement);
            if (currentIndex >= 0) {
              e.preventDefault();
              const nextIndex = e.key === "ArrowRight" ? (currentIndex + 1) % focusable.length : (currentIndex - 1 + focusable.length) % focusable.length;
              focusable[nextIndex]?.focus();
            }
          } else if (e.key === "Enter" || e.key === " ") {
            if (document.activeElement && document.activeElement.tagName === "BUTTON") {
              e.preventDefault();
              document.activeElement.click();
            }
          }
        });
        navButtonsContainer.__inaKeyboardSet = true;
      }
      if (pageSizeSelect) {
        pageSizeSelect.addEventListener("change", (e) => {
          if (isDisabled) return;
          pageSize = parseInt(e.target.value, 10);
          currentPage = 1;
          container.dataset.pageSize = pageSize;
          container.dataset.current = currentPage;
          updateUI();
          dispatchChange();
        });
      }
      updateUI();
    });
  }

  // src/js/utils/countries.js
  var COUNTRIES = [
    { code: "ID", name: "Indonesia", dialCode: "+62" },
    { code: "AF", name: "Afghanistan", dialCode: "+93" },
    { code: "AL", name: "Albania", dialCode: "+355" },
    { code: "DZ", name: "Algeria", dialCode: "+213" },
    { code: "AS", name: "American Samoa", dialCode: "+1684" },
    { code: "AD", name: "Andorra", dialCode: "+376" },
    { code: "AO", name: "Angola", dialCode: "+244" },
    { code: "AI", name: "Anguilla", dialCode: "+1264" },
    { code: "AG", name: "Antigua and Barbuda", dialCode: "+1268" },
    { code: "AR", name: "Argentina", dialCode: "+54" },
    { code: "AM", name: "Armenia", dialCode: "+374" },
    { code: "AW", name: "Aruba", dialCode: "+297" },
    { code: "AU", name: "Australia", dialCode: "+61" },
    { code: "AT", name: "Austria", dialCode: "+43" },
    { code: "AZ", name: "Azerbaijan", dialCode: "+994" },
    { code: "BS", name: "Bahamas", dialCode: "+1242" },
    { code: "BH", name: "Bahrain", dialCode: "+973" },
    { code: "BD", name: "Bangladesh", dialCode: "+880" },
    { code: "BB", name: "Barbados", dialCode: "+1246" },
    { code: "BY", name: "Belarus", dialCode: "+375" },
    { code: "BE", name: "Belgium", dialCode: "+32" },
    { code: "BZ", name: "Belize", dialCode: "+501" },
    { code: "BJ", name: "Benin", dialCode: "+229" },
    { code: "BM", name: "Bermuda", dialCode: "+1441" },
    { code: "BT", name: "Bhutan", dialCode: "+975" },
    { code: "BO", name: "Bolivia", dialCode: "+591" },
    { code: "BA", name: "Bosnia and Herzegovina", dialCode: "+387" },
    { code: "BW", name: "Botswana", dialCode: "+267" },
    { code: "BR", name: "Brazil", dialCode: "+55" },
    { code: "IO", name: "British Indian Ocean Territory", dialCode: "+246" },
    { code: "BN", name: "Brunei Darussalam", dialCode: "+673" },
    { code: "BG", name: "Bulgaria", dialCode: "+359" },
    { code: "BF", name: "Burkina Faso", dialCode: "+226" },
    { code: "BI", name: "Burundi", dialCode: "+257" },
    { code: "KH", name: "Cambodia", dialCode: "+855" },
    { code: "CM", name: "Cameroon", dialCode: "+237" },
    { code: "CA", name: "Canada", dialCode: "+1" },
    { code: "CV", name: "Cape Verde", dialCode: "+238" },
    { code: "KY", name: "Cayman Islands", dialCode: "+1345" },
    { code: "CF", name: "Central African Republic", dialCode: "+236" },
    { code: "TD", name: "Chad", dialCode: "+235" },
    { code: "CL", name: "Chile", dialCode: "+56" },
    { code: "CN", name: "China", dialCode: "+86" },
    { code: "CX", name: "Christmas Island", dialCode: "+61" },
    { code: "CC", name: "Cocos (Keeling) Islands", dialCode: "+61" },
    { code: "CO", name: "Colombia", dialCode: "+57" },
    { code: "KM", name: "Comoros", dialCode: "+269" },
    { code: "CG", name: "Congo", dialCode: "+242" },
    { code: "CD", name: "Congo, Democratic Republic of the", dialCode: "+243" },
    { code: "CK", name: "Cook Islands", dialCode: "+682" },
    { code: "CR", name: "Costa Rica", dialCode: "+506" },
    { code: "CI", name: "Cote d'Ivoire", dialCode: "+225" },
    { code: "HR", name: "Croatia", dialCode: "+385" },
    { code: "CU", name: "Cuba", dialCode: "+53" },
    { code: "CY", name: "Cyprus", dialCode: "+357" },
    { code: "CZ", name: "Czech Republic", dialCode: "+420" },
    { code: "DK", name: "Denmark", dialCode: "+45" },
    { code: "DJ", name: "Djibouti", dialCode: "+253" },
    { code: "DM", name: "Dominica", dialCode: "+1767" },
    { code: "DO", name: "Dominican Republic", dialCode: "+1" },
    { code: "EC", name: "Ecuador", dialCode: "+593" },
    { code: "EG", name: "Egypt", dialCode: "+20" },
    { code: "SV", name: "El Salvador", dialCode: "+503" },
    { code: "GQ", name: "Equatorial Guinea", dialCode: "+240" },
    { code: "ER", name: "Eritrea", dialCode: "+291" },
    { code: "EE", name: "Estonia", dialCode: "+372" },
    { code: "ET", name: "Ethiopia", dialCode: "+251" },
    { code: "FK", name: "Falkland Islands (Malvinas)", dialCode: "+500" },
    { code: "FO", name: "Faroe Islands", dialCode: "+298" },
    { code: "FJ", name: "Fiji", dialCode: "+679" },
    { code: "FI", name: "Finland", dialCode: "+358" },
    { code: "FR", name: "France", dialCode: "+33" },
    { code: "GF", name: "French Guiana", dialCode: "+594" },
    { code: "PF", name: "French Polynesia", dialCode: "+689" },
    { code: "GA", name: "Gabon", dialCode: "+241" },
    { code: "GM", name: "Gambia", dialCode: "+220" },
    { code: "GE", name: "Georgia", dialCode: "+995" },
    { code: "DE", name: "Germany", dialCode: "+49" },
    { code: "GH", name: "Ghana", dialCode: "+233" },
    { code: "GI", name: "Gibraltar", dialCode: "+350" },
    { code: "GR", name: "Greece", dialCode: "+30" },
    { code: "GL", name: "Greenland", dialCode: "+299" },
    { code: "GD", name: "Grenada", dialCode: "+1473" },
    { code: "GP", name: "Guadeloupe", dialCode: "+590" },
    { code: "GU", name: "Guam", dialCode: "+1671" },
    { code: "GT", name: "Guatemala", dialCode: "+502" },
    { code: "GG", name: "Guernsey", dialCode: "+44" },
    { code: "GN", name: "Guinea", dialCode: "+224" },
    { code: "GW", name: "Guinea-Bissau", dialCode: "+245" },
    { code: "GY", name: "Guyana", dialCode: "+592" },
    { code: "HT", name: "Haiti", dialCode: "+509" },
    { code: "VA", name: "Holy See (Vatican City State)", dialCode: "+379" },
    { code: "HN", name: "Honduras", dialCode: "+504" },
    { code: "HK", name: "Hong Kong", dialCode: "+852" },
    { code: "HU", name: "Hungary", dialCode: "+36" },
    { code: "IS", name: "Iceland", dialCode: "+354" },
    { code: "IN", name: "India", dialCode: "+91" },
    { code: "IR", name: "Iran, Islamic Republic of", dialCode: "+98" },
    { code: "IQ", name: "Iraq", dialCode: "+964" },
    { code: "IE", name: "Ireland", dialCode: "+353" },
    { code: "IM", name: "Isle of Man", dialCode: "+44" },
    { code: "IL", name: "Israel", dialCode: "+972" },
    { code: "IT", name: "Italy", dialCode: "+39" },
    { code: "JM", name: "Jamaica", dialCode: "+1876" },
    { code: "JP", name: "Japan", dialCode: "+81" },
    { code: "JE", name: "Jersey", dialCode: "+44" },
    { code: "JO", name: "Jordan", dialCode: "+962" },
    { code: "KZ", name: "Kazakhstan", dialCode: "+7" },
    { code: "KE", name: "Kenya", dialCode: "+254" },
    { code: "KI", name: "Kiribati", dialCode: "+686" },
    { code: "KP", name: "Korea, Democratic People's Republic of", dialCode: "+850" },
    { code: "KR", name: "Korea, Republic of", dialCode: "+82" },
    { code: "KW", name: "Kuwait", dialCode: "+965" },
    { code: "KG", name: "Kyrgyzstan", dialCode: "+996" },
    { code: "LA", name: "Laos", dialCode: "+856" },
    { code: "LV", name: "Latvia", dialCode: "+371" },
    { code: "LB", name: "Lebanon", dialCode: "+961" },
    { code: "LS", name: "Lesotho", dialCode: "+266" },
    { code: "LR", name: "Liberia", dialCode: "+231" },
    { code: "LY", name: "Libyan Arab Jamahiriya", dialCode: "+218" },
    { code: "LI", name: "Liechtenstein", dialCode: "+423" },
    { code: "LT", name: "Lithuania", dialCode: "+370" },
    { code: "LU", name: "Luxembourg", dialCode: "+352" },
    { code: "MO", name: "Macao", dialCode: "+853" },
    { code: "MK", name: "Macedonia, the Former Yugoslav Republic of", dialCode: "+389" },
    { code: "MG", name: "Madagascar", dialCode: "+261" },
    { code: "MW", name: "Malawi", dialCode: "+265" },
    { code: "MY", name: "Malaysia", dialCode: "+60" },
    { code: "MV", name: "Maldives", dialCode: "+960" },
    { code: "ML", name: "Mali", dialCode: "+223" },
    { code: "MT", name: "Malta", dialCode: "+356" },
    { code: "MH", name: "Marshall Islands", dialCode: "+692" },
    { code: "MQ", name: "Martinique", dialCode: "+596" },
    { code: "MR", name: "Mauritania", dialCode: "+222" },
    { code: "MU", name: "Mauritius", dialCode: "+230" },
    { code: "YT", name: "Mayotte", dialCode: "+262" },
    { code: "MX", name: "Mexico", dialCode: "+52" },
    { code: "FM", name: "Micronesia, Federated States of", dialCode: "+691" },
    { code: "MD", name: "Moldova, Republic of", dialCode: "+373" },
    { code: "MC", name: "Monaco", dialCode: "+377" },
    { code: "MN", name: "Mongolia", dialCode: "+976" },
    { code: "ME", name: "Montenegro", dialCode: "+382" },
    { code: "MS", name: "Montserrat", dialCode: "+1664" },
    { code: "MA", name: "Morocco", dialCode: "+212" },
    { code: "MZ", name: "Mozambique", dialCode: "+258" },
    { code: "MM", name: "Myanmar", dialCode: "+95" },
    { code: "NA", name: "Namibia", dialCode: "+264" },
    { code: "NR", name: "Nauru", dialCode: "+674" },
    { code: "NP", name: "Nepal", dialCode: "+977" },
    { code: "NL", name: "Netherlands", dialCode: "+31" },
    { code: "NC", name: "New Caledonia", dialCode: "+687" },
    { code: "NZ", name: "New Zealand", dialCode: "+64" },
    { code: "NI", name: "Nicaragua", dialCode: "+505" },
    { code: "NE", name: "Niger", dialCode: "+227" },
    { code: "NG", name: "Nigeria", dialCode: "+234" },
    { code: "NU", name: "Niue", dialCode: "+683" },
    { code: "NF", name: "Norfolk Island", dialCode: "+672" },
    { code: "MP", name: "Northern Mariana Islands", dialCode: "+1670" },
    { code: "NO", name: "Norway", dialCode: "+47" },
    { code: "OM", name: "Oman", dialCode: "+968" },
    { code: "PK", name: "Pakistan", dialCode: "+92" },
    { code: "PW", name: "Palau", dialCode: "+680" },
    { code: "PS", name: "Palestine", dialCode: "+970" },
    { code: "PA", name: "Panama", dialCode: "+507" },
    { code: "PG", name: "Papua New Guinea", dialCode: "+675" },
    { code: "PY", name: "Paraguay", dialCode: "+595" },
    { code: "PE", name: "Peru", dialCode: "+51" },
    { code: "PH", name: "Philippines", dialCode: "+63" },
    { code: "PN", name: "Pitcairn", dialCode: "+870" },
    { code: "PL", name: "Poland", dialCode: "+48" },
    { code: "PT", name: "Portugal", dialCode: "+351" },
    { code: "PR", name: "Puerto Rico", dialCode: "+1939" },
    { code: "QA", name: "Qatar", dialCode: "+974" },
    { code: "RE", name: "Reunion", dialCode: "+262" },
    { code: "RO", name: "Romania", dialCode: "+40" },
    { code: "RU", name: "Russian Federation", dialCode: "+7" },
    { code: "RW", name: "Rwanda", dialCode: "+250" },
    { code: "BL", name: "Saint Barthelemy", dialCode: "+590" },
    { code: "SH", name: "Saint Helena", dialCode: "+290" },
    { code: "KN", name: "Saint Kitts and Nevis", dialCode: "+1869" },
    { code: "LC", name: "Saint Lucia", dialCode: "+1758" },
    { code: "MF", name: "Saint Martin", dialCode: "+590" },
    { code: "PM", name: "Saint Pierre and Miquelon", dialCode: "+508" },
    { code: "VC", name: "Saint Vincent and the Grenadines", dialCode: "+1784" },
    { code: "WS", name: "Samoa", dialCode: "+685" },
    { code: "SM", name: "San Marino", dialCode: "+378" },
    { code: "ST", name: "Sao Tome and Principe", dialCode: "+239" },
    { code: "SA", name: "Saudi Arabia", dialCode: "+966" },
    { code: "SN", name: "Senegal", dialCode: "+221" },
    { code: "RS", name: "Serbia", dialCode: "+381" },
    { code: "SC", name: "Seychelles", dialCode: "+248" },
    { code: "SL", name: "Sierra Leone", dialCode: "+232" },
    { code: "SG", name: "Singapore", dialCode: "+65" },
    { code: "SK", name: "Slovakia", dialCode: "+421" },
    { code: "SI", name: "Slovenia", dialCode: "+386" },
    { code: "SB", name: "Solomon Islands", dialCode: "+677" },
    { code: "SO", name: "Somalia", dialCode: "+252" },
    { code: "ZA", name: "South Africa", dialCode: "+27" },
    { code: "GS", name: "South Georgia and the South Sandwich Islands", dialCode: "+500" },
    { code: "ES", name: "Spain", dialCode: "+34" },
    { code: "LK", name: "Sri Lanka", dialCode: "+94" },
    { code: "SD", name: "Sudan", dialCode: "+249" },
    { code: "SR", name: "Suriname", dialCode: "+597" },
    { code: "SJ", name: "Svalbard and Jan Mayen", dialCode: "+47" },
    { code: "SZ", name: "Swaziland", dialCode: "+268" },
    { code: "SE", name: "Sweden", dialCode: "+46" },
    { code: "CH", name: "Switzerland", dialCode: "+41" },
    { code: "SY", name: "Syrian Arab Republic", dialCode: "+963" },
    { code: "TW", name: "Taiwan, Province of China", dialCode: "+886" },
    { code: "TJ", name: "Tajikistan", dialCode: "+992" },
    { code: "TZ", name: "Tanzania, United Republic of", dialCode: "+255" },
    { code: "TH", name: "Thailand", dialCode: "+66" },
    { code: "TL", name: "Timor-Leste", dialCode: "+670" },
    { code: "TG", name: "Togo", dialCode: "+228" },
    { code: "TK", name: "Tokelau", dialCode: "+690" },
    { code: "TO", name: "Tonga", dialCode: "+676" },
    { code: "TT", name: "Trinidad and Tobago", dialCode: "+1868" },
    { code: "TN", name: "Tunisia", dialCode: "+216" },
    { code: "TR", name: "Turkey", dialCode: "+90" },
    { code: "TM", name: "Turkmenistan", dialCode: "+993" },
    { code: "TC", name: "Turks and Caicos Islands", dialCode: "+1649" },
    { code: "TV", name: "Tuvalu", dialCode: "+688" },
    { code: "UG", name: "Uganda", dialCode: "+256" },
    { code: "UA", name: "Ukraine", dialCode: "+380" },
    { code: "AE", name: "United Arab Emirates", dialCode: "+971" },
    { code: "GB", name: "United Kingdom", dialCode: "+44" },
    { code: "US", name: "United States", dialCode: "+1" },
    { code: "UY", name: "Uruguay", dialCode: "+598" },
    { code: "UZ", name: "Uzbekistan", dialCode: "+998" },
    { code: "VU", name: "Vanuatu", dialCode: "+678" },
    { code: "VE", name: "Venezuela", dialCode: "+58" },
    { code: "VN", name: "Vietnam", dialCode: "+84" },
    { code: "VG", name: "Virgin Islands, British", dialCode: "+1284" },
    { code: "VI", name: "Virgin Islands, U.S.", dialCode: "+1340" },
    { code: "WF", name: "Wallis and Futuna", dialCode: "+681" },
    { code: "EH", name: "Western Sahara", dialCode: "+212" },
    { code: "YE", name: "Yemen", dialCode: "+967" },
    { code: "ZM", name: "Zambia", dialCode: "+260" },
    { code: "ZW", name: "Zimbabwe", dialCode: "+263" }
  ];

  // src/js/utils/flags.js
  var flagCache = {};
  var getFlag = async (code) => {
    if (flagCache[code]) {
      return flagCache[code];
    }
    try {
      const flag = await import(`@idds/styles/assets/flags/${code.toLowerCase()}.svg`);
      flagCache[code] = flag.default;
      return flag.default;
    } catch (error) {
      console.error(`[IDDS PhoneInput] Failed to load flag for: ${code}`, error);
      return "";
    }
  };

  // src/js/components/stateful/phone-input.js
  var PhoneInput = class {
    constructor(selectorOrElement, options = {}) {
      this.container = typeof selectorOrElement === "string" ? document.querySelector(selectorOrElement) : selectorOrElement;
      if (!this.container) {
        console.warn("[IDDS PhoneInput] Container not found:", selectorOrElement);
        return;
      }
      if (this.container.dataset.initialized === "true") {
        return;
      }
      this.container.dataset.initialized = "true";
      this.options = {
        modelValue: this.container.dataset.value || "",
        label: this.container.dataset.label || "",
        placeholder: this.container.getAttribute("placeholder") || "812-3456-7890",
        size: this.container.dataset.size || "md",
        status: this.container.dataset.status || "neutral",
        disabled: this.container.hasAttribute("disabled") || false,
        readonly: this.container.hasAttribute("readonly") || false,
        required: this.container.hasAttribute("required") || false,
        defaultCountry: this.container.dataset.defaultCountry || "ID",
        allowClear: this.container.dataset.allowClear !== "false",
        countries: COUNTRIES,
        onChange: null,
        ...options
      };
      this.state = {
        isOpen: false,
        countrySearch: "",
        selectedCountry: this.options.countries.find((c) => c.code === this.options.defaultCountry) || this.options.countries[0],
        phoneNumber: ""
      };
      this.elements = {};
      this.inputId = `phone-input-${Math.random().toString(36).substr(2, 9)}`;
      this.init();
    }
    async init() {
      this.initDOM();
      this.initEvents();
      this.syncValueFromOptions();
      await this.updateFlag();
    }
    initDOM() {
      if (this.options.label) {
        const label = document.createElement("label");
        label.className = `${PREFIX}-phone-input__label`;
        label.setAttribute("for", this.inputId);
        label.textContent = this.options.label;
        if (this.options.required) {
          const asterisk = document.createElement("span");
          asterisk.className = `${PREFIX}-phone-input__required`;
          asterisk.textContent = "*";
          label.appendChild(asterisk);
        }
        this.container.appendChild(label);
      }
      const wrapper = document.createElement("div");
      wrapper.className = `${PREFIX}-phone-input__wrapper ${PREFIX}-phone-input__wrapper--size-${this.options.size}`;
      if (this.options.status !== "neutral") {
        wrapper.classList.add(`${PREFIX}-phone-input__wrapper--status-${this.options.status}`);
      }
      if (this.options.disabled) {
        wrapper.classList.add(`${PREFIX}-phone-input__wrapper--disabled`);
      }
      const selector = document.createElement("div");
      selector.className = `${PREFIX}-phone-input__country-selector`;
      const countryBtn = document.createElement("button");
      countryBtn.type = "button";
      countryBtn.className = `${PREFIX}-phone-input__country-button`;
      countryBtn.setAttribute("aria-label", "Pilih negara");
      countryBtn.setAttribute("aria-haspopup", "listbox");
      countryBtn.setAttribute("aria-expanded", "false");
      if (this.options.disabled || this.options.readonly) countryBtn.disabled = true;
      const flagImg = document.createElement("img");
      flagImg.className = `${PREFIX}-phone-input__country-flag-img`;
      flagImg.width = 24;
      flagImg.height = 18;
      flagImg.alt = "";
      const dialCode = document.createElement("span");
      dialCode.className = `${PREFIX}-phone-input__country-code`;
      dialCode.textContent = this.state.selectedCountry.dialCode;
      const chevron = document.createElement("div");
      chevron.innerHTML = `<svg class="${PREFIX}-phone-input__country-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
      countryBtn.appendChild(flagImg);
      countryBtn.appendChild(dialCode);
      countryBtn.appendChild(chevron.firstChild);
      selector.appendChild(countryBtn);
      wrapper.appendChild(selector);
      const divider = document.createElement("div");
      divider.className = `${PREFIX}-phone-input__divider`;
      wrapper.appendChild(divider);
      const input = document.createElement("input");
      input.type = "tel";
      input.id = this.inputId;
      input.placeholder = this.options.placeholder;
      input.className = `${PREFIX}-phone-input__input`;
      if (this.options.disabled) input.disabled = true;
      if (this.options.readonly) input.readOnly = true;
      wrapper.appendChild(input);
      if (this.options.allowClear) {
        const clearBtn = document.createElement("button");
        clearBtn.type = "button";
        clearBtn.className = `${PREFIX}-phone-input__clear-button`;
        clearBtn.setAttribute("aria-label", "Hapus nomor telepon");
        clearBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>`;
        clearBtn.style.display = "none";
        wrapper.appendChild(clearBtn);
        this.elements.clearBtn = clearBtn;
      }
      this.container.appendChild(wrapper);
      const panel = document.createElement("div");
      panel.className = `${PREFIX}-phone-input__country-dropdown`;
      panel.style.display = "none";
      const searchDiv = document.createElement("div");
      searchDiv.className = `${PREFIX}-phone-input__country-search`;
      const searchInput = document.createElement("input");
      searchInput.type = "text";
      searchInput.placeholder = "Cari";
      searchInput.className = `${PREFIX}-phone-input__country-search-input`;
      searchDiv.appendChild(searchInput);
      panel.appendChild(searchDiv);
      const list = document.createElement("div");
      list.className = `${PREFIX}-phone-input__country-list`;
      list.setAttribute("role", "listbox");
      panel.appendChild(list);
      selector.appendChild(panel);
      this.elements.wrapper = wrapper;
      this.elements.countryBtn = countryBtn;
      this.elements.flagImg = flagImg;
      this.elements.dialCode = dialCode;
      this.elements.input = input;
      this.elements.panel = panel;
      this.elements.searchInput = searchInput;
      this.elements.list = list;
      this.elements.chevron = selector.querySelector(`.${PREFIX}-phone-input__country-chevron`);
    }
    initEvents() {
      this.elements.countryBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.toggleDropdown();
      });
      this.elements.searchInput.addEventListener("input", (e) => {
        this.state.countrySearch = e.target.value;
        this.renderCountryList();
      });
      this.elements.input.addEventListener("input", (e) => {
        this.handleInput(e);
      });
      if (this.elements.clearBtn) {
        this.elements.clearBtn.addEventListener("click", () => {
          this.clear();
        });
        this.elements.clearBtn.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            this.clear();
          }
        });
      }
      document.addEventListener("click", (e) => {
        if (!this.elements.wrapper.contains(e.target)) {
          this.closeDropdown();
        }
      });
    }
    async updateFlag() {
      const url = await getFlag(this.state.selectedCountry.code);
      this.elements.flagImg.src = url;
      this.elements.flagImg.alt = this.state.selectedCountry.name;
      this.elements.dialCode.textContent = this.state.selectedCountry.dialCode;
    }
    toggleDropdown() {
      if (this.state.isOpen) {
        this.closeDropdown();
      } else {
        this.openDropdown();
      }
    }
    openDropdown() {
      this.state.isOpen = true;
      this.elements.panel.style.display = "flex";
      this.elements.countryBtn.setAttribute("aria-expanded", "true");
      this.elements.chevron.classList.add(`${PREFIX}-phone-input__country-chevron--open`);
      this.state.countrySearch = "";
      this.elements.searchInput.value = "";
      this.renderCountryList();
      setTimeout(() => this.elements.searchInput.focus(), 0);
    }
    closeDropdown() {
      this.state.isOpen = false;
      this.elements.panel.style.display = "none";
      this.elements.countryBtn.setAttribute("aria-expanded", "false");
      this.elements.chevron.classList.remove(`${PREFIX}-phone-input__country-chevron--open`);
    }
    renderCountryList() {
      const list = this.elements.list;
      list.innerHTML = "";
      const filtered = this.options.countries.filter(
        (c) => c.name.toLowerCase().includes(this.state.countrySearch.toLowerCase()) || c.dialCode.includes(this.state.countrySearch) || c.code.toLowerCase().includes(this.state.countrySearch.toLowerCase())
      );
      filtered.forEach(async (country) => {
        const option = document.createElement("button");
        option.type = "button";
        option.className = `${PREFIX}-phone-input__country-option`;
        if (country.code === this.state.selectedCountry.code) {
          option.classList.add(`${PREFIX}-phone-input__country-option--selected`);
        }
        option.setAttribute("role", "option");
        option.setAttribute("aria-selected", country.code === this.state.selectedCountry.code ? "true" : "false");
        const flag = document.createElement("img");
        flag.className = `${PREFIX}-phone-input__country-flag-img`;
        flag.width = 20;
        flag.height = 15;
        getFlag(country.code).then((url) => flag.src = url);
        const name = document.createElement("span");
        name.className = `${PREFIX}-phone-input__country-name`;
        name.textContent = `${country.name} (${country.code})`;
        const code = document.createElement("span");
        code.className = `${PREFIX}-phone-input__country-dial-code`;
        code.textContent = country.dialCode;
        option.appendChild(flag);
        option.appendChild(name);
        option.appendChild(code);
        option.addEventListener("click", () => {
          this.selectCountry(country);
        });
        list.appendChild(option);
      });
    }
    selectCountry(country) {
      this.state.selectedCountry = country;
      this.updateFlag();
      this.closeDropdown();
      this.elements.input.focus();
      this.triggerChange();
    }
    formatPhoneNumber(value) {
      const clean = value.replace(/\D/g, "");
      if (clean.length > 7) {
        return clean.replace(/^(\d{3})(\d{4})(.*)/, "$1-$2-$3");
      } else if (clean.length > 3) {
        return clean.replace(/^(\d{3})(.*)/, "$1-$2");
      }
      return clean;
    }
    handleInput(e) {
      const value = e.target.value;
      const formatted = this.formatPhoneNumber(value);
      e.target.value = formatted;
      this.state.phoneNumber = formatted;
      if (this.elements.clearBtn) {
        this.elements.clearBtn.style.display = formatted ? "flex" : "none";
      }
      this.triggerChange();
    }
    clear() {
      this.state.phoneNumber = "";
      this.elements.input.value = "";
      if (this.elements.clearBtn) {
        this.elements.clearBtn.style.display = "none";
      }
      this.elements.input.focus();
      this.triggerChange();
    }
    syncValueFromOptions() {
      if (this.options.modelValue) {
        let val = this.options.modelValue;
        const dial = this.state.selectedCountry.dialCode;
        if (val.startsWith(dial)) {
          val = val.substring(dial.length);
        }
        this.state.phoneNumber = this.formatPhoneNumber(val);
        this.elements.input.value = this.state.phoneNumber;
        if (this.elements.clearBtn && this.state.phoneNumber) {
          this.elements.clearBtn.style.display = "flex";
        }
      }
    }
    triggerChange() {
      const cleanLocal = this.state.phoneNumber.replace(/\D/g, "");
      const cleanNoZero = cleanLocal.startsWith("0") ? cleanLocal.substring(1) : cleanLocal;
      const fullValue = `${this.state.selectedCountry.dialCode}${cleanNoZero}`;
      if (this.options.onChange) {
        this.options.onChange(fullValue);
      }
      this.container.dispatchEvent(new CustomEvent("change", {
        detail: { value: fullValue, country: this.state.selectedCountry }
      }));
    }
  };
  function initPhoneInput(selectorOrElement, options = {}) {
    const elements = typeof selectorOrElement === "string" ? document.querySelectorAll(selectorOrElement) : selectorOrElement ? typeof selectorOrElement.length !== "undefined" ? selectorOrElement : [selectorOrElement] : document.querySelectorAll(`.${PREFIX}-phone-input`);
    const instances = [];
    elements.forEach((container) => {
      const instance = new PhoneInput(container, options);
      container.__phoneInputAPI = instance;
      instances.push(instance);
    });
    if (instances.length === 0) return null;
    return instances.length === 1 ? instances[0] : instances;
  }

  // src/js/components/stateful/tab-vertical.js
  function initTabVertical() {
    const tabs = document.querySelectorAll(`.${PREFIX}-tab-vertical`);
    tabs.forEach((container) => {
      if (container.dataset.initialized === "true") return;
      container.dataset.initialized = "true";
      const tabContainer = container.querySelector(
        `.${PREFIX}-tab-vertical__container`
      );
      if (!tabContainer) return;
      const tabButtons = tabContainer.querySelectorAll(
        `.${PREFIX}-tab-vertical__tab`
      );
      const containerDisabled = container.classList.contains(
        `${PREFIX}-tab-vertical--disabled`
      );
      const setActiveTab = (selectedTab) => {
        if (containerDisabled || selectedTab.classList.contains(
          `${PREFIX}-tab-vertical__tab--disabled`
        ) || selectedTab.disabled) {
          return;
        }
        tabButtons.forEach((tab) => {
          const isSelected = tab === selectedTab;
          tab.setAttribute("aria-selected", isSelected);
          if (isSelected) {
            tab.classList.add(`${PREFIX}-tab-vertical__tab--selected`);
          } else {
            tab.classList.remove(`${PREFIX}-tab-vertical__tab--selected`);
          }
        });
        container.dispatchEvent(
          new CustomEvent("tab:change", {
            bubbles: true,
            detail: {
              value: selectedTab.dataset.value,
              originalEvent: null
            }
          })
        );
      };
      tabButtons.forEach((tab) => {
        tab.addEventListener("click", () => {
          setActiveTab(tab);
        });
        tab.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setActiveTab(tab);
          }
        });
      });
    });
  }

  // src/js/components/stateful/tab-horizontal.js
  function initTabHorizontal() {
    const tabs = document.querySelectorAll(`.${PREFIX}-tab-horizontal`);
    tabs.forEach((container) => {
      if (container.dataset.initialized === "true") return;
      container.dataset.initialized = "true";
      const tabContainer = container.querySelector(
        `.${PREFIX}-tab-horizontal__container`
      );
      if (!tabContainer) return;
      const tabButtons = tabContainer.querySelectorAll(
        `.${PREFIX}-tab-horizontal__tab`
      );
      const containerDisabled = container.classList.contains(
        `${PREFIX}-tab-horizontal--disabled`
      );
      const setActiveTab = (selectedTab) => {
        if (containerDisabled || selectedTab.classList.contains(
          `${PREFIX}-tab-horizontal__tab--disabled`
        ) || selectedTab.disabled) {
          return;
        }
        tabButtons.forEach((tab) => {
          const isSelected = tab === selectedTab;
          tab.setAttribute("aria-selected", isSelected);
          if (isSelected) {
            tab.classList.add(`${PREFIX}-tab-horizontal__tab--selected`);
          } else {
            tab.classList.remove(`${PREFIX}-tab-horizontal__tab--selected`);
          }
        });
        container.dispatchEvent(
          new CustomEvent("tab:change", {
            bubbles: true,
            detail: {
              value: selectedTab.dataset.value,
              originalEvent: null
            }
          })
        );
      };
      tabButtons.forEach((tab) => {
        tab.addEventListener("click", () => {
          setActiveTab(tab);
        });
        tab.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setActiveTab(tab);
          }
        });
      });
    });
  }

  // src/js/components/stateful/table.js
  var Table = class {
    constructor(selectorOrElement, options = {}) {
      this.container = typeof selectorOrElement === "string" ? document.querySelector(selectorOrElement) : selectorOrElement;
      if (!this.container) {
        console.warn("[IDDS Table] Container not found:", selectorOrElement);
        return;
      }
      if (this.container.dataset.initialized === "true") {
        return;
      }
      this.container.dataset.initialized = "true";
      this.options = {
        columns: [],
        fetchData: null,
        data: [],
        initialPage: 1,
        initialPageSize: 10,
        pageSizeOptions: [10, 20, 50],
        initialSortField: null,
        initialSortOrder: null,
        searchPlaceholder: "Input pencarian",
        buttonSearchLabel: "Cari",
        selectable: false,
        onSelectionChange: null,
        rowKey: "id",
        showSearch: false,
        rowClickable: false,
        onRowClick: null,
        emptyState: "No data found",
        showPagination: true,
        searchContainer: null,
        searchButton: null,
        onSearch: null,
        ...options
      };
      this.state = {
        currentPage: this.options.initialPage,
        pageSize: this.options.initialPageSize,
        totalPages: 1,
        total: this.options.data.length,
        sortField: this.options.initialSortField,
        sortOrder: this.options.initialSortOrder,
        searchTerm: "",
        loading: false,
        currentData: [...this.options.data],
        selectedKeys: /* @__PURE__ */ new Set(),
        selectedRows: /* @__PURE__ */ new Map()
      };
      this.elements = {};
      this.initDOM();
      this.bindEvents();
      this.loadData();
    }
    initDOM() {
      this.container.innerHTML = "";
      this.container.classList.add(`${PREFIX}-table-wrapper`);
      if (this.options.showSearch && !this.options.searchContainer) {
        const searchWrap = document.createElement("div");
        searchWrap.className = "flex items-center gap-2 mb-4";
        searchWrap.style.display = "flex";
        searchWrap.style.alignItems = "center";
        searchWrap.style.gap = "8px";
        searchWrap.style.marginBottom = "16px";
        searchWrap.innerHTML = `
        <div style="flex: 1;">
          <div class="${PREFIX}-text-field">
            <div class="${PREFIX}-text-field__wrapper ${PREFIX}-text-field__wrapper--size-md">
              <input type="text" class="${PREFIX}-text-field__input" placeholder="${this.options.searchPlaceholder}">
            </div>
          </div>
        </div>
        <button type="button" class="${PREFIX}-button ${PREFIX}-button--primary ${PREFIX}-button--md">
          ${this.options.buttonSearchLabel}
        </button>
      `;
        this.container.appendChild(searchWrap);
        this.elements.searchInput = searchWrap.querySelector("input");
        this.elements.searchButton = searchWrap.querySelector("button");
      } else {
        this.elements.searchInput = typeof this.options.searchContainer === "string" ? document.querySelector(this.options.searchContainer) : this.options.searchContainer;
        this.elements.searchButton = typeof this.options.searchButton === "string" ? document.querySelector(this.options.searchButton) : this.options.searchButton;
      }
      const tableDiv = document.createElement("div");
      tableDiv.className = `${PREFIX}-table`;
      const progressDiv = document.createElement("div");
      progressDiv.className = `${PREFIX}-table__progress-bar`;
      progressDiv.style.display = "none";
      progressDiv.innerHTML = `
      <div class="${PREFIX}-progress-bar ${PREFIX}-progress-bar--variant-primary ${PREFIX}-progress-bar--height-sm">
        <div class="${PREFIX}-progress-bar__track">
          <div class="${PREFIX}-progress-bar__fill" style="width: 0%;"></div>
        </div>
      </div>
    `;
      tableDiv.appendChild(progressDiv);
      const tableEl = document.createElement("table");
      tableEl.className = `${PREFIX}-table__container`;
      const theadEl = document.createElement("thead");
      theadEl.className = `${PREFIX}-table__header`;
      const trHeader = document.createElement("tr");
      theadEl.appendChild(trHeader);
      tableEl.appendChild(theadEl);
      const tbodyEl = document.createElement("tbody");
      tbodyEl.className = `${PREFIX}-table__body`;
      tableEl.appendChild(tbodyEl);
      tableDiv.appendChild(tableEl);
      const paginationEl = document.createElement("div");
      paginationEl.className = `${PREFIX}-table__pagination`;
      if (!this.options.showPagination) {
        paginationEl.style.display = "none";
      }
      tableDiv.appendChild(paginationEl);
      this.container.appendChild(tableDiv);
      this.elements.progressEl = progressDiv;
      this.elements.progressFillEl = progressDiv.querySelector(
        `.${PREFIX}-progress-bar__fill`
      );
      this.elements.theadTr = trHeader;
      this.elements.tbody = tbodyEl;
      this.elements.pagination = paginationEl;
      this.buildHeader();
    }
    buildHeader() {
      this.elements.theadTr.innerHTML = "";
      if (this.options.selectable) {
        const th = document.createElement("th");
        th.className = `${PREFIX}-table__header-cell`;
        th.style.width = "48px";
        const checkboxWrap = document.createElement("div");
        checkboxWrap.className = `${PREFIX}-checkbox`;
        checkboxWrap.innerHTML = `
        <label class="${PREFIX}-checkbox__label-wrapper">
          <input type="checkbox" class="${PREFIX}-checkbox__input" id="selectAll">
          <div class="${PREFIX}-checkbox__box ${PREFIX}-checkbox__box--unchecked"></div>
        </label>
      `;
        th.appendChild(checkboxWrap);
        this.elements.theadTr.appendChild(th);
        this.elements.selectAllInput = checkboxWrap.querySelector("input");
        this.elements.selectAllBox = checkboxWrap.querySelector(
          `.${PREFIX}-checkbox__box`
        );
        this.elements.selectAllInput.addEventListener("change", (e) => {
          this.toggleAllSelection(e.target.checked);
        });
      }
      this.options.columns.forEach((col) => {
        const th = document.createElement("th");
        th.className = `${PREFIX}-table__header-cell`;
        if (col.sortable && col.accessor) {
          th.classList.add(`${PREFIX}-table__header-cell--sortable`);
          th.setAttribute("data-sort", col.accessor);
          let sortLabel = `Urutkan ${col.header}`;
          let currentSort = "none";
          if (this.state.sortField === field) {
            currentSort = this.state.sortOrder === "asc" ? "ascending" : "descending";
          }
          th.setAttribute("aria-sort", currentSort);
          let sortControlsHtml = `
          <div class="${PREFIX}-table__sort-controls">
            ${col.header}
            <div class="${PREFIX}-table__sort-icon">
              <div class="${PREFIX}-table__sort-button" data-order="asc" role="button" aria-label="Urutkan ${col.header} menaik">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M16 9l-4 -4" /><path d="M8 9l4 -4" /></svg>
              </div>
              <div class="${PREFIX}-table__sort-button ${PREFIX}-table__sort-button-right" data-order="desc" role="button" aria-label="Urutkan ${col.header} menurun">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M16 15l-4 4" /><path d="M8 15l4 4" /></svg>
              </div>
            </div>
          </div>
        `;
          th.innerHTML = sortControlsHtml;
          const ascBtn = th.querySelector('[data-order="asc"]');
          const descBtn = th.querySelector('[data-order="desc"]');
          ascBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            this.handleHeaderSort(col, "asc");
          });
          descBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            this.handleHeaderSort(col, "desc");
          });
          th.addEventListener("click", () => {
            let nextOrder = "asc";
            if (this.state.sortField === field) {
              if (this.state.sortOrder === "asc") nextOrder = "desc";
              else nextOrder = null;
            }
            this.handleHeaderSort(col, nextOrder);
          });
        } else {
          th.textContent = col.header;
        }
        if (col.className) {
          th.classList.add(col.className);
        }
        if (col.width) {
          th.style.width = typeof col.width === "number" ? `${col.width}px` : col.width;
        }
        this.elements.theadTr.appendChild(th);
      });
    }
    bindEvents() {
      if (this.elements.searchInput && this.elements.searchButton) {
        const handleSearch = () => {
          this.state.searchTerm = this.elements.searchInput.value.trim();
          this.state.currentPage = 1;
          this.loadData();
          if (typeof this.options.onSearch === "function") {
            this.options.onSearch(this.state.searchTerm);
          }
        };
        this.elements.searchButton.addEventListener("click", handleSearch);
        this.elements.searchInput.addEventListener("keydown", (e) => {
          if (e.key === "Enter") handleSearch();
        });
      }
    }
    setLoading(isLoading) {
      this.state.loading = isLoading;
      if (!this.elements.progressEl || !this.elements.progressFillEl) return;
      if (isLoading) {
        this.elements.progressEl.style.display = "block";
        let progress = 0;
        clearInterval(this.loadingInterval);
        this.loadingInterval = setInterval(() => {
          if (progress >= 90 || !this.state.loading) {
            clearInterval(this.loadingInterval);
            if (!this.state.loading) {
              progress = 100;
              this.elements.progressFillEl.style.width = "100%";
              setTimeout(() => {
                this.elements.progressEl.style.display = "none";
                this.elements.progressFillEl.style.width = "0%";
              }, 300);
            }
            return;
          }
          progress += Math.random() * 15;
          this.elements.progressFillEl.style.width = progress + "%";
        }, 200);
      }
    }
    renderRows(rowData) {
      this.elements.tbody.innerHTML = "";
      if (rowData.length === 0) {
        const tr = document.createElement("tr");
        const colspan = this.options.columns.length + (this.options.selectable ? 1 : 0);
        tr.innerHTML = `<td colspan="${colspan}" class="${PREFIX}-table__empty-cell">${this.options.emptyState}</td>`;
        this.elements.tbody.appendChild(tr);
        this.updateSelectAllState();
        return;
      }
      rowData.forEach((row, index) => {
        const tr = document.createElement("tr");
        tr.className = `${PREFIX}-table__row`;
        if (this.options.rowClickable) {
          tr.style.cursor = "pointer";
          tr.classList.add(`${PREFIX}-table__row--clickable`);
          tr.addEventListener("click", (e) => {
            if (e.target.closest(`.${PREFIX}-checkbox`) && this.options.selectable) {
              return;
            }
            if (typeof this.options.onRowClick === "function") {
              this.options.onRowClick(row, index);
            }
          });
        }
        const rowKeyStr = String(row[this.options.rowKey] || index);
        if (this.options.selectable) {
          const td = document.createElement("td");
          td.className = `${PREFIX}-table__cell`;
          const isChecked = this.state.selectedKeys.has(rowKeyStr);
          const checkboxWrap = document.createElement("div");
          checkboxWrap.className = `${PREFIX}-checkbox`;
          checkboxWrap.innerHTML = `
          <label class="${PREFIX}-checkbox__label-wrapper">
            <input type="checkbox" class="${PREFIX}-checkbox__input" ${isChecked ? "checked" : ""}>
            <div class="${PREFIX}-checkbox__box ${isChecked ? `${PREFIX}-checkbox__box--checked` : `${PREFIX}-checkbox__box--unchecked`}">
              ${isChecked ? '<svg class="ina-checkbox__icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5l10 -10"></path></svg>' : ""}
            </div>
          </label>
        `;
          td.appendChild(checkboxWrap);
          tr.appendChild(td);
          const rowInput = checkboxWrap.querySelector("input");
          rowInput.addEventListener("change", (e) => {
            this.toggleRowSelection(rowKeyStr, row, e.target.checked);
          });
        }
        this.options.columns.forEach((col) => {
          const td = document.createElement("td");
          td.className = `${PREFIX}-table__cell`;
          if (typeof col.render === "function") {
            const content = col.render(row, index);
            if (typeof content === "string") {
              td.innerHTML = content;
            } else if (content instanceof HTMLElement) {
              td.appendChild(content);
            } else {
              td.textContent = content;
            }
          } else {
            td.textContent = row[col.accessor] !== void 0 && row[col.accessor] !== null ? row[col.accessor] : "";
          }
          if (col.className) {
            td.classList.add(col.className);
          }
          if (col.width) {
            td.style.width = typeof col.width === "number" ? `${col.width}px` : col.width;
          }
          tr.appendChild(td);
        });
        this.elements.tbody.appendChild(tr);
      });
      this.updateSelectAllState();
    }
    renderPagination() {
      if (!this.elements.pagination || !this.options.showPagination) return;
      this.state.totalPages = Math.ceil(this.state.total / this.state.pageSize);
      if (this.state.totalPages < 1) this.state.totalPages = 1;
      this.elements.pagination.innerHTML = `
      <nav class="${PREFIX}-pagination ${PREFIX}-pagination ${PREFIX}-pagination  ${PREFIX}-pagination--full-width ${PREFIX}-pagination--size-md ${PREFIX}-pagination--variant-default" aria-label="Pagination navigation">
        <div class="${PREFIX}-pagination__nav-container">
          <div class="${PREFIX}-pagination__page-info">
            Halaman
            <input
              type="number"
              min="1"
              max="${this.state.totalPages}"
              value="${this.state.currentPage}"
              class="${PREFIX}-pagination__page-input"
              style="width: calc(${Math.max(1, String(this.state.currentPage).length)}ch + 12px)"
              aria-label="Current page"
            />
            dari ${this.state.totalPages}
          </div>
          <div class="${PREFIX}-pagination__nav-buttons"></div>
        </div>
        <div class="${PREFIX}-pagination__page-size-container">
          <span class="${PREFIX}-pagination__page-size-label">Baris per halaman</span>
          <select class="${PREFIX}-pagination__page-size-select">
            ${this.options.pageSizeOptions.map(
        (opt) => `<option value="${opt}" ${this.state.pageSize === opt ? "selected" : ""}>${opt}</option>`
      ).join("")}
          </select>
        </div>
      </nav>
    `;
      const navButtons = this.elements.pagination.querySelector(
        `.${PREFIX}-pagination__nav-buttons`
      );
      const pageSizeSelect = this.elements.pagination.querySelector(
        `.${PREFIX}-pagination__page-size-select`
      );
      const pageInput = this.elements.pagination.querySelector(
        `.${PREFIX}-pagination__page-input`
      );
      if (pageInput) {
        const handlePageInputCommit = () => {
          let val = parseInt(pageInput.value, 10);
          if (isNaN(val) || val < 1) val = 1;
          if (val > this.state.totalPages) val = this.state.totalPages;
          if (val !== this.state.currentPage) {
            this.state.currentPage = val;
            this.loadData();
          } else {
            pageInput.value = this.state.currentPage;
            pageInput.style.width = `calc(${Math.max(1, String(this.state.currentPage).length)}ch + 12px)`;
          }
        };
        pageInput.addEventListener("input", (e) => {
          const val = e.target.value;
          e.target.style.width = `calc(${Math.max(1, val.length)}ch + 12px)`;
        });
        pageInput.addEventListener("blur", handlePageInputCommit);
        pageInput.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
            handlePageInputCommit();
          }
        });
      }
      pageSizeSelect.addEventListener("change", (e) => {
        this.state.pageSize = parseInt(e.target.value, 10);
        this.state.currentPage = 1;
        this.loadData();
      });
      const createBtn = (isNav, enabled, content, onClick) => {
        const btn = document.createElement("button");
        btn.type = "button";
        const baseCls = isNav ? `${PREFIX}-pagination__nav-button` : `${PREFIX}-pagination__page-button`;
        const stCls = isNav ? enabled ? `${baseCls}--enabled` : `${baseCls}--disabled` : enabled ? `${baseCls}--enabled` : `${baseCls}--active`;
        btn.className = `${baseCls} ${stCls}`;
        btn.disabled = !enabled;
        btn.innerHTML = content;
        btn.onclick = onClick;
        navButtons.appendChild(btn);
      };
      const SVG = {
        first: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ina-pagination__nav-icon"><path d="M11 18L5 12L11 6M19 18L13 12L19 6"></path></svg>',
        prev: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ina-pagination__nav-icon"><path d="M15 18L9 12L15 6"></path></svg>',
        next: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ina-pagination__nav-icon"><path d="M9 18L15 12L9 6"></path></svg>',
        last: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ina-pagination__nav-icon"><path d="M13 18L19 12L13 6M5 18L11 12L5 6"></path></svg>'
      };
      createBtn(true, this.state.currentPage > 1, SVG.first, () => {
        this.state.currentPage = 1;
        this.loadData();
      });
      createBtn(true, this.state.currentPage > 1, SVG.prev, () => {
        this.state.currentPage--;
        this.loadData();
      });
      const maxVisible = 5;
      let startPage = Math.max(
        1,
        this.state.currentPage - Math.floor(maxVisible / 2)
      );
      let endPage = Math.min(this.state.totalPages, startPage + maxVisible - 1);
      if (endPage - startPage < maxVisible - 1) {
        startPage = Math.max(1, endPage - maxVisible + 1);
      }
      for (let i = startPage; i <= endPage; i++) {
        createBtn(false, i !== this.state.currentPage, String(i), () => {
          this.state.currentPage = i;
          this.loadData();
        });
      }
      createBtn(
        true,
        this.state.currentPage < this.state.totalPages,
        SVG.next,
        () => {
          this.state.currentPage++;
          this.loadData();
        }
      );
      createBtn(
        true,
        this.state.currentPage < this.state.totalPages,
        SVG.last,
        () => {
          this.state.currentPage = this.state.totalPages;
          this.loadData();
        }
      );
    }
    handleHeaderSort(col, order) {
      const field2 = col.accessor;
      this.state.sortField = field2 ? order === null ? null : field2 : null;
      this.state.sortOrder = order;
      this.state.currentPage = 1;
      this.loadData();
    }
    updateSortIndicators() {
      const btns = this.elements.theadTr.querySelectorAll(
        `.${PREFIX}-table__sort-button`
      );
      btns.forEach((btn) => {
        const th = btn.closest("th");
        if (!th) return;
        const field2 = th.getAttribute("data-sort");
        const order = btn.getAttribute("data-order");
        const active = this.state.sortField === field2 && this.state.sortOrder === order;
        btn.classList.toggle(`${PREFIX}-table__sort-button--active`, active);
        let currentSort = "none";
        if (this.state.sortField === field2) {
          currentSort = this.state.sortOrder === "asc" ? "ascending" : "descending";
        }
        th.setAttribute("aria-sort", currentSort);
      });
    }
    async loadData() {
      this.setLoading(true);
      try {
        if (typeof this.options.fetchData === "function") {
          const res = await this.options.fetchData({
            page: this.state.currentPage,
            pageSize: this.state.pageSize,
            sortField: this.state.sortField,
            sortOrder: this.state.sortOrder,
            searchTerm: this.state.searchTerm
          });
          this.state.total = res.total;
          this.state.currentData = res.data || [];
        } else {
          let filtered = [...this.options.data];
          if (this.state.searchTerm) {
            const lower = this.state.searchTerm.toLowerCase();
            filtered = filtered.filter(
              (row) => this.options.columns.some(
                (c) => String(row[c.accessor] || "").toLowerCase().includes(lower)
              )
            );
          }
          if (this.state.sortField && this.state.sortOrder) {
            filtered.sort((a, b) => {
              const aVal = a[this.state.sortField];
              const bVal = b[this.state.sortField];
              if (aVal < bVal) return this.state.sortOrder === "asc" ? -1 : 1;
              if (aVal > bVal) return this.state.sortOrder === "asc" ? 1 : -1;
              return 0;
            });
          }
          this.state.total = filtered.length;
          const skip = (this.state.currentPage - 1) * this.state.pageSize;
          this.state.currentData = filtered.slice(
            skip,
            skip + this.state.pageSize
          );
        }
        this.renderRows(this.state.currentData);
        this.renderPagination();
        this.updateSortIndicators();
      } catch (e) {
        console.error("Table API Error:", e);
      } finally {
        this.setLoading(false);
      }
    }
    toggleRowSelection(keyStr, row, checked) {
      if (checked) {
        this.state.selectedKeys.add(keyStr);
        this.state.selectedRows.set(keyStr, row);
      } else {
        this.state.selectedKeys.delete(keyStr);
        this.state.selectedRows.delete(keyStr);
      }
      const inputs = this.elements.tbody.querySelectorAll(
        `.${PREFIX}-checkbox__input`
      );
      inputs.forEach((input) => {
        const box = input.nextElementSibling;
        if (input.checked) {
          box.classList.remove(`${PREFIX}-checkbox__box--unchecked`);
          box.classList.add(`${PREFIX}-checkbox__box--checked`);
          box.innerHTML = '<svg class="ina-checkbox__icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5l10 -10"></path></svg>';
        } else {
          box.classList.remove(`${PREFIX}-checkbox__box--checked`);
          box.classList.add(`${PREFIX}-checkbox__box--unchecked`);
          box.innerHTML = "";
        }
      });
      this.updateSelectAllState();
      this.triggerSelectionChange();
    }
    toggleAllSelection(checked) {
      this.state.currentData.forEach((row, index) => {
        const keyStr = String(row[this.options.rowKey] || index);
        if (checked) {
          this.state.selectedKeys.add(keyStr);
          this.state.selectedRows.set(keyStr, row);
        } else {
          this.state.selectedKeys.delete(keyStr);
          this.state.selectedRows.delete(keyStr);
        }
      });
      this.renderRows(this.state.currentData);
      this.triggerSelectionChange();
    }
    updateSelectAllState() {
      if (!this.options.selectable || !this.elements.selectAllInput) return;
      const checkboxes = this.elements.tbody.querySelectorAll(
        'input[type="checkbox"]'
      );
      const checkedCount = Array.from(checkboxes).filter(
        (cb) => cb.checked
      ).length;
      const totalCount = this.state.currentData.length;
      const box = this.elements.selectAllBox;
      box.innerHTML = "";
      if (totalCount === 0 || checkedCount === 0) {
        this.elements.selectAllInput.checked = false;
        this.elements.selectAllInput.indeterminate = false;
        box.classList.remove(
          `${PREFIX}-checkbox__box--checked`,
          `${PREFIX}-checkbox__box--indeterminate`
        );
        box.classList.add(`${PREFIX}-checkbox__box--unchecked`);
      } else if (checkedCount === totalCount) {
        this.elements.selectAllInput.checked = true;
        this.elements.selectAllInput.indeterminate = false;
        box.classList.remove(
          `${PREFIX}-checkbox__box--unchecked`,
          `${PREFIX}-checkbox__box--indeterminate`
        );
        box.classList.add(`${PREFIX}-checkbox__box--checked`);
        box.innerHTML = '<svg class="ina-checkbox__icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5l10 -10"></path></svg>';
      } else {
        this.elements.selectAllInput.checked = false;
        this.elements.selectAllInput.indeterminate = true;
        box.classList.remove(
          `${PREFIX}-checkbox__box--unchecked`,
          `${PREFIX}-checkbox__box--checked`
        );
        box.classList.add(`${PREFIX}-checkbox__box--indeterminate`);
        box.innerHTML = '<svg class="ina-checkbox__icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path></svg>';
      }
    }
    triggerSelectionChange() {
      if (typeof this.options.onSelectionChange === "function") {
        const keys = Array.from(this.state.selectedKeys);
        const rows = Array.from(this.state.selectedRows.values());
        this.options.onSelectionChange(keys, rows);
      }
    }
    // API Methods
    reload() {
      this.loadData();
    }
    setSearchTerm(term) {
      this.state.searchTerm = term;
      this.state.currentPage = 1;
      if (this.elements.searchInput) {
        this.elements.searchInput.value = term;
      }
      this.loadData();
    }
    setPage(page) {
      this.state.currentPage = page;
      this.loadData();
    }
    getSelectedRows() {
      return {
        keys: Array.from(this.state.selectedKeys),
        rows: Array.from(this.state.selectedRows.values())
      };
    }
  };
  function initTable(selectorOrElement, options = {}) {
    const elements = typeof selectorOrElement === "string" ? document.querySelectorAll(selectorOrElement) : selectorOrElement ? typeof selectorOrElement.length !== "undefined" ? selectorOrElement : [selectorOrElement] : document.querySelectorAll(`.${PREFIX}-table`);
    const instances = [];
    elements.forEach((container) => {
      const instance = new Table(container, options);
      container.__tableAPI = instance;
      instances.push(instance);
    });
    if (instances.length === 0) return null;
    return instances.length === 1 ? instances[0] : instances;
  }

  // src/js/components/stateful/month-picker.js
  var MONTHS_SHORT_ID = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des"
  ];
  function initMonthPicker(rootSelector = `.${PREFIX}-month-picker`) {
    const pickers = document.querySelectorAll(rootSelector);
    pickers.forEach((container) => {
      if (container.dataset.initialized === "true") return;
      container.dataset.initialized = "true";
      let currentMonthIdx = parseInt(container.dataset.value || "0", 10);
      const disabled = container.hasAttribute("disabled");
      const readonly = container.hasAttribute("readonly");
      const trigger = container.querySelector(`.${PREFIX}-month-picker__trigger`);
      const panel = container.querySelector(`.${PREFIX}-month-picker__panel`);
      const grid = container.querySelector(`.${PREFIX}-month-picker__grid`);
      const options = grid ? Array.from(
        grid.querySelectorAll(`.${PREFIX}-month-picker__month-option`)
      ) : [];
      if (!trigger || !panel || !grid || options.length === 0) return;
      let isPickerOpen = false;
      const updateText = () => {
        const textEl = trigger.querySelector(
          `.${PREFIX}-month-picker__trigger-text`
        );
        if (textEl) textEl.textContent = MONTHS_SHORT_ID[currentMonthIdx];
        options.forEach((opt, idx) => {
          if (idx === currentMonthIdx) {
            opt.classList.add(`${PREFIX}-month-picker__month-option--selected`);
            opt.setAttribute("aria-selected", "true");
            opt.tabIndex = 0;
          } else {
            opt.classList.remove(
              `${PREFIX}-month-picker__month-option--selected`
            );
            opt.setAttribute("aria-selected", "false");
            opt.tabIndex = -1;
          }
        });
      };
      const togglePicker = (show) => {
        if (disabled || readonly) return;
        isPickerOpen = show;
        if (show) {
          panel.classList.add(`${PREFIX}-month-picker__panel--open`);
          trigger.setAttribute("aria-expanded", "true");
          setTimeout(() => {
            const selectedOpt = options.find((o) => o.tabIndex === 0);
            if (selectedOpt) selectedOpt.focus();
          }, 0);
        } else {
          panel.classList.remove(`${PREFIX}-month-picker__panel--open`);
          trigger.setAttribute("aria-expanded", "false");
        }
      };
      updateText();
      trigger.addEventListener("click", (e) => {
        e.stopPropagation();
        e.preventDefault();
        togglePicker(!isPickerOpen);
      });
      trigger.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          e.stopPropagation();
          togglePicker(!isPickerOpen);
        }
      });
      document.addEventListener("click", (e) => {
        if (!container.contains(e.target)) togglePicker(false);
      });
      options.forEach((btn, idx) => {
        btn.setAttribute("role", "option");
        btn.addEventListener("click", (e) => {
          if (disabled || readonly) return;
          e.stopPropagation();
          e.preventDefault();
          currentMonthIdx = idx;
          updateText();
          togglePicker(false);
          trigger.focus();
          container.dispatchEvent(
            new CustomEvent("change", {
              detail: { value: currentMonthIdx },
              bubbles: true,
              composed: true
            })
          );
        });
        btn.addEventListener("keydown", (e) => {
          if (disabled || readonly) return;
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            e.stopPropagation();
            currentMonthIdx = idx;
            updateText();
            togglePicker(false);
            trigger.focus();
            container.dispatchEvent(
              new CustomEvent("change", {
                detail: { value: currentMonthIdx },
                bubbles: true,
                composed: true
              })
            );
          } else if (["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp"].includes(e.key)) {
            e.preventDefault();
            e.stopPropagation();
            let nextIndex = idx;
            if (e.key === "ArrowRight") nextIndex += 1;
            else if (e.key === "ArrowLeft") nextIndex -= 1;
            else if (e.key === "ArrowDown")
              nextIndex += 3;
            else if (e.key === "ArrowUp") nextIndex -= 3;
            if (options[nextIndex]) {
              options[nextIndex].focus();
            }
          }
        });
      });
    });
  }

  // src/js/components/stateful/year-picker.js
  function initYearPicker(rootSelector = `.${PREFIX}-year-picker`) {
    const pickers = document.querySelectorAll(rootSelector);
    pickers.forEach((container) => {
      if (container.dataset.initialized === "true") return;
      container.dataset.initialized = "true";
      let currentYearVal = parseInt(
        container.dataset.value || (/* @__PURE__ */ new Date()).getFullYear().toString(),
        10
      );
      const disabled = container.hasAttribute("disabled");
      const readonly = container.hasAttribute("readonly");
      const maxYear = container.dataset.max ? parseInt(container.dataset.max, 10) : 2100;
      const minYear = container.dataset.min ? parseInt(container.dataset.min, 10) : 1900;
      let isPickerOpen = false;
      let decadeSize = 20;
      const trigger = container.querySelector(`.${PREFIX}-year-picker__trigger`);
      const panel = container.querySelector(`.${PREFIX}-year-picker__panel`);
      const grid = container.querySelector(`.${PREFIX}-year-picker__grid`);
      const prevBtn = container.querySelector(
        `.${PREFIX}-year-picker__nav-button[aria-label="Previous decade"]`
      );
      const nextBtn = container.querySelector(
        `.${PREFIX}-year-picker__nav-button[aria-label="Next decade"]`
      );
      const rangeText = container.querySelector(
        `.${PREFIX}-year-picker__decade-range`
      );
      if (!trigger || !panel || !grid) return;
      let decadeStart = Math.floor(currentYearVal / decadeSize) * decadeSize;
      const renderGrid = () => {
        grid.innerHTML = "";
        if (rangeText) {
          rangeText.textContent = `${decadeStart} - ${decadeStart + decadeSize - 1}`;
        }
        if (prevBtn) {
          prevBtn.disabled = disabled || readonly || decadeStart <= minYear;
        }
        if (nextBtn) {
          nextBtn.disabled = disabled || readonly || decadeStart + decadeSize > maxYear;
        }
        for (let y = decadeStart; y < decadeStart + decadeSize; y++) {
          const btn = document.createElement("button");
          btn.type = "button";
          btn.className = `${PREFIX}-year-picker__year-option`;
          if (y === currentYearVal) {
            btn.classList.add(`${PREFIX}-year-picker__year-option--selected`);
            btn.setAttribute("aria-selected", "true");
            btn.tabIndex = 0;
          } else {
            btn.setAttribute("aria-selected", "false");
            btn.tabIndex = -1;
          }
          if (y < minYear || y > maxYear) {
            btn.disabled = true;
            btn.classList.add(`${PREFIX}-year-picker__year-option--disabled`);
          }
          btn.textContent = y.toString();
          btn.setAttribute("role", "option");
          btn.addEventListener("click", (e) => {
            if (disabled || readonly || btn.disabled) return;
            e.stopPropagation();
            currentYearVal = y;
            updateText();
            togglePicker(false);
            trigger.focus();
            container.dispatchEvent(
              new CustomEvent("change", {
                detail: { value: currentYearVal },
                bubbles: true,
                composed: true
              })
            );
          });
          btn.addEventListener("keydown", (e) => {
            if (disabled || readonly || btn.disabled) return;
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              e.stopPropagation();
              currentYearVal = y;
              updateText();
              togglePicker(false);
              trigger.focus();
              container.dispatchEvent(
                new CustomEvent("change", {
                  detail: { value: currentYearVal },
                  bubbles: true,
                  composed: true
                })
              );
            } else if (["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp"].includes(e.key)) {
              e.preventDefault();
              e.stopPropagation();
              const options = Array.from(
                grid.querySelectorAll(
                  `.${PREFIX}-year-picker__year-option:not(:disabled)`
                )
              );
              const currentIndex = options.indexOf(btn);
              if (currentIndex === -1) return;
              let nextIndex = currentIndex;
              if (e.key === "ArrowRight") nextIndex += 1;
              else if (e.key === "ArrowLeft") nextIndex -= 1;
              else if (e.key === "ArrowDown")
                nextIndex += 4;
              else if (e.key === "ArrowUp") nextIndex -= 4;
              if (options[nextIndex]) {
                options[nextIndex].focus();
              } else {
              }
            }
          });
          grid.appendChild(btn);
        }
      };
      const updateText = () => {
        const textEl = trigger.querySelector(
          `.${PREFIX}-year-picker__trigger-text`
        );
        if (textEl) textEl.textContent = currentYearVal.toString();
      };
      const togglePicker = (show) => {
        if (disabled || readonly) return;
        isPickerOpen = show;
        if (show) {
          decadeStart = Math.floor(currentYearVal / decadeSize) * decadeSize;
          renderGrid();
          panel.classList.add(`${PREFIX}-year-picker__panel--open`);
          trigger.setAttribute("aria-expanded", "true");
          setTimeout(() => {
            const selectedOpt = grid.querySelector(
              `.${PREFIX}-year-picker__year-option--selected`
            );
            if (selectedOpt) selectedOpt.focus();
            else if (grid.firstElementChild) grid.firstElementChild.focus();
          }, 0);
        } else {
          panel.classList.remove(`${PREFIX}-year-picker__panel--open`);
          trigger.setAttribute("aria-expanded", "false");
        }
      };
      updateText();
      renderGrid();
      trigger.addEventListener("click", (e) => {
        e.stopPropagation();
        e.preventDefault();
        togglePicker(!isPickerOpen);
      });
      trigger.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          e.stopPropagation();
          togglePicker(!isPickerOpen);
        }
      });
      document.addEventListener("click", (e) => {
        if (!container.contains(e.target)) togglePicker(false);
      });
      if (prevBtn) {
        prevBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          decadeStart -= decadeSize;
          renderGrid();
        });
        prevBtn.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            e.stopPropagation();
            decadeStart -= decadeSize;
            renderGrid();
          }
        });
      }
      if (nextBtn) {
        nextBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          decadeStart += decadeSize;
          renderGrid();
        });
        nextBtn.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            e.stopPropagation();
            decadeStart += decadeSize;
            renderGrid();
          }
        });
      }
    });
  }

  // src/js/components/stateless/toast.js
  var ICONS3 = {
    default: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
    destructive: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
    positive: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`
  };
  function getOrCreateContainer(position) {
    const containerId = `ina-toast-container-${position}`;
    let container = document.getElementById(containerId);
    if (!container) {
      container = document.createElement("div");
      container.id = containerId;
      container.className = `ina-toast-container ina-toast-container--${position}`;
      container.style.maxHeight = "calc(100vh - 32px)";
      container.style.overflow = "auto";
      document.body.appendChild(container);
    }
    return container;
  }
  function createToastElement({ title, message, state, style, actionHtml }) {
    const toastItem = document.createElement("div");
    toastItem.className = "ina-toast-item";
    const toast = document.createElement("div");
    toast.className = `ina-toast ina-toast--state-${state} ina-toast--style-${style} ina-toast--hidden`;
    const iconHtml = ICONS3[state] || ICONS3.default;
    const contentHtml = `
    <div class="ina-toast__icon">${iconHtml}</div>
    <div class="ina-toast__content">
      <div class="ina-toast__text-area">
        <p class="ina-toast__title">${title || message || ""}</p>
        ${title && message ? `<p class="ina-toast__description">${message}</p>` : ""}
      </div>
      ${actionHtml ? `<div class="ina-toast__action-area">${actionHtml}</div>` : ""}
    </div>
    <button class="ina-toast__close-button" aria-label="Tutup notifikasi">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ina-toast__close-icon"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
  `;
    toast.innerHTML = contentHtml;
    toastItem.appendChild(toast);
    return { toastItem, toast };
  }
  function showToast(optionsOrMessage, variant = "default", duration = 5e3) {
    const options = typeof optionsOrMessage === "string" ? {
      message: optionsOrMessage,
      state: variant,
      duration
    } : optionsOrMessage || {};
    const {
      message = "",
      title = "",
      state = "default",
      style = "solid",
      duration: autoCloseDuration = 5e3,
      position = "top-right",
      actionHtml = ""
    } = options;
    const container = getOrCreateContainer(position);
    const { toastItem, toast } = createToastElement({
      title,
      message,
      state,
      style,
      actionHtml
    });
    container.appendChild(toastItem);
    requestAnimationFrame(() => {
      toast.offsetHeight;
      toast.classList.remove("ina-toast--hidden");
      toast.classList.add("ina-toast--visible");
    });
    const close = () => {
      toast.classList.remove("ina-toast--visible");
      toast.classList.add("ina-toast--hidden");
      setTimeout(() => {
        if (toastItem.parentNode === container) {
          container.removeChild(toastItem);
        }
        if (container.children.length === 0 && container.parentNode) {
          container.parentNode.removeChild(container);
        }
      }, 300);
    };
    const closeBtn = toast.querySelector(".ina-toast__close-button");
    if (closeBtn) {
      closeBtn.addEventListener("click", close);
    }
    if (autoCloseDuration > 0) {
      setTimeout(close, autoCloseDuration);
    }
    return {
      close
    };
  }

  // src/js/utils/theme.js
  function setBrandTheme(brandName) {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    const oldBrand = root.getAttribute("data-brand");
    if (oldBrand === brandName) return;
    if (brandName) {
      root.setAttribute("data-brand", brandName);
    } else {
      root.removeAttribute("data-brand");
    }
    window.dispatchEvent(
      new CustomEvent("idds:theme-change", {
        detail: { brand: brandName, previousBrand: oldBrand }
      })
    );
  }

  // src/js/index.js
  var PREFIX = "ina";

  // src/js/components/stateful/button-group.js
  function initButtonGroup(rootSelector = `.${PREFIX}-button-group`) {
    const buttonGroups = document.querySelectorAll(rootSelector);
    buttonGroups.forEach((buttonGroup) => {
      if (buttonGroup.__inaButtonGroupInitialized) return;
      const buttons = buttonGroup.querySelectorAll(
        `.${PREFIX}-button-group__button`
      );
      if (!buttonGroup.hasAttribute("role")) {
        buttonGroup.setAttribute("role", "group");
      }
      if (!buttonGroup.hasAttribute("aria-label")) {
        buttonGroup.setAttribute("aria-label", "Grup tombol");
      }
      const updateState = (clickedButton) => {
        const isDisabled = clickedButton.hasAttribute("disabled") || clickedButton.classList.contains(
          `${PREFIX}-button-group__button--disabled`
        );
        if (isDisabled) return;
        const value = clickedButton.getAttribute("data-value");
        buttons.forEach((btn) => {
          if (btn === clickedButton) {
            btn.classList.add(`${PREFIX}-button-group__button--selected`);
            btn.setAttribute("aria-pressed", "true");
          } else {
            btn.classList.remove(`${PREFIX}-button-group__button--selected`);
            btn.setAttribute("aria-pressed", "false");
          }
        });
        buttonGroup.dispatchEvent(
          new CustomEvent("button-group:change", {
            detail: { value },
            bubbles: true,
            composed: true
          })
        );
      };
      buttons.forEach((button, index) => {
        button.addEventListener("click", (e) => {
          if (button.type !== "submit") {
            e.preventDefault();
          }
          updateState(button);
        });
        button.addEventListener("keydown", (e) => {
          const isDisabled = button.hasAttribute("disabled") || button.classList.contains(`${PREFIX}-button-group__button--disabled`);
          if (isDisabled) return;
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            updateState(button);
          } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
            e.preventDefault();
            let nextIndex = (index + 1) % buttons.length;
            while ((buttons[nextIndex].hasAttribute("disabled") || buttons[nextIndex].classList.contains(
              `${PREFIX}-button-group__button--disabled`
            )) && nextIndex !== index) {
              nextIndex = (nextIndex + 1) % buttons.length;
            }
            buttons[nextIndex]?.focus();
          } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
            e.preventDefault();
            let prevIndex = (index - 1 + buttons.length) % buttons.length;
            while ((buttons[prevIndex].hasAttribute("disabled") || buttons[prevIndex].classList.contains(
              `${PREFIX}-button-group__button--disabled`
            )) && prevIndex !== index) {
              prevIndex = (prevIndex - 1 + buttons.length) % buttons.length;
            }
            buttons[prevIndex]?.focus();
          }
        });
      });
      buttonGroup.__inaButtonGroupInitialized = true;
    });
  }

  // src/js/components/stateful/dropdown.js
  function initDropdown(rootSelector = `.${PREFIX}-dropdown`) {
    document.querySelectorAll(rootSelector).forEach((dropdown) => {
      const trigger = dropdown.querySelector(`.${PREFIX}-dropdown__trigger`);
      const input = dropdown.querySelector(`.${PREFIX}-dropdown__input`);
      const menu = dropdown.querySelector(`.${PREFIX}-dropdown__menu`);
      const menuItems = menu.querySelectorAll("li[role='option']");
      const menuId = menu.id;
      let activeIndex = -1;
      menuItems.forEach((item, index) => {
        item.id = `${menuId}-item-${index}`;
      });
      const toggleMenu = (show) => {
        const isCurrentlyShown = dropdown.classList.contains("show");
        const isShown = show !== void 0 ? show : !isCurrentlyShown;
        if (isShown === isCurrentlyShown) {
          return;
        }
        dropdown.classList.toggle("show", isShown);
        trigger.setAttribute("aria-expanded", isShown);
        if (isShown) {
          input.focus();
        } else {
          input.blur();
          removeHighlight();
          activeIndex = -1;
          input.removeAttribute("aria-activedescendant");
        }
      };
      const filterItems = () => {
        const filterValue = input.value.toLowerCase();
        let hasVisibleItems = false;
        activeIndex = -1;
        removeHighlight();
        input.removeAttribute("aria-activedescendant");
        const activeItem = menu.querySelector("li[role='option'].selected");
        if (activeItem && input.value !== activeItem.textContent.trim()) {
          activeItem.classList.remove("selected");
        }
        menuItems.forEach((item) => {
          const itemText = item.textContent.toLowerCase();
          const isMatch = itemText.includes(filterValue);
          item.classList.toggle("hidden", !isMatch);
          if (isMatch) hasVisibleItems = true;
        });
        if (!dropdown.classList.contains("show") && hasVisibleItems) {
          toggleMenu(true);
        }
      };
      const selectItem = (item) => {
        const itemText = item.textContent.trim();
        input.value = itemText;
        menuItems.forEach((li) => {
          li.classList.remove("selected");
        });
        if (item) {
          item.classList.add("selected");
          dropdown.dispatchEvent(
            new CustomEvent("dropdown:changed", {
              detail: { value: itemText }
            })
          );
        }
        toggleMenu(false);
      };
      const setHighlight = (index) => {
        removeHighlight();
        const visibleItems = menu.querySelectorAll(
          "li[role='option']:not(.hidden)"
        );
        if (visibleItems.length === 0) return;
        if (index < 0) index = 0;
        else if (index >= visibleItems.length) index = visibleItems.length - 1;
        const itemToHighlight = visibleItems[index];
        if (itemToHighlight) {
          itemToHighlight.classList.add("highlighted");
          input.setAttribute("aria-activedescendant", itemToHighlight.id);
          itemToHighlight.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
          });
          activeIndex = index;
        }
      };
      const removeHighlight = () => {
        menuItems.forEach((item) => item.classList.remove("highlighted"));
      };
      trigger.addEventListener("click", () => {
        toggleMenu();
      });
      input.addEventListener("input", filterItems);
      menu.addEventListener("click", (e) => {
        const option = e.target.closest("li[role='option']");
        if (option) {
          e.preventDefault();
          selectItem(option);
        }
      });
      document.addEventListener("click", (e) => {
        if (!dropdown.contains(e.target)) {
          toggleMenu(false);
        }
      });
      input.addEventListener("keydown", (e) => {
        const { key } = e;
        const isMenuOpen = dropdown.classList.contains("show");
        switch (key) {
          case "ArrowDown":
            e.preventDefault();
            if (!isMenuOpen) {
              toggleMenu(true);
            }
            setHighlight(activeIndex + 1);
            break;
          case "ArrowUp":
            e.preventDefault();
            if (isMenuOpen) {
              setHighlight(activeIndex - 1);
            }
            break;
          case "Enter":
            e.preventDefault();
            const firstVisible = menu.querySelector(
              "li[role='option']:not(.hidden)"
            );
            const activeItem = menu.querySelector(".highlighted");
            if (isMenuOpen && activeItem) {
              selectItem(activeItem);
            } else if (isMenuOpen && firstVisible) {
              toggleMenu(false);
            }
            break;
          case "Escape":
            e.preventDefault();
            toggleMenu(false);
            break;
          case "Tab":
            toggleMenu(false);
            break;
        }
      });
    });
  }

  // src/js/components/stateful/chip.js
  var PREFIX4 = "ina";
  function initChip2(rootSelector = `.${PREFIX4}-chip`) {
    const chips = document.querySelectorAll(rootSelector);
    chips.forEach((container) => {
      if (container.__inaChipInitialized) return;
      const showCustomization = container.getAttribute("data-show-customization") === "true";
      const customizationLabel = container.getAttribute("data-customization-label") || "Kustomisasi";
      const isMultiple = container.getAttribute("data-multiple") === "true";
      let selectedValue = container.getAttribute("data-selected") || "";
      const list = container.querySelector(`.${PREFIX4}-chip__list`);
      const items = list ? list.querySelectorAll(`.${PREFIX4}-chip__item`) : [];
      let customFieldContainer = container.querySelector(
        `.${PREFIX4}-chip__custom-field`
      );
      const getNormalizedSelected = () => {
        if (!selectedValue) return [];
        return isMultiple ? selectedValue.split(",").map((s) => s.trim()).filter(Boolean) : [selectedValue];
      };
      const updateUI = () => {
        const normSelected = getNormalizedSelected();
        const getInitialFocusIndex = () => {
          if (normSelected.length > 0) {
            const standardValues = Array.from(items).filter((item) => item.textContent.trim() !== customizationLabel).map((item) => item.getAttribute("data-value"));
            const hasCustomVal = normSelected.some(
              (val) => !standardValues.includes(val) && val !== ""
            );
            if (hasCustomVal && showCustomization) {
              return items.length - 1;
            }
            const firstSelectedIndex = Array.from(items).findIndex(
              (opt) => normSelected.includes(opt.getAttribute("data-value"))
            );
            if (firstSelectedIndex !== -1) return firstSelectedIndex;
          }
          return 0;
        };
        const focusedIndex = getInitialFocusIndex();
        items.forEach((item, index) => {
          const itemValue = item.getAttribute("data-value");
          const isSelected = normSelected.includes(itemValue) || showCustomization && item.textContent.trim() === customizationLabel && normSelected.some(
            (val) => !Array.from(items).filter((i) => i.textContent.trim() !== customizationLabel).map((i) => i.getAttribute("data-value")).includes(val) && val !== ""
          );
          const isDisabled = item.hasAttribute("disabled");
          if (isSelected) {
            item.classList.add(`${PREFIX4}-chip__item--selected`);
          } else {
            item.classList.remove(`${PREFIX4}-chip__item--selected`);
          }
          if (isDisabled) {
            item.classList.add(`${PREFIX4}-chip__item--disabled`);
          }
          if (!item.hasAttribute("role")) {
            item.setAttribute("role", "option");
          }
          item.setAttribute("aria-selected", isSelected);
          item.setAttribute(
            "tabindex",
            index === focusedIndex && !isDisabled ? "0" : "-1"
          );
        });
        if (showCustomization) {
          const isToggleBtn2 = (i) => i.hasAttribute("data-customization-toggle") || i.textContent.trim() === customizationLabel;
          const standardValues = Array.from(items).filter((item) => !isToggleBtn2(item)).map((item) => item.getAttribute("data-value"));
          const customValues = normSelected.filter(
            (val) => !standardValues.includes(val) && val !== ""
          );
          const isStandard = customValues.length === 0;
          const primaryCustomValue = customValues[customValues.length - 1] || "";
          const toggleBtn = Array.from(items).find(isToggleBtn2);
          const showInput = toggleBtn && normSelected.includes(toggleBtn.getAttribute("data-value")) || !isStandard && normSelected.length > 0;
          if (showInput) {
            if (!customFieldContainer) {
              customFieldContainer = document.createElement("div");
              customFieldContainer.className = `${PREFIX4}-chip__custom-field`;
              container.appendChild(customFieldContainer);
            }
            let input = customFieldContainer.querySelector(
              `.${PREFIX4}-chip__input`
            );
            if (!input) {
              customFieldContainer.innerHTML = `
               <div class="${PREFIX4}-chip__input-wrapper">
                 <input type="text" class="${PREFIX4}-chip__input" placeholder="Masukkan data yang Anda inginkan" value="${!isStandard ? primaryCustomValue : ""}" />
                 <button type="button" class="${PREFIX4}-chip__clear-button" aria-label="Hapus input" style="display: ${!isStandard && primaryCustomValue ? "inline-flex" : "none"};">
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${PREFIX4}-chip__clear-icon">
                     <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                     <path d="M18 6l-12 12"></path>
                     <path d="M6 6l12 12"></path>
                   </svg>
                 </button>
               </div>
             `;
              input = customFieldContainer.querySelector("input");
              const clearBtn = customFieldContainer.querySelector(
                ".ina-chip__clear-button"
              );
              input.addEventListener("input", (e) => {
                clearBtn.style.display = e.target.value ? "inline-flex" : "none";
              });
              clearBtn.addEventListener("click", () => {
                input.value = "";
                clearBtn.style.display = "none";
                commitCustomValue(input);
              });
              input.addEventListener("blur", (e) => {
                commitCustomValue(e.target);
              });
              input.addEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                  commitCustomValue(e.target);
                  e.target.blur();
                }
              });
            } else {
              const inputEl = customFieldContainer.querySelector("input");
              if (inputEl && document.activeElement !== inputEl) {
                inputEl.value = !isStandard ? primaryCustomValue : "";
              }
            }
            customFieldContainer.style.display = "block";
          } else {
            if (customFieldContainer) {
              customFieldContainer.style.display = "none";
            }
          }
        }
      };
      const handleSelect = (val) => {
        if (!val) return;
        let finalVal = val;
        if (isMultiple) {
          const normSelected = getNormalizedSelected();
          let newSelected;
          if (normSelected.includes(val)) {
            newSelected = normSelected.filter((v) => v !== val);
          } else {
            newSelected = [...normSelected, val];
          }
          finalVal = newSelected;
          selectedValue = newSelected.join(",");
        } else {
          const normSelected = getNormalizedSelected();
          if (normSelected.includes(val)) {
            selectedValue = "";
            finalVal = "";
          } else {
            selectedValue = val;
          }
        }
        container.setAttribute("data-selected", selectedValue);
        updateUI();
        container.dispatchEvent(
          new CustomEvent("chip:select", {
            detail: { value: finalVal },
            bubbles: true
          })
        );
      };
      let currentFocusedIndex = -1;
      const setItemFocus = (index) => {
        items.forEach((item, i) => {
          item.setAttribute("tabindex", i === index ? "0" : "-1");
        });
        if (items[index]) {
          items[index].focus();
          currentFocusedIndex = index;
        }
      };
      const commitCustomValue = (inputEl) => {
        const finalValue = inputEl.value.trim();
        let normSelected = getNormalizedSelected();
        const toggleBtn = Array.from(items).find(isToggleBtn);
        const toggleVal = toggleBtn ? toggleBtn.getAttribute("data-value") : null;
        const standardValues = Array.from(items).filter((i) => !isToggleBtn(i)).map((i) => i.getAttribute("data-value"));
        const customValues = normSelected.filter(
          (val) => !standardValues.includes(val) && val !== "" && val !== toggleVal
        );
        const primaryCustomValue = customValues[customValues.length - 1];
        if (primaryCustomValue) {
          normSelected = normSelected.filter((v) => v !== primaryCustomValue);
        }
        if (finalValue !== "") {
          if (!normSelected.includes(finalValue)) {
            normSelected.push(finalValue);
          }
        } else {
          if (toggleVal) {
            normSelected = normSelected.filter((v) => v !== toggleVal);
          }
        }
        if (isMultiple) {
          selectedValue = normSelected.join(",");
        } else {
          selectedValue = finalValue;
        }
        updateUI();
        const changeEvent = new CustomEvent(`${PREFIX4}-chip:change`, {
          detail: { value: isMultiple ? getNormalizedSelected() : selectedValue },
          bubbles: true
        });
        container.dispatchEvent(changeEvent);
      };
      items.forEach((item, index) => {
        item.addEventListener("click", (e) => {
          if (item.hasAttribute("disabled")) return;
          currentFocusedIndex = index;
          const val = item.getAttribute("data-value");
          if (showCustomization && isToggleBtn(item)) {
            const normSelected = getNormalizedSelected();
            const standardValues = Array.from(items).filter((i) => !isToggleBtn(i)).map((i) => i.getAttribute("data-value"));
            const customValues = normSelected.filter(
              (v) => !standardValues.includes(v) && v !== "" && v !== val
            );
            const isInputVisible = normSelected.includes(val) || customValues.length > 0;
            if (!isInputVisible) {
              handleSelect(val);
            }
          } else {
            handleSelect(val);
          }
        });
        item.addEventListener("keydown", (e) => {
          if (item.hasAttribute("disabled")) return;
          if (e.key === "ArrowRight" || e.key === "ArrowDown") {
            e.preventDefault();
            let nextIndex = (index + 1) % items.length;
            while (items[nextIndex].hasAttribute("disabled") && nextIndex !== index) {
              nextIndex = (nextIndex + 1) % items.length;
            }
            setItemFocus(nextIndex);
          } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
            e.preventDefault();
            let prevIndex = (index - 1 + items.length) % items.length;
            while (items[prevIndex].hasAttribute("disabled") && prevIndex !== index) {
              prevIndex = (prevIndex - 1 + items.length) % items.length;
            }
            setItemFocus(prevIndex);
          }
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            item.click();
          }
        });
      });
      updateUI();
      if (list && !list.hasAttribute("role")) {
        list.setAttribute("role", "listbox");
        if (isMultiple) {
          list.setAttribute("aria-multiselectable", "true");
        }
      }
      container.__inaChipInitialized = true;
    });
  }

  // src/js/components/stateless/img-compare.js
  function initImgCompare2(rootSelector = `.${PREFIX}-img-compare`) {
    document.querySelectorAll(rootSelector).forEach((imgCompare) => {
      const sliderEl = document.createElement("input");
      sliderEl.type = "range";
      sliderEl.min = "0";
      sliderEl.max = "100";
      sliderEl.value = "50";
      sliderEl.setAttribute("aria-label", "Percentage of the image to show");
      sliderEl.setAttribute("aria-valuenow", "50");
      sliderEl.setAttribute("aria-valuemin", "0");
      sliderEl.setAttribute("aria-valuemax", "100");
      sliderEl.classList.add("ina-ss-img__slider");
      sliderEl.addEventListener("input", () => {
        imgCompare.style.setProperty(
          `--${PREFIX}-position`,
          `${sliderEl.value}%`
        );
      });
      const sliderLineEl = document.createElement("div");
      sliderLineEl.classList.add("ina-ss-img__slider-line");
      const sliderButtonEl = document.createElement("button");
      sliderButtonEl.classList.add("ina-ss-img__slider-button");
      imgCompare.appendChild(sliderEl);
      imgCompare.appendChild(sliderLineEl);
      imgCompare.appendChild(sliderButtonEl);
    });
  }

  // src/js/bundle.js
  if (typeof window !== void 0) {
    document.addEventListener("DOMContentLoaded", () => {
      initAccordion();
      initDrawer();
      initButtonGroup();
      initCheckbox();
      initDatepicker();
      initTimepicker();
      initDropdown();
      initFileUpload();
      initSingleFileUpload();
      initFileUploadBase();
      initFileUploadItem();
      initImgCompare2();
      initModal();
      initRangeDatepicker();
      initRadioButton();
      initStepper();
      initTab();
      initToggle();
      initPagination();
      initSelectDropdown();
      initChip2();
      initTabVertical();
      initTabHorizontal();
      initTable();
      initMonthPicker();
      initYearPicker();
      initPhoneInput();
    });
  }
  return __toCommonJS(bundle_exports);
})();
