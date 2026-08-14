# =============================================================================
# Humano de Estrellas · imagen de despliegue
# Human from Stars · deployment image
#
# El resultado de la compilación es una web estática, así que la imagen final
# no lleva Node: sólo nginx sirviendo dist/. Pesa unos 60 MB en lugar de 400.
#
# The build output is a static site, so the final image carries no Node at all:
# just nginx serving dist/. It weighs ~60 MB instead of ~400.
# =============================================================================

ARG NODE_VERSION=24-alpine
ARG NGINX_VERSION=1.27-alpine


# --------------------------------------------------------------------- base --
# Node con pnpm activado mediante corepack. La versión exacta de pnpm sale del
# campo "packageManager" de package.json, así que la imagen y el desarrollo
# local usan siempre el mismo pnpm.
FROM node:${NODE_VERSION} AS base

ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
# Evita que corepack pida confirmación al descargar pnpm.
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0

RUN corepack enable

WORKDIR /app


# ---------------------------------------------------------------- depedencias --
# Capa separada: mientras no cambien package.json ni el lockfile, Docker
# reutiliza esta capa y no vuelve a instalar nada.
FROM base AS deps

# pnpm-workspace.yaml también hace falta aquí: desde pnpm 11 los ajustes del
# proyecto (entre ellos qué scripts de instalación se autorizan) viven ahí, y
# sin él la instalación falla con ERR_PNPM_IGNORED_BUILDS.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
    pnpm install --frozen-lockfile


# ------------------------------------------------------------------- build --
FROM base AS build

# Ruta base para publicar en un subdirectorio:
#   docker build --build-arg BASE_PATH=/human-from-stars/ .
ARG BASE_PATH=/
ENV BASE_PATH=$BASE_PATH

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN pnpm run build


# --------------------------------------------------------------------- dev --
# Servidor de desarrollo de Vite con recarga en caliente, para trabajar dentro
# del contenedor:  docker compose --profile dev up
FROM base AS dev

ENV NODE_ENV=development

COPY --from=deps /app/node_modules ./node_modules
COPY . .

EXPOSE 5173

# --host expone Vite fuera del contenedor; sin esto sólo escucha en localhost.
CMD ["pnpm", "run", "dev", "--host", "0.0.0.0"]


# -------------------------------------------------------------- producción --
FROM nginx:${NGINX_VERSION} AS production

# Configuración propia: compresión, cabeceras de caché y fallback de SPA.
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY docker/security-headers.conf /etc/nginx/security-headers.conf
COPY --from=build /app/dist /usr/share/nginx/html

# nginx:alpine trae el usuario "nginx" sin privilegios ya creado.
RUN chown -R nginx:nginx /usr/share/nginx/html

EXPOSE 80

# 127.0.0.1 explícito, no "localhost": nginx escucha sólo en IPv4 (ver
# docker/nginx.conf) y "localhost" resuelve antes a ::1, lo que haría fallar
# la comprobación aunque el sitio se esté sirviendo sin problemas.
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --spider -q http://127.0.0.1/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
