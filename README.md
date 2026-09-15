# LifeDrop - Blood Donation & Transfusion Coordination Platform

LifeDrop is a modern, responsive web application connecting blood donors, recipients/seekers, medical centers, and blood banks.

## Features

- **Public Healthcare Portal**:
  - Live Emergency Shortage Broadcast Banner
  - Interactive 8×8 Clinical Blood Compatibility Matrix (Type O- Universal Donor / Type AB+ Universal Recipient)
  - Blood Bank & Medical Facility Directory with direct contact and inventory levels
  - Educational Knowledge Base & Medical Myth Busters
- **Donor Services**:
  - Volunteer Donor Registration with clinical eligibility validation (18+ age check, 56-day donation interval)
  - Digital Donor ID card with express QR code
  - Privacy-safe Donor Registry Search (protects PII with mediated alerts)
  - Next eligible donation countdown and gamified badges
- **Requisition Management**:
  - Emergency Blood Requests with urgency triage (Routine, Urgent, Critical)
  - Live patient request lifecycle tracking (*Broadcasted* → *Donors Responding* → *Fulfilled*)
- **Hospital & Transfusion Desk**:
  - Real-time stock reserve management for all 8 blood groups (increment/decrement, batch ingestion with expiry dates)
  - Emergency broadcast alert dispatch to regional donors
  - Facility verification status and license tracking
- **Administration Console**:
  - System-wide network analytics and real-time audit activity feed
  - Hospital accreditation auditing and request moderation

## Deployment to GitHub Pages

This repository includes an automated GitHub Actions deployment workflow at `.github/workflows/deploy.yml`.

To enable GitHub Pages:
1. Go to your GitHub repository: `https://github.com/ranjith526419-bot/suruthi`
2. Click **Settings** > **Pages** (in the left sidebar)
3. Under **Build and deployment** > **Source**, change from **"Deploy from a branch"** to **"GitHub Actions"**
4. Push a new commit or trigger the **Deploy LifeDrop to GitHub Pages** workflow in the **Actions** tab.
5. Your application will be live at `https://ranjith526419-bot.github.io/suruthi/`!
