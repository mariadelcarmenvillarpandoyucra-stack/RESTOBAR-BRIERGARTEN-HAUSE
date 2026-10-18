# Biergärten Haus — versión React + TypeScript

Migración completa del prototipo (HTML/CSS/JS suelto) a **React 18 + TypeScript + Vite + Tailwind**, organizada por componentes.

## Cómo correrlo

```bash
npm install
npm run dev
```

Usuarios demo (mismos que antes):
- Dueño → usuario `admin`, contraseña `dueno123`
- Mesero → usuario `carlos` / `luis` / `ana`, contraseña `mesero123`

## Estructura del proyecto

```
src/
  types.ts                 → todos los tipos del dominio (Pedido, Mesa, Producto, etc.)
  store/
    seed.ts                → menú semilla, barriles, generación de la base de datos demo
    migrations.ts          → adapta bases guardadas con versiones anteriores
    StoreContext.tsx       → contexto y mutaciones; guarda todo en localStorage
  lib/
    icons.tsx               → set de íconos SVG como componente <Icon name="..."/>
    session.ts               → sesión de usuario (reemplaza session.js) + usuarios demo
    format.ts                → helpers para moneda (Bs.) y tiempo transcurrido de mesas
    stats.ts                → cálculos puros de caja, meseros y Rock & Wings
    constants.ts            → clases de formulario compartidas
  hooks/
    useMesa.ts              → estado y acciones del carrito/mesa activa
    useCobro.ts             → método de pago, propina, calificación y total
    useImagenUpload.ts      → lectura de imágenes seleccionadas como base64
    useFormProducto.ts      → estado, validación y envío del formulario de producto
  components/
    mesa/MesaGrid.tsx       → cuadrícula y tarjeta de mesa compartidas por Dueño y Mesero
    layout/Sidebar.tsx       → barra lateral (ver sección "sidebar" abajo)
    layout/TopBar.tsx        → barra superior con notificaciones y botón de menú móvil
    layout/AppShell.tsx      → arma sidebar + topbar + contenido para ambos paneles
    ui/                      → átomos reutilizables: TabBar, ImageUpload, StarRating y EmptyState, entre otros
  pages/
    LoginPage.tsx            → pantalla de acceso
    dueno/
      DuenoPanel.tsx          → arma la navegación y cambia de vista
      views/                  → una vista por archivo: Resumen, RockWings, Mesas, Caja,
                                Productos, Personal, Pedidos, Facturacion, Reportes
      components/             → gestión de barriles y formularios de producto/promoción
    mesero/
      MeseroPanel.tsx
      views/                  → MisMesas (orquestación), MisPedidos y Perfil
      components/             → menú, carrito, resumen y modales de factura/cobro
```

## Dónde cambiar lo que pediste

**1) "Dashboard" del dueño → ya renombrado a "Restobar Biergärten Haus"**
Está en `src/pages/dueno/DuenoPanel.tsx`, en el arreglo `NAV_ITEMS` (la entrada con
`view: "resumen"`) y en el objeto `TITLES`. Si quieres otro texto, cambia el `label`
ahí — se actualiza en el menú lateral y en el título de la página automáticamente.
El componente de esa vista vive en `src/pages/dueno/views/ResumenView.tsx` por si
quieres tocar el contenido (tarjetas, gráfico, etc.), no solo el nombre.

**2) Barra lateral desplegable en celular**
Antes, en celular la barra lateral completa desaparecía (`hidden md:flex`) y quedaba
solo una barra inferior de íconos sueltos. Ahora `src/components/layout/Sidebar.tsx`
renderiza dos versiones:
- En escritorio: la columna fija de siempre.
- En celular: la misma barra lateral completa, pero como un **cajón (drawer)** que se
  desliza desde la izquierda. Se abre con el botón de menú (ícono ☰) que aparece en
  `src/components/layout/TopBar.tsx` solo en pantallas chicas, y se cierra tocando la
  X, un ítem del menú, o el fondo oscurecido.
Si quieres ajustar el ancho del cajón o la animación, es todo en ese mismo archivo
(`Sidebar.tsx`), buscando la clase `w-72` y `transition-transform`.

**3) Marca de agua**
Me confirmaste que ya la ajustaste por tu cuenta en el texto, así que no toqué nada
de eso — quedó tal cual la dejaste.

## Notas técnicas

- Todo el estado (mesas, pedidos, ventas, productos, notificaciones) sigue viviendo en
  `localStorage`, igual que el prototipo original, para que Dueño y Mesero vean los
  mismos datos sin necesidad de un backend todavía. Cuando conectes una API real, el
  único archivo que hay que reemplazar es `src/store/StoreContext.tsx`.
- La "simulación de cocina" (pendiente → preparando → listo en segundo plano) se
  mantiene igual que antes, ahora como un efecto de React en ese mismo archivo.
- El diseño (paleta, tipografías Cinzel/Inter, tarjetas) se migró tal cual desde
  `css/base/variables.css` hacia `tailwind.config.js` y `src/index.css`, para que se
  vea igual que el original pero ya sea Tailwind + TypeScript.

## Novedades (última versión)

- **Barriles de cerveza**: un botón *Editar* abre un panel con todas las cervezas y sus litros; ahí se pueden aumentar litros (`+10 / +20 / +30 / +50 L`), añadir otro tipo de cerveza o eliminar una. Los cambios se aplican al pulsar *Guardar* (*Cancelar* los descarta).
- **Promociones del día** (Productos & Stock): el dueño crea, edita, pausa/activa y elimina promociones. Las activas aparecen en el panel del mesero (pestaña *Promociones*) y se pueden agregar al pedido.
- **12 mesas** en el panel del mesero, en 2 columnas de cuadritos.
- **Especificaciones del pedido**: cuadro de texto debajo de lo agregado; la nota se ve en el resumen de la mesa, en *Mis pedidos* y en *Pedidos* del dueño.
- **Menú en 2 columnas con descripción** (dueño y mesero) y dividido en secciones: Comidas → Piqueo / Carnes, Cócteles → Clásicos / Especiales, Cerveza → Cerveza artesanal / Cerveza industrial, además de Botellas y Refrescos → Naturales / Gaseosas. La cerveza artesanal también se organiza por presentación (Chop de 350 ml, Chop de 500 ml, Chop de 1 L, Torre y Metro); el dueño puede elegir una variedad sugerida o escribir otra y asignarle su precio.
- **Calificación** con combobox (1 Malo … 5 Muy satisfecho); las estrellas se muestran según la opción y no se pueden modificar.
- Las bases de datos guardadas con la versión anterior se migran solas (pasan a 12 mesas, barriles a litros, subcategorías a los productos originales).
- Las imágenes de ejemplo que siguen referenciadas por `seed.ts` se mantienen en `imagenes/`; los formularios reutilizan el mismo flujo de carga y vista previa.
- Se retiraron las imágenes sin referencias de la semilla y se conservó `na2.html` con una extensión coherente con su contenido.
- Se corrigió un error de TypeScript en `FacturacionView` que impedía `npm run build`.
