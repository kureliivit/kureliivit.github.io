// Shared footer as Web Component
class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer>
        <div class="container">
          <p>&copy; 2025 Kureliivit ja jaloimmat reidet.</p>
          <p>Improvisaatioteatteria rakkaudella ja intohimolla <span aria-hidden="true">❤️</span></p>
        </div>
      </footer>
    `;
  }
}
customElements.define("site-footer", SiteFooter);
