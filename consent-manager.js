/**
 * ============================================================================
 * CONSENT MODE V2 + COOKIE-BANNER MANAGER
 * ============================================================================
 * DSGVO-konform, Google Consent Mode v2, Consent Gate für Analytics/Ads
 * 
 * Features:
 * - Speichert Consent-Status in localStorage (bis 365 Tage)
 * - Sperrt Tracking-Skripte bis zur Akzeptanz
 * - Google Consent Mode v2 Integration
 * - Erlaubt Granularkontrolle: essential, analytics, marketing
 * ============================================================================
 */

class ConsentManager {
  constructor() {
    this.CONSENT_KEY = 'una-consent-v2';
    this.CONSENT_EXPIRY_DAYS = 365;
    this.state = this.loadConsent();
    this.init();
  }

  /**
   * Initialisiere Consent-System beim Laden
   */
  init() {
    // Initialisiere Google Consent Mode v2 (blockiert vor user_engagement)
    this.initGoogleConsentMode();
    
    // Wenn kein gespeicherter Consent: Banner zeigen
    if (!this.hasConsent()) {
      this.showBanner();
    } else {
      this.applyConsent();
      this.hideBanner();
    }
  }

  /**
   * Google Consent Mode v2 Initialisierung
   */
  initGoogleConsentMode() {
    if (typeof window !== 'undefined') {
      // Default consent state - alles blockiert
      window.dataLayer = window.dataLayer || [];
      
      window.gtag = function() {
        window.dataLayer.push(arguments);
      };

      // Pflicht-Init-Call laut Google-Standard-Snippet (fehlte bisher) —
      // ohne 'js'-Timestamp startet GA4 die Messung nicht korrekt.
      gtag('js', new Date());

      gtag('consent', 'default', {
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'analytics_storage': 'denied',
        'functionality_storage': 'granted', // Seitenverhalten OK
        'personalization_storage': 'denied',
        'security_storage': 'granted'        // Sicherheit OK
      });
    }
  }

  /**
   * Lade gespeicherten Consent-Status
   */
  loadConsent() {
    try {
      const stored = localStorage.getItem(this.CONSENT_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        // Prüfe Ablaufdatum
        if (data.expiresAt && new Date(data.expiresAt) > new Date()) {
          return data.consent;
        }
        // Abgelaufen → löschen
        localStorage.removeItem(this.CONSENT_KEY);
      }
    } catch (e) {
      console.warn('Consent-Laden fehlgeschlagen:', e);
    }
    return null;
  }

