# GenLayer Dispute Resolution

Next.js frontend for GenLayer Dispute Resolution - AI-powered arbitration on the GenLayer blockchain. Parties submit their cases and evidence to an impartial AI arbitrator, which issues binding rulings based on pre-defined legal frameworks.

## Setup

1. Install dependencies:

**Using bun:**
```bash
bun install
```

**Using npm:**
```bash
npm install
```

2. Create `.env.local` file:
```bash
cp .env.example .env.local
```

3. Configure environment variables:
   - `NEXT_PUBLIC_CONTRACT_ADDRESS` - Deployed DisputeResolution contract address (`0x70050D589A1cbcD91C3222caF146144E8108E593`)
   - `NEXT_PUBLIC_GENLAYER_RPC_URL` - GenLayer Studio URL (default: `https://studio.genlayer.com/api`)

## Development

**Using bun:**
```bash
bun dev
```

**Using npm:**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

**Using bun:**
```bash
bun run build
bun start
```

**Using npm:**
```bash
npm run build
npm start
```

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling with custom glass-morphism theme
- **genlayer-js** - GenLayer blockchain SDK
- **TanStack Query (React Query)** - Data fetching and caching
- **Radix UI** - Accessible component primitives
- **shadcn/ui** - Pre-built UI components

## Wallet Management

The app uses MetaMask for wallet management:
- **Connect Wallet**: Connect your MetaMask wallet to the app
- **Switch Account**: Switch between MetaMask accounts
- **Disconnect**: Remove site access from MetaMask

## Dispute Lifecycle

```
pending_claimant → pending_respondent → under_review → resolved
```

1. **File a Dispute** — Claimant opens a case with a title, legal framework, and respondent
2. **Submit Claimant Case** — Claimant submits their statement and optional evidence URL
3. **Submit Respondent Case** — Respondent submits their rebuttal and optional evidence URL
4. **Trigger Arbitration** — Any connected user calls `resolve()` to start AI arbitration
5. **Ruling Issued** — AI arbitrator renders a binding decision with full reasoning

## Features

- **File Disputes**: Open a new dispute with a title, legal framework (Contract Law, Employment Law, Consumer Protection, etc.), and respondent party
- **Submit Cases**: Both claimant and respondent submit case statements and optional evidence URLs for the AI to review
- **AI Arbitration**: GenLayer's AI arbitrator fetches external evidence, applies the chosen legal framework, and issues a binding ruling with confidence score and award recommendation
- **Decisions**: Four possible outcomes — `claimant_wins`, `respondent_wins`, `split`, `dismissed`
- **Reconsideration**: Either party can reopen a resolved dispute with new evidence or grounds
- **Recent Rulings**: Sidebar panel showing the latest AI decisions with outcomes and confidence scores
- **Live Stats**: Navbar shows total disputes, pending cases, and resolved count in real time
- **Glass-morphism UI**: Premium dark theme with OKLCH colors, backdrop blur effects, and smooth animations
- **Real-time Updates**: Automatic data fetching with TanStack Query

## Contract

- **Address**: `0x70050D589A1cbcD91C3222caF146144E8108E593`
- **Network**: GenLayer Studio (`chainId: 61999`)
- **Language**: Python (py-genlayer)
