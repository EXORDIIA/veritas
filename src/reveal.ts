export function initReveal(): void {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.section,.pcard,.racecard,.zone,.threat,.rcard,.fcard').forEach((el, i) => {
    el.classList.add('reveal');
    (el as HTMLElement).style.transitionDelay = `${(i % 10) * 42}ms`;
    io.observe(el);
  });
}
