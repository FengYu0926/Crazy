// 主橫幅小圓點
document.addEventListener('DOMContentLoaded', function () {
  const swiper = new Swiper('.main-swiper', {
    loop: true, // 啟用無限輪播（最後一張接第一張）

    // 啟用分頁圓點指示器（小圓點）
    pagination: {
      el: '.swiper-pagination',
      clickable: true // 使用者可以點擊圓點切換幻燈片
    },

    // 自動播放設定
    autoplay: {
      delay: 5000,
      disableOnInteraction: false // 使用者操作後仍繼續自動播放
    },
    // 確保手動滑動後圓點會更新
    watchSlidesProgress: true, // 即時追蹤當前滑塊的進度，讓分頁指示器隨滑動變化
    observer: true, // 監控 Swiper 本身 DOM 結構變化
    observeParents: true
  });
});

// 商品篩選
document.addEventListener('DOMContentLoaded', function () {
  const filterButtons = document.querySelectorAll('.product-btn');
  const products = document.querySelectorAll('.product-section');

    // 預設先顯示所有
  products.forEach(section => {
    section.classList.add('show')
  });

  filterButtons.forEach(button => {
    button.addEventListener('click', function () {
      const filter = this.dataset.filter;

      // 切換按鈕 active 樣式
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      // 顯示符合篩選的商品
      products.forEach(section => {
        const category = section.dataset.category;
        // 要顯示的
        if (filter === 'all' || category === filter) {
          section.classList.add('show');
          section.classList.remove('hide');
        //   section.style.display = 'block';
        } else {
          section.classList.add('hide');
          section.classList.remove('show');
        //   section.style.display = 'none';
        }
      });
    });
  });
});

// 商品資料模型：simple=單一價、variant=多規格
const CATALOG = {

  price_011: {
    id: "price_011",
    type: "variant",
    variants: [
      { id: "S", label: "小份", price: 40 },
      { id: "L", label: "大份", price: 60 },
      { id: "XL", label: "分享", price: 100 },
    ],
    tastes: {
      multiple: false, // false=單選(radio)；true=複選(checkbox)
      choices: [
        { id: "plain", label: "原味", delta: 0 },
        { id: "ume", label: "甘梅粉", delta: 0 },
        { id: "pepper", label: "胡椒粉", delta: 0 },
        { id: "chili", label: "辣椒粉", delta: 0 },
        { id: "mix", label: "綜合(甘梅+胡椒)", delta: 5 },
      ],
    },
  },

  price_021: {
    id: "price_021",
    type: "variant",
    variants: [
      { id: "S", label: "7顆", price: 40 },
      { id: "L", label: "12顆", price: 60 },
    ],
    tastes: {
      multiple: false, // false=單選(radio)；true=複選(checkbox)
      choices: [
        { id: "plain", label: "原味", delta: 0 },
        { id: "ume", label: "甘梅粉", delta: 0 },
        { id: "pepper", label: "胡椒粉", delta: 0 },
        { id: "mix", label: "綜合(甘梅+胡椒)", delta: 5 },
      ],
    },
  },

  price_022: {
    id: "price_022",
    type: "variant",
    variants: [
      { id: "S", label: "小份", price: 50 },
      { id: "L", label: "大份", price: 100 },
    ],
    tastes: {
      multiple: false, // false=單選(radio)；true=複選(checkbox)
      choices: [
        { id: "plain", label: "原味", delta: 0 },
        { id: "ume", label: "甘梅粉", delta: 0 },
        { id: "pepper", label: "胡椒粉", delta: 0 },
        { id: "mix", label: "綜合(甘梅+胡椒)", delta: 5 },
      ],
    },
  },

  price_031: {
    id: "price_031",
    type: "simple",
    variants: [
      { id: "only", label: "一塊", price: 30 }
    ],
    tastes: {
      multiple: false, // false=單選(radio)；true=複選(checkbox)
      choices: [
        { id: "plain", label: "原味", delta: 0 },
        { id: "ume", label: "甘梅粉", delta: 0 },
        { id: "pepper", label: "胡椒粉", delta: 0 },
        { id: "chili", label: "辣椒粉", delta: 0 },
        { id: "mix", label: "綜合(甘梅+胡椒)", delta: 5 },
      ],
    },
  },

  price_032: {
    id: "price_032",
    type: "simple",
    variants: [
      { id: "only", label: "三個", price: 40 }
    ],
    tastes: {
      multiple: false, // false=單選(radio)；true=複選(checkbox)
      choices: [
        { id: "plain", label: "原味", delta: 0 },
        { id: "ume", label: "甘梅粉", delta: 0 },
        { id: "pepper", label: "胡椒粉", delta: 0 },
        { id: "chili", label: "辣椒粉", delta: 0 },
        { id: "mix", label: "綜合(甘梅+胡椒)", delta: 5 },
      ],
    },
  },

  price_033: {
    id: "price_033",
    type: "simple",
    variants: [
      { id: "only", label: "二塊", price: 35 }
    ],
    tastes: {
      multiple: false, // false=單選(radio)；true=複選(checkbox)
      choices: [
        { id: "plain", label: "原味", delta: 0 },
        { id: "ume", label: "甘梅粉", delta: 0 },
        { id: "pepper", label: "胡椒粉", delta: 0 },
        { id: "chili", label: "辣椒粉", delta: 0 },
        { id: "mix", label: "綜合(甘梅+胡椒)", delta: 5 },
      ],
    },
  },

};

