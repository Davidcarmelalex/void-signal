# VOID//SIGNAL — Security Policy

## Reporting Vulnerabilities

**Do not open public issues.** Report privately:

| Channel | Response Time |
|---------|--------------|
| GitHub Security Advisories | 72 hours |
| security@void-signal.org | 48 hours |

### GPG Key
```
pub   rsa4096 2026-01-01 [SC]
      8F3A B2C1 D4E5 F678 9012 3456 7890 ABCD EF12 3456
uid   VOID//SIGNAL Security <security@void-signal.org>
```

### Our Commitment
- Acknowledge within 48 hours
- Initial assessment within 7 days
- Coordinated disclosure
- Credit researchers (with consent)
- No legal action against good-faith research

## Known Security Considerations

### 1. Prompt Injection
**Risk:** Malicious article content manipulating the scorer.
**Mitigation:** Input sanitization, output validation, sandboxed execution, rate limiting.

### 2. Bias Score Manipulation
**Risk:** Adversarial content evading detection.
**Mitigation:** Multi-layer scoring, source reliability weighting, anomaly detection.

### 3. Source Feed Poisoning
**Risk:** Compromised RSS feeds injecting false info.
**Mitigation:** HTTPS-only, certificate pinning, cross-reference verification.

### 4. Unauthorized Publishing
**Risk:** Compromised API keys publishing unauthorized content.
**Mitigation:** Key rotation, MFA, immutable audit logs.

## Whistleblower Protection

Submit tips securely:
- Email: tips@void-signal.org (GPG encrypted)
- Signal: [Request via secure channel]

All communications encrypted, metadata not logged, Tor supported.

## Infrastructure Security

| Layer | Implementation |
|-------|---------------|
| Transport | TLS 1.3 |
| Database | AES-256 at rest, TLS in transit |
| API Auth | API keys + rate limiting |
| Admin | SSH key-only, bastion host |
| Logs | Immutable, 90-day retention |
| Backups | Encrypted, off-site, daily |

---

*Security policy version: 1.0.0 | Last updated: 2026-07-11*
