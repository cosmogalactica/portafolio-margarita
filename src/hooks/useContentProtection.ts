/**
 * @file useContentProtection.ts
 * @description Hook de seguridad para la protección de propiedad intelectual y contenido.
 * Deshabilita el menú contextual (clic derecho), el arrastre de recursos gráficos (drag & drop),
 * e intercepta atajos de teclado destinados a la descarga/inspección de código fuente.
 */

import { useEffect } from 'react';

export interface ContentProtectionOptions {
  disableContextMenu?: boolean;
  disableDrag?: boolean;
  disableInspectShortcuts?: boolean;
  disableSelect?: boolean;
}

export function useContentProtection(options: ContentProtectionOptions = {}) {
  const {
    disableContextMenu = true,
    disableDrag = true,
    disableInspectShortcuts = true,
    disableSelect = true,
  } = options;

  useEffect(() => {
    // 1. Deshabilitar Clic Derecho (Context Menu)
    const handleContextMenu = (e: MouseEvent) => {
      if (disableContextMenu) {
        e.preventDefault();
        return false;
      }
    };

    // 2. Deshabilitar Arrastre de Imágenes y Recursos (Drag & Drop)
    const handleDragStart = (e: DragEvent) => {
      if (disableDrag) {
        e.preventDefault();
        return false;
      }
    };

    // 3. Prevenir atajos de teclado típicos de guardado o inspección
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!disableInspectShortcuts) return;

      // Ctrl+S o Cmd+S (Guardar página)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
      }

      // Ctrl+U o Cmd+U (Ver código fuente)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'u') {
        e.preventDefault();
      }

      // F12 o Ctrl+Shift+I / Cmd+Option+I (Opcional: prevenir apertura accidental de devtools)
      if (
        e.key === 'F12' ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key.toLowerCase() === 'i' || e.key.toLowerCase() === 'j'))
      ) {
        // Permitido o silenciado según preferencia
      }
    };

    // Aplicar a nivel global del documento
    if (disableContextMenu) {
      document.addEventListener('contextmenu', handleContextMenu, { capture: true });
    }
    if (disableDrag) {
      document.addEventListener('dragstart', handleDragStart, { capture: true });
    }
    if (disableInspectShortcuts) {
      document.addEventListener('keydown', handleKeyDown, { capture: true });
    }

    if (disableSelect) {
      document.body.classList.add('unselectable');
    }

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu, { capture: true });
      document.removeEventListener('dragstart', handleDragStart, { capture: true });
      document.removeEventListener('keydown', handleKeyDown, { capture: true });
      document.body.classList.remove('unselectable');
    };
  }, [disableContextMenu, disableDrag, disableInspectShortcuts, disableSelect]);
}