const CART_KEY = 'hss_cart';
let CART = []; 
let editingIndex = null; // null=新增；數字=正在編輯第幾筆

function loadCart(){ try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { return []; } }
function saveCart(){ localStorage.setItem(CART_KEY, JSON.stringify(CART)); }
function dropCart (){ localStorage.removeItem(CART_KEY); }

// 加入訂單
document.addEventListener('DOMContentLoaded', () => {
  
  CART = loadCart(); // 購物車（前端暫存）

  // 更新購物車介面
  function updateCartUI(){
    const list = document.getElementById('cartList');
    if (!list) return;

    if (!CART.length) {
      list.innerHTML = `<li class="list-group-item text-center text-muted">購物車是空的</li>`;
    } else {
      list.innerHTML = CART.map((item, idx) => {
        return `
        <li class="list-group-item d-flex justify-content-between align-items-start">
          <div>
            <span class="fw-semibold">${item.name}</span>
            <small class="text-muted">
              ${item.variantLabel ? item.variantLabel + ' ' : ''}
              ${item.tastes?.length ? item.tastes.join('、') : ''}
            </small>
            <div>${item.qty} × $${item.unitPrice}</div>
            ${item.note ? `<div class="small text-primary">備註：${item.note}</div>` : ""}
          </div>
          
          <div class="text-end">
            <button class="btn btn-xs btn-outline-primary btn-edit" data-index="${idx}">編輯</button>
            <button class="btn btn-xs btn-outline-danger btn-del" data-index="${idx}">刪除</button>
            <div>$${item.subtotal}</div>
          </div>
        </li>`;
      }).join('');
    }
    
    document.getElementById('cartGrandnavbar').textContent =
    document.getElementById('cartGrand').textContent =
      `$${CART.reduce((sum, it) => sum + it.subtotal, 0)}`;
  }

  // 購物車功能鍵
  document.addEventListener('click', (e) => {
    // 編輯
    const editBtn = e.target.closest('.btn-edit');
    if (editBtn) {
      const idx = Number(editBtn.dataset.index);
      if (!Number.isNaN(idx)) startEdit(idx);
      return;
    }

    // 刪除
    const delBtn = e.target.closest('.btn-del');
    if (delBtn) {
      const idx = Number(delBtn.dataset.index);
      if (!Number.isNaN(idx) && idx >= 0 && idx < CART.length) {
        CART.splice(idx, 1);
        saveCart();
        updateCartUI();
      }
      return;
    }

    // 清空購物車
    if (e.target.closest('.btn-clear-cart')) {
      // 若其他地方持有 CART 參考，建議這樣清空以保留同一陣列參考
      CART.length = 0;        // 而不是 CART = []
      dropCart();
      updateCartUI();
      return;
    }
  });

  // 口味加價
  function tastesDelta() {
    const cont = document.getElementById('tasteContainer');
    if (!cont) return 0;
    let delta = 0;
    cont.querySelectorAll('input:checked').forEach(inp => {
      delta += Number(inp.dataset.delta || 0);
    });
    return delta;
  }

  // 單價 = 基礎價 + 口味加價
  function unitPrice(product) {
    const sel = document.getElementById('variantSelect');
    const base = Number(sel?.selectedOptions[0]?.dataset.price || 0);
    return base + tastesDelta();

  }

  // 刷新小計 (小計 = 單價 × 數量；數量/分量/口味 有改變都要呼叫)
  function refreshSubtotal() {
    document.getElementById('modalSubtotal').textContent = (unitPrice(currentProduct) * qty);
  }

  // 動態渲染份量
  function renderVariants(product) {
    const wrap = document.getElementById('variantWrap');
    const sel  = document.getElementById('variantSelect');
    
      wrap.style.display = '';
      sel.innerHTML = product.variants
        .map(v => `<option value="${v.id}" data-price="${v.price}">${v.label}（$${v.price}）</option>`)
        .join('');
      sel.onchange = refreshSubtotal;
  }

  // 動態渲染口味
  function renderTastes(product) {
    const wrap = document.getElementById('tasteWrap');
    const label = document.getElementById('tasteLabel');
    const cont  = document.getElementById('tasteContainer');

    if (!product.tastes || !product.tastes.choices?.length) {
      wrap.style.display = 'none';
      cont.innerHTML = '';
      cont.onchange = null;
      return;
    }

  wrap.style.display = '';
  label.textContent = '口味（單選）';

  const nameAttr = 'tasteGroup'; // 單選用同一個 name
  cont.innerHTML = product.tastes.choices.map((ch, idx) => {
    const extra = ch.delta ? `（+$${ch.delta}）` : '';
    const id = `taste_${ch.id}`;
    const checked = idx === 0 ? 'checked' : ''; // 預設選第一個
    return `
      <div class="form-check">
        <input class="form-check-input" type="radio"
               id="${id}" 
               name="${nameAttr}" ${checked}
               value="${ch.label}"              //直接存中文 label
               data-delta="${ch.delta || 0}">
        <label class="form-check-label" for="${id}">${ch.label}${extra}</label>
      </div>`;
  }).join('');

  cont.onchange = refreshSubtotal;
  }

  // 打開 加入訂單 窗口時渲染
  function renderModal(product) {
    currentProduct = product;
    qty = 1;

    document.getElementById('modalProductName').value = product.name; // 商品名稱
    document.getElementById('modalQty').textContent = qty; // 初始化數量
    document.getElementById('modalNote').value = ''; // 清空備註

    renderVariants(product); // 份量
    renderTastes(product);   // 口味

    refreshSubtotal();
  }

  // 更新 函式
  function startEdit(index) {
    const item = CART[index];
    if (!item) return;

    editingIndex = index;

    // 用產品目錄找到規格
    const product = { ...CATALOG[item.productId] };
    product.name = item.name; // 顯示用名稱以購物車項目為準

    // 先渲染基本 加入訂單 窗口
    renderModal(product);

    // 套用原本數量
    const qtyEl = document.getElementById('modalQty');
    qty = Number(item.qty) || 1;
    qtyEl.textContent = qty;

    // 套用原本的分量（variant）
    const sel = document.getElementById('variantSelect');
    if (sel && item.variantId) {
      sel.value = item.variantId;
    }

    // 套用原本口味（支援單選/複選）
    const cont = document.getElementById('tasteContainer');
    if (cont && item.tastes?.length) {
      const set = new Set(item.tastes);
      cont.querySelectorAll('input.form-check-input').forEach(inp => {
        inp.checked = set.has(inp.value);
      });
    }

    // 備註
    document.getElementById('modalNote').value = item.note || '';

    // 重算小計
    refreshSubtotal();

    // 變更 modal 按鈕文字為「更新」
    const btn = document.getElementById('confirmAddCart');
    btn.textContent = '更新';
    btn.dataset.mode = 'edit';

    // 打開 modal
    new bootstrap.Modal(document.getElementById('addToCartModal')).show();
  }


  // 綁定「加入訂單」按鈕
  document.querySelectorAll('.add-cart').forEach(btn => {
    btn.addEventListener('click', e => {
      const pid = e.currentTarget.dataset.productId;
      const product = { ...CATALOG[pid] }; // 複製一份，避免直接改到原資料

      // 從 HTML 找到同一張卡片的商品名稱
      const card = e.currentTarget.closest('.product-card');
      const nameFromHtml = card.querySelector('.product-name')?.textContent.trim();
      if (nameFromHtml) product.name = nameFromHtml;
      
      renderModal(product);
    });
  });

  // 數量 +/-
  document.getElementById('qtyPlus').addEventListener('click', () => {
    qty++;
    document.getElementById('modalQty').textContent = qty;
    refreshSubtotal();
  });
  document.getElementById('qtyMinus').addEventListener('click', () => {
    if (qty > 1) {
      qty--;
      document.getElementById('modalQty').textContent = qty;
      refreshSubtotal();
    }
  });

  // 按 加入購物車
  document.getElementById('confirmAddCart').addEventListener('click', () => {
    const sel = document.getElementById('variantSelect');
    const variantId  = sel ? sel.value : null;
    const variantLbl = currentProduct.variants.find(v => v.id === variantId)?.label || null;
    // const variantId  = (currentProduct.type === 'variant') ? sel.value : null;
    // const variantLbl = (currentProduct.type === 'variant') ? currentProduct.variants.find(v => v.id === variantId)?.label : null;

    // 收集口味
    const cont = document.getElementById('tasteContainer');
    const selected = cont ? Array.from(cont.querySelectorAll('input:checked')) : [];
    const tastes = selected.map(inp => inp.value);

    const uPrice = unitPrice(currentProduct);

    // 組出一個購物車品項（含份量/口味/單價/小計/備註）
    const item = {
      productId: currentProduct.id,
      name: currentProduct.name,
      qty,
      variantId,
      variantLabel: variantLbl,
      tastes,                 // 口味收集
      unitPrice: uPrice,
      subtotal: uPrice * qty,
      note: document.getElementById('modalNote').value.trim(),
    };

    // if (editingIndex === null) {
    //   CART.push(item);
    // } else {
    //   CART[editingIndex] = newItem;
    // }
    const confirmBtn = document.getElementById('confirmAddCart');
    const isEdit = confirmBtn.dataset.mode === 'edit';

    if (isEdit && editingIndex !== null && CART[editingIndex]) {
      // 覆蓋原本那一筆
      CART[editingIndex] = item;
    } else {
      // 新增
      CART.push(item);
    }

    saveCart();
    updateCartUI(); // 重新渲染側欄與合計

    bootstrap.Modal.getInstance(document.getElementById('addToCartModal')).hide();
    // 還原「加入購物車」狀態
    confirmBtn.textContent = '加入購物車';
    delete confirmBtn.dataset.mode;
    editingIndex = null;
  });

  updateCartUI(); // 初始渲染（顯示$0與空車提示）
  
});
