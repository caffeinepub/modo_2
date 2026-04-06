# MODO - AI Chatbot & WhatsApp Integration

## Current State
MODO is a dark-themed men's e-commerce site with products (t-shirts, jeans, gadgets), shopping cart, announcement banner, music player, and footer. No customer support chat exists.

## Requested Changes (Diff)

### Add
- AI chatbot widget (floating bottom-right, above music player) for customer inquiries
- Chatbot handles FAQs: shipping, returns, product queries, size guide, contact
- WhatsApp contact button linking to number 9919031626
- Bot suggests WhatsApp if it cannot answer the query

### Modify
- App.tsx: import and render ChatBot component
- Position chatbot above the MusicPlayer in z-index stacking

### Remove
- Nothing removed

## Implementation Plan
1. Create `ChatBot.tsx` component with:
   - Floating chat bubble button (bottom-right, above music player)
   - Chat window with MODO branding (dark theme)
   - Pre-defined smart responses for common customer queries
   - WhatsApp redirect button (wa.me/919919031626)
   - Typing indicator animation
   - Quick-reply chips for common questions
2. Add ChatBot to App.tsx
