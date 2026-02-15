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

    mousewheel: {
      invert: false, // 預設 false (滾輪往下 = 向右滑，滾輪往上 = 向左滑)
      // forceToAxis: true, // (選用) 如果設為 true，只有在「水平」滾動滑鼠/觸控板時才會切換，避免使用者想往下滑網頁時卡住
    },

    // 確保手動滑動後圓點會更新
    watchSlidesProgress: true, // 即時追蹤當前滑塊的進度，讓分頁指示器隨滑動變化
    observer: true, // 監控 Swiper 本身 DOM 結構變化
    observeParents: true
  });
});

// 商品篩選
// document.addEventListener('DOMContentLoaded', function () {
//   const filterButtons = document.querySelectorAll('.product-btn');
//   const products = document.querySelectorAll('.product-section');

//     // 預設先顯示所有
//   products.forEach(section => {
//     section.classList.add('show')
//   });

//   filterButtons.forEach(button => {
//     button.addEventListener('click', function () {
//       const filter = this.dataset.filter;

//       // 切換按鈕 active 樣式
//       filterButtons.forEach(btn => btn.classList.remove('active'));
//       this.classList.add('active');

//       // 顯示符合篩選的商品
//       products.forEach(section => {
//         const category = section.dataset.category;
//         // 要顯示的
//         if (filter === 'all' || category === filter) {
//           section.classList.add('show');
//           section.classList.remove('hide');
//         //   section.style.display = 'block';
//         } else {
//           section.classList.add('hide');
//           section.classList.remove('show');
//         //   section.style.display = 'none';
//         }
//       });
//     });
//   });
// });

