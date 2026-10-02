import { useState } from "react";
import {
  useShop,
  useCatalog,
  Loading,
  CartButton,
  ShopOverlays,
  Footer,
  Filters,
  EmptyResults,
  Image,
  money,
} from "./core";
import { checkCompatibility } from "./domain.mjs";
export default function App() {
  const shop = useShop("foton");
  const filter = useCatalog(shop.catalog?.products || []);
  const [camera, setCamera] = useState("f1"),
    [film, setFilm] = useState("f3");
  if (!shop.catalog) return <Loading shop={shop} />;
  const products = shop.catalog.products;
  const c = products.find((p) => p.id === camera)!,
    f = products.find((p) => p.id === film)!;
  const result = checkCompatibility(c, f);
  return (
    <div id="top">
      <a href="#catalog" className="skip">
        К каталогу
      </a>
      <header>
        <a href="#top" className="wordmark">
          ФОТОН<i>®</i>
        </a>
        <nav>
          <a href="#catalog">Магазин</a>
          <a href="#lab">Проверка формата</a>
        </nav>
        <CartButton shop={shop} />
      </header>
      <main>
        <section className="contact-sheet">
          <div className="manifesto">
            <span className="index">АНАЛОГОВАЯ ФОТОГРАФИЯ / 01</span>
            <h1>
              МЕНЬШЕ
              <br />
              КАДРОВ.
              <br />
              <span>
                БОЛЬШЕ
                <br />
                СМЫСЛА.
              </span>
            </h1>
            <a href="#catalog" className="primary">
              Выбрать камеру <b>↗</b>
            </a>
            <p>Камеры. Плёнка. Ваш взгляд.</p>
          </div>
          <div className="hero-frame">
            <div className="frame-top">
              <span>135 / COLOR</span>
              <span>ISO 400</span>
            </div>
            <img
              src="assets/hero.jpg"
              alt="Плёночная камера на насыщенном жёлтом фоне"
            />
            <div className="frame-bottom">
              <span>Каждый кадр имеет значение.</span>
              <b>36 EXP.</b>
            </div>
          </div>
        </section>
        <section className="compatibility" id="lab">
          <div className="lab-title">
            <span>ЛАБ / 01</span>
            <h2>
              Подойдут
              <br />
              друг другу?
            </h2>
          </div>
          <div className="lab-inputs">
            <label>
              01 / Камера
              <select
                value={camera}
                onChange={(e) => setCamera(e.target.value)}
              >
                {products
                  .filter((p) => p.type === "camera")
                  .map((p) => (
                    <option value={p.id} key={p.id}>
                      {p.name}
                    </option>
                  ))}
              </select>
            </label>
            <span className="connector">+</span>
            <label>
              02 / Плёнка
              <select value={film} onChange={(e) => setFilm(e.target.value)}>
                {products
                  .filter((p) => p.type === "film")
                  .map((p) => (
                    <option value={p.id} key={p.id}>
                      {p.name}
                    </option>
                  ))}
              </select>
            </label>
          </div>
          <div
            className={
              "lab-result " + (result.ok ? "compatible" : "incompatible")
            }
            aria-live="polite"
          >
            <b>{result.ok ? "✓ Совместимы" : "× Разные форматы"}</b>
            <p>{result.message}</p>
            <button disabled={!result.ok} onClick={() => shop.addSet([c, f])}>
              Взять комплект · {money(c.price + f.price)}
            </button>
          </div>
        </section>
        <section id="catalog" className="catalog">
          <div className="catalog-title">
            <h2>В ОБОРОТЕ</h2>
            <span>{products.length.toString().padStart(2, "0")} ПОЗИЦИИ</span>
          </div>
          <Filters state={filter} />
          <div className="products">
            {filter.filtered.map((p) => (
              <article key={p.id}>
                <div className="spec-strip">
                  <span>{p.category}</span>
                  <span>{p.format} TYPE</span>
                </div>
                <button
                  className="product-photo"
                  onClick={() => shop.setDetail(p)}
                  aria-label={`Подробнее: ${p.name}`}
                >
                  <Image p={p} />
                </button>
                <div className="product-info">
                  <button
                    onClick={() => shop.setDetail(p)}
                    className="product-name"
                  >
                    {p.name}
                  </button>
                  <p>{p.subtitle}</p>
                  <div className="buy-row">
                    <b>{money(p.price)}</b>
                    <button
                      aria-label={`Добавить ${p.name}`}
                      onClick={() => shop.add(p)}
                    >
                      ＋
                    </button>
                  </div>
                </div>
              </article>
            ))}
            {!filter.filtered.length && <EmptyResults />}
          </div>
        </section>
        <div className="film-strip">
          <span>СНИМАТЬ</span>
          <span>ПРОЯВЛЯТЬ</span>
          <span>ПОВТОРЯТЬ</span>
        </div>
      </main>
      <Footer shop={shop} />
      <ShopOverlays shop={shop} />
    </div>
  );
}
