import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useProducts } from "../hooks/useProducts";
import type { Product } from "../types/product";

interface Props {
  currentProduct: Product;
}

function RelatedProducts({ currentProduct }: Props) {
  const navigate = useNavigate();
  const { data } = useProducts();

  const [api, setApi] = useState<CarouselApi>();
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    if (!api) return;
    const update = () => {
      setCanPrev(api.canScrollPrev());
      setCanNext(api.canScrollNext());
    };
    update();
    api.on("select", update);
    api.on("reInit", update);
    return () => {
      api.off("select", update);
      api.off("reInit", update);
    };
  }, [api]);

  const related = (data ?? []).filter(
    p => p.category === currentProduct.category && p.id !== currentProduct.id,
  );

  if (related.length === 0) return null;

  const arrowStyle = (enabled: boolean): React.CSSProperties => ({
    width: "40px",
    height: "40px",
    borderRadius: "9999px",
    border: "1px solid rgba(128,128,128,0.4)",
    background: "rgba(128,128,128,0.1)",
    color: "inherit",
    cursor: enabled ? "pointer" : "not-allowed",
    opacity: enabled ? 1 : 0.3,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });

  return (
    <section style={{ marginTop: "4rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h3 style={{ fontSize: "1.2rem", fontWeight: 600, margin: 0 }}>
          Altri prodotti della categoria
        </h3>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            type="button"
            onMouseDown={e => e.preventDefault()}
            onClick={() => api?.scrollPrev()}
            disabled={!canPrev}
            aria-label="Precedente"
            style={arrowStyle(canPrev)}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onMouseDown={e => e.preventDefault()}
            onClick={() => api?.scrollNext()}
            disabled={!canNext}
            aria-label="Successivo"
            style={arrowStyle(canNext)}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <Carousel opts={{ align: "start" }} setApi={setApi} className="w-full">
        <CarouselContent className="-ml-2">
          {related.map(p => (
            <CarouselItem key={p.id} className="pl-2 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6">
              <div
                className="product-card"
                style={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: "1px solid rgba(128,128,128,0.2)",
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                  height: "100%",
                }}
                onClick={() => navigate(`/products/${p.id}`)}
              >
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  style={{
                    width: "100%",
                    aspectRatio: "1",
                    objectFit: "cover",
                    backgroundColor: "rgba(128,128,128,0.1)",
                  }}
                />
                <div style={{ padding: "0.75rem 0.85rem", display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                  <div style={{ fontSize: "0.95rem", fontWeight: 500 }}>{p.name}</div>
                  <div style={{ fontSize: "0.85rem", opacity: 0.6 }}>€ {p.price.toFixed(2)}</div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}

export default RelatedProducts;
