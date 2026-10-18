import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "../lib/icons";
import { DEMO_USERS, SessionLib } from "../lib/session";
import type { Role } from "../types";
import "./LoginPage.css";

const HINTS: Record<Role, { user: string; pass: string }> = {
  dueno: { user: "admin", pass: "dueno123" },
  mesero: { user: "carlos", pass: "mesero123" },
};

/* ==========================================================================
   Pantalla de acceso — migrada de index.html + js/login/login.js.
   Prototipo de solo-frontend: valida contra usuarios de muestra y
   guarda la sesión (SessionLib) antes de navegar al panel del rol.
   ========================================================================== */
export default function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>("dueno");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Referencias al fondo animado (guirnalda de luces, luciérnagas, trigo)
  const fireflyFieldRef = useRef<HTMLDivElement>(null);
  const lightStringRef = useRef<HTMLDivElement>(null);
  const wheatRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const existing = SessionLib.get();
    if (existing) navigate(existing.role === "dueno" ? "/dueno" : "/mesero", { replace: true });
  }, [navigate]);

  // Genera la ambientación del fondo una sola vez, al montar la pantalla.
  useEffect(() => {
    const field = fireflyFieldRef.current;
    if (field) {
      const total = window.innerWidth < 640 ? 16 : 26;
      for (let i = 0; i < total; i++) {
        const f = document.createElement("span");
        f.className = "firefly";
        f.style.setProperty("--fs", `${(3 + Math.random() * 5).toFixed(1)}px`);
        f.style.setProperty("--fdur", `${(9 + Math.random() * 9).toFixed(1)}s`);
        f.style.setProperty("--fdelay", `-${(Math.random() * 14).toFixed(1)}s`);
        f.style.setProperty("--fx", `${(Math.random() * 100).toFixed(1)}%`);
        f.style.setProperty("--fsway", `${(10 + Math.random() * 40).toFixed(0)}px`);
        field.appendChild(f);
      }
    }

    const wrap = lightStringRef.current;
    if (wrap) {
      const width = 1200, height = 140, bulbs = 13, sagDepth = 60;
      const points: [number, number][] = [];
      for (let i = 0; i <= bulbs; i++) {
        const x = (width / bulbs) * i;
        const y = 10 + Math.sin((i / bulbs) * Math.PI) * sagDepth;
        points.push([x, y]);
      }
      let wireD = `M ${points[0][0]} ${points[0][1]}`;
      for (let i = 1; i < points.length; i++) {
        wireD += ` L ${points[i][0].toFixed(1)} ${points[i][1].toFixed(1)}`;
      }
      let bulbsSvg = "";
      points.slice(1, -1).forEach(([x, y], i) => {
        bulbsSvg += `<g class="light-bulb" style="animation-delay:-${(i * 0.35).toFixed(2)}s" transform="translate(${x.toFixed(1)},${y.toFixed(1)})"><circle class="halo" r="7"></circle><circle class="core" r="3"></circle></g>`;
      });
      wrap.innerHTML = `<svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path class="wire" d="${wireD}"></path>${bulbsSvg}</svg>`;
    }

    const row = wheatRowRef.current;
    if (row) {
      const total = window.innerWidth < 640 ? 7 : 13;
      const stalk = `<svg viewBox="0 0 24 100" fill="none" stroke="currentColor" stroke-width="1.4" xmlns="http://www.w3.org/2000/svg"><path d="M12 100V20"/><path d="M12 26 L4 14 M12 26 L20 14"/><path d="M12 38 L3 27 M12 38 L21 27"/><path d="M12 50 L4 40 M12 50 L20 40"/><path d="M12 62 L5 53 M12 62 L19 53"/><circle cx="12" cy="14" r="3.4"/></svg>`;
      for (let i = 0; i < total; i++) {
        const el = document.createElement("div");
        el.innerHTML = stalk;
        if (el.firstElementChild) row.appendChild(el.firstElementChild);
      }
    }
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const match = DEMO_USERS.find(
      (u) => u.role === role && u.username === username.trim().toLowerCase() && u.password === password
    );
    if (!match) {
      setError("Usuario, contraseña o rol incorrectos. Revisa la sugerencia de abajo.");
      return;
    }
    setLoading(true);
    SessionLib.save(
      { username: match.username, displayName: match.displayName, role: match.role, roleLabel: match.roleLabel },
      remember
    );
    setTimeout(() => navigate(match.role === "dueno" ? "/dueno" : "/mesero"), 400);
  }

  return (
    <div className="login-stage">
      <div className="brand-ring" style={{ width: 520, height: 520, top: -220, right: -220, opacity: 0.35 }} />
      <div className="brand-ring" style={{ width: 380, height: 380, bottom: -200, left: -160, opacity: 0.25 }} />

      <div className="light-string" ref={lightStringRef} />
      <div className="firefly-field" ref={fireflyFieldRef} />
      <div className="wheat-row" ref={wheatRowRef} />
      <p className="absolute bottom-4 left-0 right-0 text-center text-[11px] text-muted px-6 z-10">
        © 2026 Aginova Solutions · Biergärten Haus · Todos los derechos reservados
      </p>

      <div className="login-card">
        <div className="login-emblem">
          <img src="/logo.png" alt="Biergärten Haus" />
        </div>
        <h1 className="font-display text-2xl text-center text-cream tracking-wide">BIERGÄRTEN HAUS</h1>
        <p className="text-gold text-[11px] tracking-[0.32em] uppercase text-center mt-1.5 mb-6">
          Sistema de Gestión · Restobar
        </p>

        <div className="role-toggle flex gap-2 mb-5 bg-bg-deep rounded-sm p-1">
          {(["dueno", "mesero"] as Role[]).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => { setRole(r); setError(""); }}
              className={`flex-1 text-sm py-2 rounded-sm transition ${role === r ? "bg-gold text-bg-deep font-semibold" : "text-cream-dim"}`}
            >
              {r === "dueno" ? "Dueño" : "Mesero"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-cream-dim block mb-1">Usuario</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-bg-deep border border-line rounded-sm px-3 py-2 text-sm text-cream"
              placeholder="Tu usuario"
              autoComplete="username"
              required
            />
          </div>
          <div>
            <label className="text-xs text-cream-dim block mb-1">Contraseña</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-bg-deep border border-line rounded-sm px-3 py-2 text-sm text-cream pr-10"
                placeholder="Tu contraseña"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-cream-dim"
                onClick={() => setShowPassword((s) => !s)}
                aria-label="Mostrar u ocultar contraseña"
              >
                <Icon name={showPassword ? "eyeOff" : "eye"} className="w-4 h-4" />
              </button>
            </div>
          </div>

          <label className="flex items-center gap-2 text-xs text-cream-dim">
            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
            Mantener sesión iniciada
          </label>

          {error && (
            <p className="text-xs text-danger bg-danger/10 border border-danger/30 rounded-sm px-3 py-2">{error}</p>
          )}

          <button type="submit" disabled={loading} className="btn-gold w-full text-sm">
            {loading ? "Ingresando…" : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}