export const APPEAR_OBSERVER = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.appear_observer_was_not_intersecting)
            {
                entry.target.classList.add('appear-later');
            }
            
            entry.target.appear_observer_was_not_intersecting = false;
        } else if (entry.target.appear_observer_was_not_intersecting === undefined) {
            entry.target.appear_observer_was_not_intersecting = true;
        }
    });
});

export function observeAppearition(view)
{
    setTimeout(() => {APPEAR_OBSERVER.observe(view);}, 700);
}

export function resetAppearition(view)
{
    view.appear_observer_was_not_intersecting = undefined;
}

