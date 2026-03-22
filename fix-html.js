const fs = require('fs');
const path = require('path');
const distPath = path.join(__dirname, 'dist');
const htmlFiles = fs.readdirSync(distPath).filter(f => f.endsWith('.html'));

const footerAndBanner = `
    <footer class="footer text-faded text-center py-5 mt-5" style="background-color: var(--bs-secondary); border-top: 3px solid var(--bs-primary);">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-4 text-lg-start mb-4 mb-lg-0">
                    <h5 class="text-uppercase mb-3" style="color: var(--bs-primary);">Mocco Pavimenti</h5>
                    <p class="small mb-0 text-white-50">Strada Statale 26, 18<br>10010 Settimo Vittone (TO)<br>P.IVA 03938490012</p>
                </div>
                <div class="col-lg-4 mb-4 mb-lg-0">
                    <h5 class="text-uppercase mb-3" style="color: var(--bs-primary);">Contatti</h5>
                    <ul class="list-unstyled small">
                        <li class="mb-2"><a href="tel:0125658407" class="text-white text-decoration-none">📞 0125 658407</a></li>
                        <li class="mb-2"><a href="tel:3495345274" class="text-white text-decoration-none">📱 349 5345274</a></li>
                        <li><a href="mailto:info@mocco.it" class="text-white text-decoration-none">✉️ info@mocco.it</a></li>
                    </ul>
                </div>
                <div class="col-lg-4 text-lg-end">
                    <h5 class="text-uppercase mb-3" style="color: var(--bs-primary);">Legal</h5>
                    <ul class="list-unstyled small">
                        <li class="mb-2"><a href="privacy.html" class="text-white text-decoration-none">Privacy Policy</a></li>
                        <li><a href="cookie.html" class="text-white text-decoration-none">Cookie Policy</a></li>
                    </ul>
                </div>
            </div>
            <div class="row mt-5">
                <div class="col-12 text-center border-top border-secondary pt-4">
                    <p class="m-0 small text-white-50 lh-lg">
                        Copyright &copy; Mocco Snc di Bonetti Paola Emma Letizia & C. 2023 - P.IVA 03938490012.<br>
                        Tutti i contenuti testuali e visivi presenti sono gestiti e di esclusiva responsabilità legale della proprietà del sito.<br>
                        Sviluppo Web e Ottimizzazione SEO a cura di <a href="https://francescopunta.com/" target="_blank" rel="noopener" class="text-primary text-decoration-underline fw-bold" title="Sviluppo Siti Web e Consulente SEO in Piemonte">Francesco Punta</a>.
                    </p>
                </div>
            </div>
        </div>
    </footer>

    <!-- Custom GDPR Cookie Banner -->
    <div id="custom-cookie-banner" class="cookie-banner-container" style="display: none;">
        <div class="cookie-banner-content">
            <h5 class="mb-2 text-white">Informativa sui Cookie</h5>
            <p class="small mb-3 text-white-50">Utilizziamo cookie tecnici indispensabili per il funzionamento del sito. Puoi accettare o rifiutare tutto cliccando sui tasti appositi, oppure gestire le tue preferenze nella policy.</p>
            <div class="d-flex flex-wrap gap-2 justify-content-center justify-content-md-start">
                <button id="cookie-accept-all" class="btn btn-primary btn-sm">Accetta Tutti</button>
                <button id="cookie-reject-all" class="btn btn-outline-light btn-sm">Solo Necessari</button>
                <a href="cookie.html" class="btn btn-link btn-sm text-white">Preferenze Cookie</a>
            </div>
        </div>
    </div>
`;

htmlFiles.forEach(file => {
    const filePath = path.join(distPath, file);
    let content = fs.readFileSync(filePath, 'utf-8');

    // Clean up
    content = content.replace(/<footer[\s\S]*?<\/footer>/gi, '');
    content = content.replace(/<!-- Custom GDPR Cookie Banner -->[\s\S]*?<\/div>\s*<\/div>/gi, '');
    content = content.replace(/<\/div>\s*<\/div>\s*<script src="https:\/\/cdn.jsdelivr.net/gi, '<script src="https://cdn.jsdelivr.net'); // just in case

    // Inject
    content = content.replace('<script src="https://cdn.jsdelivr.net', footerAndBanner + '\n    <script src="https://cdn.jsdelivr.net');

    fs.writeFileSync(filePath, content, 'utf-8');
});
