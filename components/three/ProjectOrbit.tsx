"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { getFeaturedProjects } from "@/lib/projects";
import {
  DEFAULT_ORBIT_POSITIONS,
  ORBIT_SPEED,
} from "@/lib/three/sceneConstants";
import ProjectNode from "./ProjectNode";

type ProjectOrbitProps = {
  animate?: boolean;
};

export default function ProjectOrbit({ animate = true }: ProjectOrbitProps) {
  const groupRef = useRef<Group>(null);
  const projects = getFeaturedProjects();

  useFrame((_, delta) => {
    if (!animate || !groupRef.current) return;
    groupRef.current.rotation.y += delta * ORBIT_SPEED;
  });

  const scrollToProjects = () => {
    const el = document.getElementById("projects");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <group ref={groupRef}>
      {projects.map((project, index) => {
        const position =
          project.orbitPosition ?? DEFAULT_ORBIT_POSITIONS[index] ?? [0, 0, 0];
        return (
          <ProjectNode
            key={project.id}
            position={position}
            color={project.accent}
            onSelect={scrollToProjects}
            animate={animate}
          />
        );
      })}
    </group>
  );
}
