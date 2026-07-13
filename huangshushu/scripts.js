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
    // autoplay: {
    //   delay: 5000,
    //   disableOnInteraction: false // 使用者操作後仍繼續自動播放
    // },

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
document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.product-btn');
    const products = document.querySelectorAll('.product-section');

    // 1. 初始化：確保所有商品都有 show class (預設顯示全部)
    products.forEach(section => section.classList.add('show'));

    // 2. 綁定按鈕事件
    filterButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();

            const keepScrollY = window.scrollY;

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

            requestAnimationFrame(() => {
                window.scrollTo({
                    top: keepScrollY,
                    left: 0,
                    behavior: 'auto'
                });
            });

            setTimeout(() => {
                window.scrollTo({
                    top: keepScrollY,
                    left: 0,
                    behavior: 'auto'
                });
            }, 30);
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
        { id: "ume", label: "甘梅", delta: 0 },
        { id: "pepper", label: "胡椒", delta: 0 },
        { id: "seaweed", label: "海苔", delta: 0 },
        { id: "chili", label: "胡椒+辣椒", delta: 0 },
        { id: "mix", label: "甘梅+胡椒", delta: 5 },
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
        { id: "ume", label: "甘梅", delta: 0 },
        { id: "pepper", label: "胡椒", delta: 0 },
        { id: "mix", label: "甘梅+胡椒", delta: 5 },
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
        { id: "ume", label: "甘梅", delta: 0 },
        { id: "pepper", label: "胡椒", delta: 0 },
        { id: "seaweed", label: "海苔", delta: 0 },
        { id: "chili", label: "胡椒+辣椒", delta: 0 },
        { id: "mix", label: "甘梅+胡椒", delta: 5 },
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
        { id: "ume", label: "甘梅", delta: 0 },
        { id: "pepper", label: "胡椒", delta: 0 },
        { id: "seaweed", label: "海苔", delta: 0 },
        { id: "chili", label: "胡椒+辣椒", delta: 0 },
        { id: "mix", label: "甘梅+胡椒", delta: 5 },
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
        { id: "ume", label: "甘梅", delta: 0 },
        { id: "pepper", label: "胡椒", delta: 0 },
        { id: "seaweed", label: "海苔", delta: 0 },
        { id: "chili", label: "胡椒+辣椒", delta: 0 },
        { id: "mix", label: "甘梅+胡椒", delta: 5 },
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
        { id: "ume", label: "甘梅", delta: 0 },
        { id: "pepper", label: "胡椒", delta: 0 },
        { id: "seaweed", label: "海苔", delta: 0 },
        { id: "chili", label: "胡椒+辣椒", delta: 0 },
        { id: "mix", label: "甘梅+胡椒", delta: 5 },
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

  let isSubmitting = false;

  function resetPayButton() {
    if (!btnPaidConfirm) return;
    btnPaidConfirm.disabled = false;
    btnPaidConfirm.textContent = BTN_PAID_TEXT;
  }

  // 每次打開/關閉都重置按鈕（避免卡在送出中）
  paymentModalEl?.addEventListener('show.bs.modal', () => {
    if (!isSubmitting) resetPayButton();
  });
  paymentModalEl?.addEventListener('hidden.bs.modal', () => {
    if (!isSubmitting) resetPayButton();
  });

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
  function esc(s){
    return String(s ?? '').replace(/[&<>"']/g, c => ({
      '&':'&amp;',
      '<':'&lt;',
      '>':'&gt;',
      '"':'&quot;',
      "'":'&#39;'
    }[c]));
  }

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
            <span class="fw-semibold">${esc(item.name)}</span>
            <small class="text-muted">
              ${item.variantLabel ? esc(item.variantLabel) + ' ' : ''}
              ${item.tastes?.length ? item.tastes.map(esc).join('、') : ''}
            </small>
            <div>${item.qty} × $${item.unitPrice}</div>
            ${item.note ? `<div class="small text-primary">備註：${esc(item.note)}</div>` : ""}
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
    btnCheckout.addEventListener('click', async function () {
      if (!CART || CART.length === 0) {
        alert('購物車是空的');
        return;
      }

      // ============ 讀取付款方式 ============
      const payMethod = document.querySelector('input[name="payMethod"]:checked')?.value || 'qrcode';
      const isCod = (payMethod === 'cod');

      // ============ 進入結帳前,先確認庫存 ============
      const oldBtnText = btnCheckout.textContent;
      btnCheckout.disabled = true;
      btnCheckout.textContent = '檢查庫存中...';

      try {
        await loadCatalogStatus();
      } catch (err) {
        console.warn('庫存檢查失敗,將由後端二次驗證', err);
      }

      const soldOutItems = CART.filter(item => {
        const btn = document.querySelector(`.add-cart[data-sku="${item.sku}"]`);
        return btn?.classList.contains('btn-soldout');
      });

      btnCheckout.disabled = false;
      btnCheckout.textContent = oldBtnText;

      if (soldOutItems.length > 0) {
        handleSoldOutItems(soldOutItems);
        return;
      }

      // ============ 驗證欄位 ============
      const phoneEl = document.getElementById('checkoutPhone');
      const phone = (phoneEl?.value || '').trim();
      if (!phone) { alert('請輸入電話'); phoneEl?.focus(); return; }
      if (!/^09\d{8}$/.test(phone)) { alert('電話格式不正確(請輸入正確 10 碼電話)'); phoneEl?.focus(); return; }

      // ★ 帳號後五碼:TW QRCode 必填,貨到付款選填 ★
      const last5El = document.getElementById('transferLast5');
      const last5 = (last5El?.value || '').trim();
      if (!isCod) {
        // TW QRCode 走原本邏輯
        if (!last5) { alert('請輸入帳號後 5 碼'); last5El?.focus(); return; }
        if (!/^\d{5}$/.test(last5)) { alert('帳號格式不正確(請輸入正確後 5 位數字)'); last5El?.focus(); return; }
      } else {
        // 貨到付款:如果有填則驗格式,沒填則帶入預設值
        if (last5 && !/^\d{5}$/.test(last5)) { 
          alert('若填寫後五碼,請輸入正確 5 位數字'); 
          last5El?.focus(); 
          return; 
        }
      }

      // 取餐日期/時間驗證(與原本相同)
      const dateEl = document.getElementById('pickupDate');
      const timeEl = document.getElementById('pickupTime');
      const pickupDateTimeEl = document.getElementById('pickupDateTime');

      const pickupDate = (dateEl?.value || '').trim();
      const pickupTime = (timeEl?.value || '').trim();
      const pickupDateTime = (pickupDateTimeEl?.value || '').trim();

      if (!pickupDate) { alert('請選擇取餐日期'); dateEl?.focus(); return; }
      if (!pickupTime) { alert('請選擇取餐時間'); timeEl?.focus(); return; }
      if (!pickupDateTime) { alert('取餐時間資料異常,請重新選擇日期與時間'); return; }

      const pickDateObj = parseDateValue(pickupDate);
      if (!pickDateObj) { alert('日期格式異常'); return; }

      const today0 = new Date();
      today0.setHours(0, 0, 0, 0);
      const max14 = new Date(today0.getTime() + 14 * 86400000);
      if (pickDateObj < today0 || pickDateObj > max14) {
        alert('取餐日期超出可預約範圍,請重新選擇');
        return;
      }

      const hours = getBusinessHoursByDate(pickDateObj);
      if (!hours) {
        alert('該日為公休日,請改選其他日期');
        populateTimesForDate(pickDateObj);
        return;
      }

      const [hh, mm] = pickupTime.split(':').map(Number);
      if (!Number.isInteger(hh) || !Number.isInteger(mm)) {
        alert('取餐時間格式異常,請重新選擇');
        populateTimesForDate(pickDateObj);
        return;
      }

      const pickDT = new Date(pickDateObj);
      pickDT.setHours(hh, mm, 0, 0);
      const minAllowed = new Date(Date.now() + 10 * 60 * 1000);
      const maxAllowed = buildDateAt(pickDateObj, hours.end);

      if (pickDT < minAllowed || pickDT > maxAllowed) {
        alert('取餐時間已過時或超出營業時段,請重新選擇');
        populateTimesForDate(pickDateObj);
        return;
      }

      const safePickupDateTime = `${pickupDate}T${pickupTime}`;

      // 組出訂單摘要文字
      const orderList = CART.map(item => {
        let line = `${item.name} x${item.qty} = $${item.subtotal}`;
        if (item.variantLabel) line += ` (${item.variantLabel})`;
        if (item.tastes && item.tastes.length > 0) line += ` [${item.tastes.join('、')}]`;
        if (item.note) line += ` 備註:${item.note}`;
        return line;
      }).join('\n');

      const totalAmount = CART.reduce((sum, it) => sum + it.subtotal, 0);

      // ============ 取 Token ============
      btnCheckout.disabled = true;
      btnCheckout.textContent = '處理中...';

      let token;
      try {
        token = await getOrderToken();
      } catch (err) {
        alert('無法取得安全憑證,請稍後再試:' + friendlyError(err.message));
        btnCheckout.disabled = false;
        btnCheckout.textContent = oldBtnText;
        return;
      }
      btnCheckout.disabled = false;
      btnCheckout.textContent = oldBtnText;

      // 暫存訂單(把 payMethod 也存進去)
      pendingOrder = {
        orderList,
        totalAmount,
        phone,
        last5: last5 || '',   // 貨到付款可能為空
        pickupTime: safePickupDateTime,
        payMethod,             // ★ 新增
        token,
        items: CART.map(item => ({
          sku: item.sku,
          priceId: item.priceId,
          variantId: item.variantId,
          qty: item.qty,
          tastes: item.tastes,
          note: item.note
        }))
      };

      // ============ ⭐ 分流 ============
      if (isCod) {
        // 貨到付款 → 訂單摘要確認 Modal
        showCodConfirmModal(orderList, phone, pickupDateTime, totalAmount);
      } else {
        // TW QRCode → 原本的付款 Modal
        document.getElementById('payTotal').textContent = `$${totalAmount}`;
        document.getElementById('payMeta').textContent = 
          `電話:${phone}|帳號後五碼:${last5}|取餐:${pickupDateTime}`;
        document.getElementById('payOrderPreview').textContent = orderList;
        paymentModal?.show();
      }
    });
  }

  if (btnPaidConfirm) {
    btnPaidConfirm.addEventListener('click', async () => {
      if (isSubmitting) return;

      if (!pendingOrder) {
        alert('訂單資料不存在，請重新操作');
        return;
      }

      isSubmitting = true;
      btnPaidConfirm.disabled = true;
      btnPaidConfirm.textContent = '送出中...';

      try {
        const { ok, text } = await sendCartToLine(pendingOrder);

        if (ok && text.indexOf('Success') === 0) {
          pendingOrder = null;
          // ✅ 先關 Modal
          paymentModal?.hide();

          // ✅ 成功後：清空購物車 + 清空電話/後五碼/取餐時間
          resetCheckoutFormAndCart();

          // ✅ Modal 關閉後再提示（避免 alert 卡住動畫/遮罩）
          paymentModalEl?.addEventListener('hidden.bs.modal', () => {
            alert('訂單已送出，店家會在 LINE 收到通知！');
          }, { once: true });

        } else {
          alert(`送出失敗:${text}\n請截圖此畫面並聯絡店家確認。`);
        }
      } catch (err) {
        console.error(err);
        alert('送出失敗：網路或系統錯誤');
      } finally {
        isSubmitting = false;
        resetPayButton();
      }
    });
  }

  // ===========================================================
  // 貨到付款:訂單摘要 Modal 相關
  // ===========================================================
  const codConfirmModalEl = document.getElementById('codConfirmModal');
  const codConfirmModal = codConfirmModalEl 
    ? bootstrap.Modal.getOrCreateInstance(codConfirmModalEl) 
    : null;

  // 填入摘要並顯示 Modal
  function showCodConfirmModal(orderList, phone, pickupDateTime, totalAmount) {
    document.getElementById('codOrderPreview').textContent = orderList;
    document.getElementById('codPhone').textContent = phone;
    document.getElementById('codPickup').textContent = pickupDateTime;
    document.getElementById('codTotal').textContent = `$${totalAmount}`;
    codConfirmModal?.show();
  }

  // 「確認送出訂單」按鈕(貨到付款專用)
  const btnCodConfirm = document.getElementById('btnCodConfirm');
  if (btnCodConfirm) {
    btnCodConfirm.addEventListener('click', async () => {
      if (isSubmitting) return;
      if (!pendingOrder) {
        alert('訂單資料不存在,請重新操作');
        return;
      }

      isSubmitting = true;
      btnCodConfirm.disabled = true;
      const oldText = btnCodConfirm.textContent;
      btnCodConfirm.textContent = '送出中...';

      try {
        const { ok, text } = await sendCartToLine(pendingOrder);

        if (ok && text.indexOf('Success') === 0) {
          pendingOrder = null;
          codConfirmModal?.hide();
          resetCheckoutFormAndCart();

          codConfirmModalEl?.addEventListener('hidden.bs.modal', () => {
            alert('✅ 訂單已送出!\n請於取餐時準備現金付款,店家已收到通知。');
          }, { once: true });
        } else {
          alert(`送出失敗:${text}\n請截圖此畫面並聯絡店家確認。`);
        }
      } catch (err) {
        console.error(err);
        alert('送出失敗:網路或系統錯誤\n請截圖此畫面並聯絡店家確認。');
      } finally {
        isSubmitting = false;
        btnCodConfirm.disabled = false;
        btnCodConfirm.textContent = oldText;
      }
    });
  }

  // ===========================================================
  // 付款方式切換:動態調整「帳號後五碼」欄位樣式
  // ===========================================================
  document.querySelectorAll('input[name="payMethod"]').forEach(radio => {
    radio.addEventListener('change', () => {
      const last5Container = document.getElementById('transferLast5')?.closest('.col-6');
      if (!last5Container) return;

      if (radio.value === 'cod' && radio.checked) {
        // 貨到付款:標示為選填
        last5Container.classList.add('last5-optional');
      } else if (radio.value === 'qrcode' && radio.checked) {
        // TW QRCode:必填
        last5Container.classList.remove('last5-optional');
      }
    });
  });

  // ===========================================================
  // 送單模組:Token 兩段式 + 自動重試
  // ===========================================================
  const GAS_URL = 'https://script.google.com/macros/s/AKfycbx-K7vc0XhHXgiL0bWcWgFuEZS-BIDg8GQIEEqZWmfK1E0txaG-qIRZg-X74npowVvN/exec';
  const FRONTEND_ORIGIN = window.location.origin;

  /* ===================================================================
   * 庫存狀態載入(從 GAS 取得當下商品 ON/OFF)
   * =================================================================== */
  
  // 1. 一開始先把所有「加入訂單」按鈕鎖住,並改文字
  function lockAllAddCartButtons() {
    document.querySelectorAll('.add-cart').forEach(btn => {
      // 把原本文字記住(供 fallback 復原用)
      if (!btn.dataset.originalText) {
        btn.dataset.originalText = btn.textContent.trim() || '加入訂單';
      }
      btn.disabled = true;
      btn.textContent = '確認庫存中...';
      btn.classList.add('btn-checking');
    });
  }

  // 2. 套用庫存狀態(成功取得後呼叫)
  function applyCatalogStatus(statusMap) {
    document.querySelectorAll('.add-cart').forEach(btn => {
      const sku = btn.dataset.sku;
      const original = btn.dataset.originalText || '加入訂單';
      btn.classList.remove('btn-checking');

      // statusMap[sku] === false 才視為斷貨(未在表中視為 ON)
      if (statusMap[sku] === false) {
        btn.disabled = true;
        btn.textContent = '本日售完';
        btn.classList.add('btn-secondary', 'btn-soldout');
        btn.classList.remove('btn-primary', 'btn-success', 'btn-hss');
      } else {
        btn.disabled = false;
        btn.textContent = original;
        btn.classList.remove('btn-secondary', 'btn-soldout');
      }
    });
  }

  // 3. fallback:讀取失敗時全部解鎖(寧可開門做生意,不要全卡死)
  function fallbackUnlockAll() {
    document.querySelectorAll('.add-cart').forEach(btn => {
      const original = btn.dataset.originalText || '加入訂單';
      btn.disabled = false;
      btn.textContent = original;
      btn.classList.remove('btn-checking', 'btn-secondary', 'btn-soldout');
    });
    console.warn('庫存狀態讀取失敗,已啟用 fallback(全部商品可下單)');
  }

  // 售完商品處理:自動移除 + 明確告知 + 空車保護
  function handleSoldOutItems(soldOutItems) {
    // 記錄原本金額(用於對比)
    const oldTotal = CART.reduce((s, i) => s + i.subtotal, 0);
    
    // 組出被移除商品的清單文字
    const removedInfo = soldOutItems
      .map(i => `• ${i.name} × ${i.qty} = $${i.subtotal}`)
      .join('\n');
    
    // 從購物車自動移除(用 sku 比對)
    const soldOutSkus = soldOutItems.map(i => i.sku);
    CART = CART.filter(item => !soldOutSkus.includes(item.sku));
    
    // 更新 localStorage + UI
    saveCart();
    updateCartUI();
    
    // 情境 A:購物車全部都售完了(空車)
    if (CART.length === 0) {
      alert(
        `很抱歉,您購物車內的商品剛剛全部售完:\n\n` +
        `${removedInfo}\n\n` +
        `已為您清空購物車,歡迎繼續選購其他商品。`
      );
      // 關閉購物車 Offcanvas(讓顧客回到商品區)
      const offcanvasEl = document.getElementById('offcanvasCart');
      if (offcanvasEl) {
        bootstrap.Offcanvas.getInstance(offcanvasEl)?.hide();
      }
      return;
    }
    
    // 情境 B:購物車還有其他商品,只移除部分
    const newTotal = CART.reduce((s, i) => s + i.subtotal, 0);
    alert(
      `很抱歉,以下商品剛剛售完,已為您自動移除:\n\n` +
      `${removedInfo}\n\n` +
      `━━━━━━━━━━━━━\n` +
      `原本金額:$${oldTotal}\n` +
      `新金額:$${newTotal}\n\n` +
      `請重新確認購物車與轉帳金額後,再點「前往結帳」。`
    );
  }

  // 4. 主流程
  async function loadCatalogStatus() {
    lockAllAddCartButtons();

    // 設一個 5 秒 timeout,避免 GAS 卡死讓網站永遠進不去
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    try {
      const body = new URLSearchParams();
      body.append('action', 'getCatalogStatus');
      body.append('origin', FRONTEND_ORIGIN);

      const resp = await fetch(GAS_URL, { 
        method: 'POST', 
        body, 
        signal: controller.signal 
      });
      clearTimeout(timeoutId);

      const data = await resp.json();
      if (!data.ok) throw new Error(data.error || 'fail');
      applyCatalogStatus(data.status || {});

    } catch (err) {
      clearTimeout(timeoutId);
      console.error('讀取庫存狀態失敗:', err);
      fallbackUnlockAll();
    }
  }

  // 5. 啟動(在 DOMContentLoaded 內呼叫一次)
  loadCatalogStatus();
  
  // 6.(可選)每 60 秒自動重新檢查一次,讓顧客在頁面停留時也能即時反映斷貨
  // setInterval(loadCatalogStatus, 60000);

  // 產生 16 字元 nonce(對應 GAS 的 ^[a-zA-Z0-9_-]{8,64}$)
  function generateNonce() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-';
    const arr = new Uint8Array(16);
    crypto.getRandomValues(arr);
    let s = '';
    for (let i = 0; i < arr.length; i++) s += chars[arr[i] % chars.length];
    return s;
  }

  // 中文化錯誤訊息(讓使用者看到友善文字而不是 ERROR_XXX)
  const ERROR_TEXT_MAP = {
    ERROR_BAD_ORIGIN:       '來源驗證失敗,請從官方網址開啟',
    ERROR_AUTH:             '驗證失敗,請重新整理頁面',
    ERROR_TOKEN_REQUIRED:   '安全憑證遺失,請重新整理後再試',
    ERROR_TOKEN_INVALID:    '安全憑證無效,請重新整理後再試',
    ERROR_TOKEN_EXPIRED:    '安全憑證已過期,請重新送出',
    ERROR_TOKEN_USED:       '此筆訂單已被處理過,請勿重複送出',
    ERROR_RATE_LIMIT:       '操作太頻繁,請稍候幾分鐘再試',
    ERROR_DUPLICATE_ORDER:  '偵測到 3 分鐘內的重複訂單,若非本意請聯絡店家',
    ERROR_AMOUNT_MISMATCH:  '金額異常,請重新整理購物車',
    ERROR_AMOUNT:           '訂單金額異常',
    ERROR_PHONE:            '電話格式錯誤',
    ERROR_LAST5:            '帳號後五碼格式錯誤',
    ERROR_TIME:             '取餐時間格式錯誤',
    ERROR_TIME_RANGE:       '取餐時間超出可預約範圍',
    ERROR_ORDER:            '訂單資料異常',
    ERROR_ORDER_JSON:       '訂單格式異常',
    ERROR_ORDER_ITEMS:      '訂單品項數量異常',
    ERROR_ORDER_LENGTH:     '訂單內容過長',
    ERROR_SKU:              '查無此商品',
    ERROR_PRICE_ID:         '商品價格設定錯誤',
    ERROR_PRICE_TEMPLATE:   '商品價格模板錯誤',
    ERROR_VARIANT:          '商品規格錯誤',
    ERROR_TASTE:            '商品口味錯誤',
    ERROR_TASTE_DUPLICATE:  '商品口味重複',
    ERROR_QTY:              '商品數量超出範圍',
    ERROR_NOTE:             '備註過長(請少於 100 字)',
    ERROR_CONFIG:           '系統設定異常,請聯絡店家',
    ERROR_EXCEPTION:        '系統錯誤,請聯絡店家'
  };
  function friendlyError(code) {
    if (!code) return '未知錯誤';
    if (code.indexOf('ERROR_LINE_') === 0) return 'LINE 通知發送失敗(' + code + '),請聯絡店家確認';
    return ERROR_TEXT_MAP[code] || code;
  }

  // 取得 token
  async function getOrderToken() {
    const body = new URLSearchParams();
    body.append('action', 'issueToken');
    body.append('origin', FRONTEND_ORIGIN);

    const resp = await fetch(GAS_URL, { method: 'POST', body });
    const data = await resp.json();
    if (!data.ok) throw new Error(data.error || 'ERROR_TOKEN_FAILED');
    return { tokenId: data.tokenId, tokenTs: data.tokenTs, ttl: data.ttl };
  }

  // 單次送單嘗試
  async function _doSubmitOnce(data, token) {
    const body = new URLSearchParams();
    body.append('action',      'submitOrder');
    body.append('origin',      FRONTEND_ORIGIN);
    body.append('tokenId',     token.tokenId);
    body.append('tokenTs',     String(token.tokenTs));
    body.append('nonce',       generateNonce());
    body.append('phone',       data.phone);
    body.append('last5',       data.last5);
    body.append('pickupTime',  data.pickupTime);
    body.append('totalAmount', String(data.totalAmount));
    body.append('itemsJson',   JSON.stringify(data.items));
    body.append('payMethod',   data.payMethod || 'qrcode');

    const resp = await fetch(GAS_URL, { method: 'POST', body });
    const json = await resp.json();
    console.log('GAS 回應:', json);
    return json;
  }

  // 對外:送單(維持原本回傳格式 { ok, text },caller 不用改)
  async function sendCartToLine(data) {
    try {
      if (!data.token || !data.token.tokenId) {
        return { ok: false, text: '安全憑證遺失,請重新從購物車送出訂單' };
      }

      const result = await _doSubmitOnce(data, data.token);

      if (result.ok) {
        return { ok: true, text: 'Success' };
      } else {
        const tokenErrors = ['ERROR_TOKEN_EXPIRED', 'ERROR_TOKEN_USED', 'ERROR_TOKEN_INVALID', 'ERROR_TOKEN_REQUIRED'];
        if (tokenErrors.indexOf(result.error) >= 0) {
          return { 
            ok: false, 
            text: '您停留時間過久,訂單已失效。請關閉此視窗,重新「前往結帳」' 
          };
        }
        
        // ★★★ 新增:極端情境 — 送單瞬間商品剛售完 ★★★
        if (result.error === 'ERROR_STOCK_EMPTY') {
          const soldOutName = result.name || '部分商品';
          return { 
            ok: false, 
            text: `⚠️ 「${soldOutName}」剛剛售完!\n\n` +
                  `請關閉此視窗回購物車調整訂單。\n\n` +
                  `‼️ 若您已完成匯款,請截圖此畫面立刻聯絡店家退款。`
          };
        }
        // ★★★ 新增結束 ★★★
        
        return { ok: false, text: friendlyError(result.error) };
      }
    } catch (err) {
      console.error('送出訂單失敗:', err);
      return { ok: false, text: '網路或系統錯誤,請檢查連線' };
    }
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
    const cont  = document.getElementById('tasteContainer');

    if (!product.tastes || !product.tastes.choices?.length) {
      wrap.style.display = 'none';
      cont.innerHTML = '';
      cont.onchange = null;
      return;
    }

  wrap.style.display = '';

  const nameAttr = 'tasteGroup'; // 單選用同一個 name
  cont.innerHTML = product.tastes.choices.map((ch, idx) => {
    const extra = ch.delta ? `(+$${ch.delta})` : '';
    const id = `taste_${ch.id}`;
    const checked = idx === 0 ? 'checked' : ''; // 預設選第一個
    return `
      <div class="form-check">
        <input class="form-check-input" type="radio"
               id="${id}" 
               name="${nameAttr}" ${checked}
               value="${ch.label}" 
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

    const modalProductImage = document.querySelector('#addToCartModal .modal-product-image');
    if (modalProductImage) {
      modalProductImage.src = product.imageSrc || 'assets/huangshushu.png';
      modalProductImage.alt = product.name || '商品圖片';
    }

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
    product.imageSrc = item.imageSrc || 'assets/huangshushu.png';

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
      const imageFromHtml = card.querySelector('.product-img img')?.getAttribute('src');
      if (nameFromHtml) product.name = nameFromHtml;
      if (imageFromHtml) product.imageSrc = imageFromHtml;
      
      renderModal(product);
    });
  });

  // 數量 +/-
  document.getElementById('qtyPlus').addEventListener('click', () => {
    if (qty >= 20) { alert('單品最多 20 份，如需大量請來電'); return; }
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
      imageSrc: currentProduct.imageSrc || '',
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
    hiddenEl.value = `${dateEl.value} ${timeEl.value}`; // "YYYY-MM-DD HH:MM"(顯示用)
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
