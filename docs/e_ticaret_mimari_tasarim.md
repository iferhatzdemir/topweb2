# E-Ticaret Mantıksal Mimari ve C4 Modeli

## 1. Mantıksal Mimari Açıklaması
- **Kullanıcı Arayüzü (React SPA/SSR)**: Next.js tabanlı vitrin; ürün listeleme, arama, sepet ve ödeme akışları için modüler sayfalar ve durum yönetimi katmanı sağlar.
- **BFF/API Katmanı (Node.js + NestJS)**: Frontend isteklerini tek uçtan karşılama, orkestrasyon, veri zenginleştirme ve güvenlik kontrolleri yapar; REST/GraphQL uçları sağlar.
- **Kimlik Doğrulama Servisi**: OAuth 2.0/OpenID Connect akışlarını, JWT üretimini ve oturum yönetimini yürütür; BFF ve frontend arasında token alışverişi yapar.
- **CMS (Headless)**: İçerik editörlerinin ürün hikâyeleri, kampanya banner’ları ve blog yazıları yayınlamasını sağlar; webhooks ile BFF’ye içerik invalidasyonu bildirir.
- **Ürün ve Sipariş Yönetimi (MySQL 8)**: Ürün kataloğu, stok, fiyatlandırma, müşteri ve sipariş tablolarını barındırır; ACID özellikli işlemlerle ödeme sonrası sipariş kalıcılığı sağlar.
- **Cache Katmanı (Redis)**: Sık erişilen ürün, sepet ve kullanıcı oturumu verilerini düşük gecikme ile sunar; sepet state’i ve rate limiting için kullanılır.
- **Arama Motoru (Meilisearch/Elasticsearch)**: Tam metin arama, fasetli filtreleme ve öneri hizmetleri; ürün indekslerinin near real-time güncellenmesini yönetir.
- **Ödeme Entegrasyonları**: iyzico/Stripe gibi sağlayıcılar ile BFF üzerinden güvenli ödeme tokenizasyonu ve doğrulama akışları yürütür.
- **CDN & Edge (Nginx + CDN)**: Statik asset’leri (JS/CSS/img) ve SSR çıktısını global erişilebilirlik için önbelleğe alır; Nginx reverse proxy yönlendirmesi yapar.
- **Gözlemlenebilirlik ve Loglama**: Merkezi log (ELK/EFK), metrics (Prometheus + Grafana) ve tracing (OpenTelemetry) ile uçtan uca izleme.
- **Mesajlaşma/Kuyruk (opsiyonel)**: Sipariş sonrası bildirim, stok senkronizasyonu ve analitik için event-driven mimari (Kafka/RabbitMQ) desteği.

## 2. C4 Model Diyagramları

### 2.1 Context Diyagramı
```mermaid
C4Context
    title "E-Ticaret Sistemi - Context"
    Person(customer, "Müşteri", "Web veya mobil tarayıcı üzerinden alışveriş yapar")
    Person(admin, "İçerik Editörü", "CMS üzerinden içerik yönetir")
    System_Boundary(system, "E-Ticaret Platformu") {
        System(frontend, "React Frontend", "Next.js tabanlı vitrin")
        System(bff, "BFF/API", "NestJS REST/GraphQL servisi")
        System(cms, "Headless CMS", "Kampanya ve içerik yönetimi")
        System(auth, "Kimlik Servisi", "OAuth2/OpenID Connect")
        System(search, "Arama Servisi", "Meilisearch/Elasticsearch")
        System(db, "MySQL", "Ürün & sipariş verileri")
        System(cache, "Redis", "Cache & oturum")
        System(payment, "Ödeme Sağlayıcı", "PCI uyumlu ödeme işleyicisi")
    }
    customer -> frontend : "Ürünleri görüntüler, sepet ve ödeme işlemleri"
    frontend -> bff : "HTTPS API çağrıları"
    bff -> db : "SQL sorguları"
    bff -> cache : "Cache okuma/yazma"
    bff -> search : "Arama sorguları"
    bff -> payment : "Ödeme tokenizasyonu"
    bff -> auth : "Token doğrulama"
    admin -> cms : "İçerik oluşturma"
    cms -> bff : "Webhook ile içerik değişiklikleri"
    frontend -> cdn : "Statik içerik & SSR çıktıları"
```

