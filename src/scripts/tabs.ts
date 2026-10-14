// Shared behaviour for server-rendered tab widgets.
// Markup: [data-tabs] > [role=tab][data-tab=ID] buttons and [data-panel=ID] panels.
// Active button gets aria-selected="true"; panels toggle `hidden` and replay
// their entrance animation (elements marked [data-animate="class"]).
function activate(root: HTMLElement, id: string) {
  root.querySelectorAll<HTMLElement>('[role="tab"]').forEach((tab) => {
    const selected = tab.dataset.tab === id;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
  });
  root.querySelectorAll<HTMLElement>('[data-panel]').forEach((panel) => {
    const show = panel.dataset.panel === id;
    panel.hidden = !show;
    if (!show) return;
    panel.querySelectorAll<HTMLElement>('[data-animate]').forEach((el) => {
      const cls = el.dataset.animate!;
      el.classList.remove(cls);
      void el.offsetWidth; // restart the CSS animation
      el.classList.add(cls);
    });
  });
  root.dispatchEvent(new CustomEvent('tabchange', { detail: id }));
}

export function initTabs() {
  document.querySelectorAll<HTMLElement>('[data-tabs]').forEach((root) => {
    if (root.dataset.tabsReady) return;
    root.dataset.tabsReady = 'true';
    const tabs = [...root.querySelectorAll<HTMLElement>('[role="tab"]')];

    root.addEventListener('click', (e) => {
      const tab = (e.target as HTMLElement).closest<HTMLElement>('[role="tab"]');
      if (tab && root.contains(tab)) activate(root, tab.dataset.tab!);
    });

    // Arrow keys move between tabs (WAI-ARIA tabs pattern)
    root.addEventListener('keydown', (e) => {
      const i = tabs.indexOf(e.target as HTMLElement);
      if (i < 0) return;
      let next = -1;
      if (e.key === 'ArrowRight') next = (i + 1) % tabs.length;
      else if (e.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length;
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = tabs.length - 1;
      if (next < 0) return;
      e.preventDefault();
      tabs[next].focus();
      activate(root, tabs[next].dataset.tab!);
    });
  });
}