  /**
   * Speichere Consent-Status
   */
  saveConsent(consentState) {
    try {
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + this.CONSENT_EXPIRY_DAYS);
      
      localStorage.setItem(
        this.CONSENT_KEY,
        JSON.stringify({
          consent: consentState,
          expiresAt: expiresAt.toISOString(),
          acceptedAt: new Date().toISOString()
        })
      );
    } catch (e) {
      console.warn('Consent-Speicherung fehlgeschlagen:', e);
    }
  }

  /**
   * Prüfe ob Consent vorhanden
   */
  hasConsent() {
    return this.state !== null;
  }

  /**
   * Gebe aktuellen Consent-State zurück
   */
  getConsent() {
    return this.state || {
      essential: true,
      analytics: false,
      marketing: false
    };
  }

  /**
   * Prüfe ob bestimmte Cookie-Art erlaubt ist
   */
  isAllowed(type) {
    const consent = this.getConsent();
    return consent[type] === true;
  }

  /**
   * Wende Consent-Einstellungen an
   */
  applyConsent() {
    const consent = this.getConsent();
    
    // Google Consent Mode v2 Update
    if (typeof gtag !== 'undefined') {
      gtag('consent', 'update', {
        'analytics_storage': consent.analytics ? 'granted' : 'denied',
        'ad_storage': consent.marketing ? 'granted' : 'denied',
        'ad_user_data': consent.marketing ? 'granted' : 'denied',
        'ad_personalization': consent.marketing ? 'granted' : 'denied'
      });
    }
    
    // Analytics-Skripte laden (wenn erlaubt)
    if (consent.analytics) {
      this.loadAnalyticsScripts();
    }
    
    // Marketing/Ad-Skripte laden (wenn erlaubt)
    if (consent.marketing) {
      this.loadMarketingScripts();
    }
  }

  /**
   * Lade Analytics-Skripte (z.B. Google Analytics)
   */
  loadAnalyticsScripts() {
    if (document.getElementById('ga-script')) return; // Nicht doppelt laden
    
    // Google Analytics 4 (GA4)
    const gaScript = document.createElement('script');
    gaScript.id = 'ga-script';
    gaScript.async = true;
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX'; // TODO: Eigene GA-ID
    document.head.appendChild(gaScript);
    
    gaScript.onload = () => {
      if (typeof gtag !== 'undefined') {
        gtag('config', 'G-XXXXXXXXXX'); // TODO: Eigene GA-ID
      }
    };
  }

  /**
   * Lade Marketing/Ad-Skripte
   */
  loadMarketingScripts() {
    // Google Ads (wenn verwendet)
    // const adScript = document.createElement('script');
    // adScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX';
    // adScript.async = true;
    // document.head.appendChild(adScript);
  }

  /**
   * Zeige Cookie-Banner an
   */
  showBanner() {
    let banner = document.getElementById('consent-banner');
    if (!banner) {
      banner = this.createBanner();
      document.body.insertBefore(banner, document.body.firstChild);
    }
    banner.style.display = 'flex';
    banner.setAttribute('aria-hidden', 'false');
  }

  /**
   * Verstecke Banner
   */
  hideBanner() {
    const banner = document.getElementById('consent-banner');
    if (banner) {
      banner.style.display = 'none';
      banner.setAttribute('aria-hidden', 'true');
    }
  }

  /**
   * Erstelle Banner-DOM (wird einmalig generiert)
   */
  createBanner() {
    const container = document.createElement('div');
    container.id = 'consent-banner';
    container.setAttribute('role', 'dialog');
    container.setAttribute('aria-label', 'Cookie-Zustimmung');
    
    container.innerHTML = `
      <div class="consent-banner-overlay"></div>
      <div class="consent-banner-content">
        <div class="consent-banner-header">
          <h2>🍪 Datenschutz & Cookies</h2>
          <button class="consent-close-btn" aria-label="Banner schließen">×</button>
        </div>
        
        <div class="consent-banner-body">
          <p class="consent-intro">
            Wir nutzen Cookies, um Ihre Erfahrung zu verbessern. Einige sind notwendig (z.B. für Formularfunktion), 
            andere helfen uns, diese Seite besser zu machen.
          </p>
          
          <div class="consent-choices">
            <!-- Essential Cookies (immer aktiv) -->
            <label class="consent-choice essential">
              <input type="checkbox" name="essential" checked disabled>
              <span class="consent-choice-content">
                <strong>Notwendig</strong>
                <small>Cookies für Seitenfunktion (keine Datensammlung)</small>
              </span>
            </label>
            
            <!-- Analytics Cookies -->
            <label class="consent-choice">
              <input type="checkbox" name="analytics">
              <span class="consent-choice-content">
                <strong>Analytics</strong>
                <small>Google Analytics – Hilft uns, Besucherverhalten zu verstehen</small>
              </span>
            </label>
            
            <!-- Marketing Cookies -->
            <label class="consent-choice">
              <input type="checkbox" name="marketing">
              <span class="consent-choice-content">
                <strong>Marketing</strong>
                <small>Für Werbekampagnen und Retargeting (optional)</small>
              </span>
            </label>
          </div>
          
          <p class="consent-footer">
            Mehr Details in unserer <a href="datenschutz.html" target="_blank" rel="noopener">Datenschutzerklärung</a>.
          </p>
        </div>
        
        <div class="consent-banner-actions">
          <button class="consent-btn reject" data-action="reject">
            Ablehnen
          </button>
          <button class="consent-btn accept-settings" data-action="settings">
            Einstellungen
          </button>
          <button class="consent-btn accept-all" data-action="accept-all">
            Alle akzeptieren
          </button>
        </div>
      </div>
    `;
    
    // Event-Listener
    container.querySelector('.consent-close-btn').addEventListener('click', 
      () => this.handleReject());
    
    container.querySelector('[data-action="reject"]').addEventListener('click', 
      () => this.handleReject());
    
    container.querySelector('[data-action="settings"]').addEventListener('click', 
      () => this.handleSettings());
    
    container.querySelector('[data-action="accept-all"]').addEventListener('click', 
      () => this.handleAcceptAll());
    
    return container;
  }

  /**
   * Handler: Alle ablehnen
   */
  handleReject() {
    const consentState = {
      essential: true,
      analytics: false,
      marketing: false
    };
    this.state = consentState;
    this.saveConsent(consentState);
    this.applyConsent();
    this.hideBanner();
  }

  /**
   * Handler: Benutzerdefinierte Einstellungen
   */
  handleSettings() {
    const banner = document.getElementById('consent-banner');
    const checkboxes = {
      analytics: banner.querySelector('input[name="analytics"]'),
      marketing: banner.querySelector('input[name="marketing"]')
    };
    
    const consentState = {
      essential: true,
      analytics: checkboxes.analytics.checked,
      marketing: checkboxes.marketing.checked
    };
    
    this.state = consentState;
    this.saveConsent(consentState);
    this.applyConsent();
    this.hideBanner();
  }

  /**
   * Handler: Alle akzeptieren
   */
  handleAcceptAll() {
    const consentState = {
      essential: true,
      analytics: true,
      marketing: true
    };
    this.state = consentState;
    this.saveConsent(consentState);
    this.applyConsent();
    this.hideBanner();
  }

  /**
   * Consent zurücksetzen (für Testing/Entwicklung)
   */
  reset() {
    localStorage.removeItem(this.CONSENT_KEY);
    this.state = null;
    this.init();
  }
}

// ============================================================================
// INITIALISIERUNG beim Laden
// ============================================================================
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.consentManager = new ConsentManager();
  });
} else {
  window.consentManager = new ConsentManager();
}

// Exponiere für Testing/Entwicklung
// > consentManager.reset() — zurücksetzen
// > consentManager.getConsent() — aktuellen Status ansehen