### 2.2 Container Diyagramı
```mermaid
C4Container
    title "E-Ticaret Platformu - Container Seviyesi"
    Person(customer, "Müşteri")
    System_Boundary(system, "E-Ticaret Platformu") {
        Container(frontend, "Frontend", "Next.js", "SSR/CSR React uygulaması")
        Container(bff, "BFF/API", "NestJS/Express", "REST & GraphQL API")
        Container(workers, "Async İşleyiciler", "Node.js Workers", "Kuyruk tabanlı işlemler")
        ContainerDb(mysql, "MySQL 8", "RDBMS", "Ürün, sipariş, kullanıcı verileri")
        ContainerDb(redis, "Redis", "In-memory Cache", "Oturum, sepet, rate limit")
        ContainerDb(search, "Arama Motoru", "Meilisearch/Elasticsearch", "Ürün indeksleri")
        Container(cms, "Headless CMS", "Strapi/Contentful", "İçerik yönetimi")
        Container(extPayment, "Ödeme Sağlayıcı", "iyzico/Stripe", "Ödeme işlemleri")
        Container(cdn, "CDN & Edge", "Nginx + CDN", "Statik dosya dağıtımı")
    }
    customer -> frontend : "HTTPS"
    frontend -> cdn : "Asset & SSR cache"
    frontend -> bff : "API çağrıları"
    bff -> mysql : "SQL"
    bff -> redis : "Cache"
    bff -> search : "Arama API"
    bff -> extPayment : "Ödeme API"
    bff -> cms : "Content API"
    cms -> bff : "Webhook" 
    workers -> redis : "Queue/Stream"
    workers -> mysql : "Veri senkronizasyonu"
    bff -> workers : "Kuyruk yayınlama"
```

### 2.3 Component Diyagramı (BFF)
```mermaid
C4Component
    title "BFF/API - Component Seviyesi"
    Container_Boundary(bff, "BFF/API") {
        Component(apiGateway, "API Gateway Controller", "Express/NestJS Controller", "REST & GraphQL endpointleri")
        Component(authModule, "Auth Module", "NestJS Guard", "JWT doğrulama, rol kontrolü")
        Component(productService, "Product Service", "Business Service", "Ürün kataloğu ve arama orchestrasyonu")
        Component(cartService, "Cart Service", "Business Service", "Sepet yönetimi ve cache senkronizasyonu")
        Component(orderService, "Order Service", "Business Service", "Sipariş oluşturma, ödeme sonrası işlemler")
        Component(paymentAdapter, "Payment Adapter", "Integration Layer", "Ödeme sağlayıcıları ile iletişim")
        Component(cmsAdapter, "CMS Adapter", "Integration Layer", "CMS içeriklerini fetch eder")
        Component(searchAdapter, "Search Adapter", "Integration Layer", "Meilisearch/Elasticsearch client")
        Component(repositoryLayer, "Repository Layer", "Data Access", "TypeORM/Prisma ile MySQL erişimi")
        Component(cacheLayer, "Cache Layer", "Data Access", "Redis client, oturum & sepet cache")
        Component(eventPublisher, "Event Publisher", "Messaging", "Sipariş sonrası event üretimi")
    }
    apiGateway -> authModule : "Guard"
    apiGateway -> productService : "REST/GraphQL çağrısı"
    apiGateway -> cartService : "Sepet işlemleri"
    apiGateway -> orderService : "Sipariş akışları"
    productService -> repositoryLayer : "Ürün sorguları"
    productService -> searchAdapter : "Arama"
    cartService -> cacheLayer : "Sepet verileri"
    orderService -> paymentAdapter : "Ödeme başlat"
    orderService -> repositoryLayer : "Sipariş kaydı"
    orderService -> eventPublisher : "Sipariş eventleri"
    paymentAdapter -> externalPayment : "Ödeme API"
    cmsAdapter -> externalCMS : "İçerik API"
    searchAdapter -> searchEngine : "Arama API"
    cacheLayer -> redisStore : "Redis"
    repositoryLayer -> mysqlDb : "SQL"
```

