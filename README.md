# E-Ticaret Uygulaması - Angular UI Client

Bu proje, full-stack bir e-ticaret sisteminin arayüz (front-end) yönetimini üstlenen; modern Angular mimarisini, asenkron veri yönetimini ve dinamik donanım entegrasyonlarını deneyimlemek amacıyla geliştirilmiş istemci uygulamasıdır.

---

## 🚀 Öne Çıkan Özellikler & Mimari Yaklaşımlar

* **Modüler & Standalone Mimari Kombinasyonu:** Projede hem geleneksel Angular Modül yapısı (`NgModule`) hem de modern `standalone: true` bileşen mimarisi bir arada optimize edilerek temiz bir görünürlük kapsamı (scope) kurulmuştur.
* **QR Kod ile Dinamik Stok Güncelleme:** Uygulama içi açılan bir dialog penceresi üzerinden bilgisayar/mobil kamerası entegre edilerek ürün barkodları taranır. Taranan QR kod asenkron olarak çözümlenerek (`ngx-scanner-qrcode`), ilgili ürüne ait stok miktarı backend servisleri tetiklenerek anlık güncellenir.
* **Dinamik Yetkilendirme Arayüzü:** Yönetici (Admin) paneli üzerinden sayfa ve endpoint bazlı rol atama işlemleri dinamik dialog pencereleri (`AuthorizeMenuDialog`) üzerinden yönetilir.
* **Gelişmiş UX Öğeleri:** İşlem süreçleri, asenkron spinner (`ngx-spinner`) ve dinamik, konumlandırılabilir bildirimler (`ngx-toastr`) ile desteklenerek kullanıcı deneyimi artırılmıştır.

---

## 🛠️ Kullanılan Teknolojiler

* **Framework:** Angular (v17+)
* **UI & Tasarım:** Angular Material (MatDialog, MatButton, MatFormField, MatInput, MatBadge vb.), Bootstrap & Custom SCSS.
* **Donanım Entegrasyonu:** `ngx-scanner-qrcode` (ZBAR_QRCODE tabanlı tarayıcı).
* **Yardımcı Yapılar:** jQuery (DOM manipülasyonları için entegre edilmiştir).

---

## 📦 Kurulum ve Çalıştırma

1. Projeyi yerel bilgisayarınıza klonlayın.
2. Proje dizinine giderek gerekli tüm npm paketlerini yükleyin:
   ```bash
   npm install
