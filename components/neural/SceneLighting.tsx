"use client";

/** Transparent clear — page atmosphere + black blend show through. */
export default function SceneLighting() {
  return (
    <>
      <fog attach="fog" args={["#070b09", 5.5, 16]} />
      <ambientLight intensity={0.2} />
      <pointLight position={[2.2, 2.8, 2]} intensity={1.35} color="#4ade9a" />
      <pointLight position={[-2.5, -1.2, -1.5]} intensity={0.55} color="#9fb0b8" />
      <pointLight position={[0, -2, 1.5]} intensity={0.35} color="#3eb489" />
      <directionalLight
        position={[0, 3, 2]}
        intensity={0.4}
        color="#dfe8ec"
      />
    </>
  );
}
