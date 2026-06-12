import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // --- Routes des projets ---
  {
    path: 'projets/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'projets/modifier/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'projets/modifier/:id/creer',
    renderMode: RenderMode.Server
  },
  {
    path: 'projets/modifier/:id/:id',
    renderMode: RenderMode.Server
  },

  // --- Routes des tâches ---
  {
    path: 'taches/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'taches/:id/modifier', // <-- Ajout de la route manquante ici
    renderMode: RenderMode.Server
  },

  // --- Toutes les autres routes statiques ---
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];