document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.product-btn');
    const products = document.querySelectorAll('.product-section');

    // 1. 初始化：確保所有商品都有 show class (預設顯示全部)
    products.forEach(section => section.classList.add('show'));

    // 2. 綁定按鈕事件
    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            // 取得按鈕設定的篩選類別 (all, fries, mushroom...)
            const filter = this.dataset.filter;

            // --- UI 處理：切換按鈕亮燈 ---
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // --- 篩選邏輯 ---
            products.forEach(section => {
                // 取得商品本身的類別
                const category = section.dataset.category;

                // 如果按鈕是 'all' 或者 商品類別跟按鈕一樣
                if (filter === 'all' || category === filter) {
                    // 先移除再加入，可以重置動畫 (選用，讓切換更明顯)
                    section.classList.remove('show');
                    // 使用 setTimeout 讓瀏覽器有時間重繪，產生「重新淡入」的感覺
                    setTimeout(() => {
                        section.classList.add('show');
                    }, 10);
                } else {
                    // 不符合的就移除 show (CSS 會讓它變 display: none)
                    section.classList.remove('show');
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
let pendingOrder = null; // 暫存本次訂單，等付款確認才送出

function loadCart(){ try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { return []; } }
function saveCart(){ localStorage.setItem(CART_KEY, JSON.stringify(CART)); }
function dropCart (){ localStorage.removeItem(CART_KEY); }

function normalizeTastes(t) {
  if (!t) return [];
  if (typeof t === 'string') return [t.trim()].filter(Boolean); // 兼容舊資料
  if (!Array.isArray(t)) return [];
  return Array.from(new Set(t.map(x => String(x).trim()).filter(Boolean))).sort();
}

// 合併規則：同商品 + 同份量 + 同口味 + 同備註 + 同單價 => 同一筆
function buildCartKey(item) {
  const sku = String(item.sku ?? '');          // ✅ 用 sku 當主識別
  // const productId = String(item.productId ?? '');
  const variantId = String(item.variantId ?? '');
  const unitPrice = Number(item.unitPrice ?? 0);
  const tastes = normalizeTastes(item.tastes).join('|');
  const note = String(item.note ?? '').trim();
  return [sku, variantId, unitPrice, tastes, note].join('::');
}

// 把整個 CART 內的重複項目整理合併（用在載入舊資料時）
function mergeCartItems(cart) {
  const map = new Map();

  for (const raw of (cart || [])) {
    const item = {
      ...raw,
      sku: String(raw.sku ?? ''),
      // productId: String(raw.productId ?? ''),
      variantId: String(raw.variantId ?? ''),
      unitPrice: Number(raw.unitPrice ?? 0),
      qty: Number(raw.qty ?? 0) || 0,
      tastes: normalizeTastes(raw.tastes),
      note: String(raw.note ?? '').trim(),
    };

    const key = buildCartKey(item);

    if (!map.has(key)) {
      map.set(key, { ...item, subtotal: item.unitPrice * item.qty });
    } else {
      const ex = map.get(key);
      ex.qty += item.qty;
      ex.subtotal = ex.unitPrice * ex.qty;
      map.set(key, ex);
    }
  }

  return Array.from(map.values());
}

// 加入訂單
document.addEventListener('DOMContentLoaded', () => {
  
  // CART = loadCart(); // 購物車（前端暫存）
  CART = mergeCartItems(loadCart()); // 合併舊資料
  saveCart(); // 寫回 localStorage，舊的重複列會被整理掉

  // ====== 付款 Modal instance（固定一個）======
  const paymentModalEl = document.getElementById('paymentModal');
  const paymentModal = paymentModalEl ? bootstrap.Modal.getOrCreateInstance(paymentModalEl) : null;

  const btnPaidConfirm = document.getElementById('btnPaidConfirm');
  const BTN_PAID_TEXT = btnPaidConfirm?.textContent || '我已付款，送出訂單';

  function resetPayButton() {
    if (!btnPaidConfirm) return;
    btnPaidConfirm.disabled = false;
    btnPaidConfirm.textContent = BTN_PAID_TEXT;
  }

  // 每次打開/關閉都重置按鈕（避免卡在送出中）
  paymentModalEl?.addEventListener('show.bs.modal', resetPayButton);
  paymentModalEl?.addEventListener('hidden.bs.modal', resetPayButton);

  // ====== 加入訂單 Modal：關閉就重置（解決卡在更新）======
  const addToCartModalEl = document.getElementById('addToCartModal');
  const confirmBtn = document.getElementById('confirmAddCart');

  function resetAddToCartMode() {
    editingIndex = null;
    if (confirmBtn) {
      confirmBtn.textContent = '加入購物車';
      delete confirmBtn.dataset.mode;
    }
  }

  // 不管按 X / 點背景 / 取消，都會觸發
  addToCartModalEl?.addEventListener('hidden.bs.modal', resetAddToCartMode);


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
            <button class="btn btn-xs btn-edit" data-index="${idx}">編輯</button>
            <button class="btn btn-xs btn-del" data-index="${idx}">刪除</button>
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
      resetCheckoutFormAndCart();
      return;
    }
  });

  function resetCheckoutFormAndCart() {
    // 1) 清空購物車（保留同一陣列參考）
    CART.length = 0;
    dropCart();
    updateCartUI();

    // 2) 清空結帳欄位：電話 / 後五碼 / 取餐時間
    const phoneEl = document.getElementById('checkoutPhone');
    if (phoneEl) phoneEl.value = '';

    const last5El = document.getElementById('transferLast5');
    if (last5El) last5El.value = '';

    const dateEl = document.getElementById('pickupDate');
    if (dateEl) dateEl.value = '';

    const timeEl = document.getElementById('pickupTime');
    if (timeEl) {
      timeEl.innerHTML = `<option value="">請先選擇日期</option>`;
      timeEl.disabled = true;
    }

    const pickupDateTimeEl = document.getElementById('pickupDateTime');
    if (pickupDateTimeEl) pickupDateTimeEl.value = '';

    const hintEl = document.getElementById('pickupHint');
    if (hintEl) hintEl.textContent = '';
  }




  // ====== 這裡開始新增「前往結帳」相關程式 ======

  // 「前往結帳」按鈕
  const btnCheckout = document.getElementById('btnCheckout');
  if (btnCheckout) {
    btnCheckout.addEventListener('click', function () {
      if (!CART || CART.length === 0) {
        alert('購物車是空的');
        return;
      }

      // 讀取電話
      const phoneEl = document.getElementById('checkoutPhone');
      const phone = (phoneEl?.value || '').trim();
      if (!phone) { alert('請輸入電話'); phoneEl?.focus(); return; }
      if (!/^09\d{8}$/.test(phone)) { alert('電話格式不正確（請輸入正確 10 碼電話）'); phoneEl?.focus(); return; }
      
      // 讀取匯款後五碼
      const last5El = document.getElementById('transferLast5');
      const last5 = (last5El?.value || '').trim();
      if (!last5) { alert('請輸入帳號後 5 碼'); last5El?.focus(); return; }
      if (!/^\d{5}$/.test(last5)) { alert('帳號格式不正確（請輸入正確後 5 位數字）'); last5El?.focus(); return; }

      // 讀取取餐日期/時間（使用 date + select 方案）
      const dateEl = document.getElementById('pickupDate');
      const timeEl = document.getElementById('pickupTime');
      const pickupDateTimeEl = document.getElementById('pickupDateTime');

      const pickupDate = (dateEl?.value || '').trim();
      const pickupTime = (timeEl?.value || '').trim();
      const pickupDateTime = (pickupDateTimeEl?.value || '').trim(); // hidden 的組合值：YYYY-MM-DDTHH:MM

      if (!pickupDate) { alert('請選擇取餐日期'); dateEl?.focus(); return; }
      if (!pickupTime) { alert('請選擇取餐時間'); timeEl?.focus(); return; }
      if (!pickupDateTime) { alert('取餐時間資料異常，請重新選擇日期與時間'); return; }

      // 把購物車轉成 LINE 要的文字內容
      const orderList = CART.map(item => {
        let line = `${item.name} x${item.qty} = $${item.subtotal}`;
        if (item.variantLabel) line += ` (${item.variantLabel})`;
        if (item.tastes && item.tastes.length > 0) line += ` [${item.tastes.join('、')}]`;
        if (item.note) line += ` 備註：${item.note}`;
        return line;
      }).join('\n');

      const totalAmount = CART.reduce((sum, it) => sum + it.subtotal, 0);

      // 暫存本次訂單（先不送 GAS）
      pendingOrder = {
        orderList,
        totalAmount,
        phone,
        last5,
        pickupTime: pickupDateTime
      };

      // 填入付款 Modal 的訂單摘要
      document.getElementById('payTotal').textContent = `$${totalAmount}`;
      document.getElementById('payMeta').textContent = `電話：${phone}｜帳號後五碼：${last5}｜取餐：${pickupDateTime}`;
      document.getElementById('payOrderPreview').textContent = orderList;

      // （可選）先關掉購物車 Offcanvas，畫面更乾淨
      // bootstrap.Offcanvas.getInstance(document.getElementById('offcanvasCart'))?.hide();

      paymentModal?.show();
    });
  }

  if (btnPaidConfirm) {
    btnPaidConfirm.addEventListener('click', async () => {
      if (!pendingOrder) {
        alert('訂單資料不存在，請重新操作');
        return;
      }

      btnPaidConfirm.disabled = true;
      btnPaidConfirm.textContent = '送出中...';

      try {
        const { ok, text } = await sendCartToLine(pendingOrder);

        if (ok && text === 'Success') {
          // ✅ 先關 Modal
          paymentModal?.hide();

          // ✅ 成功後：清空購物車 + 清空電話/後五碼/取餐時間
          resetCheckoutFormAndCart();
          pendingOrder = null;

          // ✅ Modal 關閉後再提示（避免 alert 卡住動畫/遮罩）
          paymentModalEl?.addEventListener('hidden.bs.modal', () => {
            alert('訂單已送出，店家會在 LINE 收到通知！');
          }, { once: true });

        } else {
          alert('送出失敗：' + text);
        }
      } catch (err) {
        console.error(err);
        alert('送出失敗：網路或系統錯誤');
      } finally {
        resetPayButton();
      }
    });
  }

  // 送出購物車到 GAS（只回傳結果，不要在這裡 alert/清空）
  function sendCartToLine(data) {
    const GAS_URL = 'https://script.google.com/macros/s/AKfycbxjy_S3XATSkqk3VaiIGs8-LlufLjfZRnHzNzQzoEC7W3bazqmzDvVPMgEzepkwD6KxCA/exec';

    const formData = new URLSearchParams();
    formData.append('orderList', data.orderList);
    formData.append('totalAmount', data.totalAmount);
    formData.append('phone', data.phone);
    formData.append('last5', data.last5);
    formData.append('pickupTime', data.pickupTime);

    // 一定要 return，才能讓 await 正常等待
    return fetch(GAS_URL, { method: 'POST', body: formData })
      .then(async (response) => {
        const text = (await response.text()).trim();
        console.log('GAS 回應狀態碼:', response.status);
        console.log('GAS 回應內容:', text);
        return { ok: response.ok, text };
      })
      .catch((error) => {
        console.error('送出訂單失敗:', error);
        return { ok: false, text: '網路錯誤，請檢查連線' };
      });
  }

  // ====== 「前往結帳」相關程式到這裡為止 ======

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
    // const product = { ...CATALOG[item.productId] };
    const product = { ...CATALOG[item.priceId] }; 
    product.sku = item.sku; 
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
      resetAddToCartMode();

      const pid = e.currentTarget.dataset.productId;
      const sku = e.currentTarget.dataset.sku;  
      const product = { ...CATALOG[pid] }; // 複製一份，避免直接改到原資料
      
      product.sku = sku;

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
      sku: currentProduct.sku,      // ✅ 商品本體 id（用來合併）
      priceId: currentProduct.id,   // ✅ 價格模板 id（price_011）
      // productId: currentProduct.id,
      name: currentProduct.name,
      qty,
      variantId,
      variantLabel: variantLbl,
      tastes,                 // 口味收集
      unitPrice: uPrice,
      subtotal: uPrice * qty,
      note: document.getElementById('modalNote').value.trim(),
    };

    const confirmBtn = document.getElementById('confirmAddCart');
    const isEdit = confirmBtn.dataset.mode === 'edit';

    if (isEdit && editingIndex !== null && CART[editingIndex]) {
      // 編輯：維持你原本邏輯（更新該筆）
      CART[editingIndex] = item;
    } else {
      // 新增：同 key 就疊加 qty，不同 key 才新增
      const newKey = buildCartKey(item);
      const hitIndex = CART.findIndex(x => buildCartKey(x) === newKey);

      if (hitIndex >= 0) {
        CART[hitIndex].qty += item.qty;
        CART[hitIndex].subtotal = CART[hitIndex].unitPrice * CART[hitIndex].qty;
      } else {
        CART.push(item);
      }
    }

    // 保險：把 CART 再整理一次（可吃掉舊資料造成的重複散項）
    // 而且用 in-place 覆蓋，保留 CART 參考不變
    const merged = mergeCartItems(CART);
    CART.length = 0;
    merged.forEach(x => CART.push(x));


    saveCart();
    updateCartUI(); // 重新渲染側欄與合計

    bootstrap.Modal.getInstance(document.getElementById('addToCartModal')).hide();
    // 還原「加入購物車」狀態
    confirmBtn.textContent = '加入購物車';
    delete confirmBtn.dataset.mode;
    editingIndex = null;
  });

  updateCartUI(); // 初始渲染（顯示$0與空車提示）


  // ===== 規則：營業時間（你可改）=====
  // 回傳 { start:"HH:MM", end:"HH:MM" } 或 null(休息)
  function getBusinessHoursByDate(date) {
    const dow = date.getDay(); // 0=日,1=一,...,5=五,6=六
    if (dow >= 1 && dow <= 4) return { start: "13:30", end: "18:30" }; // 一～四
    if (dow === 0 || dow === 6) return { start: "12:00", end: "18:30" }; // 六日
    return null; // 五不營業（若要營業，改成時間）
  }

  function pad2(n){ return String(n).padStart(2,'0'); }
  function toDateValue(d){ return `${d.getFullYear()}-${pad2(d.getMonth()+1)}-${pad2(d.getDate())}`; }
  function parseDateValue(v){
    if(!v) return null;
    const [y,m,dd] = v.split('-').map(Number);
    return new Date(y, m-1, dd, 0,0,0,0);
  }
  function buildDateAt(date, hhmm){
    const [hh, mi] = hhmm.split(':').map(Number);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hh, mi, 0, 0);
  }
  function ceilTo10Min(date){
    const stepMs = 10 * 60 * 1000;
    return new Date(Math.ceil(date.getTime()/stepMs)*stepMs);
  }
  function toTimeValue(date){ return `${pad2(date.getHours())}:${pad2(date.getMinutes())}`; }

  function setDateRange14Days() {
    const dateEl = document.getElementById('pickupDate');
    const hintEl = document.getElementById('pickupHint');
    const timeEl = document.getElementById('pickupTime');
    if (!dateEl) return;

    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const end = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 14);

    dateEl.min = toDateValue(start);
    dateEl.max = toDateValue(end);

    // 不自動選日期（你說要「選擇才填」）但如果日期不在範圍內就清掉
    if (dateEl.value) {
      const d = parseDateValue(dateEl.value);
      if (!d || d < start || d > end) dateEl.value = "";
    }

    // 初始狀態
    if (timeEl) {
      timeEl.innerHTML = `<option value="">請先選擇日期</option>`;
      timeEl.disabled = true;
    }
    if (hintEl) hintEl.textContent = "可預約未來 14 天內時段";
  }

  function populateTimesForDate(date) {
    const timeEl = document.getElementById('pickupTime');
    const hintEl = document.getElementById('pickupHint');
    const hiddenEl = document.getElementById('pickupDateTime');

    if (!timeEl) return;

    const hours = getBusinessHoursByDate(date);
    if (!hours) {
      timeEl.innerHTML = `<option value="">當天不營業</option>`;
      timeEl.disabled = true;
      if (hintEl) hintEl.textContent = "請改選其他日期";
      if (hiddenEl) hiddenEl.value = "";
      return;
    }

    const openStart = buildDateAt(date, hours.start);
    const openEnd   = buildDateAt(date, hours.end);

    // 若選的是今天：最早 = 現在+10分鐘（再對齊10分鐘）
    const now = new Date();
    const isToday =
      date.getFullYear() === now.getFullYear() &&
      date.getMonth() === now.getMonth() &&
      date.getDate() === now.getDate();

    let minStart = openStart;
    if (isToday) {
      const nowPlus10 = new Date(now.getTime() + 10*60*1000);
      minStart = nowPlus10 > openStart ? nowPlus10 : openStart;
    }

    minStart = ceilTo10Min(minStart);

    // 若已超過營業結束，當天就沒有可選時段
    if (minStart > openEnd) {
      timeEl.innerHTML = `<option value="">目前已打烊</option>`;
      timeEl.disabled = true;
      if (hintEl) hintEl.textContent = `今日可取餐 ${hours.start} ~ ${hours.end}，已超過可預約時間`;
      if (hiddenEl) hiddenEl.value = "";
      return;
    }

    // 生成 10 分鐘一格的選項
    const opts = [];
    for (let t = new Date(minStart); t <= openEnd; t = new Date(t.getTime() + 10*60*1000)) {
      const v = toTimeValue(t);        // "HH:MM"
      opts.push(`<option value="${v}">${v}</option>`);
    }

    timeEl.innerHTML = `<option value="">請選擇時間</option>` + opts.join('');
    timeEl.disabled = false;
    if (hintEl) hintEl.textContent = `可取餐：${hours.start} ~ ${hours.end}`;

    // 不自動選第一個時間（你說要選才填）
    if (hiddenEl) hiddenEl.value = "";
  }

  function updateHiddenDateTime() {
    const dateEl = document.getElementById('pickupDate');
    const timeEl = document.getElementById('pickupTime');
    const hiddenEl = document.getElementById('pickupDateTime');
    if (!dateEl || !timeEl || !hiddenEl) return;

    if (!dateEl.value || !timeEl.value) {
      hiddenEl.value = "";
      return;
    }
    hiddenEl.value = `${dateEl.value} ${timeEl.value}`; // "YYYY-MM-DDTHH:MM"
  }

  // ===== 綁定事件 =====
  (function initPickupControls(){
    const offcanvasEl = document.getElementById('offcanvasCart');
    const dateEl = document.getElementById('pickupDate');
    const timeEl = document.getElementById('pickupTime');

    // offcanvas 打開時設定 14 天範圍
    if (offcanvasEl) {
      offcanvasEl.addEventListener('shown.bs.offcanvas', () => {
        setDateRange14Days();
      });
    } else {
      // 沒用 offcanvas 也能跑
      setDateRange14Days();
    }

    // 選日期 → 生成時間選項
    if (dateEl) {
      dateEl.addEventListener('change', () => {
        const d = parseDateValue(dateEl.value);
        if (!d) return;
        populateTimesForDate(d);
        updateHiddenDateTime();
      });
    }

    // 選時間 → 組合 hidden datetime
    if (timeEl) {
      timeEl.addEventListener('change', () => {
        updateHiddenDateTime();
      });
    }
  })();


  
});
