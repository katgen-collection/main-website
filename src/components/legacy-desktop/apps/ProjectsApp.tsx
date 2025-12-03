"use client";

import React, { useState } from 'react';
import ProjectsListClient from '@/components/projects/ProjectsListClient';
import ProjectDetails from '@/components/projects/ProjectDetails';
import { Project } from '@/types/projects';

export const ProjectsApp = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="relative -m-6 h-full overflow-y-auto">
      <div className="transform scale-100 origin-top-left min-h-full">
        {selectedProject ? (
          <ProjectDetails 
            project={selectedProject} 
            onBack={() => setSelectedProject(null)} 
          />
        ) : (
          <ProjectsListClient onProjectClick={setSelectedProject} />
        )}
      </div>
    </div>
  );
};
