/**
 * Animaciones CSS de cada evento astronómico.
 *
 * Cada una es una pequeña escena hecha sólo con divs y keyframes: sin canvas,
 * sin imágenes y sin librerías. El bucle de cada escena dura lo justo para
 * leerse de un vistazo dentro de la leyenda.
 */

const SCENES = {
  /* Big Bang: un punto de luz que estalla y sigue expandiéndose. */
  big_bang: (
    <>
      <span className="anim__singularity" />
      <span className="anim__ring anim__ring--1" />
      <span className="anim__ring anim__ring--2" />
      <span className="anim__ring anim__ring--3" />
      <span className="anim__flash" />
    </>
  ),

  /* Rayos cósmicos: partículas a toda velocidad que astillan un núcleo. */
  cosmic_rays: (
    <>
      <span className="anim__nucleus" />
      <span className="anim__ray anim__ray--1" />
      <span className="anim__ray anim__ray--2" />
      <span className="anim__ray anim__ray--3" />
      <span className="anim__ray anim__ray--4" />
      <span className="anim__shard anim__shard--1" />
      <span className="anim__shard anim__shard--2" />
      <span className="anim__shard anim__shard--3" />
    </>
  ),

  /* Ciclo CNO: cuatro protones dando vueltas alrededor del núcleo de una
     estrella como el Sol, que respira mientras los fusiona. */
  low_mass_stars: (
    <>
      <span className="anim__sun" />
      <span className="anim__corona" />
      <span className="anim__cno">
        <span className="anim__proton anim__proton--1" />
        <span className="anim__proton anim__proton--2" />
        <span className="anim__proton anim__proton--3" />
        <span className="anim__proton anim__proton--4" />
      </span>
      <span className="anim__shell" />
    </>
  ),

  /* Supernova de colapso: la estrella se hincha, implota y revienta. */
  massive_stars: (
    <>
      <span className="anim__giant" />
      <span className="anim__shock" />
      <span className="anim__debris anim__debris--1" />
      <span className="anim__debris anim__debris--2" />
      <span className="anim__debris anim__debris--3" />
      <span className="anim__debris anim__debris--4" />
      <span className="anim__debris anim__debris--5" />
      <span className="anim__debris anim__debris--6" />
    </>
  ),

  /* Tipo Ia: la enana blanca roba materia a su compañera y detona. */
  white_dwarfs: (
    <>
      <span className="anim__companion" />
      <span className="anim__stream" />
      <span className="anim__dwarf" />
      <span className="anim__detonation" />
    </>
  ),

  /* Kilonova: dos estrellas de neutrones en espiral, ondas gravitacionales
     y el estallido que fabrica el oro. */
  neutron_star_merger: (
    <>
      <span className="anim__gw anim__gw--1" />
      <span className="anim__gw anim__gw--2" />
      <span className="anim__orbit anim__orbit--a">
        <span className="anim__ns" />
      </span>
      <span className="anim__orbit anim__orbit--b">
        <span className="anim__ns" />
      </span>
      <span className="anim__kilonova" />
      <span className="anim__ejecta anim__ejecta--1" />
      <span className="anim__ejecta anim__ejecta--2" />
      <span className="anim__ejecta anim__ejecta--3" />
    </>
  ),

  /* Aceleradores: dos haces que se persiguen dentro de un anillo y chocan. */
  human_made: (
    <>
      <span className="anim__accelerator" />
      <span className="anim__beam anim__beam--cw" />
      <span className="anim__beam anim__beam--ccw" />
      <span className="anim__collision" />
      <span className="anim__decay" />
    </>
  )
};

export default function OriginAnimation({ originKey, color, size = 'md' }) {
  const scene = SCENES[originKey];
  if (!scene) return null;

  return (
    <div
      className={`anim anim--${originKey} anim--${size}`}
      style={{ '--anim-color': color }}
      aria-hidden="true"
    >
      {scene}
    </div>
  );
}