## 3. Veri Akışları

### 3.1 Ürün Listeleme
1. Kullanıcı frontend üzerinden kategori sayfasını çağırır.
2. Frontend, SSR sırasında BFF `GET /products` endpoint’ine istek atar.
3. BFF önce Redis cache’i kontrol eder; varsa cached sonuç döner.
4. Cache miss durumunda BFF, MySQL ürün tablolarını sorgular ve sonuçları Redis’e yazar.
5. Aynı anda Meilisearch/Elasticsearch’ten faset verileri alınır ve yanıt paketine eklenir.
6. Frontend cevabı render eder, CDN edge cache’i günceller.

### 3.2 Sepet Yönetimi
1. Kullanıcı ürün ekleme butonuna tıklar; frontend BFF `POST /cart/items` çağırır.
2. BFF, Auth Module ile token doğrular ve Cart Service’i tetikler.
3. Cart Service, Redis’te kullanıcı sepetini günceller (JSON hash); stok doğrulaması için MySQL’e sorgu atar.
4. Güncellenmiş sepet bilgisi frontend’e döner, UI güncellenir.
5. Opsiyonel olarak eventPublisher sepet analitikleri için kuyruğa mesaj yazar.

### 3.3 Ödeme Akışı
1. Kullanıcı checkout sayfasında adres ve ödeme bilgilerini girer; frontend `POST /checkout` ile BFF’ye gönderir.
2. Order Service, MySQL’de sepet ve stok kontrolü yapar, geçici sipariş kaydı oluşturur.
3. Payment Adapter, ödeme sağlayıcısı ile token bazlı ödeme isteği yapar.
4. Ödeme başarılı ise Order Service siparişi finalize eder, stokları günceller ve sipariş detaylarını MySQL’e yazar.
5. EventPublisher, sipariş oluşturuldu etkinliğini kuyruğa (ör. Kafka) gönderir.
6. BFF, frontend’e başarı yanıtı döner; frontend kullanıcıyı sipariş özetine yönlendirir.

### 3.4 Sipariş Durumu
1. Kullanıcı `GET /orders/{id}` ile sipariş durumunu sorgular.
2. BFF, Auth Module ile kullanıcı yetkisini doğrular.
3. Order Service, MySQL’den sipariş detaylarını okur; Redis’te cache’lenmiş durum varsa oradan döner.
4. Durum bilgisi frontend’de render edilir.

### 3.5 CMS İçerik Yayını
1. İçerik editörü CMS’de banner günceller ve kaydeder.
2. CMS, webhook ile BFF `POST /cms/hooks` endpoint’ine içerik değişikliği bildirir.
3. BFF, ilgili içerik anahtarını Redis cache’inden siler ve CDN purge işlemini tetikler.
4. Frontend’de ilk istek sonrası yeni içerik BFF -> CMS API akışı ile alınır ve cache yeniden oluşturulur.

## 4. Dağıtım ve Altyapı Notları
- Tüm container’lar Docker ile orkestre edilir; Nginx reverse proxy TLS termination sağlar.
- CI/CD pipeline’ı lint/test/build aşamalarından sonra Docker image’larını registry’ye iter ve staging/prod ortamlarına dağıtır.
- Infrastructure as Code (Terraform/Ansible) ile altyapı tekrarlanabilir hale getirilir.
- Ölçekleme: Frontend ve BFF yatay olarak auto-scale edilir; Redis ve Meilisearch master-replica ile yüksek erişilebilirlik sağlanır.

